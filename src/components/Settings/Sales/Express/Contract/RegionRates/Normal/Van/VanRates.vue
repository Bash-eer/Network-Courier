<template>
  <!-- <SubTabs :key="renderKey" :trans="bike" :tabMenuData="subTabMenuData" /> -->
  <div v-if="btn" class="btnAlignment">
    <span class="btnAlignmentSpan">
      <Button label="Add New" @click="handleClick($event)" />
    </span>
  </div>
  <div class="sub-tab-margin">
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
        <RegionRatesTable
          :tableDataName="tab.label"
          :tableName="tab.label"
          :tableData="tableData"
          :tableColumns="tableColumn"
          :type="'normal'"
          :transport="'Van'"
          :index="currentIndex"
        />
      </TabPanel>
    </TabView>
  </div>
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
  <Dialog header="Add New" v-model:visible="vanMultiQuantity">
    <NormalVanQuantity
      :key="key"
      :serviceId="service_id"
      :submit-form="createNormalMultiQuantity"
      @cancel="onCancel"
    />
  </Dialog>
  <Dialog header="Add New" v-model:visible="vanMultiJob">
    <NormalVanJobCount
      :key="key"
      :serviceId="service_id"
      :submit-form="createNormalMultiJob"
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
import VanTripsEdit from '../../../Dialogs/CRUDDialogues/VanTripsEdit.vue';
import NormalVanJobCount from '../../../Dialogs/CRUDDialogues/NormalVanJobCount.vue';
import NormalVanQuantity from '../../../Dialogs/CRUDDialogues/NormalVanQuantity.vue';
import { mapActions, mapState } from 'vuex';
// import RegionRatesTable from "../../../Tables/RegionRatesTable.vue";
import {
  normalBikeTripsTableColumnData,
  normalVanTripsTableColumnData,
  normalVanRatesTableColumnData,
  normalVanVanCustomerBikeJobTableColumnData,
  normalVanTwoTierChargeByWeightTableColumnData,
  normalVanTwoTierChargeByQuantityTableColumnData,
  normalVanTwoTierChargeByQuantityBoxCountChargesTableColumnData,
  normalVanMultiTierChargeByQuantityTableColumnData,
  normalVanMultiTierChargeByJobCountTableColumnData,
} from '../../../const/const.js';

export default {
  components: {
    // DataTable,
    // Column,
    Button,
    Dialog,
    RegionRatesTable,
    VanTripsEdit,

    NormalVanJobCount,
    NormalVanQuantity,
    BikeRatesEdit,
    //  SubTabs,
    // RegionRatesTable,
    TabView,

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
    serviceId1: null,
    eCommerceDel: false,
    tabChangedData: null,
    formats: null,
    transports: null,
    types: null,
    labels: null,
    currentIndex: 0,
    serviceId: null,
    bike: 'bike',
    renderKey: 0,
    tableData: [],
    rateData: [],
    bikeVanData: [],
    index: 0,
    rateIndex: 0,
    vanIndex: 0,
    normalBikeTripsTableColumnData,
    normalVanTripsTableColumnData,
    normalVanRatesTableColumnData,
    normalVanVanCustomerBikeJobTableColumnData,
    normalVanTwoTierChargeByWeightTableColumnData,
    normalVanTwoTierChargeByQuantityTableColumnData,
    normalVanTwoTierChargeByQuantityBoxCountChargesTableColumnData,
    normalVanMultiTierChargeByQuantityTableColumnData,
    normalVanMultiTierChargeByJobCountTableColumnData,
    tableColumn: [],
    btn: true,
    tabs: ['Trips', 'Rates', 'Bike Customer Van Job'],
    van: 'van',

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
        transport: 'Van',
        type: 'normal',
      },
      {
        label: '2-Tier',
        apiKey: 'twoTireRate',
        tab: 'RegionRatesTable',
        transport: 'Van',
        type: 'normal',
      },
      {
        label: 'Multi Tier Rates',
        apiKey: 'multiTierRate',
        tab: 'RegionRatesTable',
        transport: 'Van',
        type: 'normal',
      },
      {
        label: 'Van Customer Bike Charges',
        apiKey: 'van_customer_bike_job',
        tab: 'RegionRatesTable',
        transport: 'Van',
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
                ].service_type == 'van'
              ) {
                this.serviceId2 =
                  this.regionRatesByIdData.charge_types[
                    i
                  ].normal_charge_services[j].id;
              }
            }
          }
        }
      });
    },
    createNormalMultiJob(formData) {
      this.createMultiTierVanJob(formData).then(() => {
        this.$store.state.express.norMultiJobTabData++;
        this.vanMultiJob = false;
      });
    },
    createNormalMultiQuantity(formData) {
      this.createMultiTierQuantity(formData).then(() => {
        this.$store.state.express.norMultiQuantityTabData++;
        this.vanMultiQuantity = false;
      });
    },
    createNormalVanTrip(value) {
      if (value) {
        this.vanTripsDialog = false;
        this.tabChanged(this.$store.state.express.norVanTabData);
      }
    },
    createNormalBikeRate(formData) {
      Object.assign(formData, { service_id: this.serviceId2 });

      this.createNormalBikeRates(formData).then(() => {
        this.index = 1;
        this.bikeRatesDialog = false;
        this.tabChanged(this.$store.state.express.norVanTabData);
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
        this.index = 0;
        this.vanIndex = 0;

        this.regionRatesByIdData.charge_types.map((list) => {
          if (list.charge_type == 'normal') {
            list.normal_charge_services.map((rates, idx) => {
              if (rates.service_type === 'van') {
                rates.trips.map((list, indx) => {
                  data.push({
                    s_no: indx + 1,
                    from_time: list.trips.from_time,
                    to_time: list.trips.to_time,
                    trip_no: list.trips.trip_no,
                    trip_days: list.trips.trip_days,
                    trip_type: list.trips.trip_type,
                    user: list.user,
                    createdAt: new Date(list.trips.createdAt),
                    service_id: list.service_id,
                    id: list.id,
                  });
                });
              }
            });
          }
        });

        this.tableColumn = this.normalVanTripsTableColumnData;

        this.tableData = data;
      });
    },

    onCancel() {
      this.vanTripsDialog = false;
      this.vanMultiQuantity = false;
      this.vanMultiJob = false;
      this.bikeRatesDialog = false;
    },
    tabChanged(args) {
      this.$store.state.express.norVanTabData = args;
      this.index = args;
      this.$store.state.express.currentIndex = args;

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
                if (rates.service_type === 'van') {
                  rates.rates.map((list) => {
                    rateDataSno = list;
                    this.rateIndex++;
                    data.push({ ...rateDataSno, s_no: this.rateIndex, createdAt: new Date(list.createdAt) });
                  });
                }
              });
            }
          });

          this.tableColumn = this.normalVanRatesTableColumnData;
          this.tableData = data;
        });
      }
      if (this.index == 2) {
        this.btn = false;
        this.tableColumn = [];
        this.tableData = [];
      }
      if (this.index == 3) {
        this.btn = true;
        this.tableColumn = [];
        this.tableData = [];
      }
      if (this.index == 4) {
        this.btn = false;
        this.getRegionRatesById(
          this.$store.state.express.rateCardId ?? this.$route.params.id
        ).then(() => {
          let data = [];

          let bikeVanSno = [];

          this.vanIndex = 0;

          this.regionRatesByIdData.charge_types.map((list) => {
            if (list.charge_type == 'normal') {
              list.normal_charge_services.map((rates, idx) => {
                if (rates.service_type === 'van') {
                  rates.van_customer_bike_job.map((list) => {
                    bikeVanSno = list;
                    this.vanIndex++;
                    data.push({ ...bikeVanSno, s_no: this.vanIndex, createdAt: new Date(list.createdAt) });
                  });
                }
              });
            }
          });

          this.tableColumn = this.normalVanVanCustomerBikeJobTableColumnData;
          this.tableData = data;
        });
      }
    },
    handleClick(args) {
      if (this.index == 1) {
        this.key++;
        this.bikeRatesDialog = true;
      } else if (this.index == 0) {
        this.key++;
        this.vanTripsDialog = true;
      } else if (
        this.$store.state.expressContract.regionRatesMultiTierSubTab ==
        'van_Multi_tire_rates_charge_by_quantity'
      ) {
        this.key++;
        this.vanMultiQuantity = true;
      } else if (
        this.$store.state.expressContract.regionRatesMultiTierSubTab ==
        'van_Multi_tire_rates_charge_by_job_count'
      ) {
        this.key++;
        this.vanMultiJob = true;
      }
    },
  },
  watch: {
    '$store.state.express.newKey': function () {
      this.renderKey++;
      this.$forceUpdate();
    },
    '$store.state.express.renderKeys': function () {},
    '$store.state.express.norVanTabDel': function () {
      this.tabChanged(this.$store.state.express.norVanTabData);
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
.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link {
  color: #4e5968 !important;
}
.btnAlignment {
  float: right;
}

.btnAlignmentSpan {
  padding-bottom: 10px;
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
