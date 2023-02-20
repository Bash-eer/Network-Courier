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
        <div class="rates-adhoc-zone-name mb-3">{{ rateCardName }}</div>
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
          <Buttons
            v-if="
              $store.state.expressAdhoc.TabChangeValue == 'EcomBike' &&
              selectedTab == 'E-Commerce'
            "
            label="Add New"
            button_class="p-button-sm mx-1 add-btn custom-add-btn"
            @click="
              openDialog('AddEcommerceBike', 'expressAdhoc', 'Ecom Bike Zone')
            "
          />
          <Buttons
            v-if="
              $store.state.expressAdhoc.TabChangeValue == 'EcomVan' &&
              selectedTab == 'E-Commerce'
            "
            label="Add New"
            button_class="p-button-sm mx-1 add-btn custom-add-btn"
            @click="
              openDialog('AddEcommerceVan', 'expressAdhoc', 'Ecom Van Zone')
            "
          />
          <!-- <Buttons
            v-if="$store.state.expressAdhoc.TabChangeValue == 'NormalVan'"
            label="Add New"
            button_class="p-button-sm mx-1 add-btn custom-add-btn"
            @click="openDialog('AddNewOne', 'expressAdhoc', 'Normal Bike Zone')"
          /> -->
          <!-- <Buttons
            v-if="selectedTab == 'E-Commerce'"
            label="Add New"
            button_class="p-button-sm mx-1 add-btn custom-add-btn"
            @click="
              openDialog('AddNewOne', 'expressAdhoc', 'E-Commerce Bike Zone')
            "
          /> -->
        </div>

        <Buttons
          v-if="selectedTab == 'AdditionalSurcharges'"
          label="Add New"
          button_class="p-button-sm mx-1 add-btn custom-add-btn"
          @click="
            openDialog(
              'AddAdditionalSurcharges',
              'expressAdhoc',
              'Add Additional Surcharges'
            )
          "
        />
      </div>
    </div>
  </div>

  <AddZonesDialogs
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['expressAdhoc'].dialogComponent"
  />
  <!--toast-->
  <Toasts
    :severity="$store.state['expressAdhoc'].toastData.severity"
    :summary="$store.state['expressAdhoc'].toastData.summary"
  />
  <div>
    <AdhocRegularTab
      v-bind:tabMenuData="$store.state.expressAdhoc.adhocRatesTabMenuData"
      type="adhocRates"
      @currentTab="getSelectedTab"
      defaultTab="International"
      storePath=""
    />
    <AdhocBikeVanTab
      v-bind:tabMenuData="
        $store.state.expressAdhoc.adhocZoneRatesNormalTabMenuData
      "
      type="adhocRates"
      @currentTab="getSelectedTab"
      defaultTab="International"
      storePath=""
    />
  </div>
</template>

<script>
import axios from "axios";
const { URL } = require("../../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
import AdhocRegularTab from "../../../../../../components/Settings/Sales/Express/Adhoc/Tabs/RegularTabs.vue";
import AdhocBikeVanTab from "../../../../../../components/Settings/Sales/Express/Adhoc/Tabs/BikeVanTab.vue";
import AddZonesDialogs from "../../../../../../components/Settings/Sales/Express/Adhoc/Dialog.vue";
import { mapMutations } from "vuex";
import Toasts from "../../../../../../components/Settings/Sales/Express/Adhoc/Toasts.vue";

export default {
  components: {
    AdhocRegularTab,
    AdhocBikeVanTab,
    AddZonesDialogs,

    Toasts,
  },
  data() {
    return {
      rateCardName: "",
      zone: "",
      RateDropdownData: [],
      selectedTab: "Normal",
      zoneRanges: null,
    };
  },
  methods: {
    ...mapMutations({
      updateBreadCrumbAndTitle: "users/updateBreadCrumbAndTitle",
    }),
    getSelectedTab(value) {
      this.selectedTab = value;
      console.log(this.selectedTab);
    },
    openDialog(name, type, header) {
      if (type == "expressAdhoc") {
        this.$store.dispatch("expressAdhoc/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["expressAdhoc/controlActivityDialog"];
      }
    },
    async getZoneDropdownData() {
      let id = this.$route.params.id;

      await axios
        .get(
          "/settings/sales/rates/express/adhoc/dropdowns/ratecard/zonerange/" +
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

      await this.$store.dispatch("expressAdhoc/loadExpressAdhocThirdPageData", {
        // id: respectiveData.id,
        path:
          "/settings/sales/rates/express/adhoc/ratecards/zone/" +
          respectiveData.id,
      });
    },
  },
  async created() {
    this.updateBreadCrumbAndTitle({
      title: "Rates",
      breadcrumbInfo: "Settings > Sales Settings > Rates > Express > Express Adhoc Rates",
    });
    await this.getZoneDropdownData();
    this.findZone();
    this.rateCardName =
      this.$store.state.expressAdhoc.adhocTableRowRateCardName;
  },

  watch: {
    zone: async function () {
      await this.loadFunction();
    },
    "$store.state.expressAdhoc.triggerThirdPageLoad": async function () {
      await this.loadFunction();
    },
  },
};
</script>

<style scoped>
.rates-adhoc-zone-name {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: -0.01em;
  color: #4e5968;
}
</style>
