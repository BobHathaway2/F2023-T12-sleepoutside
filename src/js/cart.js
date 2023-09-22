import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  let cartItems = [];
  let currentCartContent = localStorage.getItem("so-cart");
  if (currentCartContent) {
    cartItems = getLocalStorage("so-cart");
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  }
  attachRemoveListeners();
}

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
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();


// Function to remove an item from the cart based on quantity
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
  renderCartContents();
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
