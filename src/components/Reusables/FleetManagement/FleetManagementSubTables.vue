<template>
  <DataTable
    :class="tableClass"
    id="formTable"
    :value="tableData"
    :rowClass="rowClass"
    :dataKey="dataKey"
    v-model:selection="selectionMode"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    @row-select-all="selectAllRows"
    @row-unselect-all="unSelectAllRows"
    v-model:expandedRows="expandedRows"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
    v-model:filters="filters"
    filterDisplay="menu"
    :globalFilterFields="getGlobalFields()"
  >
    <Column
      v-if="tableName == 'fuelReportTable'"
      selectionMode="multiple"
      headerStyle="width: 1em"
    ></Column>
    <Column
      :expander="
        tableName != 'vehicleLogTable' &&
        tableName != 'ExpenditureCashCard' &&
        tableName != 'ExpenditurePersonalCard'
          ? true
          : false
      "
      headerStyle="width: 1rem"
    />
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
    >
      <template #body="slotProps">
        <!-- ACTIONS TEMPLATE-->
        <span v-if="col.header == 'Actions'" class="mr-2">
          <CustomSpeedDial
            storePath="sales"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="overlayData"
          />
        </span>
        <!-- AMOUNT TEMPLATE-->
        <span v-if="col.header == 'Amount ($)'" class="mr-2">
          <span class="color-ff5656">{{
            // "$" + " " + 
            slotProps.data[col.field]
          }}</span>
        </span>
        <!-- INVOICE TEMPLATE -->
        <span
          v-if="
            col.header == 'Invoice No.' ||
            col.header == 'Voucher No.' ||
            col.header == 'Notice No.' ||
            col.header == 'No.'
          "
          class="invoice"
        >
          {{ slotProps.data[col.field] }}
        </span>
        <!-- DATES TEMPLATE -->
        <span
          v-if="
            col.header == 'Created On' ||
            // col.header == 'From' ||
            // col.header == 'To' ||
            col.header == 'from_date' ||
            col.header == 'to_date' ||
            col.header == 'to' ||
            // col.header == 'Fuel Date' ||
            // col.header == 'Date & Time' ||
            col.header == 'Summon Date, Time' ||
            col.header == 'Receipt Date' ||
            col.header == 'Due Date' ||
            col.header == 'Added Date'
          "
        >
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>
        <span
          v-if="col.header == 'Fuel Date' || col.header == 'Date & Time'"
        >
          {{ dateFormater2(slotProps.data[col.field]) }}
        </span>
        <span
          v-if="
            col.header == 'To' ||
            col.header == 'From' 
          "
        >
          {{ dateFormater3(slotProps.data[col.field]) }}
        </span>
        <!-- TIME TEMPLATE -->
        <span v-if="col.header == 'Time Taken'"
          >{{ timeFormatter(slotProps.data["start_at"]) }} -
          {{ timeFormatter(slotProps.data["end_at"]) }}</span
        >

        <span
          v-if="
            col.header != 'Invoice No.' &&
            col.header != 'Voucher No.' &&
            col.header != 'Notice No.' &&
            col.header != 'No.' &&
            col.header != 'Amount ($)' &&
            col.header != 'From' &&
            col.header != 'To' &&
            col.header != 'from_date' &&
            col.header != 'to_date' &&
            col.header != 'to' &&
            col.header != 'Fuel Date' &&
            col.header != 'Date & Time' &&
            col.header != 'Summon Date, Time' &&
            col.header != 'Added Date' &&
            col.header != 'Receipt Date' &&
            col.header != 'Due Date' &&
            col.header != 'Time Taken' &&
            col.header != 'Created On' &&
            col.header != 'Actions'
          "
          >{{ slotProps.data[col.field] }}</span
        >
      </template>
    </Column>
    <!--Expanded row content -->
    <template #expansion="slotProps">
      <!--------------------------------  TEMPLATE HISTORY TABLE  EXPANSIONS------------------------------------------->
      <!-- TEMPLATE : INSURANCE, FUEL, MAINTENANCE , 
      VEHICLE DASHBOARD MAINTENANCE REPORT, FUEL REPORT -->
      <span
        v-if="
          tableName == 'expenditureInsurance' ||
          tableName == 'fleetFuel' ||
          tableName == 'fleetMaintenance' ||
          tableName == 'Maintenance Report' ||
          tableName == 'Fuel Report' ||
          tableName == 'Insurance Report'
        "
      >
        <div class="past p-4">
          <LatestFleetTemplate
            name="expenditure"
            :data="slotProps.data.latestData"
            :attachmentsData="
              tableName != 'fleetFuel' && tableName != 'Fuel Report'
                ? slotProps.data.attachments
                : ''
            "
          />
        </div>
      </span>
      <!-- TEMPLATE : INSPECTION, VEHICLE DASHBOARD INSPECTION REPORT -->
      <span
        v-if="
          tableName == 'fleetInspection' || tableName == 'Inspection Report'
        "
      >
        <div class="past p-4">
          <LatestInspectionsTemplate
            name="expenditure"
            :data="slotProps.data.latestData"
            :attachmentsData="slotProps.data.attachments"
          />
        </div>
      </span>
      <!-- TEMPLATE :   VEHICLE DASHBOARD ROADTAX REPORT, COE REPORT, SUMMONS REPORT, ACCIDENTS REPORT -->
      <span
        v-if="
          tableName == 'RoadTax Report' ||
          tableName == 'COE Report' ||
          tableName == 'Summons Report' ||
          tableName == 'Accidents Report'
        "
        ><div class="p-6">
          <div class="row">
            <div class="col-10">
              <ExpansionTemplateThree
                :data="slotProps.data.subData[0].remarks"
              />
            </div>
            <div class="col-2">
              <AttachmentsTemplate
                :receipt="
                  tableName == 'Summon' ? slotProps.data.subData[0].receipt : ''
                "
                :data="slotProps.data.subData[0].attachments"
                :type="tableName"
              />
            </div>
          </div></div
      ></span>
      <!-------------------------------- TEMPLATE HISTORY TABLE EXPANSIONS ------------------------------------------->
    </template>
  </DataTable>
</template>
<script>
import { FilterMatchMode, FilterOperator } from "primevue/api";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
export default {
  name: "FleetManagementSubTables",
  components: { DataTable, Column },
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
      selectedRows: [],
      selectionMode: null,
      expandedRows: [],
      filters: null,
    };
  },
  methods: {
    timeFormatter(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedTime = moment(data).format("HH:mm");
        return formattedTime;
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
    dateFormater2(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMM, YYYY H:MM A");
        return formattedDate;
      }
    },
    dateFormater3(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD/MM/YYYY");
        return formattedDate;
      }
    },
    onRowSelect(e) {
      console.log(e);
      console.log(e.data?.start_latitude);
      console.log(e.data?.start_longitude);
      this.$store.state.fleets.vehicleDetailsMapStartLatitudeData=e?.data?.start_latitude
      this.$store.state.fleets.vehicleDetailsMapStartLongitudeData=e?.data?.start_longitude
    },
    timeParser(time) {
      let hours = time.getHours();
      let minutes = time.getMinutes();
      let parsed_time = hours + ":" + minutes;
      return parsed_time;
    },
    rowClass() {
      return "formRows";
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
  },
  created() {
    this.initilaizeFilters();
  },
  mounted() {
    var formRows = document.getElementsByClassName("formRows");
    for (let fr in formRows) {
      let fr_obj = formRows[fr];
      if (isNaN(fr_obj) == true) {
        fr_obj.id = "row" + "_" + fr;
        let h_tag = document.createElement("h2");
        let p_tag = document.createElement("p");
        let current_row = document.getElementById("row" + "_" + fr);
        if (current_row) {
          current_row.before(h_tag);
          current_row.before(p_tag);
        }
      }
    }
  },

  watch: {
    "$store.state.contacts.globalSearch": function () {
      this.filters["global"].value =
        this.$store.state[this.storePath].globalSearch;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.no_data {
  text-align: center;
  font-weight: bold;
}
.fleetsSubTable .p-datatable-tbody > tr:not(.p-highlight):hover {
  background-color: #ffffff !important;
  border-bottom-color: #ffff !important;
}
.invoice {
  color: #357dea;
}
.past {
  background-color: #ffffff;
}
.amountDollars {
  color: #17c079;
}
.formRows {
  margin-top: 2% !important;
}
.fleetsSubTable .p-datatable-tbody > tr:nth-child(odd) {
  height: 20px !important;
}
.vehicleLogTable .p-datatable-tbody > tr:nth-child(odd) {
  height: 20px !important;
}
.fleetsSubTable .p-datatable-tbody > tr {
  color: #495057;
  padding-bottom: 10rem !important;
  outline: thin !important;
  outline-style: solid !important;
  outline-color: #ffffff !important;
  border-radius: 6px;
  border-bottom-color: #f0f0ff !important;
}
.vehicleLogTable .p-datatable-tbody > tr {
  color: #495057;
  padding-bottom: 10rem !important;
  outline: thin !important;
  outline-style: solid !important;
  outline-color: #e6e6e6 !important;
  border-radius: 6px;
  border-bottom-color: #f0f0ff !important;
}
.fleetsSubTable .p-datatable-tbody > tr > td {
  border: 0px !important;
}
.vehicleLogTable .p-datatable-tbody > tr > td {
  border: 0px !important;
}
.fleetsSubTable .p-column-title {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #7e84a7;
}
.vehicleLogTable .p-column-title {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #7e84a7;
}
.fleetsSubTable .p-datatable-thead > tr {
  border-radius: 5px;
  outline: thin !important;
  outline-color: #edf1f7 !important;
}
.fleetsSubTable .p-datatable-thead > tr > th {
  background: #ffffff !important;
  outline: thin !important;
  outline-style: solid !important;
  outline-color: #ffffff !important;
  border-radius: 4px;
  border-color: #ffffff !important;
}
.vehicleLogTable .p-datatable-thead > tr {
  border-radius: 5px;
  outline: solid !important;
  outline-color: #edf1f7 !important;
}
.vehicleLogTable .p-datatable-thead > tr > th {
  background: #edf1f7 !important;
}
</style>
