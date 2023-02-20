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
        :data="$store.state.masters.expressRegionsDropDown"
        v-model="details.Region"
        @blur="v$.details.Region.$model;"
        :classes="{
          'p-invalid': v$.details.Region.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text regions_dropdown': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Rates</h5>
      <DropDown
        code="code"
        label="rates"
        id="rates"
        :data="$store.state.masters.expressTripCardsDropDown"
        v-model="details.rates"
        @blur="v$.details.rates.$model"
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
      <FormTable
        v-if="$store.state.masters.expressRegionsTripTableData != null"
        dataKey="trip_no"
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
          v-on:childToParent="closeDialog"
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
  name: "ExpressContractVanTripDetails",
  data: () => ({
    v$: useVuelidate(),
    details: {
      Region: "",
      rates: "",
    },
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
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
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
        this.details.Region = this.dropDownFilter(
          this.$store.state.masters.expressRegionsDropDown,
          "code",
          this.details.Region
        );
        this.details.rates = this.dropDownFilter(
          this.$store.state.masters.expressTripCardsDropDown,
          "code",
          this.details.rates
        );
        for (var d in this.details) {
          this.$store.state.sales.quotationCreationFormData[d] =
            this.details[d];
        }
        this.$store.state.sales.quotationCreationFormData["trip_schedule"] =
          this.$store.state.masters.formTableData;
        this.$store.state.sales.stepperNavigation = "QuotationCostingDetails";
      }
    },
  },
  created() {
    this.$store.dispatch("masters/loadRegionsDropDown");
  },
  watch: {
    "details.Region": function () {
      this.$store.state.masters.expressRegionsTripTableData = null;
      this.$store.dispatch("masters/loadTripSchedules", {
        id: this.details.Region,
      });
      this.$store.dispatch("masters/loadTripCardsDropDown", {
        id: this.details.Region,
      });
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
