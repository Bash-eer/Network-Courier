<template>
  <DataTable
    :class="tableClass"
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
      :sortable="true"
    >
      <template #body="slotProps">
        <!-- ACTIONS TEMPLATE-->
        <span v-if="col.header == 'Actions'" class="mr-2">
          <CustomSpeedDial
            storePath="contacts"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="overlayData"
          />
        </span>
        <!-- DATES TEMPLATE -->
        <span v-if="col.header == 'Created On'">
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>
        <!-- TEMPLATE : STATUS -->
        <span v-if="col.header == 'Status'" class="mr-2">
          <span
            :class="
              slotProps.data[col.field] == True ||
              slotProps.data[col.field] == true
                ? 'activeClass'
                : 'inactiveClass'
            "
            >{{
              slotProps.data[col.field] == True ||
              slotProps.data[col.field] == true
                ? "Active"
                : "Sold"
            }}</span
          >
        </span>
        <span
          v-if="
            col.header != 'Created On' &&
            col.header != 'Actions' &&
            col.header != 'Status'
          "
          >{{ slotProps.data[col.field] }}</span
        >
      </template>
    </Column>
  </DataTable>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
export default {
  name: "ContactSubTables",
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
    return {};
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
    timeParser(time) {
      let hours = time.getHours();
      let minutes = time.getMinutes();
      let parsed_time = hours + ":" + minutes;
      return parsed_time;
    },
    rowClass() {
      return "formRows";
    },
  },
  components: { DataTable, Column },
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
.status-Active {
  color: #17C079;
  font-weight: bold;
}
.status-Inactive {
  color: #EA6E39;
  font-weight: bold;
}
.status-Deleted {
  color: #C01717;
  font-weight: bold;
}
.activeClass {
  color: #17C079;
  font-weight: bold;
}
.deletedClass {
  color: #C01717;
  font-weight: bold;
}
.inactiveClass {
  color: #EA6E39;
  font-weight: bold;
}
.no_data {
  text-align: center;
  font-weight: bold;
}
.subGroupsTable .p-datatable-tbody > tr:not(.p-highlight):hover {
  background-color: #FFFFFF !important;
  border-bottom-color: #ffff !important;
}
.formRows {
  margin-top: 2% !important;
}
.subGroupsTable .p-datatable-tbody > tr:nth-child(odd) {
  height: 20px !important;
}
.subGroupsTable .p-datatable-tbody > tr {
  color: #495057;
  padding-bottom: 10rem !important;
  outline: thin !important;
  outline-style: solid !important;
  outline-color: #FFFFFF !important;
  border-radius: 6px;
  border-bottom-color: #F0F0FF !important;
}
.subGroupsTable .p-datatable-tbody > tr > td {
  border: 0px !important;
}
.subGroupsTable .p-column-title {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #7E84A7;
}
.subGroupsTable .p-datatable-thead > tr {
  border-radius: 5px;
  outline: thin !important;
  outline-color: #EDF1F7 !important;
}
.subGroupsTable .p-datatable-thead > tr > th {
  background: transparent !important;
  border: 0px !important;
}
</style>
