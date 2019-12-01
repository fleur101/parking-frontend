export default {
  namespaced: true,
  state: {
    locations: [],
    display_location: null,
    status: null
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
    }
  }
};
