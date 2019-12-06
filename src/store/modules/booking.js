export default {
  namespaced: true,
  state: {
    status: null
  },
  actions: {
    async fetchBookings({ commit }) {
      commit("setStatus", "pending");
      try {
        const bookings = await this.$axios.get("/bookings");
        this.bookings = bookings.data;
        commit("setStatus", "done");
      } catch (err) {
        commit("setStatus", "fail");
      }
    },
    async addBooking({ commit }, booking) {
      commit("setStatus", "pending");
      try {
        await this.$axios.post("/locations/booking", booking);
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
    bookings: state => state.bookings,
    status: state => state.status
  }
};
