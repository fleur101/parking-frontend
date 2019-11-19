<template>
  <div>
    <form @submit.prevent="fetchLocations">
      <b-field>
        <b-input
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
            :loading="status == 'pending'"
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
  props: ["status", "locations"],
  data: function() {
    return {
      search: {},
      datetime: new Date()
    };
  },
  methods: {
    async fetchLocations() {
      this.$emit("update:status", "pending");
      try {
        let search = {};
        search.parking_address = this.search.parking_address;
        if (this.search.end_time) {
          search.end_time = moment(this.datetime.getTime()).format();
        }
        let response = await this.$axios.post("/search", search);
        this.$emit("update:locations", response.data);
        this.$emit("update:status", "done");
      } catch (e) {
        this.$emit("update:status", "fail");
        this.$buefy.toast.open({
          message: "Error occured",
          type: "is-danger"
        });
      }
    }
  }
};
</script>
