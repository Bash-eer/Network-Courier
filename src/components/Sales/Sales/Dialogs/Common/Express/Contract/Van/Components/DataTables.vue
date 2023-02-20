<template>
  <DataTable
  :key="key"
    class="p-datatable-sm editable-cells-table formTable editable-cells-table"
    id="formTable"
    :rowClass="rowClass"
    :value="tableData"
    responsiveLayout="scroll"
    v-model:selection="selectionMode"
    editMode="cell"
    @cell-edit-complete="onCellEditComplete"
    ><Column
      selectionMode="multiple"
      style="width: 3rem"
      :exportable="false"
    ></Column>
    <Column
      v-for="col of tableColumn"
      :field="col.field"
      :header="col.header"
      :key="col.field"
    >
    
     <template #editor="{ data, field }">
     <span v-if="col.field==='trip_type'">
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
      </template></Column>


    <!-- <Column field="trip_no" header="Trip No"></Column>
    <Column field="from_time" header="From"></Column>
    <Column field="to_time" header="To"></Column>
    <Column field="trip_days" header="Trip Days"></Column>
    <Column field="trip_type" header="Trip Types" style="width: 20%">
      <template #editor="{ data, field }">
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
      </template>
    </Column> -->
  </DataTable>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dropdown from "primevue/dropdown";
export default {
  name: "DataTables",
  props: ["key","tableData", "selectionModeState", "tableColumn"],
  data() {
    return {
      selectedRows: [],
      selectionMode: null,
      trips_type: [
        { label: "Open", value: "Open" },
        { label: "Close", value: "Close" },
        { label: "Fixed", value: "Fixed" },
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
      data[field] = newValue;
    },
  },
  components: {
    DataTable,
    Column,
    Dropdown,
  },
  mounted() {
    if (this.selectionModeState) {
      this.selectionMode = this.selectionModeState;
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
