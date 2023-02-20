

<template>
  <DataTable
    class="p-datatable-sm editable-cells-table"
    id="formTable"
    :value="tableData"
    :rowClass="rowClass"
    responsiveLayout="scroll"
    filterDisplay="menu"
    editMode="cell"
    @cell-edit-init="onCellEditInit"
    @cell-edit-complete="onCellEditComplete"
    v-model:filters="filters"
    :globalFilterFields="getGlobalFields()"
    v-model:selection="selectionMode"
    v-model:expandedRows="expandedRows"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    :paginator="true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <template #header>
      <div class="table-header-container flex justify-content-end">
        <Buttons
          icon="pi pi-plus"
          label="Expand All"
          @click="expandAll"
          class="mr-2"
        />
        <Buttons icon="pi pi-minus" label="Collapse All" @click="collapseAll" />
      </div>
    </template>
    <template #empty><div class="p-3">No data found.</div></template>

    <Column
      v-if="tableName == 'EcommerceTable'"
      selectionMode="multiple"
      headerStyle="width: 1em"
    ></Column>
    <Column
      :expander="true"
      headerStyle="width: 1rem"
      class="expander"
      v-if="tableName == 'EcommerceTable'"
    />
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      style="width: 25%"
      :sortable="col.header != 'S. No' ? true : false"
      :showFilterMenu="col.header != 'S. No' ? true : false"
      :showFilterMatchModes="col.header == 'Created On' ? false : true"
    >
      <template
        #editor="{ data, field }"
        v-if="
          col.header == 'Increment amount (S$)' ||
          col.header == 'Increment Percentage (%)' ||
          col.header == 'Remarks'
        "
      >
        <span v-if="col.header == 'Increment amount (S$)'">
          <InputNumber
            v-model="data[field]"
            :showButtons="true"
            mode="decimal"
            :maxFractionDigits="2"
            autofocus
          />
        </span>
        <span v-if="col.header == 'Increment Percentage (%)'">
          <InputNumber
            v-model="data[field]"
            :showButtons="true"
            mode="decimal"
            :maxFractionDigits="2"
            autofocus
          />
        </span>
        <span v-if="col.header == 'Remarks'">
          <InputText v-model="data[field]" :showButtons="true" autofocus />
        </span>
      </template>

      <template
        #body="slotProps"
        v-if="
          col.header == 'Quotation' ||
          col.header == 'Select' ||
          col.header == 'Remove'
        "
      >
        <span v-if="col.header == 'Quotation'" class="mr-3">
          <div class="flex flex-row justify-content-space-between mt-2">
            <div
              v-if="slotProps.data['business_type'] == 'Adhoc'"
              class="color-7469F2"
            >
              Adhoc
              <!-- {{ slotProps.data["business_type"] }} -->
            </div>
            <div
              class="float-right"
              v-if="slotProps.data['business_type'] == 'Adhoc'"
            >
              <img
                :src="'/images/international.png'"
                alt=""
                width="19"
                height="20"
                class="ml-2"
              />
            </div>

            <div
              v-if="slotProps.data['business_type'] == 'Agent'"
              class="color-55ba6b"
            >
              <!-- {{ slotProps.data["business_type"] }} -->
            </div>
            <div
              class="float-right"
              v-if="slotProps.data['business_type'] == 'Agent'"
            >
              <img
                :src="'/images/rapido.png'"
                alt=""
                width="18"
                height="20"
                class="ml-4"
              />
            </div>
            <div
              v-if="slotProps.data['business_type'] == 'international'"
              class="color-7469F2"
            >
              International<!-- {{ slotProps.data["business_type"] }} -->
            </div>

            <div
              class="float-right"
              v-if="slotProps.data['business_type'] == 'international'"
            >
              <img
                :src="'/images/' + slotProps.data['type'] + '.png'"
                alt=""
                width="18"
                height="22"
                class="width-left-42"
              />
            </div>
            <div
              v-if="slotProps.data['business_type'] == 'Contract'"
              class="color-EBBD46"
            >
              Express<!-- {{ slotProps.data["business_type"] }} -->
            </div>

            <div
              class="float-right"
              v-if="slotProps.data['business_type'] == 'Contract'"
            >
              <img
                :src="'/images/express.png'"
                alt=""
                width="25"
                height="20"
                class="ml-2"
              />
            </div>
          </div>
        </span>
        <span v-if="col.header == 'Remove'">
          <div class="flex delete" @click="removeRow(slotProps)">
            <i class="pi parent pi-times mt-2"></i>
          </div>
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
        <!--Date Range Filter-->
        <span v-if="col.header == 'Created on'">
          <p class="mb-2"><b>Set a date range:</b></p>
          <Calendars :state="filterModel.value" v-model="filterModel.value" />
        </span>
        <!--Text Filter-->
        <span v-if="col.header != 'Created On'">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="getFilterPlaceHolder(col.header)"
          />
        </span>
      </template>
    </Column>

    <template #expansion="slotProps">
      <span v-if="slotProps.data['e_commerce'].length != 0">
        <div class="mx-4">
          <ExpansionTable
            :key="tripTableData"
            TableDataName="tripFormTableData"
            :selectionModeState="selectionModeState"
            dataKey="id"
            tableName="EcommerceTable"
            :tableData="slotProps.data['e_commerce']"
            :isAmtDisabled="amountDisabled"
            :isPercentDisabled="persentDisabled"
            :tableColumns="EcomExpansionColumnData"
            storePath="bulkAdjustment"
            :class="
              slotProps.data['disabled'] == true ? 'tableDisable' : 'tableEdit'
            "
          />
        </div>
      </span>
      <!-- <ExpansionTable :incomingData="slotProps" /> -->
    </template>
  </DataTable>
</template>

<script>
import ExpansionTable from "./EcomExpansionTable.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import { mapGetters } from "vuex";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import { FilterMatchMode, FilterOperator } from "primevue/api";
// import CustomSpeedDial from "../../CustomSpeedDial.vue";
// import ExpandedTable from "./ExpandedTable.vue";
// import ZoneChips from "../../../Express/Adhoc/SelectionChips/ZoneChips.vue";
// import {
//   outBoundTableActions,
//   outBoundExpandedTableColumns,
//   countriesTableActions,
// } from "../Const/const";

export default {
  components: {
    DataTable,
    Column,
    ExpansionTable,
    InputText,
    InputNumber,
    //     CustomSpeedDial,
    //     ExpandedTable,
    //     ZoneChips,
  },
  props: [
    "type",
    "transport",
    "tableDataName",
    "tableName",
    "tableClass",
    "tableData",
    "overlayData",
    "apiKey",
    "tableColumns",
    "storePath",
    "globalSearchString",
    "paginator",
    "selectionModeState",
    "formTableDataName",
    "isloading",
    "isAmtDisabled",
    "isPercentDisabled",
  ],
  data() {
    return {
      selectedData: null,
      amountDisabled: false,
      percentageDisabled: false,
      renderKey: 10,
      expandedRows: [],
      selectionMode: [],
      checkBoxClick: false,
      checkBoxClick2: false,
      ecommereceData: [
        {
          job_count: 30,
          rate_per_job: 10,
          amount: 10,
          additional_job_rate: 20,
          percentage: 5,
          remarks: "abc",
          delivery_type: "Next day",
        },
        {
          job_count: 30,
          rate_per_job: 20,
          amount: 10,
          additional_job_rate: 10,
          percentage: 5,
          remarks: "abc",
          delivery_type: "Same day",
        },
        {
          job_count: 30,
          rate_per_job: 10,
          amount: 10,
          additional_job_rate: 20,
          percentage: 5,
          remarks: "abc",
          delivery_type: "Next day",
        },
        {
          job_count: 30,
          rate_per_job: 10,
          amount: 10,
          additional_job_rate: 20,
          percentage: 5,
          remarks: "abc",
          delivery_type: "Next day",
        },
        // {
        //   job_count: 30,
        //   rate_per_job: 20,
        //   amount: 10,
        //   additional_job_rate: 10,
        //   percentage: 5,
        //   remarks: "abc",
        // },
        // {
        //   job_count: 30,
        //   rate_per_job: 10,
        //   amount: 10,
        //   additional_job_rate: 20,
        //   percentage: 5,
        //   remarks: "abc",
        // },
      ],
      ecommereceDataHeader: [],
      EcomExpansionColumnData: [
        // { field: "S_No", header: "S.No" },
        { field: "delivery_type", header: "Delivery Type" },
        // { field: "business_type", header: "Quotation" },
        { field: "no_of_units", header: "Min Units" },
        { field: "per_job", header: "Unit Cost $" },
        // { field: "Select", header: "Select" },
        { field: "Increment_amount", header: "Increment amount (S$)" },
        { field: "Increment_Percentage", header: "Increment Percentage (%)" },
        { field: "revised_amount", header: "New Cost (S$)" },
        { field: "remarks", header: "Remarks" },
      ],
      filters: null,
      details: {
        batch_name: "",
        Increment_Percentage: "",
        Remarks: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      bulkAdjustmentAddNewData: "bulkAdjustment/bulkAdjustmentAddNewData",
    }),
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
        case "percentage":
          header = "Increment Value / Percentage";
          break;
        case "remarks":
          header = "Remarks";
          break;
      }
      return header;
    },
    removeRow(event) {
      // let removedTableData = [];
      this.$confirm.require({
        message: "Are you sure you want to Delete the Row?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.$store.state.bulkAdjustment.ecomTableRowDelete = {};
          this.$store.state.bulkAdjustment.ecomTableRowDelete = event;
        },
      });
    },
    onCellEditComplete(event) {
      let { data, newValue, field } = event;

      switch (field) {
        default:
          data[field] = newValue;
          break;
      }
      let i = event.index;
      if (event.field == "Increment_amount") {
        if (
          this.bulkAdjustmentAddNewData.profiles.e_commerce[i]
            .Increment_amount == 0
        ) {
          this.bulkAdjustmentAddNewData.profiles.e_commerce[i].disabled = false;
          this.bulkAdjustmentAddNewData.profiles.e_commerce[
            i
          ].Increment_Percentage = 0;
        } else {
          this.bulkAdjustmentAddNewData.profiles.e_commerce[i].disabled = true;
          this.bulkAdjustmentAddNewData.profiles.e_commerce[
            i
          ].Increment_Percentage = 0;
          this.percentageDisabled = true;
        }
        // Expansion field
        for (let j in this.bulkAdjustmentAddNewData.profiles.e_commerce[i]
          .e_commerce) {
          if (
            this.bulkAdjustmentAddNewData.profiles.e_commerce[i]
              .Increment_amount == 0
          ) {
            this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
              j
            ].Increment_amount = 0;
            this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
              j
            ].Increment_Percentage = 0;
            this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
              j
            ].revised_amount = 0;
          } else {
            //
            this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
              j
            ].Increment_amount = event.data.Increment_amount;
            if (
              this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[j]
                .Increment_amount
            ) {
              this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
                j
              ].Increment_Percentage = Number(
                (this.bulkAdjustmentAddNewData.profiles.e_commerce[i]
                  .e_commerce[j].Increment_amount /
                  this.bulkAdjustmentAddNewData.profiles.e_commerce[i]
                    .e_commerce[j].per_job) *
                  100
              ).toFixed(2);
              this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
                j
              ].revised_amount =
                this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
                  j
                ].Increment_amount +
                this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
                  j
                ].per_job;
            }
          }
        }
      }
      if (event.field == "Increment_Percentage") {
        if (
          this.bulkAdjustmentAddNewData.profiles.e_commerce[i]
            .Increment_Percentage == 0
        ) {
          this.bulkAdjustmentAddNewData.profiles.e_commerce[i].disabled = false;
          this.bulkAdjustmentAddNewData.profiles.e_commerce[
            i
          ].Increment_amount = 0;
        } else {
          this.bulkAdjustmentAddNewData.profiles.e_commerce[i].disabled = true;
          this.bulkAdjustmentAddNewData.profiles.e_commerce[
            i
          ].Increment_amount = 0;
          this.percentageDisabled = true;
        }
        // this.bulkAdjustmentAddNewData.profiles.e_commerce[i].Increment_amount =
        //   "-";
        // this.amountDisabled = true;
        // Expansion field
        for (let j in this.bulkAdjustmentAddNewData.profiles.e_commerce[i]
          .e_commerce) {
          if (
            this.bulkAdjustmentAddNewData.profiles.e_commerce[i]
              .Increment_Percentage == 0
          ) {
            this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
              j
            ].Increment_amount = 0;
            this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
              j
            ].Increment_Percentage = 0;
            this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
              j
            ].revised_amount = 0;
          } else {
            this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
              j
            ].Increment_Percentage = event.data.Increment_Percentage;
            if (
              this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[j]
                .Increment_Percentage
            ) {
              this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
                j
              ].Increment_amount = Number(
                (this.bulkAdjustmentAddNewData.profiles.e_commerce[i]
                  .e_commerce[j].Increment_Percentage /
                  100) *
                  this.bulkAdjustmentAddNewData.profiles.e_commerce[i]
                    .e_commerce[j].per_job
              ).toFixed(2);
              this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
                j
              ].revised_amount =
                this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
                  j
                ].Increment_amount +
                this.bulkAdjustmentAddNewData.profiles.e_commerce[i].e_commerce[
                  j
                ].per_job;
            }
          }
        }
      }
      this.$store.state.bulkAdjustment.editFieldEcom = event.field;
      this.$store.state.bulkAdjustment.rowEdit["Increment_Percentage"] =
        event.data.Increment_Percentage;
      this.$store.state.bulkAdjustment.rowEdit["Increment_amount"] =
        event.data.Increment_amount;
    },

    isPositiveInteger(val) {
      let str = String(val);
      str = str.trim();
      if (!str) {
        return false;
      }
      str = str.replace(/^0+/, "") || "0";
      var n = Math.floor(Number(str));
      return n !== Infinity && String(n) === str && n >= 0;
    },

    dateFormater(data) {
      if (!data) return "-";
      let date = moment(data).format("DD MMM, YYYY");

      if (date === "Invalid date") {
        return data;
      } else {
        return date;
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

    selectAllRows(event) {
      this.$store.state[this.storePath][this.tableName] = this.selectionMode;
    },

    // eslint-disable-next-line no-unused-vars
    unSelectAllRows(event) {
      this.$store.state[this.storePath][this.tableName] = this.selectionMode;
    },

    // eslint-disable-next-line no-unused-vars
    onRowSelect(event) {
      this.bulkAdjustmentAddNewData?.profiles?.e_commerce.map((list) => {
        if (list.id == event.data.id) {
          list.selected = true;
        }
        this.disabled = false;
      });
    },
    // eslint-disable-next-line no-unused-vars
    onRowUnselect(event) {
      this.bulkAdjustmentAddNewData?.profiles?.e_commerce.map((list) => {
        if (list.id == event.data.id) {
          list.selected = false;
        }
      });
    },
    onRowExpand(event) {
      this.ecommereceData = event.data.ecom;
    },
    expandAll() {
      this.expandedRows = this.tableData.filter((p) => p.id);
      this.$toast.add({
        severity: "success",
        summary: "All Rows Expanded",
        life: 3000,
      });
    },
    collapseAll() {
      this.expandedRows = null;
      this.$toast.add({
        severity: "success",
        summary: "All Rows Collapsed",
        life: 3000,
      });
    },
    ecomRowSelect() {
      if (this.selectionMode) {
        // this.selectionMode.map((list) => {
        //   list?.ecom.map((array) => {
        //     array.amount = list?.Increment_amount;
        //     array.percentage = list?.Increment_Percentage;
        //   });
        // });
      }
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

  watch: {
    selectionMode(value) {
      if (this.tableName == "EcommerceTable") {
        // value?.map((list) => {
        //   list.selected = true;
        // });
        this.ecomRowSelect();
      }
      //   //   if (this.formTableDataName == "tripFormTableData"){
      //   //     this.expressContractBikeFSRAddNewData["quotation"]["trips"]=[];
      //   //     value?.map((list) => {
      //   //     this.expressContractBikeFSRAddNewData["quotation"]["trips"].push({
      //   //       from_time: list.from_time,
      //   //       selected: true,
      //   //       to_time: list.to_time,
      //   //       trip_days: list.trip_days,
      //   //       trip_id: list.trip_id,
      //   //       trip_no: list.trip_no,
      //   //       trip_type: list.trip_type,
      //   //     });
      //   //   });
      //   // }

      //   // if (this.formTableDataName == "inspectionsFormTableData"){
      //   //     this.expressContractBikeFSRAddNewData["contacts"]=[];
      //   //     value?.map((list) => {
      //   //     this.expressContractBikeFSRAddNewData["contacts"].push({
      //   //       profile_url: list.profile_url,
      //   //       selected: true,
      //   //       contact_name: list.contact_name,
      //   //       contact_no: list.contact_no,
      //   //       email: list.email,
      //   //       mobile_no: list.mobile_no,
      //   //       designation: list.designation,
      //   //     });
      //   //   });
      //   // }
    },
    "$store.state.bulkAdjustment.bulkAdjustmentAddNewData.profile[0].Increment_amount":
      function () {
        if (
          this.checkBoxClick &&
          this.bulkAdjustmentAddNewData.profile[0].Increment_amount
        ) {
          this.applyForAll();
        }
      },
    "$store.state.bulkAdjustment.checkBoxClickEcom": function () {
      for (let i in this.bulkAdjustmentAddNewData.profiles.e_commerce) {
        if (this.$store.state.bulkAdjustment.checkBoxClickEcom) {
          this.bulkAdjustmentAddNewData.profiles.e_commerce[i].disabled = true;
        } else {
          this.bulkAdjustmentAddNewData.profiles.e_commerce[i].disabled = false;
        }
      }
    },
    "$store.state.others.globalSearch": function () {
      this.filters["global"].value =
        this.$store.state[this.storePath].globalSearch;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";

::v-deep .deleted_row {
  background-color: #fff2f2 !important;
}
::v-deep td.EditTable.p-editable-column {
  // background: red !important;
  background: #8bbaf7;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // padding: 1rem 2rem !important;
  // margin: 0.5rem 1rem !important;
  border: 1px solid #357dea !important;
  // border: 1px solid #ced4da;
}
::v-deep .card {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
::v-deep .contract-table.p-card .p-card-body {
  padding: 0 !important;
}

:deep .p-column-filter-menu {
  margin-left: unset !important;
}
.p-paginator-page {
  background: #357dea;
  border-radius: 5px;
}
::v-deep .contract-table.p-datatable-thead > tr > th {
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
  background: rgba(197, 220, 255, 0.62) !important;
  // opacity: 0.5;
}
::v-deep .express-contract-table-expansion .p-datatable-row-expansion {
  background: #fff !important;
}
::v-deep
  .express-contract-table-expansion
  .p-datatable
  .p-datatable-thead
  > tr
  > th {
  background: transparent !important;
  border: none !important;
}
// ::v-deep .express-contract-table-expansion .p-datatable.p-datatable-hoverable-rows .p-datatable-tbody > tr:not(.p-highlight):hover{
//   background: transparent !important;
// }

.contract-table .p-datatable-tbody > tr > td {
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
.rate-default-badge {
  background: #fff8e2;
  color: #f0bd76;
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
}
.rate-private-badge {
  background: #ecffeb;
  color: #4b9149;
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
}

.add-destination {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #357dea;
  font-size: 12px;
}
.activeClass {
  color: #17c079;
  font-weight: 600;
  font-size: 12px;
}
.inactiveClass {
  color: #ea6e39;
  font-weight: 600;
  font-size: 12px;
}
.text_field {
  width: 50px;
}
::v-deep(.editable-cells-table td.p-cell-editing) {
  padding-top: 0;
  padding-bottom: 0;
}
.van-costing-details-detailsText {
  font-size: 12px;
  color: #7e84a7;
  font-weight: 600;
}
.van-costing-details-valuesText {
  color: #66c11e;
}
::v-deep .p-datatable-table .p-datatable-tbody .p-highlight .p-editable-column {
  pointer-events: all;
  // background: #66c11e;
  // border: 1px solid #357dea !important;
}
::v-deep .p-datatable-table .p-datatable-tbody .p-editable-column {
  pointer-events: none;
  // background: #66c11e;
  // border: 1px solid #357dea !important;
}
::v-deep
  .tableDisable
  .p-datatable-wrapper
  .p-datatable-table
  .p-datatable-tbody
  .p-editable-column {
  pointer-events: none !important;
  // color: red !important;
  background: #edf1f7;
  // border: 1px solid #357dea !important;
}
// ::v-deep .p-datatable-row-expansion .tableDisable {
//   pointer-events: none !important;
//   color: red;
// }
// ::v-deep .p-datatable-table > .p-datatable-tbody > tr > .p-editable-column {
//   pointer-events: none;
// }
// :v-deep .p-datatable-table .p-datatable-tbody .p-highlight .p-editable-column {
//   pointer-events: all !important;
// }
</style>
