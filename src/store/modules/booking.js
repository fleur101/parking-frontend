export default {
  namespaced: true,
  state: {
    status: null
  },
  actions: {
    async addBooking({ commit }, booking) {
      commit("setStatus", "pending");
      try {
        await this.$axios.post("/bookings", booking);
        commit("setStatus", "done");
        return false;
      } catch (_err) {
        commit("setStatus", "fail");
        return true;
      }
    }
  },
  mutations: {
    setStatus(state, status) {
      state.status = status;
    }
  },
  getters: {
    status: state => state.status
  }
};
