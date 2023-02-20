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
      <h5 class="required dialog-label-text">Invoice No</h5>
      <TextField
        label="invoice_no"
        type="text"
        v-model="details.invoice_no"
        :classes="{
          'p-invalid': v$.details.invoice_no.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text text-intent-negative-4">Vendor(Service company)</h5>
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
  </div>
  <div class="formgrid grid">
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
      <h5 class="required dialog-label-text">Idle Hours</h5>
      <TextField
        label="idle_hours"
        type="number"
        v-model="details.idle_hours"
        :classes="{
          'p-invalid': v$.details.idle_hours.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Mileage</h5>
      <TextField
        label="idle_hours"
        type="number"
        v-model="details.mileage"
        :classes="{
          'p-invalid': v$.details.mileage.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgird grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">From Date</h5>
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
      <h5 class="required dialog-label-text">To Date</h5>
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
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Amount</h5>
      <TextField
        label="idle_hours"
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
      <h5 class="required dialog-label-text">Upcoming Service Date</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            class="fleetsCalendar"
            v-model="details.upcoming_service_date"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'p-invalid':
                v$.details.upcoming_service_date.$invalid && submitted,
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
      <h5 class="required dialog-label-text">Current Odomter Reading</h5>
      <TextField
        label="current_odo_meter"
        type="number"
        v-model="details.current_odo_meter"
        @blur="v$.details.current_odo_meter.$model;"
        :classes="{
          'p-invalid': v$.details.current_odo_meter.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Future Odometer Reading</h5>
      <TextField
        label="next_service_odo_meter"
        type="number"
        v-model="details.next_service_odo_meter"
        @blur="v$.details.next_service_odo_meter.$model;"
        :classes="{
          'p-invalid': v$.details.next_service_odo_meter.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12">
      <h5 class="required dialog-label-text">Maintenance Type</h5>
      <MultiSelectChips
        :options="MaintenanceType"
        :filter="true"
        placeholder="Select Maintenance Type"
        label="maintenance"
        v-model="details.maintenance_type"
        :value="details.maintenance_type"
        :state="details.maintenance_type"
        @blur="v$.details.maintenance_type.$model"
        :classes="{
          'p-invalid': v$.details.maintenance_type.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Problem</h5>
      <TextAreaField
        :state="details.problem"
        label="summon_remarks"
        v-model="details.problem"
        @blur="v$.details.problem.$model;"
        :classes="{
          'p-invalid': v$.details.problem.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Solution</h5>
      <TextAreaField
        :state="details.solution"
        label="summon_remarks"
        v-model="details.solution"
        @blur="v$.details.solution.$model;"
        :classes="{
          'p-invalid': v$.details.solution.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div>
    <DragAndDropUpload
      :state="maintenanceAttachmentsState"
      type="vehicleCommons"
      storePath="fleets"
    />
  </div>
  <div class="flex align-self-center justify-content-end">
   <CancelButton storePath="salesSales" />
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
  name: "FleetMaintenanceDialog",
  data: () => ({
    maintenanceAttachmentsState: " ",
    Vendor: [
      { name: "RTA - Road Transport Authority", code: "1" },
      { name: "RTA - Road Transport Authority", code: "2" },
    ],
    MaintenanceType: [
      { name: "Type 1", code: "1" },
      { name: "Type 2", code: "2" },
      { name: "Type 3", code: "3" },
    ],
    v$: useVuelidate(),
    details: {
      vehicle_reg_no: "",
      invoice_no: "",
      vendor: "",
      driver: "",
      idle_hours: "",
      mileage: "",
      from_date: "",
      to_date: "",
      amount: "",
      upcoming_service_date: "",
      current_odo_meter: "",
      next_service_odo_meter: "",
      maintenance_type: "",
      problem: "",
      solution: "",
      image_url: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        vehicle_reg_no: { required },
        invoice_no: { required },
        vendor: { required },
        driver: { required },
        idle_hours: { required },
        mileage: { required },
        from_date: { required },
        to_date: { required },
        amount: { required },
        upcoming_service_date: { required },
        current_odo_meter: { required },
        next_service_odo_meter: { required },
        maintenance_type: { required },
        problem: { required },
        solution: { required },
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
        case "driver":
          source = this.$store.state.fleets.driversDropDown;
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
    // closeDialog() {
    //   this.$store.state["users"].displayDialog = false;
    // },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let maintenanceDetails = {};
        for (let d in this.details) {
          if (
            d == "from_date" ||
            d == "to_date" ||
            d == "upcoming_service_date"
          ) {
            maintenanceDetails[d] = this.customDateFormatter(this.details[d]);
          } else if (d == "vehicle_reg_no" || d == "driver" || d == "vendor") {
            if (isNaN(this.details[d]) == false) {
              maintenanceDetails[d] = this.dropDownFilter(
                this.getDropDownData(d),
                "code",
                this.details[d]
              );
            } else {
              maintenanceDetails[d] = this.details[d];
            }
          } else if (d == "maintenance_type") {
            maintenanceDetails[d] = [];
            let mArray = this.details[d];
            for (let m in mArray) {
              let mObj = {};
              mObj["type"] = mArray[m].name;
              maintenanceDetails[d].push(mObj);
            }
          } else {
            maintenanceDetails[d] = this.details[d];
          }
        }
        maintenanceDetails["maintenance_attachments"] =
          this.$store.state.fleets.vehicleMaintenanceFiles;

        if (
          Object.keys(this.$store.state.fleets.fleetMaintenanceStateData)
            .length != 0
        ) {
          maintenanceDetails["delete_maintenance_attachments"] =
            this.$store.state.fleets.deletedVehicleMaintenanceFiles;
        }
        //making an update/PATCH api call to update maintenance details
        if (this.$store.state.fleets.fleetMaintenanceStateData.id) {
          maintenanceDetails["id"] =
            this.$store.state.fleets.fleetMaintenanceStateData.id;
          this.$store.dispatch("fleets/vehiclesCommonsCRUD", {
            path: "maintenance",
            loadApiName: "loadVehicleCommons",
            mutation: "fetchMaintenanceTableData",
            tag: "update",
            data: maintenanceDetails,
            type: "Maintenance",
          });
        }
        //making an add/POST api call to create new maintenance details
        else {
          this.$store.dispatch("fleets/vehiclesCommonsCRUD", {
            path: "maintenance",
            loadApiName: "loadVehicleCommons",
            mutation: "fetchMaintenanceTableData",
            tag: "add",
            data: maintenanceDetails,
            type: "Maintenance",
          });
        }
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.fleets.fleetMaintenanceStateData)
          .length != 0
      ) {
        this.maintenanceAttachmentsState =
          this.$store.state.fleets.fleetMaintenanceStateData[
            "maintenance_attachments"
          ];
        this.$store.state.fleets.vehicleMaintenanceFiles =
          this.$store.state.fleets.fleetMaintenanceStateData[
            "maintenance_attachments"
          ];
        for (let state in this.details) {
          if (
            state == "from_date" ||
            state == "to_date" ||
            state == "upcoming_service_date"
          ) {
            let rawDate = new Date(
              this.$store.state.fleets.fleetMaintenanceStateData[state]
            );
            this.details[state] = this.dateFormater(rawDate);
          } else if (state == "maintenance_type") {
            let mArray =
              this.$store.state.fleets.fleetMaintenanceStateData[state];
            let mStateArray = [];
            for (let mc in mArray) {
              let mObj;
              for (let m in this.MaintenanceType) {
                if (mArray[mc].type == this.MaintenanceType[m].name) {
                  mObj = this.MaintenanceType[m];
                  mStateArray.push(mObj);
                }
              }
            }
            this.details[state] = mStateArray;
          } else {
            this.details[state] =
              this.$store.state.fleets.fleetMaintenanceStateData[state];
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
          this.details.image_url = v_obj["image_url"];
        }
      }
    },
  },
  unmounted() {
    this.$store.state.fleets.vehicleMaintenanceFiles = [];
    this.$store.state.fleets.deletedVehicleMaintenanceFiles = [];
  },
  mounted() {
    this.$store.state.commonStore.attachmentsTag = "vehicleMaintenance";
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

<style scoped>
.p-multiselect .div-multiselect-chip .p-multiselect-token{
font-size: 12px;
font-weight: 600;
}</style>
