<template>
  <DataTable
    :key="renderKey"
    class="p-datatable-sm editable-cells-table formTable w-100"
    id="formTable"
    :value="tableData"
    :rowClass="rowClass"
    v-model:selection="selectionMode"
    :dataKey="dataKey"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    @row-select-all="selectAllRows"
    @row-unselect-all="unSelectAllRows"
    editMode="cell"
    @cell-edit-complete="onCellEditComplete"
  >
    <Column selectionMode="single"></Column>
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :style="getColumnWidth(col.header)"
    >
      <template
        #editor="{ data, field }"
        v-if="col.header == 'Cust From' || col.header == 'Cust To'"
      >
        <span
          class="flex flex-row row"
          v-if="col.header == 'Cust From'"
          key="renderKey"
        >
          <Calendar
            class="calender-table"
            v-model="data[field]"
            :showTime="true"
            :timeOnly="true"
          />
        </span>
        <span
          class="flex flex-row row"
          v-if="col.header == 'Cust To'"
          key="renderKey"
        >
          <Calendar
            class="calender-table"
            v-model="data[field]"
            :showTime="true"
            :timeOnly="true"
          />
        </span>
        <span v-if="col.header == 'Trip Type'" key="renderKey">
          <Dropdown
            class="calender-drop p-inputtext-sm"
            v-model="data[field]"
            :options="dropDown"
            optionLabel="label"
            optionValue="value"
          />
        </span>
        <span v-if="col.header == 'Trip Days'" key="renderKey">
          <Dropdown
            class="calender-drop p-inputtext-sm"
            v-model="data[field]"
            :options="day_type"
            optionLabel="label"
            optionValue="value"
          />
        </span>
      </template>

      <template> </template>
    </Column>
  </DataTable>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
// import { mapGetters } from "vuex";
export default {
  components: {
    DataTable,
    Column,
    Dropdown,
    Calendar,
  },
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
  data() {
    return {
      selectedRows: [],
      selectionMode: [],
      tripDateFrom: "",
      renderKey: 10,
      inspectionCheckedData: [
        { name: "Yes", code: "1" },
        { name: "No", code: "2" },
      ],
      dropDown: [
        { label: "Regular", value: "Regular" },
        { label: "Fixed", value: "Fixed" },
      ],
      day_type: [
        { label: "Weekdays", value: "Weekdays" },
        { label: "Saturday", value: "Saturday" },
      ],
      time_type: [
        { label: "After", value: "After" },
        { label: "Before", value: "Before" },
      ],
      inspectionCheckBool: null,
    };
  },
  methods: {
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
    getDropDownData(key) {
      let source;
      switch (key) {
        case "checked":
          source = this.inspectionCheckedData;
          break;
      }
      return source;
    },
    dropDownFilter(data, checkerCode, inputCode) {
      for (var dd in data) {
        if (inputCode == data[dd][checkerCode]) {
          return data[dd].name;
        }
      }
    },
    onCellEditComplete(event) {
      let { data, newValue, field } = event;
      let value = newValue;
      if (field == "cus_from_time" || field == "cus_to_time") {
        if (newValue && moment(newValue, "MM/DD/YYYY", true).isValid()) {
          value = moment(newValue).format("HH:mm");
        } else {
          if (newValue == "After" || newValue == "Before") {
            value = newValue;
          } else {
            if (newValue) {
              value = newValue;
            } else {
              if (field == "cus_from_time") {
                value = "Before";
              } else {
                value = "After";
              }
            }
          }
        }
        data[field] = value;
      }
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM YYYY");
        return formattedDate;
      }
    },
    timeParser(data) {
      var formattedDate = moment(data).format("MMM Do YYYY");
      return formattedDate;
    },
    rowClass() {
      return "formRows";
    },
    // eslint-disable-next-line no-unused-vars
    selectAllRows(event) {
      this.$store.state[this.storePath][this.formTableDataName] =
        this.selectionMode;
    },
    // eslint-disable-next-line no-unused-vars
    unSelectAllRows(event) {
      this.$store.state[this.storePath][this.formTableDataName] =
        this.selectionMode;
    },
    // eslint-disable-next-line no-unused-vars
    onRowSelect(event) {
      this.$store.state[this.storePath][this.formTableDataName] =
        this.selectionMode;
    },
    // eslint-disable-next-line no-unused-vars
    onRowUnselect(event) {
      this.$store.state[this.storePath][this.formTableDataName] =
        this.selectionMode;
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
    if (
      this.selectionModeState != undefined &&
      this.selectionModeState != null
    ) {
      this.selectionMode = this.selectionModeState;
    }
    if (
      this.selectionModeState == undefined ||
      this.selectionModeState == null
    ) {
      this.selectionMode = null;
    }
  },
  watch: {
    selectionMode: {
      handler() {
        this.$emit("selectedRows", this.selectionMode);
      },
      deep: true,
    },
    // selectionMode(value) {
    //     this.expressContractBikeFSRAddNewData["contacts"]=[];
    //     value?.map((list, index) => {
    //     this.expressContractBikeFSRAddNewData["contacts"].push({
    //     profile_url: list.profile_url,
    //     selected: true,
    //     contact_name: list.contact_name,
    //     contact_no: list.contact_no,
    //     email: list.email,
    //     mobile_no: list.mobile_no,
    //     designation: list.designation,
    //     });
    //   });
    // },
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
  font-size: 8px !important;
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
  font-size: 12px !important;
}
</style>
