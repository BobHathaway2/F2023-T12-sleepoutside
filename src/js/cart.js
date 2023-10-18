import { getLocalStorage, loadHeaderFooter, totalAmount } from "./utils.mjs";
import ShoppingCart from "./shoppingcart.mjs";

loadHeaderFooter();


const cart = new ShoppingCart("so-cart", ".product-list")
cart.renderCartContents();
attachEventListeners();

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <span class="remove-item" data-id="${item.Id}">x</span>
  <p class="cart-card__quantity">qty:${item.quantity} </p>
  <p class="cart-card__list">Price: $${item.ListPrice}</p>
  <p class="cart-card__discount">Discount: $${(item.Discount ?? 0)}</p>
  <p class="cart-card__price">Final: $${item.ListPrice - (item.Discount ?? 0)}</p>
</li>`;

  return newItem;
}

renderCartContents();


// function cartItemTemplate(item) {
//   const newItem = `<li class="cart-card divider">
//   <a href="#" class="cart-card__image">
//     <img
//       src="${item.Image}"
//       alt="${item.Name}"
//     />
//   </a>
//   <a href="#">
//     <h2 class="card__name">${item.Name}</h2>
//   </a>
//   <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//   <span class="remove-item" data-id="${item.Id}">x</span>
//   <p class="cart-card__quantity">qty:${item.quantity}</p>
//   <p class="cart-card__list">Price: $${item.ListPrice}</p>
//   <p class="cart-card__discount">Discount: $${(item.Discount ?? 0)}</p>
//   <p class="cart-card__price">Final: $${item.ListPrice - (item.Discount ?? 0)}</p>
// </li>`;

function adjustCartItem(productId, change) {
  const cartItems = getLocalStorage("so-cart");
  const itemIndex = cartItems.findIndex(item => item.Id === productId);
  if (itemIndex !== -1) {
      if (change === -1 && cartItems[itemIndex].quantity === 1) {
          cartItems.splice(itemIndex, 1);
      } else {
          cartItems[itemIndex].quantity += change;
      }
      localStorage.setItem("so-cart", JSON.stringify(cartItems));
  }
  totalAmount();
  cart = new ShoppingCart("so-cart", ".product-list");
  cart.renderCartContents();
}

function removeProductFromCart(productId) {
  const cartItems = getLocalStorage("so-cart");
  const itemIndex = cartItems.findIndex(item => item.Id === productId);
  if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1);
      localStorage.setItem("so-cart", JSON.stringify(cartItems));
  }
  totalAmount();
  cart = new ShoppingCart("so-cart", ".product-list");
  cart.renderCartContents();
}
window.removeProductFromCart = removeProductFromCart;

function attachEventListeners() {
  const cartContainer = document.querySelector(".product-list");
  cartContainer.addEventListener("click", (e) => {
      const productId = e.target.getAttribute("data-id");
      if (e.target.classList.contains("remove-item")) {
          adjustCartItem(productId, -1);
      } else if (e.target.classList.contains("add-item")) {
          adjustCartItem(productId, +1);
      } else if (e.target.classList.contains("remove-all")) {
        const productIdForRemove = e.target.closest(".cart-card").querySelector(".remove-item").getAttribute("data-id");
        if (typeof window.removeProductFromCart === "function") {
            window.removeProductFromCart(productIdForRemove);
        }
      }
  });
}
