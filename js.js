const $ = (s) => document.querySelector(s);

document.documentElement.classList.add("js");

const menu = $(".menu");
const links = $(".links");

menu.onclick = () => {
  const isOpen = links.classList.toggle("open");
  menu.setAttribute("aria-expanded", isOpen);
};

links.onclick = () => links.classList.remove("open");

new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("on");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.35 },
).observe($("#bars"));

const form = $("#demo");
const textarea = $("#t");
const inbox = $("#inbox");
const contactForm = $("#contact-form");
const contactSuccess = $("#contact-success");

$("#ctx").textContent =
  "FinanceiroPro, página Relatórios, " + new Date().toLocaleDateString("pt-BR");

if (form && textarea && inbox) {
  form.onsubmit = (event) => {
    event.preventDefault();

    const value = textarea.value.trim();
    if (!value) return;

    const li = document.createElement("li");
    const message = document.createElement("span");
    const status = document.createElement("span");

    message.textContent = value;
    status.className = "pill";
    status.textContent = "Pendente";

    li.append(message, status);

    const empty = inbox.querySelector(".empty");
    if (empty) empty.remove();

    inbox.prepend(li);
    textarea.value = "";
    textarea.focus();
  };
}

const contactSection = document.getElementById("contato");
const contactLinks = document.querySelectorAll('a[href="#contato"]');
const contactCloseButton = document.querySelector(".contact-close");
const contactSuccessButton = document.querySelector(".contact-success__button");
const contactHeading = document.querySelector(".contact-heading h2");

const closeContactSection = () => {
  if (!contactSection) return;
  contactSection.hidden = true;
  contactSection.classList.remove("is-open");
  document.body.style.overflow = "";
  if (contactSuccess) contactSuccess.hidden = true;
  if (contactForm) contactForm.reset();
  if (contactHeading) contactHeading.textContent = "Fale com a MovSup";
  if (contactForm) contactForm.style.display = "grid";
  contactSection.classList.remove("show-success");
};

const openContactSection = () => {
  if (!contactSection) return;
  contactSection.hidden = false;
  contactSection.classList.add("is-open");
  document.body.style.overflow = "hidden";
  if (contactSuccess) contactSuccess.hidden = true;
  if (contactHeading) contactHeading.textContent = "Fale com a MovSup";
  if (contactForm) contactForm.style.display = "grid";
  contactSection.classList.remove("show-success");
  setTimeout(() => {
    contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 0);
};

contactLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openContactSection();
  });
});

if (contactCloseButton) {
  contactCloseButton.addEventListener("click", closeContactSection);
}

if (contactSuccessButton) {
  contactSuccessButton.addEventListener("click", closeContactSection);
}

if (contactForm && contactSuccess) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const submitButton = contactForm.querySelector(".contact-submit");
    const originalLabel = submitButton ? submitButton.textContent : "";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Enviando...";
    }

    const data = Object.fromEntries(new FormData(contactForm));

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/ramon.anpetry@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...data,
            _subject: "Novo contato pelo site da MovSup",
            _template: "table",
            _replyto: data.email,
          }),
        }
      );

      if (!response.ok) throw new Error("Falha no envio");

      contactSuccess.hidden = false;
      contactForm.style.display = "none";
      contactSection.classList.add("show-success");
      if (contactHeading) {
        contactHeading.textContent = "Obrigado por entrar em contato.";
      }
      const successText = contactSuccess.querySelector("p");
      if (successText) {
        successText.textContent = "E-mail enviado. Aguarde a nossa resposta. Agradecemos desde já, MovSup.";
      }
    } catch (error) {
      alert("Não foi possível enviar agora. Tente novamente em instantes.");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalLabel;
      }
    }
  });
}

if (contactSection) {
  contactSection.addEventListener("click", (event) => {
    if (event.target === contactSection) closeContactSection();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && contactSection && !contactSection.hidden) {
    closeContactSection();
  }
});

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeButton = document.querySelector(".lightbox-close");
const triggerButtons = document.querySelectorAll(".mvp-trigger");

const openLightbox = (src, alt) => {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
};

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
};

triggerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openLightbox(button.dataset.src, button.dataset.alt);
  });
});

if (closeButton) {
  closeButton.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox && lightbox.classList.contains("open")) {
    closeLightbox();
  }
});
