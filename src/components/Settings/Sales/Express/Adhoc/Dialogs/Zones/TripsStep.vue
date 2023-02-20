<template>
  <!--tab-->
  <br />
  <div class="ml-0 pl-0 mt-2">
    <BikeVanDuoSelect
      :options="['Bike', 'Van']"
      :default="defaultTransportType"
      type="setTransportType"
    />
  </div>

  <!--add trips-->
  <p class="color-4e5968 font-size-14 bold-600 mt-4 add_trips">Add Trips</p>
  <div v-for="(trip, index) of addTrips" :key="trip">
    <div
      v-if="index > 0"
      class="flex justify-content-between align-items-center ml-2"
    >
      <div class="flex"></div>
      <div class="flex delete" @click="deleteTrip(index)">
        <i class="fas fa-times mt-2 color-ff5656"></i>
      </div>
    </div>
    <!--grid-->
    <div class="formgrid grid">
      <!--first section-->
      <div class="field col-6 md:col-2">
        <h5 class="required color-7a7a7a font-size-14 bold-500 mt-1">
          Trip No
        </h5>
        <TextField
          label="TripNo"
          id="TripNo"
          type="number"
          v-model="details[defaultTripsType][index].trip_no"
          :classes="{
            'p-invalid':
              v$.details[defaultTripsType][index].trip_no.$invalid && submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
      <!--second section-->
      <div class="field col-12 md:col-5">
        <h5 class="required color-7a7a7a font-size-14 bold-500 mt-1 ml-1">
          Trip Timing
        </h5>
        <div class="formgrid grid">
          <div class="field col-12 md:col-5">
            <TimePicker24
              :key="defaultTripsType"
              v-model="details[defaultTripsType][index].from_time"
              :state="details[defaultTripsType][index].from_time"
              :classes="{
                'p-invalid':
                  v$.details[defaultTripsType][index].from_time.$invalid &&
                  submitted,
                'inputfield w-full dialog-dropdown-text ': true,
              }"
            />
          </div>
          <div
            class="
              col-1
              add-new-zone-custom-line
              flex
              justify-content-center
              align-items-center
              pb-2
            "
          >
            -
          </div>
          <div class="field col-12 md:col-5">
            <TimePicker24
              :key="defaultTripsType"
              v-model="details[defaultTripsType][index].to_time"
              :state="details[defaultTripsType][index].to_time"
              :classes="{
                'p-invalid':
                  v$.details[defaultTripsType][index].to_time.$invalid &&
                  submitted,
                'inputfield w-full dialog-dropdown-text ': true,
              }"
            />
          </div>
        </div>
      </div>
      <!--thirdsection-->
      <div class="field col-12 md:col-5 m-0 p-0">
        <div class="formgrid grid m-0 p-0">
          <div class="field col-12 md:col-6">
            <h5 class="required color-7a7a7a font-size-14 bold-500 mt-1 ml-1">
              Trip Days
            </h5>

            <DropDown
              :data="tripDaysDropDownData"
              code="name"
              v-model="details[defaultTripsType][index].trip_days"
              :key="defaultTripsType"
              :state="details[defaultTripsType][index].trip_days"
              :classes="{
                'p-invalid':
                  v$.details[defaultTripsType][index].trip_days.$invalid &&
                  submitted,
                'inputfield w-full dialog-dropdown-text trips_dropdown ': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-6">
            <h5 class="required color-7a7a7a font-size-14 bold-500 mt-1 ml-1">
              Trip Type
            </h5>

            <DropDown
              :data="tripTypeDropDownData"
              code="name"
              v-model="details[defaultTripsType][index].trip_type"
              :key="defaultTripsType"
              :state="details[defaultTripsType][index].trip_type"
              :classes="{
                'p-invalid':
                  v$.details[defaultTripsType][index].trip_type.$invalid &&
                  submitted,
                'inputfield w-full dialog-dropdown-text trips_dropdown': true,
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-content-between add_trip">
    <div class="flex">
      <span class="new_contact Contact" @click="addTrip"
        ><b>+ Add Trip</b></span
      >
    </div>
  </div>
  <!--footer btns-->
  <div class="mt-3" v-if="showSuggestions == true">
    <span class="tab-validation-text">
      <i class="pi pi-info-circle mr-2"></i>
      <span>Fill all the required fields in both Bike and Van tab</span>
    </span>
  </div>
  <br />
  <div
    class="flex justify-content-between w-full align-content-start flex-wrap"
  >
    <div class="align-self-center flex">
      <Buttons
        label="Previous"
        v-on:childToParent="goBackHandler"
        class="
          p-button-outlined
          mr-1
          dialog-button-text
          previous-btn
          color-357dea
        "
      />
    </div>
    <div class="flex align-self-center justify-content-end">
      <CancelButton
        storePath="expressAdhoc"
        label="Cancel"
        class="color-357dea"
      />
      <Buttons
        label="Next"
        button_class="dialog-button-text bg-357dea"
        v-on:childToParent="nextStepHandler"
      />
    </div>
  </div>
</template>

<script>
import BikeVanDuoSelect from "./BikeVanDuoSelection.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import moment from "moment";
export default {
  components: { BikeVanDuoSelect },
  data: () => ({
    showSuggestions: false,
    defaultTransportType: "Bike",
    defaultTripsType: "bike_trips",
    addTrips: ["new_trip"],
    addTripsClicked: 0,
    v$: useVuelidate(),
    submitted: false,

    deletedTrips: [],
    deletedDeliveries: [],
    bike_trips_validation: [
      {
        trip_no: { required },
        from_time: { required },
        to_time: { required },
        trip_days: { required },
        trip_type: { required },
      },
    ],
    van_trips_validation: [
      {
        trip_no: { required },
        from_time: { required },
        to_time: { required },
        trip_days: { required },
        trip_type: { required },
      },
    ],
    details: {
      bike_trips: [
        {
          trip_no: "",
          from_time: "",
          to_time: "",
          trip_days: "",
          trip_type: "",
        },
      ],
      van_trips: [
        {
          trip_no: "",
          from_time: "",
          to_time: "",
          trip_days: "",
          trip_type: "",
        },
      ],
    },

    tripDaysDropDownData: [
      { name: "Weekdays", code: "WD" },
      { name: "Weekends", code: "WE" },
      { name: "Saturdays", code: "ST" },
    ],
    tripTypeDropDownData: [
      { name: "Open", code: "OP" },
      { name: "Fixed", code: "CL" },
    ],
  }),
  validations() {
    if (this.addTripsClicked > -1) {
      return {
        details: {
          bike_trips: this.bike_trips_validation,
          van_trips: this.van_trips_validation,
        },
      };
    }
  },
  methods: {
    goBackHandler() {
      this.$store.dispatch("expressAdhoc/navigateStepper", {
        step: "PostalCodeStep",
      });
    },

    timeFormatter(data) {
      if (data == null) {
        return "00:00";
      } else {
        var formattedTimeUTC = moment(data).utc().format("HH:mm");

        return formattedTimeUTC;
      }
    },
    processDropDown(key, source) {
      for (let tr in this.details.trips) {
        let tr_obj = this.details.trips[tr];
        for (let tr_keys in tr_obj) {
          if (tr_keys == key) {
            for (let s in this[source]) {
              if (this[source][s]["code"] == tr_obj[tr_keys]) {
                tr_obj[tr_keys] = this[source][s]["name"];
              }
            }
          }
        }
      }
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
        this.showSuggestions = true;
      }
      if (!this.v$.$invalid) {
        //NEXT STEP BIKE DELIVERY ROWS
        if (
          Object.keys(this.$store.state.expressAdhoc.addZoneFormStateData)
            .length == 0
        ) {
          //
        }

        //action
        this.deliveryTableRows("Van");
        this.deliveryTableRows("Bike");

        this.$store.state.expressAdhoc.addZoneData["trips"] = {
          bike: this.processedTrips(this.details.bike_trips),
          van: this.processedTrips(this.details.van_trips),
        };

        // this.$store.state.expressAdhoc.addZoneData["trips"].bike =
        //   this.processedTrips(this.details.bike_trips);
        // this.$store.state.expressAdhoc.addZoneData["trips"].van =
        //   this.processedTrips(this.details.van_trips);
        // this.$store.state.expressAdhoc.addZoneData["van_trips"] =
        //   this.processedTrips(this.details.van_trips);
        this.$store.dispatch("expressAdhoc/navigateStepper", {
          step: "DeliveryStep",
        });
      }
    },
    deliveryTableRows(type) {
      let trips_type = type == "Van" ? "van_trips" : "bike_trips";
      let deliveryDataStateType =
        type == "Van" ? "addZoneVanDeliveryData" : "addZoneBikeDeliveryData";
      let trips_no_arr = [];
      for (let i in this.details[trips_type]) {
        let data = this.details[trips_type][i];
        if (data.trip_no) {
          if (data.id) {
            let deliveryData = data.deliveries;
            for (let del in deliveryData) {
              let delObj = deliveryData[del];
              for (let delKeys in delObj) {
                if (delKeys == "trip_no") delObj[delKeys] = data.trip_no;
                if (
                  delKeys == "before_delivery_select" ||
                  delKeys == "return_direction_select" ||
                  delKeys == "return_delivery_select"
                ) {
                  delKeys = delObj[delKeys] || true;
                }
                if (
                  delKeys == "before_delivery_normal_time" ||
                  delKeys == "before_delivery_urgent_time" ||
                  delKeys == "return_direction_normal_time" ||
                  delKeys == "return_direction_urgent_time" ||
                  delKeys == "return_delivery_normal_time" ||
                  delKeys == "return_delivery_urgent_time"
                ) {
                  if (new Date(delObj[delKeys]) != "Invalid Date") {
                    delObj[delKeys] = this.timeFormatter(delObj[delKeys]);
                  }
                }
              }
            }
            trips_no_arr.push(deliveryData[0]);
          } else {
            trips_no_arr.push({
              trip_no: data.trip_no,
              before_delivery_normal_time: "00:00",
              before_delivery_urgent_time: "00:00",
              before_delivery_select: false,
              return_direction_normal_time: "00:00",
              return_direction_urgent_time: "00:00",
              return_direction_select: false,
              return_delivery_normal_time: "00:00",
              return_delivery_urgent_time: "00:00",
              return_delivery_select: false,
            });
          }
        }
      }

      this.$store.state.expressAdhoc[deliveryDataStateType] = trips_no_arr;
    },
    processedTrips(data) {
      let processedData =
        //data;
        JSON.parse(JSON.stringify(data));

      for (let p in processedData) {
        processedData[p]["from_time"] = this.timeFormatter(
          processedData[p]["from_time"]
        );
        processedData[p]["to_time"] = this.timeFormatter(
          processedData[p]["to_time"]
        );
      }
      return processedData;
    },
    addTrip() {
      this.addBikeOrVanTrips(this.getType(this.defaultTransportType, "trips"));
      this.addTripsClicked++;
      this.addTrips.push("new_trip");
    },
    deleteTrip(index) {
      this.deleteBikeorVanTrips(
        this.getType(this.defaultTransportType, "trips"),
        index
      );
      this.addTrips.splice(index, 1);
      this.addTripsClicked++;
    },

    addBikeOrVanTrips(type) {
      this.details[type].push({
        trip_no: "",
        from_time: "",
        to_time: "",
        trip_days: "",
        trip_type: "",
      });
      this[type + "_validation"].push({
        trip_no: { required },
        from_time: { required },
        to_time: { required },
        trip_days: { required },
        trip_type: { required },
      });
    },
    deleteBikeorVanTrips(type, index) {
      this.details[type].splice(index, 1);
      this[type + "_validation"].splice(index, 1);
    },
    bikeOrVanTripsState(type) {
      //eslint-disable-next-line no-unused-vars
      for (let state in this.details[type]) {
        this.addTrips.push("new_trip");
      }
    },
    getType(choice, category) {
      let type;
      if (category == "trips") {
        type = choice == "Bike" ? "bike_trips" : "van_trips";
        return type;
      }
    },
    loadValidationState(type) {
      let validationArrayType =
        type == "Van" ? "van_trips_validation" : "bike_trips_validation";
      let tripsType = type == "Van" ? "van_trips" : "bike_trips";
      //eslint-disable-next-line no-unused-vars
      for (let d in this.details[tripsType]) {
        this[validationArrayType].push({
          trip_no: { required },
          from_time: { required },
          to_time: { required },
          trip_days: { required },
          trip_type: { required },
        });
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.expressAdhoc.addZoneFormStateData)
          .length != 0
      ) {
        this.addTrips = [];
        this.details.bike_trips = [];
        this.details.van_trips = [];
        this.bike_trips_validation = [];
        this.van_trips_validation = [];

        let incomingData = JSON.parse(
          JSON.stringify(this.$store.state.expressAdhoc.addZoneFormStateData)
        );
        //this.$store.state.expressAdhoc.addZoneFormStateData;

        this.details.bike_trips = incomingData.services[0].trips;
        this.details.van_trips = incomingData.services[1].trips;

        this.loadValidationState("Van");

        this.loadValidationState("Bike");

        this.addTripsClicked++;
      }
    },
  },
  created() {
    this.loadState();
  },
  watch: {
    //watch transport type choices (bike/van)
    "$store.state.expressAdhoc.transportType": function () {
      this.addTrips = [];
      this.defaultTransportType = this.$store.state.expressAdhoc.transportType;
      this.defaultTripsType = this.getType(
        this.$store.state.expressAdhoc.transportType,
        "trips"
      );
      this.bikeOrVanTripsState(this.defaultTripsType);
    },
    "details.Bike[0].from_time": function () {},
    defaultTripsType: function () {},
  },
  unmounted() {
    this.$store.state.expressAdhoc.transportType = null;
  },
};
</script>

<style scoped>
.add-new-zone-custom-line {
  font-weight: bold;
  color: #000;
}
.p-datatable .p-column-header-content {
  font-size: 10px !important;
  color: pink !important;
}
</style>
