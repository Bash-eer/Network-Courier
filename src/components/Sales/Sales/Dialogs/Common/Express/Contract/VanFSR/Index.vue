<template>
  <div>
    <Stepper
      :stepId="stepId"
      :stepperData="$store.state.salesQuotationDialog.ExpressContractVanFSRStepperData"
    />
  </div>
</template>

<script>
import Stepper from "../../../Stepper.vue";

export default {
  components: {Stepper},
  data: () => ({
    stepId: "SalesExpressContractVanFSRFirstStep",
  }),
};
</script>

<style></style>
