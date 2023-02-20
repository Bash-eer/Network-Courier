<template>
  <div>
    <SalesRapidojobStepper
      :stepId="stepId"
      :stepperData="$store.state.quotation.addSalesRapidoQuotationstepperData"
    />
  </div>
</template>
<script>
import SalesRapidojobStepper from "../../Stepper.vue";
export default {
  components: { SalesRapidojobStepper },
  data: () => ({
    stepId: "SalesRapidoAddAddress",
  }),
};
</script>
<style>
</style>