<template>
  <div>
    <div v-for="(row, idx) of rowData" :key="row">
      <InputRows
        @removeRow="removeRow"
        :rowId="idx"
        :rowCount="rowData.length"
        @isRowValid="isRowValid"
        rate="normal"
        :tabName="tabName"
      />
    </div>
    <div @click="addRowData" class="add-text pointer ml-3 mt-3">
      + Add Weight & Rate
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import InputRows from "./InputRows.vue";

export default {
  components: { InputRows },
  props: ["tabName"],
  data() {
    return {
      rowData: [],
      currentTabName: "",
    };
  },
  watch: {
    currentTab() {
      this.setTabName();
    },
  },
  computed: {
    ...mapGetters({
      currentTab: "AddNewInternational/WeightAndRates/currentTab",
      document: "AddNewInternational/WeightAndRates/document",
      parcel: "AddNewInternational/WeightAndRates/parcel",
      documentAndparcel: "AddNewInternational/WeightAndRates/documentAndparcel",
    }),
  },
  methods: {
    ...mapActions({
      addRow: "AddNewInternational/WeightAndRates/addRow",
      setSaveKey: "AddNewInternational/WeightAndRates/setSaveKey",
      removeRowData: "AddNewInternational/WeightAndRates/removeRow",
      setRowValidations: "AddNewInternational/WeightAndRates/setRowValidations",
    }),
    isRowValid({ isValid, id }) {
      this.rowData.map((list, idx) => {
        if (idx === id) {
          list.valid = isValid;
          return;
        }
      });

      this.setRowValidations({
        tab: this.tabName,
        rate: "normal",
        data: this.rowData,
      });

      this.setSaveKey();
    },
    addRowData() {
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

      this.addRow({ tab: this.currentTabName, rate: "normal" });
    },
    removeRow(id) {
      if (this.rowData.length > 1) {
        this.rowData.splice(id, 1);
        this.removeRowData({
          tab: this.currentTabName,
          rate: "normal",
          idx: id,
        });
      }
    },
    setTabName() {
      switch (this.currentTab) {
        case "Document":
          this.currentTabName = "document";
          break;
        case "Parcel":
          this.currentTabName = "parcel";
          break;
        case "Document and Parcel":
          this.currentTabName = "documentAndparcel";
          break;
        default:
          break;
      }
    },
  },
  created() {
    this.setTabName();
    this[this.currentTabName].normal.map((_, idx) => {
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
  user-select: none;
}
</style>    