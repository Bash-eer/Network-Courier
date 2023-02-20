<template>
  <div>
    <!--    <component
          dataKey="id"
          :storePath="storePath"
          :tableDataName="tabs.label"
          :tableName="tabs.label"
          :transport="tabs.transport"
          :type="tabs.type"
          :apiKey="tabs.apiKey"
          v-if="activeIndex == index"
          v-bind:is="tabs.tab"
          :TableData="tabs.data"
          :TableColumns="
            $store.state.expressContract.ExpressAdhocEcomVanTableColumnData
          "
        ></component>-->
    <TabMenu
      class="ratesSubTabs"
      :model="tabMenuData"
      v-model:activeIndex="activeIndex"
      v-on:tab-change="tabChanged($event)"
    />
    <!-- router view can also be used - provided paths dont conflict -->
    <div v-for="(tabs, index) of tabMenuData" :key="tabs.label">
      <!-- <keep-alive> -->
      <ThirdPageDataTable
        tableClass="p-datatable-sm AdhocBikeVanTable"
        tableDataName="ExpressAdhocBikeVanDynamicTabTableData"
        :overlayData="TableOverlay"
        tableName="ExpressAdhocBikeVanDynamicTabTable"
        :tableData="tabs.data"
        :tableColumns="
          $store.state.expressAdhoc.ExpressAdhocEcomVanTableColumnData
        "
        dataKey="id"
        v-if="activeIndex == index"
      />
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script>
// :tableData="tabs.data"
//           :tableColumns="
//             $store.state.expressContract.ExpressAdhocEcomVanTableColumnData
//           "
import TabMenu from "primevue/tabmenu";
import ThirdPageDataTable from "../Tables/ThirdPageTable.vue";
//table
// import RegionRatesTable from "../Tables/RegionRatesTable.vue";
//function imports
// import { getTableInput } from "../functions/functions.js";

export default {
  name: "RatesSubTabs",
  props: ["tabMenuData", "storePath"],
  data: () => ({
    activeIndex: 0,
    currentTab: "",
  }),
  components: {
    TabMenu,
    // RegionRatesTable,
    ThirdPageDataTable,
  },
  methods: {
    //fetch table input
    // getTableInput(format, transport, type, label) {
    //   return getTableInput(
    //     this.$store.state.expressContract.regionRatesTableData,
    //     format,
    //     transport,
    //     type,
    //     label
    //   );
    // },
    resetTab() {
      this.$store.dispatch("expressContract/regionRatesTabStateAction", {
        variable: "regionRatesTwoTierSubTab",
        value: "",
      });
    },
    tabChanged(tab) {
      for (let t in this.tabMenuData) {
        if (t == tab.index) {
          this.currentTab = this.tabMenuData[t].label;
          if (this.tabMenuData[t].label != "2-Tier") {
            this.resetTab();
          }
          if (this.tabMenuData[t].type == "normal") {
            this.$store.dispatch("expressContract/regionRatesTabStateAction", {
              variable: "regionRatesSubTab",
              value: this.tabMenuData[t].apiKey,
            });
          }
          //for dynamically generated sub tabs
          if (this.tabMenuData[t].type == "e_commerce") {
            this.$store.dispatch("expressContract/regionRatesTabStateAction", {
              variable: "regionRatesECommerceSubTab",
              value: tab.index,
            });
          }
        }
      }
    },
    tabcontrol() {
      this.tabChanged({ index: 0 });
    },
  },
  created() {
    this.tabcontrol();
  },
  watch: {
    tabMenuData: function () {
      this.tabcontrol();
    },
  },
};
</script>

<style>
.ratesSubTabs .p-menuitem-link {
  background: #e1eaf9 !important;
  font-size: 12px !important;
  font-weight: bold !important;
}
.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link {
  color: #4e5968 !important;
}
.p-tabmenu .p-tabmenu-nav .p-tabmenuitem.p-highlight .p-menuitem-link {
  color: #357dea !important;
}
.ratesSubTabs .p-highlight .p-menuitem-link {
  background: #e1eaf9 !important;
  border-color: #2196f3 !important;
  color: #357dea !important;
}
.ratesSubTabs .p-tabmenu-nav {
  background: #e1eaf9 !important;
}
</style>
