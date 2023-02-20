<template>
  <div class="flex align-items-end mt-3">
    <div class="input-wrapper col-3">
      <div class="label flex align-items-start mb-2">Timeslot Delivery ($)</div>
      <NumberField
        label="timeslot_delivery"
        mode="decimal"
        v-on:childToParent="getUserInput"
              :maxFractionDigits="2"
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
              :maxFractionDigits="2"
        mode="decimal"
        v-on:childToParent="getUserInput"
        v-model="formData.timeslot_delivery_fixed_hours"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["deliveryIdx"],
  data() {
    return {
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
      setBikeDeliveryData:
        "AddNewInternationalLocal/Ecommerce/setBikeDeliveryData",
    }),
    getUserInput(label, value) {
      this.setBikeDeliveryData({
        type: "other",
        otherField: label,
        data: value,
        idx: this.$props.deliveryIdx,
      });
    },
    prefillData() {
      this.formData.timeslot_delivery =
        this.bike?.delivery_type[this.$props.deliveryIdx].timeslot_delivery ||
        "";
      this.formData.timeslot_delivery_fixed_hours =
        this.bike?.delivery_type[this.$props.deliveryIdx]
          .timeslot_delivery_fixed_hours || "";
    },
  },
  mounted() {
    this.prefillData();
  },
};
</script>

<style>
</style>