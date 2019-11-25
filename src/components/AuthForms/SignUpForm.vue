<template>
  <div class="container">
    <h1>Sign Up</h1>
    <form @submit.prevent="requestSignUp">
      <div v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </div>

      <div class="form-group">
        <label>Email:</label>
        <input
          type="email"
          class="form-control"
          required="true"
          v-model="user.email"
        />
      </div>

      <div class="form-group">
        <label>Name:</label>
        <input
          type="text"
          class="form-control"
          required="true"
          v-model="user.name"
        />
      </div>

      <div class="form-group">
        <label>Username:</label>
        <input type="text" class="form-control" v-model="user.username" />
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
        <label>Confirm Password:</label>
        <input
          type="password"
          required="true"
          class="form-control"
          v-model="user.confirmPassword"
        />
      </div>

      <div class="form-group">
        <button class="btn btn-primary">Sign Up</button>
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
    async requestSignUp() {
      let { password, confirmPassword } = this.user;
      let isPasswordValid = password == confirmPassword;

      if (isPasswordValid) {
        const errors = await this.$store.dispatch("user/register", {
          user: { ...this.user }
        });
        if (!errors) {
          this.$buefy.toast.open({
            message: "Registered and Login successfully",
            type: "is-success"
          });
          this.$router.push("/");
        } else {
          this.$buefy.toast.open({
            message: "Registeration failed",
            type: "is-danger"
          });
        }
      } else {
        this.errors.push("Passwords do not match");
      }
    }
  }
};
</script>
