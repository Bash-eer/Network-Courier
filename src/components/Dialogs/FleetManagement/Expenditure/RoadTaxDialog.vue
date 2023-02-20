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
          'inputfield w-full dialog-dropdown-text ': true,
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
      <h5 class="required dialog-label-text">Tax Amount</h5>
      <TextField
        label="amount"
        type="number"
        v-model="details.amount"
        :classes="{
          'p-invalid': v$.details.amount.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
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
            v-model="details.from_date"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.from_date.$invalid && submitted,
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
            v-model="details.to_date"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.to_date.$invalid && submitted,
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
      :state="roadTaxAttachmentsState"
      type="expenditure"
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
    <div class="align-self-center flex"></div>
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
  name: "RoadTaxDialog",
  data: () => ({
    roadTaxAttachmentsState: " ",
    date: null,
    Vendor: [
      { name: "RTA - Road Transport Authority ", code: "1" },
      { name: "RTA - Road Transport Authority ", code: "2" },
    ],
    v$: useVuelidate(),
    details: {
      vehicle_reg_no: "",
      vehicle_type: "",
      vehicle_name: "",
      vendor: "",
      amount: "",
      from_date: "",
      to_date: "",
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
        amount: { required },
        from_date: { required },
        to_date: { required },
        remarks: { required },
      },
    };
  },
  methods: {
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
    customDateFormatter(data) {
      let rawDate = new Date(data);
      let date = rawDate.getDate();
      let month = rawDate.getMonth();
      month += 1;
      let year = rawDate.getFullYear();
      let dateString = year + "-" + month + "-" + date;
      return dateString;
    },
    dropDownFilter(data, checkerCode, inputCode) {
      for (var dd in data) {
        if (inputCode == data[dd][checkerCode]) {
          return data[dd].name;
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
    goBack() {
      this.$store.state.sales.stepperNavigation = "insuranceDetails";
    },
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let roadTaxDetails = {};
        for (let d in this.details) {
          if (d == "from_date" || d == "to_date") {
            roadTaxDetails[d] = this.customDateFormatter(this.details[d]);
          } else if (d == "vehicle_reg_no" || d == "vendor") {
            if (isNaN(this.details[d]) == false) {
              roadTaxDetails[d] = this.dropDownFilter(
                this.getDropDownData(d),
                "code",
                this.details[d]
              );
            } else {
              roadTaxDetails[d] = this.details[d];
            }
          } else {
            roadTaxDetails[d] = this.details[d];
          }
        }
        roadTaxDetails["road_tax_attachments"] =
          this.$store.state.fleets.expenditureRoadTaxFiles;

        if (
          Object.keys(this.$store.state.fleets.expenditureRoadTaxStateData)
            .length != 0
        ) {
          roadTaxDetails["delete_road_tax_attachments"] =
            this.$store.state.fleets.deletedexpenditureRoadTaxFiles;
        }
        //making an update/PATCH api call to update road tax details
        if (this.$store.state.fleets.expenditureRoadTaxStateData.id) {
          roadTaxDetails["id"] =
            this.$store.state.fleets.expenditureRoadTaxStateData.id;
          this.$store.dispatch("fleets/expenditureCommonsCRUD", {
            path: "roadTax",
            loadApiName: "loadExpenditureCommons",
            mutation: "fetchExpenditureRoadTaxTableData",
            tag: "update",
            data: roadTaxDetails,
          });
        }
        //making an add/POST api call to create new road tax details
        else {
          this.$store.dispatch("fleets/expenditureCommonsCRUD", {
            path: "roadTax",
            loadApiName: "loadExpenditureCommons",
            mutation: "fetchExpenditureRoadTaxTableData",
            tag: "add",
            data: roadTaxDetails,
          });
        }
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.fleets.expenditureRoadTaxStateData)
          .length != 0
      ) {
        this.roadTaxAttachmentsState =
          this.$store.state.fleets.expenditureRoadTaxStateData[
            "expenditure_road_tax_attachments"
          ];
        this.$store.state.fleets.expenditureRoadTaxFiles =
          this.$store.state.fleets.expenditureRoadTaxStateData[
            "expenditure_road_tax_attachments"
          ];
        for (let state in this.details) {
          if (state == "from_date" || state == "to_date") {
            let rawDate = new Date(
              this.$store.state.fleets.expenditureRoadTaxStateData[state]
            );
            this.details[state] = this.dateFormater(rawDate);
          } else {
            this.details[state] =
              this.$store.state.fleets.expenditureRoadTaxStateData[state];
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
    this.$store.state.fleets.expenditureRoadTaxFiles = [];
    this.$store.state.fleets.deletedexpenditureRoadTaxFiles = [];
  },
  mounted() {
    this.$store.state.commonStore.attachmentsTag = "expenditureRoadTax";
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

<style scoped>
.roadTax {
  font-size: 14px;
  font-weight: 600;
  background: #357dea;
}
</style>
