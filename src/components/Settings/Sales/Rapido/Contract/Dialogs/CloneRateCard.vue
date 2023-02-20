<template>
  <!--disabled fields-->

  <div class="formgrid grid">
    <div class="field col-12">
      <h5 class="dialog-label-text">Rate Card Name</h5>
      <TextField
        :disabled="true"
        v-model="
          $store.state.rapidoContract.Type1Type2CloneRateCardData
            .cloneRateCardRateCardName
        "
        type="text"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <!--image-->
  <div class="flex w-100 align-items-center justify-content-center">
    <img src="/images/down-arrow-vector.png" alt="down_arrow" />
  </div>
  <!--clones fields-->

  <div class="formgrid grid">
    <div class="field col-12">
      <h5 class="required dialog-label-text">Cloned Rate Card Name</h5>
      <TextField
        :disabled="false"
        v-model="details.cloned_rate_card_name"
        type="text"
        :classes="{
          'p-invalid': v$.details.cloned_rate_card_name.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <!--footer-->
  <br />
  <div class="flex align-self-center justify-content-end">
    <CancelButton storePath="rapidoContract" />
    <Buttons
      label="Save"
      button_class="dialog-button-text"
      v-on:childToParent="submitData"
    />
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
//import Dropdown from 'primevue/dropdown';
export default {
  data: () => ({
    v$: useVuelidate(),
    submitted: false,
    details: {
      cloned_rate_card_name: "",
    },
  }),
  validations() {
    return {
      details: {
        cloned_rate_card_name: { required },
      },
    };
  },
  methods: {
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let processedData =
          this.$store.state.rapidoContract.Type1Type2CloneRateCardData;

        if (processedData.rapidoContractType == "Type1") {
          this.cloneApiCallHandler("typeone", "TypeOne", processedData);
        } else {
          this.cloneApiCallHandler("typetwo", "TypeTwo", processedData);
        }
      }
    },
    cloneApiCallHandler(type, Type, processedData) {
      this.$store.dispatch("rapidoContract/POSTPATCHCRUDOPERATION", {
        path:
          "/settings/sales/rates/rapido/contract/ratecard/" + type + "s/clone",

        data: {
          target_rate_card_id: processedData.cloneRateCardRateCardId,
          rate_card_name: this.details.cloned_rate_card_name,
        },
        method: "POST",

        loadData: {
          loadApi: "loadrapidoContract" + Type + "Data",
          loadPath: "settings/sales/rates/rapido/contract/ratecard/" + type,
          loadMutation: "fetchRapidoContract" + Type + "Data",
        },
        toastData: {
          toastSuccessData: {
            toastMsg: `The rate card is cloned successfully!`,
            toastSeverity: "info",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in updating the data, try again!",
            toastSeverity: "error",
          },
        },
      });
    },
  },
};
</script>

<style></style>
