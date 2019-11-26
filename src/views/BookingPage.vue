<template>
  <div id="wrapper">
    <form @submit.prevent="addBooking">
      <b-field>
        <b-datetimepicker
          required
          placeholder="Click to select start time..."
          v-model="start_time"
          :min-datetime="current_date"
        ></b-datetimepicker>
      </b-field>
      <b-field>
        <b-datetimepicker
          required
          placeholder="Click to select end time..."
          v-model="end_time"
          :min-datetime="current_date"
        ></b-datetimepicker>
      </b-field>
      <b-field>
        <b-select
          required
          placeholder="Select pricing type"
          v-model="pricing_type"
        >
          <option value="hourly">Hourly</option>
          <option value="realtime">Real Time</option>
        </b-select>
      </b-field>
      <b-field>
        <p class="control">
          <b-button
            class="button is-primary"
            native-type="submit"
            :loading="isStatusPending"
            >Add Booking</b-button
          >
        </p>
      </b-field>
    </form>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "booking",
  data() {
    return {
      current_date: new Date(),
      start_time: new Date(),
      end_time: new Date(),
      pricing_type: null,
      location: null,
      gettingLocation: false,
      locationErr: null
    };
  },
  created() {
    if (!("geolocation" in navigator)) {
      this.locationErr = "Geolocation is not available.";
      this.$buefy.toast.open({
        message: this.locationErr,
        type: "is-danger"
      });
      return;
    }
    this.gettingLocation = true;
    // get position
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.gettingLocation = false;
        this.location = pos;
      },
      err => {
        this.gettingLocation = false;
        this.locationErr = err.message;
        this.$buefy.toast.open({
          message: this.locationErr,
          type: "is-danger"
        });
      }
    );
  },
  computed: {
    isStatusPending() {
      return this.$store.getters["booking/status"] === "pending";
    }
  },
  methods: {
    async addBooking() {
      const startTime = moment(this.start_time.getTime());
      const endTime = moment(this.end_time.getTime());
      if (this.locationErr) {
        this.$buefy.toast.open({
          message: this.locationErr,
          type: "is-danger"
        });
      } else if (startTime <= endTime) {
        const booking = {
          start_time: startTime.format(),
          end_time: endTime.format(),
          pricing_type: this.pricing_type,
          latitude: this.location.coords.latitude,
          longitude: this.location.coords.longitude
        };
        const isError = await this.$store.dispatch(
          "booking/addBooking",
          booking
        );
        if (isError) {
          this.$buefy.toast.open({
            message: "Error in adding booking",
            type: "is-danger"
          });
        } else {
          this.$buefy.toast.open({
            message: "Booking added successfully",
            type: "is-success"
          });
        }
      } else {
        this.$buefy.toast.open({
          message: "Start Time should be lesser than End time",
          type: "is-danger"
        });
      }
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
