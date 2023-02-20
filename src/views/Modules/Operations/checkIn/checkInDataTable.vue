<template>
  <DataTable
    :showGridlines="false"
    :stripedRows="true"
    id="formTable"
    editMode="row"
    :key="renderKey"
    v-model:editingRows="editingRows"
    @row-edit-save="onRowEditSave"
    @row-edit-cancel="rowEditCancel"
    :rowClass="rowClass"
    responsiveLayout="scroll"
    :value="tabledata"
    v-model:selection="selectionMode"
    dataKey="id"
    @rowSelect="onRowSelectAndUnSelect"
    @rowUnselect="onRowSelectAndUnSelect"
    @row-select-all="selectAndUnSelectAllRows"
    @row-unselect-all="selectAndUnSelectAllRows"
    v-model:filters="filters"
    filterDisplay="menu"
    :globalFilterFields="[
      'm_chart.movement_chart_id',
      'booking.collection_slip_no',
      'estimated_delivery_datetime',
      'company_details.company_name',
      'info.service_type',
      'instruction',
      'status',
      'remarks',
    ]"
  >
    <Column selectionMode="multiple" headerStyle="width: 3em"> </Column>
    <Column
      v-for="col of tableColumn"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :filterField="col.field"
      :showFilterMenu="col.header != 'Actions' ? true : false"
      :sortable="col.header != 'Actions' ? true : false"
      :showFilterMatchModes="col.header != 'Actions' ? true : false"
    >
      <template #body="{ data }">
        <span v-if="col.header == 'Actions'">
          <CustomSpeedDial
            :rowData="data"
            :currentTab="currentTab"
            :customDialData="overlayOptionsMenuData"
            :tableName="tableName"
            @emitDialogLabel="showPrintLabelDialog"
          />
        </span>

        <span v-if="col.header == 'Collection Slip No'">
          <span class="blue_label">
            {{ data?.booking?.collection_slip_no || "-" }}</span
          >
        </span>

        <span v-if="col.header == 'Movement Chart ID'">
          <span class="blue_label">
            {{ data?.m_chart?.movement_chart_id || "-" }}</span
          >
        </span>

        <span v-if="col.header == 'Customer Name'">
          {{ data?.company_details?.company_name || "-" }}
        </span>

        <span v-if="col.header == 'Doc Type'">
          {{ data?.info?.service_type || "-" }}
        </span>

        <span v-if="col.header == 'Status'">
          <span :class="getStatusClassHandler(data[col.field])" class="mt-3">
            {{ data[col.field] }}
          </span>
        </span>

        <span v-if="col.header == 'Remarks'">
          <span v-if="data.selection && data.selection == true">
            <Dropdown
              v-model="data.remarks"
              :options="remarksDropdownData"
              optionLabel="name"
              optionValue="code"
              class="w-12rem ml-1"
              @change="updateRemarksData"
              :filter="true"
            >
            </Dropdown>
          </span>
          <span v-else>
            {{ data?.remarks || "-" }}
          </span>
        </span>

        <span
          v-if="
            col.header != 'Status' &&
            col.header != 'Collection Slip No' &&
            col.header != 'Movement Chart ID' &&
            col.header != 'Actions' &&
            col.header != 'Customer Name' &&
            col.header != 'Doc Type' &&
            col.header != 'Remarks'
          "
        >
          {{ data[col.field] }}
        </span>
      </template>

      <template #filter="{ filterModel }">
        <span v-if="col.header != 'Actions'">
          <InputText
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="getPlaceholder(col.header)"
          />
        </span>
      </template>
    </Column>
    <template #empty> No data found </template>
  </DataTable>

  <checkoutPrintDialog
    :dialogComponent="dialogComponent"
    :updateDialogData="updateDialogData"
    :title="dialogTitle"
    v-bind:is="initialComponent"
  />
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { dropdownOptions, overlayOptionsMenuData } from "./const.js";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { mapState, mapActions, mapMutations } from "vuex";
import checkoutPrintDialog from "./checkInActionMainDialog.vue";
import CustomSpeedDial from "./customSpeedDial.vue";
import { xorBy } from "lodash";

export default {
  components: {
    DataTable,
    Column,
    Dropdown,
    InputText,
    checkoutPrintDialog,
    CustomSpeedDial,
  },
  props: ["tableName", "tableColumn", "tableData"],
  data() {
    return {
      dropdownOptions,
      overlayOptionsMenuData,
      selectionMode: [],
      filters: null,
      tabledata: [],
      editingRows: [],
      renderKey: 10,
      updateDialogData: "",
      dialogTitle: "",
      initialComponent: "",
      dialogComponent: "",
    };
  },
  created() {
    this.initializeFilters();
    this.loadInitialData();
  },
  computed: {
    ...mapState({
      remarksDropdownData: (state) => state.CheckInTab.remarksDropdownData,
      jobsData: (state) => state.CheckInTab.jobsData,
      totalJobsData: (state) => state.CheckInTab.totalJobsData,
      selectedJobsData: (state) => state.CheckInTab.selectedJobsData,
      totalJobsSelected: (state) => state.CheckInTab.totalJobsSelected,
    }),
  },
  methods: {
    ...mapActions({
      showCheckoutPrintPreviewDialog: "CheckInTab/showPrintPreviewDialog",
    }),

    ...mapMutations({
      updateSelectionMode: "CheckInTab/updateSelectionMode",
      clearJobsData: "CheckInTab/clearJobsData",
      clearSelectionJobsData: "CheckInTab/clearSelectionJobsData",
    }),

    getPlaceholder(head) {
      return `search by ${head}`;
    },

    loadInitialData() {
      this.tabledata = this.tableData;
      this.clearJobsData();
      this.clearSelectionJobsData();
    },

    showPrintLabelDialog(data) {
      this.updateDialogData = data.data;
      this.dialogTitle = data.title;
      const dialogData = {
        displayDialog: true,
        formData: this.updateDialogData,
      };
      this.showCheckoutPrintPreviewDialog(dialogData);
    },

    getStatusClassHandler(type) {
      let style;
      switch (type) {
        case "Delivered":
          style = "deliveredStyle";
          break;
        case "Not Delivered":
          style = "notDeliveredStyle";
          break;
        default:
          style = "color-66c11e";
      }
      return style;
    },

    updateRemarksData() {
      this.$emit("editData", this.tabledata);
    },

    checkOnDropdown(arr) {
      this.tabledata = this.tabledata.map((ele) => {
        return {
          ...ele,
          selection: arr.includes(ele.id) ? true : false,
        };
      });
    },

    onRowSelectAndUnSelect(event) {
      const data = this.selectionMode.map((ele) => ele.id);
      this.checkOnDropdown(data);
      this.updateSelectionMode(this.selectionMode);
    },

    selectAndUnSelectAllRows() {
      this.tabledata = this.tabledata.map((ele) => {
        return {
          ...ele,
          selection: this.selectionMode.length ? true : false,
        };
      });
      this.updateSelectionMode(this.selectionMode);
      this.$emit("editData", this.tabledata);
    },

    checkAndPushTableData() {
      if (this.jobsData && this.totalJobsData && this.tabledata != null) {
        const data = xorBy(this.tabledata, this.jobsData, "id");
        data.forEach((ele) => this.tabledata.push(ele));
      } else {
        this.tabledata = this.jobsData == null ? [] : this.jobsData;
      }
    },

    checkAndPushSelection() {
      if (this.selectedJobsData && this.totalJobsSelected) {
        const data = xorBy(this.selectionMode, this.selectedJobsData, "id");
        data.forEach((ele) => this.selectionMode.push(ele));
      } else {
        this.selectionMode =
          this.selectedJobsData == null ? [] : this.selectedJobsData;
      }
      const selectedDataId = this.selectionMode.map((ele) => ele.id);
      this.checkOnDropdown(selectedDataId);
      this.renderKey++;
    },

    initializeFilters() {
      this.filters = {
        global: {
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        "m_chart.movement_chart_id": {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        "booking.collection_slip_no": {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        "company_details.company_name": {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        "info.service_type": {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        instruction: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        status: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        remarks: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        estimated_delivery_datetime: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.BETWEEN }],
        },
      };
    },
  },

  watch: {
    totalJobsData: function () {
      this.checkAndPushTableData();
    },
    totalJobsSelected: function () {
      this.checkAndPushSelection();
    },
  },
};
</script>

<style lang="scss" scoped>
.blue_label {
  color: #357dea !important;
}
::v-deep.p-datatable .p-datatable-thead > tr > th {
  background: #edf1f7 !important;
  color: #7e84a7 !important;
  padding: 0.7rem 1rem !important;
  font-size: 12px !important;
}

::v-deep.p-datatable .p-sortable-column .p-sortable-column-icon {
  color: #7e84a7 !important;
  font-size: 12px !important;
}

::v-deep.p-datatable .p-datatable-tbody > tr > td {
  padding: 0.6rem 1rem !important;
  font-size: 12px !important;
  color: #4e5968 !important;
}
::v-deep.p-dropdown .p-dropdown-label {
  font-size: 0.75rem !important;
}

.deliveredStyle {
  padding: 5px 12px;
  gap: 10px;
  width: 107px;
  height: 30px;
  left: 1543px;
  top: 556px;

  color: #269337;
  background: #b1fcdd;
  border-radius: 7px;
}
.notDeliveredStyle {
  padding: 5px 12px;
  gap: 10px;
  color: #e1b929;

  width: 107px;
  height: 30px;
  left: 1543px;
  top: 556px;

  background: #fff5ec;
  border-radius: 7px;
}
</style>
