<template>
  <DataTable
    :loading="$store.state['operationsStatusSettings'].tableLoad"
    :class="tableClass"
    :showGridlines="false"
    :stripedRows="true"
    selectionMode="single"
    :dataKey="dataKey"
    responsiveLayout="scroll"
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
            storePath="operationsStatusSettings"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :currentTab="currentTab"
            :customDialData="processOverlayData(overlayData, slotProps.data)"
          />
        </span>

        <span v-if="col.header == 'S. No'">
          {{ slotProps.data?.s_no }}
        </span>

        <span v-if="col.header == 'Status Name'" class="mr-2">
          {{ slotProps.data?.status_name || "-" }}
        </span>

        <span v-if="col.header == 'Created By'" class="mb-1 mr-3">
          {{ slotProps.data?.statusSettings?.display_name || "-" }}
        </span>

        <span v-if="col.header == 'Created On'">
          {{ dateFormater(slotProps.data["createdAt"]) }}
        </span>

        <span v-if="col.header == 'Status'">
          <span
            :class="
              slotProps.data['status'] == ('Active' || 'active')
                ? 'activeBgClass'
                : 'inactiveBgClass'
            "
          >
            <span
              :class="
                slotProps.data['status'] == ('Active' || 'active')
                  ? 'activeClass'
                  : 'inactiveClass'
              "
              >{{ slotProps.data?.status }}</span
            >
          </span>
        </span>
      </template>

      <template #filter="{ filterModel }">
        <span v-if="col.header !== 'Created On'">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            placeholder="Search by name"
          />
        </span>
        <span v-if="col.header == 'Created On'">
          <p class="mb-2"><b>Set a date range:</b></p>
          <Calendars
            :state="filterModel.value"
            v-model="filterModel.value"
            dateFormat="mm/dd/yy"
            placeholder="mm/dd/yyyy"
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
import CustomSpeedDial from "./customSpeedDial.vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import InputText from "primevue/inputtext";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "StatusSettingsTable",
  components: {
    DataTable,
    Column,
    CustomSpeedDial,
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
    };
  },

  methods: {
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM, YYYY");
        return formattedDate;
      }
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
