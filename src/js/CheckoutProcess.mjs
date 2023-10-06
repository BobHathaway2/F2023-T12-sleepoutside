import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();


function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
    const simplifiedItems = items.map((item) => {
      return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1,
      };
    });
    return simplifiedItems;
  }

export default class CheckoutProcess{
    constructor(key){
        this.key = key;
        this.list = [];
        this.itemTotal = 0;
        this.tax = 0;
        this.shipping = 0;
        this.orderTotal = 0;
    }

    init(){
        this.list = getLocalStorage(this.key);
        if (this.list.length > 0) {
          this.calculateSumm();
          this.calculateOrderTotal();
        }
    }

    calculateSumm(){
        const totalItemsElement = document.querySelector("#itemTotal");
        const amount = this.list.map((item) => item.ListPrice * item.quantity);
        this.itemTotal = amount.reduce((sum, item) => sum + item); 
        
        const itemAmount = this.list.length;
        totalItemsElement.innerText = `Subtotal (${itemAmount}): $${this.itemTotal.toFixed(2)}`;
    }

    calculateOrderTotal(){
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.orderTotal = (
            parseFloat(this.itemTotal) + 
            parseFloat(this.shipping) + 
            parseFloat(this.tax)  
        ).toFixed(2);

        this.displayOrderInfo();
    }

    displayOrderInfo(){
        const shipping = document.querySelector("#shipping");
        const tax = document.querySelector("#tax");

        const orderTotal = document.querySelector("#total");

        shipping.innerText = `Shipping: $${this.shipping}`;
        tax.innerText = `Tax: $${this.tax}`;
        orderTotal.innerText = `Total: $${this.orderTotal}`;

    }

    async checkout(){
        const formElement = document.forms["checkout"];

        const json = formDataToJSON(formElement);

        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        console.log(json);
        try{
            const res = await services.checkout(json);
            
            console.log(res);
            setLocalStorage("so-cart", []);
            document.location.href = './success.html';
        }catch(err){
            console.log(err);
        }
    }

}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  // setTimeout(function () {
  //   main.removeChild(alert);
  // }, duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}