<template>
  <div class="w-100 tab-class">
    <div class="flex justify-content-between py-3 tabsBar">
      <!-- left contents -->
      <div class="flex ml-4 align-self-center">
        <div class="flex flex-row flex-wrap">
          <div class="flex tabPills mr-6">
            <!-- tabs -->
            <span class="table-title">Live Job Status</span>
          </div>
        </div>
      </div>
      <div>
        <Buttons button_class="export_button min-width-99 " label="Export" />
      </div>
    </div>

    <div class="d-flex mb-3 relative">
      <Dropdown
        v-model="searchKey"
        :value="searchKey"
        :options="globalSearchList"
        optionLabel="name"
        optionValue="key"
        :filter="true"
        class="ml-3"
      />
      <InputText
        class="p-inputtext p-component w-100 ml-3 mr-3 border-radius-8"
        type="text"
        placeholder="Search by Company Name, Customer ID..."
        v-model="saerchValue"
      />
      <Buttons
        :icon="'pi pi-search'"
        v-on:childToParent="search"
        button_class="buttonClass-customer-launch-go bold-700 bg-fff color-357dea font-size-18 color-fff bg-1e90ff absolute border-radius-3  BtnAbsolute-customer-card global-search"
      />
    </div>

    <div class="flex ml-2">
      <div class="flex flex-row flex-wrap">
        <div class="flex tabPills mr-6">
          <!-- tabs -->
          <ul
            class="nav nav-pills tab-padding px-1 operations-job-status-tab-nav"
            id="pills-tab"
            role="tablist"
          >
            <li
              class="nav-item"
              role="presentation"
              v-for="(tabs, index) of tabMenuData"
              :key="tabs.label"
            >
              <button
                @click="tabChange(tabs)"
                :class="
                  index == defaultTabIndex ? 'nav-link active' : 'nav-link'
                "
                :id="'pills-' + tabs.label + '-tab'"
                data-bs-toggle="pill"
                :data-bs-target="'#pills-' + tabs.label"
                type="button"
                role="tab"
                :aria-controls="'pills-' + tabs.label"
                :aria-selected="index == defaultTabIndex ? true : false"
              >
                {{ tabs.tabName }}
                <span class="notification-icon" v-if="showSearchCount">{{
                  $store.state["liveJobStatus"][tabs.totalCount]
                }}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- tab-content -->
    <div class="tab-content mt-4" id="pills-tabContent">
      <div
        v-for="(tabs, index) of tabMenuData"
        :key="tabs.label"
        :class="
          index == defaultTabIndex
            ? 'tab-pane fade show active'
            : 'tab-pane fade show'
        "
        :id="'pills-' + tabs.label"
        role="tabpanel"
        :aria-labelledby="'pills-' + tabs.label + '-tab'"
      >
        <!-- dynamic component-->

        <component
          v-model:selection="selectionMode"
          :tableClass="getTableClass(tabs.label)"
          :tableDataName="tabs.data"
          :tableName="tabs.label"
          :tabPageOffset="tabs.pageOffset"
          :overlayData="overlayListData"
          :tableData="$store.state['liveJobStatus'][tabs.data]"
          :totalRecords="$store.state['liveJobStatus']['totalRecords']"
          :tableColumns="$store.state['liveJobStatus'][tabs.columns]"
          v-bind:is="tabs.tab"
          :currentTab="currentTab"
          storePath="liveJobStatus"
          formTableDataName="livejobFormTableData"
          :selectionModeState="selectionModeState"
          dataKey="id"
          :dateRangeValue="dateRangeValue"
          @emittedUpdateRouteSettingsParent="emittedUpdateRouteParent"
          @emitUpdateStatusData="showUpdateStatusDialog"
          @emitFilterListData="emittedAdvanceFilterList"
          @emitAdavnceFilterDialog="emitAdvanceFilterDialogData"
          @emitPrintLabelData="showPrintLabelDialog"
          @emitPodStatusData="showPodStatusDialog"
          @emitSendSMSDialogToParent="showSendSMSDialog"
        ></component>
      </div>
    </div>
  </div>
  <component
    :dialogComponent="dialogComponent"
    :selectedTab="currentTab"
    :filterList="filterList"
    :dialogData="updateStatusDialogData"
    :title="dialogTitle"
    v-bind:is="initialComponent"
  />
  <Toasts
    :severity="$store.state['liveJobStatus'].toastData.severity"
    :summary="$store.state['liveJobStatus'].toastData.summary"
  />
  <updateRouteSettingsMainDialog
    :emittedUpdateRouteSettingsData="emittedUpdateRouteSettingsData"
    :emitMultipleData="emitMultipleData"
    :selectedTab="currentTab"
    :paginationParams="paginationParams"
    :saerchValue="saerchValue"
    :searchKey="searchKey"
  />
</template>

<script>
import Toasts from "./Toast.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
const _ = require("lodash");
import InputText from "primevue/inputtext";
import LiveJobStatusTable from "./liveJobStatusTable";
import updateRouteSettingsMainDialog from "../liveJobStatus/updateRouteSettingsMainDialog.vue";
import AdvanceFilterDialogMain from "../../../../components/Operations/advanceFilterOnLiveJobStatusMainDialog.vue";
import UpdateStatusMain from "../../../../components/Operations/updateStatusOnLiveJobStatusMain.vue";
import PrintPreviewMain from "../../../../components/Operations/printPreviewDialogMain.vue";
import Dropdown from "primevue/dropdown";
import TrackStatusMainDialog from "../../../../components/CRM/trackStatusMainDialog";
import SendSMSMain from "../../../../components/Operations/sendSMSMainDialog.vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import moment from "moment";

export default {
  name: "LiveJobStatus",
  components: {
    InputText,
    LiveJobStatusTable,
    updateRouteSettingsMainDialog,
    AdvanceFilterDialogMain,
    UpdateStatusMain,
    PrintPreviewMain,
    Dropdown,
    Toasts,
    TrackStatusMainDialog,
    SendSMSMain,
  },
  data: () => ({
    defaultTabIndex: 0,
    currentTab: "BikeTab",
    saerchValue: "",
    dialogComponent: "",
    initialComponent: "",
    selectionModeState: [],
    dateRangeValue: null,
    selectionMode: [],
    renderkey: 10,
    paginationParams: {
      offset: 1,
      limit: 10,
      orderBy: ["createdAt", "ASC"],
      filter_params: [],
      renderkey: 10,
    },
    filterList: {},
    emittedUpdateRouteSettingsData: null,
    updateStatusDialogData: null,
    updatedAdvanceFilterList: [],
    globalSearchList: [
      { id: 1, name: "Company Name", key: "company_name" },
      { id: 2, name: "Customer ID", key: "customer_id" },
      { id: 3, name: "Job Reference No.", key: "job_ref_no" },
      { id: 4, name: "Collection Slip No.", key: "collection_slip_no" },
      { id: 5, name: "Order No.", key: "order_reference_no" },
      { id: 6, name: "Job Sheet No.", key: "job_sheet_id" },
    ],
    searchKey: "company_name",
    showSearchCount: false,
    dialogTitle: "",
    emitMultipleData: null,
    documentTitle: null,
    filteredItems: [],
  }),
  methods: {
    ...mapActions({
      liveJobStatusData: "liveJobStatus/loadLiveJobStatusList",
      showUpdateRouteSettingsDialog:
        "liveJobStatus/showUpdateRouteSettingsDialog",
      showAdvanceFilterDialog: "liveJobStatus/showFilterDialog",
      isUpdateStatusDialog: "liveJobStatus/showUpdateStatusDialog",
      isPrintLabelDialog: "liveJobStatus/showPrintPreviewDialog",
      updateFilterParams: "liveJobStatus/updateCommonFilterParams",
      showTrackStatusDialog: "customerLaunchBookingHistory/showTrackDialog",
      getTrackStatus:
        "customerLaunchBookingHistory/loadOverAllTrackStatusForARow",
      isUpdateSMSDialog: "liveJobStatus/showSendSMSDialog",
      clearAdvanceFilter: "liveJobStatus/clearAdvanceFilterOnLiveJobStatus",
    }),
    ...mapMutations({
      updateBreadCrumbAndTitle: "users/updateBreadCrumbAndTitle",
    }),
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },
    async tabChange(tab) {
      if (this.currentTab !== tab.label) {
        this.dateRange = null;
        this.dateRangeValue = [];
        this.selectionMode = null;
        this.renderkey++;
      }
      this.currentTab = tab.label;
      this.defaultTabIndex =
        this.currentTab == "BikeTab" ? 0 : this.currentTab == "VanTab" ? 1 : 2;
      this.loadInitialTableData();
    },
    emittedUpdateRouteParent(data) {
      this.emittedUpdateRouteSettingsData = data.data;
      this.emitMultipleData = data.multipleData;
      this.$store.state.liveJobStatus.updateRouteSettingsDialog = true;
    },
    showUpdateStatusDialog(data) {
      this.updateStatusDialogData = data;
      const dialogData = {
        displayDialog: true,
        formData: this.updateStatusDialogData,
      };
      this.initialComponent = "UpdateStatusMain";
      this.dialogComponent = "UpdateStatusOnLiveJobStatus";
      this.isUpdateStatusDialog(dialogData);
    },
    showSendSMSDialog(data) {
      this.updateStatusDialogData = data;
      const dialogData = {
        displayDialog: true,
      };
      this.initialComponent = "SendSMSMain";
      this.dialogComponent = "SendSMS";
      this.isUpdateSMSDialog(dialogData);
    },
    showPrintLabelDialog(data) {
      this.updateStatusDialogData = data.data;
      this.dialogTitle = data.title;
      const dialogData = {
        displayDialog: true,
        formData: this.updateStatusDialogData,
      };
      this.initialComponent = "PrintPreviewMain";
      this.dialogComponent = "PrintPreview";
      this.isPrintLabelDialog(dialogData);
    },
    emitAdvanceFilterDialogData(dialogData) {
      this.initialComponent = "AdvanceFilterDialogMain";
      this.dialogComponent = "AdvanceFilterDialog";
      this.showAdvanceFilterDialog(dialogData);
    },
    showPodStatusDialog(dialogData) {
      let id = dialogData.id;
      this.initialComponent = "TrackStatusMainDialog";
      this.dialogComponent = "TrackStatusDialog";
      this.getTrackStatus(id);
      this.showTrackStatusDialog(true);
    },
    emittedAdvanceFilterList(filterList) {
      this.filterList = filterList;
    },
    async search() {
      this.showSearchCount = true;
      let searchValue =
        this.saerchValue != "" && this.saerchValue != null
          ? [this.searchKey, this.saerchValue]
          : [];
      let data = {
        globalsearchkey: searchValue,
        bike: this.paginationParams,
        van: this.paginationParams,
        rapido: this.paginationParams,
        currentTab: this.currentTab,
      };
      await this.updateFilterParams(data);
      let advanceFilterData = {
        filter_params: this.filterList,
        formData: {},
        currentTab: this.currentTab,
      };

      //Clear advance filter on search
      this.clearAdvanceFilter(advanceFilterData);

      //For clear date range option
      this.dateRangeValue = [];

      this.liveJobStatusData(data).then((response) => {
        const liveJobStatusData = response?.data?.results || {};
        let bikeCount = liveJobStatusData.bike.count;
        let vanCount = liveJobStatusData.van.count;
        let rapidoCount = liveJobStatusData.rapido.count;
        let currentTab =
          bikeCount > vanCount
            ? bikeCount > rapidoCount
              ? "BikeTab"
              : "RapidoTab"
            : vanCount > rapidoCount
            ? "VanTab"
            : "RapidoTab";
        this.currentTab = currentTab;
        this.defaultTabIndex =
          this.currentTab == "BikeTab"
            ? 0
            : this.currentTab == "VanTab"
            ? 1
            : 2;
      });
    },

    getColumnName(column) {
      if (column.column_name == "collection_slip_no") {
        return "booking.collection_slip_no";
      } else if (column.column_name == "company_name") {
        return "company_details.company_name";
      } else if (column.column_name == "zone_name") {
        return "zone.zone_name";
      } else if (column.column_name == "route_name") {
        return "route.route_name";
      } else if (column.column_name == "trip_name") {
        return "trip.trip_name";
      } else if (column.column_name == "display_name") {
        return "rider.display_name";
      } else {
        return column.column_name;
      }
    },

    async setFilterData(filteredEvents) {
      this.filteredItems = [];
      await this.filterParams.map((res) => {
        let columnName = this.getColumnName(res);
        if (
          res.column_name &&
          filteredEvents[columnName]["constraints"][0]["value"]
        ) {
          let searchKey = filteredEvents[columnName]["constraints"][0]["value"];

          if (res.column_name == "createdAt") {
            let date1 =
              filteredEvents[columnName]["constraints"][0]["value"][0];
            let date2 =
              filteredEvents[columnName]["constraints"][0]["value"][1];
            if (
              filteredEvents[columnName]["constraints"][0]["value"].length >
                0 &&
              date1 != "" &&
              date2 != ""
            ) {
              let utcDate1 = moment(date1)
                .set({ hour: 0, minutes: 0 })
                .toISOString();
              let utcDate2 = moment(date2)
                .set({ hour: 0, minutes: 0 })
                .toISOString();
              searchKey = [utcDate1, utcDate2];
            } else {
              searchKey = [];
            }
          }

          let filterObject = {
            column_name: res.column_name,
            type:
              res.column_name == "createdAt"
                ? "dateRange"
                : filteredEvents[columnName]["constraints"][0]["matchMode"],
            searchKey: searchKey,
          };

          this.filteredItems.push(filterObject);
          return res;
        }
      });
    },

    async loadInitialTableData() {
      this.showSearchCount = false;
      let searchValue =
        this.saerchValue != "" && this.saerchValue != null
          ? [this.searchKey, this.saerchValue]
          : [];
      await this.setFilterData(this.filterList);
      this.paginationParams.filter_params = this.filteredItems;

      let paginationParams = {
        globalsearchkey: searchValue,
        bike: this.paginationParams,
        van: this.paginationParams,
        rapido: this.paginationParams,
        currentTab: this.currentTab,
      };
      this.liveJobStatusData(paginationParams);
    },
    loadInitialFilter() {
      this.filterList = {
        "booking.collection_slip_no": {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        group_id: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        job_type: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        job_priority: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        createdAt: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.BETWEEN }],
        },
        "company_details.company_name": {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        "zone.zone_name": {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        "route.route_name": {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        "trip.trip_name": {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        "rider.display_name": {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        status: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        special_monitoring: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        customer_type: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        booked_via: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        project_job: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.EQUALS }],
        },
        home_address: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.EQUALS }],
        },
      };
    },
  },
  created() {
    this.loadInitialFilter();
    this.loadInitialTableData();
    this.updateBreadCrumbAndTitle({
      title: "Operations",
      breadcrumbInfo: "Operations > Trip Manager > Live Job Status",
    });
  },
  computed: {
    ...mapGetters({
      tabMenuData: "liveJobStatus/getLiveJobStatusTabData",
      overlayListData: "liveJobStatus/getLiveJobStatusOverlayData",
      filterParams: "liveJobStatus/getFilterParams",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
@media only screen and (max-width: 600px) {
  body {
    background-color: $color-fff !important;
  }
  ::v-deep .tabsBar {
    flex-wrap: wrap;
    background-color: $color-fff !important;
  }
  .toolPills {
    flex-wrap: wrap;
  }
}
a {
  text-decoration: none;
}
.operations-zones-tab-nav {
  border: 1px solid #cecece;
}
::v-deep .p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
  background: $color-fff !important;
}
::v-deep .p-datatable.p-datatable-sm .p-datatable-tbody > tr > td > span {
  font-family: $font-family-third !important;
}

::v-deep
  [data-v-1f88fdea]
  .p-datatable
  .p-sortable-column
  .p-sortable-column-icon,
::v-deep
  [data-v-c02eca38]
  .p-datatable
  .p-sortable-column
  .p-sortable-column-icon {
  color: $color-7e84a7 !important;
  width: 10.5px !important;
  height: 9px !important;
  font-size: 10px !important;
}
.nav-pills .nav-link.active[data-v-1f88fdea] {
  font-family: $font-family-third !important;
}
// ::v-deep .p-datatable.p-datatable-sm .p-datatable-header {
//   margin-left: 12px;
// }
::v-deep .global-search {
  height: 27px !important;
}
::v-deep .p-datatable {
  padding: 0px !important;
}
.notification-icon {
  position: absolute;
  background: red;
  display: inline-block;
  margin-top: -15px;
  height: 18px;
  width: auto;
  font-size: 12px;
  border-radius: 8px;
  color: #ffffff;
  padding: 0px 5px 0px;
}
::v-deep .p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
  cursor: grabbing !important;
}
.export_button {
  right: 25px;
  background: #ffffff;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  border: 1px solid #357dea;
  border-radius: 4px;
  color: #357dea;
}
</style>
