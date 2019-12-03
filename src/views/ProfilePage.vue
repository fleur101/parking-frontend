<template>
  <div id="wrapper">
    <p>Hi, {{ user.name }}!</p>
    <div>
      <p>Your current bookings:</p>
      <ul>
        <li v-for="booking in bookings" v-bind:key="booking.id">
          #{{ booking.id }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "profile",
  data() {
    return {
      bookings: []
    };
  },
  computed: {
    ...mapGetters({
      user: "user/get"
    })
  }
};
</script>

<style lang="sass">
#wrapper
  width: 1000px;
  margin: 40px auto;

.panel
  padding-top: 50px;
</style>
