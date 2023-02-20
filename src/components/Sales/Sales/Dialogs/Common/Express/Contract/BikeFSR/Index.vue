<template>
  <div>
    <!-- <Stepper
      :stepId="stepId"
      :stepperData="$store.state.salesQuotationDialog.ExpressContractBikeFSRStepperData"
    /> -->
    <StepperRoute
      :activeLabel="getCurrentStep"
      :stepperData="
        $store.state.salesQuotationDialog
          .ExpressContractBikeFSRStepperData
      "
    />
    <div :key="renderKey">
      <FirstStep
        :style="{
          display:
            currentStep === 'SalesExpressContractBikeFSRFirstStep'
              ? 'block'
              : 'none',
        }"
      />
      <SecondStep
        :style="{
          display:
            currentStep === 'SalesExpressContractBikeFSRSecondStep'
              ? 'block'
              : 'none',
        }"
      />
      <ThirdStep
        :style="{
          display:
            currentStep === 'SalesExpressContractBikeFSRThirdStep'
              ? 'block'
              : 'none',
        }"
      />
      <FourthStep
        :style="{
          display:
            currentStep === 'SalesExpressContractBikeFSRFourthStep'
              ? 'block'
              : 'none',
        }"
      />
      <FifthStep
        :style="{
          display:
            currentStep === 'SalesExpressContractBikeFSRFifthStep'
              ? 'block'
              : 'none',
        }"
      />
    </div>
  </div>
</template>

<script>
// import Stepper from "../../../Stepper.vue";
import { mapActions, mapGetters } from "vuex";
import FirstStep from "./FirstStep.vue";
import SecondStep from "./SecondStep.vue";
import ThirdStep from "./ThirdStep.vue";
import FourthStep from "./FourthStep.vue";
import FifthStep from "./FifthStep.vue";

export default {
  components: { FirstStep, SecondStep, ThirdStep, FourthStep, FifthStep },
  data: () => ({
    // stepId: "SalesExpressContractBikeFSRFirstStep",
    currentStep: null,
    renderKey: 10,
  }),
  computed: {
    ...mapGetters({
      getCurrentStep: "salesExpressContractBikeFSR/currentStep",
    }),
  },
  watch: {
    getCurrentStep(value) {
      if (this.getCurrentStep > 5) return;
      this.currentStep =
        this.$store.state.salesQuotationDialog.ExpressContractBikeFSRStepperData[
          value - 1
        ].component;
    },
  },
  methods: {
    ...mapActions({
      setQuotationData: "salesExpressContractBikeFSR/setQuotationData",
      resetDialogData: "salesExpressContractBikeFSR/resetDialogData",
    }),
  },
  async created() {
    this.currentStep =
      this.$store.state.salesQuotationDialog.ExpressContractBikeFSRStepperData[
        this.getCurrentStep - 1
      ].component;

  },
  unmounted() {
    this.resetDialogData();
  },
};
</script>

<style></style>
