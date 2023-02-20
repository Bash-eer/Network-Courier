<template>
  <!-- <TabWrapper>
    <div v-if="deliveryTypes && deliveryTypes.length">
      <Tab v-for="rates of deliveryTypes" :key="rates.id" title="rates.tab">
        <div class="card">
          <DataTables
            storePath="salesRapidoContract"
            :loading="false"
            tableName="rapidoTable"
            tableClass="rapido-card-class"
            :tableData="TableData"
            :tableColumns="rates.delivery_size_charge"
            :showFilterMenu="false"
            :paginator="false"
          />
        </div>
      </Tab>
    </div>
  </TabWrapper> -->
  <SelectButton
    v-model="selectedTab"
    optionLabel="tab"
    class="mr-5"
    :options="deliveryTypes"
  />
  <DataTables
    storePath="salesRapidoContract"
    :loading="false"
    tableName="rapidoTable"
    tableClass="rapido-card-class"
    :tableData="this.deliveryTypes[this.selectedTab?.list_id]?.rates"
    :tableColumns="TableColumnData"
    :removeFilter="true"
    :paginator="false"
  />
  <div class="flex flex-row ml-1 mt-4 mb-4">
    <div
      class="flex"
      :class="
        [
          'base_delivery_fee',
          'cod_fee',
          'cod_fee_percent',
          'minimum_parcels',
          'surcharge',
          'timeslot_delivery',
        ].includes(index) && 'mr-5'
      "
      v-for="(item, index) of RapidoContractOverviewData
        ?.rapido_contract_specifics?.charges"
      :key="index"
    >
      <div
        v-if="
          RapidoContractOverviewData?.rapido_contract_specifics
            ?.rate_card_type == '1' ||
          (RapidoContractOverviewData?.rapido_contract_specifics
            ?.rate_card_type == 'type_1' &&
            [
              'cod_fee',
              'cod_fee_percent',
              'surcharge_min_parcels',
              'surcharge',
              'standard_liability',
              'timeslot_delivery',
            ].includes(index))
        "
        class="flex flex-column"
      >
        <div class="flex color-7e84a7 express-international-table">
          {{ getHeader(index) }}
        </div>
        <div :class="'flex  express-international-table color-66c11e '">
          {{ item }}
        </div>
      </div>
      <div
        v-if="
          RapidoContractOverviewData?.rapido_contract_specifics
            ?.rate_card_type == '2' ||
          (RapidoContractOverviewData?.rapido_contract_specifics
            ?.rate_card_type == 'type_2' &&
            [
              'base_delivery_fee',
              'cod_fee',
              'cod_fee_percent',
              'minimum_parcels',
              'timeslot_delivery',
              'standard_liability',
            ].includes(index))
        "
        class="flex flex-column"
      >
        <div class="flex color-7e84a7 express-international-table">
          {{ getHeader(index) }}
        </div>
        <div :class="'flex  express-international-table color-66c11e '">
          {{ item }}
        </div>
      </div>
    </div>
  </div>

  <div class="card"></div>
</template>

<script>
// import TabWrapper from "./TrioSelect.vue";
import SelectButton from "primevue/selectbutton";
// import Tab from "./Tab.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    // Tab,
    SelectButton,
  },
  data() {
    return {
      selectedTab: null,
      deliveryTypes: [],
      secondRowData: {
        priority: "5",
        previously_served_by: "5",
        referred_by: "10",
        referral_name: "20",
        festival_name: "100",
      },
      TableData: [
        {
          SNo: "1",
          "Size Name": "Small",
          "Weight (Kg)": "0-5",
          "Measurements (Cm)": "0-20",
          "Rates ($)": "10",
        },
        {
          SNo: "2",
          "Size Name": "Medium",
          "Weight (Kg)": "5-10",
          "Measurements (Cm)": "20-40",
          "Rates ($)": "20",
        },
        {
          SNo: "3",
          "Size Name": "Large",
          "Weight (Kg)": "10-15",
          "Measurements (Cm)": "30-50",
          "Rates ($)": "20",
        },
      ],
      TableColumnData: [
        { field: "sl_no", header: "S.no" },
        { field: "size_name", header: "Size Name" },
        { field: "weight", header: "Weight (Kg)" },
        { field: "measurment", header: "Measurements (Cm)" },
        { field: "rates", header: "Rates ($)" },
      ],
    };
  },
  watch: {
    RapidoContractOverviewData() {
      this.setDeliveryRates();
    },
  },
  computed: {
    ...mapGetters({
      RapidoContractOverviewData:
        "salesRapidoContract/RapidoContractOverviewData",
    }),
  },
  methods: {
    getHeader(index) {
      let header;
      switch (index) {
        case "surcharge":
          header = "Surcharge";
          break;
        case "cod_fee":
          header = "COD Fee ($)";
          break;
        case "cod_fee_percent":
          header = "COD Fee (% of cash collected)";
          break;
        case "timeslot_delivery":
          header = "Time Slot Delivery Charge  (+$)";
          break;
        case "minimum_parcels":
          header = "Minimum Parcel";
          break;
        case "surcharge_min_parcels":
          header = "Minimum Parcel";
          break;
        case "standard_liability":
          header = "Standard Liability";
          break;
        case "base_delivery_fee":
          header = "Base Delivery Fee ($)";
          break;
      }
      return header;
    },
    setDeliveryRates() {
      let idxCount = 0;

      this.RapidoContractOverviewData?.rapido_contract_specifics?.delivery_types.map(
        (list) => {
          if (list.selected) {
            this.deliveryTypes.push({
              list_id: idxCount,
              tab: list.delivery_type,
              component: list.delivery_type,
              rates: [],
              ...list,
            });
            list.delivery_size_charge.map((rate, index) => {
              this.deliveryTypes[idxCount].rates.push({
                sl_no: index + 1,
                weight: rate.min_weight_kg + " - " + rate.max_weight_kg,
                measurment: rate.min_measure_kg + " - " + rate.max_measure_kg,
                rates: rate.rates,
                ...rate,
              });
            });
            idxCount++;
          }
        }
      );

      this.selectedTab = this.deliveryTypes[0];
    },
  },
  created() {
    this.setDeliveryRates();
    console.log(this.RapidoContractOverviewData, "data log");
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
::v-deep .card {
  border-radius: 8px !important;
}
.bottom-card-wrap {
  width: 100% !important;
  border-radius: 8px !important;
  padding: 20px !important;
}
.bottom-card-title {
  font-family: $font-family-primary;
  font-size: 18px;
  font-weight: 600;
  line-height: 32px;
  text-align: left;
  color: #1d1d1d;
}
.input-flied {
  border: none !important;
  outline: none !important;
}
.p-dropdown:not(.p-disabled) {
  border: none !important;
  outline: none !important;
}
.p-dropdown:not(.p-disabled):hover {
  border: none !important;
}
.p-dropdown:not(.p-disabled).p-focus {
  border: none !important;
  outline: none !important;
}
::v-deep .p-datatable .p-datatable-thead > tr > th {
  background-color: transparent !important;
  border: none !important;
  font-family: $font-family-primary;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: left;
}

::v-deep .p-column-title {
  color: #1d1d1d;
  font-family: $font-family-primary;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: left;
}
::v-deep .p-datatable.p-datatable-striped .p-datatable-tbody {
  color: #4a5571;

  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
}
::v-deep
  .p-datatable.p-datatable-striped
  .p-datatable-tbody
  > tr:nth-child(even) {
  background-color: transparent !important;
}
</style>
