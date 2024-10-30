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
    window.addEventListener("scroll", function () {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // Si l'utilisateur fait défiler vers le bas, masquer la barre de navigation
      navbar.style.top = scrollTop > lastScrollTop ? "-100px" : "0";
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
});
