<template>
  <div class="signup">
     <SignUpForm />
  </div>
</template>

<script>
// @ is an alias to /src
import SignUpForm from "@/components/AuthForms/SignUpForm.vue";

export default {
  name: "signup",
  components: {
    SignUpForm
  }
};
</script>
