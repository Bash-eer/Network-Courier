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
    <div @click="toggle" class="flex pointer">
        <i class="pi pi-ellipsis-v mt-2"></i>
    </div>
      <OverlayPanel
      ref="op"
      :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
      style="width: 190px"
      >
        <div class="flex flex-column flex-wrap">
          <div class="flex my-1 menuDivs">
            <div class="flex flex-row cursor-pointer" @click="editDialog">
              <div class="flex align-items-center justify-content-center mr-2">
                <i class="pi pi-pencil"></i>
              </div>
              <div
                class="
                  flex
                  align-items-center
                  justify-content-center
                  hover-blue
                  custom-speed-dial-text
                "
              >
                Edit
              </div>
            </div>
          </div>
        </div>
      </OverlayPanel>
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
              ? 'flex flex-wrap  van-costing-details-detailsText van-costing-details-valuesText color-66c11e'
              : 'flex  flex-wrap  van-costing-details-detailsText van-costing-details-valuesText color-c11e1e '
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
        <div class="flex  van-costing-details-detailsText  flex-wrap">{{ item.surcharge_name }}</div>
        <div
          :class="
            item != 'High'
              ? 'flex flex-wrap  van-costing-details-detailsText van-costing-details-valuesText color-66c11e'
              : 'flex  flex-wrap  van-costing-details-detailsText van-costing-details-valuesText color-c11e1e '
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
          <div class="flex  van-costing-details-detailsText flex-wrap">
            {{ getHeaderThree(index) }}
          </div>
          <div
            :class="
              item != 'High'
                ? 'flex flex-wrap  van-costing-details-detailsText van-costing-details-valuesText color-66c11e'
                : 'flex  flex-wrap  van-costing-details-detailsText van-costing-details-valuesText color-c11e1e '
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
import { mapActions, mapGetters } from "vuex";
import OverlayPanel from "primevue/overlaypanel";
export default {
  name: "BillSettings",
  // props: ["quotationData"],
  components: {
    OverlayPanel,
  },
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
        "salesExpressContractBikeFSR/quotationData",
    }),
  },
  watch: {
    "quotationData":
      function () {
      this.getValues();
    },
  },
  methods: {
    ...mapActions({
      setQuotationDataBikeFSR:
        "salesExpressContractBikeFSR/setQuotationData",
      setCurrentStep: "salesExpressContractBikeFSR/setCurrentStep",
    }),
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    async editDialog() {
      await this.setQuotationDataBikeFSR({
        type: this.$route.params.type,
        id: this.$route.params.id,
      });
      this.setCurrentStep(4);
      this.$store.dispatch("salesSales/openDialog", {
        dialogDetails: {
          dialogName: "ExpressContractBikeFSRQuotationDialog",
          dialogHeader: "Edit",
        },
      });
      this.$store.getters["salesSales/controlActivityDialog"];
    },
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
      // console.log(this.quotationData, "Quotation data")
      this.CostingDetailsData["credit_limit"] =
        this.quotationData?.express_contract[0]?.bill_settings[0]
          ?.credit_limit || "-";
      this.CostingDetailsData["credit_term_days"] =
        this.quotationData?.express_contract[0]?.bill_settings[0]
          ?.credit_term_days || "-";

      this.CostingDetailsDataOne =
        this.quotationData?.express_contract[0]?.bill_settings[0]?.surcharges;

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
.van-costing-details-detailsText {
  font-size: 12px;
  color: #7e84a7;
  font-weight: 600;
}
.van-costing-details-valuesText {
  color: #66c11e;
}
::v-deep .pi-ellipsis-v {
  color: black !important; 
}
::v-deep .p-overlaypanel-flipped:after {
  bottom: 0px !important;
  top: 0px !important;
}
</style>
