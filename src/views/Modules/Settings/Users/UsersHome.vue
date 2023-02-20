<template>
  <BootstrapTabs
    userPath="usersHomePath"
    storePath="users"
    v-bind:tabMenuData="$store.state.users.tabMenuData"
    tabs="needed"
  />
</template>

<script>
export default {
  name: "UsersHome",
  props: ["usersPath"],
  created() {
    for (var tc in this.$store.state.users.tabCategories) {
      if (tc == 0) {
        this.$store.state.users.usersTabsValue =
          this.$store.state.users.tabCategories[tc].name;
      }
    }
    // this.$store.state.users.usersTabsValue = "Network Courier";
    this.$store.state.users.bootstrapTabsRolesKey = false;
    this.$store.state.users.previousTabsState = null;
    this.$store.state.users.previousDeliveryTabState = "International";
    this.$store.state.users.deliveryChoicesState = "International";
    this.$store.state.users.radioButtonTypesValue = null;
    this.$store.commit("users/updateBreadCrumb", "SettingsUsers");
    this.$store.dispatch("users/getUserPermissions");
  },
  mounted() {
    this.$store.state.users.bootstrapTabsRolesKey = false;
    this.$store.dispatch("users/getUserPermissions");
    this.$store.commit("users/updateBreadCrumb", "SettingsUsers");
    this.$store.dispatch("users/getAuthToken");
    this.$store.dispatch("users/setAuthToken");
    this.$store.dispatch("users/loadCompanyApi", {
      apiPath: "all",
      tag: "onlineUsers",
    });
    this.$store.dispatch("users/loadUsersApi", {
      apiPath: "internal",
      tag: "",
    });
    this.$store.dispatch("users/loadRolesDropDownApi", {
      apiPath: "/internal/internal",
      tag: "roles_dropdown",
    });
  },
};
</script>

<style scoped></style>
