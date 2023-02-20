<template>
  <div>
    <Stepper
      :stepId="stepId"
      :stepperData="
        $store.state.salesQuotationDialog.ExpressContractBikeStepperData
      "
    />
  </div>
</template>

<script>
import Stepper from "../../../Stepper.vue";

export default {
  components: { Stepper },
  data: () => ({
    stepId: "SalesExpressContractBikeFirstStep",
  }),
};
</script>

<style></style>
