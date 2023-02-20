<template>
  <div>
    <component
      tableClass="p-datatable-sm  RolesAccessTable"
      tableName="CustomTreeTable"
      tableDataName="userTypesRolesAccessTableData"
      :tableData="$store.state.userTypesRolesAccessTableData"
      :tableColumns="$store.state.userTypesRolesAccessTableColumns"
      v-bind:is="componentName"
      :globalSearchString="$store.state.globalSearch"
    ></component>
  </div>
</template>

<script>
export default {
  name: "UsersTypesRolesModuleRights",
  data: () => ({
    componentName: "CustomTreeTable",
  }),
};
</script>

<style></style>
