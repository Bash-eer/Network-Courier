<template>
  <div :key="renderKey">
    <div class="field col-12 md:col-12">
      <p class="txt mt-4 font-size-12 color-343434">Trip Plan</p>
    </div>
    <div class="formgrid grid ml-3">
      <div class="field col-12 md:col-6">
        <h5 class="required dialog-label-text required">Region</h5>
        <DropDownField
          code="code"
          :data="region"
          label="region"
          v-model="details.region"
          :value="details.region"
          :class="{
            'p-invalid': v$.details.region.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div :key="rates" class="field col-12 md:col-6">
        <h5 class="required dialog-label-text required">Rates</h5>
        <DropDownField
          code="code"
          :data="rates"
          :value="details.rates"
          label="rates"
          v-model="details.rates"
          :class="{
            'p-invalid': v$.details.rates.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
        <div v-if="errMsg" class="err-msg mt-2">Rate card not found</div>
      </div>
    </div>
    <div class="col-12 md:col-12">
      <p class="txt color-343434">Trip Schedule</p>
    </div>
    <div class="row ml-2 table_div">
      <div :key="trips" class="col-12">
        <DataTable
          formTableDataName="tripsTable"
          dataKey="id"
          :tableData="tripsData"
          :tableColumns="tableColumn"
          storePath="salesQuotationDialog"
          @isRowSelected="isRowSelected"
          :prefillData="quotationData?.express_contract[0]?.trips"
        />
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
      <div class="flex align-items-center justify-content-end">
        <div v-if="!tripsSelected && btnKey" class="err mr-5">
          Please select one or more trips
        </div>
        <CancelButton storePath="salesSales" label="Cancel"/>

        <Buttons
          label="Next"
          button_class="dialog-button-text"
          v-on:childToParent="nextStepHandler"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";
import DataTable from "./components/DataTable.vue";

export default {
  name: "SalesExpressContractBikeProjectJobsThirdStep",
  components: { DataTable },
  data: () => ({
    v$: useVuelidate(),
    details: {
      region: "",
      rates: "",
    },
    errMsg: false,
    tripsSelected: false,
    renderKey: 10,
    btnKey: false,
    tripsData: [],
    region: [],
    rates: [],
    prefilledTripsData: [],
    tableColumn: [
      { field: "trip_no", header: "Trip Name" },
      { field: "from_time", header: "From" },
      { field: "to_time", header: "To" },
      { field: "trip_days", header: "Trip Days" },
      { field: "trip_type", header: "Trip Type" },
    ],
    submitted: false,
  }),
  validations() {
    return {
      details: {
        region: { required },
        rates: { required },
      },
    };
  },
  watch: {
    "details.region": function () {
      this.setPayloadData({
        key: "quotation",
        value: { region_id: this.details.region },
      });
      this.getRates();
    },
    "details.rates": function () {
      this.setPayloadData({
        key: "quotation",
        value: { rate_card_id: this.details.rates },
      });
      this.setSelectedRateCardId(this.details.rates);
      this.getTrips();
    },
  },
  computed: {
    ...mapGetters({
      quotationData: "salesExpressContractBikeProjectJobs/quotationData",
    }),
  },
  methods: {
    ...mapActions({
      getRegionData: "salesExpressContractBikeProjectJobs/getRegionData",
      getRatesData: "salesExpressContractBikeProjectJobs/getRatesData",
      getTripsData: "salesExpressContractBikeProjectJobs/getTripsData",
      setCurrentStep: "salesExpressContractBikeProjectJobs/setCurrentStep",
      setPayloadData: "salesExpressContractBikeProjectJobs/setPayloadData",
      setSelectedRateCardId:
        "salesExpressContractBikeProjectJobs/setSelectedRateCardId",
    }),
    isRowSelected(value) {
      this.tripsSelected = value;
    },
    goBackHandler() {
      this.setCurrentStep(2);
    },
    nextStepHandler() {
      this.btnKey = true;
      if (this.v$.$invalid && !this.tripsSelected) {
        this.submitted = true;
      }
      if (!this.v$.$invalid && this.tripsSelected) {
        this.setCurrentStep(4);
      }
    },
    async getRegions() {
      const res = await this.getRegionData();

      if (res) {
        this.region = [];
        res.data?.results.map((list) => {
          this.region.push({ name: list.region, code: list.id });
        });
      }
    },
    async getRates() {
      const res = await this.getRatesData(this.details.region);
      if (res) {
        this.rates = [];
        res.data?.results.map((list) => {
          this.rates.push({ name: list.rate_card_name, code: list.id });
        });
      }
    },
    async getTrips() {
      try {
        const res = await this.getTripsData(this.details.rates);
        if (res) {
          this.tripsData = res.data?.results;

          this.errMsg = false;
        }
      } catch (error) {
        this.errMsg = true;
        this.tripsData = [];
      }
    },
    prefillData() {
      this.details.region = this.quotationData.express_contract[0].region_id;
      this.details.rates = this.quotationData.express_contract[0].rate_card_id;

      // this.quotationData?.express_contract[0]?.trips.map(list => {
      //   this.prefilledTripsData.push({

      //   })
      // })

      this.renderKey++;
    },
  },
  mounted() {
    if (this.quotationData) {
      this.prefillData();
    }
  },
  created() {
    this.getRegions();
  },
};
</script>

<style scoped>
.err-msg {
  font-size: 14px;
  color: red;
}

.err {
  color: red;
}
</style>
