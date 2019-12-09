<template>
  <div id="wrapper">
    <p>Hi, {{ user.name }}!</p>
    <br />
    <div>
      <b-field label="Montly Payment Setting:">
        <b-switch
          :value="user.monthly_paying"
          @input="togglePaymentSetting"
          type="is-success"
        >
          Yes
        </b-switch>
      </b-field>
    </div>
    <br />
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
  },
  methods: {
    async togglePaymentSetting() {
      const error = await this.$store.dispatch("user/togglePaymentSetting");
      if (!error) {
        this.$buefy.toast.open({
          message: "Monthly payment setting changed successfully",
          type: "is-success"
        });
      } else {
        this.$buefy.toast.open({
          message: "Monthly payment setting failed to change",
          type: "is-danger"
        });
      }
    }
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
