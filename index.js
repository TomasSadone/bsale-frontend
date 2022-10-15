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

let categories;
let selectedCategory;

/*  -- GET CATEGORIES --  */

(async () => {
  const url = "http://localhost:3500/categories";
  try {
    const resp = await fetch(url, { method: "GET" });
    const data = await resp.json();
    console.log(data);
    categories = data;
    selectedCategory = categories[0];
    appendCategories(categories);
    /*  -- GET PRODUCTS FROM INITIAL CATEGORY --  */
    getCategoryProducts(selectedCategory);
  } catch (err) {
    console.error(err);
  }
})();

const getCategoryProducts = async category => {
  const url = `http://localhost:3500/category/${category.id}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data);
  } catch (error) {}
};

const appendCategories = categories => {
  categories.forEach(category => {
    const li = document.createElement("li");
    li.innerHTML = category.name;
    primaryNav.append(li);
  });
};
