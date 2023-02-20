<template>
  <DataTable
    :class="tableClass"
    :showGridlines="false"
    :stripedRows="true"
    :globalFilterFields="getGlobalFields()"
    :rowClass="rowClass"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    @row-select-all="onRowSelectAll"
    @row-unselect-all="onRowUnselectAll"
    v-model:selection="rowSelect"
    v-model:expandedRows="expandedRows"
    v-model:filters="filters"
    :dataKey="dataKey"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
    @page="onChangePage($event)"
    @sort="onSort($event)"
    @filter="onFilter($event)"
    responsiveLayout="scroll"
    filterDisplay="menu"
    :value="tableData"
    :paginator="true"
    :lazy="true"
    :totalRecords="totalRecords"
    :rows="$store.state.CRMClients.pageLimit"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <!-- <Column v-if="tableName == 'QuotationTabSubTable'" /> -->
    <Column
      class="py-4"
      selectionMode="multiple"
      headerStyle="width: 1em"
    ></Column>
    <Column :expander="expansionOption" headerStyle="width: 1rem" />
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :showFilterMenu="col.header != 'Actions' && col.field != 'address_list' ? true : false"
      :sortable="col.header != 'Actions' && col.field != 'address_list' ? true : false"
    >
      <template #body="slotProps">
        <!-- TEMPLATE : ACTIONS -->
        <span v-if="col.header == 'Actions'" class="mr-2">
          <CustomSpeedDial
            storePath="CRMClients"
            :dataName="tableDataName"
            :selectedRows="rowSelect"
            :rowData="slotProps.data"
            :tableName="tableName"
            :customDialData="overlayData"
          />
        </span>

        <!-- DATES TEMPLATE -->
        <!-- <span v-if="col.header == 'Created On'">
          {{ dateFormater(slotProps.data[col.field]) }}
        </span> -->

        <!-- TEMPLATE : ADDRESS -->
        <!-- <span v-if="col.header == 'Address'" class="mr-2">
          <div class="flex flex-column mt-4">
            <div class="heading">{{ slotProps.data["addresss"] }}</div>
            <div class="sub">{{ slotProps.data["postal_code"] }}</div>
          </div>
        </span> -->

        <!--Hide default display-->
        <span v-if="col.header != 'Actions'">
          <span>{{ slotProps.data[col.field] }}</span>

          <!-- {{slotProps.data[col.field][col.field1][col.field2]}} -->
        </span>
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

        <!--Text Filter-->
        <span v-if="col.header != 'Created on'">
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
      <span>
        <ExpansionTemplate
          :selectedData="slotProps.data"
          @routeTableRows="routeToRows"
        />
      </span>
    </template>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import CustomSpeedDial from "./CustomSpeedDial.vue";
import ExpansionTemplate from "./ExpansionTemplate.vue";
import InputText from "primevue/inputtext";
import { crmClState, crm_Client } from "../../../store/modules/CRM/helper";
export default {
  name: "CRMDataTable",
  components: {
    DataTable,
    Column,
    CustomSpeedDial,
    ExpansionTemplate,
    InputText,
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
    "expansionOption",
    "section",
    "totalRecords",
  ],
  data() {
    return {
      expandedRows: [],
      filters: null,
      rowSelect: [],
      sortField: "createdAt",
      sortOrder: "DESC",
      fil_data: [],
    };
  },
  computed: {
    ...crmClState,
  },
  created() {
    this.rowSelect = [];
    this.initilaizeFilters();
  },
  watch: {
    "$store.state.CRMClients.globalSearch": function () {
      this.filters["global"].value =
        this.$store.state["CRMClients"].globalSearch;
    },
    rowSelect: {
      handler() {
        this.$emit("seletedMainRows", this.rowSelect);
      },
      deep: true,
    },
  },
  methods: {
    ...crm_Client,
    getFilesLength(files) {
      if (files != null) {
        return files.length;
      }
    },
    getGlobalFields() {
      let globalFields = [];
      for (let c in this.tableColumns) {
globalFields.push(this.tableColumns[c]["field"]);
      }
      return globalFields;
    },

    async onChangePage(event) {
      let paginationParams = {
        orderBy: [this.sortField, this.sortOrder],
        filter_params: this.fil_data,
      };
      if (this.section == "Other") {
        this.$emit("onPageChange", event, paginationParams);
      } else {
        this.setReset({ pageNo: event.page + 1, pageLimit: event.rows });
        this.getCall(paginationParams);
      }
    },
    onSort(event) {
      this.sortField = event.sortField;
      this.sortOrder = event.sortOrder == 1 ? "DESC" : "ASC";
      let filteredEvents = event.filters;
      this.setFilterData(filteredEvents);
    },
    onFilter(event) {
      let filteredEvents = event.filters;
      this.fil_data = [];
      this.setFilterData(filteredEvents);
    },
    async getCall(payload) {
      if (this.action_type == "By All") {
        await this.getAllClient({ toast: this.$toast, payload: payload });
      } else {
        await this.getCustomerClient({ toast: this.$toast, payload: payload });
      }
    },
    getSortFieldName(field) {
      let header = [field];
      if (this.action_type == "By All") {
        switch (field) {
          case "customer_id":
            header = ["contract_profile", "customer_id"];
            break;
          case "profile_name":
            header = ["contract_profile", "profile_name"];
            break;
        }
      }
      return header;
    },
    async setFilterData(filteredEvents) {
      this.fil_data = [];
      await this.tableColumns.map(async (res) => {
        if (res.field && filteredEvents[res.field]["constraints"][0]["value"]) {
          let searchKey = filteredEvents[res.field]["constraints"][0]["value"];

          let filterObject = {
            column_name: res.field,
            type: filteredEvents[res.field]["constraints"][0]["matchMode"],
            searchKey: searchKey,
          };
          this.fil_data.push(filterObject);
          return res;
        }
      });
      let sortFieldArray = this.getSortFieldName(this.sortField);
      let orderBy = sortFieldArray.concat([this.sortOrder]);
      let paginationParams = {
        orderBy: orderBy,
        filter_params: this.fil_data,
      };
      if (this.section == "Other") {
        // this.$emit('onSort', paginationParams);
        let data = {
          ...paginationParams,
          customer_id: this.$route.params?.cusId,
        };
        await this.getCustomerSUbClient({ payload: data, toast: this.$toast });
      } else {
        this.getCall(paginationParams);
      }
    },
    routeToRows(e) {
      this.$emit("seletedSubRows", e);
    },
    getFilterPlaceHolder(placeholder) {
      return "Search by" + " " + placeholder;
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
    processOverlayData(data, row) {},
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
    async onRowExpand(event) {
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
      this.getContactsBy({ id: event.data.id, toast: this.$toast });
      //  let data={customer_id:event.data.customer_id}
      //    await this.getCustomerSUbClient({ pageNo:1, PageSize:10, payload:data, toast:this.$toast })
    },

    async onRowSelect(event) {},
    async onRowUnselect(e) {},
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
