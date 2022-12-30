import path from "path";

/**
 * 获取所有子集数据
 */
export const getChildrenRoutes = (routes) => {
  const result = [];
  routes.forEach((route) => {
    // 过滤出所有路由的子集
    if (route.children && route.children.length > 0) {
      result.push(...route.children);
    }
  });
  return result;
};

/**
 * 处理脱离层级的路由
 */
export const filterRoutes = (routes) => {
  // 获取所有子集路由
  const childrenRoutes = getChildrenRoutes(routes);

  // 根据子集路由进行查重操作, filter() 当return的数据为true则把数据加到数组中
  // TODO: 需要深入了解一下filter()方法和find()方法
  return routes.filter((route) => {
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path;
    });
  });
};

function isNull(data) {
  if (!data) return true;
  if (JSON.stringify(data) === "{}") return true;
  if (JSON.stringify(data) === "[]") return true;
}

/**
 * 根据routes数据, 返回对应的menu规则数据
 */
export const generateMenus = (routes, basePath = "") => {
  const result = [];
  routes.forEach((item) => {
    // 没有children 和 meta, 直接return, 忽略该条数据
    if (isNull(item.children) && isNull(item.meta)) return;
    // 有children, 没有meta
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children));
      return;
    }
    // 没有children , 有 meta
    const routePath = path.resolve(basePath, item.path);
    let route = result.find((item) => item.path === routePath);
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: [],
      };
      if (route.meta.icon && route.meta.title) {
        result.push(route);
      }
      if (!isNull(item.children)) {
        route.children.push(...generateMenus(item.children, route.path));
      }
    }
  });
  return result;
};
