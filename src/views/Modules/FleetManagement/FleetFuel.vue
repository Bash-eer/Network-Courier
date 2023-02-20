<template>
  <FleetManagementTables
    tableClass="p-datatable-sm FleetsTable"
    tableDataName="FleetFuelData"
    :overlayData="$store.state['fleets']['FleetFuelOverlayData']"
    tableName="FleetFuelTable"
    :tableData="$store.state['fleets']['fleetFuelTableData']"
    :tableColumns="$store.state['fleets']['fleetFuelTableColumnData']"
    dataKey="id"
  />
</template>

<script>
export default {
  name: "FleetFuel",
  created() {
    this.$store.commit("users/updateBreadCrumb", "FleetFuel");
    this.$store.dispatch("fleets/loadVehicleCommons", {
      type: "Fuel",
      path: "fuel",
      mutation: "fetchFuelTableData",
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
::v-deep .fleetsSubTable .p-datatable-thead > tr > th {
  background-color: #edf1f7 !important;
}
.fleetsSubTable .p-datatable-row-expansion:not(.p-highlight):hover {
  outline: thin !important;
  outline-style: solid !important;
  outline-color: #ffffff !important;
  border-color: #ffffff !important;
}
.FleetsTable .p-datatable-row-expansion > td {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  color: #4e5968;
  word-wrap: break-word !important;
  width: 0px !important;
  padding: 0px !important;
}
</style>
