<template>
  <div class="flex flex-wrap justify-content-between">
    <div class="flex">
      <span class="rapido-contract-header express-rapido-font"
        >Cost Centers</span
      >
    </div>
    <div>
      <span
        class="rapido-add-cost pointer font-size-14 color-357dea bold-700"
        @click="openDialog"
        >+Add Cost Center</span
      >
    </div>
  </div>
  <br />

  <OverviewDataTable
    :overlayData="$store.state['salesRapidoContract']['quotationOverlayData']"
    tableClass="p-datatable-sm "
    tableDataName="timeLineRapidoCostCenterTableData"
    tableName="timeLineRapidoContractCostCenterTable"
    :tableData="tableData"
    :tableColumns="TableColumnData"
    dataKey="id"
  />

  <Dialog
    :show="showDialog"
    v-if="showDialog"
    @close="closeDialog"
    @save="renderKey++"
  />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import OverviewDataTable from "../../Rapido/RapidoContract/Overview/DataTabel.vue";
import Dialog from "../Dialogs/CostCenter/Rapido/Contract/index.vue";

export default {
  components: {
    OverviewDataTable,
    Dialog,
  },
  data() {
    return {
      renderKey: 10,
      showDialog: false,
      tableData: [],
      TableColumnData: [
        { field: "actions", header: "Actions" },
        { field: "sl_no", header: "S. No" },
        { field: "cost_center_name", header: "Cost Center Name" },
        { field: "building_name", header: "Building Name" },
        { field: "unit_no", header: "Unit No" },
        { field: "floor_no", header: "Floor No" },
        { field: "state", header: "State" },
        { field: "country", header: "Country" },
        { field: "postal_code", header: "Postal Code" },
        { field: "contact_person", header: "Members" },
      ],
    };
  },
  watch: {
    costCenterDialog() {
      this.showDialog = this.costCenterDialog;
    },
    renderKey() {
      this.getCostCenter();
    },
  },
  computed: {
    ...mapGetters({
      costCenterDialog: "salesRapidoContract/Contract/costCenterDialog",
    }),
  },
  methods: {
    ...mapActions({
      costCenterList: "salesRapidoContract/Contract/costCenterList",
      setCostCenterDialog: "salesRapidoContract/Contract/setCostCenterDialog",
    }),
    openDialog() {
      this.showDialog = true;
      this.setCostCenterDialog(true);
    },
    closeDialog() {
      this.showDialog = false;
      this.setCostCenterDialog(false);
    },
    async getCostCenter() {
      this.tableData = [];
      const res = await this.costCenterList({
        type: this.$route.params.type,
        id: this.$route.params.id,
      });

      if (res) {
        // this.tableData = res.data.results;
        res.data.results.map((list, idx) => {
          this.tableData.push({
            sl_no: idx + 1,
            ...list,
            expanded: false,
          });
        });
      }
    },
  },
  created() {
    this.getCostCenter();
  },
};
</script>

<style scoped>
.rapido-contract-header {
  color: #343434;
  font-size: 16px;
}
.rapido-contract-add {
  color: blue;
  font-size: 14px;
  cursor: pointer;
}
.rapido-add-cost {
  position: relative;
  right: 61px;
}
</style>
