<template>
  <div :key="renderKey">
    <Stepper
    :key="renderKey"
      :stepId="stepId"
      :stepperData="
        $store.state.salesExpressContractVan.ExpressContractVanStepperData
      "
    />
  </div>
</template>

<script>
import Stepper from "./Stepper.vue";
import { mapActions } from "vuex";
export default {
  components: { Stepper },
  data: () => ({
    stepId: "SalesExpressContractVanFirstStep",
    renderKey:1,
  }),
   watch: {
    "$store.state.salesSales.displayDialog": function () {
      if (!this.$store.state["salesSales"].displayDialog) {
        this.clearQuotationData();
      }
    },
    "$store.state.salesExpressContractVan.ExpressContractVanStepperData": function(){
this.renderKey++
    }
  },
   methods: {
    ...mapActions({
      clearQuotationData: "salesExpressContractVan/clearQuotationData",
    }),
  },
};
</script>

<style></style>
