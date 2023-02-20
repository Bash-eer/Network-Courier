<template>
  <div>
    <TabMenu
      class="subTabs"
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
import TabMenu from "primevue/tabmenu";
import ContractHome from "./Contract/ContractHome.vue";
import AdhocHome from "./Adhoc/AdhocHome.vue";
import { mapMutations, mapState } from "vuex";
export default {
  props: ["tabMenuData", "storePath"],
  components: {
    TabMenu,
    ContractHome,
    AdhocHome,
  },
  data: () => ({
    activeIndex: 0,
    currentTab: "",
  }),
  computed: {
    ...mapState({
      ratesCurrentTab: (state) => state.rates.ratesCurrentTab,
    }),
  },
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
      this.$store.state.rates.expressCurrentTabs = tab.index;
    },

    updateBreadCrumbs(tab) {
      switch (tab) {
        case "Contract":
          this.updateBreadCrumbAndTitle({
            title : "Rates",
            breadcrumbInfo : "Settings > Sales Settings > Rates > Express > Contract Rates",
          });
          break;
        case "Adhoc":
          this.updateBreadCrumbAndTitle({
            title : "Rates",
            breadcrumbInfo : "Settings > Sales Settings > Rates > Express > Adhoc Rates",
          });
          break;
      }
    },
  },
  mounted() {
    if (this.$store.state.rates.expressCurrentTabs != null) {
      let Index = this.$store.state.rates.expressCurrentTabs;
      this.tabChanged({ index: Index });
      this.activeIndex = Index;
    } else {
      this.tabChanged({ index: 0 });
      if (this.ratesCurrentTab == "Express") {
        this.updateBreadCrumbAndTitle({
          title: "Rates",
          breadcrumbInfo:
            "Settings > Sales Settings > Rates > Express > Contract Rates",
        });
      }
    }
  },
  watch: {
    currentTab: function () {
      this.$store.dispatch("rates/setZoneOrRegion", {
        tabType: this.currentTab,
      });
    },
  },
};
</script>

<style>
.subTabs .p-menuitem-link {
  /* background: #e1eaf9 !important; */

  font-weight: bold !important;

  font-size: 14px !important;
  line-height: 17px !important;
  /* identical to box height */

  letter-spacing: 0.03em;

  color: #7e84a7 !important;
}
.subTabs .p-highlight .p-menuitem-link {
  /* background: #e1eaf9 !important; */
  border-color: #2196f3 !important;
  color: #2196f3 !important;
}
</style>
