<template>
  <br />
  <div class="field col-12 md:col-12">
    <p class="txt mt-4">Trip Plan</p>
  </div>
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text required">Region</h5>
      <DropDown
        code="name"
        :data="region"
        label="region"
        :state="details.region"
        :key="details.region"
        v-model="details.region"
        :class="{
          'p-invalid': v$.details.region.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text required">Rates</h5>
      <DropDown
        code="name"
        :data="rates"
        label="rates"
        :state="details.rates"
        :key="details.rates"
        v-model="details.rates"
        :class="{
          'p-invalid': v$.details.rates.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="field col-12 md:col-12">
    <p class="txt mt-4">Trip Schedule</p>
  </div>
  <div class="row ml-2 table_div">
    <div class="col-12">
      <!-- <keep-alive>
        <FormTable
          v-if="$store.state.salesQuotationDialog.inspectionsDropDownTableData != null"
          :key="$store.state.salesQuotationDialog.inspectionsDropDownTableData"
          formTableDataName="inspectionsFormTableData"
          :selectionModeState="selectionModeState"
          dataKey="id"
          :tableData="$store.state.salesQuotationDialog.inspectionsDropDownTableData"
          :tableColumns="
            $store.state.salesQuotationDialog.inspectionsDropDownTableDataColumns
          "
          storePath="salesQuotationDialog"
        />
      </keep-alive> -->
      <keep-alive>
        <EditTable
          v-if="tripTableData != null"
          :key="tripTableData"
          formTableDataName="tripFormTableData"
          :selectionModeState="selectionModeState"
          dataKey="id"
          :tableData="tripTableData"
          :tableColumns="tripColumnData"
          storePath="salesQuotationDialog"
        />
      </keep-alive>
    </div>
  </div>

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
    <div class="align-self-center flex ml-2">
      <Buttons
        label="Previous"
        v-on:childToParent="goBackHandler"
        class="p-button-outlined mr-1 dialog-button-text previous-btn"
      />
    </div>
    <div class="flex align-self-center justify-content-end">
    <CancelButton storePath="salesQuotationDialog" label="cancel" />

      <Buttons
        label="Next"
        button_class="dialog-button-text"
        v-on:childToParent="nextStepHandler"
      />
    </div>
  </div>
</template>

<script>
import EditTable from "./EditTable.vue"
import axios from "axios";
const { URL } = require("../../../../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapGetters } from "vuex";
export default {
  name: "SalesExpressContractProjectjobsThirdStep",
  components:{EditTable},
  data: () => ({
    v$: useVuelidate(),
    selectionModeState: null,
    details: {
      region: "",
      rates: "",
    },
    errMsg: false,
    tripsSelected: false,
    renderKey: 10,
    btnKey: false,
    tripsData: [],

    // region: [
    //   { name: "Airport", code: "USD" },
    //   { name: "Railways", code: "SGD" },
    // ],
    // rates: [
    //   { name: "Rate Card1", code: "USD" },
    //   { name: "Rate Card2", code: "SGD" },
    // ],
  region: [],
    rates: [],

    submitted: false,
    tripTableData: [],
    tripColumnData: [
      { field: "trip_no", header: "Trip No" },
      { field: "from_time", header: "From" },
      { field: "to_time", header: "To" },
      { field: "trip_days", header: "Trip Days" },
      { field: "trip_type", header: "Trip type" },
    ],
  }),
   computed: {
    ...mapGetters({
      expressContractProjectJobsAddNewData:
        "salesExpressContractProjectJobs/expressContractProjectJobsAddNewData",
      ExpressContractProjectJobsEditData:
        "salesExpressContractProjectJobs/ExpressContractProjectJobsEditData",
    }),
  },
  validations() {
    return {
      details: {
        region: { required },
        rates: { required },
      },
    };
  },
  methods: {
    goBackHandler() {
      this.$store.dispatch("salesQuotationDialog/navigateStepper", {
        step: "SalesExpressContractProjectjobsSecondStep",
      });
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.$store.dispatch("salesQuotationDialog/navigateStepper", {
          step: "SalesExpressContractProjectjobsFourthStep",
        });
      }
    },
async getRegionsDropdownData() {
      this.region = [];
      await axios
        .get("/settings/sales/rates/express/contract/dropdowns/regions")
        .then((res) => {
          if (res.data.results) {
            for (let c in res.data.results) {
              res.data.results[c]["name"] = res.data.results[c]["region"];
              this.region.push(res.data.results[c]);
              // this.toZoneData.push(res.data.results[c]);
            }
          }
        });
    },
    async processRatesDropdownHandler() {
      let respectiveData = this.region.find(
        (itm) => itm.name == this.details.region.trim()
      );
      this.expressContractProjectJobsAddNewData["quotation"]["region_id"] =
        respectiveData.id;

      this.rates = [];
      axios
        .get(
          "/settings/sales/rates/express/contract/dropdowns/regions/ratecards/" +
            respectiveData.id
        )
        .then((res) => {
          if (res.data.results) {
            for (let c in res.data.results) {
              res.data.results[c]["name"] =
                res.data.results[c]["rate_card_name"];
              this.rates.push(res.data.results[c]);
              // this.toZoneData.push(res.data.results[c]);
            }
          }
        });
    },
     async processTripsDataHandler() {
      let respectiveRate = this.rates.find(
        (itm) => itm.name == this.details.rates.trim()
      );
      this.expressContractProjectJobsAddNewData["quotation"]["rate_card_id"] =
        respectiveRate.id;

      axios
        .get(
          "/settings/sales/rates/express/contract/dropdowns/ratecards/selected/trips/bike/" +
            respectiveRate.id
        )
        .then((res) => {
          if (res.data.results) {
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
   async created() {
    await this.getRegionsDropdownData();
    // if (this.ExpressContractBikeEditData) {
    //   this.prefillEditData();
    // }
  },
  watch: {
    "details.region": async function () {
      await this.processRatesDropdownHandler();
      console.log(this.details.region);
      console.log(this.rates, "watch");
    },
    "details.rates": async function () {
      await this.processTripsDataHandler();
      this.$store.dispatch(
        "salesExpressBike/loadExpressContractBikeSurchargeData",
        { id: this.expressContractProjectJobsAddNewData["quotation"]["rate_card_id"] }
      );
      this.$store.dispatch(
        "salesExpressBike/loadExpressContractBikeChargeByWeightData",
        { id: this.expressContractProjectJobsAddNewData["quotation"]["rate_card_id"] }
      );
    },
    tripTableData: async function () {},
  },
};
</script>

<style>
</style>