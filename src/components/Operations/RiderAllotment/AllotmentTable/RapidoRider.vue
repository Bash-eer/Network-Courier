<template>
  <div >
    <DataTable
      tableClass="p-datatable-sm AdhocRateCardTable"
      tableDataName="RapidoAllotmentData"
      :overlayData="overlayData"
      tableName="RapidoAllotmentDataTable"
      :tableData="tableData"
      :tableColumns="
        $store.state['operationAllotment']['BikeAllotmentTableColumnData']
      "
      dataKey="id"
    />
  </div>
</template>

<script>
import DataTable from "./DataTable.vue";
import { mapActions } from "vuex";
export default {
  name: "RapidoRider",
  components: { DataTable },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    ...mapActions({
      loadRapidoAllotmentTableData:
        "operationAllotment/loadRapidoAllotmentTableData",
    }),
    async getTableData() {
      let s_no = 1;

      this.tableData = [];
      this.$store.state.operationAllotment.RapidoAllotmentTableData.map(
        (list) => {
          this.tableData.push({
            id: list.id,
            s_no: s_no++,
            createdAt: new Date( list.createdAt),
            created_by: list?.user?.display_name,
            from_date: list.from_date,
            grace_period: list.grace_period,
            to_date: list.to_date,
            status: list.status,
            trip_code: list.trip_code,
            trip_days: list.trip_days,
            trip_name: list.trip_name,
            type: list.type,
          });
        }
      );
    },
  },
  async created() {
    this.$store.state.operationAllotment.RapidoAllotmentTableData = [];

    this.$store.dispatch("operationAllotment/loadRapidoAllotmentTableData");
    this.getTableData();
  },
  watch: {
    "$store.state.operationAllotment.RapidoAllotmentTableData": function () {
      this.getTableData();
    },
  },
};
</script>

<style>
</style>