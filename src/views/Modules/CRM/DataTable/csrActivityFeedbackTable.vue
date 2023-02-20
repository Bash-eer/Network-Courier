<template>
  <DataTable
    :loading="$store.state['CrmSettings'].tableLoad"
    :class="tableClass"
    :showGridlines="false"
    :stripedRows="true"
    :rowClass="rowClass"
    v-model:selection="rowSelect"
    selectionMode="single"
    :dataKey="dataKey"
    responsiveLayout="scroll"
    :value="tableData"
    :paginator="true"
    v-model:expandedRows="expandedRows"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
    :totalRecords="totalRecords"
    :rows="10"
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
      'created_by',
      'feedback_no',
      'feedback_type',
      'cost_center_name',
      'caller_name'
    ]"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <Column
      v-for="col of tableColumns"
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
    <!-- <Column :expander="true" headerStyle="width: 1rem" /> -->
      <template #body="slotProps">
        <span
          v-if="col.header == 'Actions'"
          class="flex align-items-center mr-2"
        >
          <CustomSpeedDial
            v-if="tableName == 'collectionSlip' "
            storePath="customerLaunchBookingHistory"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="processOverlayData(overlayData, slotProps.data)"
            @getFeedbackSettings="getFeedbackSettingsData"
          />

          <CustomSpeedDialCrm 
            v-else
            storePath="CrmFeedback"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="processOverlayData(overlayData, slotProps.data)"
            @getFeedback="getFeedbackData"
           />
        </span>

        <span v-if="col.header == 'S.No'" class="ml-3">
          {{ slotProps.data["s_no"] }}
        </span>

        <span v-if="col.header == 'Feedback No'" class="mr-2">
          {{ slotProps.data["feedback_no"] }}
        </span>

        <span v-if="col.header == 'Type'" class="mr-2">
          {{ slotProps.data["feedback_type"] }}
        </span>

        <span v-if="col.header == 'Job Type'" class="mr-2">
          {{ slotProps.data["job_type"] }}
        </span>

        <span v-if="col.header == 'Assigned to'" class="mr-2">
          <AvatarGroup class="">
            <!-- <Avatar
              v-tooltip.top="item.type"
              v-for="(item, index) in slotProps.data?.?assign_to.slice(0, 4)"
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

        <!-- <span v-if="col.header == 'Company Details'" class="mr-2">
          {{ slotProps.data["company_name"] }}
        </span> -->

        <span v-if="col.header == 'Company Details'" class="mb-1 mr-3">
          <div class="flex flex-row">
            <img
              src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
              class="company-image mr-2"
              width="30"
              height="30"
            />
            <div class="flex flex-column justify-content-center">
              <div class="flex heading">
                {{ slotProps.data.customer_details?.customer_id }}
              </div>
              <div class="flex sub">
                {{ slotProps.data.customer_details?.profile_name }}
              </div>
            </div>
          </div>
        </span>

        <span v-if="col.header == 'Cost Center'" class="mr-2">
          {{ slotProps.data["cost_center_name"] ? slotProps.data["cost_center_name"]  : slotProps.data["cost_center"]  }}
        </span>

        <span v-if="col.header == 'Caller Name'" class="ml-3">
          {{ slotProps.data['callername'] || "__"}} 
        </span>

        <span v-if="col.header == 'Collection Slip No'" class="mr-2">
          {{ slotProps.data["collection_slip_no"] }}
        </span>
        

        <span v-if="col.header == 'Status'" class="mr-2">
          <span
            :class="getStatusClassHandler(slotProps.data['status'])"
            class="mt-3"
            >{{ slotProps.data["status"] }}</span
          >
          
        </span>

        <span v-if="col.header == 'Caller Details'" class="mr-2">
          {{ slotProps.data["callerDetails"] }}
        </span>

        <!-- <span v-if="col.header == 'Date'" class="mr-2">
          {{ dateFormater(slotProps.data["createdAt"]) }}
        </span> -->

        <span v-if="col.header == 'Created By'" class="mb-1 mr-3">
          {{ slotProps.data.user.display_name }}
        </span>

        <span v-if="col.header == 'Created On'">
          {{ dateFormater(slotProps.data["createdAt"]) }}
        </span>
      </template>

      <template #filter="{ filterModel }">
        <span>
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="getFilterPlaceHolder(col.header)"
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

      
    </Column>
    <Column
      :expander="true"
      headerStyle="width: 1rem"
      @click="clickColumn(col)"
    />
    <template #expansion="slotProps">
      <div class="flex align-items-center flex-row">
        <div
          class="expansion-container ml-2"
          v-for="(item, index) of expandedData"
          :key="index"
        >
          <Chip :label="item" class="mb-2" :dataKey="slotProps.data.id" />
        </div>
      </div>
    </template>
    <template #empty> No data found </template>
  </DataTable>

  
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import CustomSpeedDial from "../CustomerLaunch/expressHistory/CustomSpeedDial.vue";
import CustomSpeedDialCrm from '../DataTable/customSpeedDial.vue'
import { FilterMatchMode, FilterOperator } from "primevue/api";
import InputText from "primevue/inputtext";
import { mapActions, mapGetters } from "vuex";
import Chip from "primevue/chip";
import Avatar from "primevue/avatar";
import AvatarGroup from "primevue/avatargroup";
import Tooltip from "primevue/tooltip";

export default {
  name: "csrActivityFeedbackTable",
  components: {
    DataTable,
    Column,
    CustomSpeedDial,
    CustomSpeedDialCrm,
    InputText,
    Chip,
    AvatarGroup,
    Avatar
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
      selectedTab: {},
    };
  },

  methods: {
    ...mapActions({
      loadSpecificFeedbackData: "CrmSettings/specificFeedbackData",
    }),
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM, YYYY");
        return formattedDate;
      }
    },
    clickColumn(col) {},
    processOverlayData(data, row) {
      return data;
    },
    getFilterPlaceHolder(placeholder) {
      return "Search by" + " " + placeholder;
    },
     getStatusClassHandler(type) {
      let color;
      switch (type) {
        case "Resolved":
          color = "ScheduledStyle";
          break;
        case "Unresolved":
          color = "UnscheduledStyle";
          break;
          case "Open":
          color = "Open";
          break;
        default:
          color = "color-66c11e";
      }
      return color;
    },
    initilaizeFilters() {
      this.filters = {
        collection_slip_no: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        created_by: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        status: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        cost_center: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        job_type: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        caller_details: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        company_details: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        "user.display_name": {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        createdAt: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.BETWEEN }],
        },
        feedback_no: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
                cost_center_name: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
                feedback_type: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
                        caller_name: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        }

      };
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
        (data) => event?.data?.id === data.id
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
        let expandedData = subTypeResponse.data?.results.feedback_subtype || [];
        this.isMoreData = expandedData.length > 5 ? true : false;
        this.expandedData = expandedData.map((res, index) => {
          return res.sub_type;
        });
      }
    },
    getFeedbackSettingsData(dialogData) {
      this.$emit("editFeedbackSettings", dialogData);
    },
    getFeedbackData(dialogData) {
      this.$emit("editFeedback", dialogData);
    },
  },
  mounted() {
    this.initilaizeFilters();
  },
  computed: {},
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
.ScheduledStyle {
  padding: 5px 12px;
  gap: 10px;
  width: 107px;
  height: 30px;
  left: 1543px;
  top: 556px;

  color: #269337;
  background: #b1fcdd;
  border-radius: 7px;
}
.Open {
  padding: 5px 12px;
  gap: 10px;
  color: #090907;

  width: 107px;
  height: 30px;
  left: 1543px;
  top: 556px;

  background: #afd5d8;
  border-radius: 7px;
}
.UnscheduledStyle {
  padding: 5px 12px;
  gap: 10px;
  color: #e1b929;

  width: 107px;
  height: 30px;
  left: 1543px;
  top: 556px;

  background: #fff5ec;
  border-radius: 7px;
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
</style>
