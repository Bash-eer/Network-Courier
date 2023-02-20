<template>
  <div class="w-full tab-class vehiclesTabParentCard h-100">
    <div class="flex justify-content-between tabsBar">
      <div class="flex w-full">
        <div class="flex flex-row flex-wrap w-full">
          <div class="flex tabPills w-full">
            <!-- tabs -->
            <ul
              class="nav nav-pills tab-padding w-full vehiclesTabsCard"
              id="pills-tab"
              role="tablist"
            >
              <li
                :class="index == 0 ? 'nav-item' : 'nav-item'"
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

    <!-- tab-content -->
    <div class="tab-content h-100" id="pills-tabContent">
      <div
        v-for="(tabs, index) of tabMenuData"
        :key="tabs.label"
        :class="index == 0 ? 'tab-pane fade show active' : 'tab-pane fade show'"
        :id="'pills-' + tabs.label"
        role="tabpanel"
        :aria-labelledby="'pills-' + tabs.label + '-tab'"
      >
        <keep-alive>
          <component v-bind:is="tabs.tab"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FleetManagementHomeTabs",
  props: ["tabMenuData", "type"],
  data: () => ({
    defaultTabIndex: 0,
    currentTab: "VehicleLog",
  }),
  methods: {
    tabChange(label) {
      this.$store.state.fleets.vehicleDashboardTab = label;
    },
  },
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
.vehiclesTabsCard {
  border-radius: 10px 10px 0px 0px !important;
}

.vehiclesTabParentCard {
  border-radius: 10px 10px 10px 10px !important;
  overflow: auto;
}
a {
  text-decoration: none;
}
.nav-pills {
  background: #357dea !important;
}
.nav-pills .nav-link.active {
  color: #fff;
  background-color: #357dea;
  border-bottom: 2px solid #ffff;
  border-radius: 10px 10px 0px 0px;
  opacity: 1;
  font-weight: bold;
  margin: 0px;
  align-content: center !important;
}

.nav-pills[data-v-1373118a] {
  align-content: center !important;
}
.nav-link {
  color: #ffffff;
  opacity: 0.5;
  font-family: $font-family-primary;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-align: left;
}
</style>
