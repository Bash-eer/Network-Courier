<template>
  <h5 class="required color-7a7a7a font-size-14 bold-500">Rate Card Name</h5>
  <div class="formgrid grid">
    <div class="field col-10">
      <TextField
        v-model="$store.state.expressAdhoc.expressAdhocAddNewRateCardName"
        type="text"
      />
      <span class="red region-error-text">{{
        $store.state.expressAdhoc.addRateCardNameError
      }}</span>
    </div>
    <div class="col-2">
      <Buttons
        label="Import"
        icon="pi pi-download"
        v-on:childToParent="closeDialog"
        class="
          p-button-outlined
          mr-1
          dialog-button-text
          cancel-style
          color-357dea
        "
      />
    </div>
  </div>
  <div class="flex flex-row justify-content-end align-items-center mx-5">
    <input
      type="checkbox"
      id="isDefault"
      name="isDefault"
      value=""
      v-model="$store.state.expressAdhoc.expressAdhocAddNewIsDefault"
      class="mr-1"
    />
    <label for="isDefault" class="color-4e5968 font-size-12 bold-600">
      Set as default Rate Card</label
    ><br />
  </div>
  <div class="m-3">
    <ExpressAdhocStepper :stepId="stepId" :stepperData="stepperData" />
  </div>
</template>

<script>
import ExpressAdhocStepper from "../../Stepper.vue";

//data imports
import { addRatesStepperData } from "../../Const/const.js";
export default {
  components: {
    ExpressAdhocStepper,
  },
  data: () => ({
    // zone_range: "",
    isDefault: null,
    stepId: "AddZone",
    stepperData: addRatesStepperData,
  }),

  unmounted() {
    this.$store.dispatch("expressAdhoc/setZonalRates", {
      type: null,
    });
    this.$store.dispatch("expressAdhoc/setNormalRatesTransport", {
      type: null,
    });
    this.$store.dispatch("expressAdhoc/setECommerceRatesTransport", {
      type: null,
    });

    this.$store.dispatch("expressAdhoc/navigateStepper", {
      step: null,
    });
    this.$store.dispatch("expressAdhoc/setAddZonalRatesValidation", {
      bool: false,
    });
    this.$store.dispatch("expressAdhoc/setAddZonalRatesSubmission", {
      bool: false,
    });
    this.$store.state.expressAdhoc.expressAdhocAddNewRateCardName = "";
  },
  watch: {
    "$store.state.expressAdhoc.expressAdhocAddNewRateCardName": function () {
      if (
        this.$store.state.expressAdhoc.expressAdhocAddNewRateCardName != null
      ) {
        this.$store.dispatch("expressAdhoc/setRateCardNameError", {
          error: null,
        });
      }
    },
  },
};
</script>

<style scoped>
::v-deep .stepNames {
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #4e5868;
}
</style>
