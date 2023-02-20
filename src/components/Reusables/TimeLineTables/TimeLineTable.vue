<template>
  <DataTable
    :class="tableClass"
    id="TimeLineTable"
    :value="tableData"
    :rowClass="rowClass"
    dataKey="id"
  >
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
    >
      <template #body="slotProps">
        <span v-if="col.header == 'Actions'" class="mr-2">
          <CustomSpeedDial storePath="masters" :rowData="slotProps.data" />
        </span>

        <!-- DATES TEMPLATE -->
        <span v-if="col.header == 'Created On'">
          {{ dateFormater(slotProps.data[col.field]) }}
        </span>
        <!-- TIME TEMPLATE -->
        <span v-if="col.header == 'From'">{{
          timeParser(slotProps.data[col.field])
        }}</span>
        <span v-if="col.header == 'To' || col.field == 'pickup_cutoff_time'">{{
          timeParser(slotProps.data[col.field])
        }}</span>
        <span
          v-if="
            col.header != 'From' &&
            col.header != 'To' &&
            col.header != 'Created On' &&
            col.header != 'Actions' &&
            col.field != 'pickup_cutoff_time'
          "
          >{{ slotProps.data[col.field] || "-" }}</span
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
  name: "FormTable",
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
  ],
  data() {
    return {
      selectionMode: null,
    };
  },
  methods: {
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMM YYYY");
        return formattedDate;
      }
    },
    timeParser(data) {
      if (data == null) {
        return "-";
      } else {
        if(data=="Before"||data=="After"){
          return data;
        }
        var formattedDate = moment(data).format("HH:mm");

        if (formattedDate == "Invalid date") {
          return data.slice(0, 5);
        } else return formattedDate;
      }
    },
    rowClass() {
      return "TimeLineTableRows";
    },
  },
  components: { DataTable, Column },
  mounted() {
    var formRows = document.getElementsByClassName("TimeLineTableRows");
    for (let fr in formRows) {
      let fr_obj = formRows[fr];
      if (isNaN(fr_obj) == true) {
        fr_obj.id = "row" + "_" + fr;
        let p_tag = document.createElement("h2");
        let current_row = document.getElementById("row" + "_" + fr);
        if (current_row) {
          current_row.before(p_tag);
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.TimeLineTableRows {
  margin-top: 2% !important;
}
.TimeLineTable .p-datatable-tbody > tr:nth-child(odd) {
  height: 20px !important;
}
.TimeLineTable .p-datatable-tbody > tr {
  color: #495057;
  padding-bottom: 10rem !important;
  border-radius: 5px;
  outline: thin !important;
  outline-color: #cad1dd !important;
}
.TimeLineTable .p-datatable-tbody > tr {
  border: 6px !important;
}
:deep .TimeLineTable .p-column-title {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #7e84a7 !important;
}
.TimeLineTable .p-datatable-thead > tr {
  border-radius: 5px;
  outline: thin !important;
  //   outline-style: so !important;
  outline-color: #edf1f7 !important;
}
.TimeLineTable .p-datatable-thead > tr > th {
  background: #f3f7ff !important;
  box-shadow: none;
  border: none !important;
}
.expressRatesTripsTable .p-datatable-thead > tr > th {
  background: #e1eaf9 !important;
  box-shadow: none;
  border: none !important;
}
.expressRatesTripsTable .p-column-title {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #7e84a7;
}
.expressRatesTripsTable .p-datatable-tbody > tr {
  border-radius: 6px !important;
  outline: thin !important;
  outline-style: solid !important;
  outline-color: white !important;
}
.expressRatesTripsTable .p-datatable-tbody > tr > td {
  border-bottom: #ffff !important;
}
</style>
