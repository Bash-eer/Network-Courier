<template>
  <Dialog
    v-model:visible="$store.state['salesApproval'].displayDialog"
    :style="{
      width: getWidth(),
      height: getHeight(),
    }"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :modal="true"
  >
    <!--dialog header-->
    <template #header>
      <!-- <div
        v-if="dialogComponent == 'ContractApprovalDialog'"
        class="flex justify-content-between w-full"
      >
        <div class="flex"><h4>Add</h4></div>
        <div class="flex mr-3">
          <img src="/images/avatar.png" alt="img" width="40" />
          <div class="flex flex-column ml-3 p-0">
            <p class="m-0 p-0">Sales person</p>
            <p class="m-0 p-0">Jasmine</p>
          </div>
        </div>
      </div> -->

      <div>
        {{ $store.state["salesApproval"].dialogHeader }}
      </div>
    </template>
    <!--rendering dynamic components inside the dialog-->
    <component v-bind:is="dialogComponent" class="tab"> </component>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
//dialogs
import ContractApprovalDialog from "./Dialogs/ContractApprovalDialog.vue";

//termination
import OverviewTerminationDialog from "../QuotationTypes/Common/Dialogs/Termination.vue";
import ApprovalsTerminationDialog from "./Dialogs/Termination.vue";
// //rate

export default {
  props: ["displayDialog", "dialogComponent"],
  methods: {
    getHeight() {},
    getWidth() {
      if (this.dialogComponent == "QuotationTypeDialog") {
        return "65vw";
      }
      if (this.dialogComponent == "ApprovalsTerminationDialog") {
        return "75vw";
      }

      return "60vw";
    },
  },
  components: {
    Dialog,
    ContractApprovalDialog,
    OverviewTerminationDialog,
    ApprovalsTerminationDialog,
  },
  created() {
    console.log("Created", this.dialogComponent);
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
