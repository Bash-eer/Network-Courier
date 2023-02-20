<template>
  <br />
  <div class="field col-12 md:col-12">
    <p class="txt mt-4">Trip Plan</p>
  </div>
  <div class="formgrid ml-3">
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">No.of Units</h5>
        <TextField
          label="no_of_units"
          type="number"
          v-model="details.no_of_units"
          :classes="{
            'p-invalid': v$.details.no_of_units.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">jobs $</h5>
        <TextField
          label="jobs"
          type="number"
          v-model="details.jobs"
          :classes="{
            'p-invalid': v$.details.jobs.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Amount</h5>
        <TextField
          label="amount"
          type="number"
          v-model="details.amount"
          :classes="{
            'p-invalid': v$.details.amount.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
  </div>

  <div class="formgrid ml-3">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Additional Job $</h5>
      <TextField
        label="additional_jobs"
        type="number"
        v-model="details.additional_jobs"
        :classes="{
          'p-invalid': v$.details.additional_jobs.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div
    class="
      flex
      justify-content-between
      w-full
      align-content-center
      py-3
      flex-wrap
    "
  >
    <div class="align-self-center flex ml-2">
      <Buttons
        label="Previous"
        v-on:childToParent="goBackHandler"
        class="p-button-outlined mr-1 dialog-button-text previous-btn"
      />
    </div>
    <div class="flex align-self-center justify-content-end">
  <CancelButton storePath="salesQuotationDialog" />

      <Buttons
        label="Next"
        button_class="dialog-button-text"
        v-on:childToParent="nextStepHandler"
      />
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "SalesExpressContractProjectjobsFourthStep",
  data: () => ({
    v$: useVuelidate(),
    details: {
      no_of_units: "",
      jobs: "",
      amount: "",
      additional_jobs: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        no_of_units: { required },
        jobs: { required },
        amount: { required },
        additional_jobs: { required },
      },
    };
  },
  methods: {
    goBackHandler() {
      this.$store.dispatch("salesQuotationDialog/navigateStepper", {
        step: "SalesExpressContractProjectjobsThirdStep",
      });
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.$store.dispatch("salesQuotationDialog/navigateStepper", {
          step: "SalesExpressContractProjectjobsFifthStep",
        });
      }
    },
  },
};
</script>

<style>
</style>