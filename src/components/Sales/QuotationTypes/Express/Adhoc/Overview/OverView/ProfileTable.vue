<template>
  <div v-if="sales.length">
    <Buttons
      label="SendQuotation"
      button_class="sent-button"
      v-on:childToParent="sendQuotationhandler()"
    />
    <DataTable :value="sales" responsiveLayout="scroll" :class="tableClass">
      <div class="datatabel">
        <Column field="weight" header="Weight In kgs"></Column>
        <Column field="lwh" header="L/W/H (cm)"></Column>
        <Column field="quotation_send" header="Quotation Send to"></Column>
      </div>
    </DataTable>
  </div>

  <div v-if="bike.length">
    <Buttons
      label="SendQuotation"
      button_class="sent-button"
      v-on:childToParent="sendQuotationhandler()"
    />
    <DataTable :value="bike" responsiveLayout="scroll" :class="tableClass">
      <div class="datatabel">
        <Column field="from" header="From"></Column>
        <Column field="to" header="To"></Column>
        <Column field="cost" header="Cost">
          <template #body="slotProps">
            Net Charges SGD $ {{ slotProps.data.cost }}
          </template></Column
        >
        <Column field="quotation_send" header="Quotation Send to"></Column>
      </div>
    </DataTable>
  </div>
  <Toasts
    :severity="$store.state['salesCommon'].toastData.severity"
    :summary="$store.state['salesCommon'].toastData.summary"
  />
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import axios from "axios";
import Toasts from "../../../../Common/Toast.vue";
const { URL } = require("../../../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
export default {
  components: {
    DataTable,
    Column,
    Toasts,
  },
  props: ["tableClass"],

  data() {
    return {
      sales: [],
      bike: [],
    };
  },
  methods: {
    sendQuotationhandler() {
      let second =
        this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData.contacts.map(
          (i) => {
            return i.id;
          }
        );

      this.$store.dispatch("salesCommon/POSTPATCHCRUDOPERATION", {
        path: "/sales/quotations/send/" + this.$route.params.id,
        method: "POST",
        id: this.$route.params.id,
        loadDiffStore: true,
        data: {
          send_to: [Number(second[0])],
        },
        toastData: {
          toastSuccessData: {
            toastMsg: `The quotation is sent to mail successfully!`,
            toastSeverity: "info",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in activating contract, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
  },
  watch: {
    "$store.state.salesExpressAdhoc.ExpressAdhocOverviewData":
      async function () {
        this.sales =
          this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData;
        this.$store.dispatch("salesExpressAdhoc/loadSalesPersonDataPatch", {
          path: "/sales/profiles/",
          id: this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData
            .profile_id,
        });

        if (
          this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData
            .express_adhoc_specifics.weight
        ) {
          let first = [
            this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData,
          ];
          let second =
            this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData.contacts.map(
              (i) => {
                return i.email;
              }
            );
          this.sales = [];

          await first.map((i) => {
            this.sales.push({
              weight: i.express_adhoc_specifics.weight,
              lwh:
                i.express_adhoc_specifics.length +
                "/" +
                i.express_adhoc_specifics.width +
                "/" +
                i.express_adhoc_specifics.height,
              quotation_send: second[0],
            });
          });
        } else {
          let first = [
            this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData,
          ];

          let second =
            this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData.contacts.map(
              (i) => {
                return i.email;
              }
            );

          this.bike = [];

          await first.map((i) => {
            this.bike.push({
              from: i.express_adhoc_specifics.from_postal_code,
              to: i.express_adhoc_specifics.to_postal_code,
              cost: i.express_adhoc_specifics.total_charges,
              quotation_send: second[0],
            });
          });
        }
      },
  },
  async created() {
    this.sales = this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData;
    await this.$store.dispatch("salesRapidoAdhoc/loadSalesPersonData", {
      path: "/settings/user/dropdown?role=Sales Person",
    });

    // await this.$store.state.salesExpressAdhoc.ExpressAdhocOverviewData?.express_adhoc_specifics?.delivery_charges.map(
    //   (item) => {
    //     this.sales.push({
    //       delivery_type: item.delivery_type,
    //       collect_time: item.collect_time,
    //       cut_off_time: item.cut_off_time,
    //       cut_off_days_count: item.cut_off_days_count,
    //       net_charges: item.net_charges,
    //     });
    //   }
    // );
  },
};
</script>

<style scoped>
::v-deep.p-button {
  background-color: #7469f2;
  border: none;
  margin-left: 1000px;
}
::v-deep.p-button:enabled:hover {
  background-color: #7469f2;
  border: none;
}

::v-deep.p-datatable.p-datatable-sm .p-datatable-header {
  background-color: #f3f7ff !important;
  border: none !important;
}
.p-datatable {
  padding: 10px;
  background-color: #f3f7ff;
}
::v-deep.p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
  background-color: #ffff !important;
  padding: 15px !important;
  border-radius: 5px;
}
::v-deep.p-datatable .p-datatable-thead > tr > th {
  border: 0px solid #e9ecef !important;
  border-width: 0 0 0 0 !important;
}
.sample.p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {
  padding: 15px !important;
  color: green;
}

::v-deep.field {
  margin-bottom: 0;
}

.action {
  padding-top: 0 !important;
}

::v-deep.p-datatable .p-datatable-tbody > tr > td {
  border: none !important;
}
::v-deep.p-datatable-responsive-scroll > .p-datatable-wrapper {
  border-radius: 8px;
}
.sent-button {
  position: absolute;
  right: 50px;
  z-index: 1;
  top: 125px;
  min-width: 140px !important;
}
</style>
