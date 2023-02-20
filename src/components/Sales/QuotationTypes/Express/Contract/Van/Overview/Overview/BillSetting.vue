<template>
  <div class="flex flex-wrap justify-content-between">
    <div class="flex">
      <span
        class="
          font-size-16
          line-height-20
          letter-spacing-003
          color-343434
          express-international-font
        "
        >Bill Settings</span
      >
    </div>
    <div class="flex"><i class="pi pi-ellipsis-v mt-2"></i></div>
  </div>

  <hr class="horizontal_line" />
  <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
    <div
      v-for="(item, index) of bill_data"
      :class="index != bill_data.length - 1 ? 'flex mr-6' : 'flex'"
      :key="index"
    >
      <div class="flex flex-column">
        <div class="flex detailsText flex-wrap">{{ item.title }}</div>
        <div
           class="flex flex-wrap van-costing-details-detailsText van-costing-details-valuesText
          "
        >
          <span v-if="item.title == 'Credit Limtis'"> {{ item.field }} $</span>
          <span v-else>{{ item.field  }}</span>
        </div>
      </div>
    </div>
  </div>

  <div
    class="
      van-bill-setting-surcharge
      bg-eef4ff
      color-4e5868
      font-size-12
      line-height-20
      flex
      align-items-center
      express-international-font
      mt-6
    "
  >
    Special Charges
  </div>

  <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4 row">
    <div
      v-for="(i, index) of this.$store.state.salesExpressContractVan
      .OverviewData?.express_contract[0].bill_settings[0].surcharges"
      :class="index != this.$store.state.salesExpressContractVan
      .OverviewData?.express_contract[0].bill_settings[0].surcharges.length - 1 ? 'flex mr-4 col-1' : 'flex col-1'"
      :key="index"
    >
      <div class="flex flex-column">
        <div class="flex detailsText flex-wrap">{{ i.surcharge_name }}</div>
        <div
          class="flex flex-wrap van-costing-details-detailsText van-costing-details-valuesText
          "
        >
          <!-- <span v-if="index == 'job' || index == 'additional_jobs'">
            $ {{ i.rates }}</span
          > -->
          <span ></span>
          {{ i.rates }}
        </div>
      </div>
    </div>
  </div>
  <div
    class="
      van-bill-setting-surcharge
      bg-eef4ff
      color-4e5868
      font-size-12
      line-height-20
      flex
      align-items-center
      express-international-font
      mt-6
    "
  >
    Trip Charges
  </div>

  <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4 row">
    <div
      v-for="i in trip_charge_data"
      :class="index != trip_charge_data.length - 1 ? `flex mr-4  ${i.field?'col-3':'trip-display'}` : `flex ${i.field?'col-3':'trip-display'}`"
      :key="i"
    >
      <div  class="flex flex-row ">
        <img
          src="/images/solution.png"
          alt="img"
          width="15"
          height="15"
          class="m-1"
        />
        <div
          class="
            font-size-12
            line-height-28
            color-4e5868
            express-international-font
          "
        >
          {{ i.title }}
        </div>
      </div>
    </div>
  </div>
  <div
    class="
      van-bill-setting-surcharge
      bg-eef4ff
      color-4e5868
      font-size-12
      line-height-20
      flex
      align-items-center
      express-international-font
      mt-6
    "
  >
    Van Customer Bike Job
  </div>
  <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
    <div
     
      :class="'flex mr-6'"
    >
      <div class="flex flex-column">
        <div class="flex detailsText flex-wrap required">
          Min Charge per Job ($)
        </div>
        <div  class="flex flex-wrap van-costing-details-detailsText van-costing-details-valuesText
          ">
          {{ $store.state.salesExpressContractVan
      .OverviewData?.express_contract[0].bill_settings[0].min_charge_per_job ??"" }} $
        </div>
      </div>
    </div>
  </div>
  <div v-if="$store.state.salesExpressContractVan
      .OverviewData?.quotation_express_cost_center_details.length!==0">
  <div class="mt-6">
    <p
      class="
        van-bill-setting-surcharge
        bg-eef4ff
        color-4e5868
        font-size-12
        line-height-20
        flex
        align-items-center
        express-international-font
      "
    >
      Site Office
      <span
        class="ml-3  line-height-15 color-7e84a7"
        >Cost Center 1 : {{overView.address+ ", "+overView.state+ ", "+overView.country+ " - "+overView.postal_code}}</span
      >
    </p>
  </div>

  <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
    <div
      v-for="(item, index) of overView.site_office_charges[0]"
      :class="
        index != overView.site_office_charges[0].length - 1 ? 'flex mr-6' : 'flex'
      "
      :key="index"
    >
      <div v-if="getHeaderThree(index)!==''" class="flex flex-column">
        <div class="flex detailsText flex-wrap">
          {{ getHeaderThree(index) }}
        </div>
        <div
          class="flex flex-wrap van-costing-details-detailsText van-costing-details-valuesText
          "
        >
          <!-- <span v-if="index == 'additional_jobs'"> $ {{ item }}</span> -->
          <span ></span>
          {{ item }} $
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-row flex-wrap mt-3 mb-4">
    <div
      v-for="item in SiteOfficeArrayData"
      :class="index != SiteOfficeArrayData.length - 1 ? 'flex mr-6' : 'flex'"
      :key="item"
    >
      <div  v-if="item.value === true" class="flex flex-row">
        <img
          src="/images/solution.png"
          alt="img"
          width="15"
          height="15"
          class="m-1"
        />
        <div
          class="
            font-size-12
            line-height-28
            color-4e5868
            express-international-font
          "
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      overView:{},
      bill_data:[
        {
          title:"Credit Limtis",
          field:this.$store.state.salesExpressContractVan
      .OverviewData?.express_contract[0].bill_settings[0].credit_limit??""
        },
        {
          title:"Credit Terms (Days)",
          field:this.$store.state.salesExpressContractVan
      .OverviewData?.express_contract[0].bill_settings[0].credit_term_days??""
        },
        {
          title:"Billing Cycle",
          field:this.$store.state.salesExpressContractVan
      .OverviewData?.express_contract[0].bill_settings[0].billing_cycle??""
        },
      ],
      trip_charge_data:[
        {
          title:"Weekday 2nd Trip Charge",
          field:this.$store.state.salesExpressContractVan
      .OverviewData?.express_contract[0].bill_settings[0].weekend_2nd_trip_charge??false
        },
         {
          title:"Saturday 2nd Trip Charge",
          field:this.$store.state.salesExpressContractVan
      .OverviewData?.express_contract[0].bill_settings[0].saturday_2nd_trip_charge??false
        },
        {
          title:"Return Trip Charge",
          field:this.$store.state.salesExpressContractVan
      .OverviewData?.express_contract[0].bill_settings[0].return_trip_charge??false
        },
        {
          title:"Return Trip Partial Charge",
          field:this.$store.state.salesExpressContractVan
      .OverviewData?.express_contract[0].bill_settings[0].return_trip_partial_charge??false
        },
        {
          title:"Collection Trip Charge",
          field:this.$store.state.salesExpressContractVan
      .OverviewData?.express_contract[0].bill_settings[0].collection_trip_charge??false
        },
        {
          title:"Special Urgent Charges",
          field:this.$store.state.salesExpressContractVan
      .OverviewData?.express_contract[0].bill_settings[0].special_monitoring??false
        },
      ],
      CostingDetailsData: {
        job: 24,
        no_of_units: 800.0,
        additional_jobs: "Monthly",
      },
      CostingDetailsDataOne: {
        island_charges: "30.00 $",
        sur_charge: 10,
        sms: "30.00 $",
        special_urgent_price: 10,
      },
      CostingDetailsDataTwo: {
        min_charge: "30.00 $",
      },
      CostingDetailsDataThree: {
        charge_per_trip: "6.00 $",
        return_trip: "4.4 $",
        delivery_charges: "4.4 $",
      },
      TripChargesData: ["Weekday 2nd Trip Charge", "Saturday 2nd Trip Charge"],
      SiteOfficeArrayData: [
        {
          title:"Return Trip Chargeable (Per Trip)",
        value:this.$store.state.salesExpressContractVan
      .OverviewData?.quotation_express_cost_center_details[0]?.site_office_charges[0]?.return_trip_chargable??false
        },
        {title: "Collection Chargable",value:this.$store.state.salesExpressContractVan
      .OverviewData?.quotation_express_cost_center_details[0]?.site_office_charges[0]?.collection_chargable??false},
        {title:"Head Off Delivery Charges",value:this.$store.state.salesExpressContractVan
      .OverviewData?.quotation_express_cost_center_details[0]?.site_office_charges[0]?.head_off_delivery_chargable??false},
        {title:"Head Off Return Trip Waived",value:this.$store.state.salesExpressContractVan
      .OverviewData?.quotation_express_cost_center_details[0]?.site_office_charges[0]?.head_off_return_waived??false},
        
      ],
    };
  },
  methods: {
    getHeader(index) {
      let header;
      switch (index) {
        case "job":
          header = "Credit Terms (Days)";
          break;
        case "additional_jobs":
          header = "Credit Limtis";
          break;
        case "no_of_units":
          header = "Billing Cycle";
          break;
      }
      return header;
    },
    getHeaderOne(index) {
      let header;
      switch (index) {
        case "island_charges":
          header = "Island Charges";
          break;
        case "sur_charge":
          header = "Sur Charge $";
          break;
        case "sms":
          header = "SMS $";
          break;
        case "special_urgent_price":
          header = "Special Urgent Price $ ";
          break;
      }
      return header;
    },

    getHeaderTwo(index) {
      let header;
      switch (index) {
        case "min_charge":
          header = "Min Charge per Job ($)";
          break;
      }
      return header;
    },
    getHeaderThree(index) {
      let header='';
      switch (index) {
        case "charge_per_trip":
          header = "Charge Per Trip";
          break;
        case "return_trip_charge":
          header = "Return Trip Charge (By Amount)";
          break;
        case "head_off_delivery_charge":
          header = "Head Off Delivery Charges";
          break;
      }
      return header;
    },
  },
   async created() {
    this.overView=this.$store.state.salesExpressContractVan
      .OverviewData?.quotation_express_cost_center_details[0]??{}
   }
};
</script>

<style scoped>

.van-bill-setting-surcharge {
  width: 100%;
  height: 35px;
  padding-left: 8px;
}
.van-costing-details-detailsText {
  font-size: 12px;
  color: #7e84a7;
  font-weight: 600;
}
.van-costing-details-valuesText {
  color: #66c11e;
}
.trip-display {
  display: none !important;
}
</style>
