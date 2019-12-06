<template>
  <div class="google-map" :id="name"></div>
</template>

<script>
import { mapGetters } from "vuex";
import { debounce } from "debounce";
export default {
  name: "google-map",
  props: ["name", "markerClickHandler"],
  data() {
    return {
      map: null,
      parking_lots: []
    };
  },
  computed: {
    ...mapGetters({
      parking_spaces: "search/parking_spaces",
      change_center: "search/change_center",
      center: "search/map_center"
    })
  },
  watch: {
    change_center: function(newCenter) {
      this.map.setCenter({ lat: newCenter.lat, lng: newCenter.lng });
    },
    center: function(newCenter) {
      this.$store.dispatch("search/fetchLocationsByLatLng", newCenter);
    },
    parking_spaces: function(newParkingSpaces) {
      this.parking_lots.forEach(m => m.setMap(null));
      this.parking_lots = [];
      newParkingSpaces.forEach(pspace => {
        /*eslint-disable */
        var polygon = new google.maps.Polygon({
          /*eslint-enable */
          paths: pspace.polygon_coordinates,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          label: pspace.name
        });
        polygon.setMap(this.map);
        polygon.addListener("click", () => {
          this.$emit("polygonClicked", pspace.id);
        });
        this.parking_lots.push(polygon);
      });
    }
  },
  mounted() {
    const element = document.getElementById(this.name);
    const options = {
      zoom: 18,
      /*eslint-disable */
      center: new google.maps.LatLng(this.center.lat, this.center.lng)
    };
    this.map = new google.maps.Map(element, options);
    /*eslint-enable */
    this.map.addListener(
      "center_changed",
      debounce(() => {
        const newCenter = this.map.getCenter();
        this.$store.dispatch("search/setMapCenter", {
          lat: newCenter.lat(),
          lng: newCenter.lng()
        });
      }, 1000)
    );
    this.$store.dispatch("search/showMyPositionOnMap");
  },
  methods: {}
};
</script>

<style lang="sass" scoped>
.google-map
  width: 100%;
  height: 600px;
</style>
