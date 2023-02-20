<template>
  <div class="flex align-items-end mt-3">
    <div class="input-wrapper col-3">
      <div class="label flex align-items-start mb-2">Timeslot Delivery ($)</div>
      <NumberField
        label="timeslot_delivery"
        mode="decimal"
        :maxFractionDigits="2"
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
        :maxFractionDigits="2"
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
      van: "AddNewInternationalLocal/Ecommerce/van",
    }),
  },
  methods: {
    ...mapActions({
      setVanDeliveryData:
        "AddNewInternationalLocal/Ecommerce/setVanDeliveryData",
    }),
    getUserInput(label, value) {
      this.setVanDeliveryData({
        type: "other",
        otherField: label,
        data: value,
        idx: this.$props.deliveryIdx,
      });
    },
    prefillData() {
      this.formData.timeslot_delivery =
        this.van?.delivery_type[this.$props.deliveryIdx].timeslot_delivery ||
        "";
      this.formData.timeslot_delivery_fixed_hours =
        this.van?.delivery_type[this.$props.deliveryIdx]
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