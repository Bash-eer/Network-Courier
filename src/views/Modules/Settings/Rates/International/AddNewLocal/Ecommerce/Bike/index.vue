<template>
  <div>
    <div v-for="(data, idx) of rowData" :key="data">
      <DeliveryType
        :rowId="idx"
        :rowCount="rowData.length"
        @isRowValid="isRowValid"
        @removeRow="removeRow"
      />
    </div>

    <div @click="addRow" class="add-text pointer mt-3">+ Add Delivery Type</div>

    <!-- <div class="flex align-items-end mt-3">
      <div class="input-wrapper col-3">
        <div class="label flex align-items-start mb-2">
          Timeslot Delivery ($)
        </div>
        <NumberField
          label="timeslot_delivery"
          mode="decimal"
          v-on:childToParent="getUserInput"
          v-model="formData.timeslot_delivery"
        />
      </div>
      <div class="input-wrapper col-3">
        <div class="label flex align-items-start mb-2">
          Timeslot Delivery Fixed Hours
        </div>
        <NumberField
          :showButtons="true"
          label="timeslot_delivery_fixed_hours"
          mode="decimal"
          v-on:childToParent="getUserInput"
          v-model="formData.timeslot_delivery_fixed_hours"
        />
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DeliveryType from "./DeliveryType/index.vue";
export default {
  components: { DeliveryType },
  data() {
    return {
      rowData: [],
      formData: {
        timeslot_delivery: "",
        timeslot_delivery_fixed_hours: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      bike: "AddNewInternationalLocal/Ecommerce/bike",
    }),
  },
  methods: {
    ...mapActions({
      AddBikeDelivery: "AddNewInternationalLocal/Ecommerce/AddBikeDelivery",
      removeBikeDelivery:
        "AddNewInternationalLocal/Ecommerce/removeBikeDelivery",
      setValidations: "AddNewInternationalLocal/Ecommerce/setValidations",
    }),
    // getUserInput(label, value) {
    //   this.setBikeDeliveryData({
    //     type: "other",
    //     otherField: label,
    //     data: value,
    //   });
    // },
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

      this.AddBikeDelivery();
    },
    removeRow(id) {
      if (this.rowData.length > 1) {
        this.rowData.splice(id, 1);
        this.removeBikeDelivery(id);
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
        tab: "bike",
        type: "delivery_type",
        data: this.rowData,
      });
    },
    prefillData() {
      this.formData.timeslot_delivery = this.bike?.timeslot_delivery || "";
      this.formData.timeslot_delivery_fixed_hours =
        this.bike?.timeslot_delivery_fixed_hours || "";
    },
  },
  mounted() {
    this.prefillData();
  },
  created() {
    this.bike.delivery_type.map((_, idx) => {
      this.rowData.push({ id: idx, valid: true });
    });
  },
};
</script>

<style scoped>
.col-3 {
  padding-left: 0 !important;
}
</style>