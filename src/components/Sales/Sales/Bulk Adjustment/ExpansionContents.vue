<template>
  <div class="p-1 mt-2 mb-6">
    <DuoSelection
      :options="[
        'Normal',
        'E-Commerce',
        'Follow Up',
        'Revisions',
        'Attachments',
      ]"
      :default="defaultTransportType"
      type="setRegionDeliveryTransportType"
      class="mb-4"
    />
    <!-- Normal -->
    <div v-if="defaultTransportType == 'Normal'">
      <div class="flex flex-row flex-wrap ml-1 mt-4 mb-4">
        <div
          v-for="(item, index) of normalData"
          :class="index != normalData.length - 1 ? 'flex mr-6' : 'flex'"
          :key="index"
        >
          <div class="flex flex-column">
            <div class="flex van-costing-details-detailsText flex-wrap">
              {{ getNormalHeader(index) }}
            </div>
            <div
              :class="
                item != 'High'
                  ? 'flex flex-wrap van-costing-details-detailsText van-costing-details-valuesText'
                  : 'flex  flex-wrap van-costing-details-detailsText van-costing-details-priorityText'
              "
            >
              <span v-if="index == 'per_job' || index == 'additional_jobs'">
                {{ item }} $</span
              >
              <span v-else>{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- E-commerce -->
    <div v-if="defaultTransportType == 'E-Commerce'">
      <span class="bold-600 font-size-16 color-4e5868">Same Day Delivery</span>
      <div class="flex flex-row flex-wrap ml-1 mt-4 mb-4">
        <div
          v-for="(item, index) of ecommereceSameDayData"
          :class="
            index != ecommereceSameDayData.length - 1 ? 'flex mr-6' : 'flex'
          "
          :key="index"
        >
          <div class="flex flex-column">
            <div class="flex van-costing-details-detailsText flex-wrap">
              {{ getNormalHeader(index) }}
            </div>
            <div
              :class="
                item != 'High'
                  ? 'flex flex-wrap van-costing-details-detailsText van-costing-details-valuesText'
                  : 'flex  flex-wrap van-costing-details-detailsText van-costing-details-priorityText'
              "
            >
              <span v-if="index == 'per_job' || index == 'additional_jobs'">
                {{ item }} $</span
              >
              <span v-else>{{ item }}</span>
            </div>
          </div>
        </div>
      </div>

      <span class="bold-600 font-size-16 color-4e5868">Next Day Delivery</span>
      <div class="flex flex-row flex-wrap ml-1 mt-4 mb-4">
        <div
          v-for="(item, index) of ecommereceNextDayData"
          :class="
            index != ecommereceNextDayData.length - 1 ? 'flex mr-6' : 'flex'
          "
          :key="index"
        >
          <div class="flex flex-column">
            <div class="flex van-costing-details-detailsText flex-wrap">
              {{ getNormalHeader(index) }}
            </div>
            <div
              :class="
                item != 'High'
                  ? 'flex flex-wrap van-costing-details-detailsText van-costing-details-valuesText'
                  : 'flex  flex-wrap van-costing-details-detailsText van-costing-details-priorityText'
              "
            >
              <span v-if="index == 'per_job' || index == 'additional_jobs'">
                {{ item }} $</span
              >
              <span v-else>{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Follow Up -->
    <div v-if="defaultTransportType == 'Follow Up'">
      <ExpansionSubTable
        tableClass="p-datatable-sm QuotationTabSubTable w-100"
        tableDataName="QuotationTabData"
        tableName="QuotationTabSubTable"
        :tableData="followUpTableData"
        :tableColumns="
          // $store.state['salesSales']['quotationSubTableColumnData']
          followUpColumnData
        "
        dataKey="id"
      />
    </div>
    <!-- Revisions -->
    <div v-if="defaultTransportType == 'Revisions'">
      Revisions
      <ExpansionSubTable
        tableClass="p-datatable-sm QuotationTabSubTable w-100"
        tableDataName="QuotationTabData"
        tableName="QuotationTabSubTable"
        :selectionModeState="selectionModeState"
        :tableData="revisionsTableData"
        :tableColumns="
          // $store.state['salesSales']['quotationSubTableColumnData']
          revisionsColumnData
        "
        dataKey="id"
        storePath="salesQuotationDialog"
      />
    </div>
    <!-- Attachments -->
    <div v-if="defaultTransportType == 'Attachments'">Attachments</div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";
import DuoSelection from "./DuoSelect.vue";
import ExpansionSubTable from "./QuotationSubTable.vue";

export default {
  name: "SalesExpressContractBikeProjectJobsThirdStep",
  components: { DuoSelection, ExpansionSubTable },
  data: () => ({
    selectionModeState: null,
    normalData: {
      no_of_jobs: "",
      per_job: "",
      amount: "",
      additional_jobs: "",
      billing_cycle: "",
      remarks: "",
    },
    ecommereceSameDayData: {
      no_of_jobs: "",
      per_job: "",
      amount: "",
      additional_jobs: "",
      billing_cycle: "",
      remarks: "",
    },
    ecommereceNextDayData: {
      no_of_jobs: "",
      per_job: "",
      amount: "",
      additional_jobs: "",
      billing_cycle: "",
      remarks: "",
    },

    revisionsTableData: [
      {
        id: "1",
        profile_name: "DHL 003",
        sales_person: "Adhoc",
        effective_on: "2021-12-06T09:14:39.228Z",
        created_on: "2021-12-06T09:14:39.228Z",
        attachments: "Lorem Ipsum Doret Dexir auvoir",
        preview: "aaaa",
        initial_doc: "No.1 Second Chin Bee ",
        revised_doc: "238801",
      },
      {
        id: "3",
        profile_name: "DHL 003",
        sales_person: "Adhoc",
        effective_on: "2021-12-06T09:14:39.228Z",
        created_on: "2021-12-06T09:14:39.228Z",
        attachments: "Lorem Ipsum Doret Dexir auvoir",
        preview: "aaaa",
        initial_doc: "No.1 Second Chin Bee ",
        revised_doc: "238801",
      },
      {
        id: "2",
        profile_name: "DHL 003",
        sales_person: "Adhoc",
        effective_on: "2021-12-06T09:14:39.228Z",
        created_on: "2021-12-06T09:14:39.228Z",
        attachments: "Lorem Ipsum Doret Dexir auvoir",
        preview: "aaaa",
        initial_doc: "No.1 Second Chin Bee ",
        revised_doc: "238801",
      },
    ],

    revisionsColumnData: [
      { field: "id", header: "S.No" },
      { field: "Actions", header: "Actions" },
      { field: "profile_name", header: "Profile Name" },
      { field: "sales_person", header: "Sales Person" },
      { field: "effective_on", header: "Effective On" },
      { field: "created_on", header: "Created on" },
      { field: "attachments", header: "Attachemnts" },
      { field: "initial_doc", header: "Initial Doc" },
      { field: "revised_doc", header: "Revised Doc" },
      // { field: "trip_days", header: "Created On" },
    ],

    followUpTableData: [
      {
        id: "1",
        sales_person: "Adhoc",
        call_type: "2021-12-06T09:14:39.228Z",
        created_on: "2021-12-06T09:14:39.228Z",
        attachments: "Lorem Ipsum Doret Dexir auvoir",
        subject: "aaaa",
        contacts: "No.1 Second Chin Bee ",
        discussion: "238801",
        date_time: "12:00PM",
      },
      {
        id: "2",
        sales_person: "Adhoc",
        call_type: "2021-12-06T09:14:39.228Z",
        created_on: "2021-12-06T09:14:39.228Z",
        attachments: "Lorem Ipsum Doret Dexir auvoir",
        subject: "aaaa",
        contacts: "No.1 Second Chin Bee ",
        discussion: "238801",
        date_time: "12:00PM",
      },
      {
        id: "3",
        sales_person: "Adhoc",
        call_type: "2021-12-06T09:14:39.228Z",
        created_on: "2021-12-06T09:14:39.228Z",
        attachments: "Lorem Ipsum Doret Dexir auvoir",
        subject: "aaaa",
        contacts: "No.1 Second Chin Bee ",
        discussion: "238801",
        date_time: "12:00PM",
      },
    ],

    followUpColumnData: [
      { field: "id", header: "S.No" },
      { field: "actions", header: "Actions" },
      { field: "sales_person", header: "Sales Person" },
      { field: "call_type", header: "Call Type" },
      { field: "date_time", header: "Date & Time" },
      { field: "contacts", header: "Contacts" },
      { field: "subject", header: "Subject" },
      { field: "discussion", header: "Discussion Details" },
      { field: "attachments", header: "Attachments" },
      { field: "created_on", header: "Created On" },
    ],
    defaultTransportType: "Normal",

    // v$: useVuelidate(),
    // details: {
    //   region: "",
    //   rates: "",
    // },
    // errMsg: false,
    // tripsSelected: false,
    // renderKey: 10,
    // btnKey: false,
    // tripsData: [],
    // region: [],
    // rates: [],
    // prefilledTripsData: [],
    // tableColumn: [
    //   { field: "trip_no", header: "Trip Name" },
    //   { field: "from_time", header: "From" },
    //   { field: "to_time", header: "To" },
    //   { field: "trip_days", header: "Trip Days" },
    //   { field: "trip_type", header: "Trip Type" },
    // ],
    // submitted: false,
  }),
  validations() {
    return {
      // details: {
      //   region: { required },
      //   rates: { required },
      // },
    };
  },
  watch: {
    quotationData() {
      this.getValues();
    },
    // watch: {
    "$store.state.bulkAdjustment.addRegionDeliveryTransportType": function () {
      this.defaultTransportType =
        this.$store.state.bulkAdjustment.addRegionDeliveryTransportType;
    },
    // },
  },
  computed: {
    ...mapGetters({
      quotationData: "salesExpressContractBikeProjectJobs/quotationData",
    }),
  },
  methods: {
    ...mapActions({
      getRegionData: "salesExpressContractBikeProjectJobs/getRegionData",
      getRatesData: "salesExpressContractBikeProjectJobs/getRatesData",
      getTripsData: "salesExpressContractBikeProjectJobs/getTripsData",
      setCurrentStep: "salesExpressContractBikeProjectJobs/setCurrentStep",
      setPayloadData: "salesExpressContractBikeProjectJobs/setPayloadData",
      setSelectedRateCardId:
        "salesExpressContractBikeProjectJobs/setSelectedRateCardId",
    }),

    getNormalHeader(index) {
      let header;
      switch (index) {
        case "per_job":
          header = "Per Job";
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
        case "billing_cycle":
          header = "Increment Value / Percentage";
          break;
        case "remarks":
          header = "Remarks";
          break;
      }
      return header;
    },
    getValues() {
      // console.log(this.quotationData, "quotationData")
      this.normalData["no_of_jobs"] =
        this.quotationData?.express_contract[0]?.bike?.no_of_units || "-";
      this.normalData["per_job"] =
        this.quotationData?.express_contract[0]?.bike?.per_job || "-";
      this.normalData["amount"] =
        this.quotationData?.express_contract[0]?.bike?.amount || "-";
      this.normalData["additional_jobs"] =
        this.quotationData?.express_contract[0]?.bike?.additional_job || "-";
      this.normalData["billing_cycle"] =
        this.quotationData?.express_contract[0]?.bike?.billing_cycle || "-";
      this.normalData["remarks"] =
        this.quotationData?.express_contract[0]?.bike?.billing_cycle || "-";
      // ecommerece Same day
      this.ecommereceSameDayData["no_of_jobs"] =
        this.quotationData?.express_contract[0]?.bike?.no_of_units || "-";
      this.ecommereceSameDayData["per_job"] =
        this.quotationData?.express_contract[0]?.bike?.per_job || "-";
      this.ecommereceSameDayData["amount"] =
        this.quotationData?.express_contract[0]?.bike?.amount || "-";
      this.ecommereceSameDayData["additional_jobs"] =
        this.quotationData?.express_contract[0]?.bike?.additional_job || "-";
      this.ecommereceSameDayData["billing_cycle"] =
        this.quotationData?.express_contract[0]?.bike?.billing_cycle || "-";
      this.ecommereceSameDayData["remarks"] =
        this.quotationData?.express_contract[0]?.bike?.billing_cycle || "-";
      // ecommerece next day
      this.ecommereceNextDayData["no_of_jobs"] =
        this.quotationData?.express_contract[0]?.bike?.no_of_units || "-";
      this.ecommereceNextDayData["per_job"] =
        this.quotationData?.express_contract[0]?.bike?.per_job || "-";
      this.ecommereceNextDayData["amount"] =
        this.quotationData?.express_contract[0]?.bike?.amount || "-";
      this.ecommereceNextDayData["additional_jobs"] =
        this.quotationData?.express_contract[0]?.bike?.additional_job || "-";
      this.ecommereceNextDayData["billing_cycle"] =
        this.quotationData?.express_contract[0]?.bike?.billing_cycle || "-";
      this.ecommereceNextDayData["remarks"] =
        this.quotationData?.express_contract[0]?.bike?.billing_cycle || "-";
    },

    isRowSelected(value) {
      this.tripsSelected = value;
    },
    goBackHandler() {
      this.setCurrentStep(2);
    },
    nextStepHandler() {
      this.btnKey = true;
      if (this.v$.$invalid && !this.tripsSelected) {
        this.submitted = true;
      }
      if (!this.v$.$invalid && this.tripsSelected) {
        this.setCurrentStep(4);
      }
    },
    async getRegions() {
      const res = await this.getRegionData();

      if (res) {
        this.region = [];
        res.data?.results.map((list) => {
          this.region.push({ name: list.region, code: list.id });
        });
      }
    },
    async getRates() {
      const res = await this.getRatesData(this.details.region);
      if (res) {
        this.rates = [];
        res.data?.results.map((list) => {
          this.rates.push({ name: list.rate_card_name, code: list.id });
        });
      }
    },
    async getTrips() {
      try {
        const res = await this.getTripsData(this.details.rates);
        if (res) {
          this.tripsData = res.data?.results;

          this.errMsg = false;
        }
      } catch (error) {
        this.errMsg = true;
        this.tripsData = [];
      }
    },
    prefillData() {
      this.details.region = this.quotationData.express_contract[0].region_id;
      this.details.rates = this.quotationData.express_contract[0].rate_card_id;

      // this.quotationData?.express_contract[0]?.trips.map(list => {
      //   this.prefilledTripsData.push({

      //   })
      // })

      this.renderKey++;
    },
  },
  mounted() {
    if (this.quotationData) {
      this.prefillData();
    }
  },
  created() {
    this.getValues();
  },
};
</script>

<style scoped>
.van-costing-details-detailsText {
  font-size: 12px;
  color: #7e84a7;
  font-weight: 600;
}
.van-costing-details-valuesText {
  color: #66c11e;
}
::v-deep .p-selectbutton .p-button.p-highlight {
  background: #357dea;
  border-color: #357dea;
  color: #ffffff;
}
::v-deep .p-selectbutton .p-button {
  color: #7e84a7;
  font-size: 14px;
  font-weight: 600;
  background: rgba(197, 220, 255, 0.62);
  /* opacity: 0.5; */
  border-color: #357dea;
}

/* Revisions Table */
::v-deep .p-datatable .p-datatable-thead > tr > th {
  background: rgba(197, 220, 255, 0.62);
  color: #7e84a7;
  font-size: 12px;
  font-weight: 600;
  border: none;
}
::v-deep .p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {
  /* border: none; */
  background: #fff;
  /* margin-bottom: 15px; */
  color: #4e5968;
  font-size: 12px;
  font-weight: 600;
  padding: 20px;
}
.err-msg {
  font-size: 14px;
  color: red;
}

.err {
  color: red;
}
</style>
