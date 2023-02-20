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
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <!-- <Column v-if="tableName == 'QuotationTabSubTable'" /> -->
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
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :showFilterMenu="
        col.header != 'Actions' && tableName != 'QuotationTabSubTable'
          ? true
          : false
      "
      :sortable="tableName != 'QuotationTabSubTable' ? true : false"
    >
      <template #body="slotProps">
        <!-- TEMPLATE : ACTIONS -->
        <span
          v-if="col.header == 'Actions' && tableName != 'QuotationTabSubTable'"
          class="mr-2"
        >
          <CustomSpeedDial
            storePath="sales"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="processOverlayData(overlayData, slotProps.data)"
          />
        </span>

        <!-- DATES TEMPLATE -->
        <span v-if="col.header == 'Created On'">
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>

        <!-- TEMPLATE : CONTACT -->
        <span v-if="col.header == 'Contact'" class="mr-2">
          <div class="flex flex-column">
            <div class="flex heading">
              {{ slotProps.data["contact_name"] }}
            </div>
            <div class="flex sub">{{ slotProps.data["contact_no"] }}</div>
          </div>
        </span>

        <!-- TEMPLATE : ADDRESS -->
        <span v-if="col.header == 'Address'" class="mr-2">
          <div class="flex flex-column">
            <div class="flex heading">{{ slotProps.data["address"] }}</div>
            <div class="flex sub">{{ slotProps.data["postal_code"] }}</div>
          </div>
        </span>

        <!-- TEMPLATE : QUOTATION -->
        <span v-if="col.header == 'Quotation'" class="mb-1 mr-3">
          <CustomerTags
            marginClass="mt-3 customerTags"
            :label="slotProps.data[col.field]"
            :path="slotProps.data.customer_type"
            :tagClass="slotProps.data.customer_type"
          />
        </span>

        <!-- TEMPLATE : STATUS -->
        <span
          v-if="col.header == 'Status' && tableName == 'QuotationTabTable'"
          class="mr-2"
        >
          <StatusTags
            :type="slotProps.data[col.field]"
            :label="slotProps.data[col.field]"
            usage="table"
          />
        </span>
        <!-- TEMPLATE : STATUS -->
        <span
          v-if="col.header == 'Status' && tableName == 'SalesTab'"
          class="mr-2"
        >
          <span
            v-if="slotProps.data[col.field] != 'deleted'"
            :class="
              slotProps.data[col.field] == 'Active' ||
              slotProps.data[col.field] == 'active'
                ? 'activeClass'
                : 'inactiveClass'
            "
            >{{
              slotProps.data[col.field] == "Active" ||
              slotProps.data[col.field] == "active"
                ? "Active"
                : "Inactive"
            }}</span
          >
          <span
            class="deletedClass"
            v-if="slotProps.data[col.field] == 'deleted'"
          >
            {{ slotProps.data[col.field] }}
          </span>
        </span>

        <!-- TEMPLATE : PREVIEW -->
        <span v-if="col.header == 'Preview'" class="mr-2">
          <Preview />
        </span>

        <!-- TEMPLATE : MEMBERS -->
        <span v-if="col.header == 'Members'">
          <img src="/images/avatar.png" alt="" width="32" height="32" />
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
        </span>

        <!-- TEMPLATE : SITE OFFICE -->
        <span v-if="col.header == 'Site Office'">
          <img
            v-if="slotProps.data[col.field] == true"
            :src="'/images/' + 'siteOffice' + '.png'"
            alt=""
          />
        </span>

        <!-- TEMPLATE : Attachments -->
        <span v-if="col.header == 'Attachments'">
          <img
            v-if="getFilesLength(slotProps.data.attachment_url) == 1"
            src="/images/preview.png"
            alt="pdf"
          />
          <span
            class="flex"
            v-if="getFilesLength(slotProps.data.attachment_url) == 2"
          >
            <img src="/images/preview.png" alt="pdf" />
            <img src="/images/preview.png" alt="pdf" />
          </span>
          <span
            class="flex flex-row"
            v-if="getFilesLength(slotProps.data.attachment_url) > 2"
          >
            <img src="/images/preview.png" alt="pdf" />
            <img src="/images/preview.png" alt="pdf" />

            <div class="mt-1 ml-1">
              <span>
                <Avatar
                  :label="
                    '+' + (getFilesLength(slotProps.data.attachment_url) - 2)
                  "
              /></span>
            </div>
          </span>
        </span>

        <!-- TEMPLATE : Contacts -->
        <span v-if="col.header == 'Contacts'" class="mr-2 pt-2">
          <div class="flex flex-column mt-4">
            <div class="flex heading">
              {{ slotProps.data["customer_contact"] }}
            </div>
            <div class="flex sub">
              {{ slotProps.data["customer_contact_number"] }}
            </div>
          </div>
        </span>
        <!--Hide default display-->
        <span
          v-if="
            col.header != 'Actions' &&
            col.header != 'Status' &&
            col.header != 'Preview' &&
            col.header != 'Members' &&
            col.header != 'Quotation' &&
            col.header != 'Site Office' &&
            col.header != 'Contact' &&
            col.header != 'Address' &&
            col.header != 'Created On' &&
            col.header != 'Attachments' &&
            col.header != 'Contacts'
          "
          >{{ slotProps.data[col.field] }}</span
        >
      </template>
    </Column>

    <!--Expanded row content -->
    <template #expansion="slotProps">
      <!-- TEMPLATE : REVISIONS -->
      <span v-if="tableName == 'QuotationTabTable' && slotProps.data.revisions">
        <span v-if="slotProps.data.revisions.length != 0">
          <div
            class="flex flex-column mt-2"
            v-for="(revision, index) of slotProps.data.revisions"
            :key="index"
          >
            <div class="flex ml-3">
              <StatusTags
                type="Revision"
                :label="revision[0].update + ' ' + (index + 1)"
                usage="table"
              />
            </div>
            <div
              :class="
                index != slotProps.data.revisions.length - 1
                  ? 'flex mt-2 mb-2 pl-4 pr-4'
                  : 'flex mt-2 mb-4 pl-4 pr-4'
              "
            >
              <SalesTables
                tableClass="p-datatable-sm QuotationTabSubTable w-100"
                tableDataName="QuotationTabData"
                tableName="QuotationTabSubTable"
                :tableData="revision"
                :tableColumns="
                  $store.state['salesExpressContractBikeFSR'][
                    'quotationSubTableColumnData'
                  ]
                "
                dataKey="id"
              />
            </div>
          </div>
        </span>
        <span v-if="slotProps.data.revisions.length == 0">
          <div class="no_data p-3">No Revisions to show</div></span
        >
      </span>

      <!-- TEMPLATE : COST CENTER -->
      <span v-if="tableName == 'timeLineExpressContractBikeCostCenterTable'">
        <div class="mr-2 ml-2 mt-2">
          <div class="seaDivLarge p-3">
            <div class="flex flex-wrap justify-content-between">
              <div class="flex"><span class="header">Trip Schedule</span></div>
              <div class="flex"><i class="pi pi-ellipsis-v mt-2"></i></div>
            </div>
            <hr class="horizontal_line mb-2" />
            <TimeLineTable
              tableClass="p-datatable-sm TimeLineTable mt-2 mb-2"
              :tableData="slotProps.data.trip_schedule"
              :tableColumns="
                $store.state.masters.expressRegionsTripTableColumnData
              "
            />
          </div>
          <div
            class="
              flex flex-wrap
              justify-content-between
              siteOfficeCharges
              mt-4
              mr-3
            "
          >
            <div class="flex">
              <span class="header">Site Office Charges</span>
            </div>
          </div>
          <div class="flex flex-row ml-5 mt-3 mb-4">
            <div
              v-for="(item, index) of slotProps.data.siteOfficeCharges"
              class="flex mr-6"
              :key="index"
            >
              <div class="flex flex-column">
                <div class="flex detailsText flex-wrap">{{ index }}</div>
                <div
                  :class="
                    item != 'High'
                      ? 'flex flex-wrap detailsText valuesText'
                      : 'flex  flex-wrap detailsText priorityText'
                  "
                >
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-row ml-5 mb-3">
            <div
              class="flex"
              v-for="(item, index) of slotProps.data
                .siteOfficeChargesPreferences"
              :key="index"
            >
              <div class="flex flex-row">
                <div class="flex mr-1">
                  <img :src="'/images/' + 'siteOffice' + '.png'" alt="" />
                </div>
                <div class="flex mr-4">
                  <span class="mt-1 inclusions">{{ index }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </span>
    </template>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import Avatar from "primevue/avatar";
// import AvatarGroup from 'primevue/avatargroup';
export default {
  name: "OverviewDataTable",
  components: {
    DataTable,
    Column,
    Avatar,
    // AvatarGroup
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
    };
  },

  methods: {
    getFilesLength(files) {
      if (files != null) {
        // if(files.length > 0){
        return files.length;
        // }
      }
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
        var formattedDate = moment(data).format("Do MMM YYYY");
        return formattedDate;
      }
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
</style>
