<template>
  <div class="w-100 tab-class">
    <div class="flex justify-content-between py-3 tabsBar">
      <!-- left contents -->
      <div class="flex ml-4 align-self-center">
        <div class="flex flex-row flex-wrap">
          <div class="flex tabPills mr-6">
            <!-- tabs -->
            <span class="table-title">Logistics Settings</span>
          </div>
        </div>
      </div>

      <!-- right contents -->
      <div class="flex align-self-center toolPills">
        <!-- global table search -->
        <div class="mr-3">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              type="text"
              v-model="searchValue"
              class="global-search"
              @input="search($event.target.value)"
              placeholder="Search"
            />
          </span>
        </div>

        <!--Create Export button -->
        <Buttons
          label="Export Report"
          class="p-button-outlined mr-3 ml-2 dialog-button-text"
        />

        <!--Create Add new button-->
        <Buttons
          button_class="p-button-sm mr-4 add-btn custom-add-btn"
          label="Add New"
          v-on:childToParent="openDialog()"
        />
      </div>
    </div>

    <LogisticsDataTable
      tableClass="p-datatable-sm"
      tableName="QuotationTabSubTable"
      :tableData="getLogisticsSettingsTable"
      :tableColumns="tableColumns"
      @emittedEditLogisticParent="emittedEditLogisticParent"
    />
  </div>

  <component :dialogComponent="dialogComponent" v-bind:is="initialComponent" />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
const _ = require("lodash");
import InputText from "primevue/inputtext";
import logisticsSettingsTable from "./DataTable/logisticsSettingsTable.vue";
import CRMLogisticsSettingsMainDialog from "../../../components/CRM/crmLogisticsSettingsMainDialog.vue";
import { LogisticsSettingsFields } from "../../../components/Reusables/CRM/Const";
import LogisticsDataTable from "../../../components/Reusables/CRM/LogisticsDataTable.vue";

export default {
  name: "LogisticsSettings",
  components: {
    InputText,
    CRMLogisticsSettingsMainDialog,
    logisticsSettingsTable,
    LogisticsDataTable,
  },
  data: () => ({
    searchValue: "",
    logisticsSettingsTable: "logisticsSettingsTable",
    dialogComponent: "LogisticsSettingsFields",
    initialComponent: "",
    tableColumns: LogisticsSettingsFields,
    dataArray: [],
  }),
  methods: {
    ...mapActions({
      fetchFeedbackData: "CrmSettings/loadFeedbackSettingsData",
      showFeedbackSettingsDialog: "CrmSettings/showFeedbackSettingsDialog",
      showLogisticsSettingsDialog: "CrmSettings/showLogisticsSettingsDialog",
      globalSearch: "CrmSettings/commonSearchData",
      fetchLogisticsData: "CrmSettings/loadLogisticsSettingsData",
    }),
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },

    getOverlayData(tableName) {
      return this.$store.state.masters.crmSettingOverlay;
    },
    openDialog() {
      this.initialComponent = "CRMLogisticsSettingsMainDialog";
      const dialogData = {
        displayDialog: true,
        formData: {},
      };

      this.showLogisticsSettingsDialog(dialogData);
    },

    emittedEditLogisticParent(data) {
      this.initialComponent = "CRMLogisticsSettingsMainDialog";
      const dialogData = {
        displayDialog: true,
        formData: data,
      };
      this.showLogisticsSettingsDialog(dialogData);
    },

    search: _.debounce(function (e) {
      let data = {
        searchValue: this.searchValue,
      };
      this.globalSearch(data);
    }, 600),
  },
  created() {
    this.fetchFeedbackData();
    this.fetchLogisticsData();
  },
  computed: {
    ...mapGetters({
      getLogisticsSettingsTable: "CrmSettings/getLogisticsSettingsTable",
      getLogisticsTableData: "CrmSettings/getLogisticsTableData",
    }),
  },
};
</script>

<style lang="scss" scoped></style>
