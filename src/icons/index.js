// 导入所有svg图标

// 可以给这个函数传入三个参数：
// 一个要搜索的目录，一个标记表示是否还搜索其子目录， 以及一个匹配文件的正则表达式。
const svgRequire = require.context("./svg", false, /\.svg$/);
// svgRequire.keys() 得到所有svg图标
// 遍历得到的svg图标,然后再把每个svg图标作为参数添加到svgRequire函数中
svgRequire.keys().forEach((svgIcon) => svgRequire(svgIcon));

// 完成SvgIcon的全局注册

import SvgIcon from "@/components/SvgIcon";

// 导出一个 app 作为参数的函数,当前app为createApp
export default (app) => {
  app.component("svg-icon", SvgIcon);
};
