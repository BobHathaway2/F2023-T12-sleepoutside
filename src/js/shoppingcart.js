const total = document.querySelector(".cart-total");
const cartFooter = document.querySelector(".cart-footer");
const tentPrice = document.querySelectorAll("cart-card__price");

function checkCart() {
  const cart = localStorage.getItem("so-cart");
  const products = JSON.parse(cart);

  if (cart !== null) {
    const totalPrice = products.reduce((accumulator, products) => {
      return accumulator + products.FinalPrice;
    }, 0);
    total.textContent = `Total: $ ${totalPrice}`;
  } else {
    cartFooter.style.display = "none";
  }
}

window.addEventListener("load", checkCart);
