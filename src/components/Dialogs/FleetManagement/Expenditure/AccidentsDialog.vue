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
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Ticket No</h5>
      <TextField
        label="ticket_no"
        type="text"
        v-model="details.ticket_no"
        :classes="{
          'p-invalid': v$.details.ticket_no.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Date & Time</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            class="fleetsCalendar"
            v-model="details.date_time"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.date_time.$invalid && submitted,
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
      <h5 class="required dialog-label-text">Driver</h5>
      <DropDown
        code="code"
        :state="details.driver"
        :key="$store.state.fleets.driversDropDown"
        :data="$store.state.fleets.driversDropDown"
        label="driver"
        id="driver"
        v-model="details.driver"
        :classes="{
          'p-invalid': v$.details.driver.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Location</h5>
      <TextField
        label="location"
        type="number"
        v-model="details.location"
        :classes="{
          'p-invalid': v$.details.location.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Report on Accident</h5>
      <TextAreaField
        :state="details.report_on_accident"
        label="remarks"
        v-model="details.report_on_accident"
        @blur="v$.details.report_on_accident.$model;"
        :classes="{
          'p-invalid': v$.details.report_on_accident.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Action Taken</h5>
      <TextAreaField
        :state="details.action_taken"
        label="remarks"
        v-model="details.action_taken"
        @blur="v$.details.action_taken.$model;"
        :classes="{
          'p-invalid': v$.details.action_taken.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Damages to Vehicle</h5>
      <TextAreaField
        :state="details.damages_to_vehicle"
        label="remarks"
        v-model="details.damages_to_vehicle"
        @blur="v$.details.damages_to_vehicle.$model;"
        :classes="{
          'p-invalid': v$.details.damages_to_vehicle.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div>
    <DragAndDropUpload
      :state="accidentsAttachmentsState"
      type="expenditure"
      storePath="fleets"
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
</template>

<script>
import moment from "moment";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "AccidentsDialog",
  data: () => ({
    accidentsAttachmentsState: " ",
    date: null,
    v$: useVuelidate(),
    details: {
      vehicle_reg_no: "",
      vehicle_name: "",
      ticket_no: "",
      date_time: "",
      driver: "",
      location: "",
      report_on_accident: "",
      action_taken: "",
      damages_to_vehicle: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        vehicle_reg_no: { required },
        vehicle_name: { required },
        ticket_no: { required },
        date_time: { required },
        driver: { required },
        location: { required },
        report_on_accident: { required },
        action_taken: { required },
        damages_to_vehicle: { required },
      },
    };
  },
  methods: {
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMMM YYYY HH:mm:ss");
        return formattedDate;
      }
    },
    dateAndTimeFormatter(date) {
      return date.toISOString();
    },
    getDropDownData(key) {
      let source;
      switch (key) {
        case "vehicle_reg_no":
          source = this.$store.state.fleets.vehiclesRegNoDropDownData;
          break;
        case "driver":
          source = this.$store.state.fleets.driversDropDown;
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
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let accidentsDetails = {};
        for (let d in this.details) {
          if (d == "date_time") {
            if (
              Object.keys(
                this.$store.state.fleets.expenditureAccidentsStateData
              ).length != 0
            ) {
              accidentsDetails[d] = this.dateAndTimeFormatter(
                new Date(this.details[d])
              );
            } else {
              accidentsDetails[d] = this.details[d];
            }
          } else if (d == "vehicle_reg_no" || d == "driver") {
            if (isNaN(this.details[d]) == false) {
              accidentsDetails[d] = this.dropDownFilter(
                this.getDropDownData(d),
                "code",
                this.details[d]
              );
            } else {
              accidentsDetails[d] = this.details[d];
            }
          } else {
            accidentsDetails[d] = this.details[d];
          }
        }

        accidentsDetails["accident_attachments"] =
          this.$store.state.fleets.expenditureAccidentsFiles;

        if (
          Object.keys(this.$store.state.fleets.expenditureAccidentsStateData)
            .length != 0
        ) {
          accidentsDetails["delete_accident_attachments"] =
            this.$store.state.fleets.deletedexpenditureAccidentsFiles;
        }

        //making an update/PATCH api call to update accident details
        if (this.$store.state.fleets.expenditureAccidentsStateData.id) {
          accidentsDetails["id"] =
            this.$store.state.fleets.expenditureAccidentsStateData.id;
          this.$store.dispatch("fleets/expenditureCommonsCRUD", {
            path: "accident",
            loadApiName: "loadExpenditureCommons",
            mutation: "fetchExpenditureAccidentsTableData",
            tag: "update",
            data: accidentsDetails,
          });
        }
        //making an add/POST api call to create new accident details
        else {
          this.$store.dispatch("fleets/expenditureCommonsCRUD", {
            path: "accident",
            loadApiName: "loadExpenditureCommons",
            mutation: "fetchExpenditureAccidentsTableData",
            tag: "add",
            data: accidentsDetails,
          });
        }
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.fleets.expenditureAccidentsStateData)
          .length != 0
      ) {
        this.accidentsAttachmentsState =
          this.$store.state.fleets.expenditureAccidentsStateData[
            "expenditure_accident_attachments"
          ];
        this.$store.state.fleets.expenditureAccidentsFiles =
          this.$store.state.fleets.expenditureAccidentsStateData[
            "expenditure_accident_attachments"
          ];
        for (let state in this.details) {
          if (state == "date_time") {
            let rawDate = new Date(
              this.$store.state.fleets.expenditureAccidentsStateData[state]
            );
            this.details[state] = this.dateFormater(rawDate);
          } else if (state == "driver_id") {
            this.details["driver_id"] =
              this.$store.state.fleets.expenditureAccidentsStateData[
                "driver_name"
              ];
          } else {
            this.details[state] =
              this.$store.state.fleets.expenditureAccidentsStateData[state];
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
        }
      }
    },
  },
  mounted() {
    this.$store.state.commonStore.attachmentsTag = "expenditureAccidents";
  },
  unmounted() {
    this.$store.state.fleets.expenditureAccidentsFiles = [];
    this.$store.state.fleets.deletedexpenditureAccidentsFiles = [];
  },
  created() {
    this.$store.dispatch("fleets/loadFleetDropDowns", {
      path: "vehicles",
      mutation: "fetchVehiclesCommonDropDownData",
    });
    this.$store.dispatch("fleets/loadFleetDropDowns", {
      path: "drivers",
      mutation: "fetchDriversDropDownData",
    });
    this.$store.state.commonStore.attachmentsTag = null;
    this.loadState();
  },
};
</script>

<style></style>
