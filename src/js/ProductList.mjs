export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const products = await this.dataSource.getData();
    this.renderList(products);
  }

  renderList(products) {
    const productCards = products.map(productCardTemplate).join("");
    this.listElement.innerHTML = productCards;
  }
}

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.id}">
      <img src="${product.image}" alt="Image of ${product.name}">
      <h3 class="card__brand">${product.brand}</h3>
      <h2 class="card__name">${product.name}</h2>
      <p class="product-card__price">$${product.price}</p>
    </a>
  </li>`;
}
