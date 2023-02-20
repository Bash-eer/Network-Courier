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
    v-model:expandedRows="expandedRows"
    @rowExpand="onRowExpand"
    @rowUnselect="onRowUnselect"
    :paginator="false"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
    v-model:selection="rowSelect"
    @rowCollapse="onRowCollapse"
  >
    <!-- <div  v-if="tableName=='ClearanceAndAdditionalEdit'"   >
    <Column :expander="true" headerStyle="width: 1rem" class="expander" /></div> -->

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
        <span v-if="col.header == 'Actions'" class="mr-2">
          <CustomSpeedDial
            storePath="internationalInbound"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="getCustomSpeedDialData()"
            :apiKey="apiKey"
            :tableName="tableName"
          />
        </span>
        <!-- created by template -->
        <!-- created by template -->
       

        <span v-if="col.header == 'Weight'">
          {{ slotProps.data["weight"]}}
        </span>
        <span v-if="col.header == 'Rate (S$)'">
          {{ slotProps.data["rate"]}}
        </span>
         <span v-if="col.header == 'S. No'">
          {{ slotProps.data["sno"]}}
        </span>
        <!-- TEMPLATE : STATUS -->
        
        <!-- dateFormater on template -->
        
        <span
          v-if="
          col.header != 'S. No' &&
            col.header != 'Weight' &&
            col.header != 'Rate (S$)'
          "
          >{{ slotProps.data[col.field] }}</span
        ></template
      >
      <!--column-vise filtering-->
     
    </Column>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import CustomSpeedDial from "../../CustomSpeedDial.vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import {
  InternationalInboundSubOverlayData1,
  InternationalInboundSubOverlayData2,
  InternationalInboundSubOverlayData3,
  ClearanceModeClearanceAdditionalExpandedTableColumns,
} from "../../const";
// import ClearanceModeClearanceAdditionalExpandedTableColumns from "../../Outbound/Const/const"
// import ExpansionTable from"./ExpansionTable.vue"

export default {
  components: {
    DataTable,
    Column,
    CustomSpeedDial,
    // ExpansionTable,
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
      expandedRows: [],
      filters: null,
      header: ClearanceModeClearanceAdditionalExpandedTableColumns,
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
        case "surcharges":
          return InternationalInboundSubOverlayData1;
        case "questionnaires":
          return InternationalInboundSubOverlayData1;
        case "currencyExchanges":
          return InternationalInboundSubOverlayData2;
        case "Others":
          return InternationalInboundSubOverlayData2;
        case "GSTType":
          return InternationalInboundSubOverlayData3;
        case "AdditionalCharges":
          return InternationalInboundSubOverlayData2;
        case "StorageCharges":
          return InternationalInboundSubOverlayData2;
        case "OtherCharges":
          return InternationalInboundSubOverlayData2;
        case "ClearanceAndAdditionalEdit":
          return InternationalInboundSubOverlayData2;
        case "ClearanceEdit":
          return InternationalInboundSubOverlayData3;
        case "AdditionalRateEdit":
          return InternationalInboundSubOverlayData3;
      }
    },
  },
  created() {
    this.initilaizeFilters();
    // this.$store.dispatch("internationalInbound/loadClearanceandAditionalModeData", {
    //     path:
    //      " settings/salesSettinigs/rates/international/inbound/clearanceMode/modes/" +
    //       this.$store.state.internationalInbound?.clearanceAndAdditionalExpandModeData
    //         ?.id,
    //   })
    //   console.log("summmmaaa")
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

::v-deep .p-datatable-thead {
  font-size: 12px;
  font-weight: 600;
  color: #7e84a7;
}
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
.region-rates-table .p-datatable-header {
  padding: 0 !important;
}
</style>
