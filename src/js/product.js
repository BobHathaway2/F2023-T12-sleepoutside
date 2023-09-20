import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

let productArray = [];
const dataSource = new ProductData("tents");

// added qty
function addProductToCart(product) { 
  let cartContent = getLocalStorage("so-cart") || [];
  let existingProduct = cartContent.find(item => item.Id === product.Id);

  if (existingProduct) {
    // If item in cart, add 1 qty
    existingProduct.quantity = (existingProduct.quantity || 1) + 1;
  } else {
    // If item nutt in cart, add qty of 1
    product.quantity = 1;
    cartContent.push(product);
  }

  productArray.push(product);
  setLocalStorage("so-cart", cartContent);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
