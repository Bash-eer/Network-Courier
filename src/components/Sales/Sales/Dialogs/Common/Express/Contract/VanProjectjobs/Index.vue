<template>
  <div>
    <Stepper
      :stepId="stepId"
      :stepperData="$store.state.salesQuotationDialog.ExpressContractProjectJobVanStepperData"
    />
  </div>
</template>

<script>
import Stepper from "../../../Stepper.vue";

export default {
  components: { Stepper },
  data: () => ({
    stepId: "SalesExpressContractVanProjectJobsFirstStep",
  }),
};
</script>

<style>
</style>