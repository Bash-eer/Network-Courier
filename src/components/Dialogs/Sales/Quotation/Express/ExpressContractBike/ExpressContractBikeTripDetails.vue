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
        id="region"
        :state="details.Region"
        :data="$store.state.masters.expressRegionsDropDown"
        v-model="details.Region"
        :classes="{
          'p-invalid': v$.details.Region.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text regions_dropdown': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Rates</h5>
      <DropDown
        :key="$store.state.masters.expressTripCardsDropDown"
        code="code"
        label="rates"
        id="rates"
        :state="details.rates"
        :data="$store.state.masters.expressTripCardsDropDown"
        v-model="details.rates"
        :classes="{
          'p-invalid': v$.details.rates.$invalid && submitted,
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
      <keep-alive>
        <FormTable
          v-if="$store.state.masters.expressRegionsTripTableData != null"
          :key="$store.state.masters.expressRegionsTripTableData"
          formTableDataName="tripScheduleFormTableData"
          :selectionModeState="selectionModeState"
          dataKey="trip_no"
          :tableData="$store.state.masters.expressRegionsTripTableData"
          :tableColumns="$store.state.masters.expressRegionsTripTableColumnData"
        />
      </keep-alive>
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
  name: "ExpressContractBikeTripDetails",
  data: () => ({
    v$: useVuelidate(),
    details: {
      Region: "",
      rates: "",
    },
    selectionModeState: null,
    submitted: false,
  }),
  validations() {
    return {
      details: {
        Region: { required },
        rates: { required },
      },
    };
  },
  methods: {
    goBack() {
      this.$store.state.sales.stepperNavigation = "QuotationSelectMethod";
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
        if (isNaN(this.details.Region) == false) {
          this.details.Region = this.dropDownFilter(
            this.$store.state.masters.expressRegionsDropDown,
            "code",
            this.details.Region
          );
        }
        if (isNaN(this.details.rates) == false) {
          this.details.rates = this.dropDownFilter(
            this.$store.state.masters.expressTripCardsDropDown,
            "code",
            this.details.rates
          );
        }
        for (var d in this.details) {
          this.$store.state.sales.quotationCreationFormData[d] =
            this.details[d];
        }
        this.$store.state.sales.quotationCreationFormData["trip_schedule"] =
          this.$store.state.masters.tripScheduleFormTableData;
        this.$store.state.sales.stepperNavigation = "QuotationCostingDetails";
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state["sales"].quotationCreationStateData)
          .length != 0
      ) {
        for (let state in this.details) {
          this.details[state] =
            this.$store.state["sales"].quotationCreationStateData[state];
        }
      }
    },
    loadApis() {
      if (
        Object.keys(this.$store.state["sales"].quotationCreationStateData)
          .length == 0
      ) {
        this.$store.state.masters.tripScheduleFormTableData = [];
        this.selectionModeState = null;
      }

      let rId;
      let regionName;

      //if region is a string
      if (isNaN(this.details.Region) == true) {
        regionName = this.details.Region;
        for (let r in this.$store.state.masters.expressRegionsDropDown) {
          if (
            this.$store.state.masters.expressRegionsDropDown[r]["name"] ==
            this.details.Region
          ) {
            rId = this.$store.state.masters.expressRegionsDropDown[r]["code"];
          }
        }
      }

      //if region is a number
      if (isNaN(this.details.Region) == false) {
        regionName = this.dropDownFilter(
          this.$store.state.masters.expressRegionsDropDown,
          "code",
          this.details.Region
        );
        rId = this.details.Region;
      }

      if (
        Object.keys(this.$store.state["sales"].quotationCreationStateData)
          .length != 0
      ) {
        if (
          regionName ==
          this.$store.state["sales"].quotationCreationStateData.Region
        ) {
          this.$store.state.masters.tripScheduleFormTableData =
            this.$store.state["sales"].quotationCreationStateData.trip_schedule;
          this.selectionModeState =
            this.$store.state["sales"].quotationCreationStateData.trip_schedule;
        }

        if (
          regionName !=
          this.$store.state["sales"].quotationCreationStateData.Region
        ) {
          this.$store.state["sales"].quotationCreationStateData.trip_schedule =
            null;
          this.$store.state.masters.tripScheduleFormTableData = [];
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
    if (this.details.Region != "") {
      if (this.$store.state.sales.quotationCreationFormData["trip_schedule"]) {
        this.selectionModeState =
          this.$store.state.sales.quotationCreationFormData["trip_schedule"];
      }
      let rId;
      //if region is a string
      if (isNaN(this.details.Region) == true) {
        for (let r in this.$store.state.masters.expressRegionsDropDown) {
          if (
            this.$store.state.masters.expressRegionsDropDown[r]["name"] ==
            this.details.Region
          ) {
            rId = this.$store.state.masters.expressRegionsDropDown[r]["code"];
          }
        }
      }
      //if region is a number
      if (isNaN(this.details.Region) == false) {
        rId = this.details.Region;
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
    "details.Region": function () {
      this.loadApis();
    },
  },
};
</script>

<style>
.font {
  font-weight: bold;
}
.textJ {
  font-size: 14px;
  color: #4ac55d;
}
</style>
