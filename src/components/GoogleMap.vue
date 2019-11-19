<template>
  <div class="google-map" :id="name"></div>
</template>

<script>
export default {
  name: "google-map",
  props: ["name", "locations", "markerClickHandler"],
  data: function() {
    return {
      map: "",
      markers: []
    };
  },
  computed: {
    center: function() {
      return this.locations.length > 0
        ? {
            lat: this.locations[0].latitude,
            lng: this.locations[0].longitude
          }
        : { lat: 58.38, lng: 26.72 };
    }
  },
  mounted: function() {
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
