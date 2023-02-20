<template>
  <div class="field col-12 md:col-12 mt-6">
    <p class="bold-700 font-size-12 color-343434 ml-2 mb-0 pb-0">Trip Plan</p>
  </div>
  <div :key="renderKey" class="formgrid grid ml-2">
    <div :key="renderKey" class="field col-12 md:col-6">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">Region</h5>
      <!-- <DropDown

        code="code"
        :data="region"
        label="region"
        @update:modelValue="onChange($event)"
        v-model="details.region"
        :class="{
          'p-invalid': v$.details.region.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      /> -->
      <DropDownField
      :key="renderKey"
        :value="details.region"
         code="code"
        :data="region"
        label="region"
        @update:modelValue="onChange($event)"
        v-model="details.region"
        :class="{
          'p-invalid': v$.details.region.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div :key="renderKey" class="field col-12 md:col-6">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">Rates</h5>
      <!-- <DropDown
        code="code"
        :data="rates"
        label="rates"
        @update:modelValue="onChangeRate($event)"
        v-model="details.rates"
        :class="{
          'p-invalid': v$.details.rates.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      /> -->
      <DropDownField
      :key="renderKey"
        :value="details.rates"
         code="code"
        :data="rates"
        label="rates"
        @update:modelValue="onChangeRate($event)"
        v-model="details.rates"
        :class="{
          'p-invalid': v$.details.rates.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="field col-12 md:col-12">
    <p class="bold-700 font-size-12 color-343434 mt-4 ml-2 mb-0 pb-0">
      Trip Schedule
    </p>
  </div>
  <div :key="renderKey" class="row ml-2 table_div mt-0 pt-0">
    <div class="col-12 mt-0 pt-0">
      <DataTables
      :key="renderKey"
        :tableData="tripsList"
        v-model:selection="selected_trips"
        :selectionModeState="selected_trips"
        :tableColumn="trip_table"
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
      <CancelButton
        storePath="salesQuotationDialog"
        label="Cancel"
        class="color-357dea"
        @click="closeDialog"
      />
      <Buttons
        label="Next"
        button_class="dialog-button-text bg-357dea"
        v-on:childToParent="nextStepHandler"
      />
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import DataTables from "./Components/DataTables.vue";
import { mapActions, mapState } from "vuex";
import moment from "moment";
export default {
  name: "SalesExpressContractVanThirdStep",
  data: () => ({
    v$: useVuelidate(),
    renderKey: 1,
    trip_table:[
      { field: "trip_no", header: "Trip No." },
      { field: "from_time", header: "From" },
      { field: "to_time", header: "To" },
      { field: "trip_days", header: "Trip Days" },
      { field: "trip_type", header: "Trip Type" },
    ],
    selected_trips: [],
    selectionModeState: null,
    details: {
      region: "",
      rate_id: "",
      region_id: "",
      rates: "",
    },
    tripsList: [],
    region: [],
    rates: [],
    trips_type: [{ name: "Open", code: "" }],
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
  components: {
    DataTables,
  },
  computed: {
    ...mapState({
      finalData: (state) => state.salesExpressContractVan.payloadPost,
      quotationData: (state) => state.salesExpressContractVan.OverviewData,
    }),
  },
  methods: {
    ...mapActions({
      getRegion: "salesExpressContractVan/getRegion",
      getRates: "salesExpressContractVan/getRatesByRegion",
      getRatesData: "salesExpressContractBikeProjectJobs/getRatesData",
      getTrips: "salesExpressContractVan/getTripByRates",
      setPostData: "salesExpressContractVan/setPayloadPostData",
    }),
    goBackHandler() {
      this.$store.state.salesExpressContractVan.vanStep--
      this.$store.dispatch("salesExpressContractVan/navigateStepper", {
        step: "SalesExpressContractVanSecondStep",
      });
    },
     closeDialog() {
      this.$store.dispatch("salesSales/closeDialog");
    },
    rowClass() {
      return "formRows";
    },
    async regionList() {
      this.countryOpts = [];
      let res = await this.getRegion();

      res.data.results.map((i) => {
        this.region.push({
          name: i.region,
          code: i.id,
        });
      });
    },
    async rateRegion(id) {
      let res = await this.getRatesData(id);

      res.data.results.map((i) => {
        this.rates.push({
          name: i.rate_card_name,
          code: i.id,
        });
      });
    },
    async trips(id) {
      let res = await this.getTrips({ id: id });
      this.tripsList = res.data.results;
      this.selected_trips = [];
      this.renderKey++;
    },
    async onChange(e) {
      this.details.region_id = e;
      await this.rateRegion(e);
    },
    async onChangeRate(e) {
      this.details.rate_id = e;
      await this.trips(e);
    },
    nextStepHandler() {
      let { region_id, rate_id } = this.details;
      if (this.v$.$invalid) {
        this.submitted = true;
         this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please fill in all the required fields.",
          life: 3000,
        });
      }
      if (!this.v$.$invalid) {
        let trip_data = [];
        this.selected_trips.map((i) => {
          i["selected"]=true
          trip_data.push(i);
        });
        let payload = {
          ...this.finalData,
          quotation: {
            ...this.finalData.quotation,
            
              region_id: region_id,
              rate_card_id: rate_id,
              trips: trip_data,
          },
        };
        this.setPostData({ type: payload });
        this.$store.state.salesExpressContractVan.vanStep++;
        this.$store.dispatch("salesExpressContractVan/navigateStepper", {
          step: "SalesExpressContractVanFourthStep",
        });
      }
    },
    prefillData(){
      // let priority={name: this.quotationData.international_agent_specifics.priority, code: "USD"};
      let details =this.quotationData?.express_contract[0]??{}
      
      // let data=this.rates.find((i)=>i.code==details.rate_card_id)
      // let data1=this.region.find((i)=>i.code==details.region_id)
      this.details.region= details.region_id,
      this.details.rates= details.rate_card_id,
      this.details.region_id= details.region_id,
       this.details.rate_id= details.rate_card_id,
      details.trips.map((i)=>{
        this.selected_trips.push({
    "trip_id": i.trip_id,
    "trip_no": i.trip_no,
    "from_time":moment(i.from_time).format("HH:mm"),
    "to_time": moment(i.to_time).format("HH:mm"),
    "trip_days": i.trip_days,
    "trip_type": i.trip_type
})
      })
      
      this.renderKey++
    },
  },
  async mounted() {
    await this.regionList();
    if (this.quotationData) {
      await this.rateRegion(this.quotationData.express_contract[0]?.region_id)
      await this.trips(this.quotationData.express_contract[0]?.rate_card_id)
      this.prefillData();
    } 
    // else {
    // this.getProfileData();
    // }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
::v-deep .p-datatable .p-datatable-thead > tr > th {
  background: #edf1f7 !important;
  color: #7e84a7 !important;
  font-size: 12px;
  font-weight: 600;
}
::v-deep .p-datatable .p-datatable-tbody > tr {
  border: 1px dashed #cad1dd !important;
}
.formRows {
  margin-top: 2% !important;
}
.formTable .p-datatable-tbody > tr:nth-child(odd) {
  height: 20px !important;
}
.formTable .p-datatable-tbody > tr {
  color: #495057;
  padding-bottom: 10rem !important;
  border-radius: 5px;
  outline: thin !important;
  outline-style: dashed !important;
  outline-color: #cad1dd !important;
}
.formTable .p-datatable-tbody > tr > td {
  border: 0px !important;
}
.formTable .p-column-title {
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #7e84a7;
}
.formTable .p-datatable-thead > tr {
  border-radius: 5px;
  outline: thin !important;
  outline-style: solid !important;
  outline-color: #edf1f7 !important;
}
.formTable .p-datatable-thead > tr > th {
  background: #edf1f7 !important;
}
</style>
