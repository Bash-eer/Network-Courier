<template>
  <div class="flex flex-wrap justify-content-between mt-2">
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
              ? 'flex flex-wrap  color-66c11e'
              : 'flex  flex-wrap detailsText  color-c11e1e '
          "
        >
          <span class="fontSize">{{ item }}</span>
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
    Surcharges
  </div>

  <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
    <div
      v-for="(item, index) of details?.surcharges"
      :class="`${index != details?.surcharges?.length - 1 ? 'mr-6' : ''} ${
        !item.selected ? 'd-none' : ''
      }`"
      :key="index"
    >
      <div class="flex flex-column">
        <div class="flex detailsText flex-wrap">{{ item.surcharge_name }}</div>
        <div
          :class="
            item != 'High'
              ? 'flex flex-wrap  color-66c11e'
              : 'flex  flex-wrap detailsText  color-c11e1e '
          "
        >
          <span class="fontSize"> {{ item.rates }} $</span>
          <!-- <span v-else class="fontSize">{{ item }}</span> -->
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

  <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4" :key="renderkey">
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
          {{ getTripName(item) }}
        </div>
        <span
          v-if="
            item == 'special_urgent_charges_selected' || item == 'ftz_selected'
          "
          :class="'flex flex-wrap font-size-12 line-height-28'"
        >
          {{ " : " }}
          <span
            :class="'flex flex-wrap font-size-12 line-height-28  color-66c11e'"
          >
            {{
              details[item.includes("ftz") ? "ftz" : "special_urgent_charges"]
            }}
            $
          </span></span
        >
      </div>
    </div>
  </div>

  <div
    class="card mb-4"
    v-if="this.overview_data?.quotation_express_cost_center_details?.length"
  >
    <DataTable
      :value="products"
      class="p-datatable-sm"
      responsiveLayout="scroll"
    >
      <template #header>
        <div class="flex justify-content-between">
          <div class="express-contract-van-fsr-costing-details-trip-schedule">
            CostCenter Details
          </div>
        </div>
      </template>

      <template class="flex">
        <Column field="address" header="Site Office"></Column>
        <Column field="charge_per_trip" header="Charge Per Trip"></Column>
        <Column
          field="return_trip_charge"
          header="Return Trip Charge (By Amount)"
        ></Column>
        <Column
          field="head_off_delivery_charge"
          header="Head Off Delivery Charges"
        ></Column>
      </template>
    </DataTable>
  </div>

  <div
    class="card mb-4"
    v-if="this.overview_data?.quotation_express_cost_center_details?.length"
  >
    <DataTable
      :value="TripChargesDataOne"
      class="p-datatable-sm"
      responsiveLayout="scroll"
    >
      <template class="flex">
        <Column
          field="collection_chargable"
          header="Collection Chargable"
        ></Column>
        <Column
          field="head_off_delivery_chargable"
          header="Head off delivery chargable"
        ></Column>
        <Column
          field="head_off_return_waived"
          header="Head off return waived"
        ></Column>
        <Column
          field="return_trip_chargable"
          header="Return trip chargable"
        ></Column>
        <Column field="special_monitoring" header="Special monitoring"></Column>
      </template>
    </DataTable>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
export default {
  data() {
    return {
      renderkey: 1,
      object: null,
      values: [],
      products: [],
      CostingDetailsData: null,
      CostingDetailsDataOne: null,
      CostingDetailsDataTwo: null,
      TripChargesData: [],
      TripChargesDataOne: [],
      SiteOfficeData: [],
      details: {},
      SiteOfficeArrayData: [
        "Return Trip Chargeable (Per Trip)",
        "Collection Chargable",
        "Head Off Delivery Charges",
        "Head Off Return Trip Waived",
      ],
    };
  },
  components: {
    DataTable,
    Column,
  },
  watch: {
    "$store.state.salesExpressContract.overview_data": function () {
      for (let list in this.overview_data?.express_contract[0]?.bill_settings) {
        if (
          this.IncomingData?.express_contract[0]?.bill_settings[list] === true
        ) {
          this.TripChargesData.push(list);
        }
      }
    },
  },
  created() {
    this.details = this.overview_data?.express_contract[0]?.bill_settings;
    if (this.overview_data?.express_contract[0]?.bill_settings) {
      for (let [list, value] of Object?.entries(
        this.overview_data?.express_contract[0]?.bill_settings
      ) || {}) {
        if (value === true) {
          this.TripChargesData.push(list);
        }
      }
    }

    this.overview_data?.quotation_express_cost_center_details?.map((i) => {
      i?.site_office_charges.map((a) => {
        this.TripChargesDataOne.push({
          collection_chargable: a.collection_chargable,
          head_off_delivery_chargable: a.head_off_delivery_chargable,
          head_off_return_waived: a.head_off_return_waived,
          return_trip_chargable: a.return_trip_chargable,
          special_monitoring: a.special_monitoring,
        });
      });
    });

    this.overview_data?.quotation_express_cost_center_details?.map((x) => {
      this.products.push({
        address: x.floor_no + " " + x.address + " " + x.country,
        charge_per_trip: x.site_office_charges[0].charge_per_trip,
        head_off_delivery_charge:
          x.site_office_charges[0].head_off_delivery_charge,
        return_trip_charge: x.site_office_charges[0].return_trip_charge,
      });
    });

    // console.log("this.values", this.values);

    // this.object = this.values.reduce(
    //   (obj, item) => Object.assign(obj, { [item.key]: item.value }),
    //   {}
    // );
    // console.log("this.object", this.object);

    // for (let [list, value] of Object?.entries(
    //   this.overview_data?.express_contract[0]?.bill_settings
    // )) {
    //   if (value === true) {
    //     this.SiteOfficeData.push(list);
    //   }
    // }

    this.CostingDetailsData = {
      id: this.overview_data?.express_contract[0]?.bill_settings?.credit_terms,
      credit_limit:
        this.overview_data?.express_contract[0]?.bill_settings?.credit_limit,
      credit_terms:
        this.overview_data?.express_contract[0]?.bill_settings?.billing_cycle,
    };
    this.CostingDetailsDataOne = {
      // island_charges: "30.00 $",
      // sur_charge:
      //   this.overview_data?.express_contract[0]?.bill_settings
      //     ?.special_urgent_charges,
      // special_urgent_price:
      //   this.overview_data?.express_contract[0]?.bill_settings
      //     ?.special_urgent_charges,

      special_urgent_price:
        this.overview_data?.express_contract[0]?.bill_settings
          ?.special_urgent_charges,
      sur_charge:
        this.overview_data?.express_contract[0]?.bill_settings?.billing_cycle,
      island_charges:
        this.overview_data?.express_contract[0]?.bill_settings
          ?.special_urgent_charges_selected,
    };
    this.CostingDetailsDataTwo = {
      charge_per_trip: "6.00 $",
      return_trip:
        this.overview_data?.express_contract[0]?.bill_settings
          ?.return_trip_charge,
      delivery_charges: "4.4 $",
    };
    this.renderkey++;
  },
  computed: {
    ...mapGetters({
      overview_data: "salesExpressContract/OverviewData",
    }),
  },
  methods: {
    getHeader(index) {
      let header;
      switch (index) {
        case "id":
          header = "Credit Terms (Days)";
          break;
        case "credit_limit":
          header = "Credit Limtis";
          break;
        case "credit_terms":
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
          header = "SurCharge $";
          break;
        case "special_urgent_price":
          header = "Special Urgent Price $ ";
          break;
      }
      return header;
    },
    getTripName(i) {
      let header;
      switch (i) {
        case "ftz_selected":
          header = "FTZ";
          break;
        case "return_trip_charge":
          header = "Return Trip Charge";
          break;
        case "return_trip_partial_charge":
          header = "Return Trip Partial Charge";
          break;
        case "saturday_2nd_trip_charge":
          header = "Saturday 2nd Trip Charge";
          break;
        case "special_monitoring":
          header = "Special Monitoring";
          break;
        case "special_urgent_charges_selected":
          header = "Special Urgent Charges";
          break;
        case "weekend_2nd_trip_charge":
          header = "Weekday 2nd Trip Charge";
          break;
        case "call_centre":
          header = "Cost Center";
          break;
        case "collection_trip_charge":
          header = "Collection Trip Charge";
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
  },
};
</script>

<style scoped>
.van-bill-setting-surcharge {
  width: 100%;
  height: 35px;
  padding-left: 8px;
}
.fontSize {
  font-size: 12px !important;
}
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
  border: 1px #7e84a7;
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