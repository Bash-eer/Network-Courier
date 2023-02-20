<template>
  <DataTable
    :loading="isTableLoad"
    :class="tableClass"
    :showGridlines="false"
    :stripedRows="true"
    :rowClass="rowClass"
    selectionMode="single"
    v-model:selection="rowSelect"
    :dataKey="dataKey"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
    v-model:expandedRows="expandedRows"
    responsiveLayout="scroll"
    :value="tableData"
    :lazy="true"
    :paginator="true"
    @page="onChangePage($event)"
    @sort="onSort($event)"
    @filter="onFilter($event)"
    :totalRecords="totalRecords"
    :rows="pageLimit"
    v-model:filters="filters"
    filterDisplay="menu"
    :globalFilterFields="[
      'collection_slip_no',
      'job_type',
      'caller_details',
      'company_details',
      'cost_center',
      'status',
      'user.display_name',
      'createdAt',
    ]"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <template #header>
      <div style="text-align: left">
        <MultiSelect
          :modelValue="selectedColumns"
          :options="tableColumns"
          optionLabel="header"
          @update:modelValue="onToggle"
          placeholder="Select Columns"
          :filter="true"
          style="width: 20em"
        />
      </div>
    </template>
    <Column
      :expander="true"
      headerStyle="width: 1rem"
      @click="clickColumn(col)"
    />
    <Column
      v-for="col of selectedColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :sortable="
        col.header != 'Actions' &&
        col.header != 'Caller Details' &&
        col.header != 'Company Details'
          ? true
          : false
      "
      :showFilterMenu="
        col.header != 'Actions' &&
        col.header != 'Caller Details' &&
        col.header != 'Company Details'
          ? true
          : false
      "
    >
      <template #body="slotProps">
        <span
          v-if="col.header == 'Actions'"
          class="mb-1 mr-3 flex justify-content-center align-items-center"
        >
          <CustomSpeedDial
            storePath="customerLaunchBookingHistory"
            :dataName="currentTab"
            :rowData="slotProps.data"
            :currentTab="currentTab"
            :customDialData="processOverlayData(overlayData)"
          />
        </span>

        <span
          v-if="col.header == 'Collection Slip No'"
          class="tracking-hyper-text"
          @click="openTrackStatus(col, slotProps.data)"
        >
          {{ slotProps.data["collection_slip_no"] || "-" }}
        </span>

        <span v-if="col.header == 'Job Type'" class="mr-2">
          {{ slotProps.data["job_type"] || "-" }}
        </span>

        <span v-if="col.header == 'Caller Details'" class="mr-2">
          <div class="flex flex-column">
            <div class="flex heading">
              {{ slotProps.data?.caller_name }}
            </div>
            <div class="flex sub">
              {{ slotProps.data?.contact_number }}
            </div>
          </div>
        </span>

        <span v-if="col.header == 'Company Details'" class="mb-1 mr-3">
          <div class="flex flex-row">
            <!-- <img
              src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
              class="company-image mr-2"
              width="30"
            /> -->
            <div v-if="slotProps.data.customer_type=='Contract'" class="flex flex-column justify-content-center">
              <div class="flex heading">
                {{ slotProps.data.contract_customer?.customer_id }}
              </div>
              <div class="flex sub">
                {{ slotProps.data.contract_customer?.profile_name }}
              </div>
            </div>
            <div v-else class="flex flex-column justify-content-center">
              <div class="flex sub">
                {{ slotProps.data.adhoc_customer?.profile_name }}
              </div>
            </div>
          </div>
        </span>

        <span v-if="col.header == 'Cost Center'">
          {{ slotProps.data["cost_center_name"] }}
        </span>

        <span v-if="col.header == 'Customer Type'" class="mb-1 mr-3">
          {{ slotProps.data["customer_type"] }}
        </span>

        <span v-if="col.header == 'Status'">
          <span :style="expressStatusBackgroundStyle(slotProps.data?.status)">
            <span :style="expressStatusColorStyle(slotProps.data?.status)">{{
              slotProps.data?.status
            }}</span>
          </span>
        </span>

        <span v-if="col.header == 'Date'" class="mb-1 mr-3">
          {{ dateFormater(slotProps.data["date"]) }}
        </span>

        <span v-if="col.header == 'Created By'" class="mb-1 mr-3">
          {{ slotProps.data.user?.display_name || "-" }}
        </span>

        <span v-if="col.header == 'Created On'" class="mb-1 mr-3">
          {{ dateFormater(slotProps.data["createdAt"]) }}
        </span>
      </template>

      <template #filter="{ filterModel }">
        <span v-if="col.header !== 'Created On'">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            placeholder="Search by name"
          />
        </span>
        <span v-if="col.header == 'Created On'">
          <p class="mb-2"><b>Set a date range:</b></p>
          <Calendars
            :state="filterModel.value"
            v-model="filterModel.value"
            dateFormat="mm/dd/yy"
            placeholder="mm/dd/yyyy"
          />
        </span>
      </template>
      <template #filterclear="{ filterCallback }">
        <Button
          label="Clear"
          class="p-button-outlined"
          @click="
            clearFilter(col.field);
            filterCallback();
          "
        ></Button>
      </template>
      <template #filterapply="{ filterCallback }">
        <Button
          label="Apply"
          class="p-button-sm"
          @click="filterCallback()"
        ></Button>
      </template>
    </Column>
    <template #empty> No data found </template>
    <template #expansion="slotProps">
      <div class="orders-subtable">
        <div
          class="timeline-container pt-3 px-4"
          v-if="expandedJobStatusData.length > 0"
        >
          <ExpressTimeLiner :timeLinerData="expandedJobStatusData" />
        </div>
        <div v-if="expandedData.length > 0" class="mt-2">
          <ExpressExpansionTable
            :tableClass="'p-datatable-sm expansion' + slotProps.data.id"
            :dataKey="slotProps.data.id"
            :subTableData="expandedData"
            :subTableColumns="subTableColumns"
            :isMoreOption="isMoreData"
          />
        </div>
        <div
          v-if="expandedJobStatusData.length == 0 && expandedData.length == 0"
        >
          No Data found
        </div>
      </div>
    </template>
  </DataTable>

  <TrackStatusMainDialog
    :dialogComponent="dialogComponent"
  ></TrackStatusMainDialog>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import CustomSpeedDial from "./CustomSpeedDial.vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { mapActions, mapGetters } from "vuex";
import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";
import Button from "primevue/button";
import ExpressExpansionTable from "./expressExpansionTable";
import ExpressTimeLiner from "./timeLiner";
import TrackStatusMainDialog from "../../../../../components/CRM/trackStatusMainDialog";

export default {
  name: "ExpressHistoryTable",
  components: {
    DataTable,
    Column,
    CustomSpeedDial,
    InputText,
    MultiSelect,
    Button,
    ExpressExpansionTable,
    ExpressTimeLiner,
    TrackStatusMainDialog,
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
    "storePath",
    "dataKey",
    "currentTab",
    "totalRecords",
    "subTableData",
    "subTableColumns",
  ],
  data() {
    return {
      expandedRows: [],
      rowSelect: null,
      filters: null,
      sortField: "createdAt",
      // sortOrder: "DESC",
      sortOrder: "DESC",
      filteredItems: [],
      selectedColumns: null,
      expandedData: [],
      expandedJobStatusData: [],
      isMoreData: false,
      dialogComponent: "",
    };
  },

  methods: {
    ...mapActions({
      updatePageParams: "customerLaunchBookingHistory/updatePageOffsetLimit",
      loadInitialRouteData: "customerLaunchBookingHistory/loadCommonTableData",
      loadSpecificJobsData: "customerLaunchBookingHistory/loadCommonJobsData",
      loadOverAllJobStatus:
        "customerLaunchBookingHistory/loadSpecificBookingOverAllJobData",
      showTrackStatusDialog: "customerLaunchBookingHistory/showTrackDialog",
      getTrackStatus:
        "customerLaunchBookingHistory/loadOverAllTrackStatusForARow",
      expressHistoryDataFetch:
        "customerLaunchBookingHistory/loadExpressCustomerHistoryTableData",
    }),
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM, YYYY");
        return formattedDate;
      }
    },
    processOverlayData(data, row) {
      data.currentTab = this.currentTab;
      return data;
    },
    initilaizeFilters() {
      this.filters = {
        collection_slip_no: {
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        job_type: {
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        // caller_details: {
        //   constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        // },
        // company_details: {
        //   constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        // },
        cost_center: {
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        status: {
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        "user.display_name": {
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        createdAt: {
          constraints: [{ value: "", matchMode: FilterMatchMode.BETWEEN }],
        },
      };
      let permanentTablelColumns = JSON.parse(
        localStorage.getItem("expressHistoryColumns")
      );
      this.selectedColumns = permanentTablelColumns || this.tableColumns;
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
      this.sortField = event.sortField;
      // this.sortOrder = event.sortOrder == 1 ? "DESC" : "ASC";
      this.sortOrder = "DESC";
      let filteredEvents = event.filters;
      this.setFilterData(filteredEvents);
    },
    onFilter(event) {
      let filteredEvents = event.filters;
      this.filteredItems = [];
      this.setFilterData(filteredEvents);
    },
    clearFilter(event) {
      this.filters[event]["constraints"][0]["value"] = "";
      return false;
    },
    async setFilterData(filteredEvents) {
      await this.filterParams.map((res) => {
        let columnName =
          res.column_name == "display_name"
            ? "user.display_name"
            : res.column_name;

        if (
          res.column_name &&
          filteredEvents[columnName]["constraints"][0]["value"]
        ) {
          let searchKey = filteredEvents[columnName]["constraints"][0]["value"];

          if (res.column_name == "createdAt") {
            if (
              filteredEvents[columnName]["constraints"][0]["value"].length > 0
            ) {
              let date1 =
                filteredEvents[columnName]["constraints"][0]["value"][0];
              let date2 =
                filteredEvents[columnName]["constraints"][0]["value"][1];
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
      let sortFieldArray =
        this.sortField == "user.display_name"
          ? ["user", "display_name"]
          : [this.sortField];
      let orderBy = sortFieldArray.concat([this.sortOrder]);
      let paginationParams = {
        offset: this.pageOffset,
        limit: this.pageLimit,
        orderBy: orderBy,
        filter_params: this.filteredItems,
      };
      this.commonPageChangeLoad(paginationParams);
    },

    commonPageChangeLoad(paginationParams) {
      if (this.tableName == "ExpressTab") {
        let data = {
          pagination: {
            offset: paginationParams.offset,
            limit: paginationParams.limit,
            orderBy: paginationParams.orderBy,
            filter_params: this.filteredItems,
          },
          tabName: this.currentTab,
        };
        this.loadInitialRouteData(data);
      } else {
        let data;
        if (this.$route.params.type == "Contract") {
          data = {
            offset: paginationParams.offset,
            limit: paginationParams.limit,
            orderBy: paginationParams.orderBy,
            contract_id: this.tableData[0].contract_id,
          };
        } else {
          data = {
            offset: paginationParams.offset,
            limit: paginationParams.limit,
            orderBy: paginationParams.orderBy,
            profile_id: this.tableData[0].profile_id,
          };
        }

        this.expressHistoryDataFetch(data);
      }
    },
    onToggle(value) {
      localStorage.setItem("expressHistoryColumns", JSON.stringify(value));
      this.selectedColumns = this.tableColumns.filter((col) =>
        value.includes(col)
      );
    },
    clickColumn(col) {},
    onRowCollapse(event) {
      this.expandedRows = this.expandedRows.filter(
        (data) => event?.data?.id !== data.id
      );
      this.tableData.map((obj) => {
        if (obj.id === event.data?.id) {
          obj.expanded = false;
        } else {
          obj.expanded = false;
        }
      });
    },
    async onRowExpand(event) {
      this.expandedRows = this.tableData.filter(
        (data) => event?.data?.id === data.id
      );
      this.tableData.map((obj) => {
        if (obj.id === event.data.id) {
          obj.expanded = !obj.expanded;
        } else {
          obj.expanded = false;
        }
      });
      let jobsDataParams = {
        id: event.data.id,
        tabName: this.currentTab || "ExpressTab",
      };
      const bookingResponse = await this.loadSpecificJobsData(jobsDataParams);

      if (bookingResponse && bookingResponse.status === 200) {
        let expandedData = bookingResponse.data.results || [];
        this.isMoreData = expandedData.length > 5 ? true : false;
        this.expandedData = expandedData.map((res, index) => {
          if (index <= 4) {
            return [res];
          }
        });
      }

      let overAllJobStatusParams = {
        id: event.data.id,
        tabName: this.currentTab || "ExpressTab",
      };

      const overAllJobStatusResponse = await this.loadOverAllJobStatus(
        overAllJobStatusParams
      );

      if (overAllJobStatusResponse && overAllJobStatusResponse.status === 200) {
        let expandedJobStatusData = overAllJobStatusResponse.data.results || [];
        this.expandedJobStatusData = expandedJobStatusData;
      }
    },
    expressStatusBackgroundStyle(status) {
      let expressStatusBackground;
      switch (status) {
        case "Pending":
          expressStatusBackground =
            "background: #e5e5e5;width: 80px;height: 30px;border-radius: 7px;padding: 5px 12px;";
          break;
        case "Booked":
          expressStatusBackground =
            "background: #325383;width: 80px;height: 30px;border-radius: 7px;padding: 5px 12px;";
          break;
        case "Ongoing":
          expressStatusBackground =
            "background: #a1642b;width: 80px;height: 30px;border-radius: 7px;padding: 5px 12px;";
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
        case "Pending":
          expressStatusColor = "color: #131111";
          break;
        case "Booked":
          expressStatusColor = "color: #e5e5e5";
          break;
        case "Ongoing":
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
    openTrackStatus(col, event) {
      let id = event.id;
      this.dialogComponent = "TrackStatusDialog";
      this.getTrackStatus(id);
      this.showTrackStatusDialog(true);
    },
  },
  created() {
    this.initilaizeFilters();
  },
  computed: {
    ...mapGetters({
      filterParams: "customerLaunchBookingHistory/getExpressFilterParams",
      pageOffset: "customerLaunchBookingHistory/getPageOffset",
      pageLimit: "customerLaunchBookingHistory/getPageLimit",
      isTableLoad: "customerLaunchBookingHistory/getTableLoadingState",
    }),
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
  background-color: #ff56564d;
  width: 80px;
  height: 30px;
  border-radius: 7px;
  padding: 5px 12px;
}
.heading {
  color: $color-4e5868;
}
.sub {
  color: $color-7e84a7;
}
::v-deep .p-datatable-row-expansion {
  background: #c5dcff !important;
  opacity: 0.6;
}

::v-deep .p-datatable-row-expansion .p-datatable {
  background: $color-fff !important;
}

::v-deep .p-datatable .p-datatable-sm .p-datatable-tbody > tr > td {
  font-family: $font-family-third;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  color: #4e5968;
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
  background: #edf1f7 !important;
}
::v-deep .p-paginator {
  background: #edf1f7 !important;
}
::v-deep .p-column-filter-menu {
  margin-left: 0 !important;
}
::v-deep .p-datatable.p-datatable-sm .p-datatable-tbody > tr > td > span {
  font-family: $font-family-third !important;
}
::v-deep .timeline-container {
  background-color: $color-fff !important;
  overflow: auto;
}
.tracking-hyper-text {
  color: #357dea;
}
::v-deep[data-v-458370b6].p-datatable
  .p-sortable-column
  .p-sortable-column-icon {
  color: $color-7e84a7 !important;
  width: 10.5px !important;
  height: 9px !important;
  font-size: 10px !important;
}
.company-image {
  height: 50px;
  width: 50px;
}
</style>
