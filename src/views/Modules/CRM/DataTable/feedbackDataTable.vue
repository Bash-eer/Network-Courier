<template>
  <DataTable
    :loading="$store.state['CrmFeedback'].tableLoad"
    :class="tableClass"
    :showGridlines="false"
    :stripedRows="true"
    selectionMode="single"
    :dataKey="dataKey"
    responsiveLayout="scroll"
    :value="tableData"
    :lazy="true"
    :paginator="true"
    v-model:expandedRows="expandedRows"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
    @page="onChangePage($event)"
    @sort="onSort($event)"
    @filter="onFilter($event)"
    :totalRecords="totalRecords"
    :rows="$store.state['CrmFeedback'].pageLimit"
    v-model:filters="filters"
    filterDisplay="menu"
    :globalFilterFields="[
      'feedback_no',
      'sub_type',
      'feedback_type',
      'company_name',
      'cost_center.cost_center_name',
      'caller_details.name',
      'user.display_name',
      'status',
      'createdAt',
    ]"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <Column :expander="true" headerStyle="width: 1rem" />
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :filterField="col.field"
      :showFilterMenu="
        col.header != 'Actions' &&
        col.header != 'S. No' &&
        col.header != 'Assigned to'
          ? true
          : false
      "
      :sortable="
        col.header != 'Actions' && col.header != 'Assigned to' ? true : false
      "
      :dataType="col.header == 'Created On' ? 'date' : 'text'"
      :showFilterMatchModes="
        col.header != 'Actions' && col.header != 'S. No' ? true : false
      "
    >
      <template #body="slotProps">
        <span
          v-if="col.header == 'Actions'"
          class="flex align-items-center mr-2"
        >
          <CustomSpeedDial
            storePath="CrmFeedback"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="processOverlayData(overlayData, slotProps.data)"
            @getFeedback="getFeedbackData"
          />
        </span>

        <span v-if="col.header == 'S. No'">
          {{ slotProps.data["s_no"] }}
        </span>

        <span v-if="col.header == 'Feedback No'" class="mr-2">
          {{ slotProps.data["feedback_no"] }}
          <img
            v-if="slotProps.data.job_type == 'General'"
            src="/images/comment.png"
            width="19"
            height="20"
            alt="comment"
            class=""
          />
          <img
            v-if="slotProps.data.job_type == 'International'"
            src="/images/international.png"
            width="19"
            height="20"
            alt="international"
            class=""
          />
          <img
            v-if="slotProps.data.job_type == 'Express'"
            src="/images/express.png"
            width="19"
            height="20"
            alt="express"
            class=""
          />
          <img
            v-if="slotProps.data.job_type == 'Rapido'"
            src="/images/Rapido.png"
            width="19"
            height="20"
            alt="rapido"
            class=""
          />
        </span>

        <span v-if="col.header == 'Type'" class="mr-2">
          {{ slotProps.data?.feedback_type || "-" }}
        </span>

        <span v-if="col.header == 'Sub Type'" class="mr-2">
          {{ slotProps.data?.sub_type || "-" }}
        </span>

        <span v-if="col.header == 'Company Details'" class="mr-2">
          {{ slotProps.data?.company_name || "-" }}
        </span>

        <span v-if="col.header == 'Cost Center'" class="mr-2">
          {{ slotProps.data.cost_center?.cost_center_name || "-" }}
        </span>

        <span v-if="col.header == 'Caller Name'" class="mr-2">
          {{ slotProps.data?.caller_name || "-" }}
        </span>

        <span v-if="col.header == 'Assigned to'" class="mr-2">
          <!-- {{ slotProps.data["assigned_to"] }} -->
          <AvatarGroup class="">
            <!-- <Avatar
              v-tooltip.top="item.type"
              v-for="(item, index) in slotProps.data.assign_to.slice(0, 4)"
              :key="index"
              :image="'./images/defaultProfile.jpg'"
              size="large"
              shape="circle"
            /> -->
            <Avatar
              v-if="slotProps.data.assign_to.length > 5"
              :label="slotProps.data.assign_to.length - 5"
              shape="circle"
              size="large"
              class="avatar-overflow-text"
            />
          </AvatarGroup>
        </span>

        <span v-if="col.header == 'Status'">
          <span
            :class="
              slotProps.data['status'] == 'Resolved'
                ? 'activeBgClass'
                : 'inactiveBgClass'
            "
          >
            <span
              :class="
                slotProps.data['status'] == 'Resolved'
                  ? 'activeClass'
                  : 'inactiveClass'
              "
              >{{ slotProps.data["status"] }}</span
            >
          </span>
        </span>

        <span v-if="col.header == 'Created By'" class="mb-1 mr-3">
          {{ slotProps.data["user"]["display_name"] || "-" }}
        </span>

        <span v-if="col.header == 'Created On'">
          {{ dateFormater(slotProps.data["createdAt"]) }}
        </span>
      </template>

      <template #filter="{ filterModel }">
        <span v-if="col.header !== 'Created On'">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="getPlaceholder(col.header)"
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
    <template #expansion="slotProps">
      <div class="flex align-items-center flex-row">
        <FeedbackExpansion :data="slotProps" :expandedData="expandedData" />
      </div>
    </template>
    <template #empty> No data found </template>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import CustomSpeedDial from "./customSpeedDial.vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import InputText from "primevue/inputtext";
import { mapActions, mapGetters } from "vuex";
import Avatar from "primevue/avatar";
import AvatarGroup from "primevue/avatargroup";
import Tooltip from "primevue/tooltip";
import FeedbackExpansion from "../feedbackExpansion.vue";
import Button from "primevue/button";
export default {
  name: "FeedbackDataTable",
  components: {
    DataTable,
    Column,
    CustomSpeedDial,
    InputText,
    Avatar,
    AvatarGroup,
    FeedbackExpansion,
    Button,
  },
  directives: {
    tooltip: Tooltip,
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
    "totalRecords",
  ],
  data() {
    return {
      expandedRows: [],
      rowSelect: null,
      filters: null,
      sortField: "createdAt",
      sortOrder: "DESC",
      filteredItems: [],
      expandedData: [],
    };
  },

  methods: {
    ...mapActions({
      loadSpecificFeedbackData: "CrmFeedback/fetchSpecificFeedbackData",
      fetchFeedbackData: "CrmFeedback/loadFeedbackDataList",
      updatePageParams: "CrmFeedback/updatePageOffsetLimit",
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
      return data;
    },
    getPlaceholder(heads) {
      return `Search by ${heads}`;
    },
    initilaizeFilters() {
      this.filters = {
        feedback_no: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        feedback_type: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        sub_type: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        company_name: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        "cost_center.cost_center_name": {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        "caller_details.name": {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        "user.display_name": {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        status: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        createdAt: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.BETWEEN }],
        },
      };
    },
    getColumnName(column) {
      if (column.column_name == "cost_center_name") {
        return "cost_center.cost_center_name";
      } else if (column.column_name == "caller_details_name") {
        return "caller_details.name";
      } else if (column.column_name == "display_name") {
        return "user.display_name";
      } else {
        return column.column_name;
      }
    },
    getSortFieldName(field) {
      if (field == "cost_center.cost_center_name") {
        return ["cost_center", "cost_center_name"];
      } else if (field == "caller_details.name") {
        return ["caller_details", "name"];
      } else if (field == "user.display_name") {
        return ["user", "display_name"];
      } else {
        return [this.sortField];
      }
    },
    async setFilterData(filteredEvents) {
      await this.filterParams.map(async (res) => {
        let columnName = this.getColumnName(res);
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
      let sortFieldArray = this.getSortFieldName(this.sortField);
      let orderBy = sortFieldArray.concat([this.sortOrder]);
      let paginationParams = {
        offset: this.pageOffset,
        limit: this.pageLimit,
        orderBy: orderBy,
        filter_params: this.filteredItems,
      };

      this.fetchFeedbackData(paginationParams);
    },
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
        (data) => data.id === event?.data?.id
      );
      this.tableData.map((obj) => {
        if (obj.id === event.data.id) {
          obj.expanded = !obj.expanded;
        } else {
          obj.expanded = false;
        }
      });
      let feedbackSettingParams = {
        id: event.data.id,
      };
      const subTypeResponse = await this.loadSpecificFeedbackData(
        feedbackSettingParams
      );

      if (subTypeResponse && subTypeResponse.status === 200) {
        let expandedData = subTypeResponse.data?.results || [];
        this.expandedData = expandedData;
      }
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
      this.fetchFeedbackData(paginationParams);
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
    clearFilter(event) {
      this.filters[event]["constraints"][0]["value"] = "";
      return false;
    },
    getFeedbackData(dialogData) {
      this.$emit("editFeedback", dialogData);
    },
  },
  mounted() {
    this.initilaizeFilters();
  },
  computed: {
    ...mapGetters({
      pageOffset: "CrmFeedback/getPageOffset",
      pageLimit: "CrmFeedback/getPageLimit",
      filterParams: "CrmFeedback/getFilterParams",
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
  color: #e1b929;
  font-weight: 600 !important;
}
.inactiveBgClass {
  background-color: #fff5ec;
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
}
::v-deep thead.p-datatable-thead {
  background: $color-fff !important;
}
::v-deep .p-chip {
  background-color: #7e84a7;
  color: #ffffff;
  border-radius: 4px;
}
::v-deep .avatar-overflow-text {
  background-color: #e0e4eb;
  color: #4e5968;
  height: 25px !important;
  width: 25px !important;
  border-radius: 8px;
  position: relative;
  top: 13px;
}
::v-deep .p-avatar-text {
  font-size: 10px;
}
::v-deep .p-avatar-image {
  width: 40px !important;
  height: 40px !important;
}
</style>
