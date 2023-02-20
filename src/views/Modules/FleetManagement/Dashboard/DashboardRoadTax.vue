<template>
  <!-- ROAD TAX -->
  <span v-if="dashboardRoadTaxData != null">
    <div class="card vehiclesDetailsCard m-4 p-3">
      <div class="grid pt-3 pl-3 pr-3">
        <div class="col-4">
          <div class="flex flex-column h-100">
            <div class="flex align-items-center h-100">
              <div class="flex flex-column maintenanceHeaderText">
                <div class="flex maintenanceHeaderText">Roadtax Overview</div>
                <div class="flex maintenanceInfoText pt-2">
                  Last roadtax done on
                  {{ dashboardRoadTaxData["last_road_tax_date"] }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4 pr-4 pl-4 pt-5">
          <CircularProgress
            v-if="$store.state.fleets.vehicleDashboardTab == 'RoadTax'"
            :percentage="dashboardRoadTaxData['remaining_days_percentage']"
            :actualValue="dashboardRoadTaxData['remaining_days']"
            color="#FF5656"
            type="tabRoadTaxDays"
            label="Road Tax"
            img=""
          />
        </div>
        <div class="col-4 pr-4 pl-4 pt-5">
          <CircularProgress
            v-if="$store.state.fleets.vehicleDashboardTab == 'RoadTax'"
            :percentage="dashboardRoadTaxData['claims_percentage']"
            :actualValue="dashboardRoadTaxData['total_claims']"
            color="#8278F8"
            type="tabRoadTaxAmount"
            label="Road Tax"
            img=""
          />
        </div>
      </div>
    </div>
    <!-- ROAD TAX REPORT -->
    <div class="card vehiclesDetailsCard m-4 mt-6">
      <div class="flex justify-content-between p-3">
        <div class="flex tabHeading">Road Tax History</div>
        <div class="flex pt-1"><i class="pi pi-ellipsis-h" /></div>
      </div>
      <div class="pl-4 pr-4 pb-4">
        <FleetManagementSubTables
          tableClass="p-datatable-sm vehicleLogTable"
          tableDataName="roadTaxHistoryTableData"
          tableName="RoadTax Report"
          :tableData="
            $store.state['fleets']['vehicleDashBoardRoadTaxTableData']
          "
          :tableColumns="
            $store.state['fleets']['vehicleDashBoardRoadTaxTableColumnData']
          "
          dataKey="id"
        />
      </div>
    </div>
  </span>
</template>

<script>
export default {
  name: "DashboardRoadTax",
  data: () => ({
    dashboardRoadTaxData: null,
  }),
  watch: {
    "$store.state.fleets.vehicleDashBoardRoadTaxCircles": function () {
      if (this.$store.state.fleets.vehicleDashBoardRoadTaxCircles != null) {
        this.dashboardRoadTaxData =
          this.$store.state.fleets.vehicleDashBoardRoadTaxCircles;
      }
    },
  },
};
</script>

<style></style>
