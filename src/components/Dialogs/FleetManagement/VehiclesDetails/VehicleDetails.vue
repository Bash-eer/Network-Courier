<template>
  <div class="mb-5">
    <h6 class="ml-3 mb-3 text-black">Vehicle Details</h6>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Vehicle Reg Date</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            class="fleetsCalendar"
            icon="pi pi-calendar-times"
            v-model="details.reg_date"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.reg_date.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Vehicle Purchase Date</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            class="fleetsCalendar"
            icon="pi pi-calendar-times"
            v-model="details.purchase_date"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.purchase_date.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
          />
        </div>
      </div>
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Driver Name</h5>
      <DropDown
        code="code"
        :state="details.driver_id"
        :key="$store.state.fleets.driversDropDown"
        :data="$store.state.fleets.driversDropDown"
        label="Driver_Name"
        id="Driver_Name"
        v-model="details.driver_id"
        :value="details.driver_id"
        :classes="{
          'p-invalid': v$.details.driver_id.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">COE Expiry Date</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            class="fleetsCalendar"
            icon="pi pi-calendar-times"
            v-model="details.coe_expiry_date"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.coe_expiry_date.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
          />
        </div>
      </div>
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Depreciation Type</h5>
      <DropDown
        code="code"
        :state="details.depreciation_type"
        :data="Depreciation_Type"
        label="Depreciation_Type"
        id="Depreciation_Type"
        v-model="details.depreciation_type"
        :value="details.depreciation_type"
        :classes="{
          'p-invalid': v$.details.depreciation_type.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">GPS IMEI</h5>
      <TextField
        label="gps_imei"
        type="text"
        v-model="details.gps_imei"
        @blur="v$.details.gps_imei.$model;"
        :classes="{
          'p-invalid': v$.details.gps_imei.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Odometer Reading</h5>
      <TextField
        label="odo_meter"
        type="number"
        v-model="details.odo_meter"
        @blur="v$.details.odo_meter.$model;"
        :classes="{
          'p-invalid': v$.details.odo_meter.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="align-self-center flex"></div>
  <div class="flex align-self-center justify-content-end">
    <Buttons
      label="Cancel"
      v-on:childToParent="closeDialog"
      class="p-button-outlined mr-1 dialog-button-text"
    />
    <Buttons
      label="Next"
      button_class="dialog-button-text"
      v-on:childToParent="submitData"
    />
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import moment from "moment";
export default {
  name: "vehicleDetails",
  data: () => ({
    date: null,
    Depreciation_Type: [
      { name: "Type1 ", code: "1" },
      { name: "Type2", code: "2" },
    ],
    v$: useVuelidate(),
    details: {
      reg_date: "",
      purchase_date: "",
      driver_id: "",
      coe_expiry_date: "",
      depreciation_type: "",
      gps_imei: "",
      odo_meter: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        reg_date: { required },
        purchase_date: { required },
        driver_id: { required },
        coe_expiry_date: { required },
        depreciation_type: { required },
        gps_imei: { required },
        odo_meter: { required },
      },
    };
  },
  methods: {
    dropDownFilter(data, checkerCode, inputCode) {
      for (var dd in data) {
        if (inputCode == data[dd][checkerCode]) {
          return data[dd].name;
        }
      }
    },
    reverseDropDownFilter(data, checkerCode, inputCode) {
      for (var dd in data) {
        if (inputCode == data[dd][checkerCode]) {
          return data[dd].code;
        }
      }
    },
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    submitData() {
      if (
        this.v$.$invalid &&
        this.$store.state.fleets.vehicleDetailsSubmittedValidation.$invalid
      ) {
        this.submitted = true;
        this.$store.state.fleets.vehicleDetailsSubmitted = true;
      }
      if (
        !this.v$.$invalid &&
        this.$store.state.fleets.vehicleDetailsSubmittedValidation.$invalid
      ) {
        this.$store.state.fleets.vehicleDetailsSubmitted = true;
      }
      if (
        this.v$.$invalid &&
        !this.$store.state.fleets.vehicleDetailsSubmittedValidation.$invalid
      ) {
        this.submitted = true;
      }
      if (
        !this.v$.$invalid &&
        !this.$store.state.fleets.vehicleDetailsSubmittedValidation.$invalid &&
        this.$store.state.fleets.globalImageUploadURL != null
      ) {
        for (let d in this.details) {
          if (d == "depreciation_type") {
            if (isNaN(this.details[d]) == false) {
              this.$store.state.fleets.vehicleDetailsFormData[d] =
                this.dropDownFilter(
                  this.Depreciation_Type,
                  "code",
                  this.details[d]
                );
            } else {
              this.$store.state.fleets.vehicleDetailsFormData[d] =
                this.details[d];
            }
          } else if (
            d == "reg_date" ||
            d == "purchase_date" ||
            d == "coe_expiry_date"
          ) {
            let rawDate = new Date(this.details[d]);
            let date = rawDate.getDate();
            let month = rawDate.getMonth();
            month += 1;
            let year = rawDate.getFullYear();
            let dateString = year + "-" + month + "-" + date;
            this.$store.state.fleets.vehicleDetailsFormData[d] = dateString;
          } else {
            this.$store.state.fleets.vehicleDetailsFormData[d] =
              this.details[d];
          }
        }
        for (let v in this.$store.state.fleets.vehicleDetailsData) {
          this.$store.state.fleets.vehicleDetailsFormData[v] =
            this.$store.state.fleets.vehicleDetailsData[v];
        }
        if (
          this.$store.state.fleets.vehicleDetailsSubmittedValidation.$invalid
        ) {
          this.$store.state.fleets.vehicleDetailsSubmitted = true;
        }
        if (
          !this.$store.state.fleets.vehicleDetailsSubmittedValidation.$invalid
        ) {
          this.$store.state.sales.stepperNavigation = "InsuranceDetails";
          this.$store.state.commonStore.attachmentsTag = "InsuranceDetails";
        }
      }
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMMM YYYY");
        return formattedDate;
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.fleets.vehiclesFormStateData).length != 0
      ) {
        this.$store.state.fleets.vehiclesFormStateData["image_url"];
        for (let state in this.details) {
          if (state == "driver_id") {
            this.details["driver_id"] =
              this.$store.state.fleets.vehiclesFormStateData["driver_name"];
          } else if (
            state == "reg_date" ||
            state == "purchase_date" ||
            state == "coe_expiry_date"
          ) {
            let rawDate = new Date(
              this.$store.state.fleets.vehiclesFormStateData[state]
            );
            this.details[state] = this.dateFormater(rawDate);
          } else {
            this.details[state] =
              this.$store.state.fleets.vehiclesFormStateData[state];
          }
        }
      }
    },
  },
  created() {
    this.loadState();
  },
};
</script>

<style></style>
