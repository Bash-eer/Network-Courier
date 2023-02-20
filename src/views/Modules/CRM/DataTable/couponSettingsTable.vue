<template>
  <DataTable
    :loading="$store.state['CrmSettings'].tableLoad"
    :class="tableClass"
    :showGridlines="false"
    :stripedRows="true"
    selectionMode="single"
    :dataKey="dataKey"
    responsiveLayout="scroll"
    :value="tableData"
    :paginator="true"
    v-model:expandedRows="expandedRows"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
    :totalRecords="totalRecords"
    :rows="10"
    v-model:filters="filters"
    filterDisplay="menu"
    :globalFilterFields="[
      'feedback_type',
      'feedback_subtype',
      'user.display_name',
      'createdAt',
    ]"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >

    <Column :expander="true" headerStyle="width: 1rem" />
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
        <span
          v-if="col.header == 'Actions'"
          class="flex align-items-center mr-2"
        >
          <CustomSpeedDial
            storePath="CrmFeedbackSettings"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="processOverlayData(overlayData, slotProps.data)"
          />
        </span>

        <span v-if="col.header == 'S. No'" >
          {{ slotProps.data["s_no"] }}
        </span>

        <span v-if="col.header == 'Feedback Type'" class="mr-2">
          {{ slotProps.data["feedback_type"] }}
        </span>

        <span v-if="col.header == 'Sub Types'" class="mr-2">
          {{ slotProps.data["feedback_subtype"] }}
        </span>

        <span v-if="col.header == 'Created By'" class="mb-1 mr-3">
          {{ slotProps.data["user"]["display_name"] }}
        </span>

        <span v-if="col.header == 'Created On'">
          {{ dateFormater(slotProps.data["createdAt"]) }}
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
    <template #expansion="slotProps">
      <div class="flex align-items-center flex-row">
        <div
          class="expansion-container ml-2"
          v-for="(item, index) of expandedData"
          :key="index"
        >
          <Chip :label="item" class="mb-2" :dataKey="slotProps.data.id" />
        </div>
      </div>
    </template>
    <template #empty> No data found </template>
  </DataTable>

</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
// import CustomSpeedDial from "../DataTable/customSpeedDial.vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import InputText from "primevue/inputtext";
import { mapActions, mapGetters } from "vuex";
import Chip from "primevue/chip";

export default {
  name: "couponSettingsTable",
  components: {
    DataTable,
    Column,
    // CustomSpeedDial,
    InputText,
    Chip,
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
    "totalRecords",
  ],
  data() {
    return {
      expandedRows: [],
      rowSelect: null,
      filters: null,
      sortField: "createdAt",
      sortOrder: "DESC",
      filteredItems: [],
      expandedData: [],
    };
  },

  methods: {
    ...mapActions({
      loadSpecificFeedbackData: "CrmSettings/specificFeedbackData",
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
      return data;
    },
    initilaizeFilters() {
      this.filters = {
        feedback_type: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        feedback_subtype: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        "user.display_name": {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        createdAt: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.BETWEEN }],
        },
      };
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
      let feedbackSettingParams = {
        id: event.data.id,
      };
      const subTypeResponse = await this.loadSpecificFeedbackData(
        feedbackSettingParams
      );

      if (subTypeResponse && subTypeResponse.status === 200) {
        let expandedData = subTypeResponse.data?.results.feedback_subtype || [];
        this.isMoreData = expandedData.length > 5 ? true : false;
        this.expandedData = expandedData.map((res, index) => {
          return res.sub_type;
        });
      }
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
::v-deep .p-chip {
  background-color: #7e84a7;
  color: #ffffff;
  border-radius: 4px;
}
</style>
