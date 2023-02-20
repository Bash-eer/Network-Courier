<template>
  <Dialog
    v-model:visible="$store.state['salesInternationalContract'].displayDialog"
    :style="{
      width: getWidth(),
      height: getHeight(),
    }"
    :breakpoints="{'960px': '75vw', '640px': '100vw'}"
    :modal="true"
  >
    <template #header>{{
      $store.state["salesInternationalContract"].dialogHeader
    }}</template>

    <component v-bind:is="dialogComponent" class="tab"> </component>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import UploadDialog from "../../../../../../../components/Sales/Common/Dialogs/Attachments.vue";
import AddFollowUP from "../../../../../../../components/Sales/Common/Dialogs/FollowUp.vue";
import AddCostCenter from "../../../../../../../components/Sales/Common/Dialogs/CostCenter.vue";
import BillingPreference from "../../../../../../../components/Sales/Common/Dialogs/BillPreferences.vue";
import InternationalContractQuotationDialog from "../../../../../../Sales/Sales/Dialogs/Common/International/Contract/Index.vue";
export default {
  props: ["displayDialog", "dialogComponent"],
  methods: {
    getHeight() {},
    getWidth() {
      if (this.dialogComponent == "PermitChargesDialog") {
        return "43vw";
      } else if (
        this.dialogComponent == "StorageChargesDialog" &&
        this.dialogComponent == "PermitChargesDialog"
      ) {
        return "70vw";
      }

      return "50vw";
    },
    closeDialog() {},
  },
  components: {
    Dialog,
    UploadDialog,
    AddFollowUP,
    AddCostCenter,
    BillingPreference,
    InternationalContractQuotationDialog,
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
