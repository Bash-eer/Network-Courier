<template>
  <!-- <div class="text_style"> New Call Trip </div> -->
  <div class="formgrid grid mt-3">
    <div class="field col-12 md:col-6">
      <h5 class="required color-7a7a7a text-xs">Trip Code</h5>
      <TextField
        label="caller"
        autofocus
        id="caller"
        code="name"
        v-model="details.trip_code"
        :classes="{
          'p-invalid': v$.details.trip_code.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required color-7a7a7a text-xs">Trip Name</h5>
      <div clas="flex">
        <TextField
          v-model="details.trip_name"
          class="contactsCalendar"
          :classes="{
            'p-invalid': v$.details.trip_name.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
  </div>
  <div class="formgrid grid mt-3">
    <div class="field col-12 md:col-3">
      <h5 class="required color-7a7a7a text-xs" for="time24">From</h5>
      <Calendar
        :showIcon="true"
        :showTime="true"
        :timeOnly="true"
        class="full-width"
        label="from"
        v-model="details.from_date"
        :class="{
          'p-invalid': v$.details.from_date.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-3">
      <h5 class="required color-7a7a7a text-xs" for="time24">To</h5>
      <div clas="flex" :key="renderkey">
        <Calendar
          :showIcon="true"
          :showTime="true"
          :timeOnly="true"
          v-model="details.to_date"
          :class="{
            'p-invalid': v$.details.to_date.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
    <div class="field col-12 md:col-3">
      <h5 class="required color-7a7a7a text-xs">Trip Type</h5>
      <DropDown
        :state="details.type"
        label="type"
        id="type"
        code="name"
        :data="type"
        :key="details.type"
        v-model="details.type"
        :class="{
          'p-invalid': v$.details.type.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-3">
      <h5 class="required dcolor-7a7a7a text-xs">Trip Days</h5>
      <DropDown
        :state="details.trip_days"
        :data="trip_days"
        label="trip_days"
        id="trip_days"
        code="name"
        :key="details.trip_days"
        v-model="details.trip_days"
        :class="{
          'p-invalid': v$.details.trip_days.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="field col-12 md:col-3">
    <h5 class="required color-7a7a7a text-xs text-left">Grace Period (mins)</h5>
    <NumberField
      :showButtons="true"
      :max="0"
      mode="decimal"
      v-model="details.grace_period"
      :class="{
        'p-invalid': v$.details.grace_period.$invalid && submitted,
        'inputfield w-full dialog-dropdown-text ': true,
      }"
    />
  </div>
  <div
    class="
      flex
      justify-content-between
      w-full
      align-content-center
      py-3
      flex-wrap
    "
  >
    <div class="align-self-center flex"></div>
    <div class="flex align-self-center justify-content-end">
      <CancelButton
        storePath="operationAllotment"
        label="Cancel"
        class="color-357dea text-xs"
      />
      <Buttons
        label="Save"
        button_class="save_button"
        v-on:childToParent="submitData"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
const { URL } = require("../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { mapActions } from "vuex";
export default {
  name: "AllotmentDialog",
  props: ["ButtonName", "options", "defaultTransportType"],
  data() {
    return {
      details: {
        trip_code: "",
        trip_name: "",
        from_date: "",
        to_date: "",
        type: "",
        trip_days: "",
        grace_period: "",
      },
      renderkey: 10,
      type: [
        { name: "Normal", code: "1" },
        { name: "Ecommerce", code: "2" },
      ],
      trip_days: [
        { name: "Weekly", code: "1" },
        { name: "Monthly", code: "2" },
      ],
      v$: useVuelidate(),
      submitted: false,
    };
  },
  validations() {
    return {
      details: {
        trip_code: { required },
        trip_name: { required },
        from_date: { required },
        to_date: { required },
        type: { required },
        trip_days: { required },
        grace_period: { required },
      },
    };
  },
  methods: {
    ...mapActions({
      loadBikeAllotmentTableData:
        "operationAllotment/loadBikeAllotmentTableData",
    }),
    getUserInput(label, value) {
      if (label == "from" || label == "to") {
        this.details[label] = moment(value).format("HH:mm");
      }
      this.$emit("getData", { data: this.details });
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please fill in all the required fields.",
          life: 3000,
        });
      }
      if (!this.v$.$invalid) {
        if (this.$store.state.operationAllotment.RiderAllotmentStateData?.id) {
          if (
            this.$store.state.operationAllotment
              .addRegionDeliveryTransportType == "Bike"
          ) {
            this.apiPatchCallHandlerBike();
          } else if (
            this.$store.state.operationAllotment
              .addRegionDeliveryTransportType == "Van"
          ) {
            this.apiPatchCallHandlerVan();
          } else if (
            this.$store.state.operationAllotment
              .addRegionDeliveryTransportType == "Rapido"
          ) {
            this.apiPatchCallHandlerRapido();
          }
        } else {
          if (
            this.$store.state.operationAllotment
              .addRegionDeliveryTransportType == "Bike"
          ) {
            this.addBikeZoneData();
          } else if (
            this.$store.state.operationAllotment
              .addRegionDeliveryTransportType == "Van"
          ) {
            this.addVanZoneData();
          } else if (
            this.$store.state.operationAllotment
              .addRegionDeliveryTransportType == "Rapido"
          ) {
            this.addRapidoZoneData();
          }
        }
      }
    },

    addBikeZoneData() {
      this.$store.dispatch("operationAllotment/POSTPATCHCRUDOPERATION", {
        path: "/operations/rider-allot/bike/calltrips",

        data: this.details,
        method: "POST",
        loadData: "operationAllotment/loadBikeAllotmentTableData",
        closeDialogue: "operationAllotment/closeDialog",
        loadDiffStore: true,
        toastData: {
          toastSuccessData: {
            toastMsg: `The Profile is created successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Profile already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in creating the profile, try again!",

            toastSeverity: "error",
          },
        },
      });
    },

    addVanZoneData() {
      this.$store.dispatch("operationAllotment/POSTPATCHCRUDOPERATION", {
        path: "/operations/rider-allot/van/calltrips",

        data: this.details,
        method: "POST",
        loadData: "operationAllotment/loadVanAllotmentTableData",
        closeDialogue: "operationAllotment/closeDialog",
        loadDiffStore: true,
        toastData: {
          toastSuccessData: {
            toastMsg: `The Profile is created successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Profile already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in creating the profile, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
    addRapidoZoneData() {
      this.$store.dispatch("operationAllotment/POSTPATCHCRUDOPERATION", {
        path: "/operations/rider-allot/rapido/calltrips",

        data: this.details,
        method: "POST",
        loadData: "operationAllotment/loadRapidoAllotmentTableData",
        closeDialogue: "operationAllotment/closeDialog",
        loadDiffStore: true,
        toastData: {
          toastSuccessData: {
            toastMsg: `The Profile is created successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Profile already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in creating the profile, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
    apiPatchCallHandlerBike() {
      this.$store.dispatch("operationAllotment/POSTPATCHCRUDOPERATION", {
        path:
          "/operations/rider-allot/bike/calltrips/" +
          this.$store.state.operationAllotment.RiderAllotmentStateData.id,

        data: this.details,
        method: "PUT",
        loadData: "operationAllotment/loadBikeAllotmentTableData",
        closeDialogue: "operationAllotment/closeDialog",
        loadDiffStore: true,
        toastData: {
          toastSuccessData: {
            toastMsg: `The Profile is updated successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Profile already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in creating the profile, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
    apiPatchCallHandlerVan() {
      this.$store.dispatch("operationAllotment/POSTPATCHCRUDOPERATION", {
        path:
          "/operations/rider-allot/van/calltrips/" +
          this.$store.state.operationAllotment.RiderAllotmentStateData.id,

        data: this.details,
        method: "PUT",
        loadData: "operationAllotment/loadVanAllotmentTableData",
        closeDialogue: "operationAllotment/closeDialog",
        loadDiffStore: true,
        toastData: {
          toastSuccessData: {
            toastMsg: `The Profile is updated successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Profile already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in creating the profile, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
    apiPatchCallHandlerRapido() {
      this.$store.dispatch("operationAllotment/POSTPATCHCRUDOPERATION", {
        //id: this.$store.state.bulkAdjustment.ProfileExpansionData.id,
        path:
          "/operations/rider-allot/rapido/calltrips/" +
          this.$store.state.operationAllotment.RiderAllotmentStateData.id,

        data: this.details,
        method: "PUT",
        loadData: "operationAllotment/loadRapidoAllotmentTableData",
        closeDialogue: "operationAllotment/closeDialog",
        loadDiffStore: true,
        toastData: {
          toastSuccessData: {
            toastMsg: `The Profile is updated successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Profile already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in creating the profile, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
    timeFormatter(type, data) {
      if (type == "from" && type == "to") {
        var newData = data.replace("Z", "");
        var getTime = new Date(newData);
        if (data == null) {
          return "00:00";
        } else if (moment(getTime, "DD/MM/YYYY", true).isValid()) {
          var formattedTime = moment(newData).format("HH:mm");

          return formattedTime;
        } else {
          return data;
        }
      } else {
        return moment(data).format("HH:mm");
      }
    },
    prefillEditData() {
      let incomingData =
        this.$store.state.operationAllotment.RiderAllotmentStateData;
      this.details.trip_code = incomingData.trip_code;
      this.details.trip_name = incomingData.trip_name;
      this.details.from_date = this.timeFormater(incomingData.from_date);
      this.details.to_date = this.timeFormater(incomingData.to_date);
      this.details.type = incomingData.type;
      this.details.trip_days = incomingData.trip_days;
      this.details.grace_period = incomingData.grace_period;
    },

    timeFormater(data) {
      if (!data) return "-";
      let date = moment(data).format("HH:mm");

      if (date === "Invalid date") {
        return data;
      } else {
        return date;
      }
    },
  },

  created() {
    if (this.$store.state.operationAllotment.RiderAllotmentStateData) {
      this.prefillEditData();
    }
  },
  unmounted() {
    this.$store.state.operationAllotment.RiderAllotmentStateData = [];
  },
};
</script>

<style scoped>
.text_style {
  letter-spacing: 0.03em;
  color: #4e5968;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
}
.save_button {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;

  /* White */
  background: #357dea;
  color: #ffffff;
}
</style>