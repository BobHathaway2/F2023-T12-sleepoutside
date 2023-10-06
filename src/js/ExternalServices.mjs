const baseURL = import.meta.env.VITE_SERVER_URL;


aync function convertToJson(res) {
  const resJSON = await res.json();
  if (res.ok) {
    return resJSON;
  } else {
    throw { name: 'servicesError', message: resJSON };
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