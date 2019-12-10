<template>
  <div id="wrapper">
    <h2>Extending time for booking #{{ $route.params.bid }}</h2>
    <br />
    <form @submit.prevent="() => (isPaymentOpen = true)">
      <b-field>
        <b-datetimepicker
          required
          placeholder="Click to select end time..."
          v-model="input_time"
          :min-datetime="min_time"
        ></b-datetimepicker>
      </b-field>
      <b-field>
        <b-button
          class="button is-primary"
          native-type="submit"
          :loading="pending"
          >Proceed to payment</b-button
        >
      </b-field>
    </form>
    <PaymentModal
      :show="isPaymentOpen"
      :params="{ end_time, booking_id }"
      paymentAction="search/payExtension"
      @success="() => this.$router.push('/profile')"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import PaymentModal from "@/components/PaymentModal";

export default {
  name: "extend",
  data() {
    return {
      pending: false,
      input_time: null,
      isPaymentOpen: false
    };
  },
  created() {
    this.input_time = this.min_time;
  },
  components: {
    PaymentModal
  },
  computed: {
    ...mapGetters({
      bookings: "booking/bookings"
    }),
    old_end_time() {
      return new Date(
        this.bookings.find(el => el.id == this.booking_id).end_time
      );
    },
    min_time() {
      if (new Date() < this.old_end_time) {
        return this.old_end_time;
      }
      return new Date();
    },
    end_time() {
      return moment(this.input_time.getTime()).format();
    },
    booking_id() {
      return this.$route.params.bid;
    }
  }
};
</script>

<style>
#wrapper {
  width: 1000px;
  margin: 40px auto;
}
</style>
