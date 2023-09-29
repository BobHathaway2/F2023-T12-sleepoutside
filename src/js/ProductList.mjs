
import { renderListWithTemplate } from "./utils.mjs";
const titleSuffix = document.getElementById("category");

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const products = await this.dataSource.getData(this.category);
    this.renderList(products);
    titleSuffix.innerHTML = this.category;
  }

  renderList(list, position = "afterbegin", clear = false) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, position, clear);
}

}



function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

