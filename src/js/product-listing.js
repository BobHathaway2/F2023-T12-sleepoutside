import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
// import totalAmount from "./superScript.mjs";

loadHeaderFooter();
const productData = new ProductData("tents");

const productListElement = document.getElementById("product-list");
const productListing = new ProductListing("tents", productData, productListElement);
productListing.init();
