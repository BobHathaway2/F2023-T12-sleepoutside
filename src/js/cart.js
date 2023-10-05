import { getLocalStorage, loadHeaderFooter, totalAmount, setLocalStorage } from "./utils.mjs";
import ShoppingCart from "./shoppingcart.mjs";

loadHeaderFooter();

let cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();
attachEventListeners();

// Summary header of the code goes here
function removeItemFromCart(productId) {
  const cartItems = getLocalStorage("so-cart");
  const itemIndex = cartItems.findIndex((item) => item.Id === productId);
  if (itemIndex !== -1 && cartItems[itemIndex].quantity > 1) {
    cartItems[itemIndex].quantity -= 1;
  } else {
    cartItems.splice(itemIndex, 1);
  }
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  totalAmount();
  cart = new ShoppingCart("so-cart", ".product-list");
  cart.renderCartContents();
}

// Summary header of the code goes here
function addItemToCart(productId) {
  const cartItems = getLocalStorage("so-cart");
  const itemIndex = cartItems.findIndex(item => item.Id === productId);
  if (itemIndex !== -1) {
      cartItems[itemIndex].quantity += 1;
      setLocalStorage("so-cart", cartItems);
  }
  cart = new ShoppingCart("so-cart", ".product-list");
  cart.renderCartContents();
}

// Summary header of the code goes here
function attachEventListeners() {
  const cartContainer = document.querySelector(".product-list");
  cartContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
      const productId = e.target.getAttribute("data-id");
      removeItemFromCart(productId);
    } else if (e.target.classList.contains("add-item")) {
      const productId = e.target.getAttribute("data-id");
      addItemToCart(productId);
    }
  });
}
