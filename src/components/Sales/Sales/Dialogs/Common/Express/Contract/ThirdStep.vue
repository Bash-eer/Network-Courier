<template>
  <div class="field col-12 md:col-12 mt-6">
    <p class="bold-700 font-size-12 color-343434 ml-2 mb-0 pb-0">Trip Plan</p>
  </div>
  <div :key="renderKey" class="formgrid grid ml-2">
    <div :key="renderKey" class="field col-12 md:col-6">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">Region</h5>

      <DropDownField
        :key="renderKey"
        :value="details.region_id"
        code="code"
        :data="region"
        label="region_name"
        @update:modelValue="onChange($event)"
        v-model="details.region_id"
        :class="{
          'p-invalid': v$.details.region_id.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div :key="renderKey" class="field col-12 md:col-6">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">Rates</h5>

      <DropDownField
        :key="renderKey"
        :value="details.rate_card_id"
        code="code"
        :data="rates"
        label="rate_card_name"
        @update:modelValue="onChangeRate($event)"
        v-model="details.rate_card_id"
        :class="{
          'p-invalid': v$.details.rate_card_id.$invalid && submitted,
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
        v-model:selection="details.trips"
        :selectionModeState="details.trips"
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
import {
  expressContract,
  expressContractState,
} from "../../../../../../../store/helper";
export default {
  name: "SalesExpressContractThirdStep",
  data: () => ({
    v$: useVuelidate(),
    renderKey: 1,
    trip_table: [
      { field: "", header: "" },
      { field: "trip_no", header: "Trip No." },
      { field: "from_time", header: "From" },
      { field: "to_time", header: "To" },
      { field: "trip_days", header: "Trip Days" },
      { field: "trip_type", header: "Trip Type" },
    ],
    selected_trips: [],
    selectionModeState: null,
    details: {
      region_name: "",
      rate_card_id: "",
      region_id: "",
      rate_card_name: "",
      trips: [],
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
        region_id: { required },
        rate_card_id: { required },
      },
    };
  },
  components: {
    DataTables,
  },
  computed: {
    ...expressContractState,
    ...mapState({
      finalData: (state) => state.salesExpressContract.payloadPost,
      quotationData: (state) => state.salesExpressContract.OverviewData,
    }),
  },
  methods: {
    ...expressContract,
    goBackHandler() {
      this.navigateStepper({
        step: this.expressContractStep[1].component,
      });
      this.$store.state.salesExpressContract.flowStep--;
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
      this.region = [];
      res.data.results.map((i) => {
        this.region.push({
          name: i.region,
          code: i.id,
        });
      });
    },
    async rateRegion(id) {
      let res = await this.getRatesData(id);
      this.rates = [];
      res.data.results.map((i) => {
        this.rates.push({
          name: i.rate_card_name,
          code: i.id,
        });
      });
      this.renderKey++;
    },
    async trips(id) {
      let type = this.expressContractData.quotation.service.includes("Bike")
        ? "bike"
        : "van";
      let res = await this.getTripByRates({ id: id, type: type });
      this.details.trips = [];
      this.tripsList = res.data.results.map((i) => {
        if (this.overViewData) {
          this.overViewData.express_contract[0].trips.map((e) => {
            if (e.trip_id == i.trip_id) {
              (i.from_time = e.from_time),
                (i.to_time = e.to_time),
                (i.trip_days = e.trip_days),
                (i.trip_type = e.trip_type);
            }
          });

          if (
            this.overViewData.express_contract[0].trips.some(
              (u) => u.trip_id === i.trip_id && u.selected
            )
          ) {
            this.details.trips.push(i);
          }
        } else {
          if (i.selected) {
            this.details.trips.push(i);
          }
        }
        i["selected"] = true;
        return i;
      });
      //       if(this.quotationData){
      // let trip = this.quotationData?.express_contract[0] ?? {};
      //       this.details.trips = this.tripsList;
      //       }

      this.renderKey++;
    },
    async onChange(e) {
      let region = this.region.find((i) => i.code == e);
      this.details.region_name = region.name;
      this.details.region_id = e;

      this.details.rate_card_name = "";
      this.details.rate_card_id = 0;
      this.tripsList = [];
      await this.rateRegion(e);
    },
    async onChangeRate(e) {
      let rate = this.rates.find((i) => i.code == e);
      this.details.rate_card_name = rate.name;
      this.details.rate_card_id = e;
      await this.trips(e);
    },
    getUserInput() {
      this.setExpressContractData({ key: "quotation", value: this.details });
    },
    nextStepHandler() {
      let { region_id, rate_card_id } = this.details;
      if (this.details.trips.length === 0) {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Must select atleast one trip.",
          life: 3000,
        });
      }
      if (this.v$.$invalid && this.details.trips.length != 0) {
        this.submitted = true;
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please fill in all the required fields.",
          life: 3000,
        });
      }
      if (!this.v$.$invalid && this.details.trips.length != 0) {
        this.getUserInput();
        this.navigateStepper({
          step: this.expressContractStep[this.expressStep + 1].component,
        });
        this.$store.state.salesExpressContract.flowStep++;
      }
    },
    prefillData() {
      let details = this.quotationData?.express_contract[0] ?? {};
      (this.details.region_name = details.region_name),
        (this.details.rate_card_name = details.rate_card_name),
        (this.details.region_id = details.region_id),
        (this.details.rate_card_id = details.rate_card_id),
        details.trips.map((i) => {
          this.selected_trips.push({
            trip_id: i.trip_id,
            trip_no: i.trip_no,
            from_time: moment(i.from_time).format("HH:mm"),
            to_time: moment(i.to_time).format("HH:mm"),
            trip_days: i.trip_days,
            trip_type: i.trip_type,
          });
        });
      this.renderKey++;
    },
  },
  async mounted() {
    await this.regionList();
    if (this.quotationData) {
      await this.rateRegion(this.quotationData.express_contract[0]?.region_id);
      await this.trips(this.quotationData.express_contract[0]?.rate_card_id);
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