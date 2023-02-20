<template>
  <div class="w-100 tab-class">
    <div class="flex justify-content-between py-3 tabsBar">
      <div class="flex ml-2">
        <div class="flex flex-row flex-wrap">
          <div class="flex tabPills mr-6">
            <ul
              class="nav nav-pills tab-padding px-1"
              id="pills-tab"
              role="tablist"
            >
              <li
                class="nav-item"
                role="presentation"
                v-for="(tabs, index) of tabMenuData"
                :key="tabs.label"
              >
                <button
                  @click="tabChange(tabs.label)"
                  :class="
                    index == defaultTabIndex ? 'nav-link active' : 'nav-link'
                  "
                  :id="'pills-' + tabs.label + '-tab'"
                  data-bs-toggle="pill"
                  :data-bs-target="'#pills-' + tabs.label"
                  type="button"
                  role="tab"
                  :aria-controls="'pills-' + tabs.label"
                  :aria-selected="index == 0 ? true : false"
                >
                  {{ tabs.tabName }}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="tab-content" id="pills-tabContent">
      <div
        v-for="(tabs, index) of tabMenuData"
        :key="tabs.label"
        :class="index == 0 ? 'tab-pane fade show active' : 'tab-pane fade show'"
        :id="'pills-' + tabs.label"
        role="tabpanel"
        :aria-labelledby="'pills-' + tabs.label + '-tab'"
      >
        <!-- v-if="
            type == 'salesHome' &&
            (tabs.label != 'ApprovalsTab' ||
              tabs.label != 'DashboardTab' ||
              tabs.label != 'ContractsTab')
          "-->
        <keep-alive v-if="tabs.label != 'bulkAdjustment'">
          <component
            :tableClass="getTableClass(tabs.label)"
            :tableDataName="tabs.data"
            :tableName="tabs.label"
            :overlayData="getOverlayData(tabs.label)"
            :tableData="$store.state['salesContract'][tabs.data]"
            :tableColumns="$store.state['salesContract'][tabs.columns]"
            v-bind:is="tabs.tab"
          ></component>
        </keep-alive>
        <keep-alive v-if="tabs.label == 'bulkAdjustment'">
          
          <component
            :tableClass="getTableClass(tabs.label)"
            :tableDataName="tabs.data"
            :tableName="tabs.label"
            :overlayData="getOverlayData(tabs.label)"
            :tableData="$store.state['salesContract'][tabs.data]"
            :tableColumns="
              $store.state['salesContract'].salesBulkAdjustmentColumnData
            "
            v-bind:is="tabs.tab"
          ></component>
        </keep-alive>
        <keep-alive v-if="type == 'salesQuotation'">
          <component v-bind:is="tabs.tab"></component
        ></keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import ContractDataTable from "./DataTable.vue";

export default {
  name: "SalesTabs",
  props: ["tabMenuData", "type"],
  components: {
    ContractDataTable,
  },
  data: () => ({
    defaultTabIndex: 0,
    currentTab: "ContractContract",
  }),
  methods: {
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },

    getOverlayData() {
      return this.$store.state.masters.expressRegionsOverlayData;
    },
    tabChange(tab) {
      this.currentTab = tab;
      console.log(tab, "tab changed");
      if (tab == "ContractContract") {
        this.$store.dispatch("salesContract/loadContractTabData");
      } else {
        this.$store.dispatch("salesContract/loadBulkAdjustmentTableData");
      }
    },
  },
  // mounted(){
  //    this.currentTab = this.defaultTab;
  // }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
@media only screen and (max-width: 600px) {
  body {
    background-color: #fff !important;
  }
  ::v-deep .tabsBar {
    flex-wrap: wrap;
    background-color: #fff !important;
  }
  .toolPills {
    flex-wrap: wrap;
  }
}
a {
  text-decoration: none;
}
</style>
