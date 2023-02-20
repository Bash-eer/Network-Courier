<template>
  <Stepper :stepId="stepId" :stepperData="companyStepperItems" />
</template>

<script>
export default {
  name: "companyCreationDialog",
  data: () => ({
    stepId: "Information",
    companyStepperItems: [
      {
        index: 0,
        label: "1",
        component: "Information",
        name: "Information",
      },
      {
        index: 1,
        label: "2",
        component: "Address",
        name: "Address",
      },
      {
        index: 2,
        label: "3",
        component: "Contact",
        name: "Contact",
      },
    ],
  }),
  created() {
    this.$store.state.sales.companyCreationFormData = {};
    this.$store.state.sales.salesHomeDialogData = null;
    this.$store.state.sales.stepperNavigation = null;
    this.$store.state.fleets.globalImageUploadURL = null;
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
