import { getLocalStorage } from "./utils.mjs";

const total = document.querySelector(".cart-total");
const cartFooter = document.querySelector(".cart-footer");

function checkCart() {
  const cart = getLocalStorage("so-cart");
  const totalPrice = cart.reduce((accumulator, product) => {
      return accumulator + (product.ListPrice * product.quantity - (product.Discount ?? 0));
  }, 0);

  if(totalPrice > 0){
    total.textContent = `Total: $ ${totalPrice.toFixed(2)}`;}
    else{
      total.style.display = "none";
    }
}

function cartItemTemplate(item) {
    const colorName = item.Colors && item.Colors[0] ? item.Colors[0].ColorName : "N/A";
    
    return `
<li class="cart-card divider">
    <a href="#" class="cart-card__image">
        <img src="${item.Images.PrimaryMedium}" 
            srcset="${item.Images.PrimaryLarge} 800w, 
                    ${item.Images.PrimaryMedium} 500w, 
                    ${item.Images.PrimarySmall} 300w"
            sizes="(min-width: 800px) 800px,
                   (min-width: 500px) 500px,
                   300px" 
            alt="${item.Name}" />
    </a>
    <a href="#">
        <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${colorName}</p>
    <p class="cart-card__list">Price: $${item.ListPrice}</p>
    <p class="cart-card__discount">Discount: $${(item.Discount ?? 0)}</p>
    <p class="cart-card__price">Final: $${item.ListPrice - (item.Discount ?? 0)}</p>
    <div class="adjust">
        <div class="qty-remove">
            <span class="remove-item" data-id="${item.Id}">-</span>
            <p class="cart-card__quantity">${item.quantity}</p>
            <span class="add-item" data-id="${item.Id}">+</span>
        </div>
        <button class="remove-all">Remove</button>
    </div>
</li>`;
}

export default class ShoppingCart {
    constructor(key, parentSelector) {
        this.key = key;
        this.parentSelector = parentSelector;
    }
    renderCartContents() {
        const cartItems = getLocalStorage(this.key);
        if (cartItems) {
            const htmlItems = cartItems.map(cartItemTemplate);
            document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
            checkCart();
        }
    }
}
