document.addEventListener("DOMContentLoaded", () => {
  const projectLinks = [
    "https://jadnart.com/", // Site E-Commerce
    "https://www.pharma-expo-cameroun.com/", // Site Evènementiel
    "https://infirmiere-liberale-sevran.fr/",  // Site Vitrine
    "https://toucanpropertyphuket.com/", // Site Immobilier
    "https://www.anvuwebdev.com/", // Portfolio
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
      range: [1, 5],
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
      "Site<br>E-Commerce",
      "Site<br>Evènementiel",
      "Site<br>Vitrine",
      "Site<br>Immobilier",
      "Portfolio",
    ];

    const msTitles = new MomentumSlider({
      el: slidersContainer,
      cssClass: "ms--titles",
      range: [0, titles.length - 1],
      rangeContent: function (i) {
        return `<h4>${titles[i]}</h4>`;
      },
      vertical: true,
      reverse: true,
      style: {
        opacity: [0, 1],
      },
      interactive: false,
      customStyles: {
        slides: {
          transition: {
            duration: 500 // durée de la transition en ms
          }
        }
      }
    });

    // Initializing the descriptions slider
    const descriptions = [
      "Shopify<br>html<br>css",
      "wix<br>html<br>css<br>javascript",
      "html<br>css<br>javascript",
      "WordPress<br>html<br>css",
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
      range: [0, 4],
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


  // Ajouter les overlays pour les flèches de swipe avec plus de débogage et de robustesse
setTimeout(() => {
  console.log("Tentative d'ajout des overlays de swipe...");
  
  // Sélectionner tous les slides d'images
  const imageSlides = document.querySelectorAll('.ms--images .ms-slide');
  console.log(`Trouvé ${imageSlides.length} slides d'images`);
  
  if (imageSlides.length === 0) {
    // Solution alternative si la structure DOM est différente
    console.log("Tentative avec un sélecteur alternatif...");
    const altSlides = document.querySelectorAll('.ms-slide');
    console.log(`Sélecteur alternatif: trouvé ${altSlides.length} slides`);
    
    if (altSlides.length > 0) {
      altSlides.forEach((slide, index) => {
        if (!slide.querySelector('.swipe-overlay')) {
          const overlay = document.createElement('div');
          overlay.className = 'swipe-overlay';
          // Force l'affichage sur tous les écrans pour tester
          overlay.style.display = 'block';
          slide.appendChild(overlay);
          console.log(`Overlay ajouté au slide alternatif ${index+1}`);
        }
      });
    }
  } else {
    // Ajouter un overlay à chaque slide
    imageSlides.forEach((slide, index) => {
      // Vérifier si l'overlay n'existe pas déjà
      if (!slide.querySelector('.swipe-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'swipe-overlay';
        // Force l'affichage sur tous les écrans pour tester
        overlay.style.display = 'block';
        slide.appendChild(overlay);
        console.log(`Overlay ajouté au slide ${index+1}`);
      }
    });
  }
  
  // Vérification finale
  setTimeout(() => {
    const allOverlays = document.querySelectorAll('.swipe-overlay');
    console.log(`Vérification finale: ${allOverlays.length} overlays trouvés`);
    
    // Si toujours aucun overlay, essayons de les ajouter directement aux containers d'images
    if (allOverlays.length === 0) {
      const imageContainers = document.querySelectorAll('.ms-slide__image-container');
      console.log(`Tentative sur les conteneurs d'images: ${imageContainers.length} trouvés`);
      
      imageContainers.forEach((container, index) => {
        const overlay = document.createElement('div');
        overlay.className = 'swipe-overlay';
        overlay.style.display = 'block';
        container.appendChild(overlay);
        console.log(`Overlay ajouté au container d'image ${index+1}`);
      });
    }
  }, 1000);
  
}, 3000); // Délai augmenté à 3 secondes


});
