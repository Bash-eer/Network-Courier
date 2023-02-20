<template :key="renderKey">
  <DataTable
    :class="tableClass"
    :showGridlines="false"
    :stripedRows="true"
    :rowClass="rowClass"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    @row-select-all="selectAllRows"
    @row-unselect-all="unSelectAllRows"
    v-model:selection="selectionMode"
    v-model:expandedRows="expandedRows"
    :dataKey="dataKey"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
    responsiveLayout="scroll"
    :value="wholeTableData"
    editMode="row"
    v-model:editingRows="editingRows"
    @row-edit-save="onRowEditSave"
    :paginator="tableName == 'QuotationTabSubTable' ? false : true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <Column selectionMode="multiple" headerStyle="width: 1em"></Column>

    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :showFilterMenu="
        col.header != 'Actions' && tableName != 'QuotationTabSubTable'
          ? true
          : false
      "
      :sortable="tableName != 'QuotationTabSubTable' ? true : false"
    >
      <template #body="slotProps">
        <span v-if="col.header == 'Trip No'">
          {{ slotProps.data.trip_name }}
        </span>
        <span v-if="col.header == 'Vehicle'">
          {{ slotProps.data.vehicle }}
        </span>

        <span v-if="col.header == 'Route'">
          {{ slotProps.data.route }}
        </span>

        <span v-if="col.header == 'Document'">
          {{ slotProps.data.document }}
        </span>
        <span v-if="col.header == 'Parcel'">
          {{ slotProps.data.parcel }}
        </span>
        <span v-if="col.header == 'Delivery Type'">
          {{ slotProps.data.delivery_type }}
        </span>
      </template>

      <template #editor="{ data }">
        <span v-if="col.header == 'Trip No'">
          {{ data.trip_name }}
        </span>
        <span v-if="col.header == 'Vehicle'">
          <Dropdown
            v-model="data.vehicle"
            :options="DriverMovementMainTableDataVehicles"
            optionLabel="reg_no"
            optionValue="reg_no"
            placeholder="Select"
            :filter="true"
          >
          </Dropdown>
        </span>

        <span v-if="col.header == 'Route'">
          <InputText type="text" v-model="data.route" />
        </span>

        <span v-if="col.header == 'Document'" class="document">
          <InputText type="text" v-model="data.document" />
        </span>
        <span v-if="col.header == 'Parcel'" class="document">
          <InputText type="text" v-model="data.parcel" />
        </span>

        <span v-if="col.header == 'Delivery Type'">
          <Dropdown
            v-model="data.delivery_type"
            :options="DriverMovementMainTableDataDriverType"
            optionValue="delivery_type"
            placeholder="Select a Status"
            :filter="true"
          >
            <template #value="slotProps">
              <div
                class="supervisor-item supervisor-item-value flex"
                v-if="slotProps"
              >
                <div>{{ slotProps.value }}</div>
              </div>
            </template>

            <template #option="slotProps">
              <span>{{ slotProps.option.delivery_type }}</span>
            </template>
          </Dropdown>
        </span>
      </template>
    </Column>
    <Column
      :rowEditor="true"
      style="width: 10%; min-width: 8rem"
      bodyStyle="text-align:center"
    ></Column>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import Dropdown from "primevue/dropdown";
// import CustomSpeedDial from "./CustomSpeedDial.vue";
import { mapActions, mapGetters } from "vuex";
import InputText from "primevue/inputtext";

export default {
  name: "CheckedDataTable",
  components: {
    DataTable,
    Column,
    Dropdown,
    InputText,
    // CustomSpeedDial,
  },
  slotProps: {},
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
    "selectedTabValues",
    "selectedCustomer",
    "suspenstionAttachments",
  ],
  data() {
    return {
      expandedRows: [],
      selectionMode: [],
      editingRows: [],
      wholeTableData: null,
      rowSelect: null,
      updateBtn: true,
      value: null,
      renderKey: 1,
      overlayDataPrompt: [
        {
          label: "Edit",
          icon: "fas fa-pen",
        },
        {
          label: "Delete",
          icon: "fas fa-user-times",
        },
      ],
    };
  },

  created() {
    this.wholeTableData = this.tableData;
    this.selectionMode = this.selectedCustomer;
  },
  unmounted() {
    this.wholeTableData = [];
    this.renderKey++;
  },

  methods: {
    emittedCustomerSuspenstionValue(data) {
      this.$emit("emitCustomerSuspenstionPage", data);
    },

    onRowEditSave(event) {
      let { newData, index } = event;
      this.wholeTableData[index] = newData;
      for (let i in this.selectionMode) {
        if (
          this.wholeTableData[index].trip_id == this.selectionMode[i].trip_id
        ) {
          this.selectionMode[i] = this.wholeTableData[index];
        }
      }
      this.$emit("selectedTrips", this.selectionMode);
    },

    rowClass(row) {
      for (var r in row) {
        if (r == "company_status") {
          if (row[r] == "deleted") {
            return "deleted_row";
          }
        }
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

    selectAllRows(event) {
      event.data.map((list) => {
        list["selected"] = true;
      });
      this.$emit("TableSelectedValue", this.selectionMode);
    },

    unSelectAllRows(event) {
      this.tableData.map((list) => {
        list["selected"] = false;
      });
      this.$emit("TableSelectedValue", this.selectionMode);
    },

    onRowSelect(event) {
      event.data["selected"] = true;
      this.$emit("TableSelectedValue", this.selectionMode);
    },

    onRowUnselect(event) {
      event.data["selected"] = false;
      this.$emit("TableSelectedValue", this.selectionMode);
    },
  },
  computed: {
    ...mapGetters({
      selectedCostCenterMethod: "CustomerLaunchStore/selectedCostCenterMethod",
      DriverMovementMainTableDataTrips:
        "DriverMovement/DriverMovementMainTableDataTrips",
      DriverMovementMainTableDataVehicles:
        "DriverMovement/DriverMovementMainTableDataVehicles",
      DriverMovementMainTableDataDriver:
        "DriverMovement/DriverMovementMainTableDataDriver",
      DriverMovementMainTableDataDriverType:
        "DriverMovement/DriverMovementMainTableDataDriverType",
    }),
  },
  watch: {
    tableData: {
      handler() {
        this.wholeTableData = this.tableData;
      },
      deep: true,
    },
    selectedCustomer: {
      handler() {
        this.selectionMode = this.selectedCustomer;
      },
      deep: true,
    },
    selectionMode(value) {
      this.$emit("selectedTrips", value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.no_data {
  text-align: center;
  font-weight: bold;
}
::v-deep .deleted_row {
  background-color: #fff2f2 !important;
}
.activeClass {
  color: #17c079;
  font-weight: bold;
}

.inactiveClass {
  color: #ea6e39;
  font-weight: bold;
}
.heading {
  color: #4e5868;
}
.sub {
  color: #7e84a7;
}
.inclusions {
  font-weight: 600;
  font-size: 12px;
  color: #4e5868;
}
.siteOfficeCharges {
  margin-left: 1.4%;
}
.horizontal_line {
  margin: 0px !important;
  margin-top: 1.1% !important;
}
.seaDivLarge {
  background: #f3f7ff;
  border: 1px solid rgba(126, 132, 167, 0.3);
  border-radius: 8px;
  height: 50%;
  width: 100%;
}
.profileName {
  margin-left: 0.6% !important;
}
.quotation {
  margin-left: 1em !important;
}
.address {
  margin-left: 2% !important;
}
.revisionsDiv {
  background: #fbfbfb;
  height: 10%;
  width: 100%;
}
.add_countries {
  text-align: center;
  color: #357dea;
  cursor: pointer;
}
.rate-badge {
  background: #fff8e2;
  color: #f0bd76;
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
}

::v-deep .card {
  padding-left: 0 !important;
  padding-right: 0 !important;
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
.p-paginator-page {
  background: #357dea;
  border-radius: 5px;
}

::v-deep .QuotationTabTable .p-datatable-thead > tr > th {
  background-color: #fff !important;
  border: none !important;
  font-family: $font-family-primary;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: left;
}

::v-deep .p-datatable-row-expansion {
  background: #e1eaf9 !important;
}

::v-deep .p-datatable .p-datatable-sm .p-datatable-tbody > tr > td {
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
::v-deep .QuotationTabTable .p-paginator {
  background: #edf1f7 !important;
  border: 0 !important;
  width: 100% !important;
}

::v-deep .timeLineExpressCostCenterTable .p-paginator {
  background: #ffff !important;
  border: 0 !important;
  width: 100% !important;
}
::v-deep .activityLogTable > .p-paginator {
  background: white !important;
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
.custom-avatar-group-lable {
  width: 100px;
  height: 100px !important;
  background: #eaa235;
  color: #7e84a7;
  // opacity: 0.2;
  border-radius: 5px;
}
.p-avatar {
  background-color: #dceafd;
  border-radius: 5px;
  color: #7e84a7;
  width: 24px;
  height: 28px;
}

::v-deep .p-datatable .p-datatable-thead > tr > th {
  text-align: left;
  // padding: 1rem 1rem;
  border: 1px solid #e9ecef;
  border-width: 0 0 1px 0;
  font-weight: 600;
  color: #495057;
  background: #d7e7ff !important;
  transition: box-shadow 0.2s;
}

::v-deep .p-datatable .p-sortable-column.p-highlight:hover {
  background: #d7e7ff;
  color: #2196f3;
}

::v-deep .p-datatable .p-sortable-column.p-highlight {
  background: #d7e7ff;
  color: #2196f3;
}

.btn-go-property {
  background-color: #fff;
  color: #357dea;
  font-weight: 700;
  font-size: 14px;
}

.contentText {
  color: #4e5868;
  font-weight: 700;
}

.rows {
  border-left: solid 1px grey;
  opacity: 0.4;
}
.p-datatable {
  padding: 0 !important;
}
.document .p-inputtext {
  width: 5rem !important;
}
</style>
