<template>
  <DataTable
    :loading="$store.state['supervisorAllotment'].tableLoad"
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
    editMode="row"
    v-model:editingRows="editingRows"
    @row-edit-save="onRowEditSave"
    :globalFilterFields="['s_no', 'zone_name', 'supervisor.employee_name']"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 30]"
    currentPageReportTemplate="Showing {first}-{last} of {totalRecords} results"
  >
    <Column
      v-for="col of selectedColumns"
      :field="col.field"
      :header="
        col.header == 'Approved' || col.header == 'Rejected' ? '' : col.header
      "
      :key="col.field"
      :filterField="col.field"
      :showFilterMenu="
        col.header != 'S. No' &&
        col.header != 'Approved' &&
        col.header != 'Rejected'
          ? true
          : false
      "
      :sortable="
        col.header != 'Approved' && col.header != 'Rejected' ? true : false
      "
      :showFilterMatchModes="
        col.header != 'S. No' &&
        col.header != 'Approved' &&
        col.header != 'Rejected'
          ? true
          : false
      "
    >
      <template #body="slotProps">
        <span v-if="col.header == 'S. No'">
          {{ slotProps.data?.s_no }}
        </span>

        <span v-if="col.header == 'Zone'" class="mr-2">
          {{ slotProps.data?.zone_name || "-" }}
        </span>

        <span v-if="col.header == 'Supervisor'" class="mr-2">
          <img
            :src="
              slotProps.data?.supervisor &&
              slotProps.data.supervisor?.image_url != 'null'
                ? slotProps.data.supervisor?.image_url
                : '/images/noavatar.png'
            "
            class="supervisor-image"
          />
          <span class="ml-2">{{
            slotProps.data?.supervisor?.employee_name || "None"
          }}</span>
        </span>

        <!-- <span v-if="col.header == 'Approved'" class="mb-1 mr-3">
          <span
            class="approve-item"
            @click="updateStatus(slotProps.data, 'Approved')"
            :style="{
              opacity:
                slotProps.data?.status == 'New' && slotProps.data.supervisor
                  ? 1
                  : 0.4,
              cursor:
                slotProps.data?.status == 'New' && slotProps.data.supervisor
                  ? 'pointer'
                  : 'auto',
            }"
            ><i class="pi pi-check approve-icon"></i
          ></span>
        </span>

        <span v-if="col.header == 'Rejected'">
          <span
            class="reject-item"
            @click="updateStatus(slotProps.data, 'Rejected')"
            :style="{
              opacity:
                slotProps.data?.status == 'New' && slotProps.data.supervisor
                  ? 1
                  : 0.4,
              cursor:
                slotProps.data?.status == 'New' && slotProps.data.supervisor
                  ? 'pointer'
                  : 'auto',
            }"
            ><i class="pi pi-times reject-icon"></i
          ></span>
        </span> -->
      </template>

      <template #editor="{ data }">
        <span v-if="col.header == 'S. No'">
          {{ data["s_no"] }}
        </span>

        <span v-if="col.header == 'Zone'" class="mr-2">
          {{ data?.zone_name || "-" }}
        </span>
        <span v-if="col.header == 'Supervisor'">
          <Dropdown
            v-model="data['supervisor']"
            :options="supervisorList"
            optionLabel="name"
            :filter="true"
            placeholder="Select a Supervisor"
            class="inputfield dialog-field-text"
          >
            <template #value="slotProps">
              <div
                class="supervisor-item supervisor-item-value flex"
                v-if="slotProps.value"
              >
                <img
                  :src="
                    slotProps.value.image_url != 'null'
                      ? slotProps.value.image_url
                      : '/images/noavatar.png'
                  "
                />
                <div>{{ slotProps.value.employee_name }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="supervisor-item flex">
                <img
                  :src="
                    slotProps.option.image_url != 'null'
                      ? slotProps.option.image_url
                      : '/images/noavatar.png'
                  "
                />
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
          </Dropdown>
        </span>
      </template>

      <template #filter="{ filterModel }">
        <span v-if="col.header == 'Supervisor' || col.header == 'Zone'">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            placeholder="Search by name"
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
import { orderBy } from "lodash";
import Dropdown from "primevue/dropdown";
import { errhandler } from "@/services/httpClient";
import InputText from "primevue/inputtext";

export default {
  name: "SupervisorTables",
  components: {
    DataTable,
    Column,
    Dropdown,
    InputText,
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
    "currentTab",
    "totalRecords",
    "tabPageOffset",
  ],
  data() {
    return {
      filters: null,
      selectedColumns: null,
      editingRows: [],
    };
  },

  methods: {
    ...mapActions({
      loadSupervisorList: "supervisorAllotment/loadSupervisorsList",
      updateBikeSupervisor: "supervisorAllotment/updateBikeSupervisor",
      updateVanSupervisor: "supervisorAllotment/updateVanSupervisor",
      updateRapidoSupervisor: "supervisorAllotment/updateRapidoSupervisor",
      vanDataFetch: "supervisorAllotment/loadVanTableData",
      rapidoDataFetch: "supervisorAllotment/loadRapidoTableData",
      bikeDataFetch: "supervisorAllotment/loadBikeTableData",
    }),

    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM, YYYY");
        return formattedDate;
      }
    },
    processOverlayData(data, row) {
      data.currentTab = this.currentTab;
      return data;
    },
    initilaizeColumns() {
      this.filters = {
        zone_name: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        "supervisor.employee_name": {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
      };
      this.selectedColumns = this.tableColumns;
    },
    onRowEditSave(event) {
      const oldSupervisorId = event.data?.supervisor?.id;
      const newSupervisorId = event.newData?.supervisor?.id;
      if (oldSupervisorId !== newSupervisorId) {
        const supervisorUpdateData = {
          id: event.newData?.id,
          rowData: {
            zone_id: event.newData?.id,
            supervisor_id: newSupervisorId,
          },
        };
        this.updateSupervisorDataCall(supervisorUpdateData);
      }
    },
    async editBikeSupervisorData(updateData) {
      try {
        const data = updateData;
        let response = await this.updateBikeSupervisor(data);
        if (response && response.status === 200) {
          let info = "Bike supervisor allotment updated successfully";
          this.commonToast("success", "Success", info);

          this.$store.state.supervisorAllotment.tableLoad = true;
          this.bikeDataFetch();
        } else {
          let info =
            response.data.message ||
            "Failed to update bike supervisor allotment";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    async editVanSupervisorData(updateData) {
      try {
        const data = updateData;
        let response = await this.updateVanSupervisor(data);
        if (response && response.status === 200) {
          let info = "Van supervisor allotment updated successfully";
          this.commonToast("success", "Success", info);

          this.$store.state.supervisorAllotment.tableLoad = true;

          this.vanDataFetch();
        } else {
          let info =
            response.data.message ||
            "Failed to update van supervisor allotment";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    async editRapidoSupervisorData(updateData) {
      try {
        const data = updateData;
        let response = await this.updateRapidoSupervisor(data);
        if (response && response.status === 200) {
          let info = "Rapido supervisor allotment updated successfully";
          this.commonToast("success", "Success", info);

          this.$store.state.supervisorAllotment.tableLoad = true;
          this.rapidoDataFetch();
        } else {
          let info =
            response.data.message ||
            "Failed to update rapido supervisor allotment";
          this.commonToast("error", "Error", info);
        }
      } catch (err) {
        let toastMsg = await errhandler(err, "error");
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
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
    updateStatus(event, status) {
      if (event?.status == "New" && event?.supervisor) {
        const supervisorUpdateData = {
          id: event?.id,
          rowData: {
            zone_id: event?.zone_id,
            supervisor_id: event?.supervisor?.id || null,
            status: status,
          },
        };
        this.updateSupervisorDataCall(supervisorUpdateData);
      }
    },
    updateSupervisorDataCall(params) {
      if (this.currentTab == "VanTab") {
        this.editVanSupervisorData(params);
      } else if (this.currentTab == "RapidoTab") {
        this.editRapidoSupervisorData(params);
      } else {
        this.editBikeSupervisorData(params);
      }
    },
  },
  mounted() {
    this.initilaizeColumns();
  },
  created() {
    this.loadSupervisorList();
  },
  computed: {
    ...mapGetters({
      supervisorList: "supervisorAllotment/getSupervisorsList",
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
