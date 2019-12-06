<template>
  <section class="wrapper">
    <h1>Login</h1>
    <form @submit.prevent="login" class="form__login">
      <div v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </div>

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

      <b-button class="form__btn" native-type="submit" :loading="pending"
        >Log In</b-button
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
    async login() {
      this.pending = true;
      const errors = await this.$store.dispatch("user/authenticate", {
        user: { ...this.user }
      });
      this.pending = false;
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
      }
    }
  }
};
</script>

<style lang="sass">
.wrapper
  width: 350px;
  margin: auto;

  h1
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 10px;

  .form__btn
    display: block;
    margin: auto;
</style>
