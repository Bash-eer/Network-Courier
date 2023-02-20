<template>
  <div
    class="flex justify-content-between align-items-center mt-1 mb-0 bg-white"
  >
    <div class="flex flex-row m-3">
      <div class="adhoc-name">Express Adhoc Rates</div>
    </div>

    <div class="flex">
      <div class="flex flex-row">
        <SearchField storePath="contacts" />
        <Buttons
          label="Add New"
          button_class="p-button-sm mx-2 add-btn custom-add-btn"
          v-on:childToParent="
            openDialog('AddNewRate', 'expressAdhoc', 'Add New')
          "
        />
      </div>
    </div>
  </div>

  <AdhocTable
    tableClass="p-datatable-sm adhoc-table"
    tableDataName="AdhocData"
    :overlayData="overlayData"
    tableName="AdhocTable"
    :tableData="adhocTableData"
    :tableColumns="tableColumnData"
    dataKey="id"
  />

  <Toasts
    :severity="$store.state['expressAdhoc'].toastData.severity"
    :summary="$store.state['expressAdhoc'].toastData.summary"
  />
</template>

<script>
import {
  ExpressAdhocTableOverlayData,
  express_adhoc_tablecolumdata,
} from "./Const/const";
import AdhocTable from "./Tables/AdhocTable.vue";
import Toasts from "./Toasts.vue";

export default {
  components: {
    AdhocTable,
    Toasts,
  },
  data: () => ({
    tableColumnData: express_adhoc_tablecolumdata,
    overlayData: ExpressAdhocTableOverlayData,
    adhocTableData: [],
  }),

  methods: {
    openDialog(name, type, header) {
      if (type == "expressAdhoc") {
        this.$store.dispatch("expressAdhoc/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["expressAdhoc/controlActivityDialog"];
      }
    },
    getTableData() {
      this.adhocTableData =
        this.$store.state["expressAdhoc"]["expressAdhocTableData"];
      for (let i in this.adhocTableData) {
        this.adhocTableData[i]["zones_length"] =
          this.adhocTableData[i].zones.length;
      }
    },
  },
  watch: {
    "$store.state.expressAdhoc.expressAdhocTableData": function () {
      this.getTableData();
    },
  },
  created() {
    this.$store.dispatch("expressAdhoc/loadAdhocTableData", {
      path: "/settings/sales/rates/express/adhoc/ratecard",
      mutation: "fetchAdhocTableData",
    });
    this.getTableData();
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.adhoc-name {
  font-weight: bold;
  font-size: 16px;
  line-height: 28px;
  color: #4e5968;
}
::v-deep .adhoc-table.p-card .p-card-body {
  padding: 0 !important;
  font-weight: bold;
  font-size: 16px;
  line-height: 28px;
  color: #4e5968;
}
::v-deep .adhoc-table.p-card .p-card-body {
  padding: 0 !important;
}
</style>
