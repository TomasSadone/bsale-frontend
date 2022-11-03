import showProducts from './appendElements.js';
import { categoryTitle, hamburguerMenu, primaryNav } from './htmlElements.js';

let categories;
let selectedCategory;

/* -- EVENT LISTENER AND DATA FETCH INSIDE FUNCTION -- */
/* -- SO IT CAN BE CALLED ON INDEX AN ADDED RIGHT AWAY -- */
const navbarModule = () => {
  /* -- SO HAMBURGUER MENU WORKS -- */
  hamburguerMenu.addEventListener('click', () => {
    const hamburguerOpen = hamburguerMenu.getAttribute('data-visible');
    if (hamburguerOpen === 'false') {
      hamburguerMenu.setAttribute('data-visible', true);
      primaryNav.setAttribute('data-visible', true);
    } else {
      primaryNav.setAttribute('data-visible', false);
      hamburguerMenu.setAttribute('data-visible', false);
    }
  });

  /*  -- NAV ITEMS ONCLICK --  */
  /*  -- DONE THIS WAY BEACAUSE THEY ARE ADDED TO THE DOM AFTER JS LOADS --  */
  /*  -- SO IT WOULDN'T BE POSSIBLE TO BRING THEM WITH QUERYSELECTOR --  */
  document.addEventListener('click', function (e) {
    if (e.target && e.target.id == 'nav-item') {
      const thisCategory = categories.find(category => {
        return category.name === e.target.innerHTML;
      });
      selectedCategory = thisCategory;
      categoryTitle.innerHTML = selectedCategory.name;
      getCategoryProducts(thisCategory);
    }
  });

  /*  -- GET CATEGORIES RIGHT AWAY --  */
  (async () => {
    const url = 'https://bsale-api.onrender.com/categories';
    try {
      const resp = await fetch(url, { method: 'GET' });
      const data = await resp.json();
      categories = data;
      selectedCategory = categories[0];
      appendCategories(categories);
      getCategoryProducts(selectedCategory);
      categoryTitle.innerHTML = selectedCategory.name;
    } catch (err) {
      console.error(err);
      window.location.href = '/html/error.html';
    }
  })();
};
/*  -- POPULATE CATEGORIES --  */
const appendCategories = categories => {
  categories.forEach(category => {
    const li = document.createElement('li');
    li.innerHTML = category.name;
    li.setAttribute('class', 'nav-item pointer fw500 uppercase');
    li.setAttribute('id', 'nav-item');
    primaryNav.append(li);
  });
};

/*  -- GET AND DISPLAY PRODUCTS ON PASSED CATEGORY --  */
const getCategoryProducts = async category => {
  const url = `https://bsale-api.onrender.com/category/${category.id}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    showProducts(data);
  } catch (error) {
    console.log(error);
    window.location.href = '/html/error.html';
  }
};

export default navbarModule;
