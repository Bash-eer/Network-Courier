<template>
  <div class="flex align-items-end mt-3">
    <div class="input-wrapper col-3">
      <div class="label flex align-items-start mb-2">Timeslot Delivery ($)</div>
      <NumberField
        label="timeslot_delivery"
        mode="decimal"
        :max='0'
        :maxFractionDigits="2"
        v-on:childToParent="getUserInput"
        v-model="formData.timeslot_delivery"
        :classes="{
          'p-invalid': v$.formData.timeslot_delivery.$invalid && !isValid,
        }"
      />
    </div>
    <div class="input-wrapper col-3">
      <div class="label flex align-items-start mb-2">
        Timeslot Delivery Fixed Hours
      </div>
      <NumberField
        :showButtons="true"
        label="timeslot_delivery_fixed_hours"
        mode="decimal"
        :max='0'
        :maxFractionDigits="2"
        v-on:childToParent="getUserInput"
        v-model="formData.timeslot_delivery_fixed_hours"
        :classes="{
          'p-invalid':
            v$.formData.timeslot_delivery_fixed_hours.$invalid && !isValid,
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
        timeslot_delivery: "",
        timeslot_delivery_fixed_hours: "",
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        timeslot_delivery: { required },
        timeslot_delivery_fixed_hours: { required },
      },
    };
  },
  watch: {
    saveKey() {
      if (this.v$.$invalid) {
        this.isValid = false;
      }
    },
  },
  methods: {
    getUserInput() {
      this.$emit("timeSlotValid", !this.v$.$invalid);
      this.$emit("getTimeslotData", this.formData);
    },
  },
};
</script>

<style>
</style>