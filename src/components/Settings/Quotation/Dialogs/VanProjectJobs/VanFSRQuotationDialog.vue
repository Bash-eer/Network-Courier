<template>
  <div>
    <SalesProjectjobStepper
      :stepId="stepId"
      :stepperData="$store.state.quotation.addSalesProjectJobVanFSRStepperData"
    />
  </div>
</template>

<script>
import SalesProjectjobStepper from "../../Stepper.vue";

export default {
  components: {SalesProjectjobStepper},
  data: () => ({
    stepId: "AddAddressDialog",
  }),
};
</script>

<style></style>
