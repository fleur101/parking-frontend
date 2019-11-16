export default {
  namespaced: true,
  state: {
    user: {}
  },
  actions: {
    async authenticate({ commit }, user) {
      try {
        const { data } = await this.$axios.post("/login", user);
        commit("addUser", data.data);
        localStorage.setItem("jwt-token", data.token);
      } catch (error) {
        console.log(error);
      }
    }
  },
  mutations: {
    addUser(state, user) {
      state.user = user;
    }
  },
  getters: {
    isAuthenticated: () => !!localStorage.getItem("jwt-token"),
    jwt: () => localStorage.getItem("jwt-token"),
    get: state => state.user
  }
};
