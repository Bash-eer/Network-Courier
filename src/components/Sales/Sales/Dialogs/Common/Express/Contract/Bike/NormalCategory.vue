<template>
  <br />
  <div class="dropDownField">
    <div class="formgrid grid flex">
      <div class="col-12 md:col-4">
        <label class="required bold-500 font-size-14 color-7a7a7a"
          >No.of Units</label
        >
        <TextField
          label="surcharge"
          type="number"
          v-model="details.normal_rates.no_of_units"
          :classes="{
            'p-invalid':
              v$.details.normal_rates.no_of_units.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="col-12 md:col-4">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">Job $</h5>
        <TextField
          label="surcharge_minimum_parcels"
          type="number"
          v-model="details.normal_rates.per_job"
          :classes="{
            'p-invalid': v$.details.normal_rates.per_job.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="col-12 md:col-4">
        <label class="required bold-500 font-size-14 color-7a7a7a"
          >Amount</label
        >
        <TextField
          disabled="true"
          label="surcharge"
          type="number"
          v-model="details.normal_rates.amount"
          :classes="{
            'p-invalid': v$.details.normal_rates.amount.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid mt-5">
      <div class="col-12 md:col-4">
        <label class="required bold-500 font-size-14 color-7a7a7a"
          >Additional Job $</label
        >
        <TextField
          label="timeslot_delivery"
          type="number"
          v-model="details.normal_rates.additional_job"
          :classes="{
            'p-invalid':
              v$.details.normal_rates.additional_job.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>
  </div>
  <!--billing-settings-->
  <div class="billingTab mt-3">Billing settings</div>

  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <label class="required dialog-label-text">Credit Limit $</label>
      <TextField
        label="credit_limits"
        type="number"
        v-model="bill_settings.credit_limit"
        :classes="{
          'p-invalid': v$.bill_settings.credit_limit.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Credit Terms (Days)</h5>
      <TextField
        label="credit_terms"
        type="number"
        v-model="bill_settings.credit_term_days"
        :classes="{
          'p-invalid': v$.bill_settings.credit_term_days.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Billing Cycle</h5>
      <DropDown
        key="id"
        code="name"
        id="billing_cycle"
        :data="billing_cycle"
        :state="bill_settings.billing_cycle"
        label="billing_cycle"
        v-model="bill_settings.billing_cycle"
        :class="{
          'p-invalid': v$.bill_settings.billing_cycle.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <!-- Surcharge -->
  <p class="ml-2 mt-3 head">Surcharge Charges</p>
  <div class="row pl-1">
    <!--start of loop-->
    <!-- <div> -->
    <!-- <div
      
      class="grid"
    > -->
    <div
      v-for="item in $store.state.salesExpressBike
        .expressContractBikeSurchargeData"
      :key="item"
      class="col-4"
    >
      <!--class="col-3"-->
      <div class="flex flex-row">
        <!-- <div class="flex"> -->
        <CheckBox
          path="sales"
          v-bind:checker="
            item.selected == true
              ? [
                  {
                    name: `${item.surcharge_name}`,
                    tag: `${item.selected}`,
                    key: `${item.surcharge_name}`,
                  },
                ]
              : []
          "
          v-bind:categories="[
            {
              name: `${item.surcharge_name}`,
              tag: `${item.selected}`,
              key: `${item.surcharge_name}`,
            },
          ]"
          v-on:childToParent="checkBoxChange"
        />
        <!-- </div> -->
        <div class="flex check-text">
          <!-- <label class="dialog-label-text urgent_charges">Sur Charge $</label> -->
          <TextField
            label="credit_terms"
            type="number"
            v-model="item.rates"
            :classes="{
              // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
      </div>
    </div>
    <!-- </div> -->
    <!-- </div> -->
    <!--end of loop-->
    <!-- <div class="col-3">
      <div class="flex flex-row">
        <div class="flex"> 
        <CheckBox
          path="sales"
          v-bind:checker="
            bill_settings.surcharges[0].selected == true
              ? [
                  {
                    name: 'SMS $',
                    tag: 'bill_settings.surcharges[0].selected',
                    key: 'sms',
                  },
                ]
              : []
          "
          v-bind:categories="[
            {
              name: 'SMS $',
              tag: 'bill_settings.surcharges[0].selected',
              key: 'sms',
            },
          ]"
          v-on:childToParent="checkBoxChange"
        />
       
        <div class="flex check-text">
       
          <TextField
            label="credit_terms"
            type="number"
            v-model="bill_settings.surcharges[0].rate"
            :classes="{
              // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
      </div>
    </div> -->
    <!-- <div class="col-3">
      <div class="flex flex-row">
       
        <CheckBox
          path="sales"
          v-bind:checker="
            bill_settings.surcharges[1].selected == true
              ? [
                  {
                    name: 'Sur Charge $',
                    tag: 'bill_settings.surcharges[1].selected',
                    key: 'sc',
                  },
                ]
              : []
          "
          v-bind:categories="[
            {
              name: 'Sur Charge $',
              tag: 'bill_settings.surcharges[1].selected',
              key: 'sc',
            },
          ]"
          v-on:childToParent="checkBoxChange"
        />
     
        <div class="flex check-text">
       
          <TextField
            label="credit_terms"
            type="number"
            v-model="bill_settings.surcharges[1].rate"
            :classes="{
              // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
      </div>
    </div> -->
    <!-- <div class="col-3">
      <div class="flex flex-row">
      
        <CheckBox
          path="sales"
          v-bind:checker="
            bill_settings.surcharges[2].selected == true
              ? [
                  {
                    name: 'Island Charge $',
                    tag: 'bill_settings.surcharges[2].selected',
                    key: 'ic',
                  },
                ]
              : []
          "
          v-bind:categories="[
            {
              name: 'Island Charge $',
              tag: 'bill_settings.surcharges[2].selected',
              key: 'ic',
            },
          ]"
          v-on:childToParent="checkBoxChange"
        />
        </div> 
        <div class="flex check-text">
           <label class="dialog-label-text urgent_charges">Sur Charge $</label>
          <TextField
            label="credit_terms"
            type="number"
            v-model="bill_settings.surcharges[2].rate"
            :classes="{
              // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
      </div>
    </div> -->
    <!-- <div class="col-3">
      <div class="flex flex-row">
       <div class="flex"> 
        <CheckBox
          path="sales"
          v-bind:checker="
            bill_settings.surcharges[3].selected == true
              ? [
                  {
                    name: 'FTZ $',
                    tag: 'bill_settings.surcharges[3].selected',
                    key: 'ftz',
                  },
                ]
              : []
          "
          v-bind:categories="[
            {
              name: 'FTZ $',
              tag: 'bill_settings.surcharges[3].selected',
              key: 'ftz',
            },
          ]"
          v-on:childToParent="checkBoxChange"
        />
     
         </div>  
        <div class="flex check-text">
          <
            !-- <label class="dialog-label-text urgent_charges">Sur Charge $</label> 
          <TextField
            label="credit_terms"
            type="number"
            v-model="bill_settings.surcharges[3].rate"
            :classes="{
              // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
      </div>
    </div> -->
  </div>
  <!--trip charges-->
  <p class="ml-2 mt-3 subFormHeaders">Trip Charges</p>
  <div class="flex flex-row">
    <div class="flex costing_worksheet">
      <CheckBox
        path="sales"
        v-bind:checker="
          bill_settings.weekend_2nd_trip_charge == true
            ? [
                {
                  name: 'Weekday 2nd Trip Charge',
                  tag: 'bill_settings.weekend_2nd_trip_charge',
                  key: 'wtc',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'Weekday 2nd Trip Charge',
            tag: 'bill_settings.weekend_2nd_trip_charge',
            key: 'wtc',
          },
        ]"
        v-on:childToParent="checkBoxChange"
      />
    </div>
    <div class="flex groupwise_ws">
      <CheckBox
        path="sales"
        v-bind:checker="
          bill_settings.saturday_2nd_trip_charge == true
            ? [
                {
                  name: 'Saturday 2nd Trip Charge',
                  tag: 'bill_settings.saturday_2nd_trip_charge',
                  key: 'stc',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'Saturday 2nd Trip Charge',
            tag: 'bill_settings.saturday_2nd_trip_charge',
            key: 'stc',
          },
        ]"
        v-on:childToParent="checkBoxChange"
      />
    </div>
    <div class="flex">
      <CheckBox
        path="sales"
        v-bind:checker="
          bill_settings.return_trip_charge == true
            ? [
                {
                  name: 'Return Trip Charge',
                  tag: 'bill_settings.return_trip_charge',
                  key: 'rtc',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'Return Trip Charge',
            tag: 'bill_settings.return_trip_charge',
            key: 'rtc',
          },
        ]"
        v-on:childToParent="checkBoxChange"
      />
    </div>
    <div class="flex">
      <CheckBox
        path="sales"
        v-bind:checker="
          bill_settings.return_trip_partial_charge == true
            ? [
                {
                  name: 'Return Trip Partial Charge',
                  tag: 'bill_settings.return_trip_partial_charge',
                  key: 'rtpc',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'Return Trip Partial Charge',
            tag: 'bill_settings.return_trip_partial_charge',
            key: 'rtpc',
          },
        ]"
        v-on:childToParent="checkBoxChange"
      />
    </div>
  </div>
  <div class="flex flex-row">
    <div class="flex">
      <CheckBox
        path="sales"
        v-bind:checker="
          bill_settings.collection_trip_charge == true
            ? [
                {
                  name: 'Collection Trip Charge',
                  tag: 'bill_settings.collection_trip_charge',
                  key: 'ctc',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'Collection Trip Charge',
            tag: 'bill_settings.collection_trip_charge',
            key: 'ctc',
          },
        ]"
        v-on:childToParent="checkBoxChange"
      />
    </div>
    <div class="flex flex-row">
      <!-- <div class="flex"> -->
      <CheckBox
        path="sales"
        v-bind:checker="
          bill_settings.special_urgent_charges_selected == true
            ? [
                {
                  name: 'Special Urgent Charges $',
                  tag: 'bill_settings.special_urgent_charges_selected',
                  key: 'suc',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'Special Urgent Charges $',
            tag: 'bill_settings.special_urgent_charges_selected',
            key: 'suc',
          },
        ]"
        v-on:childToParent="checkBoxChange"
      />
      <!-- </div> -->
      <div class="flex check-text">
        <!-- <label class="dialog-label-text urgent_charges">Sur Charge $</label> -->
        <TextField
          label="credit_terms"
          type="number"
          v-model="bill_settings.special_urgent_charges"
          :classes="{
            // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
  </div>
  <!--  Bike customer Van Jobs-->
  <div class="mt-3"><h5>Bike Customer Van Jobs</h5></div>
  <p class="ml-2 mt-3 head">Charge By Weight</p>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <label class="dialog-label-text urgent_charges">Van Job Min.Cost $</label>
      <TextField
        label="van_job_min_cost"
        type="number"
        v-model="bill_settings.van_job_min_cost"
        :classes="{
          // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <label class="dialog-label-text urgent_charges">Kgs</label>
      <TextField
        label="Kgs"
        type="number"
        v-model="bill_settings.van_job_min_cost_kg"
        :classes="{
          // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>

    <div class="field col-12 md:col-4">
      <label class="dialog-label-text urgent_charges">Van Job Add.Cost $</label>
      <TextField
        label="van_job_add_cost"
        type="number"
        v-model="bill_settings.van_job_add_cost"
        :classes="{
          // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <label class="dialog-label-text urgent_charges">Kgs $</label>
      <TextField
        label="kgs2"
        type="number"
        v-model="bill_settings.van_job_add_cost_kg"
        :classes="{
          // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <label class="dialog-label-text urgent_charges"
        >Van Job Urgent.Surcharge $</label
      >
      <TextField
        label="van_job_urgent_surcharge"
        type="number"
        v-model="bill_settings.van_job_urgent_surcharges"
        :classes="{
          // 'p-invalid': v$.details.credit_terms.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
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
      <CancelButton storePath="salesSales" />
      <Buttons
        label="Next"
        button_class="dialog-button-text bg-357dea"
        v-on:childToParent="nextStepHandler"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
const { URL } = require("../../../../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      submitted: false,
      v$: useVuelidate(),
      billing_cycle: [
        { name: "Weekly", code: "USD" },
        { name: "Monthly", code: "SGD" },
      ],
      details: {
        charge_type: "normal",
        normal_rate_card_id: "2",
        normal_rate_card_name: "Airport Rate Card",
        selected_normal: "true",
        normal_rates: {
          no_of_units: "",
          per_job: "",
          amount: "",
          additional_job: "",
        },
      },

      bill_settings: {
        credit_limit: "",
        credit_term_days: "",
        billing_cycle: "",
        //
        weekend_2nd_trip_charge: false,
        saturday_2nd_trip_charge: false,
        return_trip_charge: false,
        return_trip_partial_charge: false,
        collection_trip_charge: false,
        special_urgent_charges_selected: false,
        special_urgent_charges: "",
        //
        van_job_min_cost: "",
        van_job_min_cost_kg: "",
        van_job_add_cost: "",
        van_job_add_cost_kg: "",
        van_job_urgent_surcharges: "",

        // maximum_weight: 500
        // van_job_add_cost: 62
        // van_job_add_weight: 550
        // van_job_min_cost: 10
        // van_job_urgent_surcharges: 2
        //
        // surcharges: [
        //   {
        //     surcharge_name: "SMS",
        //     rate: 0.0,
        //     selected: false,
        //     surcharge_id: true,
        //   },

        //   {
        //     surcharge_name: "Sur Charge",
        //     rate: 0.0,
        //     selected: false,
        //     surcharge_id: true,
        //   },
        //   {
        //     surcharge_name: "Island Charge",
        //     rate: 0.0,
        //     selected: false,
        //     surcharge_id: true,
        //   },
        //   {
        //     surcharge_name: "FTZ",
        //     rate: 0.0,
        //     selected: false,
        //     surcharge_id: true,
        //   },
        // ],
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
  validations() {
    return {
      details: {
        normal_rates: {
          no_of_units: { required },
          per_job: { required },
          amount: { required },
          additional_job: { required },
        },
      },
      bill_settings: {
        credit_limit: { required },
        credit_term_days: { required },
        billing_cycle: { required },
      },
    };
  },
  methods: {
    goBackHandler() {
      this.$store.dispatch("salesQuotationDialog/navigateStepper", {
        step: "SalesExpressContractBikeThirdStep",
      });
    },
    nextStepHandler() {
      console.log(
        this.$store.state.salesExpressBike.expressContractBikeSurchargeData,
        "submit"
      );
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.expressContractBikeAddNewData["quotation"]["costing_details"] =
          this.details;
        console.log(
          this.$store.state.salesExpressBike.expressContractBikeSurchargeData,
          "surchrge"
        );
        this.bill_settings["surcharges"] =
          this.$store.state.salesExpressBike.expressContractBikeSurchargeData;
        this.expressContractBikeAddNewData["quotation"]["bill_settings"] =
          this.bill_settings;
        this.$store.dispatch("salesQuotationDialog/navigateStepper", {
          step: "SalesExpressContractBikeFifthStep",
        });
      }
    },
    async processNoOfUnitsHandler() {
      axios
        .post(
          "/settings/sales/rates/express/contract/ratecards/normalcharges/ratesugession/bike/" +
            93,
          {
            units: this.details.normal_rates.no_of_units,
          }
        )
        .then((res) => {
          if (res.data.results) {
            console.log(res.data.results, "job");
            this.details.normal_rates.per_job = res.data.results.jobs;
          }
        });
    },
    async changeAmountHandler() {
      this.details.normal_rates.amount =
        this.details.normal_rates.no_of_units *
        this.details.normal_rates.per_job;
      console.log(this.details.normal_rates.amount, "amount");
    },
    prefillEditData() {
      console.log(this.ExpressContractBikeEditData, "edit data ");
      //details
      this.bill_settings.credit_limit =
        this.ExpressContractBikeEditData.express_contract[0].bill_settings[0].credit_limit;
      this.bill_settings.credit_term_days =
        this.ExpressContractBikeEditData.express_contract[0].bill_settings[0].credit_term_days;
      this.bill_settings.billing_cycle =
        this.ExpressContractBikeEditData.express_contract[0].bill_settings[0].billing_cycle;
      //surcharge
      this.$store.state.salesExpressBike.expressContractBikeSurchargeData =
        this.ExpressContractBikeEditData.express_contract[0].bill_settings[0].surcharges;
      //charge by weight trip charges
      let chargeByWeightArray = [
        "van_job_min_cost",
        "van_job_add_cost_kg",
        "van_job_add_cost",
        "van_job_min_cost_kg",
        "van_job_urgent_surcharges",
        "weekend_2nd_trip_charge",
        "special_urgent_charges",
        "saturday_2nd_trip_charge",
        "return_trip_charge",
        "return_trip_partial_charge",
        "collection_trip_charge",
        "special_urgent_charges_selected",
      ];
      chargeByWeightArray.map((itm) => {
        this.bill_settings[itm] =
          this.ExpressContractBikeEditData.express_contract[0].bill_settings[0][
            itm
          ];
      });
    },
    prefillNewData() {
      console.log(
        this.$store.state.salesExpressBike.expressContractBikeSurchargeData,
        "surchargecreated"
      );
      let surcharges =
        this.$store.state.salesExpressBike.expressContractBikeSurchargeData;
      surcharges.map((itm) => {
        itm["selected"] = false;
      });
      console.log(surcharges);
      let chargeByWeightArray = [
        "van_job_min_cost",
        "van_job_add_cost_kg",
        "van_job_add_cost",
        "van_job_min_cost_kg",
        "van_job_urgent_surcharges",
      ];
      chargeByWeightArray.map((itm) => {
        this.bill_settings[itm] =
          this.$store.state.salesExpressBike.expressContractBikeChargeByWeightData[
            itm
          ];
      });
    },
  },
  watch: {
    "details.normal_rates.no_of_units": async function () {
      await this.processNoOfUnitsHandler();
      await this.changeAmountHandler();
    },
    "details.normal_rates.per_job": async function () {
      await this.changeAmountHandler();
    },
    "$store.state.salesExpressBike.expressContractBikeSurchargeData":
      function () {
        console.log(
          this.$store.state.salesExpressBike.expressContractBikeSurchargeData,
          "surcharge"
        );
      },
  },
  async created() {
    // console.log(Object.keys(this.bill_settings));
    // await axios
    //   .get(
    //     "settings/sales/rates/express/contract/ratecards/AdditionalSurcharges/93"
    //   )
    //   .then((res) => {
    //     console.log(res.data.result);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    if (this.ExpressContractBikeEditData) {
      this.prefillEditData();
    } else {
      this.prefillNewData();
    }
  },
};
</script>

<style scoped>
.billingTab {
  width: 100%;
  height: 46px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-radius: 8px;
  background: #e6e6e6;
  font-size: 14px;
  font-weight: 700;
  color: #343434;
}
</style>
