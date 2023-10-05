import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";


loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart");
checkout.init();


const submitBtn = document.forms["checkout"];
submitBtn.addEventListener("submit", (event) => {
  event.preventDefault();
   checkout.checkout();
});

document.querySelector("#zip").addEventListener("blur", function() {
  document.querySelector("#shipping").style.display = "block";
  document.querySelector("#tax").style.display = "block";
  document.querySelector("#total").style.display = "block";
});
