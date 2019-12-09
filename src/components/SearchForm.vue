<template>
  <div>
    <form @submit.prevent="fetchLocations">
      <b-field grouped>
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
            placeholder="End time (optional)"
            v-model="search.end_time"
            :min-datetime="currentTime"
          ></b-datetimepicker>
        </b-field>
        <b-field>
          <p class="control">
            <b-button
              class="button is-primary"
              native-type="submit"
              :loading="isStatusPending"
              >Search</b-button
            >
          </p>
        </b-field>
      </b-field>
    </form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "SearchForm",
  data: function() {
    return {
      minimumTime: new Date()
    };
  },
  computed: {
    ...mapGetters({
      search: "search/search_form_data"
    }),
    isStatusPending() {
      return this.$store.getters["search/status"] === "pending";
    }
  },
  created() {
    setInterval(() => {
      this.currentTime = new Date();
      if (
        this.search.end_time &&
        Math.trunc(this.search.end_time.getTime() / 60000) -
          Math.trunc(new Date().getTime() / 60000) <
          0
      ) {
        this.search.end_time = new Date();
      }
    }, 1000);
  },
  methods: {
    async fetchLocations() {
      let search = {};
      search.parking_address = this.search.parking_address;
      if (this.search.end_time) {
        search.end_time = moment(this.search.end_time.getTime()).format();
      }
      this.$store.dispatch("search/fetchLocations", search);
    }
  }
};
</script>
