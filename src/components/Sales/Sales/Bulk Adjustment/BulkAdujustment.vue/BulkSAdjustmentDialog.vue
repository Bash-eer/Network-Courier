<template>
  <div class="style">
    <h5 class="flex justify-content-start ml-2 mb-5 mt-3">
      <span class="mr-3">
        <i
          class="pi pi-arrow-left cursor-pointer"
          @click="Back('SalesHome')"
        ></i>
      </span>
      New Bulk Adjustment
    </h5>
    <BulkAdjustmentStepper :stepId="stepId" :stepperData="stepperData" />
  </div>
  <!--toast-->
  <Toasts
    :severity="$store.state['bulkAdjustment'].toastData.severity"
    :summary="$store.state['bulkAdjustment'].toastData.summary"
  />
</template>

<script>
import Toasts from "./Toast.vue";
import BulkAdjustmentStepper from "./Stepper.vue";
import { BulkAdjustmentStepperData } from "../../../Const";
export default {
  name: "BulkAdjustmentDialog",
  components: { Toasts, BulkAdjustmentStepper },
  data: () => ({
    stepId: "Selectprofile",
    stepperData: BulkAdjustmentStepperData,
  }),
  methods: {
    Back(path) {
      this.$router.push({
        name: path,
      });
    },
  },
  unmounted() {
    this.$store.state["salesSales"].companyCreationStateData = {};
    this.$store.state.fleets.globalImageUploadURL = null;
    this.$store.state.salesSales.stepperNavigation = null;
  },
  created() {
    // this.$store.state["salesSales"].companyCreationStateData = {},
    // this.$store.state.sales.companyCreationFormData = {};
    // this.$store.state.sales.salesHomeDialogData = null;
    // this.$store.state.salesSales.stepperNavigation = null;
  },
};
</script>

<style>
.style {
  background-color: #ffffff;
  padding: 10px;
}
.p-steps-number {
  color: #ffffff !important;
  font-weight: 400 !important;
  font-size: 14px !important;
}
</style>
