<template>
  <div>
    <TabMenu
      class="ratesSubTabs"
      :model="tabMenuData"
      v-model:activeIndex="activeIndex"
      v-on:tab-change="tabChanged($event)"
    />
    <!-- router view can also be used - provided paths dont conflict -->
    <div v-for="(tabs, index) of tabMenuData" :key="tabs.label">
      <keep-alive v-if="tabs.label != 'Claims'">
        <component
          dataKey="id"
          :tableClass="getTableClass(tabs.label)"
          :storePath="storePath"
          :tableDataName="tabs.data"
          :tableName="tabs.label"
          :overlayData="getOverlayData(tabs.label)"
          :tableData="$store.state[storePath][tabs.data]"
          :tableColumns="$store.state[storePath][tabs.columns]"
          v-if="activeIndex == index"
          v-bind:is="tabs.tab"
        ></component>
      </keep-alive>
      <keep-alive v-if="tabs.label == 'Claims'">
        <component v-if="activeIndex == index" v-bind:is="tabs.tab"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import TabMenu from "primevue/tabmenu";
export default {
  name: "RatesSubTabs",
  props: ["tabMenuData", "tabComponent", "tabtwoComponent", "storePath"],
  data: () => ({
    activeIndex: 0,
    currentTab: "Vehicle Type",
  }),
  methods: {
    getOverlayData(tableName) {
      if (
        tableName == "Summon" ||
        tableName == "Road Tax" ||
        tableName == "COE" ||
        tableName == "Accidents" ||
        tableName == "Insurance"
      ) {
        return this.$store.state.fleets.FleetVehicleOverlayData;
      }
      if (
        tableName == "Service" ||
        tableName == "Bike" ||
        tableName == "Van" ||
        tableName == "Additional Rates"
      ) {
        return this.$store.state.masters.expressRegionsOverlayData;
      }
      if (
        tableName == "Vehicle Type" ||
        tableName == "Claim Type" ||
        tableName == "Maintenance Type" ||
        tableName == "Delivery Point" ||
        tableName == "Product Name" ||
        tableName == "Inspection Check"
      ) {
        return this.$store.state.masters.fleetMastersCommonOverlayData;
      }
      if (tableName == "Fuel Card") {
        return this.$store.state.masters.fleetMastersFuelCardOverlayData;
      }
      if (tableName == "Cash Card") {
        return this.$store.state.masters.fleetMastersCashCardOverlayData;
      }
    },
    getDataKey(tableName) {
      if (tableName == "Express Rates") {
        return "region_id";
      } else {
        return "s_no";
      }
    },
    getTableClass(tableName) {
      return "p-datatable-sm FleetsTable" + " " + tableName;
    },
    tabChanged(tab) {
      for (let t in this.tabMenuData) {
        if (t == tab.index) {
          this.currentTab = this.tabMenuData[t].label;
        }
      }
      //FLEET MASTERS
      if (this.currentTab == "Vehicle Type") {
        this.$store.dispatch("masters/loadFleetMastersCommons", {
          path: "vehicleType",
          nameKey: "users_fleet_vehicle_types",
          mutation: "fetchFleetMastersVehicleTypes",
        });
      } else if (this.currentTab == "Claim Type") {
        this.$store.dispatch("masters/loadFleetMastersCommons", {
          path: "claimType",
          nameKey: "users_fleet_claim_types",
          mutation: "fetchFleetMastersClaimTypes",
        });
      } else if (this.currentTab == "Maintenance Type") {
        this.$store.dispatch("masters/loadFleetMastersCommons", {
          path: "MaintenanceType",
          nameKey: "users_fleet_maintenance_types",
          mutation: "fetchFleetMastersMaintenanceType",
        });
      } else if (this.currentTab == "Delivery Point") {
        this.$store.dispatch("masters/loadFleetMastersCommons", {
          path: "deliveryPoint",
          nameKey: "users_fleet_delivery_points",
          mutation: "fetchFleetMastersDeliveryPoint",
        });
      } else if (this.currentTab == "Product Name") {
        this.$store.dispatch("masters/loadFleetMastersCommons", {
          path: "productName",
          nameKey: "users_fleet_product_names",
          mutation: "fetchFleetMastersProductName",
        });
      } else if (this.currentTab == "Fuel Card") {
        this.$store.state.masters.fleetCardType = "FUEL";
        this.$store.dispatch("masters/loadFleetMastersCommons", {
          path: "fuelCard",
          nameKey: "users_fleet_fuel_card",
          mutation: "fetchFleetMastersFuelCards",
        });
      } else if (this.currentTab == "Cash Card") {
        this.$store.state.masters.fleetCardType = "CASH";
        this.$store.dispatch("masters/loadFleetMastersCommons", {
          path: "cashCard",
          nameKey: "users_fleet_cash_card",
          mutation: "fetchFleetMastersCashCards",
        });
      } else if (this.currentTab == "Inspection Check") {
        this.$store.dispatch("masters/loadFleetMastersCommons", {
          path: "InspectionCheck",
          nameKey: "users_fleet_inspection_check",
          mutation: "fetchFleetMastersInspectionCheck",
        });
      }
      //EXPENDITURE
      else if (this.currentTab == "Summon") {
        this.$store.dispatch("fleets/loadExpenditureCommons", {
          path: "summons",
          mutation: "fetchExpenditureSummonsTableData",
        });
      } else if (this.currentTab == "Claims") {
        this.$store.dispatch("fleets/loadExpenditureCommons", {
          path: "claim?cardType=Personal Card",
          mutation: "fetchExpenditureClaimsPersonalCardTableData",
        });
        this.$store.dispatch("fleets/loadExpenditureCommons", {
          path: "claim?cardType=Cash Card",
          mutation: "fetchExpenditureClaimsCashCardTableData",
        });
      } else if (this.currentTab == "Insurance") {
        this.$store.dispatch("fleets/loadExpenditureInsurance", {
          path: "insurance",
          mutation: "fetchExpenditureInsuranceTableData",
        });
      } else if (this.currentTab == "Road Tax") {
        this.$store.dispatch("fleets/loadExpenditureCommons", {
          path: "roadTax",
          mutation: "fetchExpenditureRoadTaxTableData",
        });
      } else if (this.currentTab == "COE") {
        this.$store.dispatch("fleets/loadExpenditureCommons", {
          path: "coe",
          mutation: "fetchExpenditureCoeTableData",
        });
      } else if (this.currentTab == "Accidents") {
        this.$store.dispatch("fleets/loadExpenditureCommons", {
          path: "accident",
          mutation: "fetchExpenditureAccidentsTableData",
        });
      }
    },
  },
  created() {
    this.tabChanged({ index: 0 });
  },
  components: {
    TabMenu,
  },
};
</script>

<style>
.ratesSubTabs .p-menuitem-link {
  background: #e1eaf9 !important;
  font-size: 12px !important;
  font-weight: bold !important;
}
.ratesSubTabs .p-highlight .p-menuitem-link {
  background: #e1eaf9 !important;
  border-color: #2196f3 !important;
  color: #2196f3 !important;
}
.ratesSubTabs .p-tabmenu-nav {
  background: #e1eaf9 !important;
}
</style>
