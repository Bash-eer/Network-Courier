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
          <!-- <div
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
          </div> -->
        </div>
      </div>

      <!-- right contents -->
      <!-- <div v-if="currentTab == 'Express'">
        <Buttons
          v-if="$store.state['rates']['zoneOrRegion'] == 'Contract'"
          label="Region"
          button_class="p-button-sm mr-4 p-button-outlined  add-btn custom-add-btn"
          v-on:childToParent="redirect('salesRatesRegion')"
        />
        <Buttons
          v-if="$store.state['rates']['zoneOrRegion'] == 'Adhoc'"
          label="Zones"
          button_class="p-button-sm mr-4 p-button-outlined  add-btn custom-add-btn"
          v-on:childToParent="redirect('salesRatesZones')"
        />
        <Buttons
          v-if="$store.state['rates']['zoneOrRegion'] == 'Contract'"
          label="Region Rate"
          button_class="p-button-sm mr-4 add-btn custom-add-btn"
          v-on:childToParent="redirect('RegionRates')"
        />
      </div> -->
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

        <keep-alive
          v-if="
            tabs.label == 'Surcharges' || tabs.label == 'AdditionalSurcharges'
          "
        >
          <component
            :tableDataName="tabs.data"
            :tableName="tabs.heading"
            :tableData="$store.state['expressAdhoc'][tabs.data]"
            :tableColumns="$store.state['expressAdhoc'][tabs.columns]"
            v-bind:is="tabs.tab"
          ></component>
        </keep-alive>
        <keep-alive v-else>
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
import {
  adhocZoneRatesNormalTabMenuData,
  adhocZoneRatesEcomTabMenuData,
} from "../Const/const";
import BikeVanTab from "./BikeVanTab.vue";
import AdhocTable from "../Tables/AdhocTable.vue";
export default {
  name: "RatesTabs",
  props: ["tabMenuData", "type", "defaultTab", "storePath"],
  components: {
    AdhocTable,
    BikeVanTab,
  },
  data: () => ({
    searcher: "",
    defaultTabIndex: 0,
    currentTab: "International",
  }),
  methods: {
    tabChange(tab) {
      this.currentTab = tab;
      this.$emit("currentTab", tab);
    },
    redirect(path) {
      this.$router.push({
        name: path,
      });
    },
    getTabMenuData(tab) {
      let source;
      switch (tab) {
        case "Normal":
          source = adhocZoneRatesNormalTabMenuData;
          break;
        case "E-Commerce":
          source = adhocZoneRatesEcomTabMenuData;
          break;
      }
      return source;
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
      if (type == "expressContract") {
        this.$store.dispatch("expressContract/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["expressContract/controlActivityDialog"];
      } else if (type == "internationalInbound") {
        this.$store.dispatch("internationalInbound/openDialog", {
          dialogDetails: {
            dialogName: name,
            dialogHeader: header,
          },
        });
        this.$store.getters["internationalInbound/controlActivityDialog"];
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
