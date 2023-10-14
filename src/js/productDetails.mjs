import { setLocalStorage, getLocalStorage, totalAmount, alertMessage } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    ${showExtraImages(product.Images.ExtraImages)}
    <p class="product-card__list">Original Price: $${product.ListPrice}</p>
    <p class="product-card__discount">Discount: $${(product.Discount ?? 0)}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

function showExtraImages(images){
  let response = "<div class='slideshow-container'>";
  
  for (let i = 0; i < images.length; i++) {
    response += "<div class='mySlides fade'>";
    response += "<div class='numbertext'>" + (i+1) + " / " + images.length + "</div>";
    response += "<img src='" + images[i].Src + "' style='width:100%'/>";
    response += "<div class='text'>" + images[i].Title + "</div>";
    response += "</div>";
  }

  response +="<a class='prev' onclick='plusSlides(-1)'>&#10094;</a>";
  response += "<a class='next' onclick='plusSlides(1)'>&#10095;</a>";

  response +="<div style='text-align:center'>";
  for (let i = 0; i < images.length; i++) {
    response +="<span class='dot' onclick='currentSlide(" + (i+1) + ")'></span>";
  }

  response +="</div>";

  return response;
}


export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.productArray = [];
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    updateBreadcrumb(this.product.Category, this.product.NameWithoutBrand);
    this.renderProductDetails("main");
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
}

addToCart() {
    this.addProduct(this.product);
    alertMessage("Product successfully added to the cart!");
    svgBag.classList.add("animate");
    setTimeout(() => {
      svgBag.classList.remove("animate");
    }, 3000);
}

addProduct(product) {
    this.productArray = getLocalStorage("so-cart") || [];
    let search = this.productArray.find((item) => item.Id === product.Id);
    // console.log(product.Id);

    if (search === undefined) {
        this.productArray.push({
            Id: product.Id,
            Name: product.Name,
            ColorName: product.ColorName,
            Brand: product.Brand,
            Colors: product.Colors,
            Discount: product.Discount,
            Images: product.Images,
            ListPrice: product.ListPrice,
            DescriptionHtmlSimple: product.DescriptionHtmlSimple,
            quantity: 1
        });
    } else {
        search.quantity += 1;
    }
    setLocalStorage("so-cart", this.productArray);

    totalAmount()
  }

renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );

    showSlides(1);
  }
}
function updateBreadcrumb(category, productName) {
    const breadcrumb = document.getElementById("breadcrumb");
    if (breadcrumb) {
        breadcrumb.innerHTML = `<a href="/product-listing/index.html?category=${category}">${[...category][0].toUpperCase() + category.slice(1)}</a> &#8594 ${productName}`;
    }
}
