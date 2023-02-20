<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Vehicle Reg No</h5>
      <DropDown
        code="code"
        :key="$store.state.fleets.vehiclesRegNoDropDownData"
        :state="details.vehicle_reg_no"
        :data="$store.state.fleets.vehiclesRegNoDropDownData"
        label="vehicle_reg_no"
        id="vehicle_reg_no"
        v-model="details.vehicle_reg_no"
        :classes="{
          'p-invalid': v$.details.vehicle_reg_no.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Vehicle Type</h5>
      <TextField
        :disabled="true"
        label="vehicle_type"
        type="text"
        v-model="details.vehicle_type"
        :classes="{
          'p-invalid': v$.details.vehicle_type.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Vehicle Name</h5>
      <TextField
        :disabled="true"
        label="vehicle_name"
        type="text"
        v-model="details.vehicle_name"
        :classes="{
          'p-invalid': v$.details.vehicle_name.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-8">
      <h5 class="required dialog-label-text">Vendor</h5>
      <DropDown
        code="code"
        :state="details.vendor"
        :data="Vendor"
        label="vendor"
        id="vendor"
        v-model="details.vendor"
        :classes="{
          'p-invalid': v$.details.vendor.$invalid && submitted,
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
        @keyup="uppercase" 
        v-model="detailspolicy_no"
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
            v-model="details.policy_from_date"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.policy_from_date.$invalid && submitted,
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
            v-model="details.policy_to_date"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.policy_to_date.$invalid && submitted,
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
      <h5 class="required dialog-label-text">Account Number</h5>
      <TextField
        label="account_number"
        type="text"
        @keyup="uppercaseA" 
        v-model="detailsaccount_number"
        :classes="{
          'p-invalid': v$.details.account_number.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Certificate Ref Number</h5>
      <TextField
        label="certificate_referance_no"
        type="text"
          @keyup="uppercaseB" 
        v-model="detailscertificate_referance_no"
        :classes="{
          'p-invalid':
            v$.details.certificate_referance_no.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Premium Amount</h5>
      <TextField
        label="premium_amount"
        type="number"
        v-model="details.premium_amount"
        :classes="{
          'p-invalid': v$.details.premium_amount.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="field col-12 md:col-4">
    <h5 class="required dialog-label-text">Date</h5>
    <div clas="flex">
      <div class="whiteDiv calendarDiv">
        <Calendar
          dateFormat="d MM yy"
          class="fleetsCalendar"
          v-model="details.date"
          :showIcon="true"
          style="width: 100%"
          :class="{
            'p-invalid': v$.details.date.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
          :monthNavigator="true"
          :yearNavigator="true"
          yearRange="1950:2050"
        />
      </div>
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Remarks</h5>
      <TextAreaField
        :state="details.remarks"
        label="remarks"
        v-model="details.remarks"
        @blur="v$.details.remarks.$model;"
        :classes="{
          'p-invalid': v$.details.remarks.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div>
    <DragAndDropUpload
      :state="insuranceAttachmentsState"
      type="expenditure"
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
    <div class="align-self-center flex ml-2"></div>
    <div class="flex align-self-center justify-content-end">
      <Buttons
        label="Cancel"
        v-on:childToParent="closeDialog"
        class="p-button-outlined mr-1 dialog-button-text"
      />
      <Buttons
        label="Save"
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
  name: "InsuranceDialog",
  data: () => ({
    insuranceAttachmentsState: " ",
    detailspolicy_no: "",
    detailsaccount_number: "",
    detailscertificate_referance_no: "",
    date: null,
    Vendor: [
      { name: "AXA15-AXA INSURANCE ", code: "1" },
      { name: "AXA15-AXA INSURANCE ", code: "2" },
    ],

    v$: useVuelidate(),
    details: {
      vehicle_reg_no: "",
      vehicle_type: "",
      vehicle_name: "",
      vendor: "",
      policy_type: "",
      policy_no: "",
      policy_from_date: "",
      policy_to_date: "",
      account_number: "",
      certificate_referance_no: "",
      premium_amount: "",
      date: "",
      remarks: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        vehicle_reg_no: { required },
        vehicle_type: { required },
        vehicle_name: { required },
        vendor: { required },
        policy_type: { required },
        policy_no: { required },
        policy_from_date: { required },
        policy_to_date: { required },
        account_number: { required },
        certificate_referance_no: { required },
        premium_amount: { required },
        date: { required },
        remarks: { required },
      },
    };
  },
  methods: {
    uppercase() {
        this.detailspolicy_no = this.detailspolicy_no.toUpperCase();
    },
    uppercaseA() {
        this.detailsaccount_number = this.detailsaccount_number.toUpperCase();
    },
    uppercaseB() {
        this.detailscertificate_referance_no = this.detailscertificate_referance_no.toUpperCase();
    },
    getDropDownData(key) {
      let source;
      switch (key) {
        case "vehicle_reg_no":
          source = this.$store.state.fleets.vehiclesRegNoDropDownData;
          break;
        case "vendor":
          source = this.Vendor;
          break;
      }
      return source;
    },
    dropDownFilter(data, checkerCode, inputCode) {
      for (var dd in data) {
        if (inputCode == data[dd][checkerCode]) {
          return data[dd].name;
        }
      }
    },
    customDateFormatter(data) {
      let rawDate = new Date(data);
      let date = rawDate.getDate();
      let month = rawDate.getMonth();
      month += 1;
      let year = rawDate.getFullYear();
      let dateString = year + "-" + month + "-" + date;
      return dateString;
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMMM YYYY");
        return formattedDate;
      }
    },
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let insuranceDetails = {};
        for (let d in this.details) {
          if (d == "policy_from_date" || d == "policy_to_date" || d == "date") {
            insuranceDetails[d] = this.customDateFormatter(this.details[d]);
          } else if (d == "vehicle_reg_no" || d == "vendor") {
            if (isNaN(this.details[d]) == false) {
              insuranceDetails[d] = this.dropDownFilter(
                this.getDropDownData(d),
                "code",
                this.details[d]
              );
            } else {
              insuranceDetails[d] = this.details[d];
            }
          } else {
            insuranceDetails[d] = this.details[d];
          }
        }
        insuranceDetails["insurance_attachments"] =
          this.$store.state.fleets.expenditureInsuranceFiles;

        if (
          Object.keys(this.$store.state.fleets.expenditureInsuranceStateData)
            .length != 0
        ) {
          insuranceDetails["delete_insurance_attachments"] =
            this.$store.state.fleets.deletedexpenditureInsuranceFiles;
        }
        //making an update/PATCH api call to update road tax details
        if (this.$store.state.fleets.expenditureInsuranceStateData.id) {
          insuranceDetails["id"] =
            this.$store.state.fleets.expenditureInsuranceStateData.id;
          this.$store.dispatch("fleets/expenditureCommonsCRUD", {
            path: "insurance",
            loadApiName: "loadExpenditureInsurance",
            mutation: "fetchExpenditureInsuranceTableData",
            tag: "update",
            data: insuranceDetails,
          });
        }
        //making an add/POST api call to create new road tax details
        else {
          this.$store.dispatch("fleets/expenditureCommonsCRUD", {
            path: "insurance",
            loadApiName: "loadExpenditureInsurance",
            mutation: "fetchExpenditureInsuranceTableData",
            tag: "add",
            data: insuranceDetails,
          });
        }
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.fleets.expenditureInsuranceStateData)
          .length != 0
      ) {
        this.insuranceAttachmentsState =
          this.$store.state.fleets.expenditureInsuranceStateData[
            "expenditure_insurance_attachments"
          ];
        this.$store.state.fleets.expenditureInsuranceFiles =
          this.$store.state.fleets.expenditureInsuranceStateData[
            "expenditure_insurance_attachments"
          ];
        for (let state in this.details) {
          if (
            state == "policy_from_date" ||
            state == "policy_to_date" ||
            state == "date"
          ) {
            let rawDate = new Date(
              this.$store.state.fleets.expenditureInsuranceStateData[state]
            );
            this.details[state] = this.dateFormater(rawDate);
          } else {
            this.details[state] =
              this.$store.state.fleets.expenditureInsuranceStateData[state];
          }
        }
      }
    },
  },
  watch: {
    "details.vehicle_reg_no": function () {
      let regNo;
      if (isNaN(this.details["vehicle_reg_no"]) == false) {
        regNo = this.dropDownFilter(
          this.getDropDownData("vehicle_reg_no"),
          "code",
          this.details.vehicle_reg_no
        );
      } else {
        regNo = this.details.vehicle_reg_no;
      }
      for (let v in this.$store.state.fleets.vehiclesCommonDropDownData) {
        let v_obj = this.$store.state.fleets.vehiclesCommonDropDownData[v];
        if (v_obj["reg_no"] == regNo) {
          this.details.vehicle_name = v_obj["name"];
          this.details.vehicle_type =
            v_obj["fleet_vehicles_vehicle_type"]["vehicle_type"];
        }
      }
    },
  },
  unmounted() {
    this.$store.state.fleets.expenditureInsuranceFiles = [];
    this.$store.state.fleets.deletedexpenditureInsuranceFiles = [];
  },
  mounted() {
    this.$store.state.commonStore.attachmentsTag = "expenditureInsurance";
  },
  created() {
    this.$store.dispatch("fleets/loadFleetDropDowns", {
      path: "vehicles",
      mutation: "fetchVehiclesCommonDropDownData",
    });
    this.$store.state.commonStore.attachmentsTag = null;
    this.loadState();
  },
};
</script>

<style scoped></style>
