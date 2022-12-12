import { createRouter, createWebHistory } from "vue-router";
import Finish from "../components/Finish";
const routes = [
  {
    path: "/create-test",
    name: "Create test",
    meta: {
      auth: true,
    },
    component: () => import("../pages/create-test.vue"),
  },
  {
    path: "/vuejs-quiz/finish",
    name: "FinishView",
    meta: {
      auth: true,
    },
    component: Finish,
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      auth: false,
    },
    component: () => import("../pages/login.vue"),
  },
  {
    path: "/create-student",
    name: "create-student",
    meta: {
      auth: true,
    },
    component: () => import("../pages/create-student.vue"),
  },
  {
    path: "/new-test",
    name: "new-test",
    meta: {
      auth: true,
    },
    component: () => import("../pages/new-test.vue"),
  },
  {
    path: "/edit-test",
    name: "edit-test",
    meta: {
      auth: true,
    },
    component: () => import("../pages/edit-test.vue"),
  },
  {
    path: "/list-of-students",
    name: "List of students",
    meta: {
      auth: true,
    },
    component: () => import("../pages/list-of-students.vue"),
  },
  {
    path: "/:path(.*)",
    name: "404",
    meta: {
      auth: false,
    },
    component: () => import("../pages/error.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (localStorage.getItem("login")) {
      next();
    } else {
      next("/login");
    }
  } else if (!to.meta.auth && to.name === "404") {
    next();
  } else if (!to.meta.auth && localStorage.getItem("login")) {
    next("/create-test");
  } else {
    next();
  }
});

export default router;
