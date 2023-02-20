<template>
  <div class="flex flex-wrap justify-content-between">
    <div class="flex">
      <span class="header font-size-16 bold-600">Costing Center</span>
    </div>
    <div>
      <span
        class="add font-size-14 pointer"
        @click="openDialog('CostCenter', 'salesExpressBike', 'Add CostCenter')"
        >+Add Cost Center</span
      >
    </div>
  </div>
  <br />
  <!-- {{ $store.state["sales"]["timeLineExpressCostCenterTableData"] }} -->
  <hr class="m-0" />

  <OverviewDataTable
    v-if="
      $store.state['salesExpressBike'][
        'timeLineExpressContractBikeCostCenterTableData'
      ].length > 0
    "
    :key="
      $store.state['salesExpressBike'][
        'timeLineExpressContractBikeCostCenterTableData'
      ]
    "
    :overlayData="$store.state['salesExpressBike']['quotationOverlayData']"
    tableClass="p-datatable-sm timeLineExpressContractBikeCostCenterTable"
    tableDataName="timeLineExpressContractBikeCostCenterTableData"
    tableName="timeLineExpressContractBikeCostCenterTable"
    :tableData="
      $store.state['salesExpressBike'][
        'timeLineExpressContractBikeCostCenterTableData'
      ]
    "
    :tableColumns="TableColumnData"
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
    :dialogComponent="$store.state['salesExpressBike'].dialogComponent"
  />
</template>

<script>
//import CostCenterDataTable from "./DataTable.vue";
import OverviewDataTable from "./DataTable.vue";
import Dialog from "./Dialogs/Dialog.vue";
export default {
  name: "CostCentre",
  components: {
    // CostCenterDataTable,
    OverviewDataTable,
    Dialog,
  },
  data() {
    return {
      TableColumnData: [
        { field: "actions", header: "Actions" },
        { field: "id", header: "S. No" },
        { field: "cost_centre_name", header: "Cost Center Name" },
        { field: "building_name", header: "Building Name" },
        { field: "unit_no", header: "Unit No" },
        { field: "floor_no", header: "Floor No" },
        { field: "state", header: "State" },
        { field: "country", header: "Country" },
        { field: "postal_code", header: "Postal Code" },
        { field: "contact_person", header: "Members" },
        { field: "site_office", header: "Site Office" },
      ],
    };
  },
  methods: {
    openDialog(name, type, header) {
      this.$store.dispatch(type + "/openDialog", {
        dialogDetails: {
          dialogName: name,
          dialogHeader: header,
        },
      });
      this.$store.getters[type + "/controlActivityDialog"];
      if (type == "salesExpressBike") {
        this.$store.dispatch("salesExpressBike/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["salesExpressBike/controlActivityDialog"];
      }
    },
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
