<template>
  <div>
    <DataTable
      :key="renderTable"
      tableClass="p-datatable-sm AdhocRateCardTable"
      tableDataName="BikeDefaultAllotmentData"
      :overlayData="overlayData"
      tableName="BikeAllotmentDataTable"
      :tableData="tableData"
      :dynamicColumn="dynamicColumnData"
      :tableColumns="AllotmentTableColumnDataBike"
      dataKey="id"
    />
  </div>
</template>

<script>
import DataTable from "../Table/DataTable.vue";
import { mapActions } from "vuex";
export default {
  name: "BikeDefault",
  components: { DataTable },
  data() {
    return {
      tableData: [],
      renderTable: 10,
      data: [],
      dynamicColumnData: [],
    };
  },
  methods: {
    ...mapActions({
      loadfetchBikeDefaultRiderAllotmentTableData:
        "operationAllotment/loadfetchBikeDefaultRiderAllotmentTableData",
    }),
    getColumnData() {
      for (let i in this.data) {
        for (let j in this.data[i].zones_routes) {
          if (this.data[i]?.zones_routes[j]?.id) {
            this.AllotmentTableColumnDataBike = [];
            this.dynamicColumnData = [];
            this.AllotmentTableColumnDataBike = [
              { field: "s_no", header: "S.No" },
              { field: "zone_Name", header: "Zone" },
              { field: "route_name", header: "Route" },
            ];
            this.data[i]?.zones_routes[j]?.trips.map((list) => {
              this.AllotmentTableColumnDataBike.push({
                field: list.trip_name,
                header: list.trip_name,
              });

              this.dynamicColumnData.push({
                field: list.trip_name,
                header: list.trip_name,
              });
            });
          }
        }
      }
    },
    getTableData() {
      let s_no = 1;
      let index = 0;
      this.tableData = [];
      for (let i in this.data) {
        for (let j in this.data[i]?.zones_routes) {
          let n = index++;

          this.tableData[n] = {};
          this.tableData[n].s_no = s_no++;
          this.tableData[n].id = this.data[i].id;
          this.tableData[n].zone_Name = this.data[i].zone_name;
          this.tableData[n].zone_id = this.data[i]?.zones_routes[j]?.id;

          this.tableData[n].route_name =
            this.data[i]?.zones_routes[j]?.route_name;
          for (let k in this.data[i]?.zones_routes[j]?.trips) {
            this.tableData[n].trip_id =
              this.data[i]?.zones_routes[j]?.trips[k]?.id;
            this.tableData[n].rider_id =
              this.data[i]?.zones_routes[j]?.trips[k]?.rider?.id;
            if (
              this.data[i]?.zones_routes[j]?.trips[k].trip_name ==
              this.dynamicColumnData[k].field
            ) {
              this.tableData[n][this.dynamicColumnData[k].field] =
                this.data[i]?.zones_routes[j]?.trips[k];
            }
          }
        }
      }
      this.renderkey++;
    },
  },
  created() {
    this.$store.dispatch(
      "operationAllotment/loadfetchBikeDefaultRiderAllotmentTableData"
    );
    this.getTableData();
  },
  watch: {
    "$store.state.operationAllotment.BikeDefaultRiderAllotmentTableData":
      function () {
        this.data =
          this.$store.state.operationAllotment.BikeDefaultRiderAllotmentTableData;
        this.getColumnData();
        this.getTableData();
        this.renderTable++;
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