import axios from "axios";
import { ElMessage } from "element-plus";
import { ICODE } from "@/constant";
import store from "@/store";
import { isCheckTimeout } from "@/utils/auth";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5 * 1000,
});

service.interceptors.request.use(
  (config) => {
    config.headers.icode = ICODE;
    // 统一处理token
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`;

      if (isCheckTimeout()) {
        // 超时, 退出操作
        store.dispatch("user/logout");
        return Promise.reject(new Error("token 失效"));
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data;
    if (success) {
      return data;
    } else {
      ElMessage.error(message);
      return new Promise.reject(new Error(message));
    }
  },
  (error) => {
    // token 过期
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch("user/logout");
    }
    ElMessage.error(error.message);
    return new Promise.reject(error.message);
  }
);
export default service;
