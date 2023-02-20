<template>
  <DataTable
    :class="'region-rates-table'"
    class="p-datatable-sm"
    id="formTable"
    :value="tableData"
    :rowClass="rowClass"
    responsiveLayout="scroll"
    filterDisplay="menu"
    v-model:filters="filters"
    :dataKey="'id'"
    :globalFilterFields="getGlobalFields()"
    v-model:expandedRows="expandedRows"
    v-model:selection="selectionMode"
    @rowExpand="onRowExpand"
    @rowUnselect="onRowUnselect"
    :paginator="true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
    @rowCollapse="onRowCollapse"
  >
    <template #header>
      <div
        class="table-header-container flex justify-content-start"
        @click="toggle"
      >
        <span class="color-7a7a7a font-size-16 bold-600"
          >Selected profiles :
        </span>
        <span class="ml-2 color-4e5968 font-size-16 bold-600"
          >{{ SelectedProfile.length }}
        </span>
        <OverlayPanel ref="op">
          <span class="filesHeader bodyTxt">Files:</span>
          <div class="flex flex-column p-1">
            <div
              class="flex mt-2"
              v-for="(files, index) in SelectedProfile"
              :key="index"
            >
              {{ index + 1 }}.
              <span class="filesText ml-1">{{ files["profile_name"] }}</span>
            </div>
          </div>
        </OverlayPanel>
      </div>
    </template>
    <Column selectionMode="multiple" headerStyle="width: 1em"></Column>
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :sortable="col.header != 'Actions' ? true : false"
      :showFilterMenu="
        col.header != 'Actions' &&
        col.header != 'S. No' &&
        col.header != 'Address' &&
        col.header != 'Remarks'
          ? true
          : false
      "
      :showFilterMatchModes="col.header == 'Created On' ? false : true"
    >
      <template #body="slotProps">
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
        <span v-else-if="col.header == 'Created By'">
          {{ slotProps.data.user.display_name }}
        </span>

        <span v-else-if="col.header == 'Weight Range'">
          {{ slotProps.data["min_weight"] }}-{{ slotProps.data["max_weight"] }}
        </span>

        <span v-else-if="col.header == 'Status'" class="mr-2">
          <span
            :class="
              slotProps.data[col.field] == 'Active'
                ? 'activeClass'
                : 'inactiveClass'
            "
            >{{
              slotProps.data[col.field] == "Active" ? "Active" : "Inactive"
            }}</span
          >
        </span>

        <span v-else-if="col.header == 'Created on'">
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>

        <span v-else-if="col.header == 'Actions'" class="mr-2">
          <CustomSpeedDial
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="getCustomSpeedDialData()"
            :tableName="tableName"
          />
        </span>
        <span v-else>{{ slotProps.data[col.field] }}</span>
      </template>

      <!--column-vise filtering-->
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
        <span v-if="col.header == 'Created On'">
          <p class="mb-2"><b>Set a date range:</b></p>
          <Calendars :state="filterModel.value" v-model="filterModel.value" />
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
  </DataTable>
</template>

<script>
import { mapGetters } from "vuex";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import InputText from "primevue/inputtext";
import OverlayPanel from "primevue/overlaypanel";

export default {
  components: {
    DataTable,
    Column,
    InputText,
    OverlayPanel,
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
  ],
  data() {
    return {
      expandedRows: [],
      selectionMode: [],
      SelectedProfile: [],
      filters: null,
    };
  },
  computed: {
    ...mapGetters({
      bulkAdjustmentAddNewData: "bulkAdjustment/bulkAdjustmentAddNewData",
    }),
  },
  methods: {
    toggle(event) {
      this.$refs.op.toggle(event);
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
        if (this.tableColumns[c]["field"] == "createdAt") {
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
    selectAllRows(event) {
      this.$store.state[this.storePath][this.formTableDataName] =
        this.selectionMode;
    },
    // eslint-disable-next-line no-unused-vars
    unSelectAllRows(event) {
      this.$store.state[this.storePath][this.formTableDataName] =
        this.selectionMode;
    },
    // eslint-disable-next-line no-unused-vars
    onRowSelect(event) {
      this.$store.state[this.storePath][this.formTableDataName] =
        this.selectionMode;
    },
    // eslint-disable-next-line no-unused-vars
    onRowUnselect(event) {
      this.$store.state[this.storePath][this.formTableDataName] =
        this.selectionMode;
    },
  },
  watch: {
    selectionMode(value) {
      this.$store.state.bulkAdjustment.FirstStepperTableDataSelected = [];
      for (let i in value) {
        this.$store.state.bulkAdjustment.FirstStepperTableDataSelected[i] =
          value[i];
        this.SelectedProfile = value;
      }
    },
    "$store.state.bulkAdjustment.globalSearch": function () {
      this.filters["global"].value =
        this.$store.state[this.storePath].globalSearch;
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

::v-deep .deleted_row {
  background-color: #fff2f2 !important;
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
  width: 104% !important;
  margin-left: -35px;
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
.filesHeader {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
}
.filesText {
  text-decoration: none;
  color: #4e5968 !important;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
}
</style>
