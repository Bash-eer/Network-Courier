<template>
  <!-- FUEL -->
  <span v-if="dashboardFuelData != null">
    <div class="card vehiclesDetailsCard m-4 p-3">
      <p class="flex maintenanceHeaderText">Fuel Metrics</p>
      <div class="grid">
        <div class="col-4 pl-4 pr-4 pt-4">
          <CircularProgress
            v-if="$store.state.fleets.vehicleDashboardTab == 'Fuel'"
            :percentage="100"
            :actualValue="dashboardFuelData['total_usage']"
            color="#17C079"
            type="tabFuel"
            label="Fuel Usage"
            img=""
          />
        </div>
        <div class="col-4 pl-4 pr-4 pt-4">
          <CircularProgress
            v-if="$store.state.fleets.vehicleDashboardTab == 'Fuel'"
            :percentage="100"
            :actualValue="dashboardFuelData['toatal_distance']"
            color="#FDB3B3"
            type="tabDistance"
            label="Distance"
            img=""
          />
        </div>
        <div class="col-4 pl-4 pr-4 pt-4">
          <CircularProgress
            v-if="$store.state.fleets.vehicleDashboardTab == 'Fuel'"
            :percentage="100"
            :actualValue="dashboardFuelData['average_milage']"
            color="#357DEA"
            type="tabMileage"
            label="Mileage"
            img=""
          />
        </div>
      </div>
    </div>
    <!-- FUEL REPORT -->
    <div class="card vehiclesDetailsCard m-4 mt-6">
      <div class="flex justify-content-between p-3">
        <div class="flex tabHeading">Fuel Report</div>
        <div class="flex pt-1"><i class="pi pi-ellipsis-h" /></div>
      </div>
      <div class="pl-4 pr-4 pb-4">
        <FleetManagementSubTables
          tableClass="p-datatable-sm vehicleLogTable"
          tableDataName="fuelReportTableData"
          tableName="Fuel Report"
          :tableData="
            $store.state['fleets']['vehicleDashBoardFuelReportTableData']
          "
          :tableColumns="
            $store.state['fleets']['vehicleDashBoardFuelReportTableColumnData']
          "
          dataKey="id"
        />
      </div>
    </div>
  </span>
</template>

<script>
export default {
  name: "DashboardFuel",
  data: () => ({
    dashboardFuelData: null,
  }),
  watch: {
    "$store.state.fleets.vehicleDashBoardFuelCircles": function () {
      if (this.$store.state.fleets.vehicleDashBoardFuelCircles != null) {
        this.dashboardFuelData =
          this.$store.state.fleets.vehicleDashBoardFuelCircles;
      }
    },
  },
};
</script>

<style></style>
