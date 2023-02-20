<template>
  <div class="mb-5">
    <h6 class="ml-2">Insurance Details</h6>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-8">
      <h5 class="required dialog-label-text">Vendor</h5>
      <DropDown
        code="code"
        :state="details.insurance_vendor"
        :data="Vendor"
        label="Vendor"
        id="Vendor"
        v-model="details.insurance_vendor"
        :value="details.insurance_vendor"
        :classes="{
          'p-invalid': v$.details.insurance_vendor.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Policy Type</h5>
      <TextField
        label="policy_type"
        type="text"
        v-model="details.policy_type"
        @blur="v$.details.policy_type.$model;"
        :classes="{
          'p-invalid': v$.details.policy_type.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Policy No</h5>
      <TextField
        label="policy_no"
        type="text"
        v-model="details.policy_no"
        @blur="v$.details.policy_no.$model;"
        :classes="{
          'p-invalid': v$.details.policy_no.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Policy From Date</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            class="fleetsCalendar"
            v-model="details.policy_from"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.policy_from.$invalid && submitted,
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
      <h5 class="required dialog-label-text">Policy To Date</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            class="fleetsCalendar"
            v-model="details.policy_to"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.policy_to.$invalid && submitted,
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
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Premium Amount</h5>
      <TextField
        label="Premium_Amount"
        type="number"
        v-model="details.premium_amount"
        @blur="v$.details.premium_amount.$model;"
        :classes="{
          'p-invalid': v$.details.premium_amount.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Certificate Ref Number</h5>
      <TextField
        label="Certificate_Ref_Number"
        type="text"
        v-model="details.certificate_ref_number"
        @blur="v$.details.certificate_ref_number.$model;"
        :classes="{
          'p-invalid': v$.details.certificate_ref_number.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Account Number</h5>
      <TextField
        label="Account_Number"
        type="number"
        v-model="details.account_number"
        @blur="v$.details.account_number.$model;"
        :classes="{
          'p-invalid': v$.details.account_number.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Remarks</h5>
      <TextAreaField
        :state="details.insurence_remarks"
        label="remarks"
        rows="2"
        v-model="details.insurence_remarks"
        @blur="v$.details.insurence_remarks.$model;"
        :classes="{
          'p-invalid': v$.details.insurence_remarks.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div>
    <DragAndDropUpload
      :state="insuranceAttachmentsState"
      type="vehicleDetails"
      storePath="fleets"
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
    <div class="align-self-center flex ml-2">
      <Buttons
        label="Previous"
        v-on:childToParent="goBack"
        class="p-button-outlined mr-1 dialog-button-text previous-btn"
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
  name: "insuranceDetails",
  data: () => ({
    insuranceAttachmentsState: " ",
    date: null,
    Vendor: [
      { name: "AXA15-AXA INSURANCE", code: "1" },
      { name: "AXA15-AXA INSURANCE", code: "2" },
    ],
    v$: useVuelidate(),
    details: {
      insurance_vendor: "",
      policy_type: "",
      policy_no: "",
      policy_from: "",
      policy_to: "",
      premium_amount: "",
      certificate_ref_number: "",
      account_number: "",
      insurence_remarks: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        insurance_vendor: { required },
        policy_type: { required },
        policy_no: { required },
        policy_from: { required },
        policy_to: { required },
        premium_amount: { required },
        certificate_ref_number: { required },
        account_number: { required },
        insurence_remarks: { required },
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
    goBack() {
      this.$store.state.sales.stepperNavigation = "VehicleDetails";
      this.$store.state.commonStore.attachmentsTag = "VehicleDetails";
    },
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        for (let d in this.details) {
          if (d == "insurance_vendor") {
            if (isNaN(this.details[d]) == false) {
              this.$store.state.fleets.vehicleDetailsFormData[d] =
                this.dropDownFilter(this.Vendor, "code", this.details[d]);
            } else {
              this.$store.state.fleets.vehicleDetailsFormData[d] =
                this.details[d];
            }
          } else if (d == "policy_from" || d == "policy_to") {
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
          "insurance_attachments"
        ] = this.$store.state.fleets.vehicleDetailsInsuranceFiles;

        this.$store.state.sales.stepperNavigation = "RoadTaxDetails";
        this.$store.state.commonStore.attachmentsTag = "RoadTaxDetails";
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
        this.insuranceAttachmentsState =
          this.$store.state.fleets.vehiclesFormStateData[
            "fleet_vehicle_insurance_attachments"
          ];
        this.$store.state.fleets.vehicleDetailsInsuranceFiles =
          this.$store.state.fleets.vehiclesFormStateData[
            "fleet_vehicle_insurance_attachments"
          ];
        for (let state in this.details) {
          if (state == "policy_from" || state == "policy_to") {
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

<style scoped></style>
