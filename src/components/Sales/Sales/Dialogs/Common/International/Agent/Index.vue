<template>
  <div :key="renderKey">
    <Stepper
      :key="renderKey"
      :stepId="stepId"
      :stepperData="
        $store.state.salesInternationalAgent.InternationalAgentStepperData
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
    stepId: "SalesInternationalAgentFirstStep",
    renderKey: 1,
  }),
  watch: {
    "$store.state.salesSales.displayDialog": function () {
      if (!this.$store.state["salesSales"].displayDialog) {
        this.clearQuotationData();
      }
      this.renderKey++;
    },
    // rapidoContractStep(value) {
    //   if (this.rapidoContractStep > 5) return;
    //   this.currentStep =
    //     this.$store.state.salesQuotationDialog.RapidoContractStepperData[
    //       value - 1
    //     ].component;
    // },
  },

  methods: {
    ...mapActions({
      clearQuotationData: "salesInternationalAgent/clearQuotationData",
    }),
  },
};
</script>

<style></style>