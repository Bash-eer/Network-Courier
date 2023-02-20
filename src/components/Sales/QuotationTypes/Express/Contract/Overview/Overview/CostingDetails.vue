<template :key="renderkey">
  <div class="flex flex-wrap justify-content-between">
    <div class="flex">
      <span class="van-costing-details-header">Costing Details</span>
    </div>

    <div class="flex"><i class="pi pi-ellipsis-v mt-2"></i></div>
  </div>
  <hr class="van-costing-details-horizontal-line" />

  <div v-if="this.overview_data?.express_contract[0]?.bike == true">
    <p class="mt-1 van">Bike</p>

    <span class="normal">
      {{
        this.overview_data?.express_contract[0]?.bike_rates?.charge_type
      }}</span
    >
    <span
      v-if="
        this.overview_data?.express_contract[0]?.bike_rates?.charge_type.includes(
          'normal'
        )
      "
    >
      <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
        <div
          v-for="(item, index) of CostingDetailsOne"
          :class="index != CostingDetailsOne.length - 1 ? 'flex mr-6' : 'flex'"
          :key="index"
        >
          <div class="flex flex-column">
            <div class="flex van-costing-details-detailsText flex-wrap">
              {{ getHeaderOne(index) }}
            </div>
            <div
              :class="
                item != 'High'
                  ? 'flex flex-wrap van-costing-details-detailsText van-costing-details-valuesText'
                  : 'flex  flex-wrap van-costing-details-detailsText van-costing-details-priorityText'
              "
            >
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </span>

    <span
      v-if="
        this.overview_data?.express_contract[0]?.bike_rates?.charge_type.includes(
          'e_commerce'
        )
      "
      class="mb-1"
    >
      <DuoSelection
        v-model="selectType_in"
        :options="costing_in_option"
        :default="selectType_in"
        :key="renderkey"
      />

      <div class="mb-2" :key="renderkey">
        <div class="">
          <div
            v-for="(i, index) of this.overview_data?.express_contract[0]
              .bike_rates.e_commerce_charges"
            :key="index"
          >
            <div
              v-if="i.delivery_type === selectType_in"
              :key="renderkey"
              class="flex"
            >
              <div v-for="(item, index1) of i" :key="index1">
                <div v-if="getHeader(index1) !== ''">
                  <div class="mt-2">
                    <span class="van-costing-details-detailsText ml-2"
                      >{{ getHeader(index1) }}
                    </span>
                    <span
                      class="'flex van-costing-details-valuesText font-size-12'"
                    >
                      : {{ item }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </span>
    <div class="tier border-2 p-3 mb-2">
      <span class="van-fsr mb-3">First Month ( {{ first_month }} ) </span>
      <!-- Normal -->
      <div v-if="details?.charge_type == 'normal'" class="mb-2">
        <div :key="renderkey" class="flex">
          <div
            v-for="(item, index1) of details?.first_month_rates[0]"
            :key="index1"
          >
            <div v-if="getHeaderEcommerce1(index1) !== ''">
              <div class="mt-2">
                <span class="van-costing-details-detailsText ml-2"
                  >{{ getHeaderEcommerce1(index1) }}
                </span>
                <span
                  class="'flex van-costing-details-valuesText font-size-12'"
                >
                  : {{ item }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ecommerce -->

      <div v-else class="mb-2">
        <div class="">
          <div
            v-for="(i, index) of this.overview_data?.express_contract[0]
              ?.bike_rates?.first_month_rates"
            :key="index"
          >
            <div
              v-if="i.delivery_type === selectType_in"
              :key="renderkey"
              class="flex"
            >
              <div v-for="(item, index1) of i" :key="index1">
                <div v-if="getHeaderEcommerce1(index1) !== ''">
                  <div class="mt-2">
                    <span class="van-costing-details-detailsText ml-2"
                      >{{ getHeaderEcommerce1(index1) }}
                    </span>
                    <span
                      class="'flex van-costing-details-valuesText font-size-12'"
                    >
                      : {{ item }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tier border-2 p-3 mb-2">
      <span class="van-fsr">Bike Customer Van Job ( Charge by Weight )</span>

      <div class="flex flex-row flex-wrap mt-1">
        <div
          v-for="(item, index) of CostingDetailsThree"
          :class="
            index != CostingDetailsThree.length - 1 ? 'flex mr-6' : 'flex'
          "
          :key="index"
        >
          <div class="flex flex-column">
            <div class="flex van-costing-details-detailsText flex-wrap">
              {{ getHeaderThree(index) }}
            </div>
            <div
              :class="
                item != 'High'
                  ? 'flex flex-wrap van-costing-details-detailsText van-costing-details-valuesText'
                  : 'flex  flex-wrap van-costing-details-detailsText van-costing-details-priorityText'
              "
            >
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <CostingDetailsVan :key="renderkey" />

  <CostingDetailsFsr :key="renderkey" />
</template>

<script>
import { mapGetters } from "vuex";
import CostingDetailsVan from "./CostingDetailsVan.vue";
import CostingDetailsFsr from "./CostingDetailsFsr.vue";
import DuoSelection from "../DuoSelect.vue";
const _ = require("lodash");
export default {
  name: "CostingDetails",

  components: {
    CostingDetailsVan,
    CostingDetailsFsr,
    DuoSelection,
  },

  computed: {
    ...mapGetters({
      overview_data: "salesExpressContract/OverviewData",
    }),
  },

  data() {
    return {
      renderkey: 1,
      selectType_in: "",
      selectType: "",
      costing_in_option_in: [],
      costing_in_option: [],
      CostingDetailsOne: null,
      CostingDetailsTwo: null,
      CostingDetailsThree: null,
      CostingDetailsFour: null,
      CostingDetailsUpload: null,
      details: {},
      first_month: "",
      CostingDetailsFive: {
        additional_jobs: 20,
        time_slot_delivery_charge: 5,
        standard_liability: 100,
      },
      CostingDetailsDataOne: {
        effective_start_date: "21 July 2022",
        charge_min: 8,
        amount: 80,
      },

      products: [
        {
          service_provider: "Before",
          Transit_Days: "1st",
          Delivery_Charges: "11:00 AM",
          Fuel_Charges: "Weekdays",
          Over_weight_Charges: "Open",
        },
        {
          service_provider: "Before",
          Transit_Days: "2nd",
          Delivery_Charges: "11:00 AM",
          Fuel_Charges: "Weekdays",
          Over_weight_Charges: "Open",
        },
      ],
    };
  },

  created() {
    this.details = this.overview_data?.express_contract[0]?.bike_rates;
    this.first_month = this.details?.charge_usage_only
      ? "Charge Usage Only"
      : this.details?.charge_minimum
      ? "Charge Minimum"
      : "";
    this.CostingDetailsOne = {
      no_of_units:
        this.overview_data?.express_contract[0]?.bike_rates?.normal_charges[0]
          ?.no_of_units,
      per_job:
        this.overview_data?.express_contract[0]?.bike_rates?.normal_charges[0]
          ?.per_job,
      amount:
        this.overview_data?.express_contract[0]?.bike_rates?.normal_charges[0]
          ?.amount,
      additional_jobs:
        this.overview_data?.express_contract[0]?.bike_rates?.normal_charges[0]
          ?.additional_job,
    };
    this.CostingDetailsTwo = {
      minimum_quantity:
        this.overview_data?.express_contract[0]?.bike_rates
          ?.first_month_rates[0]?.minimum_quantity,
      amount:
        this.overview_data?.express_contract[0]?.bike_rates
          ?.first_month_rates[0]?.amount,
    };
    this.CostingDetailsThree = {
      van_job_min:this.overview_data?.express_contract[0].bike_rates?.van_job_min_cost,
      kg1: this.overview_data?.express_contract[0].bike_rates?.van_job_min_cost_kg,
      van_job_add: this.overview_data?.express_contract[0].bike_rates?.van_job_add_cost,
      kg2: this.overview_data?.express_contract[0]?.bike_rates?.van_job_add_cost_kg,
      van_job_urgent: this.overview_data?.express_contract[0].bike_rates?.van_job_urgent_surcharges,
    };
    this.costing_in_option =
      this.overview_data?.express_contract[0].bike_rates?.e_commerce_charges?.map(
        (i) => i.delivery_type
      );
    if (this?.costing_in_option?.length) {
      this.selectType_in = this?.costing_in_option[0];
    }

    this.costing_in_option_in =
      this.overview_data?.express_contract[0].bike_rates?.first_month_rates?.map(
        (i) => i.delivery_type
      );
    if (this?.costing_in_option_in?.length) {
      this.selectType = this?.costing_in_option_in[0];
    }

    this.renderkey++;
  },

  methods: {
    getHeader(index) {
      let header = "";
      switch (index) {
        case "no_of_units":
          header = "No of  Units";
          break;
        case "per_job":
          header = "Job Rate";
          break;
        case "amount":
          header = "Amount";
          break;
        case "additional_job":
          header = "Additional Job";
          break;
        case "timeslot_delivery":
          header = "Timeslot Delivery (2 hours)";
          break;
      }
      return header;
    },
    getHeaderEcommerce1(index) {
      let header = "";
      switch (index) {
        case "minimum_quantity":
          header = "Minimum Quantity";
          break;

        case "amount":
          header = "Amount";
          break;
      }
      return header;
    },
    getHeaderAbc(index) {
      let header;
      switch (index) {
        case "effective_start_date":
          header = "Effective Start Date (Tentative)";
          break;
        case "charge_min":
          header = "Charge Min( Min Qty)";
          break;
        case "amount":
          header = "Amount";
          break;
      }
      return header;
    },
    getHeaderOne(index) {
      let header;
      switch (index) {
        case "per_job":
          header = "Per Job ";
          break;
        case "additional_jobs":
          header = "Additional Job";
          break;
        case "no_of_units":
          header = "No of  Jobs";
          break;
        case "amount":
          header = "Amount";
          break;
      }
      return header;
    },
    getHeaderTwo(index) {
      let header;
      switch (index) {
        case "minimum_quantity":
          header = "Minimum Quantity: ";
          break;
        case "amount":
          header = "Amount";
          break;
      }
      return header;
    },
    getHeaderThree(index) {
      let header;
      switch (index) {
        case "van_job_min":
          header = "Van Job Min Cost ";
          break;
        case "kg1":
          header = "Kg";
          break;
        case "van_job_add":
          header = "Van Job Addl. Cost";
          break;
        case "kg2":
          header = "Kg";
          break;
        case "van_job_urgent":
          header = "Van Job Urgent Surcharge";
          break;
      }
      return header;
    },
  },
};
</script>

<style lang="scss" scoped>
.font {
  font-size: 12px !important;
}
.costing-details-remarks-text {
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: #4e5968;
}
.van-costing-details-grey-wrapper-regular {
  background: #f3f7ff;
  border: 1px solid rgba(126, 132, 167, 0.3);
  border-radius: 8px;
  height: 25%;
  width: 100%;
}
.van-costing-details-detailsText {
  font-size: 12px;
  color: #7e84a7;
  font-weight: 600;
}
.van-costing-details-valuesText {
  color: #66c11e;
  font-size: 12px !important;
}
.van-costing-details-priorityText {
  color: #c11e1e;
}
.van-costing-details-header {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.03em;
  color: #343434;
}
.van-costing-details-horizontal-line {
  margin: 0px !important;
  margin-top: 1.1% !important;
}

::v-deep.p-datatable.p-datatable-sm .p-datatable-header {
  background-color: #f3f7ff !important;
}
.p-datatable {
  padding: 10px;
  background-color: #f3f7ff;
}
::v-deep.p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
  background-color: #f3f7ff !important;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #7e84a7;
}
::v-deep.p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {
  padding: 15px !important;
}

.van-costing-details-trip-schedule {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #343434;
}
.tier {
  background-color: #f3f7ff;
  border-radius: 8px;
  // border: 1px #7e84a7;
  border-color: rgba(126, 132, 167, 0.3) !important;
}
.van-fsr {
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
}
.van {
  color: #357dea;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
}
.normal {
  color: #357dea;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
}
</style>