<template>
  <div id="app">
    <navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import connectUser from "./lib/socket";

export default {
  name: "app",
  components: { Navbar },
  created() {
    const token = localStorage.getItem("jwt-token");
    if (token) {
      this.$store.dispatch("user/loadUser", token);
    }
    this.$store.subscribe(mutation => {
      console.log(mutation);
      if (mutation.type === "user/addUserAndToken") {
        if (mutation.payload.user && mutation.payload.user.id) {
          console.log("Subscribing to user notifications channel");
          const channel = connectUser(
            mutation.payload.token,
            mutation.payload.user.id
          );
          channel.on("requests", ({ msg, booking_id }) => {
            console.log("There is a message!");

            this.$buefy.snackbar.open({
              message: msg,
              type: "is-warning",
              position: "is-bottom-right",
              duration: 10000,
              actionText: "Extend",
              onAction: () => {
                this.$router.push(`/extend/${booking_id}`);
              }
            });
          });
          channel
            .join()
            .receive("ok", resp => {
              console.log("Joined successfully", resp);
            })
            .receive("error", resp => {
              console.log("Unable to join", resp);
            });
          console.log(channel);
          console.log("Subscribed to the channel");
        }
      }
    });
  }
};
</script>

<style lang="sass">
#app
  font-family: "Avenir", Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50

#nav
  padding: 30px

  a
    font-weight: bold
    color: #2c3e50

    &.router-link-exact-active
      color: #42b983
</style>
