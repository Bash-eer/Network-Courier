<template>
  <div>
    <div class="title flex justify-content-start mb-4">Over Weight Charges</div>
    <InputRows @isRowValid="isRowValid" :rowId="0" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import InputRows from "./InputRows.vue";
export default {
  components: { InputRows },
  data() {
    return {
      rowData: [{ id: 0, valid: false }],
    };
  },

  methods: {
    ...mapActions({
      setSaveKey: "AddNewInternational/Surcharges/setSaveKey",
      setValidations: "AddNewInternational/Surcharges/setValidations",
    }),
    isRowValid({ isValid, id }) {
      this.rowData.map((list, idx) => {
        if (idx === id) {
          list.valid = isValid;
          return;
        }
      });

      this.setValidations({
        tab: "overWeightCharges",
        type: "base",
        data: this.rowData,
      });

      this.setSaveKey();
    },
  },
};
</script>

<style>
</style>