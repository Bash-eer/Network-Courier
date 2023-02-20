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
  >
    <Column selectionMode="multiple" headerStyle="width: 1em"></Column>
    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :style="getColumnWidth(col.header)"
    >
      <template #body="slotProps">
        <div v-if="col.field === 'createdAt'">
          {{ dateFormater(slotProps.data[col.field]) }}
        </div>
        <div v-else>
          {{ slotProps.data[col.field] || "-" }}
        </div>
      </template>
      <template #editor="{ data, field }">
        <div v-if="field == 'rate'">
          <NumberField
            :label="field"
            v-model="data[field]"
            class="number-field"
            mode="decimal"
            v-on:childToParent="getUserInput($event, data)"
            :class="
              invalidField[data['sl_no']] &&
              invalidField[data['sl_no']][field] &&
              'p-invalid'
            "
          />
        </div>
        <div v-else-if="field == 'size_name'">
          <TextField
            :label="field"
            v-model="data[field]"
            class="number-field"
            mode="decimal"
            v-on:childToParent="getUserInput($event, data)"
            :class="
              invalidField[data['sl_no']] &&
              invalidField[data['sl_no']][field] &&
              'p-invalid'
            "
          />
        </div>
        <div v-else-if="field == 'weight'">
          <div class="flex align-items-center">
            <NumberField
              label="min_weight"
              :showButtons="true"
              mode="decimal"
              v-model="data['min_weight']"
              v-on:childToParent="getUserInput($event, data)"
              :class="
                invalidField[data['sl_no']] &&
                invalidField[data['sl_no']]['min_weight'] &&
                'p-invalid'
              "
            />
            <NumberField
              class="ml-2"
              label="max_weight"
              :showButtons="true"
              mode="decimal"
              v-model="data['max_weight']"
              v-on:childToParent="getUserInput($event, data)"
              :class="
                invalidField[data['sl_no']] &&
                invalidField[data['sl_no']]['max_weight'] &&
                'p-invalid'
              "
            />
          </div>
        </div>
        <div v-else-if="field == 'measurment'">
          <div class="flex align-items-center">
            <NumberField
              label="min_length"
              :showButtons="true"
              mode="decimal"
              v-model="data['min_length']"
              v-on:childToParent="getUserInput($event, data)"
              :class="
                invalidField[data['sl_no']] &&
                invalidField[data['sl_no']]['min_length'] &&
                'p-invalid'
              "
            />
            <NumberField
              class="ml-2"
              label="max_length"
              :showButtons="true"
              mode="decimal"
              v-model="data['max_length']"
              v-on:childToParent="getUserInput($event, data)"
              :class="
                invalidField[data['sl_no']] &&
                invalidField[data['sl_no']]['max_length'] &&
                'p-invalid'
              "
            />
          </div>
        </div>
        <div v-else>
          {{ data[field] || "-" }}
        </div>
      </template>
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
    "checkbox",
    "tab",
    "selectedTab",
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
    "prefillData",
    "editRenderKey",
    "isTabActive",
    "rateRenderKey",
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
      contactsData: null,
    };
  },
  watch: {
    selectedRow() {
      if (
        this.formTableDataName == "contactTable" &&
        this.selectedRow?.length
      ) {
        let con_tact = [];
        this.contactsData.map((i) => {
          if (this.selectedRow.some((u) => u.email === i.email)) {
            con_tact.push({ ...i, selected: true });
          } else {
            con_tact.push({ ...i, selected: false });
          }
          //
        });

        this.setSelectedContacts(con_tact);
        return;
      } else if (
        this.selectedRow.length == 0 &&
        this.formTableDataName == "contactTable"
      ) {
        let con_tact = [];

        this.contactsData.map((i) => {
          con_tact.push({ ...i, selected: false });
        });
        this.setSelectedContacts(con_tact);

        return;
      }

      if (this.selectedRow.length) {
        this.$emit("isRowSelected", true);
      } else {
        this.$emit("isRowSelected", false);
      }
      // this.storeDeliveryType();

      if (this.$props.isTabActive) {
        if (this.$props.formTableDataName == "rateCardTable") {
          let data = [];


          this.$emit("getSelectedRow", this.$props.tab?.name);

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
          this.setDeliveryRates({
            delivery_type: this.$props.tab?.name,
            initial: this.$props.tab?.initial,
            selected: !this.$props.tab?.disable,
            rates: data,
          });
        }
      }
    },
    rateRenderKey() {
      if (this.$props.formTableDataName == "rateCardTable") {
        let data = [];


        this.$emit("getSelectedRow", this.$props.tab?.name);

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
        this.setDeliveryRates({
          delivery_type: this.$props.tab?.name,
          initial: this.$props.tab?.initial,
          selected: !this.$props.tab?.disable,
          rates: data,
        });
      }
    },
    checkbox: {
      handler() {
        // this.storeDeliveryType();
        Object.keys(this.checkbox).map((list) => {
          this.updateSelectedDeliveryType({
            name: list,
            selected: this.checkbox[list],
          });
        });
      },
      deep: true,
    },
    // tableData() {
    //   if (this.tableData) {
    //     this.invalidField = [];

    //     this.tableData.map((list, idx) => {
    //       this.invalidField.push({});
    //       Object.keys(list).map((key) => {
    //         this.invalidField[idx][key] = false;
    //       });
    //     });
    //   }
    // },
  },
  computed: {
    ...mapGetters({
      quotationData: "salesRapidoContract/Contract/quotationData",
      rapidoContractData: "salesRapidoContract/Contract/rapidoContractData",
    }),
  },
  methods: {
    ...mapActions({
      setRapidoContractData:
        "salesRapidoContract/Contract/setRapidoContractData",
      setSelectedContacts: "salesRapidoContract/Contract/setSelectedContacts",
      updateSelectedDeliveryType:
        "salesRapidoContract/Contract/updateSelectedDeliveryType",
      setDeliveryRates: "salesRapidoContract/Contract/setDeliveryRates",
    }),
    storeDeliveryType() {
      if (this.$props.formTableDataName == "rapidoContractQuotation") return;
      if (
        !this.rapidoContractData?.quotation?.delivery_type ||
        Object.keys(this.$props.checkbox).length >=
          this.rapidoContractData?.quotation?.delivery_type?.length
      ) {
        const existData =
          this.rapidoContractData?.quotation?.delivery_type?.find(
            (list) => list.delivery_type == this.$props.selectedTab.name
          );

        if (existData) {
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
                  delivery_type: this.$props.selectedTab?.name,
                  initial: this.$props.selectedTab?.initial,
                  selected: !this.$props.selectedTab?.disable,
                  rates: data,
                },
              ],
            },
          });
          return;
        }
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

        const deliveryType = this.rapidoContractData?.quotation?.delivery_type
          ? this.rapidoContractData?.quotation?.delivery_type
          : [];

        this.setRapidoContractData({
          key: "quotation",
          value: {
            delivery_type: [
              {
                delivery_type: this.$props.selectedTab?.name,
                initial: this.$props.selectedTab?.initial,
                selected: !this.$props.selectedTab?.disable,
                rates: data,
              },
              ...deliveryType,
            ],
          },
        });
      }
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
  async created() {
    if (this.tableData) {
      this.contactsData = this.tableData;
      this.invalidField = [];

      this.tableData.map((list, idx) => {
        this.invalidField.push({});
        Object.keys(list).map((key) => {
          this.invalidField[idx][key] = false;
        });
      });

      if (
        this.quotationData &&
        this.prefillData &&
        this.$props.editRenderKey == 12 &&
        this.$props.formTableDataName == "rateCardTable"
      ) {
        this.selectedRow = this.$props.prefillData.rates;
      }

      if (
        (!this.quotationData || this.$props.editRenderKey != 12) &&
        this.$props.formTableDataName == "rateCardTable"
      ) {
        this.selectedRow = this.tableData;
      }

      if (
        this.quotationData &&
        this.tableData?.length &&
        this.formTableDataName == "contactTable"
      ) {
        if (this.quotationData.contacts?.length) {
          this.selectedRow = [];
          this.quotationData.contacts.map((list) => {
            if (list.selected) {
              this.selectedRow.push(list);
            }
          });

          this.setSelectedContacts(this.tableData);
        }

        // this.setSelectedContacts(this.tableData);
      }

      if (!this.quotationData && this.formTableDataName == "contactTable") {
        this.setSelectedContacts(this.tableData);
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
