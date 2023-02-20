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
      v-for="(item, index) of CostingDetailsData"
      :class="index != CostingDetailsData.length - 1 ? 'flex mr-6' : 'flex'"
      :key="index"
    >
      <div class="flex flex-column">
        <div class="flex detailsText flex-wrap">{{ getHeader(index) }}</div>
        <div
          :class="
            item != 'High'
              ? 'flex flex-wrap detailsText color-66c11e'
              : 'flex  flex-wrap detailsText color-c11e1e '
          "
        >
          <span v-if="index == 'no_of_units'"> {{ item }} $</span>
          <span v-else>{{ item }}</span>
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

  <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
    <div
      v-for="(item, index) of CostingDetailsDataOne"
      :class="index != CostingDetailsDataOne.length - 1 ? 'flex mr-6' : 'flex'"
      :key="index"
    >
      <div class="flex flex-column">
        <div class="flex detailsText flex-wrap">{{ item.surcharge_name }}</div>
        <div
          :class="
            item != 'High'
              ? 'flex flex-wrap detailsText color-66c11e'
              : 'flex  flex-wrap detailsText color-c11e1e '
          "
        >
          <span> $ {{ item.rates }}</span>
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
    <div v-if="TripChargesData.length == 0">-</div>
  </div>
  <!-- <div
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
  </div> -->
  <!-- <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
    <div
      v-for="(item, index) of CostingDetailsDataTwo"
      :class="index != CostingDetailsDataTwo.length - 1 ? 'flex mr-6' : 'flex'"
      :key="index"
    >
      <div class="flex flex-column">
        <div class="flex detailsText flex-wrap required">
          {{ getHeaderTwo(index) }}
        </div>
        <div :class="'flex flex-wrap detailsText color-66c11e'">
          {{ item }}
        </div>
      </div>
    </div>
  </div> -->
  <div v-for="(siteOfficeData, idx) of siteOffice" :key="siteOfficeData">
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
        <span class="ml-3 line-height-15 color-7e84a7"
          >Cost Center {{ idx }}: {{ siteOfficeAdd[idx] }}</span
        >
      </p>
    </div>

    <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
      <div
        v-for="(item, index) of CostingDetailsDataThree[idx]"
        :class="
          index != CostingDetailsDataThree.length - 1 ? 'flex mr-6' : 'flex'
        "
        :key="index"
      >
        <div class="flex flex-column">
          <div class="flex detailsText flex-wrap">
            {{ getHeaderThree(index) }}
          </div>
          <div
            :class="
              item != 'High'
                ? 'flex flex-wrap detailsText color-66c11e'
                : 'flex  flex-wrap detailsText color-c11e1e '
            "
          >
            <span v-if="index == 'additional_jobs'"> $ {{ item }}</span>
            <span v-else></span>
            {{ item }}
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-row flex-wrap mt-3 mb-4">
      <div
        v-for="item in SiteOfficeArrayData[idx]"
        :class="index != SiteOfficeArrayData.length - 1 ? 'flex mr-6' : 'flex'"
        :key="item"
      >
        <div class="flex align-items-center flex-row">
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
            {{ humanize(item) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      siteOffice: ["siteOffice"],
      siteOfficeAdd: [],
      CostingDetailsData: {
        credit_limit: "",
        credit_term_days: "",
      },
      CostingDetailsDataOne: [],
      CostingDetailsDataTwo: {
        min_charge: "30.00 $",
      },
      CostingDetailsDataThree: {
        charge_per_trip: "6.00 $",
        return_trip: "4.4 $",
        delivery_charges: "4.4 $",
      },
      TripChargesData: [],
      SiteOfficeArrayData: [
        "Return Trip Chargeable (Per Trip)",
        "Collection Chargable",
        "Head Off Delivery Charges",
        "Head Off Return Trip Waived",
      ],
    };
  },
  computed: {
    ...mapGetters({
      quotationData:
        "salesExpressContractBikeProjectJobs/quotationDataOverview",
    }),
  },
  watch: {
    quotationData() {
      this.getValues();
    },
  },
  methods: {
    humanize(str) {
      var i,
        frags = str.split("_");
      for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
      }
      return frags.join(" ");
    },
    getHeader(index) {
      let header;
      switch (index) {
        case "credit_limit":
          header = "Credit Limtis";
          break;
        case "credit_term_days":
          header = "Credit Terms (Days)";
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
      let header;
      switch (index) {
        case "charge_per_trip":
          header = "Charge Per Trip";
          break;
        case "return_trip":
          header = "Return Trip Charge (By Amount)";
          break;
        case "delivery_charges":
          header = "Head Off Delivery Charges";
          break;
      }
      return header;
    },
    getValues() {
      this.CostingDetailsData["credit_limit"] =
        this.quotationData?.express_contract[0]?.bill_settings[0]
          ?.credit_limit || "-";
      this.CostingDetailsData["credit_term_days"] =
        this.quotationData?.express_contract[0]?.bill_settings[0]
          ?.credit_term_days || "-";

      this.CostingDetailsDataOne =
        this.quotationData?.express_contract[0]?.bill_settings[0]?.surcharges;

      //  this.quotationData?.express_contract[0]?.bill_settings[0]?.map(list => {

      //  })

      this.quotationData?.express_contract[0]?.bill_settings[0] &&
        Object.keys(
          this.quotationData?.express_contract[0]?.bill_settings[0]
        ).map((keyList) => {
          if (
            this.quotationData?.express_contract[0]?.bill_settings[0][
              keyList
            ] == true
          ) {
            this.TripChargesData.push(keyList);
          }
        });

      this.CostingDetailsDataThree = [];
      this.SiteOfficeArrayData = [];
      this.siteOffice = [];
      this.siteOfficeAdd = [];

      this.quotationData?.quotation_express_cost_center_details?.map((list) => {
        let add = "";

        if (list?.unit_no) {
          add += " " + list?.unit_no;
        }
        if (list?.floor_no) {
          add += ", " + list?.floor_no;
        }
        if (list?.building_name) {
          add += ", " + list?.building_name;
        }
        if (list?.country) {
          add += ", " + list?.country;
        }
        if (list?.state) {
          add += ", " + list?.state;
        }
        if (list?.postal_code) {
          add += ", " + list?.postal_code;
        }
        this.siteOfficeAdd.push(add);
      });

      if (this.quotationData?.quotation_express_cost_center_details) {
        this.quotationData?.quotation_express_cost_center_details[0]?.site_office_charges?.map(
          (list, idx) => {
            this.siteOffice.push("siteOffice");

            this.CostingDetailsDataThree.push({
              charge_per_trip: list.charge_per_trip,
              return_trip: list.return_trip_charge,
              delivery_charges: list.head_off_delivery_charge,
            });

            this.SiteOfficeArrayData[idx] = [];

            Object.keys(list).map((keyList) => {
              if (list[keyList]) {
                this.SiteOfficeArrayData[idx].push(keyList);
              }
            });
          }
        );
      }
    },
  },
  created() {
    this.getValues();
  },
};
</script>

<style scoped>
.van-bill-setting-surcharge {
  width: 100%;
  height: 35px;
  padding-left: 8px;
}
</style>
