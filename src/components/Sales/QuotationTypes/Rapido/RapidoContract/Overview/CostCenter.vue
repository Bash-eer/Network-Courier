<template>
  <div class="flex flex-wrap justify-content-between">
    <div class="flex">
      <span class="rapido-contract-header express-rapido-font"
        >Cost Centers</span
      >
    </div>
    <div>
      <span
        class="rapido-add-cost"
        @click="
          openDialog('AddCostCenter', 'salesRapidoContract', 'CostCenter')
        "
        >+Add Cost Center</span
      >
    </div>
  </div>
  <br />

  <hr class="horizontal_line" />

  <OverviewDataTable
    v-if="
      $store.state['salesRapidoContract']['timeLineRapidoCostCenterTableData']
        .length > 0
    "
    :key="
      $store.state['salesRapidoContract']['timeLineRapidoCostCenterTableData']
    "
    :overlayData="$store.state['salesRapidoContract']['quotationOverlayData']"
    tableClass="p-datatable-sm "
    tableDataName="timeLineRapidoCostCenterTableData"
    tableName="timeLineRapidoContractCostCenterTable"
    :tableData="
      $store.state['salesRapidoContract']['timeLineRapidoCostCenterTableData']
    "
    :tableColumns="TableColumnData"
  />
  <Dialog
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['salesRapidoContract'].dialogComponent"
  />
</template>

<script>
import OverviewDataTable from "./DataTabel.vue";
import Dialog from "./Dialogs/Dialog.vue";
export default {
  components: {
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
      if (type == "salesRapidoContract") {
        this.$store.dispatch("salesRapidoContract/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["salesRapidoContract/controlActivityDialog"];
      }
    },
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
