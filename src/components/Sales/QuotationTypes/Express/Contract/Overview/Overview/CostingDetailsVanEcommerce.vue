<template>
  <span
    v-if="
      this.overview_data?.express_contract[0]?.van_rates?.charge_type.includes(
        'e_commerce'
      )
    "
  >
    <p class="normal">
      {{ this.overview_data?.express_contract[0]?.van_rates.charge_type }}
    </p>
    <!-- <div class="tier border-2 p-3 mb-2"> -->

    <!-- <span class="van-fsr mb-3">First Month ( Charge Minimum ) </span> -->

    <DuoSelection
      v-model="selectType"
      :options="costing_in_option_in"
      :default="selectType"
    />

    <div class="mb-2">
      <div class="">
        <div
          v-for="(i, index) of this.overview_data?.express_contract[0]
            ?.van_rates?.e_commerce_charges"
          :key="index"
        >
          <div
            v-if="i.delivery_type === selectType"
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
                    >{{ index1.includes("time") ? getTime(item) : item }}
                    {{
                      index1.includes("time") || index1.includes("count")
                        ? ""
                        : " $"
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
    <div class="card mb-4">
      <DataTable
        :value="product"
        class="p-datatable-sm"
        responsiveLayout="scroll"
      >
        <template #header>
          <div class="flex justify-content-between">
            <div class="express-contract-van-fsr-costing-details-trip-schedule">
              Charge by Weight
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
    <!-- ////////////////////// -->
    <div class="card mb-4">
      <DataTable
        :value="products"
        class="p-datatable-sm"
        responsiveLayout="scroll"
      >
        <template #header>
          <div class="flex justify-content-between">
            <div class="express-contract-van-fsr-costing-details-trip-schedule">
              Charge by Quantity
            </div>
          </div>
        </template>

        <template class="flex">
          <Column field="minimum_quantity" header="Maximum Quantity"></Column>
          <Column field="van_job_additional_cost" header="Van Job Add.Cost"></Column>
          <Column field="van_job_additional_quantity" header="Van Job Add.Quantity"></Column>
        </template>
      </DataTable>
      <div v-for="(i, tIndex) of box_charges_rates" :key="tIndex">
      <DataTable
      v-if="i.delivery_type == selectType"
        :value="i.charge_by_quantities[0].rates"
        class="p-datatable-sm mt-2"
        responsiveLayout="scroll"
      >
        <template #header>
          <div class="flex justify-content-between">
            <div class="express-contract-van-fsr-costing-details-trip-schedule">
              Box Count Charges
            </div>
          </div>
        </template>

        <template class="flex">
          <Column field="min_box" header="Minimum"></Column>
          <Column field="max_box" header="Maximum"></Column>
          <Column field="rate" header="Rates $"></Column>
        </template>
      </DataTable>
      </div>
    </div>

    <!-- <DuoSelection
      v-model="selectType_in"
      :options="costing_in_option"
      :default="selectType"
    /> -->

    <div class="tier border-2 p-3 mb-2">
      <span class="van-fsr">First Month ( {{ first_month }} ) </span>
      <div class="flex flex-row flex-wrap mt-1">
        <div
          v-for="(i, index) of this.overview_data?.express_contract[0]
            ?.van_rates?.first_month_rates"
          :key="index"
        >
          <div
            v-if="i.delivery_type === selectType"
            :key="renderkey"
            class="flex"
          >
            <div v-for="(item, index1) of i" :key="index1">
              <div v-if="getHeaderEcommerce2(index1) !== ''">
                <div class="mt-2">
                  <span class="van-costing-details-detailsText ml-2"
                    >{{ getHeaderEcommerce2(index1) }}
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

    <div class="tier border-2 p-3 mb-2">
      <span class="van-fsr">Van Customer Bike Job</span>

      <div class="flex flex-row flex-wrap mt-1">
        <div :class="'flex'">
          <div class="flex flex-column">
            <div class="flex van-costing-details-detailsText flex-wrap">
              Min Charge per Job
            </div>
            <div
              :class="'flex flex-wrap van-costing-details-detailsText van-costing-details-valuesText'"
            >
              <span>{{ this.details?.min_charge_per_job ?? "" }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { mapGetters } from "vuex";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import DuoSelection from "../DuoSelect.vue";
import moment from "moment";
export default {
  computed: {
    ...mapGetters({
      overview_data: "salesExpressContract/OverviewData",
    }),
  },
  components: {
    DataTable,
    Column,
    DuoSelection,
  },

  methods: {
    getTime(date) {
      return moment(date).format("HH:mm") ?? "";
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMMM YYYY ");
        return formattedDate;
      }
    },
    getHeaderEcommerce1(index) {
      let header = "";
      switch (index) {
        case "no_of_units":
          header = "No of  Units";
          break;
        case "per_job":
          header = "Job Rate";
          break;
        case "additional_job":
          header = "Additional Job";
          break;
        case "amount":
          header = "Amount";
          break;
        case "cut_off_time":
          header = "Cut off Time ";
          break;
        case "cut_off_day_count":
          header = "Cut off Days ";
          break;
      }
      return header;
    },
    getHeaderEcommerce2(index) {
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
  },

  data() {
    return {
      renderkey: 1,
      product: [],
      products: [],
      box_rates:[],
      selectType: "",
      costing_in_option_in: [],
      selectType_in: "",
      costing_in_option: [],
      first_month: "",
      details: {},
    };
  },

  created() {
    this.details = this.overview_data?.express_contract[0]?.van_rates;
    this.costing_in_option_in =
      this.overview_data?.express_contract[0]?.van_rates?.e_commerce_charges.map(
        (i) => i.delivery_type
      );
    if (this?.costing_in_option_in?.length) {
      this.selectType = this?.costing_in_option_in[0];
    }
    this.first_month = this.details?.charge_usage_only
      ? "Charge Usage Only"
      : this.details?.charge_minimum
      ? "Charge Minimum"
      : "";
    this.overview_data?.express_contract[0]?.van_rates?.e_commerce_charges?.map(
      (x) => {
        x.charge_by_weights.map((i) => {
          this.product.push({
            minimum_weight: i?.minimum_weight,
            van_job_additional_weight: i?.van_job_additional_weight,
            van_job_additional_cost: i?.van_job_additional_cost,
          });
        });
      }
    );
    this.overview_data?.express_contract[0]?.van_rates?.e_commerce_charges?.map(
      (x) => {
        x.charge_by_quantities.map((i) => {
          this.products.push({
            minimum_quantity: i?.minimum_quantity,
            van_job_additional_cost: i?.van_job_additional_cost,
            van_job_additional_quantity: i?.van_job_additional_quantity,
            createdAt: this.dateFormater(i?.createdAt),
          });
        });
      }
    );
    this.box_charges_rates=this.overview_data?.express_contract[0]?.van_rates?.e_commerce_charges
    this.costing_in_option =
      this.overview_data?.express_contract[0]?.van_rates?.first_month_rates.map(
        (i) => i.delivery_type
      );
    if (this?.costing_in_option?.length) {
      this.selectType_in = this?.costing_in_option[0];
    }
  },
};
</script>

<style lang="scss" scoped>
.normal {
  color: #357dea;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
}
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