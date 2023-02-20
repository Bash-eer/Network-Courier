<template>
  <!-- <Card> -->
  <!--CARD HEADER-->
  <!-- <template #header> -->
  <div
    class="flex justify-content-between align-items-center mt-1 mb-0 bg-white"
  >
    <div class="flex flex-row m-3">
      <div class="contract-name">Express Contract Rates</div>
    </div>

    <div class="flex">
      <div class="flex flex-row">
        <SearchField storePath="contacts" />
        <Buttons
          label="Add New"
          button_class="p-button-sm mx-2 add-btn custom-add-btn"
          v-on:childToParent="
            openDialog('AddNewRate', 'expressContract', 'Add New')
          "
        />
      </div>
    </div>
  </div>

  <!-- </template> -->
  <!--CARD CONTENT-->
  <!-- <template #content> -->
  <ContractTable
    tableClass="p-datatable-sm contract-table"
    tableDataName="ContractTableData"
    :overlayData="overlayData"
    tableName="ContractDataTable"
    :tableData="rateCard"
    :tableColumns="tableColumnData"
    dataKey="id"
  />

  <!-- </template> -->
  <!-- </Card> -->
  <!--dialog-->
  <ExpressContractDialogs
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['expressContract'].dialogComponent"
  />
  <!--toast-->
  <Toasts
    :severity="$store.state['expressContract'].toastData.severity"
    :summary="$store.state['expressContract'].toastData.summary"
  />
</template>

<script>
import axios from "axios";
const { URL } = require("../../../../../../config/const");
import { mapState, mapActions } from "vuex";
import ExpressContractDialogs from "./Dialog.vue";
import {
  ADD_RATES_STEPS,
  ContractTableOverlayData,
  express_contract_tablecolumdata,
} from "./const/const";
import ContractTable from "./Tables/ContractTable.vue";
import Toasts from "./Toasts.vue";
export default {
  components: {
    ContractTable,
    Toasts,
    ExpressContractDialogs,
  },
  data: () => ({
    tableColumnData: express_contract_tablecolumdata,
    overlayData: ContractTableOverlayData,
    renderkey: 10,
  }),
  computed: {
    ...mapState({
      rateCard: (state) => state.express.rateCards,
      regionRatesDataChange: (state) =>
        state.expressContract.regionRatesDataChange,
    }),
  },
  mounted() {
    this.initialise();
  },
  methods: {
    ...mapActions("express", ["getRateCards", "setCurrentStep"]),

    initialise() {
      this.getRateCards();
    },
    openDialog(name, type, header) {
      //opens express contract dialogs
      if (type == "expressContract") {
        this.$store.dispatch("expressContract/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["expressContract/controlActivityDialog"];
        this.setCurrentStep(ADD_RATES_STEPS.ONE);
      }
    },
  },
  created() {
    this.$store.dispatch("expressContract/loadContractTableData", {
      path: "/settings/salesSettings/rates/express/contract/regionRateCards",
      mutation: "fetchContractTableData",
    });
    axios.defaults.baseURL = URL.BACKEND_BASEURL;
  },
  watch: {
    regionRatesDataChange: function () {
      this.getRateCards();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.contract-name {
  font-weight: bold;
  font-size: 16px;
  line-height: 28px;
  color: #4e5968;
}
::v-deep .contract-table.p-card .p-card-body {
  padding: 0 !important;
}
</style>
