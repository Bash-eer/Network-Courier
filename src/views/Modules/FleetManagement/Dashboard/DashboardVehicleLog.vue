<template>
  <div class="card vehicleMapCard">
    <Map />
  </div>
  <div class="flex justify-content-between pl-4 pr-4 pt-5 pb-3">
    <div class="flex maintenanceHeaderText">Vehicle Log</div>
    <div class="flex pt-1"><i class="pi pi-ellipsis-h" /></div>
  </div>
  <div class="pl-4 pr-4 pb-3">
    <FleetManagementSubTables
      :key="dashboardVehicleLogData"
      tableClass="p-datatable-sm vehicleLogTable"
      tableDataName="vehicleLogTableData"
      tableName="vehicleLogTable"
      :tableData="dashboardVehicleLogData"
      :tableColumns="$store.state['fleets']['vehicleLogTableColumnData']"
      dataKey="id"
    />
  </div>
</template>

<script>
export default {
  name: "DashboardVehicleLog",
  data: () => ({
    dashboardVehicleLogData: null,
  }),
  watch: {
    "$store.state.fleets.vehicleLogTableData": function () {
      this.dashboardVehicleLogData =
        this.$store.state.fleets.vehicleLogTableData;
    },
  },
};
</script>

<style>
.vehicleMapCard {
  height: 300px;
  border-radius: 0px 0px 10px 10px !important;
}
.map {
  border-radius: 0px 0px 10px 10px !important;
}
</style>
