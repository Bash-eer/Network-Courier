<template>
  <DataTable
    class="p-datatable-sm editable-cells-table formTable"
    id="formTable"
    :value="tableData"
    :rowClass="rowClass"
    v-model:selection="selectedRow"
    :dataKey="dataKey"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    @row-select-all="selectAllRows"
    @row-unselect-all="unSelectAllRows"
    @cell-edit-complete="onCellEditComplete"
    editMode="cell"
  >
    <Column selectionMode="multiple" headerStyle="width: 1em"></Column>
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :style="getColumnWidth(col.header)"
    >
    </Column>
  </DataTable>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
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
    "dataKey",
    "selectionModeState",
    "formTableDataName",
  ],
  components: {
    DataTable,
    Column,
  },
  data() {
    return {
      editingRows: [],
      expandedRows: [],
      invalidField: [],
      editedData: {},
      selectedRow: null,
    };
  },
  watch: {
    selectedRow() {
      let data = [];

      this.selectedRow.map((list) => {
        data.push({
          size_name: list.size_name,
          min_weight_kg: list.min_weight,
          max_weight_kg: list.max_weight,
          min_measure_kg: list.min_length,
          max_measure_kg: list.max_length,
          rates: list.rate,
        });
      });

      this.setRapidoContractData({
        key: "quotation",
        value: {
          delivery_type: [
            {
              delivery_type: "Next day delivery",
              initial: "ND",
              selected: true,
              rates: data,
            },
          ],
        },
      });
    },
    tableData() {
      if (this.tableData) {
        this.invalidField = [];

        this.tableData.map((list, idx) => {
          this.invalidField.push({});
          Object.keys(list).map((key) => {
            this.invalidField[idx][key] = false;
          });
        });
      }
    },
  },
  computed: {
    ...mapGetters({
      quotationData: "salesRapidoContract/Contract/quotationData",
    }),
  },
  methods: {
    ...mapActions({
      setRapidoContractData:
        "salesRapidoContract/Contract/setRapidoContractData",
    }),
    getColumnWidth(key) {
      let style;
      switch (key) {
        case "Feedback":
          style = "max-width:120px";
          break;
        case "Checked":
          style = "width:25%";
          break;
      }
      return style;
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM YYYY");
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
    getUserInput(event, data) {
      //   if (!data[event]) {
      //     this.invalidField[data.sl_no][event] = true;
      //   } else if (data["max_weight"] <= data["min_weight"]) {
      //     this.invalidField[data.sl_no]["max_weight"] = true;
      //   } else {
      //     this.invalidField[data.sl_no][event] = false;
      //     this.invalidField[data.sl_no]["max_weight"] = false;
      //   }

      if (data[event] && !!data[event]) this.editedData[event] = data[event];
    },
    onRowEditCancel(event) {
      let obj = this.invalidField[event.newData.sl_no];

      Object.keys(obj).map((key) => {
        obj[key] = false;
      });
    },
    onCellEditComplete(event) {
      //   let isValid;
      //   let obj = this.invalidField[event.newData.sl_no];
      //   Object.keys(obj).map((key) => {
      //     if (obj[key] === true) {
      //       isValid = false;
      //       return;
      //     }
      //   });
      let { data, newValue, field } = event;

      if (field == "weight") {
        let maxWeight = this.editedData["max_weight"] || data["max_weight"];
        let minWeight = this.editedData["min_weight"] || data["min_weight"];

        data["weight"] = minWeight + " - " + maxWeight;
        data["min_weight"] = minWeight;
        data["max_weight"] = maxWeight;
        return;
      }

      if (field == "measurment") {
        let maxLength = this.editedData["max_length"] || data["max_length"];
        let minLength = this.editedData["min_length"] || data["min_length"];

        data["measurment"] = minLength + " - " + maxLength;
        data["min_length"] = minLength;
        data["max_length"] = maxLength;
        return;
      }
      data[field] = newValue;
    },
  },
  mounted() {
    var formRows = document.getElementsByClassName("formRows");
    for (let fr in formRows) {
      let fr_obj = formRows[fr];
      if (isNaN(fr_obj) == true) {
        fr_obj.id = "row" + "_" + fr;
        let p_tag = document.createElement("h2");
        let current_row = document.getElementById("row" + "_" + fr);
        if (current_row) {
          current_row.setAttribute("style", "padding:3%");
          current_row.before(p_tag);
        }
      }
    }
  },
  created() {
    if (this.tableData) {
      this.invalidField = [];

      this.tableData.map((list, idx) => {
        this.invalidField.push({});
        Object.keys(list).map((key) => {
          this.invalidField[idx][key] = false;
        });
      });

      if (
        this.quotationData &&
        this.$props.formTableDataName == "rateCardTable"
      ) {
        this.selectedRow = this.tableData;
      }
    }
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.formRows {
  margin-top: 2% !important;
}
.formTable .p-datatable-tbody > tr:nth-child(odd) {
  height: 20px !important;
}
.formTable .p-datatable-tbody > tr {
  color: #495057;
  padding-bottom: 10rem !important;
  border-radius: 5px;
  outline: thin !important;
  outline-style: dashed !important;
  outline-color: #cad1dd !important;
}
.formTable .p-datatable-tbody > tr > td {
  border: 0px !important;
}
.formTable .p-column-title {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #7e84a7;
}
.formTable .p-datatable-thead > tr {
  border-radius: 5px;
  outline: thin !important;
  outline-style: solid !important;
  outline-color: #edf1f7 !important;
}
.formTable .p-datatable-thead > tr > th {
  background: #edf1f7 !important;
}

:deep .p-inputnumber-input {
  padding: 5px !important;
}
</style>
