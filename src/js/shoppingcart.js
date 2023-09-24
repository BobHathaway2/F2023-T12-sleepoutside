const total = document.querySelector(".cart-total");
const cartFooter = document.querySelector(".cart-footer");
const tentPrice = document.querySelectorAll("cart-card__price")

export function checkCart(){
    let cart = [];
    let currentCartContent = localStorage.getItem("so-cart");
    if (currentCartContent) {
        cart = currentCartContent;
        const products = JSON.parse(cart);
        const totalPrice = products.reduce((accumulator, products) => {
            return accumulator + products.FinalPrice;
          }, 0);

        total.textContent = `Total: $ ${totalPrice}`;
    }else{
        cartFooter.style.display = "none";
    }
}

window.addEventListener("load", checkCart);
