import{g as o,s as d,a as c}from"./utils-14f1728a.js";/* empty css              */function i(t){if(t.ok)return t.json();throw new Error("Bad Response")}class e{constructor(r){this.category=r,this.path=`../json/${this.category}.json`}getData(){return fetch(this.path).then(i).then(r=>r)}async findProductById(r){return(await this.getData()).find(s=>s.Id===r)}}function n(t){return`<section class="product-detail"> <h3>${t.Brand.Name}</h3>
    <h2 class="divider">${t.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${t.Image}"
      alt="${t.NameWithoutBrand}"
    />
    <p class="product-card__list">Original Price: $${t.ListPrice}</p>
    <p class="product-card__discount">Discount: $${t.Discount??0}</p>
    <p class="product__color">${t.Colors[0].ColorName}</p>
    <p class="product__description">
    ${t.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${t.Id}">Add to Cart</button>
    </div></section>`}class u{constructor(r,a){this.productId=r,this.product={},this.dataSource=a}async init(){this.product=await this.dataSource.findProductById(this.productId),this.renderProductDetails("main"),document.getElementById("addToCart").addEventListener("click",this.addToCart.bind(this))}addToCart(){this.addProduct(this.product)}addProduct(r){this.productArray||(this.productArray=[]);let a=o("so-cart");a&&(this.productArray=a),this.productArray.push(r),d("so-cart",this.productArray)}renderProductDetails(r){document.querySelector(r).insertAdjacentHTML("afterBegin",n(this.product))}}const h=new e("tents"),l=c("product"),p=new u(l,h);p.init();
