import { login } from "@/api/sys";
import md5 from "md5";
import { setItem, getItem } from "@/utils/storage";
import { TOKEN } from "@/constant";

export default {
  namespaced: true, // 表示为一个单独的模块,不会被合并到主模块里面
  state: () => ({
    token: getItem(TOKEN) || "",
  }),
  mutations: {
    setToken(state, token) {
      state.token = token;
      setItem(TOKEN, token);
    },
  },
  actions: {
    login(context, userInfo) {
      const { username, password } = userInfo;
      return new Promise((reslove, reject) => {
        login({
          username,
          password: md5(password),
        })
          .then((data) => {
            // 触发 mutations 方法
            this.commit("user/setToken", data.data.data.token);
            reslove();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
