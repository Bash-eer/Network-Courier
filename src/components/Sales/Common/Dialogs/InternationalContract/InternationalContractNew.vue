<template>
  <div>
    <SelectMethodInternationalCenterStepper
      :stepId="stepId"
      :stepperData="$store.state.quotation.SalesInternationalCenterstepperData"
    />
  </div>
</template>
<script>
import SelectMethodInternationalCenterStepper from "../../Stepper.vue";
export default {
  components: { SelectMethodInternationalCenterStepper },
  data: () => ({
    stepId: "AddAddressInternationalCenter",
  }),
};
</script>
<style>
</style>