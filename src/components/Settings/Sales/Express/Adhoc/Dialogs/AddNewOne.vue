<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text required">Min Charge per Job ($)</h5>
      <TextField
        v-model="details.min_charge_per_job"
        type="text"
        :classes="{
          'p-invalid': v$.details.min_charge_per_job.$invalid && submitted,
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
import { required } from "@vuelidate/validators";
export default {
  data: () => ({
    name: "AddAdditionalSurcharges",
    v$: useVuelidate(),
    submitted: false,
    details: {
      min_charge_per_job: "",
    },
  }),
  validations() {
    return {
      details: {
        min_charge_per_job: { required },
      },
    };
  },
  methods: {
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let StateData = this.$store.state.expressAdhoc.editNormalBikeData;
        this.$store.dispatch("expressAdhoc/POSTPATCHCRUDOPERATION", {
          path:
            "settings/sales/rates/express/adhoc/ratecard/normal/bike/" +
            StateData.id,
          data: this.details,
          method: "PATCH",
          triggered: true,
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
  created() {
    this.details.min_charge_per_job =
      this.$store.state.expressAdhoc.editNormalBikeData.min_charge_per_job;
  },
};
</script>

<style scoped></style>
