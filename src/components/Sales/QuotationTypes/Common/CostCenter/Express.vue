<template>
  <div class="flex flex-wrap justify-content-between">
    <div class="flex">
      <span class="header font-size-16 bold-600">Cost Centers</span>
    </div>
    <div>
      <span
        class="add font-size-14 pointer color-357dea"
        @click="openDialog('CostCenter', 'salesCommon', 'Add Cost Center')"
        >+Add Cost Center </span
      >
      <!-- <span><i class="pi pi-ellipsis-v"></i></span> -->
    </div>
  </div>
  <br />
  <!-- {{ $store.state["sales"]["timeLineExpressCostCenterTableData"] }} -->
  <hr class="m-0" />
  <div v-if="CostCenterData.length == 0">
    <div class="flex align-items-center justify-content-center my-5">
      <img src="/images/empty.png" alt="" />
    </div>
  </div>

  <OverviewDataTable
    v-if="CostCenterData.length > 0"
    :key="renderKey"
    :overlayData="$store.state['salesExpressBike']['quotationOverlayData']"
    tableClass="p-datatable-sm timeLineExpressContractBikeCostCenterTable"
    tableDataName="timeLineExpressContractBikeCostCenterTableData"
    tableName="timeLineExpressContractBikeCostCenterTable"
    :tableData="CostCenterData"
    :tableColumns="TableColumnData"
    dataKey="id"
  />

  <!-- <div class="wrapper" v-else>
    <div class="img-wrap flex align-items-center justify-content-center">
      <img src="/images/quotation-body.png" alt="" />
    </div>
    <br />
    <div class="text">+ Create Quotation</div>
  </div> -->

  <Dialog
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['salesCommon'].dialogComponent"
  />
  <!--toast-->
  <Toasts
    :severity="$store.state['salesCommon'].toastData.severity"
    :summary="$store.state['salesCommon'].toastData.summary"
  />
</template>

<script>
//import CostCenterDataTable from "./DataTable.vue";
import OverviewDataTable from "../DataTable.vue";
import Dialog from "../Dialogs/Dialog.vue";
import Toasts from "../Toast.vue";
import { salesCommon, sales_co } from "../../../../../store/helper";
export default {
  name: "CostCentre",
  components: {
    // CostCenterDataTable,
    OverviewDataTable,
    Dialog,
    Toasts,
  },
  data() {
    return {
      renderKey: 0,
      TableColumnData: [
        { field: "actions", header: "Actions" },
        { field: "sno", header: "S. No" },
        { field: "cost_center_name", header: "Cost Center Name" },
        // { field: "building_name", header: "Building Name" },
        // { field: "unit_no", header: "Unit No" },
        // { field: "floor_no", header: "Floor No" },
        { field: "state", header: "State" },
        { field: "country", header: "Country" },
        { field: "postal_code", header: "Postal Code" },
        { field: "contact_person", header: "Members" },
        { field: "site_office", header: "Site Office" },
      ],
    };
  },
  computed: {
    ...sales_co,
  },
  methods: {
    ...salesCommon,
    openDialog(name, type, header) {
      this.clearStateData({ commonExpressCCStateData: {} });
      this.$store.dispatch(type + "/openDialog", {
        dialogDetails: {
          dialogName: name,
          dialogHeader: header,
        },
      });
      this.$store.getters[type + "/controlActivityDialog"];
    },
  },
  async created() {
    await this.loadCostCenterData({
      id: this.$route.params.id,
      type: this.$route.params.type,
    });
    this.renderKey++;
  },
};
</script>

<style scoped>
.timeLineExpressContractBikeCostCenterTable .p-datatable-row-expansion {
  background: #fff3f6 !important;
}

.header {
  color: #343434;
}

.add {
  color: blue;
}
</style>