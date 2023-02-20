<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-10">
      <h5 class="dialog-label-text required">Rate Card Name</h5>
      <TextField
        type="text"
        v-model="$store.state.rapidoAdhoc.rapidoAdhocAddNewRateCardName"
        :classes="{
          'inputfield w-full dialog-field-text': true,
        }"
      />
      <span class="red region-error-text">{{
        $store.state.rapidoAdhoc.addRateCardNameError
      }}</span>
    </div>
    <div class="field col-12 md:col-2 mt-5">
      <Buttons
        icon="pi pi-download"
        label="Import"
        button_class=" p-button-outlined dialog-button-text"
      />
    </div>
  </div>
  <div class="flex flex-row justify-content-end align-items-center mx-5">
    <input
      type="checkbox"
      id="isDefault"
      name="isDefault"
      value=""
      v-model="$store.state.rapidoAdhoc.rapidoAdhocAddNewIsDefault"
      class="mr-1"
    />
    <label for="isDefault" class="text-sm color-4e5968">
      Set as default Rate Card</label
    ><br />
  </div>
  <div>
    <RapidoStepper :stepId="stepId" :stepperData="stepperData" />
  </div>
</template>

<script>
import RapidoStepper from "../Stepper.vue";

//data imports
import { addRatesStepperData } from "../../const/const";
import { mapGetters } from "vuex";
export default {
  components: {
    RapidoStepper,
  },
  data: () => ({
    stepId: "AddZone",
    isDefault: null,

    stepperData: addRatesStepperData,
  }),
  methods: {
    getEditTableData() {
      let id = this.$store.state.rapidoAdhoc.EditedRateCardData?.id;
      this.$store.dispatch("rapidoAdhoc/loadEditAdhocTableData", {
        path: "/settings/sales/rates/rapido/adhoc/ratecard/" + id,
        mutation: "fetchAdhocEditTableData",
      });
      return;
    },
  },
  unmounted() {
    this.$store.dispatch("rapidoAdhoc/setAddRateCardName", {
      data: null,
    });
    this.$store.dispatch("rapidoAdhoc/setZonalRates", {
      type: null,
    });
    this.$store.dispatch("rapidoAdhoc/setNormalRatesTransport", {
      type: null,
    });
    this.$store.dispatch("rapidoAdhoc/setECommerceRatesTransport", {
      type: null,
    });

    this.$store.dispatch("rapidoAdhoc/navigateStepper", {
      step: null,
    });
    this.$store.dispatch("rapidoAdhoc/setAddZonalRatesValidation", {
      bool: false,
    });
    this.$store.dispatch("rapidoAdhoc/setAddZonalRatesSubmission", {
      bool: false,
    });
  },
  watch: {
    rapidoAdhocEditTableData() {
      this.$store.state.rapidoAdhoc.rapidoAdhocAddNewRateCardName =
        this.rapidoAdhocEditTableData.rate_card_name;
    },
    "$store.state.rapidoAdhoc.rapidoAdhocAddNewRateCardName": function () {
      if (this.$store.state.rapidoAdhoc.rapidoAdhocAddNewRateCardName != null) {
        this.$store.dispatch("rapidoAdhoc/setRateCardNameError", {
          error: null,
        });
      }
    },
  },
  computed: {
    ...mapGetters({
      rapidoAdhocEditTableData: "rapidoAdhoc/rapidoAdhocEditTableData",
    }),
  },
  async created() {
    if (this.$store.state.rapidoAdhoc.EditedRateCardData?.id) {
      await this.getEditTableData();
    }
  },
};
</script>

<style></style>
