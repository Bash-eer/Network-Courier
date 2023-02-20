<template>
  <DataTable
    :loading="
      tableName == 'QuotationTabSubTable'
        ? false
        : $store.state['sales'].tableLoad
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
    <template
      #header
      v-if="
        tableName != 'FleetDialogTable' &&
        tableName != 'Expenditure Personal Card' &&
        tableName != 'Expenditure Cash Card'
      "
    >
      <div
        v-if="
          tableName == 'Maintenance Report' || tableName == 'Inspection Report'
        "
      >
        {{ tableName }}
      </div>
      <div
        v-if="
          tableName != 'FleetFuelTable' &&
          tableName != 'Maintenance Report' &&
          tableName != 'Inspection Report'
        "
        class="flex justify-content-between mt-3"
      >
        <div class="flex">
          <span
            v-if="tableName != 'FleetMaintenanceTable'"
            class="ml-3 line-height-28 font-size-18 bold-700 color-4e5968"
          >
            {{ tableName }}
          </span>
          <span
            v-if="tableName == 'FleetMaintenanceTable'"
            class="titleDesign ml-3"
            >Maintenance</span
          >
        </div>
        <div class="flex flex-row">
          <!-- <div v-if="
              tableName != 'Summon' &&
              tableName != 'Expenditure Cash Card' &&
              tableName != 'Expenditure Personal Card' &&
              tableName != 'Insurance' &&
              tableName != 'Road Tax' &&
              tableName != 'Accidents' &&
              tableName != 'COE'
              "
          class="maintenance-search-icons">
            <i class="pi pi-search searchIcon"></i>
            <TextField
              v-model="searcher"
              placeholder="Search by Keyword"
              classes="p-inputtext-sm search-text search-input-field color-b9b9b9"
              v-on:childToParent="globalSearcher"
              class="p-inputtext-sm mr-2 search-btn"
            />
          </div> -->
          <SearchField class="mr-3" storePath="contacts" />
          <div class="flex mr-1">
            <ReportExport :type="tableName" />
          </div>
          <div class="flex">
            <Buttons
              button_class="p-button-sm mr-1 add-btn custom-add-btn bg-357dea"
              label="Add New"
              v-on:childToParent="openDialog(tableName)"
            />
          </div>
        </div>
      </div>
      <!--TEMPLATE: FLEET FUEL -->
      <div
        v-if="tableName == 'FleetFuelTable'"
        class="flex justify-content-between mt-2"
      >
        <div class="flex">
          <span class="ml-3 titleDesign">Fuel</span>
        </div>
        <!-- <div class="flex flex-row relative">
          <div class="flex fuel-search-icons">
            <i class="pi pi-search searchIcon"></i>
            <SearchField class="mr-3" storePath="fleets" />
            <TextField
              v-model="searcher"
              placeholder="Search by Keyword"
              classes="p-inputtext-sm search-text search-input-field color-b9b9b9"
              v-on:childToParent="globalSearcher"
              class="p-inputtext-sm mr-2 search-btn"
            />
          </div> -->
        <div class="flex">
          <SearchField class="mr-3" storePath="contacts" />

          <ReportExport />

          <Buttons
            button_class="p-button-outlined p-button-sm mr-2 add-btn custom-add-btn color-357dea"
            label="Import"
            v-on:childToParent="importData(tableName)"
          />
          <Buttons
            button_class="p-button-sm mr-2 add-btn custom-add-btn bg-357dea"
            label="Add New"
            v-on:childToParent="openDialog(tableName)"
          />
        </div>
      </div>
    </template>
    <span
      v-if="
        tableName == 'Expenditure Cash Card' ||
        tableName == 'Expenditure Personal Card'
      "
    >
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
    </span>
    <Column
      :expander="
        tableName == 'AttachmentTable' ||
        tableName == 'FollowUpTable' ||
        tableName == 'FleetDialogTable' ||
        tableName == 'FleetVehicles' ||
        tableName == 'Vehicle Type' ||
        tableName == 'Claim Type' ||
        tableName == 'Maintenance Type' ||
        tableName == 'Delivery Point' ||
        tableName == 'Product Name' ||
        tableName == 'Inspection Check' ||
        tableName == 'Vehicle Details'
          ? false
          : true
      "
      headerStyle="width: 1rem"
      class="expander"
    />

    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :sortable="
        col.header != 'Actions' && col.header != 'Image' ? true : false
      "
      :showFilterMenu="
        col.header != 'Actions' &&
        col.header != 'S. No' &&
        col.header != 'S.No.' &&
        col.header != 'Image'
          ? true
          : false
      "
      :showFilterMatchModes="col.header == 'Created On' ? false : true"
    >
      <!--Body -->
      <template #body="slotProps">
        <!-- TEMPLATE : ACTIONS -->
        <span v-if="col.header == 'Actions'" class="mr-2">
          <CustomSpeedDial
            :storePath="
              tableName == 'Vehicle Type' ||
              tableName == 'Claim Type' ||
              tableName == 'Maintenance Type' ||
              tableName == 'Delivery Point' ||
              tableName == 'Product Name' ||
              tableName == 'Fuel Card' ||
              tableName == 'Cash Card' ||
              tableName == 'Inspection Check'
                ? 'masters'
                : 'fleets'
            "
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="overlayData"
            :tableName="tableName"
          />
        </span>

        <!-- DATES TEMPLATE -->
        <span
          v-if="
            col.header == 'Created On' ||
            col.header == 'Due Date' ||
            col.header == 'Receipt Date' ||
            col.header == 'Summon Date' ||
            col.header == 'Tax From' ||
            col.header == 'Tax To' ||
            col.header == 'COE From' ||
            col.header == 'COE To' ||
            col.header == 'From' ||
            col.header == 'To' ||
            col.header == 'to' ||
            col.header == 'Date' ||
            // col.header == 'Fuel Date' ||
            col.header == 'Issue Date' ||
            col.header == 'Expiry Date'
            // col.header == 'Date & Time'
          "
        >
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>
        <span v-if="col.header == 'Fuel Date' || col.header == 'Date & Time'">
          {{ dateFormater2(slotProps.data[col.field]) }}
        </span>

        <!-- TEMPLATE : Amount -->
        <span
          v-if="col.header == 'Amount' || col.header == 'Amount (S$)'"
          class="mr-2"
        >
          <span class="amount">{{ slotProps.data[col.field] }}</span>
        </span>

        <!-- TEMPLATE : Premium -->
        <span v-if="col.header == 'Premium ($)'" class="mr-2">
          <span class="Premium">{{ slotProps.data[col.field] }}</span>
        </span>

        <!-- TEMPLATE : Summon -->
        <span v-if="col.header == 'Fine ($)'" class="mr-2">
          <span class="Fine">{{ slotProps.data[col.field] }}</span>
        </span>

        <!-- TEMPLATE : Image -->
        <span v-if="col.header == 'Image'" class="mr-2">
          <img
            :src="slotProps.data[col.field]"
            alt="logo"
            width="40"
            height="40"
          />
        </span>
        <!-- TEMPLATE : Vehicle -->
        <span v-if="col.header == 'Vehicle'" class="">
          <!-- <GroupedAvatars
            :data="
              slotProps.data[col.field].length < 3
                ? slotProps.data[col.field]
                : getGroupedAvatarsData(slotProps.data[col.field])
            "
            :more="
              slotProps.data[col.field].length >= 3
                ? slotProps.data[col.field].length - 2
                : ''
            "
          /> -->

          <PrimeGroupedAvatars :data="slotProps.data['vehicleImages']" />
        </span>

        <!-- TEMPLATE : Card No -->
        <span
          @click="openCardDialog(tableName, slotProps.data)"
          v-if="col.header == 'Card No'"
          class="blue"
        >
          {{ slotProps.data[col.field] }}
        </span>
        <!--TEMPLATE Balance ($) -->
        <span v-if="col.header == 'Balance ($)'" class="green">
          {{ slotProps.data[col.field] }}
        </span>
        <!--TEMPLATE Transaction -->
        <span v-if="col.header == 'Transaction'">
          <span v-if="slotProps.data['credit'] == true" class="green">
            + {{ slotProps.data[col.field] }}</span
          >
          <span v-if="slotProps.data['debit'] == true" class="red">
            - {{ slotProps.data[col.field] }}</span
          >
        </span>

        <!-- TEMPLATE : VEHICLE STATUS -->
        <span v-if="col.header == 'Status'" class="mr-2">
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
                : ""
            }}</span
          >
        </span>
        <!-- TEMPLATE : Voucher Number -->
        <span v-if="col.header == 'Voucher No'">
          <div class="flex flex-row justify-content-center">
            <div class="flex mr-2">
              <img :src="'./images/voucher.png'" width="17" height="17" />
            </div>
            <div class="flex voucherText">{{ slotProps.data[col.field] }}</div>
          </div>
        </span>
        <!-- TEMPLATE : Number of Claims -->
        <span v-if="col.header == 'No. of Claims'">
          <Popper :hover="true" :placement="'bottom'">
            <template #content>
              <div class="flex flex-column w-100 claimsTooltip">
                <div
                  v-for="(claim, index) in slotProps.data[
                    'expenditure_claims_card'
                  ]"
                  :key="index"
                  :class="
                    index % 2 == 0
                      ? 'flex w-100 p-2 claimsEvenDiv'
                      : 'flex w-100 p-2 claimsOddDiv'
                  "
                >
                  <div class="flex justify-content-between w-100">
                    <div class="flex">{{ claim["claim_type"] }}</div>
                    <div class="flex">: $ {{ claim["claim_amount"] }}</div>
                  </div>
                </div>
              </div>
            </template>
            <div class="flex flex-row">
              <div class="flex mr-2">
                <img
                  :src="'./images/no_of_claims.png'"
                  width="17"
                  height="17"
                />
              </div>
              <div class="flex">
                {{ slotProps.data["expenditure_claims_card"].length }}
              </div>
            </div>
          </Popper>
        </span>
        <!-- TEMPLATE : Claims Amount -->
        <span v-if="col.header == 'Claim ($)'" class="claimsAmountText">
          {{ slotProps.data[col.field] }}
        </span>
        <!-- TEMPLATE : CLAIMS STATUS -->
        <span
          v-if="
            col.header == 'Status' &&
            (tableName == 'Expenditure Cash Card' ||
              tableName == 'Expenditure Personal Card')
          "
        >
          <span
            :class="
              slotProps.data[col.field] == 'New' ||
              slotProps.data[col.field] == 'Approved'
                ? 'activeClass'
                : 'inactiveClass'
            "
            >{{
              slotProps.data[col.field] == "New" ||
              slotProps.data[col.field] == "Approved"
                ? "Approved"
                : "Declined"
            }}</span
          ></span
        >

        <span
          v-if="
            col.header != 'Amount' &&
            col.header != 'Amount (S$)' &&
            col.header != 'Actions' &&
            col.header != 'Status' &&
            col.header != 'Image' &&
            col.header != 'Created On' &&
            col.header != 'Due Date' &&
            col.header != 'Receipt Date' &&
            col.header != 'Summon Date' &&
            col.header != 'Tax From' &&
            col.header != 'Tax To' &&
            col.header != 'COE To' &&
            col.header != 'COE From' &&
            col.header != 'From' &&
            col.header != 'To' &&
            col.header != 'Fine ($)' &&
            col.header != 'Premium ($)' &&
            col.header != 'to' &&
            col.header != 'Date' &&
            col.header != 'Fuel Date' &&
            col.header != 'Issue Date' &&
            col.header != 'Expiry Date' &&
            col.header != 'Vehicle' &&
            col.header != 'Card No' &&
            col.header != 'Balance ($)' &&
            col.header != 'Voucher No' &&
            col.header != 'No. of Claims' &&
            col.header != 'Claim ($)' &&
            col.header != 'Date & Time' &&
            col.header != 'Transaction'
          "
          >{{ slotProps.data[col.field] }}</span
        >
      </template>

      <!--column-vise filtering-->
      <template #filter="{filterModel}">
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
    <template #expansion="slotProps">
      <!--EXPENDITURE TEMPLATES-->
      <!-- TEMPLATE : SUMMONS, ROAD TAX, ACCIDENTS -->
      <span
        v-if="
          tableName == 'Summon' ||
          tableName == 'Road Tax' ||
          tableName == 'Accidents' ||
          tableName == 'COE'
        "
        class="titleDesign"
      >
        <div class="p-6">
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
          </div>
        </div>
      </span>

      <!-- TEMPLATE : INSURANCE, FUEL, MAINTENANCE -->
      <span
        v-if="
          tableName == 'Insurance' ||
          tableName == 'FleetFuelTable' ||
          tableName == 'FleetMaintenanceTable'
        "
      >
        <div class="latest p-4">
          <LatestFleetTemplate
            name="expenditure"
            :data="slotProps.data.latestData"
            :attachmentsData="
              tableName != 'FleetFuelTable' ? slotProps.data.attachments : ''
            "
          />
        </div>
        <div class="m-4">
          <span v-if="slotProps.data.history.length != 0">
            <p class="maintenance-header">
              {{ getHistoryHeading(tableName) }} History
            </p>
            <keep-alive>
              <HistoryFleetTemplate
                :name="getTableName(tableName)"
                :data="slotProps.data.history"
                :columns="$store.state.fleets[getSubTableColumnData(tableName)]"
                idkey="id"
              />
            </keep-alive>
          </span>
          <span v-if="slotProps.data.history.length == 0">
            <div class="no_data p-3">No history to show!</div></span
          >
        </div>
      </span>

      <!-- TEMPLATE : INSPECTION -->
      <span v-if="tableName == 'Inspection'">
        <div class="latest p-4">
          <LatestInspectionsTemplate
            name="expenditure"
            :data="slotProps.data.latestData"
            :attachmentsData="slotProps.data.attachments"
          />
        </div>
        <div class="m-4">
          <span v-if="slotProps.data.history.length != 0">
            <p class="maintenance-header">
              {{ getHistoryHeading(tableName) }} History
            </p>
            <keep-alive>
              <HistoryFleetTemplate
                :name="getTableName(tableName)"
                :data="slotProps.data.history"
                :columns="$store.state.fleets[getSubTableColumnData(tableName)]"
                idkey="id"
              />
            </keep-alive>
          </span>
          <span v-if="slotProps.data.history.length == 0">
            <div class="no_data p-3">No history to show!</div></span
          >
        </div>
      </span>

      <!--TEMPLATE : EXPENDITURE CASH CARD, EXPENDITURE PERSONAL CARD-->
      <span
        v-if="
          tableName == 'Expenditure Cash Card' ||
          tableName == 'Expenditure Personal Card'
        "
      >
        <div class="pl-6 pr-6 pt-3 pb-3">
          <div class="mb-3">
            <div class="flex justify-content-between">
              <div class="flex claimsText text-900">Claims</div>
              <div class="flex downloadReportText">Download Report</div>
            </div>
          </div>
          <keep-alive>
            <HistoryFleetTemplate
              :name="getTableName(tableName)"
              :data="slotProps.data.expenditure_claims_card"
              :columns="
                $store.state.fleets.expenditureClaimsSubTableDataColumns
              "
              idkey="id"
            />
          </keep-alive>
          <div class="row mt-2">
            <div class="col-10">
              <ExpansionTemplateThree
                :data="[{label: 'Remarks', remark: slotProps.data.remarks}]"
              />
            </div>
            <div class="col-2">
              <AttachmentsTemplate
                :receipt="''"
                :data="slotProps.data.expenditure_claim_attachments"
                :type="tableName"
              />
            </div>
          </div></div
      ></span>

      <!--TEMPLATE : FUEL CARD, CASH CARD-->
      <span v-if="tableName == 'Fuel Card' || tableName == 'Cash Card'">
        <div class="latest p-4">
          <LatestFleetTemplate
            name="masterFleetCards"
            :data="slotProps.data.latestData"
            :attachmentsData="''"
          />
        </div>
      </span>
    </template>
  </DataTable>
</template>

<script>
import {FilterMatchMode, FilterOperator} from "primevue/api";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import axios from "axios";
const {URL} = require("../../../../config/const");
import moment from "moment";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import Popper from "vue3-popper";
export default {
  name: "FleetManagementTables",
  components: {
    DataTable,
    Column,
    Dropdown,
    InputText,
    Popper,
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
      dashBoardApiCallsData: [
        {
          path: "vehicleLog/",
          mutate: "fetchVehicleDashboardVehicleLogsReportTableData",
        },
        {
          path: "maintenance/",
          mutate: "fetchVehicleDashboardMaintenanceReportTableData",
        },
        {
          path: "inspection/",
          mutate: "fetchVehicleDashboardInspectionReportTableData",
        },
        {
          path: "fuel/",
          mutate: "fetchVehicleDashboardFuelReportTableData",
        },
        {
          path: "insurance/",
          mutate: "fetchVehicleDashboardInsuranceReportTableData",
        },
        {
          path: "RoadTax/",
          mutate: "fetchVehicleDashboardRoadTaxReportTableData",
        },
        {
          path: "coe/",
          mutate: "fetchVehicleDashboardCOEReportTableData",
        },
        {
          path: "summon/",
          mutate: "fetchVehicleDashboardSummonsReportTableData",
        },
        {
          path: "accidents/",
          mutate: "fetchVehicleDashboardAccidentsReportTableData",
        },
      ],
    };
  },

  methods: {
    globalSearcher(label, searchString) {
      this.$store.state["contacts"].globalSearch = searchString;
    },
    getTableName(type) {
      let tableName;
      switch (type) {
        case "Insurance":
          tableName = "expenditureInsurance";
          break;
        case "FleetFuelTable":
          tableName = "fleetFuel";
          break;
        case "FleetMaintenanceTable":
          tableName = "fleetMaintenance";
          break;
        case "Inspection":
          tableName = "fleetInspection";
          break;
        case "Expenditure Cash Card":
          tableName = "ExpenditureCashCard";
          break;
        case "Expenditure Personal Card":
          tableName = "ExpenditurePersonalCard";
          break;
      }
      return tableName;
    },
    getHistoryHeading(type) {
      let heading;
      switch (type) {
        case "FleetMaintenanceTable":
          heading = "Maintenance";
          break;
        case "FleetFuelTable":
          heading = "Fuel";
          break;
        case "Inspection":
          heading = "Inspection";
          break;
        case "Insurance":
          heading = "Insurance";
          break;
      }
      return heading;
    },
    getSubTableColumnData(type) {
      let columns;
      switch (type) {
        case "Insurance":
          columns = "expenditureInsuranceHistoryTableColumnData";
          break;
        case "FleetFuelTable":
          columns = "fuelHistoryTableColumnData";
          break;
        case "FleetMaintenanceTable":
          columns = "maintenanceHistoryColumnData";
          break;
        case "Inspection":
          columns = "inspectionHistoryColumnData";
          break;
      }
      return columns;
    },
    getExpenditurePath(type) {
      let path;
      switch (type) {
        case "Summon":
          path = "summons";
          break;
        case "Insurance":
          path = "insurance";
          break;
        case "Road Tax":
          path = "roadTax";
          break;
        case "COE":
          path = "coe";
          break;
        case "Accidents":
          path = "accident";
          break;
      }
      return path;
    },
    exportData(tag) {
      let flag;
      if (
        tag == "Summon" ||
        tag == "Insurance" ||
        tag == "Road Tax" ||
        tag == "COE" ||
        tag == "Accidents"
      ) {
        flag = "expenditure";
      }
      if (tag == "Vehicle Details") {
        flag = "vehicleDetails";
      }
      let url = this.getExportURL(tag, flag);
      axios({
        url: url,
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute("download", tag + ".pdf");
        document.body.appendChild(fileLink);
        fileLink.click();
      });
    },
    getGroupedAvatarsData(data) {
      let gAData = [];
      for (let gA = 0; gA < 3; gA++) {
        gAData.push(data[gA]);
      }
      return gAData;
    },
    onRowSelect(event) {
      let rowData = event.data;
      if (this.tableName == "Vehicle Details") {
        this.$store.state.fleets.vehicleDashBoardData = rowData;
        let firstRow = ["reg_date", "purchase_date", "depreciation_type"];
        let secondRow = ["road_tax_to", "road_tax_amount", "coe_to_date"];
        let vehiclesGridData = this.$store.state.fleets.vehicleDetailsGridData;
        for (let g in vehiclesGridData) {
          if (g == 0) {
            for (let f in firstRow) {
              this.$store.state.fleets.vehicleDetailsGridData[g][f].value =
                rowData[firstRow[f]];
            }
          }
          if (g == 1) {
            for (let s in secondRow) {
              this.$store.state.fleets.vehicleDetailsGridData[g][s].value =
                rowData[secondRow[s]];
            }
          }
        }
        for (let d in this.dashBoardApiCallsData) {
          let dObj = this.dashBoardApiCallsData[d];
          let basePath;
          if (dObj.path == "vehicleLog/") {
            basePath = dObj.path + rowData.id;
          } else {
            basePath = dObj.path + rowData.reg_no;
          }
          this.$store.dispatch("fleets/loadFleetVehicleDashboard", {
            path: basePath,
            mutation: dObj.mutate,
          });
        }
        //programmatic router navigation in vue-router
        this.$router.push({
          name: "VehiclesDashBoard",
        });
      }
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
    openCardDialog(name, data) {
      this.$store.state.masters.fleetsCashCardDialogId = data.id;
      this.$store.state.masters.fleetsCardData = {
        vendor: data["vendor"],
        card_no: data["card_no"],
        card_type: data["card_type"],
        issue_date: this.customDateFormatter(data["issue_date"]),
        expiry_date: this.customDateFormatter(data["expiry_date"]),
        balance: data["balance"],
        top_up_cycle: data["top_up_cycle"],
        top_up_day: data["top_up_day"],
      };
      if (name == "Fuel Card") {
        this.$store.state["users"].dialogComponent = "FuelVisaCardDialog";
        this.$store.getters["users/controlActivityDialog"];
      } else {
        this.$store.state["users"].dialogComponent = "CashVisaCardDialog";
        this.$store.getters["users/controlActivityDialog"];
      }
    },
    openDialog(name) {
      //VEHICLE DETAILS
      if (name == "Vehicle Details") {
        this.$store.state.fleets.vehiclesFormStateData = {};
        this.$store.state.fleets.vehicleDetailsInsuranceFiles = [];
        this.$store.state.fleets.vehicleDetailsRoadTaxFiles = [];
        this.$store.state.fleets.vehicleDetailsCoeFiles = [];
        this.$store.state["users"].dialogComponent = "VehicleDetailsDialog";
      }
      //CARDS
      else if (this.tableName == "Fuel Card") {
        this.$store.state.masters.fleetsFormData = {};
        this.$store.state["users"].dialogComponent = "FuelCardDialog";
      } else if (this.tableName == "Cash Card") {
        this.$store.state.masters.fleetsFormData = {};
        this.$store.state["users"].dialogComponent = "CashCardDialog";
      }
      //FUEL
      else if (name == "FleetFuelTable") {
        this.$store.state.fleets.fleetFuelStateData = {};
        this.$store.state["users"].dialogComponent = "FleetFuelDialog";
      }
      //MAINTENANCE
      else if (name == "FleetMaintenanceTable") {
        this.$store.state.fleets.fleetMaintenanceStateData = {};
        this.$store.state.fleets.vehicleMaintenanceFiles = [];
        this.$store.state["users"].dialogComponent = "FleetMaintenanceDialog";
      }
      //INSPECTION
      else if (name == "Inspection") {
        this.$store.state.fleets.fleetInspectionsStateData = {};
        this.$store.state.fleets.inspectionsFormTableData = [];
        this.$store.state.fleets.vehicleInspectionFiles = [];
        this.$store.state.fleets.multiImagesUploadedData = [];
        this.$store.state["users"].dialogComponent = "FleetInspectionDialog";
      }
      //EXPENDITURE
      else if (name == "Summon") {
        this.$store.state.fleets.expenditureSummonsStateData = {};
        this.$store.state.fleets.expenditureSummonsFiles = [];
        this.$store.state["users"].dialogComponent = "SummonsDialog";
      } else if (name == "Insurance") {
        this.$store.state.fleets.expenditureInsuranceStateData = {};
        this.$store.state.fleets.expenditureInsuranceFiles = [];
        this.$store.state["users"].dialogComponent = "InsuranceDialog";
      } else if (name == "Road Tax") {
        this.$store.state.fleets.expenditureRoadTaxStateData = {};
        this.$store.state.fleets.expenditureRoadTaxFiles = [];
        this.$store.state["users"].dialogComponent = "RoadTaxDialog";
      } else if (name == "COE") {
        this.$store.state.fleets.expenditureCoeStateData = {};
        this.$store.state.fleets.expenditureCoeFiles = [];
        this.$store.state["users"].dialogComponent = "CoeDialog";
      } else if (name == "Accidents") {
        this.$store.state.fleets.expenditureAccidentsStateData = {};
        this.$store.state.fleets.expenditureAccidentsFiles = [];
        this.$store.state["users"].dialogComponent = "AccidentsDialog";
      }
      //OTHERS
      else {
        this.$store.state.masters.fleetsFormData = {};
        this.$store.state["masters"].FleetCommonDialogName = name;
        this.$store.state["users"].dialogComponent = "FleetCommonDialog";
      }

      this.$store.getters["users/controlActivityDialog"];
    },
    getFilesLength(files) {
      if (files != null) {
        return files.length;
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
    initilaizeFilters() {
      let obj = {
        operator: FilterOperator.AND,
        constraints: [{value: null, matchMode: FilterMatchMode.CONTAINS}],
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

.claimsEvenDiv {
  background: #f2ebc7;
}
.claimsOddDiv {
  background: #f9f2cd;
}
.claimsTooltip {
  width: 151px !important;
  // padding: 2%;
}
// .claimsText {
// }
.downloadReportText {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #357dea;
}
.claimsAmountText {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #ff5656;
}
.voucherText {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #357dea;
}
.no_data {
  text-align: center;
  font-weight: bold;
}
.search-btn {
  width: 328px;
  height: 36px;
}
.receiptsDiv {
  width: 173px;
  background: #cee0ff;
  opacity: 0.5;
  border: 1px dashed #357dea;
  box-sizing: border-box;
  border-radius: 10px;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #7e84a7;
}
.attachmentsDiv {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #4e5968;
}
.titleDesign {
  color: #4e5968;
  font-size: 18px;
  font-weight: 700;
}
.divider {
  border-left: 1px solid #000000;
  opacity: 0.1;
  height: 100%;
  width: 1%;
}
.Fine {
  color: #ff5656;
}
.no_data {
  text-align: center;
  font-weight: bold;
}
.amount {
  color: #66c11e;
}
.maintenance-header {
  font-family: Montserrat;
  font-weight: 600;
  font-size: 14px;
  color: #4e5968;
}
.Premium {
  color: #17c079;
}
.latest {
  background-color: #ffffff;
}
::v-deep .expander {
  padding: 1.5em !important;
}
.no_data {
  text-align: center;
  font-weight: bold;
}
::v-deep .deleted_row {
  background-color: #fff2f2 !important;
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
::v-deep .FleetsTable.p-datatable-thead > tr > th {
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

.FleetsTable .p-datatable-tbody > tr > td {
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
.custom-avatar-group-lable {
  width: 100px;
  height: 100px !important;
  background: #eaa235;
  color: #7e84a7;
  border-radius: 5px;
}
.p-avatar {
  background-color: #dceafd;
  border-radius: 5px;
  color: #7e84a7;
  width: 24px;
  height: 28px;
}
// ::v-deep .search-input-field{
//   // padding:10 px;
//   padding-left: 40px;
//   width: 328px !important;
//   height: 36px !important;
//   // font-size:12px;
// }
// ::v-deep .maintenance-search-icons i {
//   position: absolute;
//   right: 525px;
//   top:12px;
// }
// ::v-deep .fuel-search-icons i{
//   position: absolute;
//   right: 605px;
//   top:12px;
// }
</style>
