<template>
  <DataTable
    :class="'p-datatable-sm region-rates-table'"
    class="p-datatable-sm"
    id="formTable"
    :value="tableData"
    :rowClass="rowClass"
    responsiveLayout="scroll"
    v-model:expandedRows="expandedRows"
    v-model:selection="selectedRows"
    filterDisplay="menu"
    dataKey="id"
    :paginator="true"
    v-model:editingRows="editingRows"
    @row-edit-save="onRowEditSave"
    @row-edit-cancel="onRowEditCancel"
    :rows="10"
    editMode="row"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <template #empty><div class="p-3">No data found.</div></template>
    <Column v-if="expansion" :expander="expansion" class="expander" />

    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :sortable="col.header != 'Actions' ? true : false"
      :showFilterMenu="
        col.header != 'Actions' &&
        col.header != 'S. No' &&
        col.header != 'S.No.'
          ? true
          : false
      "
    >
      <template #body="slotProps">
        <div
          v-if="
            [
              'weightParcelNormalTable',
              'weightDocumentNormalTable',
              'weightParcelMultiTable',
              'weightDocumentParcelMultiTable',
              'weightDocumentParcelNormalTable',
              'weightDocumentMultiTable',
            ].includes(tableName)
          "
        >
          <!-- <div
            v-if="
              col.field != 'actions' &&
              col.field != 'weight_range' &&
              col.field != 'fuel_charge'
            "
          >
            <div class="number-field">
              {{ slotProps.data[col.field] }}
            </div>
          </div> -->
          <div v-if="col.field === 'fuel_charge'">
            {{ slotProps.data[col.field] ? "Yes" : "No" }}
          </div>
          <span v-else-if="col.header == 'Actions'" class="mr-2">
            <CustomSpeedDial
              :dataName="tableDataName"
              :rowData="slotProps.data"
              :customDialData="actionsData"
              :tableName="tableName"
            />
          </span>
          <div v-else>
            {{ slotProps.data[col.field] || "-" }}
          </div>
        </div>

        <span v-else-if="col.header == 'Actions'">
          <CustomSpeedDial
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="actionsData"
            :tableName="tableName"
          />
        </span>
        <div v-else-if="col.field === 'createdAt'">
          {{ dateFormater(slotProps.data[col.field]) }}
        </div>
        <span v-else-if="col.header == 'Created By'">
          {{ slotProps.data?.user?.display_name }}
        </span>
        <div v-else-if="slotProps.data[col.field] == 0">
          {{ slotProps.data[col.field] }}
        </div>
        <div v-else>
          {{ slotProps.data[col.field] || "-" }}
        </div>
      </template>
      <template #editor="{ data, field }">
        <div
          v-if="
            field != 'actions' &&
            field != 'weight_range' &&
            field != 'fuel_charge'
          "
        >
          <TextField
            :label="field"
            v-model="data[field]"
            class="number-field"
            v-on:childToParent="getUserInput($event, data)"
            :class="
              invalidField[data['sl_no']] &&
              invalidField[data['sl_no']][field] &&
              'p-invalid'
            "
          />
        </div>
        <div v-else-if="field == 'fuel_charge'">
          <SingleCheckBox v-model="data[field]" :value="data[field]" />
        </div>
        <div v-else-if="field == 'weight_range'">
          <div class="flex align-items-center">
            <NumberField
              label="min_weight"
              :showButtons="true"
              mode="decimal"
              :maxFractionDigits="2"
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
        <div v-else>
          {{ data[field] || "-" }}
        </div>
      </template>
    </Column>

    <Column
      :rowEditor="rowEditor"
      style="width: 10%; min-width: 8rem"
      bodyStyle="text-align:center"
    ></Column>

    <!--Expanded row content -->
    <template v-if="expansion" #expansion="slotProps">
      <div v-if="tableName === 'zonesTable'">
        <div class="flex flex-row flex-wrap">
          <div
            v-for="(chip, index) of slotProps.data.countries"
            :key="index"
            class="flex mr-2 m-1"
          >
            <ZoneChips
              :disableCross="true"
              :data="[
                chip.country.country_iso_code +
                  ' - ' +
                  chip.country.country_name,
                index,
              ]"
            />
          </div>
        </div>
        <!-- <div class="add-destination my-3">+Add Destination</div> -->
      </div>
    </template>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import CustomSpeedDial from "./CustomSpeedDial.vue";
import {
  fuelChargeTableActions,
  editAction,
  deleteAction,
} from "../../const.js";
import moment from "moment";
import { mapActions } from "vuex";
import { errhandler } from "@/services/httpClient";

export default {
  components: {
    DataTable,
    Column,
    CustomSpeedDial,
  },
  props: [
    "rowEditor",
    "expansion",
    "type",
    "transport",
    "tableDataName",
    "tableName",
    "tableClass",
    "tableData",
    "overlayData",
    "apiKey",
    "tableColumns",
    "weightType",
    "storePath",
    "globalSearchString",
    "paginator",
    "selectionModeState",
    "formTableDataName",
    "isloading",
    "editAction",
    "deleteAction",
  ],
  data() {
    return {
      editingRows: [],
      expandedRows: [],
      actionsData: fuelChargeTableActions,
      invalidField: [],
    };
  },
  watch: {
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
  methods: {
    ...mapActions({
      editWeight: "Outbound/Edit/editWeight",
      setRenderKey: "Outbound/Edit/setRenderKey",
    }),
    dateFormater(data) {
      if (!data) return "-";
      let date = moment(data).format("DD MMM, YYYY");

      if (date === "Invalid date") {
        return data;
      } else {
        return date;
      }
    },
    getUserInput(event, data) {
      if (!data[event]) {
        this.invalidField[data.sl_no][event] = true;
      } else if (data["max_weight"] <= data["min_weight"]) {
        this.invalidField[data.sl_no]["max_weight"] = true;
      } else {
        this.invalidField[data.sl_no][event] = false;
        this.invalidField[data.sl_no]["max_weight"] = false;
      }
    },
    onRowEditCancel(event) {
      let obj = this.invalidField[event.newData.sl_no];

      Object.keys(obj).map((key) => {
        obj[key] = false;
      });
    },
    async onRowEditSave(event) {
      let isValid = true;
      let obj = this.invalidField[event.newData.sl_no];
      Object.keys(obj).map((key) => {
        if (obj[key] === true) {
          isValid = false;
          return;
        }
      });

      if (isValid) {
        let { newData } = event;

        let payload = [];

        Object.keys(newData).map((list, idx) => {
          if (list.startsWith("rate")) {
            payload.push({
              rate: newData[list],
              fuel_charge: newData["fuel_charge"],
              min_weight: newData["min_weight"],
              max_weight: newData["max_weight"],
              id: "",
            });
          }
        });

        let get_id = Object.keys(newData).filter((list) =>
          list.startsWith("id_")
        );

        get_id?.length &&
          get_id.map((list, idx) => {
            payload[idx]["id"] = newData[list];
          });

        try {
          await this.editWeight({
            data: { rates: payload },
            type: this.$props.weightType,
          });
          this.setRenderKey();
          this.$toast.add({
            severity: "success",
            summary: "Success",
            detail: "Details updated successfully",
            life: 3000,
          });
        } catch (err) {
          let toastMsg = await errhandler(err);
          this.$toast.add({
            severity: toastMsg.serverity,
            summary: toastMsg.summary,
            detail: toastMsg.msg,
            life: 3000,
          });
        }
      } else {
        this.editingRows = [...this.editingRows, event.data];
      }
    },
  },
  created() {
    if (this.$props.editAction) {
      this.actionsData = editAction;
    } else if (this.$props.deleteAction) {
      this.actionsData = deleteAction;
    } else {
      this.actionsData = fuelChargeTableActions;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";

.number-field {
  width: 100px !important;
}

::v-deep .deleted_row {
  background-color: #fff2f2 !important;
}

::v-deep .card {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
::v-deep .contract-table.p-card .p-card-body {
  padding: 0 !important;
}

:deep .p-column-filter-menu {
  margin-left: unset !important;
}
.p-paginator-page {
  background: #357dea;
  border-radius: 5px;
}

::v-deep .p-datatable-thead > tr > th {
  padding: 1rem !important;
}

::v-deep .p-datatable-tbody > tr > td {
  padding: 0.5rem 1rem !important;
}

::v-deep .contract-table.p-datatable-thead > tr > th {
  background-color: #fff !important;
  border: none !important;
  font-family: $font-family-primary;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: left;
  padding: 0 !important;
}
::v-deep .p-datatable-row-expansion {
  background: rgba(197, 220, 255, 0.62) !important;
  // opacity: 0.5;
}
::v-deep .express-contract-table-expansion .p-datatable-row-expansion {
  background: #fff !important;
}
::v-deep
  .express-contract-table-expansion
  .p-datatable
  .p-datatable-thead
  > tr
  > th {
  background: transparent !important;
  border: none !important;
}
// ::v-deep .express-contract-table-expansion .p-datatable.p-datatable-hoverable-rows .p-datatable-tbody > tr:not(.p-highlight):hover{
//   background: transparent !important;
// }

.contract-table .p-datatable-tbody > tr > td {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  color: #4e5968;
  word-wrap: break-word !important;
  width: 0px !important;
  padding: 0px !important;
}
::v-deep .p-column-title {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left !important;
  color: #7e84a7;
}
::v-deep .p-paginator {
  background: #edf1f7 !important;
  border: 0 !important;
  width: 100% !important;
}
::v-deep .p-datatable .p-paginator-bottom {
  margin-top: 30px !important;
  margin-bottom: 20px !important;
}
::v-deep .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
  background: #357dea;
  border-radius: 5px;
  color: #fff;
}
::v-deep .p-paginator .p-paginator-current {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  color: #4e5968;
  position: absolute;
  left: 0;
}
::v-deep .p-paginator .p-dropdown {
  position: absolute;
  right: 0;
}
::v-deep .p-paginator-icon {
  background: #fff;
  border-radius: 5px;
  padding: 10px;
}
::v-deep .pi {
  font-size: 12px !important;
}
.rate_items {
  color: #5f98ee;
  font-weight: bolder;
}
.issue {
  font-weight: bold !important;
}
.rate_settings {
  color: #6b9fef;
  font-weight: bolder;
}
.rate-default-badge {
  background: #fff8e2;
  color: #f0bd76;
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
}
.rate-private-badge {
  background: #ecffeb;
  color: #4b9149;
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
}

.add-destination {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #357dea;
  font-size: 12px;
}
</style>
