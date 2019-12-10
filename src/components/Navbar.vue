<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <h1 class="title">Parking X</h1>
      </b-navbar-item>
    </template>
    <template slot="start">
      <template v-if="isAuthenticated">
        <b-navbar-item tag="router-link" :to="{ path: '/profile' }">
          Profile
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          Search
        </b-navbar-item>
      </template>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div v-if="isAuthenticated" class="buttons">
          <strong class="user">User: {{ user.name }}</strong>
          <a class="button is-danger logoutBtn" @click="logout">
            <strong>Logout</strong>
          </a>
        </div>
        <div v-if="!isAuthenticated" class="buttons">
          <router-link :to="{ path: '/signup' }" class="button is-primary">
            <strong>Sign up</strong>
          </router-link>
          <router-link :to="{ path: '/login' }" class="button is-light">
            <strong>Login</strong>
          </router-link>
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

<style lang="sass" scoped>
.user
  margin-right: 25px;
  margin-top: -0.3rem;
</style>
