const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const status = contactForm.querySelector(".form-status");
    const submit = contactForm.querySelector('button[type="submit"]');

    if (submit) {
      submit.disabled = true;
    }
    if (status) {
      status.textContent = "Invio della richiesta in corso...";
    }

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Invio non riuscito.");
      }

      contactForm.reset();
      if (status) {
        status.textContent = "Grazie, la richiesta è stata inviata correttamente.";
      }
    } catch (error) {
      if (status) {
        status.textContent = "Non siamo riusciti a inviare la richiesta. Riprova tra poco o scrivi a josepossidente1977@gmail.com.";
      }
    } finally {
      if (submit) {
        submit.disabled = false;
      }
    }
  });
}
