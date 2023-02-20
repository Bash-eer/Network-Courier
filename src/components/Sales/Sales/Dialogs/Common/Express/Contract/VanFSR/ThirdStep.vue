<template>
  <br />
  <div class="col-12 md:col-12" > 
    <p class="mt-3 ml-2 color-343434 text-xs">Trip Plan</p>
  </div>
  <div class="formgrid grid ml-2"  :key="renderKey"  >
    <div class="col-12 md:col-6">
      <h5 class="color-7a7a7a text-sm required">Region</h5>
      <DropDownField
        code="code"
        :data="region"
        label="region"
        v-model="details.region"
        :value="details.region"
        :class="{
          'p-invalid': v$.details.region.$invalid && submitted,
          'inputfield w-full color-212121 font-bold ': true,
        }"
      />
    </div>
    <div class="col-12 md:col-6">
      <h5 class="color-7a7a7a text-sm required">Rates</h5>
      <DropDownField
        code="code"
        :data="rates"
        label="rates"
        v-model="details.rates"
        :value="details.rates"
        :class="{
          'p-invalid': v$.details.rates.$invalid && submitted,
          'inputfield w-full color-212121 font-bold ': true,
        }"
      />
    </div>
  </div>
  <div class="field col-12 md:col-12">
    <p class="color-343434 text-xs mt-3 ml-2">Trip Schedule</p>
  </div>
  <div class="row ml-2 table_div color-7e84a7">
    <div class="col-12">
        <!-- <FormTable
          v-if="
            $store.state.salesQuotationDialog.inspectionsDropDownTableData !=
            null
          "
          :key="$store.state.salesQuotationDialog.inspectionsDropDownTableData"
          formTableDataName="inspectionsFormTableData"
          :selectionModeState="selectionModeState"
          dataKey="id"
          :tableData="
            $store.state.salesQuotationDialog.inspectionsDropDownTableData
          "
          :tableColumns="
            $store.state.salesQuotationDialog
              .inspectionsDropDownTableDataColumns
          "
          storePath="salesQuotationDialog"
        /> -->
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
        class="p-button-outlined mr-1 text-sm color-357dea font-bold"
      />
    </div>
    <div class="flex align-self-center justify-content-end">
      <CancelButton
        storePath="salesSales"
        label="Cancel"
        class="color-357dea font-bold"
      />

      <Buttons
        label="Next"
        button_class="next-button"
        v-on:childToParent="nextStepHandler"
      />
    </div>
  </div>
</template>

<script>
import EditTable from "./Editable.vue"
import axios from "axios";
const { URL } = require("../../../../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapGetters } from "vuex";
export default {
  name: "SalesExpressContractVanFSRThirdStep",
  components: { EditTable },
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
      expressContractVanFSRAddNewData:
        "salesExpressContractVanFSR/expressContractVanFSRAddNewData",
         expressContractVanFsrOverviewData:
        "salesExpressContractVanFSR/expressContractVanFsrOverviewData",
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
        step: "SalesExpressContractVanFSRSecondStep",
      });
    },
    nextStepHandler() {
      console.log(this.details, "Overall Data");
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
         for (let i in this.details) {
          this.expressContractVanFSRAddNewData["quotation"][i] = this.details[i];
          } 

        this.$store.dispatch("salesQuotationDialog/navigateStepper", {
          step: "SalesExpressContractVanFSRFourthStep",
        });
      }
      console.log(this.expressContractVanFSRAddNewData, "details page3");
    },

       async getRegionsDropdownData() {
      this.region = [];
      await axios
        .get("/settings/sales/rates/express/contract/dropdowns/regions")
         .then((res) => {
              if (res.data.results) {
                res.data?.results.map((list) => {
              this.region.push({ name: list.region, code: list.id });
            });
          }
        });
    },
      async processRatesDropdownHandler() {
         let respectiveData = this.details.region;
      // let respectiveData = this.region.find(
      //   (itm) => itm.name == this.details.region.trim()
      // );
      // this.expressContractBikeFSRAddNewData["quotation"]={},
      this.expressContractVanFSRAddNewData["quotation"]["region_id"] =
        respectiveData;
      this.rates = [];
      axios
        .get(
          "/settings/sales/rates/express/contract/dropdowns/regions/ratecards/" +
            respectiveData
        )
        .then((res) => {
          if (res.data.results) {
              res.data?.results.map((list) => {
          this.rates.push({ name: list.rate_card_name, code: list.id });
        });
          }
        });
    },
    async processTripsDataHandler() {
      let respectiveRate = this.details.rates;
      // let respectiveRate = this.rates.find(
      //   (itm) => itm.name == this.details.rates.trim()
      // );
      this.expressContractVanFSRAddNewData["quotation"]["rate_card_id"] =
        respectiveRate;
      axios
        .get(
          "/settings/sales/rates/express/contract/dropdowns/region/trips/van/" +
            respectiveRate
        )
        .then((res) => {
           console.log(res.data.results ,"redcardddd")
          if (res.data.results) {
            console.log(res.data.results ,"redcardddd")
            // this.tripTableData = res.data.results;
            for (let c in res.data.results) {
              this.tripTableData[c] = {};
              this.tripTableData[c].trip_no = res.data.results[c].trip_no;
              this.tripTableData[c].from_time = res.data.results[c].from_time.substring(0, 5);
              this.tripTableData[c].to_time = res.data.results[c].to_time.substring(0, 5);
              this.tripTableData[c].trip_days = res.data.results[c].trip_days;
              this.tripTableData[c].trip_type = res.data.results[c].trip_type;
              this.tripTableData[c].trip_id = res.data.results[c].trip_id;
              //this.tripTableData[c].selected = res.data.results[c].selected;
            }
          }
        });
    },
  },
   async created() {
    await this.getRegionsDropdownData();
    if (
      Object.keys(this.$store.state["salesExpressContractVanFSR"].expressContractVanFSREditData)
        .length != 0
    ) {
      console.log(this.expressContractVanFsrOverviewData, "Preload data 3")
      this.details.region = this.expressContractVanFsrOverviewData.express_contract[0].region_id;
      this.details.rates = this.expressContractVanFsrOverviewData.express_contract[0].rate_card_id;

      for (let i in this.expressContractVanFsrOverviewData.express_contract[0].trips){
        this.tripTableData[i] = this.expressContractVanFsrOverviewData.express_contract[0].trips[i];

          this.tripTableData[i].from_time = this.expressContractVanFsrOverviewData.express_contract[0].trips[i].from_time.slice(11, 16);
          this.tripTableData[i].to_time = this.expressContractVanFsrOverviewData.express_contract[0].trips[i].to_time.slice(11, 16);
        //   this.tripTableData[i].trip_no = this.expressContractBikeFsrOverviewData.express_contract[0].trips[i].trip_no;
        //   this.tripTableData[i].trip_days = this.expressContractBikeFsrOverviewData.express_contract[0].trips[i].trip_days;
        //   this.tripTableData[i].trip_type = this.expressContractBikeFsrOverviewData.express_contract[0].trips[i].trip_type;
        //   this.tripTableData[i].trip_id = this.expressContractBikeFsrOverviewData.express_contract[0].trips[i].trip_id;
        //   this.tripTableData[i].trip_no = this.expressContractBikeFsrOverviewData.express_contract[0].trips[i].trip_no;
      }
      
    
    this.renderKey++;
    }
    console.log(this.details.region , "hello maaan")
  },
    watch: {
    "details.region": async function () {
      await this.processRatesDropdownHandler();
    },
    "details.rates": async function () {
      await this.processTripsDataHandler();
    },
    tripTableData: async function () {
      console.log("tripTableData here", this.tripTableData);
    },
  },
};
</script>

<style>
.next-button {
  background-color: #357dea;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
}
</style>
