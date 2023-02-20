<template>
  <div class="flex flex-wrap justify-content-between">
    <div class="flex">
      <span class="van-costing-details-header">{{
        $store.state.salesExpressContractVan.OverviewData?.express_contract[0]
          ?.quotation_van[0]?.charge_type === "normal"
          ? "Costing Details - Monthly Minimum" +
            (quotation_van.two_tier ? " - 2 tier" : " - Multi tier")
          : "Costing Details - E-Commerce"
      }}</span>
    </div>
    <div class="flex">
      <span
        class="
          flex flex-wrap
          van-costing-details-detailsText van-costing-details-valuesText
          mr-2
          mt-1
        "
        >{{ cost_type }}</span
      ><i class="pi pi-ellipsis-v mt-2"></i>
    </div>
  </div>
  <hr class="van-costing-details-horizontal-line" />
  <div
    v-if="
      $store.state.salesExpressContractVan.OverviewData?.express_contract[0]
        ?.quotation_van[0]?.charge_type === 'normal'
    "
  >
    <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
      <div
        v-for="(i, index) of cost_normal"
        :class="index != cost_normal.length - 1 ? 'flex mr-6' : 'flex'"
        :key="index"
      >
        <div class="flex flex-column">
          <div class="flex van-costing-details-detailsText flex-wrap">
            {{ i.title }}
          </div>
          <div
            :class="
              item != 'High'
                ? 'flex flex-wrap van-costing-details-detailsText van-costing-details-valuesText'
                : 'flex  flex-wrap van-costing-details-detailsText van-costing-details-priorityText'
            "
          >
            <!-- <span
            v-if="
              index == 'standard_liability' ||
              index == 'additional_jobs' ||
              index == 'time_slot_delivery_charge' ||
              index == 'job'
            "
          >
            {{ item }} $</span
          > -->
            <span
              >{{
                $store.state.salesExpressContractVan.OverviewData
                  ?.express_contract[0]?.quotation_van[0]?.normal_charges[0][
                  i.field
                ] ?? ""
              }}
              $</span
            >
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="!Array.isArray(cost_data_details)"
      class="flex flex-row flex-wrap ml-1 mt-3 mb-4"
    >
      <div v-for="(item, index) of cost_data_details" :key="index">
        <div
          v-if="getHeaderOne(index) !== ''"
          :class="
            index != cost_data_details.length - 1
              ? 'flex mr-6 flex-column'
              : 'flex flex-column'
          "
        >
          <div class="flex van-costing-details-detailsText flex-wrap">
            {{ getHeaderOne(index) }}
          </div>
          <div
            :class="'flex flex-wrap van-costing-details-detailsText van-costing-details-valuesText'"
          >
            <!-- <span v-if="index == 'amount'">${{ item }} </span> -->
            <span>{{ item }} {{ index.includes("cost") ? " $" : "" }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex mr-6 flex-column">
      <div class="flex van-costing-details-detailsText flex-wrap mb-1">
        {{
          quotation_van?.charge_by_weight
            ? "Box Under "
            : quotation_van?.charge_by_job_count
            ? "No of Job"
            : "No of Box"
        }}
      </div>
      <div
        :class="' flex flex-row flex-wrap ml-1 mt-3 mb-4'"
        v-for="(item, index) of cost_data_details"
        :key="index"
      >
        <!-- <div > -->

        <div :class="'flex mr-6 flex-column'">
          <div class="flex van-costing-details-detailsText flex-wrap">
            Minimum
          </div>
          <div
            :class="'flex flex-wrap van-costing-details-detailsText van-costing-details-valuesText'"
          >
            <!-- <span v-if="index == 'amount'">${{ item }} </span> -->
            <span>{{
              quotation_van?.charge_by_job_count ? item.min_job : item.min_box
            }}</span>
          </div>
        </div>
        <div :class="'flex mr-6 flex-column'">
          <div class="flex van-costing-details-detailsText flex-wrap">
            Maximum
          </div>
          <div
            :class="'flex flex-wrap van-costing-details-detailsText van-costing-details-valuesText'"
          >
            <!-- <span v-if="index == 'amount'">${{ item }} </span> -->
            <span>{{
              quotation_van?.charge_by_job_count ? item.min_job : item.max_box
            }}</span>
          </div>
        </div>
        <div :class="'flex mr-6 flex-column'">
          <div class="flex van-costing-details-detailsText flex-wrap">Rate</div>
          <div
            :class="'flex flex-wrap van-costing-details-detailsText van-costing-details-valuesText'"
          >
            <!-- <span v-if="index == 'amount'">${{ item }} </span> -->
            <span>{{ item.rate }} $</span>
          </div>
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
  <div v-else>
    <p class="costing-details-remarks-text mt-3 mb-1">
      Type 1:
      {{
        $store.state.salesExpressContractVan.OverviewData?.express_contract[0]
          ?.quotation_van[0]?.e_commerce_rate_card_name ?? ""
      }}
    </p>
    <div class="flex mt-2">
      <div class=" flex flex-row flex-wrap van-costing-details-grey-wrapper-regular p-2 justify-content-between">
        <p class="costing-details-remarks-text mt-1 mb-1 ml-2">
          {{
            $store.state.salesExpressContractVan.OverviewData
              ?.express_contract[0]?.quotation_van[0]
              ?.e_commerce_rate_card_name ?? ""
          }}
        </p>
        <div>
         <img
              :src="'/images/' + 'drag-drop-pdf' + '.png'"
              alt="pdf"
              width="30"
              height="27"
              class="mt-2"
            />
            <span class="ml-1 van-costing-details-detailsText">Download</span>
            </div>
      </div>
    </div>
    <div :key="renderKey" class="mt-2">
      <DuoSelection
        v-model="selectType"
        :options="costing_option"
        :default="selectType"
      />

      <div v-for="(i, index) of quotation_van.e_commerce_charges" :key="index">
      <div v-if="i.delivery_type === selectType" class="flex mr-6 flex-column">
        <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
        <div v-for="(item, index1) of i" :key="index1">
        <div
          v-if="getHeaderECommerce(index1) !== ''"
          :class="
            index != i.length - 1
              ? 'flex mr-6 flex-column'
              : 'flex flex-column'
          "
        >
          <div class="flex van-costing-details-detailsText flex-wrap">
            {{ getHeaderECommerce(index1) }}
          </div>
          <div
            :class="'flex flex-wrap van-costing-details-detailsText van-costing-details-valuesText'"
          >
            <!-- <span v-if="index == 'amount'">${{ item }} </span> -->
            <span>{{index1.includes("time")?getTime(item): item }} {{ index1.includes("time") ||index1.includes("count") ? "" : " $" }}</span>
          </div>
        </div>
      </div>
        </div>
<div>
          <DuoSelection
        v-model="selectType_in"
        :options="costing_in_option"
        :default="selectType_in"
      />
      <!-- <div v-for="e of costing_in_option" :key="e" > -->
      <div v-if="selectType_in==='Charge by Weight'" class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
        <div v-for="(item, index1) of i.charge_by_weights[0]" :key="index1">
        <div
          v-if="getECommerceSub(index1) !== ''"
          :class="
            index != i.length - 1
              ? 'flex mr-6 flex-column'
              : 'flex flex-column'
          "
        >
          <div class="flex van-costing-details-detailsText flex-wrap">
            {{ getECommerceSub(index1) }}
          </div>
          <div
            :class="'flex flex-wrap van-costing-details-detailsText van-costing-details-valuesText'"
          >
            <!-- <span v-if="index == 'amount'">${{ item }} </span> -->
            <span>{{item }} {{ index1.includes("cost")? " $" : " kg" }}</span>
          </div>
        </div>
      </div>
        <!-- </div> -->
        </div>

        <!-- Charge by Quantity -->
        <div v-if="selectType_in==='Charge by Quantity'" >
        <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
        <div v-for="(item, index1) of i.charge_by_quantities[0]" :key="index1">
        <div
          v-if="getECommerceSub(index1) !== ''"
          :class="
            index != i.length - 1
              ? 'flex mr-6 flex-column'
              : 'flex flex-column'
          "
        >
          <div class="flex van-costing-details-detailsText flex-wrap">
            {{ getECommerceSub(index1) }}
          </div>
          <div
            :class="'flex flex-wrap van-costing-details-detailsText van-costing-details-valuesText'"
          >
            <!-- <span v-if="index == 'amount'">${{ item }} </span> -->
            <span>{{item }} {{ index1.includes("cost")? " $" : " " }}</span>
          </div>
        </div>
       
      </div>
</div>
       <div v-if="i.charge_by_quantities[0].rates.length !== 0" class="flex mr-6 flex-column">
      <div class="flex van-costing-details-detailsText flex-wrap mb-1">
        Box Count Charges
      </div>
      <div
        :class="' flex flex-row flex-wrap ml-1 mt-3 mb-4'"
        v-for="(item, index) of i.charge_by_quantities[0].rates"
        :key="index"
      >
        <!-- <div > -->

        <div :class="'flex mr-6 flex-column'">
          <div class="flex van-costing-details-detailsText flex-wrap">
            Minimum
          </div>
          <div
            :class="'flex flex-wrap van-costing-details-detailsText van-costing-details-valuesText'"
          >
            <!-- <span v-if="index == 'amount'">${{ item }} </span> -->
            <span>{{
              item.min_box
            }}</span>
          </div>
        </div>
        <div :class="'flex mr-6 flex-column'">
          <div class="flex van-costing-details-detailsText flex-wrap">
            Maximum
          </div>
          <div
            :class="'flex flex-wrap van-costing-details-detailsText van-costing-details-valuesText'"
          >
            <!-- <span v-if="index == 'amount'">${{ item }} </span> -->
            <span>{{
             item.max_box
            }}</span>
          </div>
        </div>
        <div :class="'flex mr-6 flex-column'">
          <div class="flex van-costing-details-detailsText flex-wrap">Rate</div>
          <div
            :class="'flex flex-wrap van-costing-details-detailsText van-costing-details-valuesText'"
          >
            <!-- <span v-if="index == 'amount'">${{ item }} </span> -->
            <span>{{ item.rate }} $</span>
          </div>
        </div>
      </div>
      <!-- </div> -->
    </div>
        </div>


        </div>
        </div>
        
      </div>
    </div>
  </div>
  <div class="card mt-2">
    <DataTable
      :value="
        $store.state.salesExpressContractVan.OverviewData?.express_contract[0]
          .trips
      "
      class="p-datatable-sm"
      responsiveLayout="scroll"
    >
      <template #header>
        <div class="van-costing-details-trip-schedule">Trip Schedule</div>
      </template>

      <template class="flex">
        <Column
          class="chargable-weight"
          field="trip_no"
          header="Trip No"
        ></Column>
        <Column field="from_time" header="From"></Column>
        <Column field="to_time" header="To"></Column>
        <Column field="trip_days" header="Trip Days"></Column>

        <Column field="trip_type" header="Trip Type"></Column>
      </template>
    </DataTable>
  </div>

  <div class="flex flex-column ml-1 mt-3 mb-4">
    <div class="flex van-costing-details-detailsText mb-2">Remarks</div>
    <div class="flex">
      <div class="van-costing-details-grey-wrapper-regular p-2">
        <p class="costing-details-remarks-text">
          {{ $store.state.salesExpressContractVan.OverviewData?.remarks ?? "" }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import DuoSelection from "../DuoSelect.vue";
import moment from "moment";
export default {
  name: "CostingDetails",

  components: {
    DataTable,
    Column,
    DuoSelection,
  },

  data() {
    return {
      renderKey: 1,
      cost_type: "",
      cost_box: [
        {
          title: "Box Under Minimum",
          field: "min_box",
        },
        {
          title: "Box Under Maximum",
          field: "max_box",
        },
        {
          title: "Rate",
          field: "rate",
        },
      ],
      costing_option: [],
      costing_in_option: ["Charge by Weight", "Charge by Quantity"],
      selectType: "",
      selectType_in:"",
      cost_normal: [
        { title: "No. of Units", field: "no_of_units" },
        { title: "Job", field: "per_job" },
        { title: "Amount", field: "amount" },
        { title: "Additional Job", field: "additional_job" },
        { title: "Van Urgent Surcharge", field: "van_job_urgent_surcharges" },
      ],
      quotation_van:
        this.$store.state.salesExpressContractVan.OverviewData
          ?.express_contract[0]?.quotation_van[0] ?? {},
      cost_data_details: {},
      CostingDetailsData: {
        no_of_jobs: 15,
        job: 10,
        amount: 80,
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
  methods: {
    getTime(date){
return moment(date).format("HH:mm") ?? "";
    },
    getHeader(index) {
      let header;
      switch (index) {
        case "job":
          header = "Job $";
          break;
        case "additional_jobs":
          header = "Additional Job";
          break;
        case "no_of_jobs":
          header = "No of Jobs";
          break;
        case "amount":
          header = "Amount";
          break;
        case "time_slot_delivery_charge":
          header = "Timeslot Delivery";
          break;
        case "standard_liability":
          header = "Standard Liability";
          break;
      }
      return header;
    },
    getHeaderOne(index) {
      let header = "";
      switch (index) {
        case "minimum_weight":
          header = "Maximum Weight";
          break;
        case "van_job_additional_cost":
          header = "Van Job Add. Cost ";
          break;
        case "van_job_additional_weight":
          header = "Van Job Addl. Weight";
          break;
        case "minimum_quantity":
          header = "Maximum Quantity";
          break;
        case "van_job_additional_quantity":
          header = "Van Job Add. Quantity";
          break;
      }
      return header;
    },
    getHeaderECommerce(index) {
      let header = "";
      switch (index) {
        case "no_of_units":
          header = "No. of Units";
          break;
        case "per_job":
          header = "Job";
          break;
        case "amount":
          header = "Amount ";
          break;
        case "additional_job":
          header = "Additional Job";
          break;
        case "standard_liability":
          header = "Standard Liability";
          break;
            case "time_slot_delivery ":
          header = "Timeslot Delivery ";
          break;
            case "cut_off_time":
          header = "Cut Off Time";
          break;
            case "cut_off_day_count":
          header = "Cut Off Days Count";
          break;
      }
      return header;
    },
    getECommerceSub(index) {
      let header = "";
      switch (index) {
        case "minimum_weight":
          header = "Maximum Weight";
          break;
        case "van_job_additional_weight":
          header = "Van Job Add. Weight";
          break;
        case "minimum_quantity":
          header = "Maximum Quantity";
          break;
        case "van_job_additional_quantity":
          header = "Van Job Add. Quantity";
          break;
           case "van_job_additional_cost":
          header = "Van Job Add. Cost";
          break;
      }
      return header;
    },
  },
  async created() {
    let quotation_van =
      this.$store.state.salesExpressContractVan.OverviewData
        ?.express_contract[0]?.quotation_van[0] ?? {};
    if (quotation_van?.charge_type === "normal") {
      if (quotation_van?.two_tier) {
        if (quotation_van?.charge_by_weight) {
          this.cost_type = "Charge by Weight";
          this.cost_data_details =
            quotation_van?.normal_charges[0]?.two_tier_charge_by_weight[0] ??
            {};
        } else {
          this.cost_type = "Charge by Quantity";
          if (quotation_van?.charge_quantity_charge) {
            this.cost_data_details =
              quotation_van?.normal_charges[0]
                ?.two_tier_charge_by_quantity[0] ?? {};
          } else {
            this.cost_data_details =
              quotation_van?.normal_charges[0]
                ?.two_tier_charge_by_quantity_box_count ?? [];
          }
        }
      } else {
        this.cost_type = "Charge by Quantity";
        if (quotation_van?.charge_by_quantity) {
          this.cost_data_details =
            quotation_van?.normal_charges[0]?.multi_tier_charge_by_quantity ??
            [];
        } else {
          this.cost_data_details =
            quotation_van?.normal_charges[0]?.multi_tier_charge_by_job_count ??
            [];
        }
      }
    } else {
      this.costing_option = [];
      quotation_van.e_commerce_charges?.map((i) => {
        this.costing_option.push(i.delivery_type);
      });
      this.selectType=this.costing_option[0]
      this.selectType_in=this.costing_in_option[0]
      this.renderKey++;
    }
  },
};
</script>

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
</style>
