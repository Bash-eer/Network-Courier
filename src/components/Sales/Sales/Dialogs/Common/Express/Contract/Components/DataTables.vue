<template>
  <DataTable
    :key="renderKey"
    class="p-datatable-sm editable-cells-table formTable editable-cells-table"
    id="formTable"
    :rowClass="rowClass"
    :value="tableData"
    responsiveLayout="scroll"
    v-model:selection="selectionMode"
    editMode="cell"
    @cell-edit-complete="onCellEditComplete"
  >
    <!-- <Column
      v-if="multipleSelectValue"
    selectionMode="multiple"
      style="width: 3rem"
      :exportable="false"
    ><Checkbox v-model="i.selected" :binary="true" /></Column> -->
    <Column
      v-if="profile_type != 'personal'"
      selectionMode="multiple"
      style="width: 3rem"
    ></Column>
    <Column
      v-for="col of tableColumn"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      style="height: 50px"
    >
      <template #editor="{ data, field }">
        <!-- <span v-if="col.field===''">
     <Checkbox v-model="i.selected" :binary="true" /></span> -->
        <span class="flex flex-row row" v-if="col.field.includes('time')">
          <Calendar
            class="calender-table"
            v-model="data[field]"
            dateFormat="d MM yy"
            :showTime="true"
            :timeOnly="true"
          />
          <Dropdown
            class="calender-drop p-inputtext-sm"
            v-model="data[field]"
            :options="time_type"
            optionLabel="label"
            optionValue="value"
          />
        </span>
        <span v-if="col.field === 'trip_days'">
          <Dropdown
            class="drop-down-height p-inputtext-sm"
            v-model="data[field]"
            :options="day_type"
            optionLabel="label"
            optionValue="value"
          >
            <template #option="slotProps">
              <span
                :class="
                  'product-badge status-' + slotProps.option.value.toLowerCase()
                "
                >{{ slotProps.option.label }}</span
              >
            </template>
          </Dropdown>
        </span>
        <span v-if="col.field === 'trip_type'">
          <Dropdown
            class="drop-down-height p-inputtext-sm"
            v-model="data[field]"
            :options="trips_type"
            optionLabel="label"
            optionValue="value"
          >
            <template #option="slotProps">
              <span
                :class="
                  'product-badge status-' + slotProps.option.value.toLowerCase()
                "
                >{{ slotProps.option.label }}</span
              >
            </template>
          </Dropdown>
        </span>
      </template></Column
    >
  </DataTable>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import moment from "moment";
// import Checkbox from "primevue/checkbox";
export default {
  name: "DataTables",
  props: [
    "key",
    "tableData",
    "multipleSelectValue",
    "selectionModeState",
    "tableColumn",
    "profile_type",
  ],
  data() {
    return {
      renderKey: 1,
      selectedRows: [],
      selectionMode: [],
      trips_type: [
        { label: "Regular", value: "Regular" },
        { label: "Fixed", value: "Fixed" },
      ],
      time_type: [
        { label: "After", value: "After" },
        { label: "Before", value: "Before" },
      ],
      day_type: [
        { label: "Weekdays", value: "Weekdays" },
        { label: "Saturday", value: "Saturday" },
      ],
      inspectionCheckedData: [
        { name: "Yes", code: "1" },
        { name: "No", code: "2" },
      ],
      inspectionCheckBool: null,
    };
  },
  methods: {
    rowClass() {
      return "formRows";
    },
    onCellEditComplete(event) {
      let { data, newValue, field } = event;
      if (
        field.includes("time") &&
        moment(newValue, "MM/DD/YYYY", true).isValid()
      ) {
        data[field] = moment(newValue).format("HH:mm");
      } else if (field == "trip_type") {
        data[field] = newValue;
        data["from_time"] = "Before";
      } else {
        data[field] = newValue;
      }
    },
  },
  components: {
    DataTable,
    Column,
    Dropdown,
    Calendar,
    // Checkbox
  },
  mounted() {
    if (this.selectionModeState) {
      this.selectionMode = this.selectionModeState;
      this.renderKey++;
    }
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
    if (this.selectionModeState) {
      this.selectionMode = this.selectionModeState;
    }
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.formRows {
  margin-top: 2% !important;
}
.drop-down-height {
  height: 30px;
}
.calender-table {
  height: 30px;
  width: 110px;
}
.calender-drop {
  height: 30px;
  width: 15px;
  margin-left: -10px;
}
::v-deep .calender-drop .p-dropdown-trigger {
  margin-left: -7px !important;
  justify-content: left !important;
}
::v-deep .calender-drop .p-inputtext {
  display: none;
}
.time-pick {
  width: 10px;
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
</style>
