<template>
  <DataTable
    :loading="$store.state['operationsStatusSettings'].tableLoad"
    :class="tableClass"
    :showGridlines="false"
    :stripedRows="true"
    v-model:selection="selectionRow"
    :dataKey="dataKey"
    responsiveLayout="scroll"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    @row-select-all="selectAllRows"
    @row-unselect-all="unSelectAllRows"
    :value="tableData"
    :paginator="true"
    :totalRecords="totalRecords"
    :rows="$store.state['operationsStatusSettings'].pageLimit"
    v-model:filters="filters"
    filterDisplay="menu"
    :globalFilterFields="[
      'status_name',
      'statusSettings.display_name',
      'status',
      'createdAt',
    ]"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
    <Column
      v-for="col of tableColumns"
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
        <span v-if="col.header == 'Actions'" class="mr-2">
          <CustomSpeedDial
            storePath="operationsSpecialJobEntry"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :currentTab="currentTab"
            :customDialData="processOverlayData(overlayData, slotProps.data)"
          />
        </span>

        <span v-if="col.header == 'S. No'">
          {{ slotProps.data?.s_no }}
        </span>

        <span v-if="col.header == 'Rider/Driver'">
          <!-- {{ slotProps.data?.rider_name }} -->

          <div class="flex mr-2">
            <!-- <img
                v-if="slotProps.data['profile_url'] != null"
                :src="slotProps.data['profile_url']"
                class="contactsImage"
              /> -->

            <!-- <AvatarLabel
                v-else
                :label="subStringHandler(slotProps.data?.rider_name)"
                classes="avatar-text"
              /> -->
          </div>

          <div class="flex flex-column mt-2">
            <div class="heading">{{ slotProps.data?.rider_name }}</div>
            <!-- <div class="sub">{{ slotProps.data.rider_name }}</div> -->
          </div>
        </span>

        <span v-if="col.header == 'Delivery Type'">
          {{ slotProps.data?.delivery_type }}
        </span>

        <span v-if="col.header == 'Job Count'">
          {{ slotProps.data?.job_count }}
        </span>

        <span v-if="col.header == 'Supervisor Count'">
          <InputText
            type="text"
            v-model="slotProps.data.supervisor_count"
            class="p-column-filter w-6rem"
            :placeholder="col.header"
          />
        </span>

        <span v-if="col.header == 'Supervisor Total Count'">
          <span v-if="currentTab === 'HistoryTab'">{{
            slotProps.data?.supervisor_total_count
          }}</span>
          <InputText
            v-if="currentTab === 'SupervisorCountTab'"
            type="text"
            v-model="slotProps.data.supervisor_total_count"
            class="p-column-filter w-6rem"
            :placeholder="col.header"
          />
        </span>

        <span v-if="col.header == 'Supervisor NightJob Count'">
          <InputText
            type="text"
            v-model="slotProps.data.supervisor_nightjob_count"
            class="p-column-filter w-6rem"
            :placeholder="col.header"
          />
        </span>

        <span v-if="col.header == 'Supervisor Remark'">
          <span v-if="currentTab === 'HistoryTab'">{{
            slotProps.data?.supervisor_remark
          }}</span>
          <InputText
            v-if="currentTab === 'SupervisorCountTab'"
            type="text"
            v-model="slotProps.data.supervisor_remark"
            class="p-column-filter w-100"
            :placeholder="col.header"
          />
        </span>
      </template>
    </Column>
    <template #empty> No data found </template>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import InputText from "primevue/inputtext";
import CustomSpeedDial from "./customSpeedDial.vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SpecialJobEntryTable",
  components: {
    DataTable,
    Column,
    InputText,
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
    "currentTab",
    "totalRecords",
    "tabPageOffset",
  ],
  data() {
    return {
      expandedRows: [],
      rowSelect: null,
      filters: null,
      sortField: "createdAt",
      sortOrder: "DESC",
      filteredItems: [],
      selectedColumns: null,
      selectionRow: null,
    };
  },

  methods: {
    ...mapActions({
      updateSelectedRow: "operationsSpecialJobEntry/updateRowSelection",
    }),
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM, YYYY");
        return formattedDate;
      }
    },
    getFilterPlaceHolder(placeholder) {
      return "Search by" + " " + placeholder;
    },
    formatDate(value) {
      return value.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
    processOverlayData(data, row) {
      data.currentTab = this.currentTab;
      return data;
    },
    selectAllRows(event) {
      this.updateSelectedRow(this.selectionRow);
    },
    unSelectAllRows(event) {
      this.updateSelectedRow(this.selectionRow);
    },
    onRowSelect(event) {
      this.updateSelectedRow(this.selectionRow);
    },
    onRowUnselect(event) {
      this.updateSelectedRow(this.selectionRow);
    },
    initilaizeFilters() {
      this.filters = {
        status_name: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        "statusSettings.display_name": {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        status: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        createdAt: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.BETWEEN }],
        },
      };
    },
  },
  mounted() {
    this.initilaizeFilters();
  },
  computed: {},
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
  color: #269337;
  font-weight: 600 !important;
}
.activeBgClass {
  background-color: #b1fcdd;
  width: 80px;
  height: 30px;
  border-radius: 7px;
  padding: 5px 12px;
}
.inactiveClass {
  color: #dd2025;
  font-weight: 600 !important;
}
.inactiveBgClass {
  background-color: rgba(255, 86, 86, 0.3);
  width: 80px;
  height: 30px;
  border-radius: 7px;
  padding: 5px 12px;
}
.activeClass {
  color: $color-17c079;
  font-weight: bold;
}

.inactiveClass {
  color: $color-ea6e39;
  font-weight: bold;
}
::v-deep .card {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.p-paginator-page {
  background: $color-357dea;
  border-radius: 5px;
}

::v-deep .p-datatable-row-expansion {
  background: #e1eaf9 !important;
}

::v-deep .p-datatable .p-datatable-sm .p-datatable-tbody > tr > td {
  font-family: $font-family-third;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  color: $color-4e5968;
  word-wrap: break-word !important;
  width: 0px !important;
}
::v-deep .p-column-title {
  font-family: $font-family-third;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left !important;
  color: $color-7e84a7;
}
::v-deep .p-datatable .p-paginator-bottom {
  margin-top: 30px !important;
  margin-bottom: 20px !important;
  background-color: transparent !important;
}
::v-deep .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
  background: $color-357dea;
  border-radius: 5px;
  color: $color-fff;
}
::v-deep .p-paginator .p-paginator-current {
  font-family: $font-family-third;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  color: $color-4e5968;
  position: absolute;
  left: 0;
}
::v-deep .p-paginator .p-dropdown {
  position: absolute;
  right: 0;
}
::v-deep .p-paginator-icon {
  background: $color-fff;
  border-radius: 5px;
  padding: 10px;
}
::v-deep .pi {
  font-size: 12px !important;
}
::v-deep .p-paginator {
  background: $color-edf1f7 !important;
}

::v-deep .p-paginator {
  background: $color-edf1f7 !important;
}
::v-deep .p-column-filter-menu {
  margin-left: 0;
}
::v-deep .p-datatable .p-datatable-thead > tr > th {
  background: $color-fff !important;
}
::v-deep thead.p-datatable-thead {
  background: $color-fff !important;
}
</style>
