<template>
  <div class="w-100 tab-class">
    <div class="flex justify-content-between py-3 tabsBar">
      <!-- left contents -->
      <div class="flex ml-4 align-self-center">
        <div class="flex flex-row flex-wrap">
          <div class="flex tabPills mr-6">
            <!-- tabs -->
            <span class="table-title">Feedback Settings</span>
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
          label="Export"
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
    <div class="tab-content mt-4" id="pills-tabContent">
      <!-- dynamic component-->
      <keep-alive>
        <component
          :tableClass="getTableClass('feedback-settings')"
          :tableDataName="'feedbackTableData'"
          :tableName="'feedbackTable'"
          :tableData="$store.state['CrmSettings']['feedbackTableData']"
          :totalRecords="$store.state['CrmSettings']['totalRecords']"
          :tableColumns="$store.state['CrmSettings']['feedbackTableColumnData']"
          :overlayData="getOverlayData()"
          v-bind:is="feedbackTableComponent"
          @editFeedbackSettings="editFeedbackSettingsData"
        ></component>
      </keep-alive>
    </div>
  </div>

  <component :dialogComponent="dialogComponent" v-bind:is="initialComponent" />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
const _ = require("lodash");
import InputText from "primevue/inputtext";
import FeedbackSettingsTable from "./DataTable/feedbackSettingsTable.vue";
import CRMFeedbackSettingsMainDialog from "../../../components/CRM/crmFeedbackSettingsMainDialog.vue";
export default {
  name: "FeedbackSettings",
  components: {
    InputText,
    FeedbackSettingsTable,
    CRMFeedbackSettingsMainDialog,
  },
  data: () => ({
    searchValue: "",
    feedbackTableComponent: "FeedbackSettingsTable",
    dialogComponent: "feedbackSettings",
    initialComponent: "",
  }),
  methods: {
    ...mapActions({
      fetchFeedbackData: "CrmSettings/loadFeedbackSettingsData",
      showFeedbackSettingsDialog: "CrmSettings/showFeedbackSettingsDialog",
      globalSearch: "CrmSettings/commonSearchData",
      updateBreadCrumb: "users/updateBreadCrumbAndTitle",
    }),
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },

    getOverlayData(tableName) {
      return this.$store.state.masters.crmPaymentSettingOverlay;
    },
    openDialog() {
      this.initialComponent = "CRMFeedbackSettingsMainDialog";
      const dialogData = {
        displayDialog: true,
        formData: {},
      };
      this.showFeedbackSettingsDialog(dialogData);
    },
    editFeedbackSettingsData(dialogData) {
      this.initialComponent = "CRMFeedbackSettingsMainDialog";
      this.showFeedbackSettingsDialog(dialogData);
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
    let breadCrumbData = {
      title: "Settings",
      breadcrumbInfo: "CRM Settings > Document",
    };
    this.updateBreadCrumb(breadCrumbData);
  },
};
</script>

<style lang="scss" scoped></style>
