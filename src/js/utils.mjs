// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}



export function getParams(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}


export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template.innerHTML);
  if (callback) {
    callback(data);
  }
  
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (!Array.isArray(list)) {
    console.error("Provided list is not an array:", list);
    return;
}


  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export async function loadHeaderFooter() {
  const header = await loadTemplate("../partials/header.html")
  const footer = await loadTemplate("../partials/footer.html");
  const domHeader = document.getElementById("main-header");
  const domFooter = document.getElementById("main-footer");
  renderWithTemplate(header, domHeader);  
  renderWithTemplate(footer, domFooter);
  totalAmount()

  
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  const html = await response.text()  

  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
}

export function totalAmount (){      
  const array = getLocalStorage("so-cart")
  const cartAmount = document.getElementById("cartAmount");
  if (array) {
      cartAmount.innerHTML = array.map((x) => x.quantity).reduce((x, y) => x + y, 0); 
  } else {
      cartAmount.innerHTML = 0;
  }
}

// Feature description goes here
export function alertMessage(message, scroll = true, duration = 30000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<span class="alert-message">${message} <span class="alert-close">X</span></span>`;
  let timer;
  alert.addEventListener("click", function(e) {
      if(e.target.classList.contains("alert-close")) {
          clearTimeout(timer);  
          fadeOutAndRemove(this);
      }
  });
  const header = document.querySelector("header");
  let alertContainer = header.querySelector(".alert-container");
  if (!alertContainer) {
      alertContainer = document.createElement("div");
      alertContainer.classList.add("alert-container");
      header.prepend(alertContainer);
  }
  alertContainer.appendChild(alert);
  if (scroll)
      window.scrollTo(0,0);
  timer = setTimeout(() => {
      fadeOutAndRemove(alert);
  }, duration);
  function fadeOutAndRemove(element) {
    element.style.animation = "fadeOut 0.5s forwards";
    setTimeout(() => {
        element.remove();
    }, 500);
  }
}
// Feature description goes here
export function showToast(message) {
  let toast = document.getElementById("toast");
  let overlay = document.getElementById("overlay");
  if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      document.body.appendChild(toast);
  }
  if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "overlay";
      document.body.appendChild(overlay);
  }
  toast.innerHTML = message;
  toast.className = "toast show";
  overlay.className = "overlay show";
  setTimeout(() => {
      toast.className = "toast";
      overlay.className = "overlay";
  }, 10000);
}
export function calculateDiscountPercentage(originalPrice, discountedPrice) {
  let discount = originalPrice - discountedPrice;
  let discountPercentage = (discount / originalPrice) * 100;
  return {
    discountPercentage: Math.round(discountPercentage),
    discount: (discount.toFixed(2))
  };
}
