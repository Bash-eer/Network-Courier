<template>
  <div>
    <div class="mt-3" v-for="(data, idx) of rowData" :key="data">
      <LocationInputs
        :rowId="idx"
        :rowCount="rowData.length"
        @isRowValid="isRowValid"
        @removeRow="removeRow"
        :stepKey="stepKey"
        :location="location && location.details[idx]"
      />
    </div>
    <div @click="addRow" class="flex mb-2">
      <span class="new-field mt-0 color-3057ff"
        ><b>+ Add Pickup Location</b></span
      >
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LocationInputs from "./Components/locationInputs.vue";
export default {
  components: { LocationInputs },
  data() {
    return {
      rowData: [{ id: 1, valid: false }],
      location: null,
      isContactValid: false,
    };
  },
  computed: {
    ...mapGetters({
      costCenterDataById: "salesRapidoContract/Contract/costCenterDataById",
      btnKey: "salesRapidoContract/Contract/btnKey",
    }),
  },
  methods: {
    ...mapActions({
      updateValid: "salesRapidoContract/Contract/updateValid",
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
        this.removeContacts(id);
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
        this.isContactValid = false;
      } else {
        this.isContactValid = true;
      }

      if (!this.isContactValid) {
        this.updateValid({ type: "islocationInputValid", payload: false });
      }
      if (this.isContactValid) {
        this.updateValid({ type: "islocationInputValid", payload: true });
      }
    },
    prefillData() {
      if (this.costCenterDataById) {
        this.location = {};

        this.location["details"] = this.costCenterDataById.pick_up_locations;

        if (
          this.costCenterDataById &&
          this.costCenterDataById?.pick_up_locations.length
        ) {
          this.rowData = [];
        }

        this.costCenterDataById?.pick_up_locations.map((list, idx) => {
          this.rowData.push({ id: idx + 1, valid: false });
        });
      }
    },
  },
  created() {
    this.prefillData();
  },
};
</script>

<style>
</style>