import { createRouter, createWebHashHistory } from "vue-router";
import layout from "@/layout/index";

/**
 * 公有路由表
 */
const publicRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
  },
  {
    path: "/",
    component: layout,
    redirect: "/profile",
    children: [
      // 个人中心
      {
        path: "/profile",
        name: "profile",
        component: () => import("@/views/profile"),
        meta: {
          title: "profile",
          icon: "el-icon-user",
        },
      },
      // 404
      {
        path: "/404",
        name: "404",
        component: () => import("@/views/error-page/404"),
      },
      // 401
      {
        path: "/401",
        name: "401",
        component: () => import("@/views/error-page/401"),
      },
    ],
  },
];

/**
 * 私有路由表
 * @type {Router}
 */
const privateRouters = [
  {
    path: "/user",
    component: layout,
    redirect: "/user/manage",
    meta: {
      title: "user",
      icon: "personnel",
    },
    children: [
      {
        path: "/user/manage",
        name: "userManage",
        component: () => import("@/views/user-manage"),
        meta: {
          title: "userManage",
          icon: "personnel-manage",
        },
      },
      {
        path: "/user/role",
        name: "userRole",
        component: () => import("@/views/role-list"),
        meta: {
          title: "roleList",
          icon: "role",
        },
      },
      {
        path: "/user/permission",
        name: "userPermission",
        component: () => import("@/views/permission-list"),
        meta: {
          title: "permissionList",
          icon: "permission",
        },
      },
      {
        path: "/user/info/:id",
        name: "userinfo",
        component: () => import("@/views/user-info"),
        meta: {
          title: "userinfo",
        },
      },
      {
        path: "/user/import",
        name: "import",
        component: () => import("@/views/import"),
        meta: {
          title: "excelImport",
        },
      },
    ],
  },
  {
    path: "/article",
    component: layout,
    redirect: "/article/ranking",
    meta: {
      title: "article",
      icon: "article",
    },
    children: [
      {
        path: "/article/ranking",
        name: "articleRanking",
        component: () => import("@/views/article-ranking/index"),
        meta: {
          title: "articleRanking",
          icon: "article-ranking",
        },
      },
      {
        path: "/article/:id",
        name: "article",
        component: () => import("@/views/article-detail/index"),
        meta: {
          title: "articleDetail",
        },
      },
      {
        path: "/article/create",
        name: "articleCreate",
        component: () => import("@/views/article-create/index"),
        meta: {
          title: "articleCreate",
          icon: "article-create",
        },
      },
      {
        path: "/article/editor/:id",
        name: "articleEditor",
        component: () => import("@/views/article-create/index"),
        meta: {
          title: "articleEditor",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...privateRouters],
});

export default router;
