<template>
  <div id="wrapper">
    <SearchForm />
    <div v-if="isStatusDone" class="columns panel">
      <div class="column">
        <b-tabs v-model="activeTab">
          <b-tab-item label="Map">
            <GoogleMap name="locations" @markerClicked="showLocation" />
          </b-tab-item>
          <b-tab-item label="List">
            <ul>
              <li
                v-for="loc in locations"
                v-bind:key="loc.id"
                @click="showLocation(loc.id)"
              >
                Parking: {{ loc.title }}
              </li>
            </ul>
          </b-tab-item>
        </b-tabs>
      </div>
      <div class="column is-two-fifths rightList">
        <div
          class="tile is-vertical notification is-primary"
          v-if="display_location"
        >
          You selected Parking Space:
          <strong>{{ display_location.title }}</strong
          ><br />
          <template v-if="display_location.locations.length <= 0">
            <p>No free Parking Spot available</p>
          </template>
          <template v-else>
            <div
              v-for="loc in display_location.locations"
              class="card"
              :key="loc.id"
            >
              <span v-if="loc.is_available" class="tag is-success"
                >Available</span
              >
              <span v-else class="tag is-danger">Booked</span>
              <div class="card-content">
                <div class="content">
                  <p><strong>Spot: </strong>{{ loc.spot_number }}</p>
                  <p><strong>Pricing Zone: </strong>{{ loc.pricing_zone }}</p>
                  <p v-if="loc.hourly_price">
                    <strong>Hourly Price: </strong>€{{ loc.hourly_price }}
                  </p>
                  <p v-if="loc.realtime_price">
                    <strong>Realtime Price: </strong>€{{ loc.realtime_price }}
                  </p>
                </div>
              </div>
              <footer v-if="loc.is_available" class="card-footer">
                <a
                  @click.prevent="showBookingModal(loc.id)"
                  class="card-footer-item"
                  >Book</a
                >
              </footer>
            </div>
          </template>
        </div>
      </div>
    </div>
    <b-modal
      :active.sync="isBookingModal"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-modal
    >
      <form @submit.prevent="addBooking">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Book Parking Spot</p>
          </header>
          <section class="modal-card-body">
            <b-field>
              <b-datetimepicker
                required
                placeholder="Click to select start time..."
                v-model="start_time"
                :min-datetime="current_date"
              ></b-datetimepicker>
            </b-field>
            <b-field>
              <b-datetimepicker
                required
                placeholder="Click to select end time..."
                v-model="end_time"
                :min-datetime="current_date"
              ></b-datetimepicker>
            </b-field>
            <b-field>
              <b-select
                required
                placeholder="Select pricing type"
                v-model="pricing_type"
              >
                <option value="hourly">Hourly</option>
                <option value="realtime">Real Time</option>
              </b-select>
            </b-field>
            <b-field>
              <p class="control">
                <b-button
                  class="button is-primary"
                  native-type="submit"
                  :loading="isStatusPending"
                  >Add Booking</b-button
                >
              </p>
            </b-field>
          </section>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchForm from "../components/SearchForm";
import GoogleMap from "@/components/GoogleMap";
import moment from "moment";

export default {
  name: "search",
  data() {
    return {
      activeTab: 0,
      isBookingModal: false,
      spot_id: null,
      current_date: new Date(),
      start_time: new Date(),
      end_time: new Date(),
      pricing_type: null
    };
  },
  components: {
    SearchForm,
    GoogleMap
  },
  computed: {
    ...mapGetters({
      locations: "search/locations",
      display_location: "search/display_location"
    }),
    isStatusDone() {
      return this.$store.getters["search/status"] === "done";
    },
    isStatusPending() {
      return this.$store.getters["booking/status"] === "pending";
    }
  },
  methods: {
    showLocation(id) {
      this.isBookingModal = false;
      const location = this.locations.find(loc => loc.id == id);
      this.$store.dispatch("search/setDisplayLocation", location);
    },
    showBookingModal(id) {
      this.spot_id = id;
      this.isBookingModal = true;
    },
    async addBooking() {
      const startTime = moment(this.start_time.getTime());
      const endTime = moment(this.end_time.getTime());
      if (startTime <= endTime) {
        const booking = {
          start_time: startTime.format(),
          end_time: endTime.format(),
          pricing_type: this.pricing_type,
          location_id: this.spot_id
        };
        const isError = await this.$store.dispatch(
          "booking/addBooking",
          booking
        );
        if (isError) {
          this.$buefy.toast.open({
            message: "Error in adding booking",
            type: "is-danger"
          });
        } else {
          this.$buefy.toast.open({
            message: "Booking added successfully",
            type: "is-success"
          });
        }
        this.isBookingModal = false;
      } else {
        this.$buefy.toast.open({
          message: "Start Time should be lesser than End time",
          type: "is-danger"
        });
      }
    }
  }
};
</script>

<style>
#wrapper {
  width: 1000px;
  margin: 40px auto;
}

.panel {
  padding-top: 50px;
}
.card {
  margin-bottom: 10px;
  border-radius: 4px;
  position: relative;
}
.card .content p:not(:last-child) {
  margin-bottom: 0.3em;
}
.card .tag {
  position: absolute;
  right: 8px;
  top: 4px;
}
.rightList {
  max-height: 670px;
  overflow: scroll;
  padding-bottom: 0;
}
.modal-card-body {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.modal-card {
  min-width: 600px;
  min-height: fit-content;
}
</style>
