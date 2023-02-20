<template>
  <DataTable
    :class="tableClass"
    :showGridlines="false"
    :stripedRows="true"
    :rowClass="rowClass"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    v-model:selection="rowSelect"
    v-model:expandedRows="expandedRows"
    :dataKey="dataKey"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
    responsiveLayout="scroll"
    :value="tableData.rows"
    :paginator="tableName == 'QuotationTabSubTable' ? false : true"
    :rows="10"
    v-model:filters="filters"
    filterDisplay="menu"
    :globalFilterFields="[
      'customer_id',
      'profile_name',
      'createdAt',
      'from_date',
      'to_date',
      'address',
      'created_by',
    ]"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <Column selectionMode="multiple" headerStyle="width: 1em"></Column>

    <Column
      v-if="tableName != 'QuotationTabSubTable'"
      :expander="
        tableName == 'QuotationTabSubTable' ||
        tableName == 'SalesTab' ||
        tableName == 'AttachmentTable' ||
        tableName == 'FollowUpTable'
          ? false
          : true
      "
      headerStyle="width: 1rem"
    />
    <Column
      v-for="col of selectedColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :showFilterMenu="
        col.header != 'Actions' && tableName != 'QuotationTabSubTable'
          ? true
          : false
      "
      :sortable="
        col.header != 'Actions' && tableName != 'QuotationTabSubTable'
          ? true
          : false
      "
    >
      <template #body="slotProps">
        <!-- TEMPLATE : ACTIONS -->
        <span v-if="col.header == 'Actions'" class="mr-2">
          <CustomSpeedDial
            storePath="sales"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="overlayDataPrompt"
            @emitValue="emittedValue(slotProps.data)"
            @emitCustomerSuspenstionValue="
              emittedCustomerSuspenstionValue(slotProps.data)
            "
            :updateBtn="updateBtn"
            :tableName="tableName"
          />
        </span>

        <span v-if="col.header == 'Created On'">
          {{ dateTimeFormater(slotProps.data.createdAt) }}
          {{ dateFormater(slotProps.data.createdAt) }}
        </span>

        <span v-if="col.header == 'Customer ID'">
          {{ slotProps.data.customer_id }}
        </span>

        <span v-if="col.header == 'Created By'">
          {{ slotProps.data.user.display_name }}
        </span>

        <span v-if="col.header == 'Company Name'" class="mr-2">
          {{ slotProps.data["profile_name"] }}
        </span>

        <span v-if="col.header == 'Address'" class="mr-2">
          <div
            class="
              flex flex-column
              align-self-center
              flex
              align-items-center
              justify-content-center
              tableVerticalAlignment
            "
          >
            <div class="flex heading ">{{ slotProps.data["address"] }}</div>
            <div class="flex sub">{{ slotProps.data["postal_code"] }}</div>
          </div>
        </span>

        <!-- TEMPLATE : From -->
        <span v-if="col.header == 'From'" class="mr-2">
          <div class="flex flex-column tableVerticalAlignment">
            <div class="flex heading">
              {{ dateFormater(slotProps.data.from_date) }}
            </div>
          </div>
        </span>

        <!-- TEMPLATE : To -->
        <span v-if="col.header == 'To'" class="mr-2">
          <div class="flex flex-column tableVerticalAlignment">
            <div class="flex heading">
              {{ dateFormater(slotProps.data.to_date) }}
            </div>
          </div>
        </span>
      </template>
      <template #filter="{ filterModel }">
        <span
          v-if="
            col.header == 'Customer ID' ||
            col.header == 'Company Name' ||
            col.header == 'Created By' ||
            col.header == 'Address'
          "
        >
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="getFilterPlaceHolder(col.header)"
          />
        </span>
        <span
          v-if="
            col.header == 'Created On' ||
            col.header == 'From' ||
            col.header == 'To'
          "
        >
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

    <!--Expanded row content -->
    <template class="nestedTable" #expansion="slotProps">
      <div class="card-container blue-container overflow-hidden">
        <div class="flex">
          <div
            class="
              flex-initial flex
              align-items-center
              justify-content-center
              ml-2
            "
          >
            <img src="/images/Component2.png" class="mb-4" />
          </div>
          <div class="flex flex-column ml-4">
            <h5 class="font-size-12 color-4e5868 bold-400">Remarks</h5>
            <p class="font-size-12 color-4e5868 bold-600">
              {{ slotProps.data.remarks }}
            </p>
          </div>
          <div
            class="
              flex-initial flex
              align-items-center
              justify-content-center
              rows
              ml-8
            "
          ></div>
          <div
            v-for="suspenstionAttachments of slotProps.data.attachments"
            :key="suspenstionAttachments"
            class="flex flex-row h-1rem w-auto border-radius-8"
          >
            <a :href="suspenstionAttachments?.url" target="_blank">
              <div class="flex mr-2">
                <span>
                  <img
                    :src="'/images/' + 'drag-drop-pdf' + '.png'"
                    alt="pdf"
                    width="30"
                    height="27"
                    v-tooltip.bottom="
                      suspenstionAttachments?.file_name +
                      `<br />` +
                      (suspenstionAttachments?.size / 1000000).toFixed(2) +
                      ' mb'
                    "
                /></span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </template>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import CustomSpeedDial from "./CustomSpeedDial.vue";
import { mapActions, mapGetters } from "vuex";
import { CustomerSettingTableOverlayData } from "./Const";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import InputText from "primevue/inputtext";
import Tooltip from "primevue/tooltip";

export default {
  name: "CheckedDataTable",
  components: {
    DataTable,
    Column,
    CustomSpeedDial,
    InputText,
  },
  directives: {
    tooltip: Tooltip,
  },
  slotProps: {},
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
    "suspenstionAttachments",
  ],
  data() {
    return {
      expandedRows: [],
      rowSelect: null,
      updateBtn: true,
      selectedColumns: null,
      filters: null,
      overlayDataPrompt: CustomerSettingTableOverlayData,
    };
  },

  methods: {
    ...mapActions({
      postSelectedCostCenter: "CustomerLaunchStore/postSelectedCostCenter",
    }),

    emittedValue(data) {
      this.$emit("emitCustomerleavePage", data);
    },

    emittedCustomerSuspenstionValue(data) {
      this.$emit("emitCustomerSuspenstionPage", data);
    },

    getFilterPlaceHolder(placeholder) {
      return "Search by" + " " + placeholder;
    },

    initilaizeColumns() {
      this.filters = {
        customer_id: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        profile_name: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        createdAt: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        from_date: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        to_date: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        address: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        created_by: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
      };

      this.selectedColumns = this.tableColumns;
    },
    rowClass(row) {
      for (var r in row) {
        if (r == "company_status") {
          if (row[r] == "deleted") {
            return "deleted_row";
          }
        }
      }
    },
    dateTimeFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("HH:mm A,");
        return formattedDate;
      }
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMM YYYY");
        return formattedDate;
      }
    },
  },
  mounted() {
    this.initilaizeColumns();
  },
  computed: {
    ...mapGetters({
      selectedCostCenterMethod: "CustomerLaunchStore/selectedCostCenterMethod",
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
  color: #17c079;
  font-weight: bold;
}

.inactiveClass {
  color: #ea6e39;
  font-weight: bold;
}
.heading {
  color: #4e5868;
}
.sub {
  color: #7e84a7;
}
.inclusions {
  font-weight: 600;
  font-size: 12px;
  color: #4e5868;
}
.siteOfficeCharges {
  margin-left: 1.4%;
}
.horizontal_line {
  margin: 0px !important;
  margin-top: 1.1% !important;
}
.seaDivLarge {
  background: #f3f7ff;
  border: 1px solid rgba(126, 132, 167, 0.3);
  border-radius: 8px;
  height: 50%;
  width: 100%;
}
.profileName {
  margin-left: 0.6% !important;
}
.quotation {
  margin-left: 1em !important;
}
.address {
  margin-left: 2% !important;
}
.revisionsDiv {
  background: #fbfbfb;
  height: 10%;
  width: 100%;
}
.add_countries {
  text-align: center;
  color: #357dea;
  cursor: pointer;
}
.rate-badge {
  background: #fff8e2;
  color: #f0bd76;
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
}

::v-deep .card {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.rate_items {
  color: #5f98ee;
  font-weight: bolder;
}
.issue {
  font-weight: bold !important;
}
.rate_settings {
  color: #6b9fef;
  font-weight: bolder;
}
.p-paginator-page {
  background: #357dea;
  border-radius: 5px;
}

::v-deep .QuotationTabTable .p-datatable-thead > tr > th {
  background-color: #fff !important;
  border: none !important;
  font-family: $font-family-primary;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: left;
}

::v-deep .p-datatable-row-expansion {
  background: #e1eaf9 !important;
}

::v-deep .p-datatable .p-datatable-sm .p-datatable-tbody > tr > td {
  font-family: "Montserrat", sans-serif;
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
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left !important;
  color: #7e84a7;
}
::v-deep .QuotationTabTable .p-paginator {
  background: #edf1f7 !important;
  border: 0 !important;
  width: 100% !important;
}

::v-deep .timeLineExpressCostCenterTable .p-paginator {
  background: #ffff !important;
  border: 0 !important;
  width: 100% !important;
}
::v-deep .activityLogTable > .p-paginator {
  background: white !important;
  border: 0 !important;
  width: 100% !important;
}
::v-deep .p-datatable .p-paginator-bottom {
  margin-top: 30px !important;
  margin-bottom: 20px !important;
}
::v-deep .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
  background: #357dea;
  border-radius: 5px;
  color: #fff;
}
::v-deep .p-paginator .p-paginator-current {
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  color: #4e5968;
  position: absolute;
  left: 0;
}
::v-deep .p-paginator .p-dropdown {
  position: absolute;
  right: 0;
}
::v-deep .p-paginator-icon {
  background: #fff;
  border-radius: 5px;
  padding: 10px;
}
::v-deep .pi {
  font-size: 12px !important;
}
.custom-avatar-group-lable {
  width: 100px;
  height: 100px !important;
  background: #eaa235;
  color: #7e84a7;
  // opacity: 0.2;
  border-radius: 5px;
}
.p-avatar {
  background-color: #dceafd;
  border-radius: 5px;
  color: #7e84a7;
  width: 24px;
  height: 28px;
}

::v-deep .p-datatable .p-datatable-thead > tr > th {
  text-align: left;
  padding: 1rem 1rem;
  border: 1px solid #e9ecef;
  border-width: 0 0 1px 0;
  font-weight: 600;
  color: #495057;
  background: #d7e7ff !important;
  transition: box-shadow 0.2s;
}

::v-deep .p-datatable .p-sortable-column.p-highlight:hover {
  background: #d7e7ff;
  color: #2196f3;
}

::v-deep .p-datatable .p-sortable-column.p-highlight {
  background: #d7e7ff;
  color: #2196f3;
}

.btn-go-property {
  background-color: #fff;
  color: #357dea;
  font-weight: 700;
  font-size: 14px;
}

.contentText {
  color: #4e5868;
  font-weight: 700;
}

.rows {
  border-left: solid 1px grey;
  opacity: 0.4;
}

.tableVerticalAlignment {
  margin-top: 1rem;
}
</style>
