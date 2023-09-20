import { getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import productDetails from "./productDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParams("product");
const product = new productDetails(productId, dataSource);
product.init();

// let productArray = [];
// // const dataSource = new ProductData("tents");

// function addProductToCart(product) {
//   let cartContent = getLocalStorage("so-cart");
//   if (cartContent) {
//     productArray = cartContent;
//   }
//   productArray.push(product);
//   setLocalStorage("so-cart", productArray);
// }
// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById('addToCart')
//   .addEventListener('click', addToCartHandler);
