<template>
  <DataTable
    :class="tableClass"
    :showGridlines="false"
    :stripedRows="true"
    :rowClass="rowClass"
    editMode="cell"
    selectionMode="single"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    @cell-edit-complete="onCellEditComplete"
    v-model:filters="filters"
    :globalFilterFields="getGlobalFields()"
    v-model:selection="rowSelect"
    v-model:expandedRows="expandedRows"
    :dataKey="dataKey"
    filterDisplay="menu"
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
      style="width: 25%"
      class="EditTable"
      :showFilterMenu="
        col.header != 'Actions' && col.header != 'Attachments' ? true : false
      "
      :showFilterMatchModes="col.header == 'Created On' ? false : true"
      :sortable="tableName != 'QuotationTabSubTable' ? true : false"
    >
      <template #body="slotProps">
        <!-- TEMPLATE : ACTIONS -->
        <span
          v-if="col.header == 'Actions' && tableName != 'QuotationTabSubTable'"
          class="mr-2"
        >
          <CustomSpeedDials
            storePath="sales"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="customSpeedDialData"
          />
        </span>

        <!-- DATES TEMPLATE -->
        <span v-if="col.header == 'Created On'">
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>
        <span v-if="col.header == 'Date & Time'">
          <div class="flex flex-column">
            <div class="flex heading">
              {{ dateFormater(slotProps.data[col.field]) }}
            </div>
            <div class="flex sub">{{ getTime(slotProps.data[col.field]) }}</div>
          </div>
        </span>
        <!-- TEMPLATE : CONTACT -->
        <span v-if="col.header == 'Contact'" class="mr-2">
          <div class="flex flex-column">
            <div class="flex heading">
              {{ slotProps.data[col.field] }}
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
        <span
          v-if="col.header == 'Members'"
          class="flex justify-content-center"
        >
          <div v-if="slotProps.data.cost_center_contacts">
            <!-- <GroupedAvatars
            :data="
              slotProps.data.cost_center_contacts.length < 3 ? (slotProps.data.cost_center_contacts.map((profile)=>profile.profile_url)) : getGroupedAvatarsData(slotProps.data.cost_center_contacts)
            "
            :more="slotProps.data.cost_center_contacts.length >= 3 ? slotProps.data.cost_center_contacts.length - 2 : ''"
                    tableType='subGroups'

          /> -->
            <GroupedAvatars
              :data="
                slotProps.data.cost_center_contacts.length < 3
                  ? slotProps.data.cost_center_contacts.map((profile) =>
                      profile.profile_url
                        ? profile.profile_url
                        : 'https://network-courier.sgp1.digitaloceanspaces.com/application/images/Image_1656429363602_2515_blank_profile.png'
                    )
                  : getGroupedAvatarsData(slotProps.data.cost_center_contacts)
              "
              :more="
                slotProps.data.cost_center_contacts.length >= 3
                  ? slotProps.data.cost_center_contacts.length - 2
                  : ''
              "
              tableType="subGroups"
            />
          </div>
        </span>

        <!-- TEMPLATE : SITE OFFICE -->
        <span v-if="col.header == 'Site Office'">
          <img
            v-if="slotProps.data[col.field] == true"
            :src="'/images/' + 'siteOffice' + '.png'"
            alt=""
            class="mx-1"
          />
          <span v-else class="m-1">
            <img
              width="25"
              height="25"
              :src="'/images/' + 'red-cross' + '.png'"
              alt=""
            />
          </span>
        </span>
        <!-- TEMPLATE : Attachments followup-->
        <span v-if="col.header == 'Attachments '">
          <!-- {{ getFilesLength(slotProps.data[col.field].attachments) }} -->
          <span v-if="slotProps.data[col.field][0]">
            <!-- {{ slotProps.data[col.field][0] }} -->
            <span
              class="mx-3"
              v-if="
                getFilesLength(slotProps.data[col.field][0].attachments) == 0
              "
              >-</span
            >

            <!-- {{ slotProps.data[col.field] }} -->
            <!-- <div class="col-2">
            <AttachmentsTemplate
              :receipt="''"
              :data="slotProps.data['attachments']"
              :type="'appointmentTravels'"
            />
          </div> -->
            <span v-else>
              <GroupedFiles :data="slotProps.data[col.field][0].attachments" />
            </span>
          </span>
        </span>
        <!-- TEMPLATE : Attachments attachment_url-->
        <span v-if="col.header == 'Attachments'">
          <span
            class="mx-3"
            v-if="getFilesLength(slotProps.data[col.field]) == 0"
            >-</span
          >
          <!-- {{ slotProps.data[col.field] }} -->
          <!-- <div class="col-2">
            <AttachmentsTemplate
              :receipt="''"
              :data="slotProps.data['attachments']"
              :type="'appointmentTravels'"
            />
          </div> -->
          <span v-else>
            <GroupedFiles :data="slotProps.data[col.field]" />
          </span>

          <!-- <img
            v-if="getFilesLength(slotProps.data[col.field]) == 1"
            src="/images/preview.png"
            alt="pdf"
          /> -->
          <!-- <span
            class="flex"
            v-if="getFilesLength(slotProps.data[col.field]) == 2"
          >
            <img src="/images/preview.png" alt="pdf" />
            <img src="/images/preview.png" alt="pdf" />
          </span> -->
          <!-- <span
            class="flex flex-row"
            v-if="getFilesLength(slotProps.data[col.field]) > 2"
          >
            <img src="/images/preview.png" alt="pdf" />
            <img src="/images/preview.png" alt="pdf" />

            <div class="mt-1 ml-1">
              <span>
                <Avatar
                  :label="
                    '+' + (getFilesLength(slotProps.data[col.field]) - 2)
                  "
              /></span>
            </div>
          </span> -->
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
            col.header != 'Attachments ' &&
            col.header != 'Date & Time' &&
            col.header != 'Contacts'
          "
          >{{ slotProps.data[col.field] }}</span
        >
      </template>
      <template #filter="{ filterModel }">
        <!--Status Enum Filter-->
        <!-- <span v-if="col.header == 'Status'">
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
        </span> -->
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
        <span v-if="col.header != 'Created On' && col.header != 'Attachments'">
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
                  $store.state['salesExpressBike'][
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
            <div
              class="
                flex flex-wrap
                justify-content-between
                siteOfficeCharges
                mt-4
                mr-3
              "
            >
              <div class="flex flex-wrap justify-content-between w-full">
                <span class="header">Trip Schedule</span>
                <CustomSpeedDials
                  storePath="salesSales"
                  :dataName="tableDataName"
                  :rowData="slotProps.data"
                  :customDialData="customSpeedDialSiteOfficeData"
                />
              </div>
            </div>
            <hr class="horizontal_line mb-2" />
            <TimeLineTable
              tableClass="p-datatable-sm TimeLineTable mt-2 mb-2"
              :tableData="
                $store.state.salesCommon.ExpressExpansionCostCenterData
                  .cost_center_trips
              "
              :tableColumns="tableColumn"
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
            <!-- <div class="flex"> -->
            <div class="flex flex-wrap justify-content-between w-full">
              <span class="header">Site Office Charges</span>
              <CustomSpeedDials
                storePath="salesSales"
                :dataName="tableDataName"
                :rowData="slotProps.data"
                :customDialData="customSpeedDialSiteOfficeData"
              />
            </div>
          </div>
          <div
            v-if="
              $store.state.salesCommon.ExpressExpansionCostCenterData
                .site_office_charges
            "
            class="flex flex-row mt-3 mb-4"
          >
            <div
              v-for="(item, index) of $store.state.salesCommon
                .ExpressExpansionCostCenterData.site_office_charges[0]"
              class="flex mr-6"
              :key="index"
            >
              <span v-if="showFlexTitleHandler(index) == true">
                <div class="flex flex-column">
                  <div class="flex detailsText flex-wrap">
                    {{ getTitleHandler(index) }}
                  </div>
                  <div class="color-66c11e">
                    {{ item }}
                  </div>
                </div>
              </span>
            </div>
          </div>
          <div
            v-if="
              $store.state.salesCommon.ExpressExpansionCostCenterData
                .site_office_charges
            "
            class="flex flex-row ml-5 mb-3"
          >
            <div
              class="flex"
              v-for="(item, index) of $store.state.salesCommon
                .ExpressExpansionCostCenterData.site_office_charges[0]"
              :key="index"
            >
              <span v-if="item && showTitleHandler(index, item)">
                <div class="flex flex-row">
                  <div class="flex mr-1">
                    <img :src="'/images/' + 'siteOffice' + '.png'" alt="" />
                  </div>
                  <div class="flex mr-4">
                    <span class="mt-1 inclusions">{{
                      getTitleHandler(index)
                    }}</span>
                  </div>
                </div>
              </span>
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
import InputText from "primevue/inputtext";
import { FilterMatchMode, FilterOperator } from "primevue/api";
// import Avatar from "primevue/avatar";
import CustomSpeedDials from "./CustomSpeedDial.vue";
// import AvatarGroup from 'primevue/avatargroup';
export default {
  name: "OverviewDataTable",
  components: {
    DataTable,
    Column,
    InputText,
    // Avatar,
    CustomSpeedDials,
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
      filters: null,
      searcher: "",
      rowSelect: null,
      customSpeedDialData: [
        {
          label: "Edit",
          icon: "fas fa-pen",
        },

        {
          label: "Delete",
          icon: "fas fa-user-times",
        },
      ],
      customSpeedDialSiteOfficeData: [
        {
          label: "Edit",
          icon: "fas fa-pen",
        },

        {
          label: "History",
          icon: "fas fa-address-book",
        },
      ],
      tableColumn: [
        { field: "trip_name", header: "Trip No." },
        { field: "from", header: "From" },
        { field: "to", header: "To" },
        { field: "trip_days", header: "Trip Days" },
        { field: "trip_type", header: "Trip Type" },
      ],
    };
  },

  methods: {
    getTitleHandler(data) {
      let title;
      switch (data) {
        case "collection_chargable":
          title = "Collection Chargable";
          break;
        case "head_off_delivery_chargable":
          title = "Head Off Delivery Charges";
          break;
        case "head_off_return_waived":
          title = "Head Off Return Weived";
          break;
        case "return_trip_chargable":
          title = "Return Trip Chargable (Per Trip)";
          break;
        case "special_monitoring":
          title = "Special Monitoring";
          break;
        case "charge_per_trip":
          title = "Charge Per Trip";
          break;
        case "head_off_delivery_charge":
          title = "Head Off Delivery Charges";
          break;
        case "return_trip_charge":
          title = "Return Trip Charge";
          break;
        default:
          break;
      }
      return title;
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
    globalSearcher(label, searchString) {
      this.$store.state["contacts"].globalSearch = searchString;
    },
    showTitleHandler(data, item) {
      let show = false;
      switch (data) {
        case "collection_chargable":
          show = item;
          break;
        case "head_off_delivery_chargable":
          show = item;
          break;
        case "head_off_return_waived":
          show = item;
          break;
        case "return_trip_chargable":
          show = item;
          break;
        case "special_monitoring":
          show = item;
          break;
        default:
          break;
      }
      return show;
    },
    showFlexTitleHandler(data) {
      let show;
      switch (data) {
        case "charge_per_trip":
          show = true;
          break;
        case "head_off_delivery_charge":
          show = true;
          break;
        case "return_trip_charge":
          show = true;
          break;

        default:
          show = false;
      }
      return show;
    },
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
        var formattedDate = moment(data).format("Do MMM, YYYY");
        return formattedDate;
      }
    },
    getTime(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).utc().format("hh:mm");

        return formattedDate;
      }
    },
    // TimeFormater(data) {
    //   if (data == null) {
    //     return "-";
    //   } else {
    //     var formattedDate = moment(data).format("HH:mm");

    //     if (formattedDate == "Invalid date") {
    //       return data.slice(0, 5);
    //     } else return formattedDate;
    //   }
    // },
    onRowExpand(e) {
      this.$store.dispatch("salesCommon/loadExpressExpansionCostCenterData", {
        id: e.data.id,
      });
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
        this.$store.state.salesExpressBike.expressRegionsTripTableData = null;
        //--------- quotation overview data processing --------//
        this.$store.state.salesExpressBike.expressQuotationOverviewData = [];
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
        this.$store.state.salesExpressBike.expressQuotationOverviewData.push(
          overviewDetailsObj
        );
        localStorage.setItem(
          "quotationOverViewData",
          JSON.stringify(
            this.$store.state.salesExpressBike.expressQuotationOverviewData
          )
        );
        //--------- quotation overview data processing --------//

        this.$store.state.salesExpressBike.salesQuotationId =
          event.data.quotation_id;
        this.$router.push({
          name: "expressTracker",
        });
        this.$store.dispatch("salesExpressBike/loadBillPreferences");
        this.$store.dispatch("salesExpressBike/loadCostCentres");
        this.$store.dispatch("salesExpressBike/loadAttachments");
        this.$store.dispatch("salesExpressBike/loadFollowUp");
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
        // this.$store.state["sales"].contactsStateData = [];
        // this.$store.state["sales"].companyCreationStateData = event.data;
        // let apiPath = "?type=sales_company&type_id=" + event.data.id;
        // this.$store.dispatch("sales/loadContactsApi", {
        //   apiPath: apiPath,
        // });
        // this.$store.state["users"].displayDialog = true;
        // this.$store.state["users"].dialogComponent = "companyCreationDialog";
        // this.$store.getters.controlActivityDialog;
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
      }
      return gAData;
    },
  },
  created() {
    this.initilaizeFilters();
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
