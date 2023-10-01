import { getParams, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import productDetails from "./productDetails.mjs";

const dataSource = new ProductData();
const productId = getParams("product");
const product = new productDetails(productId, dataSource);
loadHeaderFooter();

product.init();
