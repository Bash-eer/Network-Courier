<template>
  <div class="w-100 tab-class">
    <div class="flex justify-content-between py-3 tabsBar">
      <!-- left contents -->
      <div class="flex ml-4 align-self-center">
        <div class="flex flex-row flex-wrap">
          <div class="flex tabPills mr-6">
            <!-- tabs -->
            <span class="table-title">Jobsheet Job Status Printing</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex">
      <div class="font-bold text-gray-900 border-round w-22rem ml-4">
        <h5 class="color-7a7a7a bold-600 color-4E5968 flex font-size-14">
          Jobsheet No.
        </h5>
        <div class="flex flex-row">
          <div class="d-flex mb-3 relative">
            <input
              class="p-inputtext p-component w-20rem mr-3"
              ref="scan_id"
              :value="inputData.scan_id"
              @input="getData($event, 'scan_id')"
            />
            <!-- <Buttons
              :icon="'pi pi-arrow-right'"
              v-on:childToParent="search"
              button_class="buttonClass-customer-launch-go bold-700 bg-fff color-357dea font-size-18 color-fff bg-1e90ff absolute border-radius-3  BtnAbsolute-customer-card global-search"
            /> -->
          </div>
        </div>
      </div>

      <div class="font-bold text-gray-900 border-round w-15rem">
        <h5 class="color-7a7a7a bold-600 color-4E5968 flex font-size-14">
          Date & Time
        </h5>
        <div class="flex flex-row w-15rem">
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
        </div>
      </div>
      <div class="font-bold text-gray-900 border-round mr-4 dialog-active-text">
        <h5 class="color-7a7a7a bold-600 color-4E5968 flex font-size-14">
          Trip ID
        </h5>
        <Dropdown
          v-model="tripName"
          :options="getTripDropDownListArray"
          optionLabel="trip_name"
          class="w-12rem"
          :filter="true"
        />
      </div>
      <div class="font-bold text-gray-900 border-round dialog-active-text">
        <h5 class="color-7a7a7a bold-600 color-4E5968 flex font-size-14">
          Printer
        </h5>
        <Dropdown
          v-model="printerName"
          :options="getPrinterDropDownListArray"
          optionLabel="printer_name"
          class="w-12rem"
          :filter="true"
        />
      </div>
      <div class="ml-4 mt-4">
        <Buttons
          label="Cancel"
          button_class="buttonClass-customer-launch mr-2"
          @click="clickedCancel"
        />
        <Buttons
          label="Print"
          button_class="dialog-button-text"
          @click="saveValue"
        />
      </div>
    </div>

    <!-- dynamic component-->
    <!-- <jobsheetPrintingTable
      v-model:selection="selectionMode"
      :tableColumns="specialRiderTableColumn"
      :tableData="getJobsheetprinting"
      :currentTab="currentTab"
      storePath="liveJobStatus"
      formTableDataName="livejobFormTableData"
    ></jobsheetPrintingTable> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
const _ = require("lodash");
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import jobsheetPrintingTable from "../../../Modules/CRM/JobsheetPrinting/jobsheetPrintingTable.vue";
import Calendar from "primevue/calendar";
import { debounce } from "lodash";
import { NUMBER } from "../../Operations/transferJob/const";

export default {
  name: "JobSheetPrintingSSS",
  components: {
    // InputText,
    // jobsheetPrintingTable,
    Dropdown,
    Calendar,
  },
  data: () => ({
    currentTab: "BikeTab",
    saerchValue: "",
    selectionMode: [],
    tripName: null,
    printerName: null,
    inputData: {
      scan_id: null,
    },
    selectedJobs: [],
    selectedTime: null,
  }),
  methods: {
    ...mapActions({
      getPrinterDropDownList: "jobsheetPrinting/getPrinterDropDownList",
      getTripDropDownList: "jobsheetPrinting/getTripDropDownList",
      getJobsheetPrintingData: "jobsheetPrinting/getJobsheetPrintingData",
    }),
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },
    focusInput(refId) {
      this.$refs[refId].focus();
    },
    getData: debounce(function (event, field) {
      const data = event.target.value;
      this.inputData[field] = data;
      if (this.selectedJobs.indexOf(data) < NUMBER.ZERO) {
        this.selectedJobs.push(data);
      }
      this.inputData[field] = null;
      this.focusInput(field);
    }, 2500),
  },
  watch: {
    getTripDropDownListArray: function () {
      this.tripName = this.getTripDropDownListArray
        ? this.getTripDropDownListArray[0]
        : null;
    },
    getPrinterDropDownListArray: function () {
      this.printerName = this.getPrinterDropDownListArray
        ? this.getPrinterDropDownListArray[0]
        : null;
    },
  },
  mounted() {
    this.getPrinterDropDownList();
    this.getTripDropDownList();
    this.getJobsheetPrintingData();
    this.focusInput("scan_id");
  },
  created() {},
  computed: {
    ...mapGetters({
      getPrinterDropDownListArray:
        "jobsheetPrinting/getPrinterDropDownListArray",
      getTripDropDownListArray: "jobsheetPrinting/getTripDropDownListArray",
      specialRiderTableColumn: "jobsheetPrinting/specialRiderTableColumn",
      getJobsheetprinting: "jobsheetPrinting/getJobsheetprinting",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
@media only screen and (max-width: 600px) {
  body {
    background-color: $color-fff !important;
  }
  ::v-deep .tabsBar {
    flex-wrap: wrap;
    background-color: $color-fff !important;
  }
  .toolPills {
    flex-wrap: wrap;
  }
}
a {
  text-decoration: none;
}
.operations-zones-tab-nav {
  border: 1px solid #cecece;
}
::v-deep .p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
  background: $color-fff !important;
}
::v-deep .p-datatable.p-datatable-sm .p-datatable-tbody > tr > td > span {
  font-family: $font-family-third !important;
}

::v-deep
  [data-v-1f88fdea]
  .p-datatable
  .p-sortable-column
  .p-sortable-column-icon,
::v-deep
  [data-v-c02eca38]
  .p-datatable
  .p-sortable-column
  .p-sortable-column-icon {
  color: $color-7e84a7 !important;
  width: 10.5px !important;
  height: 9px !important;
  font-size: 10px !important;
}
.nav-pills .nav-link.active[data-v-1f88fdea] {
  font-family: $font-family-third !important;
}
// ::v-deep .p-datatable.p-datatable-sm .p-datatable-header {
//   margin-left: 12px;
// }
::v-deep .global-search {
  height: 27px !important;
}
::v-deep .p-datatable {
  padding: 0px !important;
}
.notification-icon {
  position: absolute;
  background: red;
  display: inline-block;
  margin-top: -15px;
  height: 18px;
  width: auto;
  font-size: 12px;
  border-radius: 8px;
  color: #ffffff;
  padding: 0px 5px 0px;
}
</style>
