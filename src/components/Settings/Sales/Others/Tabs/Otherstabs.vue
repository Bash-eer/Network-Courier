<template>
  <div class="w-100 tab-class">
    <div class="flex justify-content-between py-3 tabsBar">
      <!-- left contents -->
      <div class="flex">
        <div class="flex flex-row flex-wrap">
          <div class="flex ml-3 tabPills mr-6">
            <!-- tabs -->
            <ul class="nav nav-pills px-1" id="pills-tab" role="tablist">
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
      <div class="flex align-self-center toolPills">
        <!-- global table search -->
        <SearchField class="mr-2" storePath="contacts" />

        <!-- add new button -->
        <div class="flex">
          <Buttons
            v-if="currentTab == 'Competitors'"
            button_class="p-button-sm mr-2 add-btn custom-add-btn"
            label="Add New"
            v-on:childToParent="
              openDialog('CompetitorsDialog', 'others', 'Add New Competitor')
            "
          />
        </div>
        <!-- <Buttons
          button_class="p-button-sm mr-3 add-btn custom-add-btn"
          label="Add new" -->
        <div class="flex">
          <Buttons
            v-if="currentTab == 'Reference'"
            button_class="p-button-sm mr-2 add-btn custom-add-btn"
            label="Add new"
            v-on:childToParent="
              openDialog('ReferenceDialog', 'others', 'Add New Reference')
            "
          />
        </div>
        <div class="flex">
          <Buttons
            v-if="currentTab == 'Trade'"
            button_class="p-button-sm mr-2 add-btn custom-add-btn"
            label="Add new"
            v-on:childToParent="openDialog('TradeDialog', 'others', 'Add New ')"
          />
        </div>
        <div class="flex">
          <Buttons
            v-if="currentTab == 'Festivals'"
            button_class="p-button-sm mr-2 add-btn custom-add-btn"
            label="Add new"
            v-on:childToParent="
              openDialog('FestivalsDialog', 'others', 'Add New ')
            "
          />
        </div>
      </div>
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
        <!-- sub tabs -->
        <!-- <RatesSubTabs
          v-if="tabs.label == 'Express' || tabs.label == 'Rates'"
          storePath="masters"
          :tabMenuData="getRatesSubTabData(tabs.label)"
        /> -->

        <!-- dynamic component-->
        
        <keep-alive v-if="tabs.label != 'Others'">
          <component
            storePath="others"
            :tableClass="getTableClass(tabs.label)"
            :tableDataName="tabs.data"
            :tableName="tabs.label"
            :tableData="$store.state['others'][tabs.data]"
            :overlayData="getOverlayData()"
            :tableColumns="getTableColumn(tabs.label)"
            v-bind:is="tabs.tab"
          ></component>
        </keep-alive>
        <keep-alive v-if="tabs.label == 'Others'">
          <component v-bind:is="tabs.tab"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import OthersTable from "../OthersTable.vue"
import {
  competitorsTableColumnsData,
  referenceTableColumnsData,
  tradeTableColumnsData,
  festivalsTableColumnsData,
  othersTablesOverlayData,
} from "../const/const.js";
import OthersForm from "../OthersForm.vue";
export default {
  name: "OthersTabs",
  props: ["tabMenuData", "type", "defaultTab", "storePath"],
  data: () => ({
    defaultTabIndex: 0,
    currentTab: "Competitors",
    searcher: "",
  }),
  components: {
    OthersForm,
    OthersTable,
  },
  methods: {
    getPath(tabName) {
      switch (tabName) {
        case "Competitors":
          return ["competitor", "fetchCompetitorsTable"];
        case "Reference":
          return ["reference", "fetchReferenceTable"];
        case "Trade":
          return ["trade", "fetchTradeTable"];
        case "Festivals":
          return ["festival", "fetchFestivalsTable"];
      }
    },
    getOverlayData() {
      return othersTablesOverlayData;
    },
    tabChange(tab) {
      this.currentTab = tab;
      if (tab != "Others") {
        let ApiCallDetails = this.getPath(tab);
        this.$store.dispatch("others/loadOthersTables", {
          path: ApiCallDetails[0],
          mutation: ApiCallDetails[1],
        });
      }
      if (tab == "Others") {
        this.$store.dispatch("others/loadOtherFormTab");
      }
    },
    openDialog(name, type, header) {
      if (type == "others") {
        this.$store.dispatch("others/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["others/controlActivityDialog"];
      }
    },
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },
    getTableColumn(tableName) {
      switch (tableName) {
        case "Competitors":
          return competitorsTableColumnsData;
        case "Reference":
          return referenceTableColumnsData;
        case "Trade":
          return tradeTableColumnsData;
        case "Festivals":
          return festivalsTableColumnsData;
      }
    },
    globalSearcher(label, searchString) {
      this.$store.state["contacts"].globalSearch = searchString;
    },
    // getOverlayData(tableName) {
    // },
  },
  updated() {
    this.$store.state.users.breadcrumbTitle = "Rates";
    if (this.currentTab) {
      let tabLable = this.currentTab;
      tabLable = this.currentTab;
      this.$store.state.users.breadcrumbPath = `Settings > Sales Settings > Others > ${tabLable}`;
    }
  },
  created() {
    this.$store.dispatch("others/loadOthersTables", {
      path: "competitor",
      mutation: "fetchCompetitorsTable",
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
// .p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link {
//   background: #e1eaf9 !important;
// }
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
.nav-pills {
  background: #edf1f7 !important;
  border-radius: 4px !important;
}
::v-deep .p-datatable-responsive-scroll > .p-datatable-wrapper {
  margin-left: 19px !important;
}
::v-deep .p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
  color: #7e84a7;
  font-size: 12px;
  font-weight: 600;
}
.nav-pills .nav-link.active {
  background: #357dea;
  color: #fff;
  font-weight: bold;
  border-radius: 2px;
}

.nav-link {
  color: #7e84a7;
  font-family: $font-family-primary;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-align: left;
}
</style>
