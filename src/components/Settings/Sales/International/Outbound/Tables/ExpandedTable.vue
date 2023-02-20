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
    selectionMode="single"
    :rows="10"
  >
    <template #empty><div class="p-3">No data found.</div></template>

    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :sortable="col.header != 'Actions' ? true : false"
      :showFilterMenu="
        col.header != 'Actions' &&
        col.header != 'S. No' &&
        col.header != 'S.No.'
          ? true
          : false
      "
      :showFilterMatchModes="col.header == 'Created On' ? false : true"
    >
      <template #body="slotProps">
        <!-- created by template -->
        <div v-if="col.header == 'Rate Cards'" class="rate-cards">
          {{ slotProps.data.rate_card_name }}
          <span v-if="slotProps.data.default" class="ml-2 rate-default-badge"
            >Defualt</span
          >
        </div>

        <span v-else-if="col.header == 'Status'" class="mr-2">
          <span
            :class="
              slotProps.data[col.field] == 'private'
                ? 'activeClass'
                : 'inactiveClass'
            "
            >{{
              slotProps.data[col.field] == true ? "Private" : "Public"
            }}</span
          >
        </span>

        <div v-if="col.header == 'Type'">
          <div class="rate-type-badge rate-type-wrapper">
            <img src="@/assets/airplane.png" alt="img" />
            <span class="ml-2">{{ slotProps.data.rate_card_type }}</span>
          </div>
        </div>

        <div v-if="col.header == 'Shipping Type'">
          <span
            :class="
              slotProps.data.shipping_type === 'Export'
                ? 'exp-color'
                : 'imp-color'
            "
            >{{ slotProps.data.shipping_type }}</span
          >
        </div>

        <span v-if="col.header == 'Actions'" class="mr-2">
          <CustomSpeedDial
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="getCustomSpeedDialData()"
            :apiKey="apiKey"
            :tableName="tableName"
          />
        </span>
      </template>
    </Column>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import CustomSpeedDial from "../../CustomSpeedDial.vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { outBoundExpandedTableActions } from "../Const/const";

export default {
  components: {
    DataTable,
    Column,
    CustomSpeedDial,
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
  ],
  data() {
    return {
      filters: null,
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
    getCustomSpeedDialData() {
      switch (this.tableName) {
        case "outBoundExpandedTable":
          return outBoundExpandedTableActions;
      }
    },
  },
  created() {
    this.initilaizeFilters();
  },

  watch: {
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

::v-deep .card {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.p-paginator-page {
  background: #357dea;
  border-radius: 5px;
}

::v-deep .p-datatable-row-expansion {
  background: rgba(197, 220, 255, 0.62) !important;
}

:deep .p-datatable-thead > tr > th {
  padding: 1rem 0.5rem !important;
  background-color: unset !important;

  &:hover {
    background-color: unset !important;
  }
}

:deep .p-datatable-tbody > tr > td {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  color: #357dea !important;
  word-wrap: break-word !important;
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
  background: #fff5d8;
  color: #E48D1E;
  opacity: 0.75;
  border-radius: 3.5px;
  padding: 6px 9px;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.3px;
}

.rate-type-wrapper {
  width: 80px !important;
}

.exp-color {
  color: #e48d1e !important;
  font-weight: 700;
  font-size: 14px;
}

.imp-color {
  color: #17c079 !important;
  font-weight: 700;
  font-size: 14px;
}

.rate-type-badge {
  background: rgba(116, 105, 242, 0.15);
  color: #7469f2;
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
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
</style>
