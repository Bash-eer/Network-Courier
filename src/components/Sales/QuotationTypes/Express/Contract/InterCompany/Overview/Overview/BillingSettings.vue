<template>
  <div class="flex flex-wrap justify-content-between">
    <div class="flex">
      <span
        class="
          express-inter-company-billing-settings-header
          express-international-font
        "
        >Bill Settings</span
      >
    </div>
    <div class="flex"><i class="pi pi-ellipsis-v mt-2"></i></div>
  </div>
  <hr class="express-inter-company-billing-settings-horizontal-line" />
  <!--flex row-->
  <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
    <div
      v-for="(item, index) of BillSettingsData"
      :class="index != BillSettingsData.length - 1 ? 'flex mr-6' : 'flex'"
      :key="index"
    >
      <div class="flex flex-column">
        <div
          class="
            express-inter-company-billing-settings-details-text
            express-international-font
          "
        >
          {{ getHeader(index) }}
        </div>
        <div
          :class="
            item != 'High'
              ? ' express-inter-company-billing-settings-details-text express-international-font express-inter-company-billing-settings-values-text'
              : ' express-inter-company-billing-settings-details-text express-international-font express-inter-company-billing-settings-priority-text'
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
  <div class="express-inter-company-billing-settings-grey-wrapper-small p-2">
    <p
      class="
        express-inter-company-billing-settings-grey-wrapper-text
        express-international-font
      "
    >
      Van Job
    </p>
  </div>
  <!--flex row-->
  <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
    <div
      v-for="(item, index) of SpecialChargesData"
      :class="index != SpecialChargesData.length - 1 ? 'flex mr-6' : 'flex'"
      :key="index"
    >
      <div class="flex flex-column">
        <div
          class="
            express-inter-company-billing-settings-details-text
            express-international-font
          "
        >
          {{ getHeader(index) }}
        </div>
        <div
          :class="
            item != 'High'
              ? ' express-inter-company-billing-settings-details-text express-international-font express-inter-company-billing-settings-values-text'
              : ' express-inter-company-billing-settings-details-text express-international-font express-inter-company-billing-settings-priority-text'
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
  <div class="express-inter-company-billing-settings-grey-wrapper-small p-2">
    <p
      class="
        express-inter-company-billing-settings-grey-wrapper-text
        express-international-font
      "
    >
      Van Customer Bike Job
    </p>
  </div>
  <!--flex row-->
  <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
    <div
      v-for="item in TripChargesData"
      :class="index != TripChargesData.length - 1 ? 'flex mr-6' : 'flex'"
      :key="item"
    >
      <div v-if="item" class="flex flex-row">
        <img
          src="/images/solution.png"
          alt="img"
          width="15"
          height="15"
          class="m-1"
        />
        <div
          class="
            express-inter-company-billing-settings-inside-text
            express-international-font
          "
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
  <div class="express-inter-company-billing-settings-grey-wrapper-small p-2">
    <p
      class="
        express-inter-company-billing-settings-grey-wrapper-text
        express-international-font
      "
    >
      Trip Charges
    </p>
  </div>
  <!--flex row-->
  <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
    <div
      v-for="(item, index) of BikeCustomerVanJobData"
      :class="index != BikeCustomerVanJobData.length - 1 ? 'flex mr-6' : 'flex'"
      :key="index"
    >
      <div class="flex flex-column">
        <div
          class="
            express-inter-company-billing-settings-details-text
            express-international-font
          "
        >
          {{ getHeader(index) }}
        </div>
        <div
          :class="
            item != 'High'
              ? ' express-inter-company-billing-settings-details-text express-international-font express-inter-company-billing-settings-values-text'
              : 'express-inter-company-billing-settings-details-text express-international-font express-inter-company-billing-settings-priority-text'
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
  <div class="mt-6">
    <p
      class="
        express-inter-company-billing-settings-surcharge
        express-international-font
      "
    >
      Site Office
      <span class="ml-3 express-inter-change-cost-center"
        >Cost Center 1 : Unit 4, 133 floor, Singapore...</span
      >
    </p>
  </div>

  <!--flex row-->
  <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
    <div
      v-for="(item, index) of SiteOfficeData"
      :class="index != SiteOfficeData.length - 1 ? 'flex mr-6' : 'flex'"
      :key="index"
    >
      <div class="flex flex-column">
        <div
          class="
            express-inter-company-billing-settings-details-text
            express-international-font
          "
        >
          {{ getHeader(index) }}
        </div>
        <div
          :class="
            item != 'High'
              ? ' express-inter-company-billing-settings-details-text express-international-font express-inter-company-billing-settings-values-text'
              : ' express-inter-company-billing-settings-details-text express-international-font express-inter-company-billing-settings-priority-text'
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
  <div class="flex flex-row flex-wrap mt-3 mb-4">
    <div
      v-for="item in SiteOfficeArrayData"
      :class="index != SiteOfficeArrayData.length - 1 ? 'flex mr-6' : 'flex'"
      :key="item"
    >
      <div v-if="item" class="flex flex-row">
        <img
          src="/images/solution.png"
          alt="img"
          width="15"
          height="15"
          class="m-1"
        />
        <div
          class="
            express-inter-company-billing-settings-inside-text
            express-international-font
          "
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BillSettings",
  data() {
    return {
      BillSettingsData: null,
      SpecialChargesData: null,

      TripChargesData: null,
      BikeCustomerVanJobData: null,
      // {
      //   van_job_min_cost: "30.00 $",
      //   van_job_min_cost_kg: 10,
      //   van_job_add_cost: "30.00 $",
      //   van_job_add_cost_kg: 10,
      //   van_job_urgent_surcharge: "30.00 $",
      // }
      SiteOfficeData: null,
      // {
      //   charge_per_trip: "6.00 $",
      //   return_trip_charge: "4.4 $",
      //   head_off_delivery_charges: "4.4 $",
      // }
      SiteOfficeArrayData: null,
      // [
      //   "Return Trip Chargeable (Per Trip)",
      //   "Collection Chargable",
      //   "Head Off Delivery Charges",
      //   "Head Off Return Trip Waived",
      // ]
    };
  },
  watch: {
    "$store.state.salesExpressContractInterCompany.ExpressInterCompanyOverviewData":
      function () {
        let data =
          this.$store.state.salesExpressContractInterCompany.ExpressInterCompanyOverviewData.express_contract.map(
            (i) => {
              return i.bill_settings;
            }
          );

        let value = data.reduce((obj, item) =>
          Object.assign(obj, { [item.key]: item.value })
        );

        let EndData = value.reduce((obj, item) =>
          Object.assign(obj, { [item.key]: item.value })
        );

        console.log("EndData", EndData);

        //  let Surcharge = EndData.surcharges.reduce((obj, item) =>
        //   Object.assign(obj, { [item.key]: item.value })
        // );

        this.SiteOfficeArrayData = [
          EndData.weekend_2nd_trip_charge == true
            ? "Return Trip Chargeable (Per Trip)"
            : "",
          EndData.collection_trip_charge == true ? "Collection Chargable" : "",
          EndData.special_urgent_charges_selected == true
            ? "Head Off Delivery Charges"
            : "",
          EndData.collection_trip_charge == true
            ? "Head Off Return Trip Waived"
            : "",
        ];

        this.BikeCustomerVanJobData = {
          van_job_min_cost: EndData.van_job_min_cost,
          van_job_min_cost_kg: EndData.van_job_min_cost_kg,
          van_job_add_cost: EndData.van_job_add_cost,
          van_job_add_cost_kg: EndData.van_job_add_cost_kg,
          van_job_urgent_surcharge: EndData.van_job_urgent_surcharges,
        };

        this.TripChargesData = [
          EndData.weekend_2nd_trip_charge == true
            ? "Weekday 2nd Trip Charge"
            : "",
          EndData.saturday_2nd_trip_charge == true
            ? "Saturday 2nd Trip Charge"
            : "",
        ];

        this.SiteOfficeData = {
          charge_per_trip: "-",
          return_trip_charge: EndData.return_trip_charge,
          head_off_delivery_charges: "-",
        };

        this.BillSettingsData = {
          credit_limit: EndData.credit_limit,
          credit_terms: EndData.credit_term_days,
          billing_cycle: EndData.billing_cycle,
        };
        this.SpecialChargesData = {
          sms: EndData.special_urgent_charges,
          special_urgent_price: EndData.special_monitoring,
          surcharges: EndData.billing_cycle,
          island_charges: EndData.special_urgent_charges_selected,
        };
      },
  },

  async created() {
    let data =
      await this.$store.state.salesExpressContractInterCompany.ExpressInterCompanyOverviewData.express_contract.map(
        (i) => {
          return i.bill_settings;
        }
      );

    let value = data.reduce((obj, item) =>
      Object.assign(obj, { [item.key]: item.value })
    );

    let EndData = value.reduce((obj, item) =>
      Object.assign(obj, { [item.key]: item.value })
    );

    this.TripChargesData = [
      EndData.weekend_2nd_trip_charge == true ? "Weekday 2nd Trip Charge" : "",
      EndData.saturday_2nd_trip_charge == true
        ? "Saturday 2nd Trip Charge"
        : "",
    ];

    this.SiteOfficeArrayData = [
      EndData.weekend_2nd_trip_charge == true
        ? "Return Trip Chargeable (Per Trip)"
        : "",
      EndData.collection_trip_charge == true ? "Collection Chargable" : "",
      EndData.special_urgent_charges_selected == true
        ? "Head Off Delivery Charges"
        : "",
      EndData.collection_trip_charge == true
        ? "Head Off Return Trip Waived"
        : "",
    ];

    this.BikeCustomerVanJobData = {
      van_job_min_cost: EndData.van_job_min_cost,
      van_job_min_cost_kg: EndData.van_job_min_cost_kg,
      van_job_add_cost: EndData.van_job_add_cost,
      van_job_add_cost_kg: EndData.van_job_add_cost_kg,
      van_job_urgent_surcharge: EndData.van_job_urgent_surcharges,
    };

    this.SiteOfficeData = {
      charge_per_trip: "-",
      return_trip_charge: EndData.return_trip_charge,
      head_off_delivery_charges: "-",
    };

    this.BillSettingsData = {
      credit_limit: EndData.credit_limit,
      credit_terms: EndData.credit_term_days,
      billing_cycle: EndData.billing_cycle,
    };
    this.SpecialChargesData = {
      sms: EndData.special_urgent_charges,
      special_urgent_price: EndData.special_monitoring,
      surcharges: EndData.billing_cycle,
      island_charges: EndData.special_urgent_charges_selected,
    };
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
        case "return_trip_charge":
          header = "Return Trip Charge (By Amount)";
          break;
        case "head_off_delivery_charges":
          header = "Head Off Delivery Charges";
          break;
      }
      return header;
    },
  },
};
</script>

<style scoped>
.express-inter-company-billing-settings-grey-wrapper-small {
  background: #eef4ff;
  border: none;
  border-radius: 5px;
  height: 35px;
}
.express-inter-company-billing-settings-grey-wrapper-text {
  font-size: 12px;
  line-height: 20px;
  color: #4e5868;
}
.express-inter-company-billing-settings-inside-text {
  font-weight: 600;
  font-size: 12px;
  line-height: 28px;

  color: #4e5868;
}
.express-inter-company-billing-settings-details-text {
  font-size: 12px;
  color: #7e84a7;

  display: flex;
  flex-wrap: wrap;
}
.express-inter-company-billing-settings-values-text {
  color: #66c11e;
}
.express-inter-company-billing-settings-priority-text {
  color: #c11e1e;
}
.express-inter-company-billing-settings-header {
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.03em;
  color: #343434;
}
.express-inter-company-billing-settings-horizontal-line {
  margin: 0px !important;
  margin-top: 1.1% !important;
}
.express-inter-company-billing-settings-surcharge {
  font-size: 12px;
  line-height: 20px;
  color: #4e5868;
  height: 35px;
  background-color: #eef4ff;
  display: flex;
  align-items: center;
  padding-left: 8px;
}
.express-inter-change-cost-center {
  line-height: 15px;
  color: #7e84a7;
}
</style>
