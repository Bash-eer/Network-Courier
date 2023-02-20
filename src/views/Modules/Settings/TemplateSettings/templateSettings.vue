<template>
  <div class="">
    <div class="py-3 tabsBar">
      <div class="ml-3 mb-3 flex justify-content-start align-items-center">
        <DuoSelect
          :options="['Document', 'Email']"
          :default="defaultTransportType"
          type="setRegionDeliveryTransportType"
        />
      </div>

      <div v-if="defaultTransportType == 'Document'">
        <div class="flex justify-content-between align-items-center">
          <div
            class="
              flex
              align-items-center
              flex
              justify-content-start
              mt-3
              ml-3
              color-4e5968
              font-size-18
            "
          >
            <h5>Document Template Settings</h5>
          </div>
          <!-- right contents -->
          <div class="flex align-items-center toolPills">
            <!-- global table search -->
            <div class="mr-3">
              <SearchField storePath="templateSettings" />
            </div>
            <!-- add new button -->
            <Buttons
              button_class="p-button-sm mr-4 ml-2 bg-357dea"
              label="Add New"
              v-on:childToParent="
                openDialog(
                  'documentModuleNameDialog',
                  'templateSettings',
                  'Module Name'
                )
              "
            />
          </div>
        </div>
        <div class="row ml-2 table_div color-7e84a7">
          <div class="col-12">
            <!-- <keep-alive> -->
            <DataTable
              formTableDataName="documentTableData"
              tableName="documentTable"
              :selectionModeState="selectionModeState"
              dataKey="id"
              :tableData="documentTableData"
              :tableColumns="this.$store.state.templateSettings.TableColumnData"
              storePath="templateSettings"
            />
            <!-- </keep-alive> -->
          </div>
        </div>
      </div>
      <div v-if="defaultTransportType == 'Email'">
        <div class="flex justify-content-between align-items-center">
          <h5
            class="
              color-4e5968
              font-size-18
              flex
              justify-content-start
              mt-3
              ml-3
            "
          >
            Email Template Settings
          </h5>
          <!-- right contents -->
          <div class="flex align-items-center toolPills">
            <!-- global table search -->
            <div class="mr-3">
              <SearchField storePath="templateSettings" />
            </div>
            <!-- add new button -->
            <Buttons
              button_class="p-button-sm mr-4 ml-2 bg-357dea"
              label="Add New"
              v-on:childToParent="
                openDialog(
                  'emailModuleNameDialog',
                  'templateSettings',
                  'Module Name'
                )
              "
            />
          </div>
        </div>
        <div class="row ml-2 table_div color-7e84a7">
          <div class="col-12">
            <keep-alive>
              <DataTable
                :key="tripTableData"
                TableDataName="emailTableData"
                :selectionModeState="selectionModeState"
                dataKey="id"
                tableName="emailTable"
                :tableData="emailTableData"
                :tableColumns="
                  this.$store.state.templateSettings.TableColumnData
                "
                storePath="templateSettings"
                :class="checkBoxClickEcom == true ? 'applyAll' : 'Disable'"
              />
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
  </div>
  <TemplateDialogs
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['templateSettings'].dialogComponent"
  />
  <Toasts
    :severity="$store.state['templateSettings'].toastData.severity"
    :summary="$store.state['templateSettings'].toastData.summary"
  />
</template>

<script>
import Toasts from "./Components/Toast.vue";
import TemplateDialogs from "./Dialog.vue";
import DuoSelect from "./Components/Duoselect.vue";
import DataTable from "./Components/DataTable.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "templateSettings",
  components: {
    DuoSelect,
    DataTable,
    TemplateDialogs,
    Toasts,
  },
  data() {
    return {
      defaultTransportType: "Document",
      documentTableData: [],
      emailTableData: [],
    };
  },
  computed: {
    ...mapGetters({
      documentRowData: "templateSettings/documentRowData",
      emailRowData: "templateSettings/emailRowData",
    }),
  },
  watch: {
    "$store.state.templateSettings.addRegionDeliveryTransportType":
      function () {
        this.defaultTransportType =
          this.$store.state.templateSettings.addRegionDeliveryTransportType;
      },
    "$store.state.templateSettings.documentTableData": function () {
      this.documentModulesData();
    },
    "$store.state.templateSettings.eMailTableData": function () {
      this.emailModulesData();
    },
  },
  methods: {
    ...mapActions({
      getDocumentsModulesData: "templateSettings/getDocumentsModulesData",
      getEmailModulesData: "templateSettings/getEmailModulesData",
    }),
    openDialog(name, type, header) {
      // if (type == "salesHome") {
      this.$store.dispatch("templateSettings/openDialog", {
        dialogDetails: {
          dialogName: name,
          dialogHeader: header,
        },
      });
      this.$store.getters["templateSettings/controlActivityDialog"];
    },
    async getDocumentModules() {
      await this.getDocumentsModulesData();

      if (this.$store.state.templateSettings.documentTableData) {
        this.documentModulesData();
      }
    },
    documentModulesData() {
      this.documentTableData = [];

      this.documentTableData =
        this.$store.state.templateSettings.documentTableData;
      let sno = 1;
      for (let i in this.$store.state.templateSettings.documentTableData) {
        this.documentTableData[i].s_no = sno++;
      }
    },
    async getEmailModules() {
      await this.getEmailModulesData();

      if (this.$store.state.templateSettings.eMailTableData) {
        this.emailModulesData();
      }
    },
    emailModulesData() {
      this.emailTableData = [];
      this.emailTableData = this.$store.state.templateSettings.eMailTableData;
      let sno = 1;
      for (let i in this.$store.state.templateSettings.eMailTableData) {
        this.emailTableData[i].s_no = sno++;
      }
    },
  },
  mounted() {
    this.$store.commit("users/updateBreadCrumb", "TemplateSettings");
  },
  created() {
    this.getDocumentModules();
    this.getEmailModules();
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
::v-deep .tabsBar {
  // flex-wrap: wrap;
  background-color: #fff !important;
}
::v-deep .p-datatable {
  padding: 10px !important;
  margin-right: 10px !important;
  background-color: #fff !important;
}
::v-deep .p-selectbutton .p-button.p-highlight {
  background: #357dea;
  border-color: #357dea;
  color: #ffffff;
}
</style>