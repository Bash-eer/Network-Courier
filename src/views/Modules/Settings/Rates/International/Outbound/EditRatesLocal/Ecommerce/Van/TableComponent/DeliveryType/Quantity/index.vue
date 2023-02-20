<template>
  <div>
    <div class="flex align-items-end col-6">
      <div class="input-wrapper col">
        <div class="color-7a7a7a font-size-14 bold-500 flex align-items-start mb-2">Maximum Weight (Kg)</div>
        <NumberField
          label="maximum_quantity"
          mode="decimal"
          v-on:childToParent="getUserInput"
          v-model="formData.maximum_quantity"
          :classes="{
            'p-invalid': v$.formData.maximum_quantity.$invalid && !isValid,
          }"
        />
      </div>
      <div class="input-wrapper col">
        <div class="color-7a7a7a font-size-14 bold-500 flex align-items-start mb-2">
          Van Job Addl. Weight (Kg)
        </div>
        <NumberField
          label="van_job_add_quantity"
          mode="decimal"
          v-on:childToParent="getUserInput"
          v-model="formData.van_job_add_quantity"
          :classes="{
            'p-invalid': v$.formData.van_job_add_quantity.$invalid && !isValid,
          }"
        />
      </div>
      <div class="input-wrapper col">
        <div class="color-7a7a7a font-size-14 bold-500 flex align-items-start mb-2">Van Job Add. Cost $</div>
        <NumberField
          label="van_job_add_cost"
          mode="decimal"
          v-on:childToParent="getUserInput"
          v-model="formData.van_job_add_cost"
          :classes="{
            'p-invalid': v$.formData.van_job_add_cost.$invalid && !isValid,
          }"
        />
      </div>
    </div>

    <div class="color-4e5968 font-size-14 bold-700 flex justify-content-start mt-3">Box Count Charges</div>
    <div v-for="(data, idx) of rowData" :key="data">
      <BoxCountInputs
        :rowId="idx"
        :rowCount="rowData.length"
        @isRowValid="isRowValid"
        @removeRow="removeRow"
        :saveKey="saveKey"
        @getBoxCountData="getBoxCountData"
      />
    </div>

    <div @click="addRow" class="add-text pointer mt-3">+ Add Rates</div>
  </div>
</template>

<script>
import BoxCountInputs from "./BoxCountInputs.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  components: { BoxCountInputs },
  props: ["saveKey"],
  data() {
    return {
      rowData: [{ id: 1, isValid: false }],
      isValid: false,
      formData: {
        maximum_quantity: "",
        van_job_add_quantity: "",
        van_job_add_cost: "",
      },
      boxCountData: [],
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      formData: {
        maximum_quantity: { required },
        van_job_add_quantity: { required },
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
    getBoxCountData({ id, data }) {
      this.boxCountData[id] = data;
      this.$emit("getFormData", {
        field: "charge_by_quantity",
        data: { ...this.formData, box_count_charges: this.boxCountData },
      });
    },
    getUserInput() {
      if (this.v$.$invalid) {
        this.$emit("isFormValid", {
          field: "isQuantityValid",
          isValid: false,
        });
      } else {
        this.$emit("isFormValid", {
          field: "isQuantityValid",
          isValid: true,
        });
      }

      this.$emit("getFormData", {
        field: "charge_by_quantity",
        data: { ...this.formData, box_count_charges: this.boxCountData },
      });
    },
    addRow() {
      let count = this.rowData.length + 1;

      let exist = this.rowData.find((list) => {
        if (list.id === count) {
          return list;
        }
      });

      if (exist) {
        this.rowData.push({
          id: this.rowData.length + exist.id,
          valid: false,
        });
      } else {
        this.rowData.push({ id: this.rowData.length + 1, valid: false });
      }
    },
    removeRow(id) {
      if (this.rowData.length > 1) {
        this.rowData.splice(id, 1);
      }
    },
    isRowValid({ isValid, id }) {
      this.rowData.map((list, idx) => {
        if (idx === id) {
          list.valid = isValid;
          return;
        }
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