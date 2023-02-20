<template>
  <keep-alive>
    <div >
      <DataTable
        tableClass="p-datatable-sm AdhocRateCardTable"
        tableDataName="BikeAllotmentData"
        :overlayData="overlayData"
        tableName="BikeAllotmentDataTable"
        :tableData="tableData"
        :tableColumns="
          $store.state['operationAllotment']['BikeAllotmentTableColumnData']
        "
      />
    </div>
  </keep-alive>
</template>

<script>
import DataTable from "./DataTable.vue";
import { mapActions } from "vuex";

export default {
  name: "BikeRider",
  components: { DataTable },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    ...mapActions({
      loadBikeAllotmentTableData:
        "operationAllotment/loadBikeAllotmentTableData",
    }),

    async getTableData() {
      
      let s_no = 1;
      
      this.tableData = [];
      this.$store.state.operationAllotment.BikeAllotmentTableData.map(
        (list) => {
          this.tableData.push({
            id: list.id,
            s_no: s_no++,
            createdAt: new Date(list.createdAt),
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
    this.$store.state.operationAllotment.BikeAllotmentTableData = [];
    this.$store.dispatch("operationAllotment/loadBikeAllotmentTableData");
    this.getTableData();
  },
  watch: {
    "$store.state.operationAllotment.BikeAllotmentTableData": function () {
      this.getTableData();
    },
  },
};
</script>

<style>
</style>