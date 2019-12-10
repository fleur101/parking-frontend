<template>
  <div id="wrapper">
    <p>Hi, {{ user.name }}!</p>
    <br />
    <div>
      <b-field label="Montly Payment Setting:">
        <b-switch
          :value="user.monthly_paying"
          @input="togglePaymentSetting"
          type="is-success"
        >
          Yes
        </b-switch>
      </b-field>
    </div>
    <br />
    <div>
      <p>Your current bookings:</p>
      <b-table :data="bookings">
        <template slot-scope="props">
          <b-table-column field="id" label="ID" width="40" numeric>
            {{ props.row.id }}
          </b-table-column>

          <b-table-column field="payment_status" label="Payment Status">
            {{ props.row.payment_status }}
          </b-table-column>

          <b-table-column field="pricing_zone" label="Zone">
            {{ props.row.pricing_zone }}
          </b-table-column>
          <b-table-column field="pricing_type" label="Pricing Type">
            {{ props.row.pricing_type }}
          </b-table-column>
          <b-table-column field="start_time" label="Start time">
            {{ formatTime(props.row.start_time) }}
          </b-table-column>
          <b-table-column field="end_time" label="End time">
            {{ formatTime(props.row.end_time) }}
          </b-table-column>
          <b-table-column field="extend" label="Extend">
            <router-link :to="{ path: `/extend/${props.row.id}` }"
              >extend</router-link
            >
          </b-table-column>
        </template>

        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>
                <b-icon icon="emoticon-sad" size="is-large"> </b-icon>
              </p>
              <p>Nothing here.</p>
            </div>
          </section>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "profile",
  created() {
    this.$store.dispatch("booking/fetchBookings");
  },
  computed: {
    ...mapGetters({
      user: "user/get",
      bookings: "booking/bookings"
    })
  },
  methods: {
    formatTime(timeString) {
      return moment(timeString).format("lll");
    },
    async togglePaymentSetting() {
      const error = await this.$store.dispatch("user/togglePaymentSetting");
      if (!error) {
        this.$buefy.toast.open({
          message: "Monthly payment setting changed successfully",
          type: "is-success"
        });
      } else {
        this.$buefy.toast.open({
          message: "Monthly payment setting failed to change",
          type: "is-danger"
        });
      }
    }
  }
};
</script>

<style lang="sass">
#wrapper
  width: 1000px;
  margin: 40px auto;

.panel
  padding-top: 50px;
</style>
