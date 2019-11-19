import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";

Vue.use(VueRouter);

const isAuthenticated = () => !!localStorage.getItem("jwt-token");

const ifNotAuthenticated = (to, from, next) => {
  if (!isAuthenticated()) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (isAuthenticated()) {
    next();
    return;
  }
  next("/login");
};

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
    beforeEnter: ifNotAuthenticated
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
