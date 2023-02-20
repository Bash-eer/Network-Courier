<template>
  <div>
    <DataTable
      :key="renderTable"
      tableClass="p-datatable-sm AdhocRateCardTable"
      tableDataName="VanstandbyAllotmentData"
      :overlayData="overlayData"
      tableName="VanAllotmentDataTable"
      :tableData="tableData"
      :dynamicColumn="dynamicColumnData"
      :tableColumns="VanAllotmentTableColumnData"
      dataKey="id"
    />
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
const { URL } = require("../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import DataTable from "./DataTable.vue";
export default {
  name: "BikeTable",
  components: { DataTable },
  data() {
    return {
      v$: useVuelidate(),
      submitted: false,
      renderTable: 10,
    };
  },

  methods: {
    getColumnData() {
      this.dynamicColumnData = [];
      this.VanAllotmentTableColumnData = [];
      this.VanAllotmentTableColumnData = [
        { field: "s_no", header: "S.No" },
        { field: "route_name", header: "Route" },
      ];
      if (this.VanTableHeadingData) {
        this.VanTableHeadingData[0]?.zones_routes[0]?.trips.map((list3) => {
          this.VanAllotmentTableColumnData.push({
            field: list3.trip_name,
            header: list3.trip_name,
            conflict: list3.conflict,
            color: list3.color,
          });

          this.dynamicColumnData.push({
            field: list3.trip_name,
            header: list3.trip_name,
            conflict: list3.conflict,
            color: list3.color,
          });
        });
      }
    },
    getTableData() {
      let s_no = 1;
      let index = 0;
      this.tableData = [];
      for (let i in this.VanTableHeadingData) {
        for (let j in this.VanTableHeadingData[i]?.zones_routes) {
          let n = index++;

          this.tableData[n] = {};
          this.tableData[n].id = this.VanTableHeadingData[i].id;
          this.tableData[n].s_no = s_no++;
          this.tableData[n].zone_id =
            this.VanTableHeadingData[i]?.zones_routes[j]?.id;
          this.tableData[n].route_name =
            this.VanTableHeadingData[i]?.zones_routes[j]?.route_name;
          for (let k in this.VanTableHeadingData[i]?.zones_routes[j]?.trips) {
            this.tableData[n].trip_id =
              this.VanTableHeadingData[i]?.zones_routes[j]?.trips[k]?.id;
            this.tableData[n].rider_id =
              this.VanTableHeadingData[i]?.zones_routes[j]?.trips[k]?.rider?.id;
            if (
              this.VanTableHeadingData[i]?.zones_routes[j]?.trips[k]
                .trip_name == this.dynamicColumnData[k].field
            ) {
              this.tableData[n][this.dynamicColumnData[k].field] =
                this.VanTableHeadingData[i]?.zones_routes[j]?.trips[k];
            }
          }
        }
      }
      this.renderTable++;
    },

    dateFormater(data) {
      if (!data) return "-";
      let date = moment(data).format("YYYY,MM,DD");
      if (date === "Invalid date") {
        return data;
      } else {
        return date;
      }
    },
  },

  async created() {
    await this.getZoneDropdownData();
    this.VanTableHeadingData = [];
    this.VanTableHeadingData =
      this.$store.state.operationAllotment.VanTableData;
    this.getColumnData();
    this.getTableData();
    if (this.$store.state.operationAllotment.DateDataVan.from_date) {
      this.details.date = [];
      this.details.date[0] =
        this.$store.state.operationAllotment.DateDataVan.from_date;
      this.details.date[1] =
        this.$store.state.operationAllotment.DateDataVan.to_date;
      this.details.zone = this.$store.state.operationAllotment.DateDataVan.zone;
    }
  },
  watch: {
    "$store.state.operationAllotment.VanTableData": function () {
      this.VanTableHeadingData = [];
      this.VanTableHeadingData =
        this.$store.state.operationAllotment.VanTableData;
      this.getColumnData();
      this.getTableData();
    },
  },
};
</script>

<style scoped>
.apply_button {
  margin-top: 23px;
  margin-left: 39px;
}
</style>