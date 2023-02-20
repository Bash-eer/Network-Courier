<template>
  <div>
    <div v-for="(data, idx) of rowData" :key="data">
      <FormInputs
        :rowId="idx"
        :count="rowData.length"
        @isRowValid="isRowValid"
        @removeRow="removeRow"
        type="normal"
      />
    </div>

    <div @click="addRow" class="add-text pointer ml-2 mt-5">
      + Add Remote Area Charges
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FormInputs from "../FormInputs.vue";
export default {
  components: { FormInputs },
  data() {
    return {
      rowData: [],
    };
  },
  computed: {
    ...mapGetters({
      remoteAreaCharges: "AddNewInternational/Surcharges/remoteAreaCharges",
    }),
  },
  methods: {
    ...mapActions({
      addRemoteAreaCharges:
        "AddNewInternational/Surcharges/addRemoteAreaCharges",
      removeRemoteAreaCharges:
        "AddNewInternational/Surcharges/removeRemoteAreaCharges",
      setSaveKey: "AddNewInternational/Surcharges/setSaveKey",
      setValidations: "AddNewInternational/Surcharges/setValidations",
    }),

    removeRow(id) {
      if (this.rowData.length > 1) {
        this.rowData.splice(id, 1);

        this.removeRemoteAreaCharges({ type: "normal", idx: id });
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
        tab: "remoteAreaCharges",
        type: "normal",
        data: this.rowData,
      });

      this.setSaveKey();
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

      this.addRemoteAreaCharges("normal");
    },
  },
  created() {
    this.remoteAreaCharges.normal.map((_, idx) => {
      this.rowData.push({ id: idx, valid: true });
    });
  },
};
</script>

<style>
</style>