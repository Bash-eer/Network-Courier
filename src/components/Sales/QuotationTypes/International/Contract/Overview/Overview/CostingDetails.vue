<template>
  <div>
    <div class="flex flex-wrap justify-content-between">
      <div class="flex">
        <span
          class="
            international-contract-costingdetails-header
            express-international-font
          "
          >Costing Details</span
        >
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
    <hr class="international-contract-costingdetails-horizontal-line" />
    <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
      <div
        v-for="(item, index) of CostingDetailsData"
        :class="index != CostingDetailsData.length - 1 ? 'flex mr-6' : 'flex'"
        :key="index"
      >
        <div class="flex flex-column">
          <div
            class="
              flex
              international-contract-costingdetails-detailsText
              express-international-table
              flex-wrap
            "
          >
            {{ CostHeaderOne(index) }}
          </div>
          <div
            :class="
              item != 'High'
                ? 'flex flex-wrap international-contract-costingdetails-detailsText express-international-table international-contract-costingdetails-valuesText'
                : 'flex  flex-wrap international-contract-costingdetails-detailsText express-international-table international-contract-costingdetails-priorityText'
            "
          >
            <span> {{ item }}</span>
          </div>
        </div>
      </div>
    </div>

    <div
      class="
        international-contract-costingdetails-bank_details
        flex
        align-items-center
        color-4e5868
        font-size-12
      "
    >
      <span><b> Bank Details</b> </span>
    </div>

    <div class="flex flex-row flex-wrap ml-1 mt-3 mb-4">
      <div
        v-for="(item, index) of CostingDetailsBankData"
        :class="index != CostingDetailsBankData - 1 ? 'flex mr-6' : 'flex'"
        :key="index"
      >
        <div class="flex flex-column">
          <div
            class="
              flex
              international-contract-costingdetails-detailsText
              express-international-table
              flex-wrap
            "
          >
            {{ CostHeaderTwo(index) }}
          </div>
          <div
            :class="
              item != 'High'
                ? 'flex flex-wrap international-contract-costingdetails-detailsText express-international-table international-contract-costingdetails-valuesText'
                : 'flex  flex-wrap international-contract-costingdetails-detailsText express-international-table international-contract-costingdetails-priorityText'
            "
          >
            <span> {{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OverlayPanel from "primevue/overlaypanel";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CostingDetails",
  components: {
    OverlayPanel,
  },
  data() {
    return {
      CostingDetailsBankData: {},
      CostingDetailsData: {},
      CostingDetailOverlay: [{ label: "Edit", icon: "fas fa-pen" }],
    };
  },
  unmounted() {
    this.$store.state.salesInternationalContract.StepperIdData =
      "SalesInternationalContractFirstStep";
  },
  computed: {
    ...mapGetters({
      selectedTab: "salesSales/selectedTab",
    }),
  },
  methods: {
    ...mapActions({
      setCurrentStep: "salesInternationalContract/setCurrentStep",
    }),
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    async editDialog() {
      this.setCurrentStep(4);
      let processedType;
      if (this.selectedTab == "quotation") {
        processedType = "quotations";
      } else processedType = "contract";
      this.$store.dispatch("salesInternationalContract/loadRowData", {
        path: "/sales/" + processedType + "/overview/" + this.$route.params.id,
      });
      this.$store.state.salesInternationalContract.StepperIdData =
        "SalesInternationalContractFourthStep";
    },
    CostHeaderOne(index) {
      let header;
      switch (index) {
        case "credit_terms":
          header = "Credit Terms (Days)";
          break;
        case "deposit_amount":
          header = "Desposit Amount";
          break;
        case "interest":
          header = "Interest %";
          break;
        case "bill_type":
          header = "Bill Type";
          break;
        case "local_customer_code":
          header = "Local Customer Code";
          break;
      }
      return header;
    },
    CostHeaderTwo(index) {
      let header;
      switch (index) {
        case "accountant":
          header = "Accountant or Officers";
          break;
        case "bank_no":
          header = "Bank No";
          break;
        case "bank_name":
          header = "Bank Name";
          break;

        case "bank_account_no":
          header = "Bank Account No";
          break;
        case "bank_swift_code":
          header = "Bank Swift Code";
          break;
        case "bank_address_1":
          header = "Bank Address";
          break;
      }
      return header;
    },
    // async secondRowFunction() {
    //   this.CostingDetailsData = {
    //     credit_terms:
    //       this.$store.state.salesInternationalContract
    //         .internationalContractOverviewData.international_contract_specifics
    //         .costing_details.credit_terms,
    //     deposit_amount:
    //       this.$store.state.salesInternationalContract
    //         .internationalContractOverviewData.international_contract_specifics
    //         .costing_details.deposit_amount,
    //     interest:
    //       this.$store.state.salesInternationalContract
    //         .internationalContractOverviewData.international_contract_specifics
    //         .costing_details.interest,
    //     bill_type:
    //       this.$store.state.salesInternationalContract
    //         .internationalContractOverviewData.international_contract_specifics
    //         .costing_details.bill_type,
    //     local_customer_code:
    //       this.$store.state.salesInternationalContract
    //         .internationalContractOverviewData.international_contract_specifics
    //         .costing_details.local_customer_code,
    //   };
    //   this.CostingDetailsBankData = {
    //     accountant:
    //       this.$store.state.salesInternationalContract
    //         .internationalContractOverviewData.international_contract_specifics
    //         .costing_details.accountant,
    //     bank_name:
    //       this.$store.state.salesInternationalContract
    //         .internationalContractOverviewData.international_contract_specifics
    //         .costing_details.bank_name,
    //     bank_no:
    //       this.$store.state.salesInternationalContract
    //         .internationalContractOverviewData.international_contract_specifics
    //         .costing_details.bank_no,
    //     bank_account_no:
    //       this.$store.state.salesInternationalContract
    //         .internationalContractOverviewData.international_contract_specifics
    //         .costing_details.bank_account_no,
    //     bank_swift_code:
    //       this.$store.state.salesInternationalContract
    //         .internationalContractOverviewData.international_contract_specifics
    //         .costing_details.bank_swift_code,
    //     bank_address_1:
    //       this.$store.state.salesInternationalContract
    //         .internationalContractOverviewData.international_contract_specifics
    //         .costing_details.bank_address_1,
    //   };
    // },
  },
  watch: {
    "$store.state.salesInternationalContract.internationalContractOverviewData.international_contract_specifics.costing_details":
      function () {
        this.CostingDetailsData = {
          credit_terms:
            this.$store.state.salesInternationalContract
              .internationalContractOverviewData
              ?.international_contract_specifics?.costing_details.credit_terms,
          deposit_amount:
            this.$store.state.salesInternationalContract
              .internationalContractOverviewData
              .international_contract_specifics?.costing_details.deposit_amount,
          interest:
            this.$store.state.salesInternationalContract
              .internationalContractOverviewData
              .international_contract_specifics?.costing_details.interest,
          bill_type:
            this.$store.state.salesInternationalContract
              .internationalContractOverviewData
              .international_contract_specifics?.costing_details.bill_type,
          local_customer_code:
            this.$store.state.salesInternationalContract
              .internationalContractOverviewData
              .international_contract_specifics?.costing_details
              .local_customer_code,
        };
        this.CostingDetailsBankData = {
          accountant:
            this.$store.state.salesInternationalContract
              .internationalContractOverviewData
              .international_contract_specifics?.costing_details.accountant,
          bank_name:
            this.$store.state.salesInternationalContract
              .internationalContractOverviewData
              .international_contract_specifics?.costing_details.bank_name,
          bank_no:
            this.$store.state.salesInternationalContract
              .internationalContractOverviewData
              .international_contract_specifics?.costing_details.bank_no,
          bank_account_no:
            this.$store.state.salesInternationalContract
              .internationalContractOverviewData
              .international_contract_specifics?.costing_details
              .bank_account_no,
          bank_swift_code:
            this.$store.state.salesInternationalContract
              .internationalContractOverviewData
              .international_contract_specifics?.costing_details
              .bank_swift_code,
          bank_address_1:
            this.$store.state.salesInternationalContract
              .internationalContractOverviewData
              .international_contract_specifics?.costing_details.bank_address_1,
        };
      },
  },
  async created() {
    await this.$store.dispatch(
      "salesInternationalContract/loadInternationalContractOverviewData",
      {
        id: this.$route.params.id,
        type: this.$route.params.type,
      }
    );
    // await this.secondRowFunction();
    this.$store.dispatch(
      "salesInternationalContract/resetInternationalContractTimeLineData",
      {
        data: [
          {
            index: 0,
            color: "#EBBD46",
          },
          {
            index: 1,
            color: "#ffff",
            markerComponent: "CostingDetail",
          },
          {
            index: 2,
            color: "#ffff",
            markerComponent: "AgentDetails",
          },
          {
            index: 3,
            color: "#ffff",
          },
        ],
      }
    );
  },
};
</script>

<style lang="scss" scoped>
.international-contract-costingdetails-detailsText {
  color: #7e84a7;
}
.international-contract-costingdetails-valuesText {
  color: #66c11e;
}
.international-contract-costingdetails-priorityText {
  color: #c11e1e;
}
.international-contract-costingdetails-header {
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.03em;
  color: #343434;
}
.international-contract-costingdetails-horizontal-line {
  margin: 0px !important;
  margin-top: 1.1% !important;
}
.international-contract-costingdetails-bank_details {
  width: 1172px;
  height: 35px;
  left: 513px;
  top: 620px;
  background: #eef4ff;
  border-radius: 5px;
  padding-left: 10px;
}
</style>
