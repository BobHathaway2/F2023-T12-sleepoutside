import { getLocalStorage } from "./utils.mjs";





export default function totalAmount(){      
    const array = getLocalStorage("so-cart")
    const cartAmount = document.getElementById("cartAmount");
    cartAmount.innerHTML = array.map((x) => x.quantity).reduce((x, y) => x + y, 0)   

}
