import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";

loadHeaderFooter();

const category = getParams("category");
const productData = new ProductData();

const productListElement = document.getElementById("product-list");
const productListing = new ProductListing(category, productData, productListElement);
productListing.init();
