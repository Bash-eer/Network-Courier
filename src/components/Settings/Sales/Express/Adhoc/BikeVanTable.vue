<template>
  <ThirdPageTable
    tableClass="p-datatable-sm AdhocBikeVanTable"
    tableDataName="TableName"
    :overlayData="TableOverlay"
    :tableName="TableName"
    :tableData="TableData"
    :tableColumns="TableColumns"
    dataKey="id"
  />
</template>

<script>
// import AdhocSubTable from "./Tables/AdhocSubTable.vue";
import ThirdPageTable from "./Tables/ThirdPageTable.vue";

export default {
  components: {
    // AdhocSubTable,
    ThirdPageTable,
  },
  props: ["TableData", "TableColumns", "TableOverlay", "TableName"],
  data: () => ({}),
};
</script>

<style></style>
