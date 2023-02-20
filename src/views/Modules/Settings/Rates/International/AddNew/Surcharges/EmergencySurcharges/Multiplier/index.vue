<template>
  <div>
    <div v-for="(data, idx) of rowData" :key="data">
      <InputRow
        :rowId="idx"
        :rowCount="rowData.length"
        @isRowValid="isRowValid"
        @removeRow="removeRow"
        type="multiplier"
      />
    </div>
    <div @click="addRow" class="add-text pointer mt-3">
      + Add Emergency Charges
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import InputRow from "../InputRow.vue";
export default {
  components: { InputRow },
  data() {
    return {
      rowData: [],
    };
  },
  computed: {
    ...mapGetters({
      emergencySurcharges: "AddNewInternational/Surcharges/emergencySurcharges",
    }),
  },
  methods: {
    ...mapActions({
      addEmergencySurcharges:
        "AddNewInternational/Surcharges/addEmergencySurcharges",
      removeEmergencySurcharges:
        "AddNewInternational/Surcharges/removeEmergencySurcharges",
      setSaveKey: "AddNewInternational/Surcharges/setSaveKey",
      setValidations: "AddNewInternational/Surcharges/setValidations",
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

      this.addEmergencySurcharges("multiplier");
    },
    removeRow(id) {
      if (this.rowData.length > 1) {
        this.rowData.splice(id, 1);
        this.removeEmergencySurcharges({ type: "multiplier", idx: id });
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
        tab: "emergencySurcharges",
        type: "multiplier",
        data: this.rowData,
      });

      this.setSaveKey();
    },
  },
  created() {
    this.emergencySurcharges.multiplier.map((_, idx) => {
      this.rowData.push({ id: idx, valid: true });
    });
  },
};
</script>

<style scoped>
.add-text {
  display: flex;
  align-items: flex-start;
  color: #357dea;
}
</style>