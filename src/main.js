import Vue from "vue";
import axios from "axios";
import Vuex from "vuex";
import App from "./App.vue";
// import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import "buefy/dist/buefy.css";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "https://tartu-parking-backend.herokuapp.com/api/v1"
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const errorResponse = error.response ? error.response : error.message;
    if (
      error.status === 401 &&
      error.config &&
      !error.config.__isRetryRequest
    ) {
      console.log("unauthorized operation, logging out");
      store.dispatch("user/logout");
      router.replace("/login");
    }
    return Promise.reject(errorResponse);
  }
);

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("jwt-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

Vue.prototype.$axios = axiosInstance;
Vuex.Store.prototype.$axios = axiosInstance;

Vue.config.productionTip = false;

Vue.use(Buefy);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
