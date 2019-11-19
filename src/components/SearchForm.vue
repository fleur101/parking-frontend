<template>
  <div>
    <form @submit.prevent="fetchLocations">
      <b-field>
        <b-input
          placeholder="Search..."
          type="search"
          v-model="search.parking_address"
        ></b-input>
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
export default {
  name: "SearchForm",
  props: ["status", "locations"],
  data: function() {
    return {
      search: {}
    };
  },
  methods: {
    async fetchLocations() {
      this.$emit("update:status", "pending");
      try {
        let response = await this.$axios.post("/search", this.search);
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
