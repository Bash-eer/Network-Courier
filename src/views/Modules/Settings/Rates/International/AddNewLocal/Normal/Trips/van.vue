<template>
  <div class="table-container mt-4">
    <DataTable
      tableName="tripsTable"
      :tableData="tableData"
      :tableColumns="tableColumns"
      type="van"
    />
  </div>
</template>

<script>
import DataTable from "../Table/DataTable.vue";
import { tripsTableColumns } from "../const.js";
export default {
  components: { DataTable },
  props: ["tripsData"],
  data() {
    return {
      tableColumns: tripsTableColumns,
      tableData: [],
    };
  },
  mounted() {
    this.tableData = this.$props.tripsData;
  },
};
</script>

<style scoped>
.table-container {
  background-color: #edf1f7;
  padding: 0.5rem 1rem;
}
</style>