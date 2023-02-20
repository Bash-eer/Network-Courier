<template>
  <DataTable
    :key="renderTable"
    tableClass="p-datatable-sm AdhocRateCardTable"
    tableDataName="BikeRiderAllotmentDataTable"
    :overlayData="overlayData"
    tableName="BikeRiderAllotmentDataTable"
    :tableData="tableData"
    :dynamicColumn="dynamicColumnData"
    :tableColumns="this.RiderAllotmentTableColumnData"
    dataKey="id"
  />
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import DataTable from "./DataTable.vue";
export default {
  name: "RiderAllotmentBike",
  components: { DataTable },
  data() {
    return {
      tableData: [],
      renderTable: 10,
      data: [],
    };
  },
  computed: {
    ...mapGetters({
      BikedeliveryTypeTableDatatable:
        "TypeSetting/BikedeliveryTypeTableDatatable",
      RiderAllotmentTableColumnData:
        "operationAllotment/RiderAllotmentTableColumnData",
    }),
    ...mapState({
      BikeTableHeadingData: (state) =>
        state.operationAllotment.RiderAllotmentTableDataBike,
    }),
  },
  methods: {
    getTableData() {
      let s_no = 1;
      let index = 0;
      this.tableData = [];
      for (let i in this.BikeTableHeadingData.rows) {
        let n = index++;
        this.tableData[n] = {};
        this.tableData[n].s_no = s_no++;
        this.tableData[n].alloted_date =
          this.BikeTableHeadingData.rows[i]?.alloted_date;
        this.tableData[n].id = this.BikeTableHeadingData.rows[i]?.id;
        this.tableData[n].createdAt =
          this.BikeTableHeadingData.rows[i]?.createdAt;

        this.tableData[n].zone_name =
          this.BikeTableHeadingData.rows[i].zone?.zone_name;
        this.tableData[n].zone_id = this.BikeTableHeadingData.rows[i].zone?.id;
        this.tableData[n].route_name =
          this.BikeTableHeadingData.rows[i].route?.route_name;
        this.tableData[n].route_id =
          this.BikeTableHeadingData.rows[i].route?.id;
        this.tableData[n].id = this.BikeTableHeadingData.rows[i]?.id;
      }
      this.renderkey++;
    },
  },

  async created() {
    this.BikeTableHeadingData = {};
    this.BikeTableHeadingData;
    this.getTableData();
  },
  watch: {
    "$store.state.operationAllotment.RiderAllotmentTableDataBike": function () {
      this.BikeTableHeadingData = {};
      this.BikeTableHeadingData;
      this.getTableData();
    },
    BikeTableHeadingData: function () {
      this.BikeTableHeadingData = {};
      this.BikeTableHeadingData;
      this.getTableData();
    },
  },
};
</script>

<style>
</style>