<template>
  <!-- SUMMONS -->
  <span v-if="dashboardSummonsData != null">
    <div class="card vehiclesDetailsCard m-4 p-3">
      <div class="grid pt-3 pl-3 pr-3">
        <div class="col-4">
          <div class="flex flex-column h-100">
            <div class="flex align-items-center h-100">
              <div class="flex flex-column maintenanceHeaderText">
                <div class="flex maintenanceHeaderText">Summons Overview</div>
                <div class="flex maintenanceInfoText pt-2">
                  Last Summon was on
                  {{ dashboardSummonsData["last_summon_date"] }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4 pr-4 pl-4 pt-5">
          <CircularProgress
            v-if="$store.state.fleets.vehicleDashboardTab == 'Summon'"
            :percentage="100"
            :actualValue="dashboardSummonsData['total_summons']"
            color="FF5656"
            type="tabSummons"
            label="Summon"
            img=""
          />
        </div>
        <div class="col-4 pr-4 pl-4 pt-5">
          <CircularProgress
            v-if="$store.state.fleets.vehicleDashboardTab == 'Summon'"
            :percentage="100"
            :actualValue="dashboardSummonsData['total_fine']"
            color="#8278F8"
            type="tabSummonsFine"
            label="Summon"
            img=""
          />
        </div>
      </div>
    </div>
    <!-- SUMMONS REPORT -->
    <div class="card vehiclesDetailsCard m-4 mt-6">
      <div class="flex justify-content-between p-3">
        <div class="flex tabHeading">Summons History</div>
        <div class="flex pt-1"><i class="pi pi-ellipsis-h" /></div>
      </div>
      <div class="pl-4 pr-4 pb-4">
        <FleetManagementSubTables
          tableClass="p-datatable-sm vehicleLogTable"
          tableDataName="summonsTableData"
          tableName="Summons Report"
          :tableData="
            $store.state['fleets']['vehicleDashBoardSummonsReportTableData']
          "
          :tableColumns="
            $store.state['fleets'][
              'vehicleDashBoardSummonsReportTableColumnData'
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
  name: "DashboardSummon",
  data: () => ({
    dashboardSummonsData: null,
  }),
  watch: {
    "$store.state.fleets.vehicleDashBoardSummonsCircles": function () {
      if (this.$store.state.fleets.vehicleDashBoardSummonsCircles != null) {
        this.dashboardSummonsData =
          this.$store.state.fleets.vehicleDashBoardSummonsCircles;
      }
    },
  },
};
</script>

<style></style>
