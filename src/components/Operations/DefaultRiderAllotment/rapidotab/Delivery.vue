<template>
  <div :key="renderkey">
    <div class="flex flex-row">
      <div class="m-2 mt-2 pointer-cursor" @click="setTabHandler">
        <span> <i class="pi pi-arrow-left m-0"></i></span>
      </div>
      <div>
        <div class="zone-name">Delivery</div>
      </div>
    </div>
    <DataTable
      :key="renderTable"
      tableClass="p-datatable-sm AdhocRateCardTable"
      tableDataName="RapidoDeliveryDataTable"
      :overlayData="overlayData"
      tableName="RapidoDeliveryDataTable"
      :tableData="tableData"
      :dynamicColumn="dynamicColumnData"
      :tableColumns="this.deliveryTableColumnData"
      dataKey="id"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DataTable from "../Table/DataTable.vue";
export default {
  name: "Delivery",
  components: { DataTable },
  data() {
    return {
      tableData: [],
      renderkey: 10,
    };
  },
  computed: {
    ...mapGetters({
      deliveryTableColumnData:
        "rapidoRiderAllotment/deliveryTableColumnDataTable",
      data: "rapidoRiderAllotment/RapidoDeliveryRiderAllotmentTableDatatable",
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
      for (let i in this.data) {
        for (let j in this.data[i]?.zones_routes) {
          for (let k in this.data[i]?.zones_routes[j]?.assign) {
            let n = index++;
            this.tableData[n] = {};
            this.tableData[n].s_no = s_no++;
            this.tableData[n].zone_Name = this.data[i].zone_name;
            this.tableData[n].zone_id = this.data[i]?.id;

            this.tableData[n].route_name =
              this.data[i]?.zones_routes[j]?.route_name;
            this.tableData[n].route_id = this.data[i]?.zones_routes[j]?.id;

            this.tableData[n].rider =
              this.data[i]?.zones_routes[j]?.assign[k].rider;
          }
        }
      }
      this.renderkey++;
    },
  },
  created() {
    this.$store.dispatch(
      "rapidoRiderAllotment/loadRapidoDeliveryRiderAllotmentTableData"
    );
    this.data;
    this.getTableData();
  },
  watch: {
    "$store.state.rapidoRiderAllotment.RapidoDeliveryRiderAllotmentTableData":
      function () {
        this.data;
        this.getTableData();
        this.renderTable++;
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