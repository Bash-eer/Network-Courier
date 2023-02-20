<template>
  <Dialog
    v-model:visible="
      $store.state['salesExpressContractProjectJobs'].displayDialog
    "
    :style="{
      width: getWidth(),
      height: getHeight(),
    }"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :modal="true"
  >
    <template #header>{{
      $store.state["salesExpressContractProjectJobs"].dialogHeader
    }}</template>

    <component v-bind:is="dialogComponent" class="tab"> </component>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import Upload from "../../../../../../../../components/Sales/Common/Dialogs/Attachments.vue";
import AddFollowUp from "../../../../../../../../components/Sales/Common/Dialogs/FollowUp.vue";
import AddCostCenter from "../../../../../../../../components/Sales/Common/Dialogs/CostCenter.vue";
import AddBillPerferences from "../../../../../../../../components/Sales/Common/Dialogs/BillPreferences.vue";
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
    Upload,
    AddFollowUp,
    AddCostCenter,
    AddBillPerferences,
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
