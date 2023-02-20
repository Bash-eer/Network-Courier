<template>
<div>
  <!-- <InternationalRegularTabs :tabMenuData="VanOrBikeTab" class="mt-2" /> -->
  <div class="p-1 mt-4 mb-2">
    <DuoSelection
      :options="['Bike', 'FSR']"
      :default="defaultTransportType"
      type="setRegionDeliveryTransportType"
    />
  </div>
  <div class="formgrid grid">
    <div class="col-4">
      <h5 class="bold-700 font-size-14 color-343434 my-3">Monthly Minimum</h5>
    </div>
  </div>
  <div v-if="defaultTransportType == 'Bike'">
    <div class="formgrid grid" :key="renderKey">
      <div class="field col-12 md:col-4">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">No. of Units</h5>
        <TextField
          label="no_of_units"
          type="number"
          v-model="details.Bike.no_of_units"
          @blur="v$.details.Bike.no_of_units.$model;"
          v-on:childToParent="processNoOfUnitsHandler"
          :classes="{
            'p-invalid': v$.details.Bike.no_of_units.$invalid && submitted,
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4" >
        <h5 class="required bold-500 font-size-14 color-7a7a7a">Job $</h5>
        <TextField
          label="per_job"
          type="number"
          v-model="details.Bike.per_job"
          @blur="v$.details.Bike.per_job.$model;"
          v-on:childToParent="changeAmountHandler"
          :classes="{
            'p-invalid': v$.details.Bike.per_job.$invalid && submitted,
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">Amount</h5>
        <TextField
          :disabled="true"
          label="amount"
          id="amount"
          type="number"
          v-model="details.Bike.amount"
          @blur="v$.details.Bike.amount.$model;"
          :classes="{
            'p-invalid': v$.details.Bike.amount.$invalid && submitted,
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">Additional Job $</h5>
        <TextField
          label="additional_job"
          type="number"
          v-model="details.Bike.additional_job"
          @blur="v$.details.Bike.additional_job.$model;"
          :classes="{
            'p-invalid': v$.details.Bike.additional_job.$invalid && submitted,
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
      <div :key="renderKey" class="field col-12 md:col-4">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">Billing Cycle</h5>
        <DropDown
          code="name"
          :data="billing_cycle"
          @blur="v$.details.Bike.billing_cycle.$model;"
          label="billing_cycle"
          :state="details.Bike.billing_cycle"
          :key="details.Bike.billing_cycle"
          v-model="details.Bike.billing_cycle"
          :class="{
            'p-invalid': v$.details.Bike.billing_cycle.$invalid && submitted,
            'inputfield w-full color-212121 font-bold ': true,
          }"
        />
      </div>
    </div>
    
  </div>
  <!-- FSR -->
  <div v-if="defaultTransportType == 'FSR'">
    <div v-for="(sales, index) of addRates" :key="index">
      <div v-if="index > 0" class="flex justify-content-between">
        <div class="flex"></div>
        <div class="flex delete" @click="deleteRate(index)">
          <i class="pi parent pi-times mt-2"></i>
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-3">
          <h5 class="required bold-500 font-size-14 color-7a7a7a">Detail Type</h5>
          <TextField
            label="detail_type"
            type="text"
            v-model="details['FSR'][index].detail_type"
            @blur="v$.details['FSR'][index].detail_type.$model;"
            :classes="{
              'p-invalid': v$.details['FSR'][index].detail_type.$invalid && submitted,
              'inputfield w-full color-212121 font-bold py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-3">
          <h5 class="required bold-500 font-size-14 color-7a7a7a">Unit Price</h5>
          <TextField
            label="unit_price"
            type="number"
            v-model="details['FSR'][index].unit_price"
            @blur="v$.details['FSR'][index].unit_price.$model;"
            :classes="{
              'p-invalid': v$.details['FSR'][index].unit_price.$invalid && submitted,
              'inputfield w-full color-212121 font-bold py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-3">
          <h5 class="required bold-500 font-size-14 color-7a7a7a">Quantity</h5>
          <TextField
            label="quantity"
            id="quantity"
            type="number"
            v-model="details['FSR'][index].quantity"
            @blur="v$.details['FSR'][index].quantity.$model;"
            :classes="{
              'p-invalid': v$.details['FSR'][index].quantity.$invalid && submitted,
              'inputfield w-full color-212121 font-bold py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-3">
          <h5 class="required bold-500 font-size-14 color-7a7a7a">Amount</h5>
          <TextField
            label="amount"
            id="amount"
            type="number"
            v-model="details['FSR'][index].amount"
            @blur="v$.details['FSR'][index].amount.$model;"
            :classes="{
              'p-invalid': v$.details['FSR'][index].amount.$invalid && submitted,
              'inputfield w-full color-212121 font-bold py-2': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-12">
          <h5 class="bold-500 font-size-14 color-7a7a7a required">Description</h5>
          <TextAreaField
            label="description"
            @blur="v$.details['FSR'][index].description.$model;"
            type="text"
            v-model="details['FSR'][index].description"
            :classes="{
              'p-invalid': v$.details['FSR'][index].description.$invalid && submitted,

              'inputfield w-full color-212121 font-bold py-2': true,
            }"
          />
        </div>
      </div>
    </div>
    <div class="flex mb-2">
      <span class="dialog-new-field mt-0" @click="addSale"
        ><b>+ Add Rates </b></span
      >
    </div>
  </div>
    <div
      class="field col-12 md:col-12 my-4 p-2"
      style="background: #e6e6e6; border-radius: 5px"
    >
      <span class="ml-3 bold-700 font-size-14 color-343434"> Billing settings </span>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="bold-500 font-size-14 color-7a7a7a required">Credit Limit $</h5>
        <TextField
          label="credit_limit"
          type="number"
          v-model="details.bill_settings.credit_limit"
          :classes="{
            'p-invalid': v$.details.bill_settings.credit_limit.$invalid && submitted,
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="bold-500 font-size-14 color-7a7a7a required">Credit Terms</h5>
        <TextField
          label="credit_term_days"
          type="number"
          v-model="details.bill_settings.credit_term_days"
          :classes="{
            'p-invalid': v$.details.bill_settings.billing_cycle.$invalid && submitted,
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">Billing Cycle</h5>
        <DropDown
          code="name"
          :data="billing_cycle"
          @blur="v$.details.bill_settings.billing_cycle.$model;"
          label="billing_cycle"
          :state="details.bill_settings.billing_cycle"
          :key="details.bill_settings.billing_cycle"
          v-model="details.bill_settings.billing_cycle"
          :class="{
            'p-invalid': v$.details.bill_settings.billing_cycle.$invalid && submitted,
            'inputfield w-full color-212121 font-bold ': true,
          }"
        />
      </div>
    </div>
<hr/>
    <p class="ml-2 mt-4 bold-700 font-size-14 color-343434">Surcharge Charges</p>
  <div :key="renderKey" class="row pl-1">
    <div
          v-for="(data, index) of details.bill_settings.surcharges"
          :key="data.surcharge_id"
          class="field col-12 md:col-3"
        >
    <!-- <div class="col-3"> -->
      <div class="flex flex-row align-items-center">
        <SingleCheckBox
              :label= "data.surcharge_name"
              v-model="details.bill_settings.surcharges[index].selected"
              :value="details.bill_settings.surcharges[index].selected"
            />
        <div class="flex check-text ml-2">
          <TextField
            label="credit_terms"
            type="number"
            v-model="data.rates"
            :value="data.rates"
            :classes="{
              'inputfield w-full color-212121 font-bold ': true,
            }"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
<hr/>
    <p class="ml-2 mt-4 bold-700 font-size-14 color-343434">Trip Charges</p>
    <div class="row pl-1">
      <div class="col-3">
        <div class="flex flex-row">
          <div class="flex">
            <SingleCheckBox
              label="Weekday 2nd Trip Charge"
              v-model="details.bill_settings.weekend_2nd_trip_charge"
              :value="details.bill_settings.weekend_2nd_trip_charge"
            />
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="flex flex-row">
          <div class="flex">
            <SingleCheckBox
              label="Saturday 2nd Trip Charge"
              v-model="details.bill_settings.saturday_2nd_trip_charge"
              :value="details.bill_settings.saturday_2nd_trip_charge"
            />
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="flex flex-row">
          <div class="flex">
            <SingleCheckBox
              label="Return Trip Charge"
              v-model="details.bill_settings.return_trip_charge"
              :value="details.bill_settings.return_trip_charge"
            />
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="flex flex-row">
          <div class="flex">
            <SingleCheckBox
              label="Return Trip Partial Charge"
              v-model="details.bill_settings.return_trip_partial_charge"
              :value="details.bill_settings.return_trip_partial_charge"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="row pl-1">
      <div class="col-3">
        <div class="flex flex-row">
          <div class="flex">
            <SingleCheckBox
              label="Collection Trip Charge"
              v-model="details.bill_settings.collection_trip_charge"
              :value="details.bill_settings.collection_trip_charge"
            />
          </div>
        </div>
      </div>
      
      <div class="col-3">
        <div class="flex flex-row">
          <div class="flex">
            <SingleCheckBox
              label="Special Monitoring"
              v-model="details.bill_settings.special_monitoring"
              :value="details.bill_settings.special_monitoring"
            />
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="flex flex-row">
          <div class="flex">
            <SingleCheckBox
              label="Call Center"
              v-model="details.bill_settings.call_centre"
              :value="details.bill_settings.call_centre"
            />
          </div>
        </div>
      </div>
    </div>
   <!--  Bike customer Van Jobs--> 
  <div :key="renderKey" class="mt-3 bold-700 font-size-18 color-343434"><h5>Bike Customer Van Jobs</h5></div>
  <p class="my-4 bold-700 font-size-14 color-343434">Charge By Weight</p>
  <div class="formgrid grid col-8 mx-0 px-0">
    <div class="field col-12 md:col-6">
      <label class="bold-500 font-size-14 color-7a7a7a urgent_charges">Van Job Min.Cost $</label>
      <TextField
        label="van_job_min_cost"
        type="number"
        v-model="details.bill_settings.van_job_min_cost"
        :classes="{
          // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
          'inputfield w-full color-212121 font-bold py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <label class="bold-500 font-size-14 color-7a7a7a urgent_charges">Kgs</label>
      <TextField
        label="Kgs"
        type="number"
        v-model="details.bill_settings.van_job_min_cost_kg"
        :classes="{
          // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
          'inputfield w-full color-212121 font-bold py-2': true,
        }"
      />
    </div>

    <div class="field col-12 md:col-6">
      <label class="bold-500 font-size-14 color-7a7a7a urgent_charges">Van Job Add.Cost $</label>
      <TextField
        label="van_job_add_cost"
        type="number"
        v-model="details.bill_settings.van_job_add_cost"
        :classes="{
          // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
          'inputfield w-full color-212121 font-bold py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <label class="bold-500 font-size-14 color-7a7a7a urgent_charges">Kgs $</label>
      <TextField
        label="kgs2"
        type="number"
        v-model="details.bill_settings.van_job_add_cost_kg"
        :classes="{
          // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
          'inputfield w-full color-212121 font-bold py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <label class="bold-500 font-size-14 color-7a7a7a urgent_charges"
        >Van Job Urgent.Surcharge $</label
      >
      <TextField
        label="van_job_urgent_surcharge"
        type="number"
        v-model="details.bill_settings.van_job_urgent_surcharges"
        :classes="{
          // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
          'inputfield w-full color-212121 font-bold py-2': true,
        }"
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
        v-on:childToParent="goBackHandler"
        class="p-button-outlined mr-1 dialog-button-text color-357dea"
      />
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <div v-if="validationErr && submitted" class="color-red mr-5">
            Required fields are missing
          </div>
         <CancelButton storePath="salesQuotationDialog" class="color-357dea" label="Cancel"/>
        <Buttons
          label="Next"
          button_class="dialog-button-text bg-357dea"
          v-on:childToParent="nextStepHandler"
        />
      </div>
    </div>
  </div>
</div>
</template>
<script>
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
// import {VanOrBikeFSR} from "../../const/const";
import DuoSelection from "../../../DuoSelect.vue";
import { mapActions, mapGetters } from "vuex";
import BikeCustomerVanjobEditVue from '../../../../../../../Settings/Sales/Express/Contract/components/BikeCustomerVanjobEdit.vue';

export default {
  name: "SalesExpressContractBikeFSRFourthStep",
  components: {
    DuoSelection,
  },
  data: () => ({
    defaultTransportType: "Bike",
    v$: useVuelidate(),
    addSalesClicked: 0,
    renderKey: 10,
    surcharges: [],
    surchargesData: [],
    validationErr: true,
    BikeCustomerVanjobData: {},
    billing_cycle: [
      { name: "Weekly", code: "USD" },
      { name: "Monthly", code: "SGD" },
    ],
    addRates: ["new_sales"],
    ratesValidation: [
      {
        detail_type: { required },
        unit_price: { required },
        quantity: { required},
        amount: { required },
        description: { required },
      },
    ],
    details: {
      Bike: {
        per_job: "",
        no_of_units: "",
        amount: "",
        additional_job: "",
        billing_cycle: "",
      },
      FSR: [
         {
        detail_type: "",
        unit_price: "",
        quantity: "",
        amount: "",
        description: "",
        },
      ],
      bill_settings: {
        credit_limit: "",
        credit_term_days: "",
        billing_cycle: "",
        weekend_2nd_trip_charge: false,
        saturday_2nd_trip_charge: false,
        return_trip_charge: false,
        return_trip_partial_charge: false,
        collection_trip_charge: false,
        special_monitoring: false,
        call_centre: false,
        //
        van_job_min_cost: "",
        van_job_min_cost_kg: "",
        van_job_add_cost: "",
        van_job_add_cost_kg: "",
        van_job_urgent_surcharges: "",
        //
        surcharges: [
          {
            surcharge_name: "",
            rates: 0.0,
            selected: false,
            surcharge_id: "",
          },
        ],
      },
      
    },
    submitted: false,
  }),
  validations() {
    if (this.addSalesClicked > -1) {
      return {
        details: {
          Bike: {
          per_job: { required },
          no_of_units: { required },
          amount: { required },
          additional_job: { required },
          billing_cycle: { required },
        },
          FSR:this.ratesValidation,
          bill_settings: {
          credit_limit: { required },
          credit_term_days: { required },
          billing_cycle: { required },
          },
        },
      };
    }
  },
  computed: {
    ...mapGetters({
      expressContractBikeFSRContactData:
        "salesExpressContractBikeFSR/expressContractBikeFSRContactData",
      selectedRateCardId:
        "salesExpressContractBikeFSR/selectedRateCardId",
      expressContractBikeFSRAddNewData:
        "salesExpressContractBikeFSR/expressContractBikeFSRAddNewData",
      quotationData: "salesExpressContractBikeFSR/quotationData",
      quotationDataOverview: "salesExpressContractBikeFSR/quotationDataOverview",
    }),
  },
  methods: {
    ...mapActions({
      getSurchargersData:
        "salesExpressContractBikeFSR/getSurchargersData",
      getRateSuggestion:
        "salesExpressContractBikeFSR/getRateSuggestion",
      setCurrentStep: "salesExpressContractBikeFSR/setCurrentStep",
    }),
    // checkBoxChange(val, src) {
    //   console.log(val, "check", src)
    //   if (val.length != 0 && val[0].tag != 'surcharges') {
    //     this.details.bill_settings[val[0].name] = true;
    //   }
    //   if (val.length != 0 && val[0].tag == 'surcharges') {
    //     this.details.bill_settings.surcharges[0].selected = true;
    //   }
    //   if (val.length == 0) {
    //     this.details.bill_settings[src[0].name] = false;
    //   }
    //   if (val.length == 0 && val[0].tag == 'surcharges') {
    //     this.details.bill_settings.surcharges[0].selected = false;
    //   }
    // },
    goBackHandler() {
      this.setCurrentStep(3);
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
        this.validationErr = true;
      }
      if (!this.v$.$invalid) {
      this.expressContractBikeFSRAddNewData.quotation["bill_settings"]={};
        for (let i in this.details.bill_settings) {
          if (i != "surcharges"){
          this.expressContractBikeFSRAddNewData.quotation["bill_settings"][i] = this.details.bill_settings[i];
          }
          else if(i == "surcharges"){
            this.expressContractBikeFSRAddNewData.quotation.bill_settings["surcharges"]=[];
            this.details.bill_settings.surcharges.map((list) => {
            this.expressContractBikeFSRAddNewData.quotation.bill_settings["surcharges"].push({
              surcharge_id: list.surcharge_id,
              surcharge_name: list.surcharge_name,
              rates: list.rates,
              selected: list.selected,
            });
          });
          }
          // console.log(this.expressContractBikeFSRAddNewData, "Surcharges");
        } 
        for (let i in this.details){
          if(i == "Bike"){
            this.expressContractBikeFSRAddNewData.quotation["costing_details"]={};
            this.expressContractBikeFSRAddNewData.quotation.costing_details["bike"]={};
            this.expressContractBikeFSRAddNewData.quotation.costing_details["bike"]=
              this.details.Bike;
          }
          if(i == "FSR"){
            this.expressContractBikeFSRAddNewData.quotation.costing_details["fsr"]={};
            this.expressContractBikeFSRAddNewData.quotation.costing_details.fsr["rates"]=[];
            this.expressContractBikeFSRAddNewData.quotation.costing_details.fsr["rates"]=this.details.FSR;
          }
        }
        // console.log("final data", this.expressContractBikeFSRAddNewData );
          this.setCurrentStep(5);
      }
    },
    async processNoOfUnitsHandler() {
      this.$store.dispatch("salesSales/processNoOfUnitsHandler", {
        path: "/settings/sales/rates/express/contract/ratecards/normalcharges/ratesugession/bike/" + 93,
        data: {
            units: this.details.Bike.no_of_units,
          },
        method: "POST",
        loadData: "loadCostCenterData",
        toastData: {
          toastSuccessData: {
            toastMsg: `The Rate is fetched successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Rate already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error fetching the rate, try again!",

            toastSeverity: "error",
          },
        },
      });
      
    },
    async changeAmountHandler() {
      this.details.Bike.per_job = this.$store.state.salesSales.fetchNoOfUnitsHandlerData.jobs;
      this.details.Bike.amount =
        this.details.Bike.no_of_units *
        this.details.Bike.per_job;
      
        this.renderKey++
    },
    async FSRchangeAmountHandler() {
      // this.details.Bike.per_job = this.$store.state.salesSales.fetchNoOfUnitsHandlerData.jobs;
      for (let index in this.details.FSR){
      this.details['FSR'][index].amount =
        this.details['FSR'][index].quantity *
        this.details['FSR'][index].unit_price;
      }
    },
    async getSurcharges() {
      try {
        const res = await this.getSurchargersData(this.selectedRateCardId);

        if (res) {
          // if (res?.data?.results) {
            this.surcharges = res?.data?.results;
            this.details.bill_settings.surcharges = [];
            this.surcharges.map((list) => {
            this.surchargesData[list.surcharge_name] = list.rates;
            list['selected'] = false;
            this.details.bill_settings.surcharges.push({
              surcharge_id: list.surcharge_id,
              surcharge_name: list.surcharge_name,
              rates: list.rates,
              selected: list.selected,
            });
            console.log(this.details.bill_settings.surcharges, "Surcharge local")
            // this.surchargesData.push({
            //   surcharge_name: list.surcharge_name,
            //   surcharge_id: list.surcharge_id,
            //   rates: list.rates,
            //   selected: true,
            // });
            });
          // }
        } else return;
      } catch (error) {
        console.log(error);
      }
    },
    async BikeCustomerVanjob() {
      let respectiveData = this.selectedRateCardId;
      this.region = [];
      await axios
        .get("settings/sales/rates/express/contract/ratecards/normalcharges/ratejobsugession/bike/" +
            respectiveData)
        .then((res) => {
          if (res?.data?.results) {
            this.BikeCustomerVanjobData = res.data.results;
            this.details.bill_settings.van_job_min_cost = this.BikeCustomerVanjobData?.van_job_min_cost;
            this.details.bill_settings.van_job_min_cost_kg = this.BikeCustomerVanjobData?.van_job_min_cost_kg;
            this.details.bill_settings.van_job_add_cost = this.BikeCustomerVanjobData?.van_job_add_cost;
            this.details.bill_settings.van_job_add_cost_kg = this.BikeCustomerVanjobData?.van_job_add_cost_kg;
            this.details.bill_settings.van_job_urgent_surcharges = this.BikeCustomerVanjobData?.van_job_urgent_surcharges;
        }
      });
      this.renderKey++;
    },
    addSale() {
      this.details.FSR.push({
        detail_type: "",
        unit_price: "",
        quantity: "",
        amount: "",
        description: "",
      });
      this.ratesValidation.push({
        detail_type: { required },
        unit_price: { required },
        quantity: { required },
        amount: { required },
        description: { required },
      });
      this.addSalesClicked++;
      this.addRates.push("new_sales");
    },
    deleteRate(index) {
      this.details.FSR.splice(index, 1);
      this.ratesValidation.splice(index, 1);
      this.addRates.splice(index, 1);
      this.addSalesClicked++;
    },


    async populateRates() {
      let ratesStateData = this.quotationData.express_contract[0].fsr.rates;
      this.details.FSR = ratesStateData;
      if (ratesStateData.length > 0) {
        this.addRates = [];
        this.details.FSR = [];
        // this.imageArray = [];

        this.ratesValidation = [];
        for (let cs in ratesStateData) {
          this.addRates.push("existing_contact");
          let cd_obj = ratesStateData[cs];
          let detailsRatesObj = {};
          //
          // this.imageArray.push(ratesStateData[cs].profile_url);
          let ratesValidationObj = {};
          for (let cd_obj_keys in cd_obj) {
            if (
              cd_obj_keys == "detail_type" ||
              cd_obj_keys == "unit_price" ||
              cd_obj_keys == "quantity" ||
              cd_obj_keys == "amount" ||
              cd_obj_keys == "description"
            ) {
              detailsRatesObj[cd_obj_keys] = cd_obj[cd_obj_keys];
              ratesValidationObj[cd_obj_keys] = { required };
            }
          }
          // this.details.contacts[index] = {};
          // if (this.details.contacts && this.details.contacts.length > 0) {
          this.details.FSR.push(detailsRatesObj);
          
          this.ratesValidation.push(ratesValidationObj);
          // }
        }
      }
    },
  },
  watch: {
    selectedRateCardId() {
      this.getSurcharges();
      this.BikeCustomerVanjob()
    },
    "$store.state.quotation.addRegionDeliveryTransportType": function () {
      this.defaultTransportType =
        this.$store.state.quotation.addRegionDeliveryTransportType;
    },
    "$store.state.salesSales.fetchNoOfUnitsHandlerData": function () {
      this.changeAmountHandler();
      this.renderKey++;
    },
  },
  async mounted(){
    console.log(this.quotationData, this.quotationDataOverview)
    if ( this.quotationData || this.quotationDataOverview) {
      for(let i in this.details.bill_settings){
        this.details.bill_settings[i] = this.quotationData?.express_contract[0]?.bill_settings[0][i];
      }
      this.details.bill_settings.van_job_min_cost = this.quotationData.express_contract[0].bill_settings[0].van_job_min_cost;
      this.details.bill_settings.van_job_add_cost = this.quotationData?.express_contract[0]?.bill_settings[0].van_job_add_cost;
      this.details.bill_settings.van_job_add_cost_kg = this.quotationData?.express_contract[0]?.bill_settings[0].van_job_add_cost_kg;
      this.details.bill_settings.van_job_min_cost_kg = this.quotationData?.express_contract[0]?.bill_settings[0].van_job_min_cost_kg;
      this.details.bill_settings.van_job_urgent_surcharges = this.quotationData?.express_contract[0]?.bill_settings[0].van_job_urgent_surcharges;
      for(let i in this.details.Bike){
        this.details.Bike[i] = this.quotationData?.express_contract[0]?.bike[i];
      }
      this.details.bill_settings.surcharges = []
      this.quotationData.express_contract[0].bill_settings[0].surcharges.map((list, index) => {            
            this.details.bill_settings.surcharges.push({
              surcharge_id: list.surcharge_id,
              surcharge_name: list.surcharge_name,
              rates: list.rates,
              selected: list.selected,
            });
          });
        
        this.details.FSR = this.quotationData.express_contract[0].fsr.rates;
        if (this.quotationData?.express_contract[0].fsr.rates) {
          await this.populateRates();
      }
      // this.renderKey++;
    }
    if(this.quotationDataOverview){
      //Contacts
        this.expressContractBikeFSRContactData["contacts"] = [],
        this.expressContractBikeFSRContactData["contacts"] = this.quotationDataOverview?.contacts
      //First step
      this.expressContractBikeFSRAddNewData["address"] = this.quotationDataOverview?.address;
      this.expressContractBikeFSRAddNewData["building_name"] = this.quotationDataOverview?.building_name;
      this.expressContractBikeFSRAddNewData["business_type"] = this.quotationDataOverview?.business_type;
      this.expressContractBikeFSRAddNewData["country"] = this.quotationDataOverview?.country;
      this.expressContractBikeFSRAddNewData["customer_type"] = this.quotationDataOverview?.customer_type;
      this.expressContractBikeFSRAddNewData["floor_no"] = this.quotationDataOverview?.floor_no;
      this.expressContractBikeFSRAddNewData["postal_code"] = this.quotationDataOverview?.postal_code;
      this.expressContractBikeFSRAddNewData["profile_id"] = this.quotationDataOverview?.profile_id;
      this.expressContractBikeFSRAddNewData["profile_name"] = this.quotationDataOverview?.profile_name;
      this.expressContractBikeFSRAddNewData["sales_person_id"] = this.quotationDataOverview?.sales_person_id;
      this.expressContractBikeFSRAddNewData["short_name"] = this.quotationDataOverview?.short_name;
      this.expressContractBikeFSRAddNewData["state"] = this.quotationDataOverview?.state;
      this.expressContractBikeFSRAddNewData["status"] = this.quotationDataOverview?.status;
      this.expressContractBikeFSRAddNewData["unit_no"] = this.quotationDataOverview?.unit_no;
      this.expressContractBikeFSRAddNewData["contacts"] = [];
      this.expressContractBikeFSRAddNewData["quotation"] = {};
      this.expressContractBikeFSRAddNewData.quotation["festival_name"] = this.quotationDataOverview?.express_contract[0]?.festival_name;
      this.expressContractBikeFSRAddNewData.quotation["package_details"] = this.quotationDataOverview?.express_contract[0]?.package_details;
      this.expressContractBikeFSRAddNewData.quotation["previously_served_by"] = this.quotationDataOverview?.express_contract[0]?.previously_served_by;
      this.expressContractBikeFSRAddNewData.quotation["referral_name"] = this.quotationDataOverview?.express_contract[0]?.referral_name;
      this.expressContractBikeFSRAddNewData.quotation["referred_by"] = this.quotationDataOverview?.express_contract[0]?.referred_by;
      this.expressContractBikeFSRAddNewData.quotation["sales_commission"] = this.quotationDataOverview?.express_contract[0]?.sales_commission;
      this.expressContractBikeFSRAddNewData.quotation["service"] = this.quotationDataOverview?.express_contract[0]?.service;
      this.expressContractBikeFSRAddNewData.quotation["standard_liability"] = this.quotationDataOverview?.express_contract[0]?.standard_liability;
      this.expressContractBikeFSRAddNewData.quotation["volumetric_value"] = this.quotationDataOverview?.express_contract[0]?.volumetric_value;
      this.expressContractBikeFSRAddNewData.quotation["region_id"] = this.quotationDataOverview?.express_contract[0]?.region_id;
      this.expressContractBikeFSRAddNewData.quotation["rate_card_id"] = this.quotationDataOverview?.express_contract[0]?.rate_card_id;
      this.expressContractBikeFSRAddNewData.quotation["trips"] = [];
      this.quotationDataOverview?.express_contract[0]?.trips.map((list)=>{
        this.expressContractBikeFSRAddNewData.quotation.trips.push({
          trip_no : list.trip_no,
          from_time: list.from_time,
          to_time: list.to_time,
          trip_days : list.trip_days,
          trip_type: list.trip_type,
          trip_id: list.trip_id,
          selected: list.selected
        });
      });
    } 
  },
  async created() {
    if(!this.quotationData){
      await this.getSurcharges();
      await this.BikeCustomerVanjob();
    }
    
  },
  
};
</script>
<style scoped>
.subFormHeaders {
  color: black;
  font-weight: bolder;
  font-size: 14px;
}
.subFormHeadersLarge {
  color: black;
  font-weight: bolder;
  font-size: 16px;
}
.checksLabel {
  margin-top: 10%;
}
.checksText {
  color: #4e5868;
  font-weight: 600;
  font-style: normal;
  font-size: 12px;
  margin-top: 13px;
}
.text {
  color: black;
  background: #e6e6e6;
  margin-top: 10px;
  border-radius: 7px;
  font-weight: bold;
}
.head {
  font-weight: 700;
  font-size: 14px;
  color: #343434;
}
</style>
