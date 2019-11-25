import router from "../../router";

export default {
  namespaced: true,
  state: {
    user: {},
    token: ""
  },
  actions: {
    async authenticate({ commit }, user) {
      try {
        const { data } = await this.$axios.post("/login", user);
        commit("addUser", data.data);
        commit("addToken", data.token);
        localStorage.setItem("jwt-token", data.token);
        return false;
      } catch (response) {
        console.log(response);
        return true;
      }
    },
    async register({ commit }, user) {
      try {
        const { data } = await this.$axios.post("/register", user);
        commit("addUser", data.data);
        commit("addToken", data.token);
        localStorage.setItem("jwt-token", data.token);
        return false;
      } catch (response) {
        console.log(response);
        return true;
      }
    },
    logout({ commit }) {
      commit("addUser", {});
      commit("addToken", "");
      localStorage.removeItem("jwt-token");
      router.push("/login");
    },
    async loadUser({ commit, dispatch }, token) {
      try {
        commit("addToken", token);
        const { data } = await this.$axios.get("/user");
        commit("addUser", data);
      } catch (_err) {
        dispatch("logout");
      }
    }
  },
  mutations: {
    addUser(state, user) {
      state.user = user;
    },
    addToken(state, token) {
      state.token = token;
    }
  },
  getters: {
    isAuthenticated: state => state.token !== "",
    jwt: state => state.token || "",
    get: state => state.user
  }
};
