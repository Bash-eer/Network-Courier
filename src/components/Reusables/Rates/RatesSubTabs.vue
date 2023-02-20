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
        <component
          :dataKey="getDataKey(tabs.label)"
          :tableClass="getTableClass(tabs.label)"
          :storePath="storePath"
          :tableDataName="tabs.data"
          :tableName="tabs.label"
          :overlayData="getOverlayData(tabs.label)"
          :tableData="$store.state[storePath][tabs.data]"
          :tableColumns="$store.state[storePath][tabs.columns]"
          v-if="activeIndex == index"
          v-bind:is="tabs.tab"
        ></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import TabMenu from "primevue/tabmenu";
export default {
  name: "RatesSubTabs",
  props: ["tabMenuData", "tabComponent", "tabtwoComponent", "storePath"],
  data: () => ({
    activeIndex: 0,
  }),
  methods: {
    getOverlayData(tableName) {
      if (
        tableName == "Service" ||
        tableName == "Bike" ||
        tableName == "Van" ||
        tableName == "Additional Rates"
      ) {
        return this.$store.state.masters.expressRegionsOverlayData;
      }
    },
    getDataKey(tableName) {
      if (tableName == "Express Rates") {
        return "region_id";
      } else {
        return "s_no";
      }
    },
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },
    tabChanged(tab) {
      console.log(tab);
    },
  },
  components: {
    TabMenu,
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
/* .ratesSubTabs .p-highlight {
  color: blue !important;
} */
.ratesSubTabs .p-tabmenu-nav {
  background: #e1eaf9 !important;
}
</style>
