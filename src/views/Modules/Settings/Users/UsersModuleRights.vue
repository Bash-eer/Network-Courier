<template>
  <div>
    <component
      tableClass="p-datatable-sm  RolesAccessTable"
      tableName="CustomTreeTable"
      tableDataName="rolesAccessTableData"
      :tableData="$store.state.users.rolesAccessTableData"
      :tableColumns="$store.state.users.rolesAccessTableColumns"
      v-bind:is="componentName"
      :globalSearchString="$store.state.users.globalSearch"
    ></component>
  </div>
</template>

<script>
export default {
  name: "UsersModuleRights",
  data: () => ({
    componentName: "CustomTreeTable",
  }),
  mounted() {
    this.$store.state.users.tableComponent = "TreeTable";
    this.$store.state.users.rolesId = this.$route.params.id;
    this.$store.commit("users/updateBreadCrumb", "RolesNetworkcourierId");
  },
};
</script>

<style scoped></style>
