import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";


loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart");
checkout.init();


const submitBtn = document.forms['checkout'];
submitBtn.addEventListener('submit', (event) => {
  event.preventDefault();
   checkout.checkout();
});