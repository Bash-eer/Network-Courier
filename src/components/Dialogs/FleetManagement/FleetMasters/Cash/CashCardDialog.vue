<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Card No</h5>
      <TextField
        label="card_no"
        type="text"
        v-model="details.card_no"
        @blur="v$.details.card_no.$model;"
        :classes="{
          'p-invalid': v$.details.card_no.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Card Type</h5>
      <TextField
        label="card_type"
        type="text"
        v-model="details.card_type"
        :classes="{
          'p-invalid': v$.details.card_type.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Vendor</h5>
      <DropDown
        :key="details.vehicle_no"
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
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Vehicle No</h5>
      <DropDown
        code="code"
        :key="$store.state.fleets.vehiclesRegNoDropDownData"
        :state="details.vehicle_no"
        :data="$store.state.fleets.vehiclesRegNoDropDownData"
        label="vehicle_no"
        id="vehicle_no"
        v-model="details.vehicle_no"
        :classes="{
          'p-invalid': v$.details.vehicle_no.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Issue Date</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            class="fleetsCalendar"
            v-model="details.issue_date"
            @blur="v$.details.issue_date.$model"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.issue_date.$invalid && submitted,
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
      <h5 class="required dialog-label-text">Expiry Date</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            class="fleetsCalendar"
            v-model="details.expiry_date"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.expiry_date.$invalid && submitted,
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
      <h5 class="required dialog-label-text">Card Limit(S$)</h5>
      <TextField
        label="card_limit"
        type="text"
        v-model="details.card_limit"
        @blur="v$.details.card_limit.$model;"
        :classes="{
          'p-invalid': v$.details.card_limit.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">TopUp Cycle</h5>
      <DropDown
        code="code"
        :state="details.top_up_cycle"
        :data="TopupCycle"
        label="driver"
        id="driver"
        v-model="details.top_up_cycle"
        :classes="{
          'p-invalid': v$.details.top_up_cycle.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Select Top Up Date/Day</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
              <DropDown
              v-if="details.top_up_cycle==1"
        code="code"
        :state="details.top_up_day"
        :data="TopupWeekDays"
        label="driver"
        id="driver"
        v-model="details.top_up_day"
        :classes="{
          'p-invalid': v$.details.top_up_day.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
          <Calendar
          v-else
         
            dateFormat="d MM yy"
            class="fleetsCalendar"
            v-model="details.top_up_day"
            :showIcon="true"
            style="width: 100%"
            :classes="{
              'p-invalid': v$.details.top_up_day.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
            :monthNavigator="false"
            :yearNavigator="false"
          >
           <template #header></template>
          </Calendar>
        </div>
      </div>
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Cost Center</h5>
      <TextField
        label="cost_center"
        type="text"
        v-model="details.cost_center"
        :classes="{
          'p-invalid': v$.details.cost_center.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Customer No.</h5>
      <TextField
        label="customer_no"
        type="text"
        v-model="details.customer_no"
        :classes="{
          'p-invalid': v$.details.customer_no.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
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
</template>

<script>
import moment from "moment";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "CashCardDialog",
  data: () => ({
    date: null,
    Vendor: [
      { name: "AXA15-AXA INSURANCE", code: "1" },
      { name: "AXA12-AXA INSURANCE", code: "2" },
    ],
    TopupCycle: [
      { name: "Weekly", code: "1" },
      { name: "Monthly", code: "2" },
    ],
      TopupWeekDays:[
{ name: "Monday", code: "1" },
{ name: "Tuesday", code: "2" },
{ name: "Wednesday", code: "3" },
{ name: "Thursday", code: "4" },
{ name: "Friday", code: "5" },
{ name: "Saturday", code: "6" },
{ name: "Sunday", code: "7" },
    ],
    v$: useVuelidate(),
    details: {
      card_no: "",
      card_type: "",
      vendor: "",
      vehicle_no: "",
      issue_date: "",
      expiry_date: "",
      card_limit: "",
      top_up_cycle: "",
      top_up_day: "",
      cost_center: "",
      customer_no: "",
      vehicle_image:"",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        card_no: { required },
        card_type: { required },
        vendor: { required },
        vehicle_no: { required },
        issue_date: { required },
        expiry_date: { required },
        card_limit: { required },
        top_up_cycle: { required },
        top_up_day: { required },
        cost_center: { required },
        customer_no: { required },
      },
    };
  },
  methods: {
    getDropDownData(key) {
      let source;
      switch (key) {
        case "vehicle_no":
          source = this.$store.state.fleets.vehiclesRegNoDropDownData;
          break;
        case "vendor":
          source = this.Vendor;
          break;
        case "top_up_cycle":
          source = this.TopupCycle;
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
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMMM YYYY");
        return formattedDate;
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
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let cashCardDetails = {};
        for (let d in this.details) {
          if (d == "vendor" || d == "top_up_cycle" || d == "vehicle_no") {
            if (isNaN(this.details[d]) == false) {
              cashCardDetails[d] = this.dropDownFilter(
                this.getDropDownData(d),
                "code",
                this.details[d]
              );
            } else {
              cashCardDetails[d] = this.details[d];
            }
          } else if (
            d == "issue_date" ||
            d == "expiry_date" ||
            d == "top_up_day"
          ) {
            cashCardDetails[d] = this.customDateFormatter(this.details[d]);
          } else {
            cashCardDetails[d] = this.details[d];
          }
          if(d == "vehicle_no"){
            cashCardDetails["vehicle"] = [{"reg_no":this.details[d],"image_url" :this.details.vehicle_image}]
          }
        }
        //making an update/PATCH api call to update cash card details
        if (this.$store.state.masters.fleetsFormData.id) {
          cashCardDetails["id"] = this.$store.state.masters.fleetsFormData.id;
          this.$store.dispatch("masters/FleetMastersCRUD", {
            tag: "update",
            data: cashCardDetails,
            type: "cashCard",
            loadApi: "loadFleetMastersCommons",
            nameKey: "users_fleet_cash_card",
            mutation: "fetchFleetMastersCashCards",
          });
        }
        //making a create/POST api call - to create new cash card details
        else {
          this.$store.dispatch("masters/FleetMastersCRUD", {
            tag: "add",
            data: cashCardDetails,
            type: "cashCard",
            loadApi: "loadFleetMastersCommons",
            nameKey: "users_fleet_cash_card",
            mutation: "fetchFleetMastersCashCards",
          });
        }
      }
    },
    loadState() {
      if (Object.keys(this.$store.state.masters.fleetsFormData).length != 0) {
        for (let state in this.details) {
          if (
            state == "issue_date" ||
            state == "expiry_date" ||
            state == "top_up_day"
          ) {
            let rawDate = new Date(
              this.$store.state.masters.fleetsFormData[state]
            );
            this.details[state] = this.dateFormater(rawDate);
          } else {
            this.details[state] =
              this.$store.state.masters.fleetsFormData[state];
          }
        }
      }
    },
  },
    watch: {
    "details.vehicle_no": function () {
       let regNo;
    
         regNo = this.details.vehicle_no;
      
      for (let v in this.$store.state.fleets.vehiclesRegNoDropDownData) {
    
        let v_obj = this.$store.state.fleets.vehiclesRegNoDropDownData[v];
           
        if (v_obj["code"] == regNo) {
         
          this.details.vehicle_image = v_obj["image"];
          this.details.vehicle_no = v_obj["name"];
        }
      }
    },
     "details.top_up_cycle": function () {
     this.details.top_up_day = "";
    }
  },
 
  created() {
    this.$store.dispatch("fleets/loadFleetDropDowns", {
      path: "vehicles",
      mutation: "fetchVehiclesCommonDropDownData",
    });
    this.loadState();
  },
};
</script>

<style scoped></style>
