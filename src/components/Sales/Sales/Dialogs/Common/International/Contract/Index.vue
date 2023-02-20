<template>
  <div>
    <StepperRoute
      :activeLabel="getCurrentStep"
      :stepperData="
        $store.state.salesQuotationDialog.InternationalContractStepperData
      "
    />
    <div>
      <FirstStep
        :style="{
          display:
            currentStep === 'SalesInternationalContractFirstStep'
              ? 'block'
              : 'none',
        }"
      />
      <SecondStep
        :style="{
          display:
            currentStep === 'SalesInternationalContractSecondStep'
              ? 'block'
              : 'none',
        }"
      />
      <ThirdStep
        :style="{
          display:
            currentStep === 'SalesInternationalContractThirdStep'
              ? 'block'
              : 'none',
        }"
      />
      <FourthStep
        :style="{
          display:
            currentStep === 'SalesInternationalContractFourthStep'
              ? 'block'
              : 'none',
        }"
      />
      <FifthStep
        :style="{
          display:
            currentStep === 'SalesInternationalContractFifthStep'
              ? 'block'
              : 'none',
        }"
      />
    </div>
  </div>
</template>
<script>
// import Stepper from "../../Stepper.vue";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";
import FifthStep from "./FifthStep";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    // Stepper,
    FirstStep,
    SecondStep,
    ThirdStep,
    FourthStep,
    FifthStep,
  },
  computed: {
    ...mapGetters({
      getCurrentStep: "salesInternationalContract/currentStep",
    }),
  },
  data: () => ({
    currentStep: null,
    stepId: "",
  }),
  methods: {
    ...mapActions({
      resetDialogData: "salesInternationalContract/resetDialogData",
      setCurrentStep: "salesInternationalContract/setCurrentStep",
    }),
    getStepId(id) {
      this.setCurrentStep(parseInt(id));
      // if (this.quotationData) this.setRapidoContractStepNum(parseInt(id));
    },
  },
  watch: {
    getCurrentStep(value) {
      if (this.getCurrentStep > 5) return;
      this.currentStep =
        this.$store.state.salesQuotationDialog.InternationalContractStepperData[
          value - 1
        ].component;
    },
    "$store.state.salesInternationalContract.StepperIdData": function () {
      this.stepId = this.$store.state.salesInternationalContract.StepperIdData;
    },
  },
  unmounted() {
    this.resetDialogData();
    this.$store.state.salesInternationalContract.InternationalRowData.id = null;
  },
  mounted() {
    this.$store.dispatch("salesInternationalContract/getProfileCreationData", {
      path: "/sales/profiles/" + this.$route.params.id,
    });
  },

  async created() {
    this.currentStep =
      this.$store.state.salesQuotationDialog.InternationalContractStepperData[
        this.getCurrentStep - 1
      ].component;
    this.stepId = this.$store.state.salesInternationalContract.StepperIdData;
    await this.$store.dispatch(
      "salesInternationalContract/getProfileCreationData",
      {
        path: "/sales/profiles/" + this.$route.params.id,
      }
    );
    // this.$store.dispatch("salesInternationalContract/loadDropdown", {
    //   path: "/settings/sales/rates/international/outbound/service-provider/rate-cards",
    // });
    this.$store.dispatch("salesInternationalContract/loadFestivalDropdown", {
      path: "/settings/salesSettinigs/others/festival/dropdown",
    });
    this.$store.dispatch("salesInternationalContract/loadCompetitorDropdown", {
      path: "/settings/salesSettinigs/others/competitor/dropdown",
    });
    this.$store.dispatch("salesInternationalContract/loadReferenceDropdown", {
      path: "/settings/salesSettinigs/others/reference/dropdown",
    });
  },
};
</script>
<style></style>
