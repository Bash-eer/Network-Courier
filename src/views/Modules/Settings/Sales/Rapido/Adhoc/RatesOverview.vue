<template>
  <div class="flex justify-content-between align-items-center bg-white">
    <div class="flex flex-row m-3">
      <div class="mx-3 m-2 mt-4 cursor-pointer">
        <div
          @click="$router.back()"
          class="pi pointer icon pi-arrow-left"
        ></div>
      </div>

      <div class="flex flex-column align-items-start">
        <div class="">
          {{ $store.state.rapidoAdhoc.rapdio_adhoc_page_header }}
          <span
            ><img
              src="../../../../../../../public/images/default.png"
              class="margin-left-80"
              v-bind:title="title"
          /></span>
        </div>
        <DropDown
          :key="zone"
          label="zone"
          id="zone"
          code="name"
          :state="zone"
          :disabled="false"
          v-model="zone"
          :data="RateDropdownData"
          classes="inputfield w-full dialog-dropdown-text"
        />
      </div>
    </div>

    <div class="flex">
      <div class="flex flex-row">
        <SearchField storePath="contacts" />
        <div class="ml-2">
          <ReportExport />
        </div>
        <div class="mr-2">
          <Buttons
            v-if="selectedTab == 'ecommerce'"
            label="Add New"
            v-on:childToParent="
              openDialog('AddEcommerce', 'rapidoAdhoc', 'Add New Ecommerce')
            "
            button_class="p-button-sm mx-1 add-btn custom-add-btn"
          />
          <Buttons
            v-if="selectedTab == 'additionalSurcharges'"
            label="Add New"
            v-on:childToParent="
              openDialog(
                'AddAdditionalSurcharges',
                'rapidoAdhoc',
                'Add New Additional Surcharge'
              )
            "
            button_class="p-button-sm mx-1 add-btn custom-add-btn"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="bg-white">
    <AdhocZoneTab
      v-if="isloading"
      @currentTab="getSelectedTab"
      :tabMenuData="getTabMenuData()"
    />
  </div>
  <AddZoneDialogs
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['rapidoAdhoc'].dialogComponent"
  />
  <!--toast-->
  <Toasts
    :severity="$store.state['rapidoAdhoc'].toastData.severity"
    :summary="$store.state['rapidoAdhoc'].toastData.summary"
  />
</template>

<script>
import axios from "axios";
const { URL } = require("../../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
import AddZoneDialogs from "../../../../../../components/Settings/Sales/Rapido/Adhoc/Dialog.vue";
import Toasts from "../../../../../../components/Settings/Sales/Rapido/Adhoc/Toasts.vue";
import AdhocZoneTab from "../../../../../../components/Settings/Sales/Rapido/Tabs/RapidoAdhocRegularTab.vue";
import { rapidoAdhocZoneRangeTabMenuData } from "../../../../../../components/Settings/Sales/Rapido/const/const";
export default {
  components: {
    AdhocZoneTab,
    AddZoneDialogs,
    Toasts,
  },
  data() {
    return {
      zone: "",
      tabMenuData: rapidoAdhocZoneRangeTabMenuData,
      RateDropdownData: [],
      zoneRanges: null,
      selectedTab: "ecommerce",
      title: "Default",
      isloading: false,
    };
  },
  methods: {
    getSelectedTab(value) {
      this.selectedTab = value;
    },
    openDialog(name, type, header) {
      if (type == "rapidoAdhoc") {
        this.$store.dispatch("rapidoAdhoc/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["rapidoAdhoc/controlActivityDialog"];
      }
    },
    getTabMenuData() {
      for (let d in this.tabMenuData) {
        switch (this.tabMenuData[d].label) {
          case "ecommerce":
            this.tabMenuData[d].data =
              this.$store.state.rapidoAdhoc.rapidoAdhocRateCardZoneECommerceTableData;
            break;
          case "onDemandService":
            this.tabMenuData[d].data =
              this.$store.state.rapidoAdhoc.RapidoAdhocOnDemandServiceTableData;
            break;
          case "surcharges":
            this.tabMenuData[d].data =
              this.$store.state.rapidoAdhoc.RapidoAdhocSurchargesTableData;

            break;
          case "additionalSurcharges":
            this.tabMenuData[d].data =
              this.$store.state.rapidoAdhoc.RapidoAdhocAdditionalSurchargesTableData;

            break;
        }
      }
      return this.tabMenuData;
    },
    async getZoneDropdownData() {
      let id = this.$route.params.id;
      this.RateDropdownData = [];
      await axios
        .get(
          "/settings/sales/rates/rapido/adhoc/dropdowns/ratecard/zonerange/" +
            id
        )
        .then((res) => {
          if (res.data.results) {
            this.zoneRanges = res.data.results;
            for (let c in res.data.results) {
              res.data.results[c]["name"] =
                res.data.results[c]["zone_from"] +
                "-" +
                res.data.results[c]["zone_to"];
              this.RateDropdownData.push(res.data.results[c]);
              this.placeholder = this.RateDropdownData[0].name;
            }
          }
        });
    },
    findZone() {
      let respectiveZoneData = this.RateDropdownData.find(
        (item) => item.id == this.$route.params.zoneId
      );
      this.zone = respectiveZoneData.name;
    },
    async loadFunction() {
      let respectiveData = this.zoneRanges.find(
        (item) => item.name == this.zone
      );

      await this.$store.dispatch("rapidoAdhoc/loadRapidoAdhocThirdPageData", {
        path:
          "/settings/sales/rates/rapido/adhoc/ratecards/zone/" +
          respectiveData.id,
      });
    },
    async PageRender() {
      this.isloading = false;
      await this.getZoneDropdownData();
      let id = this.$route.params.id;
      await this.$store.dispatch("rapidoAdhoc/loadAdhocSecondPageData", {
        path: "settings/sales/rates/rapido/adhoc/ratecard/" + id,
        mutation: "fetchadhocRatesSecondPageTableData",
      });
      this.findZone();
      this.rateCardName =
        this.$store.state.rapidoAdhoc.adhocTableRowRateCardName;
      this.isloading = true;
    },
  },
  created() {
    this.PageRender();
  },

  watch: {
    zone: async function () {
      let respectiveData = this.zoneRanges.find(
        (item) => item.name == this.zone
      );

      await this.$store.dispatch("rapidoAdhoc/loadRapidoAdhocThirdPageData", {
        path:
          "/settings/sales/rates/rapido/adhoc/ratecards/zone/" +
          respectiveData.id,
      });
    },
    "$store.state.rapidoAdhoc.triggerThirdPageLoad": async function () {
      await this.loadFunction();
    },
    "$store.state.rapidoAdhoc.renderKey": async function () {
      await this.PageRender();
    },
  },
};
</script>

<style scoped>
.zone-name {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: -0.01em;
  color: #4e5968;
}
</style>
