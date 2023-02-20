<template>
  <div>
    <TabMenu
      class="ratesSubTabs"
      :model="tabMenuData"
      v-model:activeIndex="activeIndex"
      v-on:tab-change="tabChanged($event)"
    />
    <!-- router view can also be used - provided paths dont conflict -->
    <div v-for="(tabs, index) of tabMenuData" :key="tabs.label">
      <keep-alive>
        <component v-if="activeIndex == index" v-bind:is="tabs.tab"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import ClearanceMode from "../Inbound/Clearance Mode/ClearanceMode.vue";
import PermitCharges from "../Inbound/Permit Charges/PermitCharges.vue";
import Questionnaire from "../Inbound/Questionnaire/Questionnaire.vue";
import Surcharges from "../Inbound/Surcharges/Surcharges.vue";
import CurrencyExchange from "../Inbound/Currency Exchange/CurrencyExchange.vue";
import TabMenu from "primevue/tabmenu";
import { mapMutations } from "vuex";
export default {
  props: ["tabMenuData", "storePath"],
  data: () => ({
    activeIndex: 0,
    currentTab: "",
  }),
  methods: {
    ...mapMutations({
        updateBreadCrumbAndTitle: "users/updateBreadCrumbAndTitle",
      }),
    tabChanged(tab) {
      for (let t in this.tabMenuData) {
        if (t == tab.index) {
          this.currentTab = this.tabMenuData[t].label;
          this.updateBreadCrumbs(this.currentTab);
        }
      }
    },
    updateBreadCrumbs(tab) {
      switch (tab) {
        case "Surcharges":
          this.updateBreadCrumbAndTitle({
            title: "Rates",
            breadcrumbInfo: "Settings > Sales Settings > Rates > International > Inbound > Surcharges",
          });
          break;
        case "Permit Charges":
          this.updateBreadCrumbAndTitle({
            title: "Rates",
            breadcrumbInfo: "Settings > Sales Settings > Rates > International > Inbound > Permit Charges",
          });
          break;
        case "Questionnaire":
          this.updateBreadCrumbAndTitle({
            title: "Rates",
            breadcrumbInfo: "Settings > Sales Settings > Rates > International > Inbound > Questionnaire",
          });
          break;
        case "Currency Exchanges":
          this.updateBreadCrumbAndTitle({
            title: "Rates",
            breadcrumbInfo: "Settings > Sales Settings > Rates > International > Inbound > Currency Exchange",
          });
          break;
        case "Clearance Mode":
          this.updateBreadCrumbAndTitle({
            title: "Rates",
            breadcrumbInfo: "Settings > Sales Settings > Rates > International > Inbound > Clearance Mode",
          });
          break;
      }
    },
  },
  created() {
    this.tabChanged({ index: 0 });
  },
  components: {
    TabMenu,
    ClearanceMode,
    PermitCharges,
    Questionnaire,
    CurrencyExchange,
    Surcharges,
  },
};
</script>

<style>
.ratesSubTabs .p-menuitem-link {
  background: #e1eaf9 !important;
  font-size: 12px !important;
  font-weight: bold !important;
}
.ratesSubTabs .p-highlight .p-menuitem-link {
  background: #e1eaf9 !important;
  border-color: #2196f3 !important;
  color: #2196f3 !important;
}
.ratesSubTabs .p-tabmenu-nav {
  background: #e1eaf9 !important;
}
</style>
