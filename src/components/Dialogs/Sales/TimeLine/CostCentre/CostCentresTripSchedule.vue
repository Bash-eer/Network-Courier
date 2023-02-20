<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <span class="font txt">Trip plan</span>
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Region</h5>
      <DropDown
        code="code"
        label="region"
        :state="details.region"
        id="region"
        :data="$store.state.masters.expressRegionsDropDown"
        v-model="details.region"
        :classes="{
          'p-invalid': v$.details.region.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text regions_dropdown': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Routes</h5>
      <DropDown
        :key="$store.state.masters.expressTripCardsDropDown"
        code="code"
        label="route"
        :state="details.route"
        id="route"
        :data="$store.state.masters.expressTripCardsDropDown"
        v-model="details.route"
        :classes="{
          'p-invalid': v$.details.route.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <span class="font ml-2 txt">Trip Schedule</span>
    </div>
  </div>
  <div class="row ml-2 table_div">
    <div class="col-12">
      <FormTable
        v-if="$store.state.masters.expressRegionsTripTableData != null"
        :key="$store.state.masters.expressRegionsTripTableData"
        dataKey="trip_no"
        formTableDataName="costCentresFormTableData"
        :selectionModeState="selectionModeState"
        :tableData="$store.state.masters.expressRegionsTripTableData"
        :tableColumns="$store.state.masters.expressRegionsTripTableColumnData"
      />
    </div>
  </div>
  <div class="formgrid grid pl-2 pr-2">
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
      <Buttons
        label="Previous"
        v-on:childToParent="goBack"
        class="p-button-outlined mr-1 dialog-button-text"
      />
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <Buttons
          label="Cancel"
          class="p-button-outlined mr-1 dialog-button-text"
        />
        <Buttons
          label="Next"
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
  name: "CostCentresTripSchedule",
  data: () => ({
    v$: useVuelidate(),
    details: {
      region: "",
      route: "",
    },
    submitted: false,
    selectionModeState: null,
  }),
  validations() {
    return {
      details: {
        region: { required },
        route: { required },
      },
    };
  },
  methods: {
    goBack() {
      this.$store.state.sales.stepperNavigation = "CostCentresContactPerson";
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
        if (isNaN(this.details.region) == false) {
          this.details.region = this.dropDownFilter(
            this.$store.state.masters.expressRegionsDropDown,
            "code",
            this.details.region
          );
        }
        if (isNaN(this.details.route) == false) {
          this.details.route = this.dropDownFilter(
            this.$store.state.masters.expressTripCardsDropDown,
            "code",
            this.details.route
          );
        }
        for (let d in this.details) {
          this.$store.state.sales.costCenterFormData[d] = this.details[d];
        }

        this.$store.state.sales.costCenterFormData["trip_schedule"] =
          this.$store.state.masters.costCentresFormTableData;
        this.selectionModeState =
          this.$store.state.masters.costCentresFormTableData;
        // this.$store.state["sales"].costingCentreCreationStateData[
        //   "trip_schedule"
        // ] = this.$store.state.masters.costCentresFormTableData;
        this.$store.state.sales.stepperNavigation = "CostCentresSiteCharges";
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state["sales"].costingCentreCreationStateData)
          .length != 0
      ) {
        for (let state in this.details) {
          this.details[state] =
            this.$store.state["sales"].costingCentreCreationStateData[state];
        }
      }
    },
    loadApis() {
      if (
        Object.keys(this.$store.state["sales"].costingCentreCreationStateData)
          .length == 0
      ) {
        this.$store.state.masters.costCentresFormTableData = [];
        this.selectionModeState = null;
      }

      let rId;
      let regionName;

      //if region is a string
      if (isNaN(this.details.region) == true) {
        regionName = this.details.region;
        for (let r in this.$store.state.masters.expressRegionsDropDown) {
          if (
            this.$store.state.masters.expressRegionsDropDown[r]["name"] ==
            this.details.region
          ) {
            rId = this.$store.state.masters.expressRegionsDropDown[r]["code"];
          }
        }
      }

      //if region is a number
      if (isNaN(this.details.region) == false) {
        regionName = this.dropDownFilter(
          this.$store.state.masters.expressRegionsDropDown,
          "code",
          this.details.region
        );
        rId = this.details.region;
      }

      if (
        Object.keys(this.$store.state["sales"].costingCentreCreationStateData)
          .length != 0
      ) {
        if (
          regionName ==
          this.$store.state["sales"].costingCentreCreationStateData.region
        ) {
          this.$store.state.masters.costCentresFormTableData =
            this.$store.state[
              "sales"
            ].costingCentreCreationStateData.trip_schedule;
          this.selectionModeState =
            this.$store.state[
              "sales"
            ].costingCentreCreationStateData.trip_schedule;
        }

        if (
          regionName !=
          this.$store.state["sales"].costingCentreCreationStateData.region
        ) {
          this.details.route = "";
          this.$store.state[
            "sales"
          ].costingCentreCreationStateData.trip_schedule = null;
          this.$store.state.masters.costCentresFormTableData = [];
          this.selectionModeState = null;
        }
      }

      this.$store.state.masters.expressRegionsTripTableData = null;
      this.$store.dispatch("masters/loadTripSchedules", {
        id: rId,
      });
      this.$store.dispatch("masters/loadTripCardsDropDown", {
        id: rId,
      });
    },
  },
  //this lifecycle hook is triggered when a keep alive componen is loaded - mounted/unmounted hooks
  //do not work for keep alive components
  activated() {
    if (this.details.region != "") {
      if (this.$store.state.sales.costCenterFormData["trip_schedule"]) {
        this.selectionModeState =
          this.$store.state.sales.costCenterFormData["trip_schedule"];
      }

      let rId;
      //if region is a string
      if (isNaN(this.details.region) == true) {
        for (let r in this.$store.state.masters.expressRegionsDropDown) {
          if (
            this.$store.state.masters.expressRegionsDropDown[r]["name"] ==
            this.details.region
          ) {
            rId = this.$store.state.masters.expressRegionsDropDown[r]["code"];
          }
        }
      }
      //if region is a number
      if (isNaN(this.details.region) == false) {
        rId = this.details.region;
      }
      this.$store.dispatch("masters/loadTripSchedules", {
        id: rId,
      });
    }
  },
  created() {
    this.loadState();
  },
  watch: {
    "details.region": function () {
      this.loadApis();
    },
  },
};
</script>

<style></style>
