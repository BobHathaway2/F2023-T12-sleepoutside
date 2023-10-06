import { renderListWithTemplate } from "./utils.mjs";

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.products = [];
    }

    async init() {
        try {
            this.products = await this.dataSource.getData(this.category);
        } catch (error) {
            console.error("Error fetching products:", error);
            this.products = [];
        }

        const abcButton = document.querySelector(".abcSort");
        const priceSort = document.querySelector(".priceSort");

        updateBreadcrumb(this.category, this.products.length);

        abcButton.addEventListener("click", () => this.sortABC());
        priceSort.addEventListener("click", () => this.sortPrice(this.products));

        if (Array.isArray(this.products) && this.products.length > 0) {
            this.renderList(this.products);
        } else {
            console.warn("No products to display.");
        }
    }

    renderList(list, position = "afterbegin", clear = false) {
        renderListWithTemplate(productCardTemplate, this.listElement, list, position, clear);
    }

    updateList(sortedProducts) {
        this.renderList(sortedProducts, "afterbegin", true);
    }

    sortABC() {
        const sortedProducts = [...this.products].sort((a, b) => a.Name.localeCompare(b.Name));
        this.updateList(sortedProducts);
    }

    sortPrice(products) {
        const sortedProducts = [...products].sort((a, b) => 
            a.FinalPrice < b.FinalPrice ? -1 : a.FinalPrice > b.FinalPrice ? 1 : 0
        );
        this.updateList(sortedProducts);
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

// Update the breadcrumb with category and item count
function updateBreadcrumb(category, itemCount) {
  const breadcrumb = document.getElementById("breadcrumb");
  if (breadcrumb) {
      breadcrumb.innerHTML = `${[...category][0].toUpperCase() + category.slice(1)}&#8594 (showing ${itemCount} items)`;
  }
}
