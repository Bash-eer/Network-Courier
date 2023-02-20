<template>
  <div>
    <div class="flex align-items-end col-6">
      <div class="input-wrapper col">
        <div
          class="color-7a7a7a font-size-14 bold-500 flex align-items-start mb-2"
        >
          Maximum Quantity (Kg)
        </div>
        <NumberField
          label="maximum_quantity"
          mode="decimal"
          v-on:childToParent="getUserInput"
          :maxFractionDigits="2"
          v-model="formData.maximum_quantity"
        />
      </div>
      <div class="input-wrapper col">
        <div
          class="color-7a7a7a font-size-14 bold-500 flex align-items-start mb-2"
        >
          Van Job Addl. Quantity (Kg)
        </div>
        <NumberField
          label="van_job_add_quantity"
          mode="decimal"
          v-on:childToParent="getUserInput"
          :maxFractionDigits="2"
          v-model="formData.van_job_add_quantity"
        />
      </div>
      <div class="input-wrapper col">
        <div
          class="color-7a7a7a font-size-14 bold-500 flex align-items-start mb-2"
        >
          Van Job Add. Cost $
        </div>
        <NumberField
          label="van_job_add_cost"
          mode="decimal"
          v-on:childToParent="getUserInput"
          :maxFractionDigits="2"
          v-model="formData.van_job_add_cost"
        />
      </div>
    </div>

    <div
      class="color-4e5968 font-size-14 bold-700 flex justify-content-start mt-3"
    >
      Box Count Charges
    </div>
    <div v-for="(data, idx) of rowData" :key="data">
      <BoxCountInputs
        :rowId="idx"
        :rowCount="rowData.length"
        @isRowValid="isRowValid"
        @removeRow="removeRow"
      />
    </div>

    <div @click="addRow" class="add-text pointer mt-3">+ Add Rates</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BoxCountInputs from "./BoxCountInputs.vue";
export default {
  components: { BoxCountInputs },
  data() {
    return {
      rowData: [],
      formData: {
        maximum_quantity: "",
        van_job_add_quantity: "",
        van_job_add_cost: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      two_tire_rates: "AddNewInternationalLocal/Normal/two_tire_rates",
    }),
  },
  methods: {
    ...mapActions({
      setTwoTierData: "AddNewInternationalLocal/Normal/setTwoTierData",
      addBoxCount: "AddNewInternationalLocal/Normal/addBoxCount",
      setValidations: "AddNewInternationalLocal/Normal/setValidations",
      removeBoxCount: "AddNewInternationalLocal/Normal/removeBoxCount",
    }),
    getUserInput() {
      this.setTwoTierData({ type: "charge_by_quantity", data: this.formData });
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

      this.addBoxCount();
    },
    removeRow(id) {
      if (this.rowData.length > 1) {
        this.rowData.splice(id, 1);
        this.removeBoxCount(id);
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
        type: "box_count_charges",
        data: this.rowData,
      });
    },
    prefillData() {
      this.formData = this.two_tire_rates.charge_by_quantity;
    },
  },
  mounted() {
    this.prefillData();
  },
  created() {
    this.two_tire_rates.charge_by_quantity.box_count_charges.map((_, idx) => {
      this.rowData.push({ id: idx, valid: true });
    });
  },
};
</script>

<style scoped>
.col,
.col-6 {
  padding-left: 0 !important;
}
</style>