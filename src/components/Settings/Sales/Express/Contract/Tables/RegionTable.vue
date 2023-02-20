<template>
  <DataTable
    :loading="
      tableName == 'AddRegionTable'
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
    <Column :expander="true" headerStyle="width: 1rem" class="expander" />

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
            storePath="expressContract"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="overlayData"
            :tableName="tableName"
          />
        </span>

        <!-- DATES TEMPLATE -->
        <span
          v-if="
           
            col.header == 'From' ||
            col.header == 'To' ||
            col.header == 'to'
          "
        >
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>
           <span v-if="col.header == 'Created On'">
          {{ newDateFormater(slotProps.data[col.field]) }}
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
            col.header != 'Amount' &&
            col.header != 'Amount (S$)' &&
            col.header != 'Actions' &&
            col.header != 'Status' &&
            col.header != 'Created On' &&
            col.header != 'From' &&
            col.header != 'To'
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
            :options="statusFilter"
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
           <Calendar
            id="range"
            v-model="filterModel.value"
            selectionMode="range"
            :manualInput="false"
            dateFormat="mm/dd/yy"
            placeholder="mm/dd/yyyy"
            :inline="true"
          />
          <!-- <Calendars :state="filterModel.value" v-model="filterModel.value" /> -->
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
    <template #expansion="slotProps">
      <span>
        <div class="express-region-table-expansion p-2">
          <TableExpansionTabs
            v-bind:tabMenuData="getExpansionTabMenuData(slotProps.data)"
            type="regionRates"
            editEnable="noEdit"
            defaultTab=""
            storePath=""
            :dataKey="slotProps.data.id"
          />
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
import moment from "moment";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
const { URL } = require("../../../../../../../config/const");
//import Popper from "vue3-popper";
import TableExpansionTabs from "../Tabs/TableExpansionTabs.vue";
//data imports
import { region_bike_van_TableColumnData } from "../const/const";
import CustomSpeedDials from "../CustomSpeedDial.vue";
export default {
  components: {
    DataTable,
    Column,
    Dropdown,
    Calendar,
    InputText,
    CustomSpeedDials,
    TableExpansionTabs,
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
      statusFilter:['Active','Inactive'],
      filters: null,
      searcher: "",
    };
  },

  methods: {
    globalSearcher(label, searchString) {
      this.$store.state["contacts"].globalSearch = searchString;
    },

    getExpansionTabMenuData(data) {
      return [
        {
          label: "Bike",
          tab: "ExpansionTables",
          data: data.services[0].trips,
          columns: region_bike_van_TableColumnData,
          select: true,
          tabName: "Bike",
          heading: "Bike",
        },
        {
          label: "Van",
          tab: "ExpansionTables",
          data: data.services[1].trips,
          columns: region_bike_van_TableColumnData,
          select: false,
          tabName: "Van",
          heading: "Van",
        },
      ];
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
 newDateFormater(data) {
   
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMM, YYYY");
        return formattedDate;
      }
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
      debugger
 if (data == null) {
        return "00:00";
      } else if(moment(data, 'MM/DD/YYYY',true).isValid()){
        var formattedTime = moment(data).format("HH:mm");
        return formattedTime;
      }
      else{ return data;}
      // if (data == null) {
      //   return "-";
      // } else {
      //   var formattedDate = moment(data).format("DD MMM, YYYY");
      //   console.log(formattedDate)
      //   return formattedDate;
      // }
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
        if (
          ["createdAt", "from_date", "to_date"].includes(
            this.tableColumns[c]["field"]
          )
        ) {
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

.p-paginator-page {
  background: #357dea;
  border-radius: 5px;
}

::v-deep .express-region-table-expansion .p-datatable-row-expansion {
  background: #fff !important;
}
::v-deep .express-region-table-expansion{
 background: rgba(197, 220, 255, 0.62) !important;
  }
::v-deep .express-region-table-expansion
  .p-datatable
  .p-datatable-thead
  > tr
  > th {
  background: transparent !important;
 
  border: none !important;
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
</style>
