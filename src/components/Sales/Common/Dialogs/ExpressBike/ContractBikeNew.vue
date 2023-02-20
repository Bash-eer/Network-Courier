<template>
  <div>
    <SalesProjectjobStepper
      :stepId="stepId"
      :stepperData="$store.state.quotation.addExpressContractBikeStepperData"
    />
  </div>
</template>

<script>
import SalesProjectjobStepper from "../../Stepper.vue";

export default {
  components: { SalesProjectjobStepper },
  data: () => ({
    stepId: "ContractBikeCostCenter",
  }),
};
</script>

<style>
</style>