export default {
  namespaced: true,
  state: {
    user: {}
  },
  actions: {
    async authenticate({ commit }, user) {
      try {
        const { data } = await this.$axios.post("/login", user);
        localStorage.setItem("jwt-token", data.token);
        commit("addUser", data.data);
        return true;
      } catch (response) {
        console.log(response);
        return false;
      }
    },
    logout({ commit }) {
      localStorage.removeItem("jwt-token");
      commit("addUser", {});
    }
  },
  mutations: {
    addUser(state, user) {
      state.user = user;
    }
  },
  getters: {
    isAuthenticated: () => !!localStorage.getItem("jwt-token"),
    jwt: () => localStorage.getItem("jwt-token") || "",
    get: state => state.user
  }
};
