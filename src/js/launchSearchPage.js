let searchButton = document.getElementById("searchButton");
let searchField = document.getElementById("searchField");

function doSearch() {
    let searchValue = searchField.value.toLowerCase();
    if (searchValue) {
        const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"]
        if (categories.includes(searchValue)) {
            window.location.replace("./product-listing/index.html?category=" + searchValue)
        } else {
            alert("We can only search for 'tents', 'backpacks', 'sleeping-bags', 'hammocks'")
        }
    }
}



searchButton.addEventListener("click", (event) => {
    event.preventDefault();
     doSearch();
  });

  searchField.addEventListener("selectionchange", (event) => {
    event.preventDefault();
     doSearch();
  });