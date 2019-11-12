<template>
  <div class="container">
    <h1>Sign Up</h1>
    <form @submit.prevent="requestSignUp">
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </p>

      <div class="form-group">
        <label>Email:</label>
        <input type="email" class="form-control" required="true" v-model="user.email">
      </div>

      <div class="form-group">
        <label>Name:</label>
        <input type="text" class="form-control" required="true" v-model="user.name">
      </div>

      <div class="form-group">
        <label>Username:</label>
        <input type="text" class="form-control" v-model="user.username">
      </div>

      <div class="form-group">
        <label>Password:</label>
        <input type="password" required="true" class="form-control" v-model="user.password">
      </div>

      <div class="form-group">
        <label>Confirm Password:</label>
        <input type="password" required="true" class="form-control" v-model="user.confirmPassword">
      </div>

      <div class="form-group">
        <button class="btn btn-primary">Sign Up</button>
      </div>
    </form>
  </div>
</template>

<script>
  import API from "../../lib/api.js"

  export default {
    data(){
      return {
        user: {},
        errors: []
      }
    },
    methods: {
      requestSignUp(){
        let {password, confirmPassword} = this.user
        let isPasswordValid = (password == confirmPassword)

        if(isPasswordValid) {
          let requestBody = {
            user: {
              username: this.user.username,
              password: this.user.password,
              email: this.user.email,
              name: this.user.name
            }
          }

          API.post("/register", requestBody)
          .then(response => {
            this.$toasted.success("Signed Up Successfully");
            this.$router.push("/");
            console.log(response);
            //TODO: Save JWT received in response body in application store (API Needs update)
          })
          .catch(e => {
            this.errors = e.response.data.errors
          })
        } else {
          this.errors.push("Passwords do not match")
        }
      }
    }
  }
</script>
