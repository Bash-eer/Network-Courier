<template>
  <DataTable
    :loading="$store.state['operationZones'].tableLoad"
    :class="tableClass"
    :showGridlines="false"
    :stripedRows="true"
    :rowClass="rowClass"
    selectionMode="single"
    @rowSelect="onRowExpand"
    @rowUnselect="onRowUnselect"
    v-model:selection="rowSelect"
    :dataKey="dataKey"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
    responsiveLayout="scroll"
    :value="tableData"
    :lazy="true"
    :paginator="true"
    @page="onChangePage($event)"
    @sort="onSort($event)"
    @filter="onFilter($event)"
    :totalRecords="totalRecords"
    :rows="$store.state['operationZones'].pageLimit"
    v-model:filters="filters"
    filterDisplay="menu"
    :globalFilterFields="[
      'zone_name',
      'zone_tag',
      'user.display_name',
      'createdAt',
      'status',
    ]"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <template #header>
      <div style="text-align: left">
        <MultiSelect
          :modelValue="selectedColumns"
          :options="tableColumns"
          optionLabel="header"
          @update:modelValue="onToggle"
          placeholder="Select Columns"
          :filter="true"
          style="width: 20em"
        />
      </div>
    </template>
    <Column
      :expander="true"
      headerStyle="width: 1rem"
      @click="clickColumn(col)"
    />
    <Column
      v-for="col of selectedColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :showFilterMenu="
        col.header != 'Actions' && col.header != 'S. No' ? true : false
      "
      :sortable="col.header != 'Actions' ? true : false"
    >
      <template #body="slotProps">
        <span v-if="col.header == 'Actions'" class="mr-2">
          <CustomSpeedDials
            storePath="operationZones"
            :dataName="tableDataName"
            :tabPageOffset="tabPageOffset"
            :rowData="slotProps.data"
            :currentTab="currentTab"
            :customDialData="processOverlayData(overlayData, slotProps.data)"
          />
        </span>

        <span v-if="col.header == 'S. No'">
          {{ slotProps.data?.s_no }}
        </span>

        <span v-if="col.header == 'Zone Name'" class="mr-2">
          {{ slotProps.data?.zone_name || "-" }}
        </span>

        <span v-if="col.header == 'Zone Tag'" class="mr-2">
          {{ slotProps.data?.zone_tag || "-" }}
        </span>

        <span v-if="col.header == 'Created By'" class="mb-1 mr-3">
          {{ slotProps.data?.user?.display_name || "-" }}
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
            :placeholder="getPlaceholder(col.header)"
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
      <template #filterclear="{ filterCallback }">
        <Button
          label="Clear"
          class="p-button-outlined"
          @click="
            clearFilter(col.field);
            filterCallback();
          "
        ></Button>
      </template>
      <template #filterapply="{ filterCallback }">
        <Button
          label="Apply"
          class="p-button-sm"
          @click="filterCallback()"
        ></Button>
      </template>
    </Column>
    <template #empty> No data found </template>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import CustomSpeedDials from "./CustomSpeedDial.vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import InputText from "primevue/inputtext";
import { mapActions, mapGetters } from "vuex";
import { orderBy } from "lodash";
import MultiSelect from "primevue/multiselect";
import Button from "primevue/button";

export default {
  name: "ZoneTables",
  components: {
    DataTable,
    Column,
    CustomSpeedDials,
    InputText,
    MultiSelect,
    Button,
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
    };
  },

  methods: {
    ...mapActions({
      vanDataFetch: "operationZones/loadVanTableData",
      rapidoDataFetch: "operationZones/loadRapidoTableData",
      bikeDataFetch: "operationZones/loadBikeTableData",
      updatePageParams: "operationZones/updatePageOffsetLimit",
    }),

    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM, YYYY");
        return formattedDate;
      }
    },
    processOverlayData(data, row) {
      data.currentTab = this.currentTab;
      return data;
    },
    initilaizeFilters() {
      this.filters = {
        zone_name: {
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        zone_tag: {
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        "user.display_name": {
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        createdAt: {
          constraints: [{ value: "", matchMode: FilterMatchMode.BETWEEN }],
        },
        status: {
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
      };
      let permanentTablelColumns = JSON.parse(
        localStorage.getItem("zoneColumns")
      );
      this.selectedColumns = permanentTablelColumns || this.tableColumns;
    },
    onRowExpand(event) {
      let path =
        this.currentTab == "VanTab"
          ? "Van"
          : this.currentTab == "RapidoTab"
          ? "Rapido"
          : "Bike";
      this.$store.state.operationZonesRoute.zoneName = event.data.zone_name;
      this.$store.state.operationZonesRoute.currentPath = this.currentTab;
      this.$store.state.operationZonesRoute.path = path;
      this.$store.state.operationZonesRoute.zoneId = event.data?.id;
      this.$router.push({
        name: "zoneRouteoperations",
        params: {
          id: event.data?.id,
          zoneName: event.data.zone_name,
          tab: path,
        },
      });
    },
    async onChangePage(event) {
      this.pageOffset = event.page + 1;
      this.pageLimit = event.rows;
      let pageParams = {
        offset: event.page + 1,
        limit: event.rows,
        tabOfPageOffset: this.tabPageOffset,
      };
      await this.updatePageParams(pageParams);
      let paginationParams = {
        offset: event.page + 1,
        limit: event.rows,
        orderBy: [this.sortField, this.sortOrder],
        filter_params: this.filteredItems,
      };
      this.$store.state.operationZones.tableLoad = true;
      this.commonPageChangeLoad(paginationParams);
    },
    onSort(event) {
      this.sortField =
        event.sortField == "s_no" ? "createdAt" : event.sortField;
      this.sortOrder = event.sortOrder == 1 ? "DESC" : "ASC";
      let filteredEvents = event.filters;
      this.setFilterData(filteredEvents);
    },
    onFilter(event) {
      let filteredEvents = event.filters;
      this.filteredItems = [];
      this.setFilterData(filteredEvents);
    },
    clearFilter(event) {
      this.filters[event]["constraints"][0]["value"] = "";
      return false;
    },
    async setFilterData(filteredEvents) {
      await this.filterParams.map((res) => {
        let columnName =
          res.column_name == "display_name"
            ? "user.display_name"
            : res.column_name;

        if (
          res.column_name &&
          filteredEvents[columnName]["constraints"][0]["value"]
        ) {
          let searchKey = filteredEvents[columnName]["constraints"][0]["value"];

          if (res.column_name == "createdAt") {
            if (
              filteredEvents[columnName]["constraints"][0]["value"].length > 0
            ) {
              let date1 =
                filteredEvents[columnName]["constraints"][0]["value"][0];
              let date2 =
                filteredEvents[columnName]["constraints"][0]["value"][1];
              let utcDate1 = moment(date1)
                .set({ hour: 0, minutes: 0 })
                .toISOString();
              let utcDate2 = moment(date2)
                .set({ hour: 0, minutes: 0 })
                .toISOString();
              searchKey = [utcDate1, utcDate2];
            } else {
              searchKey = [];
            }
          }

          let filterObject = {
            column_name: res.column_name,
            type:
              res.column_name == "createdAt"
                ? "dateRange"
                : filteredEvents[columnName]["constraints"][0]["matchMode"],
            searchKey: searchKey,
          };
          this.filteredItems.push(filterObject);
          return res;
        }
      });
      let sortFieldArray =
        this.sortField == "user.display_name"
          ? ["user", "display_name"]
          : [this.sortField];
      let orderBy = sortFieldArray.concat([this.sortOrder]);
      let paginationParams = {
        offset: this.pageOffset,
        limit: this.pageLimit,
        orderBy: orderBy,
        filter_params: this.filteredItems,
      };
      this.$store.state.operationZones.tableLoad = true;
      this.commonPageChangeLoad(paginationParams);
    },

    commonPageChangeLoad(paginationParams) {
      if (this.currentTab == "VanTab") {
        this.vanDataFetch(paginationParams);
      } else if (this.currentTab == "RapidoTab") {
        this.rapidoDataFetch(paginationParams);
      } else {
        this.bikeDataFetch(paginationParams);
      }
    },
    getPlaceholder(heads){
      return `Search by ${heads}`
    },
    onToggle(value) {
      localStorage.setItem("zoneColumns", JSON.stringify(value));
      this.selectedColumns = this.tableColumns.filter((col) =>
        value.includes(col)
      );
    },
  },
  mounted() {
    this.initilaizeFilters();
  },
  computed: {
    ...mapGetters({
      filterParams: "operationZones/getFilterParams",
      pageOffset: "operationZones/getPageOffset",
      pageLimit: "operationZones/getPageLimit",
    }),
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
