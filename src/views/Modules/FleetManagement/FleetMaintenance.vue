<template>
  <div>
    <FleetManagementTabs
      v-bind:tabMenuData="$store.state.fleets.maintenanceTabMenuData"
      type="fleetMaintenance"
    />
  </div>
</template>

<script>
export default {
  name: "FleetMaintenance",
  created() {
    this.$store.commit("users/updateBreadCrumb", "FleetMaintenance");
    this.$store.dispatch("fleets/loadVehicleCommons", {
      type: "Maintenance",
      path: "maintenance",
      mutation: "fetchMaintenanceTableData",
    });
    this.$store.dispatch("fleets/loadVehicleCommons", {
      type: "Inspection",
      path: "inspection",
      mutation: "fetchInspectionTableData",
    });
    this.$store.dispatch("fleets/loadFleetDropDowns", {
      path: "inspectionCheck",
      mutation: "fetchInspectionDropDownTableData",
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
::v-deep .fleetsSubTable .p-datatable-thead > tr > th {
  background-color: #fff !important;
}
.fleetsSubTable .p-datatable-row-expansion:not(.p-highlight):hover {
  outline: thin !important;
  outline-style: solid !important;
  outline-color: #ffffff !important;
  border-color: #ffffff !important;
}
// .fleetsSubTable .p-datatable-row-expansion {
//   border-top: 0px !important;
//    border-bottom: 2px !important;
//   border-bottom-left-radius: 6px !important;
//   border-bottom-right-radius: 6px !important;
// }
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
