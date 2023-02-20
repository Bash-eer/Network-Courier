<template>
  <!-- INSURANCE -->
  <span v-if="dashboardInsuranceData != null">
    <div class="card vehiclesDetailsCard m-4 p-3">
      <div class="grid pt-3 pl-3 pr-3">
        <div class="col-4">
          <div class="flex flex-column h-100">
            <div class="flex align-items-center h-100">
              <div class="flex flex-column maintenanceHeaderText">
                <div class="flex maintenanceHeaderText">Insurance Overview</div>
                <div class="flex maintenanceInfoText pt-2">
                  Last insurance done on
                  {{ dashboardInsuranceData["last_insurence_date"] }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4 pr-4 pl-4 pt-5">
          <CircularProgress
            v-if="$store.state.fleets.vehicleDashboardTab == 'Insurance'"
            :percentage="dashboardInsuranceData['remaining_days_percentage']"
            :actualValue="dashboardInsuranceData['remaining_days']"
            color="#FF5656"
            type="tabInsuranceDays"
            label="Insurance"
            img=""
          />
        </div>
        <div class="col-4 pr-4 pl-4 pt-5">
          <CircularProgress
            v-if="$store.state.fleets.vehicleDashboardTab == 'Insurance'"
            :percentage="dashboardInsuranceData['claims_percentage']"
            :actualValue="dashboardInsuranceData['total_claims']"
            color="#8278F8"
            type="tabInsuranceClaims"
            label="Insurance"
            img=""
          />
        </div>
      </div>
    </div>
    <!-- INSURANCE REPORT -->
    <div class="card vehiclesDetailsCard m-4 mt-6">
      <div class="flex justify-content-between p-3">
        <div class="flex tabHeading">Insurance History</div>
        <div class="flex pt-1"><i class="pi pi-ellipsis-h" /></div>
      </div>
      <div class="pl-4 pr-4 pb-4">
        <FleetManagementSubTables
          tableClass="p-datatable-sm vehicleLogTable"
          tableDataName="insuranceHistoryTableData"
          tableName="Insurance Report"
          :tableData="
            $store.state['fleets']['vehicleDashBoardInsuranceReportTableData']
          "
          :tableColumns="
            $store.state['fleets'][
              'vehicleDashBoardInsuranceReportTableColumnData'
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
  name: "DashboardInsurance",
  data: () => ({
    dashboardInsuranceData: null,
  }),
  watch: {
    "$store.state.fleets.vehicleDashBoardInsuranceCircles": function () {
      if (this.$store.state.fleets.vehicleDashBoardInsuranceCircles != null) {
        this.dashboardInsuranceData =
          this.$store.state.fleets.vehicleDashBoardInsuranceCircles;
      }
    },
  },
};
</script>

<style></style>
