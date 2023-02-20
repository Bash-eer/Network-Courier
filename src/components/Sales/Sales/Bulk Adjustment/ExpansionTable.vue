<template>
  <DataTable
    :class="tableClass"
    :showGridlines="false"
    :stripedRows="true"
    :rowClass="rowClass"
    filterDisplay="menu"
    selectionMode="multiple"
    v-model:filters="filters"
    :globalFilterFields="getGlobalFields()"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    @row-select-all="selectAllRows"
    @row-unselect-all="unSelectAllRows"
    v-model:selection="selectionMode"
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
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <Column
      v-if="tableName == 'AdhocRatesTable'"
      selectionMode="multiple"
      headerStyle="width: 1em"
    ></Column>
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
        <!-- TEMPLATE : ACTIONS -->
        <span
          v-if="col.header == 'Actions' && tableName != 'AdhocRatesTable'"
          class="mr-2"
        >
          <CustomSpeedDial
            storePath="sales"
            :dataName="tableDataName"
            tableName="FollowupTableExpand"
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
            col.header == 'Revised Doc' ||
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
              {{ slotProps.data["customer_name"] }}
            </div>
            <div class="flex sub">
              {{ slotProps.data["customer_contact_no"] }}
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
            col.header != 'Effective On' &&
            col.header != 'Revised Doc' &&
            col.header != 'Date & Time' &&
            col.header != 'Updated On' &&
            col.header != 'Initial Doc'
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
    <template #expansion> Expansion </template>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import CustomSpeedDial from "./CustomSpeedDial.vue";
import InputText from "primevue/inputtext";
import { FilterMatchMode, FilterOperator } from "primevue/api";
export default {
  name: "SalesTables",
  components: {
    InputText,
    DataTable,
    Column,
    CustomSpeedDial,
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
    "selectionModeState",
  ],
  data() {
    return {
      // selectionModeState: null,
      defaultTransportType: "Normal",
      renderKey: 10,
      expandedRows: [],
      selectionMode: [],
      filters: null,
      rowSelect: null,
      unselectAll: false,
      OverlayData: [
        {
          label: "Edit",
          icon: "fas fa-pen",
        },

        //   label: "Contact Info",
        //   icon: "far fa-address-book",
        // },
        // {
        //   label: "Disable",
        //   icon: " far fa-circle",
        // },
        {
          label: "Delete",
          icon: "fas fa-user-times",
        },
      ],
    };
  },
  watch: {
    "$store.state.bulkAdjustment.addRegionDeliveryTransportType": function () {
      this.defaultTransportType =
        this.$store.state.bulkAdjustment.addRegionDeliveryTransportType;
    },
    selectionMode(value, old) {
      if (this.tableName == "AdhocRatesTable" && this.unselectAll == true) {
        for (let i in old) {
          old[i].selected = false;
        }
      }
      this.$emit("getSelectedSurchargeData", value);
    },
  },
  methods: {
    getNormalHeader(index) {
      let header;
      switch (index) {
        case "per_job":
          header = "Per Job";
          break;
        case "additional_jobs":
          header = "Additional Job";
          break;
        case "no_of_jobs":
          header = "No of Jobs";
          break;
        case "amount":
          header = "Amount";
          break;
        case "billing_cycle":
          header = "Increment Value / Percentage";
          break;
        case "remarks":
          header = "Remarks";
          break;
      }
      return header;
    },
    ecommereceSameDayHeader(index) {
      let header;
      switch (index) {
        case "per_job":
          header = "Per Job";
          break;
        case "additional_jobs":
          header = "Additional Job";
          break;
        case "no_of_jobs":
          header = "No of Jobs";
          break;
        case "amount":
          header = "Amount";
          break;
        case "billing_cycle":
          header = "Increment Value / Percentage";
          break;
        case "remarks":
          header = "Remarks";
          break;
      }
      return header;
    },
    ecommereceNextDayDataHeader(index) {
      let header;
      switch (index) {
        case "per_job":
          header = "Per Job";
          break;
        case "additional_jobs":
          header = "Additional Job";
          break;
        case "no_of_jobs":
          header = "No of Jobs";
          break;
        case "amount":
          header = "Amount";
          break;
        case "billing_cycle":
          header = "Increment Value / Percentage";
          break;
        case "remarks":
          header = "Remarks";
          break;
      }
      return header;
    },
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

      if (this.tableName == "BulkAdjustmentProfile") {
        this.$store.dispatch("bulkAdjustment/loadProfileExpansionData", {
          id: event.data.id,
        });
      }
      // } else if (this.tableName == "QuotationTabTable") {
      //   this.$store.dispatch("salesSales/loadQuotationSubTableData", {
      //     id: event.data.id,
      //   });
      // }
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
      if (this.tableName == "AdhocRatesTable") {
        event.data.selected = true;
        this.$emit("getSelectedSurchargeData", this.selectionMode);
      }
    },
    onRowUnselect(event) {
      if (this.tableName == "AdhocRatesTable") {
        event.data.selected = false;
        this.$emit("getSelectedSurchargeData", this.selectionMode);
      }
    },
    selectAllRows(event) {
      if (this.tableName == "AdhocRatesTable") {
        for (let i in event.data) {
          event.data[i].selected = true;
        }
        this.$emit("getSelectedSurchargeData", this.selectionMode);
      }
    },
    // eslint-disable-next-line no-unused-vars
    unSelectAllRows(event) {
      this.unselectAll = true;
      this.$emit("getSelectedSurchargeData", this.selectionMode);
    },
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
// .p-avatar-text {
// color: #13141a !important;
// }
</style>
