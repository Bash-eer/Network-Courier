<template>
  <Stepper :stepId="stepId" :stepperData="quotationStepperItems" />
</template>

<script>
export default {
  name: "GeneralQuotationDialog",
  data: () => ({
    stepId: "QuotationAddAddress",
    quotationStepperItems: [
      {
        index: 0,
        label: "1",
        component: "QuotationAddAddress",
        name: "Add Address",
      },
      {
        index: 1,
        label: "2",
        component: "QuotationSelectMethod",
        name: "Select Method",
      },
      {
        index: 2,
        label: "3",
        component: "QuotationTripDetails",
        name: "Trip Details",
      },
      {
        index: 3,
        label: "4",
        component: "QuotationCostingDetails",
        name: "Costing Details",
      },
      {
        index: 4,
        label: "5",
        component: "QutationContractOrSendQuotations",
        name: "Contract | Send Quotations",
      },
    ],
  }),
  unmounted() {
    // this.$store.dispatch("sales/loadQuotationApi", {
    //   id: this.$store.state.sales.salesCompanyid,
    // });
  },
  created() {
    this.$store.dispatch("masters/loadRegionsDropDown");
    this.$store.state.sales.quotationCreationFormData = {};
    this.$store.state.sales.stepperNavigation = null;
    this.$store.state.masters.expressRegionsTripTableData = null;
  },
};
</script>

<style>
.required {
  color: #7a7a7a;
}
.required:after {
  content: "*";
  color: red;
}
</style>
