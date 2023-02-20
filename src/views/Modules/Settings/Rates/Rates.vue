<template>
  <RatesTabs
    v-bind:tabMenuData="$store.state.masters.mastersTabMenuData"
    type="ratesHome"
  />
</template>

<script>
export default {
  name: "Rates",
  created() {
    this.$store.dispatch("masters/setAuthToken");
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
    this.$store.state.users.radioButtonTypesValue = null;
  },
};
</script>

<style lang="scss">
.p-card {
  box-shadow: none !important;
}
</style>
