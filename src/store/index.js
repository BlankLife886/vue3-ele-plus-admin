import { createStore } from "vuex";
import user from "./modules/user";
import getters from "./getters";

export default createStore({
  getters,
  modules: {
    user, // 注册user模块
  },
});
