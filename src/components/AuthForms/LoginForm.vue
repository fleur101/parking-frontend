<template>
  <div class="container">
    <h1>Login</h1>
    <form @submit.prevent="requestLogIn">
      <div v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </div>

      <div class="form-group">
        <label>Username:</label>
        <input
          type="text"
          class="form-control"
          required="true"
          v-model="user.username"
        />
      </div>

      <div class="form-group">
        <label>Password:</label>
        <input
          type="password"
          required="true"
          class="form-control"
          v-model="user.password"
        />
      </div>

      <div class="form-group">
        <button class="btn btn-primary">Log In</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      errors: []
    };
  },
  methods: {
    async requestLogIn() {
      const errors = await this.$store.dispatch("user/authenticate", {
        user: { ...this.user }
      });
      if (!errors) {
        this.$buefy.toast.open({
          message: "Logged in successfully",
          type: "is-success"
        });
        this.$router.push("/");
      } else {
        this.$buefy.toast.open({
          message: "Login failed",
          type: "is-danger"
        });
        this.errors = errors;
      }
    }
  }
};
</script>
