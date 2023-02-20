<template>
  <div class="mt-4">
    <div v-for="(data, idx) of rowData" :key="data">
      <FormInputs
        :rowId="idx"
        :rowCount="rowData.length"
        @isRowValid="isRowValid"
        @removeRow="removeRow"
      />
    </div>
    <div @click="addRow" class="add-text pointer mt-3">+ Add New Rate</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FormInputs from "./FormInputs.vue";
export default {
  components: { FormInputs },
  data() {
    return {
      rowData: [],
    };
  },
  computed: {
    ...mapGetters({
      data: "AddNewInternational/AddSurcharges/data",
    }),
  },
  methods: {
    ...mapActions({
      setIsNextValid: "AddNewInternational/setIsNextValid",
      removeRowValue: "AddNewInternational/AddSurcharges/removeRow",
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
    },
    removeRow(id) {
      if (this.rowData.length > 1) {
        this.rowData.splice(id, 1);
        this.removeRowValue(id);
      }
    },
    isRowValid({ isValid, id }) {
      this.rowData.map((list, idx) => {
        if (idx === id) {
          list.valid = isValid;
          return;
        }
      });

      let invalidForm = this.rowData.find((list) => list.valid === false);

      if (invalidForm) {
        this.setIsNextValid(false);
      } else {
        this.setIsNextValid(true);
      }
    },
  },
  created() {
    this.data.map((_, idx) => {
      this.rowData.push({ id: idx, valid: true });
    });
  },
};
</script>

<style>
</style>