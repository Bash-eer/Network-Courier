<template>
  <DataTable
    :loading="
      tableName == 'AdhocTable'
        ? false
        : $store.state['expressContract'].tableLoad
    "
    class="p-datatable-sm editable-cells-table formTable"
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
      v-if="tableName == 'AdhocTable' || tableName == 'AddZoneTable'"
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
        col.header != 'Actions' && col.header != 'S. No' && col.header != 'S.No'
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
            v-if="tableName == 'AdditionalSurcharges'"
            storePath="expressAdhoc"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="additionalsurchargeOverlayDataa"
            :tableName="tableName"
          />
          <CustomSpeedDials
            v-if="tableName == 'Surcharges'"
            storePath="expressAdhoc"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="surchargeOverlayDataa"
            :tableName="tableName"
          />
          <CustomSpeedDials
            v-if="tableName == 'Normal'"
            storePath="expressAdhoc"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="surchargeOverlayDataa"
            :tableName="tableName"
          />

          <CustomSpeedDials
            v-if="tableName == 'AdhocTable'"
            storePath="expressAdhoc"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="
              slotProps.data.default == false
                ? overlayData
                : alternateOverlayData
            "
            :tableName="tableName"
          />
          <CustomSpeedDials
            v-if="
              tableName != 'Surcharges' &&
              tableName != 'AdditionalSurcharges' &&
              tableName != 'AdhocTable' &&
              tableName != 'Normal'
            "
            storePath="expressAdhoc"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="overlayData"
            :tableName="tableName"
          />
        </span>
        <!-- TEMPLATE : ACTIONS -->
        <span v-if="col.header == 'Rate Card Name'" class="">
          <div class="flex flex-row">
            <p>{{ slotProps.data[col.field] }}</p>
            <p>
              <span
                v-if="slotProps.data['default'] == true"
                class="rate-badge ml-2"
                >Default</span
              >
            </p>
          </div>
        </span>
        <!-- DATES TEMPLATE -->
        <span v-if="col.header == 'Created On'">
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>

        <!-- TEMPLATE : VEHICLE STATUS -->
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
            col.header == 'Collection Time' ||
            col.header == 'Cut off Time'
          "
        >
          {{ TimeFormater(slotProps.data[col.field]) }}
        </span>

        <span
          v-if="
            col.header != 'Amount' &&
            col.header != 'Amount (S$)' &&
            col.header != 'Actions' &&
            col.header != 'Cutoff Time' &&
            col.header != 'Collection Time' &&
            col.header != 'Cut off Time' &&
            col.header != 'Status' &&
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
            :options="this.expressAdhocRatesStatusDropdownData"
            v-model="filterModel.value"
            optionValue="name"
            optionLabel="name"
            :placeholder="getFilterPlaceHolder(col.header)"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </span>
        <!--Date Range Filter-->
        <span v-if="col.header == 'Created On'">
          <p class="mb-2"><b>Set a date range:</b></p>
          <Calendar
            id="range"
            v-model="filterModel.value"
            selectionMode="range"
            :manualInput="false"
            dateFormat="mm/dd/yy"
            placeholder="mm/dd/yyyy"
            :inline="true"
          />
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
      v-if="tableName == 'AdhocTable' || tableName == 'AddZoneTable'"
    >
      <span>
        <div v-if="tableName == 'AddZoneTable'">
          <div class="express-adhoc-zone-trips-table-expansion">
            <TableExpansionTabs
              v-bind:tabMenuData="getExpansionTabMenuData(slotProps.data)"
              type="regionRates"
              defaultTab=""
              storePath=""
              :dataKey="slotProps.data.id"
            />
          </div>
        </div>
        <div
          v-if="tableName == 'AdhocTable'"
          class="express-adhoc-table-expansion"
        >
          <span
            v-if="
              $store.state['expressAdhoc']['expressAdhocSubTableData'].length !=
              0
            "
          >
            <div class="flex justify-content-between">
              <div class="issue my-2">
                <b><span>Rate Card History</span></b>
              </div>
            </div>
            <!--sub table-->
            <AdhocSubTable
              tableClass="p-datatable-sm adhoc-table"
              tableDataName="AdhocSubData"
              :overlayData="subOverlayData"
              tableName="AdhocSubTable"
              :tableData="
                $store.state['expressAdhoc']['expressAdhocSubTableData']
              "
              :tableColumns="tableColumnData"
              dataKey="id"
            />
          </span>
          <span
            v-if="
              $store.state['expressAdhoc']['expressAdhocSubTableData'].length ==
              0
            "
          >
            <div class="no_data p-3">No Rate Cards available!</div>
          </span>
          <!-- </span> -->
        </div>
      </span>
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
import InputText from "primevue/inputtext";
import TableExpansionTabs from "../Tabs/TableExpansionTabs.vue";
import { mapState } from "vuex";
import {
  ExpressAdhocSubTableOverlayData,
  express_adhoc_sub_tablecolumdata,
  express_adhoc_zones_sub_tablecolumndata,
  ThirdPageOverlayData1,
  ThirdPageOverlayData2,
  ExpressAdhocTableAlternateOverlayData,
} from "../Const/const";
import CustomSpeedDials from "../CustomSpeedDial.vue";
import Dropdown from "primevue/dropdown";
import AdhocSubTable from "./AdhocSubTable.vue";
export default {
  components: {
    DataTable,
    Column,
    InputText,
    CustomSpeedDials,
    TableExpansionTabs,
    AdhocSubTable,
    Dropdown,
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
      additionalsurchargeOverlayDataa: ThirdPageOverlayData1,
      surchargeOverlayDataa: ThirdPageOverlayData2,
      subOverlayData: ExpressAdhocSubTableOverlayData,
      tableColumnData: express_adhoc_sub_tablecolumdata,
      alternateOverlayData: ExpressAdhocTableAlternateOverlayData,
    };
  },

  computed: {
    ...mapState({
      expressAdhocRatesStatusDropdownData: (state) =>
        state.expressAdhoc.expressAdhocRatesStatusDropdownData,
    }),
  },

  methods: {
    onRowExpand(event) {
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

      this.$store.dispatch("expressAdhoc/loadAdhocSubTableData", {
        path:
          "/settings/sales/rates/express/adhoc/ratecards/histories/" +
          event.data.id,
        mutation: "fetchAdhocSubTableData",
      });
    },
    TimeFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).utc().format("HH:mm");
        return formattedDate;
      }
    },
    onRowSelect(e) {
      if (this.tableName == "AdhocTable") {
        this.$router.push({
          name: "salesAdhocRates",
          params: { id: e.data.id },
        });
      } else if (this.tableName == "AdhocRateCard") {
        this.$router.push({
          name: "salesAdhocRatesOverview",
          params: { id: e.data.rate_card_id, zoneId: e.data.id },
        });
      }
    },
    getExpansionTabMenuData(data) {
      return [
        {
          label: "Zones",
          tab: "AdhocZonesZoneTabComponent",
          data: data.postal_codes,

          select: true,
          tabName: "Postal Codes",
          heading: "Zones",
        },
        {
          label: "ZonesTrips",
          // tab: "AdhocSubTable",
          tab: "BikeVanTab",
          data: data,
          columns: express_adhoc_zones_sub_tablecolumndata,
          select: false,
          tabName: "Trips",
          heading: "ZonesTrips",
        },
      ];
    },
    globalSearcher(label, searchString) {
      this.$store.state["contacts"].globalSearch = searchString;
    },

    customDateFormatter(data) {
      let rawDate = new Date(data);
      let month = rawDate.getMonth() + 1;
      let year = rawDate.getFullYear();
      if (month.toString().length == 1) {
        month = "0" + month;
      }
      let newyear = year.toString().slice(2);
      let dateString = month + "/" + newyear;
      return dateString;
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
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMM YYYY");
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
        if (["createdAt"].includes(this.tableColumns[c]["field"])) {
          this.filters[this.tableColumns[c]["field"]] = {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.BETWEEN }],
          };
        }
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
