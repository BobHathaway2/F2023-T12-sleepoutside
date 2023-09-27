import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { getLocalStorage } from "./utils.mjs";

const productData = new ProductData("tents");

const productListElement = document.getElementById("product-list");
const productListing = new ProductListing("tents", productData, productListElement);
productListing.init();


export default function totalAmount() {
    const store = getLocalStorage("so-cart");
    const cartAmount = store.map((x) => x.quantity).reduce((x, y) => x+y,0)
    let total = document.getElementById("cartAmount")
    total.innerHTML = cartAmount;
    
};

totalAmount();
