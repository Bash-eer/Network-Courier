<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text required">Weight Range (Kg)</h5>
      <div class="formgrid grid">
        <div class="field col-12 md:col-6">
          <NumberField
            :showButtons="true"
            v-model="details.min_weight"
            :maxFractionDigits="2"
            :classes="{
              'p-invalid': v$.details.min_weight.$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
            mode="decimal"
          />
        </div>
        <div class="field col-12 md:col-6">
          <NumberField
            v-model="details.max_weight"
            :maxFractionDigits="2"
            type="text"
            :classes="{
              'p-invalid': v$.details.max_weight.$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
            :showButtons="true"
            mode="decimal"
          />
        </div>
      </div>
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Collection Time</h5>
      <TimePicker24
        v-model="details.collect_time"
        :state="details.collect_time"
        :classes="{
          'p-invalid': v$.details.collect_time.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
      <!-- <NumberField
        v-model="details.collect_time"
        type="text"
        :classes="{
          'p-invalid': v$.details.collect_time.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
        :showButtons="true"
        mode="decimal"
      /> -->
    </div>
    <div class="field col-12 md:col-2">
      <h5 class="dialog-label-text">Cut off Time</h5>
      <TimePicker24
        v-model="details.cut_off_time"
        :state="details.cut_off_time"
        :classes="{
          'p-invalid': v$.details.cut_off_time.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
      <!-- <NumberField
        v-model="details.cut_off_time"
        type="text"
        :classes="{
          'p-invalid': v$.details.cut_off_time.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
        :showButtons="true"
        mode="decimal"
      /> -->
    </div>
    <div class="field col-12 md:col-2">
      <h5 class="dialog-label-text">Cut off Days-Count</h5>
      <NumberField
        v-model="details.cut_off_days_count"
        type="text"
        :maxFractionDigits="2"
        :classes="{
          'p-invalid': v$.details.cut_off_days_count.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
        :showButtons="true"
        mode="decimal"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Van Job Min. Cost $</h5>
      <TextField
        v-model="details.van_job_min_cost"
        type="text"
        :classes="{
          'p-invalid': v$.details.van_job_min_cost.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Maximum Kilometer (Km)</h5>
      <TextField
        v-model="details.van_job_maximum_kilo_meter"
        type="text"
        :classes="{
          'p-invalid':
            v$.details.van_job_maximum_kilo_meter.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Van Job Add Cost $</h5>
      <TextField
        v-model="details.van_job_additional_cost"
        type="text"
        :classes="{
          'p-invalid': v$.details.van_job_additional_cost.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Van Job Add Kilometer (Km)</h5>
      <TextField
        v-model="details.van_job_additional_kilo_meter"
        type="text"
        :classes="{
          'p-invalid':
            v$.details.van_job_additional_kilo_meter.$invalid && submitted,
          'inputfield w-full dialog-field-text': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Van Job Urgent Surcharge $</h5>
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
import { required } from "@vuelidate/validators";
import moment from "moment";
export default {
  data: () => ({
    name: "AddAdditionalSurcharges",
    v$: useVuelidate(),
    submitted: false,
    details: {
      min_weight: "",
      max_weight: "",
      collect_time: "",
      cut_off_time: "",
      cut_off_days_count: "",
      van_job_min_cost: "",
      van_job_maximum_kilo_meter: "",
      van_job_additional_cost: "",
      van_job_additional_kilo_meter: "",
      van_job_urgent_surcharges: "",
    },
  }),
  validations() {
    return {
      details: {
        min_weight: { required },
        max_weight: { required },
        collect_time: { required },
        cut_off_time: { required },
        cut_off_days_count: { required },
        van_job_min_cost: { required },
        van_job_maximum_kilo_meter: { required },
        van_job_additional_cost: { required },
        van_job_additional_kilo_meter: { required },
        van_job_urgent_surcharges: { required },
      },
    };
  },
  methods: {
    //for time pickers
    timeFormatter(data) {
      if (data == null) {
        return "00:00";
      } else {
        var formattedTime = moment(data).format("HH:mm");
        return formattedTime;
      }
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let StateData = this.$store.state.rapidoAdhoc.addOnDemandServiceData;
        this.$store.dispatch("rapidoAdhoc/POSTPATCHCRUDOPERATION", {
          path:
            "settings/sales/rates/rapido/adhoc/ratecard/ondemand/services/" +
            StateData.id,
          data: this.details,
          method: "PATCH",
          triggered: true,

          toastData: {
            toastSuccessData: {
              toastMsg: `The On Demand Service is updated!`,
              toastSeverity: "success",
            },
            toastDuplicateErrorData: {
              toastMsg: `The data is already exists !`,
              toastSeverity: "error",
            },
            toastCommonErrorData: {
              toastMsg:
                "There was an error in updating the on demand service, try again!",
              toastSeverity: "error",
            },
          },
        });
      }
    },
  },
  created() {
    for (let d in this.details) {
      this.details[d] = this.$store.state.rapidoAdhoc.addOnDemandServiceData[d];
    }
  },
  unmounted() {
    this.$store.state.rapidoAdhoc.addOnDemandServiceData = {};
  },
};
</script>

<style scoped></style>
