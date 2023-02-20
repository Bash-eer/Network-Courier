<template>
  <div>
    <SalesProjectjobStepper
      :stepId="stepId"
      :stepperData="$store.state.quotation.addRegionStepperData"
    />
  </div>
</template>

<script>
import SalesProjectjobStepper from "../../Stepper.vue";

export default {
  components: { SalesProjectjobStepper },
  data: () => ({
    stepId: "SalesProjectJobsQuotationDialog",
  }),
};
</script>

<style>
</style>