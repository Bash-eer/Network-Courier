<template>
  <div>
    <DataTable
      :key="renderTable"
      tableClass="p-datatable-sm AdhocRateCardTable"
      tableDataName="VanDefaultAllotmentData"
      tableName="VanAllotmentDataTable"
      :tableData="tableData"
      :dynamicColumn="dynamicColumnData"
      :tableColumns="VanAllotmentTableColumnData"
      dataKey="id"
    />
  </div>
</template>

<script>
import DataTable from "./DataTable.vue";
import { mapActions } from "vuex";
export default {
  name: "VanDefault",
  components: { DataTable },
  data() {
    return {
      tableData: [],
      renderTable: 10,
      dataVan: [],
      dynamicColumnData: [],
    };
  },
  methods: {
    ...mapActions({
      loadfetchVanDefaultRiderAllotmentTableData:
        "operationAllotment/loadfetchVanDefaultRiderAllotmentTableData",
    }),
    getColumnData() {
      for (let i in this.dataVan) {
        for (let j in this.dataVan[i].zones_routes) {
          if (this.dataVan[i]?.zones_routes[j]?.id) {
            this.VanAllotmentTableColumnData = [];
            this.dynamicColumnData = [];
            this.VanAllotmentTableColumnData = [
              { field: "s_no", header: "S.No" },
              { field: "zone_Name", header: "Zone" },
              { field: "route_name", header: "Route" },
            ];
            this.dataVan[i]?.zones_routes[j]?.trips.map((list) => {
              this.VanAllotmentTableColumnData.push({
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
      for (let i in this.dataVan) {
        for (let j in this.dataVan[i]?.zones_routes) {
          let n = index++;
          this.tableData[n] = {};
          this.tableData[n].id = this.dataVan[i].id;
          this.tableData[n].s_no = s_no++;
          this.tableData[n].zone_Name = this.dataVan[i].zone_name;
          this.tableData[n].zone_id = this.dataVan[i]?.zones_routes[j]?.id;

          this.tableData[n].route_name =
            this.dataVan[i]?.zones_routes[j]?.route_name;
          for (let k in this.dataVan[i]?.zones_routes[j]?.trips) {
            this.tableData[n].trip_id =
              this.dataVan[i]?.zones_routes[j]?.trips[k]?.id;
            this.tableData[n].rider_id =
              this.dataVan[i]?.zones_routes[j]?.trips[k]?.rider?.id;
            if (
              this.dataVan[i]?.zones_routes[j]?.trips[k].trip_name ==
              this.dynamicColumnData[k].field
            ) {
              this.tableData[n][this.dynamicColumnData[k].field] =
                this.dataVan[i]?.zones_routes[j]?.trips[k];
            }
          }
        }
      }
      this.renderkey++;
    },
  },
  created() {
    this.$store.dispatch(
      "operationAllotment/loadfetchVanDefaultRiderAllotmentTableData"
    );
    this.getTableData();
  },
  watch: {
    "$store.state.operationAllotment.VanDefaultRiderAllotmentTableData":
      function () {
        this.dataVan =
          this.$store.state.operationAllotment.VanDefaultRiderAllotmentTableData;
        this.getColumnData();
        this.getTableData();
        this.renderTable++;
      },
  },
};
</script>

<style>
</style>