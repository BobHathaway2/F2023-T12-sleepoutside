const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  return res.json();

}



export default class ExternalServices {
  constructor() {
  }

  async getData(category) {
    try {
      const response = await fetch(baseURL + `/products/search/${category}`);
      const data = await convertToJson(response);
      return data.Result;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  
  async findProductById(id) {
    try {
        const response = await fetch(baseURL + `/product/${id}`);
        const productData = await convertToJson(response);
        return productData.Result;
    } catch (error) {
        console.error("Error finding product by ID:", error);
        throw error;
    }
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body : JSON.stringify(payload),
    };

    const response = await fetch(baseURL + "checkout", options);
    return await convertToJson(response);
  }

}
