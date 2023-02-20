<template>
  <div class="flex flex-wrap justify-content-between">
    <div class="flex"><span class="header">Bill Settings</span></div>
    <div class="flex"><i class="pi pi-ellipsis-v mt-2"></i></div>
  </div>
  <hr class="horizontal_line" />
  <div v-if="expressContactBikeOverview.express_contract[0]">
    <div v-if="expressContactBikeOverview.express_contract[0].bill_settings[0]">
      <!--flex row-->
      <div class="flex flex-row flex-wrap ml-1 mb-4 mt-2">
        <div
          v-for="(item, index) of BillSettingsData"
          :class="index != BillSettingsData.length - 1 ? 'flex mr-6' : 'flex'"
          :key="index"
        >
          <div class="flex flex-column">
            <div class="flex detailsText flex-wrap">{{ getHeader(index) }}</div>
            <div
              :class="
                item != 'High'
                  ? 'flex flex-wrap detailsText valuesText'
                  : 'flex  flex-wrap detailsText priorityText'
              "
            >
              <span v-if="index == 'job' || index == 'additional_jobs'">
                $ {{ item }}</span
              >
              <span v-else></span>
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <div class="grey-wrapper-small p-2">
        <p class="grey-wrapper-text text-800">Special Charges</p>
      </div>
      <!--flex row-->
      <div
        v-if="
          expressContactBikeOverview.express_contract[0].bill_settings[0]
            .surcharges
        "
      >
        <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
          <div
            v-for="(item, index) of expressContactBikeOverview
              .express_contract[0].bill_settings[0].surcharges"
            :class="
              index !=
              expressContactBikeOverview.express_contract[0].bill_settings[0]
                .surcharges.length -
                1
                ? 'flex mr-6'
                : 'flex'
            "
            :key="index"
          >
            <div class="flex flex-column" v-if="item.selected">
              <div class="flex detailsText flex-wrap">
                {{ item.surcharge_name }} $
              </div>
              <div class="flex flex-wrap detailsText valuesText">
                {{ item.rates }} $
              </div>
            </div>
          </div>
          <div
            class="flex mr-6"
            v-if="
              expressContactBikeOverview.express_contract[0].bill_settings[0]
                .special_urgent_charges_selected
            "
          ></div>
          <div class="flex flex-column">
            <div class="flex detailsText flex-wrap">Special Urgent Price $</div>
               <div
              class='flex flex-wrap detailsText valuesText'>
              {{
                expressContactBikeOverview.express_contract[0].bill_settings[0]
                  .special_urgent_charges
              }} $
            </div>
          </div>
        </div>
      </div>

      <div class="grey-wrapper-small p-2">
        <p class="grey-wrapper-text text-800">Trip Charges</p>
      </div>
      <!--flex row-->
      <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
        <div
          v-for="(item, index) of expressContactBikeOverview.express_contract[0]
            .bill_settings[0]"
          :key="index"
        >
          <div class="flex flex-row mr-6" v-if="item == true && index!='id'">
            <img
              src="/images/solution.png"
              alt="img"
              width="15"
              height="15"
              class="m-1"
            />
            <div class="inside-text">{{ getHeader(index) }}</div>
          </div>
        </div>
      </div>
      <div class="grey-wrapper-small p-2">
        <p class="grey-wrapper-text text-800">Bike Customer Van Job</p>
      </div>
      <!--flex row-->
      <div
        class="flex flex-row flex-wrap ml-1 mt-3 mb-4 justify-content-between mr-8"
      >
          <div class="flex flex-column">
            <div class="flex detailsText flex-wrap">Van Job Min. Cost $</div>
            <div
              class= 'flex flex-wrap detailsText valuesText'>
              {{ this.expressContactBikeOverview.express_contract[0].bill_settings[0].van_job_min_cost || 0 }} $
            </div>
          </div>
            <div class="flex flex-column">
            <div class="flex detailsText flex-wrap">Kgs</div>
                        <div
              class= 'flex flex-wrap detailsText valuesText'>
              {{ this.expressContactBikeOverview.express_contract[0].bill_settings[0].van_job_min_cost_kg || 0 }}
            </div>
          </div>
          <div class="flex flex-column">
            <div class="flex detailsText flex-wrap">Van Job Add. Cost $</div>
                       <div
              class= 'flex flex-wrap detailsText valuesText'>
              {{ this.expressContactBikeOverview.express_contract[0].bill_settings[0].van_job_add_cost || 0 }} $
            </div>
          </div>
          <div class="flex flex-column">
            <div class="flex detailsText flex-wrap">Kgs</div>
                        <div
              class= 'flex flex-wrap detailsText valuesText'>
              {{ this.expressContactBikeOverview.express_contract[0].bill_settings[0].van_job_add_cost_kg || 0 }}
            </div>
          </div>
                    <div class="flex flex-column">
            <div class="flex detailsText flex-wrap">Van Job Urgent. Surcharge $</div>
                        <div
              class= 'flex flex-wrap detailsText valuesText'>
              {{ this.expressContactBikeOverview.express_contract[0].bill_settings[0].van_job_urgent_surcharges || 0 }} $
            </div>
          </div>
        <!-- </div> -->
      </div>
    </div>
    <div v-else>
      <span class="grey-wrapper-text text-800 mb-2">
        Bill settings not yet added
      </span>
      <hr class="horizontal_line" />
    </div>
  </div>

  <div
    v-if="expressContactBikeOverview.quotation_express_cost_center_details[0]"
  >
    <!--flex row-->
    <div
      v-for="(
        item, index
      ) of expressContactBikeOverview.quotation_express_cost_center_details"
      :key="index"
    >
      <div class="grey-wrapper-small p-2">
        <p class="grey-wrapper-text text-800">
          Site Office
          <span
            class="ml-4 express-bike-billsetting express-international-table"
            >{{ item.cost_center_name }} : Unit {{ item.unit_no }},
            {{ item.floor_no }} floor, {{ item.country }}...</span
          >
        </p>
      </div>
      <div class="flex flex-row flex-wrap ml-2 mt-3 mb-4 gap-5">
          <div class="flex flex-column">
            <div class="flex detailsText flex-wrap">Charge Per Trip</div>
            <div class="flex flex-wrap detailsText valuesText">
              {{ item.site_office_charges[0].charge_per_trip || 0}} $
            </div>
          </div>
           <div class="flex flex-column">
            <div class="flex detailsText flex-wrap">Return Trip Charge</div>
            <div class="flex flex-wrap detailsText valuesText">
              {{ item.site_office_charges[0].return_trip_charge || 0}} $
            </div>
          </div>
           <div class="flex flex-column">
            <div class="flex detailsText flex-wrap">Head Off Delivery Charges</div>
            <div class="flex flex-wrap detailsText valuesText">
              {{ item.site_office_charges[0].head_off_delivery_charge || 0 }} $
            </div>
          </div>
      </div>
      <div class="flex flex-row flex-wrap mb-4">
        <div
          v-for="(item, index) of item.site_office_charges[0]"
          :key="item"
        >
          <div class="flex flex-row" v-if="item == true && index!='id'">
            <img
              src="/images/solution.png"
              alt="img"
              width="15"
              height="15"
              class="m-1"
            />
            <div class="inside-text">
              {{ getHeader(index) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="grey-wrapper-text text-800">
      Site Office
      <span class="ml-4 express-bike-billsetting express-international-table"
        >Site office not yet added</span
      >
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BillSettings",
  data() {
    return {
      BillSettingsData: {
        // credit_limit:'',
        // credit_terms:'',
        // billing_cycle:''
      },
      SpecialChargesData: "",
      // [{name:'sms',value:'10'},
      // {name:'sms',value:'10'},
      // {name:'sms',value:'10'}],
      // {
      //   sms: "80.00 $",
      //   special_urgent_price: "80.00 $",
      //   surcharges: "10.00 $",
      //   island_charges: "10.00 $",
      // },
      // TripChargesData: ["Weekday 2nd Trip Charge", "Saturday 2nd Trip Charge"],
      // BikeCustomerVanJobData: {
        // van_job_min_cost: "",
        // van_job_min_cost_kg: '',
        // van_job_add_cost: "",
        // van_job_add_cost_kg: '',
        // van_job_urgent_surcharge: "",
      // },
      SiteOfficeData: {
        // charge_per_trip: "6.00 $",
        // return_trip_charge: "4.4 $",
        // head_off_delivery_charges: "4.4 $",
      },
      // SiteOfficeArrayData: [
      //   "Return Trip Chargeable (Per Trip)",
      //   "Collection Chargable",
      //   "Head Off Delivery Charges",
      //   "Head Off Return Trip Waived",
      // ],
    };
  },
  computed: {
    ...mapGetters({
      expressContactBikeOverview:
        "salesExpressBike/ExpressContractBikeOverviewData",
    }),
  },
  methods: {
    getHeader(index) {
      let header;
      switch (index) {
        case "credit_limit":
          header = "Credit Limit";
          break;
        case "credit_terms":
          header = "Credit Terms (Days)";
          break;
        case "billing_cycle":
          header = "Billing Cycle";
          break;
        case "sms":
          header = "SMS $";
          break;
        case "special_urgent_price":
          header = "Special Urgent Price $ ";
          break;
        case "surcharges":
          header = "Sur Charge $";
          break;
        case "island_charges":
          header = "Island Charge $";
          break;
        case "van_job_min_cost":
          header = "Van Job Min. Cost  $";
          break;
        case "van_job_min_cost_kg":
          header = "Kgs";
          break;
        case "van_job_add_cost":
          header = "Van Job Add. Cost  $";
          break;
        case "van_job_add_cost_kg":
          header = "Kgs";
          break;
        case "van_job_urgent_surcharge":
          header = "Van Job  Urgent. Surcharge $";
          break;
        case "charge_per_trip":
          header = "Charge Per Trip";
          break;
        // case "return_trip_charge":
        //   header = "Return Trip Charge (By Amount)";
        //   break;
        case "head_off_delivery_charge":
          header = "Head Off Delivery Charges";
          break;
        case "weekend_2nd_trip_charge":
          header = "Weekday 2nd Trip Charge";
          break;
        case "saturday_2nd_trip_charge":
          header = "Saturday 2nd Trip Charge";
          break;
        case "return_trip_charge":
          header = "Return Trip Charge";
          break;
        case "return_trip_partial_charge":
          header = "Return Trip Partial Charge";
          break;
        case "collection_trip_charge":
          header = "Collection Trip Charge";
          break;
        case "special_urgent_charges_selected":
          header = "Special Urgent Charges";
          break;
        case "call_centre":
          header = "Call Centre";
          break;
        case "special_monitoring":
          header = "Special Monitoring";
          break;
        case "return_trip_chargable":
          header = "Return Trip Chargable";
          break;
        case "collection_chargable":
          header = "Collection Chargable";
          break;
        case "head_off_delivery_chargable":
          header = "Head Off Delivery Chargable";
          break;
        case "head_off_return_waived":
          header = "Head Off Return Waived";
          break;
      }
      return header;
    },
  },
  async created() {
    if(this.expressContactBikeOverview.express_contract[0]){
    if (this.expressContactBikeOverview.express_contract[0].bill_settings[0]) {
      this.BillSettingsData.credit_limit =
        this.expressContactBikeOverview.express_contract[0].bill_settings[0]
          .credit_limit || 0;
      this.BillSettingsData.credit_terms =
        this.expressContactBikeOverview.express_contract[0].bill_settings[0]
          .credit_term_days || 0;
      this.BillSettingsData.billing_cycle =
        this.expressContactBikeOverview.express_contract[0].bill_settings[0]
          .billing_cycle || 0;
    }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.express-bike-billsetting {
  color: #7e84a7;
}
.grey-wrapper-small {
  background: #edf1f7;
  border: none;
  border-radius: 5px;
  height: 35px;
  width: 100%;
}
.grey-wrapper-text {
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: #4e5868 !important;
}
.inside-text {
  font-weight: 600;
  font-size: 12px;
  line-height: 28px;

  color: #4e5868;
}
.detailsText {
  font-size: 12px;
  color: #818181;
  font-weight: 600;
}
.valuesText {
  color: #66c11e;
}
.priorityText {
  color: #c11e1e;
}
.header {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.03em;
  color: #343434;
}
.horizontal_line {
  margin: 0px !important;
  margin-top: 1.1% !important;
  // border: 1.15px solid #dfe4ed;
}
</style>
