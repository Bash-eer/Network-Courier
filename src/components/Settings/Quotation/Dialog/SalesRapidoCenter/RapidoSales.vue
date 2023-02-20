<template>
  <div>
    <SalesProjectjobStepper
      :stepId="stepId"
      :stepperData="$store.state.quotation.addSalesRapidocenterstepperData"
    />
  </div>
</template>
<script>
import SalesProjectjobStepper from "../../Stepper.vue";
export default {
  components: { SalesProjectjobStepper },
  data: () => ({
    stepId: "RapidoCostCenter",
  }),
};
</script>
<style>
</style>