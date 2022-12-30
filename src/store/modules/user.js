import { login, getUserInfo } from "@/api/sys";
import md5 from "md5";
import { setItem, getItem, removeAllItem } from "@/utils/storage";
import { TOKEN } from "@/constant";
import router from "@/router";
import { setTimeStamp } from "@/utils/auth";

export default {
  namespaced: true, // 表示为一个单独的模块,不会被合并到主模块里面
  state: () => ({
    token: getItem(TOKEN) || "",
    userInfo: {},
  }),
  mutations: {
    setToken(state, token) {
      state.token = token;
      setItem(TOKEN, token);
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  actions: {
    /**
     * 登录请求动作
     * @param context
     * @param userInfo
     * @return {Promise<unknown>}
     */
    login(context, userInfo) {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password),
        })
          .then((data) => {
            // 触发 mutations 方法
            this.commit("user/setToken", data.token);
            router.push("/");
            // 保存登录时间
            setTimeStamp();
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    /**
     * 获取用户信息
     * @param context
     * @return {Promise<void>}
     */
    async getUserInfo(context) {
      console.log(context);
      const res = await getUserInfo();
      this.commit("user/setUserInfo", res);
      return res;
    },
    /**
     * 退出登录
     */
    logout() {
      this.commit("user/setToken", "");
      this.commit("user/setUserInfo", {});
      removeAllItem();
      router.push("/login");
      // TODO:
    },
  },
};
