<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <span class="font txt">Trip plan</span>
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Zone</h5>
      <DropDown
        :key="renderKey"
        code="id"
        label="region"
        :state="details.region"
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
      <DropDown
        :key="renderKey"
        code="id"
        label="route"
        :state="details.route"
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
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton storePath="salesCommon" label="Cancel" />
        <Buttons
          label="Next"
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
} from "../../../../../../../store/helper";
import DataTables from "../../../../../Sales/Dialogs/Common/Express/Contract/Components/DataTables.vue";
// const { URL } = require("../../../../../../../../../config/const");
// axios.defaults.baseURL = URL.BACKEND_BASEURL;
export default {
  name: "CostCentresTripSchedule",
  components: { DataTables },
  computed: {
    ...expressContractState,
    ...mapGetters({
      expressCCPostDialogData: "salesCommon/expressCCPostDialogData",
    }),
  },
  data: () => ({
    v$: useVuelidate(),
    renderKey: 0,
    details: {
      region: "",
      route: "",
      trips: [],
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
  async created() {
    console.log("adsdas")
    // await this.getRegionsDropdownData();
    if (
      Object.keys(this.$store.state["salesCommon"].commonExpressCCStateData)
        .length != 0
    ) {
      let incomingData =
        this.$store.state["salesCommon"].commonExpressCCStateData;

      await axios
        .get("sales/quotation/cost-center/express/" + incomingData.id)
        .then((res) => {
          if (res.data.results) {
            this.tripTableData = res.data.results.cost_center_trips;
          }
        });
    }
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
    this.renderKey++;
  },
  methods: {
    ...expressContract,
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.expressCCPostDialogData["zone_id"] = this.details.region;
        this.expressCCPostDialogData["route_id"] = this.details.region;
      }
    },
    async getTrips(id) {
      await this.getRegionTrips({ id: id });
      this.tripTableData = this.regions_trips;
    },
    async getRegionsDropdownData() {
      this.region = [];
      await axios
        .get("/settings/sales/rates/express/contract/dropdown/zones")
        .then((res) => {
          if (res.data.results) {
            console.log(res.data.results, "regions");
            for (let c in res.data.results) {
              res.data.results[c]["name"] = res.data.results[c]["zone_name"];
              this.region.push(res.data.results[c]);
              // this.toZoneData.push(res.data.results[c]);
            }
          }
        });
    },

    async processRoutesDropdownHandler() {
      let respectiveData = this.region.find(
        (itm) => itm.name == this.details.region.trim()
      );
      console.log(respectiveData, "respo");
      this.routes = [];
      axios
        .get(
          "/settings/sales/rates/express/contract/dropdown/zones/routes/" +
            respectiveData.id
        )
        .then((res) => {
          if (res.data.results) {
            console.log(res.data.results, "ratecar");
            for (let c in res.data.results) {
              res.data.results[c]["name"] = res.data.results[c]["route"];
              this.routes.push(res.data.results[c]);
              // this.toZoneData.push(res.data.results[c]);
            }
          }
        });
    },
    async processTripsDataHandler() {
      let respectiveRate = this.routes.find(
        (itm) => itm.name == this.details.route.trim()
      );
      console.log(respectiveRate, "respo");
      axios
        .get(
          "/settings/sales/rates/express/contract/dropdown/zones/trips/" +
            respectiveRate.id
        )
        .then((res) => {
          if (res.data.results) {
            console.log(res.data.results, "ratecar");
            this.tripTableData = res.data.results;
            // for (let c in res.data.results) {
            //   res.data.results[c]["name"] =
            //     res.data.results[c]["rate_card_name"];
            //   this.rates.push(res.data.results[c]);
            //   // this.toZoneData.push(res.data.results[c]);
            // }
          }
        });
    },
  },

  watch: {
    "details.region": async function () {
      console.log(this.details.region, "wat");
      await this.processRoutesDropdownHandler();
    },
    "details.route": async function () {
      console.log("routes");
      await this.processTripsDataHandler();
    },
    tripTableData: async function () {
      console.log("here", this.tripTableData);
    },
  },
};
</script>

<style></style>