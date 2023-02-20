<template>
  <DataTable
    v-if="tableData.length > 0"
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
    :dataKey="'id'"
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
    <!-- col.header == 'Company Name' ||
        col.header == 'Address' ||
        col.header == 'Contact' ||
        col.header == 'Contract' ||
        col.header == 'Email' ||
        col.header == 'Quotation' ||
        col.header == 'Telephone' ||
        col.header == 'Created By' ||
        col.header == 'Created On' -->
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :showFilterMenu="
        col.header != 'Actions' &&
        col.header != 'S. No' &&
        col.header != 'S.No.'
          ? true
          : false
      "
      :showFilterMatchModes="col.header == 'Created On' ? false : true"
      :sortable="col.header != 'Actions' ? true : false"
    >
      <template #body="slotProps">
        <!-- TEMPLATE : ACTIONS -->
        <span v-if="col.header == 'Actions'" class="mr-2">
          <CustomSpeedDials
            storePath="sales"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="
              slotProps.data['status'] == 'Deleted'
                ? OverlayDataAlternative
                : OverlayData
            "
          />
        </span>

        <!-- DATES TEMPLATE -->
        <span v-if="col.header == 'Created On'">
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>

        <!-- TEMPLATE : CONTACT -->
        <span v-if="col.header == 'Contact'" class="mr-2">
          <div
            class="flex flex-column mt-4"
            v-if="slotProps.data.profile_type == 'company'"
          >
            <div class="flex heading">
              {{ slotProps.data["contact_name"] }}
            </div>
            <div class="flex sub">{{ slotProps.data["contact_no"] }}</div>
          </div>
          <div
            class="flex flex-column mt-4"
            v-if="slotProps.data.profile_type == 'personal'"
          >
            <div class="flex heading">
              {{ slotProps.data["profile_name"] }}
            </div>
            <div class="flex sub">{{ slotProps.data["mobile_no"] }}</div>
          </div>
        </span>
        <!-- TEMPLATE : COMPANY NAME-->
        <span v-if="col.header == 'Company Name'" class="mr-2">
          <div class="flex flex-row mt-4">
            <!-- {{ slotProps.data["img"] }} -->
            <!-- {{ slotProps.data["profile_url"] }} -->
            <!-- {{ slotProps.data["profile_name"] }} -->
            <div class="flex mr-2">
              <img
                v-if="slotProps.data['profile_url'] != null"
                :src="slotProps.data['profile_url']"
                class="contactsImage"
              />
              <!-- {{slotProps.data['profile_name'].substring(0, 2)}} -->
              <AvatarLabel
                v-else
                :label="subStringHandler(slotProps.data.profile_name)"
                classes="avatar-text"
              />
            </div>

            <div class="flex flex-column mt-2">
              <div class="heading">{{ slotProps.data["profile_name"] }}</div>
              <div class="sub">{{ slotProps.data["Trade"] }}</div>
            </div>
          </div>
        </span>

        <!-- TEMPLATE : ADDRESS -->
        <span v-if="col.header == 'Address'" class="mr-2">
          <div class="flex flex-column mt-4">
            <div class="flex heading">{{ slotProps.data["address"] }}</div>
            <!-- <div class="flex sub">{{ slotProps.data["postal_code"] }}</div> -->
          </div>
        </span>
        <!--

 :class="{
              'color-EB4646 hello': slotProps.data[col.field] == 'disabled',
              'flex heading': true,
            }"
-->
        <!-- TEMPLATE : STATUS         class="flex heading"-->
        <span v-if="col.header == 'Status'" class="mr-2">
          <div
            :class="getStatusClassHandler(slotProps.data[col.field])"
            class="mt-3"
          >
            {{ getStatusHandler(slotProps.data[col.field]) }}
          </div>
        </span>

        <!-- TEMPLATE : QUOTATION -->
        <span v-if="col.header == 'Quotation'" class="mr-3">
          <div class="flex flex-row justify-content-space-between mt-2">
            <div class="mx-3">-</div>
            <!-- <div class="">{{ slotProps.data[col.field] }}</div> -->
            <!-- <div class="float-right">
              <img
                :src="'/images/' + slotProps.data['type'] + '.png'"
                alt=""
                width="13"
                height="13.7"
              />
            </div> -->
          </div>
        </span>

        <!--TEMPLATE : CONTRACT-->
        <span v-if="col.header == 'Contract'">
          <span v-if="slotProps.data['contracts']">
            <div v-if="slotProps.data['contracts'].length == 0" class="mx-3">
              -
            </div>

            <!-- <div class="">{{ slotProps.data[col.field] }}</div> -->
            <!-- <div class="float-right">
              <img
                :src="'/images/' + slotProps.data['type'] + '.png'"
                alt=""
                width="13"
                height="13.7"
              />
            </div> -->
            <div v-if="slotProps.data['contracts'].length > 0">
              <span
                v-for="(type, index) in slotProps.data['contracts']"
                :key="type"
              >
                <div
                  v-if="index <= 2"
                  class="flex flex-row align-items-center mt-1 w-5rem"
                >
                  <div
                    class="justify-content-start"
                    :class="contractClassHandler(type['customer_type'])"
                  >
                    {{ type["business_type"] }}
                  </div>
                  <div class="ml-auto">
                    <img
                      :src="contractImagesHandler(type['customer_type'])"
                      alt=""
                      :class="contractImageClassHandler(type['customer_type'])"
                      class=""
                    />
                  </div>
                </div>
              </span>
              <div class="w-6rem">
                <div
                  class="sales-table-circle"
                  v-if="slotProps.data['contracts'].length > 3"
                >
                  <!-- {{getContractCountHandler(slotProps.data['contract_profile'])}} -->
                  +{{ slotProps.data["contracts"].length - 3 }}
                </div>
              </div>
            </div>
          </span>
        </span>
        <span v-if="col.header == 'Edit'" class="mr-2">
          <Button
            icon="pi pi-pencil"
            label="Edit"
            class="p-button-rounded p-button-success mr-2"
            @click="editProduct(slotProps.data)"
          />
        </span>
        <!--Hide default display-->
        <span
          v-if="
            col.header != 'Actions' &&
            col.header != 'Quotation' &&
            col.header != 'Contact' &&
            col.header != 'Address' &&
            col.header != 'Created On' &&
            col.header != 'Company Name' &&
            col.header != 'Status' &&
            col.header != 'Collection Time' &&
            col.header != 'Edit' &&
            col.header != 'Cut-Off Time' &&
            col.header != 'Contract'
          "
          >{{ slotProps.data[col.field] }}</span
        >
        <span
          v-if="col.header == 'Collection Time' || col.header == 'Cut-Off Time'"
          class="mr-2"
        >
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>
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
          <Calendars :state="filterModel.value" v-model="filterModel.value" />
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
  <div v-else>
    <EmptyTemplate />
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import Button from "primevue/button";
import { SalesSalesOverlayData, SalesSalesRetrieveOverlayData } from "../Const";
import CustomSpeedDials from "./CustomSpeedDial.vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import InputText from "primevue/inputtext";
export default {
  name: "SalesTables",
  components: {
    DataTable,
    Column,
    Button,
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
      OverlayData: SalesSalesOverlayData,
      OverlayDataAlternative: SalesSalesRetrieveOverlayData,
    };
  },

  methods: {
    editProduct(data) {
      console.log(data);
      // this.$store.dispatch("salesSales/openDialog", {
      //   dialogDetails: {
      //     dialogName: "RapidoAdhocEcommerceEditDialog",
      //     dialogHeader: "Edit Rapido Adhoc",
      //   },
      // });
      // this.$store.getters["salesSales/controlActivityDialog"];
    },
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
    // dateFormater(data) {
    //   if (data == null) {
    //     return "-";
    //   } else {
    //     var formattedDate = moment(data).format("Do MMM YYYY");
    //     return formattedDate;
    //   }
    // },
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
    // eslint-disable-next-line no-unused-vars
    onRowSelect(e) {
      this.$router.push({
        name: "QuotationContract",
        params: { id: e.data.id },
      });
      // if (this.tableName == "DashboardTab") createdAt{
      //   //programmatic router navigation in vue-router
      //   this.$router.push({
      //     name: "QuotationContract",
      //   });
      // }
      // if (this.tableName == "QuotationTabTable") {
      //   localStorage.setItem("quotationID", event.data.quotation_id);
      //   this.$store.state.masters.expressRegionsTripTableData = null;
      //   //--------- quotation overview data processing --------//
      //   this.$store.state.sales.expressQuotationOverviewData = [];
      //   let overviewDetailsObj = {};
      //   let timeLineHeaderObj = {};
      //   let selectMethodObj = {};
      //   let costingDetailsObj = {};
      //   for (let d in event.data) {
      //     if (d == "status") {
      //       overviewDetailsObj["status"] = event.data[d];
      //     }
      //     if (d == "createdAt") {
      //       overviewDetailsObj["modifiedOn"] = event.data[d];
      //     }
      //     if (d == "service_required") {
      //       timeLineHeaderObj[d] = event.data[d];
      //     }
      //     if (d == "address") {
      //       let address =
      //         event.data["floor_no"] +
      //         "," +
      //         event.data["unit_no"] +
      //         "," +
      //         event.data["building_name"] +
      //         "," +
      //         event.data["country"] +
      //         "," +
      //         event.data["postal_code"];
      //       timeLineHeaderObj[d] = address;
      //     }
      //     if (
      //       d == "priority" ||
      //       d == "previously_served_by" ||
      //       d == "referred_by" ||
      //       d == "referral_person_name" ||
      //       d == "sales_comission"
      //     ) {
      //       selectMethodObj[d] = event.data[d];
      //     }
      //     if (d == "package_details" || d == "remarks") {
      //       overviewDetailsObj[d] = event.data[d];
      //     }
      //     if (d == "contact_person") {
      //       overviewDetailsObj["members"] = event.data[d];
      //     }
      //     if (
      //       d == "job" ||
      //       d == "additional_jobs" ||
      //       d == "no_of_units" ||
      //       d == "amount"
      //     ) {
      //       costingDetailsObj[d] = event.data[d];
      //     }
      //     if (d == "trip_schedule") {
      //       overviewDetailsObj[d] = event.data[d];
      //     }
      //   }

      //   overviewDetailsObj["timeLineHeader"] = timeLineHeaderObj;
      //   overviewDetailsObj["selectMethod"] = selectMethodObj;
      //   overviewDetailsObj["costingDetails"] = costingDetailsObj;
      //   this.$store.state.sales.expressQuotationOverviewData.push(
      //     overviewDetailsObj
      //   );
      //   localStorage.setItem(
      //     "quotationOverViewData",
      //     JSON.stringify(this.$store.state.sales.expressQuotationOverviewData)
      //   );
      //   //--------- quotation overview data processing --------//

      //   this.$store.state.sales.salesQuotationId = event.data.quotation_id;
      //   this.$router.push({
      //     name: "expressTracker",
      //   });
      //   this.$store.dispatch("sales/loadBillPreferences");
      //   this.$store.dispatch("sales/loadCostCentres");
      //   this.$store.dispatch("sales/loadAttachments");
      //   this.$store.dispatch("sales/loadFollowUp");
      // }
      // if (this.tableName == "SalesTab") {
      // localStorage.setItem("companyID", event.data.id);
      // this.$store.state.sales.salesCompanyid = event.data.id;
      // let apiPath = "?type=sales_company&type_id=" + event.data.id;
      // this.$store.dispatch("sales/loadContactsApi", {
      //   apiPath: apiPath,
      // });
      // this.$store.dispatch("sales/loadQuotationApi", {
      //   id: event.data.id,
      // });
      //programmatic router navigation in vue-router

      // this.$store.state["sales"].contactsStateData = [];
      // this.$store.state["sales"].companyCreationStateData = event.data;
      // let apiPath = "?type=sales_company&type_id=" + event.data.id;
      // this.$store.dispatch("sales/loadContactsApi", {
      //   apiPath: apiPath,
      // });
      // this.$store.state["users"].displayDialog = true;
      // this.$store.state["users"].dialogComponent = "companyCreationDialog";
      // this.$store.getters.controlActivityDialog;
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
        if (this.tableColumns[c]["field"] == "createdAt") {
          this.filters[this.tableColumns[c]["field"]] = {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.BETWEEN }],
          };
        }
      }
    },
    // initilaizeFilters() {
    //   let obj = {
    //     operator: FilterOperator.AND,
    //     constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    //   };
    //   this.filters = {
    //     global: {
    //       value: null,
    //       matchMode: FilterMatchMode.CONTAINS,
    //     },
    //   };
    //   for (let c in this.tableColumns) {
    //     this.filters[this.tableColumns[c]["field"]] = obj;
    //   }
    // },
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
    "$store.state.salesSales.globalSearch": function () {
      this.filters["global"].value =
        this.$store.state["salesSales"].globalSearch;
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

  // margin-left: 15px;

  // margin-left: -50px !important;
  // position: absolute;
  // // top: 0;
  // right: 0;
  // left: auto;
  // right: 0;
  // top: 0;
}
::v-deep .p-column-filter {
  margin-left: 0px !important ;
  color: #7e84a7 !important;
}
</style>
