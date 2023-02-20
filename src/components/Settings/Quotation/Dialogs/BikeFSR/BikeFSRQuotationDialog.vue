<template>
  <div>
    <SalesProjectjobStepper
      :stepId="stepId"
      :stepperData="$store.state.quotation.addSalesBikeFSRStepperData"
    />
  </div>
</template>

<script>
import SalesProjectjobStepper from "../../Stepper.vue";

export default {
  components: {SalesProjectjobStepper},
  data: () => ({
    stepId: "AddBikeAddress",
  }),
};
</script>

<style></style>
