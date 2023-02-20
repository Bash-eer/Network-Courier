

<template>
  <DataTable
    :key="renderKey"
    :class="'region-rates-table'"
    class="p-datatable-sm editable-cells-table"
    id="id"
    :value="tableData"
    :rowClass="rowClass"
    responsiveLayout="scroll"
    filterDisplay="menu"
    selectionMode="multiple"
    @cell-edit-complete="onCellEditComplete"
    v-model:filters="filters"
    :globalFilterFields="getGlobalFields()"
    v-model:selection="selectionMode"
    v-model:expandedRows="expandedRows"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    :paginator="true"
    :rows="10"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <template #empty><div class="p-3">No data found.</div></template>

    <Column
      v-for="col of tableColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      class="EditTable"
      :sortable="col.header != 'S.No' && col.header != 'Actions' ? true : false"
      :showFilterMenu="
        col.header != 'S.No' && col.header != 'Actions' ? true : false
      "
      :showFilterMatchModes="col.header == 'Created On' ? false : true"
    >
      <template #body="slotProps">
        <span v-if="col.header == 'Actions'" class="flex align-items-center">
          <CustomSpeedDials
            storePath="sales"
            :dataName="tableName"
            :rowData="slotProps.data"
            :customDialData="OverlayData"
          />
        </span>
        <!-- tempId -->
        <span v-if="col.header == 'Template ID'">
          <div class="flex tempID">
            {{ slotProps.data[col.field] }}
          </div>
        </span>
        <!-- TEMPLATE : Attachments -->
        <span v-if="col.header == 'Document'">
          <span
            class="mx-3"
            v-if="getFilesLength(slotProps.data[col.field]) == 0"
            >-</span
          >
          <span v-else>
            <div
              v-for="(files, index) in slotProps.data[col.field]"
              :key="index"
              class="
                wrap-insider
                flex flex-row
                align-items-center
                justify-content-center
              "
            >
              <img
                v-if="files.mime_type == 'image/png'"
                src="/images/drag-drop-img.png"
                alt=""
              />
              <img
                v-else-if="files.mime_type == 'application/pdf'"
                src="/images/drag-drop-pdf.png"
                alt=""
              />

              <img
                v-else-if="
                  files.mime_type ==
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                "
                src="../../../../../../src/assets/word.png"
                alt=""
              />
              <img
                v-else-if="
                  files.mime_type ==
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                  files.mime_type == 'application/vnd.ms-excel'
                "
                src="/images/drag-drop-excel.png"
                alt=""
              />
              <img v-else src="/images/drag-drop-doc.png" alt="" />
            </div>
          </span>
        </span>
        <span
          v-else-if="col.header != 'Document' && col.header != 'Template ID'"
          >{{ slotProps.data[col.field] }}</span
        >
      </template>
      <template #filter="{ filterModel }">
        <!--Status Enum Filter-->
        <span v-if="col.header == 'Status'">
          <Dropdown
            code="code"
            v-model="filterModel.value"
            :options="$store.state.contacts.appointmentStatusDropdownData"
            placeholder="Search By Status"
            class="p-column-filter"
            :showClear="true"
          >
            <template #value="slotProps">
              <span
                :class="'customer-badge status-' + slotProps.value"
                v-if="slotProps.value"
                >{{ slotProps.value }}</span
              >
              <span v-else>{{ slotProps.placeholder }}</span>
            </template>
            <template #option="slotProps">
              <span :class="'customer-badge status-' + slotProps.option">{{
                slotProps.option
              }}</span>
            </template>
          </Dropdown>
        </span>
        <!--Text Filter-->
        <span v-if="col.header != 'Created On'">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="getFilterPlaceHolder(col.header)"
          />
        </span>
      </template>
    </Column>
    <Column
      v-if="tableName == 'documentTable' || tableName == 'emailTable'"
      :expander="true"
      headerStyle="width: 1rem"
      class="expander"
    />
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import { mapGetters } from "vuex";
import InputText from "primevue/inputtext";
import CustomSpeedDials from "../Components/CustomSpeedDial.vue";
// import InputNumber from "primevue/inputnumber";
import { FilterMatchMode, FilterOperator } from "primevue/api";

export default {
  components: {
    DataTable,
    Column,
    CustomSpeedDials,
    InputText,
  },
  props: [
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
    "isAmtDisabled",
    "isPercentDisabled",
  ],
  data() {
    return {
      selectedData: null,
      disabled: true,
      amountDisabled: false,
      percentageDisabled: false,
      renderKey: 10,
      expandedRows: [],
      selectionMode: [],
      checkBoxClick: false,
      checkBoxClick2: false,
      removedTableData: [],
      filters: null,
      OverlayData: [
        {
          label: "Edit",
          icon: "fas fa-pen",
        },
        {
          label: "Delete",
          icon: "fas fa-user-times",
        },
      ],
      details: {
        batch_name: "",
        Increment_Percentage: 0,
        Remarks: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      bulkAdjustmentAddNewData: "bulkAdjustment/bulkAdjustmentAddNewData",
    }),
  },
  methods: {
    isPositiveInteger(val) {
      let str = String(val);
      str = str.trim();
      if (!str) {
        return false;
      }
      str = str.replace(/^0+/, "") || "0";
      var n = Math.floor(Number(str));
      return n !== Infinity && String(n) === str && n >= 0;
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
    initilaizeFilters() {
      let obj = {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      };
      this.filters = {
        global: {
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
      };
      for (let c in this.tableColumns) {
        this.filters[this.tableColumns[c]["field"]] = obj;
      }
    },
    getGlobalFields() {
      let globalFields = [];
      for (let c in this.tableColumns) {
        globalFields.push(this.tableColumns[c]["field"]);
      }
      return globalFields;
    },
    getFilterPlaceHolder(placeholder) {
      return "Search by" + " " + placeholder;
    },
    selectAllRows(event) {
      this.$store.state[this.storePath][this.tableName] = this.selectionMode;
    },
    // eslint-disable-next-line no-unused-vars
    unSelectAllRows(event) {
      this.$store.state[this.storePath][this.tableName] = this.selectionMode;
    },
    // eslint-disable-next-line no-unused-vars
    onRowSelect(event) {
      if (this.tableName == "documentTable") {
        this.$store.state.templateSettings.documentRowData = event?.data;
        this.$router.push({
          name: "DocumentRowProfile",
          params: {
            id: event.data.id,
            type: "Document",
            module: event?.data?.module_name,
          },
        });
      } else if (this.tableName == "emailTable") {
        this.$store.state.templateSettings.emailRowData = event?.data;
        this.$router.push({
          name: "EmailRowProfile",
          params: {
            id: event.data.id,
            type: "Email",
            module: event?.data?.module_name,
          },
        });
      }
    },
    // eslint-disable-next-line no-unused-vars
    onRowUnselect(event) {
      this.$store.state.bulkAdjustment.EcomProfileData.map((list) => {
        if (list.id == event.data.id) {
          list.selected = false;
        }
      });
      // this.selectedData.data.selected = false;
      // event.data.selected = false;
      // this.$store.state[this.storePath][this.tableName] = event.data;
    },
    onRowExpand(event) {},
    getFilesLength(files) {
      if (files != null) {
        // if(files.length > 0){
        return files.length;
        // }
      }
    },
  },
  created() {
    this.initilaizeFilters();
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
    selectionMode(value, row) {
      if (this.tableName == "EcommerceTable") {
        value?.map((list) => {
          list.selected = true;
        });
      }
    },
    "$store.state.templateSettings.globalSearch": function () {
      this.filters["global"].value =
        this.$store.state[this.storePath].globalSearch;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";

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
::v-deep .p-datatable {
  padding: 10px !important;
  margin-right: 10px !important;
  background-color: #fff !important;
}
::v-deep .p-datatable-thead > tr > th {
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
::v-deep .p-paginator .p-paginator-current {
  padding-left: 20px !important;
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
  margin-right: 20px;
}
::v-deep .p-paginator-icon {
  background: #fff;
  border-radius: 5px;
  padding: 10px;
}
::v-deep .pi {
  font-size: 12px !important;
}
::v-deep(.editable-cells-table td.p-cell-editing) {
  padding-top: 0;
  padding-bottom: 0;
}
.expander {
  pointer-events: none !important;
}
::v-deep .tempID {
  color: #7469f2 !important;
  background: #e3e1fc !important;
  border-radius: 4px;
  font-size: 0.875rem;
  padding: 0.4375rem 0.4375rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
