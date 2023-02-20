<template>
  <div>
    <div v-for="(data, idx) of rowData" :key="data">
      <InputRow
        :rowId="idx"
        :count="rowData.length"
        @isRowValid="isRowValid"
        @removeRow="removeRow"
        stage="Normal"
        type="normal"
      />
    </div>
    <div @click="addRow" class="add-text pointer mt-3">
      + Add Restricted Country Charges
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
      restrictedCountry: "AddNewInternational/Surcharges/restrictedCountry",
    }),
  },
  methods: {
    ...mapActions({
      addRestrictedCountry:
        "AddNewInternational/Surcharges/addRestrictedCountry",
      removeRestrictedCountry:
        "AddNewInternational/Surcharges/removeRestrictedCountry",
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

      this.addRestrictedCountry("normal");
    },
    removeRow(id) {
      if (this.rowData.length > 1) {
        this.rowData.splice(id, 1);
        this.removeRestrictedCountry({ type: "normal", idx: id });
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
        tab: "restrictedCountry",
        type: "normal",
        data: this.rowData,
      });

      this.setSaveKey();
    },
  },
  created() {
    this.restrictedCountry.normal.map((_, idx) => {
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