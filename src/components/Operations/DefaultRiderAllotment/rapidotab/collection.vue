<template>
  <div class="flex flex-row">
    <div class="m-2 mt-2 pointer-cursor" @click="setTabHandler">
      <span> <i class="pi pi-arrow-left m-0"></i></span>
    </div>
    <div>
      <div class="zone-name">Collection</div>
    </div>
  </div>
  <div :key="renderkey">
    <DataTable
      :key="renderTable"
      tableClass="p-datatable-sm AdhocRateCardTable"
      tableDataName="RapidocollectionDataTable"
      :overlayData="overlayData"
      tableName="RapidocollectionDataTable"
      :tableData="tableData"
      :tableColumns="this.collectionTableColumnDataTable"
      dataKey="id"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import DataTable from "../Table/DataTable.vue";
export default {
  name: "Collection",
  components: { DataTable },
  data() {
    return {
      tableData: [],
      renderkey: 10,
      collectionDataTable: [],
      dropDownData: null,
    };
  },
  computed: {
    ...mapGetters({
      collectionTableColumnDataTable:
        "rapidoRiderAllotment/collectionTableColumnDataTable",
      data: "rapidoRiderAllotment/DataTablecollectionData",
    }),
    ...mapState({
      RiderDropDownList: (state) => state.operationAllotment.RiderDropDownList,
    }),
  },
  methods: {
    setTabHandler() {
      this.$router.push("/Operation/DefaultRiderAllotment");
    },
    getTableData() {
      let s_no = 1;
      let index = 0;
      this.tableData = [];
      for (let i in this.data.rows) {
        let n = index++;
        this.tableData[n] = {};
        this.tableData[n].s_no = s_no++;
        this.tableData[n].pick_up_locations =
          this.data.rows[i]?.pick_up_locations;
        this.tableData[n].profile_name = this.data.rows[i]?.profile_name;
        this.tableData[n].contract_id = this.data.rows[i]?.contract_id;

        for (let j in this.data.rows.contract_profile) {
          this.tableData[n].profile_url =
            this.data.rows.contract_profile[j]?.profile_url;
        }
      }
      this.renderkey++;
    },
  },
  created() {
    this.data = [];
    this.getTableData();
  },
  watch: {
    "$store.state.rapidoRiderAllotment.DataTablecollection": function () {
      this.data;
      this.getTableData();
      this.renderTable++;
    },
    "$store.state.operationAllotment.RiderDropDownList": function () {
      for (let i in this.RiderDropDownList) {
        this.RiderDropDownList[i].name =
          this.RiderDropDownList[i].employee_name;
      }
      this.dropDownData = this.RiderDropDownList;
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