// 路由守卫
import router from "@/router";
import store from "@/store";
const whileList = ["/login"];

router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    // 1. 用户已登录,不允许进入 login
    if (to.path === "/login") {
      next("/");
    } else {
      if (!store.getters.hasUserInfo) {
        // 用户信息不存在, 则去获取用户信息
        await store.dispatch("user/getUserInfo");
      }
      next();
    }
  } else {
    // 2 用户未登录, 只允许进入 login
    if (whileList.indexOf(to.path) > -1) {
      next();
    } else {
      next("/login");
    }
  }
  next();
});
