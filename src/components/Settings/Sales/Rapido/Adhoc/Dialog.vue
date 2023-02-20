<template>
  <Dialog
    v-model:visible="$store.state['rapidoAdhoc'].displayDialog"
    :style="{
      width: getWidth(),
      height: getHeight(),
    }"
    :breakpoints="{'960px': '75vw', '640px': '100vw'}"
    :modal="true"
  >
    <!-- dialog header / -->
    <template #header>{{ $store.state["rapidoAdhoc"].dialogHeader }}</template>
    <!--rendering dynamic components inside the dialog-->
    <component v-bind:is="dialogComponent" class="tab"> </component>
  </Dialog>
</template>
<script>
import Dialog from "primevue/dialog";
//dialogs
// Zones
import AddNewdialog from "./Dialogs/AddNewdialog.vue";
import AddNewZonesdialog from "./Dialogs/AddNewZonesdialog.vue";
import AddAdditionalSurcharges from "./Dialogs/AddAdditionalSurcharges.vue";
import AddSurcharges from "../Adhoc/Dialogs/AddSurcharges.vue";
import AddOnDemandService from "../Adhoc/Dialogs/AddOnDemandService.vue";
import AddZones from "./Dialogs/AddZones.vue";
import AddNewRate from "./Dialogs/AddNewRate.vue";
import AddEcommerce from "./Dialogs/AddEcommerce.vue";
import AddZone from "../Adhoc/Dialogs/Zones/AddZone.vue";
import AddZonalRates from "../Adhoc/Dialogs/ZonalRates/AddZonalRates.vue";
import AddEffectiveDates from "../Adhoc/Dialogs/EffectiveDates/AddEffectiveDates.vue";
import EditZoneRange from "../Adhoc/Dialogs/EditZoneRange.vue";
import CloneRateCard from "../Adhoc/Dialogs/CloneRateCard.vue";
import CloneZoneRange from "./Dialogs/CloneZoneRange.vue";
import EditEcommerceDialog from "./Dialogs/EditEcommerceDialog.vue";
import AddDeliveryTypeRates from "./Dialogs/AddDeliveryTypeRates.vue";
export default {
  props: ["displayDialog", "dialogComponent"],
  methods: {
    getHeight() {},
    getWidth() {
      if (
        this.dialogComponent == "AddNewRate" ||
        this.dialogComponent == "AddOnDemandService"
      ) {
        return "70vw";
      } else {
        return "50vw";
      }
    },
  },
  components: {
    Dialog,
    AddNewdialog,
    AddNewZonesdialog,
    AddZones,
    AddNewRate,
    EditEcommerceDialog,
    EditZoneRange,
    AddZone,
    AddZonalRates,
    AddEcommerce,
    AddSurcharges,
    AddEffectiveDates,
    CloneZoneRange,
    AddAdditionalSurcharges,
    AddOnDemandService,
    CloneRateCard,
    AddDeliveryTypeRates,
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
