<template>
  <div>
    <div class="flex align-items-center justify-content-between">
      <TabMenu
        class="subTabs"
        :model="tabMenuData"
        v-model:activeIndex="activeIndex"
        v-on:tab-change="tabChanged($event)"
      />
      <div class="mr-4 note" v-if="currentTab == 'Outbound'">
        Note: This is used for Export/Onforwarding
      </div>

      <div class="mr-4 note" v-if="currentTab == 'Inbound'">
        Note: This is used for Agent
      </div>
    </div>

    <!-- router view can also be used - provided paths dont conflict -->
    <div v-for="(tabs, index) of tabMenuData" :key="tabs.label">
      <keep-alive>
        <component v-if="activeIndex == index" v-bind:is="tabs.tab"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import TabMenu from "primevue/tabmenu";
import InboundPage from "../Inbound/InboundPage.vue";
import Outbound from "../Outbound/index.vue";
import { mapActions, mapMutations } from "vuex";

export default {
  props: ["tabMenuData", "storePath"],
  data: () => ({
    activeIndex: 0,
    currentTab: "",
  }),
  watch: {
    activeIndex(value) {
      this.setCurrentTabIndex(value);
    },
  },
  methods: {
    ...mapActions({
      setCurrentTabIndex: "Outbound/setCurrentTabIndex",
    }),
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
      this.$store.state.rates.internationalCurrentTabs = tab.index;
    },
    updateBreadCrumbs(tab) {
      switch (tab) {
        case "Outbound":
          this.updateBreadCrumbAndTitle({
            title: "Rates",
            breadcrumbInfo : "Settings > Sales Settings > Rates > International > Outbound",
          });
          break;
        case "Inbound":
          this.updateBreadCrumbAndTitle({
            title: "Rates",
            breadcrumbInfo : "Settings > Sales Settings > Rates > International > Inbound > Surcharges",
          });
          break;
      }
    },
  },
  mounted() {
    if (this.$store.state.rates.internationalCurrentTabs != null) {
      let Index = this.$store.state.rates.internationalCurrentTabs;

      this.tabChanged({ index: Index });
      this.activeIndex = Index;
    }
  },
  components: {
    TabMenu,
    InboundPage,
    Outbound,
  },
};
</script>

<style lang="scss" scoped>
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

.note {
  color: #0e6100;
  opacity: 0.7;
  padding: 10px 20px;
  font-size: 12px;
  background: #e5fbeb;
  border-radius: 20px;
  font-weight: 600;
}
</style>
