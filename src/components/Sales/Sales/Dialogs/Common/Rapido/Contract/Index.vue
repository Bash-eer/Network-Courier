
<template>
  <div>
    <StepperRoute
      @stepId="getStepId"
      :activeLabel="rapidoContractStep"
      :stepperData="$store.state.salesQuotationDialog.RapidoContractStepperData"
    />
    <!-- <keep-alive>
      <component :is="currentStep" />
    </keep-alive> -->
    <div :key="renderKey">
      <SalesRapidoContractFirstStep
        :style="{
          display:
            currentStep === 'SalesRapidoContractFirstStep' ? 'block' : 'none',
        }"
      />
      <SalesRapidoContractSecondStep
        :style="{
          display:
            currentStep === 'SalesRapidoContractSecondStep' ? 'block' : 'none',
        }"
      />
      <SalesRapidoContractThirdStep
        :style="{
          display:
            currentStep === 'SalesRapidoContractThirdStep' ? 'block' : 'none',
        }"
      />
      <SalesRapidoContractFourthStep
        :style="{
          display:
            currentStep === 'SalesRapidoContractFourthStep' ? 'block' : 'none',
        }"
      />
      <SalesRapidoContractFifthStep
        :style="{
          display:
            currentStep === 'SalesRapidoContractFifthStep' ? 'block' : 'none',
        }"
      />
    </div>
  </div>
</template>
<script>
// import Stepper from "../../Stepper.vue";
import SalesRapidoContractFirstStep from "./FirstStep.vue";
import SalesRapidoContractSecondStep from "./SecondStep.vue";
import SalesRapidoContractThirdStep from "./ThirdStep.vue";
import SalesRapidoContractFourthStep from "./FourthStep.vue";
import SalesRapidoContractFifthStep from "./FifthStep.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    // Stepper,
    SalesRapidoContractFirstStep,
    SalesRapidoContractSecondStep,
    SalesRapidoContractFourthStep,
    SalesRapidoContractThirdStep,
    SalesRapidoContractFifthStep,
  },
  data: () => ({
    currentStep: null,
    renderKey: 10,
  }),
  watch: {
    "$store.state.salesSales.displayDialog": function () {
      if (!this.$store.state["salesSales"].displayDialog) {
        this.clearQuotationData();
      }
    },
    rapidoContractStep(value) {
      if (this.rapidoContractStep > 5) return;
      this.currentStep =
        this.$store.state.salesQuotationDialog.RapidoContractStepperData[
          value - 1
        ].component;
    },
  },
  computed: {
    ...mapGetters({
      rapidoContractStep: "salesQuotationDialog/rapidoContractStep",
      quotationData: "salesRapidoContract/Contract/quotationData",
    }),
  },
  methods: {
    ...mapActions({
      setQuotationData: "salesRapidoContract/Contract/setQuotationData",
      clearQuotationData: "salesRapidoContract/Contract/clearQuotationData",
      setRapidoContractStepNum: "salesQuotationDialog/setRapidoContractStepNum",
    }),
    getStepId(id) {
      this.setRapidoContractStepNum(parseInt(id));
      // if (this.quotationData) this.setRapidoContractStepNum(parseInt(id));
    },
  },
  async created() {
    this.currentStep =
      this.$store.state.salesQuotationDialog.RapidoContractStepperData[
        this.rapidoContractStep - 1
      ].component;

    // await this.setQuotationData();

    // this.renderKey++;
  },
};
</script>
<style>
</style>