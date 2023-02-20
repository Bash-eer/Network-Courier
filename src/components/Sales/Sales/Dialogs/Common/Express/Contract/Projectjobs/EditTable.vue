<template>
  <DataTable
    class="p-datatable-sm editable-cells-table formTable"
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
    <Column selectionMode="multiple" headerStyle="width: 1em"></Column>
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :style="getColumnWidth(col.header)"
    >
      <template #editor="{ data, field }">
        <!-- <template #body="slotProps"> -->
        <!-- DATES TEMPLATE -->
        <span v-if="col.header == 'Created On'">
          {{ dateFormater(data[field]) }}
        </span>
        <!-- TIME TEMPLATE -->
        <span v-if="col.header == 'From'">
          {{ timeParser(data[field]) }}
          <!-- {{ data[field].slice(0, 5) }} -->
        </span>
        <span v-if="col.header == 'To'">{{ timeParser(data[field]) }}</span>
        <!-- CHECKED/DROPDOWN TEMPLATE -->
        <span v-if="col.header == 'Checked'">
          <DropDown
            :state="data[field]"
            code="code"
            :data="inspectionCheckedData"
            label="inspectionCheckBool"
            id="inspectionCheckBool"
            v-model="data[field]"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
            autofocus
          />
        </span>
        <!-- FEEDBACK/TEXT INPUT TEMPLATE -->
        <span v-if="col.header == 'Feedback'">
          <Textarea
            :state="data[field]"
            v-model="data[field]"
            :autoResize="true"
            style="max-width: 100%; max-height: 20%"
            :class="'inputfield w-full dialog-field-text py-2'"
            rows="1"
            cols="1"
            autofocus
          />
          <!-- <InputText class="inputfield w-full" v-model="data[field]" autofocus/> -->
        </span>
        <span
          v-if="
            col.header != 'From' &&
            col.header != 'To' &&
            col.header != 'Created On' &&
            col.header != 'Actions' &&
            col.header != 'Checked' &&
            col.header != 'Feedback'
          "
          >{{ data[field] }}</span
        >
        <span v-if="col.header == 'Checked'" class="mr-2">
          <!-- <div class="field col-4"> -->

          <!-- <DropDown
          :data="Depreciation_Type"
          label="Depreciation_Type"
          id="Depreciation_Type"
          code="code"
        /> -->
          <!-- </div> -->
        </span>
      </template>
    </Column>
  </DataTable>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Textarea from "primevue/textarea";
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  name: "EditTable",
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
      inspectionCheckedData: [
        { name: "Yes", code: "1" },
        { name: "No", code: "2" },
      ],
      inspectionCheckBool: null,
    };
  },
  computed: {
    ...mapGetters({
      expressContractVanFSRAddNewData:
        "salesExpressContractVanFSR/expressContractVanFSRAddNewData",
    }),
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
      switch (field) {
        case "feedback":
          data[field] = newValue;
          break;
        case "checked":
          if (isNaN(newValue) == false) {
            data[field] = this.dropDownFilter(
              this.getDropDownData(field),
              "code",
              newValue
            );
          }
          break;
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
    timeParser(time) {
      //   console.log(time.slice(0, 5));
      return time.slice(0, 5);
      //   return time;
      //   console.log(moment(time).format("HH:mm"), time);
      //   let hours = time.getHours();
      //   let minutes = time.getMinutes();
      //   let parsed_time = hours + ":" + minutes;
      //   return parsed_time;
      //   if (time != "") {
      //     let d = new Date(time);
      //     let hours = d.getHours();
      //     let minutes = d.getMinutes();
      //     let parsed_time = hours + ":" + minutes;
      //     console.log(parsed_time);
      //     return parsed_time;
      //   }
    },
    rowClass() {
      return "formRows";
    },
    // eslint-disable-next-line no-unused-vars
    selectAllRows(event) {
      console.log(event, "all");

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
      console.log(event);
      this.$store.state[this.storePath][this.formTableDataName] =
        this.selectionMode;
    },
    // eslint-disable-next-line no-unused-vars
    onRowUnselect(event) {
      this.$store.state[this.storePath][this.formTableDataName] =
        this.selectionMode;
    },
  },
  watch: {
    selectionMode(value) {
      if (this.formTableDataName == "tripFormTableData"){
        this.expressContractVanFSRAddNewData["quotation"]["trips"]=[];
      value?.map((list) => {

        console.log(list , "result list");
      this.expressContractVanFSRAddNewData["quotation"]["trips"].push({
        from_time: list.from_time,
        selected: true,
        to_time: list.to_time,
        trip_days: list.trip_days,
        trip_id: list.trip_id,
        trip_no: list.trip_no,
        trip_type: list.trip_type,
      });
    });
      }
      if (this.formTableDataName == "inspectionsFormTableData"){
        this.expressContractVanFSRAddNewData["contacts"]=[];
      value?.map((list) => {
      this.expressContractVanFSRAddNewData["contacts"].push({
        profile_url: list.profile_url,
        selected: list.selected,
        contact_name: list.contact_name,
        contact_no: list.contact_no,
        email: list.email,
        mobile_no: list.mobile_no,
        designation: list.designation,
      });
    });
      }
      
    },
  },
  components: {
    DataTable,
    Column,
    Textarea,
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
</style>
