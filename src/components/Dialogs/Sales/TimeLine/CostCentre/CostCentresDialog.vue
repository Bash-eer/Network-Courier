<template>
  <Stepper :stepId="stepId" :stepperData="costCentreStepperItems" />
</template>

<script>
export default {
  name: "CostCentresDialog",
  data: () => ({
    stepId: "CostCentresAddAddress",
    costCentreStepperItems: [
      {
        index: 0,
        label: "1",
        component: "CostCentresAddAddress",
        name: "Add Address",
      },
      {
        index: 1,
        label: "2",
        component: "CostCentresContactPerson",
        name: "Contact Person",
      },
      {
        index: 2,
        label: "3",
        component: "CostCentresTripSchedule",
        name: "Trip Schedule",
      },
      {
        index: 3,
        label: "4",
        component: "CostCentresSiteCharges",
        name: "Site Charges",
      },
    ],
  }),
  // unmounted() {
  //   this.$store.dispatch("sales/loadCostCentres");
  // },
  created() {
    this.$store.dispatch("masters/loadRegionsDropDown");
    this.$store.state.sales.costCenterFormData = {};
    this.$store.state.sales.stepperNavigation = null;
  },
};
</script>

<style></style>
