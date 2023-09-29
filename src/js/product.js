import { getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import productDetails from "./productDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const productId = getParams("product");
const dataSource = new ProductData(productId);
const product = new productDetails(productId, dataSource);
product.init();


