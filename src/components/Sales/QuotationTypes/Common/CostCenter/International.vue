<template>
  <div class="flex flex-wrap justify-content-between">
    <div class="flex">
      <span class="international-contract-header express-international-font"
        >Cost Centers</span
      >
    </div>
    <div>
      <span
        class="international-contract-add color-357dea"
        @click="
          openDialog(
            'InternationalCostCenter',
            'salesCommon',
            'Add Cost Center'
          )
        "
        >+Add Cost Center</span
      >
    </div>
  </div>
  <br />

  <hr class="horizontal_line" />

  <OverviewDataTable
    
    :key="
      $store.state['salesCommon'][
        'internationalCostCenterDataGet'
      ]
    "
    :overlayData="
      $store.state['salesCommon']['internationalCostCenterDataGet']
    "
    tableClass="p-datatable-sm "
    tableDataName="timeLineInternationalCostCenterTableData"
    tableName="timeLineInternationalContractCostCenterTable"
    :tableData="
      $store.state['salesCommon'][
        'internationalCostCenterDataGet'
      ]
    "
    :tableColumns="TableColumnData"
  />

  <Dialog
    v-on:childToParent="closeDialog"
    :dialogComponent="
      $store.state['salesCommon'].dialogComponent
    "
  />

   <Toasts
    :severity="$store.state['salesCommon'].toastData.severity"
    :summary="$store.state['salesCommon'].toastData.summary"
  />
</template>

<script>
import OverviewDataTable from "../DataTable.vue";
import Dialog from "../Dialogs/Dialog.vue";
import Toasts from "../../../QuotationTypes/Common/Toast.vue";
export default {
  components: {
    OverviewDataTable,
    Dialog,
    Toasts,
  },
  data() {
    return {
      TableColumnData: [
        { field: "actions", header: "Actions" },
        { field: "id", header: "S. No" },
        { field: "cost_center_name", header: "Cost Center Name" },
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
    },
  },
  async created() {
    await this.$store.dispatch(
      "salesCommon/loadinternationalCostCenterDataGet",
      {
        id: this.$route.params.id,
      }
    );
  },
};
</script>

<style scoped>
.international-contract-header {
  color: #343434;
  font-size: 16px;
}
.international-contract-add {
  color: blue;
  font-size: 14px;
  cursor: pointer;
}
</style>
