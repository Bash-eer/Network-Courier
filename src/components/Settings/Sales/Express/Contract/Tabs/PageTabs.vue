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
        <span v-if="type != 'regionRatesSubTabs'">
          <component v-bind:is="tabs.tab"></component>
        </span>
        <span v-if="type == 'regionRatesSubTabs'">
          <keep-alive>
            <component
              :tableDataName="tabs.label"
              :tableName="tabs.heading"
              :tableData="tableData"
              :tableColumns="
                getTableInput('columns', tabs.transport, tabs.type, tabs.apiKey)
              "
              :type="tabs.type"
              :transport="tabs.transport"
              v-bind:is="tabs.tab"
            ></component>
          </keep-alive>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
//table
import RegionRatesTable from '../Tables/RegionRatesTable.vue';

//region rates
import NormalRegionRates from '../RegionRates/Normal/NormalRegionRates.vue';
import ECommerceRegionRates from '../RegionRates/E-commerce/ECommerceRegionRates.vue';
import SurchargesRegionRates from '../RegionRates/Surcharges/SurchargesRegionRates.vue';
import AdditionalSurchargesRegionRates from '../RegionRates/AdditionalSurcharges/AdditionalSurchargesRegionRates.vue';

//normal region rates
//bike
import NormalBikeRates from '../RegionRates/Normal/Bike/BikeRates.vue';
//van
import NormalVanRates from '../RegionRates/Normal/Van/VanRates.vue';

//e-commerce region rates
//bike
import ECommerceBikeRates from '../RegionRates/E-commerce/Bike/BikeRates.vue';

//van
import ECommerceVanRates from '../RegionRates/E-commerce/Van/VanRates.vue';
import { mapActions, mapState, mapMutations  } from 'vuex';
//function imports
import { getTableInput } from '../functions/functions.js';

export default {
  name: 'PageTabs',
  props: ['tabMenuData', 'type', 'defaultTab', 'storePath'],
  components: {
    //table
    RegionRatesTable,

    //region rates
    NormalRegionRates,
    ECommerceRegionRates,
    SurchargesRegionRates,
    AdditionalSurchargesRegionRates,

    //normal region rates
    //bike
    NormalBikeRates,
    //van
    NormalVanRates,

    //e-commerce region rates
    //bike
    ECommerceBikeRates,
    ECommerceVanRates,
    //van
  },
  data: () => ({
    searcher: '',
    defaultTabIndex: 0,
    currentTab: '',
    tableData: [],
    tableDatas: null,
    tab: null,
  }),

  computed: {
    ...mapState({
      regionRatesByIdData: (state) => state.express.regionRatesById,
    }),    
  },
  mounted() {},
  methods: {
    ...mapActions('express', ['createNormalBikeRates']),
    ...mapActions('express', [
      'getRegionRatesById',
      'createNormalVanRates',
      'createMultiTierVanJob',
      'createMultiTierQuantity',
    ]),
    ...mapMutations({setMutliTierSubTab: "expressContract/editMutliTierSubTab"}),

    getTableInput(format, transport, type, label) {
      return getTableInput(
        this.$store.state.expressContract.regionRatesTableData,
        format,
        transport,
        type,
        label
      );
    },
    resetTab() {
      this.$store.dispatch('expressContract/regionRatesTabStateAction', {
        variable: 'regionRatesTwoTierSubTab',
        value: 'van_2_tire_rates_charge_by_weight',
      });
      this.$store.dispatch('expressContract/regionRatesTabStateAction', {
        variable: 'regionRatesSubTab',
        value: null,
      });
      this.$store.dispatch('expressContract/regionRatesTabStateAction', {
        variable: 'regionRatesECommerceSubTab',
        value: 0,
      });
    },
    resetTransportTab() {
      this.$store.dispatch('expressContract/regionRatesTabStateAction', {
        variable: 'regionRatesTransportTab',
        value: 'bike',
      });
    },

    // functionality used to reset resetRatesTwoTierSubTab Keys
    resetTransportTwoTierSubTab(key) {
      this.$store.dispatch('expressContract/regionRatesTabStateAction', {
        variable: 'regionRatesTwoTierSubTab',
        value: key,
      });
    },

    tabChange(tab, apiKey) {
      this.currentTab = tab;
      this.tab = apiKey;
      //setting the rates tab
      if (
        apiKey == 'normal' ||
        apiKey == 'e_commerce' ||
        apiKey == 'surcharges' ||
        apiKey == 'additional_surcharges'
      ) {
        this.resetTab();
        this.resetTransportTab();
        this.$store.dispatch('expressContract/regionRatesTabStateAction', {
          variable: 'regionRatesRateTab',
          value: apiKey,
        });
      }

      //setting the transport tab
      if (apiKey == 'bike' || apiKey == 'van') {
        this.resetTab();
        this.$store.dispatch('expressContract/regionRatesTabStateAction', {
          variable: 'regionRatesTransportTab',
          value: apiKey,
        });
      }

      if (apiKey == 'van_2_tire_rates_charge_by_weight') {
        this.resetTransportTwoTierSubTab(apiKey);
        this.$store.state.express.tier2Tab = 'Weight';
        this.getRegionRatesById(this.$store.state.express.rateCardId ?? this.$route.params.id).then(
          () => {
            for (var i = 0; i < this.regionRatesByIdData.charge_types.length; i++) {
              if (this.regionRatesByIdData.charge_types[i].charge_type == 'normal') {
                for (var j = 0; j <  this.regionRatesByIdData.charge_types[i].normal_charge_services.length; j++ ) {
                  if ( this.regionRatesByIdData.charge_types[i].normal_charge_services[j].service_type == 'van' ) {
                    if (this.$store.state.express.currentIndex == 2) {
                      this.tableData = this.regionRatesByIdData.charge_types[i].normal_charge_services[j].van_2_tire_rates_charge_by_weight;
                    }
                  }
                }
              }
            }
          }
        );
      }

      if (apiKey == 'van_2_tire_rates_charge_by_quantity') {
        this.resetTransportTwoTierSubTab(apiKey);
        this.$store.state.express.tier2Tab = 'Quantity';
        this.getRegionRatesById(this.$store.state.express.rateCardId ?? this.$route.params.id).then(
          () => {
            for ( var i = 0; i < this.regionRatesByIdData.charge_types.length; i++ ) {
              if ( this.regionRatesByIdData.charge_types[i].charge_type == 'normal' ) {
                for ( var j = 0; j < this.regionRatesByIdData.charge_types[i].normal_charge_services.length; j++ ) {
                  if ( this.regionRatesByIdData.charge_types[i].normal_charge_services[j].service_type == 'van') {
                    if (this.$store.state.express.currentIndex == 2) {
                      this.tableData = this.regionRatesByIdData.charge_types[i].normal_charge_services[j].van_2_tire_rates_charge_by_quantity;
                    }
                  }
                }
              }
            }
          }
        );
      }
      if (apiKey == 'van_Multi_tire_rates_charge_by_quantity') {
        this.$store.state.express.multiTierTab = 'Quantity';
        this.setMutliTierSubTab(apiKey)
        this.getRegionRatesById(this.$store.state.express.rateCardId ?? this.$route.params.id).then(
          () => {
            for (var i = 0; i < this.regionRatesByIdData.charge_types.length; i++ ) {
              if ( this.regionRatesByIdData.charge_types[i].charge_type == 'normal' ) {
                for ( var j = 0; j < this.regionRatesByIdData.charge_types[i].normal_charge_services.length; j++ ) {
                  if ( this.regionRatesByIdData.charge_types[i].normal_charge_services[j].service_type == 'van' ) {
                    this.tableData = this.regionRatesByIdData.charge_types[i].normal_charge_services[j].van_Multi_tire_rates_charge_by_quantity;
                  }
                }
              }
            }
          }
        );
      }

      if (apiKey == 'van_Multi_tire_rates_charge_by_job_count') {
        this.$store.state.express.multiTierTab = 'Job_Count';
        this.setMutliTierSubTab(apiKey)
        this.getRegionRatesById(this.$store.state.express.rateCardId ?? this.$route.params.id).then(
          () => {
            for (var i = 0; i < this.regionRatesByIdData.charge_types.length; i++ ) {
              if (this.regionRatesByIdData.charge_types[i].charge_type == 'normal' ) {
                for ( var j = 0; j < this.regionRatesByIdData.charge_types[i].normal_charge_services.length; j++ ) {
                  if ( this.regionRatesByIdData.charge_types[i].normal_charge_services[j].service_type == 'van' ) {
                    this.tableData = this.regionRatesByIdData.charge_types[i].normal_charge_services[j].van_Multi_tire_rates_charge_by_job_count;
                  }
                }
              }
            }
          }
        );
      }
    },
  },
  watch: {
    '$store.state.express.new1': function () {},

    '$store.state.express.currentIndex': function () {
      if (this.$store.state.express.currentIndex == 2) {
        if (this.$store.state.express.tier2Tab == 'Weight') {
          this.tabChange(
            'VanTwoTierRatesChargeByWeight',
            'van_2_tire_rates_charge_by_weight'
          );
        }
        if (this.$store.state.express.tier2Tab == 'Quantity') {
          this.tabChange(
            'VanTwoTierRatesChargeByQuantity',
            'van_2_tire_rates_charge_by_quantity'
          );
        }
      
      }
      if (this.$store.state.express.currentIndex == 3) {
        if (this.$store.state.express.multiTierTab == 'Quantity') {
          this.tabChange(
            'VanMultiTierRatesChargeByQuantity',
            'van_Multi_tire_rates_charge_by_quantity'
          );
        }
        if (this.$store.state.express.multiTierTab == 'Job_Count') {
          this.tabChange(
            'VanMultiTierRatesChargeByJobCount',
            'van_Multi_tire_rates_charge_by_job_count'
          );
        }
      }
    },
    '$store.state.express.norMultiQuantityTabData': function () {
      this.$store.state.express.currentIndex++;
      this.tabChange(
        'VanMultiTierRatesChargeByQuantity',
        'van_Multi_tire_rates_charge_by_quantity'
      );
    },
    '$store.state.express.norMultiJobTabData': function () {
      this.tabChange(
        'VanMultiTierRatesChargeByJobCount',
        'van_Multi_tire_rates_charge_by_job_count'
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/main.scss';
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
