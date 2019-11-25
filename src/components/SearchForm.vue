<template>
  <div>
    <form @submit.prevent="fetchLocations">
      <b-field>
        <b-input
          required
          placeholder="Search..."
          type="search"
          v-model="search.parking_address"
        ></b-input>
      </b-field>
      <b-field>
        <b-datetimepicker
          v-if="search.end_time"
          placeholder="Click to select date time..."
          v-model="datetime"
        ></b-datetimepicker>
      </b-field>
      <b-field>
        <b-switch v-model="search.end_time">End Time</b-switch>
        <p class="control">
          <b-button
            class="button is-primary"
            native-type="submit"
            :loading="isStatusPending"
            >Search</b-button
          >
        </p>
      </b-field>
    </form>
  </div>
</template>
<script>
import moment from "moment";

export default {
  name: "SearchForm",
  data: function() {
    return {
      search: {},
      datetime: new Date()
    };
  },
  computed: {
    isStatusPending() {
      return this.$store.getters["search/status"] === "pending";
    }
  },
  methods: {
    async fetchLocations() {
      let search = {};
      search.parking_address = this.search.parking_address;
      if (this.search.end_time) {
        search.end_time = moment(this.datetime.getTime()).format();
      }
      this.$store.dispatch("search/fetchLocations", search);
    }
  }
};
</script>
