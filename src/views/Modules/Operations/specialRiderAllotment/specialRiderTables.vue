<template>
  <DataTable
    :loading="$store.state['specialRiderAllotment'].tableLoad"
    :showGridlines="false"
    :stripedRows="true"
    selectionMode="single"
    :dataKey="dataKey"
    responsiveLayout="scroll"
    :value="tableData"
    :paginator="true"
    :totalRecords="totalRecords"
    :rows="10"
    v-model:filters="filters"
    filterDisplay="menu"
    :globalFilterFields="[
      'created_by',
      'createdAt',
      'employeeRoles.employee_name',
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
        col.header != 'S.No' &&
        col.header !== 'Actions' &&
        col.header !== 'Special Rider' &&
        col.header !== 'Special Driver' &&
        col.header !== 'Supervisor' &&
        col.header !== 'Rapido Driver'
          ? true
          : false
      "
      :sortable="
        col.header !== 'Actions' &&
        col.header !== 'Special Rider' &&
        col.header !== 'Special Driver' &&
        col.header !== 'Supervisor' &&
        col.header !== 'Rapido Driver'
          ? true
          : false
      "
      :showFilterMatchModes="
        col.header != 'S.No' && col.header !== 'Actions' ? true : false
      "
    >
      <template #body="slotProps">
        <span v-if="col.header == 'Employee'" class="mr-2">
          <img
            :src="
              slotProps.data?.employeeRoles &&
              slotProps.data.employeeRoles?.image_url != 'null'
                ? slotProps.data.employeeRoles?.image_url
                : '/images/noavatar.png'
            "
            class="supervisor-image"
          />
          <span class="ml-2">{{
            slotProps.data.employeeRoles?.employee_name || "Assign SpecialRider"
          }}</span>
        </span>

        <span v-if="col.header == 'Special Rider'" class="pl-4">
          <img
            :src="
              slotProps.data?.specialrider == true
                ? '/images/Vectortick.png'
                : null
            "
          />
        </span>

        <span v-if="col.header == 'Special Driver'" class="pl-4">
          <img
            :src="
              slotProps.data?.specialdriver == true
                ? '/images/Vectortick.png'
                : null
            "
          />
        </span>

        <span v-if="col.header == 'Supervisor'" class="pl-4">
          <img
            :src="
              slotProps.data?.supervisor == true
                ? '/images/Vectortick.png'
                : null
            "
          />
        </span>

        <span v-if="col.header == 'Rapido Driver'" class="pl-4">
          <img
            :src="
              slotProps.data?.rapidodriver == true
                ? '/images/Vectortick.png'
                : null
            "
          />
        </span>

        <span v-if="col.header == 'S.No'">
          {{ slotProps.data["s_no"] }}
        </span>

        <span v-if="col.header == 'Created By'">
          {{ slotProps.data["creator"]["display_name"] }}
        </span>

        <span v-if="col.header == 'Created On'">
          {{ dateFormater(slotProps.data["createdAt"]) }}
        </span>

        <span v-if="col.header == 'Actions'" class="mr-2">
          <CustomSpeedDial
            storePath="specialRider"
            :dataName="tableDataName"
            :rowData="slotProps.data"
            :customDialData="customSpeedDialTabData"
            :tableName="tableName"
            @emitEditData="editData(slotProps.data)"
          />
        </span>
      </template>
      <template #filter="{ filterModel }">
        <span v-if="col.header == 'Employee' || col.header == 'Created By'">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            placeholder="Search by name"
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
    <template #empty> No data found </template>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { mapActions, mapGetters } from "vuex";
import InputText from "primevue/inputtext";
import CustomSpeedDial from "./CustomSpeedDial.vue";

export default {
  name: "SupervisorTables",
  components: {
    DataTable,
    Column,
    InputText,
    CustomSpeedDial,
  },
  props: ["tableColumns", "tableData", "tableName"],
  data() {
    return {
      filters: null,
      selectedColumns: null,
      editingRows: [],
      selectedType: null,
    };
  },

  methods: {
    ...mapActions({
      employeeDropDownList: "specialRiderAllotment/employeeDropDownList",
    }),

    editData(data) {
      this.$emit("emittedUpdateData", data);
    },

    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM, YYYY", "hh:mm A");
        return formattedDate;
      }
    },
    processOverlayData(data, row) {
      data.currentTab = this.currentTab;
      return data;
    },
    initilaizeColumns() {
      this.filters = {
        created_by: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        createdAt: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        "employeeRoles.employee_name": {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
      };
      this.selectedColumns = this.tableColumns;
    },
    commonToast(severity, summary, message) {
      this.isSupervisorAssign = false;
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: message,
        life: 3000,
      });
    },
  },
  mounted() {
    this.employeeDropDownList();
    this.initilaizeColumns();
  },
  created() {},
  computed: {
    ...mapGetters({
      getEmployeeDropDownList: "specialRiderAllotment/getEmployeeDropDownList",
      customSpeedDialTabData: "specialRiderAllotment/customSpeedDialTabData",
    }),
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
  color: #269337;
  font-weight: 600 !important;
}
.activeBgClass {
  background-color: #b1fcdd;
  width: 80px;
  height: 30px;
  border-radius: 7px;
  padding: 5px 12px;
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

.inactiveClass {
  color: $color-ea6e39;
  font-weight: bold;
}
::v-deep .card {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
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
.approve-icon,
.reject-icon {
  padding: 7px;
  border-radius: 7px;
  font-weight: 600;
}

.approve-icon {
  background: #a4fca3;
  color: #136d21;
}
.reject-icon {
  background: #fbbdb0;
  color: #562110;
}
.supervisor-item {
  img {
    width: 24px;
    margin-right: 0.5rem;
    height: 24px;
    border-radius: 4px;
  }
}
.p-dropdown {
  border: none !important;
  background: transparent !important;
}
.supervisor-image {
  height: 30px;
  width: 30px;
  border-radius: 4px;
}
</style>
