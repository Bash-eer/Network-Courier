<template>
  <div>
    <SalesProjectjobStepper
      :stepId="stepId"
      :stepperData="$store.state.quotation.addSalesFSRVanStepperData"
    />
  </div>
</template>

<script>
import SalesProjectjobStepper from "../../Stepper.vue";

export default {
  components: { SalesProjectjobStepper },
  data: () => ({
    stepId: "FSRVanQuotationDialog",
  }),
};
</script>

<style>
</style>