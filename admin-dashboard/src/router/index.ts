// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "UserLogin",
    component: () => import("@/views/UserLogin.vue"), // Lazy-load component
  },
  {
    path: "/",
    redirect: "/dashboard", // Chuyển hướng về Dashboard khi vào trang gốc
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/AdminDashboard.vue"),
  },
  {
    path: "/users",
    name: "UserManagement",
    component: () => import("@/views/users/UserManagement.vue"),
  },
  {
    path: "/users/create",
    name: "UserManagement-Create",
    component: () => import("@/views/users/CreateUser.vue"),
  },
  {
    path: "/users/createInfo/:id",
    name: "UserManagement-CreateUserInfo",
    component: () => import("@/views/users/CreateUserInfo.vue"),
  },
  {
    path: "/users/updateInfo/:id",
    name: "UserManagement-UpdateUserInfo",
    component: () => import("@/views/users/UpdateUserInfo.vue"),
  },
  {
    path: "/cities",
    name: "CityManagement",
    component: () => import("@/views/CityManagement.vue"),
  },
  {
    path: "/destinations",
    name: "DestinationManagement",
    component: () => import("@/views/DestinationManagement.vue"),
  },
  {
    path: "/tours",
    name: "TourManagement",
    component: () => import("@/views/TourManagement.vue"),
  },
  {
    path: "/reviews",
    name: "ReviewManagement",
    component: () => import("@/views/ReviewManagement.vue"),
  },
  {
    path: "/tags",
    name: "TagManagement",
    component: () => import("@/views/TagManagement.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to protect routes that require authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = Boolean(localStorage.getItem("authToken")); // Kiểm tra token hoặc trạng thái đăng nhập

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ path: "/login" }); // Chuyển hướng về trang đăng nhập nếu chưa đăng nhập
  } else {
    next();
  }
});

export default router;
