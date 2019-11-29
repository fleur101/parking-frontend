import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import search from "./modules/search";
import booking from "./modules/booking";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    search,
    booking
  }
});
