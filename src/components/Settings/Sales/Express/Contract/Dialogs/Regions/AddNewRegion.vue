<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required color-7a7a7a font-size-14 bold-500">Region</h5>
      <!--  'p-invalid': v$.details.region.$invalid && submitted,-->
      <TextField
        label="region"
        type="text"
        v-model="$store.state.expressContract.addRegionValue"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
      <span class="red region-error-text">{{ $store.state.expressContract.addRegionError }}</span>
    </div>
  </div>
  <!--stepper -->
  <div class="m-3">
    <ExpressContractStepper
      :stepId="stepId"
      :stepperData="$store.state.expressContract.addRegionStepperData"
    />
  </div>
  <br />
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import ExpressContractStepper from "../../Stepper.vue";
export default {
  components: { ExpressContractStepper },
  data: () => ({
    v$: useVuelidate(),
    stepId: "AddRegionTrips",

    details: {
      region: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        region: { required },
      },
    };
  },
  watch: {
    "$store.state.expressContract.addRegionValue": function () {
      if (this.$store.state.expressContract.addRegionValue != null) {
        this.$store.dispatch("expressContract/setRegionError", {
          error: null,
        });
      }
    },
  },

  unmounted() {
    this.$store.dispatch("expressContract/setAddRegionValue", {
      data: null,
    });
    this.$store.dispatch("expressContract/navigateStepper", {
      step: null,
    });
    //action
    this.$store.state.expressContract.transportType = null;

    this.$store.state.expressContract.addRegionFormStateData = {};
  },
};
</script>

<style scoped>
.region-error-text{
  font-size: 12px;
  font-weight: bold;
}
::v-deep .stepNames{
font-weight: 500;
font-size: 12px;
line-height: 15px;
color:#4e5868;
}
</style>
