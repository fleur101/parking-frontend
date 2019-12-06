<template>
  <div id="wrapper">
    <h2>Extending time for booking #{{ $route.params.bid }}</h2>
    <br />
    <form @submit.prevent="submitExtend">
      <b-field>
        <b-datetimepicker
          required
          placeholder="Click to select end time..."
          v-model="end_time"
          :min-datetime="current_date"
        ></b-datetimepicker>
      </b-field>
      <b-field>
        <b-button
          class="button is-primary"
          native-type="submit"
          :loading="pending"
          >Extend</b-button
        >
      </b-field>
    </form>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "extend",
  data() {
    return {
      pending: false,
      end_time: new Date()
    };
  },
  computed: {
    booking_id() {
      return this.$route.params.bid;
    }
  },
  methods: {
    async submitExtend() {
      this.pending = true;
      try {
        await this.$axios.patch(`/bookings/${this.booking_id}`, {
          end_time: moment(this.end_time.getTime()).format()
        });
        this.$buefy.toast.open({
          message: `Saved!`,
          type: "is-success"
        });
      } catch (error) {
        this.$buefy.toast.open({
          message: `Error sending the request`,
          type: "is-danger"
        });
      }
      this.pending = false;
    }
  }
};
</script>

<style>
#wrapper {
  width: 1000px;
  margin: 40px auto;
}
</style>
