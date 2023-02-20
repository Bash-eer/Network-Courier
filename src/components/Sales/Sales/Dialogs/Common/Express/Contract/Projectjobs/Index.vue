<template>
  <div>
    <Stepper
      :stepId="stepId"
      :stepperData="$store.state.salesQuotationDialog.ExpressContractProjectjobsStepperData"
    />
  </div>
</template>

<script>
import Stepper from "../../../Stepper.vue";

export default {
  components: { Stepper },
  data: () => ({
    stepId: "SalesExpressContractProjectjobsFirstStep",
  }),
};
</script>

<style>
</style>