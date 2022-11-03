import showProducts from './appendElements.js';
import { form, searchInput, categoryTitle } from './htmlElements.js';

/* -- EVENT LISTENER INSIDE FUNCTION SO IT CAN BE CALLED ON INDEX AN ADDED RIGHT AWAY -- */
const searchModule = () => {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (searchInput.value === '' || searchInput.value == null) return;
    searchProducts(searchInput.value);
    categoryTitle.innerHTML = searchInput.value;
    searchInput.value = '';
  });
};
const searchProducts = async search => {
  const url = `https://bsale-api.onrender.com/search/${search}`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    showProducts(data);
  } catch (error) {
    console.log(error);
    window.location.href = '/html/error.html';
  }
};
export default searchModule;
