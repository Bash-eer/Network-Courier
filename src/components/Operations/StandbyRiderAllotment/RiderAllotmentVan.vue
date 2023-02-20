<template>
  <DataTable
    :key="renderTable"
    tableClass="p-datatable-sm AdhocRateCardTable"
    tableDataName="VanRiderAllotmentDataTable"
    :overlayData="overlayData"
    tableName="VanRiderAllotmentDataTable"
    :tableData="tableData"
    :dynamicColumn="dynamicColumnData"
    :tableColumns="this.RiderAllotmentTableColumnData"
    dataKey="id"
  />
</template>

<script>
import { mapState, mapGetters } from "vuex";
import DataTable from "./DataTable.vue";
export default {
  name: "RiderAllotmentVan",
  components: { DataTable },
  data() {
    return {
      tableData: [],
      renderTable: 10,
      data: [],
    };
  },
  methods: {
    getTableData() {
      let s_no = 1;
      let index = 0;
      this.tableData = [];
      for (let i in this.VanTableHeadingData.rows) {
        let n = index++;
        this.tableData[n] = {};
        this.tableData[n].s_no = s_no++;
        this.tableData[n].alloted_date =
          this.VanTableHeadingData.rows[i]?.alloted_date;
        this.tableData[n].id = this.VanTableHeadingData.rows[i]?.id;
        this.tableData[n].createdAt =
          this.VanTableHeadingData.rows[i]?.createdAt;
        this.tableData[n].zone_name =
          this.VanTableHeadingData.rows[i].zone?.zone_name;
        this.tableData[n].zone_id = this.VanTableHeadingData.rows[i].zone?.id;
        this.tableData[n].route_name =
          this.VanTableHeadingData.rows[i].route?.route_name;
        this.tableData[n].id = this.VanTableHeadingData.rows[i]?.id;
      }
      this.renderkey++;
    },
  },
  computed: {
    ...mapGetters({
      BikedeliveryTypeTableDatatable:
        "TypeSetting/BikedeliveryTypeTableDatatable",
      RiderAllotmentTableColumnData:
        "operationAllotment/RiderAllotmentTableColumnData",
      VanTableHeadingData: "operationAllotment/RiderAllotmentTableDataVanData",
    }),
    ...mapState({
      VanTableHeadingData: (state) =>
        state.operationAllotment.RiderAllotmentTableDataVan,
    }),
  },
  created() {
    this.VanTableHeadingData = {};
    this.VanTableHeadingData;

    this.getTableData();
  },
  watch: {
    "$store.state.operationAllotment.RiderAllotmentTableDataVan": function () {
      this.VanTableHeadingData = {};
      this.VanTableHeadingData;

      this.getTableData();
    },
  },
};
</script>

<style>
</style>