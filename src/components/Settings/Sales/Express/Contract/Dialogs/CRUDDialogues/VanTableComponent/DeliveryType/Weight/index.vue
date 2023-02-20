<template>
  <div>
    <div class="flex align-items-end col-6">
      <div class="input-wrapper col">
        <div class="color-7a7a7a font-size-14 bold-500 flex align-items-start mb-2">Maximum Weight (Kg)</div>
        <NumberField
          label="maximum_weight"
          mode="decimal"
          
             :maxFractionDigits="2"
          v-on:childToParent="getUserInput"
          v-model="formData.maximum_weight"
          :classes="{
            'p-invalid': v$.formData.maximum_weight.$invalid && !isValid,
          }"
        />
      </div>
      <div class="input-wrapper col">
        <div class="color-7a7a7a font-size-14 bold-500 flex align-items-start mb-2">
          Van Job Addl. Weight (Kg)
        </div>
        <NumberField
          label="van_job_add_weight"
          mode="decimal"
           :maxFractionDigits="2"
          v-on:childToParent="getUserInput"
          v-model="formData.van_job_add_weight"
          :classes="{
            'p-invalid': v$.formData.van_job_add_weight.$invalid && !isValid,
          }"
        />
      </div>
      <div class="input-wrapper col">
        <div class="color-7a7a7a font-size-14 bold-500 flex align-items-start mb-2">Van Job Add. Cost $</div>
        <NumberField
          label="van_job_add_cost"
          mode="decimal"
           :maxFractionDigits="2"
          v-on:childToParent="getUserInput"
          v-model="formData.van_job_add_cost"
          :classes="{
            'p-invalid': v$.formData.van_job_add_cost.$invalid && !isValid,
          }"
        />
      </div>
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
        maximum_weight: "",
        van_job_add_weight: "",
        van_job_add_cost: "",
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        maximum_weight: { required },
        van_job_add_weight: { required },
        van_job_add_cost: { required },
      },
    };
  },
  watch: {
    saveKey() {
      if (this.v$.$invalid) {
        this.isValid = false;
        this.$emit("isRowValid", { isValid: false, id: this.rowId });
      } else {
        this.$emit("isRowValid", { isValid: true, id: this.rowId });
      }
    },
  },
  methods: {
    getUserInput() {
      if (this.v$.$invalid) {
        this.$emit("isFormValid", {
          field: "isWeightValid",
          isValid: false,
        });
      } else {
        this.$emit("isFormValid", {
          field: "isWeightValid",
          isValid: true,
        });
      }

      this.$emit("getFormData", {
        field: "charge_by_weight",
        data: this.formData,
      });
    },
  },
};
</script>

<style scoped>
.col,
.col-6 {
  padding-left: 0 !important;
}
</style>