# Thornwood Bakery - Website Project

## Student Information

| Field          | Detail                                                    |
|----------------|-----------------------------------------------------------|
| Student Name   | Karabo Khutsoane                                          |
| Student Number | ST10440585                                                |
| Module         | Web Development                                           |
| Institution    | The Independent Institute of Education - Rosebank College |
| Group          | Group 1                                                   |

| Link             | Address                                                |
|------------------|--------------------------------------------------------|
| Live website     | https://thornwoodbakery.netlify.app                    |
| Part 3 repository | https://github.com/karabx/ThornwoodBakery-Part3       |
| Part 2 repository | https://github.com/karabx/ThornwoodBakery-Part2       |

---

## Project Overview

This repository contains the source code for the Thornwood Bakery website, developed as a Proof of Evidence (PoE) across three parts for the Web Development module. Thornwood Bakery is a hypothetical artisan bakery with two stores in Melville and Greenside, Johannesburg.

The site is built with HTML5, CSS3 and JavaScript. Part 3 adds two libraries: jQuery 3.7.1 (accordion, tabs, modal, lightbox and product list) and Leaflet 1.9.4 (interactive store map). Both are loaded from a CDN with Subresource Integrity hashes.

---

## Website Goals and Objectives

- Give Thornwood Bakery a permanent, searchable web presence so it no longer relies on Instagram alone.
- Generate custom cake order leads through a dedicated enquiry form that answers with an estimated cost and availability straight away.
- Show products, prices, allergens and trading hours clearly to reduce phone enquiries.
- Help local customers find the bakery through search by applying on-page and local SEO.
- Deliver a mobile-first, responsive and accessible website that works across all major browsers.

---

## Key Features and Functionality

- Five fully linked HTML pages with consistent navigation and breadcrumbs on the inner pages.
- External stylesheet (`css/styles.css`) built on CSS custom properties, a reset, a typography scale, Grid and Flexbox layouts and three responsive breakpoints.
- Product catalogue loaded with AJAX from `data/products.json`, with category tabs, live search, sorting and a product details modal.
- FAQ accordion on the enquiry page.
- Image gallery with a keyboard accessible lightbox on the about page.
- Interactive Leaflet map on the contact page with a marker for each store, popups and "Show on map" buttons.
- CSS and JavaScript animations: hero fade-in, scroll reveal, hover transitions, sticky header shadow and a back to top button.
- Enquiry form with JavaScript validation, AJAX submission and an instant cost and availability response.
- Contact form with JavaScript validation that compiles the message into an email ready to send.
- On-page SEO, local SEO structured data, `robots.txt`, `sitemap.xml` and security headers.
- Semantic HTML5 structure and ARIA attributes on interactive components.
- Commented HTML, CSS and JavaScript: section comments in every file and short explanations above the main functions.

---

## File and Folder Structure

```
thornwood-bakery/
|
|-- index.html          Homepage: hero, intro strip, featured products, call to action
|-- about.html          About Us: story, image gallery with lightbox, mission and values, team
|-- products.html       Products: searchable, filterable catalogue loaded from JSON
|-- enquiry.html        Enquiry: custom cake form with AJAX submission and FAQ accordion
|-- contact.html        Contact: store details, Leaflet map and message form
|
|-- css/
|   `-- styles.css      Variables, base styles, components, responsive rules
|
|-- js/
|   |-- scripts.js      Navigation, scroll effects, reveal animations, back to top (all pages)
|   |-- interactive.js  jQuery: FAQ accordion and gallery lightbox
|   |-- products.js     jQuery: loads products.json, tabs, search, sort and modal
|   |-- map.js          Leaflet map and store markers
|   `-- forms.js        Validation, AJAX enquiry submission, contact email builder
|
|-- data/
|   `-- products.json   Product catalogue
|
|-- images/             Gallery illustrations and social sharing image
|
|-- robots.txt          Crawler instructions
|-- sitemap.xml         Sitemap of all five pages
|-- _headers            Security and caching headers for Netlify
`-- README.md           This file
```

---

## Sitemap

```
Homepage (index.html)
|-- About Us (about.html)
|-- Products (products.html)
|-- Enquiry (enquiry.html)
`-- Contact (contact.html)
```

---

## Part 3 Details

### 1. Working Through Part 2 Feedback

My Part 2 mark was 93% and the lecturer's feedback was "Excellent work!!", with no corrections requested. The changelog below records this as v2.1.0 together with the tidy-up work I did while carrying the Part 2 code across.

### 2. JavaScript Enhancements

| Requirement | Where | How it works |
|-------------|-------|--------------|
| Accordion | `enquiry.html` (FAQ) | jQuery toggles `aria-expanded` and slides each panel. Only one panel is open at a time. |
| Tabs | `products.html` | Category tabs use `role="tablist"`, roving `tabindex` and arrow, Home and End keys. Each tab label shows its product count. |
| Modal | `products.html` | "View details" opens a dialog built with jQuery showing sizes, availability and allergens. It closes with Escape, the close button or a click outside, and keeps focus inside while open. |
| Interactive map | `contact.html` | Leaflet with OpenStreetMap tiles, one marker per store and popups built with DOM methods. The "Show on map" buttons fly to a store. |
| Animations and transitions | All pages | CSS keyframes for the hero, scroll reveal with `IntersectionObserver`, hover transitions, header shadow on scroll. `prefers-reduced-motion` is respected. |
| Advanced DOM manipulation | All pages | Back to top button, lightbox, modal, character counters, result panels and product cards are created and updated from JavaScript. The footer year is generated automatically. |
| Gallery with lightbox | `about.html` | Six images open in a full-size viewer with previous and next buttons, arrow keys and Escape. Without JavaScript the images open as normal links. |
| Dynamic content | `products.html` | `$.getJSON` loads `data/products.json` and renders the cards. A friendly error message with a "Try again" button shows if loading fails. |
| Search, filter and sort | `products.html` | Search matches name, description and allergens. Results can be filtered by category and sorted by price or name. A live region announces the result count. |

### 3. Search Engine Optimisation

**Keyword research**

I worked out the keywords by combining what the bakery sells with where it trades, because local customers usually search for a product plus a suburb. The keywords were worked into titles, headings, descriptions and body text. They should be checked against Google Search Console data once the site has traffic.

| Page | Primary keywords |
|------|------------------|
| Home | artisan bakery Melville, bakery Johannesburg, fresh bread Melville |
| About | Thornwood Bakery story, artisan bakers Melville |
| Products | sourdough Johannesburg, croissants Melville, pastries Johannesburg |
| Enquiry | custom cakes Johannesburg, wedding cake Melville, birthday cake Johannesburg |
| Contact | bakery Greenside, bakery Melville opening hours |

**On-page SEO**

| Item | What was done |
|------|---------------|
| Title tags | Unique title on each page, between 49 and 59 characters, with the keyword near the front. |
| Meta descriptions | Unique description on each page, between 127 and 150 characters, with a reason to click. |
| Header tags | One `h1` per page followed by a logical `h2` and `h3` structure. Where a section had no visible heading, a visually hidden `h2` keeps the outline correct. |
| Image optimisation | Descriptive file names such as `tiered-wedding-cake-floral-decoration.svg`, descriptive alt text, width and height attributes to prevent layout shift, and `loading="lazy"`. |
| URL structure | Short, lowercase, descriptive page names, a canonical link on every page and `lang="en-ZA"`. |
| Internal linking | Links in body text between related pages (home to about, products and enquiry; about to products; enquiry to products and contact), breadcrumbs on the inner pages, and the footer links. |
| Mobile friendliness | Viewport meta tag, mobile-first CSS and the 1024px, 768px and 480px breakpoints. |
| Structured data | JSON-LD `Bakery` markup for both stores (address, coordinates, opening hours, phone) on the home and contact pages, and `BreadcrumbList` markup on the inner pages. |
| Social sharing tags | Open Graph and Twitter Card tags with a 1200 by 630 sharing image. |

**Off-page SEO**

Backlinks, social promotion and local listings happen outside the code, so this section records the plan and what is already in place in the site.

- **Backlinks:** list the bakery on local directories, ask Melville and Greenside community pages and food bloggers to link to the products page, and offer a link to wedding supplier directories from the enquiry page.
- **Social media:** footer links to Instagram and Facebook, and Open Graph tags so shared links display a title, description and image.
- **Local SEO:** `Bakery` structured data with address, coordinates and hours for both stores, city and suburb names in headings and content, and an embedded map. The next step is to claim a Google Business Profile for each store using the same name, address and phone number that appear on the website.

**Additional requests**

- **robots.txt:** allows all crawlers and points to the sitemap. The `data` folder is deliberately not blocked because search engines need `products.json` to render the product list.
- **sitemap.xml:** lists all five pages with last modified date, change frequency and priority.
- **Page speed:** scripts use `defer`, jQuery loads only on pages that need it, Leaflet loads only on the contact page, images are small SVG files, images below the fold are lazy loaded, CDN hosts are preconnected, and `_headers` sets caching for static files.
- **Security:** see the next section.

### 4. Security Measures

| Measure | Detail |
|---------|--------|
| Content Security Policy | Set in `_headers`. Scripts are limited to the site, `code.jquery.com` and `unpkg.com`. Forms can only post to the site or open an email. |
| Subresource Integrity | jQuery, Leaflet JavaScript and Leaflet CSS are loaded with `integrity` hashes and `crossorigin`. |
| Clickjacking and sniffing protection | `X-Frame-Options: DENY`, `frame-ancestors 'none'` and `X-Content-Type-Options: nosniff`. |
| Transport security | HTTPS only through Netlify, with a `Strict-Transport-Security` header. |
| Privacy | `Referrer-Policy: strict-origin-when-cross-origin` and a `Permissions-Policy` that switches off camera, microphone, location and payment. |
| Safe DOM updates | User input and data from JSON are inserted with `textContent` or jQuery `.text()`, never as HTML, to prevent cross-site scripting. |
| Spam protection | A hidden honeypot field on both forms. |
| External links | `rel="noopener noreferrer"` on every link that opens a new tab. |
| No inline code | No inline scripts, event handlers or style attributes, which keeps the Content Security Policy strict. |

### 5. Form Functionality and Validation

**enquiry.html (custom cake and product enquiries)**

- Form elements: text, email, tel, date, select and textarea inputs, grouped in fieldsets with labels.
- HTML5 attributes (`required`, `type`, `minlength`, `maxlength`, `pattern`, `autocomplete`, `inputmode`) are combined with JavaScript validation.
- Validation rules: name (letters only, 2 to 60 characters), email format, South African phone numbers (`071 234 5678` or `+27 71 234 5678`), collection date (future, within 12 months, not a Sunday), optional budget as a number, and a message of 10 to 1000 characters with a live counter.
- Error handling: inline messages next to each field, `aria-invalid` and `aria-describedby`, and focus moves to the first invalid field. Fields re-check as the user corrects them.
- AJAX submission: the form's `action` is `/` and it is a Netlify form. The data is sent with `fetch` and no page reload. The button shows "Sending..." while waiting and an error message appears if the request fails.
- Response: after a successful submission the page shows a reference number, an estimated price range (based on enquiry type and number of servings), a comparison with the budget if one was given, and availability based on lead time (5 business days for most cakes, 14 days for wedding cakes).
- Links from the product modal pre-select the enquiry type and fill in the message.

**contact.html (general messages)**

- Collects name, email, optional phone number, type of message, subject, nearest location and a full message, all validated with the same JavaScript rules.
- Once valid, the form builds an email: the recipient is set in `forms.js` (the Melville or Greenside address depending on the nearest location, with Melville as the default), the subject starts with the message type, and the body contains the message and contact details.
- The visitor sees a preview of the email and can open it in their own email app, copy it, or go back and edit it.

### 6. Deployment

The site is hosted on Netlify, connected to this GitHub repository so each push to `main` redeploys automatically. Netlify Forms picks up the enquiry form on deployment, so submissions appear in the Netlify dashboard. The product list loads JSON through `fetch`, so the site should be viewed through a web server (Netlify or a local development server) and not by opening the HTML files directly.

### 7. Testing and Quality Checks

- Scripted DOM tests ran the accordion, lightbox, product tabs, search, sort, modal, map buttons and both forms, including invalid input, a successful AJAX submission, a failed submission, product pre-selection and the compiled email.
- A page check confirmed one `h1`, a title and description of the right length, alt text on every image, no broken internal links and no duplicate IDs on all five pages.
- JSON-LD blocks were parsed to confirm they are valid JSON.

### 8. Notes

- The gallery images are vector illustrations created for the project. They stand in for photography of the bakery's real products.
- The social media links in the footer are example addresses for the bakery's profiles.
- The bakery, its addresses, prices and contact details are fictional.

---

## Responsive Design Breakpoints

| Breakpoint            | Screen Width     | Key Changes                                                                 |
|-----------------------|------------------|-----------------------------------------------------------------------------|
| Desktop               | 1024px and above | Multi-column grids, horizontal navigation, three column gallery             |
| Tablet                | 1024px and below | Reduced hero height, footer collapses to two columns                        |
| Small Tablet / Mobile | 768px and below  | Hamburger navigation, single column grids, two column gallery, shorter map  |
| Small Mobile          | 480px and below  | Single column gallery and products, full width buttons, tighter tabs        |

---

## Timeline and Milestones

| Week       | Milestone                                                | Part   |
|------------|----------------------------------------------------------|--------|
| Week 1-2   | Project proposals drafted and submitted for approval     | Part 1 |
| Week 3-5   | HTML structure, content integration, navigation linking  | Part 1 |
| Week 6-9   | CSS styling, responsive design, visual polish            | Part 2 |
| Week 10-12 | JavaScript functionality, SEO, forms, deployment         | Part 3 |

---

## Part 1 Details

- Two website project proposals drafted (Thornwood Bakery and Bright Spark Electrical).
- Thornwood Bakery selected as the target organisation.
- Sitemap designed (5 pages) and file and folder structure established.
- All five HTML pages created with semantic HTML5 structure and working navigation.
- JavaScript mobile navigation toggle and basic form validation implemented.

## Part 2 Details

- External stylesheet with CSS custom properties, reset, typography scale and relative units.
- Desktop layouts with CSS Grid and Flexbox, visual styles and pseudo-classes.
- Three responsive breakpoints (1024px, 768px and 480px).
- Screenshots of the desktop, tablet and mobile layouts are in the Part 2 repository.

## Part 3 Details (summary)

- Accordion, tabs, modal, lightbox gallery, Leaflet map, animations and dynamic DOM updates.
- Product list loaded from JSON with search, filter and sort.
- On-page and local SEO, structured data, robots.txt and sitemap.xml.
- Security headers, Subresource Integrity and safe DOM handling.
- Validated forms with AJAX submission and a compiled email.
- Deployed on Netlify.

---

## Changelog

### v3.0.0 - Part 3 Submission

- **Image gallery and lightbox:** Added an "Inside the Bakery" gallery to `about.html` with six images. `interactive.js` builds a lightbox with previous, next and close controls, arrow key and Escape support, focus return and a caption taken from each link's `data-caption`.
- **FAQ accordion:** Added five frequently asked questions to `enquiry.html`. Buttons use `aria-expanded` and `aria-controls` and panels slide open and closed with jQuery. Opening one panel closes the others.
- **Product catalogue from JSON:** Moved the eleven products from static HTML into `data/products.json` and rebuilt `products.html` so `products.js` loads and renders them with AJAX. Added a retry message for load failures.
- **Tabs, search and sorting:** Added category tabs with counts, a search box that matches name, description and allergens, a sort menu (featured, price low to high, price high to low, name A to Z), a live result count and an empty state with a "Clear search" button.
- **Product modal:** Added a details dialog with sizes, availability and allergens, a focus trap, Escape to close and an "Enquire about this product" link that pre-fills the enquiry form.
- **Interactive map:** Replaced the two Google Maps iframes on `contact.html` with one Leaflet map showing both stores, with popups, "Show on map" buttons and "Get directions" links.
- **Animations:** Added a hero fade-in, scroll reveal using `IntersectionObserver`, card entry animations, a header shadow on scroll and a back to top button, all disabled for visitors who prefer reduced motion.
- **Enquiry form:** Added the Netlify form attributes, honeypot, HTML5 validation attributes, South African phone and date rules, a budget check, a message counter, `fetch` submission with loading and error states, and a response panel with a reference number, estimated cost and availability.
- **Contact form:** Added phone and message type fields, rebuilt validation, and a compiled email preview with open in email app, copy and edit buttons.
- **JavaScript structure:** Split the old `scripts.js` into `scripts.js`, `interactive.js`, `products.js`, `map.js` and `forms.js` so each page only loads what it needs. Moved form code into `forms.js` and rewrote it.
- **Title tags and meta descriptions:** Rewrote both on every page to include the target keywords and stay within length limits. Set `lang="en-ZA"`.
- **Headings and content:** Changed the homepage `h1` to include the keyword and location, added visually hidden `h2` headings where sections skipped a level, and added short keyword-rich text to the products page.
- **Internal linking:** Added body text links between related pages and breadcrumbs on all inner pages.
- **Structured data and sharing:** Added `Bakery` JSON-LD for both stores, `BreadcrumbList` JSON-LD, canonical links, Open Graph and Twitter tags and a sharing image.
- **Off-page and local SEO:** Added footer social links and local business markup.
- **robots.txt and sitemap.xml:** Created both files for the five pages.
- **Page speed:** Added `defer` to scripts, loaded jQuery and Leaflet only where used, preconnected to CDN hosts, added lazy loading and image dimensions, and added caching headers.
- **Security:** Added `_headers` with a Content Security Policy and other security headers, Subresource Integrity on CDN files, honeypot fields and `rel="noopener noreferrer"` on external links.
- **Footer:** The copyright year is now generated by JavaScript instead of being typed as 2025.
- **Code comments:** Added section comments to all five HTML pages and the stylesheet, and explanatory comments above the main functions in each JavaScript file.

### v2.1.0 - Part 2 Feedback

- **Feedback received:** 93%, with the lecturer's comment "Excellent work!!". No corrections or changes were requested.
- **Code tidy-up:** While moving the Part 2 code into the Part 3 repository I rewrote the code comments in the HTML, CSS and JavaScript files so that each section and the main functions are explained, and replaced typographic dashes in page text with plain hyphens.
- **README:** Reworked this document for Part 3, including the new project overview, file structure and references.

### v2.0.0 - Part 2 Submission

- **Enhanced CSS architecture:** Restructured `styles.css` with a custom properties system for colours, typography scale (7 font sizes), spacing, shadows and transitions.
- **Typography scale:** Applied consistent `font-family`, `font-size`, `font-weight`, `line-height` and `letter-spacing` to all headings and body text.
- **Desktop layout structure:** Applied CSS Grid and Flexbox across all page sections.
- **Visual styles:** Added a box shadow scale, border radius variants, gradient overlays on the hero, page banner and call to action banner, and accent borders on mission cards.
- **Interactive states:** Applied `:hover`, `:focus`, `:active`, `:visited` and `:focus-visible` pseudo-classes.
- **Responsive breakpoints:** Added the 1024px tablet breakpoint and refined the 768px and 480px breakpoints.
- **Relative units:** Replaced pixel font sizes with `rem` through CSS variables and used `%` and `rem` for widths and spacing.
- **Button and product card refinements:** Added hover lift, shadows and transitions.
- **README.md:** Updated with Part 2 details, CSS architecture, breakpoints and screenshot evidence.

### v1.1.0 - Part 1 Feedback Corrections

- **Corrected student information:** Updated the README table with the full student name, module name and group.
- **Nav link spacing:** Increased the gap between desktop nav items from `1.5rem` to `2rem`.
- **Button sizing:** Increased button padding for better touch targets.
- **Footer column layout:** Corrected the tablet footer grid to use `2fr 1fr` instead of stacking too early.

### v1.0.0 - Part 1 Submission

- Initial project setup with the file and folder structure.
- Five HTML pages: index, about, products, enquiry, contact.
- Stylesheet with mobile-first responsive design and CSS custom properties.
- JavaScript for the hamburger navigation and form validation.
- README.md created with full project documentation.

---

## References

Agafonkin, V. 2023. *Leaflet: an open-source JavaScript library for interactive maps*. Available at: [https://leafletjs.com](https://leafletjs.com) [Accessed 3 November 2026].

Duckett, J. 2011. *HTML and CSS: Design and Build Websites*. Indianapolis: John Wiley & Sons.

Google. 2024. *Search Engine Optimization (SEO) Starter Guide*. Available at: [https://developers.google.com/search/docs/fundamentals/seo-starter-guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) [Accessed 3 November 2026].

Google. 2024. *Introduction to robots.txt*. Available at: [https://developers.google.com/search/docs/crawling-indexing/robots/intro](https://developers.google.com/search/docs/crawling-indexing/robots/intro) [Accessed 3 November 2026].

jQuery Foundation. 2024. *jQuery API Documentation*. Available at: [https://api.jquery.com](https://api.jquery.com) [Accessed 3 November 2026].

MDN Web Docs. 2024. *CSS: Cascading Style Sheets*. Available at: [https://developer.mozilla.org/en-US/docs/Web/CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) [Accessed 3 November 2026].

MDN Web Docs. 2024. *Content Security Policy (CSP)*. Available at: [https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) [Accessed 3 November 2026].

MDN Web Docs. 2024. *Fetch API*. Available at: [https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) [Accessed 3 November 2026].

MDN Web Docs. 2024. *Intersection Observer API*. Available at: [https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) [Accessed 3 November 2026].

MDN Web Docs. 2024. *Client-side form validation*. Available at: [https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation) [Accessed 3 November 2026].

MDN Web Docs. 2024. *JavaScript*. Available at: [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [Accessed 3 November 2026].

Netlify. 2024. *Forms setup*. Available at: [https://docs.netlify.com/forms/setup/](https://docs.netlify.com/forms/setup/) [Accessed 3 November 2026].

Netlify. 2024. *Custom headers*. Available at: [https://docs.netlify.com/routing/headers/](https://docs.netlify.com/routing/headers/) [Accessed 3 November 2026].

Nielsen Norman Group. 2023. *Mobile-first design*. Available at: [https://www.nngroup.com](https://www.nngroup.com) [Accessed 3 November 2026].

OpenStreetMap Foundation. 2024. *OpenStreetMap copyright and license*. Available at: [https://www.openstreetmap.org/copyright](https://www.openstreetmap.org/copyright) [Accessed 3 November 2026].

Schema.org. 2024. *Bakery*. Available at: [https://schema.org/Bakery](https://schema.org/Bakery) [Accessed 3 November 2026].

Sitemaps.org. 2024. *Sitemaps XML format*. Available at: [https://www.sitemaps.org/protocol.html](https://www.sitemaps.org/protocol.html) [Accessed 3 November 2026].

The Open Graph Protocol. 2024. *Open Graph protocol*. Available at: [https://ogp.me](https://ogp.me) [Accessed 3 November 2026].

W3C. 2024. *WAI-ARIA Authoring Practices Guide*. Available at: [https://www.w3.org/WAI/ARIA/apg/](https://www.w3.org/WAI/ARIA/apg/) [Accessed 3 November 2026].

W3C. 2024. *HTML: Living Standard*. Available at: [https://html.spec.whatwg.org](https://html.spec.whatwg.org) [Accessed 3 November 2026].
