import { cardsContainer, main } from './htmlElements.js';

/* -- REFRESHES EVERY PRODUCT SHOWN EACH TIME IT RECIEVES NEW DATA -- */
const showProducts = products => {
  cleanCurrentElements();

  if (products.length === 0) {
    handleNoProductsFound();
  }
  products.forEach(product => {
    appendProducts(product);
  });
};

const cleanCurrentElements = () => {
  cardsContainer.innerHTML = '';
  const noProductsTitle = document.getElementById('no-elements-message');
  noProductsTitle && noProductsTitle.remove();
};

const appendProducts = product => {
  const { url_image, name, price, discount } = product;
  const nodeContainer = createContainer();
  const nodeImg = createImg(url_image);
  const nodeTitle = createTitle(name);
  const nodePrice = createPrice(price, discount);
  nodeContainer.append(nodeImg);
  nodeContainer.append(nodeTitle);
  nodeContainer.append(nodePrice);
  return cardsContainer.append(nodeContainer);
};

const createContainer = () => {
  const container = document.createElement('div');
  container.setAttribute('class', 'product-card');
  return container;
};

const createImg = url_image => {
  const img = document.createElement('img');
  if (url_image === '' || url_image === null) {
    img.setAttribute('src', './media/generic-image.svg');
  } else {
    img.setAttribute('src', url_image);
  }
  img.setAttribute('alt', 'product');
  return img;
};

const createTitle = name => {
  const title = document.createElement('h2');
  title.innerHTML = name;
  return title;
};

const createPrice = (price, discount) => {
  const priceContainer = document.createElement('div');
  const nodePrice = document.createElement('span');
  nodePrice.innerHTML = `$${price}`;
  const nodeDiscount = document.createElement('span');
  nodeDiscount.innerHTML = ` ${discount}% OFF!!`;
  nodeDiscount.setAttribute('class', 'fw700');
  priceContainer.append(nodePrice);
  if (discount > 0) {
    priceContainer.append(nodeDiscount);
  }
  return priceContainer;
};

const handleNoProductsFound = () => {
  const title = document.createElement('h1');
  title.innerHTML = 'Ningún producto coincide con tu búsqueda';
  title.setAttribute('id', 'no-elements-message');
  main.append(title);
};

export default showProducts;
