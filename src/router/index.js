import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import store from "../store";
import SearchPage from "../views/SearchPage.vue";

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
  // TODO: fix the getters, currently I did direct token check
  if (!localStorage.getItem("jwt-token")) {
    next();
  } else {
    next("/");
  }
};

const ifAuthenticated = (to, from, next) => {
  console.log(store.getters);
  if (localStorage.getItem("jwt-token")) {
    next();
  } else {
    next("/login");
  }
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
  },
  {
    path: "/search",
    name: "search",
    component: SearchPage,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/logout",
    name: "logout",
    beforeEnter: (to, from, next) => {
      console.log("Logging out");
      store.dispatch("user/logout");
      next("/login");
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
