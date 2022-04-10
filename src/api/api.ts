import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL as string;

export const getProductsData = async () => {
  try {
    const { data } = await axios.get(API_URL)
    return {
      productsList: data.products,
      config: data.config
    };
  } catch (err) {
    return {
      productsList: [],
      config: null
    };
  }
}
