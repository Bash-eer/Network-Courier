<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text required">Van Job Min. Cost $</h5>
      <TextField
        v-model="details.van_job_min_cost"
        type="text"
        :classes="{
          'p-invalid': v$.details.van_job_min_cost.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text required">Maximum Weight (Kg)</h5>
      <TextField
        v-model="details.maximun_weight"
        type="text"
        :classes="{
          'p-invalid': v$.details.maximun_weight.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text required">Van Job Add. Cost $</h5>
      <TextField
        v-model="details.van_job_additional_cost"
        type="text"
        :classes="{
          'p-invalid': v$.details.van_job_additional_cost.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text required">Van Job Add. Weight (Kg)</h5>
      <TextField
        v-model="details.van_job_additional_weight"
        type="text"
        :classes="{
          'p-invalid':
            v$.details.van_job_additional_weight.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
  </div>

  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text required">Van Job Urgent Surcharge $</h5>
      <TextField
        v-model="details.van_job_urgent_surcharges"
        type="text"
        :classes="{
          'p-invalid':
            v$.details.van_job_urgent_surcharges.$invalid && submitted,
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
      maximun_weight: "",
      van_job_additional_cost: "",
      van_job_additional_weight: "",
      van_job_min_cost: "",
      van_job_urgent_surcharges: "",
    },
  }),
  validations() {
    return {
      details: {
        maximun_weight: { required },
        van_job_additional_cost: { required },
        van_job_additional_weight: { required },
        van_job_min_cost: { required },
        van_job_urgent_surcharges: { required },
      },
    };
  },
  methods: {
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let StateData = this.$store.state.expressAdhoc.editNormalVanData;
        this.$store.dispatch("expressAdhoc/POSTPATCHCRUDOPERATION", {
          path:
            "settings/sales/rates/express/adhoc/ratecard/normal/van/" +
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
    for (let d in this.details) {
      this.details[d] = this.$store.state.expressAdhoc.editNormalVanData[d];
    }
  },
};
</script>

<style scoped></style>
