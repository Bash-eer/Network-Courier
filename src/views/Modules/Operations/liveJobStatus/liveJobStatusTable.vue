<template>
  <DataTable
    :loading="$store.state['liveJobStatus'].tableLoad"
    :class="tableClass"
    :showGridlines="false"
    :stripedRows="true"
    id="formTable"
    editMode="cell"
    :rowClass="rowClass"
    responsiveLayout="scroll"
    :value="tableData"
    :paginator="true"
    selectionMode="multiple"
    v-model:selection="selectionMode"
    :dataKey="dataKey"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    @row-select-all="selectAllRows"
    @row-unselect-all="unSelectAllRows"
    v-model:expandedRows="expandedRows"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
    :lazy="true"
    @page="onChangePage($event)"
    @sort="onSort($event)"
    @filter="onFilter($event)"
    :totalRecords="totalRecords"
    :rows="$store.state['liveJobStatus'].pageLimit"
    v-model:filters="filters"
    filterDisplay="menu"
    reorderableColumns="true"
    @columnReorder="onColReorder"
    :globalFilterFields="[
      'booking.collection_slip_no',
      'group_id',
      'job_type',
      'job_priority',
      'createdAt',
      'zone.zone_name',
      'route.route_name',
      'trip.trip_name',
      'rider.display_name',
      'status',
    ]"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <Column :expander="true" headerStyle="width: 1rem" />
    <template #header>
      <div class="flex flex justify-content-between w-full">
        <div class="text-left">
          <MultiSelect
            :modelValue="selectedColumns"
            :options="tableColumns"
            optionLabel="header"
            @update:modelValue="onToggle"
            placeholder="Select Columns"
            style="width: 20em"
            :filter="true"
          />
        </div>
        <div class="text-right border-right">
          <Calendar
            inputId="range"
            v-model="dateRange"
            selectionMode="range"
            :manualInput="false"
            placeholder="Select Date Range"
          />

          <!--Create Export button -->
          <Buttons
            label="Advanced Filter"
            class="p-button-outlined ml-2 dialog-button-text"
            v-on:childToParent="openAdvanceFilterDialog()"
          />
        </div>
      </div>
      <br />
      <div
        class="table-header-container flex justify-content-start"
        @click="toggle"
      >
        <span class="color-7a7a7a font-size-16 bold-600"
          >Selected profiles :
        </span>
        <span class="ml-2 color-4e5968 font-size-16 bold-600"
          >{{ SelectedProfile.length }}
        </span>
        <OverlayPanel ref="op">
          <span class="filesHeader bodyTxt">Files:</span>
          <div class="flex flex-column p-1">
            <div
              class="flex mt-2"
              v-for="(files, index) in SelectedProfile"
              :key="index"
            >
              {{ index + 1 }}.
              <span class="filesText ml-1">{{ files["job_type"] }}</span>
            </div>
          </div>
        </OverlayPanel>
      </div>
    </template>
    <Column
      selectionMode="multiple"
      headerStyle="width: 1rem"
      :reorderableColumn="false"
    ></Column>
    <Column
      v-for="col of selectedColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :filterField="col.field"
      :reorderableColumn="true"
      :showFilterMenu="
        col.header != 'Actions' && col.header != 'Company Details'
          ? true
          : false
      "
      :sortable="
        col.header != 'Actions' && col.header != 'Company Details'
          ? true
          : false
      "
      :dataType="col.header == 'Date' ? 'date' : 'text'"
      :showFilterMatchModes="
        col.header != 'Actions' && col.header != 'Company Details'
          ? true
          : false
      "
    >
      <template #body="slotProps">
        <span v-if="col.header == 'Actions'" class="mr-2">
          <CustomSpeedDial
            storePath="liveJobStatus"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :currentTab="currentTab"
            :SelectedProfile="SelectedProfile"
            :customDialData="processOverlayData(overlayData, slotProps.data)"
            @emitUpdateRouteSettings="emittedUpdateRouteSettings"
            @emitUpdateStatus="emitUpdateStatusDialog"
            @emitPodReport="editPodDialogData"
            @emitSendSMS="emitSMSDialog"
            @emitPrintLabel="emitPrintLabelDialog"
          />
        </span>

        <span v-if="col.header == 'Collection Slip No'">
          {{ slotProps.data?.booking?.collection_slip_no || "-" }}
        </span>

        <span v-if="col.header == 'Group ID'" class="mr-2">
          {{ slotProps.data?.group_id }}
        </span>

        <span v-if="col.header == 'Job Type'" class="mb-1 mr-3">
          {{ slotProps.data?.job_type }}
        </span>

        <span v-if="col.header == 'Priority'" class="mb-1 mr-3">
          {{ slotProps.data?.job_priority }}
        </span>

        <span v-if="col.header == 'Date'" class="mb-1 mr-3">
          {{ dateFormater(slotProps.data?.createdAt) }}
        </span>

        <span v-if="col.header == 'Company Details'" class="mb-1 mr-3">
          <div class="flex flex-row">
            <img
              src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
              class="company-image mr-2"
              width="30"
            />
            <div class="flex flex-column justify-content-center">
              <div class="flex heading">
                {{ slotProps.data?.company_details[0]?.customer_id || "-" }}
              </div>
              <div class="flex sub">
                {{ slotProps.data?.company_details[0]?.company_name || "-" }}
              </div>
            </div>
          </div>
        </span>

        <span v-if="col.header == 'Zone'" class="mr-2">
          {{ slotProps.data?.zone?.zone_name || "-" }}
        </span>

        <span v-if="col.header == 'Route'" class="mb-1 mr-3">
          {{ slotProps.data?.route?.route_name || "-" }}
        </span>

        <span v-if="col.header == 'Trip'">
          {{ slotProps.data?.trip?.trip_name || "-" }}
        </span>

        <span v-if="col.header == 'Rider'">
          {{ slotProps.data?.rider?.display_name || "-" }}
        </span>

        <span v-if="col.header == 'Status'">
          <span :style="expressStatusBackgroundStyle(slotProps.data?.status)">
            <span :style="expressStatusColorStyle(slotProps.data?.status)">{{
              slotProps.data?.status
            }}</span>
          </span>
        </span>
      </template>

      <template #filter="{ filterModel }">
        <span v-if="col.header == 'Status'">
          <Dropdown
            optionValue="code"
            optionLabel="name"
            v-model="filterModel.value"
            :options="liveJobStatusFilterDropdownData"
            placeholder="Search By Status"
            class="p-column-filter"
            :showClear="true"
          >
            <template #value="slotProps">
              <span
                :style="expressStatusBackgroundStyle(slotProps.value)"
                v-if="slotProps.value"
              >
                <span :style="expressStatusColorStyle(slotProps.value)">{{
                  slotProps.value
                }}</span>
              </span>
              <span v-else>{{ slotProps.placeholder }}</span>
            </template>
            <template #option="slotProps">
              <span
                :style="expressStatusBackgroundStyle(slotProps.option.name)"
              >
                <span :style="expressStatusColorStyle(slotProps.option.name)">{{
                  slotProps.option.name
                }}</span>
              </span>
            </template>
          </Dropdown>
        </span>

        <span v-if="col.header !== 'Date' && col.header !== 'Status'">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            placeholder="Search by name"
          />
        </span>
        <span v-if="col.header === 'Date'">
          <p class="mb-2"><b>Set a date range:</b></p>
          <Calendars
            :state="filterModel.value"
            v-model="filterModel.value"
            dateFormat="mm/dd/yy"
            placeholder="mm/dd/yyyy"
          />
        </span>
      </template>
    </Column>
    <template #empty> No data found </template>
    <template #expansion="slotProps">
      <liveJobStatusExpansion
        :tableClass="'p-datatable-sm expansion' + slotProps.data.id"
        :dataKey="getLiveJobExpansionListArray.results?.info"
      />
      <expansionTable :dataKey="slotProps.data" :statusId="statusId" />
      <!-- <div>
        <VerticalTimeLine
          :parcelJobs="getLiveJobExpansionListArray.results"
          :referenceNo="
            getLiveJobExpansionListArray.results?.collection_slip_no
          "
        ></VerticalTimeLine>
      </div> -->
    </template>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import CustomSpeedDial from "./customSpeedDial.vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import { mapActions, mapGetters, mapState } from "vuex";
import MultiSelect from "primevue/multiselect";
import OverlayPanel from "primevue/overlaypanel";
import expansionTable from "../liveJobStatus/expansionTable.vue";
import liveJobStatusExpansion from "../liveJobStatus/liveJobStatusExpansion.vue";
// import VerticalTimeLine from "../liveJobStatus/liveJobVerticalTimeLine.vue";

export default {
  name: "LiveJobStatusTable",
  components: {
    DataTable,
    Column,
    CustomSpeedDial,
    InputText,
    MultiSelect,
    OverlayPanel,
    expansionTable,
    liveJobStatusExpansion,
    Dropdown,
    // VerticalTimeLine,
  },
  props: [
    "tableDataName",
    "tableName",
    "tableClass",
    "tableData",
    "tableColumns",
    "overlayData",
    "globalSearchString",
    "paginator",
    "selectionModeState",
    "formTableDataName",
    "storePath",
    "dataKey",
    "currentTab",
    "totalRecords",
    "tabPageOffset",
    "dateRangeValue",
  ],
  data() {
    return {
      expandedRows: [],
      rowSelect: null,
      statusId: null,
      selectionMode: [],
      filters: null,
      sortField: "createdAt",
      sortOrder: "DESC",
      filteredItems: [],
      selectedColumns: null,
      dateRange: [],
      SelectedProfile: [],
      dialogComponent: "AdvanceFilterDialog",
      initialComponent: "",
      getLiveJobId: null,
      expansionId: null,
      isMoreData: false,
      expandedData: [],
      renderTable: 10,
    };
  },

  methods: {
    ...mapActions({
      updatePageParams: "liveJobStatus/updatePageOffsetLimit",
      liveJobStatusCommonData: "liveJobStatus/loadLiveJobStatusList",
      liveJobStatusBikeData: "liveJobStatus/loadLiveJobStatusList",
      showAdvanceFilterDialog: "liveJobStatus/showFilterDialog",
      getLiveJobExpansionList: "liveJobStatus/getLiveJobExpansionList",
      updateFilterParams: "liveJobStatus/updateCommonFilterParams",
    }),
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM, YYYY");
        return formattedDate;
      }
    },
    emittedUpdateRouteSettings(data) {
      this.$emit("emittedUpdateRouteSettingsParent", data);
    },
    emitSMSDialog(data) {
      this.$emit("emitSendSMSDialogToParent", data);
    },
    emitUpdateStatusDialog(data) {
      this.$emit("emitUpdateStatusData", data);
    },
    editPodDialogData(data) {
      this.$emit("emitPodStatusData", data);
    },
    emitPrintLabelDialog(data) {
      this.$emit("emitPrintLabelData", data);
    },
    async onRowExpand(col) {
      this.expansionId = col;
      this.statusId = col.data?.id || null;
      const bookingResponse = await this.getLiveJobExpansionList(this.statusId);

      if (bookingResponse && bookingResponse.status === 200) {
        let expandedData = bookingResponse.data.results || [];
        this.isMoreData = expandedData.length > 5 ? true : false;
        this.expandedData = expandedData.booking;
      }
    },
    formatDate(value) {
      return value.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
    processOverlayData(data, row) {
      data.currentTab = this.currentTab;
      return data;
    },
    initilaizeFilters() {
      this.filters = {
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
      let permanentTablelColumns = JSON.parse(
        localStorage.getItem("liveJobStatusColumns")
      );
      this.selectedColumns = permanentTablelColumns || this.tableColumns;
      this.$emit("emitFilterListData", this.filters);
    },
    async onChangePage(event) {
      this.pageOffset = event.page + 1;
      this.pageLimit = event.rows;
      let pageParams = {
        offset: event.page + 1,
        limit: event.rows,
      };
      await this.updatePageParams(pageParams);
      let paginationParams = {
        offset: event.page + 1,
        limit: event.rows,
        orderBy: [this.sortField, this.sortOrder],
        filter_params: this.filteredItems,
      };
      this.commonPageChangeLoad(paginationParams);
    },
    onSort(event) {
      this.sortField =
        event.sortField == "s_no" ? "createdAt" : event.sortField;
      this.sortOrder = event.sortOrder == 1 ? "DESC" : "ASC";
      let filteredEvents = event.filters;
      this.setFilterData(filteredEvents);
    },
    onFilter(event) {
      let filteredEvents = event.filters;
      this.filteredItems = [];
      this.setFilterData(filteredEvents);
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
    getSortFieldName(field) {
      if (field == "booking.collection_slip_no") {
        return ["booking", "collection_slip_no"];
      } else if (field == "company_details.company_name") {
        return ["company_details", "company_name"];
      } else if (field == "zone.zone_name") {
        return ["zone", "zone_name"];
      } else if (field == "route.route_name") {
        return ["route", "route_name"];
      } else if (field == "trip.trip_name") {
        return ["trip", "trip_name"];
      } else if (field == "rider.display_name") {
        return ["rider", "display_name"];
      } else {
        return [this.sortField];
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
              this.dateRange =
                filteredEvents[columnName]["constraints"][0]["value"];
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
      this.loadCommonPageLoad();
    },
    loadCommonPageLoad() {
      let sortFieldArray = this.getSortFieldName(this.sortField);
      let orderBy = sortFieldArray.concat([this.sortOrder]);
      let paginationParams = {
        offset: this.pageOffset,
        limit: this.pageLimit,
        orderBy: orderBy,
        filter_params: this.filteredItems,
      };
      this.commonPageChangeLoad(paginationParams);
    },
    async commonPageChangeLoad(paginationParams) {
      let data = {
        globalsearchkey: [],
        bike: paginationParams,
        van: paginationParams,
        rapido: paginationParams,
        currentTab: this.currentTab,
      };
      await this.updateFilterParams(data);
      this.liveJobStatusCommonData(data);
    },
    selectAllRows(event) {
      this.$store.state[this.storePath][this.formTableDataName] =
        this.selectionMode;
    },
    // eslint-disable-next-line no-unused-vars
    unSelectAllRows(event) {
      this.$store.state[this.storePath][this.formTableDataName] =
        this.selectionMode;
    },
    // eslint-disable-next-line no-unused-vars
    onRowSelect(event) {
      this.$store.state[this.storePath][this.formTableDataName] =
        this.selectionMode;
    },
    // eslint-disable-next-line no-unused-vars
    onRowUnselect(event) {
      this.$store.state[this.storePath][this.formTableDataName] =
        this.selectionMode;
    },
    onToggle(value) {
      localStorage.setItem("liveJobStatusColumns", JSON.stringify(value));
      this.selectedColumns = this.tableColumns.filter((col) =>
        value.includes(col)
      );
    },

    openAdvanceFilterDialog() {
      this.initialComponent = "AdvanceFilterDialogMain";
      const dialogData = {
        displayDialog: true,
        formData: {},
      };
      this.$emit("emitAdavnceFilterDialog", dialogData);
    },
    expressStatusBackgroundStyle(status) {
      let expressStatusBackground;
      switch (status) {
        case "New":
          expressStatusBackground =
            "background: #FFF3C7;width: 80px;height: 30px;border-radius: 7px;padding: 5px 12px;";
          break;
        case "Pending":
          expressStatusBackground =
            "background: #e5e5e5;width: 80px;height: 30px;border-radius: 7px;padding: 5px 12px;";
          break;
        case "Not Assigned":
          expressStatusBackground =
            "background: #e5e5e5;width: 80px;height: 30px;border-radius: 7px;padding: 5px 12px;";
          break;
        case "Approved":
          expressStatusBackground =
            "background: #325383;width: 80px;height: 30px;border-radius: 7px;padding: 5px 12px;";
          break;
        case "In Transit":
          expressStatusBackground =
            "background: #e3e3e3;width: 80px;height: 30px;border-radius: 7px;padding: 5px 12px;";
          break;
        case "Completed":
          expressStatusBackground =
            "background: #b1fcdd;width: 80px;height: 30px;border-radius: 7px;padding: 5px 12px;";
          break;
        case "Cancelled":
          expressStatusBackground =
            "background: #ff56564d;width: 80px;height: 30px;border-radius: 7px;padding: 5px 12px;";
          break;
      }
      return expressStatusBackground;
    },
    expressStatusColorStyle(status) {
      let expressStatusColor;
      switch (status) {
        case "New":
          expressStatusColor = "color: #EABB17";
          break;
        case "Pending":
          expressStatusColor = "color: #131111";
          break;
        case "Not Assigned":
          expressStatusColor = "color: #131111";
          break;
        case "Approved":
          expressStatusColor = "color: #ffffff";
          break;
        case "In Transit":
          expressStatusColor = "color: #ff7a00";
          break;
        case "Completed":
          expressStatusColor = "color: #269337";
          break;
        case "Cancelled":
          expressStatusColor = "color: #357dea";
          break;
      }
      return expressStatusColor;
    },
    onColReorder() {
      this.$toast.add({
        severity: "success",
        summary: "Column Reordered",
        life: 3000,
      });
    },
  },
  created() {
    this.initilaizeFilters();
    if (
      this.selectionModeState != undefined &&
      this.selectionModeState != null
    ) {
      this.selectionMode = this.selectionModeState;
    }
    if (
      this.selectionModeState == undefined ||
      this.selectionModeState == null
    ) {
      this.selectionMode = null;
    }
  },
  computed: {
    ...mapGetters({
      pageOffset: "liveJobStatus/getPageOffset",
      pageLimit: "liveJobStatus/getPageLimit",
      filterParams: "liveJobStatus/getFilterParams",
      bikeAdvanceFilter: "liveJobStatus/getBikeFilterParams",
      vanAdvanceFilter: "liveJobStatus/getVanFilterParams",
      rapidoAdvanceFilter: "liveJobStatus/getRapidoFilterParams",
      getLiveJobExpansionListArray:
        "liveJobStatus/getLiveJobExpansionListArray",
    }),
    ...mapState({
      liveJobStatusFilterDropdownData: (state) =>
        state.liveJobStatus.liveJobStatusFilterDropdownData,
    }),
  },
  watch: {
    tableName: {
      immediate: true,
      handler(value, oldvalue) {
        this.selectionMode = null;
      },
    },
    selectionMode(value) {
      this.$store.state.liveJobStatus.FirstStepperTableDataSelected = [];
      for (let i in value) {
        this.$store.state.liveJobStatus.FirstStepperTableDataSelected[i] =
          value[i];
        this.SelectedProfile = value;
      }

      if (value) {
        this.$store.state.liveJobStatus.GropAllPayload = {};
        this.$store.state.liveJobStatus.GropAllPayload.confirm = false;
        this.$store.state.liveJobStatus.GropAllPayload.jobs = [];
        value.map((list) => {
          this.$store.state.liveJobStatus.GropAllPayload.jobs.push(list.id);
        });
      }
      this.renderTable++;
    },

    dateRange: async function () {
      if (
        this.dateRange.length > 0 &&
        this.dateRange[0] !== null &&
        this.dateRange[1] !== null
      ) {
        //this.filteredItems = [];
        let filterObject = {
          column_name: "createdAt",
          type: "dateRange",
          searchKey: this.dateRange,
        };
        let isCreatedAtIndex = this.filteredItems.findIndex(
          (res) => res.column_name == "createdAt"
        );
        if (isCreatedAtIndex !== -1) {
          this.filteredItems[isCreatedAtIndex]["searchKey"] = this.dateRange;
        } else {
          this.filteredItems.push(filterObject);
        }

        this.loadCommonPageLoad();
      }
    },

    dateRangeValue: async function () {
      this.dateRange = [];
    },

    bikeAdvanceFilter: {
      handler(value, oldvalue) {
        let filteredParams = this.bikeAdvanceFilter || {};
        if (this.currentTab == "BikeTab") {
          this.setFilterData(filteredParams);
        }
      },
      deep: true,
    },
    vanAdvanceFilter: {
      handler(value, oldvalue) {
        let filteredParams = this.vanAdvanceFilter || {};
        if (this.currentTab == "VanTab") {
          this.setFilterData(filteredParams);
        }
      },
      deep: true,
    },
    rapidoAdvanceFilter: {
      handler(value, oldvalue) {
        let filteredParams = this.rapidoAdvanceFilter || {};
        if (this.currentTab == "RapidoTab") {
          this.setFilterData(filteredParams);
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.no_data {
  text-align: center;
  font-weight: bold;
}
::v-deep .deleted_row {
  background-color: #fff2f2 !important;
}
.activeClass {
  color: #269337;
  font-weight: 600 !important;
}
.activeBgClass {
  background-color: #b1fcdd;
  width: 80px;
  height: 30px;
  border-radius: 7px;
  padding: 5px 12px;
}
.inactiveClass {
  color: #dd2025;
  font-weight: 600 !important;
}
.inactiveBgClass {
  background-color: rgba(255, 86, 86, 0.3);
  width: 80px;
  height: 30px;
  border-radius: 7px;
  padding: 5px 12px;
}
.activeClass {
  color: $color-17c079;
  font-weight: bold;
}

.inactiveClass {
  color: $color-ea6e39;
  font-weight: bold;
}
::v-deep .card {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.p-paginator-page {
  background: $color-357dea;
  border-radius: 5px;
}

::v-deep .p-datatable-row-expansion {
  background: #e1eaf9 !important;
}

::v-deep .p-datatable .p-datatable-sm .p-datatable-tbody > tr > td {
  font-family: $font-family-third;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  color: $color-4e5968;
  word-wrap: break-word !important;
  width: 0px !important;
}
::v-deep .p-column-title {
  font-family: $font-family-third;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left !important;
  color: $color-7e84a7;
}
::v-deep .p-datatable .p-paginator-bottom {
  margin-top: 30px !important;
  margin-bottom: 20px !important;
  background-color: transparent !important;
}
::v-deep .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
  background: $color-357dea;
  border-radius: 5px;
  color: $color-fff;
}
::v-deep .p-paginator .p-paginator-current {
  font-family: $font-family-third;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  color: $color-4e5968;
  position: absolute;
  left: 0;
}
::v-deep .p-paginator .p-dropdown {
  position: absolute;
  right: 0;
}
::v-deep .p-paginator-icon {
  background: $color-fff;
  border-radius: 5px;
  padding: 10px;
}
::v-deep .pi {
  font-size: 12px !important;
}
::v-deep .p-paginator {
  background: $color-edf1f7 !important;
}

::v-deep .p-paginator {
  background: $color-edf1f7 !important;
}
::v-deep .p-column-filter-menu {
  margin-left: 0;
}
::v-deep .p-datatable .p-datatable-thead > tr > th {
  background: $color-fff !important;
  cursor: grabbing !important;
}
::v-deep .p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
  cursor: grabbing !important;
}
::v-deep thead.p-datatable-thead {
  background: $color-fff !important;
}
::v-deep .p-inputtext,
::v-deep.p-multiselect {
  height: 36px;
}
.sub {
  color: $color-7e84a7;
}
.company-image {
  height: 50px;
  width: 50px;
}
</style>
