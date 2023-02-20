<template>
  <div class="card">
    <!-- <div class="flex justify-content-around  mb-2">
      <div
        class="
          flex-column flex-row
          align-items-start
          justify-content-start
          font-bold
          text-gray-900
          px-3
          border-round
        "
      >
        <h5
          class="color-7a7a7a font-size-14 flex bold-500 bold-600 color-4E5968"
        >
          Job Priority
        </h5>

        <div class="flex flex-row">
          <div class="bg-fff">
            <Dropdown
              v-model="selectedJob"
              :options="gerCrmBookingData.charge_type=='Normal'?getjobPriorityList:$store.state.CustomerLaunchStore['jobPriorityDropDownList'+setLogistics]"
              optionLabel="name"
              placeholder="Job Priority"
            />
          </div>
          <div class="bg-fff p-2">
            <Buttons
              button_class="w-100"
              label="Show Trips"
              :disabled="false"
              @click="enableDialog"
            />
          </div>
        </div>
      </div>

      <div
        class="
          flex-column flex-row flex-grow-1
          align-items-center
          justify-content-center
          font-bold
          text-gray-900
          px-3
          border-round
        "
      >
        <h5 class="color-7a7a7a bold-600 color-4E5968 flex font-size-14">
          Date & Time
        </h5>

        <div class="flex flex-row">
          <div>
            <Calendar
              v-model="selectedTime"
              :showTime="true"
              hourFormat="12"
              :showIcon="true"
              :disabledDates="invalidDates"
              :disabledDays="[0, 6]"
              :manualInput="false"
            />
          </div>
          <div
            v-if="!selectedTime && submitted == true"
            class="time-feild-color ml-2 my-auto"
          >
            Please fill the time
          </div>
        </div>
      </div>
    </div> -->

    <ExchangeJobData
      :selectedJobType="selectedJobType"
      @saveJobType="saveJobType"
      :documentDetailType="documentDetailType"
      :SurchargeDropDownList="SurchargeDropDownList"
      :isUpdateBtn="isUpdateButton"
      :AttachmentType="AttachmentType"
      :selectedUpdateData="selectedUpdateData"
      :submitted="submitted"
      :selectedJob="selectedJob"
      :selectedTime="selectedTime"
      :jopPriorityTrip="select_trips"
      @priorityChange="priorityChange"
      @enableDialog="enableDialog"
      @timeChange="timeChange"
      @cancelClicked="cancel"
    />
    <Dialog
      v-model:visible="display"
      :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
      :style="{ width: '70vw' }"
    >
      <div class="flex flex-row card-container blue-container">
        <div
          class="
            flex
            align-items-start
            justify-content-start
            w-75
            min-height-50
            font-bold
            text-white
            border-round
            mr-1
            ml-3
          "
        >
          <Calendar
            v-model="dateValueCalendar"
            dateFormat="mm-dd-yy"
            :inline="true"
          />
        </div>
        <div
          class="
            flex flex-grow-1
            align-items-start
            justify-content-start
            w-100
            font-bold
            text-white
            border-round
            mx-1
          "
        >
          <div class="flex flex-column card-container">
            <div
              class="
                flex
                align-items-start
                justify-content-start
                font-bold
                text-white
                border-round
              "
            >
              <div class="bg-edf1f7 ">
                <CheckedTableData
                  :key="products"
                  formTableDataName="rapidoCallDataRow"
                  :selectionModeState="selectionModeState"
                  dataKey="id"
                  @selectedRows="selectedRows"
                  :tableData="rapidoCallData ?? []"
                  :tableColumns="tableColumnData"
                  storePath="CustomerLaunchStore"
                />
              </div>
            </div>
            <ContractTripTableCard
              v-if="$route.params.type != 'Adhoc'"
              @emittedTimeState="emittedTimeState"
            />
          </div>
        </div>
      </div>
      <template #footer>
        <Buttons
          label="Cancel"
          button_class="dialog-button-text  mt-3"
          @click="clickedCancel"
        />
        <Buttons
          label="Add"
          button_class="dialog-button-text  mt-3"
          @click="clickedAdd"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import CheckedTableData from "../AccordianComponents/CheckedTable.vue";
import Dropdown from "primevue/dropdown";
import ExchangeJobData from "../../../../components/Reusables/CRM/AccordianComponents/ExchangeJobData.vue";
import Dialog from "primevue/dialog";
import ContractTripTableCard from "../AccordianComponents/ContractTripTableCard.vue";
import { ContractTripTable } from "../Const";
import Calendar from "primevue/calendar";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { crmCusLState, crm_launch } from "../../../../store/modules/CRM/helper";

export default {
  name: "AccordianEndorse",
  components: {
    // Dropdown,
    ExchangeJobData,
    Dialog,
    CheckedTableData,
    ContractTripTableCard,
    Calendar,
  },
  props: [
    "selectedJobType",
    "documentDetailType",
    "SurchargeDropDownList",
    "isUpdateButton",
    "AttachmentType",
    "selectedUpdateData",
  ],
  data() {
    return {
      emptyData: "",
      renderKey: 1,
      setLogistics: "Van",
      selectedCity1: null,
      selectedJob: null,
      dateValueCalendar: Date(),
      display: false,
      select_trips: null,
      tableColumnData: ContractTripTable,
      Trips: null,
      filterValue: [],
      cities: [
        { name: "New York", code: "NY" },
        { name: "Rome", code: "RM" },
        { name: "London", code: "LDN" },
        { name: "Istanbul", code: "IST" },
        { name: "Paris", code: "PRS" },
      ],
      selectedServiceType: null,
      serviceType: [
        { name: "Document", code: "document" },
        { name: "Parcel", code: "parcel" },
      ],
      isUpdateBtn: false,
      products: [
        {
          trip_no: 1,
          from: "from data",
          to: "to data",
          cust_from: "cust from",
          cust_to: "cust to",
          trip_days: "days",
          trip_type: "types",
        },
        {
          trip_no: 2,
          from: "from data",
          to: "to data",
          cust_from: "cust from",
          cust_to: "cust to",
          trip_days: "days",
          trip_type: "types",
        },
      ],
      checked1: false,
      checked2: false,
      radioValue1: "",
      radioValue2: "",
      selectedTime: "",
      v$: useVuelidate(),
      submitted: false,
    };
  },
  validations() {
    return {
      selectedTime: { required },
    };
  },
  methods: {
    ...crm_launch,
    ...mapActions({
      assignRapidoCallTrips: "CustomerLaunchStore/getRapidoCallTrips",
    }),
    async enableDialog(e) {
      this.Trips = await this.assignRapidoCallTrips({ type: e.logistic_mode });
      this.display = true;
    },
    saveJobType(val, types, dataSet, isUpdate) {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      this.$emit(
        "savedJobType",
        val,
        types,
        dataSet,
        this.selectedJobType,
        isUpdate
      );
    },
    selectedRows(e) {
      this.select_trips = e;
    },
    clickedAdd() {
      this.display = false;
      this.select_trips["c_data"] = this.dateValueCalendar.toLocaleString();
      this.select_trips["p_data"] = this.dateValueCalendar;
      this.renderKey++;
    },
    updateData() {
      this.selectedTime = this.selectedUpdateData?.updatedAt;
      this.select_trips={
        c_data:this.selectedUpdateData?.job_date,
        cus_from_time:this.selectedUpdateData?.from_time,
        cus_to_time:this.selectedUpdateData?.to_time,
      }
    },
    clickedCancel() {
      this.display = false;
      this.selectedTime = "";
    },
    emittedTimeState(val) {
      if (val.from_date) {
        this.selectedTime = moment(val.from_date).format("DD/MM/YYYY hh:mm A");
      } else {
        this.selectedTime = "";
      }
    },
    timeChange(e) {
      let utcTime = moment(e).toISOString();
      this.$emit("selectedTimePeriod", utcTime);
    },
    cancel(data) {
      this.$emit("cancelClicked", data);
    },
    priorityChange(e) {
      let jonPriority = e ? e.job_priority : "";
      this.$emit("selectedJobPriority", jonPriority);
    },
  },
  created() {
    if (this.selectedUpdateData) {
      this.updateData();
    } else if (!this.selectedUpdateData) {
      this.selectedTime = new Date();
    }
  },
  mounted() {
    this.selectedJob = this.getjobPriorityList
      ? this.getjobPriorityList[0]
      : null;
  },
  watch: {
    selectedUpdateData: {
      handler() {
        this.updateData();
      },
      deep: true,
    },
    selectedJob: function (newVal, oldVal) {
      let jonPriority = newVal ? newVal.job_priority : "";
      this.$emit("selectedJobPriority", jonPriority);
    },
    selectedTime: function (newVal, oldVal) {
      let utcTime = moment(newVal).toISOString();
      this.$emit("selectedTimePeriod", utcTime);
    },
    isUpdateButton: function (newVal, oldVal) {
      this.isUpdateBtn = newVal;
    },
  },

  computed: {
    ...crmCusLState,
    ...mapGetters({
      getRapidoCallTrips: "CustomerLaunchStore/getRapidoCallData",
      getjobPriorityList: "CustomerLaunchStore/getjobPriorityList",
    }),
  },
};
</script>

<style scoped>
::v-deep .p-button {
  color: #ffffff;
  background: #2196f3;
  border: 1px solid #2196f3;
  font-size: 14px;
}

::v-deep .p-dropdown {
  background: #ffffff;
  border: none !important;
  width: 100%;
}
::v-deep .p-button.p-button-icon-only {
  background: #fff !important;
  border: 0px solid #c4c4c4;
  font-size: 14px;
  color: #2196f3 !important;
  height: 50px !important;
}
::v-deep .p-inputtext:enabled:focus {
  box-shadow: none !important;
}

::v-deep .p-calendar-w-btn .p-inputtext {
  border: 0px;
  height: 50px;
}

::v-deep .p-datepicker {
  border: 1px solid #2196f3 !important;
}

::v-deep .pi-chevron-right:before {
  color: #2196f3 !important;
}

::v-deep .pi-chevron-left:before {
  color: #2196f3 !important;
}

::v-deep .p-datepicker table th {
  color: #2196f3 !important;
  font-weight: 100 !important;
}

::v-deep .p-datepicker .p-datepicker-header {
  border-bottom: none !important;
}

::v-deep .p-dialog .p-dialog-header .p-dialog .p-dialog-header {
  padding: 0 !important;
  height: 0px;
}
.time-feild-color {
  color: red;
}
</style>
