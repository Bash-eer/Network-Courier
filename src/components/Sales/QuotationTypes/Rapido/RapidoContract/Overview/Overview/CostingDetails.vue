<template>
  <div class="flex flex-wrap justify-content-between">
    <div class="flex"><span class="header">Rates</span></div>
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
  <p class="type-rate-1">
    {{
      RapidoContractOverviewData?.rapido_contract_specifics?.rate_card_type ==
        "1" ||
      RapidoContractOverviewData?.rapido_contract_specifics?.rate_card_type ==
        "type_1"
        ? "Type 1"
        : "Type 2"
    }}:
    {{ RapidoContractOverviewData?.rapido_contract_specifics?.rate_card_name }}
  </p>
  <div class="rate-1a flex flex-wrap justify-content-between p-3">
    <span>
      {{
        RapidoContractOverviewData?.rapido_contract_specifics?.rate_card_name
      }}
    </span>

    <div>
      <img
        :src="'/images/' + 'drag-drop-pdf' + '.png'"
        alt="pdf"
        width="30"
        height="27"
        class="mt-2"
      />
      <span class="download">Download</span>
    </div>
  </div>
  <div class="trio-select-tabs">
    <div>
      <div :key="RapidoContractOverviewData">
        <OverviewTable />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import OverviewTable from "./OverviewTable.vue";
import OverlayPanel from "primevue/overlaypanel";
export default {
  components: {
    OverviewTable,
    OverlayPanel,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      RapidoContractOverviewData:
        "salesRapidoContract/RapidoContractOverviewData",
    }),
  },
  methods: {
    ...mapActions({
      setQuotationData: "salesRapidoContract/Contract/setQuotationData",
      setRapidoContractStepNum: "salesQuotationDialog/setRapidoContractStepNum",
    }),
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    async editDialog() {
      await this.setQuotationData({
        type: this.$route.params.type,
        id: this.$route.params.id,
      });
      this.setRapidoContractStepNum(4);
      this.$store.dispatch("salesSales/openDialog", {
        dialogDetails: {
          dialogName: "RapidoContractQuotationDialog",
          dialogHeader: "Edit",
        },
      });
      this.$store.getters["salesSales/controlActivityDialog"];
    },
  },
};
</script>

<style scoped>
.header {
  font-weight: 600;
  font-size: 16px;
  color: #343434;
}
.type-rate-1 {
  font-family: "Montserrat";
  font-weight: 700;
  font-size: 12px;
  color: #343434;
}
.rate-1a {
  font-weight: 700;
  font-size: 12px;
  color: #343434;
  background: #eef4ff;
  border-radius: 5px;
}
.download {
  font-family: "Montserrat";
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #343434;
}
.trio-select-tabs {
  margin-top: 30px !important;
}

.hover-blue:hover {
  color: #357dea;
}
.custom-speed-dial-text {
  font-weight: 600;
  font-size: 15px;
  color: #4e5868;
}
.updateButton {
  background: none !important;
  border: white !important;
}
.updateButton:hover {
  background: white !important;
}

::v-deep .pi-ellipsis-v {
  color: black !important;
}
::v-deep .p-overlaypanel-flipped:after {
  bottom: 0px !important;
  top: 0px !important;
}
</style>
