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
      <keep-alive v-if="tabs.label == 'Contract'">
        <component v-if="activeIndex == index" v-bind:is="tabs.tab"></component>
      </keep-alive>

      <keep-alive v-if="tabs.label == 'Adhoc'">
        <div class="flex flex-row m-3" v-if="activeIndex == index">
          <div class="rapido-contract-name">Rapido Adhoc Rates</div>
        </div>
      </keep-alive>

      <keep-alive v-if="tabs.label == 'Adhoc'">
        <component
          :tableDataName="tabs.label"
          tableName="rapidoAdhocTable"
          :tableData="$store.state.rapidoAdhoc.rapidoAdhocTableData"
          :tableColumns="tableColumns"
          v-if="activeIndex == index"
          v-bind:is="tabs.tab"
        ></component>
      </keep-alive>
    </div>
  </div>
  <!--toast-->
  <Toasts
    :severity="$store.state['rapidoAdhoc'].toastData.severity"
    :summary="$store.state['rapidoAdhoc'].toastData.summary"
  />
</template>

<script>
import TabMenu from "primevue/tabmenu";
import ContractPage from "../Contract/ContractPage.vue";
import RapidoDataTable from "../Tables/DataTable.vue";
import { AdhocTableColumnData } from "../const/const.js";
import Toasts from "../Adhoc/Toasts.vue";
import { mapMutations, mapState } from "vuex";
export default {
  props: ["tabMenuData", "storePath"],
  data: () => ({
    activeIndex: 0,
    currentTab: "",
    tableColumns: AdhocTableColumnData,
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
          this.$store.state.rapidoContract.rapidoMainTab =
            this.tabMenuData[t].label;
          if (this.ratesCurrentTab == "Rapido") {
            this.updateBreadCrumbs(this.currentTab);
          }
        }
      }
      this.$store.state.rates.rapidoCurrentTabs = tab.index;
    },

    updateBreadCrumbs(tab) {
      switch (tab) {
        case "Contract":
          this.updateBreadCrumbAndTitle({
            title: "Rates",
            breadcrumbInfo:
              "Settings > Sales Settings > Rates > Rapido > Type 1",
          });
          break;
        case "Adhoc":
          this.updateBreadCrumbAndTitle({
            title: "Rates",
            breadcrumbInfo:
              "Settings > Sales Settings > Rates > Rapido > Adhoc",
          });
          break;
      }
    },
  },
  created() {
    // this.tabChanged({ index: 0 });
    this.$store.dispatch("rapidoAdhoc/loadAdhocTableData", {
      path: "/settings/sales/rates/rapido/adhoc/ratecard",
      mutation: "fetchAdhocTableData",
    });
  },
  mounted() {
    if (this.$store.state.rates.rapidoCurrentTabs != null) {
      let Index = this.$store.state.rates.rapidoCurrentTabs;
      this.tabChanged({ index: Index });
      this.activeIndex = Index;
    }
  },
  components: {
    TabMenu,
    ContractPage,
    RapidoDataTable,
    Toasts,
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
.rapido-contract-name {
  font-weight: bold;
  font-size: 16px;
  line-height: 28px;
  color: #4e5968;
}
</style>
