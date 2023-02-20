<template>
  <keep-alive>
    <div :key="renderkey">
      <DataTable
        tableClass="p-datatable-sm AdhocRateCardTable"
        tableDataName="BikeDeliveryTypeData"
        :overlayData="overlayData"
        tableName="BikeDeliveryTypeData"
        :tableData="tableData"
        :tableColumns="
         this.BikeDeliveryTypeTableColumnDatatable
        "
        dataKey="id"
      />
    </div>
  </keep-alive>
</template>

<script>
import DataTable from "./DataTable.vue";
import { mapGetters } from "vuex";

export default {
  name: "BikeDeliveryType",
  components: { DataTable },
  data() {
    return {
      tableData: [],
      renderkey: 10,
    };
  },
  computed: {
    ...mapGetters({
      BikedeliveryTypeTableDatatable: "TypeSetting/BikedeliveryTypeTableDatatable",
      BikeDeliveryTypeTableColumnDatatable:"TypeSetting/BikeDeliveryTypeTableColumnDatatable"
    }),
  },
  methods: {
    async getTableData() {
      let s_no = 1;

      this.tableData = [];
      this.BikedeliveryTypeTableDatatable.map((list) => {
        this.tableData.push({
          id: list.id,
          s_no: s_no++,
          createdAt: new Date(list.createdAt),
          created_by: list.user.display_name,
          from_date: list.from,
          delivery_type: list.delivery_type,
          to_date: list.to,
          status: list.status,
          trip_no: list.bike_trips,
          driver:list.driver_details?.employee_name,
          type: list.type,
          profile_url: list.driver_details?.image_url,
        });
      });
      this.renderkey++;
    },
  },
  created() {
    this.BikedeliveryTypeTableDatatable = [];
    this.$store.dispatch("TypeSetting/loadBikedeliveryTypeTableData");
    this.getTableData();
  },
  watch: {
    "$store.state.TypeSetting.BikedeliveryTypeTableData": function () {
      this.getTableData();
    },
  },
};
</script>

<style>
</style>