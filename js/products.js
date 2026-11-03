$(function () {
  // Only runs on the products page
  const $grid = $("#productGrid");
  if (!$grid.length) return;

  const $search = $("#productSearch");
  const $sort = $("#productSort");
  const $tabs = $(".tab");
  const $count = $("#resultsCount");
  const $message = $("#productMessage");

  // state holds the loaded products and the current filters, so render() always knows what to show
  const state = { products: [], category: "all", query: "", sort: "featured" };
  const categoryNames = { breads: "Artisan Breads", pastries: "Pastries & Treats", cakes: "Custom Cakes" };

  // Loads the product list from products.json with AJAX. If it fails, a message with a retry button is shown
  function loadProducts() {
    $message.prop("hidden", true);
    $grid.attr("aria-busy", "true");

    $.getJSON("data/products.json")
      .done(function (data) {
        state.products = data;
        updateTabCounts();
        render();
      })
      .fail(function () {
        $grid.empty().attr("aria-busy", "false");
        $count.text("");
        showMessage("Sorry, we could not load the product list right now.", "Try again", loadProducts);
      });
  }

  // Shows a status message (an error or no results) with an optional button
  function showMessage(text, buttonText, handler) {
    $message.empty().append($("<p>").text(text));
    if (buttonText) {
      $("<button>", { type: "button", class: "btn btn-outline btn-small" }).text(buttonText).on("click", handler).appendTo($message);
    }
    $message.prop("hidden", false);
  }

  // Adds the number of products to each tab label
  function updateTabCounts() {
    $tabs.each(function () {
      const $tab = $(this);
      const category = $tab.data("category");
      const total = category === "all" ? state.products.length : state.products.filter(function (p) {
        return p.category === category;
      }).length;
      $tab.text((category === "all" ? "All" : categoryNames[category]) + " (" + total + ")");
    });
  }

  // A product matches when every word typed in the search box appears in its name, description, category or allergens
  function matchesQuery(product, words) {
    const haystack = [product.name, product.description, product.details, categoryNames[product.category], product.allergens.join(" ")]
      .join(" ")
      .toLowerCase();
    return words.every(function (word) {
      return haystack.indexOf(word) !== -1;
    });
  }

  // Applies the category and search filters, then sorts the result
  function getVisibleProducts() {
    const words = state.query.toLowerCase().split(/\s+/).filter(Boolean);
    const list = state.products.filter(function (product) {
      const inCategory = state.category === "all" || product.category === state.category;
      return inCategory && matchesQuery(product, words);
    });

    if (state.sort === "price-asc") {
      list.sort(function (a, b) {
        return a.price - b.price;
      });
    } else if (state.sort === "price-desc") {
      list.sort(function (a, b) {
        return b.price - a.price;
      });
    } else if (state.sort === "name-asc") {
      list.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
    }
    return list;
  }

  // Builds one product card. .text() is used so product data can never be added as HTML
  function buildCard(product, index) {
    const $card = $("<article>", { class: "product-card card-enter", "data-id": product.id }).css("animation-delay", index * 50 + "ms");
    $("<div>", { class: "product-img-placeholder", "aria-hidden": "true" }).text(product.icon).appendTo($card);
    $("<h3>").text(product.name).appendTo($card);
    $("<p>").text(product.description).appendTo($card);
    $("<span>", { class: "price" }).text(product.priceLabel).appendTo($card);
    $("<button>", { type: "button", class: "btn btn-outline btn-small card-details", "data-id": product.id })
      .text("View details")
      .attr("aria-label", "View details for " + product.name)
      .appendTo($card);
    return $card;
  }

  // Redraws the grid and updates the result count and the empty state
  function render() {
    const visible = getVisibleProducts();
    $grid.empty().attr("aria-busy", "false");
    $message.prop("hidden", true);

    visible.forEach(function (product, index) {
      $grid.append(buildCard(product, index));
    });

    let summary = "Showing " + visible.length + " of " + state.products.length + " products";
    if (state.query.trim()) {
      summary += " for \u201C" + state.query.trim() + "\u201D";
    }
    $count.text(summary);

    if (!visible.length) {
      showMessage("No products match your search. Try a different word or choose another category.", "Clear search", function () {
        $search.val("");
        state.query = "";
        selectTab("all");
        render();
        $search.trigger("focus");
      });
    }
  }

  // Updates the selected tab (aria-selected and roving tabindex for keyboard users)
  function selectTab(category) {
    state.category = category;
    $tabs.each(function () {
      const active = $(this).data("category") === category;
      $(this).attr({ "aria-selected": active, tabindex: active ? 0 : -1 });
      if (active) $grid.attr("aria-labelledby", this.id);
    });
  }

  $tabs.on("click", function () {
    selectTab($(this).data("category"));
    render();
  });

  // Arrow keys, Home and End move between the tabs, as in the ARIA tabs pattern
  $tabs.on("keydown", function (event) {
    const index = $tabs.index(this);
    let next = null;
    if (event.key === "ArrowRight") next = (index + 1) % $tabs.length;
    if (event.key === "ArrowLeft") next = (index - 1 + $tabs.length) % $tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = $tabs.length - 1;
    if (next === null) return;
    event.preventDefault();
    $tabs.eq(next).trigger("focus").trigger("click");
  });

  // The search waits 150ms after typing stops so the list is not redrawn on every key press
  let searchTimer = null;
  $search.on("input", function () {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function () {
      state.query = $search.val();
      render();
    }, 150);
  });

  $sort.on("change", function () {
    state.sort = $sort.val();
    render();
  });

  // Product details modal: built once and filled in with the chosen product
  const $modal = $(
    '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle" hidden>' +
      '<div class="modal-dialog">' +
      '<button type="button" class="modal-close" aria-label="Close product details">&times;</button>' +
      '<div class="modal-icon" aria-hidden="true"></div>' +
      '<h2 id="modalTitle"></h2>' +
      '<p class="modal-price"></p>' +
      '<p class="modal-description"></p>' +
      '<dl class="modal-meta">' +
      "<dt>Sizes</dt><dd class=\"modal-sizes\"></dd>" +
      "<dt>Availability</dt><dd class=\"modal-availability\"></dd>" +
      "<dt>Contains</dt><dd class=\"modal-allergens\"></dd>" +
      "</dl>" +
      '<a class="btn btn-primary modal-enquire" href="enquiry.html">Enquire about this product</a>' +
      "</div></div>"
  );
  $("body").append($modal);

  let opener = null;

  // Fills the modal with the chosen product and opens it
  function openModal(productId, trigger) {
    const product = state.products.find(function (p) {
      return p.id === productId;
    });
    if (!product) return;

    opener = trigger;
    $modal.find(".modal-icon").text(product.icon);
    $modal.find("#modalTitle").text(product.name);
    $modal.find(".modal-price").text(product.priceLabel);
    $modal.find(".modal-description").text(product.details);
    $modal.find(".modal-sizes").text(product.sizes);
    $modal.find(".modal-availability").text(product.availability);
    $modal.find(".modal-allergens").text(product.allergens.join(", "));
    $modal.find(".modal-enquire").attr("href", "enquiry.html?product=" + encodeURIComponent(product.id));

    $modal.prop("hidden", false).hide().fadeIn(180);
    $("body").addClass("no-scroll");
    $modal.find(".modal-close").trigger("focus");
  }

  // Closes the modal and returns focus to the button that opened it
  function closeModal() {
    $modal.fadeOut(150, function () {
      $modal.prop("hidden", true);
    });
    $("body").removeClass("no-scroll");
    if (opener) $(opener).trigger("focus");
  }

  $grid.on("click", ".card-details", function () {
    openModal($(this).data("id"), this);
  });

  $modal.on("click", function (event) {
    if (event.target === this) closeModal();
  });
  $modal.on("click", ".modal-close", closeModal);

  // Escape closes the modal and Tab is kept inside it (focus trap)
  $(document).on("keydown", function (event) {
    if ($modal.prop("hidden")) return;
    if (event.key === "Escape") {
      closeModal();
      return;
    }
    if (event.key !== "Tab") return;
    const $focusable = $modal.find("button, a[href]");
    const first = $focusable.get(0);
    const last = $focusable.get($focusable.length - 1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  // Start by loading the products
  loadProducts();
});
