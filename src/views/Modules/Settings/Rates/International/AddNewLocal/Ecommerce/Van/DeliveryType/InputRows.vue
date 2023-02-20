<template>
  <div>
    <div class="flex align-items-end">
      <div class="input-wrapper col-3">
        <div class="label flex align-items-start mb-2">
          Minimum Monthly Units (Dispatches)
          <span class="ml-1 required-field">*</span>
        </div>
        <div class="flex align-items-end">
          <NumberField
            label="min_units"
            :showButtons="true"
            mode="decimal"
              :maxFractionDigits="2"
            v-on:childToParent="getUserInput"
            v-model="formData.min_units"
            :classes="{
              'p-invalid': v$.formData.min_units.$invalid && !isValid,
            }"
          />
          <NumberField
            class="ml-2"
            label="max_units"
            :showButtons="true"
            mode="decimal"
              :maxFractionDigits="2"
            v-on:childToParent="getUserInput"
            v-model="formData.max_units"
            :classes="{
              'p-invalid': v$.formData.max_units.$invalid && !isValid,
            }"
          />
        </div>
      </div>
      <div class="input-wrapper col-3">
        <div class="label flex align-items-start mb-2">
          Unit Rate ($)
          <span class="ml-1 required-field">*</span>
        </div>
        <NumberField
          label="unit_rate"
          mode="decimal"
          v-on:childToParent="getUserInput"
          :maxFractionDigits="2"
          v-model="formData.unit_rate"
          :classes="{
            'p-invalid': v$.formData.unit_rate.$invalid && !isValid,
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
  props: ["rowCount", "rowId", "type", "deliveryIdx"],
  data() {
    return {
      isValid: true,
      formData: {
        min_units: "",
        max_units: "",
        unit_rate: "",
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        min_units: { required },
        max_units: {
          required,
          maxVal: (value) => {
            if (this.formData.min_units >= value) {
              return false;
            } else {
              return true;
            }
          },
        },
        unit_rate: { required },
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
      van: "AddNewInternationalLocal/Ecommerce/van",
    }),
  },
  methods: {
    ...mapActions({
      setVanDeliveryData:
        "AddNewInternationalLocal/Ecommerce/setVanDeliveryData",
    }),
    getUserInput() {
      this.setVanDeliveryData({
        type: "rates",
        idx: this.$props.deliveryIdx,
        ratesIdx: this.$props.rowId,
        data: this.formData,
      });
    },
    prefillData() {
      let data =
        this.van.delivery_type[this.$props.deliveryIdx].rates[
          this.$props.rowId
        ];

      if (data != {}) this.formData = data;
    },
  },
  mounted() {
    this.prefillData();
  },
};
</script>

<style>
</style>