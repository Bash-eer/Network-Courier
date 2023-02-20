<template>
  <div>
    <!-- <Stepper
      :stepId="stepId"
      :stepperData="
        $store.state.salesQuotationDialog
          .ExpressContractProjectJobBikeStepperData
      "
    /> -->
    <StepperRoute
      :activeLabel="getCurrentStep"
      :stepperData="
        $store.state.salesQuotationDialog
          .ExpressContractProjectJobBikeStepperData
      "
    />
    <div :key="renderKey">
      <FirstStep
        :style="{
          display:
            currentStep === 'SalesExpressContractBikeProjectJobsFirstStep'
              ? 'block'
              : 'none',
        }"
      />
      <SecondStep
        :style="{
          display:
            currentStep === 'SalesExpressContractBikeProjectJobsSecondStep'
              ? 'block'
              : 'none',
        }"
      />
      <ThirdStep
        :style="{
          display:
            currentStep === 'SalesExpressContractBikeProjectJobsThirdStep'
              ? 'block'
              : 'none',
        }"
      />
      <FourthStep
        :style="{
          display:
            currentStep === 'SalesExpressContractBikeProjectJobsFourthStep'
              ? 'block'
              : 'none',
        }"
      />
      <FifthStep
        :style="{
          display:
            currentStep === 'SalesExpressContractBikeProjectJobsFifthStep'
              ? 'block'
              : 'none',
        }"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FirstStep from "./FirstStep.vue";
import SecondStep from "./SecondStep.vue";
import ThirdStep from "./ThirdStep.vue";
import FourthStep from "./FourthStep.vue";
import FifthStep from "./FifthStep.vue";

export default {
  components: { FirstStep, SecondStep, ThirdStep, FourthStep, FifthStep },
  data: () => ({
    currentStep: null,
    renderKey: 10,
  }),
  computed: {
    ...mapGetters({
      getCurrentStep: "salesExpressContractBikeProjectJobs/currentStep",
    }),
  },
  watch: {
    getCurrentStep(value) {
      if (this.getCurrentStep > 5) return;
      this.currentStep =
        this.$store.state.salesQuotationDialog.ExpressContractProjectJobBikeStepperData[
          value - 1
        ].component;
    },
  },
  methods: {
    ...mapActions({
      setQuotationData: "salesExpressContractBikeProjectJobs/setQuotationData",
      resetDialogData: "salesExpressContractBikeProjectJobs/resetDialogData",
    }),
  },
  async created() {
    this.currentStep =
      this.$store.state.salesQuotationDialog.ExpressContractProjectJobBikeStepperData[
        this.getCurrentStep - 1
      ].component;

    // await this.setQuotationData("1357");

    // this.renderKey++;
  },
  unmounted() {
    this.resetDialogData();
  },
};
</script>

<style></style>
