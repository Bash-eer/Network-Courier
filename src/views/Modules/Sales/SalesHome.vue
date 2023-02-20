<template>
  <MainTab v-bind:tabMenuData="tabMenuData" type="salesHome" />
  <SalesDialogs
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['salesSales'].dialogComponent"
  />
  <!--toast-->
  <Toasts
    :severity="$store.state['salesSales'].toastData.severity"
    :summary="$store.state['salesSales'].toastData.summary"
  />
</template>

<script>
import Toasts from "../../../components/Sales/Sales/Toast.vue";
import MainTab from "../../../components/Sales/MainTab.vue";
import { SalesMainTabMenuData } from "../../../components/Sales/Const";
import SalesDialogs from "../../../components/Sales/Sales/Dialog.vue";
export default {
  name: "SalesHome",
  components: { MainTab, SalesDialogs, Toasts },

  data: () => ({
    tabMenuData: SalesMainTabMenuData,
  }),
  created() {
    this.$store.dispatch("sales/setAuthToken");
    this.$store.dispatch("sales/loadSalesCompanies");
    for (var tc in this.$store.state.users.tabCategories) {
      if (tc == 0) {
        this.$store.state.users.usersTabsValue =
          this.$store.state.users.tabCategories[tc].name;
      }
    }
    this.$store.state.users.bootstrapTabsRolesKey = false;
    this.$store.state.users.previousTabsState = null;
    this.$store.state.users.previousDeliveryTabState = "International";
    this.$store.state.users.deliveryChoicesState = "International";
  },
  methods: {
    openDialog(name) {
      this.$store.state.users.displayDialog = true;
      this.$store.state.users.dialogComponent = name;
      this.$store.getters.controlActivityDialog;
    },
  },
};
</script>

<style scoped>
.DashboardTab .p-paginator {
  background: #edf1f7 !important;
  border: 0 !important;
  width: 100% !important;
}
.SalesTab .p-paginator {
  background: #edf1f7 !important;
  border: 0 !important;
  width: 100% !important;
}
</style>
