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
    :dataKey="dataKey"
    responsiveLayout="scroll"
    v-model:filters="filters"
    filterDisplay="menu"
    :globalFilterFields="[
      'company',
      'min_weight',
      'logistic_type',
      'default_logistics',
      'user.display_name',
      'createdAt',
    ]"
    :value="tableData"
    :paginator="tableName == 'QuotationTabSubTable' ? false : true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <Column
      v-for="col of selectedColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :filterField="col.field"
      :showFilterMenu="
        col.header != 'Actions' && col.header != 'S. No' ? true : false
      "
      :sortable="col.header != 'Actions' ? true : false"
      :dataType="col.header == 'Created On' ? 'date' : 'text'"
      :showFilterMatchModes="
        col.header != 'Actions' && col.header != 'S. No' ? true : false
      "
    >
      <template #body="slotProps">
        <!-- TEMPLATE : ACTIONS -->
        <span v-if="col.header == 'Actions'" class="mr-2">
          <CustomSpeedDial
            storePath="CrmSettings"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="overlayDataPrompt"
            tableName="crmSettingsLogisticsTable"
            @emittedEditFunctLogisticsTable="emittedEditFunctLogisticsTable"
          />
        </span>

        <!-- DATES TEMPLATE -->
        <span v-if="col.header == 'Created On'">
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>

        <span v-if="col.header == 'From Date'">
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>

        <span v-if="col.header == 'To Date'">
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>

        <span v-if="col.header == 'Company'">
          {{ slotProps.data["company"] ? slotProps.data["company"] : "" }}
        </span>

        <span v-if="col.header == 'Type'">
          {{ logisticsFunct(slotProps.data[col.field]) }}
        </span>

        <span v-if="col.header == 'Weight Range'">
          {{ companyFunct(slotProps.data) }}
        </span>

        <span v-if="col.header == 'Created By'">
          {{ slotProps.data.user ? slotProps.data.user.display_name : "-" }}
        </span>

        <!--Hide default display-->
        <span
          v-if="
            col.header != 'Actions' &&
            col.header != 'Created On' &&
            col.header != 'From Date' &&
            col.header != 'To Date' &&
            col.header != 'Type' &&
            col.header != 'Weight Range' &&
            col.header != 'Created By' &&
            col.header != 'Company'
          "
          >{{ slotProps.data[col.field] }}
        </span>
      </template>
      <template #filter="{ filterModel }">
        <span
          v-if="
            col.header == 'Company' ||
            col.header == 'Weight Range' ||
            col.header == 'Default Logistics' ||
            col.header == 'Created By' ||
            col.header == 'Type'
          "
        >
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="getPlaceholder(col.header)"
          />
        </span>
        <span v-if="col.header == 'Created On'">
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
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import CustomSpeedDial from "./CustomSpeedDial.vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { mapActions, mapGetters } from "vuex";
import InputText from "primevue/inputtext";
import { LogisticsSettingsFields, LogisticsTableOverlayData } from "./Const";

export default {
  name: "LogisticsDataTable",
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
      filters: null,
      selectedColumns: null,
      overlayDataPrompt: LogisticsTableOverlayData,
      LogisticsSettingsFields: LogisticsSettingsFields,
    };
  },

  methods: {
    ...mapActions({
      postSelectedCostCenter: "CustomerLaunchStore/postSelectedCostCenter",
    }),

    emittedEditFunctLogisticsTable(data) {
      this.$emit("emittedEditLogisticParent", data);
    },

    getFilesLength(files) {
      if (files != null) {
        // if(files.length > 0){
        return files.length;
        // }
      }
    },
    getPlaceholder(heads) {
      return `Search by ${heads}`;
    },
    async tableClick(values, val) {
      let data = {
        booking_type: this.selectedTabValues.tab,
        customer_type: this.selectedCustomer,
        cost_center: values.data.cost_center_name,
        cost_center_id: values.data.id,
        customer_id: val.data.customer_id,
        contract_id: values.data.contract_id,
        date: moment().format()
      };
      await this.postSelectedCostCenter(data).then((c) => {
        this.$emit("emittedCostCenterResponse", c);
      });
    },

    initilaizeColumns() {
      this.filters = {
        company: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        weight_range: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        logistic_type: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        default_logistics: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        "user.display_name": {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        createdAt: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.BETWEEN }],
        },
      };
      this.selectedColumns = this.LogisticsSettingsFields;
    },

    processOverlayData(data, row) {
      if (this.tableDataName != "QuotationTabData") {
        var processed_overlayData = [];
        for (var o in data) {
          var ovrly_obj = data[o];
          var new_ovrly_obj = {};
          if (ovrly_obj.label == "Delete") {
            if (row.company_status == "deleted") {
              new_ovrly_obj.label = "Retrieve User";
            }
            if (
              row.company_status == "active" ||
              row.company_status == "disabled"
            ) {
              new_ovrly_obj.label = "Delete";
            }
            new_ovrly_obj.icon = "fas fa-user-times";
          }
          if (
            ovrly_obj.label != "Delete" &&
            ovrly_obj.label != "Retrieve User"
          ) {
            new_ovrly_obj.label = ovrly_obj.label;
            new_ovrly_obj.icon = ovrly_obj.icon;
          }
          processed_overlayData.push(new_ovrly_obj);
        }
        return processed_overlayData;
      } else {
        return data;
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
        var formattedDate = moment(data).format("Do MMM, YYYY");
        return formattedDate;
      }
    },

    logisticsFunct(data) {
      let updated = data.map((c) => {
        return c.type;
      });

      let arrayToString = updated.toString();
      return arrayToString;
    },
    companyFunct(data) {
      return data ? data.min_weight + " - " + data.max_weight : "";
    },
    // eslint-disable-next-line no-unused-vars
    onRowSelect(event) {
      if (this.tableName == "DashboardTab") {
        //programmatic router navigation in vue-router
        this.$router.push({
          name: "Quotation",
        });
      }
      if (this.tableName == "QuotationTabTable") {
        localStorage.setItem("quotationID", event.data.quotation_id);
        this.$store.state.masters.expressRegionsTripTableData = null;
        //--------- quotation overview data processing --------//
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
        //programmatic router navigation in vue-router
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
  mounted() {
    this.initilaizeColumns();
  },
  computed: {
    ...mapGetters({
      selectedCostCenterMethod: "CustomerLaunchStore/selectedCostCenterMethod",
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

::v-deep.p-datatable .p-datatable-thead > tr > th {
  padding: 0.5rem 0.5rem !important;
}
::v-deep.p-datatable .p-datatable-tbody > tr > td {
  padding: 0.5rem 0.5rem !important;
  color: #4e5968 !important;
  font-size: 12px !important;
  font-weight: 600 !important;
}

::v-deep .p-datatable-row-expansion {
  background: #e1eaf9 !important;
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
  padding: 0rem 0rem !important;
  height: 30px !important;
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
