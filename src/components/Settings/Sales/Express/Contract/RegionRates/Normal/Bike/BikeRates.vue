<template>
  <div v-if="btn" class="btnAlignment">
    <span class="btnAlignmentSpan">
      <Button label="Add New" @click="handleClick($event)" />
    </span>
  </div>
  <div class="sub-tab-margin">
    <!-- <SubTabs :key="renderKey" :trans="bike" :tabMenuData="subTabMenuData" /> -->

    <TabView
      class="ratesSubTabs"
      :model="tabMenuData"
      v-model:activeIndex="activeIndex"
      v-on:tab-change="tabChanged($event.index)"
    >
      <TabPanel
        v-for="tab in subTabMenuData"
        :key="tab.label"
        :header="tab.label"
      >
        <!-- <DataTable :value="tableData" showGridlines responsiveLayout="scroll">
            <Column v-for="col of tableColumn" :field="col.field" :header="col.header" :key="col.field"></Column>
        </DataTable> -->
        <RegionRatesTable
          :tableDataName="tab.label"
          :tableName="tab.label"
          :tableData="tableData"
          :tableColumns="tableColumn"
          :transport="'Bike'"
          :type="'normal'"
        />
      </TabPanel>
    </TabView>
  </div>
  <Dialog header="Add New" v-model:visible="bikeTripsDialog">
    <BikeTripsEdit
      :key="key"
      :serviceId="service_id"
      :submit-form="createNormalBikeTrip"
      @cancel="onCancel"
    />
  </Dialog>
  <Dialog header="Add New" v-model:visible="vanTripsDialog">
    <VanTripsEdit
      :key="key"
      :serviceId="service_id"
      :submit-form="createNormalVanTrip"
      @cancel="onCancel"
    />
  </Dialog>
  <Dialog header="Add New" v-model:visible="bikeRatesDialog">
    <BikeRatesEdit
      :key="key"
      :serviceId="service_id"
      :transports="transports"
      :submit-form="createNormalBikeRate"
      @cancel="onCancel"
    />
  </Dialog>
</template>

<script>
// import SubTabs from "../../../Tabs/SubTabs.vue";
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
// import DataTable from 'primevue/datatable';
import Button from 'primevue/button';
// import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import RegionRatesTable from '../../../Tables/RegionRatesTable.vue';
import BikeRatesEdit from '../../../Dialogs/CRUDDialogues/BikeRatesEdit.vue';
import BikeTripsEdit from '../../../Dialogs/CRUDDialogues/BikeTripsEdit.vue';
import { mapActions, mapState } from 'vuex';
// import RegionRatesTable from "../../../Tables/RegionRatesTable.vue";
import {
  normalBikeTripsTableColumnData,
  normalBikeBikeCustomerVanJobTableColumnData,
  normalBikeRatesTableColumnData,
} from '../../../const/const.js';

export default {
  components: {
    // DataTable,
    // Column,
    Button,
    Dialog,
    RegionRatesTable,
    BikeTripsEdit,
    //  SubTabs,
    // RegionRatesTable,
    TabView,
    BikeRatesEdit,
    TabPanel,
  },
  data: () => ({
    bikeTripsDialog: false,
    vanTripsDialog: false,
    bikeRatesDialog: false,
    vanMultiQuantity: false,
    eCommerceVanDel: false,
    vanMultiJob: false,
    service_id: null,
    serviceId2: null,
    btn: true,
    serviceId1: null,
    eCommerceDel: false,
    tabChangedData: null,
    formats: null,
    transports: null,
    types: null,
    labels: null,
    serviceId: null,
    bike: 'bike',
    vanIndex: 0,
    renderKey: 0,
    tableData: [],
    rateData: [],
    bikeVanData: [],
    index: 0,
    rateIndex: 0,
    normalBikeTripsTableColumnData,
    tripColumn: normalBikeTripsTableColumnData,
    normalBikeBikeCustomerVanJobTableColumnData,
    normalBikeRatesTableColumnData,
    tableColumn: [],
    tabs: ['Trips', 'Rates', 'Bike Customer Van Job'],
    subTabMenuData: [
      {
        label: 'Trips',
        apiKey: 'trips',
        tab: 'RegionRatesTable',
        transport: 'Bike',
        type: 'normal',
      },

      {
        label: 'Rates',
        apiKey: 'rates',
        tab: 'RegionRatesTable',
        transport: 'Bike',
        type: 'normal',
      },
      {
        label: 'Bike Customer Van Job',
        apiKey: 'bike_van_job_rates',
        tab: 'RegionRatesTable',
        transport: 'Bike',
        type: 'normal',
      },
    ],
  }),
  computed: {
    ...mapState({
      regionRatesByIdData: (state) => state.express.regionRatesById,
    }),
  },
  mounted() {
    this.initialised();
    this.getData();
  },
  methods: {
    ...mapActions('express', ['createNormalBikeRates']),
    ...mapActions('express', [
      'getRegionRatesById',
      'createNormalVanRates',
      'createMultiTierVanJob',
      'createMultiTierQuantity',
    ]),

    initialised() {
      this.getRegionRatesById(
        this.$store.state.express.rateCardId ?? this.$route.params.id
      ).then(() => {
        this.regionRatesByIdData.charge_types[0].normal_charge_services[0]
          .service_type;
        for (var i = 0; i < this.regionRatesByIdData.charge_types.length; i++) {
          if (
            this.regionRatesByIdData.charge_types[i].charge_type == 'normal'
          ) {
            for (
              var j = 0;
              j <
              this.regionRatesByIdData.charge_types[i].normal_charge_services
                .length;
              j++
            ) {
              if (
                this.regionRatesByIdData.charge_types[i].normal_charge_services[
                  j
                ].service_type == 'bike'
              ) {
                this.serviceId1 =
                  this.regionRatesByIdData.charge_types[
                    i
                  ].normal_charge_services[j].id;
              }
            }
          }
        }
      });
    },
    getData() {
      this.getRegionRatesById(
        this.$store.state.express.rateCardId ?? this.$route.params.id
      ).then(() => {
        let data = [];
        let rateDataSno = [];
        let bikeVanSno = [];
        this.rateData = [];
        this.bikeVanData = [];
        this.rateIndex = 0;
        this.vanIndex = 0;
        this.regionRatesByIdData.charge_types.map((list) => {
          if (list.charge_type == 'normal') {
            list.normal_charge_services.map((rates, idx) => {
              if (rates.service_type === 'bike') {
                rates.trips.map((list, indx) => {
                  data.push({
                    s_no: indx + 1,
                    from_time: list.trips.from_time,
                    to_time: list.trips.to_time,
                    trip_no: list.trips.trip_no,
                    trip_days: list.trips.trip_days,
                    trip_type: list.trips.trip_type,
                    createdBy: list.user,
                    createdAt: new Date(list.trips.createdAt),
                    service_id: list.service_id,
                    id: list.id,
                  });
                });
              }
            });
          }
        });

        this.tableColumn = this.tripColumn;
        this.tableData = data;
      });
    },

    tabChanged(args) {
      this.$store.state.express.norBikeTabData = args;
      this.index = args;
      if (this.index == 0) {
        this.btn = true;
        this.getData();
      }
      if (this.index == 1) {
        this.btn = true;
        this.getRegionRatesById(
          this.$store.state.express.rateCardId ?? this.$route.params.id
        ).then(() => {
          let data = [];
          let rateDataSno = [];

          this.rateIndex = 0;

          this.regionRatesByIdData.charge_types.map((list) => {
            if (list.charge_type == 'normal') {
              list.normal_charge_services.map((rates, idx) => {
                if (rates.service_type === 'bike') {
                  rates.rates.map((list) => {
                    rateDataSno = list;
                    this.rateIndex++;
                    data.push({ ...rateDataSno, s_no: this.rateIndex, createdAt: new Date(list.createdAt) });
                  });
                }
              });
            }
          });

          this.tableColumn = this.normalBikeRatesTableColumnData;
          this.tableData = data;
        });
      }
      if (this.index == 2) {
        this.btn = false;
        this.getRegionRatesById(this.$store.state.express.rateCardId ?? this.$route.params.id).then(
          () => {
            let data = [];

            let bikeVanSno = [];

            this.vanIndex = 0;
            this.regionRatesByIdData.charge_types.map((list) => {
              if (list.charge_type == 'normal') {
                list.normal_charge_services.map((rates, idx) => {
                  if (rates.service_type === 'bike') {
                    rates.bike_van_job_rates.map((list) => {
                      bikeVanSno = list;
                      this.vanIndex++;
                      data.push({ ...bikeVanSno, s_no: this.vanIndex, createdAt: new Date(list.createdAt) });
                    });
                  }
                });
              }
            });

            this.tableColumn = this.normalBikeBikeCustomerVanJobTableColumnData;
            this.tableData = data;
          }
        );
      }
    },
    onCancel() {
      this.bikeRatesDialog = false;
      this.bikeTripsDialog = false;
    },
    handleClick(args) {
      if (
        this.$store.state.expressContract.regionRatesRateTab == 'normal' &&
        this.index == 1
      ) {
        this.key++;
        this.bikeRatesDialog = true;
      } else if (
        this.$store.state.expressContract.regionRatesRateTab == 'normal' &&
        this.index == 0
      ) {
        this.key++;
        this.bikeTripsDialog = true;
      } else if (
        this.types == 'normal' &&
        this.trans == 'van' &&
        this.activeIndex == 0
      ) {
        this.key++;
        this.vanTripsDialog = true;
      } else if (
        this.types == 'normal' &&
        this.$store.state.expressContract.regionRatesMultiTierSubTab ==
          'van_Multi_tire_rates_charge_by_quantity'
      ) {
        this.key++;
        this.vanMultiQuantity = true;
      } else if (
        this.$store.state.expressContract.regionRatesRateTab == 'normal' &&
        this.$store.state.expressContract.regionRatesMultiTierSubTab ==
          'van_Multi_tire_rates_charge_by_job_count'
      ) {
        this.key++;
        this.vanMultiJob = true;
      } else if (
        this.$store.state.expressContract.regionRatesRateTab == 'e_commerce' &&
        this.$store.state.expressContract.regionRatesTransportTab == 'bike'
      ) {
        this.key++;
        this.eCommerceDel = true;
      } else if (
        this.$store.state.expressContract.regionRatesRateTab == 'e_commerce' &&
        this.$store.state.expressContract.regionRatesTransportTab == 'van'
      ) {
        this.key++;
        this.eCommerceVanDel = true;
      }
    },
    createNormalBikeTrip(value) {
      if (value) {
        this.bikeTripsDialog = false;
        this.tabChanged(this.$store.state.express.norBikeTabData);
      }
      //   this.tabChanged(this.tabData);
      // }
    },
    createNormalBikeRate(formData) {
      Object.assign(formData, { service_id: this.serviceId1 });

      this.createNormalBikeRates(formData).then(() => {
        this.index = 1;
        this.tabChanged(this.$store.state.express.norBikeTabData);
      });
      this.bikeRatesDialog = false;
    },
  },
  watch: {
    '$store.state.express.newKey': function () {
      //  this.renderKey++
      //  this.$forceUpdate();
    },
    '$store.state.express.renderKeys': function () {},
    '$store.state.express.norBikeTripDel': function () {
      this.tabChanged(this.$store.state.express.norBikeTabData);
    },
  },
};
</script>

<style>
.ratesSubTabs .p-menuitem-link {
  background: #e1eaf9 !important;
  font-size: 12px !important;
  font-weight: bold !important;
}
.btnAlignment {
  float: right;
}

.btnAlignmentSpan {
  padding-bottom: 10px;
}
a {
  color: #8f96bf !important;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-align: left;
}
.sub-tab-margin {
  padding-top: 40px;
}
.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link {
  color: #4e5968 !important;
}
.p-tabmenu .p-tabmenu-nav .p-tabmenuitem.p-highlight .p-menuitem-link {
  color: #357dea !important;
}
.ratesSubTabs .p-highlight .p-menuitem-link {
  background: #e1eaf9 !important;
  border-color: #2196f3 !important;
  color: #357dea !important;
}
.ratesSubTabs .p-tabmenu-nav {
  background: #e1eaf9 !important;
}
</style>
