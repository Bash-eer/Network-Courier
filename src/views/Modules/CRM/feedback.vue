<template>
  <div class="w-100 tab-class">
    <div class="flex justify-content-between py-3 tabsBar">
      <!-- left contents -->
      <div class="flex ml-4 align-self-center">
        <div class="flex flex-row flex-wrap">
          <div class="flex tabPills mr-6">
            <!-- tabs -->
            <span class="table-title">Feedback</span>
          </div>
        </div>
      </div>

      <!-- right contents -->
      <div class="flex align-self-center toolPills">
        <!-- global table search -->
        <div class="mr-3">
          <span class="p-input-icon-left mr-1">
            <i class="pi pi-search" />
            <InputText
              type="text"
              v-model="searchValue"
              class="global-search searchkey"
              @input="search($event.target.value)"
              placeholder="Search"
            />
          </span>
        </div>

        <!--Create Export button -->
        <Buttons
          label="Export Feedback"
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
          :tableClass="getTableClass('feedback')"
          :tableDataName="'feedbackTableData'"
          :tableName="'feedbackTable'"
          :tableData="$store.state['CrmFeedback']['feedbackTableData']"
          :totalRecords="$store.state['CrmFeedback']['totalRecords']"
          :tableColumns="$store.state['CrmFeedback']['feedbackTableColumnData']"
          :overlayData="getOverlayData()"
          v-bind:is="feedbackTableComponent"
          @editFeedback="editFeedbackData"
        ></component>
      </keep-alive>
    </div>
  </div>
  <component
    :dialogComponent="dialogComponent"
    v-bind:is="initialComponent"
    :fromBookingHistory="fromBookingHistory"
  />
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
const _ = require("lodash");
import InputText from "primevue/inputtext";
import FeedbackDataTable from "./DataTable/feedbackDataTable.vue";
import CRMFeedbackMainDialog from "../../../components/CRM/feedbackMainDialog.vue";

export default {
  name: "CRMFeedback",
  components: {
    InputText,
    FeedbackDataTable,
    CRMFeedbackMainDialog,
  },
  data: () => ({
    searchValue: "",
    fromBookingHistory: false,
    feedbackTableComponent: "FeedbackDataTable",
    dialogComponent: "feedbackDialog",
    initialComponent: "",
    paginationParams: {
      offset: 1,
      limit: 10,
      orderBy: ["createdAt", "ASC"],
    },
  }),
  methods: {
    ...mapActions({
      fetchFeedbackData: "CrmFeedback/loadFeedbackDataList",
      showFeedbackDialog: "CrmFeedback/showFeedbackFormDialog",
      loadCostCenterDetails: "CrmFeedback/getAllCostCenterData",
    }),
    ...mapMutations({
      updateBreadCrumbAndTitle: "users/updateBreadCrumbAndTitle",
    }),
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },

    getOverlayData(tableName) {
      return this.$store.state.masters.commonOverlayData;
    },
    openDialog() {
      this.initialComponent = "CRMFeedbackMainDialog";
      const dialogData = {
        displayDialog: true,
        formData: {},
      };
      this.showFeedbackDialog(dialogData);
    },
    openDialogFromHistoryItems(customData) {
      this.initialComponent = "CRMFeedbackMainDialog";
      const dialogData = {
        displayDialog: true,
        formData: {
          priority: "High",
          customer_id: customData.customer_id,
          company_name: customData.companyName,
          cost_center_id: customData.costCenterId,
          caller_id: customData.caller_id,
          feedback_type: "",
          status: "",
          sub_type: "",
          job_type: customData.booking_type,
          conote_type: "",
          conote_or_collection_slip_no: customData.collection_slip_no,
          employee: "",
          assign_to: "",
          notify_to: "",
          subject: "",
          reference: "",
          feedback: "",
          contract_id: customData.contractId,
        },
      };
      this.fromBookingHistory = true;
      this.showFeedbackDialog(dialogData);
    },
    editFeedbackData(dialogData) {
      this.initialComponent = "CRMFeedbackMainDialog";
      this.showFeedbackDialog(dialogData);
    },
    search: _.debounce(function (e) {
      let data = {
        ...this.paginationParams,
        searchValue: this.searchValue,
      };
      this.fetchFeedbackData(data);
    }, 600),
  },
  created() {
    this.updateBreadCrumbAndTitle({
      title: "Feedback",
      breadcrumbInfo: "CRM > Feedback",
    });
    this.fetchFeedbackData(this.paginationParams);
    if (this.$route.params.contractId) {
      let costCenterParams = {
        id: this.$route.params.contractId,
      };
      this.loadCostCenterDetails(costCenterParams);
      this.openDialogFromHistoryItems(this.$route.params);
    }
  },
};
</script>

<style lang="scss" scoped>
.searchkey {
  height: 38px;
}
</style>
