<template>
  <div
    class="
      mb-2
      color-343434
      font-size-12
      line-height-15
      bold-600
      letter-spacing-003
    "
  >
    Profile
  </div>

  <DataTable :value="products" class="p-datatable-sm" responsiveLayout="scroll">
    <template #header>
      <div class="justify-content-between flex">
        <div class="flex md:mr-2 mr-6">
          <p class="col color-4e5968 font-size-16 line-height-20 bold-600">
            Quotation ({{
              this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData
                ?.express_adhoc_specifics?.bike == true
                ? "Bike"
                : "Van"
            }})
          </p>
        </div>
        <div class="justify-content-center align-items-center flex">
          <!-- <div class="col pt-0"><i class="pi pi-ellipsis-v">edit</i></div> -->

          <div
            v-if="$route.params.mode != 'history'"
            @click="toggle"
            class="flex pointer"
          >
            <i class="pi pi-ellipsis-v mt-2"></i>
          </div>
          <OverlayPanel
            ref="op"
            :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
            style="width: 190px"
            v-if="$route.params.mode != 'history'"
          >
            <div class="flex flex-column flex-wrap">
              <div class="flex my-1 menuDivs">
                <div class="flex flex-row cursor-pointer" @click="editDialog">
                  <div
                    class="flex align-items-center justify-content-center mr-2"
                  >
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
      </div>

      <Tabel tableClass="sample" />

      <div v-if="products.length">
        <DataTable
          :value="products"
          class="p-datatable-sm"
          responsiveLayout="scroll"
        >
          <template class="flex">
            <Column field="delivery_type" header="Delivery Type"
              ><template #body="slotProps">
                {{
                  timeFormater(slotProps.data.delivery_type) == ""
                    ? "_"
                    : timeFormater(slotProps.data.delivery_type)
                }}
              </template></Column
            >
            <Column field="collect_time" header="Collection Time">
              <template #body="slotProps">
                {{ timeFormater(slotProps.data.collect_time) }}
              </template>
            </Column>
            <Column field="cut_off_time" header="Cut Off Time">
              <template #body="slotProps">
                {{ timeFormater(slotProps.data.cut_off_time) }}
              </template></Column
            >
            <Column field="cut_off_days_count" header="Cut Off Days"> </Column>
            <Column field="net_charges" header="Net Charges">
              <template #body="slotProps">
                <div class="color-66c11e">
                  $ {{ slotProps.data.net_charges }}
                </div>
              </template>
            </Column>
          </template>
        </DataTable>
      </div>

      <div v-if="charge.length">
        <div>
          <DataTable
            :value="charge"
            class="p-datatable-sm"
            responsiveLayout="scroll"
          >
            <template class="flex">
              <Column field="charge_name" header="Charge Name"></Column>
              <Column field="rate" header="Net Charges">
                <template #body="slotProps">
                  <div class="color-66c11e">$ {{ slotProps.data.rate }}</div>
                </template>
              </Column>
            </template>
          </DataTable>
        </div>
      </div>
    </template>
  </DataTable>

  <div class="flex flex-column ml-1 mt-3 mb-4">
    <div class="flex color-7e84a7 font-size-12 express-international-font mb-2">
      Remarks
    </div>
    <div class="flex">
      <div
        class="
          express-adhoc-costing-profile-grey-wrapper-regular
          border-radius-8
          bg-f3f7ff
          p-2
        "
      >
        <p class="color-4e5968 line-height-18 express-international-table">
          {{ $store.state.salesExpressAdhoc.ExpressAdhocOverviewData.remarks }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tabel from "../OverView/ProfileTable.vue";
import OverlayPanel from "primevue/overlaypanel";
import moment from "moment";
import { mapActions } from "vuex";
export default {
  components: {
    DataTable,
    Column,
    Tabel,
    OverlayPanel,
  },

  data() {
    return {
      products: [],
      charge: [],
    };
  },
  methods: {
    ...mapActions({
      loadExpressAdhocRowData: "salesExpressAdhoc/loadExpressAdhocRowData",
    }),
    timeFormater(data) {
      if (!data) return "-";
      let date = moment(data).utc().format("hh:mm");
      if (date === "Invalid date") {
        return data;
      } else {
        return date;
      }
    },

    toggle(event) {
      this.$refs.op.toggle(event);
    },

    async editDialog() {
      await this.loadExpressAdhocRowData(this.$route.params.id);

      this.$store.dispatch("salesSales/openDialog", {
        dialogDetails: {
          dialogName: "ExpressContractAdhocQuotationDialog",
          dialogHeader: "Edit Express Adhoc",
        },
      });
      this.$store.getters["salesSales/controlActivityDialog"];
    },
  },
  async created() {
    await this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData?.express_adhoc_specifics?.delivery_charges.map(
      (item) => {
        this.products.push({
          delivery_type: item.delivery_type,
          collect_time: item.collect_time,
          cut_off_time: item.cut_off_time,
          cut_off_days_count: item.cut_off_days_count,
          net_charges: item.net_charges,
        });
      }
    );
    await this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData?.express_adhoc_specifics?.normal_charges.map(
      (item) => {
        this.charge.push({
          charge_name: item.charge_name,
          rate: item.rate,
          adhoc_qotation_id: item.adhoc_qotation_id,
        });
      }
    );
  },

  watch: {
    "$store.state.salesExpressAdhoc.ExpressAdhocOverviewData": function () {
      this.sales = this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData;

      this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData?.express_adhoc_specifics?.delivery_charges.map(
        (item) => {
          this.products.push({
            delivery_type: item.delivery_type,
            collect_time: item.collect_time,
            cut_off_time: item.cut_off_time,
            cut_off_days_count: item.cut_off_days_count,
            net_charges: item.net_charges,
          });
        }
      );

      this.charge_name = [];

      this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData?.express_adhoc_specifics?.normal_charges.map(
        (item) => {
          this.charge.push({
            charge_name: item.charge_name,
            rate: item.rate,
            adhoc_qotation_id: item.adhoc_qotation_id,
          });
        }
      );
    },
  },

  unmounted() {
    this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData.express_adhoc_specifics.normal_charges =
      [];
    this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData.express_adhoc_specifics.delivery_charges =
      [];
  },
};
</script>

<style lang="scss" scoped>
.express-adhoc-costing-profile-grey-wrapper-regular {
  border: 1px solid rgba(126, 132, 167, 0.3);
  height: 25%;
  width: 100%;
}
::v-deep.p-datatable.p-datatable-sm .p-datatable-header {
  background-color: #f3f7ff !important;
  border: 1px dashed #acb5c1 !important;
  border-style: dashed !important;
  border-radius: 6px !important;
}
.p-datatable {
  padding: 10px;
  background-color: #f3f7ff;
}

.p-datatable[data-v-02e7ee63] {
  padding: 20px;
}
::v-deep.p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
  background-color: #ffff;
  padding: 15px;
}

::v-deep.p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {
  padding: 15px !important;
}

::v-deep.p-datatable .p-column-header-content {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  align-items: center;
  letter-spacing: 0.03em;
  color: #7e84a7;
  opacity: 0.9;
}
::v-deep.field {
  margin-bottom: 0;
}
</style>
