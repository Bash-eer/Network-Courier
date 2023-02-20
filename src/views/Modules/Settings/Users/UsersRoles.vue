<template>
  <BootstrapTabs
    :key="$store.state.users.bootstrapTabsRolesKey"
    userPath="usersRolePath"
    storePath="users"
    v-bind:tabMenuData="$store.state.users.tabMenuRolesData"
    tabs="needed"
  />
</template>

<script>
export default {
  name: "Roles",

  mounted() {
    if (this.$store.state.users.previousTabsState == null) {
      for (var tc in this.$store.state.users.tabCategories) {
        if (tc == 0) {
          this.$store.state.users.usersTabsValue =
            this.$store.state.users.tabCategories[tc].name;
        }
      }
    }

    if (this.$store.state.users.usersTabsValue == "Online Customer") {
      this.$store.state.users.createRoleKey = true;
      this.$store.state.users.deliveryTypesTabsActual = "international";
      this.$store.state.users.deliveryTypestabs = "International";
      if (this.$store.state.users.previousTabsState == null) {
        this.$store.state.users.previousDeliveryTabState = "International";
      }
    }
    if (this.$store.state.users.usersTabsValue == "Network Courier") {
      this.$store.state.users.deliveryTypesTabsActual = "internal";
      this.$store.state.users.createRoleKey = false;
    }
    // if (this.$store.state.users.usersTabsValue == "Network Courier") {
    //   this.$store.state.users.deliveryTypestabs = null;
    // }
    // if (this.$store.state.users.previousTabsState == null) {
    //   this.$store.state.users.previousDeliveryTabState = "International";
    // }
    this.$store.state.users.deliveryChoicesState = "International";
    this.$store.state.users.radioButtonUsersValue = "Network Courier";
    this.$store.state.users.rolesTabSwitch = false;
    this.$store.dispatch("users/getUserPermissions");
    this.$store.commit("users/updateBreadCrumb", "SettingsRoles");
    this.$store.dispatch("users/getAuthToken");
    this.$store.dispatch("users/setAuthToken");
    this.$store.state.users.tableComponent = "OtherTables";
    this.$store.dispatch("users/loadRolesDropDownApi", {
      apiPath: "/internal/internal",
      tag: "roles_dropdown",
    });
    this.$store.dispatch("users/loadRolesApi", {
      apiPath: "/users",
      data: {
        user_type: "internal",
        customer_type: "internal",
      },
    });
  },
};
</script>

<style scoped>
/* ::v-deep .mb-4 {
  margin: 0px !important;
} */
</style>
