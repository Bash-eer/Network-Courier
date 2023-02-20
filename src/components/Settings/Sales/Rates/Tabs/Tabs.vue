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
          <div
            v-if="currentTab == 'Attendance'"
            class="flex align-items-center attendanceTabText"
          >
            <div class="flex flex-row">
              <div
                class="flex mr-2"
                v-for="(attendance, index) in $store.state.contacts
                  .contactManagementAttendanceTabData"
                :key="index"
              >
                <span>{{ index }}: {{ attendance }}</span>
                <span class="line-opacity">&nbsp;|</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- right contents -->
      <div class="flex flex-row">
        <div v-if="currentTab == 'Express'">
          <Buttons
            v-if="$store.state['rates']['zoneOrRegion'] == 'Contract'"
            label="Region"
            button_class="p-button-sm mr-4 p-button-outlined add-btn custom-add-btn"
            v-on:childToParent="redirect('salesRatesRegion')"
          />
          <Buttons
            v-if="$store.state['rates']['zoneOrRegion'] == 'Adhoc'"
            label="Zones"
            button_class="p-button-sm mr-4 p-button-outlined color-357dea"
            v-on:childToParent="redirect('salesRatesZones')"
          />
          <!-- <Buttons
          v-if="$store.state['rates']['zoneOrRegion'] == 'Adhoc'"
          label=" Clone Zone Range"
          button_class="p-button-sm mr-4 add-btn custom-add-btn"
          v-on:childToParent="
            openDialog('AddNewRate', 'expressAdhoc', 'Add New')
          "
        /> -->
          <!-- <Buttons
          v-if="currentTab == 'Express'"
          label="Contract Rate"
          button_class="p-button-sm mr-4 add-btn custom-add-btn"
          v-on:childToParent="
            openDialog('AddNewRate', 'expressContract', 'Add New')
          "
        />
        <Buttons
          v-if="currentTab == 'Express'"
          label="Adhoc Rate"
          button_class="p-button-sm mr-4 add-btn custom-add-btn"
          v-on:childToParent="
            openDialog('AddNewRate', 'expressAdhoc', 'Add New')
          "
        /> -->
          <!-- <Buttons
            v-if="$store.state['rates']['zoneOrRegion'] == 'Contract'"
            label="Region Rate"
            button_class="p-button-sm mr-4 add-btn custom-add-btn"
            v-on:childToParent="redirect('RegionRates')"
          /> -->
        </div>
        <div v-if="currentTab == 'Rapido'">
          <span v-if="$store.state.rapidoContract.rapidoMainTab == 'Contract'">
            <div class="flex flex-row">
              <div class="flex">
                <!-- <SearchField /> -->
                <SearchField storePath="contacts" />
              </div>
              <div class="flex ml-2">
                <ReportExport />
              </div>

              <div class="flex">
                <Buttons
                  label="Add New"
                  button_class="dialog-button-text save-style  mr-2"
                  v-on:childToParent="
                    $store.state.rapidoContract.rapidoContractSubTabsType ==
                    'Type2'
                      ? openDialog(
                          'TypeTwoNewDialog',
                          'rapidoContract',
                          'Add New (Type 2)'
                        )
                      : openDialog(
                          'TypeOneNewDialog',
                          'rapidoContract',
                          'Add New (Type 1)'
                        )
                  "
                />
              </div>
            </div>
          </span>
          <span v-if="$store.state.rapidoContract.rapidoMainTab == 'Adhoc'">
            <div class="flex flex-row">
              <div class="flex">
                <SearchField storePath="contacts" />
              </div>
              <div class="flex ml-2">
                <Buttons
                  label="Zones"
                  button_class="p-button-sm mr-1 add-btn custom-add-btn "
                  v-on:childToParent="redirect('ZonesAdhoc')"
                />
              </div>
              <div class="flex">
                <ReportExport class="mr-2" />
                <Buttons
                  label="Add New"
                  button_class="p-button-sm mr-2 add-btn custom-add-btn"
                  v-on:childToParent="
                    openDialog('AddNewRate', 'rapidoAdhoc', 'Add New')
                  "
                />
              </div>
            </div>
          </span>
        </div>
        <div
          v-if="currentTab === 'International'"
          class="flex align-items-center"
        >
          <SearchField storePath="Outbound" class="mr-3" />
          <Buttons
            label="Countries"
            button_class="p-button-sm mr-3 p-button-outlined  add-btn custom-add-btn color-357dea"
            v-on:childToParent="redirect('internationalCountryList')"
          />
          <Buttons
            v-if="currentTabIndex == 0"
            label="Add New"
            button_class="p-button-sm mr-3 add-btn custom-add-btn bg-357dea"
            v-on:childToParent="redirect('AddNewZone')"
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
        <!-- dynamic component-->
        <!-- <component
            :tableDataName="tabs.data"
            :tableName="tabs.heading"
            :tableData="$store.state[storePath][tabs.data]"
            :tableColumns="$store.state[storePath][tabs.columns]"
            v-bind:is="tabs.tab"
          ></component> -->
        <!-- <keep-alive>
           <component v-bind:is="tabs.tab"></component>
        </keep-alive> -->
        <keep-alive>
          <component
            :tabMenuData="getTabMenuData(tabs.label)"
            v-bind:is="tabs.tab"
          >
          </component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
// import ExpressHome from "../../Express/ExpressHome.vue"
import InternationalTabs from "../../../Sales/International/Tabs/InternationalTabs.vue";
import RapidoTabs from "../../../Sales/Rapido/Tabs/RapidoTabs.vue";
import { InternationalPageTabMenuData } from "../../../Sales/International/const.js";
import { RapidoPageTabMenuData } from "../../../Sales/Rapido/const/const.js";
import ExpressTabs from "../../Express/ExpressHomeTab.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "RatesTabs",
  props: ["tabMenuData", "type", "defaultTab", "storePath"],
  components: {
    // ExpressHome,
    InternationalTabs,
    RapidoTabs,
    ExpressTabs,
  },
  data: () => ({
    searcher: "",
    defaultTabIndex: 0,
    currentTab: "International",
  }),
  computed: {
    ...mapGetters({
      currentTabIndex: "Outbound/currentTabIndex",
    }),
  },
  methods: {
    ...mapMutations({
      updateBreadCrumbAndTitle: "users/updateBreadCrumbAndTitle",
    }),
    tabChange(tab) {
      this.currentTab = tab;
      this.$store.state.rates.ratesCurrentTab = tab;
      this.updateBreadCrumbs(tab);
    },
    redirect(path) {
      this.$router.push({
        name: path,
      });
    },
    getTabMenuData(tab) {
      let source;
      switch (tab) {
        case "International":
          source = InternationalPageTabMenuData;
          break;
        case "Rapido":
          source = RapidoPageTabMenuData;
          break;
        case "Express":
          source = this.$store.state.rates.ExpressPageTabMenuData;
          break;
      }
      return source;
    },
    updateBreadCrumbs(tab) {
      switch (tab) {
        case "International":
          this.updateBreadCrumbAndTitle({
            title: "Rates",
            breadcrumbInfo: "Settings > Sales Settings > Rates > International > Outbound",
          });
          break;
        case "Rapido":
          this.updateBreadCrumbAndTitle({
            title: "Rates",
            breadcrumbInfo: "Settings > Sales Settings > Rates > Rapido > Type 1",
          });
          break;
        case "Express":
          this.updateBreadCrumbAndTitle({
            title: "Rates",
            breadcrumbInfo: "Settings > Sales Settings > Rates > Express > Contract Rates",
          });
          break;
      }
    },
    openDialog(name, type, header) {
      //opens express contract dialogs
      this.$store.dispatch(type + "/openDialog", {
        dialogDetails: {
          dialogName: name,
          dialogHeader: header,
        },
      });
      this.$store.getters[type + "/controlActivityDialog"];
    },
  },
  mounted() {
    if (this.$store.state.rates.ratesCurrentTab != null) {
      let lableName = this.$store.state.rates.ratesCurrentTab;
      if (document.getElementById(`pills-${lableName}-tab`)) {
        document.getElementById(`pills-${lableName}-tab`).click();
      } else {
        this.currentTab = this.defaultTab;
        
      }
    } else {
      this.currentTab = this.defaultTab;
      this.tabChange(this.defaultTab);
    }
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
.p-button-sm {
  background: #2196f3;
}
</style>
