<template>
  <Dialog
    v-model:visible="$store.state['salesInternationalAdhoc'].displayDialog"
    :style="{
      width: getWidth(),
      height: getHeight(),
    }"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :modal="true"
  >
    <template #header>{{
      $store.state["salesInternationalAdhoc"].dialogHeader
    }}</template>

    <component v-bind:is="dialogComponent" class="tab"> </component>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import InternationalAdhocQuotationDialog from "../../../../../Sales/Dialogs/Common/International/Adhoc/InternationalAdhocDialogOne";
import UploadDialog from "../../../../../../../components/Sales/Common/Dialogs/Attachments.vue";
import FollowUp from "./../../../../../../../components/Sales/Common/Dialogs/FollowUp.vue";

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
    FollowUp,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
</style>
