import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./shoppingcart.mjs";

loadHeaderFooter();
<<<<<<< HEAD


const cart = new ShoppingCart("so-cart", ".product-list")
cart.renderCartContents();
attachRemoveListeners();

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



=======

const cart = new ShoppingCart("so-cart", ".product-list")
cart.renderCartContents();
attachRemoveListeners();


>>>>>>> d2a9e0344648f7acbb36c1dd948132d33f2a3310
function removeItemFromCart(productId) {
  // Fetch from local storage
  const cartItems = getLocalStorage("so-cart");

  // Find by product ID
  const itemIndex = cartItems.findIndex(item => item.Id === productId);

  // If the item is found, decrement its quantity
  if (itemIndex !== -1 && cartItems[itemIndex].quantity > 1) {
      cartItems[itemIndex].quantity -= 1;
  } else {
      // Remove from cart
      cartItems.splice(itemIndex, 1);
  }

  // Update the cart in local storage with the modified items
  localStorage.setItem("so-cart", JSON.stringify(cartItems));


  // Re-render cart contents
  const cart = new ShoppingCart("so-cart", ".product-list")
  cart.renderCartContents();
  attachRemoveListeners();
}

// Listener for x to remove item from cart
function attachRemoveListeners() {
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach(button => {
      button.addEventListener("click", (e) => {
          const productId = e.target.getAttribute("data-id");
          removeItemFromCart(productId);
      });
  });
}