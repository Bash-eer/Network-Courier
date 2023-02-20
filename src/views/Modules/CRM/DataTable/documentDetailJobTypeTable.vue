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
      'document_details',
      'delivery_document',
      'return_document',
      'remarks',
    ]"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <Column
      v-for="col of selectedColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :filterField="col.field"
      :showFilterMenu="
        col.header != 'Actions' &&
        col.header != 'S. No' &&
        col.header != 'Return Trip Charge' &&
        col.header != 'Head Office Charge'
          ? true
          : false
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
            storePath="CrmSettings"
            tableName="crmSettingsDocumentDetailId"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="overlayDataPrompt"
            @emittedEditDocumentTable="emittedEditDocumentTable"
          />
        </span>
        <span v-if="col.header == 'S. No'">
          {{ slotProps.data["s_no"] }}
        </span>

        <span v-if="col.header == 'Documents Detail'">
          {{ slotProps.data["document_details"] }}
        </span>

        <span v-if="col.header == 'Delivery Doc'">
          {{ slotProps.data["delivery_document"] }}
        </span>

        <span v-if="col.header == 'Return Doc'">
          {{ slotProps.data["return_document"] }}
        </span>

        <span v-if="col.header == 'Return Trip Charge'" class="ml-6">
          {{ slotProps.data["return_trip_charge"] == true ? "Yes" : "No" }}
        </span>

        <span v-if="col.header == 'Remarks'">
          {{ slotProps.data["remarks"] }}
        </span>

        <span v-if="col.header == 'Head Office Charge'" class="ml-6">
          {{ slotProps.data["head_office_charge"] == true ? "Yes" : "No" }}
        </span>
      </template>

      <template #filter="{ filterModel }">
        <span
          v-if="
            col.header == 'Documents Detail' ||
            col.header == 'Delivery Doc' ||
            col.header == 'Return Doc' ||
            col.header == 'Remarks'
          "
        >
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="getFilterPlaceHolder(col.header)"
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
import { mapActions, mapGetters } from "vuex";
import CustomSpeedDial from "../../../../components/Reusables/CRM/CustomSpeedDial.vue";
import { documentDetailIdTableOverlayData } from "../../../../components/Reusables/CRM/Const";
import { FilterMatchMode, FilterOperator } from "primevue/api";

export default {
  name: "logisticsSettingsTable",
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
    "totalRecords",
  ],
  data() {
    return {
      overlayDataPrompt: documentDetailIdTableOverlayData,
      expandedRows: [],
      rowSelect: null,
      filters: null,
      sortField: "createdAt",
      sortOrder: "DESC",
      filteredItems: [],
      expandedData: [],
      selectedColumns: null,
    };
  },

  methods: {
    ...mapActions({
      loadSpecificFeedbackData: "CrmSettings/specificFeedbackData",
    }),
    getFilterPlaceHolder(placeholder) {
      return "Search by" + " " + placeholder;
    },
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

    emittedEditDocumentTable(data) {
      this.$emit("emittedEditDocumentParent", data);
    },
    initilaizeFilters() {
      this.filters = {
        document_details: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        delivery_document: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        return_document: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
        },
        remarks: {
          operator: FilterOperator.AND,
          constraints: [{ value: "", matchMode: FilterMatchMode.BETWEEN }],
        },
      };
      this.selectedColumns = this.tableColumns;
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
  },
  mounted() {
    this.initilaizeFilters();
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";

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
