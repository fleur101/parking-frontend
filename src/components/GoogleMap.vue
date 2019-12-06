<template>
  <div class="google-map" :id="name"></div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "google-map",
  props: ["name", "markerClickHandler"],
  data() {
    return {
      map: "",
      parking_lots: []
    };
  },
  computed: {
    ...mapGetters({
      locations: "search/locations",
      center: "search/map_center"
    })
  },
  mounted() {
    /*eslint-disable */
    const element = document.getElementById(this.name);
    const options = {
      zoom: 17,
      center: new google.maps.LatLng(this.center.lat, this.center.lng)
    };
    this.map = new google.maps.Map(element, options);
    this.locations.forEach((parking) => {
      const polygon_coordinates = parking.polygon_coordinates.map((cords) => {
        return {
          lat: cords.latitude,
          lng: cords.longitude
        }
      })
      let parking_lot = new google.maps.Polygon({
          paths: polygon_coordinates,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35
      })
      parking_lot.setMap(this.map)
      parking_lot.addListener('click', () => {this.$emit('markerClicked', parking.id)})
      this.parking_lots.push(parking_lot)
    })
    /*eslint-enable */
  },
  methods: {}
};
</script>

<style scoped>
.google-map {
  width: 100%;
  height: 600px;
}
</style>
