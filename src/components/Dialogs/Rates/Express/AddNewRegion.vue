<template>
  <div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="required dialog-label-text">Region</h5>
        <TextField
          label="address1"
          v-model="details.region"
          @blur="v$.details.region.$model"
          :classes="{
            'p-invalid': v$.details.region.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>

    <p class="txt ml-3 mt-5 add_trips">Add Trips</p>
    <div v-for="(trip, index) of addTrips" :key="trip">
      <div
        v-if="index > 0 && trip == 'new_trip'"
        class="flex justify-content-between ml-2"
      >
        <div class="flex"></div>
        <div class="flex delete" @click="deleteTrip(index)">
          <i class="fas fa-times mt-2"></i>
        </div>
      </div>
      <div class="formgrid grid mt-1 ml-2">
        <div class="field col-12 md:col-2">
          <h5 class="required dialog-label-text mt-1">Trip No</h5>
          <TextField
            label="TripNo"
            id="TripNo"
            type="number"
            v-model="details.trips[index].trip_no"
            @blur="v$.details.trips[index].trip_no.$model;"
            :classes="{
              'p-invalid':
                v$.details.trips[index].trip_no.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-5">
          <h5 class="required dialog-label-text mt-1 ml-2">Trip Timing</h5>
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <TimePicker
                v-model="details.trips[index].from"
                @blur="v$.details.trips[index].from.$model;"
                :state="details.trips[index].from"
                :classes="{
                  'p-invalid':
                    v$.details.trips[index].from.$invalid && submitted,
                  'inputfield w-full dialog-dropdown-text ': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-6">
              <TimePicker
                v-model="details.trips[index].to"
                @blur="v$.details.trips[index].to.$model;"
                :state="details.trips[index].to"
                :classes="{
                  'p-invalid': v$.details.trips[index].to.$invalid && submitted,
                  'inputfield w-full dialog-dropdown-text ': true,
                }"
              />
            </div>
          </div>
        </div>
        <div class="field col-12 md:col-5">
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <h5 class="required dialog-label-text mt-1 ml-2">Trip Days</h5>
              <DropDown
                :data="tripDaysDropDownData"
                code="code"
                v-model="details.trips[index].day"
                @blur="v$.details.trips[index].day.$model;"
                :state="details.trips[index].day"
                :classes="{
                  'p-invalid':
                    v$.details.trips[index].day.$invalid && submitted,
                  'inputfield w-full dialog-dropdown-text trips_dropdown ': true,
                }"
              />
            </div>
            <div class="field col-12 md:col-6">
              <h5 class="required dialog-label-text mt-1 ml-2">Trip Type</h5>
              <DropDown
                :data="tripTypeDropDownData"
                code="code"
                v-model="details.trips[index].type"
                @blur="v$.details.trips[index].type.$model;"
                :state="details.trips[index].type"
                :classes="{
                  'p-invalid':
                    v$.details.trips[index].type.$invalid && submitted,
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
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "AddNewRegion",
  data: () => ({
    v$: useVuelidate(),
    addTrips: ["new_trip"],
    addTripClicked: 0,
    tripsValidation: [
      {
        trip_no: { required },
        from: { required },
        to: { required },
        day: { required },
        type: { required },
      },
    ],
    details: {
      region: "",
      trips: [
        {
          trip_no: "",
          from: "",
          to: "",
          day: "",
          type: "",
        },
      ],
    },
    submitted: false,
    tripDaysDropDownData: [
      { name: "Weekdays", code: "WD" },
      { name: "Weekends", code: "WE" },
      { name: "Saturdays", code: "ST" },
    ],
    tripTypeDropDownData: [
      { name: "Open", code: "OP" },
      { name: "Normal", code: "CL" },
    ],
  }),
  validations() {
    if (this.addTripClicked > -1) {
      return {
        details: {
          region: { required },
          trips: this.tripsValidation,
        },
      };
    }
  },
  methods: {
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    addTrip() {
      this.details.trips.push({
        trip_no: "",
        from: "",
        to: "",
        day: "",
        type: "",
      });
      this.tripsValidation.push({
        trip_no: { required },
        from: { required },
        to: { required },
        day: { required },
        type: { required },
      });
      this.addTripClicked++;
      this.addTrips.push("new_trip");
    },
    deleteTrip(index) {
      this.details.trips.splice(index, 1);
      this.addTrips.splice(index, 1);
      this.tripsValidation.splice(index, 1);
      this.addTripClicked++;
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
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.processDropDown("day", "tripDaysDropDownData");
        this.processDropDown("type", "tripTypeDropDownData");
        //CRUD - UPDATE OPERATION
        if (this.$store.state["masters"].expressRegionFormData.region_id) {
          this.details["region_id"] =
            this.$store.state["masters"].expressRegionFormData.region_id;
          //making an update/PUT api call - to update regions
          this.$store.dispatch("masters/expressRegionsCRUD", {
            tag: "update",
            data: this.details,
          });
        }
        //CRUD - CREATE OPERATION
        else {
          //making an add/POST api to add a new region
          this.$store.dispatch("masters/expressRegionsCRUD", {
            tag: "add",
            data: this.details,
          });
        }
      }
    },
  },
  created() {
    if (
      Object.keys(this.$store.state["masters"].expressRegionFormData).length !=
      0
    ) {
      this.tripsValidation = [];
      this.addTrips = [];
      this.details.trips = [];
      let tripState =
        this.$store.state["masters"].expressRegionFormData.regions_trips;
      for (let ts in tripState) {
        let ts_obj = tripState[ts];
        let detailsTripsObj = {};
        let detailsTripsValidationObj = {};
        this.addTrips.push("old_trip");
        for (let ts_keys in ts_obj) {
          if (
            ts_keys == "trip_no" ||
            ts_keys == "from" ||
            ts_keys == "to" ||
            ts_keys == "day" ||
            ts_keys == "type"
          ) {
            detailsTripsValidationObj[ts_keys] = { required };
            if (ts_keys == "from" || ts_keys == "to") {
              detailsTripsObj[ts_keys] = ts_obj[ts_keys + "raw_time"];
            } else {
              detailsTripsObj[ts_keys] = ts_obj[ts_keys];
            }
          }
        }
        this.details.trips.push(detailsTripsObj);
        this.tripsValidation.push(detailsTripsValidationObj);
      }
      for (let state in this.$store.state["masters"].expressRegionFormData) {
        if (state == "region") {
          this.details[state] =
            this.$store.state["masters"].expressRegionFormData[state];
        }
      }
    }
  },
};
</script>

<style></style>
