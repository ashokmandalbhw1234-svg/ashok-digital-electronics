// Ashok Digital Electronics — premium UI interactions
// WhatsApp number: 91 + 7739778039
const WHATSAPP_NUMBER = "917739778039";

function openWhatsApp(product) {
  const message = `Namaste Ashok Digital Electronics! Mujhe "${product}" ke baare mein jaankari chahiye. Kripya price aur availability batayein.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
}

document.querySelectorAll("[data-product]").forEach((button) => {
  button.addEventListener("click", () => openWhatsApp(button.dataset.product));
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));
}

const search = document.getElementById("productSearch");
const productCards = [...document.querySelectorAll(".product-card")];
const emptyState = document.getElementById("emptyState");
let activeFilter = "all";

function filterProducts() {
  const term = (search?.value || "").trim().toLowerCase();
  let visible = 0;
  productCards.forEach((card) => {
    const matchesText = card.dataset.name.toLowerCase().includes(term);
    const matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
    const show = matchesText && matchesFilter;
    card.hidden = !show;
    if (show) visible++;
  });
  if (emptyState) emptyState.hidden = visible !== 0;
}
search?.addEventListener("input", filterProducts);
document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    filterProducts();
  });
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
