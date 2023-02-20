<template>
  <DataTable
    :class="'region-rates-table'"
    class="p-datatable-sm"
    id="formTable"
    :value="tableData"
    :rowClass="rowClass"
    responsiveLayout="scroll"
    filterDisplay="menu"
    v-model:filters="filters"
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
      v-if="
        tableName != 'onDemandService' &&
        tableName != 'surcharges' &&
        tableName != 'additionalSurcharges'
      "
      :expander="true"
      headerStyle="width: 1rem"
      class="expander"
    />
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :maxConstraints="1"
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
          <CustomSpeedDials
            storePath="rapidoContract"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="getCustomSpeedDialData()"
            :tableName="tableName"
          />
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
        <span v-if="col.header == 'Weight Range'">
          {{ slotProps.data["min_weight"] }}-{{ slotProps.data["max_weight"] }}
        </span>
        <span
          v-if="
            col.header == 'Cutoff Time' ||
            col.header == 'Collection Time' ||
            col.header == 'Cut off Time'
          "
        >
          {{ timeFormater(slotProps.data[col.field]) }}
        </span>
        <!-- Postal code range -->
        <span v-if="this.tableName == 'ZoneAdhoc'">
          <span v-if="col.header == 'Postal Code Ranges'">
            <span>{{ slotProps.data[col.field].length }}</span>
          </span>
        </span>

        <!-- created by template -->
        <!-- <span -->
        <!-- v-if="tableName == 'ecommerce' || tableName == 'additionalSurcharges'" -->
        <!-- > -->
        <!-- <span v-if="col.header == 'Created By'"> -->
        <!-- {{ slotProps.data.user.display_name }} -->
        <!-- {{ slotProps.data[col.field].display_name }} -->
        <!-- </span> -->
        <!-- </span> -->
        <span v-if="col.header == 'Rate $'">
          {{ slotProps.data[col.field].length }}
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
            col.header != 'Created On' &&
            col.header != 'Collection Time' &&
            col.header != 'Cutoff Time' &&
            col.header != 'Cut off Time' &&
            col.header != 'From' &&
            col.header != 'Rate $' &&
            col.header != 'To' &&
            col.header != 'Status' &&
            col.header != 'Postal Code Ranges' &&
            col.header != 'Rate Name'
          "
          >{{ slotProps.data[col.field] }}</span
        ></template
      >
      <!--column-vise filtering-->
      <template #filter="{ filterModel }">
        <!--Status Enum Filter-->
        <span v-if="col.header == 'Status'">
          <DropDownField
            code="code"
            v-model="filterModel.value"
            :value="filterModel.value"
            :options="[
              { name: 'Active', code: 'Active' },
              { name: 'Inactive', code: 'Inactive' },
            ]"
            placeholder="Search By Status"
            class="p-column-filter"
            :showClear="true"
          />
        </span>
        <!--Date Range Filter-->
        <span
          v-else-if="
            ['Created on', 'Created On', 'From', 'To'].includes(col.header)
          "
        >
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
          <!-- <Calendars
            :state="filterModel.value"
            v-model="filterModel.value"
            dateFormat="mm/dd/yy"
            placeholder="mm/dd/yyyy"
          /> -->
        </span>
        <!--Text Filter-->
        <span v-else>
          <TextField
            v-model="filterModel.value"
            :placeholder="getFilterPlaceHolder(col.header)"
          />
        </span>
      </template>
    </Column>
    <template #expansion="slotProps">
      <div v-if="tableName == 'RapidoAdhocThirdPage'">
        <ExpansionTable
          tableName="ThirdPageExpansion"
          :tableData="slotProps.data['rates']"
          :tableColumns="tableColumnsData"
        />

        <div
          class="
            flex
            w-100
            align-items-center
            justify-content-center
            blue
            mt-4
            mb-2
          "
          @click="
            openDialog('AddDeliveryTypeRates', 'rapidoAdhoc', 'Add New Zone')
          "
        >
          +Add Delivery Type Rates
        </div>
      </div>
      <div class="flex flex-row flex-wrap">
        <div
          v-for="(chip, index) of slotProps.data.postal_codes"
          :key="index"
          class="flex mx-2 m-1"
        >
          <RapidoZoneChips
            :data="[
              chip['postal_code_from'] + '-' + chip['postal_code_to'],
              index,
            ]"
            v-on:childToParent="removeZoneRanges"
          />
        </div>
      </div>
      <div
        v-if="tableName == 'ZoneAdhoc'"
        class="
          flex
          w-100
          align-items-center
          justify-content-center
          blue
          mt-4
          mb-2
        "
        @click="openDialog('AddNewZonesdialog', 'rapidoAdhoc', 'Add New Zone')"
      >
        +Add Postal Codes
      </div>
      <RapidoAdhocDialogs
        v-on:childToParent="closeDialog"
        :dialogComponent="$store.state['rapidoAdhoc'].dialogComponent"
      />
    </template>
  </DataTable>
</template>
<script>
import DataTable from "primevue/datatable";
import ExpansionTable from "../../Tables/ExpansionSubTable.vue";
import { E_commerceTableColumnData } from "../../const/const";
import Column from "primevue/column";
import moment from "moment";
import CustomSpeedDials from "../CustomSpeedDial.vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import RapidoZoneChips from "../SelectionChips/RapidoZoneChips.vue";
import RapidoAdhocDialogs from "../Dialog.vue";

import {
  rapidoAdhocTableOverlayData1,
  rapidoZoneTableOverlayData,
  rapidoSurchargesOverlayData,
  rapidoEcommerceOverlayData,
} from "../../const/const";
export default {
  components: {
    DataTable,
    Column,
    ExpansionTable,
    CustomSpeedDials,
    RapidoZoneChips,
    RapidoAdhocDialogs,
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
      filters: null,
      tableDataValue: [],

      tableColumnsData: E_commerceTableColumnData,
    };
  },
  methods: {
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM, YYYY");
        return formattedDate;
      }
    },
    timeFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("HH:mm");
        return formattedDate;
      }
    },
    openDialog(name, type, header) {
      //opens express contract dialogs
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

    removeZoneRanges(index) {
      console.log(index);
    },
    onRowSelect(e) {
      if (this.tableName == "rapidoAdhocTable") {
        // this.$store.dispatch("rapidoAdhoc/setAdhocTableHeader", {
        //   type: e.data.rate_card_name,
        // });
        this.$router.push({
          name: "RapidoAdhocRateCardPage",
          params: { id: e.data.id },
        });
      }
      if (this.tableName == "RapidoAdhocRateCard") {
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
    getCustomSpeedDialData() {
      switch (this.tableName) {
        case "ZoneAdhoc":
          return rapidoZoneTableOverlayData;
        case "additionalSurcharges":
          return rapidoEcommerceOverlayData;
        case "surcharges":
          return rapidoSurchargesOverlayData;
        case "onDemandService":
          return rapidoSurchargesOverlayData;
        case "RapidoAdhocThirdPage":
          return rapidoEcommerceOverlayData;
        case "ThirdPageExpansion":
          return rapidoEcommerceOverlayData;
        default:
          return rapidoAdhocTableOverlayData1;
      }
    },
  },
  created() {
    this.initilaizeFilters();
    this.filters["global"].value = null;
  },
  watch: {
    "$store.state.rapidoAdhoc.globalSearch": function () {
      this.filters["global"].value =
        this.$store.state[this.storePath].globalSearch;
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
  color: #7e84a7;
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
