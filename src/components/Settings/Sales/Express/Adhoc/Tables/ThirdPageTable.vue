<template>
  <DataTable
    :loading="
      tableName == 'AdhocTable'
        ? false
        : $store.state['expressContract'].tableLoad
    "
    :class="tableClass"
    :showGridlines="false"
    :stripedRows="true"
    :rowClass="rowClass"
    selectionMode="single"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    v-model:selection="rowSelect"
    v-model:expandedRows="expandedRows"
    :dataKey="dataKey"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
    responsiveLayout="scroll"
    :value="tableData"
    :paginator="true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    v-model:filters="filters"
    filterDisplay="menu"
    :globalFilterFields="getGlobalFields()"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <Column
      v-if="tableName == 'ExpressAdhocBikeVanDynamicTabTable'"
      :expander="true"
      headerStyle="width: 1rem"
      class="expander"
    />

    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :sortable="col.header != 'Actions' ? true : false"
      :showFilterMenu="
        col.header != 'Actions' &&
        col.header != 'S. No' &&
        col.header != 'S.No.'
          ? true
          : false
      "
      :showFilterMatchModes="col.header == 'Created On' ? false : true"
    >
      <!--Body -->
      <template #body="slotProps">
        <!-- TEMPLATE : ACTIONS -->
        <span v-if="col.header == 'Actions'" class="mr-2">
          <CustomSpeedDials
            storePath="expressAdhoc"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="getCustomSpeedialData()"
            :tableName="tableName"
          />
        </span>

        <!-- DATES TEMPLATE -->
        <span v-if="col.header == 'Created On'">
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>

        <!-- TEMPLATE : STATUS -->
        <span v-if="col.header == 'Status'" class="mr-2">
          <span
            :class="
              slotProps.data[col.field] == 'Active' ||
              slotProps.data[col.field] == 'active'
                ? 'green'
                : 'red'
            "
            >{{ slotProps.data[col.field] }}</span
          >
        </span>

        <span
          v-if="
            col.header == 'From' ||
            col.header == 'To' ||
            col.header == 'Cutoff Time' ||
            col.header == 'Collection Time'
          "
        >
          {{ TimeFormater(slotProps.data[col.field]) }}
        </span>

        <span
          v-if="
            col.header != 'Amount' &&
            col.header != 'Amount (S$)' &&
            col.header != 'Actions' &&
            col.header != 'Status' &&
            col.header != 'Cutoff Time' &&
            col.header != 'Collection Time' &&
            col.header != 'Created On' &&
            col.header != 'From' &&
            col.header != 'To' &&
            col.header != 'Rate Card Name'
          "
          >{{ slotProps.data[col.field] }}</span
        >
      </template>

      <!--column-vise filtering-->
      <template #filter="{ filterModel }">
        <!--Status Enum Filter-->
        <span
          v-if="tableName != 'ContactSettingsRooms' && col.header == 'Status'"
        >
          <Dropdown
            code="code"
            v-model="filterModel.value"
            :options="$store.state.contacts.appointmentStatusDropdownData"
            placeholder="Search By Status"
            class="p-column-filter"
            :showClear="true"
          >
            <template #value="slotProps">
              <span
                :class="'customer-badge status-' + slotProps.value"
                v-if="slotProps.value"
                >{{ slotProps.value }}</span
              >
              <span v-else>{{ slotProps.placeholder }}</span>
            </template>
            <template #option="slotProps">
              <span :class="'customer-badge status-' + slotProps.option">{{
                slotProps.option
              }}</span>
            </template>
          </Dropdown>
        </span>
        <!--Date Range Filter-->
        <span v-if="col.header == 'Created On'">
          <p class="mb-2"><b>Set a date range:</b></p>
          <Calendars :state="filterModel.value" v-model="filterModel.value" />
        </span>
        <!--Text Filter-->
        <span
          v-if="
            col.header != 'Created On' &&
            col.header != 'Status' &&
            col.header != 'Role' &&
            col.header != 'Roles' &&
            col.header != 'Logged In' &&
            col.header != 'Logged Out'
          "
        >
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="getFilterPlaceHolder(col.header)"
          />
        </span>
      </template>
    </Column>
    <!--Expanded row content -->
    <template
      #expansion="slotProps"
      v-if="tableName == 'ExpressAdhocBikeVanDynamicTabTable'"
    >
      <span>
        <div v-if="slotProps.data['rates'].length == 0">
          No Rates Available!
        </div>
        <AdhocSubTable
          v-if="slotProps.data['rates'].length > 0"
          tableClass="p-datatable-sm adhoc-table"
          tableDataName="AdhocSubData"
          :overlayData="subOverlayData"
          tableName="AdhocThirdPageSubTable"
          :tableData="slotProps.data['rates']"
          :tableColumns="
            $store.state.expressAdhoc.ExpressAdhocEcomVanSubTableColumnData
          "
          dataKey="id"
        />
      </span>
      <div
        class="
          flex
          w-100
          align-items-center
          justify-content-center
          blue
          mt-4
          mb-2
          cursor-pointer
        "
        @click="
          openDialog(
            'AddNewDeliveryRates',
            'expressAdhoc',
            'Add New Delivery Rates'
          )
        "
      >
        +Add Delivery Type Rates
      </div>
      <!-- <span
            v-if="
              $store.state['expressAdhoc']['expressAdhocSubTableData'].length ==
              0
            "
          >
            <div class="no_data p-3">No Rate Cards available!</div>
          </span> -->
      <!-- </span> -->
    </template>
  </DataTable>
</template>

<script>
import { FilterMatchMode, FilterOperator } from "primevue/api";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import axios from "axios";
const { URL } = require("../../../../../../../config/const");
import moment from "moment";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";

import {
  ExpressAdhocSubTableOverlayData1,
  // express_adhoc_sub_tablecolumdata,
} from "../Const/const";
import CustomSpeedDials from "../CustomSpeedDial.vue";

import AdhocSubTable from "./AdhocSubTable.vue";
export default {
  components: {
    DataTable,
    Column,
    Dropdown,
    InputText,
    CustomSpeedDials,
    // TableExpansionTabs,
    AdhocSubTable,
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
  ],
  data() {
    return {
      expandedRows: [],
      rowSelect: null,
      filters: null,
      searcher: "",
      subOverlayData: ExpressAdhocSubTableOverlayData1,
      //   tableColumnData: express_adhoc_sub_tablecolumdata,
    };
  },

  methods: {
    // onRowExpand(event) {
    //   this.$store.dispatch("expressAdhoc/loadAdhocSubTableData", {
    //     path:
    //       "/settings/sales/rates/express/adhoc/ratecards/histories/" +
    //       event.data.id,
    //     mutation: "fetchAdhocSubTableData",
    //   });
    // },
    TimeFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("HH:mm");

        return formattedDate;
      }
    },
    // onRowSelect(e) {
    //   if (this.tableName == "AdhocTable") {
    //     this.$router.push({
    //       name: "salesAdhocRates",
    //       params: { id: e.data.id },
    //     });
    //   } else if (this.tableName == "AdhocRateCard") {
    //     this.$router.push({
    //       name: "salesAdhocRatesOverview",
    //       params: { id: e.data.rate_card_id, zoneId: e.data.id },
    //     });
    //   }
    // },
    // getExpansionTabMenuData(data) {
    //   return [
    //     {
    //       label: "Zones",
    //       tab: "AdhocZonesZoneTabComponent",
    //       data: data.postal_codes,

    //       select: true,
    //       tabName: "Postal Codes",
    //       heading: "Zones",
    //     },
    //     {
    //       label: "ZonesTrips",
    //       // tab: "AdhocSubTable",
    //       tab: "BikeVanTab",
    //       data: data,
    //       columns: express_adhoc_zones_sub_tablecolumndata,
    //       select: false,
    //       tabName: "Trips",
    //       heading: "ZonesTrips",
    //     },
    //   ];
    // },
    globalSearcher(label, searchString) {
      this.$store.state["contacts"].globalSearch = searchString;
    },
    getCustomSpeedialData() {
      switch (this.tableName) {
        case "NormalBike":
          return this.$store.state.expressAdhoc
            .ThirdPageDymaniTabTableOverlayData2;
        case "NormalVan":
          return this.$store.state.expressAdhoc
            .ThirdPageDymaniTabTableOverlayData2;
        case "EcomBike":
          return this.$store.state.expressAdhoc
            .ThirdPageDymaniTabTableOverlayData3;
        case "ExpressAdhocBikeVanDynamicTabTable":
          return this.$store.state.expressAdhoc
            .ThirdPageDymaniTabTableOverlayData3;
        default:
          return this.$store.state.expressAdhoc
            .ThirdPageDymaniTabTableOverlayData;
      }
    },
    // customDateFormatter(data) {
    //   let rawDate = new Date(data);
    //   let month = rawDate.getMonth() + 1;
    //   let year = rawDate.getFullYear();
    //   if (month.toString().length == 1) {
    //     month = "0" + month;
    //   }
    //   let newyear = year.toString().slice(2);
    //   let dateString = month + "/" + newyear;
    //   return dateString;
    // },

    rowClass(row) {
      for (var r in row) {
        if (r == "company_status") {
          if (row[r] == "deleted") {
            return "deleted_row";
          }
        }
      }
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMM, YYYY");
        return formattedDate;
      }
    },
    initilaizeFilters() {
      let obj = {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      };

      this.filters = {
        global: {
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
      };
      for (let c in this.tableColumns) {
        this.filters[this.tableColumns[c]["field"]] = obj;
      }
    },
    openDialog(name, type, header) {
      //opens express adhoc dialogs
      this.$store.dispatch(type + "/openDialog", {
        dialogDetails: {
          dialogName: name,
          dialogHeader: header,
        },
      });
      this.$store.getters[type + "/controlActivityDialog"];
      if (type == "quotation") {
        this.$store.dispatch("quotation/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["quotation/controlActivityDialog"];
      }
    },
    getGlobalFields() {
      let globalFields = [];
      for (let c in this.tableColumns) {
        globalFields.push(this.tableColumns[c]["field"]);
      }
      return globalFields;
    },
    getFilterPlaceHolder(placeholder) {
      return "Search by" + " " + placeholder;
    },
  },

  created() {
    this.initilaizeFilters();
    axios.defaults.baseURL = URL.BACKEND_BASEURL;
  },
  watch: {
    "$store.state.contacts.globalSearch": function () {
      this.filters["global"].value = this.$store.state["contacts"].globalSearch;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";

::v-deep .deleted_row {
  background-color: #fff2f2 !important;
}

::v-deep .card {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
::v-deep .contract-table.p-card .p-card-body {
  padding: 0 !important;
}

.p-paginator-page {
  background: #357dea;
  border-radius: 5px;
}
::v-deep .contract-table.p-datatable-thead > tr > th {
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
  background: rgba(197, 220, 255, 0.62) !important;
  // opacity: 0.5;
}
::v-deep .express-adhoc-table-expansion .p-datatable-row-expansion {
  background: #fff !important;
}
::v-deep .express-adhoc-zone-trips-table-expansion .p-datatable-row-expansion {
  background: #fff !important;
}
::v-deep
  .express-adhoc-table-expansion
  .p-datatable
  .p-datatable-thead
  > tr
  > th {
  background: transparent !important;
  border: none !important;
}

.contract-table .p-datatable-tbody > tr > td {
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
  padding: 0px !important;
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
::v-deep .p-paginator {
  background: #edf1f7 !important;
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
  font-family: $font-family-primary;
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
.rate_items {
  color: #5f98ee;
  font-weight: bolder;
}
.issue {
  font-weight: bold !important;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: #eb4646;
  background: #ffecec;
  border-radius: 7px;
  padding: 5px 12px;
}
.rate_settings {
  color: #6b9fef;
  font-weight: bolder;
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
</style>
