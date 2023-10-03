import { getLocalStorage } from "./utils.mjs";




export default class CheckoutProcess{
    constructor(key, outputSelector){
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init(){
        this.list = getLocalStorage(this.key);
        console.log(list);
        this.calculateSumm();
    }

    calculateSumm(){
        const subTotal = document.querySelector(this.outputSelector + "#subTotal");
        const totalItemsElement = document.querySelector(this.outputSelector + "#itemTotal");
        totalItemsElement.innerText = this.list.length;

        const amount = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amount.reduce((sum, item) => sum + item);
        subTotal.innerText = `Subtotal: $` + this.itemTotal;



    }

}