<template>
  <div id="wrapper">
    <SearchForm />
    <div v-if="isStatusDone" class="columns panel">
      <div class="column">
        <b-tabs v-model="activeTab">
          <b-tab-item label="Map">
            <GoogleMap name="locations" @markerClicked="showLocation" />
          </b-tab-item>
          <b-tab-item label="List">
            <ul>
              <li
                v-for="loc in locations"
                v-bind:key="loc.id"
                @click="showLocation(loc.id)"
              >
                Parking #{{ loc.id }}
              </li>
            </ul>
          </b-tab-item>
        </b-tabs>
      </div>
      <div class="column is-two-fifths">
        <div
          class="tile is-vertical notification is-primary"
          v-if="display_location"
        >
          You selected location #{{ display_location.id }}<br />
          <p>lat: {{ display_location.latitude }}</p>
          <p>lng: {{ display_location.longitude }}</p>
          <p>pricing zone: {{ display_location.pricing_zone }}</p>
          <p v-if="display_location.hourly_price">
            hourly price: €{{ display_location.hourly_price }}
          </p>
          <p v-if="display_location.realtime_price">
            realtime price: €{{ display_location.realtime_price }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchForm from "../components/SearchForm";
import GoogleMap from "@/components/GoogleMap";

export default {
  name: "search",
  data() {
    return {
      activeTab: 0
    };
  },
  components: {
    SearchForm,
    GoogleMap
  },
  computed: {
    ...mapGetters({
      locations: "search/locations",
      display_location: "search/display_location"
    }),
    isStatusDone() {
      return this.$store.getters["search/status"] === "done";
    }
  },
  methods: {
    showLocation(id) {
      const location = this.locations.find(loc => loc.id == id);
      this.$store.dispatch("search/setDisplayLocation", location);
    }
  }
};
</script>

<style>
#wrapper {
  width: 1000px;
  margin: 40px auto;
}

.panel {
  padding-top: 50px;
}
</style>
