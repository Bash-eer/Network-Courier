<template>
  <div class="flex flex-wrap justify-content-between">
    <div class="flex">
      <span class="international-contract-header express-international-font"
        >Costing Center</span
      >
    </div>
    <div>
      <span
        class="international-contract-add"
        @click="
          openDialog(
            'AddCostCenter',
            'salesInternationalContract',
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
      $store.state['salesInternationalContract'][
        'timeLineInternationalCostCenterTableData'
      ].length > 0
    "
    :key="
      $store.state['salesInternationalContract'][
        'timeLineInternationalCostCenterTableData'
      ]
    "
    :overlayData="
      $store.state['salesInternationalContract']['quotationOverlayData']
    "
    tableClass="p-datatable-sm "
    tableDataName="timeLineInternationalCostCenterTableData"
    tableName="timeLineInternationalContractCostCenterTable"
    :tableData="
      $store.state['salesInternationalContract'][
        'timeLineInternationalCostCenterTableData'
      ]
    "
    :tableColumns="TableColumnData"
  />

  <Dialog
    v-on:childToParent="closeDialog"
    :dialogComponent="
      $store.state['salesInternationalContract'].dialogComponent
    "
  />
</template>

<script>
import OverviewDataTable from "./DataTabel.vue";
import Dialog from "./Dialogs/dialog.vue";
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
      if (type == "salesInternationalContract") {
        this.$store.dispatch("salesInternationalContract/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["salesInternationalContract/controlActivityDialog"];
      }
    },
  },
  async created() {
    await this.$store.dispatch(
      "salesInternationalContract/loadtimeLineInternationalCostCenterTableData",
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
