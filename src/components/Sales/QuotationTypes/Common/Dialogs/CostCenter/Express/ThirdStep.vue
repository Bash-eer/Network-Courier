<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <span class="font txt">Trip plan</span>
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Region</h5>
      <DropDownField
        :key="renderKey"
        code="id"
        label="region"
        :value="details.region"
        id="region"
        :data="region"
        v-model="details.region"
        :classes="{
          'p-invalid': v$.details.region.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text regions_dropdown': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Route</h5>
      <DropDownField
        :key="renderKey"
        code="id"
        label="route"
        :value="details.route"
        id="route"
        :data="routes"
        v-model="details.route"
        :classes="{
          'p-invalid': v$.details.route.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <span class="font ml-2 txt color-343434">Trip Schedule</span>
    </div>
  </div>
  <div class="row ml-2 table_div">
    <div class="col-12">
      <!-- <FormTable
        v-if="tripTableData != null"
        :key="tripTableData"
        dataKey="trip_no"
        formTableDataName="costCentresFormTableData"
        :selectionModeState="selectionModeState"
        :tableData="tripTableData"
        :tableColumns="tripColumnData"
      /> -->
      <!-- <CustomFormTable
        class="font-size-12 color-7e84a7"
        formTableDataName="rateCardTable"
        dataKey="trip_id"
        :tableData="tripTableData"
        :tableColumns="tripColumnData"
        storePath="salesCommon"
      /> -->
      
      <DataTables
        class="font-size-12 color-7e84a7"
        :key="renderKey"
        :tableData="tripTableData"
        v-model:selection="details.trips"
        :selectionModeState="details.trips"
        :tableColumn="tripColumnData"
        :multipleSelectValue="true"
      />
    </div>
  </div>
  <div class="formgrid grid pl-2 pr-2">
    <div
      class="
        flex
        justify-content-between
        w-full
        align-content-center
        py-3
        flex-wrap
      "
    >
      <Buttons
        label="Previous"
        v-on:childToParent="goBack"
        class="p-button-outlined mr-1 dialog-button-text"
      />
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton storePath="salesCommon" label="Cancel" />
        <Buttons
          :label="expressCCPostDialogData?.site_office ? 'Next' : 'Save'"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import axios from "axios";
// import CustomFormTable from "./Editable.vue";
import { mapGetters } from "vuex";
import {
  expressContract,
  expressContractState,
  sales_co,
  salesCommon,
} from "../../../../../../../store/helper";
import DataTables from "../../../../../Sales/Dialogs/Common/Express/Contract/Components/DataTables.vue";
export default {
  name: "CostCentresTripSchedule",
  components: { DataTables },
  computed: {
    ...sales_co,
    ...expressContractState,

    ...mapGetters({
      expressCCPostDialogData: "salesCommon/expressCCPostDialogData",
    }),
  },
  data: () => ({
    v$: useVuelidate(),
    renderKey: 0,
    renderkey: 0,
    details: {
      region: "",
      route: "",
      trips: [],
    },
    form_data: {
      customer_type: "express",
      charge_per_trip: "",
      return_trip_charge: "",
      head_off_delivery_charge: "",
      return_trip_chargable: false,
      collection_chargable: false,
      // headoff_delivery_charges: "",
      head_off_delivery_chargable: false,
      head_off_return_waived: false,
    },
    submitted: false,
    selectionModeState: null,
    tripTableData: [],
    tripColumnData: [
      { field: "trip_no", header: "Trip No" },
      { field: "from_time", header: "From" },
      { field: "to_time", header: "To" },
      { field: "trip_days", header: "Trip Days" },
      { field: "trip_type", header: "Trip Type" },
    ],
    region: [],
    routes: [],
  }),
  validations() {
    return {
      details: {
        region: { required },
        route: { required },
      },
    };
  },
  methods: {
    ...expressContract,
    ...salesCommon,
    goBack() {
      this.$store.state.salesExpressContract.flowStepCount--;
      this.$store.state.salesSales.stepperNavigation = "CostCenterSecondStep";
      
    },

    async submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.$store.state.salesExpressContract.flowStepCount++;
        let trip_data = [];
        this.details.trips.map((i) => {
          i["selected"] = true;
          i["trip_name"] = i.trip_no;
          i["to"] = i.to_time;
          i["from"] = i.from_time;
          trip_data.push(i);
        });
        let type =
          this.$route.params.type == "contract"
            ? "contract_id"
            : "quotation_id";
        this.expressCCPostDialogData.trips = trip_data;
        this.expressCCPostDialogData["zone_id"] = this.details.region;
        this.expressCCPostDialogData["route_id"] = this.details.route;
        this.expressCCPostDialogData[type] = this.$route.params.id;
        this.expressCCPostDialogData["site_office_charges"] = {};
        if (!this.expressCCPostDialogData?.site_office) {
          
          let res = await this.costCenterAction({
            method: this.commonExpressCCStateData?.id ? "PATCH" : "POST",
            id: this.commonExpressCCStateData?.id ?? 0,
            payload: this.expressCCPostDialogData,
            toast: this.$toast,
            type: this.$route.params.type,
          });
          if (res) {
            this.$store.dispatch("salesCommon/closeDialog");
            this.loadCostCenterData({
              id: this.$route.params.id,
              type: this.$route.params.type,
            });
          }
        } else {
          this.$store.state.salesSales.stepperNavigation =
            "CostCenterFourthStep";
        }
        
      }
      
    },

    async prefillZoneData() {
      let data = this.commonExpressCCStateData;
      this.details.region = data.zone_id;
      this.details.route = data.route_id;
      this.getTrips(this.details.region);
      this.renderKey++;
    },
    async getTrips(id) {
      await this.getRegionTrips({ id: id });
      this.tripTableData = [];
      this.regions_trips.map((i) => {
        if (Object.keys(this.commonExpressCCStateData ?? {}).length != 0) {
          this.commonExpressCCStateData?.cost_center_trips?.map((e) => {
            if (e.trip_id == i.trip_id) {
              i["from_time"] = e.from;
              i["to_time"] = e.to;
              i["trip_days"] = e.trip_days;
              i["trip_type"] = e.trip_type;
            }
          });
          if (
            this.commonExpressCCStateData?.cost_center_trips.some(
              (u) => u.trip_id == i.trip_id
            )
          ) {
            if (!this.details.trips.some((u) => u.trip_id == i.trip_id)) {
              this.details.trips.push(i);
            }
          }
        }
        this.tripTableData.push(i);
      });
      this.renderKey++;
    },
  },
  watch: {
    "details.region": async function () {
      this.getTrips(this.details.region);
    },
    "$store.state.salesSales.stepperNavigation": function () {
      if (
        this.$store.state.salesSales.stepperNavigation == "CostCenterThirdStep"
      ) {
        this.tripTableData = [];
        this.details.trips = [];
        this.getTrips(this.details.region);
      }
    },
  },
  async created() {
    await this.getRegion();
    await this.getRoutes();
    this.routes = this.cost_routes.map((i) => {
      i["name"] = i.route_name;
      return i;
    });
    this.region = this.regions.map((i) => {
      i["name"] = i.region;
      return i;
    });
    if (this.commonExpressCCStateData) {
      this.prefillZoneData();
    }

    this.renderKey++;
  },
};
</script>

<style></style>
