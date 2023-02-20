<template>
  <div class="flex flex-wrap justify-content-between">
    <div class="flex">
      <span
        class="
          express-inter-company-cost-center-header express-international-font
        "
        >Costing Center</span
      >
    </div>
    <div>
      <span
        class="express-inter-company-cost-center-add"
        @click="
          openDialog(
            'CostCenter',
            'salesExpressContractInterCompany',
            'Cost Center'
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
      $store.state['salesExpressContractInterCompany'][
        'timeLineExpressContractInterCompanyCostCenterTableData'
      ].length > 0
    "
    :key="
      $store.state['salesExpressContractInterCompany'][
        'timeLineExpressContractInterCompanyCostCenterTableData'
      ]
    "
    :overlayData="
      $store.state['salesExpressContractInterCompany']['quotationOverlayData']
    "
    tableClass="p-datatable-sm "
    tableDataName="timeLineExpressContractInterCompanyCostCenterTableData"
    tableName="timeLineExpressContractBikeCostCenterTable"
    :tableData="
      $store.state['salesExpressContractInterCompany'][
        'timeLineExpressContractInterCompanyCostCenterTableData'
      ]
    "
    :tableColumns="TableColumnData"
  />

  <Dialog
    v-on:childToParent="closeDialog"
    :dialogComponent="
      $store.state['salesExpressContractInterCompany'].dialogComponent
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
    openDialog(name, type, header) {
      this.$store.dispatch(type + "/openDialog", {
        dialogDetails: {
          dialogName: name,
          dialogHeader: header,
        },
      });
      this.$store.getters[type + "/controlActivityDialog"];
      if (type == "salesExpressContractInterCompany") {
        this.$store.dispatch("salesExpressContractInterCompany/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters[
          "salesExpressContractInterCompany/controlActivityDialog"
        ];
      }
    },
  },
};
</script>

<style scoped>
.express-inter-company-cost-center-header {
  color: #343434;
  font-size: 16px;
}
.express-inter-company-cost-center-add {
  color: blue;
  font-size: 14px;
  cursor: pointer;
}
</style>
