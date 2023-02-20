<template>
  <div>
     <Stepper
      :stepId="stepId"
      :stepperData="
        $store.state.salesQuotationDialog.ExpressContractInterCompanyChargesStepperData
      "
    />
  </div>
</template>

<script>
import Stepper from "../../../Stepper.vue";

export default {
  components: { Stepper },
  data: () => ({
    stepId: "SalesExpressContractInterChargesFirstStep",
  }),
};
</script>

<style>
</style>