<template :key="renderKey">
  <DataTable
    :showGridlines="false"
    :stripedRows="true"
    id="formTable"
    :key="renderKey"
    editMode="cell"
    :rowClass="rowClass"
    responsiveLayout="scroll"
    :value="tabledata"
    v-model:selection="selectionMode"
    :dataKey="dataKey"
    @rowSelect="onRowSelect"
    @rowUnselect="onRowUnselect"
    @row-select-all="selectAllRows"
    @row-unselect-all="unSelectAllRows"
    v-model:filters="filters"
    filterDisplay="menu"
    :globalFilterFields="[
      'booking.collection_slip_no',
      'job_ref_no',
      'createdAt',
      'act_weight',
      'company_details.address',
      'trip.trip_name',
      'rider.display_name',
      'status',
    ]"
  >
    <template #header>
      <div class="d-flex justify-content-start">
        <MultiSelect
          :modelValue="selectedColumns"
          :options="tableColumn"
          optionLabel="header"
          @update:modelValue="onToggle"
          placeholder="Select Columns"
          style="width: 20em"
          :filter="true"
        />
      </div>
    </template>
    <Column selectionMode="multiple" headerStyle="width: 3em"> </Column>
    <Column
      v-for="col of selectedColumns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
      :filterField="col.field"
      :showFilterMenu="
        col.header != 'Actions' &&
        col.header != 'Trip' &&
        col.header != 'Logistic Mode'
          ? true
          : false
      "
      :sortable="
        col.header != 'Actions' &&
        col.header != 'Trip' &&
        col.header != 'Logistic Mode'
          ? true
          : false
      "
      :dataType="col.header == 'Date' ? 'date' : 'text'"
      :showFilterMatchModes="
        col.header != 'Actions' &&
        col.header != 'Trip' &&
        col.header != 'Logistic Mode'
          ? true
          : false
      "
    >
      <template #body="{ data, index }">
        <span v-if="col.header == 'Actions'">
          <CustomSpeedDial
            :dataName="tableDataName"
            :rowData="data"
            :selectedJobs="selectionMode"
            :customDialData="overlayOptionsMenuData"
            @removeRows="removeSelectedRows"
            @updateAllRows="updateAllRows"
          />
        </span>

        <span v-if="col.header == 'Scan No'">
          {{ data?.job_ref_no || '-' }}
        </span>

        <span v-if="col.header == 'Order No.'">
          {{ data?.info[0]?.order_reference_no || '-' }}
        </span>

        <span v-if="col.header == 'Collection Slip No.'">
          <span class="blue_label">{{
            data?.booking?.collection_slip_no || '-'
          }}</span>
        </span>

        <span v-if="col.header == 'Trip'">
          <!-- <span v-if="data.trip !== null"> -->
          <Dropdown
            id="dropdown"
            :options="multiLogisticTripsData[data.logistics_mode.toLowerCase()]"
            optionLabel="trip_name"
            optionValue="id"
            :filter="true"
            :modelValue="
              data.logistics_mode == 'Bike'
                ? data.bike_trip_id
                : data.logistics_mode == 'Van'
                ? data.van_trip_id
                : data.logistics_mode == 'Rapido'
                ? data.rapido_trip_id
                : 0
            "
            placeholder="Select Trip"
            @change="
              onChangeUserData(
                $event,
                `${data.logistics_mode.toLowerCase()}_trip_id`,
                index,
                data?.id
              )
            "
          />
          <!-- </span> -->
        </span>

        <span v-if="col.header == 'Date'" class="mb-1 mr-3">
          {{ dateFormatter(data?.createdAt) || '-' }}
        </span>

        <span v-if="col.header == 'Delivery Address'" class="mb-1 mr-3">
          {{ data?.company_details?.address || '-' }}
        </span>

        <span v-if="col.header == 'Weight' && data.info">
          {{ data?.info[0]?.parcel_details[0]?.act_weight || '-' }}
        </span>

        <span v-if="col.header == 'Logistic Mode'">
          <Dropdown
            id="dropdown"
            :options="logisticMode"
            optionLabel="name"
            optionValue="code"
            v-model="data.logistics_mode"
            @change="
              onChangeUserData($event, 'logistics_mode', index, data?.id)
            "
          />
        </span>

        <span v-if="col.header == 'Rider Name'">
          <span>
            <Dropdown
              :modelValue="data.rider_id ? data.rider_id : 0"
              :options="riderDropdownList[data.logistics_mode.toLowerCase()]"
              optionLabel="employee_name"
              optionValue="id"
              placeholder="Select Rider"
              class="w-12rem ml-1"
              :filter="true"
              @change="onChangeUserData($event, 'rider_id', index, data?.id)"
            >
            </Dropdown>
          </span>
        </span>

        <span v-if="col.header == 'Status'">
          <span :style="expressStatusBackgroundStyle(data?.status)">
            <span :style="expressStatusColorStyle(data?.status)">
              {{ data?.status }}
            </span>
          </span>
        </span>
      </template>
      <template #filter="{ filterModel }">
        <span v-if="col.header !== 'Status' && col.header !== 'Date'">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            :placeholder="getPlaceholder(col.header)"
          />
        </span>
        <span v-if="col.header == 'Date'">
          <p class="mb-2"><b>Set a date range:</b></p>
          <Calendars
            :state="filterModel.value"
            v-model="filterModel.value"
            dateFormat="mm/dd/yy"
            placeholder="mm/dd/yyyy"
          />
        </span>
        <span v-if="col.header == 'Status'">
          <Dropdown
            optionValue="code"
            optionLabel="name"
            v-model="filterModel.value"
            :options="liveJobStatusFilterDropdownData"
            placeholder="Search By Status"
            class="p-column-filter"
            :showClear="true"
          >
            <template #value="slotProps">
              <span
                :style="expressStatusBackgroundStyle(slotProps.value)"
                v-if="slotProps.value"
              >
                <span :style="expressStatusColorStyle(slotProps.value)">{{
                  slotProps.value
                }}</span>
              </span>
              <span v-else>{{ slotProps.placeholder }}</span>
            </template>
            <template #option="slotProps">
              <span
                :style="expressStatusBackgroundStyle(slotProps.option.name)"
              >
                <span :style="expressStatusColorStyle(slotProps.option.name)">{{
                  slotProps.option.name
                }}</span>
              </span>
            </template>
          </Dropdown>
        </span>
      </template>
    </Column>
    <template #empty> No data found </template>
  </DataTable>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import MultiSelect from 'primevue/multiselect';
import InputText from 'primevue/inputtext';
import { logisticMode, overlayOptionsMenuData } from './const.js';
import CustomSpeedDial from './customSpeedDial.vue';
import Dropdown from 'primevue/dropdown';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { mapActions, mapState } from 'vuex';
import moment from 'moment';
import { differenceWith, xorBy } from 'lodash';
export default {
  components: {
    DataTable,
    Column,
    MultiSelect,
    Dropdown,
    InputText,
    CustomSpeedDial,
  },
  props: ['tableName', 'tableColumn', 'tableData', 'isLiveJobData'],
  data() {
    return {
      logisticMode,
      overlayOptionsMenuData,
      selectedColumns: [],
      selectionMode: [],
      filters: null,
      tabledata: [],
      renderKey: 10,
      isDataAdded: false,
    };
  },
  created() {
    this.initializeFilters();
    this.getTripsAndRiderData();
    this.tabledata = this.tableData;
    if (this.tabledata && this.tabledata.length) {
      this.isDataAdded = true;
    }
    this.renderKey++;
  },
  computed: {
    ...mapState({
      multiLogisticTripsData: (state) =>
        state.liveJobStatus.multipleLogisticTripsData,
      riderDropdownList: (state) => state.liveJobStatus.riderDropdownDataForTransferJob,
      selectedJobData: (state) => state.liveJobStatus.selectedJobData,
      totalJobsSelected: (state) => state.liveJobStatus.totalJobsSelected,
      liveJobStatusFilterDropdownData: (state) =>
        state.liveJobStatus.liveJobStatusFilterDropdownData,
      alterData: (state) => state.liveJobStatus.alterData,
    }),
  },
  methods: {
    ...mapActions({
      getTripsByLogistic: 'liveJobStatus/getTripsByLogistics',
      getRiderDropdownForTransferJob: 'liveJobStatus/getRiderForTransferJob',
    }),
    onToggle(value) {
      localStorage.setItem('transferJobColumnData', JSON.stringify(value));
      this.selectedColumns = this.tableColumn.filter((col) =>
        value.includes(col)
      );
    },
    getTripsAndRiderData() {
      this.logisticMode.map((itm) => {
        this.getTripsByLogistic(itm.code)
        this.getRiderDropdownForTransferJob(itm.code);
      });
    },

    checkAndPushData() {
      if (!this.isDataAdded) {
        this.tabledata = this.selectedJobData;
        this.isDataAdded = true;
        this.renderKey++;
      } else {
        if (this.selectedJobData && this.totalJobsSelected && this.alterData) {
          const data = xorBy(this.tabledata, this.selectedJobData, 'id');
          data.forEach((ele) => this.tabledata.push(ele));
        } else {
          this.tabledata =
            this.selectedJobData == null ? [] : this.selectedJobData;
        }
      }

      this.renderKey++;
    },

    removeSelectedRows(arr) {
      this.tabledata = differenceWith(
        this.tabledata,
        arr,
        (el, id) => el.id == id
      );
      this.selectionMode = [];
      this.$emit('removeSelectedData', arr);
      this.renderKey++;
    },

    dateFormatter(data) {
      if (data == null) {
        return '-';
      } else {
        var formattedDate = moment(data).format('Do MMM, YYYY');
        return formattedDate;
      }
    },

    updateAllRows(emittedData) {
      const { mode, data } = emittedData;
      if (mode == 'all') {
        for (let idx = 0; idx < this.tabledata.length; idx++) {
          this.tabledata[idx].logistics_mode = data.logistics_mode;
          this.tabledata[idx].van_trip_id =
            data.logistics_mode == 'Van' ? data.van_trip_id : null;
          this.tabledata[idx].rapido_trip_id =
            data.logistics_mode == 'Rapido' ? data.rapido_trip_id : null;
          this.tabledata[idx].bike_trip_id =
            data.logistics_mode == 'Bike' ? data.bike_trip_id : null;
          this.tabledata[idx].edited = true;
        }
        this.$emit('updatedTableData', this.tabledata);
      } else {
        this.tabledata = this.tabledata.map((x) => {
          const match = data.find((y) => y.id === x.id);
          if (match)
            return {
              ...x,
              logistics_mode: match.logistics_mode,
              edited: true,
              bike_trip_id:
                match.logistics_mode == 'Bike' ? match.bike_trip_id : null,
              van_trip_id:
                match.logistics_mode == 'Van' ? match.van_trip_id : null,
              rapido_trip_id:
                match.logistics_mode == 'Rapido' ? match.rapido_trip_id : null,
            };
          return x;
        });
        this.$emit('updatedTableData', this.tabledata);
      }
    },

    getPlaceholder(head) {
      return `search by ${head}`;
    },

    async onChangeUserData({ value }, key, index) {
      if (key == 'bike_trip_id') {
        this.tabledata[index].van_trip_id = null;
        this.tabledata[index].rapido_trip_id = null;
      } else if (key == 'van_trip_id') {
        this.tabledata[index].bike_trip_id = null;
        this.tabledata[index].rapido_trip_id = null;
      } else if (key == 'rapido_trip_id') {
        this.tabledata[index].van_trip_id = null;
        this.tabledata[index].bike_trip_id = null;
      }
      this.tabledata[index]['edited'] = true;
      this.tabledata[index][key] = await value;
      this.$emit('updatedTableData', this.tabledata);
    },

    expressStatusBackgroundStyle(status) {
      let expressStatusBackground;
      switch (status) {
        case 'New':
          expressStatusBackground =
            'background: #FFF3C7;width: 80px;height: 30px;border-radius: 7px;padding: 5px 12px;';
          break;
        case 'Pending':
          expressStatusBackground =
            'background: #e5e5e5;width: 80px;height: 30px;border-radius: 7px;padding: 5px 12px;';
          break;
        case 'Not Assigned':
          expressStatusBackground =
            'background: #e5e5e5;width: 80px;height: 30px;border-radius: 7px;padding: 5px 12px;';
          break;
        case 'Approved':
          expressStatusBackground =
            'background: #325383;width: 80px;height: 30px;border-radius: 7px;padding: 5px 12px;';
          break;
        case 'In Transit':
          expressStatusBackground =
            'background: #e3e3e3;width: 80px;height: 30px;border-radius: 7px;padding: 5px 12px;';
          break;
        case 'Completed':
          expressStatusBackground =
            'background: #b1fcdd;width: 80px;height: 30px;border-radius: 7px;padding: 5px 12px;';
          break;
        case 'Cancelled':
          expressStatusBackground =
            'background: #ff56564d;width: 80px;height: 30px;border-radius: 7px;padding: 5px 12px;';
          break;
      }
      return expressStatusBackground;
    },

    expressStatusColorStyle(status) {
      let expressStatusColor;
      switch (status) {
        case 'New':
          expressStatusColor = 'color: #EABB17';
          break;
        case 'Pending':
          expressStatusColor = 'color: #131111';
          break;
        case 'Not Assigned':
          expressStatusColor = 'color: #131111';
          break;
        case 'Approved':
          expressStatusColor = 'color: #ffffff';
          break;
        case 'In Transit':
          expressStatusColor = 'color: #ff7a00';
          break;
        case 'Completed':
          expressStatusColor = 'color: #269337';
          break;
        case 'Cancelled':
          expressStatusColor = 'color: #357dea';
          break;
      }
      return expressStatusColor;
    },
    initializeFilters() {
      this.filters = {
        global: {
          value: null,
          matchMode: FilterMatchMode.CONTAINS,
        },
        job_ref_no: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        'order_reference_no': {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        'booking.collection_slip_no': {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        'trip.id': {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        createdAt: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.BETWEEN }],
        },
        'zone.zone_name': {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.BETWEEN }],
        },
        weight: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        logistics_mode: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        'rider.display_name': {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        status: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
      };
      let permanentTableColumns = JSON.parse(
        localStorage.getItem('transferJobColumnData')
      );
      this.selectedColumns = permanentTableColumns || this.tableColumn;
    },
  },

  watch: {
    totalJobsSelected: function () {
      this.checkAndPushData();
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
</style>
