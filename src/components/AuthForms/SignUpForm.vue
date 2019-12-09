<template>
  <section class="wrapper">
    <h1>Sign Up</h1>
    <form @submit.prevent="register">
      <div v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </div>

      <b-field>
        <b-input
          required="true"
          v-model="user.email"
          placeholder="email"
          type="email"
        />
      </b-field>

      <b-field>
        <b-input required="true" v-model="user.name" placeholder="name" />
      </b-field>

      <b-field>
        <b-input
          required="true"
          v-model="user.username"
          placeholder="username"
        />
      </b-field>

      <b-field>
        <b-input
          type="password"
          required="true"
          v-model="user.password"
          password-reveal
          placeholder="password"
        ></b-input>
      </b-field>

      <b-field>
        <b-input
          type="password"
          required="true"
          v-model="user.confirmPassword"
          password-reveal
          placeholder="confirm password"
        ></b-input>
      </b-field>

      <b-button class="form__btn" native-type="submit" :loading="pending"
        >Sign Up</b-button
      >
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      errors: [],
      pending: false
    };
  },
  methods: {
    async register() {
      this.pending = true;
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
            message: "Registration failed",
            type: "is-danger"
          });
          this.errors = errors;
        }
      } else {
        this.errors = ["Passwords do not match"];
      }
      this.pending = false;
    }
  }
};
</script>
