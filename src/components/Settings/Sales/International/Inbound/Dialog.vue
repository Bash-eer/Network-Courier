<template>
  <Dialog
    v-model:visible="$store.state['internationalInbound'].displayDialog"
    :style="{
      width: getWidth(),
      height: getHeight(),
    }"
    :breakpoints="{'960px': '75vw', '640px': '100vw'}"
    :modal="true"
  >
    <!--dialog header-->
    <template #header>{{
      $store.state["internationalInbound"].dialogHeader
    }}</template>
    <!--rendering dynamic components inside the dialog-->
    <component v-bind:is="dialogComponent" class="tab"> </component>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import GstTypeDialog from "./Dialogs/GstType.vue";
import PermitChargesDialog from "./Dialogs/PermitCharges.vue";
import PermitCharges1Dialog from "./Dialogs/PermitCharges1.vue";
import AddNewSurchargeDialog from "./Dialogs/AddNewSurcharge.vue";
import AddCurrencyExchangeDialog from "./Dialogs/AddCurrencyExchange.vue";
import EditCurrencyExchangeDialog from "./Dialogs/EditCurrencyExchange.vue";
import AddNewQuestionnaireDialog from "./Dialogs/AddNewQuestionnaire.vue";
import AdditionalChargesDialog from "./Dialogs/AdditionalCharges.vue";
import AddClearanceModeDialog from "./Dialogs/AddClearanceMode.vue";
import EditClearanceModeDialog from "./Dialogs/EditClearanceMode.vue";
import AddOthersModeDialog from "./Dialogs/AddOthersMode.vue";
import StorageChargesDialog from "./Dialogs/StorageCharges.vue";
import OtherChargesDialog from "./Dialogs/OtherCharges.vue";
import ClearanceAndAdditionalEdit from "./Dialogs/ClearanceAndAdditionalEdit.vue";
import ClearanceEdit from "./Dialogs/ClearanceEdit.vue";
import AdditionalRateEdit from "./Dialogs/AdditionalRateEdit.vue"
export default {
  props: ["displayDialog", "dialogComponent"],
  methods: {
    getHeight() {
      // if (this.dialogComponent == "ResetConfirmation") {
      //   return "35vh";
      // }
    },
    getWidth() {
      if (this.dialogComponent == "PermitChargesDialog") {
        return "43vw";
      } else if (this.dialogComponent == "StorageChargesDialog") {
        return "80vw";
      }
      return "50vw";
    },
    closeDialog() {
      // this.$store.state["users"].displayDialog = false;
    },
  },
  components: {
    Dialog,
    GstTypeDialog,
    PermitChargesDialog,
    PermitCharges1Dialog,
    AddNewSurchargeDialog,
    AddNewQuestionnaireDialog,
    AddCurrencyExchangeDialog,
    EditCurrencyExchangeDialog,
    AdditionalChargesDialog,
    StorageChargesDialog,
    AddOthersModeDialog,
    AddClearanceModeDialog,
    EditClearanceModeDialog,
    OtherChargesDialog,
    ClearanceAndAdditionalEdit,
    ClearanceEdit,
    AdditionalRateEdit
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
