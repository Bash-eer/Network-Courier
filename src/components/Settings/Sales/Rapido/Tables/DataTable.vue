<template>
  <DataTable
    v-if="tableData.length > 0"
    :class="'region-rates-table'"
    class="p-datatable-sm"
    id="formTable"
    :value="tableData"
    :rowClass="rowClass"
    responsiveLayout="scroll"
    v-model:filters="filters"
    filterDisplay="menu"
    :dataKey="'id'"
    :globalFilterFields="getGlobalFields()"
    selectionMode="single"
    v-model:expandedRows="expandedRows"
    @rowExpand="onRowExpand"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    :paginator="true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
    v-model:selection="rowSelect"
    @rowCollapse="onRowCollapse"
  >
    <Column
      :expander="true"
      v-if="tableName != 'RapidoAdhocRateCard'"
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
      <template #body="slotProps">
        <span v-if="col.header == 'Actions'" class="mr-2">
          <span
            v-if="
              tableName == 'RapidoAdhocRateCard' || tableName == 'ZoneAdhoc'
            "
          >
            <CustomSpeedDial
              storePath="rapidoAdhoc"
              :dataName="tableDataName"
              :rowData="slotProps.data"
              :customDialData="rapidoOverlayData"
              :tableName="tableName"
            />
          </span>
          <span v-if="tableName == 'Type1' || tableName == 'Type2'">
            <CustomSpeedDials
              storePath="rapidoContract"
              :dataName="tableDataName"
              :rowData="slotProps.data"
              :customDialData="
                slotProps.data.default == true
                  ? alternateOverlayData
                  : overlayData
              "
              :tableName="tableName"
            />
          </span>
          <span v-if="tableName == 'rapidoAdhocTable'">
            <CustomSpeedDials
              storePath="rapidoContract"
              :dataName="tableDataName"
              :rowData="slotProps.data"
              :customDialData="
                slotProps.data.default == true
                  ? alternateRapidoOverlayData
                  : adhocOverlayData
              "
              :tableName="tableName"
            />
          </span>
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
        <span v-if="col.header == 'Zone Range'" class="mr-2">
          <span>{{ slotProps.data["zone_from"]["zone_name"] }}</span> -
          <span>{{ slotProps.data["zone_to"]["zone_name"] }}</span>
        </span>
        <span v-if="col.header == 'Zones'" class="mr-2">
          {{ slotProps.data["zones"]?.length }}
        </span>
        <!--Template : Default -->
        <span v-if="col.header == 'Rate Name'" class="mr-2">
          <span>{{ slotProps.data["rate_card_name"] }}</span>
          <span
            v-if="slotProps.data['default'] == true"
            class="rate-default-badge ml-2"
          >
            D
          </span>
        </span>
        <span v-if="col.header == 'Rate Card Name'" class="">
          <div class="flex flex-row">
            <p>{{ slotProps.data[col.field] }}</p>
            <p>
              <span
                v-if="slotProps.data['default'] == true"
                class="rate-default-badge ml-2"
                >Default</span
              >
            </p>
          </div>
        </span>
        <!-- created by template -->
        <span v-if="col.header == 'Created By'">
          {{ slotProps.data[col.field] }}
          <!-- {{ slotProps.data[col.field].display_name }} -->
        </span>
        <!-- dateFormater on template -->
        <span
          v-if="
            col.header == 'Created On' ||
            col.header == 'From' ||
            col.header == 'To'
          "
        >
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>
        <span
          v-if="
            col.header != 'Created By' &&
            col.header != 'Created On' &&
            col.header != 'From' &&
            col.header != 'To' &&
            col.header != 'COD Fee ($)' &&
            col.header != 'Zones' &&
            col.header != 'Zone Range' &&
            col.header != 'Status' &&
            col.header != 'Rate Name' &&
            col.header != 'Rate Card Name'
          "
          >{{ slotProps.data[col.field] }}</span
        ></template
      >
      <!--column-vise filtering-->
      <template #filter="{ filterModel }">
        <!--Status Enum Filter-->
        <span v-if="col.header == 'Status'">
          <Dropdown
            optionValue="code"
            optionLabel="name"
            v-model="filterModel.value"
            :options="statusFilterDropdown"
            placeholder="Search By Status"
            class="p-column-filter"
            :showClear="true"
          >
            <template #value="slotProps">
              <span v-if="slotProps.value" :class="'customer-badge status-' + slotProps.value" >
                {{ slotProps.value }}
                </span>
              <span v-else>{{ slotProps.placeholder }}</span>
            </template>
          </Dropdown>
        </span>
        <!--Date Range Filter-->
        <span v-if="col.header == 'Created On'">
          <p class="mb-2"><b>Set a date range:</b></p>
          <Calendar
            id="range"
            v-model="filterModel.value"
            :state="filterModel.value"
            selectionMode="range"
            :manualInput="false"
            dateFormat="mm/dd/yy"
            placeholder="mm/dd/yyyy"
            :inline="true"
          />
          <!-- <Calendars :state="filterModel.value" v-model="filterModel.value" /> -->
        </span>
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
    <template #expansion="slotProps">
      <OtherChargesTemplate
        v-if="tableName == 'Type1' || tableName == 'Type2'"
        :otherChargesData="slotProps.data['other_charges']"
      />
      <span v-if="tableName == 'rapidoAdhocTable'">
        <span v-if="$store.state.rapidoAdhoc.rapidoAdhocSubTableData == 0"
          >No rate history available</span
        >
        <span v-else>
          <AdhocDataTable
            tableName="AdhocDataTable"
            :tableData="$store.state.rapidoAdhoc.rapidoAdhocSubTableData"
            :tableColumns="adhocTableColumnData"
          />
        </span>
      </span>
      <span>
        <div class="rapido-contract-table-expansion">
          <RapidoRegularTabs
            v-if="
              $store.state.rapidoContract.rapidoMainTab == 'Contract' &&
              tableName != 'ZoneAdhoc' &&
              tableName != 'RapidoAdhocRateCard' &&
              tableName != 'rapidoAdhocTable'
            "
            :tabMenuData="generateDynamicSubTabs(slotProps.data)"
          />
        </div>

        <div class="flex flex-row flex-wrap">
          <div
            v-for="(chip, index) of slotProps.data.postal_codes"
            :key="index"
            class="flex mr-2 m-1"
          >
            <!-- {{chip}} -->
            <ZoneChips
              :disableCross="true"
              :data="[
                chip.postal_code_from + ' - ' + chip.postal_code_to,
                index,
              ]"
            />
          </div>
        </div>
      </span>
    </template>
  </DataTable>
  <div v-else>
    <EmptyTemplate />
  </div>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import AdhocDataTable from "../Tables/AdhocDataTable.vue";
import CustomSpeedDial from "../Adhoc/CustomSpeedDial.vue";
import CustomSpeedDials from "../Contract/CustomSpeedDial.vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import RapidoRegularTabs from "../Tabs/RapidoRegularTabs.vue";
import InputText from "primevue/inputtext";
import {
  rapidoContractTableOverlayData,
  rapidoContractTableAlternateOverlayData,
  rapidoAdhocTableOverlayData1,
  rapidoAdhocTableOverlayData2,
  adhocSubTableColumnsData,
  rapidoZoneTableOverlayData,
  rapidoAdhocTableOverlayData,
} from "../const/const";
// import {adhocSubTableColumnsData} from "../const/const";
import OtherChargesTemplate from "../Contract/ExpansionTemplates/OtherCharges.vue";
import ZoneChips from "../../Express/Adhoc/SelectionChips/ZoneChips.vue";
import Dropdown from 'primevue/dropdown';

export default {
  components: {
    DataTable,
    Column,
    RapidoRegularTabs,
    CustomSpeedDials,
    CustomSpeedDial,
    AdhocDataTable,
    OtherChargesTemplate,
    ZoneChips,
    InputText,
    Dropdown
},
  props: [
    "type",
    "transport",
    "tableDataName",
    "tableName",
    "tableClass",
    "tableData",
    "tableColumns",
    "storePath",
    "globalSearchString",
    "paginator",
    "selectionModeState",
    "formTableDataName",
  ],
  data() {
    return {
      expandedRows: [],
      statusFilterDropdown:[
        {name:'Active', code:'Active'}, 
        {name:'Inactive', code:'Inactive'}
      ],
      filters: null,
      searcher: "",
      overlayData: rapidoContractTableOverlayData,
      alternateOverlayData: rapidoContractTableAlternateOverlayData,
      alternateRapidoOverlayData: rapidoAdhocTableOverlayData2,
      adhocOverlayData: rapidoAdhocTableOverlayData1,
      adhocTableColumnData: adhocSubTableColumnsData,
      rapidoOverlayData: rapidoAdhocTableOverlayData,
      zoneOverlayData: rapidoZoneTableOverlayData,
    };
  },
  methods: {
    generateDynamicSubTabs(Data) {
      let dynamicSubTabsData = [];

      for (let s in Data["delivery_type"]) {
        let dynamicSubTabsDataObj = {};
        dynamicSubTabsDataObj["label"] = Data["delivery_type"][s][
          "delivery_type"
        ]
          // .replace(/\s+/g, "");
          // .replace(/[\s])}[{(]/g, "");
          ?.replace(/[\s()-]+/gi, "");
        // .trim();
        dynamicSubTabsDataObj["tab"] = "ContractDataTable";
        dynamicSubTabsDataObj["tabName"] =
          Data["delivery_type"][s]["delivery_type"];
        dynamicSubTabsDataObj["heading"] =
          Data["delivery_type"][s]["delivery_type"];
        dynamicSubTabsDataObj["select"] =
          Data["delivery_type"][s] == 0 ? false : true;
        (dynamicSubTabsDataObj["tableName"] == this.tableName) == "Type1"
          ? "Type1Table"
          : "Type2Table";
        dynamicSubTabsDataObj["data"] = [];
        dynamicSubTabsDataObj["data"].push(Data["delivery_type"][s]);
        dynamicSubTabsData.push(dynamicSubTabsDataObj);
      }

      return dynamicSubTabsData;
    },
    onRowExpand(event) {
      this.$store.dispatch("rapidoAdhoc/loadAdhocSubTableData", {
        path:
          "/settings/sales/rates/rapido/adhoc/ratecards/histories/" +
          event.data.id,
        mutation: "fetchAdhocSubTableData",
      });
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMM YYYY");
        return formattedDate;
      }
    },
    onRowSelect(e) {
      if (this.tableName == "rapidoAdhocTable") {
        // this.$store.dispatch("rapidoAdhoc/setAdhocTableHeader", {
        //   type: e.data.rate_card_name,
        // });
        this.$store.dispatch("rapidoAdhoc/loadAdhocZoneData", {
          path: "/settings/sales/rates/rapido/adhoc/ratecard/" + e.data.id,
        });
        this.$router.push({
          name: "RapidoAdhocRateCardPage",
          params: { id: e.data.id },
        });
      }
      if (this.tableName == "RapidoAdhocRateCard") {
        //   this.$store.dispatch("rapidoAdhoc/loadRapidoAdhocThirdPageData", {
        //     tableData: e.data.charge_type,
        //   });
        this.$router.push({
          name: "RapidoAdhocRateOverview",
          params: { id: e.data.rate_card_id, zoneId: e.data.id },
        });
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
        if (this.tableColumns[c]["field"] == "createdAt") {
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
    globalSearcher(label, searchString) {
      this.$store.state["contacts"].globalSearch = searchString;
    },
  },
  created() {
    this.initilaizeFilters();
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
.rate-default-badge {
  background: #fff8e2;
  color: #f0bd76;
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
}
::v-deep .p-datatable-thead {
  font-size: 12px;
  font-weight: 600;
  color: #7e84a7 !important;
}
::v-deep .p-paginator {
  background: #edf1f7 !important;
  border: 0 !important;
  width: 100% !important;
}
::v-deep .p-column-filter {
  margin-left: 0px !important ;
  color: #7e84a7 !important;
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
::v-deep .p-datatable .p-datatable-thead > tr > th {
  background: #fff !important;
  color: #7e84a7 !important;
}
.status-Active {
  color: #17c079;
  font-weight: bold;
}
.status-Inactive {
  color: #ea6e39;
  font-weight: bold;
}
.status-Deleted {
  color: #c01717;
  font-weight: bold;
}
.activeClass {
  color: #17c079;
  font-weight: bold;
}
.deletedClass {
  color: #c01717;
  font-weight: bold;
}
.inactiveClass {
  color: #ea6e39;
  font-weight: bold;
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
.p-paginator-page {
  background: #357dea;
  border-radius: 5px;
}
.region-rates-table .p-datatable-header {
  padding: 0 !important;
}
.table-header {
  text-align: start;
  color: #4e5968;
  font-weight: 700;
  font-size: 16px;
}
</style>