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
    @rowUnselect="onRowUnselect"
    :paginator="true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
    v-model:selection="rowSelect"
    @rowCollapse="onRowCollapse"
  >
    <template #empty><div class="p-3">No data found.</div></template>
    <Column :expander="true" headerStyle="width: 1rem" class="expander" />

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
      :showFilterMatchModes="
        col.header == 'Created on' || col.header == 'Created On' ? false : true
      "
    >
      <template #body="slotProps">
        <span v-if="col.header == 'Created By'">
          {{ slotProps.data.user.display_name }}
        </span>

        <span v-else-if="col.header == 'Weight Range'">
          {{ slotProps.data["min_weight"] }}-{{ slotProps.data["max_weight"] }}
        </span>

        <span v-else-if="col.header == 'Status'" class="mr-2">
          <span
            :class="
              slotProps.data[col.field] == 'Active'
                ? 'activeClass'
                : 'inactiveClass'
            "
            >{{
              slotProps.data[col.field] == "Active" ? "Active" : "Inactive"
            }}</span
          >
        </span>

        <span
          v-else-if="col.header == 'Created On' || col.header == 'Created on'"
        >
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>

        <span v-else-if="col.header == 'Actions'" class="mr-2">
          <CustomSpeedDial
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="getCustomSpeedDialData()"
            :tableName="tableName"
          />
        </span>
        <span v-else>{{ slotProps.data[col.field] }}</span>
      </template>

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
          v-else-if="col.header == 'Created on' || col.header == 'Created On'"
        >
          <p class="mb-2"><b>Set a date range:</b></p>
          <Calendars
            :state="filterModel.value"
            v-model="filterModel.value"
            dateFormat="mm/dd/yy"
            placeholder="mm/dd/yyyy"
          />
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

    <!--Expanded row content -->
    <template #expansion="slotProps">
      <div v-if="tableName === 'outBoundTable'" class="row mr-6 ml-6">
        <ExpandedTable
          tableName="outBoundExpandedTable"
          :tableData="slotProps.data.rate_card"
          :tableColumns="expandedTableColumns"
        />
      </div>
      <div v-if="tableName === 'countriesTable'">
        <div class="flex flex-row flex-wrap">
          <div
            v-for="(chip, index) of slotProps.data.destinations"
            :key="index"
            class="flex mr-2 m-1"
          >
            <ZoneChips
              :disableCross="true"
              :data="[
                chip.destination_code + ' - ' + chip.destination_name,
                index,
              ]"
            />
          </div>
        </div>
        <!-- <div class="add-destination my-3">+Add Destination</div> -->
      </div>
    </template>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import CustomSpeedDial from "../../CustomSpeedDial.vue";
import ExpandedTable from "./ExpandedTable.vue";
import ZoneChips from "../../../Express/Adhoc/SelectionChips/ZoneChips.vue";
import {
  outBoundTableActions,
  outBoundExpandedTableColumns,
  countriesTableActions,
} from "../Const/const";

export default {
  components: {
    DataTable,
    Column,
    CustomSpeedDial,
    ExpandedTable,
    ZoneChips,
  },
  props: [
    "type",
    "transport",
    "tableDataName",
    "tableName",
    "tableClass",
    "tableData",
    "overlayData",
    "apiKey",
    "tableColumns",
    "storePath",
    "globalSearchString",
    "paginator",
    "selectionModeState",
    "formTableDataName",
    "isloading",
  ],
  data() {
    return {
      expandedRows: [],
      filters: null,
      expandedTableColumns: outBoundExpandedTableColumns,
    };
  },
  methods: {
    dateFormater(data) {
      if (!data) return "-";
      let date = moment(data).format("DD MMM, YYYY");

      if (date === "Invalid date") {
        return data;
      } else {
        return date;
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

      console.log(this.filters, "filters filters");
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
        case "outBoundTable":
          return outBoundTableActions;
        case "countriesTable":
          return countriesTableActions;
      }
    },
  },
  created() {
    this.initilaizeFilters();

    this.filters["global"].value = null;
  },

  watch: {
    "$store.state.Outbound.globalSearch": function () {
      this.filters["global"].value =
        this.$store.state[this.storePath].globalSearch;
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

:deep .p-column-filter-menu {
  margin-left: unset !important;
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
::v-deep .express-contract-table-expansion .p-datatable-row-expansion {
  background: #fff !important;
}
::v-deep
  .express-contract-table-expansion
  .p-datatable
  .p-datatable-thead
  > tr
  > th {
  background: transparent !important;
  border: none !important;
}
// ::v-deep .express-contract-table-expansion .p-datatable.p-datatable-hoverable-rows .p-datatable-tbody > tr:not(.p-highlight):hover{
//   background: transparent !important;
// }

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
}
.rate_settings {
  color: #6b9fef;
  font-weight: bolder;
}
.rate-default-badge {
  background: #fff8e2;
  color: #f0bd76;
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
}
.rate-private-badge {
  background: #ecffeb;
  color: #4b9149;
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
}

.add-destination {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #357dea;
  font-size: 12px;
}
.activeClass {
  color: #17c079;
  font-weight: 600;
  font-size: 12px;
}
.inactiveClass {
  color: #ea6e39;
  font-weight: 600;
  font-size: 12px;
}
</style>
