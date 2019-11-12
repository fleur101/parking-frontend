<template>
  <div class="container">
    <h1>Login</h1>
    <form @submit.prevent="requestLogIn">
      <div class="form-group">
        <label>Username:</label>
        <input type="text" class="form-control" required="true" v-model="user.username">
      </div>

      <div class="form-group">
        <label>Password:</label>
        <input type="password" required="true" class="form-control" v-model="user.password">
      </div>

      <div class="form-group">
        <button class="btn btn-primary">Log In</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        user: {},
        errors: []
      }
    },
    methods: {
      requestLogIn(){
        console.log(this.user.username);
      }
    }
  }
</script>
