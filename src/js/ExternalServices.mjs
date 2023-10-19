const baseURL = import.meta.env.VITE_SERVER_URL;


async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    // Use the Error() object's name and message properties to send the response body back to the calling function.
    throw { name: "servicesError", message: data };
  }
}


export default class ExternalServices {
  constructor() {
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const products = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(products);
    return data.Result;
  }

  async checkout(payload){
    const options = {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body : JSON.stringify(payload),
    };
    console.log(options)
    return await fetch (baseURL + "checkout/", options).then(convertToJson);
  }
}