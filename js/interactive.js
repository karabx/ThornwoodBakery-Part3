// Runs once the page is ready
$(function () {
  // FAQ accordion: only one answer is open at a time
  const $accordion = $(".accordion");

  // One click handler on the accordion covers every question button (event delegation)
  $accordion.on("click", ".accordion-trigger", function () {
    const $trigger = $(this);
    const $panel = $("#" + $trigger.attr("aria-controls"));
    const isOpen = $trigger.attr("aria-expanded") === "true";

    // Close any other panel that is open
    $accordion.find(".accordion-trigger[aria-expanded='true']").not($trigger).each(function () {
      const $other = $(this);
      const $otherPanel = $("#" + $other.attr("aria-controls"));
      $other.attr("aria-expanded", "false");
      $otherPanel.stop(true, true).slideUp(220, function () {
        $otherPanel.prop("hidden", true);
      });
    });

    // Toggle the clicked panel: close it if it is open, otherwise open it
    if (isOpen) {
      $trigger.attr("aria-expanded", "false");
      $panel.stop(true, true).slideUp(220, function () {
        $panel.prop("hidden", true);
      });
    } else {
      $trigger.attr("aria-expanded", "true");
      $panel.stop(true, true).prop("hidden", false).hide().slideDown(220);
    }
  });

  // Lightbox: only set up on pages that have gallery links
  const $links = $(".gallery-link");

  if ($links.length) {
    // The lightbox markup is built once and reused for every image
    const $lightbox = $(
      '<div class="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" hidden>' +
        '<button type="button" class="lightbox-close" aria-label="Close image viewer">&times;</button>' +
        '<button type="button" class="lightbox-prev" aria-label="Previous image">&#10094;</button>' +
        '<figure class="lightbox-figure"><img src="" alt="" /><figcaption class="lightbox-caption"></figcaption></figure>' +
        '<button type="button" class="lightbox-next" aria-label="Next image">&#10095;</button>' +
        "</div>"
    );
    $("body").append($lightbox);

    const $image = $lightbox.find("img");
    const $caption = $lightbox.find(".lightbox-caption");
    // Index of the image on show, and the link that opened the viewer so focus can return to it
    let current = 0;
    let opener = null;

    // Shows an image by index. The modulo makes next and previous wrap around
    function show(index) {
      current = (index + $links.length) % $links.length;
      const $link = $links.eq(current);
      $image.attr("src", $link.attr("href")).attr("alt", $link.find("img").attr("alt"));
      $caption.text($link.data("caption"));
    }

    // Opens the viewer, stops the page scrolling behind it and moves focus to the close button
    function openBox(index, trigger) {
      opener = trigger;
      show(index);
      $lightbox.prop("hidden", false).hide().fadeIn(180);
      $("body").addClass("no-scroll");
      $lightbox.find(".lightbox-close").trigger("focus");
    }

    // Closes the viewer and puts focus back on the thumbnail that opened it
    function closeBox() {
      $lightbox.fadeOut(150, function () {
        $lightbox.prop("hidden", true);
      });
      $("body").removeClass("no-scroll");
      if (opener) {
        $(opener).trigger("focus");
      }
    }

    // Without JavaScript the links open the image normally. With JavaScript the default is cancelled and the lightbox opens
    $links.on("click", function (event) {
      event.preventDefault();
      openBox($links.index(this), this);
    });

    $lightbox.on("click", function (event) {
      if (event.target === this) closeBox();
    });
    $lightbox.on("click", ".lightbox-close", closeBox);
    $lightbox.on("click", ".lightbox-prev", function () {
      show(current - 1);
    });
    $lightbox.on("click", ".lightbox-next", function () {
      show(current + 1);
    });

    // Keyboard controls: Escape closes the viewer and the arrow keys move between images
    $(document).on("keydown", function (event) {
      if ($lightbox.prop("hidden")) return;
      if (event.key === "Escape") closeBox();
      if (event.key === "ArrowLeft") show(current - 1);
      if (event.key === "ArrowRight") show(current + 1);
    });
  }
});
