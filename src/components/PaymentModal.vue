<template>
  <b-modal
    :active.sync="show"
    has-modal-card
    trap-focus
    aria-role="dialog"
    aria-modal
  >
    <form action="">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Booking Payment Modal</p>
        </header>
        <section class="modal-card-body">
          <h3>Please enter your payment details:</h3>
          <label for="card">Credit Card</label>
          <p>
            Test using this credit card:
            <span class="cc-number">4242 4242 4242 4242</span>
          </p>
          <p>and enter any 5 digits for the zip code</p>
          <br />
          <card
            class="stripe-card"
            :class="{ payment_complete }"
            stripe="pk_test_y5NSigQERlpCNpq8dHlkGVmy00gyIO7KiY"
            @change="setPaymentComplete($event.complete)"
          />
          <br />
          <b-button
            class="button is-primary"
            :loading="isPaymentStatusPending"
            :disabled="!payment_complete"
            @click.prevent="pay"
            >Pay with credit card</b-button
          >
        </section>
      </div>
    </form>
  </b-modal>
</template>

<script>
import { mapGetters } from "vuex";
import { Card } from "vue-stripe-elements-plus";

export default {
  props: ["show", "params", "paymentAction"],
  computed: {
    ...mapGetters({
      payment_complete: "search/payment_complete"
    }),
    isPaymentStatusPending() {
      return this.$store.getters["search/payment_status"] === "pending";
    }
  },
  components: {
    Card
  },
  methods: {
    async pay() {
      const { params } = this;
      const isError = await this.$store.dispatch(this.paymentAction, {
        ...params
      });
      if (isError) {
        this.$buefy.toast.open({
          message: "Error in Payment, please try again",
          type: "is-danger"
        });
      } else {
        this.$buefy.toast.open({
          message: "Payment done successfully",
          type: "is-success"
        });
        this.$emit("success");
      }
    },
    setPaymentComplete(complete) {
      this.$store.commit("search/setPaymentComplete", complete);
    }
  }
};
</script>

<style scoped></style>
