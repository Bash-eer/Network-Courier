<template>
  <DataTable
    :class="'Table expansionTable'"
    :showGridlines="false"
    :stripedRows="true"
    :rowClass="rowClass"
    :dataKey="dataKey"
    responsiveLayout="scroll"
    :value="tableData"
    :globalFilterFields="getGlobalFields()"
    v-model:expandedRows="expandedRows"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
  >
    <Column
      :expander="true"
      v-if="tableName != 'surcharges' && tableName != 'additionalSurcharges'"
      headerStyle="width: 1rem"
      class="expander"
    />
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
    >
      <!--Body -->
      <template #body="slotProps">
        <span v-if="col.header == 'Actions'" class="mr-2">
          <span
            v-if="
              tableName == 'onDemandService' ||
              tableName == 'surcharges' ||
              tableName == 'additionalSurcharges'
            "
          >
            <CustomSpeedDials
              storePath="rapidoContract"
              :dataName="tableDataName"
              :rowData="slotProps.data"
              :customDialData="rapidoOverlayData"
              :tableName="tableName"
            />
          </span>
          <span v-else>
            <CustomSpeedDials
              storePath="rapidoContract"
              :dataName="tableDataName"
              :rowData="slotProps.data"
              :customDialData="overlayData"
              :tableName="tableName"
            />
          </span>
        </span>

        <span v-if="col.header == 'Cut off Time'">
          {{ timeFormater(slotProps.data[col.field]) }}
        </span>
        <span v-if="col.header == 'Additional Charge (Every 10 Kg)'">
          <span v-if="slotProps.data[col.field] == null" class="mx-5">-</span>
          <span v-else>{{ slotProps.data[col.field] }}</span>
        </span>
        <span v-if="col.header == 'Weight Range'">
          {{ slotProps.data["min_weight"] }}-{{ slotProps.data["max_weight"] }}
        </span>
        <!-- dateFormater on template -->
        <span v-if="col.header == 'Created On'">
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>
        <!-- created by template -->
        <span v-if="col.header == 'Created By'">
          {{ slotProps.data.user?.display_name }}
        </span>
        <span
          v-if="
            col.header != 'Created By' &&
            col.header != 'Actions' &&
            col.header != 'Created On' &&
            col.header != 'Cut off Time' &&
            col.header != 'Additional Charge (Every 10 Kg)' &&
            col.header != 'Weight Range'
          "
          >{{ slotProps.data[col.field] }}</span
        >
      </template>
    </Column>
    <!-- :tableData="slotProps.data["rates"]"-->
    <template #expansion="slotProps" v-if="tableName != 'onDemandService'">
      <!-- {{slotProps.data['rates']}}  -->
      <ExpansionSubTable
        tableName="RapidoContractExpansionSubDataTable"
        :tableData="slotProps.data['rates']"
        :tableColumns="tableColumnsData"
      />
    </template>
  </DataTable>
</template>

<script>
import { FilterMatchMode, FilterOperator } from "primevue/api";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import CustomSpeedDials from "../Adhoc/CustomSpeedDial.vue";
import ExpansionSubTable from "./ExpansionSubTable.vue";
import {
  RapidoContractType1Type2SubTableColumnData,
  onDemandServiceSubTableColumnData,
  rapidoAdhocTableOverlayData,
} from "../const/const";

export default {
  components: {
    DataTable,
    Column,
    ExpansionSubTable,
    CustomSpeedDials,
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
  ],
  data() {
    return {
      expandedRows: [],
      rowSelect: null,
      filters: null,
      searcher: "",
      tableColumnsData: RapidoContractType1Type2SubTableColumnData,
      onDemandColumnData: onDemandServiceSubTableColumnData,
      rapidoOverlayData: rapidoAdhocTableOverlayData,
    };
  },
  methods: {
    getBackgroundColor(color, bgColor) {
      return {
        color: color,
        "background-color": bgColor,
      };
    },
    timeFormater(data) {
      if (!data) return "-";
      let date = moment(data).format("HH:mm");

      if (date === "Invalid date") {
        return data;
      } else {
        return date;
      }
    },
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
    globalSearcher(label, searchString) {
      this.$store.state["contacts"].globalSearch = searchString;
    },
  },
  created() {
    this.initilaizeFilters();
  },

  watch: {
    "$store.state.contacts.globalSearch": function () {
      this.filters["global"].value = this.$store.state["contacts"].globalSearch;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";

::v-deep .p-paginator {
  background: #edf1f7 !important;
  border: 0 !important;
  width: 100% !important;
}
::v-deep .p-column-filter {
  margin-left: 0px !important ;
  color: #7e84a7 !important;
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

.activeClass {
  color: #17c079;
  font-weight: bold;
}

.inactiveClass {
  color: #ea6e39;
  font-weight: bold;
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
.p-paginator-page {
  background: #357dea;
  border-radius: 5px;
}
::v-deep .p-datatable .p-sortable-column .p-sortable-column-icon {
  font-size: unset !important;
}
</style>
