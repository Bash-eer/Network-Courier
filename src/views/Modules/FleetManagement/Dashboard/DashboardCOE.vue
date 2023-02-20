<template>
  <!-- ROAD TAX -->
  <span v-if="dashboardCOEData != null">
    <div class="card vehiclesDetailsCard m-4 p-3">
      <div class="grid pt-3 pl-3 pr-3">
        <div class="col-4">
          <div class="flex flex-column h-100">
            <div class="flex align-items-center h-100">
              <div class="flex flex-column maintenanceHeaderText">
                <div class="flex maintenanceHeaderText">COE Overview</div>
                <div class="flex maintenanceInfoText pt-2">
                  Last COE done on
                  {{ dashboardCOEData["last_coe_date"] }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4 pr-4 pl-4 pt-5">
          <CircularProgress
            v-if="$store.state.fleets.vehicleDashboardTab == 'COE'"
            :percentage="75"
            actualValue="20"
            color="#FF5656"
            type="tabCOEDays"
            label="COE"
            img=""
          />
        </div>
        <div class="col-4 pr-4 pl-4 pt-5">
          <CircularProgress
            v-if="$store.state.fleets.vehicleDashboardTab == 'COE'"
            :percentage="80"
            actualValue="3400"
            color="#8278F8"
            type="tabCOEAmount"
            label="COE"
            img=""
          />
        </div>
      </div>
    </div>
    <!-- ROAD TAX REPORT -->
    <div class="card vehiclesDetailsCard m-4 mt-6">
      <div class="flex justify-content-between p-3">
        <div class="flex tabHeading">COE History</div>
        <div class="flex pt-1"><i class="pi pi-ellipsis-h" /></div>
      </div>
      <div class="pl-4 pr-4 pb-4">
        <FleetManagementSubTables
          tableClass="p-datatable-sm vehicleLogTable"
          tableDataName="coeTaxHistoryTableData"
          tableName="COE Report"
          :tableData="$store.state['fleets']['vehicleDashBoardCOETableData']"
          :tableColumns="
            $store.state['fleets']['vehicleDashBoardCOETableColumnData']
          "
          dataKey="id"
        />
      </div>
    </div>
  </span>
</template>

<script>
export default {
  name: "DashboardCOE",
  data: () => ({
    dashboardCOEData: null,
  }),
  watch: {
    "$store.state.fleets.vehicleDashBoardRoadTaxCircles": function () {
      if (this.$store.state.fleets.vehicleDashBoardCOECircles != null) {
        this.dashboardCOEData =
          this.$store.state.fleets.vehicleDashBoardCOECircles;
      }
    },
  },
};
</script>

<style></style>
