import { getLocalStorage } from "./utils.mjs";

const total = document.querySelector(".cart-total");
const cartFooter = document.querySelector(".cart-footer");

function checkCart(){
  let cart = [];
  let currentCartContent = localStorage.getItem("so-cart");
  if (currentCartContent) {
      cart = currentCartContent;
      const products = JSON.parse(cart);
      const totalPrice = products.reduce((accumulator, products) => {
          //return accumulator + products.FinalPrice;
          return accumulator + (products.ListPrice - (products.Discount ?? 0));
        }, 0);
      if(totalPrice >0){total.textContent = `Total: $ ${totalPrice}`;
    }else{
      total.style.display = "none";
    }
      
  }else{
      cartFooter.style.display = "none";
  }
}


function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <span class="remove-item" data-id="${item.Id}">x</span>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__list">Price: $${item.ListPrice}</p>
  <p class="cart-card__discount">Discount: $${(item.Discount ?? 0)}</p>
  <p class="cart-card__price">Final: $${item.ListPrice - (item.Discount ?? 0)}</p>  
</li>`;

  return newItem;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }
  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
    checkCart();
  }
}