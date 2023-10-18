import { getLocalStorage, alertMessage, showToast } from "./utils.mjs";
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
    const simplifiedItems = items.map(item => ({
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: item.quantity,
    }));
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
        
try {
    this.list = getLocalStorage(this.key);
} catch (error) {
    console.error("Error retrieving items from local storage:", error);
    this.list = [];
}
        if (this.list.length > 0) {
          this.calculateSumm();
          this.calculateOrderTotal();
        }
    }

    calculateSumm(){
        const totalItemsElement = document.querySelector("#itemTotal");
        const amount = this.list.map((item) => item.ListPrice * item.quantity);
        this.itemTotal = amount.reduce((sum, item) => sum + item); 
        const itemAmount = this.list.reduce((sum, item) => sum + item.quantity, 0);
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
        json.items = this.list;
      if (!json || !json.items || json.items.length === 0) {
          console.error("Invalid checkout data or empty cart.");
          return;
      }
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        console.log("Attempting to submit checkout data:", json);
        try {
          const data = await services.checkout(json);
          if (data.orderId) {
            console.log("Checkout submitted successfully:", data);
            alertMessage(`Order Processing...`);
            setTimeout(() => {
              showToast("You will be redirected in 10 seconds.");
            }, 5000);
              setTimeout(() => {
                  location.assign("../checkout/success.html");
              }, 15000);


            localStorage.clear();
          } else {
            console.log("Checkout submission failed. Received:", data);
            for (let key in data) {
              if (Object.prototype.hasOwnProperty.call(data, key)) {
                  alertMessage(`Error: ${data[key]}`);
              }
            }
          }
        } catch (err) {
          console.log("Unexpected error during checkout.", err);
          alertMessage("An unexpected error occurred.");
            setTimeout(() => {
                location.assign("../checkout/failed.html");
            }, 15000);
        }
    }}
