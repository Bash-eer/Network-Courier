<template>
  <div class="flex justify-content-between align-items-center bg-white">
    <div class="flex flex-row m-3">
      <div class="m-2 mt-2 pointer-cursor" @click="setTabHandler">
        <span> <i class="pi pi-arrow-left"></i></span>
      </div>
      <div>
        <div class="zone-name">
          {{ this.collectionDataTablePageData.profile_name }}
        </div>
      </div>
    </div>

    <div class="flex flex-row mx-2">
      <SearchField storePath="operationAllotment" class="mt-3 aligment" />
    </div>
  </div>
  <div :key="renderkey">
    <DataTable
      :key="renderTable"
      tableClass="p-datatable-sm AdhocRateCardTable"
      tableDataName="RapidocollectionDataTablepage"
      :overlayData="overlayData"
      tableName="RapidocollectionDataTablepage"
      :tableData="tableData"
      :tableColumns="this.collectionDataTablePageColumnDatatable"
      dataKey="id"
    />
  </div>
  <Toasts
    :severity="$store.state['operationAllotment'].toastData.severity"
    :summary="$store.state['operationAllotment'].toastData.summary"
  />
</template>

<script>
import Toasts from "../../RiderAllotment/Toast.vue";
import { mapActions, mapGetters } from "vuex";
import DataTable from "../Table/DataTable.vue";
export default {
  name: "DeliverydataTablepage",
  components: { DataTable, Toasts },
  data() {
    return {
      tableData: [],
      renderkey: 10,
      collectionDataTable: [],
      data: [],
    };
  },
  computed: {
    ...mapGetters({
      collectionDataTablePageColumnDatatable:
        "rapidoRiderAllotment/collectionDataTablePageColumnDatatable",
      data: "rapidoRiderAllotment/DataTablecollectionData",
      tabButton: "operationAllotment/addRegionDeliveryTransportTypeData",
      collectionDataTablePageData:
        "rapidoRiderAllotment/collectionDataTablePageData",
    }),
  },
  methods: {
    ...mapActions({
      POSTPATCHCRUDOPERATION: "TypeSetting/POSTPATCHCRUDOPERATION",
      loadcollectionDataTablePage:
        "rapidoRiderAllotment/loadcollectionDataTablePage",
    }),
    setTabHandler() {
      this.tabButton == "Rapido";
      this.$router.push("/Operation/Collection");
      
    },

    getTableData() {
      let s_no = 1;
      let index = 0;
      this.tableData = [];

      for (let i in this.collectionDataTablePageData.pick_up_locations) {
        let n = index++;
        this.tableData[i] = {};
        this.tableData[i].s_no = s_no++;
        this.tableData[i].contract_id =
          this.collectionDataTablePageData?.contract_id;
        this.tableData[i].location_name =
          this.collectionDataTablePageData.pick_up_locations[i]?.location_name;
        this.tableData[i].updatedAt =
          this.collectionDataTablePageData.pick_up_locations[i]?.updatedAt;
        this.tableData[i].user =
          this.collectionDataTablePageData.pick_up_locations[
            i
          ]?.user?.display_name;
        this.tableData[i].pick_up_location_id =
          this.collectionDataTablePageData.pick_up_locations[i]?.id;
        this.tableData[i].employee_name =
          this.collectionDataTablePageData.pick_up_locations[
            i
          ]?.rider?.employee_name;
        this.tableData[i].image_url =
          this.collectionDataTablePageData.pick_up_locations[
            i
          ]?.rider?.image_url;
      }
      this.renderkey++;
    },
  },

  created() {
    this.data = this.$store.state.rapidoRiderAllotment.heading_name;
    this.loadcollectionDataTablePage({
      id: this.data?.contract_id,
    });
    this.getTableData();
  },
  watch: {
    "$store.state.rapidoRiderAllotment.collectionDataTablePage": function () {
      this.collectionDataTablePageData;
      this.getTableData();
      this.renderkey++;
    },
  },
};
</script>

<style scoped>
.zone-name {
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  color: #4e5968;
}
</style>