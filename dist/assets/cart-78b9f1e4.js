import{g as c}from"./utils-14f1728a.js";/* empty css              */function o(){let t=[];if(localStorage.getItem("so-cart")){t=c("so-cart");const a=t.map(r=>n(r));document.querySelector(".product-list").innerHTML=a.join("")}i()}function n(t){return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${t.Image}"
      alt="${t.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${t.Name}</h2>
  </a>
  <p class="cart-card__color">${t.Colors[0].ColorName}</p>
  <span class="remove-item" data-id="${t.Id}">x</span>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${t.FinalPrice}</p>
</li>`}o();function s(t){const e=c("so-cart"),a=e.findIndex(r=>r.Id===t);a!==-1&&e[a].quantity>1?e[a].quantity-=1:e.splice(a,1),localStorage.setItem("so-cart",JSON.stringify(e)),o()}function i(){document.querySelectorAll(".remove-item").forEach(e=>{e.addEventListener("click",a=>{const r=a.target.getAttribute("data-id");s(r)})})}
