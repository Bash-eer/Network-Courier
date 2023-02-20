<template>
  <div class="flex flex-wrap justify-content-between">
    <div class="flex">
      <span class="van-costing-details-header">Costing Details</span>
    </div>
    <div @click="toggle" class="flex pointer">
      <i class="pi pi-ellipsis-v mt-2"></i>
    </div>
    <OverlayPanel
      ref="op"
      :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
      style="width: 190px"
    >
      <div class="flex flex-column flex-wrap">
        <div class="flex my-1 menuDivs">
          <div class="flex flex-row cursor-pointer" @click="editDialog">
            <div class="flex align-items-center justify-content-center mr-2">
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
  <hr class="van-costing-details-horizontal-line" />
  <div>
    <div class="sub-title">Bike</div>
    <div class="flex flex-row flex-wrap ml-1 mt-2 mb-4">
      <div
        v-for="(item, index) of CostingDetailsData"
        :class="index != CostingDetailsData.length - 1 ? 'flex mr-6' : 'flex'"
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
            <span
              v-if="
                index == 'standard_liability' ||
                index == 'additional_jobs' ||
                index == 'time_slot_delivery_charge' ||
                index == 'job'
              "
            >
              {{ item }} $</span
            >
            <span v-else>{{ item }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="highlight-row ml-1 mt-3 mb-2">
      <div class="flex">
        <div class="effective-txt mb-2">Estimated Start Date (Tentative):</div>
        <div class="effective-data ml-2">
          {{
            dateFormater(
              this.quotationData.express_contract[0].bike.settings
                .estimated_start_date
            )
          }}
        </div>
      </div>
      <div class="flex flex-row flex-wrap">
        <div
          v-if="
            this.quotationData?.express_contract[0]?.bike?.settings?.first_month
          "
          class="first-month mr-3"
        >
          First Month
        </div>
        <div
          v-for="(item, index) of CostingDetailsDataOne"
          class="flex flex-wrap"
          :key="index"
        >
          <div
            v-if="index !== 'effective_start_date'"
            class="flex"
            :class="index !== 'charge_min' && 'ml-4'"
          >
            <div class="flex van-costing-details-detailsText mr-2 flex-wrap">
              {{ getHeaderOne(index) }}:
            </div>
            <div
              :class="
                item != 'High'
                  ? 'flex flex-wrap van-costing-details-detailsText van-costing-details-valuesText'
                  : 'flex  flex-wrap van-costing-details-detailsText van-costing-details-priorityText'
              "
            >
              <span v-if="index == 'amount'">${{ item }} </span>
              <span v-else>{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <div class="sub-title">FSR</div>
    <div class="flex flex-row flex-wrap ml-1 mt-2 mb-4">
      <div
        v-for="(item, index) of FSRDetailsOne"
        :class="index != FSRDetailsOne.length - 1 ? 'flex mr-6' : 'flex'"
        :key="index"
      >
        <div class="flex flex-column">
          <div class="flex van-costing-details-detailsText flex-wrap">
            {{ FSRDetailsHeaderOne(index) }}
          </div>
          <div
            :class="
              item != 'High'
                ? 'flex flex-wrap van-costing-details-detailsText van-costing-details-valuesText'
                : 'flex  flex-wrap van-costing-details-detailsText van-costing-details-priorityText'
            "
          >
            <span
              v-if="
                index == 'standard_liability' ||
                index == 'additional_jobs' ||
                index == 'time_slot_delivery_charge' ||
                index == 'job'
              "
            >
              {{ item }} $</span
            >
            <span v-else>{{ item }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="highlight-row ml-1 mt-3 mb-4">
      <div class="flex">
        <div class="flex">
          <div class="effective-txt mb-2">
            Effective Start Date (Tentative):
          </div>
          <div class="effective-data ml-2">
            {{
              dateFormater(
                this.quotationData?.express_contract[0]?.fsr?.settings
                  ?.estimated_start_date
              )
            }}
          </div>
        </div>
        <div class="flex ml-4">
          <div class="effective-txt mb-2">Effective End Date (Tentative):</div>
          <div class="effective-data ml-2">
            {{
              dateFormater(
                this.quotationData?.express_contract[0]?.fsr?.settings
                  ?.estimated_end_date
              )
            }}
          </div>
        </div>
      </div>

      <div class="flex flex-row flex-wrap">
        <div
          v-if="
            this.quotationData?.express_contract[0]?.bike?.settings?.first_month
          "
          class="first-month mr-3"
        >
          First Month
        </div>
        <div
          v-for="(item, index) of FSRDetailsTwo"
          class="flex flex-wrap"
          :key="index"
        >
          <div
            v-if="
              index !== 'effective_start_date' && index !== 'effective_end_date'
            "
            class="flex"
            :class="index !== 'minimum_quantity' && 'ml-4'"
          >
            <div class="flex van-costing-details-detailsText mr-2 flex-wrap">
              {{ FSRDetailsHeaderTwo(index) }} :
            </div>
            <div
              :class="
                item != 'High'
                  ? 'flex flex-wrap van-costing-details-detailsText van-costing-details-valuesText'
                  : 'flex  flex-wrap van-costing-details-detailsText van-costing-details-priorityText'
              "
            >
              <span v-if="index == 'amount'">${{ item }} </span>
              <span v-else>{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <DataTable
      :value="products"
      class="p-datatable-sm"
      responsiveLayout="scroll"
    >
      <template #header>
        <div class="van-costing-details-trip-schedule">Trip Schedule</div>
      </template>
      <template #empty><div class="">No data found.</div></template>

      <template class="flex">
        <Column field="trip_no" header="Trip Name">
          <template #body="slotProps">
            {{ slotProps.data?.trip_no || "-" }}
          </template>
        </Column>
        <Column field="from_time" header="From">
          <template #body="slotProps">
            {{ timeFormater(slotProps.data?.from_time) || "-" }}
          </template></Column
        >
        <Column field="to_time" header="To">
          <template #body="slotProps">
            {{ timeFormater(slotProps.data?.to_time) || "-" }}
          </template></Column
        >
        <Column field="trip_days" header="Trip Days">
          <template #body="slotProps">
            {{ slotProps.data?.trip_days || "-" }}
          </template></Column
        >
        <Column field="trip_type" header="Trip Type">
          <template #body="slotProps">
            {{ slotProps.data?.trip_type || "-" }}
          </template></Column
        >
      </template>
    </DataTable>
  </div>

  <div class="flex flex-column ml-1 mt-3 mb-4">
    <div class="flex van-costing-details-detailsText mb-2">Remarks</div>
    <div class="flex">
      <div class="van-costing-details-grey-wrapper-regular p-2">
        <p class="costing-details-remarks-text">
          {{ this.quotationData?.remarks }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import OverlayPanel from "primevue/overlaypanel";

export default {
  name: "CostingDetails",
  props: ["IncomingData"],
  components: {
    DataTable,
    Column,
    OverlayPanel,
  },

  data() {
    return {
      CostingDetailsData: {
        no_of_units: "",
        job: "",
        amount: "",
        additional_jobs: "",
        billing_cycle: "",
      },
      CostingDetailsDataOne: {
        effective_start_date: "",
        charge_min: "",
        amount: "",
      },
      FSRDetailsOne: {
        detail_type: "",
        unit_price: "",
        amount: "",
        quantity: "",
        description: "",
      },
      FSRDetailsTwo: {
        effective_start_date: "",
        effective_end_date: "",
        minimum_quantity: "",
        amount: "",
      },
      products: [],
    };
  },
  watch: {
    quotationData() {
      this.getValues();
    },
  },
  computed: {
    ...mapGetters({
      quotationData: "salesExpressContractBikeFSR/quotationData",
    }),
  },
  methods: {
    ...mapActions({
      setQuotationDataBikeFSR: "salesExpressContractBikeFSR/setQuotationData",
      setCurrentStep: "salesExpressContractBikeFSR/setCurrentStep",
    }),
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    async editDialog() {
      await this.setQuotationDataBikeFSR({
        type: this.$route.params.type,
        id: this.$route.params.id,
      });
      this.setCurrentStep(4);
      this.$store.dispatch("salesSales/openDialog", {
        dialogDetails: {
          dialogName: "ExpressContractBikeFSRQuotationDialog",
          dialogHeader: "Edit",
        },
      });
      this.$store.getters["salesSales/controlActivityDialog"];
    },
    dateFormater(data) {
      let formattedDate = moment(data).format("DD MMM YYYY");

      if (formattedDate == "Invalid date") {
        return "-";
      } else {
        return formattedDate;
      }
    },
    timeFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).local().format("hh:mm");
        return formattedDate;
      }
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
        case "no_of_units":
          header = "No of Units";
          break;
        case "amount":
          header = "Amount";
          break;
        case "billing_cycle":
          header = "Billing Cycle";
          break;
      }
      return header;
    },
    getHeaderOne(index) {
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
    FSRDetailsHeaderOne(index) {
      let header;
      switch (index) {
        case "detail_type":
          header = "Detail Type";
          break;
        case "unit_price":
          header = "Unit Price";
          break;
        case "amount":
          header = "Amount";
          break;
        case "quantity":
          header = "Quantity";
          break;
        case "description":
          header = "Description";
          break;
      }
      return header;
    },
    FSRDetailsHeaderTwo(index) {
      let header;
      switch (index) {
        case "effective_start_date":
          header = "Effective Start Date (Tentative)";
          break;
        case "effective_end_date":
          header = "Effective End Date (Tentative)";
          break;
        case "amount":
          header = "Amount";
          break;
        case "minimum_quantity":
          header = "Minimum Quantity";
          break;
      }
      return header;
    },

    getValues() {
      // console.log(this.quotationData, "quotationData")
      this.CostingDetailsData["no_of_units"] =
        this.quotationData?.express_contract[0]?.bike?.no_of_units || "-";
      this.CostingDetailsData["job"] =
        this.quotationData?.express_contract[0]?.bike?.per_job || "-";
      this.CostingDetailsData["amount"] =
        this.quotationData?.express_contract[0]?.bike?.amount || "-";
      this.CostingDetailsData["additional_jobs"] =
        this.quotationData?.express_contract[0]?.bike?.additional_job || "-";
      this.CostingDetailsData["billing_cycle"] =
        this.quotationData?.express_contract[0]?.bike?.billing_cycle || "-";

      this.CostingDetailsDataOne["effective_start_date"] =
        this.quotationData?.express_contract[0]?.bike?.settings
          ?.estimated_start_date || "-";
      this.CostingDetailsDataOne["charge_min"] =
        this.quotationData?.express_contract[0]?.bike?.settings
          ?.minimum_quantity || "-";
      this.CostingDetailsDataOne["amount"] =
        this.quotationData?.express_contract[0]?.bike?.settings?.amount || "-";

      this.products = this.quotationData?.express_contract[0]?.trips;

      this.FSRDetailsOne["detail_type"] =
        this.quotationData?.express_contract[0]?.fsr?.settings?.detail_type ||
        "-";
      this.FSRDetailsOne["unit_price"] =
        this.quotationData?.express_contract[0]?.fsr?.settings?.unit_price ||
        "-";
      this.FSRDetailsOne["amount"] =
        this.quotationData?.express_contract[0]?.fsr?.settings?.amount || "-";
      this.FSRDetailsOne["description"] =
        this.quotationData?.express_contract[0]?.fsr?.settings?.description ||
        "-";
      this.FSRDetailsOne["quantity"] =
        this.quotationData?.express_contract[0]?.fsr?.settings?.quantity || "-";

      this.FSRDetailsTwo["effective_start_date"] =
        this.quotationData?.express_contract[0]?.fsr?.settings
          ?.effective_start_date || "-";
      this.FSRDetailsTwo["effective_end_date"] =
        this.quotationData?.express_contract[0]?.fsr?.settings
          ?.effective_end_date || "-";
      this.FSRDetailsTwo["minimum_quantity"] =
        this.quotationData?.express_contract[0]?.fsr?.settings?.quantity || "-";
      this.FSRDetailsTwo["amount"] =
        this.quotationData?.express_contract[0]?.fsr?.settings?.amount || "-";
    },
  },
  created() {
    this.getValues();
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

::v-deep .pi-ellipsis-v {
  color: black !important;
}
::v-deep .p-overlaypanel-flipped:after {
  bottom: 0px !important;
  top: 0px !important;
}

.sub-title {
  color: #357dea;
  font-size: 16px;
  padding-top: 10px;
}

.highlight-row {
  background: #f3f7ff;
  border: 1px solid rgba(126, 132, 167, 0.3);
  border-radius: 8px;
  width: 100%;
  padding: 15px;
}

.effective-txt {
  color: #7e84a7;
  font-size: 14px;
  font-weight: 600;
}

.effective-data {
  color: #66c11e;
  font-size: 14px;
  font-weight: 600;
}

.first-month {
  color: #4e5968;
  font-weight: 600;
  font-size: 12px;
}
</style>
