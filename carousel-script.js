document.addEventListener("DOMContentLoaded", () => {
  const projectLinks = [
    "https://link-to-project-1.com", // Site Vitrine
    "https://toucanpropertyphuket.com/", // Site Immobilier
    "https://link-to-project-3.com", // Site E-Commerce
    "https://link-to-project-4.com", // Portfolio
  ];

  // Code d'initialisation des sliders
  (function () {
    const slidersContainer = document.querySelector(".sliders-container");
    const pagination = document.querySelector(".pagination");

    if (!pagination || !slidersContainer) {
      console.error("Pagination or Sliders Container not found!");
      return;
    }

    const paginationItems = Array.from(pagination.children);
    if (paginationItems.length === 0) {
      console.error("No pagination items found!");
      return;
    }

    // Initializing the numbers slider
    const msNumbers = new MomentumSlider({
      el: slidersContainer,
      cssClass: "ms--numbers",
      range: [1, 4],
      rangeContent: function (i) {
        return "0" + i;
      },
      style: {
        transform: [{ scale: [0.4, 1] }],
        opacity: [0, 1],
      },
      interactive: false,
    });

    // Initializing the titles slider
    const titles = [
      "Site Vitrine",
      "Site<br>Immobilier",
      "Site<br>E-Commerce",
      "Portfolio",
    ];

    const msTitles = new MomentumSlider({
      el: slidersContainer,
      cssClass: "ms--titles",
      range: [0, 3],
      rangeContent: function (i) {
        return `<h4>${titles[i]}</h4>`;
      },
      vertical: true,
      reverse: true,
      style: {
        opacity: [0, 1],
      },
      interactive: false,
    });

    // Initializing the descriptions slider
    const descriptions = [
      "html<br>css<br>javascript",
      "WordPress",
      "html<br>css<br>javascript",
      "html<br>css<br>javascript",
    ];

    const msDescriptions = new MomentumSlider({
      el: slidersContainer,
      cssClass: "ms--descriptions",
      range: [0, descriptions.length - 1],
      rangeContent: function (i) {
        return `<p>${descriptions[i]}</p>`;
      },
      vertical: true,
      reverse: true,
      style: {
        opacity: [0, 1],
      },
      interactive: false,
    });

    // Initializing the links slider
    const msLinks = new MomentumSlider({
      el: slidersContainer,
      cssClass: "ms--links",
      range: [0, projectLinks.length - 1],
      rangeContent: function (i) {
        console.log(`Setting link for project ${i + 1}: ${projectLinks[i]}`);
        return `<a href="${projectLinks[i]}" target="_blank" class="ms-slide__link">Voir Le Projet</a>`;
      },
      vertical: true,
      interactive: true,
    });

    // Initializing the images slider
    const msImages = new MomentumSlider({
      el: slidersContainer,
      cssClass: "ms--images",
      range: [0, 3],
      rangeContent: function () {
        return '<div class="ms-slide__image-container"><div class="ms-slide__image"></div></div>';
      },
      sync: [msNumbers, msTitles, msDescriptions, msLinks],
      style: {
        ".ms-slide__image": {
          transform: [{ scale: [1.5, 1] }],
        },
      },
      change: function (newIndex, oldIndex) {
        if (typeof oldIndex !== "undefined") {
          paginationItems[oldIndex].classList.remove(
            "pagination__item--active"
          );
        }
        paginationItems[newIndex].classList.add("pagination__item--active");
      },
    });

    // Select corresponding slider item when a pagination button is clicked
    pagination.addEventListener("click", function (e) {
      if (e.target.matches(".pagination__button")) {
        const index = paginationItems.indexOf(e.target.parentNode);
        msImages.select(index);
      }
    });
  })();
});
