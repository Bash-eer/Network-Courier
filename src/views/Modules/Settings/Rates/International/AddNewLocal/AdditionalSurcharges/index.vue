<template>
  <div>
    <div class="title flex align-items-start mt-3">Add Surcharges</div>
    <div v-for="(data, idx) of rowData" :key="data">
      <InputRows
        :rowId="idx"
        :rowCount="rowData.length"
        @isRowValid="isRowValid"
        @removeRow="removeRow"
      />
    </div>
  </div>

  <div @click="addRow" class="add-text pointer mt-3">+ Add Surcharge</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import InputRows from "./InputRows.vue";
export default {
  components: { InputRows },
  data() {
    return {
      rowData: [],
    };
  },
  watch: {
    backBtnKey() {
      this.setStepBackKey();
    },
  },
  computed: {
    ...mapGetters({
      backBtnKey: "AddNewInternationalLocal/backBtnKey",
      additional_surcharges:
        "AddNewInternationalLocal/Surcharges/additional_surcharges",
    }),
  },
  methods: {
    ...mapActions({
      setStepBackKey: "AddNewInternationalLocal/setStepBackKey",
      addAdditionalSurcharges:
        "AddNewInternationalLocal/Surcharges/addAdditionalSurcharges",
      removeAdditionalSurcharges:
        "AddNewInternationalLocal/Surcharges/removeAdditionalSurcharges",
      setValidations: "AddNewInternationalLocal/Surcharges/setValidations",
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

      this.addAdditionalSurcharges();
    },
    removeRow(id) {
      if (this.rowData.length > 1) {
        this.rowData.splice(id, 1);
        this.removeAdditionalSurcharges(id);
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
        type: "additional_surcharges",
        data: this.rowData,
      });
    },
  },
  created() {
    this.additional_surcharges.map((_, idx) => {
      this.rowData.push({ id: idx, valid: true });
    });
  },
};
</script>

<style >
</style>