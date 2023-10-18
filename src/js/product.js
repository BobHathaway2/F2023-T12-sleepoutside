import { getParams, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import productDetails from "./productDetails.mjs";

const dataSource = new ExternalServices();
const productId = getParams("product");
const product = new productDetails(productId, dataSource);
loadHeaderFooter();

product.init();
