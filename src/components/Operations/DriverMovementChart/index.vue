<template>
  <div :key="renderKey">
    <div>
      <div class="flex justify-content-between align-items-center">
        <b class="mt-3 ml-3">Driver Movement Chart</b>
        <div class="flex justify-content-end align-items-center mt-3">
          <SearchField
            storePath="operationAllotment"
            type="text"
            v-model="searchValue"
            class="global-search"
            @input="search($event.target.value)"
          />
          <Buttons button_class=" min-width-99 ml-3 bg-357dea" label="Export" />
          <Buttons
            button_class="min-width-99 mx-3 bg-357dea"
            label="Add New"
            @click="Add"
          />
        </div>
      </div>
    </div>

    <p>
      <DataTable
        tableClass="p-datatable-sm QuotationTabTable mt-3"
        tableName="dataTable"
        :tableColumns="tableColumns"
        :subtableColumns="subtableColumns"
        :tableData="DriverMovementMainTableDataTable"
        @emittedEditFunctLogisticsTable="emittedEditFunctLogisticsTable"
      />

      <Dialog
        v-model:visible="display"
        :closable="false"
        :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
        :style="{ width: '60vw' }"
      >
        <template #header>
          <div class="flex justify-content-between w-full">
            <div class="flex">
              <h5 class="bold-700 font-size-16">Driver Movement Chart</h5>
            </div>
            <div class="remove-item cursor-pointer" @click="clickedCancel">
              <i class="pi pi-times"></i>
            </div>
          </div>
        </template>

        <div class="formgrid grid mx-0 px-0" :key="renderDialogKey">
          <div class="flex field col-12 md:col-12 mx-0 px-0">
            <div class="field col-12 md:col-6">
              <h6 class="required bold-500 font-size-14 color-7a7a7a">Date</h6>
              <Calendar
                v-model="calander_value"
                :showIcon="true"
                hourFormat="12"
                :disabledDates="invalidDates"
                :disabledDays="[0, 6]"
                :manualInput="false"
                @date-select="onChangeTableData"
                class="w-100"
              />
              <div
                v-if="v$.calander_value.$invalid && submitted"
                class="mr-5 red"
              >
                please select a Date
              </div>
            </div>
            <div class="field col-12 md:col-6">
              <h6 class="required bold-500 font-size-14 color-7a7a7a">
                Driver
              </h6>
              <DropDown
                code="name"
                :data="DriverMovementMainTableDataDriver"
                @change="onChangeTableData"
                label="employee_name"
                :state="driver"
                v-model="driver"
                :class="{
                  'p-invalid': v$.driver.$invalid && submitted,
                  'inputfield w-full color-212121 font-bold ': true,
                }"
              />
            </div>
          </div>
          <div class="flex field col-12 md:col-12 mx-0 px-0">
            <div class="field col-12 md:col-6">
              <h6 class="required bold-500 font-size-14 color-7a7a7a">
                Mileage Start
              </h6>
              <TextField
                type="number"
                v-model="mileage_start"
                class="p-column-filter"
                :classes="{
                  'p-invalid': v$.mileage_start.$invalid && submitted,
                  'inputfield w-full color-212121 font-bold py-2': true,
                }"
              />
              <div v-if="validationErr" class="mr-5 red">
                Mileage End must be Greater than Mileage Start
              </div>
            </div>
            <div class="field col-12 md:col-6">
              <h6 class="required bold-500 font-size-14 color-7a7a7a">
                Mileage End
              </h6>
              <TextField
                type="number"
                v-model="mileage_end"
                class="p-column-filter"
                :classes="{
                  'p-invalid': v$.mileage_end.$invalid && submitted,
                  'inputfield w-full color-212121 font-bold py-2': true,
                }"
              />
            </div>
          </div>
        </div>

        <p class="mt-3 bold-600 font-fam">Trips</p>

        <DialogDataTable
          :key="renderDialogKey"
          :tableColumns="tableHeader"
          :tableData="
            DriverMovementMainTableDataTrips
              ? DriverMovementMainTableDataTrips
              : dialogEditTableData
          "
          :selectedCustomer="dialogEditTableData"
          @TableSelectedValue="TableSelectedValue"
          @selectedTrips="selectedTrips"
          tableClass="p-datatable-sm QuotationTabTable"
        />

        <template #footer>
          <Buttons
            v-if="!updateBtn"
            label="Cancel"
            button_class="buttonClass-customer-launch color-357dea"
            @click="clickedCancel"
          />
          <Buttons
            v-if="updateBtn"
            label="Update"
            button_class="dialog-button-text bg-357dea"
            @click="updateValue"
          />
          <Buttons
            v-else
            label="Save"
            button_class="dialog-button-text bg-357dea"
            @click="saveValue"
          />
        </template>
      </Dialog>
    </p>
  </div>
</template>

<script>
import DataTable from "./DataTable.vue";
import Dialog from "primevue/dialog";
import DialogDataTable from "./DialogDataTable.vue";
import { mapActions, mapGetters } from "vuex";
const _ = require("lodash");
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import moment from "moment";

export default {
  components: {
    DataTable,
    Dialog,
    DialogDataTable,
  },
  data() {
    return {
      v$: useVuelidate(),
      display: false,
      value: null,
      updateBtn: false,
      renderKey: 1,
      renderDialogKey: 10,
      calander_value: null,
      driver: null,
      mileage_end: null,
      mileage_start: null,
      smallTableData: [],
      subtabledata: null,
      dropDownValue: null,
      dialogEditTableData: null,
      selectedTripsTable: null,
      customerLeaveListSelected: "123",
      from_date: "ggggg",
      to_date: "yyyyyy",
      remarks: "pppppp",
      searchValue: "",
      customerLeaveList: [
        {
          trip_no: "471",
          vehicle: "1",
          route: "ABC",
          document: "NEC/",
          parcel: "Express",
          delivery_type: "Seragoon",
        },
      ],
      tableHeader: [
        { field: "trip_no", header: "Trip No" },
        { field: "vehicle", header: "Vehicle" },
        { field: "route", header: "Route" },
        { field: "document", header: "Document" },
        { field: "parcel", header: "Parcel" },
        { field: "delivery_type", header: "Delivery Type" },
      ],
      tableColumns: [
        { field: "s_no", header: "S.No" },
        // { field: "customer_id", header: "Customer ID" },
        { field: "driver.employee_name", header: "Driver" },
        { field: "date_entry", header: "Date" },
        { field: "mileage_start", header: "Start Mileage" },
        { field: "mileage_end", header: "End Mileage" },
        { field: "total_km", header: "Total KM" },
        { field: "user.display_name", header: "Created By" },
        { field: "createdAt", header: "Created On" },
        { field: "actions", header: "Actions" },
      ],
      subtableColumns: [
        { field: "trip_name", header: "Trips" },
        { field: "vehicle", header: "Vehicle" },
        { field: "route", header: "Route" },
        { field: "document", header: "Document" },
        { field: "parcel", header: "Parcel" },
        { field: "delivery_type", header: "Delivery Type" },
        { field: "delivery_type", header: "Return" },
      ],
      getCompanyCostCenters: [
        {
          id: "471",
          s_no: "1",
          customer_id: "ABCEXCO00013",
          contract_id: "NEC/SC00015/2022",
          profile_name: "ABC Express",
          short_name: "ABC Seragoon",
          clearance_name: null,
          address: "100 Bedok ",
          postal_code: "41001",
          country: "SINGAPORE1",
          state: "SINGAPORE",
          building_name: "HDB",
          floor_no: "04",
          unit_no: "109",
          customer_type: "Express",
          business_type: "Contract",
          status: "In Contract",
          remarks: "Test",
          latest: true,
          parent_id: "471",
          chain_front_id: null,
          chain_back_id: null,
          signed_doc: true,
          tag: null,
          createdAt: "2022-09-23T10:01:52.712Z",
          updatedAt: "2022-10-08T11:08:06.723Z",
          deletedAt: null,
          created_by: 1,
          sales_person_id: null,
          profile_id: 179,
          datas: [],
          submitted: false,
          validationErr: false,
          user: {
            display_name: "Network Courier",
          },
          cost_center: [
            {
              id: "1",
              trips: "ABC Warehouse Airport",
              vehicle: "air",
              route: "21 Airport Blvd",
              document: "Airport Building",
              parcel: "courier",
              delivery_type: "van",
              return: "return",
            },
            {
              id: "2",
              trips: "ABC Warehouse Airport 123",
              vehicle: "train",
              route: "21 Airport Blvd",
              document: "Airport Building",
              parcel: "courier",
              delivery_type: "bike",
              return: "return",
            },
          ],
          priority: "High",
          e_commerce: false,
          normal: true,
        },
      ],
    };
  },
  validations() {
    return {
      calander_value: { required },
      driver: { required },
      mileage_start: { required },
      mileage_end: { required },
    };
  },
  async created() {
    this.postDriverMovementMainTableDataFirst();
    this.getDriverMovementMainTableDataDriver();
    this.getDriverMovementMainTableDataDriverType();
    this.getDriverMovementMainTableDataVehicles();
    // this.getDriverMovementMainTableDataTrips();
    let breadCrumbData = {
      title: "Operations",
      breadcrumbInfo: "Operations > Diver Movement Chart",
    };
    this.updateBreadCrumb(breadCrumbData);
  },

  methods: {
    onChangeTableData() {
      this?.DriverMovementMainTableDataDriver.map((x) => {
        if (x?.employee_name == this.driver) {
          this.dropDownValue = x.id;
        }
      });
      let data = {
        driver_id: this.dropDownValue,
        date: this.calander_value,
      };
      if (this.calander_value && this.dropDownValue) {
        this.postDriverMovementMainTableDataTrips(data);
      }
    },

    ...mapActions({
      getDriverMovementMainTableData:
        "DriverMovement/getDriverMovementMainTableData",
      getDriverMovementMainTableDataDriver:
        "DriverMovement/getDriverMovementMainTableDataDriver",
      getDriverMovementMainTableDataDriverType:
        "DriverMovement/getDriverMovementMainTableDataDriverType",
      getDriverMovementMainTableDataVehicles:
        "DriverMovement/getDriverMovementMainTableDataVehicles",
      // getDriverMovementMainTableDataTrips:
      //   "DriverMovement/getDriverMovementMainTableDataTrips",
      postDriverMovementMainTableData:
        "DriverMovement/postDriverMovementMainTableData",
      patchDriverMovementMainTableData:
        "DriverMovement/patchDriverMovementMainTableData",
      postDriverMovementMainTableDataTrips:
        "DriverMovement/postDriverMovementMainTableDataTrips",
      postDriverMovementMainTableDataFirst:
        "DriverMovement/postDriverMovementMainTableDataFirst",
      updateBreadCrumb: "users/updateBreadCrumbAndTitle",
      driverMovementTableSearchData:
        "DriverMovement/driverMovementTableSearchData",
    }),
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("MM-DD-YYYY");
        return formattedDate;
      }
    },

    TableSelectedValue(data) {
      this.subtabledata = data;
    },

    selectedTrips(e) {
      this.selectedTripsTable = e;
    },

    search: _.debounce(function (e) {
      let data = {
        searchValue: this.searchValue,
      };
      this.driverMovementTableSearchData(data);
    }, 600),

    Add() {
      this.display = true;
      this.updateBtn = false;
    },
    clickedCancel() {
      this.$store.state.DriverMovement.DriverMovementMainTableDataTrips = null;
      this.submitted = false;
      this.validationErr = false;
      this.display = false;
      (this.driver = null),
        (this.calander_value = null),
        (this.mileage_start = null),
        (this.mileage_end = null),
        (this.dialogEditTableData = []);
      this.renderKey++;
    },
    saveValue() {
      if (this.v$.$invalid) {
        this.submitted = true;
        this.renderDialogKey++;
      }
      if (!this.v$.$invalid) {
        if (this.mileage_end <= this.mileage_start) {
          this.validationErr = true;
          this.renderDialogKey++;
        } else {
          let val;
          let data;
          if (this.selectedTripsTable?.length > 0) {
            data = this.selectedTripsTable;
          } else {
            val = this.DriverMovementMainTableDataTrips;
          }
          let payload = {
            driver_id: this.dropDownValue,
            date_entry: this.calander_value,
            mileage_start: this.mileage_start,
            mileage_end: this.mileage_end,
            trips: this.selectedTripsTable?.length > 0 ? data : val,
          };
          this.postDriverMovementMainTableData(payload).then((res) => {
            if (res === 200) {
              this.display = false;
              (this.driver = null),
                (this.calander_value = null),
                (this.mileage_start = null),
                (this.mileage_end = null),
                (this.$store.state.DriverMovement.DriverMovementMainTableDataTrips =
                  null);
              this.dialogEditTableData = [];

              this.postDriverMovementMainTableDataFirst();

              this.$toast.add({
                severity: "info",
                summary: "Driver Movement Chart posted Successfully",
                life: 3000,
              });
            } else {
              this.display = false;
              (this.driver = null),
                (this.calander_value = null),
                (this.mileage_start = null),
                (this.mileage_end = null),
                (this.$store.state.DriverMovement.DriverMovementMainTableDataTrips =
                  null);
              this.dialogEditTableData = [];
              this.$toast.add({
                severity: "error",
                summary: "Error",
                detail: "Failed to create Driver Movement Chart",
                life: 3000,
              });
            }
          });
          this.renderKey++;
        }
      }
    },

    updateValue() {
      let payload = {
        id: this.dropDownValue.id,
        driver_id: this.dropDownValue.driver_id,
        date_entry: this.calander_value,
        mileage_start: this.mileage_start,
        mileage_end: this.mileage_end,
        trips:
          this.subtabledata?.length > 0
            ? this.subtabledata
            : this.dialogEditTableData,
      };

      this.patchDriverMovementMainTableData(payload);
      this.postDriverMovementMainTableDataFirst();

      this.display = false;
      (this.driver = null),
        (this.calander_value = null),
        (this.mileage_start = null),
        (this.mileage_end = null),
        (this.$store.state.DriverMovement.DriverMovementMainTableDataTrips =
          null);
      this.dialogEditTableData = [];
      this.$toast.add({
        severity: "info",
        summary: "Driver Movement Chart Updated Successfully",
        life: 3000,
      });
      this.renderKey++;
    },

    async emittedEditFunctLogisticsTable(data) {
      let payload = {
        id: data.id,
      };
      await this.getDriverMovementMainTableData(payload);

      this.updateBtn = true;
      this.display = true;
      this.dropDownValue = this.$store.state.DriverMovement.DriverMovementEdit;
      this.calander_value = this.dateFormater(
        this.DriverMovementMainTableData?.date_entry
      );
      this.mileage_start = this.DriverMovementMainTableData?.mileage_start;
      this.mileage_end = this.DriverMovementMainTableData?.mileage_end;
      this.dialogEditTableData = this.DriverMovementMainTableData?.trips;
      this.driver = this.DriverMovementMainTableData?.driver.employee_name;

      this.renderKey++;
    },
  },

  computed: {
    ...mapGetters({
      DriverMovementMainTableData: "DriverMovement/DriverMovementMainTableData",
      DriverMovementMainTableDataDriver:
        "DriverMovement/DriverMovementMainTableDataDriver",
      DriverMovementMainTableDataDriverType:
        "DriverMovement/DriverMovementMainTableDataDriverType",
      DriverMovementMainTableDataVehicles:
        "DriverMovement/DriverMovementMainTableDataVehicles",
      DriverMovementMainTableDataTrips:
        "DriverMovement/DriverMovementMainTableDataTrips",
      DriverMovementMainTableDataTable:
        "DriverMovement/DriverMovementMainTableDataTable",
    }),
  },
  watch: {
    display: {
      handler() {
        if (this.display == false) {
          this.$store.state.DriverMovement.DriverMovementMainTableDataTrips =
            null;
          this.driver = null;
          this.calander_value = null;
          this.mileage_start = null;
          this.mileage_end = null;
        }
      },
      deep: true,
    },

    DriverMovementMainTableDataTable: {
      handler() {
        this.renderKey++;
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
* {
  background-color: white;
}
.text_zone {
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
  color: #4e5968;
}
.aligment {
  margin-left: 392px;
}
.export_button {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  /* background: #ffffff; */
  border: 1px solid #357dea;
  border-radius: 4px;
  color: #357dea;
}
.Add_button {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;

  /* White */
  background: #357dea;
  color: #ffffff;
}

.font-fam {
  font-family: "Montserrat";
  width: 200px;
}
::v-deep .p-calendar-w-btn {
  width: 100% !important;
}
</style>
