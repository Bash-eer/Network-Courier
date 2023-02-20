<template>
  <div class="formgrid grid">
    <div class="field col-6 md:col-3">
      <h5 class="required dialog-label-text">From Date & Time</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            :showTime="true"
            :showSeconds="true"
            dateFormat="d MM yy"
            class="fleetsCalendar"
            v-model="details.from_date_time"
            :showIcon="true"
            style="width: 100%"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
            :class="{
              'p-invalid': v$.details.from_date_time.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
    </div>
    <div class="field col-6 md:col-3">
      <h5 class="required dialog-label-text">To Date & Time</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            :showTime="true"
            :showSeconds="true"
            dateFormat="d MM yy"
            class="fleetsCalendar"
            v-model="details.to_date_time"
            :showIcon="true"
            style="width: 100%"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
            :class="{
              'p-invalid': v$.details.to_date_time.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
    </div>
    <div class="col-4 md:col-2  mr-btn margin-top-35px">
      <Buttons
        label="Check Now"
        button_class="dialog-button-text "
        v-on:childToParent="submitData"
      />
    </div>
  </div>
  <div v-if="show == false">
    <br />
    <img
      src="https://usercontent.one/wp/www.connectingeuropeexpress.eu/wp-content/uploads/2021/08/Icons-13-uai-258x248.png?media=1630097194"
      alt=""
    />
    <p>Enter date and time to check availability</p>
  </div>
  <div v-if="show == true">
    <CurrentStatus />
  </div>
  <br />
  <br /><br />
</template>

<script>
import moment from "moment";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import CurrentStatus from "./CurrentStatus.vue";
export default {
  components: { CurrentStatus },
  data() {
    return {
      show: false,
      v$: useVuelidate(),
      details: {
        from_date_time: "",
        to_date_time: "",
      },
      submitted: false,
    };
  },
  validations() {
    return {
      details: {
        from_date_time: { required },
        to_date_time: { required },
      },
    };
  },
  methods: {
    returnBack() {
      this.$router.push("/contact-management");
    },
    dateAndTimeFormatter(date) {
      return moment(date).utcOffset("+8:00").format();
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.$store.state.contacts.CurrentRoomsStatusData = [];
        let roomsAvailabiltyDetails = {};
        for (let d in this.details) {
          roomsAvailabiltyDetails[d] = this.dateAndTimeFormatter(
            this.details[d]
          );
        }
        this.$store.state.contacts.roomsAvailabiltyDetails =
          roomsAvailabiltyDetails;
        this.$store.dispatch("contacts/loadAvailableRooms", {
          path: "availableRooms",
          mutation: "fetchCurrentStatusOfRooms",
          data: roomsAvailabiltyDetails,
        });
        this.show = true;
      }
    },
  },
};
</script>

<style scoped>
.mr-btn {
  margin-left: -50px !important;
}
</style>
