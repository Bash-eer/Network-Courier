<template>
  <Dialog
    v-model:visible="$store.state['salesExpressContractBikeProjectJobs'].displayDialog"
    :style="{
      width: getWidth(),
      height: getHeight(),
    }"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :modal="true"
  >
    <template #header>{{
      $store.state["salesExpressContractBikeProjectJobs"].dialogHeader
    }}</template>
    <component v-bind:is="dialogComponent" class="tab"> </component>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import Attachments from "../../../BikeProjectJobs/Overview/Dialog/Attachments.vue";
import AddFollowUp from "../../../BikeProjectJobs/Overview/Dialog/FollowUp.vue";
import CostCenter from "../../../BikeProjectJobs/Overview/Dialog/CostCenter.vue";
import BillingPreference from "../../../BikeProjectJobs/Overview/Dialog/BillPreferences.vue";

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
    Attachments,
    AddFollowUp,
    CostCenter,
    BillingPreference,
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
