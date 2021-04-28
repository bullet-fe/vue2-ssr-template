import Vue from "vue";
import vueRouter from "vue-router";
import Meta from "vue-meta";

Vue.use(vueRouter);
Vue.use(Meta);

export const createRouter = () => {
  const router = new vueRouter({
    // 同构应用 不使用hash模式
    mode: "history",
    routes: [
      {
        name: "Home",
        path: "/",
        component: () => import("../pages/Home.vue"),
      },
      {
        name: "About",
        path: "/About",
        component: () => import("../pages/About.vue"),
      },
      {
        name: "view404",
        path: "*",
        component: () => import("../pages/view404.vue"),
      },
    ],
  });
  return router;
};
