<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text required">COD Fee ($)</h5>
      <TextField
        v-model="details.cod_fee"
        type="text"
        :classes="{
          'p-invalid': v$.details.cod_fee.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text required">COD Fee (% of cash collected)</h5>
      <TextField
        v-model="details.cod_fee_percentage"
        type="text"
        :classes="{
          'p-invalid': v$.details.cod_fee_percentage.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text required">Standard Liability ($)</h5>
      <TextField
        v-model="details.standard_liability"
        type="text"
        :classes="{
          'p-invalid': v$.details.standard_liability.$invalid && submitted,
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
        <CancelButton storePath="expressAdhoc" />
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
      cod_fee: "",
      cod_fee_percentage: "",
      standard_liability: "",
    },
  }),
  validations() {
    return {
      details: {
        cod_fee: {required},
        cod_fee_percentage: {required},
        standard_liability: {required},
      },
    };
  },
  methods: {
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let StateData = this.$store.state.expressAdhoc.addSurchargeData;
        this.$store.dispatch("expressAdhoc/POSTPATCHCRUDOPERATION", {
          path:
            "settings/sales/rates/express/adhoc/ratecard/surcharges/" +
            StateData.id,
          data: this.details,
          triggered: true,
          method: "PATCH",
          toastData: {
            toastSuccessData: {
              toastMsg: `The surcharge is updated!`,
              toastSeverity: "success",
            },
            toastDuplicateErrorData: {
              toastMsg: `The data is already exists !`,
              toastSeverity: "error",
            },
            toastCommonErrorData: {
              toastMsg:
                "There was an error in updating the surcharge, try again!",
              toastSeverity: "error",
            },
          },
        });
      }
    },
  },
  unmounted() {
    this.$store.state.expressAdhoc.addSurchargeData = {};
  },
  created() {
    for (let d in this.details) {
      this.details[d] = this.$store.state.expressAdhoc.addSurchargeData[d];
    }
  },
};
</script>

<style scoped></style>
