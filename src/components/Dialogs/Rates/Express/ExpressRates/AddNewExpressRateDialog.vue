<template>
  <div class="mt-1">
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="required dialog-label-text">Region</h5>
        <DropDown
          code="code"
          :data="$store.state.masters.expressRegionsDropDown"
          v-model="details.id"
          :classes="{
            'p-invalid':
              v$.details.id.$invalid &&
              $store.state.masters.expressRatesSubmitted,
            'inputfield w-full dialog-dropdown-text regions_dropdown': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="required dialog-label-text">Rate Card Name</h5>
        <TextField
          label="rateCardName"
          v-model="details.rate_card_name"
          @blur="v$.details.rate_card_name.$model;"
          :classes="{
            'p-invalid':
              v$.details.rate_card_name.$invalid &&
              $store.state.masters.expressRatesSubmitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>
    <div class="flex justify-content-between mb-5">
      <div class="flex"></div>
      <div class="flex mr-3">
        <div class="flex flex-row">
          <div class="flex">
            <CheckBox
              v-bind:checker="[]"
              v-bind:categories="[
                {
                  name: 'defaultRateCard',
                  key: 'a',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
          </div>
          <div class="flex default_rate_card pt-2">
            Set as default Rate Card
          </div>
        </div>
      </div>
    </div>
    <Stepper :stepId="stepId" :stepperData="expressRateStepperItems" />
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "AddNewExpressRateDialog",
  data: () => ({
    details: {
      id: "",
      rate_card_name: "",
      default: false,
    },
    v$: useVuelidate(),
    stepId: "Trips",
    expressRateStepperItems: [
      {
        index: 0,
        label: "1",
        component: "Trips",
        name: "Trips",
      },
      {
        index: 1,
        label: "2",
        component: "Rates",
        name: "Rates",
      },
    ],
  }),
  validations() {
    return {
      details: {
        id: { required },
        rate_card_name: { required },
      },
    };
  },
  methods: {
    checkBoxChange(val) {
      if (Object.keys(val).length != 0) {
        this.details.default = true;
      }
      if (Object.keys(val).length == 0) {
        this.details.default = false;
      }
    },
  },
  created() {
    this.$store.dispatch("masters/loadRegionsDropDown");
    this.$store.state.masters.expressRegionsTripTableData = null;
    this.$store.state.masters.expressRatesSubmitted = false;
    this.$store.state.masters.expressRatesSubmittedValidation = null;
    this.$store.state.masters.expressExpressRatesFormData = {};
    this.$store.state.sales.stepperNavigation = null;
  },
  watch: {
    v$: function () {
      this.$store.state.masters.expressRatesSubmittedValidation = this.v$;
    },
    "details.id": function () {
      this.$store.state.masters.expressRegionsTripTableData = null;
      this.$store.dispatch("masters/loadTripSchedules", {
        id: this.details.id,
      });
      this.$store.state.masters.expressRateCardDetails = this.details;
    },
    "details.rate_card_name": function () {
      this.$store.state.masters.expressRateCardDetails = this.details;
    },
    "details.default": function () {
      this.$store.state.masters.expressRateCardDetails = this.details;
    },
  },
};
</script>
<style scoped>
.default_rate_card {
  font-size: 12px;
  font-weight: 600;
  color: #4e5968;
}
.regions_dropdown {
  height: 49% !important;
}
</style>
