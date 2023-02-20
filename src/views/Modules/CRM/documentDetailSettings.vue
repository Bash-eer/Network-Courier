<template>
  <div class="w-100 tab-class">
    <div class="flex justify-content-between py-3 tabsBar">
      <!-- left contents -->
      <div class="flex ml-4 align-self-center">
        <div class="flex flex-row flex-wrap">
          <div class="flex tabPills mr-6">
            <!-- tabs -->
            <i
              class="pi pi-arrow-left m-1 mr-2"
              style="font-size: 1rem"
              @click="documentDetail"
              v-if="onRowSelectInDataTableId"
            ></i>
            <span class="table-title pointer pr-1"> Document Detail </span>
            <span v-if="onRowSelectInDataTableId" class="table-title">
              > {{ getSelectedJobType.job_type }}</span
            >
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

    <!-- tab-content -->
    <div
      class="tab-content mt-4"
      id="pills-tabContent"
      v-if="!onRowSelectInDataTableId"
    >
      <!-- dynamic component-->
      <documentDetailSettingsTable
        tableClass="p-datatable-sm"
        tableName="DocumentDetailTable"
        :tableData="getDocumentDetailSettingTable"
        :tableColumns="tableColumns"
      />
    </div>

    <div v-if="onRowSelectInDataTableId">
      <documentDetailJobTypeTable
        tableClass="p-datatable-sm"
        tableName="DocumentDetailTable"
        :tableData="getOnRowSelectDataTable"
        :tableColumns="tableColumn"
        @emittedEditDocumentParent="emittedEditDocumentParent"
      />
    </div>
  </div>

  <CRMDocumentDetailSettingsMainDialog
    :dialogComponent="dialogComponent"
    v-bind:is="initialComponent"
    :emittedJobTypeData="emittedJobTypeData"
  />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
const _ = require("lodash");
import InputText from "primevue/inputtext";
import documentDetailSettingsTable from "./DataTable/documentDetailSettingsTable.vue";
import CRMDocumentDetailSettingsMainDialog from "../../../components/CRM/crmDocumentDetailSettingsDialog.vue";
import {
  documentDetailTableColumnData,
  documentDetailJobTypeTableHeader,
} from "../../../components/Reusables/CRM/Const";
import documentDetailJobTypeTable from "./DataTable/documentDetailJobTypeTable.vue";
export default {
  name: "documentDetailSettings",
  components: {
    InputText,
    documentDetailSettingsTable,
    CRMDocumentDetailSettingsMainDialog,
    documentDetailJobTypeTable,
  },
  data: () => ({
    searchValue: "",
    dialogComponent: "DocumentDetailDialog",
    initialComponent: "",
    tableColumns: documentDetailTableColumnData,
    tableColumn: documentDetailJobTypeTableHeader,
    emittedJobTypeData: null,
  }),
  methods: {
    ...mapActions({
      getDocumentDetailSettingsData:
        "CrmSettings/getDocumentDetailSettingsData",
      showDocumentDetailSettingsDialog:
        "CrmSettings/showDocumentDetailSettingsDialog",
      commonSearchForDocumentDetail:
        "CrmSettings/commonSearchForDocumentDetail",
      getOnRowSelectData: "CrmSettings/getOnRowSelectData",
      getJobTypeDropDownList: "CrmSettings/getJobTypeDropDownList",
      changeDocumentDetailTableView: "CrmSettings/updateTableView",
    }),

    documentDetail() {
      this.getDocumentDetailSettingsData();
      this.changeDocumentDetailTableView(false);
    },

    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },

    emittedEditDocumentParent(data) {
      this.emittedJobTypeData = data;
      const dialogData = {
        displayDialog: true,
        formData: data,
      };
      this.showDocumentDetailSettingsDialog(dialogData);
    },

    getOverlayData(tableName) {
      return this.$store.state.masters.crmSettingOverlay;
    },
    openDialog() {
      this.initialComponent = "CRMDocumentDetailSettingsMainDialog";
      const dialogData = {
        displayDialog: true,
        formData: {},
      };
      this.showDocumentDetailSettingsDialog(dialogData);
      if (this.updateBtn == false) {
        this.emittedJobTypeData = null;
      }
    },
    search: _.debounce(function (e) {
      let data = {
        searchValue: this.searchValue,
      };
      this.commonSearchForDocumentDetail(data);
    }, 600),
  },
  mounted() {
    this.getDocumentDetailSettingsData();
  },
  created() {
    this.getJobTypeDropDownList();
  },
  computed: {
    ...mapGetters({
      getDocumentDetailSettingTable:
        "CrmSettings/getDocumentDetailSettingTable",
      getOnRowSelectDataTable: "CrmSettings/getOnRowSelectDataTable",
      onRowSelectInDataTableId: "CrmSettings/onRowSelectInDataTableId",
      updateBtn: "CrmSettings/updateBtn",
      getSelectedJobType: "CrmSettings/getSelectedJobType",
    }),
  },
  watch: {
    "$store.state.CrmSettings.onRowSelectInDataTable": async function () {
      let val = await this.$store.state.CrmSettings.onRowSelectInDataTable;
      await this.getOnRowSelectData(val);
    },
  },
};
</script>

<style lang="scss" scoped></style>
