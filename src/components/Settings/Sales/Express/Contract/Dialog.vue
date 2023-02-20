<template>
  <Dialog
    v-model:visible="$store.state['expressContract'].displayDialog"
    :style="{
      width: getWidth(),
      height: getHeight(),
    }"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :modal="true"
  >
    <!--dialog header-->
    <template #header>{{
      $store.state["expressContract"].dialogHeader
    }}</template>
    <!--rendering dynamic components inside the dialog-->
    <component v-bind:is="dialogComponent" class="tab"> </component>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
//dialogs
//region
import AddNewRegion from "./Dialogs/Regions/AddNewRegion.vue";
//rate
import AddNewRate from "./Dialogs/Rates/AddNewRate.vue";
import CloneRateCardDialog from "./Dialogs/CloneRateCard.vue";
import BikeCustomerVanjobEdit from "./components/BikeCustomerVanjobEdit.vue";
import AddECommerceRates from "./Dialogs/Rates/E-commerce/AddECommerceRates.vue";
import EcommerceEdit from "./components/EcommerceEdit.vue";
import BikeRatesEdit from "./Dialogs/CRUDDialogues/BikeRatesEdit.vue";
import BikeTripsEdit from "./Dialogs/CRUDDialogues/BikeTripsEdit.vue";
import ECommerceEditTwo from"./components/ECommerceEditTwo.vue";
import SurchargesEdit from "./components/SurchargesEdit.vue";
import AdditionalSurchargesEdit from "./Dialogs/CRUDDialogues/AdditionalSurchargesEdit.vue";
import ECommereceChargeByWeightEdit from "./Dialogs/CRUDDialogues/ECommereceChargeByWeightEdit.vue";
export default {
  props: ["displayDialog", "dialogComponent"],
  methods: {
    getHeight() {},
    getWidth() {
      if (this.dialogComponent == "AddNewRegion") {
        return "55vw";
      }
      return "50vw";
    },
    // closeDialog() {
    //   this.$store.dispatch("expressContract/closeDialog");
    // },
  },
  components: {
    Dialog,
    AddNewRegion,
    AddNewRate,
    CloneRateCardDialog,
    BikeCustomerVanjobEdit,
    AddECommerceRates,
    EcommerceEdit,
     BikeRatesEdit,
     BikeTripsEdit,
     ECommerceEditTwo,
     SurchargesEdit,
     AdditionalSurchargesEdit,
     ECommereceChargeByWeightEdit,
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
