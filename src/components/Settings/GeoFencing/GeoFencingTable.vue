<template>
  <DataTable
    :class="tableClass"
    :showGridlines="false"
    :stripedRows="true"
    :rowClass="rowClass"
    v-model:filters="filters"
    :dataKey="dataKey"
    responsiveLayout="scroll"
    :value="tableData"
    v-model:expandedRows="expandedRows"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
    filterDisplay="menu"
    :globalFilterFields="getGlobalFields()"
    :paginator="true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
      <Column
      :expander="true"
      headerStyle="width: 1rem"
      class="expander"
    />
    <!-- <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
    > -->
        <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :sortable="
        col.header != 'Actions' ? true : false
      "
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
            storePath="geoFencing"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="overlayData"
            :tableName="tableName"
          />  
        </span>
               

        <!-- Template : Status -->
        <!-- <span
          v-if="col.header == 'Status' "
          class="mr-2"
        >
          <span
            :class="
              slotProps.data[col.field] == True ||
              slotProps.data[col.field] == true
                ? 'activeClass'
                : 'inactiveClass'
            "
            >{{
              slotProps.data[col.field] == True ||
              slotProps.data[col.field] == true
                ? "Active"
                : "Sold"
            }}</span
          >
        </span> -->
        
        <!-- created by template -->
       <span v-if="col.header=='Created By'">
         {{slotProps.data.user.display_name}}
       </span>
       <!-- dateFormater on template -->
       <span v-if="col.header=='Created On'">
         {{dateFormater(slotProps.data[col.field])}}
       </span>
               <!-- TEMPLATE : STATUS -->
        <span
          v-if="col.header == 'Status'"
          class="mr-2"
        >
          <span
            :class="
              slotProps.data[col.field] == 'Active' 
                ? 'activeClass'
                : 'inactiveClass'
            "
            >{{
              slotProps.data[col.field] == 'Active'
                ? "Active"
                : "Inactive"
            }}</span
          >
        </span>
                <span
          v-if="col.header == 'Name'"
          class="colour-header"
        >
        </span>
       <span v-if ="col.header != 'Created By' && col.header != 'Created On' && col.header != 'Status'">{{slotProps.data[col.field]}}</span>
      </template>
      <!--column-vise filtering-->
       <template #filter="{ filterModel }">
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
                <div
          class="express-adhoc-table-expansion"
        >
          <span v-if="slotProps.data.location.length != 0">
            <!-- <div class="row mr-6 ml-0">
            <div class="col-12"> -->
            <div class="flex justify-content-between">
              <!-- <div class="issue my-2">
                <b><span>Rate Card History</span></b>
              </div> -->

              <!-- </div>
            </div> -->
            </div>
            
            <!--sub table-->
            <GeoFencingSubTables
              tableClass="p-datatable-sm adhoc-table"
              tableDataName="GoeFencingSubData"
              :overlayData="subOverlayData"
              tableName=""
              :tableData="slotProps.data.location"
              :tableColumns="tableColumnData"
              dataKey="id"
            />
          </span>
        </div>
          <span v-if="slotProps.data.location.length == 0">
            <div class="no_data p-3">No data available!</div>
          </span>
          <!-- </span> -->
      </span>
    </template>
  </DataTable>
</template>

<script>
import CustomSpeedDials from "./CustomSpeedDial.vue"
import { FilterMatchMode, FilterOperator } from "primevue/api";
import DataTable from "primevue/datatable"
import Column from "primevue/column";
import moment from "moment";
import GeoFencingSubTables from "./GeoFencingSubTables.vue"
import {geoFencingSubTableColumnsData,geoFencingSubTablesOverlayData} from "./const.js"
// import Dropdown from "primevue/dropdown";
// import InputText from "primevue/inputtext";

export default {
  components: {
    DataTable,
    Column,
    CustomSpeedDials,
    GeoFencingSubTables,
    // Dropdown,
    // InputText,
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
      subOverlayData:geoFencingSubTablesOverlayData,
      tableColumnData: geoFencingSubTableColumnsData,
    };
  },
  methods: {
    getBackgroundColor(color, bgColor) {
      return {
        color: color,
        "background-color": bgColor,
      };
    },

    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM, YYYY");
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
  },

  watch: {
    "$store.state.others.globalSearch": function () {
      this.filters["global"].value =
        this.$store.state[this.storePath].globalSearch;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
::v-deep .p-paginator {
  background: #edf1f7 !important;
  border: 0 !important;
  width: 100% !important;
}
::v-deep .p-column-filter{
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
::v-deep .p-datatable-row-expansion {
  background: rgba(197, 220, 255, 0.62) !important;
  // opacity: 0.5;
}
// ::v-deep .express-adhoc-table-expansion .p-datatable-row-expansion {
//   background: #fff !important;
// }
::v-deep .express-adhoc-zone-trips-table-expansion .p-datatable-row-expansion {
  background: #fff !important;
}
::v-deep
  .express-adhoc-table-expansion
  .p-datatable
  .p-datatable-thead
  > tr
  > th {
  background: #FFF !important;
  // border: none !important;
}
.activeClass {
  color: #17c079;
  font-weight: bold;
}
.colour-header{
  color: #357DEA;
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
::v-deep .p-datatable .p-sortable-column .p-sortable-column-icon{
  font-size: unset !important;
}
::v-deep .p-datatable-thead > tr > th{
  color: #7e84a7 !important;
  font-size: 12px !important;
  font-weight: 600 !important;
}
</style>
