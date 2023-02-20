<template>
  <div>
    <SalesExpressVanStepper
      :stepId="stepId"
      :stepperData="$store.state.quotation.addSalesExpressVanQuotationstepperData"
    />
  </div>
</template>

<script>
import SalesExpressVanStepper from "../../Stepper.vue";

export default {
  components: { SalesExpressVanStepper },
  data: () => ({
    stepId: "SalesExpressVanQuotationDialog",
  }),
};
</script>

<style>
</style>