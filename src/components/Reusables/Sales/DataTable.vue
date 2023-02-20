<template>
  <DataTable
    class="p-datatable-sm editable-cells-table formTable"
    id="formTable"
    :value="tableData"
    :rowClass="rowClass"
    v-model:selection="selectionMode"
    v-model:expandedRows="expandedRows"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
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
        <span v-if="col.header == 'From'">{{ timeParser(data[field]) }}</span>
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
            col.header != 'Trip Time' &&
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
      <template #body="{ data, field }">
        <span v-if="col.header == 'Trip Time'">
          <span class="color-66c11e"> {{ data[field] }} </span>
        </span>
        <span
          v-if="
            col.header != 'Created On' &&
            col.header != 'Actions' &&
            col.header != 'Checked' &&
            col.header != 'Trip Time' &&
            col.header != 'Feedback'
          "
          >{{ data[field] }}</span
        >
      </template>
    </Column>

    <Column
      v-if="formTableDataName != 'QuotationTabSubTable'"
      :expander="true"
      headerStyle="width: 1rem"
    />
    <template #expansion="slotProps">
      <ExpansionTable
        tableName="AdhocRatesTable"
        tableClass="p-datatable-sm QuotationTabTable"
        :tableData="slotProps.data.surchargeData"
        :tableColumns="tableColumn"
        :selectionModeState="
          this.$store.state.salesExpressAdhoc?.editExpressAdhocData
            ?.express_adhoc_specifics?.delivery_charges[slotProps?.index]
            ?.surcharges
        "
        storePath="salesExpressAdhoc"
        formTableDataName="additionOfRowsEach"
        dataKey="surcharge_id"
        @getSelectedSurchargeData="getSelectedSurchargeData"
      />
    </template>
  </DataTable>
</template>
<script>
import ExpansionTable from "../../Sales/Sales/Bulk Adjustment/ExpansionTable.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Textarea from "primevue/textarea";
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
// import { mapGetters } from "vuex";
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
    "booleanValues",
    "keyTabValue",
  ],
  data() {
    return {
      selectedRows: [],
      selectionMode: [],
      selectionModeSub: [],
      expandedRows: [],
      inspectionCheckedData: [
        { name: "Yes", code: "1" },
        { name: "No", code: "2" },
      ],
      inspectionCheckBool: null,
      tableColumn: [
        { field: "id", header: "Id" },
        { field: "surcharge_name", header: "Name" },
        { field: "geo_fencing_id", header: "Geo Fencing" },
        { field: "rates", header: "Rates" },
      ],
    };
  },
  // computed: {
  //   ...mapGetters({
  //     expressContractBikeFSRAddNewData:
  //       "salesExpressContractBikeFSR/expressContractBikeFSRAddNewData",
  //   }),
  // },
  components: {
    DataTable,
    Column,
    Textarea,
    ExpansionTable,
  },
  methods: {
    ...mapActions({
      updateSelectedDataSurcharge:
        "salesExpressAdhoc/updateSelectedDataSurcharge",
      updateSelectedDataSurchargeForFalse:
        "salesExpressAdhoc/updateSelectedDataSurchargeForFalse",
      updateSelectedDataSurchargeForEcomVan:
        "salesExpressAdhoc/updateSelectedDataSurchargeForEcomVan",
      updateSelectedDataSurchargeForEcomVanFalse:
        "salesExpressAdhoc/updateSelectedDataSurchargeForEcomVanFalse",
    }),
    getSelectedSurchargeData(value) {
      this.$emit("getSelectedSurchargeData", value);
    },
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
      let hours = time.getHours();
      let minutes = time.getMinutes();
      let parsed_time = hours + ":" + minutes;
      return parsed_time;
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

    selectAllSubRows(event) {
      for (let i in event) {
        for (let j in event[i].surchargeData) {
          event[i].surchargeData[j].selected = false;
        }
      }
    },

    // eslint-disable-next-line no-unused-vars
    unSelectAllSubRows(event) {
      for (let i in event) {
        for (let j in event[i].surchargeData) {
          event[i].surchargeData[j].selected = false;
        }
      }
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

    onRowSubSelect(event) {
      event.data.selected = true;
    },
    // eslint-disable-next-line no-unused-vars
    onRowSubUnselect(event) {
      event.data.selected = false;
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
    if (this.formTableDataName == "CreateQuotationRapidoAdhoc") {
      if (this.$store.state.salesRapidoAdhoc?.RapidoAdhocEditData?.id) {
        this.tableData?.map((data) => {
          if (data.selected) {
            this.selectionMode.push(data);
          }
        });
        return;
      }
    }

    if (
      this.selectionModeState != undefined &&
      this.selectionModeState != null
    ) {
      this.selectionMode = this.selectionModeState;
      // let selectionForChild = this.selectionMode.map(c => c.surchargeData);
      // this.selectionModeSub = selectionForChild;
    }
    if (
      this.selectionModeState == undefined ||
      this.selectionModeState == null
    ) {
      this.selectionMode = null;
      this.selectionModeSub = null;
    }
  },
  watch: {
    selectionMode(value) {
      if (this.formTableDataName == "CreateQuotationRapidoAdhoc") {
        this.$emit("getSelectedData", value);
      }
    },
    selectionModeSub(value, old) {
      if (value.length != 0) {
        for (let i in value) {
          value[i].selected = true;
        }
      } else {
        for (let i in old) {
          old[i].selected = false;
        }
      }
    },
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
