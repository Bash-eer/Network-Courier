<template>
  <div>
    <SalesProjectjobStepper
      :stepId="stepId"
      :stepperData="$store.state.quotation.addSalesInternationalAgentStepperData"
    />
  </div>
</template>

<script>
import SalesProjectjobStepper from "../../Stepper.vue";

export default {
  components: {SalesProjectjobStepper},
  data: () => ({
    stepId: "AddProfileDialog",
  }),
};
</script>

<style></style>
