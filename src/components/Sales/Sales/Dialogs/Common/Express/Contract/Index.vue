<template>
  <div :key="renderKey">
    <Stepper
      :key="renderKey"
      :stepId="stepId"
      :stepperData="
        $store.state.salesExpressContract.ExpressContractFlowStepperData
      "
    />
  </div>
</template>

<script>
import Stepper from "./Stepper.vue";
import { mapActions } from "vuex";
import {
  expressContract,
} from "../../../../../../../store/helper";
export default {
  components: { Stepper },
  data: () => ({
    stepId: "SalesExpressContractFirstStep",
    renderKey: 1,
  }),
  watch: {
    "$store.state.salesSales.displayDialog": function () {
      if (!this.$store.state["salesSales"].displayDialog) {
        this.clearQuotationData();
        this.clearExpressContractData();
      }
    },
    "$store.state.salesExpressContract.ExpressContractFlowStepperData":
      function () {},
  },
  methods: {
    ...expressContract,
    ...mapActions({
      clearQuotationData: "salesExpressContract/clearQuotationData",
    }),
  },
};
</script>

<style></style>