<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <h1 class="title">Parking X</h1>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">Home</b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div v-if="isAuthenticated" class="buttons">
          <strong class="user">User: {{ user.name }}</strong>
          <a class="button is-danger" @click="logout">
            <strong>Logout</strong>
          </a>
        </div>
        <div v-if="!isAuthenticated" class="buttons">
          <b-navbar-item
            tag="router-link"
            :to="{ path: '/signup' }"
            class="button is-primary"
          >
            <strong>Sign up</strong>
          </b-navbar-item>
          <b-navbar-item
            tag="router-link"
            :to="{ path: '/login' }"
            class="button is-light"
          >
            <strong>Login</strong>
          </b-navbar-item>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "navbar",
  computed: {
    ...mapGetters({
      isAuthenticated: "user/isAuthenticated",
      user: "user/get"
    })
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout");
    }
  }
};
</script>

<style lang="scss" scoped>
.user {
  margin-right: 25px;
  margin-top: -0.3rem;
}
</style>
