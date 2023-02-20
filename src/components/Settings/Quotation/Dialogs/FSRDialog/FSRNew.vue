<template>
  <div>
    <SalesProjectjobStepper
      :stepId="stepId"
      :stepperData="$store.state.quotation.addSalesFSRStepperData"
    />
  </div>
</template>

<script>
import SalesProjectjobStepper from "../../Stepper.vue";

export default {
  components: { SalesProjectjobStepper },
  data: () => ({
    stepId: "FSRQuotationDialog",
  }),
};
</script>

<style>
</style>