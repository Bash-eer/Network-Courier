<template>
  <div>
    <DataTable
      :key="renderTable"
      tableClass="p-datatable-sm AdhocRateCardTable"
      tableDataName="BikeDefaultAllotmentData"
      :overlayData="overlayData"
      tableName="BikeAllotmentDataTable"
      :tableData="tableData"
      :expanddata="tableData"
      :dynamicColumn="dynamicColumnData"
      :tableColumns="BikeAllotmentTableColumnData"
      dataKey="id"
    />
  </div>
</template>

<script>
import DataTable from "./DataTable.vue";
import { mapActions } from "vuex";
export default {
  name: "BikeTable",
  components: { DataTable },
  data() {
    return {
      tableData: [],
      renderTable: 10,
      data: [],
      BikeTableHeadingData: [],
      dynamicColumnData: [],
    };
  },
  methods: {
    ...mapActions({
      loadfetchBikeDefaultRiderAllotmentTableData:
        "operationAllotment/loadfetchBikeDefaultRiderAllotmentTableData",
    }),

    getColumnData() {
      this.dynamicColumnData = [];
      this.BikeAllotmentTableColumnData = [];
      this.BikeAllotmentTableColumnData = [
        { field: "s_no", header: "S.No" },
        { field: "route_name", header: "Route" },
      ];
      if (this.BikeTableHeadingData) {
        this.BikeTableHeadingData[0]?.zones_routes[0]?.trips.map((list3) => {
          this.BikeAllotmentTableColumnData.push({
            field: list3.trip_name,
            header: list3.trip_name,
            conflict: list3.conflict,
            color:list3.color
          });

          this.dynamicColumnData.push({
            field: list3.trip_name,
            header: list3.trip_name,
            conflict: list3.conflict,
            color:list3.color
          });
        });
      }
    },
    getTableData() {
      let s_no = 1;
      let index = 0;
      this.tableData = [];
      for (let i in this.BikeTableHeadingData) {
        for (let j in this.BikeTableHeadingData[i]?.zones_routes) {
          let n = index++;
          this.tableData[n] = {};
          this.tableData[n].id = this.BikeTableHeadingData[i].id;
          this.tableData[n].s_no = s_no++;
          this.tableData[n].zone_id =
            this.BikeTableHeadingData[i]?.zones_routes[j]?.id;
          this.tableData[n].route_name =
            this.BikeTableHeadingData[i]?.zones_routes[j]?.route_name;

          for (let k in this.BikeTableHeadingData[i]?.zones_routes[j]?.trips) {
            this.tableData[j].conflict =
              this.BikeTableHeadingData[i]?.zones_routes[j]?.trips[k]?.conflict;
            this.tableData[j].trip_id =
              this.BikeTableHeadingData[i]?.zones_routes[j]?.trips[k]?.id;
            this.tableData[j].rider_id =
              this.BikeTableHeadingData[i]?.zones_routes[j]?.trips[
                k
              ]?.rider?.id;
            if (
              this.BikeTableHeadingData[i]?.zones_routes[j]?.trips[k]
                .trip_name == this.dynamicColumnData[k].field
            ) {
              this.tableData[n][this.dynamicColumnData[k].field] =
                this.BikeTableHeadingData[i]?.zones_routes[j]?.trips[k];
            }
          }
        }
      }
      this.renderTable++;
    },
  },
  created() {
    this.BikeTableHeadingData = [];
    this.BikeTableHeadingData =
      this.$store.state.operationAllotment.BikeTableData;
    this.getColumnData();
    this.getTableData();
  },
  watch: {
    "$store.state.operationAllotment.BikeTableData": function () {
      this.BikeTableHeadingData = [];
      this.BikeTableHeadingData =
        this.$store.state.operationAllotment.BikeTableData;
      this.getColumnData();
      this.getTableData();
    },
  },
};
</script>

<style>
.p-datatable.p-datatable-sm .p-datatable-thead .S.No > tr > th {
  white-space: nowrap !important;
  background-color: violet;
}
</style>