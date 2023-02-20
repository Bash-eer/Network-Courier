<template>
  <SalesTabs
    v-bind:tabMenuData="$store.state.sales.salesTabMenuData"
    type="salesHome"
  />
</template>

<script>
export default {
  name: "SaleHome",
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

<style>
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
