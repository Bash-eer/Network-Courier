<template>
  <CostCenterStepper :stepId="stepId" :stepperData="costCentreStepperItems" />
</template>

<script>
import CostCenterStepper from "../../Stepper.vue";
import { sales_co } from "../../../../../../../store/helper";
export default {
  name: "CostCentresDialog",
  components: { CostCenterStepper },
  data: () => ({
    stepId: "CostCenterFirstStep",
    costCentreStepperItems: [
      {
        index: 0,
        label: "1",
        component: "CostCenterFirstStep",
        name: "Add Address",
      },
      {
        index: 1,
        label: "2",
        component: "CostCenterSecondStep",
        name: "Contact Person",
      },
      {
        index: 2,
        label: "3",
        component: "CostCenterThirdStep",
        name: "Trip Schedule",
      },
    ],
  }),
  computed: {
    ...sales_co,
  },
  watch: {
    "$store.state.salesSales.stepperNavigation": function () {
      if (
        this.costCentreStepperItems.length == 3 &&
        this.expressCCPostDialogData.site_office
      ) {
        this.costCentreStepperItems.push({
          index: 3,
          label: "4",
          component: "CostCenterFourthStep",
          name: "Site Charges",
        });
      } else if (!this.expressCCPostDialogData.site_office) {
        this.costCentreStepperItems = this.costCentreStepperItems.filter(
          (i) => i.component != "CostCenterFourthStep"
        );
      }
    },
  },
  unmounted() {
    // this.$store.dispatch("sales/loadCostCentres");
    this.$store.state["salesCommon"].commonExpressCCStateData = {};
  },
  created() {
    // this.$store.dispatch("masters/loadRegionsDropDown");
    this.$store.state.sales.costCenterFormData = {};
    this.$store.state.sales.stepperNavigation = null;
  },
};
</script>

<style></style>