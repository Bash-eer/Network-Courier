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
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
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
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Route</h5>
      <TextField
        label="route"
        type="text"
        v-model="details.route"
        :classes="{
          'p-invalid': v$.details.route.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <div class="flex flex-row">
        <div class="flex">
          <h5 class="required dialog-label-text">Amount</h5>
        </div>
        <div class="flex pl-2">
          <CheckBox
            path="fleets"
            class="checksText"
            v-bind:checker="
              details.gst == true
                ? [
                    {
                      name: 'GST',
                      tag: 'gst',
                      key: 'gst',
                    },
                  ]
                : []
            "
            v-bind:categories="[
              {
                name: 'GST',
                tag: 'gst',
                key: 'gst',
              },
            ]"
            v-on:childToParent="checkBoxChange"
          />
        </div>
      </div>
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
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Units</h5>
      <TextField
        label="units"
        type="text"
        v-model="details.units"
        :classes="{
          'p-invalid': v$.details.units.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Fuel Date & Time</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            :showTime="true"
            :showSeconds="true"
            dateFormat="d MM yy"
            class="fleetsCalendar bg-357dea"
            v-model="details.fuel_date_time"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.fuel_date_time.$invalid && submitted,
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
      <h5 class="required dialog-label-text">Meter</h5>
      <TextField
        label="meter"
        type="number"
        v-model="details.meter"
        :classes="{
          'p-invalid': v$.details.meter.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Distance(Km)</h5>
      <TextField
        label="distance"
        type="number"
        v-model="details.distance"
        :classes="{
          'p-invalid': v$.details.distance.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Cost/KM</h5>
      <TextField
        label="cost_per_km"
        type="number"
        v-model="details.cost_per_km"
        :classes="{
          'p-invalid': v$.details.cost_per_km.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Cost/Lit</h5>
      <TextField
        label="cost_per_liter"
        type="number"
        v-model="details.cost_per_liter"
        :classes="{
          'p-invalid': v$.details.cost_per_liter.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Efficiency</h5>
      <TextField
        label="efficiency"
        type="number"
        v-model="details.efficiency"
        :classes="{
          'p-invalid': v$.details.efficiency.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Capacity</h5>
      <DropDown
        code="code"
        :state="details.capacity"
        :data="Capacity"
        label="capacity"
        id="capacity"
        v-model="details.capacity"
        :classes="{
          'p-invalid': v$.details.capacity.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Card Number</h5>
      <TextField
        label="card_no"
        type="number"
        v-model="details.card_no"
        :classes="{
          'p-invalid': v$.details.card_no.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Product Name</h5>
      <DropDown
        code="code"
        :state="details.product_name"
        :data="ProductName"
        label="product_name"
        id="product_name"
        v-model="details.product_name"
        :classes="{
          'p-invalid': v$.details.product_name.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Delivery Point</h5>
      <DropDown
        code="code"
        :state="details.delivery_point"
        :data="DeliveryPoint"
        label="delivery_point"
        id="delivery_point"
        v-model="details.delivery_point"
        :classes="{
          'p-invalid': v$.details.delivery_point.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="flex align-self-center justify-content-end">
    <Buttons
      label="Cancel"
      v-on:childToParent="closeDialog"
      class="p-button-outlined mr-1 dialog-button-text color-357dea"
    />
    <Buttons
      label="Save"
      button_class="dialog-button-text bg-357dea"
      v-on:childToParent="submitData"
    />
  </div>
</template>

<script>
import moment from "moment";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "FleetFuelDialog",
  data: () => ({
    Capacity: [
      { name: "Capacity 1", code: "1" },
      { name: "Capacity 2", code: "2" },
    ],
    ProductName: [
      { name: "Product 1", code: "1" },
      { name: "Product 2", code: "2" },
    ],
    DeliveryPoint: [
      { name: "Point 1", code: "1" },
      { name: "Point 2", code: "2" },
    ],
    details: {
      vehicle_reg_no: "",
      vehicle_name: "",
      driver: "",
      route: "",
      gst: false,
      amount: "",
      units: "",
      fuel_date_time: "",
      meter: "",
      distance: "",
      cost_per_liter: "",
      cost_per_km: "",
      efficiency: "",
      capacity: "",
      card_no: "",
      product_name: "",
      delivery_point: "",
      image_url: "",
    },
    v$: useVuelidate(),
    submitted: false,
  }),
  validations() {
    return {
      details: {
        vehicle_reg_no: { required },
        vehicle_name: { required },
        driver: { required },
        route: { required },
        amount: { required },
        units: { required },
        fuel_date_time: { required },
        meter: { required },
        distance: { required },
        cost_per_liter: { required },
        cost_per_km: { required },
        efficiency: { required },
        capacity: { required },
        card_no: { required },
        product_name: { required },
        delivery_point: { required },
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
        case "capacity":
          source = this.Capacity;
          break;
        case "product_name":
          source = this.ProductName;
          break;
        case "delivery_point":
          source = this.DeliveryPoint;
          break;
      }
      return source;
    },
    dateAndTimeFormatter(date) {
      return date.toISOString();
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMMM YYYY");
        return formattedDate;
      }
    },
    dropDownFilter(data, checkerCode, inputCode) {
      for (var dd in data) {
        if (inputCode == data[dd][checkerCode]) {
          return data[dd].name;
        }
      }
    },
    checkBoxChange(val, src) {
      if (val.length != 0) {
        this.details[val[0].tag] = true;
      }
      if (val.length == 0) {
        this.details[src[0].tag] = false;
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
        let fuelDetails = {};
        for (let d in this.details) {
          if (
            d == "vehicle_reg_no" ||
            d == "capacity" ||
            d == "product_name" ||
            d == "delivery_point" ||
            d == "driver"
          ) {
            if (isNaN(this.details[d]) == false) {
              fuelDetails[d] = this.dropDownFilter(
                this.getDropDownData(d),
                "code",
                this.details[d]
              );
            } else {
              fuelDetails[d] = this.details[d];
            }
          } else if (d == "fuel_date_time") {
            if (
              Object.keys(this.$store.state.fleets.fleetFuelStateData).length !=
              0
            ) {
              fuelDetails[d] = this.dateAndTimeFormatter(
                new Date(this.details[d])
              );
            } else {
              fuelDetails[d] = this.dateAndTimeFormatter(this.details[d]);
            }
          } else {
            fuelDetails[d] = this.details[d];
          }
        }
        //making an update/PATCH api call to update fuel details
        if (this.$store.state.fleets.fleetFuelStateData.id) {
          fuelDetails["id"] = this.$store.state.fleets.fleetFuelStateData.id;
          this.$store.dispatch("fleets/vehiclesCommonsCRUD", {
            path: "fuel",
            loadApiName: "loadVehicleCommons",
            mutation: "fetchFuelTableData",
            tag: "update",
            data: fuelDetails,
            type: "Fuel",
          });
        }
        //making an add/POST api call to create new fuel details
        else {
          this.$store.dispatch("fleets/vehiclesCommonsCRUD", {
            path: "fuel",
            loadApiName: "loadVehicleCommons",
            mutation: "fetchFuelTableData",
            tag: "add",
            data: fuelDetails,
            type: "Fuel",
          });
        }
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.fleets.fleetFuelStateData).length != 0
      ) {
        for (let state in this.details) {
          if (state == "fuel_date_time") {
            let rawDate = new Date(
              this.$store.state.fleets.fleetFuelStateData[state]
            );
            this.details[state] = this.dateFormater(rawDate);
          } else if (state == "driver_id") {
            this.details["driver_id"] =
              this.$store.state.fleets.fleetFuelStateData["driver_name"];
          } else {
            this.details[state] =
              this.$store.state.fleets.fleetFuelStateData[state];
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
          this.details.image_url = v_obj["image_url"];
        }
      }
    },
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
    this.loadState();
  },
};
</script>

<style scoped>
.small-text {
  font-size: 14px;
}
.checksText {
  margin-top: 7px !important;
}
</style>
