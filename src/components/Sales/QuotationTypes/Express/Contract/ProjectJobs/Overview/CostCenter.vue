<template>
  <div class="flex flex-wrap justify-content-between">
    <div class="flex">
      <span
        class="
          express-project-jobs-cost-center-header express-international-font
        "
        >Costing Center</span
      >
    </div>
    <div>
      <span class="express-project-jobs-cost-center-add" 
      @click="
          openDialog(
            'AddCostCenter',
            'salesExpressContractProjectJobs',
            'CostCenter'
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
      $store.state['salesExpressContractProjectJobs'][
        'timeLineExpressContractProjectJobsCostCenterTableData'
      ].length > 0
    "
    :key="
      $store.state['salesExpressContractProjectJobs'][
        'timeLineExpressContractProjectJobsCostCenterTableData'
      ]
    "
    :overlayData="
      $store.state['salesExpressContractProjectJobs']['quotationOverlayData']
    "
    tableClass="p-datatable-sm "
    tableDataName="timeLineExpressContractProjectJobsCostCenterTableData"
    tableName="timeLineExpressContractBikeCostCenterTable"
    :tableData="
      $store.state['salesExpressContractProjectJobs'][
        'timeLineExpressContractProjectJobsCostCenterTableData'
      ]
    "
    :tableColumns="TableColumnData"
  />
   <Dialog
    v-on:childToParent="closeDialog"
    :dialogComponent="
      $store.state['salesExpressContractProjectJobs'].dialogComponent
    "
  />
</template>

<script>
import OverviewDataTable from "./DataTable.vue";
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
    addCostCenter() {
      this.$store.state["salesExpressContractProjectJobs"].contactsStateData =
        [];
      this.$store.state[
        "salesExpressContractProjectJobs"
      ].costingCentreCreationStateData = {};
    },
    openDialog(name, type, header) {
      this.$store.dispatch(type + "/openDialog", {
        dialogDetails: {
          dialogName: name,
          dialogHeader: header,
        },
      });
      this.$store.getters[type + "/controlActivityDialog"];
      if (type == "salesExpressContractProjectJobs") {
        this.$store.dispatch("salesExpressContractProjectJobs/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["salesExpressContractProjectJobs/controlActivityDialog"];
      }
    },
  },
};
</script>

<style scoped>
.express-project-jobs-cost-center-header {
  color: #343434;
  font-size: 16px;
}
.express-project-jobs-cost-center-add {
  color: blue;
  font-size: 14px;
  cursor: pointer;
}
</style>
