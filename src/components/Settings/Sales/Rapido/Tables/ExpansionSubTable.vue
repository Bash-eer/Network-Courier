<template>
  <DataTable
    :class="'Table expansionTable'"
    id="formTable"
    :value="tableData"
    :rowClass="rowClass"
    :dataKey="dataKey"
    filterDisplay="menu"
  >
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
    >
      <template #body="slotProps">
        <!-- TEMPLATE : ACTIONS -->
        <span v-if="col.header == 'Actions'" class="mr-2">
          <CustomSpeedDials
            storePath="rapidoAdhoc"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="OverlayData"
            :tableName="tableName"
          />
        </span>
        <!-- DATES TEMPLATE -->

        <span v-if="col.header == 'From' || col.header == 'To'">
          {{ TimeFormater(slotProps.data[col.field]) }}
        </span>

        <!-- DATES TEMPLATE -->

        <span v-if="col.header == 'Created On'">
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>
        <span
          v-if="
            col.header != 'Actions' &&
            col.header != 'Created On' &&
            col.header != 'From' &&
            col.header != 'To'
          "
          >{{ slotProps.data[col.field] }}</span
        >
        <span v-if="col.header == 'Weight (Kg)'" class="mr-2">
          {{
            slotProps.data["min_weight"] + "-" + slotProps.data["max_weight"]
          }}
        </span>
        <span
          v-if="
            col.header == 'Measurements (Cm)' ||
            col.header == 'Measurement (Cm)' ||
            col.header == 'Measurement (Kg)'
          "
          class="mr-2"
        >
          {{
            slotProps.data["min_length"] + "-" + slotProps.data["max_length"]
          }}
        </span>
      </template>
    </Column>
  </DataTable>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import CustomSpeedDials from "../Adhoc/CustomSpeedDial.vue";
import { rapidoEcommerceOverlayData } from "../const/const";
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
      OverlayData: rapidoEcommerceOverlayData,
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
        var formattedDate = moment(data).format("HH:mm");
        return formattedDate;
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
</style>
