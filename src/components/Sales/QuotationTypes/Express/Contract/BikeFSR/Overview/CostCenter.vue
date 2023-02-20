<template>
  <div class="flex flex-wrap justify-content-between">
    <div class="flex">
      <span class="bike-fsr-cost-center-">Costing Center</span>
    </div>
    <div>
      <span
        class="bike-fsr-cost-center-add"
        @click="
          openDialog(
            'CostCenter',
            'salesExpressContractBikeFSR',
            'Add CostCenter'
          )
        "
        >+Add Cost Center</span
      >
    </div>
  </div>
  <br />

  <hr class="horizontal_line" />

  <OverviewDataTable
    v-if="
      $store.state['salesExpressContractBikeFSR'][
        'timeLineExpressContractBikeFSRCostCenterTableData'
      ].length > 0
    "
    :key="
      $store.state['salesExpressContractBikeFSR'][
        'timeLineExpressContractBikeFSRCostCenterTableData'
      ]
    "
    :overlayData="
      $store.state['salesExpressContractBikeFSR']['quotationOverlayData']
    "
    tableClass="p-datatable-sm timeLineExpressContractBikeFSRCostCenterTable"
    tableDataName="timeLineExpressContractBikeFSRCostCenterTableData"
    tableName="timeLineExpressContractBikeFSRCostCenterTable"
    :tableData="
      $store.state['salesExpressContractBikeFSR'][
        'timeLineExpressContractBikeFSRCostCenterTableData'
      ]
    "
    :tableColumns="TableColumnData"
  />

  <Dialog
    v-on:childToParent="closeDialog"
    :dialogComponent="
      $store.state['salesExpressContractBikeFSR'].dialogComponent
    "
  />
</template>

<script>
import OverviewDataTable from "./Datatable.vue";
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
      if (type == "salesExpressContractBikeFSR") {
        this.$store.dispatch("salesExpressContractBikeFSR/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters[
          "salesExpressContractBikeFSR/controlActivityDialog"
        ];
      }
    },
  },
};
</script>

<style scoped>
.bike-fsr-cost-center-header {
  color: #343434;
  font-size: 16px;
  font-weight: 600;
}
.bike-fsr-cost-center-add {
  color: blue;
  font-size: 14px;
  cursor: pointer;
}
</style>
