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
          :maxFractionDigits="2"
          mode="decimal"
          v-on:childToParent="getUserInput"
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
        :deliveryIdx="deliveryIdx"
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
  props: ["deliveryIdx"],
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
      van: "AddNewInternationalLocal/Ecommerce/van",
    }),
  },
  methods: {
    ...mapActions({
      setVanDeliveryData:
        "AddNewInternationalLocal/Ecommerce/setVanDeliveryData",
      AddBoxCount: "AddNewInternationalLocal/Ecommerce/AddBoxCount",
      setValidations: "AddNewInternationalLocal/Ecommerce/setValidations",
      removeBoxCount: "AddNewInternationalLocal/Ecommerce/removeBoxCount",
    }),
    getUserInput() {
      this.setVanDeliveryData({
        chargeType: "charge_by_quantity",
        idx: this.$props.deliveryIdx,
        data: this.formData,
        boxIdx: -1,
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

      this.AddBoxCount(this.$props.deliveryIdx);
    },
    removeRow(id) {
      if (this.rowData.length > 1) {
        this.rowData.splice(id, 1);
        this.removeBoxCount({ idx: this.$props.deliveryIdx, boxIdx: id });
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
        tab: "van",
        type: "box_count_charges",
        data: this.rowData,
      });
    },
    prefillData() {
      let data =
        this.van.delivery_type[this.$props.deliveryIdx].charge_by_quantity;

      if (data != {}) this.formData = data;
    },
  },
  mounted() {
    this.prefillData();
  },
  created() {
    this.van.delivery_type[
      this.$props.deliveryIdx
    ].charge_by_quantity.box_count_charges.map((_, idx) => {
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