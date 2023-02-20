<template>
  <Dialog
    v-model:visible="$store.state['commonStore'].displayDialog"
    :style="{
      width: getWidth(),
      height: getHeight(),
    }"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :modal="true"
  >
    <template #header>
      <div class="flex justify-content-between w-full">
        <div class="flex flex-column">
          <span>{{ $store.state["commonStore"].dialogHeader }}</span>
          <span class="m-0 p-0 font-size-12 color-4e5968">{{
            $store.state["commonStore"].dialogHeaderId
          }}</span>
        </div>
      </div>
    </template>
    <component v-bind:is="dialogComponent" class="tab"> </component>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import ExpansionContents from "../../../components/Sales/Sales/Bulk Adjustment/ExpansionContents.vue";
import PromoteToContract from "../../../components/Settings/Quotation/Dialog/PromoteToContract.vue";
import CRMClientDialog from "../../CRM/Dialogs/ClientDetails.vue";
import CRMClientContact from "../../CRM/Dialogs/contactDetails.vue";
//
export default {
  props: ["displayDialog", "dialogComponent"],
  components: {
    Dialog,
    ExpansionContents,
    PromoteToContract,
    CRMClientDialog,
    CRMClientContact,
  },
  methods: {
    getHeight() {},
    getWidth() {
      if (this.dialogComponent == "CRMClientContact") {
        return "50vw";
      }
      return "80vw";
    },
  },
  created() {},
};
</script>
<style scoped></style>
