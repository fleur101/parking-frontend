<template>
  <div id="wrapper">
    <SearchForm :status.sync="status" :locations.sync="locations" />
    <div v-if="status == 'done'" class="columns panel">
      <div class="column">
        <b-tabs v-model="activeTab">
          <b-tab-item label="Map">
            <GoogleMap
              name="locations"
              v-bind:locations="locations"
              @markerClicked="showLocation"
            />
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
import SearchForm from "../components/SearchForm";
import GoogleMap from "@/components/GoogleMap";

export default {
  name: "home",
  data: function() {
    return {
      locations: [],
      display_location: null,
      status: null,
      activeTab: 0
    };
  },
  components: {
    SearchForm,
    GoogleMap
  },
  methods: {
    showLocation(id) {
      this.display_location = this.locations.find(loc => loc.id == id);
    }
  }
};
</script>

<style>
#wrapper {
  width: 1000px;
  margin: auto;
}

.panel {
  padding-top: 30px;
}
</style>
