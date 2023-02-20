<template>
  <div class="flex align-items-end">
    <div class="input-wrapper col-3">
      <div class="label-text mb-2 flex">
        Special Rate Name<span class="required-field ml-1">*</span>
      </div>
      <TextField
        label="special_rate_name"
        v-model="formData.special_rate_name"
        v-on:childToParent="getUserInput"
        :classes="{
          'p-invalid': v$.formData.special_rate_name.$invalid && !isValid,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="input-wrapper col-3">
      <div class="label-text mb-2 flex">
        Rate Charge ($)<span class="required-field ml-1">*</span>
      </div>
      <NumberField
        label="rate"
        :maxFractionDigits="2"
        mode="decimal"
        v-model="formData.rate"
        v-on:childToParent="getUserInput"
        :classes="{
          'p-invalid': v$.formData.rate.$invalid && !isValid,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div
      @click="$emit('removeRow', rowId)"
      v-if="rowCount !== 1"
      class="pi pi-times pointer ml-3 mb-3"
    ></div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["rowCount", "rowId", "type"],
  data() {
    return {
      isValid: true,
      formData: {
        special_rate_name: "",
        rate: "",
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        special_rate_name: { required },
        rate: { required },
      },
    };
  },
  watch: {
    footerBtnKey() {
      if (this.v$.$invalid) {
        this.isValid = false;
        this.$emit("isRowValid", { isValid: false, id: this.rowId });
      } else {
        this.$emit("isRowValid", { isValid: true, id: this.rowId });
      }
    },
  },
  computed: {
    ...mapGetters({
      footerBtnKey: "AddNewInternational/footerBtnKey",
      data: "AddNewInternational/AddSurcharges/data",
    }),
  },
  methods: {
    ...mapActions({
      setData: "AddNewInternational/AddSurcharges/setData",
    }),
    getUserInput() {
      this.setData({
        idx: this.$props.rowId,
        data: this.formData,
      });
    },
    prefillData() {
      if (this.data[this.$props.rowId]) {
        this.formData = this.data[this.$props.rowId];
      }
    },
  },
  created() {
    this.prefillData();
  },
};
</script>

<style>
</style>