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
      markers: []
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
      zoom: 18,
      center: new google.maps.LatLng(this.center.lat, this.center.lng)
    };
    this.map = new google.maps.Map(element, options);
    this.locations.forEach((location) => {
        const position = new google.maps.LatLng(location.latitude, location.longitude);
        const marker = new google.maps.Marker({
            position,
            map: this.map,
            label: ""+location.id
        })
        marker.addListener('click', () => {this.$emit('markerClicked', location.id)})
        this.markers.push(marker)
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
