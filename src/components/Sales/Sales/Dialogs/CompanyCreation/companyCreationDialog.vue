<template>
  <CompanyCreationStepper :stepId="stepId" :stepperData="stepperData" />
</template>

<script>
import CompanyCreationStepper from "../../Stepper.vue";
import { companyCreationStepperData } from "../../../Const.js";
export default {
  name: "companyCreationDialog",
  components: { CompanyCreationStepper },
  data: () => ({
    stepId: "Information",
    stepperData: companyCreationStepperData,
  }),
  unmounted() {
    this.$store.state["salesSales"].companyCreationStateData = {};
    this.$store.state.fleets.globalImageUploadURL = null;
    // console.log("unmounted");
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
.p-steps-number {
  color: #ffffff !important;
  font-weight: 400 !important;
  font-size: 14px !important;
}
</style>
