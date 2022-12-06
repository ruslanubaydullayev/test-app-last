import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/login.vue"),
  },
  {
    path: "/create-student",
    name: "create-student",
    component: () => import("../pages/create-student.vue"),
  },
  {
    path: "/list-of-students",
    name: "List of students",
    component: () => import("../pages/list-of-students.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
