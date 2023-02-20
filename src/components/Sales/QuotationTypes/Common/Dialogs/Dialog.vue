<template>
  <Dialog
    v-model:visible="$store.state['salesCommon'].displayDialog"
    :style="{
      width: getWidth(),
      height: getHeight(),
    }"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :modal="true"
  >
    <template #header>{{ $store.state["salesCommon"].dialogHeader }}</template>

    <component v-bind:is="dialogComponent" class="tab"> </component>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import Attachment from "./Attachments.vue";
import FollowUp from "./FollowUp.vue";
import CostCenter from "./CostCenter/Express/Index.vue";
import InternationalCostCenter from "./CostCenter/International.vue";
import BillPreferences from "./BillPreferences.vue";
import SiteOfficeHistory from "./CostCenter/Express/SiteOfficeHistory.vue"

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
      else if (
        this.dialogComponent == "SiteOfficeHistory"
      ) {
        return "80vw";
      }

      return "53vw";
    },
    closeDialog() {},
  },
  components: {
    Dialog,
    Attachment,
    FollowUp,
    CostCenter,
    BillPreferences,
    InternationalCostCenter,
    SiteOfficeHistory
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
</style>
