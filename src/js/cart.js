import { setLocalStorage, getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./shoppingcart.mjs";
import totalAmount from "./superScript.mjs";

loadHeaderFooter();

let cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();
attachRemoveListeners();
attachAddListeners();

function removeItemFromCart(productId) {
  // Fetch from local storage
  const cartItems = getLocalStorage("so-cart");

  // Find by product ID
  const itemIndex = cartItems.findIndex((item) => item.Id === productId);

  // If the item is found, decrement its quantity
  if (itemIndex !== -1 && cartItems[itemIndex].quantity > 1) {
    cartItems[itemIndex].quantity -= 1;
  } else {
    // Remove from cart
    cartItems.splice(itemIndex, 1);
  }

  // Update the cart in local storage with the modified items
  localStorage.setItem("so-cart", JSON.stringify(cartItems));

  totalAmount();

  // Re-render cart contents
  cart = new ShoppingCart("so-cart", ".product-list");
  cart.renderCartContents();
  attachRemoveListeners();
}

// Listener for x to remove item from cart
function attachRemoveListeners() {
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.target.getAttribute("data-id");
      removeItemFromCart(productId);
    });
  });
}

// Function to add an item to the cart based on quantity
function addItemToCart(productId) {
  const cartItems = getLocalStorage("so-cart");
  const itemIndex = cartItems.findIndex(item => item.Id === productId);
  
  if (itemIndex !== -1) {
      cartItems[itemIndex].quantity += 1;
      setLocalStorage("so-cart", cartItems);
      cart = new ShoppingCart("so-cart", ".product-list");
      cart.renderCartContents();
      attachAddListeners();

  }
}
// Listener for + to remove item from cart
function attachAddListeners() {
    const addButtons = document.querySelectorAll(".add-item");
    addButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = e.target.getAttribute("data-id");
            addItemToCart(productId);
        });
    });
}
