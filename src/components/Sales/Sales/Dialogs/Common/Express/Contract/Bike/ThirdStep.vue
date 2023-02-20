<template>
  <br />
  <div class="field col-12 md:col-12">
    <p class="bold-700 font-size-12 color-343434 mt-4">Trip Plan</p>
  </div>
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">Region</h5>
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
      <h5 class="required bold-500 font-size-14 color-7a7a7a">Rates</h5>
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
    <p class="bold-700 font-size-12 color-343434 mt-4">Trip Schedule</p>
  </div>
  <div class="row ml-2 table_div">
    <div class="col-12">
      <!-- <FormTable
        v-if="
          $store.state.salesQuotationDialog.inspectionsDropDownTableData != null
        "
        :key="$store.state.salesQuotationDialog.inspectionsDropDownTableData"
        formTableDataName="inspectionsFormTableData"
        :selectionModeState="selectionModeState"
        dataKey="id"
        :tableData="
          $store.state.salesQuotationDialog.inspectionsDropDownTableData
        "
        :tableColumns="
          $store.state.salesQuotationDialog.inspectionsDropDownTableDataColumns
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
        class="
          p-button-outlined
          mr-1
          dialog-button-text
          previous-btn
          color-357dea
        "
      />
    </div>
    <div class="flex align-self-center justify-content-end">
      <CancelButton storePath="salesSales" label="Cancel"/>
      <Buttons
        label="Next"
        button_class="dialog-button-text bg-357dea"
        v-on:childToParent="nextStepHandler"
      />
    </div>
  </div>
</template>

<script>
import EditTable from "./Editable.vue";
import axios from "axios";
const { URL } = require("../../../../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapGetters } from "vuex";
export default {
  name: "SalesExpressContractBikeThirdStep",
  components: { EditTable },
  data: () => ({
    v$: useVuelidate(),
    details: {
      region: "",
      rates: "",
    },
    referenceData: [
      {
        region_id: 1,
        rate_card_id: 2,
        trips: [
          {
            trip_name: "12",
            from: "11:00",
            to: "13:00",
            trip_days: "Weekend",
            trip_type: "Fixed",
            trip_id: 152,
            selected: true,
          },
          {
            trip_name: "16",
            from: "11:00",
            to: "13:00",
            trip_days: "Weekend",
            trip_type: "Fixed",
            trip_id: 12,
            selected: true,
          },
          {
            trip_name: "14",
            from: "11:00",
            to: "13:00",
            trip_days: "Weekend",
            trip_type: "Fixed",
            trip_id: 19,
            selected: true,
          },
        ],
      },
    ],
    region: [
      // { name: "Airport", code: "USD" },
      // { name: "Railways", code: "SGD" },
    ],
    rates: [
      // { name: "Rate Card1", code: "USD" },
      // { name: "Rate Card2", code: "SGD" },
    ],

    submitted: false,
    tripTableData: [],

    tripColumnData: [
      { field: "trip_no", header: "Trip Name" },
      { field: "from_time", header: "From" },
      { field: "to_time", header: "To" },
      { field: "trip_days", header: "Trip Days" },
      { field: "trip_type", header: "Trip type" },
    ],
  }),
  validations() {
    return {
      details: {
        region: { required },
        rates: { required },
      },
    };
  },
  computed: {
    ...mapGetters({
      expressContractBikeAddNewData:
        "salesExpressBike/expressContractBikeAddNewData",
      ExpressContractBikeEditData:
        "salesExpressBike/ExpressContractBikeEditData",
    }),
  },
  methods: {
    goBackHandler() {
      this.$store.dispatch("salesQuotationDialog/navigateStepper", {
        step: "SalesExpressContractBikeSecondStep",
      });
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        // this.$store.state.dialog.quotationDetails.push(this.details);
        this.$store.dispatch("salesQuotationDialog/navigateStepper", {
          step: "SalesExpressContractBikeFourthStep",
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
      this.expressContractBikeAddNewData["quotation"]["region_id"] =
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
      this.expressContractBikeAddNewData["quotation"]["rate_card_id"] =
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
    prefillEditData() {
      console.log(
        this.ExpressContractBikeEditData.express_contract[0].region_id,
        "regionid"
      );
      let region_id =
        this.ExpressContractBikeEditData.express_contract[0].region_id;

      console.log(this.region, "region");

      //  let respectiveData = this.region.find(
      //   (itm) => itm.name == this.details.region.trim()
      // );
      let respectiveRegion = this.region.find((itm) => itm.id == region_id);

      console.log(respectiveRegion, "hello", respectiveRegion.name);

      this.details.region = respectiveRegion.name;

      // let rate_card_id =
      //   this.ExpressContractBikeEditData.express_contract[0].rate_card_id;
      // console.log(rate_card_id, "ratecard");
      // let respectiveRatecard = this.rates.find((itm) => itm.id == rate_card_id);
      // console.log(this.rates, "box");
      // console.log(respectiveRatecard, "rate", respectiveRatecard);
      // console.log(this.details.rates, "detailsrates");
      // this.details.rates = respectiveRatecard.name;
      let rate_card_id =
        this.ExpressContractBikeEditData.express_contract[0].rate_card_id;
      if (rate_card_id) {
        console.log("innn");
        let respectiveRatecard = this.rates.find(
          (itm) => itm.id == rate_card_id
        );
        console.log("this.rates", this.rates);
        this.rates.map((itm) => {
          console.log("it");
          console.log("itm", itm.id);
        });
        console.log(respectiveRatecard, "detailsrates");
        // this.details.rates = respectiveRatecard.name;
      }
    },
  },
  async created() {
    await this.getRegionsDropdownData();
    if (this.ExpressContractBikeEditData) {
      this.prefillEditData();
    }
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
        { id: this.expressContractBikeAddNewData["quotation"]["rate_card_id"] }
      );
      this.$store.dispatch(
        "salesExpressBike/loadExpressContractBikeChargeByWeightData",
        { id: this.expressContractBikeAddNewData["quotation"]["rate_card_id"] }
      );
    },
    tripTableData: async function () {},
  },
};
</script>

<style scoped>
::v-deep .p-datatable .p-datatable-thead > tr > th {
  background: #edf1f7 !important;
  color: #7e84a7 !important;
  font-size: 12px;
  font-weight: 600;
}
::v-deep .p-datatable .p-datatable-tbody > tr {
  border: 1px dashed #cad1dd !important;
}
</style>
