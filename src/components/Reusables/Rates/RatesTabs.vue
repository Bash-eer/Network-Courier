<template>
  <div class="w-100 tab-class">
    <div class="flex justify-content-between py-3 tabsBar">
      <!-- left contents -->
      <div class="flex">
        <div class="flex flex-row flex-wrap">
          <div class="flex ml-3 tabPills mr-6">
            <!-- tabs -->
            <ul class="nav nav-pills py-2 px-1" id="pills-tab" role="tablist">
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
        <div class="mr-3">
          <TextField
            v-if="type == 'ratesHome'"
            v-model="searcher"
            placeholder="Search by Keyword"
            icon="pi pi-search"
            icon_class="p-input-icon-left"
            classes="p-inputtext-sm  search-text"
            v-on:childToParent="globalSearcher"
          />
        </div>
        <!-- countries button -->
        <Buttons
          v-if="currentTab == 'International' && type == 'ratesHome'"
          button_class="p-button-sm mr-4 add-btn custom-add-btn p-button-outlined"
          label="Countries"
          v-on:childToParent="openDialog()"
        />
        <!-- add new button -->
        <Buttons
          v-if="currentTab == 'International' && type == 'ratesHome'"
          button_class="p-button-sm mr-4 add-btn custom-add-btn"
          label="Add New"
          v-on:childToParent="openDialog()"
        />
        <!-- regions button -->
        <Buttons
          v-if="currentTab == 'Express'"
          button_class="p-button-sm mr-4 add-btn custom-add-btn p-button-outlined"
          label="Regions"
          v-on:childToParent="goTo('Regions')"
        />
        <!-- add muli tier rate button -->
        <Buttons
          v-if="type == 'expressMultiTierRates'"
          button_class="p-button-sm mr-4 add-btn custom-add-btn"
          label="Add New"
          v-on:childToParent="openDialog()"
        />
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
        <RatesSubTabs
          v-if="tabs.label == 'Express' || tabs.label == 'Rates'"
          storePath="masters"
          :tabMenuData="getRatesSubTabData(tabs.label)"
        />

        <!-- dynamic component-->
        <keep-alive
          v-if="
            tabs.label == 'International' ||
            tabs.label == 'Rapido' ||
            tabs.label == 'Zones' ||
            tabs.label == 'Trips' ||
            tabs.label == 'RatesMultiTier' ||
            tabs.label == 'Additional'
          "
        >
          <component
            storePath="sales"
            :tableClass="getTableClass(tabs.label)"
            :tableDataName="tabs.data"
            :tableName="tabs.label"
            :overlayData="getOverlayData(tabs.label)"
            :tableData="$store.state['masters'][tabs.data]"
            :tableColumns="$store.state['masters'][tabs.columns]"
            v-bind:is="tabs.tab"
          ></component>
        </keep-alive>
        <keep-alive v-if="type == 'weightsAndRates'">
          <component v-bind:is="tabs.tab"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RatesTabs",
  props: ["tabMenuData", "type"],
  data: () => ({
    defaultTabIndex: 0,
    currentTab: "International",
  }),
  methods: {
    goTo(pageName) {
      if (pageName == "Regions") {
        this.$store.dispatch("masters/loadExpressRegions");
        //programmatic router navigation in vue-router
        this.$router.push({
          name: "AddRegion",
        });
      }
    },
    getRatesSubTabData(tab) {
      if (tab == "Express") {
        return this.$store.state["masters"].expressSubTabMenuData;
      }
      if (tab == "Rates") {
        return this.$store.state["masters"].expressRatesSubTabMenuData;
      }
    },
    tabChange(tab) {
      this.currentTab = tab;
      if (tab == "Express") {
        this.$store.dispatch("masters/loadExpressRates");
      }
    },
    openDialog() {
      if (this.type == "expressMultiTierRates") {
        this.$store.state["users"].dialogComponent = "AddNewMultiTierRate";
        this.$store.getters["users/controlActivityDialog"];
      }
      if (
        this.currentTab == "International" &&
        this.type != "expressMultiTierRates"
      ) {
        //programmatic router navigation in vue-router
        this.$router.push({
          name: "AddNew",
        });
      }
    },
    getTableClass(tableName) {
      return "p-datatable-sm" + " " + tableName;
    },
    getOverlayData(tableName) {
      if (tableName == "International") {
        return this.$store.state["masters"].internationalRatesOverlayData;
      }
      if (
        tableName == "Trips" ||
        tableName == "RatesMultiTier" ||
        tableName == "Additional"
      ) {
        return this.$store.state.masters.expressRegionsOverlayData;
      }
    },
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
