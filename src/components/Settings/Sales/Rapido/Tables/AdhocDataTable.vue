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
  >
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
    >
      <!--Body -->
      <template #body="slotProps">
        <span v-if="col.header == 'Actions'" class="mr-2">
          <CustomSpeedDials
            storePath="rapidoAdhoc"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="rapidoOverlayData"
            :tableName="tableName"
          />
        </span>

        <!-- created by template -->
        <span v-if="col.header == 'Created By'">
          {{ slotProps.data.user.display_name }}
        </span>
        <!-- dateFormater on template -->
        <span
          v-if="
            col.header == 'Created On' || col.header == 'Effective Date Range'
          "
        >
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>
        <span
          v-if="
            col.header != 'Created By' &&
            col.header != 'Actions' &&
            col.header != 'Created On' &&
            col.header != 'Effective Date Range'
          "
          >{{ slotProps.data[col.field] }}</span
        >
      </template>
    </Column>
  </DataTable>
</template>
<script>
import {FilterMatchMode, FilterOperator} from "primevue/api";
import CustomSpeedDials from "../Adhoc/CustomSpeedDial.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import {rapidoAdhocTableOverlayData} from "../const/const";
export default {
  components: {
    DataTable,
    Column,
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
        constraints: [{value: null, matchMode: FilterMatchMode.CONTAINS}],
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
