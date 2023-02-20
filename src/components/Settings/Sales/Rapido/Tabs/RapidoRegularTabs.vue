<template>
  <div class="w-100 table-expansion-tab-class">
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
                  @click="tabChange(tabs.label, tabs.apiKey)"
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
      <div></div>
    </div>
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
        <keep-alive v-if="tabs.label == 'ecommerce'">
          <NewTab :tabMenuData="ecommerceTabMenuData" />
        </keep-alive>

        <keep-alive v-if="tabs.label != 'ecommerce'">
          <component
            :tableDataName="tabs.label"
            :tableName="tabs.label"
            :tableData="tabs.data"
            :tableColumns="getTableColumnData(tabs.label)"
            v-bind:is="tabs.tab"
          >
          </component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
import ContractDataTable from "../Tables/ContractDataTable.vue";
import RapidoSubTabs from "../Tabs/RapidoSubTabs.vue";
import NewTab from "../Tabs/NewTab.vue";
import {
  contractSubTableColumnsData,
  AdhocRateZoneOnDemandServiceTableColumnData,
  AdhocRateZoneSurchargesTableColumnData,
  AdhocRateZoneAdditionalSurchargesTableColumnData,
  RapidoContractUpperLevelType2SubTableColumnData,
} from "../const/const";
// import {mapGetters} from "vuex";
export default {
  name: "PageTabs",
  props: ["tabMenuData", "type", "defaultTab", "storePath"],
  components: { ContractDataTable, RapidoSubTabs, NewTab },
  data: () => ({
    searcher: "",
    defaultTabIndex: 0,
    currentTab: "",
    tableColumns: contractSubTableColumnsData,
    ecommerceTabMenuData: [],
  }),
  methods: {
    tabChange(tab) {
      this.currentTab = tab;
    },

    getTableColumnData(tab) {
      console.log(tab, "newtabso");
      switch (tab) {
        case "onDemandService":
          return AdhocRateZoneOnDemandServiceTableColumnData;
        case "surcharges":
          return AdhocRateZoneSurchargesTableColumnData;
        case "additionalSurcharges":
          return AdhocRateZoneAdditionalSurchargesTableColumnData;
        default:
          return RapidoContractUpperLevelType2SubTableColumnData;
      }
    },
    getTableData(tab) {
      switch (tab) {
        case "onDemandService":
          return this.$store.state.rapidoAdhoc
            .AdhocRateZoneOnDemandServiceTableData;
        case "surcharges":
          return this.$store.state.rapidoAdhoc.AdhocRateZoneSurchargesTableData;
        case "additionalSurcharges":
          return this.$store.state.rapidoAdhoc
            .AdhocRateZoneAdditionalSurchargesTableData;
        default:
          return this.$store.state.rapidoContract
            .RapidoContractType1Type2SubTableData;
      }
    },
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
