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
        <!-- dynamic component-->

        <!--TEMPLATE : REGULAR -->
        <span>
          <!-- <component
            :tabMenuData="getTabMenuData(tabs.label)"
            v-bind:is="tabs.tab"
          >
          </component> -->
          <keep-alive v-if="tabs.label == 'ZonesTrips'">
            <BikeVanTab
              v-bind:tabMenuData="getExpansionTabMenuData(tabMenuData)"
              type="regionRates"
              defaultTab=""
              storePath=""
              :dataKey="tabMenuData"
            />
          </keep-alive>
          <keep-alive v-else>
            <component
              :tableDataName="tabs.label"
              :tableName="tabs.heading"
              :tableData="tabs.data"
              :tableColumns="tabs.columns"
              v-bind:is="tabs.tab"
            ></component>
          </keep-alive>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import AdhocSubTable from "../Tables/AdhocSubTable.vue";
import AdhocZonesZoneTabComponent from "../Tables/AdhocZonesZoneTabComponent.vue";
import BikeVanTab from "./BikeVanTab.vue";
import {
  adhocZoneTableExpansionTabMenuData,
  express_adhoc_zones_sub_tablecolumndata,
} from "../Const/const";
export default {
  name: "PageTabs",
  props: ["tabMenuData", "type", "defaultTab", "storePath"],
  components: { AdhocSubTable, AdhocZonesZoneTabComponent, BikeVanTab },
  data: () => ({
    searcher: "",
    defaultTabIndex: 0,
    currentTab: "",
  }),
  methods: {
    tabChange(tab) {
      this.currentTab = tab;
    },
    getTabMenuData(tab) {
      let source;
      switch (tab) {
        case "ZonesTrips":
          source = adhocZoneTableExpansionTabMenuData;
          break;
      }
      return source;
    },
    getExpansionTabMenuData(data) {
      return [
        {
          label: "Bike",
          tab: "AdhocSubTable",
          select: false,
          tabName: "Bike",
          heading: "Bike",
          apiKey: "bike",
          data: data[1]?.data.services[0]?.trips,
          columns: express_adhoc_zones_sub_tablecolumndata,
        },
        {
          label: "Van",
          tab: "AdhocSubTable",
          select: true,
          tabName: "Van",
          heading: "Van",
          apiKey: "van",
          data: data[1]?.data.services[1]?.trips,
          columns: express_adhoc_zones_sub_tablecolumndata,
        },
      ];
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
  font-weight: 600;
  font-size: 14px;
}
::v-deep .p-selectbutton .p-button.p-highlight {
  background: #357dea;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.07);
  border-radius: 3px;
  color: #fff;
}
::v-deep .nav-link {
  font-weight: 600;
  font-size: 14px;
  color: #9ea3bd;
  background: #fff;
}
::v-deep .nav-pills {
  background: #fff !important;
}
::v-deep .p-datatable-thead > tr > th {
  background: none !important;
}
</style>
