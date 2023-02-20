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
          <p class="col color-212121 font-size-16 line-height-20 bold-600">
            Quotation
          </p>
        </div>
        <div
          v-if="$route.params.mode != 'history'"
          class="justify-content-center align-items-center flex"
        >
          <div class="col pt-0">
            <div class="flex">
              <CustomSpeedDial
                storePath="salesSales"
                :dataName="tableDataName"
                :customDialData="RapidoAdhocOverlay"
                :apiKey="apiKey"
                tableName="ClearanceModeTabOverlay"
              />
            </div>
          </div>
        </div>
      </div>

      <Tabel tableClass="sample" />

      <DataTable
        :value="products"
        class="p-datatable-sm"
        responsiveLayout="scroll"
        v-if="
          RapidoAdhocOverviewData?.rapido_adhoc_specifics?.delivery_charges
            .length > 0
        "
      >
        <template class="flex">
          <Column
            field="delivery_type"
            header="Delivery Type"
            template=""
          ></Column>
          <Column field="collection_time" header="Collection Time">
            <template #body="slotProps">
              {{ timeFormater(slotProps.data.collection_time) }}
            </template>
          </Column>
          <Column field="cut_off_time" header="Cut Off Time">
            <template #body="slotProps">
              {{ timeFormater(slotProps.data.cut_off_time) }}
            </template></Column
          >
          <Column field="cut_off_days" header="Cut Off Days"> </Column>
          <Column field="net_charges" header="Net Charges">
            <template #body="slotProps">
              <div class="color-66c11e">$ {{ slotProps.data.net_charges }}</div>
            </template>
          </Column>
        </template>
      </DataTable>
    </template>
  </DataTable>

  <div class="flex flex-column ml-1 mt-3 mb-4">
    <div class="flex color-7e84a7 font-size-12 express-international-font mb-2">
      Remarks
    </div>
    <div class="flex">
      <div
        class="
          rapido-adhoc-costing-profile-grey-wrapper-regular
          border-radius-8
          bg-f3f7ff
          p-2
        "
      >
        <p class="color-4e5968 line-height-18 express-international-table">
          {{ RapidoAdhocOverviewData.remarks }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tabel from "../Overview/ProfileTable.vue";
import moment from "moment";
import CustomSpeedDial from "../../CustomSpeedDial";
import { mapGetters } from "vuex";
export default {
  components: {
    DataTable,
    Column,
    Tabel,
    CustomSpeedDial,
  },
  computed: {
    ...mapGetters({
      RapidoAdhocOverviewData: "salesRapidoAdhoc/RapidoAdhocOverviewData",
    }),
  },
  data() {
    return {
      products: [],
      RapidoAdhocOverlay: [{ label: "Edit", icon: "fas fa-pen" }],
    };
  },
  methods: {
    timeFormater(data) {
      if (!data) return "-";
      let date = moment(data).utc().format("hh:mm");
      if (date === "Invalid date") {
        return data;
      } else {
        return date;
      }
    },
  },
  watch: {
    "$store.state.salesRapidoAdhoc.RapidoAdhocOverviewData": function () {
      this.products = [];

      this.$store.state.salesRapidoAdhoc.RapidoAdhocOverviewData?.rapido_adhoc_specifics?.delivery_charges.map(
        (item) => {
          this.products.push({
            delivery_type: item.delivery_type,
            collection_time: item.collect_time,
            cut_off_time: item.cut_off_time,
            cut_off_days: item.cut_off_days_count,
            net_charges: item.net_charges,
          });
        }
      );
    },
  },
  created() {
    this.products = [];
    this.$store.state.salesRapidoAdhoc.RapidoAdhocOverviewData?.rapido_adhoc_specifics?.delivery_charges.map(
      (item) => {
        this.products.push({
          delivery_type: item.delivery_type,
          collection_time: item.collect_time,
          cut_off_time: item.cut_off_time,
          cut_off_days: item.cut_off_days_count,
          net_charges: item.net_charges,
        });
      }
    );
  },
};
</script>

<style lang="scss" scoped>
.rapido-adhoc-costing-profile-grey-wrapper-regular {
  border: 1px solid rgba(126, 132, 167, 0.3);
  border-radius: 8px;
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
