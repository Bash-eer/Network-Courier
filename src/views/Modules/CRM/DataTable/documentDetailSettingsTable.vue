<template>
  <DataTable
    :loading="$store.state['CrmSettings'].tableLoad"
    :class="tableClass"
    :showGridlines="false"
    :stripedRows="true"
    selectionMode="single"
    :dataKey="dataKey"
    responsiveLayout="scroll"
    :value="tableData"
    :paginator="true"
    v-model:expandedRows="expandedRows"
    @rowExpand="onRowExpand"
    @rowCollapse="onRowCollapse"
    :totalRecords="totalRecords"
    :rows="10"
    v-model:filters="filters"
    filterDisplay="menu"
    editMode="row"
    v-model:editingRows="editingRows"
    @row-edit-save="onRowEditSave"
    :globalFilterFields="[
      'job_type',
      'document_types',
      'createdAt',
      'user.display_name',
    ]"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <Column
      v-for="col of selectedColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :filterField="col.field"
      :showFilterMenu="
        col.header != 'Actions' && col.header != 'S. No' ? true : false
      "
      :sortable="col.header != 'Actions' ? true : false"
      :showFilterMatchModes="
        col.header != 'Actions' && col.header != 'S. No' ? true : false
      "
    >
      <template #body="slotProps">
        <span
          v-if="col.header == 'Actions'"
          class="flex align-items-center mr-2"
        >
          <CustomSpeedDial
            storePath="CrmSettings"
            tableName="crmSettingsDocumentDetailTable"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="overlayDataPrompt"
          />
        </span>
        <div @click="sendId(slotProps.data.id)">
          <span v-if="col.header == 'S. No'">
            {{ slotProps.data["s_no"] }}
          </span>

          <span v-if="col.header == 'Type'" class="mr-2">
            {{ slotProps.data["job_type"] }}
          </span>

          <span v-if="col.header == 'No of Document Detail Types'" class="ml-8">
            {{ slotProps.data["document_types"] }}
          </span>

          <span v-if="col.header == 'Created By'">
            {{ slotProps.data.user.display_name }}
          </span>

          <span v-if="col.header == 'Created On'">
            {{ dateFormater(slotProps.data["createdAt"]) }}
          </span>
        </div>
      </template>

      <template #editor="{ data }">
        <span v-if="col.header == 'Type'">
          <AddDropDown
            stateName="JobTypeDropDownList"
            :data="$store.state.CrmSettings.jobTypeDropDownList"
            :companyDetails="getJobTypeList"
            @name="emitdata"
            storePath="internationalInbound"
            v-model="data.job_type"
            :placeholder="selectJobtype"
            type="jobType"
            class="text-left w-25rem"
          >
            <template #value="slotProps">
              <div
                class="supervisor-item supervisor-item-value flex"
                v-if="slotProps.value"
              >
                <div>{{ slotProps.value.document_types }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              {{ slotProps }}
              <div>{{ slotProps.option.name }}</div>
            </template>
          </AddDropDown>
        </span>
      </template>

      <template #filter="{ filterModel }">
        <span
          v-if="
            col.header == 'Type' ||
            col.header == 'No of Document Detail Types' ||
            col.header == 'Created By'
          "
        >
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="getFilterPlaceHolder(col.header)"
          />
        </span>
        <span v-if="col.header == 'Created On'">
          <p class="mb-2"><b>Set a date range:</b></p>
          <Calendars
            :state="filterModel.value"
            v-model="filterModel.value"
            dateFormat="mm/dd/yy"
            placeholder="mm/dd/yyyy"
          />
        </span>
      </template>
    </Column>
    <Column
      :rowEditor="true"
      style="width: 10%; min-width: 8rem"
      bodyStyle="text-align:center"
    ></Column>
    <Column :expander="true" headerStyle="width: 1rem" />
    <template #empty> No data found </template>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import InputText from "primevue/inputtext";
import { mapActions, mapGetters } from "vuex";
import CustomSpeedDial from "../../../../components/Reusables/CRM/CustomSpeedDial.vue";
import { documentDetailTableOverlayData } from "../../../../components/Reusables/CRM/Const";
import AddDropDown from "../../../../components/Reusables/CRM/AddDropDown.vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";

export default {
  name: "documentDetailTable",
  components: {
    DataTable,
    Column,
    InputText,
    CustomSpeedDial,
    AddDropDown,
  },
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
    "totalRecords",
  ],
  data() {
    return {
      overlayDataPrompt: documentDetailTableOverlayData,
      expandedRows: [],
      rowSelect: null,
      filters: null,
      sortField: "createdAt",
      sortOrder: "DESC",
      filteredItems: [],
      expandedData: [],
      editingRows: [],
      jobTypeValue: " ",
      jobId: null,
      selectedColumns: null,
    };
  },

  methods: {
    ...mapActions({
      loadSpecificFeedbackData: "CrmSettings/specificFeedbackData",
      updateJobTypeDataCall: "CrmSettings/updateJobTypeDataCall",
      getDocumentDetailSettingsData:
        "CrmSettings/getDocumentDetailSettingsData",
      changeDocumentDetailTableView: "CrmSettings/updateTableView",
    }),

    sendId(id) {
      this.changeDocumentDetailTableView(id);
    },
    getFilterPlaceHolder(placeholder) {
      return "Search by" + " " + placeholder;
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM, YYYY");
        return formattedDate;
      }
    },
    processOverlayData(data, row) {
      return data;
    },

    emitdata(value) {
      this.jobId = value;
    },

    initilaizeColumns() {
      this.filters = {
        job_type: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        document_types: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        createdAt: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.BETWEEN }],
        },
        "user.display_name": {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
      };

      this.selectedColumns = this.tableColumns;
    },

    onRowEditSave(event) {
      const oldId = event.data?.job_type;
      const newId = event.newData?.job_type;
      if (oldId !== newId) {
        const UpdateData = {
          id: event.newData?.id,
          job_type: event.newData?.job_type,
        };
        this.updateJobTypeDataCall(UpdateData).then(async (c) => {
          if (c.data.status == 200) {
            await this.getDocumentDetailSettingsData();
            let info = "Updated Job Type successfully";
            this.commonToast("success", "Success", info);
          } else {
            let info = "Failed to Update Job Type";
            this.commonToast("error", "Error", info);
          }
        });
      }
    },
    commonToast(severity, summary, message) {
      this.display = false;
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: message,
        life: 3000,
      });
    },
    onRowCollapse(event) {
      this.expandedRows = this.expandedRows.filter(
        (data) => event?.data?.id !== data.id
      );
      this.tableData.map((obj) => {
        if (obj.id === event.data?.id) {
          obj.expanded = false;
        } else {
          obj.expanded = false;
        }
      });
    },
  },
  mounted() {
    this.initilaizeColumns();
    this.jobTypeValue = this.getJobTypeList ? this.getJobTypeList[0] : null;
  },
  computed: {
    ...mapGetters({
      getJobTypeList: "CrmSettings/getJobTypeList",
      onRowSelectInDataTableId: "CrmSettings/onRowSelectInDataTableId",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";

.p-paginator-page {
  background: $color-357dea;
  border-radius: 5px;
}

::v-deep .p-datatable-row-expansion {
  background: #e1eaf9 !important;
}

::v-deep .p-datatable .p-datatable-sm .p-datatable-tbody > tr > td {
  font-family: $font-family-third;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  color: $color-4e5968;
  word-wrap: break-word !important;
  width: 0px !important;
}
::v-deep .p-column-title {
  font-family: $font-family-third;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left !important;
  color: $color-7e84a7;
}
::v-deep .p-datatable .p-paginator-bottom {
  margin-top: 30px !important;
  margin-bottom: 20px !important;
  background-color: transparent !important;
}
::v-deep .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
  background: $color-357dea;
  border-radius: 5px;
  color: $color-fff;
}
::v-deep .p-paginator .p-paginator-current {
  font-family: $font-family-third;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  color: $color-4e5968;
  position: absolute;
  left: 0;
}
::v-deep .p-paginator .p-dropdown {
  position: absolute;
  right: 0;
}
::v-deep .p-paginator-icon {
  background: $color-fff;
  border-radius: 5px;
  padding: 10px;
}
::v-deep .pi {
  font-size: 12px !important;
}
::v-deep .p-paginator {
  background: $color-edf1f7 !important;
}

::v-deep .p-paginator {
  background: $color-edf1f7 !important;
}
::v-deep .p-column-filter-menu {
  margin-left: 0;
}
::v-deep .p-datatable .p-datatable-thead > tr > th {
  background: $color-fff !important;
}
::v-deep thead.p-datatable-thead {
  background: $color-fff !important;
}
</style>
