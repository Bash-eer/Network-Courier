<template>
  <keep-alive>
    <div :key="renderkey">
      <DataTable
        tableClass="p-datatable-sm AdhocRateCardTable"
        tableDataName="VanDeliveryTypeData"
        :overlayData="overlayData"
        tableName="VanDeliveryTypeData"
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
  name: "VanDeliveryType",
  components: { DataTable },
  data() {
    return {
      tableData: [],
      renderkey: 10,
    };
  },
   computed: {
    ...mapGetters({
      VandeliveryTypeTableDatatable: "TypeSetting/VandeliveryTypeTableDatatable",
      BikeDeliveryTypeTableColumnDatatable:"TypeSetting/BikeDeliveryTypeTableColumnDatatable"
    }),
  },
  methods: {

     async getTableData() {
      
      
      let s_no = 1;
      
      this.tableData = [];
      this.VandeliveryTypeTableDatatable.map(
        (list) => {
          this.tableData.push({
            id: list.id,
            s_no: s_no++,
            createdAt: new Date(list.createdAt),
            created_by: list.user?.display_name,
            from_date: list.from,
            delivery_type: list.delivery_type,
            to_date: list.to,
            status: list.status,
            trip_no: list.Van_trips,
             driver:list.driver_details?.employee_name,
          type: list.type,
          profile_url: list.driver_details?.image_url,
            
          });
        }
      );
      this.renderkey++;
     
    },
  },
   created(){
    this.VandeliveryTypeTableDatatable = [];
    this.$store.dispatch("TypeSetting/loadVandeliveryTypeTableData");
    this.getTableData();
   },
   watch: {
    "$store.state.TypeSetting.VandeliveryTypeTableData": function () {
      this.getTableData();
    },
  }
};
</script>

<style>
</style>