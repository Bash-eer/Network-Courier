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
        <!-- <keep-alive> -->
        <component
          :tableClass="getTableClass(tabs.label)"
          :tableDataName="tabs.data"
          :tableName="tabs.label"
          :overlayData="getOverlayData(tabs.label)"
          :tableData="$store.state['salesApproval'][tabs.data]"
          :tableColumns="$store.state['salesApproval'][tabs.columns]"
          v-bind:is="tabs.tab"
        ></component>
        <!-- </keep-alive> -->
        <!-- <keep-alive v-if="type == 'salesQuotation'">
          <component v-bind:is="tabs.tab"></component
        ></keep-alive> -->
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "./DataTable.vue";
import TerminationDataTable from "./TerminationDatatable.vue";
import { salesCommon } from "../../../store/helper"
export default {
  name: "SalesTabs",
  props: ["tabMenuData", "type"],
  components: {
    DataTable,
    TerminationDataTable,
  },
  data: () => ({
    defaultTabIndex: 0,
    currentTab: "ApprovalsTerminationTab",
  }),
  methods: {
    ...salesCommon,
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },

    getOverlayData() {
      return this.$store.state.masters.expressRegionsOverlayData;
    },
    tabChange(tab) {
      this.currentTab = tab;
      console.log(tab, "tabbbb");
      if (tab == "ApprovalsContractTab") {
        this.$store.dispatch("salesApproval/loadApprovalContracts");
      } else if (tab == "ApprovalsTerminationTab") {
        this.$store.dispatch("salesApproval/loadApprovalTerminationTableData");
      }
      else if(tab == "ApprovalsRateAdjustment"){
        this.loadRateAdjustment()
      }
      // else if (tab == "ApprovalsTerminationTab") {
      //   this.$store.dispatch("salesApproval/loadApprovalContracts");
      // }
    },
  },
  // created() {
  //   this.currentTab = "ApprovalsTerminationTab";
  //   this.$store.dispatch("salesApproval/loadApprovalTerminationTableData");
  // },
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
