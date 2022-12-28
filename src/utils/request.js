import axios from "axios";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5 * 1000,
});

service.interceptors.request.use((config) => {
  config.headers.icode = "E4553EB895DC3689";
  return config;
});
export default service;
