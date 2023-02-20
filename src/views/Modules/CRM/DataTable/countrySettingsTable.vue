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
      'country_iso_code',
      'country_name',
      'created_by',
      'createdAt',
      'states',
    ]"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <Column :expander="true" headerStyle="width: 1rem" />
    <Column
      v-for="col of selectedColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :filterField="col.field"
      :showFilterMenu="
        col.header != 'Actions' &&
        col.header != 'S. No' &&
        col.header != 'State Mandatory' &&
        col.header != 'Postal Code Mandatory' &&
        col.header != 'Status'
          ? true
          : false
      "
      :sortable="col.header != 'Actions' ? true : false"
      :dataType="col.header == 'Created On' ? 'date' : 'text'"
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
            tableName="crmSettingsCountryTable"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="overlayDataPrompt"
            @emittedEditFunctCountryTable="emittedEditCountryTable"
          />
        </span>
        <div @click="sendId(slotProps.data.id)">
          <span v-if="col.header == 'S. No'">
            {{ slotProps.data["s_no"] }}
          </span>

          <span v-if="col.header == 'Country Code'" class="ml-6">
            {{ slotProps.data["country_iso_code"] }}
          </span>

          <span v-if="col.header == 'Country'">
            {{ slotProps.data["country_name"] }}
          </span>

          <span v-if="col.header == 'States'" class="ml-6">
            {{ slotProps.data["states"] }}
          </span>

          <span v-if="col.header == 'State Mandatory'" class="ml-6">
            {{ slotProps.data["state_mandatory"] == true ? "Yes" : "No" }}
          </span>

          <span v-if="col.header == 'Postal Code Mandatory'" class="ml-8">
            {{ slotProps.data["postal_code_mandatory"] == true ? "Yes" : "No" }}
          </span>

          <span v-if="col.header == 'Created By'">
            {{ slotProps.data.user.display_name }}
          </span>

          <span v-if="col.header == 'Created On'" class="ml-6">
            {{ dateFormater(slotProps.data["createdAt"]) }}
          </span>
          <span v-if="col.header == 'Status'">
            <span
              :class="
                slotProps.data['status'] == ('Active' || 'active')
                  ? 'activeBgClass'
                  : 'inactiveBgClass'
              "
            >
              <span
                :class="
                  slotProps.data['status'] == ('Active' || 'active')
                    ? 'activeClass'
                    : 'inactiveClass'
                "
                >{{ slotProps.data["status"] }}</span
              >
            </span>
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
            col.header == 'Country Code' ||
            col.header == 'Country' ||
            col.header == 'Created By' ||
            col.header == 'States'
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
    <template #expansion="slotProps">
      <div class="flex mb-3">
        <div
          class="expansion-container ml-2"
          v-for="(item, index) of expandedData"
          :key="index"
        >
          <Chip :label="item.state" class="mb-2" :dataKey="slotProps.data.id" />
        </div>
      </div>
      <div
        class="add-item align-item-center pl-2 mt-2 font-size-12"
        @click="addItem(slotProps.data)"
      >
        <i class="pi pi-plus"></i>Add States
      </div>

      <div class="flex flex-row mt-2">
        <img src="/images/Component2.png" class="mb-4" />
        <div class="flex-column">
          <h6 class="ml-2">Prohibited Items</h6>
          <div class="flex">
            <div
              class="expansion-container ml-2 flex-column"
              v-for="(item, index) of ProhibitedData"
              :key="index"
            >
              <span>
                {{ item.item }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
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
import { CountrySettingsOverlayData } from "../../../../components/Reusables/CRM/Const";
import AddDropDown from "../../../../components/Reusables/CRM/AddDropDown.vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import Chip from "primevue/chip";

export default {
  name: "countrySettingsTable",
  components: {
    DataTable,
    Column,
    InputText,
    CustomSpeedDial,
    AddDropDown,
    Chip,
  },
  props: [
    "tableDataName",
    "tableName",
    "tableClass",
    "tableData",
    "tableColumn",
    "overlayData",
    "globalSearchString",
    "paginator",
    "storePath",
    "dataKey",
    "totalRecords",
    "editCountryValue",
  ],
  data() {
    return {
      overlayDataPrompt: CountrySettingsOverlayData,
      expandedRows: [],
      rowSelect: null,
      filters: null,
      sortField: "createdAt",
      sortOrder: "DESC",
      filteredItems: [],
      expandedData: null,
      editingRows: [],
      jobTypeValue: " ",
      jobId: null,
      selectedColumns: null,
      stateId: null,
      ProhibitedData: null,
    };
  },

  methods: {
    ...mapActions({
      getCoutriesStateData: "CrmSettings/getCoutriesStateData",
      showCountrySettingsDialog: "CrmSettings/showCountrySettingsDialog",
      updateBtnData: "CrmSettings/updateBtnData",
    }),
    getFilterPlaceHolder(placeholder) {
      return "Search by" + " " + placeholder;
    },
    addItem(id) {
      this.$store.state.CrmSettings.countriesAddData = "addState";

      if (this.$store.state.CrmSettings.countriesAddData) {
        this.updateBtnData(true);
        this.$emit("tableData", id);
        const dialogData = {
          displayDialog: true,
          formData: {},
        };
        this.showCountrySettingsDialog(dialogData);
      }
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMM, YYYY");
        return formattedDate;
      }
    },
    processOverlayData(data, row) {
      return data;
    },

    emitdata(value) {
      this.jobId = value;
    },

    emittedEditCountryTable(data) {
      this.$emit("emittedEditCountryParent", data);
    },
    initilaizeColumns() {
      this.filters = {
        country_iso_code: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        country_name: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        states: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        created_by: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        createdAt: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.BETWEEN }],
        },
      };

      this.selectedColumns = this.tableColumn;
    },

    onRowEditSave(event) {
      const oldId = event.data?.job_type;
      const newId = event.newData?.job_type;
      if (oldId !== newId) {
        const UpdateData = {
          id: event.newData?.id,
          job_type: event.newData?.job_type,
        };
        this.updateJobTypeDataCall(UpdateData);
      }
    },
    async onRowExpand(event) {
      this.expandedRows = this.tableData.filter(
        (data) => event?.data?.id === data.id
      );
      this.tableData.map((obj) => {
        if (obj.id === event.data.id) {
          obj.expanded = !obj.expanded;
        } else {
          obj.expanded = false;
        }
      });
      let feedbackSettingParams = {
        id: event.data.id,
      };

      const Response = await this.getCoutriesStateData(feedbackSettingParams);
      if (Response.status === 200) {
        let expandedData = Response.data?.results.states || [];
        this.expandedData = expandedData.map((res, index) => {
          return res;
        });
        let ProhibitedData = Response.data?.results.prohibited_items || [];
        this.ProhibitedData = ProhibitedData.map((res, index) => {
          return res;
        });
      }
    },
  },
  mounted() {
    this.initilaizeColumns();
  },
  computed: {
    ...mapGetters({}),
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
::v-deep .p-chip {
  background: rgba(126, 132, 167, 1);
  border-radius: 2px;
  color: white;
}
.add-item,
.add-item > i {
  color: #1e90ff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
}
.add-item > i {
  font-size: 10px !important;
}
.inactiveClass {
  color: #dd2025;
  font-weight: 600 !important;
}
.inactiveBgClass {
  background-color: rgba(255, 86, 86, 0.3);
  width: 80px;
  height: 30px;
  border-radius: 7px;
  padding: 5px 12px;
}
.activeClass {
  color: $color-17c079;
  font-weight: bold;
}
.activeBgClass {
  background-color: #b1fcdd;
  width: 80px;
  height: 30px;
  border-radius: 7px;
  padding: 5px 12px;
}
</style>
