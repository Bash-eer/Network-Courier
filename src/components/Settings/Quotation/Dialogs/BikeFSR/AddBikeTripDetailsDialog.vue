<template>
  <br />
  <div class="col-12 md:col-12">
    <p class="trips-header mt-3 ml-2">Trip Plan</p>
  </div>
  <div class="formgrid grid ml-2">
    <div class="col-12 md:col-6">
      <h5 class="required dialog-label-text required">Region</h5>
      <DropDown
        code="name"
        :data="region"
        label="region"
        v-model="details.region"
        :class="{
          'p-invalid': v$.details.region.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="col-12 md:col-6">
      <h5 class="required dialog-label-text required">Rates</h5>
      <DropDown
        code="name"
        :data="rates"
        label="rates"
        v-model="details.rates"
        :class="{
          'p-invalid': v$.details.rates.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="field col-12 md:col-12">
    <p class="trips-header mt-3 ml-2">Trip Schedule</p>
  </div>
  <div class="row ml-2 table_div">
    <div class="col-12">
      <keep-alive>
        <FormTable
          v-if="$store.state.quotation.inspectionsDropDownTableData != null"
          :key="$store.state.quotation.inspectionsDropDownTableData"
          formTableDataName="inspectionsFormTableData"
          :selectionModeState="selectionModeState"
          dataKey="id"
          :tableData="$store.state.quotation.inspectionsDropDownTableData"
          :tableColumns="
            $store.state.quotation.inspectionsDropDownTableDataColumns
          "
          storePath="quotation"
        />
      </keep-alive>
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
    <div class="align-self-center flex ml-2">
      <Buttons
        label="Previous"
        v-on:childToParent="goBackHandler"
        class="p-button-outlined mr-1 dialog-button-text previous-btn"
      />
    </div>
    <div class="flex align-self-center justify-content-end">
      <CancelButton storePath="quotation" />

      <Buttons
        label="Next"
        button_class="dialog-button-text"
        v-on:childToParent="nextStepHandler"
      />
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "AddBikeTripDetailsDialog",
  data: () => ({
    v$: useVuelidate(),
    selectionModeState: null,
    details: {
      region: "",
      rates: "",
    },

    region: [
      { name: "Airport", code: "USD" },
      { name: "Railways", code: "SGD" },
    ],
    rates: [
      { name: "Rate Card1", code: "USD" },
      { name: "Rate Card2", code: "SGD" },
    ],

    submitted: false,
  }),
  validations() {
    return {
      details: {
        region: { required },
        rates: { required },
      },
    };
  },
  methods: {
    goBackHandler() {
      this.$store.dispatch("quotation/navigateStepper", {
        step: "AddBikeSelectMethodDialog",
      });
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.$store.state.quotation.quotationDetails.push(this.details);
        this.$store.dispatch("quotation/navigateStepper", {
          step: "AddBikeCostingDetailsDialog",
        });
      }
    },
  },
};
</script>

<style scoped>
.trips-header {
  font-size: 12px !important;
  color: #343434 !important;
}
</style>
