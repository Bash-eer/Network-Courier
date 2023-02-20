<template>
  <div class="w-100 tab-class">
    <div class="flex justify-content-between py-3 tabsBar">
      <!-- left contents -->
      <div class="flex ml-2">
        <div class="flex flex-row flex-wrap">
          <div class="flex tabPills mr-6">
            <!-- tabs -->
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
                  @click="
                    tabChange(
                      tabs.label,
                      tabs.apiKey,
                      tabs.mutation,
                      tabs.heading,
                      tabs.dynamic
                    )
                  "
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
      <!-- right contents -->
    </div>
    <div v-if="tab == 'ClearanceAndAdditional'">hello boss</div>
    <!-- tab-content -->
    <div class="tab-content" id="pills-tabContent">
      <div
        v-for="(tabs, index) of tabMenuData"
        :key="tabs.label"
        :class="index == 0 ? 'tab-pane fade show active' : 'tab-pane fade show'"
        :id="'pills-' + tabs.label"
        role="tabpanel"
        :aria-labelledby="'pills-' + tabs.label + '-tab'"
      >
        <InBoundTable
          :tableData="tableDatas"
          :tableColumns="header"
          :tableName="tableName"
        />
        <div v-if="tableName == 'ClearanceAndAdditionalEdit'">
          <span class="flex ml-2 p-1">Additional Rate</span>
          <AdditionalRate
            :tableData="subTableDatas"
            tableName="AdditionalRateEdit"
            :tableColumns="AdditionalHeader"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {
  ClearanceModeClearanceTableColumnData,
  ClearanceModeClearanceAdditionalTableColumnData,
  ClearanceModeDynamicTabSub,
  ClearanceModeClearanceAdditionalExpandedTableColumns,
} from "../const.js";
import InBoundTable from "../Inbound/Tables/DataTable.vue";
import AdditionalRate from "../Inbound/Tables/AdditonalRateDataTable.vue";
// import ExpansionTables from "../Inbound/Tables/ExpansionTable.vue"
// import {mapState} from "vuex";

export default {
  name: "InternationalClearanceAndAdditioanlTabs",
  props: ["tabMenuData", "type", "defaultTab", "storePath"],

  data: () => ({
    searcher: "",
    defaultTabIndex: 0,
    currentTab: "",
    parentTab: "",
    tableDatas: [],
    subTableDatas: [],
    tableName: [],
    AdditionalHeader: ClearanceModeClearanceAdditionalExpandedTableColumns,

    // tabledata:
    //   this.$store.state.internationalInbound.clearanceModeData[this.getIndex()]
    //     .additional_clearance,
    header: ClearanceModeClearanceAdditionalTableColumnData,
    ClearanceModeClearanceTableColumnData,
    ClearanceModeClearanceAdditionalTableColumnData,
    clearanceModeDynamicTab: null,
    clearanceModeTabs: [],
    clearanceModeTabsSubs: ClearanceModeDynamicTabSub,
  }),
  components: {
    InBoundTable,
    AdditionalRate,
    // ExpansionTables
  },

  // mounted() {
  //   this.tableDatas = this.clearanceModeDatas[0].additional_clearance;
  // },
  methods: {
    tabChange(tab, apiKey, mutation, tabName, dynamic) {
      this.currentTab = tab;
      //  data: null,
      // });

      this.$store.state.internationalInbound.internationalMainTab = tabName;
      this.$store.state.internationalInbound.currentTabValue = tab;
      if (dynamic == true) {
        this.$store.state.internationalInbound.clearanceModeDynamicTabState =
          tab;
      }
      if (tab == "ClearanceMode") {
        this.$store.dispatch("internationalInbound/loadClearanceModeTabs");
      }

      //

      if (tab == "ClearanceAndAdditional") {
        this.header = ClearanceModeClearanceAdditionalTableColumnData;
        this.tableDatas = this.clearanceModeDatas[this.getIndex()]?.rates;
        this.tableName = "ClearanceAndAdditionalEdit";
        this.subTableDatas =
          this.clearanceModeDatas[this.getIndex()]?.additional_clearance;
      } else if (tab == "Clearance") {
        this.header = ClearanceModeClearanceTableColumnData;
        this.tableDatas = this.clearanceModeDatas[this.getIndex()]?.clearance;
        this.tableName = "ClearanceEdit";
      }
      // if (tab == "ClearanceAndAdditional" || tab == "Clearance") {
      //   console.log(
      //     this.$store.state.internationalInbound.clearanceModeDynamicTabState , "OneTwo"
      //   );
      // }
    },
    getDete() {
      this.$store.dispatch(
        "internationalInbound/loadClearanceandAditionalModeData",
        {
          path: "/settings/salesSettinigs/rates/international/inbound/clearanceMode/modes",
        }
      );
    },

    getIndex() {
      if (this.$store.state.internationalInbound?.clearanceModeData[0]?.id) {
        const index =
          this.$store.state.internationalInbound?.clearanceModeData.findIndex(
            (element) =>
              element["clearance_mode_name"] ==
              this.$store.state.internationalInbound
                .clearanceModeDynamicTabState
          );
        return index;
      }
    },
    loadTabData() {},
    // getTableData(tab) {
    //   switch (tab) {
    //     case "ClearanceAndAdditional":
    //       return this.$store.state.internationalInbound.clearanceModeData[
    //         this.getIndex()
    //       ].additional_clearance;

    //     case "Clearance":
    //       console.log(
    //         this.$store.state.internationalInbound.clearanceModeData[
    //           this.getIndex()
    //         ].clearance
    //       );
    //       return this.$store.state.internationalInbound.clearanceModeData[
    //         this.getIndex()
    //       ].clearance;
    //   }
    // },
  },
  computed: {
    ...mapState({
      clearanceModeDatas: (state) =>
        state.internationalInbound.clearanceModeData,
      // tripBikeTableDatas: (state) => state.express.tripBikeTableData,
      // tripsVanTableDatas:(state)=> state.express.tripsVanTableData
    }),
  },
  watch: {
    "$store.state.internationalInbound.clearanceModeTab": function () {
      if (this.$store.state.internationalInbound.clearanceModeTab.length != 0) {
        this.clearanceModeTabs =
          this.$store.state.internationalInbound.clearanceModeTab;
        // console.log(this.$store.state.internationalInbound.clearanceModeTab);
      }
    },
    "$store.state.internationalInbound.clearanceTabState": function () {
      this.parentTab = this.$store.state.internationalInbound.clearanceTabState;
      this.loadTabData();
      for (let index in this.clearanceModeDatas) {
        if (
          this.parentTab == this.clearanceModeDatas[index].clearance_mode_name
        ) {
          this.header = ClearanceModeClearanceAdditionalTableColumnData;
          this.tableDatas = this.clearanceModeDatas[index]?.rates;
          this.tableName = "ClearanceAndAdditionalEdit";
          this.subTableDatas =
            this.clearanceModeDatas[index]?.additional_clearance;
        }
      }
    },
    clearanceModeDatas: function () {
      this.tabChange(this.currentTab);
    },
  },
  created() {
    this.clearanceModeTabs =
      this.$store.state.internationalInbound.clearanceModeTab;
    this.currentTab = this.tabMenuData[0].label;
    this.$store.state.internationalInbound.clearanceTabState =
      this.tabMenuData[0].label;
    this.tableDatas = this.clearanceModeDatas[this.getIndex()]?.rates;
    this.tableName = "ClearanceAndAdditionalEdit";
    this.subTableDatas =
      this.clearanceModeDatas[this.getIndex()]?.additional_clearance;
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
@media only screen and (max-width: 600px) {
  body {
    background-color: rgb(255, 255, 255) !important;
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
.attendanceTabText {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  color: #000000;
}
.line-opacity {
  opacity: 0.2;
}
.PrintLableBtn {
  height: 32px;
}
::v-deep .search-text {
  width: 328px !important;
}
.Button-Font {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
}
</style>
