<template>
  <div>
    <div class="flex align-items-end">
      <div class="input-wrapper col-3 mt-3">
        <div class="label flex align-items-start mb-2">
          Surcharge Name <span class="required-field ml-1">*</span>
        </div>
        <TextField
          label="surcharge_name"
          mode="decimal"
          v-on:childToParent="getUserInput"
          v-model="formData.surcharge_name"
          :classes="{
            'p-invalid': v$.formData.surcharge_name.$invalid && !isValid,
          }"
        />
      </div>
      <div class="input-wrapper col-3 mt-3">
        <div class="label flex align-items-start mb-2">
          Rate (S$) <span class="required-field ml-1">*</span>
        </div>
        <NumberField
          label="rates"
          mode="decimal"
          v-on:childToParent="getUserInput"
          :maxFractionDigits="2"
          v-model="formData.rates"
          :classes="{
            'p-invalid': v$.formData.rates.$invalid && !isValid,
          }"
        />
      </div>
      <div
        @click="$emit('removeRow', rowId)"
        v-if="rowCount !== 1"
        class="pi pi-times pointer ml-2 mb-3"
      ></div>
    </div>
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
        surcharge_name: "",
        rates: "",
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        surcharge_name: { required },
        rates: { required },
      },
    };
  },
  watch: {
    nextBtnKey() {
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
      nextBtnKey: "AddNewInternationalLocal/nextBtnKey",
      additional_surcharges:
        "AddNewInternationalLocal/Surcharges/additional_surcharges",
    }),
  },
  methods: {
    ...mapActions({
      setAdditionalSurchargesData:
        "AddNewInternationalLocal/Surcharges/setAdditionalSurchargesData",
    }),
    getUserInput() {
      this.setAdditionalSurchargesData({
        idx: this.$props.rowId,
        data: this.formData,
      });

      if (this.v$.$invalid) {
        this.$emit("isRowValid", { isValid: false, id: this.rowId });
      } else {
        this.$emit("isRowValid", { isValid: true, id: this.rowId });
      }
    },
    prefillData() {
      let data = this.additional_surcharges[this.$props.rowId];

      if (data != {}) this.formData = data;
    },
  },
  mounted() {
    this.prefillData();
  },
};
</script>

<style scoped>
.col-3 {
  padding-left: 0 !important;
}
</style>