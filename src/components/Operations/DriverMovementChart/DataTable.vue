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
    :dataKey="dataKey"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
    responsiveLayout="scroll"
    :value="tableData"
    :paginator="tableName == 'QuotationTabSubTable' ? false : true"
    :rows="10"
    :globalFilterFields="[
      'driver.employee_name',
      'mileage_start',
      'total_km',
      'mileage_end',
      'createdAt',
      'user.display_name',
      'date_entry',
    ]"
    v-model:filters="filters"
    filterDisplay="menu"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <Column
      v-if="tableName != 'QuotationTabSubTable'"
      :expander="
        tableName == 'QuotationTabSubTable' ||
        tableName == 'SalesTab' ||
        tableName == 'AttachmentTable' ||
        tableName == 'FollowUpTable'
          ? false
          : true
      "
      headerStyle="width: 1rem"
    />
    <Column
      v-for="col of selectedColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :showFilterMenu="
        col.header != 'Actions' && col.header != 'S.No' ? true : false
      "
      :sortable="tableName != 'QuotationTabSubTable' ? true : false"
    >
      <template #body="slotProps">
        <span
          v-if="col.header == 'Actions' && tableName != 'QuotationTabSubTable'"
          class="mr-2"
        >
          <CustomSpeedDial
            storePath="sales"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="overlayDataPrompt"
            @emittedEditDriverMoementTable="emittedEditDriverMoementTable"
          />
        </span>
        <span v-if="col.header == 'S.No'">
          {{ slotProps.data.s_no }}
        </span>

        <span v-if="col.header == 'Created On'">
          {{ dateFormater(slotProps.data?.createdAt) }}
        </span>

        <span v-if="col.header == 'Created By'">
          {{ slotProps.data?.user?.display_name }}
        </span>

        <span v-if="col.header == 'Driver'" class="mr-2">
          {{ slotProps.data?.driver?.employee_name }}
        </span>

        <!-- <span v-if="col.header == 'Customer ID'">
          {{ slotProps.data?.id }}
        </span> -->

        <span v-if="col.header == 'Start Mileage'">
          {{ slotProps.data?.mileage_start }}
        </span>

        <span v-if="col.header == 'Total KM'">
          {{ slotProps.data?.total_km }}
        </span>

        <span v-if="col.header == 'End Mileage'">
          {{ slotProps.data?.mileage_end }}
        </span>

        <span v-if="col.header == 'Date'">
          {{ dateFormater(slotProps.data?.date_entry) }}
        </span>
      </template>
      <template #filter="{ filterModel }">
        <span
          v-if="
            col.header == 'Created By' ||
            col.header == 'Driver' ||
            col.header == 'Start Mileage' ||
            col.header == 'Total KM' ||
            col.header == 'End Mileage'
          "
        >
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="getFilterPlaceHolder(col.header)"
          />
        </span>
        <span v-if="col.header == 'Created On' || col.header == 'Date'">
          <p class="mb-2"><b>Set a date range:</b></p>
          <Calendars
            :state="filterModel.value"
            v-model="filterModel.value"
            dateFormat="mm/dd/yy"
            placeholder="mm/dd/yyyy"
          />
        </span>
      </template>
    </Column>

    <template class="nestedTable" #expansion>
      <DataTable
        :value="DriverMovementMainTableData?.trips"
        responsiveLayout="scroll"
      >
        <Column
          v-for="col of subtableColumns"
          :field="col.field"
          :header="col.header"
          :key="col.field"
          :showFilterMenu="col.header != 'Actions' ? true : false"
          :sortable="tableName != 'QuotationTabSubTable' ? true : false"
        >
          <Column field="trip_id" header="Trips"></Column>

          <Column field="vehicle" header="Vehicle"></Column>

          <Column field="route" header="Route"></Column>

          <Column field="document" header="Document"></Column>

          <Column field="parcel" header="Parcel"></Column>

          <Column field="delivery_type" header="Delivery Type"></Column>

          <Column field="delivery_type" header="Return"></Column>
        </Column>
      </DataTable>
    </template>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import CustomSpeedDial from "./CustomSpeedDail.vue";
import { mapActions, mapGetters } from "vuex";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import InputText from "primevue/inputtext";

export default {
  name: "OverviewDataTable",
  components: {
    DataTable,
    Column,
    CustomSpeedDial,
    InputText,
  },
  slotProps: {},
  props: [
    "tableDataName",
    "tableName",
    "tableClass",
    "tableData",
    "tableColumns",
    "subtableColumns",
    "overlayData",
    "globalSearchString",
    "paginator",
    "storePath",
    "dataKey",
    "selectedTabValues",
    "selectedCustomer",
  ],
  data() {
    return {
      expandedRows: [],
      rowSelect: null,
      subTable: null,
      selectedColumns: null,
      filters: null,
      overlayDataPrompt: [
        {
          label: "Edit",
          icon: "fas fa-pen",
        },
        {
          label: "Delete",
          icon: "fas fa-user-times",
        },
      ],
    };
  },
  mounted() {
    this.initilaizeColumns();
  },
  methods: {
    ...mapActions({
      postSelectedCostCenter: "CustomerLaunchStore/postSelectedCostCenter",
      getDriverMovementMainTableData:
        "DriverMovement/getDriverMovementMainTableData",
    }),
    getFilterPlaceHolder(placeholder) {
      return "Search by" + " " + placeholder;
    },
    emittedEditDriverMoementTable(data) {
      this.$emit("emittedEditFunctLogisticsTable", data);
    },
    initilaizeColumns() {
      this.filters = {
        "driver.employee_name": {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        mileage_start: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        total_km: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        mileage_end: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        date_entry: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        createdAt: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        "user.display_name": {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
      };
      this.selectedColumns = this.tableColumns;
    },
    onRowExpand(event) {
      let payload = { id: event.data.id };
      this.getDriverMovementMainTableData(payload);
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
        var formattedDate = moment(data).format("Do MMM YYYY");
        return formattedDate;
      }
    },

    onRowSelect(event) {
      if (this.tableName == "DashboardTab") {
        this.$router.push({
          name: "Quotation",
        });
      }
      if (this.tableName == "QuotationTabTable") {
        localStorage.setItem("quotationID", event.data.quotation_id);
        this.$store.state.masters.expressRegionsTripTableData = null;

        this.$store.state.salesExpressContractBikeFSR.expressQuotationOverviewData =
          [];
        let overviewDetailsObj = {};
        let timeLineHeaderObj = {};
        let selectMethodObj = {};
        let costingDetailsObj = {};
        for (let d in event.data) {
          if (d == "status") {
            overviewDetailsObj["status"] = event.data[d];
          }
          if (d == "createdAt") {
            overviewDetailsObj["modifiedOn"] = event.data[d];
          }
          if (d == "service_required") {
            timeLineHeaderObj[d] = event.data[d];
          }
          if (d == "address") {
            let address =
              event.data["floor_no"] +
              "," +
              event.data["unit_no"] +
              "," +
              event.data["building_name"] +
              "," +
              event.data["country"] +
              "," +
              event.data["postal_code"];
            timeLineHeaderObj[d] = address;
          }
          if (
            d == "priority" ||
            d == "previously_served_by" ||
            d == "referred_by" ||
            d == "referral_person_name" ||
            d == "sales_comission"
          ) {
            selectMethodObj[d] = event.data[d];
          }
          if (d == "package_details" || d == "remarks") {
            overviewDetailsObj[d] = event.data[d];
          }
          if (d == "contact_person") {
            overviewDetailsObj["members"] = event.data[d];
          }
          if (
            d == "job" ||
            d == "additional_jobs" ||
            d == "no_of_units" ||
            d == "amount"
          ) {
            costingDetailsObj[d] = event.data[d];
          }
          if (d == "trip_schedule") {
            overviewDetailsObj[d] = event.data[d];
          }
        }

        overviewDetailsObj["timeLineHeader"] = timeLineHeaderObj;
        overviewDetailsObj["selectMethod"] = selectMethodObj;
        overviewDetailsObj["costingDetails"] = costingDetailsObj;
        this.$store.state.salesExpressContractBikeFSR.expressQuotationOverviewData.push(
          overviewDetailsObj
        );
        localStorage.setItem(
          "quotationOverViewData",
          JSON.stringify(
            this.$store.state.salesExpressContractBikeFSR
              .expressQuotationOverviewData
          )
        );
        //--------- quotation overview data processing --------//

        this.$store.state.sales.salesQuotationId = event.data.quotation_id;
        this.$router.push({
          name: "expressTracker",
        });
        this.$store.dispatch("salesExpressContractBikeFSR/loadBillPreferences");
        this.$store.dispatch("salesExpressContractBikeFSR/loadCostCentres");
        this.$store.dispatch("salesExpressContractBikeFSR/loadAttachments");
        this.$store.dispatch("salesExpressContractBikeFSR/loadFollowUp");
      }
      if (this.tableName == "SalesTab") {
        localStorage.setItem("companyID", event.data.id);
        this.$store.state.sales.salesCompanyid = event.data.id;
        let apiPath = "?type=sales_company&type_id=" + event.data.id;
        this.$store.dispatch("sales/loadContactsApi", {
          apiPath: apiPath,
        });
        this.$store.dispatch("sales/loadQuotationApi", {
          id: event.data.id,
        });

        this.$router.push({
          name: "Quotation",
        });
      }
    },
    getGroupedAvatarsData(data) {
      let gAData = [];
      for (let gA = 0; gA < 3; gA++) {
        gAData.push(data[gA]);
      }
      return gAData;
    },
  },
  computed: {
    ...mapGetters({
      selectedCostCenterMethod: "CustomerLaunchStore/selectedCostCenterMethod",
      DriverMovementMainTableData: "DriverMovement/DriverMovementMainTableData",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.no_data {
  text-align: center;
  font-weight: bold;
}
::v-deep .deleted_row {
  background-color: #fff2f2 !important;
}
.activeClass {
  color: #17c079;
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

::v-deep .QuotationTabTable .p-datatable-thead > tr > th {
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
::v-deep .QuotationTabTable .p-paginator {
  background: #edf1f7 !important;
  border: 0 !important;
  width: 100% !important;
}

::v-deep .timeLineExpressCostCenterTable .p-paginator {
  background: #ffff !important;
  border: 0 !important;
  width: 100% !important;
}
::v-deep .activityLogTable > .p-paginator {
  background: white !important;
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
  // opacity: 0.2;
  border-radius: 5px;
}
.p-avatar {
  background-color: #dceafd;
  border-radius: 5px;
  color: #7e84a7;
  width: 24px;
  height: 28px;
}

::v-deep .p-datatable .p-datatable-thead > tr > th {
  text-align: left;
  padding: 1rem 1rem;
  border: 1px solid #e9ecef;
  border-width: 0 0 1px 0;
  font-weight: 600;
  color: #495057;
  background: #d7e7ff !important;
  transition: box-shadow 0.2s;
}

::v-deep .p-datatable .p-sortable-column.p-highlight:hover {
  background: #d7e7ff;
  color: #2196f3;
}

::v-deep .p-datatable .p-sortable-column.p-highlight {
  background: #d7e7ff;
  color: #2196f3;
}

.btn-go-property {
  background-color: #fff;
  color: #357dea;
  font-weight: 700;
  font-size: 14px;
}

.contentText {
  color: #4e5868;
  font-weight: 700;
}
</style>
