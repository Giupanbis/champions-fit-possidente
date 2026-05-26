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
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const nome = data.get("nome") || "";
    const cognome = data.get("cognome") || "";
    const email = data.get("email") || "";
    const telefono = data.get("telefono") || "";
    const note = data.get("note") || "";
    const status = contactForm.querySelector(".form-status");

    const subject = encodeURIComponent("Richiesta consulenza gratuita Champion's Fit");
    const bodyText = encodeURIComponent(
      `Nome: ${nome} ${cognome}\nE-mail: ${email}\nTelefono: ${telefono}\n\nNote:\n${note}`
    );

    if (status) {
      status.textContent = "Perfetto, si apre il tuo client e-mail con il messaggio già pronto.";
    }

    window.location.href = `mailto:josepossidente1977@gmail.com?subject=${subject}&body=${bodyText}`;
  });
}
