import { createToken } from "vue-stripe-elements-plus";

export default {
  namespaced: true,
  state: {
    locations: [],
    display_location: null,
    status: null,
    booking_status: null,
    payment_complete: false,
    payment_status: null
  },
  actions: {
    async fetchLocations({ commit }, search) {
      commit("setStatus", "pending");
      commit("setDisplayLocation", null);
      try {
        const response = await this.$axios.post("/search", search);
        commit("addLocations", response.data);
        commit("setStatus", "done");
      } catch (_err) {
        commit("setStatus", "fail");
      }
    },
    setDisplayLocation({ commit }, location) {
      commit("setDisplayLocation", location);
    },
    async addBooking({ commit }, booking) {
      commit("setBookingStatus", "pending");
      try {
        const { data } = await this.$axios.post("/locations/booking", booking);
        commit("setLocationBooking", data);
        commit("setBookingStatus", "done");
        return false;
      } catch (_err) {
        commit("setBookingStatus", "fail");
        return true;
      }
    },
    async payBooking({ commit, state }, { spot_id }) {
      commit("setPaymentStatus", "pending");
      try {
        const { token } = await createToken();
        const index = state.display_location.locations.findIndex(
          item => item.id === spot_id
        );
        if (index !== -1) {
          const payment = {
            booking_id: state.display_location.locations[index].booking.id,
            stripe_token: token.id
          };
          const { data } = await this.$axios.post("/payments", payment);
          commit("setLocationBookingPayment", {
            index,
            data
          });
          commit("setPaymentStatus", "done");
          return false;
        }
        commit("setPaymentStatus", "fail");
        return true;
      } catch (_err) {
        commit("setPaymentStatus", "fail");
        return true;
      }
    }
  },
  mutations: {
    setStatus(state, status) {
      state.status = status;
    },
    setDisplayLocation(state, location) {
      state.display_location = location;
    },
    addLocations(state, locations) {
      state.locations = locations;
    },
    setBookingStatus(state, status) {
      state.booking_status = status;
    },
    setLocationBooking(state, booking) {
      const index = state.display_location.locations.findIndex(
        item => item.id === booking.location_id
      );
      if (index !== -1) {
        const obj = state.display_location.locations[index];
        const payload = {
          ...obj,
          is_available: false,
          payment_due: true,
          booking: {
            ...booking
          }
        };
        state.display_location.locations.splice(index, 1, payload);
      }
    },
    setPaymentComplete(state, status) {
      state.payment_complete = status;
    },
    setPaymentStatus(state, status) {
      state.payment_status = status;
    },
    setLocationBookingPayment(state, payment) {
      const { index, data } = payment;
      const obj = state.display_location.locations[index];
      const payload = {
        ...obj,
        is_available: false,
        payment_due: false,
        payment: {
          ...data
        }
      };
      state.display_location.locations.splice(index, 1, payload);
    }
  },
  getters: {
    display_location: state => state.display_location,
    locations: state => state.locations,
    status: state => state.status,
    map_center: state => {
      return state.locations.length > 0
        ? {
            lat: state.locations[0].polygon_coordinates[0].latitude,
            lng: state.locations[0].polygon_coordinates[0].longitude
          }
        : { lat: 58.38, lng: 26.72 };
    },
    booking_status: state => state.booking_status,
    payment_complete: state => state.payment_complete,
    payment_status: state => state.payment_status
  }
};
