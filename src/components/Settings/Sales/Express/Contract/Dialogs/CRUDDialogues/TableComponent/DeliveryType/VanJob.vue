<template>
  <div>
    <div class="title flex justify-content-start">Bike Customer Van job</div>
    <div class="flex align-items-end mt-3">
      <div class="input-wrapper col-3">
        <div class="label flex align-items-start mb-2">Van Job Min. Cost $</div>
        <NumberField
          label="van_job_min_cost"
          mode="decimal"
          :max="0"
          :maxFractionDigits="2"
          v-on:childToParent="getUserInput"
          v-model="formData.van_job_min_cost"
          :classes="{
            'p-invalid': v$.formData.van_job_min_cost.$invalid && !isValid,
          }"
        />
      </div>
      <div class="input-wrapper col-3">
        <div class="label flex align-items-start mb-2">Kgs</div>
        <NumberField
          label="maximum_weight"
          mode="decimal"
          :max="0"
          :maxFractionDigits="2"
          v-on:childToParent="getUserInput"
          v-model="formData.maximum_weight"
          :classes="{
            'p-invalid': v$.formData.maximum_weight.$invalid && !isValid,
          }"
        />
      </div>
      <div class="input-wrapper col-3">
        <div class="label flex align-items-start mb-2">Van Job Add. Cost $</div>
        <NumberField
          label="van_job_add_cost"
          mode="decimal"
          :max="0"
          :maxFractionDigits="2"
          v-on:childToParent="getUserInput"
          v-model="formData.van_job_add_cost"
          :classes="{
            'p-invalid': v$.formData.van_job_add_cost.$invalid && !isValid,
          }"
        />
      </div>
      <div class="input-wrapper col-3">
        <div class="label flex align-items-start mb-2">Kgs $</div>
        <NumberField
          label="van_job_add_weight"
          mode="decimal"
          :max="0"
          :maxFractionDigits="2"
          v-on:childToParent="getUserInput"
          v-model="formData.van_job_add_weight"
          :classes="{
            'p-invalid': v$.formData.van_job_add_weight.$invalid && !isValid,
          }"
        />
      </div>
    </div>
    <div class="input-wrapper col-3 mt-2">
      <div class="label flex align-items-start mb-2">
        Van Job Urgent. Surcharge $
      </div>
      <NumberField
        label="van_job_urgent_surcharges"
        mode="decimal"
        :max="0"
        :maxFractionDigits="2"
        v-on:childToParent="getUserInput"
        v-model="formData.van_job_urgent_surcharges"
        :classes="{
          'p-invalid':
            v$.formData.van_job_urgent_surcharges.$invalid && !isValid,
        }"
      />
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  props: ["saveKey"],
  data() {
    return {
      isValid: true,
      formData: {
        van_job_min_cost: "",
        maximum_weight: "",
        van_job_add_cost: "",
        van_job_add_weight: "",
        van_job_urgent_surcharges: "",
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        van_job_min_cost: { required },
        maximum_weight: { required },
        van_job_add_cost: { required },
        van_job_add_weight: { required },
        van_job_urgent_surcharges: { required },
      },
    };
  },
  watch: {
    saveKey() {
      console.log("hit");
      if (this.v$.$invalid) {
        this.isValid = false;
      }
    },
  },
  methods: {
    getUserInput() {
      this.$emit("vanJobValid", !this.v$.$invalid);

      this.$emit("getVanData", this.formData);
    },
  },
};
</script>

<style scoped>
.col-3 {
  padding-left: 0 !important;
}
</style>