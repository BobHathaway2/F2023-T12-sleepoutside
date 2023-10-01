import { renderListWithTemplate } from "./utils.mjs";

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.products = []; 
    }

    async init() {
        this.products = await this.dataSource.getData(this.category);

        const abcButton = document.querySelector(".abcSort");
        const priceSort = document.querySelector(".priceSort");

        abcButton.addEventListener("click", () => this.sortABC());
        priceSort.addEventListener("click", () => this.sortPrice(this.products));

        this.renderList(this.products);
    }

    renderList(list, position = "afterbegin", clear = false) {
        renderListWithTemplate(productCardTemplate, this.listElement, list, position, clear);
    }

    updateList(sortedProducts) {
        this.renderList(sortedProducts, "afterbegin", true);
    }

    sortABC() {
        const sortedProducts = [...this.products].sort((a, b) => {
            return a.Name.localeCompare(b.Name);
        });
        this.updateList(sortedProducts);
    }

    sortPrice(products) {
        const sortedProducts = [...products].sort((a, b) => {
            if (a.FinalPrice < b.FinalPrice) {
                return -1;
            } else if (a.FinalPrice > b.FinalPrice) {
                return 1;
            }
            return 0;
        });
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
