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
        type="van_rates"
      />
    </div>

    <div @click="addRow" class="add-text pointer mt-3">+ Add Rates</div>
    <div class="input-wrapper col-3 mt-3">
      <div
        class="color-7a7a7a font-size-14 bold-500 flex align-items-start mb-2"
      >
        Van Job Urgent. Surcharge $
      </div>
      <NumberField
        v-on:childToParent="getJobSurcharges"
        v-model="van_job_urgent_surcharges"
        label="van_job_urgent_surcharges"
        :maxFractionDigits="2"
        mode="decimal"
      />
    </div>
    <hr />
    <TwoTier />
    <hr />
    <MultiTier />
    <hr />
    <div class="color-4e5968 font-size-14 bold-600 flex justify-content-start">
      Van Customer Bike job
    </div>
    <div class="input-wrapper col-3 mt-3">
      <div
        class="
          color-7a7a7a
          font-size-14
          bold-500
          required
          flex
          align-items-start
          mb-2
        "
      >
        Min Charge per Job ($)
        <!-- <span class="ml-1 required-field">*</span> -->
      </div>
      <NumberField
        v-on:childToParent="getUserInput"
        v-model="min_charge_per_job"
        :classes="{
          'p-invalid': v$.min_charge_per_job.$invalid,
        }"
        label="min_charge_per_job"
        :maxFractionDigits="2"
        mode="decimal"
      />
    </div>
  </div>
</template>

<script>
import InputRow from "./inputRow.vue";
import TwoTier from "./TwoTier/index.vue";
import { mapActions, mapGetters } from "vuex";
import MultiTier from "./MultiTier/index.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  components: { InputRow, TwoTier, MultiTier },
  data() {
    return {
      rowData: [],
      isValid: true,
      min_charge_per_job: "",
      van_job_urgent_surcharges: null,
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      min_charge_per_job: { required },
    };
  },
  computed: {
    ...mapGetters({
      van_customer_bike_job:
        "AddNewInternationalLocal/Normal/van_customer_bike_job",
      van_rates: "AddNewInternationalLocal/Normal/van_rates",
      van_job_urgent_surchargesValue:
        "AddNewInternationalLocal/Normal/van_job_urgent_surcharges",
    }),
  },
  methods: {
    ...mapActions({
      addRates: "AddNewInternationalLocal/Normal/addRates",
      removeRates: "AddNewInternationalLocal/Normal/removeRates",
      setVanCustomerBikejob:
        "AddNewInternationalLocal/Normal/setVanCustomerBikejob",
      setVanSurcharges: "AddNewInternationalLocal/Normal/setVanSurcharges",
      setValidations: "AddNewInternationalLocal/Normal/setValidations",
    }),
    getJobSurcharges() {
      this.setVanSurcharges(this.van_job_urgent_surcharges);
    },
    getUserInput() {
      this.setVanCustomerBikejob({
        min_charge_per_job: this.min_charge_per_job,
      });

      this.setValidations({
        tab: "rates",
        type: "van_customer_bike_job",
        data: { valid: !this.v$.min_charge_per_job.$invalid },
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

      this.addRates("van_rates");
    },
    removeRow(id) {
      if (this.rowData.length > 1) {
        this.rowData.splice(id, 1);
        this.removeRates({ type: "van_rates", idx: id });
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
        type: "van_rates",
        data: this.rowData,
      });
    },
    prefillData() {
      let data = this.van_customer_bike_job.min_charge_per_job;

      if (data != {}) this.min_charge_per_job = data;

      let data2 = this.van_job_urgent_surchargesValue;

      if (data2 && Object.keys(data2).length !== 0)
        this.van_job_urgent_surcharges = data2;
    },
  },
  mounted() {
    this.prefillData();
  },
  created() {
    this.van_rates.map((_, idx) => {
      this.rowData.push({ id: idx, valid: true });
    });
    this.setVanSurcharges(this.van_job_urgent_surcharges);
  },
};
</script>

<style scoped>
.col-3 {
  padding-left: 0 !important;
}
</style>