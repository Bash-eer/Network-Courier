<template>
  <div :key="renderKey">
    <div class="col-12 md:col-12">
      <p class="bold-700 font-size-12 color-343434 mt-3 ml-2">Trip Plan</p>
    </div>
    <div class="formgrid grid ml-2" :key="renderKey">
      <div class="col-12 md:col-6">
        <h5 class="required bold-500 font-size-14 color-7a7a7a required">
          Region
        </h5>
        <DropDownField
          code="code"
          :data="region_id"
          label="region_id"
          v-model="details.region_id"
          :value="details.region_id"
          :class="{
            'p-invalid': v$.details.region_id.$invalid && submitted,
            'inputfield w-full color-212121 font-bold ': true,
          }"
        />
      </div>
      <div class="col-12 md:col-6">
        <h5 class="required bold-500 font-size-14 color-7a7a7a required">
          Rates
        </h5>
        <DropDownField
          code="code"
          :data="rate_card_id"
          label="rate_card_id"
          v-model="details.rate_card_id"
          :value="details.rate_card_id"
          :class="{
            'p-invalid': v$.details.rate_card_id.$invalid && submitted,
            'inputfield w-full color-212121 font-bold ': true,
          }"
        />
      </div>
    </div>
    <div class="field col-12 md:col-12">
      <p class="bold-700 font-size-12 color-343434 mt-3 ml-2">Trip Schedule</p>
    </div>
    <div class="row ml-2 table_div mt-0">
      <div class="col-12 mt-0">
        <keep-alive>
          <EditTable
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
        <CancelButton storePath="salesQuotationDialog" class="color-357dea" />

        <Buttons
          label="Next"
          button_class="dialog-button-text bg-357dea"
          v-on:childToParent="nextStepHandler"
        />
      </div>
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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SalesExpressContractBikeFSRThirdStep",
  components: { EditTable },
  data: () => ({
    v$: useVuelidate(),
    selectionModeState: null,
    details: {
      region_id: "",
      rate_card_id: "",
    },
    errMsg: false,
    tripsSelected: false,
    renderKey: 10,
    btnKey: false,
    tripsData: [],
    region_id: [],
    rate_card_id: [],
    referenceData: [
      {
        region_id: 1,
        rate_card_id: 2,
        trips: [
          {
            trip_no: "12",
            from: "11:00",
            to: "13:00",
            trip_days: "Weekend",
            trip_type: "Fixed",
            trip_id: 152,
            selected: true,
          },
          {
            trip_no: "16",
            from: "11:00",
            to: "13:00",
            trip_days: "Weekend",
            trip_type: "Fixed",
            trip_id: 12,
            selected: true,
          },
          {
            trip_no: "14",
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
  computed: {
    ...mapGetters({
      expressContractBikeFSRAddNewData:
        "salesExpressContractBikeFSR/expressContractBikeFSRAddNewData",
      quotationData: "salesExpressContractBikeFSR/quotationData",
    }),
  },
  validations() {
    return {
      details: {
        region_id: { required },
        rate_card_id: { required },
      },
    };
  },
  methods: {
    ...mapActions({
      getRegionData: "salesExpressContractBikeFSR/getRegionData",
      getRatesData: "salesExpressContractBikeFSR/getRatesData",
      getTripsData: "salesExpressContractBikeFSR/getTripsData",
      setCurrentStep: "salesExpressContractBikeFSR/setCurrentStep",
      setSelectedRateCardId:
        "salesExpressContractBikeFSR/setSelectedRateCardId",
      //   setPayloadData: "salesExpressContractBikeFSR/setPayloadData",
    }),
    goBackHandler() {
      this.setCurrentStep(2);
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        for (let i in this.details) {
          this.expressContractBikeFSRAddNewData["quotation"][i] =
            this.details[i];
        }
        // console.log(this.expressContractBikeFSRAddNewData, "Second data")
        this.setCurrentStep(4);
      }
    },
    async getRegions() {
      const res = await this.getRegionData();

      if (res) {
        if (res.data.results) {
          res.data?.results.map((list) => {
            this.region_id.push({ name: list.region, code: list.id });
          });
        }
      }
    },
    async getRates() {
      const res = await this.getRatesData(this.details.region_id);
      if (res) {
        this.rate_card_id = [];
        res.data?.results.map((list) => {
          this.rate_card_id.push({ name: list.rate_card_name, code: list.id });
        });
      }
    },
    async getTrips() {
      try {
        const res = await this.getTripsData(this.details.rate_card_id);
        if (res) {
          if (res.data.results) {
            // this.tripTableData = res.data.results;
            for (let c in res.data.results) {
              this.tripTableData[c] = {};
              this.tripTableData[c].trip_no = res.data.results[c].trip_no;
              this.tripTableData[c].from_time = res.data.results[
                c
              ].from_time.substring(0, 5);
              this.tripTableData[c].to_time = res.data.results[
                c
              ].to_time.substring(0, 5);
              this.tripTableData[c].trip_days = res.data.results[c].trip_days;
              this.tripTableData[c].trip_type = res.data.results[c].trip_type;
              this.tripTableData[c].trip_id = res.data.results[c].trip_id;
              this.tripTableData[c].selected = true;
            }
          }
        }
      } catch (error) {
        this.errMsg = true;
        this.tripsData = [];
      }
    },
  },
  mounted() {},
  created() {
    this.getRegions();
    if (this.quotationData) {
      this.details.region_id =
        this.quotationData?.express_contract[0]?.region_id;

      this.details.rate_card_id =
        this.quotationData?.express_contract[0]?.rate_card_id;

      for (let i in this.quotationData.express_contract[0].trips) {
        this.tripTableData[i] = this.quotationData.express_contract[0].trips[i];

        this.tripTableData[i].from_time =
          this.quotationData.express_contract[0].trips[i].from_time.slice(
            11,
            16
          );
        this.tripTableData[i].to_time =
          this.quotationData.express_contract[0].trips[i].to_time.slice(11, 16);
      }

      this.renderKey++;
    }
  },
  watch: {
    "details.region_id": function () {
      this.getRates();
    },
    "details.rate_card_id": function () {
      this.setSelectedRateCardId(this.details.rate_card_id);
      this.getTrips();
    },
  },
};
</script>

<style scoped>
.trips-header {
  font-size: 12px !important;
  color: #343434 !important;
}
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
