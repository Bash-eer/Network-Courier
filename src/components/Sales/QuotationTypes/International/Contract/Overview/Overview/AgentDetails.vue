<template>
  <div class="flex flex-wrap justify-content-between">
    <div class="flex">
      <span
        class="
          international-contract-agentdetails-header
          express-international-font
        "
        >Agent Details</span
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
  <hr class="horizontal_line" />
  <div v-for="(item, index) of serviceproviderdata" :key="index">
    <p
      class="
        international-contract-agentdetails-fedex
        express-international-font-family
        flex
        align-items-center
      "
    >
      {{ item.service_provider_name }} ({{ item.rate_card_type }})
    </p>
    <div
      class="
        international-contract-agentdetails-Annex1
        flex
        align-items-center
        justify-content-between
        mb-5
      "
    >
      <span> {{ item.rate_card_name }} </span>

      <div>
        <img
          :src="'/images/' + 'drag-drop-pdf' + '.png'"
          alt="pdf"
          width="30"
          height="27"
          class="mt-2"
        />
        <span class="international-contract-agentdetails-download">
          <span>
            <a
              class="filesText bodyTxt ml-1"
              :href="item.url"
              target="_blank"
              >{{ item.file_name }}</a
            ></span
          >
        </span>
      </div>
    </div>
  </div>
  <p class="mt-2 international-contract-agentdetails-remarks font-size-12">
    Remarks
  </p>
  <div
    class="
      international-contract-agentdetails-remarks-para
      express-international-table
      flex
      align-items-center
    "
  >
    {{
      $store.state.salesInternationalContract.internationalContractOverviewData
        .remarks
    }}
  </div>
</template>

<script>
import OverlayPanel from "primevue/overlaypanel";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    OverlayPanel,
  },
  data() {
    return {
      serviceproviderdata: [],
      CostingDetailOverlay: [{ label: "Edit", icon: "fas fa-pen" }],
    };
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
      this.setCurrentStep(3);
      let processedType;
      if (this.selectedTab == "quotation") {
        processedType = "quotations";
      } else processedType = "contract";
      this.$store.dispatch("salesInternationalContract/loadRowData", {
        path: "/sales/" + processedType + "/overview/" + this.$route.params.id,
      });
      this.$store.state.salesInternationalContract.StepperIdData =
        "SalesInternationalContractThirdStep";
    },
  },
  unmounted() {
    this.$store.state.salesInternationalContract.StepperIdData =
      "SalesInternationalContractFirstStep";
  },
  watch: {
    "$store.state.salesInternationalContract.internationalContractOverviewData.international_contract_specifics.service_provider_details":
      function () {
        this.serviceproviderdata = [];
        this.$store.state.salesInternationalContract.internationalContractOverviewData?.international_contract_specifics?.service_provider_details.map(
          (item) => {
            item.rate_card_attachments.map((data) => {
              this.serviceproviderdata.push(data);
            });
          }
        );
      },
  },
  created() {
    this.$store.state.salesInternationalContract.internationalContractOverviewData.international_contract_specifics.service_provider_details.map(
      (item) => {
        item.rate_card_attachments.map((data) => {
          this.serviceproviderdata.push(data);
        });
      }
    );
    console.log(
      this.serviceproviderdata,
      "Agent details////////////////////////////////////"
    );
  },
};
</script>

<style scoped>
.international-contract-agentdetails-header {
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.03em;
  color: #343434;
}
.international-contract-agentdetails-fedex {
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.03em;
  color: #343434;
}
.international-contract-agentdetails-Annex1 {
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.03em;
  color: #343434;
  background: #eef4ff;
  border-radius: 5px;
  height: 60px;
  left: 518px;
  top: 869px;
  padding-inline: 10px;
}
.international-contract-agentdetails-remarks {
  letter-spacing: 0.03em;
  color: #7e84a7;
}
.international-contract-agentdetails-remarks-para {
  line-height: 18px;
  color: #4e5968;
  padding-left: 10px;
  background-color: #f3f7ff;
  width: 1177px;
  height: 61px;
  left: 510px;
  top: 1093px;
  border: 1px solid rgba(126, 132, 167, 0.3);
  border-radius: 8px;
}
.international-contract-agentdetails-download {
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.03em;
  color: #343434;
}
</style>
