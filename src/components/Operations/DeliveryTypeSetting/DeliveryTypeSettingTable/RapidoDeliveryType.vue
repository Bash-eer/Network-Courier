<template>
  <keep-alive>
    <div :key="renderkey">
      <DataTable
        tableClass="p-datatable-sm AdhocRateCardTable"
        tableDataName="RapidoDeliveryTypeData"
        :overlayData="overlayData"
        tableName="RapidoDeliveryTypeData"
        :tableData="tableData"
        :tableColumns="this.BikeDeliveryTypeTableColumnDatatable"
        dataKey="id"
      />
    </div>
  </keep-alive>
</template>

<script>
import DataTable from "./DataTable.vue";
import { mapGetters } from "vuex";
export default {
  name: "RapidoDeliveryType",
  components: { DataTable },
  data() {
    return {
      tableData: [],
      renderkey: 10,
    };
  },
  computed: {
    ...mapGetters({
      BikeDeliveryTypeTableColumnDatatable:
        "TypeSetting/BikeDeliveryTypeTableColumnDatatable",
      RapidodeliveryTypeTableDataTable:
        "TypeSetting/RapidodeliveryTypeTableDataTable",
    }),
  },
  methods: {
    async getTableData() {
      let s_no = 1;

      this.tableData = [];
      this.RapidodeliveryTypeTableDataTable.map((list) => {
        this.tableData.push({
          id: list.id,
          s_no: s_no++,
          createdAt: new Date(list.createdAt),
          created_by: list.user?.display_name,
          from_date: list.from,
          delivery_type: list.delivery_type,
          to_date: list.to,
          status: list.status,
          trip_no: list.rapido_trips,
          driver: list.driver_details?.employee_name,
          type: list.type,
          profile_url: list.driver_details?.image_url,
        });
      });
      this.renderkey++;
    },
  },
  created() {
    this.RapidodeliveryTypeTableDataTable = [];
    this.$store.dispatch("TypeSetting/loadRapidodeliveryTypeTableData");
    this.getTableData();
  },
  watch: {
    "$store.state.TypeSetting.RapidodeliveryTypeTableData": function () {
      this.getTableData();
    },
  },
};
</script>

<style>
</style>