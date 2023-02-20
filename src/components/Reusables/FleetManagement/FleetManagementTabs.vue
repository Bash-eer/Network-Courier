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
        </div>
      </div>

      <!-- right contents -->
      <div class="flex align-self-center toolPills">
        <ReportExport v-if="type == 'fleetClaims'" :type="tableName" />

        <!--Import button -->
        <Buttons
          v-if="type == 'fleetClaims'"
          button_class="p-button-sm mr-2 p-button-outlined color-357dea"
          label="Import"
        />
        <!--Generate Voucher button-->
        <Buttons
          v-if="type == 'fleetClaims'"
          button_class="p-button-sm mr-2 bg-357dea"
          label="Generate Voucher"
        />
        <!--Add New button -->
        <Buttons
          v-if="type == 'fleetClaims'"
          button_class="p-button-sm mr-2 bg-357dea"
          label="Add New"
          v-on:childToParent="openDialog('NewClaimDialog')"
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
        <!-- dynamic component-->
        <keep-alive
          v-if="
            type == 'fleetsVehicleHome' ||
            type == 'fleetClaims' ||
            type == 'fleetMaintenance' ||
            type == 'fleetsVehiclesDashboard'
          "
        >
          <component
            dataKey="id"
            :tableClass="getTableClass(tabs.label)"
            :tableDataName="tabs.data"
            :tableName="tabs.heading"
            :overlayData="getOverlayData(tabs.label)"
            :tableData="$store.state['fleets'][tabs.data]"
            :tableColumns="$store.state['fleets'][tabs.columns]"
            v-bind:is="tabs.tab"
            :storePath="'fleets'"
          ></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FleetManagementTabs",
  props: ["tabMenuData", "type"],
  data: () => ({
    searcher: "",
    defaultTabIndex: 0,
    currentTab: "International",
  }),
  methods: {
    getTableClass(tableName) {
      if (tableName == "Maintenance" || tableName == "Inspection") {
        return "p-datatable-sm" + " " + "FleetsTable";
      } else {
        return "p-datatable-sm" + " " + tableName;
      }
    },
    // eslint-disable-next-line no-unused-vars
    getOverlayData(tableName) {
      return this.$store.state.fleets.FleetCashCardOverlayData;
    },
    tabChange(tab) {
      this.currentTab = tab;
      if (this.currentTab == "FleetVehicles") {
        this.$store.dispatch("fleets/loadFleetVehicles");
      }
    },
    openDialog(name) {
      this.$store.state.sales.stepperEditMode = false;
      this.$store.state["users"].dialogComponent = name;
      this.$store.getters["users/controlActivityDialog"];
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
a {
  text-decoration: none;
}
</style>
