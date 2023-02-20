<template>
  <div class="flex flex-wrap justify-content-between">
    <div class="flex">
      <span class="express-contact-bike-fsr-bill-setting-header"
        >Bill Settings</span
      >
    </div>
    <div class="flex"><i class="pi pi-ellipsis-v mt-2"></i></div>
  </div>
  <hr class="express-contact-bike-fsr-bill-setting-horizontal_line" />
  <!--flex row-->
  <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
    <div
      v-for="(item, index) of BillSettingsData"
      :class="index != BillSettingsData.length - 1 ? 'flex mr-6' : 'flex'"
      :key="index"
    >
      <div class="flex flex-column">
        <div class="express-contact-bike-fsr-bill-setting-details-text">
          {{ BillSettingsData[index].surcharge_name }}
        </div>
        <div
          :class="
            item != 'High'
              ? ' express-contact-bike-fsr-bill-setting-details-text express-contact-bike-fsr-bill-setting-values-text'
              : ' express-contact-bike-fsr-bill-setting-details-text express-contact-bike-fsr-bill-setting-priority-text'
          "
        >
          <!-- <span v-if="index == 'job' || index == 'additional_jobs'">
            $ {{ item }}</span
          >
          <span v-else></span>
          {{ item }} -->
          {{ BillSettingsData[index].rates }} $
        </div>
      </div>
    </div>
  </div>

  <!--flex row-->

  <div class="express-contact-bike-fsr-bill-setting-grey-wrapper-small p-2">
    <p class="express-contact-bike-fsr-bill-setting-grey-wrapper-text">
      Trip Charges
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
        <div class="express-contact-bike-fsr-bill-setting-inside-text">
          {{ item }}
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="mt-6">
    <p class="express-contact-bike-fsr-bill-setting-surcharge">
      Site Office</p>
      
      <span class="ml-3 express-contact-bike-fsr-bill-setting-cost-center"
        >Cost Center 1 {{ index +1 }} : {{ item.processedAddress }}</span
      >
    
  </div> -->
  <div class="flex express-contact-bike-fsr-bill-setting-surcharge">
    <p class="express-contact-bike-fsr-bill-setting-surcharge mb-0">
      Site Office
    </p>
    <div
      v-for="(item, index) of CostCenterAddress"
      :class="index != CostCenterAddress.length - 1 ? ' mr-6 ' : ''"
      :key="index"
    >
      <div class="express-contact-bike-fsr-bill-setting-surcharge">
        <span class="ml-3 express-contact-bike-fsr-bill-setting-cost-center">
          Cost Center {{ index + 1 }} : {{ item.processedAddress }}
        </span>
        <!-- <div
                  :class="
                    item != 'High'
                      ? '  express-contract-bike-fsr-costing-details-detailsText express-contract-bike-fsr-costing-details-valuestext'
                      : '   express-contract-bike-fsr-costing-details-detailsText priorityText'
                  "
                >
                  <span v-if="index == 'job' || index == 'additional_job'">
                    &nbsp;:$ {{ item }}</span
                  >
                  <span >&nbsp; {{ item }}</span>
                </div> -->
      </div>
    </div>
  </div>

  <!--flex row-->
  <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
    <div
      v-for="(item, index) of SiteOfficeData"
      :class="index != SiteOfficeData.length - 1 ? 'flex mr-6' : 'flex'"
      :key="index"
    >
      <div class="flex flex-column">
        <div class="express-contact-bike-fsr-bill-setting-details-text">
          {{ getHeader(index) }}
        </div>
        <div
          :class="
            item != 'High'
              ? ' express-contact-bike-fsr-bill-setting-details-text express-contact-bike-fsr-bill-setting-values-text'
              : ' express-contact-bike-fsr-bill-setting-details-text express-contact-bike-fsr-bill-setting-priority-text'
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
      <div class="flex flex-row">
        <img
          src="/images/solution.png"
          alt="img"
          width="15"
          height="15"
          class="m-1"
        />
        <div class="express-contact-bike-fsr-bill-setting-inside-text">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BillSettings",
  props: ["IncomingData"],
  data() {
    return {
      // BillSettingsData: {
      //   credit_limit: "80.00 $",
      //   credit_terms: 15,
      //   billing_cycle: "Weekly",
      // },
      // SpecialChargesData: {
      //   sms: "80.00 $",
      //   special_urgent_price: "80.00 $",
      //   surcharges: "10.00 $",
      //   island_charges: "10.00 $",
      // },
      BillSettingsData: [],
      SpecialChargesData: null,
      TripChargesData: [],
      CostCenterAddress: [],
      SiteOfficeData: {},
      SiteOfficeArrayData: [],
    };
  },

  watch: {
    "$store.state.salesExpressContractVanFSR.expressContractVanFsrOverviewData":
      function () {
        let data =
          this.$store.state.salesExpressContractVanFSR.expressContractVanFsrOverviewData.express_contract.map(
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
        // this.TripChargesData = [
        //   EndData.weekend_2nd_trip_charge == true
        //     ? "Weekday 2nd Trip Charge"
        //     : "",
        //   EndData.saturday_2nd_trip_charge == true
        //     ? "Saturday 2nd Trip Charge"
        //     : "",
        // ];

        for (let list in this.IncomingData?.express_contract[0]
          ?.bill_settings[0]) {
          if (
            this.IncomingData?.express_contract[0]?.bill_settings[0][list] ==
            true
          ) {
            this.TripChargesData.push(list);
          }
        }
        console.log(this.TripChargesData, "hhiii");

        this.SiteOfficeData = {
          charge_per_trip: "-",
          return_trip_charge: EndData.return_trip_charge,
          head_off_delivery_charges: "-",
        };

        this.IncomingData?.express_contract[0]?.bill_settings[0].surcharges.map(
          (list) => {
            this.BillSettingsData.push({
              surcharge_name: list.surcharge_name,
              rates: list.rates,
            });
          }
        );

        // this.BillSettingsData = {
        //   credit_limit: EndData.credit_limit,
        //   credit_terms: EndData.credit_term_days,
        //   billing_cycle: EndData.billing_cycle,
        // };
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
      await this.$store.state.salesExpressContractVanFSR.expressContractVanFsrOverviewData.express_contract.map(
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
    for (let list in this.IncomingData?.express_contract[0]?.bill_settings[0]) {
      if (
        this.IncomingData?.express_contract[0]?.bill_settings[0][list] === true
      ) {
        this.TripChargesData.push(list);
      }
    }
    // this.TripChargesData = [
    //   EndData.weekend_2nd_trip_charge == true ? "Weekday 2nd Trip Charge" : "",
    //   EndData.saturday_2nd_trip_charge == true
    //     ? "Saturday 2nd Trip Charge"
    //     : "",
    // ];

    for (let index in this.IncomingData
      ?.quotation_express_cost_center_details[0]?.site_office_charges) {
      for (let list in this.IncomingData
        ?.quotation_express_cost_center_details[0]?.site_office_charges[
        index
      ]) {
        if (
          this.IncomingData?.quotation_express_cost_center_details[0]
            ?.site_office_charges[index][list] === true
        ) {
          this.SiteOfficeArrayData.push(list);
        }
      }
    }

    // this.SiteOfficeArrayData = [
    //   EndData.weekend_2nd_trip_charge == true
    //     ? "Return Trip Chargeable (Per Trip)"
    //     : "",
    //   EndData.collection_trip_charge == true ? "Collection Chargable" : "",
    //   EndData.special_urgent_charges_selected == true
    //     ? "Head Off Delivery Charges"
    //     : "",
    //   EndData.collection_trip_charge == true
    //     ? "Head Off Return Trip Waived"
    //     : "",
    // ];
    this.IncomingData?.quotation_express_cost_center_details.map((list) => {
      this.CostCenterAddress.push({
        processedAddress:
          list.unit_no +
          ", " +
          list.floor_no +
          ", " +
          list.building_name +
          ", " +
          list.state +
          ", " +
          list.country +
          ", " +
          list.postal_code,
      });
    });
    this.IncomingData?.quotation_express_cost_center_details[0]?.site_office_charges.map(
      (list) => {
        this.SiteOfficeData = {
          charge_per_trip: list.charge_per_trip,
          return_trip_charge: list.return_trip_charge,
          head_off_delivery_charges: list.head_off_delivery_charge,
        };
      }
    );
    // this.SiteOfficeData = {
    //   charge_per_trip: "-",
    //   return_trip_charge: EndData.return_trip_charge,
    //   head_off_delivery_charges: "-",
    // };
    this.IncomingData?.express_contract[0]?.bill_settings[0].surcharges.map(
      (list) => {
        this.BillSettingsData.push({
          surcharge_name: list.surcharge_name,
          rates: list.rates,
        });
      }
    );

    // this.BillSettingsData = {
    //   credit_limit: EndData.credit_limit,
    //   credit_terms: EndData.credit_term_days,
    //   billing_cycle: EndData.billing_cycle,
    // };
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
.express-contact-bike-fsr-bill-setting-grey-wrapper-small {
  background: #eef4ff;
  border: none;
  border-radius: 5px;
  height: 35px;
}
.express-contact-bike-fsr-bill-setting-grey-wrapper-text {
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: #4e5868;
}
.express-contact-bike-fsr-bill-setting-inside-text {
  font-weight: 600;
  font-size: 12px;
  line-height: 28px;
  color: #4e5868;
}
.express-contact-bike-fsr-bill-setting-details-text {
  font-size: 12px;
  color: #7e84a7;
  font-weight: 600;
  display: flex;
  flex-wrap: wrap;
}
.express-contact-bike-fsr-bill-setting-values-text {
  color: #66c11e;
}
.express-contact-bike-fsr-bill-setting-priority-text {
  color: #c11e1e;
}
.express-contact-bike-fsr-bill-setting-header {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.03em;
  color: #343434;
}
.express-contact-bike-fsr-bill-setting-horizontal_line {
  margin: 0px !important;
  margin-top: 1.1% !important;
}
.express-contact-bike-fsr-bill-setting-surcharge {
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: #4e5868;
  height: 35px;
  background-color: #eef4ff;
  display: flex;
  align-items: center;
  padding-left: 8px;
}
.express-contact-bike-fsr-bill-setting-cost-center {
  line-height: 15px;
  color: #7e84a7;
}
</style>
