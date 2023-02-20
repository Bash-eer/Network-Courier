<template>
  <FleetManagementSubTables
    tableClass="p-datatable-sm fleetsSubTable"
    tableDataName="fleetsSubTableData"
    :overlayData="$store.state['sales']['quotationOverlayData']"
    :tableName="name"
    :tableData="data"
    :tableColumns="columns"
    :dataKey="idkey"
  />
</template>

<script>
export default {
  name: "HistoryFleetTemplate",
  props: ["name", "data", "columns", "idkey"],
  data() {
    return {
      history: [],
    };
  },
};
</script>

<style></style>
