document.addEventListener("DOMContentLoaded", () => {
  const h1Element = document.getElementById("typewriter-h1");
  const cursorElement = document.querySelector(".cursor");

  const h1TextBefore = "développeur";
  const h1TextAfter = "développeuse web";

  let h1Index = 0;
  let currentTextH1 = "";
  let h1Phase = "writing";

  if (h1Element && cursorElement) {
    function typeWriter() {
      console.log(`Phase: ${h1Phase}`);

      if (h1Phase === "writing") {
        if (h1Index < h1TextBefore.length) {
          currentTextH1 += h1TextBefore.charAt(h1Index);
          h1Element.childNodes[0].textContent = currentTextH1;
          h1Index++;
        } else {
          h1Phase = "deleting";
        }
      } else if (h1Phase === "deleting") {
        if (h1Index > 9) {
          currentTextH1 = currentTextH1.substring(0, h1Index);
          h1Element.childNodes[0].textContent = currentTextH1;
          h1Index--;
        } else {
          h1Phase = "adding";
          h1Index = 10;
        }
      } else if (h1Phase === "adding") {
        if (h1Index < h1TextAfter.length) {
          currentTextH1 = h1TextAfter.substring(0, h1Index + 1);
          h1Element.childNodes[0].textContent = currentTextH1;
          h1Index++;
        } else {
          h1Phase = "completed";
        }
      }

      if (h1Phase !== "completed") {
        setTimeout(typeWriter, 120);
      }
    }

    typeWriter();
  }

  // Sélectionnez le bouton burger et le menu
  const burgerMenu = document.getElementById("burgerMenu");
  const navBar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-menu li a");

  // Ajouter un événement pour basculer la classe "active"
  if (burgerMenu && navBar) {
    burgerMenu.addEventListener("click", () => {
      navBar.classList.toggle("active");
    });
  }
  // Fermer le menu burger lorsque l'utilisateur clique sur un lien de navigation
  if (navLinks.length && navBar && navLinks) {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navBar.classList.remove("active");
      });
    });
  }

  // Fonction sombre et clair
  const checkbox = document.getElementById("checkbox");
  const bodyElement = document.body;

  if (checkbox) {
    // Vérifiez si un thème est déjà défini dans le localStorage
    const currentTheme = localStorage.getItem("theme") || "dark-theme";
    bodyElement.classList.add(currentTheme);
    checkbox.checked = currentTheme === "light-theme";

    checkbox.addEventListener("change", () => {
      const newTheme = checkbox.checked ? "light-theme" : "dark-theme";
      bodyElement.classList.remove("light-theme", "dark-theme");
      bodyElement.classList.add(newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }

  // Fonction affichage navbar au scroll
  let lastScrollTop = 0;
  const navbar = document.querySelector(".navbar");

  if (navbar) {
    navbar.style.transition = "transform 0.4s ease";

    window.addEventListener("scroll", function () {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // Si l'utilisateur fait défiler vers le bas, masquer la barre de navigation
      navbar.style.transform =
        scrollTop > lastScrollTop ? "translateY(-100%)" : "translateY(0)";
      lastScrollTop = scrollTop;
    });
  }

  // Fonction pour le bouton plus d'info smooth scroll
  const smoothScrollElements = document.querySelectorAll(
    "#about-btn, .nav-menu a"
  );

  smoothScrollElements.forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();

      const targetId = element.getAttribute("href");

      const targetElement =
        targetId && targetId.startsWith("#")
          ? document.querySelector(targetId)
          : null;
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  const blocks = document.querySelectorAll(".block");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll("h2, p").forEach((el) => {
            el.classList.add("visible-p");
          });
          observer.unobserve(entry.target); // Une fois visible, on n'a plus besoin de l'observer
        }
      });
    },
    {
      threshold: 0.1, // Lorsque 10% de l'élément est visible
    }
  );

  blocks.forEach((block) => {
    observer.observe(block);
  });

  // Fonction pour retourner les cards
  const cardContainers = document.querySelectorAll(".quality-container");

  // Ajouter l'événement de clic à chaque conteneur de carte
  cardContainers.forEach((cardContainer) => {
    cardContainer.addEventListener("click", () => {
      cardContainer.classList.toggle("flip");
    });
  });

  // Ajouter l'événement de défilement pour cacher les versos des cartes retournées
  window.addEventListener("scroll", () => {
    cardContainers.forEach((cardContainer) => {
      if (cardContainer.classList.contains("flip")) {
        cardContainer.classList.remove("flip");
      }
    });
  });


  // Gestionnaire d'événements pour les flèches
  const handleArrowClick = (direction) => {
    const currentIndex = msImages.index;
    const total = msImages.slidesLength;
    let newIndex;

    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : total - 1;
    } else {
      newIndex = currentIndex < total - 1 ? currentIndex + 1 : 0;
    }

    msImages.select(newIndex);
    updateProgress(newIndex);
  };

  // Événements des flèches
  arrowsContainer.querySelector(".arrow--prev").addEventListener("click", () => handleArrowClick('prev'));
  arrowsContainer.querySelector(".arrow--next").addEventListener("click", () => handleArrowClick('next'));

  // Initialisation de l'indicateur de progression
  updateProgress(0);

  // Support du swipe sur mobile
  let touchstartX = 0;
  let touchendX = 0;

  slidersContainer.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
  }, false);

  slidersContainer.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);

  const handleSwipe = () => {
    const swipeThreshold = 50; // Seuil minimum pour détecter un swipe
    const swipeDistance = touchendX - touchstartX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        handleArrowClick('prev');
      } else {
        handleArrowClick('next');
      }
    }
  };


  /* Formulaire de contact */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const name = document.getElementById("name")?.value;
      const email = document.getElementById("email")?.value;
      const subject = document.getElementById("subject")?.value;
      const message = document.getElementById("message")?.value;

      if (!name || !email || !subject || !message) {
        alert("Veuillez remplir tous les champs.");
        return;
      }

      if (!validateEmail(email)) {
        alert("Veuillez saisir une adresse email valide.");
        return;
      }

      // Envoi des données via Formspree
      try {
        const response = await fetch("https://formspree.io/f/xgveaeva", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, subject, message }),
        });

        if (response.ok) {
          alert("Votre message a été envoyé avec succès !");
          contactForm.reset();
        } else {
          alert("Erreur lors de l'envoi. Veuillez réessayer.");
        }
      } catch (error) {
        console.error("Erreur :", error);
        alert("Une erreur s'est produite. Veuillez réessayer plus tard.");
      }
    });
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  /* Défilement dynamique du texte #message */
  document.getElementById("message").addEventListener("input", function () {
    this.scrollTop = this.scrollHeight;
  });

  
//Bannière Cookies RGPD 
const cookieBanner = document.getElementById('cookieConsent');
const acceptButton = document.getElementById('acceptCookies');

if (cookieBanner && !localStorage.getItem('cookieAccepted')) {
    setTimeout(() => {
        cookieBanner.classList.add('show');
    }, 2000);
}

if (acceptButton) {
    acceptButton.addEventListener('click', () => {
        localStorage.setItem('cookieAccepted', 'true');
        cookieBanner.classList.remove('show');
    });
}

/* Affichage de l'email sécurisé page RGPD */
document.querySelectorAll('.email-protect').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const encoded = JSON.parse(this.dataset.mail);
        const email = String.fromCharCode(...encoded);
        this.href = 'mailto:' + email;
        this.textContent = email;
    });

});

});
