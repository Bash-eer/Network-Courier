<template>
  <div>
    <div v-for="(data, idx) of rowData" :key="data">
      <WeightInputs
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
import WeightInputs from "./WeightInputs.vue";
export default {
  components: { WeightInputs },
  data() {
    return {
      rowData: [],
    };
  },
  computed: {
    ...mapGetters({
      multi_tire: "AddNewInternationalLocal/Normal/multi_tire",
    }),
  },
  methods: {
    ...mapActions({
      addMultiTierWeight: "AddNewInternationalLocal/Normal/addMultiTierWeight",
      removeMultiTierWeight:
        "AddNewInternationalLocal/Normal/removeMultiTierWeight",
      setValidations: "AddNewInternationalLocal/Normal/setValidations",
    }),
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

      this.addMultiTierWeight();
    },
    removeRow(id) {
      if (this.rowData.length > 1) {
        this.rowData.splice(id, 1);
        this.removeMultiTierWeight(id);
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
        type: "charge_by_quantity",
        data: this.rowData,
      });
    },
  },
  created() {
    this.multi_tire.charge_by_quantity.map((_, idx) => {
      this.rowData.push({ id: idx, valid: true });
    });
  },
};
</script>

<style>
</style>