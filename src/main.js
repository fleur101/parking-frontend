import Vue from "vue";
import axios from "axios";
import Vuex from "vuex";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import "buefy/dist/buefy.css";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "http://localhost:4000/api/v1"
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const errorResponse = error.response ? error.response : error.message;
    return Promise.reject(errorResponse);
  }
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
