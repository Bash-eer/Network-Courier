<template>
  <!-- MAINTENANCE -->
  <span v-if="dashboardMaintenanceData != null">
    <div class="card vehiclesDetailsCard m-4">
      <div class="grid pt-3 pl-3 pr-3">
        <div class="col-4">
          <div class="flex flex-column h-100">
            <div class="flex align-items-center h-100">
              <div class="flex flex-column maintenanceHeaderText pl-7">
                <div class="flex maintenanceHeaderText">
                  Upcoming Maintenance
                </div>
                <div class="flex maintenanceInfoText pt-2">
                  Last maintenance done on
                  {{ dashboardMaintenanceData["last_maintenance_date"] }}
                  with 1524 Mileage
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4 pr-4 pl-4 pt-5">
          <CircularProgress
            v-if="$store.state.fleets.vehicleDashboardTab == 'Maintenance'"
            :percentage="dashboardMaintenanceData['remaining_km_percentage']"
            :actualValue="dashboardMaintenanceData['remaining_km']"
            color="#17C079"
            type="tabMaintenanceDistance"
            label="Maintenance"
            img=""
          />
        </div>
        <div class="col-4 pr-4 pl-4 pt-5">
          <CircularProgress
            v-if="$store.state.fleets.vehicleDashboardTab == 'Maintenance'"
            :percentage="dashboardMaintenanceData['remaining_date_percentage']"
            :actualValue="dashboardMaintenanceData['remaining_date']"
            color="#4834d4"
            type="tabMaintenanceDays"
            label="Maintenance"
            img=""
          />
        </div>
      </div>
    </div>
    <!-- MAINTENANCE REPORT -->
    <div class="card vehiclesDetailsCard m-4 mt-6">
      <div class="flex justify-content-between p-3">
      <div class="flex tabHeading">Maintenance Report</div>
      <div class="flex pt-1"><i class="pi pi-ellipsis-h" /></div>
    </div>
      <div class="pl-4 pr-4 pb-4">
        <FleetManagementTabs
          v-bind:tabMenuData="
            $store.state.fleets.vehicleDashBoardMaintenanceTabMenuData
          "
          type="fleetsVehiclesDashboard"
        />
      </div>
    </div>
  </span>
</template>

<script>
export default {
  name: "DashboardMaintenance",
  data: () => ({
    dashboardMaintenanceData: null,
  }),
  watch: {
    "$store.state.fleets.vehicleDashBoardMaintenanceCircles": function () {
      if (this.$store.state.fleets.vehicleDashBoardMaintenanceCircles != null) {
        this.dashboardMaintenanceData =
          this.$store.state.fleets.vehicleDashBoardMaintenanceCircles;
      }
    },
  },
};
</script>

<style>
.FleetVehicleDashboardMaintenance .p-paginator {
  background: #fff !important;
  border: 0 !important;
  width: 100% !important;
}
.FleetVehicleDashboardInspection .p-paginator {
  background: #fff !important;
  border: 0 !important;
  width: 100% !important;
}
.summary {
  display: table-cell;
  vertical-align: middle;
}
.tabCircles {
  padding-left: 12%;
  padding-right: 12%;
}
.maintenanceHeaderText {
  text-align: start;
  color: #4e5968;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
}
.maintenanceInfoText {
  color: #4e5968;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
}
</style>
