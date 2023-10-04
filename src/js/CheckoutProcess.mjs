import { getLocalStorage } from "./utils.mjs";
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

        this.calculateSumm();
        this.calculateOrderTotal();
        this.checkout();
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
        }catch(err){
            console.log(err);
        }
    }

}