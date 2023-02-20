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
        <span v-if="col.header == 'Actions'">
          <CustomSpeedDial
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="actionsData"
            :tableName="tableName"
          />
        </span>
        <div
          v-else-if="col.field === 'createdAt' || col.field === 'cut_off_time'"
        >
          {{ dateFormater(slotProps.data[col.field]) }}
        </div>
        <div v-else-if="col.field === 'from_time' || col.field === 'to_time'">
          {{ timeFormater(slotProps.data[col.field]) }}
        </div>
         <div v-else-if="slotProps.data[col.field]  == 0">
          {{ slotProps.data[col.field] }}
        </div>
        <div v-else>
          {{ slotProps.data[col.field] || "-" }}
        </div>
      </template>
    </Column>

    <!--Expanded row content -->
    <template v-if="expansion" #expansion="slotProps">
      <div v-if="expandedType === 'type_1'">
        <div class="flex align-items-center mt-2">
          <div class="mr-4 ml-2">Box Count Charges</div>
          <Buttons
            label="Add New"
            button_class="p-button-sm mr-4  add-btn custom-add-btn"
            v-on:childToParent="openBoxCount"
          />
        </div>
        <ExpandedTable
          tableName="boxCountTable"
          :tableData="slotProps.data.expanded"
          :tableColumns="getTableColumns()"
        />
      </div>
      <div
        v-if="
          expandedType === 'type_2' ||
          this.selectedTab.component === 'Charge by Quantity'
        "
      >
        <div :key="showAddNew" class="mt-3 ml-2">
          <div class="flex align-items-center">
            <SelectButton
              v-model="selectedTab"
              optionLabel="tab"
              class="mr-5"
              :options="tabs"
            />
            <Buttons
              label="Add New"
              button_class="p-button-sm mr-4  add-btn custom-add-btn"
              v-on:childToParent="openDialog"
              v-if="showAddNew"
            />
          </div>
          <ExpandedTable
            :tableName="selectedTab.name"
            :tableData="getTableData(slotProps.data)"
            :tableColumns="getTableColumns()"
            :editAction="!showAddNew"
          />
        </div>

        <div v-if="this.selectedTab.component === 'Charge by Quantity'">
          <div class="flex align-items-center mt-2">
            <div class="mr-4 ml-2">Box Count Charges</div>
            <Buttons
              label="Add New"
              button_class="p-button-sm mr-4  add-btn custom-add-btn"
              v-on:childToParent="openBoxCount"
            />
          </div>
          <ExpandedTable
            tableName="boxCountTable"
            :tableData="slotProps.data.boxCount_expanded"
            :tableColumns="boxCountColumns"
          />
        </div>
      </div>
      <BoxCountCharge
        :show="showBoxCountDialog && !showDialog"
        v-if="showBoxCountDialog && !showDialog"
        @close="closeBoxCountDialog"
        @save="this.setRenderKey()"
        :is="selectedTab.name"
        :mode="mode"
        :tab="selectedTab.name"
      />
      <component
        :show="showDialog && !showBoxCountDialog"
        v-if="showDialog && !showBoxCountDialog"
        @close="closeDialog"
        @save="this.setRenderKey()"
        :is="selectedTab.name"
        :mode="mode"
      ></component>
    </template>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import CustomSpeedDial from "./CustomSpeedDial.vue";
import { actions, editAction } from "../const.js";
import moment from "moment";
import ExpandedTable from "./ExpandTable.vue";

// dialogs
import Rates from "../Ecommerce/Bike/TableComponent/ExpandedDialog/rates.vue";
import BikeCustomerVan from "../Ecommerce/Bike/TableComponent/ExpandedDialog/bikeVanJob.vue";

import ChargeByWeight from "../Ecommerce/Van/TableComponent/Dialogs/weight.vue";
import ChargeByQty from "../Ecommerce/Van/TableComponent/Dialogs/quantity.vue";

import VanCustomerBikeJob from "../Ecommerce/Van/TableComponent/Dialogs/vanJob.vue";
import BoxCountCharge from "../Ecommerce/Van/TableComponent/Dialogs/boxCount.vue";

import {
  dataTableColumns,
  normalVanTwotierQuantityExpanded,
  ecommerceBikeSdRates,
  ecommerceBikeSdJob,
  ecommerceVanSdJob,
  ecommerceVanSdQuantity,
  ecommerceVanSdWeight,
  ecommerceVanSdRates,
  ecommerceVanSdBox,
} from "../const";
import SelectButton from "primevue/selectbutton";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    DataTable,
    Column,
    CustomSpeedDial,
    ExpandedTable,
    SelectButton,
    Rates,
    BikeCustomerVan,
    ChargeByWeight,
    VanCustomerBikeJob,
    ChargeByQty,
    BoxCountCharge,
  },
  props: [
    "editAction",
    "tabs",
    "expandedType",
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
    "storePath",
    "globalSearchString",
    "paginator",
    "selectionModeState",
    "formTableDataName",
    "isloading",
  ],
  data() {
    return {
      showDialog: false,
      boxCountColumns: ecommerceVanSdBox,
      editingRows: [],
      expandedRows: [],
      expandedTableColumns: dataTableColumns,
      actionsData: actions,
      selectedTab: [],
      mode: "",
      showAddNew: true,
      showBoxCountDialog: false,
    };
  },
  computed: {
    ...mapGetters({
      expandedDialog: "Outbound/Edit/expandedDialog",
    }),
  },
  watch: {
    expandedDialog() {
      if (this.expandedDialog) {
        if (this.expandedDialog?.field === "box_count") {
          this.showBoxCountDialog = true;
          this.mode = "Edit";
          return;
        } else {
          this.showDialog = true;
          this.mode = "Edit";
        }
      }
    },
    selectedTab() {
      this.displayAddNew();
    },
  },
  methods: {
    ...mapActions({
      setRenderKey: "Outbound/Edit/setRenderKey",
      setExpandedDialog: "Outbound/Edit/setExpandedDialog",
    }),
    displayAddNew() {
      switch (this.selectedTab.name) {
        case "bikeCustomerVan":
        case "chargeByWeight":
        case "chargeByQty":
        case "vanCustomerBikeJob":
          this.showAddNew = false;
          break;
        default:
          this.showAddNew = true;
          break;
      }
    },
    closeDialog() {
      this.showDialog = false;
      this.setExpandedDialog(false);
    },
    openDialog() {
      this.showDialog = true;
      this.mode = "Add";
    },
    openBoxCount() {
      this.showBoxCountDialog = true;
      this.mode = "Add";
    },
    closeBoxCountDialog() {
      this.showBoxCountDialog = false;
    },
    getTableColumns() {
      switch (this.tableName) {
        case "normalVanTwotierQuantity":
          return normalVanTwotierQuantityExpanded;
        case "ecommerceBikeSd":
        case "ecommerceBikeNd":
          if (this.selectedTab.component === "Rates") {
            return ecommerceBikeSdRates;
          } else if (this.selectedTab.component === "Bike Customer Van Job") {
            return ecommerceBikeSdJob;
          }
          break;
        case "ecommerceVanSd":
        case "ecommerceVanNd":
          if (this.selectedTab.component === "Charge by Weight") {
            return ecommerceVanSdWeight;
          } else if (this.selectedTab.component === "Charge by Quantity") {
            return ecommerceVanSdQuantity;
          } else if (this.selectedTab.component === "Rates") {
            return ecommerceVanSdRates;
          } else if (this.selectedTab.component === "Van Customer Bike Job") {
            return ecommerceVanSdJob;
          }
          break;
        default:
          return dataTableColumns;
      }
    },
    getTableData(data) {
      switch (this.tableName) {
        case "ecommerceBikeSd":
        case "ecommerceBikeNd":
          if (this.selectedTab.component === "Rates") {
            return data.rates_expanded;
          } else if (this.selectedTab.component === "Bike Customer Van Job") {
            return data.job_expanded;
          }
          break;
        case "ecommerceVanSd":
        case "ecommerceVanNd":
          if (this.selectedTab.component === "Charge by Weight") {
            return data.weight_expanded;
          } else if (this.selectedTab.component === "Charge by Quantity") {
            return data.quantity_expanded;
          } else if (this.selectedTab.component === "Rates") {
            return data.rates_expanded;
          } else if (this.selectedTab.component === "Van Customer Bike Job") {
            return data.job_expanded;
          }
          break;
        default:
          return data.expanded;
      }
    },
    dateFormater(data) {
      if (!data) return "-";
      let date = moment(data).format("DD MMM, YYYY");

      if (date === "Invalid date") {
        return data;
      } else {
        return date;
      }
    },
    timeFormater(data) {
      if (!data) return "-";
      let date = moment(data).format("hh:mm");

      if (date === "Invalid date") {
        return data;
      } else {
        return date;
      }
    },
  },
  created() {
    if (this.$props.tabs) {
      this.selectedTab = this.$props.tabs[0];
    }

    if (this.$props.editAction) {
      this.actionsData = editAction;
    } else {
      this.actionsData = actions;
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
