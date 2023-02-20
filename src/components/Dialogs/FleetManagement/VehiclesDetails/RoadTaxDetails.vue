<template>
  <div class="mb-5">
    <h6 class="ml-2">Road Tax Details</h6>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-8">
      <h5 class="required dialog-label-text">Vendor</h5>
      <DropDown
        :state="details.road_tax_vendor"
        code="code"
        :data="Vendor"
        label="Vendor"
        id="VendorTwo"
        v-model="details.road_tax_vendor"
        :value="details.road_tax_vendor"
        :classes="{
          'p-invalid': v$.details.road_tax_vendor.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Tax_Amount</h5>
      <TextField
        label="Tax_Amount"
        type="number"
        v-model="details.road_tax_amount"
        @blur="v$.details.road_tax_amount.$model;"
        :classes="{
          'p-invalid': v$.details.road_tax_amount.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Tax From Date</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            class="fleetsCalendar"
            v-model="details.road_tax_from"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.road_tax_from.$invalid && submitted,
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
      <h5 class="required dialog-label-text">Tax To Date</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            class="fleetsCalendar"
            v-model="details.road_tax_to"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.road_tax_to.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Remarks</h5>
      <TextAreaField
        :state="details.road_tax_remarks"
        label="remarks"
        rows="2"
        v-model="details.road_tax_remarks"
        @blur="v$.details.road_tax_remarks.$model;"
        :classes="{
          'p-invalid': v$.details.road_tax_remarks.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div>
    <DragAndDropUpload
      :state="roadTaxAttachmentsState"
      type="vehicleDetails"
      storePath="fleets"
    />
  </div>
  <div
    class="
      flex
      justify-content-between
      w-full
      align-content-start
      py-3
      flex-wrap
    "
  >
    <div class="align-self-center flex">
      <Buttons
        label="Previous"
        v-on:childToParent="goBack"
        class="p-button-outlined mr-1 dialog-button-text previous-btn ml-2"
      />
    </div>
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
  </div>
</template>

<script>
import moment from "moment";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "roadTaxDetails",
  data: () => ({
    roadTaxAttachmentsState: " ",
    date: null,
    Vendor: [
      { name: "RTA - Road Transport Authority ", code: "1" },
      { name: "RTA - Road Transport Authority ", code: "2" },
    ],
    v$: useVuelidate(),
    details: {
      road_tax_vendor: "",
      road_tax_amount: "",
      road_tax_from: "",
      road_tax_to: "",
      road_tax_remarks: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        road_tax_vendor: { required },
        road_tax_amount: { required },
        road_tax_from: { required },
        road_tax_to: { required },
        road_tax_remarks: { required },
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
    reverseDropDownFilter(data, checkerCode, inputName) {
      for (var dd in data) {
        if (inputName == data[dd][checkerCode]) {
          return data[dd].code;
        }
      }
    },
    goBack() {
      this.$store.state.sales.stepperNavigation = "InsuranceDetails";
      this.$store.state.commonStore.attachmentsTag = "InsuranceDetails";
    },
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMMM YYYY");
        return formattedDate;
      }
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        for (let d in this.details) {
          if (d == "road_tax_vendor") {
            if (isNaN(this.details[d]) == false) {
              this.$store.state.fleets.vehicleDetailsFormData[d] =
                this.dropDownFilter(this.Vendor, "code", this.details[d]);
            } else {
              this.$store.state.fleets.vehicleDetailsFormData[d] =
                this.details[d];
            }
          } else if (d == "road_tax_from" || d == "road_tax_to") {
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

        this.$store.state.fleets.vehicleDetailsFormData[
          "road_tax_attachments"
        ] = this.$store.state.fleets.vehicleDetailsRoadTaxFiles;

        this.$store.state.sales.stepperNavigation = "CoeDetails";
        this.$store.state.commonStore.attachmentsTag = "CoeDetails";
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.fleets.vehiclesFormStateData).length != 0
      ) {
        this.roadTaxAttachmentsState =
          this.$store.state.fleets.vehiclesFormStateData[
            "fleet_vehicle_road_tax_attachments"
          ];
        this.$store.state.fleets.vehicleDetailsRoadTaxFiles =
          this.$store.state.fleets.vehiclesFormStateData[
            "fleet_vehicle_road_tax_attachments"
          ];
        for (let state in this.details) {
          if (state == "road_tax_from" || state == "road_tax_to") {
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

<style scoped>
.roadTax {
  font-size: 14px;
  font-weight: 600;
}
</style>
