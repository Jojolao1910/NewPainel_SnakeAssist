import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import ProductManager from "@/views/ProductManager.vue";
import ProductList from "@/views/ProductList.vue";
import OrderProgress from "@/views/OrderProgress.vue";
import Analytics from "@/views/Analytics.vue";
import MenuManager from "@/views/MenuManager.vue";
import OnlineMenu from "@/views/OnlineMenu.vue";
import CallHistory from "@/views/CallHistory.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/menu",
    name: "OnlineMenu",
    component: OnlineMenu,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: "products",
        name: "ProductManager",
        component: ProductManager,
      },
      {
        path: "product-list",
        name: "ProductList",
        component: ProductList,
      },
      {
        path: "orders",
        name: "OrderProgress",
        component: OrderProgress,
      },
      {
        path: "analytics",
        name: "Analytics",
        component: Analytics,
      },
      {
        path: "menu-manager",
        name: "MenuManager",
        component: MenuManager,
      },
      {
        path: "online-menu",
        name: "DashboardMenu",
        component: OnlineMenu,
      },
      {
        path: "call-history",
        name: "CallHistory",
        component: CallHistory,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
