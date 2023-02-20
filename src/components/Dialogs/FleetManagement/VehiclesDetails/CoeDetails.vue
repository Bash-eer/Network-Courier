<template>
  <div class="mb-5">
    <h6 class="ml-2">Road Tax Details</h6>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-8">
      <h5 class="required dialog-label-text">Vendor</h5>
      <DropDown
        :state="details.coe_vendor"
        code="code"
        :data="Vendor"
        label="Vendor"
        id="VendorThree"
        v-model="details.coe_vendor"
        :value="details.coe_vendor"
        :classes="{
          'p-invalid': v$.details.coe_vendor.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">COE Amount</h5>
      <TextField
        label="Tax_Amount"
        type="number"
        v-model="details.coe_amount"
        @blur="v$.details.coe_amount.$model;"
        :classes="{
          'p-invalid': v$.details.coe_amount.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">COE From Date</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            class="fleetsCalendar"
            v-model="details.coe_from_date"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.coe_from_date.$invalid && submitted,
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
      <h5 class="required dialog-label-text">COE To Date</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            class="fleetsCalendar"
            v-model="details.coe_to_date"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.coe_to_date.$invalid && submitted,
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
        :state="details.coe_remarks"
        label="remarks"
        rows="2"
        v-model="details.coe_remarks"
        @blur="v$.details.coe_remarks.$model;"
        :classes="{
          'p-invalid': v$.details.coe_remarks.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div>
    <DragAndDropUpload
      :state="coeAttachmentsState"
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
  name: "CoeDetails",
  data: () => ({
    coeAttachmentsState: " ",
    date: null,
    Vendor: [
      { name: "COE Vendor 1", code: "1" },
      { name: "COE Vendor 2", code: "2" },
    ],
    v$: useVuelidate(),
    details: {
      coe_vendor: "",
      coe_amount: "",
      coe_from_date: "",
      coe_to_date: "",
      coe_remarks: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        coe_vendor: { required },
        coe_amount: { required },
        coe_from_date: { required },
        coe_to_date: { required },
        coe_remarks: { required },
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
      this.$store.state.sales.stepperNavigation = "RoadTaxDetails";
      this.$store.state.commonStore.attachmentsTag = "RoadTaxDetails";
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
          if (d == "coe_vendor") {
            if (isNaN(this.details[d]) == false) {
              this.$store.state.fleets.vehicleDetailsFormData[d] =
                this.dropDownFilter(this.Vendor, "code", this.details[d]);
            } else {
              this.$store.state.fleets.vehicleDetailsFormData[d] =
                this.details[d];
            }
          } else if (d == "coe_from_date" || d == "coe_to_date") {
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

        if (
          isNaN(
            this.$store.state.fleets.vehicleDetailsFormData["vehicle_type_id"]
          )
        ) {
          this.$store.state.fleets.vehicleDetailsFormData["vehicle_type_id"] =
            this.reverseDropDownFilter(
              this.$store.state.fleets.vehiclesDropDown,
              "name",
              this.$store.state.fleets.vehicleDetailsFormData["vehicle_type_id"]
            );
        }
        if (
          isNaN(this.$store.state.fleets.vehicleDetailsFormData["driver_id"])
        ) {
          this.$store.state.fleets.vehicleDetailsFormData["driver_id"] =
            this.reverseDropDownFilter(
              this.$store.state.fleets.driversDropDown,
              "name",
              this.$store.state.fleets.vehicleDetailsFormData["driver_id"]
            );
        }

        this.$store.state.fleets.vehicleDetailsFormData["image_url"] =
          this.$store.state.fleets.globalImageUploadURL;
        this.$store.state.fleets.vehicleDetailsFormData["coe_attachments"] =
          this.$store.state.fleets.vehicleDetailsCoeFiles;

        // this.$store.state.fleets.vehicleDetailsFormData["gps_imei"] = "dfdd";

        if (
          Object.keys(this.$store.state.fleets.vehiclesFormStateData).length !=
          0
        ) {
          this.$store.state.fleets.vehicleDetailsFormData[
            "delete_insurance_attachments"
          ] = this.$store.state.fleets.deletedVehicleDetailsInsuranceFiles;
          this.$store.state.fleets.vehicleDetailsFormData[
            "delete_road_tax_attachments"
          ] = this.$store.state.fleets.deletedVehicleDetailsRoadTaxFiles;
          this.$store.state.fleets.vehicleDetailsFormData[
            "delete_coe_attachments"
          ] = this.$store.state.fleets.deletedVehicleDetailsCoeFiles;
        }

        //making an update/PATCH api call to update vehicle details
        if (this.$store.state.fleets.vehiclesFormStateData.id) {
          this.$store.state.fleets.vehicleDetailsFormData["id"] =
            this.$store.state.fleets.vehiclesFormStateData.id;
          this.$store.dispatch("fleets/vehicleDetailsCRUD", {
            tag: "update",
            data: this.$store.state.fleets.vehicleDetailsFormData,
          });
        }
        //making an add/POST api call to register new vehicle details
        else {
          this.$store.dispatch("fleets/vehicleDetailsCRUD", {
            tag: "add",
            data: this.$store.state.fleets.vehicleDetailsFormData,
          });
        }
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.fleets.vehiclesFormStateData).length != 0
      ) {
        this.coeAttachmentsState =
          this.$store.state.fleets.vehiclesFormStateData[
            "fleet_vehicle_coe_attachments"
          ];
        this.$store.state.fleets.vehicleDetailsCoeFiles =
          this.$store.state.fleets.vehiclesFormStateData[
            "fleet_vehicle_coe_attachments"
          ];
        for (let state in this.details) {
          if (state == "coe_from_date" || state == "coe_to_date") {
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
