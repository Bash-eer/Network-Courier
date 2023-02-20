<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text required">Additional Rate Name</h5>
      <TextField
        v-model="details.surcharge_name"
        type="text"
        :classes="{
          'p-invalid': v$.details.surcharge_name.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text required">Rate (S$)</h5>
      <TextField
        v-model="details.rates"
        type="text"
        :classes="{
          'p-invalid': v$.details.rates.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
  </div>
  <div class="mt-5">
    <div
      class="
        flex
        justify-content-between
        w-full
        align-content-start
        py-3
        flex-wrap
      "
    >
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton storePath="rapidoAdhoc" />
        <Buttons
          label="Save"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";
export default {
  data: () => ({
    name: "AddAdditionalSurcharges",
    v$: useVuelidate(),
    submitted: false,
    details: {
      surcharge_name: "",
      rates: "",
    },
  }),
  validations() {
    return {
      details: {
        surcharge_name: {required},
        rates: {required},
      },
    };
  },
  methods: {
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let StateData =
          this.$store.state.rapidoAdhoc.addAdditionalSurchargeData;
        if (StateData?.id) {
          this.$store.dispatch("rapidoAdhoc/POSTPATCHCRUDOPERATION", {
            path:
              "settings/sales/rates/rapido/adhoc/ratecard/addtional/surcharges/" +
              StateData.id,
            data: this.details,
            method: "PATCH",
            triggered: true,

            toastData: {
              toastSuccessData: {
                toastMsg: `The additional surcharge is updated!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in updating the additional surcharge, try again!",
                toastSeverity: "error",
              },
            },
          });
        } else {
          let charges_id =
            this.$store.state.rapidoAdhoc
              .RapidoAdhocAdditionalSurchargesTableData[0].charges_id;
          this.$store.dispatch("rapidoAdhoc/POSTPATCHCRUDOPERATION", {
            path: "settings/sales/rates/rapido/adhoc/ratecard/addtional/surcharges",
            data: {
              ...this.details,
              charges_id,
            },

            method: "POST",
            triggered: true,

            toastData: {
              toastSuccessData: {
                toastMsg: `The Additional surcharge is added!`,
                toastSeverity: "success",
              },
              toastDuplicateErrorData: {
                toastMsg: `The data is already exists !`,
                toastSeverity: "error",
              },
              toastCommonErrorData: {
                toastMsg:
                  "There was an error in adding the additional surcharges, try again!",
                toastSeverity: "error",
              },
            },
          });
        }
      }
    },
    loadState() {
      for (let state in this.details) {
        this.details[state] =
          this.$store.state.rapidoAdhoc.rapidoAdhocRateCardZoneAdditionalSurchargeTableData[
            state
          ];
      }
    },
  },
  created() {
    if (this.$store.state.rapidoAdhoc.addAdditionalSurchargeData) {
      for (let d in this.details) {
        this.details[d] =
          this.$store.state.rapidoAdhoc.addAdditionalSurchargeData[d];
      }
    }
  },
  unmounted() {
    this.$store.state.rapidoAdhoc.addAdditionalSurchargeData = {};
  },
};
</script>

<style scoped></style>
