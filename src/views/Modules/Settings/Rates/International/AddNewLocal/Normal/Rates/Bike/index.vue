<template>
  <div>
    <div class="color-4e5968 font-size-14 bold-600 flex justify-content-start">
      Add Rates
    </div>
    <div v-for="(data, idx) of rowData" :key="data">
      <InputRow
        :rowId="idx"
        :rowCount="rowData.length"
        @isRowValid="isRowValid"
        @removeRow="removeRow"
        type="bike_rates"
      />
    </div>

    <div
      @click="addRow"
      class="add-text pointer mt-3 color-357dea font-size-14 bold-600"
    >
      + Add Rates
    </div>
    <hr />

    <div
      class="color-4e5968 font-size-14 bold-600 flex justify-content-start mt-3"
    >
      Bike Customer Van job
    </div>
    <div class="flex align-items-end mt-3">
      <div class="input-wrapper col">
        <div
          class="color-7a7a7a font-size-14 bold-500 flex align-items-start mb-2"
        >
          Van Job Min. Cost $
        </div>
        <NumberField
          label="min_weight"
          mode="decimal"
          :maxFractionDigits="2"
          v-on:childToParent="getUserInput"
          v-model="vanJobData.van_job_min_cost"
          :classes="{
            'p-invalid': v$.vanJobData.van_job_min_cost.$invalid && !isValid,
          }"
        />
      </div>
      <div class="input-wrapper col">
        <div
          class="color-7a7a7a font-size-14 bold-500 flex align-items-start mb-2"
        >
          Maximum Weight (Kg)
        </div>
        <NumberField
          label="min_weight"
          mode="decimal"
          v-on:childToParent="getUserInput"
          :maxFractionDigits="2"
          v-model="vanJobData.maximum_weight"
          :classes="{
            'p-invalid': v$.vanJobData.maximum_weight.$invalid && !isValid,
          }"
        />
      </div>
      <div class="input-wrapper col">
        <div
          class="color-7a7a7a font-size-14 bold-500 flex align-items-start mb-2"
        >
          Van Job Add. Cost $
        </div>
        <NumberField
          label="min_weight"
          mode="decimal"
          v-on:childToParent="getUserInput"
          :maxFractionDigits="2"
          v-model="vanJobData.van_job_add_cost"
          :classes="{
            'p-invalid': v$.vanJobData.van_job_add_cost.$invalid && !isValid,
          }"
        />
      </div>
      <div class="input-wrapper col">
        <div
          class="color-7a7a7a font-size-14 bold-500 flex align-items-start mb-2"
        >
          Van Job Add. Weight (Kg)
        </div>
        <NumberField
          label="min_weight"
          mode="decimal"
          v-on:childToParent="getUserInput"
          :maxFractionDigits="2"
          v-model="vanJobData.van_job_add_weight"
          :classes="{
            'p-invalid': v$.vanJobData.van_job_add_weight.$invalid && !isValid,
          }"
        />
      </div>
    </div>
    <div class="flex">
      <div class="input-wrapper col-3">
        <div
          class="color-7a7a7a font-size-14 bold-500 flex align-items-start mb-2"
        >
          Van Job Urgent. Surcharge $
        </div>
        <NumberField
          label="min_weight"
          mode="decimal"
          :maxFractionDigits="2"
          v-on:childToParent="getUserInput"
          v-model="vanJobData.van_job_urgent_surcharges"
          :classes="{
            'p-invalid':
              v$.vanJobData.van_job_urgent_surcharges.$invalid && !isValid,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import InputRow from "./inputRow.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  components: { InputRow },
  data() {
    return {
      isValid: true,
      rowData: [],
      vanJobData: {
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
      vanJobData: {
        van_job_min_cost: { required },
        maximum_weight: { required },
        van_job_add_cost: { required },
        van_job_add_weight: { required },
        van_job_urgent_surcharges: { required },
      },
    };
  },
  computed: {
    ...mapGetters({
      bike_rates: "AddNewInternationalLocal/Normal/bike_rates",
      bike_customer_van_job:
        "AddNewInternationalLocal/Normal/bike_customer_van_job",
    }),
  },
  methods: {
    ...mapActions({
      addRates: "AddNewInternationalLocal/Normal/addRates",
      removeRates: "AddNewInternationalLocal/Normal/removeRates",
      setVanJobData: "AddNewInternationalLocal/Normal/setVanJobData",
      setValidations: "AddNewInternationalLocal/Normal/setValidations",
    }),
    getUserInput() {
      this.setVanJobData(this.vanJobData);
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

      this.addRates("bike_rates");
    },
    removeRow(id) {
      if (this.rowData.length > 1) {
        this.rowData.splice(id, 1);
        this.removeRates({ type: "bike_rates", idx: id });
      }
    },
    isRowValid({ isValid, id }) {
      this.rowData.map((list, idx) => {
        if (idx === id) {
          list.valid = isValid;
          return;
        }
      });

      this.setValidations({
        tab: "rates",
        type: "bike_rates",
        data: this.rowData,
      });
    },
    prefillData() {
      let data = this.bike_customer_van_job;

      if (data != {}) this.vanJobData = data;
    },
  },
  mounted() {
    this.prefillData();
  },
  created() {
    this.bike_rates.map((_, idx) => {
      this.rowData.push({ id: idx, valid: true });
    });
  },
};
</script>

<style scoped>
.col,
.col-3 {
  padding-left: 0 !important;
}
</style>