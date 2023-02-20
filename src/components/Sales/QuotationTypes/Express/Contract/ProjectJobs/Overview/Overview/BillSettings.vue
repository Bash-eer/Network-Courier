<template>
  <div class="flex flex-wrap justify-content-between">
    <div class="flex">
      <span
        class="
          font-size-16
          line-height-20
          color-343434
          letter-spacing-003
          express-international-font
        "
        >Bill Settings</span
      >
    </div>
    <div class="flex"><i class="pi pi-ellipsis-v mt-2"></i></div>
  </div>
  <hr class="express-project-jobs-billing-settings-horizontal-line" />

  <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
    <div
      v-for="(item, index) of BillSettingsData"
      :class="index != BillSettingsData.length - 1 ? 'flex mr-6' : 'flex'"
      :key="index"
    >
      <div class="flex flex-column">
        <div
          class="
            flex
            color-7e84a7
            font-size-12
            flex-wrap
            express-international-font
          "
        >
          {{ getHeaderOne(index) }}
        </div>
        <div
          :class="
            item != 'High'
              ? ' flex  font-size-12 flex-wrap express-international-font color-66c11e'
              : ' flex  font-size-12 flex-wrap express-international-font color-c11e1e'
          "
        >
          <span v-if="index == 'job' || index == 'additional_jobs'">
            $ {{ item }}</span
          >
          <span v-else>{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
  <div
    class="
      express-project-jobs-billing-settings-grey-wrapper-small
      bg-eef4ff
      border-radius-5
      p-2
    "
  >
    <p
      class="
        font-size-12
        line-height-20
        color-4e5868
        express-international-font
      "
    >
      Bike Customer Van Job
    </p>
  </div>

  <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
    <div
      v-for="(item, index) of SpecialChargesData"
      :class="index != SpecialChargesData.length - 1 ? 'flex mr-6' : 'flex'"
      :key="index"
    >
      <div class="flex flex-column">
        <div
          class="
            flex
            color-7e84a7
            font-size-12
            flex-wrap
            express-international-font
          "
        >
          {{ getHeaderTwo(index) }}
        </div>
        <div
          :class="
            item != 'High'
              ? ' flex  font-size-12 flex-wrap express-international-font color-66c11e'
              : ' flex  font-size-12 flex-wrap express-international-font color-c11e1e'
          "
        >
          <span v-if="index == 'job' || index == 'additional_jobs'">
            $ {{ item }}</span
          >
          <span v-else> {{ item }}</span>
        </div>
      </div>
    </div>
  </div>

  <div
    class="
      express-project-jobs-billing-settings-grey-wrapper-small
      bg-eef4ff
      border-radius-5
      p-2
    "
  >
    <p
      class="
        font-size-12
        line-height-20
        color-4e5868
        express-international-font
      "
    >
      Van Qty Chargable
    </p>
  </div>

  <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
    <div
      v-for="(item, index) of BikeCustomerVanJobData"
      :class="index != BikeCustomerVanJobData.length - 1 ? 'flex mr-6' : 'flex'"
      :key="index"
    >
      <div class="flex flex-column">
        <div
          class="
            flex
            color-7e84a7
            font-size-12
            flex-wrap
            express-international-font
          "
        >
          {{ getHeaderThree(index) }}
        </div>
        <div
          :class="
            item != 'High'
              ? ' flex  font-size-12 flex-wrap express-international-font color-66c11e'
              : 'flex  font-size-12 flex-wrap express-international-font color-c11e1e'
          "
        >
          <span v-if="index == 'job' || index == 'additional_jobs'">
            $ {{ item }}</span
          >
          <span v-else>{{ item }}</span>
        </div>
      </div>
    </div>
  </div>

  <div
    class="
      express-project-jobs-billing-settings-grey-wrapper-small
      bg-eef4ff
      border-radius-5
      p-2
    "
  >
    <p
      class="
        font-size-12
        line-height-20
        color-4e5868
        express-international-font
      "
    >
      Trip Charges
    </p>
  </div>

  <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
    <div
      v-for="item in TripChargesData"
      :class="index != TripChargesData.length - 1 ? 'flex mr-6' : 'flex'"
      :key="item"
    >
      <div class="flex flex-row">
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
          {{ item }}
        </div>
      </div>
    </div>
  </div>

  <div class="mt-6">
    <p
      class="
        font-size-12
        line-height-20
        color-4e5868
        flex
        align-items-center
        bg-eef4ff
        express-international-font
      "
    >
      Site Office
      <span class="ml-3 line-height-15 color-7e84a7"
        >Cost Center 1 : Unit 4, 133 floor, Singapore...</span
      >
    </p>
  </div>

  <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
    <div
      v-for="(item, index) of SiteOfficeData"
      :class="index != SiteOfficeData.length - 1 ? 'flex mr-6' : 'flex'"
      :key="index"
    >
      <div class="flex flex-column">
        <div
          class="
            flex
            color-7e84a7
            font-size-12
            flex-wrap
            express-international-font
          "
        >
          {{ getHeader(index) }}
        </div>
        <div
          :class="
            item != 'High'
              ? ' flex  font-size-12 flex-wrap express-international-font color-66c11e'
              : ' flex  font-size-12 flex-wrap express-international-font color-c11e1e'
          "
        >
          <span v-if="index == 'job' || index == 'additional_jobs'">
            $ {{ item }}</span
          >
          <span v-else>{{ item }}</span>
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
      <div class="flex flex-row">
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
      BillSettingsData: {
        credit_limit: "80.00 $",
        credit_terms: "80.00 $",
        billing_cycle: "10.00 $",
        island: "0.00 $",
      },
      SpecialChargesData: {
        van_job: "80.00 $",
        kgs: "8",
        van_job_add: "10.00 $",
        kgs_two: "10",
        van_job_urgent: "10.00 $",
      },
      TripChargesData: ["Weekday 2nd Trip Charge", "Saturday 2nd Trip Charge"],
      BikeCustomerVanJobData: {
        van_quantity: "30.00 $",
        van_add_quantity: 10,
        van_add_charges: "30.00 $",
      },
      SiteOfficeData: {
        charge_per_trip: "6.00 $",
        return_trip_charge: "4.4 $",
        head_off_delivery_charges: "4.4 $",
      },
      SiteOfficeArrayData: [
        "Return Trip Chargeable (Per Trip)",
        "Collection Chargable",
        "Head Off Delivery Charges",
        "Head Off Return Trip Waived",
      ],
    };
  },
  methods: {
    getHeaderOne(index) {
      let header;
      switch (index) {
        case "credit_limit":
          header = "SMS $";
          break;
        case "credit_terms":
          header = "Special Urgent Price $ ";
          break;
        case "billing_cycle":
          header = "Sur Charge $";
          break;
        case "island":
          header = "Island Charge $";
          break;
      }
      return header;
    },

    getHeaderTwo(index) {
      let header;
      switch (index) {
        case "van_job":
          header = "Van Job Min. Cost  $";
          break;
        case "kgs":
          header = "Kgs ";
          break;
        case "van_job_add":
          header = "Van Job Add. Cost  $";
          break;
        case "kgs_two":
          header = "Kgs";
          break;
        case "van_job_urgent":
          header = "Van Job  Urgent. Surcharge $";
          break;
      }
      return header;
    },

    getHeaderThree(index) {
      let header;
      switch (index) {
        case "van_quantity":
          header = "Van Quantity/Destination (Min)";
          break;
        case "van_add_quantity":
          header = "Van Add Quantity/Destination ";
          break;
        case "van_add_charges":
          header = "Van Add Charges/Quantity";
          break;
      }
      return header;
    },

    getHeader(index) {
      let header;
      switch (index) {
        case "credit_limit":
          header = "SMS $";
          break;
        case "credit_terms":
          header = "Special Urgent Price $ ";
          break;
        case "billing_cycle":
          header = "Sur Charge $";
          break;
        case "sms":
          header = "Island Charge $";
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
.express-project-jobs-billing-settings-grey-wrapper-small {
  border: none;
  height: 35px;
}
.express-project-jobs-billing-settings-horizontal-line {
  margin: 0px !important;
  margin-top: 1.1% !important;
}
.express-project-jobs-billing-settings-surcharge {
  height: 35px;
  padding-left: 8px;
}
</style>
