<script>
import { mapGetters } from "vuex";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import CostingDetailsVanEcommerce from "./CostingDetailsVanEcommerce.vue";
export default {
  computed: {
    ...mapGetters({
      overview_data: "salesExpressContract/OverviewData",
    }),
  },
  components: {
    DataTable,
    Column,
    CostingDetailsVanEcommerce,
  },
  data() {
    return {
      renderkey: 1,
      products: [],
      product: [],
      productsCount: [],
      CostingDetailsOne: null,
      CostingDetailsTwo: null,
      CostingDetailsThree: null,
      CostingDetailsFour: null,
      first_month: "",
      details: {},
      // {
      //   no_of_jobs: 15,
      //   job: 10,
      // },
    };
  },

  created() {
    this.details = this.overview_data?.express_contract[0]?.van_rates;
    this.first_month = this.details?.charge_usage_only
      ? "Charge Usage Only"
      : this.details?.charge_minimum
      ? "Charge Minimum"
      : "";
    this.CostingDetailsFour = {
      min_charge_per_job:
        this.overview_data?.express_contract[0].van_rates?.min_charge_per_job,
    };
    this.CostingDetailsThree = {
      minimum_quantity:
        this.overview_data?.express_contract[0]?.van_rates?.first_month_rates[0]
          ?.minimum_quantity,
      amount:
        this.overview_data?.express_contract[0]?.van_rates?.first_month_rates[0]
          ?.amount,
    };
    this.CostingDetailsTwo = {
      a: this.overview_data?.express_contract[0].van_rates?.two_tier,
    };

    this.CostingDetailsOne = {
      no_of_units:
        this.overview_data?.express_contract[0]?.van_rates?.normal_charges[0]
          ?.no_of_units,
      per_job:
        this.overview_data?.express_contract[0]?.van_rates?.normal_charges[0]
          ?.per_job,
      amount:
        this.overview_data?.express_contract[0]?.van_rates?.normal_charges[0]
          ?.amount,
      additional_jobs:
        this.overview_data?.express_contract[0]?.van_rates?.normal_charges[0]
          ?.additional_job,
    };

    this.overview_data?.express_contract[0]?.van_rates?.normal_charges[0]?.two_tier_charge_by_weight?.map(
      (i) => {
        this.products.push({
          minimum_weight: i?.minimum_weight,
          van_job_additional_weight: i?.van_job_additional_weight,
          van_job_additional_cost: i?.van_job_additional_cost,
        });
      }
    );
    this.overview_data?.express_contract[0]?.van_rates?.normal_charges[0]?.two_tier_charge_by_quantity?.map(
      (i) => {
        this.products.push({
          minimum_weight: i?.minimum_quantity,
          van_job_additional_weight: i?.van_job_additional_cost,
          van_job_additional_cost: i?.van_job_additional_quantity,
        });
      }
    );
    this.overview_data?.express_contract[0]?.van_rates?.normal_charges[0]?.two_tier_charge_by_quantity_box_count?.map(
      (i) => {
        this.productsCount.push({
          minimum_weight: i?.max_box,
          van_job_additional_weight: i?.min_box,
          van_job_additional_cost: i?.rate,
        });
      }
    );
    this.overview_data?.express_contract[0]?.van_rates?.normal_charges[0]?.multi_tier_charge_by_quantity?.map(
      (i) => {
        this.product.push({
          maximum: i?.max_box,
          minimum: i?.min_box,
          rate: i?.rate,
        });
      }
    );
    this.overview_data?.express_contract[0]?.van_rates?.normal_charges[0]?.multi_tier_charge_by_job_count?.map(
      (i) => {
        this.product.push({
          maximum: i?.max_job,
          minimum: i?.min_job,
          rate: i?.rate,
        });
      }
    );
    this.renderkey++;
  },

  methods: {
    getHeaderVanFirst(index) {
      let header;
      switch (index) {
        case "minimum_quantity":
          header = "Minimum Quantity ";
          break;
        case "amount":
          header = "Amount";
          break;
      }
      return header;
    },

    getHeaderVan(index) {
      let header;
      switch (index) {
        case "min_charge_per_job":
          header = "Min Charge Per Job";
          break;
      }
      return header;
    },
    getHeaderTier(index) {
      let header;
      switch (index) {
        case "min_charge_per_job":
          header = "Min Charge Per Job";
          break;
      }
      return header;
    },

    getHeader(index) {
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
  },
};
</script>

<template>
  <div v-if="this.overview_data?.express_contract[0]?.van == true">
    <p class="mt-1 van">Van</p>
    <span
      v-if="
        this.overview_data?.express_contract[0]?.van_rates?.charge_type.includes(
          'normal'
        )
      "
    >
      <span class="normal">{{
        this.overview_data?.express_contract[0]?.van_rates.charge_type
      }}</span>

      <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
        <div
          v-for="(item, index) of CostingDetailsOne"
          :class="index != CostingDetailsOne.length - 1 ? 'flex mr-6' : 'flex'"
          :key="index"
        >
          <div class="flex flex-column">
            <div class="flex van-costing-details-detailsText flex-wrap">
              {{ getHeader(index) }}
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

      <div class="card mb-4">
        <DataTable
          :value="products"
          class="p-datatable-sm"
          responsiveLayout="scroll"
          v-if="
            this.overview_data?.express_contract[0]?.van_rates.normal_charges[0]
              ?.two_tier_charge_by_weight.length ||
            this.overview_data?.express_contract[0]?.van_rates.normal_charges[0]
              ?.two_tier_charge_by_quantity.length
          "
        >
          <template #header>
            <div class="flex justify-content-between">
              <div
                class="express-contract-van-fsr-costing-details-trip-schedule"
                v-if="
                  this.overview_data?.express_contract[0]?.van_rates
                    .normal_charges[0]?.two_tier_charge_by_weight.length
                "
              >
                2-Tier ( Charge By Weight )
              </div>
              <div
                class="express-contract-van-fsr-costing-details-trip-schedule"
                v-if="
                  this.overview_data?.express_contract[0]?.van_rates
                    .normal_charges[0]?.two_tier_charge_by_quantity.length
                "
              >
                2-Tier ( Charge By Quantity )
              </div>
            </div>
          </template>

          <template class="flex">
            <Column field="minimum_weight" header="Maximum Weight"></Column>
            <Column
              field="van_job_additional_weight"
              header="Van Job Addl. Weight"
            ></Column>
            <Column
              field="van_job_additional_cost"
              header="Van Job Addl. Cost"
            ></Column>
          </template>
        </DataTable>
      </div>
      <!-- ppppppppppppppppppppppppppppppppppppppppppppppppp -->

      <div class="card mb-4">
        <DataTable
          :value="productsCount"
          class="p-datatable-sm"
          responsiveLayout="scroll"
          v-if="
            this.overview_data?.express_contract[0]?.van_rates.normal_charges[0]
              ?.two_tier_charge_by_quantity_box_count.length
          "
        >
          <template #header>
            <div class="flex justify-content-between">
              <div
                class="express-contract-van-fsr-costing-details-trip-schedule"
                v-if="
                  this.overview_data?.express_contract[0]?.van_rates
                    .normal_charges[0]?.two_tier_charge_by_quantity_box_count
                    .length
                "
              >
                2-Tier ( Charge By Box Count )
              </div>
            </div>
          </template>

          <template class="flex">
            <Column field="minimum_weight" header="Maximum Box"></Column>
            <Column
              field="van_job_additional_weight"
              header="Minimum Box"
            ></Column>
            <Column field="van_job_additional_cost" header="Rate"></Column>
          </template>
        </DataTable>
      </div>

      <!-- gggggggggggggggggggggggggggg -->

      <div class="card mb-4">
        <DataTable
          :value="product"
          class="p-datatable-sm"
          responsiveLayout="scroll"
          v-if="
            this.overview_data?.express_contract[0]?.van_rates.normal_charges[0]
              ?.multi_tier_charge_by_quantity.length ||
            this.overview_data?.express_contract[0]?.van_rates.normal_charges[0]
              ?.multi_tier_charge_by_job_count.length
          "
        >
          <template #header>
            <div class="flex justify-content-between">
              <div
                class="express-contract-van-fsr-costing-details-trip-schedule"
                v-if="
                  this.overview_data?.express_contract[0]?.van_rates
                    .normal_charges[0]?.multi_tier_charge_by_quantity.length
                "
              >
                Multi-Tier ( Charge By Quantity)
              </div>
              <div
                class="express-contract-van-fsr-costing-details-trip-schedule"
                v-if="
                  this.overview_data?.express_contract[0]?.van_rates
                    .normal_charges[0]?.multi_tier_charge_by_job_count.length
                "
              >
                Multi-Tier ( Charge By Job Count )
              </div>
            </div>
          </template>

          <template class="flex">
            <Column field="minimum" header="Minimun"></Column>
            <Column field="maximum" header="Maximum"></Column>
            <Column field="rate" header="Rate"></Column>
          </template>
        </DataTable>
      </div>

      <div class="tier border-2 p-3 mb-2">
        <span class="van-fsr">First Month ( {{ first_month }} ) </span>

        <div class="flex flex-row flex-wrap mt-1">
          <div
            v-for="(item, index) of CostingDetailsThree"
            :class="
              index != CostingDetailsThree.length - 1 ? 'flex mr-6' : 'flex'
            "
            :key="index"
          >
            <div class="flex">
              <div class="flex van-costing-details-detailsText">
                {{ getHeaderVanFirst(index) }} :
              </div>
              <div
                :class="
                  item != 'High'
                    ? 'flex flex-wrap van-costing-details-detailsText van-costing-details-valuesText'
                    : 'flex  flex-wrap van-costing-details-detailsText van-costing-details-priorityText'
                "
              >
                <span> {{ item }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tier border-2 p-3 mt-2">
        <span class="van-fsr">Van Customer Bike Job </span>

        <div class="flex flex-row flex-wrap mt-1">
          <div
            v-for="(item, index) of CostingDetailsFour"
            :class="
              index != CostingDetailsFour.length - 1 ? 'flex mr-6' : 'flex'
            "
            :key="index"
          >
            <div class="flex flex-column">
              <div class="flex van-costing-details-detailsText flex-wrap">
                {{ getHeaderVan(index) }}
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
    </span>
  </div>
  <CostingDetailsVanEcommerce :key="renderkey" />
</template>

<style lang="scss" scoped>
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