<template>
  <br />
  <DataTable
    :class="'Table expansionTable'"
    id="formTable"
    :value="tableData"
    :rowClass="rowClass"
    :dataKey="dataKey"
    filterDisplay="menu"
    v-model:expandedRows="expandedRows"
    @rowCollapse="onRowCollapse"
    @rowExpand="onRowExpand"
  >
    <Column
      :expander="tableName == 'Bike' || tableName == 'Van' ? true : false"
      headerStyle="width: 1rem"
      class="expander"
    />
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :showFilterMenu="
        col.header != 'Actions' &&
        col.header != 'S. No' &&
        col.header != 'S.No.'
          ? true
          : false
      "
      :sortable="col.header != 'Actions' ? true : false"
    >
      <template #body="slotProps">
        <!-- TEMPLATE : ACTIONS -->
        <span v-if="col.header == 'Actions'" class="mr-2">
          <CustomSpeedDials
            storePath="expressContract"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="overlayData"
            :tableName="tableName"
          />
        </span>
        <!--TEMPLATE : MINMAX WEIGHT-->

        <span v-if="col.header == 'Weight (Kg)'" class="mr-2">
          {{ slotProps.data["min_weight"] }} -
          {{ slotProps.data["max_weight"] }}
        </span>
        <!-- DATES TEMPLATE -->

        <span v-if="col.header == 'From' || col.header == 'To'">
          {{ TimeFormater(slotProps.data[col.field]) }}
        </span>

        <!-- DATES TEMPLATE -->

        <span v-if="col.header == 'Created On' || col.header == 'Cutoff Time'">
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>
        <!--Effective Date Range-->

        <span v-if="col.header == 'Effective Date Range'">
          {{ dateFormater(slotProps.data["createdAt"]) }} -
          {{ dateFormater(slotProps.data["updatedAt"]) }}
        </span>
        <span
          v-if="
            col.header != 'Actions' &&
            col.header != 'Created On' &&
            col.header != 'From' &&
            col.header != 'To' &&
            col.header != 'Cutoff Time' &&
            col.header != 'Weight (Kg)'
          "
          >{{ slotProps.data[col.field] }}</span
        >
      </template>
    </Column>
    <!--Expanded row content -->
    <template
      v-if="tableName == 'Bike' || tableName == 'Van'"
      #expansion="slotProps"
    >
      <ZoneTripsExpansionTemplate :data="slotProps.data.deliveries[0]" />

      <span class="p-3"> </span>
    </template>
  </DataTable>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import CustomSpeedDials from "../CustomSpeedDial.vue";
import ZoneTripsExpansionTemplate from "./ZonesExpansionTemplate.vue";
// import {express_adhoc_zones_sub_tablecolumndata} from "../Const/const"
export default {
  components: {
    DataTable,
    Column,
    CustomSpeedDials,
    ZoneTripsExpansionTemplate,
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
    };
  },
  methods: {
    rowClass() {
      return "formRows";
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMM, YYYY");
        return formattedDate;
      }
    },

    TimeFormater(data) {
      if (data == null) {
        return "-";
      } else {
        //❌ do not add .utc() in the below line, ref: keerthana
        var formattedDate = moment(data).format("HH:mm");

        if (formattedDate == "Invalid date") {
          return data.slice(0, 5);
        } else return formattedDate;
      }
    },
  },

  mounted() {
    var formRows = document.getElementsByClassName("formRows");
    for (let fr in formRows) {
      let fr_obj = formRows[fr];
      if (isNaN(fr_obj) == true) {
        fr_obj.id = "row" + "_" + fr;
        let h_tag = document.createElement("h2");
        let p_tag = document.createElement("p");
        let current_row = document.getElementById("row" + "_" + fr);
        if (current_row) {
          current_row.before(h_tag);
          current_row.before(p_tag);
        }
      }
    }
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
::v-deep
  .p-datatable.p-datatable-hoverable-rows
  .p-datatable-tbody
  > tr:not(.p-highlight):hover {
  background-color: #fff !important;
}
::v-deep .p-datatable-thead > tr > th {
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
</style>
