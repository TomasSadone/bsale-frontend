const primaryNav = document.querySelector("#navigation");
const hamburguerMenu = document.querySelector("#hamburguer-menu");

hamburguerMenu.addEventListener("click", () => {
  const hamburguerOpen = hamburguerMenu.getAttribute("data-visible");

  if (hamburguerOpen === "false") {
    hamburguerMenu.setAttribute("data-visible", true);
    primaryNav.setAttribute("data-visible", true);
  } else {
    primaryNav.setAttribute("data-visible", false);
    hamburguerMenu.setAttribute("data-visible", false);
  }
});
