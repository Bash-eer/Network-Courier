<template>
  <Tabs v-bind:tabMenuData="tabMenuData" type="salesHome" />
  <ContractApprovalDialog
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['salesApproval'].dialogComponent"
  />
  <Toasts
    :severity="$store.state['salesApproval'].toastData.severity"
    :summary="$store.state['salesApproval'].toastData.summary"
  />
</template>

<script>
import Tabs from "../../../components/Sales/Approvals/Tabs.vue";
import { ApprovalMainTabMenuData } from "../../../components/Sales/Approvals/Const";
import ContractApprovalDialog from "../../../components/Sales/Approvals/Dialog.vue";
import Toasts from "../../../components/Sales/Approvals/Toast.vue";
export default {
  name: "SalesHome",
  components: { Tabs, ContractApprovalDialog, Toasts },

  data: () => ({
    tabMenuData: ApprovalMainTabMenuData,
  }),
  created() {
    this.$store.dispatch("salesApproval/loadApprovalContracts");
  },
};
</script>

<style></style>
<style scoped></style>
