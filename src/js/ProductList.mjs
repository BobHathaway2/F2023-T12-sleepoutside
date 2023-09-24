import { renderListWithTemplate } from "./utils.mjs";

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const products = await this.dataSource.getData();
    const filteredProducts = this.filterTentsById(products);
    this.renderList(filteredProducts);
  }

  renderList(list, position = "afterbegin", clear = false) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, position, clear);
}

  filterTentsById(tents) {
    const tent_ids_to_keep = ["880RR", "985RF", "985PR", "344YJ"];
    return tents.filter(tent => tent_ids_to_keep.includes(tent.Id));
  }
}



function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}
