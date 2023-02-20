<!-- <template>
  <div>
     <SalesProjectjobStepper
      :stepId="stepId"
      :stepperData="$store.state.salesExpressContractFSR.addSalesFSRStepperData"
    /> 
  </div>
  <Toasts
    :severity="$store.state['salesExpressContractFSR'].toastData.severity"
    :summary="$store.state['salesExpressContractFSR'].toastData.summary"
  />
</template>

<script>
import SalesProjectjobStepper from "../../../Stepper.vue";
import Toasts from "./Toast.vue";
export default {
  components: { SalesProjectjobStepper, Toasts },
  data: () => ({
    stepId: "FSRQuotationDialog",
  }),
};
</script>

<style></style> -->

<template>
  <div>
    <SalesProjectjobStepper
      :stepId="stepId"
      :stepperData="$store.state.salesExpressContractFSR.addSalesFSRStepperData"
    />
  </div>
  <Toasts
    :severity="$store.state['salesExpressContractFSR'].toastData.severity"
    :summary="$store.state['salesExpressContractFSR'].toastData.summary"
  />
</template>

<script>
import SalesProjectjobStepper from "../../../Stepper.vue";
import Toasts from "./Toast.vue";
export default {
  components: { SalesProjectjobStepper, Toasts },
  data: () => ({
    stepId: "FSRQuotationDialog",
  }),
};
</script>

<style></style>
