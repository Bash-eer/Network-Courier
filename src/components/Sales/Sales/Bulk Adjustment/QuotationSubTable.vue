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
    selectionMode="multiple"
    filterDisplay="menu"
    v-model:filters="filters"
    :globalFilterFields="getGlobalFields()"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    v-model:selection="selectionMode"
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
    <Column
      v-if="tableName == 'BulkAdjustmentProfile'"
      selectionMode="multiple"
      headerStyle="width: 1em"
    ></Column>
    <Column
      v-if="tableName == 'BulkAdjustmentProfile'"
      :expander="true"
      headerStyle="width: 1rem"
      class="expander"
    />
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :showFilterMenu="
        col.header != 'Actions' &&
        col.header != 'Initial Doc' &&
        col.header != 'Approved Doc' &&
        col.header != 'S. No' &&
        col.header != 'S.No' &&
        col.header != 'Status' &&
        col.header != 'Confirm Letter'
          ? true
          : false
      "
      :sortable="
        col.header != 'Actions' &&
        col.header != 'S. No' &&
        col.header != 'Attachments' &&
        col.header != 'Initial Doc' &&
        col.header != 'Approved Doc' &&
        col.header != 'Revised Doc' &&
        col.header != 'Status' &&
        col.header != 'Confirm Letter'
          ? true
          : false
      "
      :showFilterMatchModes="
        col.header == 'Created On' || col.header == 'Effective On'
          ? false
          : true
      "
    >
      <template #body="slotProps">
        <span v-if="col.header == 'Actions'" class="mr-2">
          <CustomSpeedDial
            storePath="sales"
            :dataName="FollowupTable"
            tableName="FollowupTable"
            :rowData="slotProps.data"
            :customDialData="OverlayData"
          />
        </span>

        <!-- DATES TEMPLATE -->
        <span
          v-if="
            col.header == 'Created On' ||
            col.header == 'Updated On' ||
            col.header == 'Effective On' ||
            col.header == 'Date & Time'
          "
        >
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
        <span
          v-if="col.header == 'Status' && tableName == 'BulkAdjustmentProfile'"
          class="mr-2"
        >
          <div
            v-if="slotProps.data['acknowledged'] == false"
            class="color-562110"
          >
            Not Acknowledged
          </div>
          <div
            v-else-if="slotProps.data['acknowledged'] == true"
            class="color-136D21"
          >
            Acknowledged
          </div>
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
          <GroupedAvatars
            :data="
              slotProps.data[col.field].length < 3
                ? slotProps.data[col.field].map((imageUrl) =>
                    imageUrl
                      ? imageUrl
                      : 'https://network-courier.sgp1.digitaloceanspaces.com/application/images/Image_1656429363602_2515_blank_profile.png'
                  )
                : getGroupedAvatarsData(slotProps.data[col.field])
            "
            :more="
              slotProps.data[col.field].length >= 3
                ? slotProps.data[col.field].length - 2
                : ''
            "
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
        <span
          v-if="
            col.header == 'Attachments' ||
            col.header == 'Initial Doc' ||
            col.header == 'Approved Doc' ||
            col.header == 'Confirm Letter'
          "
        >
          <span
            class="mx-3"
            v-if="getFilesLength(slotProps.data[col.field]) == 0"
            >-</span
          >
          <span v-else>
            <GroupedFiles :data="slotProps.data[col.field]" />
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
            col.header != 'Created On' &&
            col.header != 'Attachments' &&
            col.header != 'Effective On' &&
            col.header != 'Approved Doc' &&
            col.header != 'Confirm Letter' &&
            col.header != 'Initial Doc' &&
            col.header != 'Status'
          "
          >{{ slotProps.data[col.field] }}</span
        >
      </template>
      <template #filter="{ filterModel }">
        <!--Status Enum Filter-->
        <span v-if="col.header == 'Status'">
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
        <span v-if="col.header == 'Created On' || col.header == 'Effective On'">
          <p class="mb-2"><b>Set a date range:</b></p>
          <Calendars :state="filterModel.value" v-model="filterModel.value" />
        </span>
        <!--Text Filter-->
        <span v-if="col.header != 'Created On' && col.header != 'Effective On'">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="getFilterPlaceHolder(col.header)"
          />
        </span>
      </template>
    </Column>
    <template #expansion>
      <div :key="renderKeytab">
        <div class="p-1 mt-2 mb-6 position-relative" :key="renderKeytab">
          <DuoSelection
            :options="getOptions"
            :default="defaultTransportType"
            type="setRegionDeliveryTransportType"
            class="mb-4"
          />
          <!-- Normal -->
          <div v-if="defaultTransportType == 'Normal'">
            <div class="flex flex-row flex-wrap ml-1 mt-4 mb-4">
              <div
                v-for="(item, index) of normalData"
                :class="index != normalData.length - 1 ? 'flex mr-6' : 'flex'"
                :key="index"
              >
                <div class="flex flex-column">
                  <div class="flex van-costing-details-detailsText flex-wrap">
                    {{ getNormalHeader(index) }}
                  </div>
                  <div
                    :class="
                      item != 'High'
                        ? 'flex flex-wrap van-costing-details-detailsText van-costing-details-valuesText'
                        : 'flex  flex-wrap van-costing-details-detailsText van-costing-details-priorityText'
                    "
                  >
                    <span>{{ item }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- E-commerce -->
          <div v-if="defaultTransportType == 'E-Commerce'" :key="renderKeytab">
            <div class="ml-1 mt-4 mb-4">
              <div v-for="(item, Index) of ecommereceData" :key="Index">
                <span class="bold-600 font-size-16 color-4e5868"
                  >{{ ecommereceData[Index].delivery_type }}
                </span>
                <div class="flex flex-row flex-wrap ml-1 mt-4 mb-4">
                  <div
                    v-for="(item, index) of ecommereceData[Index]"
                    :class="
                      index != ecommereceData.length - 1
                        ? 'flex flex-row mr-6'
                        : 'flex'
                    "
                    :key="index"
                  >
                    <div class="flex flex-column">
                      <div
                        v-if="index != 'delivery_type' || index != ''"
                        class="flex van-costing-details-detailsText flex-wrap"
                      >
                        {{ getNormalHeader(index) }}
                      </div>
                      <div
                        :class="
                          item != 'High'
                            ? 'flex flex-wrap van-costing-details-detailsText van-costing-details-valuesText'
                            : 'flex  flex-wrap van-costing-details-detailsText van-costing-details-priorityText'
                        "
                      >
                        <span v-if="index != 'delivery_type'">{{ item }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Follow Up -->
          <div v-if="defaultTransportType == 'Follow-Up'">
            <div
              class="flex justify-content-end align-items-center addnew-button"
            >
              <Buttons
                button_class="p-button-sm mr-4 add-btn custom-add-btn bg-357dea"
                label="Add new"
                v-on:childToParent="
                  openDialog('FollowUpDialog', 'salesSales', 'Add Followup')
                "
              />
            </div>
            <ExpansionSubTable
              tableClass="p-datatable-sm QuotationTabSubTable w-100"
              tableDataName="QuotationTabData"
              tableName="QuotationTabSubTable"
              :tableData="followUpTableData"
              :tableColumns="followUpColumnData"
              dataKey="id"
              class="followUpTable"
            />
          </div>

          <!-- Revisions -->
          <div v-if="defaultTransportType == 'Revisions'">
            Revisions
            <ExpansionSubTable
              tableClass="p-datatable-sm QuotationTabSubTable w-100"
              tableDataName="QuotationTabData"
              tableName="QuotationTabSubTable"
              :selectionModeState="selectionModeState"
              :tableData="revisionsTableData"
              :tableColumns="revisionsColumnData"
              dataKey="id"
              storePath="salesQuotationDialog"
              class="revisionsTable"
            />
          </div>
          <!-- Attachments -->
          <div v-if="defaultTransportType == 'Attachments'">
            Attachments
            <ExpansionSubTable
              :key="AttachmentData"
              tableClass="p-datatable-sm QuotationTabSubTable w-100"
              tableDataName="AttachmentTable"
              tableName="AttachmentTable"
              :tableData="AttachmentData"
              :tableColumns="AttachmentColumnData"
              dataKey="id"
              class="AttachmentTable"
            />
          </div>
        </div>
      </div>
    </template>
  </DataTable>
  <Dialog
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['salesSales'].dialogComponent"
  />
</template>

<script>
import DataTable from "primevue/datatable";
import Dialog from "../Dialog.vue";
import Column from "primevue/column";
import moment from "moment";
import DuoSelection from "./DuoSelect.vue";
import CustomSpeedDial from "../Bulk Adjustment/CustomSpeedDial.vue";
import { SalesSalesOverlayData } from "../../Const";
// import Avatar from "primevue/avatar";
import ExpansionSubTable from "./ExpansionTable.vue";
import { mapGetters } from "vuex";
import InputText from "primevue/inputtext";
import { FilterMatchMode, FilterOperator } from "primevue/api";
export default {
  name: "SalesTables",
  components: {
    DuoSelection,
    ExpansionSubTable,
    CustomSpeedDial,
    DataTable,
    Column,
    Dialog,
    InputText,
    // Avatar,
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
      selectionModeState: null,
      getOptions: [],
      filters: null,
      renderKeytab: 10,
      OverlayData: [
        {
          label: "Edit",
          icon: "fas fa-pen",
        },

        {
          label: "Delete",
          icon: "fas fa-user-times",
        },
      ],
      normalData: {
        job_count: "",
        rate_per_job: "",
        amount: "",
        additional_job_rate: "",
        increment_value: "",
        new_cost: "",
        percentage: "",

        remarks: "",
      },
      ecommereceData: [],
      ecommereceDataHeader: [],
      revisionsTableData: [],

      revisionsColumnData: [
        { field: "id", header: "S.No" },
        { field: "Actions", header: "Actions" },
        { field: "profile_name", header: "Profile Name" },
        { field: "sales_person_name", header: "Sales Person" },
        { field: "effective_date", header: "Effective On" },
        { field: "createdAt", header: "Created On" },
        { field: "attachments", header: "Attachements" },
        { field: "initial_doc", header: "Initial Doc" },
        { field: "approved_doc", header: "Revised Doc" },
        // { field: "trip_days", header: "Created On" },
      ],

      followUpTableData: [],

      followUpColumnData: [
        { field: "id", header: "S.No" },
        { field: "actions", header: "Actions" },
        { field: "customer_name", header: "Sales Person" },
        { field: "call_type", header: "Call Type" },
        { field: "date_and_time", header: "Date & Time" },
        { field: "customer_contact_no", header: "Contacts" },
        { field: "subject", header: "Subject" },
        { field: "discussion_details", header: "Discussion Details" },
        { field: "attachments", header: "Attachments" },
        { field: "createdAt", header: "Created On" },
      ],
      AttachmentColumnData: [
        { field: "Actions", header: "Actions" },
        { field: "sno", header: "S. No" },
        { field: "attach_type", header: "Attach Type" },
        { field: "updatedAt", header: "Updated On" },
        { field: "attachments", header: "Attachments" },
        { field: "createdAt", header: "Created On" },
        { field: "created_by", header: "Created By" },
      ],
      AttachmentData: [],
      defaultTransportType: "E-Commerce" || "Normal",
      renderKey: 10,
      expandedRows: [],
      selectionMode: [],
      rowSelect: null,
    };
  },
  computed: {
    ...mapGetters({
      ProfileExpansionData: "bulkAdjustment/ProfileExpansionData",
      ProfileExpansionRevisionData:
        "bulkAdjustment/ProfileExpansionRevisionData",
    }),
  },
  watch: {
    "$store.state.bulkAdjustment.ProfileExpansionData": function () {
      this.getValues();
      this.getRevisionValues();

      if (
        this.$store.state.bulkAdjustment.ProfileExpansionData
          .express_contract_type == "e_commerce"
      ) {
        this.defaultTransportType = "E-Commerce";
        this.renderKeytab++;
      } else if (
        this.$store.state.bulkAdjustment.ProfileExpansionData
          .express_contract_type == "normal"
      ) {
        this.defaultTransportType = "Normal";
        this.renderKeytab++;
      }
    },
    "$store.state.bulkAdjustment.ProfileExpansionRevisionData": function () {
      // this.defaultTransportType = "Normal";
      this.getRevisionValues();
    },
    "$store.state.bulkAdjustment.addRegionDeliveryTransportType": function () {
      this.defaultTransportType =
        this.$store.state.bulkAdjustment.addRegionDeliveryTransportType;
    },
  },
  methods: {
    getNormalHeader(index) {
      let header;
      switch (index) {
        case "rate_per_job":
          header = "Per Job";
          break;
        case "additional_job_rate":
          header = "Additional Job";
          break;
        case "job_count":
          header = "No of Jobs";
          break;
        case "amount":
          header = "Amount";
          break;
        case "increment_value":
          header = "Increment Amount";
          break;
        case "percentage":
          header = "Percentage";
          break;
        case "new_cost":
          header = "New Cost";
          break;
        case "remarks":
          header = "Remarks";
          break;
      }
      return header;
    },
    openDialog(name, type, header) {
      // if (type == "salesHome") {
      this.$store.dispatch("salesSales/openDialog", {
        dialogDetails: {
          dialogName: name,
          dialogHeader: header,
        },
      });
      this.$store.getters["salesSales/controlActivityDialog"];
      // }
    },
    getRevisionValues() {
      this.revisionsTableData = this.ProfileExpansionRevisionData;
    },
    getValues() {
      if (this.ProfileExpansionData?.normal_rates != null) {
        this.normalData["job_count"] =
          this.ProfileExpansionData?.normal_rates?.job_count || "-";
        this.normalData["rate_per_job"] =
          this.ProfileExpansionData?.normal_rates?.rate_per_job || "-";
        this.normalData["amount"] =
          this.ProfileExpansionData?.normal_rates?.amount || "-";
        this.normalData["additional_job_rate"] =
          this.ProfileExpansionData?.normal_rates?.additional_job_rate || "-";
        this.normalData["increment_value"] =
          this.ProfileExpansionData?.normal_rates?.increment_value || "-";
        this.normalData["percentage"] =
          this.ProfileExpansionData?.normal_rates?.percentage || "-";
        this.normalData["new_cost"] =
          this.ProfileExpansionData?.normal_rates?.new_cost || "-";
        this.normalData["remarks"] =
          this.ProfileExpansionData?.normal_rates?.percentage || "-";
      }
      // ecommerece Same day
      else if (this.ProfileExpansionData?.normal_rates == null) {
        this.ecommereceData = [];
        this.ProfileExpansionData?.e_commerce_rates.map((list) => {
          this.ecommereceData.push({
            job_count: list.job_count,
            rate_per_job: list.rate_per_job,
            amount: list.amount,
            additional_job_rate: list.additional_job_rate,
            increment_value: list.increment_value,
            percentage: list.percentage,
            new_cost: list.new_cost,
            remarks: list.remarks,
            delivery_type: list.delivery_type,
          });
        });
      }
      //follow-up
      this.followUpTableData = this.ProfileExpansionData?.follow_ups;
      this.ProfileExpansionData?.follow_ups;
      //revisions

      //Attachments
      this.AttachmentData = this.ProfileExpansionData?.attachment_type;

      //tabs
      if (this.ProfileExpansionData?.normal_rates) {
        this.defaultTransportType = "Normal";
        this.getOptions = ["Normal", "Follow-Up", "Revisions", "Attachments"];
      } else {
        this.defaultTransportType = "E-Commerce";
        this.getOptions = [
          "E-Commerce",
          "Follow-Up",
          "Revisions",
          "Attachments",
        ];
      }
      // this.renderKeytab++;
    },
    onRowExpand(event) {
      if (this.tableName == "BulkAdjustmentProfile") {
        this.$store.dispatch("bulkAdjustment/loadProfileExpansionData", {
          id: event.data.id,
        });

        this.$store.dispatch(
          "bulkAdjustment/loadProfileExpansionRevisionData",
          {
            id: event.data.id,
          }
        );
      }
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

      this.renderKey++;
    },
    onRowCollapse(event) {
      this.expandedRows = this.expandedRows.filter(
        (data) => event?.data?.id !== data.id
      );
      this.tableData.map((obj) => {
        if (obj.id === event.data?.id) {
          obj.expanded = false;
        } else {
          obj.expanded = false;
        }
      });
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
    processOverlayDataFollowUp(data, row) {
      if (this.tableDataName == "QuotationTabSubTableTwoo") {
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
    onRowSelect(event) {},
    getGroupedAvatarsData(data) {
      let gAData = [];
      for (let gA = 0; gA < 3; gA++) {
        if (data[gA]) gAData.push(data[gA]);
        else
          gAData.push(
            "https://network-courier.sgp1.digitaloceanspaces.com/application/images/Image_1656429363602_2515_blank_profile.png"
          );
      }
      return gAData;
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
        if (
          this.tableColumns[c]["field"] == "createdAt" ||
          this.tableColumns[c]["field"] == "effective_date"
        ) {
          this.filters[this.tableColumns[c]["field"]] = {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.BETWEEN }],
          };
        }
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
    if (
      this.selectionModeState != undefined &&
      this.selectionModeState != null
    ) {
      this.selectionMode = this.selectionModeState;
    }
    if (
      this.selectionModeState == undefined ||
      this.selectionModeState == null
    ) {
      this.selectionMode = null;
    }
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
.van-costing-details-detailsText {
  font-size: 12px;
  color: #7e84a7;
  font-weight: 600;
}
.van-costing-details-valuesText {
  color: #66c11e;
}
.addnew-button {
  position: absolute;
  top: 2px;
  right: 25px;
  // bottom: 63px;
}
// .p-avatar-text {
// color: #13141a !important;
// }
</style>
