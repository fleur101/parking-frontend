import Vue from "vue";
import axios from "axios";
import Vuex from "vuex";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Toasted from "vue-toasted";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "http://localhost:4000/api/v1"
});

Vue.prototype.$axios = axiosInstance;
Vuex.Store.prototype.$axios = axiosInstance;

Vue.config.productionTip = false;

Vue.use(Toasted);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
