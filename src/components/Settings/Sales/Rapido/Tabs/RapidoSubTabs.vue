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
      <div>
        <keep-alive>
          <component
            :tableDataName="tabs.label"
            :tableName="tabs.label"
            :tableData="getTableData(tabs.label)"
            :tableColumns="getTableColumnData(tabs.label)"
            v-if="activeIndex == index"
            v-bind:is="tabs.tab"
          ></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import RapidoDataTable from "../Tables/DataTable.vue";
import {
  TypeOneContractTableColumnData,
  TypeTwoContractTableColumnData,
} from "../const/const.js";
import TabMenu from "primevue/tabmenu";
import { mapState, mapMutations } from "vuex";
export default {
  props: ["tabMenuData", "storePath"],
  data: () => ({
    activeIndex: 0,
    currentTab: "",
  }),
  computed: {
    ...mapState({
      rapidoMainTab: (state) => state.rapidoContract.rapidoMainTab,
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
          this.$store.state.rapidoContract.rapidoContractSubTabsType =
            this.tabMenuData[t].label;
          if (
            this.ratesCurrentTab == "Rapido" &&
            this.rapidoMainTab == "Contract"
          ) {
            this.updateBreadCrumbs(this.currentTab);
          }
        }
      }
      this.listApiCallHandler(tab.index);
    },
    updateBreadCrumbs(tab) {
      switch (tab) {
        case "Type1":
          this.updateBreadCrumbAndTitle({
            title: "Rates",
            breadcrumbInfo:
              "Settings > Sales Settings > Rates > Rapido > Type 1",
          });
          break;
        case "Type2":
          this.updateBreadCrumbAndTitle({
            title: "Rates",
            breadcrumbInfo:
              "Settings > Sales Settings > Rates > Rapido > Type 2",
          });
          break;
      }
    },
    listApiCallHandler(index) {
      //type 1 list api call
      if (index == 0) {
        this.$store.dispatch("rapidoContract/loadrapidoContractTypeOneData", {
          path: "/settings/sales/rates/rapido/contract/ratecard/typeone",
          mutation: "fetchRapidoContractTypeOneData",
        });
      }
      //type 2 list api call
      else if (index == 1) {
        this.$store.dispatch("rapidoContract/loadrapidoContractTypeTwoData", {
          path: "/settings/sales/rates/rapido/contract/ratecard/typetwo",
          mutation: "fetchRapidoContractTypeTwoData",
        });
      }
    },
    getTableColumnData(tab) {
      switch (tab) {
        case "Type1":
          return TypeOneContractTableColumnData;
        case "Type2":
          return TypeTwoContractTableColumnData;
      }
    },
    getTableData(tab) {
      switch (tab) {
        case "Type1":
          return this.$store.state.rapidoContract.rapidoContractType1TableData;
        case "Type2":
          return this.$store.state.rapidoContract.rapidoContractType2TableData;
      }
    },
  },
  created() {
    this.tabChanged({ index: 0 });
  },
  components: {
    TabMenu,
    RapidoDataTable,
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
