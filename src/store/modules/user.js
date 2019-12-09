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
        commit("addUserAndToken", { token: data.token, user: data.data });
        localStorage.setItem("jwt-token", data.token);
        return false;
      } catch (response) {
        return true;
      }
    },
    async register({ commit }, user) {
      try {
        const { data } = await this.$axios.post("/register", user);
        commit("addUserAndToken", { token: data.token, user: data.data });
        localStorage.setItem("jwt-token", data.token);
        return false;
      } catch (response) {
        return true;
      }
    },
    logout({ commit }) {
      commit("addUserAndToken", { token: "", user: {} });
      localStorage.removeItem("jwt-token");
      router.push("/login");
    },
    async loadUser({ commit, dispatch }, token) {
      try {
        const { data: user } = await this.$axios.get("/user");
        commit("addUserAndToken", { token, user });
      } catch (_err) {
        dispatch("logout");
      }
    }
  },
  mutations: {
    addUserAndToken(state, { token, user }) {
      state.user = user;
      state.token = token;
    }
  },
  getters: {
    isAuthenticated: state => state.token !== "",
    jwt: state => state.token || "",
    get: state => state.user
  }
};
