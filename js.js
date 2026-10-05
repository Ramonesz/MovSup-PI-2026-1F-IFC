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

$("#ctx").textContent =
  "FinanceiroPro, página Relatórios, " + new Date().toLocaleDateString("pt-BR");

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
