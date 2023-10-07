import ProductListing from "./ProductList.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter } from "./utils.mjs";


let searchButton = document.getElementById("searchButton");

function doSearch() {
    const dataSource = new ExternalServices();
    let searchField = document.getElementById("searchField");
    let searchValue = searchField.value;
    if (searchValue) {
        const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"]
        if (categories.includes(searchValue)) {
            window.location.replace("./product-listing/index.html?category=" + searchValue)
        }
    }
}



searchButton.addEventListener("click", (event) => {
    event.preventDefault();
     doSearch();
  });