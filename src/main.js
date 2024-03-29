import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import installElementPlus from "./plugins/element";
// 初始化样式表
import "@/styles/index.scss";
// 导入 svgIcon
import installIcon from "@/icons";
// 导入路由鉴权
import "./permission";

const app = createApp(App);
installElementPlus(app);
installIcon(app);
app.use(store).use(router).mount("#app");
