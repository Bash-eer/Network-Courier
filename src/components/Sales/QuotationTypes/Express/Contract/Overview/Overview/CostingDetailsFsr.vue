<script>
import { mapGetters } from "vuex";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
export default {
  computed: {
    ...mapGetters({
      overview_data: "salesExpressContract/OverviewData",
    }),
  },
  components: {
    DataTable,
    Column,
  },

  data() {
    return {
      products: [],
      product: [],
      first_month: "",
      details: {},
    };
  },

  created() {
    this.details = this.overview_data?.express_contract[0]?.fsr_rates[0];
    this.first_month = this.details?.charge_usage_only
      ? "Charge Usage Only"
      : this.details?.charge_minimum
      ? "Charge Minimum"
      : "";
    this.overview_data?.express_contract[0]?.fsr_rates[0]?.rates.map((i) => {
      this.products.push({
        detail_type: i?.detail_type,
        unit_price: i?.unit_price,
        quantity: i?.quantity,
        amount: i?.amount,
        description: i?.description,
      });
    });
    this.overview_data?.express_contract[0]?.fsr_rates[0]?.first_month_rates.map(
      (i) => {
        this.product.push({
          detail_type: i?.detail_type,
          unit_price: i?.unit_price,
          quantity: i?.quantity,
          amount: i?.amount,
          description: i?.description,
        });
      }
    );
  },
};
</script>

<template>
  <div v-if="this.overview_data?.express_contract[0]?.fsr === true">
    <p class="mt-2 van">FSR</p>
    <div class="card mb-4">
      <DataTable
        :value="products"
        class="p-datatable-sm"
        responsiveLayout="scroll"
      >
        <template #header>
          <div class="flex justify-content-between">
            <div class="express-contract-van-fsr-costing-details-trip-schedule">
              FSR
            </div>
          </div>
        </template>

        <template class="flex">
          <Column field="detail_type" header="Detail Type"></Column>
          <Column field="unit_price" header="Unit Price"></Column>
          <Column field="quantity" header="Quantity"></Column>
          <Column field="amount" header="Amount"></Column>
          <Column field="description" header="Description"></Column>
        </template>
      </DataTable>
    </div>

    <div class="card mb-4">
      <DataTable
        :value="product"
        class="p-datatable-sm"
        responsiveLayout="scroll"
      >
        <template #header>
          <div class="flex justify-content-between">
            <div class="express-contract-van-fsr-costing-details-trip-schedule">
              First Month ( {{ first_month }} )
            </div>
          </div>
        </template>

        <template class="flex">
          <Column field="detail_type" header="Detail Type"></Column>
          <Column field="unit_price" header="Unit Price"></Column>
          <Column field="quantity" header="Quantity"></Column>
          <Column field="amount" header="Amount"></Column>
          <Column field="description" header="Description"></Column>
        </template>
      </DataTable>
    </div>
  </div>
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