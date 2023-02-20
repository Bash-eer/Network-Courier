<template>
   <FleetManagementTables
    tableClass="p-datatable-sm FleetsTable"
    tableDataName="FleetMaintenanceData"
    tableName="FleetDialogTable"
    :tableData="$store.state['fleets']['fleetMaintenanceSettingFuelTableData']"
    :tableColumns="$store.state['fleets']['fleetMaintenanceSettingFuelTableColumnData']"
    dataKey="id"
  />
</template>

<script>
export default {
   name:"FleetManagementFuelHistory",

}
</script>

<style>

</style>