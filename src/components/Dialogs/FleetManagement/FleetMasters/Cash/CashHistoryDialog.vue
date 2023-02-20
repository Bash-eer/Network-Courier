<template>
  <FleetManagementTables
    tableClass="p-datatable-sm FleetsTable"
    tableDataName="FleetMaintenanceData"
    tableName="FleetDialogTable"
    :tableData="$store.state['masters']['fleetMaintenanceSettingCashTableData']"
    :tableColumns="
      $store.state['masters']['fleetMaintenanceSettingCashTableColumnData']
    "
    dataKey="id"
  />
</template>

<script>
export default {
  name: "FleetManagementCashHistory",
};
</script>

<style></style>
