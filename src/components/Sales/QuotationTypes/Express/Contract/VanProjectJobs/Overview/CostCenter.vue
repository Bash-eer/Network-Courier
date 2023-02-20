<template>
  <div class="flex flex-wrap justify-content-between">
    <div class="flex">
      <span class="van-cost-center-header express-international-font"
        >Costing Center</span
      >
    </div>
    <div>
      <span
        class="van-cost-center-add"
        @click="
          openDialog('CostCenter', 'salesExpressContractVanProjectJobs', 'Add Cost Center')
        "
        >+Add Cost Center</span
      >
    </div>
  </div>
  <br />

  <hr class="horizontal_line" />

  <OverviewDataTable
    v-if="
      $store.state['salesExpressContractVanProjectJobs'][
        'timeLineExpressContractVanProjectJobsCostCenterTableData'
      ].length > 0
    "
    :key="
      $store.state['salesExpressContractVanProjectJobs'][
        'timeLineExpressContractVanProjectJobsCostCenterTableData'
      ]
    "
    :overlayData="
      $store.state['salesExpressContractVanProjectJobs']['quotationOverlayData']
    "
    tableClass="p-datatable-sm "
    tableDataName="timeLineExpressContractVanProjectJobsCostCenterTableData"
    tableName="timeLineExpressContractVanProjectJobsCostCenterTable"
    :tableData="
      $store.state['salesExpressContractVanProjectJobs'][
        'timeLineExpressContractVanProjectJobsCostCenterTableData'
      ]
    "
    :tableColumns="TableColumnData"
  />

</template>

<script>
import OverviewDataTable from "../Overview/Datatable.vue";
import Dialog from "./Dialogs/CostCenter.vue";

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
      this.$store.state["salesExpressContractVanProjectJobs"].contactsStateData = [];
      this.$store.state[
        "salesExpressContractVanProjectJobs"
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
      if (type == "salesExpressContractVanProjectJobs") {
        this.$store.dispatch("salesExpressContractVanProjectJobs/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["salesExpressContractVanProjectJobs/controlActivityDialog"];
      }
    },
  },
};
</script>

<style scoped>
.van-cost-center-header {
  color: #343434;
  font-size: 16px;
  font-weight: 600;
}
.van-cost-center-add {
  color: blue;
  font-size: 14px;
  cursor: pointer;
}
</style>
