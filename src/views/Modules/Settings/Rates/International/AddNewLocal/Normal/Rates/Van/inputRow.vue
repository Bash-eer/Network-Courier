<template>
  <div>
    <div class="flex align-items-end col-6">
      <div class="input-wrapper col-5">
        <div
          class="
            required
            color-7a7a7a
            bold-500
            font-size-14
            flex
            align-items-start
            mb-2
          "
        >
          Minimum Monthly Units (Dispatches)
          <!-- <span class="ml-1 required-field">*</span> -->
        </div>
        <div class="flex align-items-end">
          <NumberField
            label="min_weight"
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
            label="min_weight"
            :showButtons="true"
            mode="decimal"
            v-on:childToParent="getUserInput"
            :maxFractionDigits="2"
            v-model="formData.max_units"
            :classes="{
              'p-invalid': v$.formData.max_units.$invalid && !isValid,
            }"
          />
        </div>
      </div>
      <div class="input-wrapper col">
        <div
          class="
            required
            color-7a7a7a
            bold-500
            font-size-14
            flex
            align-items-start
            mb-2
          "
        >
          Unit Rate ($)
          <!-- <span class="ml-1 required-field">*</span> -->
        </div>
        <NumberField
          label="min_weight"
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
  props: ["rowCount", "rowId", "type"],
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
      van_rates: "AddNewInternationalLocal/Normal/van_rates",
    }),
  },
  methods: {
    ...mapActions({
      setRatesData: "AddNewInternationalLocal/Normal/setRatesData",
    }),
    getUserInput() {
      this.setRatesData({
        type: "van_rates",
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
      let data = this.van_rates[this.$props.rowId];

      if (data != {}) this.formData = data;
    },
  },
  mounted() {
    this.prefillData();
  },
};
</script>

<style scoped>
.col,
.col-6,
.col-5 {
  padding-left: 0 !important;
}
</style>