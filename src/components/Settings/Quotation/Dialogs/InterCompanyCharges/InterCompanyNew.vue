<template>
  <div>
    <SalesProjectjobStepper
      :stepId="stepId"
      :stepperData="$store.state.quotation.addSalesInterCompanyChargesStepperData"
    />
  </div>
</template>

<script>
import SalesProjectjobStepper from "../../Stepper.vue";

export default {
  components: { SalesProjectjobStepper },
  data: () => ({
    stepId: "InterCompanyQuotation",
  }),
};
</script>

<style>
</style>