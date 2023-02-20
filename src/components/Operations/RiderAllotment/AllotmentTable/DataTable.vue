<template>
  <DataTable
    :class="tableClass"
    :showGridlines="false"
    :stripedRows="true"
    :rowClass="rowClass"
    selectionMode="single"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    v-model:selection="rowSelect"
    v-model:expandedRows="expandedRows"
    v-model:filters="filters"
    filterDisplay="menu"
    dataKey="id"
    :globalFilterFields="getGlobalFields()"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
    responsiveLayout="scroll"
    :value="tableData"
    :paginator="true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :showFilterMenu="
        col.header != 'Actions' && col.header != 'S.No' && col.header != 'S.No'
          ? true
          : false
      "
      :showFilterMatchModes="col.header == 'Created On' ? false : true"
      :sortable="col.header != 'Actions' ? true : false"
    >
      <template #body="slotProps">
        <!-- TEMPLATE : ACTIONS -->
        <div v-if="this.tableName == 'BikeAllotmentDataTable'">
          <span v-if="col.header == 'Actions'">
            <CustomSpeedDials
              storePath="operationAllotment"
              :dataName="tableDataName"
              :rowData="slotProps.data"
              :customDialData="RiderAllotmentOverlayData"
            />
          </span>
        </div>

        <div v-if="this.tableName == 'VanAllotmentDataTable'">
          <span v-if="col.header == 'Actions'">
            <CustomSpeedDials
              storePath="operationAllotment"
              :dataName="tableDataName"
              :rowData="slotProps.data"
              :customDialData="RiderAllotmentOverlayData"
            />
          </span>
        </div>

        <div v-if="this.tableName == 'RapidoAllotmentDataTable'">
          <span v-if="col.header == 'Actions'">
            <CustomSpeedDials
              storePath="operationAllotment"
              :dataName="tableDataName"
              :rowData="slotProps.data"
              :customDialData="RiderAllotmentOverlayData"
            />
          </span>
        </div>

        <!-- DATES TEMPLATE -->
        <!-- created-on -->
        <span v-if="col.header == 'Created On'">
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>

        <!-- TEMPLATE : To -->
        <span v-if="col.header == 'To'" class="mr-2">
          {{ timeFormater(slotProps.data[col.field]) }}
        </span>

        <!-- from -->
        <span v-if="col.header == 'From'" class="mr-3">
          {{ timeFormater(slotProps.data[col.field]) }}
        </span>
        <!-- TEMPLATE : S.no-->
        <span v-if="col.header == 'S.No'" class="ml-2">
          {{ slotProps.data[col.field] }}
        </span>

        <span v-if="col.header == 'Created By'" class="ml-3">
          {{ slotProps.data[col.field] }}
        </span>

        <!-- TEMPLATE : Grace Period -->
        <span v-if="col.header == 'Grace Period (mins)'" class="ml-6">
          {{ slotProps.data[col.field] }}
        </span>

        <!-- TEMPLATE : STATUS         class="flex heading"-->
        <span v-if="col.header == 'Status'" class="mr-2">
          <div
            :class="getStatusClassHandler(slotProps.data[col.field])"
            class="mt-3"
          >
            {{ getStatusHandler(slotProps.data[col.field]) }}
          </div>
        </span>

        <!--Hide default display-->
        <span
          v-if="
            col.header != 'Actions' &&
            col.header != 'From' &&
            col.header != 'To' &&
            col.header != 'Grace Period (mins)' &&
            col.header != 'Created On' &&
            col.header != 'S.No' &&
            col.header != 'Status' &&
            col.header != 'Created By'
          "
          >{{ slotProps.data[col.field] }}</span
        >
      </template>

      <template #filter="{ filterModel }">
        <span v-if="col.header == 'Status'">
          <DropDownField
            code="code"
            v-model="filterModel.value"
            :value="filterModel.value"
            :options="[
              { name: 'Active', code: 'Active' },
              { name: 'Inactive', code: 'Inactive' },
              { name: 'Deleted', code: 'Deleted' },
            ]"
            placeholder="Search By Status"
            class="p-column-filter"
            :showClear="true"
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
          />
        </span>
        <!--Text Filter-->
        <span v-if="col.header != 'Created On' && col.header != 'Status'">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="getFilterPlaceHolder(col.header)"
          />
        </span>
      </template>
    </Column>
  </DataTable>
  <div>
    <!-- <EmptyTemplate /> -->
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import Calendar from "primevue/calendar";
import CustomSpeedDials from "../AllotmentTable/CustomSpeedDial.vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import InputText from "primevue/inputtext";
export default {
  name: "SalesTables",
  components: {
    DataTable,
    Column,
    Calendar,
    InputText,
    CustomSpeedDials,
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
      filters: null,
      searcher: "",
      rowSelect: null,

      //adhoc sub table overlay data
      RiderAllotmentOverlayData: [
        {
          label: "Edit",
          icon: "fas fa-pen",
        },
        {
          label: "Disable",
          icon: " far fa-circle",
        },
        {
          label: "Delete",
          icon: "fas fa-user-times",
        },
      ],
    };
  },

  methods: {
    editProduct(data) {},
    subStringHandler(string) {
      if (string) {
        return string.substring(0, 2);
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
    timeFormater(data) {
      if (!data) return "-";
      let date = moment(data).format("HH:mm");

      if (date === "Invalid date") {
        return data;
      } else {
        return date;
      }
    },
    dateFormater(data) {
      if (!data) return "-";
      let date = moment(data).format("DD MMM, YYYY");
      if (date === "Invalid date") {
        return data;
      } else {
        return date;
      }
    },
    getStatusHandler(type) {
      let text;
      switch (type) {
        case "disabled":
          text = "Disabled";
          break;
        case "Deleted":
          text = "Deleted";
          break;
        case "Inactive":
          text = "Inactive";
          break;
        default:
          text = "Active";
      }
      return text;
    },
    getStatusClassHandler(type) {
      let color;
      switch (type) {
        case "disabled":
          color = "color-EB9546";
          break;
        case "Deleted":
          color = "color-c11e1e";
          break;
        case "Inactive":
          color = "color-EB9546";
          break;
        default:
          color = "color-66c11e";
      }
      return color;
    },
    contractClassHandler(type) {
      let typeColor;
      switch (type) {
        case "Rapido":
          typeColor = "color-55ba6b";
          break;
        case "International":
          typeColor = "color-7469F2";
          break;
        case "Express":
          typeColor = "color-EBBD46";
          break;
      }
      return typeColor;
    },
    contractImageClassHandler(type) {
      let typeImgClass;
      switch (type) {
        case "Rapido":
          typeImgClass = "rapido-img";
          break;
        case "International":
          typeImgClass = "international-img";
          break;
        case "Express":
          typeImgClass = "express-img";
          break;
      }
      return typeImgClass;
    },
    contractImagesHandler(type) {
      let img;
      switch (type) {
        case "Rapido":
          img = "/images/rapido.png";
          break;
        case "International":
          img = "/images/International.png";
          break;
        case "Express":
          img = "/images/Express.png";
          break;
      }
      return img;
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
    TimeFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).utc().format("HH:mm");
        return formattedDate;
      }
    },
    timeFormatter(type, data) {
      if (type == "from" && type == "to") {
        var newData = data.replace("Z", "");
        var getTime = new Date(newData);
        if (data == null) {
          return "00:00";
        } else if (moment(getTime, "DD/MM/YYYY", true).isValid()) {
          var formattedTime = moment(newData).format("HH:mm");

          return formattedTime;
        } else {
          return data;
        }
      } else {
        return moment(data).format("HH:mm ");
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
      this.$store.state["salesSales"].globalSearch = searchString;
    },
  },
  created() {
    this.initilaizeFilters();
  },
  watch: {
    "$store.state.operationAllotment.globalSearch": function () {
      this.filters["global"].value =
        this.$store.state["operationAllotment"].globalSearch;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.contactsImage {
  width: 49.97px;
  height: 50px;
  border-radius: 3px;
}
.avatar-text {
  color: #353b48;
  font-family: $font-family-secondary;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;
  width: 49.97px;
  height: 50px;
  border-radius: 3px;
}

.heading {
  color: #4e5868;
}
.sub {
  color: #7e84a7;
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
//small image classes
.rapido-img {
  width: 12.79px;
  height: 18.64px;
}

.international-img {
  width: 13.02px;
  height: 13.7px;
}

.express-img {
  width: 23.87px;
  height: 13.38px;
}
.sales-table-circle {
  color: #357dea;
  min-width: 18px;
  min-height: 18px;
  border: 1px solid #357dea;
  border-radius: 50%;

  float: right;
  margin-top: -18px;
  // margin-left: 10px;
  margin-right: -8px;
  padding: 1px;
}
::v-deep .p-column-filter {
  margin-left: 0px !important ;
  color: #7e84a7 !important;
}
</style>
