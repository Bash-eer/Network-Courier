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
    v-model:filters="filters"
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
            :tableName="tableName"
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
          <div class="flex flex-column mt-4">
            <div class="heading">{{ slotProps.data["addresss"] }}</div>
            <div class="sub">{{ slotProps.data["postal_code"] }}</div>
          </div>
        </span>

        <!-- TEMPLATE : QUOTATION -->
        <span v-if="col.header == 'Quotation'" class="mb-1 mr-3">
          <!-- <CustomerTags
            marginClass="mt-3 customerTags"
            :label="slotProps.data[col.field]"
            :path="slotProps.data.customer_type"
            :tagClass="slotProps.data.business_type"
          /> -->
          <CustomerTags
            marginClass="mt-3 customerTags"
            :label="slotProps.data.business_type"
            :path="slotProps.data.customer_type"
            :tagClass="slotProps.data.customer_type"
          />
        </span>
        <!-- TEMPLATE : REMARKS -->
        <span v-if="col.header == 'Remarks'" class="mb-1 mr-3">
          <span v-if="slotProps.data[col.field] != null">
            {{ slotProps.data[col.field] }}
          </span>
          <span v-else class="mx-5"> - </span>
        </span>
        <!-- TEMPLATE : STATUS -->
        <!--&& tableName == 'QuotationTabTable'-->
        <span v-if="col.header == 'Status'" class="mr-2">
          <StatusTags
            :type="slotProps.data[col.field]"
            :label="slotProps.data[col.field]"
            usage="table"
          />
        </span>
        <!-- TEMPLATE : STATUS -->
        <!-- && tableName == 'SalesTab'" -->
        <!-- TEMPLATE : PREVIEW -->
        <span v-if="col.header == 'Preview'" class="mr-2">
          <Preview />
        </span>

        <!-- TEMPLATE : MEMBERS -->
        <span v-if="col.header == 'Members'">
          <!-- <GroupedAvatars
            v-if="slotProps.data[col.field]"
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
          <GroupedAvatars
            v-if="slotProps.data[col.field]"
            :data="
              slotProps.data[col.field].length < 3
                ? slotProps.data[col.field].map((contact) =>
                    contact.profile_url
                      ? contact.profile_url
                      : 'https://network-courier.sgp1.digitaloceanspaces.com/application/images/Image_1656429363602_2515_blank_profile.png'
                  )
                : getGroupedAvatarsData(slotProps.data[col.field])
            "
            :more="
              slotProps.data[col.field].length >= 3
                ? slotProps.data[col.field].length - 2
                : ''
            "
            tableType="subGroups"
          />
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
            col.header != 'Contacts' &&
            col.header != 'Remarks'
          "
          >{{ slotProps.data[col.field] }}</span
        >
      </template>
    </Column>

    <!--Expanded row content -->
    <template #expansion="slotProps">
      <!-- TEMPLATE : REVISIONS -->
      <!-- <span>hello</span>
      <span>{{ tableName }}</span> -->
      <!--v-if="
          tableName == 'QuotationTabTable' &&
          slotProps.data.quotation_contract_express
        "-->
      <span>
        <QuotationExpansionTemplate v-if="tableName == 'QuotationTabTable'" />
        <ContractExpansionTemplate v-if="tableName == 'ContractTabTable'" />
      </span>

      <!-- TEMPLATE : COST CENTER -->
      <span v-if="tableName == 'timeLineExpressCostCenterTable'">
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
// import QuotationSubTable from "../Common/QuotationSubTable.vue";
// import AvatarGroup from 'primevue/avatargroup';
import QuotationExpansionTemplate from "./QuotationExpansionTemplate.vue";
import ContractExpansionTemplate from "./ContractExpansionTemplate.vue";
import CustomSpeedDial from "./CustomSpeedDial.vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
// import { contractSubTableColumnsData } from "../../Settings/Sales/Rapido/const/const";
export default {
  name: "SalesTables",
  components: {
    DataTable,
    Column,
    Avatar,
    // QuotationSubTable,
    QuotationExpansionTemplate,
    ContractExpansionTemplate,
    CustomSpeedDial,
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
    "type",
  ],
  data() {
    return {
      expandedRows: [],
      filters: null,
      rowSelect: null,
    };
  },
  created() {
    this.initilaizeFilters();
  },
  watch: {
    "$store.state.salesSales.globalSearch": function () {
      this.filters["global"].value =
        this.$store.state["salesSales"].globalSearch;
    },
  },
  methods: {
    getFilesLength(files) {
      if (files != null) {
        // if(files.length > 0){
        return files.length;
        // }
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
    },
    processOverlayData(data, row) {
      // if(this.tableName=="ContractTabTable"&& !data.some((u) => u.label == "Edit Promote To Contract")){
      //   data.push({ label: "Edit Promote To Contract", icon: "fas fa-edit" })
      // }
      if (
        this.tableDataName != "QuotationTabData" &&
        this.tableDataName != "AdhocProfileTabData"
      ) {
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
    onRowExpand(event) {
      this.expandedRows = this.tableData.filter(
        (data) => event?.data?.id === data.id
      );
      this.tableData.map((obj) => {
        if (obj.id === event.data.id) {
          obj.expanded = !obj.expanded;
        } else {
          obj.expanded = false;
        }
      });

      if (this.tableName == "ContractTabTable") {
        this.$store.dispatch("salesSales/loadContractSubTableData", {
          id: event.data.id,
        });
      } else if (this.tableName == "QuotationTabTable") {
        this.$store.dispatch("salesSales/loadQuotationSubTableData", {
          id: event.data.id,
        });
      }
    },

    async onRowSelect(event) {
      if (this.type == "Adhoc") {
        this.$router.push({
          name: "QuotationContract",
          params: {
            id: event.data.id,
            actionType: "Adhoc",
          },
        });
      } else {
        let QCType;
        if (this.tableName == "ContractTabTable") {
          QCType = "contract";
        } else if (this.tableName == "QuotationTabTable") {
          QCType = "quotation";
        }
        // "business_type": "Express",
        //     "customer_type": "Contract",
        let QuotationProcessedType =
          event.data.customer_type + event.data.business_type;

        //express contract
        if (QuotationProcessedType == "ExpressContract") {
          if (event.data && event.data.express_contract[0]) {
            let serviceType = event.data.express_contract[0].service;

            this.$router.push({
              name: "ExpressContract",
              params: {
                id: event.data.id,
                type: QCType,
                p_id: this.$route.params.id,
                mode: "overview",
              },
            });
          }
        }
        //express adhoc
        else if (QuotationProcessedType == "ExpressAdhoc") {
          this.$router.push({
            name: "ExpressAdhocOverview",
            params: {
              id: event.data.id,
              type: QCType,
              p_id: this.$route.params.id,
              mode: "overview",
            },
          });
        }
        //rapido contract
        else if (QuotationProcessedType == "RapidoContract") {
          this.$router.push({
            name: "RapidoRapidoContractOverview",
            params: {
              id: event.data.id,
              type: QCType,
              p_id: this.$route.params.id,
              mode: "overview",
            },
          });
        }
        //Express Contract Bike + Fsr
        else if (QuotationProcessedType == "ExpressContractBikeFSR") {
          this.$router.push({
            name: "ExpressContractBikeFSRQuotationOverview",
            params: { id: event.data.id, type: QCType, mode: "overview" },
          });
        } else if (QuotationProcessedType == "ExpressContractVanFSR") {
          this.$router.push({
            name: "ExpressContractVanFSROverview",
            params: { id: event.data.id, type: QCType, mode: "overview" },
          });
        }
        //
        else if (QuotationProcessedType == "ExpressContractBikeProjectJobs") {
          this.$router.push({
            name: "ExpressContractBikeProjectJobsOverview",
            params: {
              id: event.data.id,
              type: QCType,
              p_id: this.$route.params.id,
              mode: "overview",
            },
          });
        }
        //
        else if (QuotationProcessedType == "ExpressContractVanProjectJobs") {
          this.$router.push({
            name: "ExpressContractVanProjectJobsOverview",
            params: { id: event.data.id, type: QCType, mode: "overview" },
          });
        }
        //RapidoAdhoc
        else if (QuotationProcessedType == "RapidoAdhoc") {
          this.$router.push({
            name: "RapidoRapidoAdhocOverview",
            params: {
              id: event.data.id,
              pid: this.$route.params.id,
              type: QCType,
              mode: "overview",
            },
          });
        }
        //International Contract
        else if (QuotationProcessedType == "InternationalContract") {
          this.$router.push({
            name: "InternationalContractOverview",
            params: {
              id: event.data.id,
              type: QCType,
              pid: this.$route.params.id,
              mode: "overview",
            },
          });
        }
        //International Agent
        else if (QuotationProcessedType == "InternationalAgent") {
          this.$router.push({
            name: "InternationalAgent",
            params: { id: event.data.id, type: QCType, mode: "overview" },
          });
        }
        //International Agent
        else if (QuotationProcessedType == "InternationalAdhoc") {
          this.$router.push({
            name: "InternationalAdhoc",
            params: {
              id: event.data.id,
              pid: this.$route.params.id,
              type: QCType,
              mode: "overview",
            },
          });
        }

        if (event.data.quotation_type == "ExpressContractBike") {
          this.$router.push({
            name: "ExpressContractBikeQuotationOverview",
          });
        }

        if (event.data.quotation_type == "ExpressContractVan") {
          this.$router.push({
            name: "ExpressContractVanQuotataionOverview",
          });
        }
        if (event.data.quotation_type == "ExpressContractInterCompany") {
          this.$router.push({
            name: "ExpressContractInterCompanyOverview",
          });
        }
        if (event.data.quotation_type == "ExpressContractBikeFSR") {
          this.$router.push({
            name: "ExpressContractBikeFSRQuotationOverview",
          });
        }
        if (event.data.quotation_type == "ExpressContractVanFSR") {
          this.$router.push({
            name: "ExpressContractVanFSROverview",
          });
        }
        if (event.data.quotation_type == "ExpressContractFSR") {
          this.$router.push({
            name: "ExpressContract",
          });
        }
        if (event.data.quotation_type == "ExpressContractProjectJobs") {
          this.$router.push({
            name: "ExpressContractProjectJobsOverview",
          });
        }

        if (event.data.quotation_type == "ExpressContractBikeProjectJobs") {
          this.$router.push({
            name: "ExpressContractBikeProjectJobsOverview",
          });
        }
        if (event.data.quotation_type == "ExpressContractVanProjectJobs") {
          this.$router.push({
            name: "ExpressContractVanProjectJobsOverview",
          });
        }

        if (event.data.quotation_type == "ExpressContractExpressAdhoc") {
          this.$router.push({
            name: "ExpressAdhocOverview",
          });
        }
        if (QuotationProcessedType == "RapidoContract") {
          this.$router.push({
            name: "RapidoRapidoContractOverview",
          });
        }
        if (event.data.quotation_type == "RapidoRapidoAdhoc") {
          this.$router.push({
            name: "RapidoRapidoAdhocOverview",
          });
        }
        if (event.data.quotation_type == "InternationalContract") {
          this.$router.push({
            name: "InternationalContractOverview",
          });
        }
      }
    },
    getGroupedAvatarsData(data) {
      let gAData = [];
      for (let gA of data) {
        if (gA.profile_url) gAData.push(gA.profile_url);
        else
          gAData.push(
            "https://network-courier.sgp1.digitaloceanspaces.com/application/images/Image_1656429363602_2515_blank_profile.png"
          );
        return gAData;
      }
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
// ::v-deep .QuotationTabSubTable .p-datatable-thead {
//   display: none !important;
// }

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
// ::v-deep .timeLineExpressCostCenterTable .p-datatable-thead > tr > th {
//   background: red !important;
// }
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
  // opacity: 0.2;
  border-radius: 5px;
}
.p-avatar {
  background-color: #dceafd;
  border-radius: 5px;
  color: #7e84a7;
  width: 24px;
  height: 28px;
  // margin-bottom:-15px !important;
  //  opacity: 0.2;
}
// .p-avatar-text {
// color: #13141a !important;
// }
</style>