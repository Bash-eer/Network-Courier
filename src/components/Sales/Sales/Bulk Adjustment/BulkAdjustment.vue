<template>
  <div class="flex justify-content-between align-items-center bg-white">
    <div class="flex flex-row m-3">
      <div class="m-2 mt-2 pointer-cursor" @click="setTabHandler">
        <span> <i class="pi pi-arrow-left"></i></span>
      </div>

      <div>
        <div class="flex flex-row">
          <div class="zone-name">{{ rateCardName }}</div>
          <span>
            <img
              v-if="isDefault == true"
              class="m-2"
              src="/images/default.png"
              alt=""
              v-tooltip.top="'Default'"
            />
          </span>
        </div>
      </div>
    </div>
  </div>

  <DataTable
    tableClass="p-datatable-sm AdhocRateCardTable"
    tableDataName="AdhocRateCard"
    :overlayData="overlayData"
    tableName="BulkAdjustmentProfile"
    :tableData="tableData"
    :tableColumns="tableColumnData"
    dataKey="id"
  />
  <Dialog
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['salesSales'].dialogComponent"
  />
  <Toast
    :severity="$store.state['salesSales'].toastData.severity"
    :summary="$store.state['salesSales'].toastData.summary"
  />
</template>

<script>
import DataTable from "./QuotationSubTable.vue";
import Toast from "./BulkAdujustment.vue/Toast.vue";
import Dialog from "../Dialog.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    DataTable,
    Dialog,
    Toast,
  },
  data: () => ({
    rateCardName: "",
    isDefault: null,
    tableColumnData: [
      { field: "s_no", header: "S.No" },
      { field: "Actions", header: "Actions" },
      { field: "profile_name", header: "Profile Name" },
      { field: "sales_person_name", header: "Sales Person" },
      { field: "effective_date", header: "Effective On" },
      { field: "createdAt", header: "Created On" },
      { field: "initial_doc", header: "Initial Doc" },
      { field: "approved_doc", header: "Approved Doc" },
      { field: "confirm_letter", header: "Confirm Letter" },
      { field: "acknowledged", header: "Status" },
    ],
    tableData: [],
    // overlayData: AdhocRatesOverlayData,
  }),
  computed: {
    ...mapGetters({
      batchName: "bulkAdjustment/batchName",
    }),
  },
  methods: {
    setTabHandler() {
      this.$router.push("/sales");
    },
    openDialog(name, type, header) {
      if (type == "bulkAdjustment") {
        this.$store.dispatch("bulkAdjustment/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["bulkAdjustment/controlActivityDialog"];
      }
    },
    getTableData() {
      let s_no = 1;
      this.tableData = [];
      this.$store.state.bulkAdjustment.bulkAdjustmentRowProfileName.profile.map(
        (list) => {
          this.tableData.push({
            id: list.id,
            s_no: s_no++,
            profile_name: list.profile_name,
            sales_person_name: list.sales_person_name,
            effective_date: list.effective_date,
            createdAt: list.createdAt,
            initial_doc: list.initial_doc,
            approved_doc: list.approved_doc,
            confirm_letter: list.confirm_letter,
            acknowledged: list.acknowledged,
            express_contract_type: list.express_contract_type,  
          });
        }
      );
    },
  },
  watch: {
    "$store.state.bulkAdjustment.bulkAdjustmentRowProfileName": function () {
      this.getTableData();
      this.rateCardName =
        this.$store.state.bulkAdjustment.bulkAdjustmentRowProfileName.batch_name;
      // this.tableData =
      //   this.$store.state["bulkAdjustment"]["bulkAdjustmentRowProfileName"];
    },
    // batch_name: function () {
    //   console.log(this.batchName, "batch");
    //   this.rateCardName = this.batchName.batch_name;
    // },
  },
  async created() {
    let id = this.$route.params.id || 5;
    await this.$store.dispatch(
      "bulkAdjustment/loadBulkAdjustmentSecondPageData",
      {
        path: "/sales/contract/bulk-adjustment/batch/" + id,
        mutation: "fetchadhocRatesSecondPageTableData",
      }
    );
    // this.tableData =
    //   this.$store.state["bulkAdjustment"]["bulkAdjustmentRowProfileName"];
    this.rateCardName =
      this.$store.state.bulkAdjustment.bulkAdjustmentRowProfileName.batch_name;
    this.getTableData();

    // this.$store.state.bulkAdjustment.bulkAdjustmentRowProfileName;
    // this.isDefault =
    //   this.$store.state.bulkAdjustment.adhocTableRowRateCardIsDefault;
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.zone-name {
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  color: #4e5968;
}
.rate-card-name {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #4e5968;
}
</style>
