<template>
  <Dialog
    v-model:visible="$store.state['expressAdhoc'].displayDialog"
    :style="{
      width: getWidth(),
      height: getHeight(),
    }"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :modal="true"
  >
    <!--dialog header-->
    <template #header>{{ $store.state["expressAdhoc"].dialogHeader }}</template>
    <!--rendering dynamic components inside the dialog-->
    <component v-bind:is="dialogComponent" class="tab"> </component>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
//dialogs
//rate
import AddNewRate from "./Dialogs/Rates/AddNewRate.vue";
import AddNewZone from "./Dialogs/Zones/AddNewZone.vue";
import SecondPageAddNew from "./Dialogs/SecondPageAddNew.vue";
import CloneRateCard from "./Dialogs/CloneRateCard.vue";
import CloneZoneRange from "./Dialogs/CloneZoneRange.vue";
import AddNewDeliveryRates from "./Dialogs/AddNewDeliveryRates.vue";
import EditZoneRangeDialog from "./Dialogs/EditZoneRange.vue";
import AddEcommerceBike from "./Dialogs/AddEcommerceBike.vue";
import AddEcommerceVan from "./Dialogs/AddEcommerceVan.vue";
import AddAdditionalSurcharges from "./Dialogs/AddAdditionalSurcharges.vue";
import AddNewNormalBike from "./Dialogs/AddNewNormalBike.vue";
import AddSurcharges from "./Dialogs/AddSurcharges.vue";
import AddNewOne from "./Dialogs/AddNewOne.vue";
import AddNewAdditionalSurcharges from "./Dialogs/AddNewAdditionalSurcharges.vue";
export default {
  props: ["displayDialog", "dialogComponent"],
  methods: {
    getHeight() {},
    getWidth() {
      if (this.dialogComponent == "AddNewRate") {
        return "55vw";
      } else return "50vw";
    },
    closeDialog() {},
  },
  components: {
    Dialog,
    AddNewRate,
    AddNewZone,
    CloneRateCard,
    CloneZoneRange,
    EditZoneRangeDialog,
    AddAdditionalSurcharges,
    AddNewNormalBike,
    AddNewDeliveryRates,
    AddSurcharges,
    AddNewOne,
    AddEcommerceVan,
    AddEcommerceBike,
    AddNewAdditionalSurcharges,
    SecondPageAddNew,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.activityLogHeader {
  color: #7e84a7;
  font-size: 11px;
}
.dialogToggleText {
  font-weight: bold;
}
</style>
