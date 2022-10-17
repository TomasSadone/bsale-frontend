const primaryNav = document.querySelector("#navigation");
const hamburguerMenu = document.querySelector("#hamburguer-menu");
const categoryTitle = document.querySelector("#category-title");
const cardsContainer = document.querySelector("#cards-container");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector("#form");
const main = document.querySelector("#main");
// let navItems = [];

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
  const url = "https://bsale-api.onrender.com/categories";
  try {
    const resp = await fetch(url, { method: "GET" });
    const data = await resp.json();
    categories = data;
    selectedCategory = categories[0];
    /*  -- ADD CATEGORIES TO NAVBAR --  */
    appendCategories(categories);
    /*  -- GET PRODUCTS FROM INITIAL CATEGORY --  */
    getCategoryProducts(selectedCategory);
    /*  -- SET INITIAL CATEGORY TITLE --  */
    categoryTitle.innerHTML = selectedCategory.name;
  } catch (err) {
    window.location.href = "/html/error.html";

    console.error(err);
  }
})();
/*  -- POPULATE CATEGORIES --  */
const appendCategories = categories => {
  categories.forEach(category => {
    const li = document.createElement("li");
    li.innerHTML = category.name;
    li.setAttribute("class", "nav-item pointer fw500 uppercase");
    li.setAttribute("id", "nav-item");
    primaryNav.append(li);
  });
};

/*  -- NAV ITEMS ONCLICK --  */

document.addEventListener("click", function (e) {
  if (e.target && e.target.id == "nav-item") {
    const thisCategory = categories.find(category => {
      return category.name === e.target.innerHTML;
    });
    selectedCategory = thisCategory;
    categoryTitle.innerHTML = selectedCategory.name;
    getCategoryProducts(thisCategory);
  }
});

/*  -- GET PRODUCTS WITH CAT. ID --  */

const getCategoryProducts = async category => {
  const url = `https://bsale-api.onrender.com/category/${category.id}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    showProducts(data);
  } catch (error) {
    console.log(error);
    // window.location.href = "/html/error.html";
  }
};

/*  -- GET PRODUCTS FROM SEARCH --  */

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (searchInput.value === "" || searchInput.value == null) return;
  searchProducts(searchInput.value);
  categoryTitle.innerHTML = searchInput.value;
  searchInput.value = "";
});

const searchProducts = async search => {
  const url = `https://bsale-api.onrender.com/search/${search}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    showProducts(data);
  } catch (error) {
    window.location.href = "/html/error.html";
  }
};

/*  -- GENERATE AND APPEND DESIRED PRODUCTS CARD --  */
//ver lo de las img rotas

const showProducts = products => {
  cleanCurrentElements();

  if (products.length === 0) {
    handleNoProductsFound();
  }
  products.forEach(product => {
    appendProducts(product);
  });
};

const appendProducts = product => {
  const { url_image, name, price } = product;
  const nodeContainer = createContainer();
  const nodeImg = createImg(url_image);
  const nodeTitle = createTitle(name);
  const nodePrice = createPrice(price);
  nodeContainer.append(nodeImg);
  nodeContainer.append(nodeTitle);
  nodeContainer.append(nodePrice);
  return cardsContainer.append(nodeContainer);
};

const createContainer = () => {
  const container = document.createElement("div");
  container.setAttribute("class", "product-card");
  return container;
};

const createImg = url_image => {
  const img = document.createElement("img");
  if (url_image === "" || url_image === null) {
    img.setAttribute("src", "./media/generic-image.svg");
  } else {
    img.setAttribute("src", url_image);
  }
  img.setAttribute("alt", "product");
  return img;
};

const createTitle = name => {
  const title = document.createElement("h2");
  title.innerHTML = name;
  return title;
};

const createPrice = (price, discount) => {
  const priceContainer = document.createElement("div");
  const nodePrice = document.createElement("span");
  nodePrice.innerHTML = `$${price}`;
  const nodeDiscount = document.createElement("span");
  nodeDiscount.innerHTML = ` ${discount}% OFF!!`;
  nodeDiscount.setAttribute("class", "fw700");
  priceContainer.append(nodePrice);
  if (discount > 0) {
    priceContainer.append(nodeDiscount);
  }
  return priceContainer;
};

const cleanCurrentElements = () => {
  cardsContainer.innerHTML = "";
  const noProductsTitle = document.getElementById("no-elements-message");
  noProductsTitle && noProductsTitle.remove();
};

const handleNoProductsFound = () => {
  const title = document.createElement("h1");
  title.innerHTML = "Ningún producto coincide con tu búsqueda";
  title.setAttribute("id", "no-elements-message");
  main.append(title);
};
