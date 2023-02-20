<template>
  <!-- ACCIDENTS -->
  <span v-if="dashboardAccidentsData != null">
    <div class="card vehiclesDetailsCard m-4">
      <div class="grid pt-3 pl-3 pr-3">
        <div class="col-6">
          <div class="flex flex-column h-100">
            <div class="flex align-items-center h-100">
              <div class="flex flex-column maintenanceHeaderText pl-7">
                <div class="flex maintenanceHeaderText">Vehicle Accidents</div>
                <div class="flex maintenanceInfoText pt-2">
                  Last Accident was on
                  {{ dashboardAccidentsData["last_accident_date"] }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 tabCircles pt-6 pb-4 text-sm">
          <CircularProgress
            v-if="$store.state.fleets.vehicleDashboardTab == 'Accidents'"
            :percentage="dashboardAccidentsData['accident_percentage']"
            :actualValue="dashboardAccidentsData['total_accidents']"
            color="#EA2027"
            type="tabAccidents"
            label="Accidents"
            img=""
          />
        </div>
      </div>
    </div>
    <!-- ACCIDENTS REPORT -->
    <div class="card vehiclesDetailsCard m-4 mt-6">
      <div class="flex justify-content-between p-3">
        <div class="flex tabHeading">Accident History</div>
        <div class="flex pt-1"><i class="pi pi-ellipsis-h" /></div>
      </div>
      <div class="pl-4 pr-4 pb-4">
        <FleetManagementSubTables
          tableClass="p-datatable-sm vehicleLogTable"
          tableDataName="accidentsTableData"
          tableName="Accidents Report"
          :tableData="
            $store.state['fleets']['vehicleDashBoardAccidentsReportTableData']
          "
          :tableColumns="
            $store.state['fleets'][
              'vehicleDashBoardAccidentsReportTableColumnData'
            ]
          "
          dataKey="id"
        />
      </div>
    </div>
  </span>
</template>

<script>
export default {
  name: "DashboardAccidents",
  data: () => ({
    dashboardAccidentsData: null,
  }),
  watch: {
    "$store.state.fleets.vehicleDashBoardAccidentsCircles": function () {
      if (this.$store.state.fleets.vehicleDashBoardAccidentsCircles != null) {
        this.dashboardAccidentsData =
          this.$store.state.fleets.vehicleDashBoardAccidentsCircles;
      }
    },
  },
};
</script>

<style></style>
