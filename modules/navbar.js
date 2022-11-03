import showProducts from './appendElements.js';
import { categoryTitle, hamburguerMenu, primaryNav } from './htmlElements.js';

let categories;
let selectedCategory;

const navbarModule = () => {
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

  /*  -- GET CATEGORIES --  */

  (async () => {
    const url = 'https://bsale-api.onrender.com/categories';
    try {
      const resp = await fetch(url, { method: 'GET' });
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

/*  -- GET PRODUCTS WITH CAT. ID --  */

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
