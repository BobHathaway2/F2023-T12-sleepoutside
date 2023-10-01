import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";

loadHeaderFooter();

const category = getParams("category");

const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const header = document.querySelector(".categoryName");
const h2element = document.createElement("h2");
h2element.textContent = category.toUpperCase();
header.appendChild(h2element);

const productListing = new ProductListing(category, dataSource, listElement);


productListing.init();


