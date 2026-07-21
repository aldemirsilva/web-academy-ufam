import axios from "axios";

export const productsApi = axios.create({
  baseURL: "https://ranekapi.origami.dev/json/api",
});
