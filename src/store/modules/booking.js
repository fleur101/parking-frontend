export default {
  namespaced: true,
  state: {
    status: null,
    bookings: []
  },
  actions: {
    async fetchBookings({ commit }) {
      commit("setStatus", "pending");
      try {
        const { data } = await this.$axios.get("/my_bookings");
        commit("setBookings", data);
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
    },
    setBookings(state, bookings) {
      state.bookings = bookings;
    }
  },
  getters: {
    bookings: state => state.bookings,
    status: state => state.status
  }
};
