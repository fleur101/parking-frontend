import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import SearchPage from "../views/SearchPage.vue";
import ExtendPage from "../views/ExtendPage.vue";
import ProfilePage from "../views/ProfilePage.vue";

Vue.use(VueRouter);

const isAuthenticated = () => !!localStorage.getItem("jwt-token");

const ifNotAuthenticated = (to, from, next) => {
  if (!isAuthenticated()) {
    next();
  } else {
    next("/");
  }
};

const ifAuthenticated = (to, from, next) => {
  if (isAuthenticated()) {
    next();
  } else {
    next("/login");
  }
};

const routes = [
  {
    path: "/profile",
    name: "profile",
    component: ProfilePage,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/",
    name: "search",
    component: SearchPage,
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
  },
  {
    path: "/extend/:bid",
    name: "extend",
    component: ExtendPage,
    beforeEnter: ifAuthenticated
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
