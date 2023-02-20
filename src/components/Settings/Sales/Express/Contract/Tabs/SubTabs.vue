<template>
  <div v-if="this.labels=='trips' || this.labels=='rates' || this.labels=='multiTierRate'||( this.$store.state.expressContract.regionRatesRateTab== 'e_commerce' &&  this.$store.state.expressContract.regionRatesTransportTab == 'bike')||( this.$store.state.expressContract.regionRatesRateTab== 'e_commerce' &&  this.$store.state.expressContract.regionRatesTransportTab == 'van') " class="right-content flex align-items-center">
    <span style="padding-left: 1180px; padding-bottom: 10px">
      <Button label="Add New" @click="handleClick($event)" />
    </span>
  </div>
  <div :key="renderKey">
    <TabMenu
      class="ratesSubTabs"
      :model="tabMenuData"
      :key="renderKey"
      v-model:activeIndex="activeIndex"
      v-on:tab-change="tabChanged($event)"
    />
    <!-- router view can also be used - provided paths dont conflict -->
    <div v-for="(tabs, index) of tabMenuData" :key="index">
      <keep-alive v-if="renderComponent">
        <div  :key="renderKey" >
        <component
          dataKey="id"
          :storePath="storePath"
          :tableDataName="tabs.label"
         
          :tableName="tabs.label"
          :tableData="
            tabs.type == 'normal'
              ? getTableInput('data', tabs.transport, tabs.type, tabs.apiKey)
              : tabs.data
          "
          :tableColumns="
            tabs.type == 'normal'
              ? getTableInput('columns', tabs.transport, tabs.type, tabs.apiKey)
              : tabs.columns
          "
          :transport="tabs.transport"
          :type="tabs.type"
          :apiKey="tabs.apiKey"
          v-if="activeIndex == index"
          v-bind:is="tabs.tab"
        ></component>
        </div>
      </keep-alive>
    </div>
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

  <Dialog header="Add New" v-model:visible="eCommerceDel">
    <EcommerceDelivery
      :key="key"
      :serviceId="service_id"
      :submit-form="createBikeEcommerceDelivey"
      @cancel="onCancel"
    />
  </Dialog>
  <Dialog header="Add New" v-model:visible="eCommerceVanDel">
    <EcommerceVanDelivery
      :key="key"
      :serviceId="service_id"
      :submit-form="createVanEcommerceDelivey"
      @cancel="onCancel"
    />
  </Dialog>
</template>

<script>
import TabMenu from "primevue/tabmenu";
import Button from "primevue/button";

//table
import RegionRatesTable from "../Tables/RegionRatesTable.vue";
import BikeTripsEdit from "../Dialogs/CRUDDialogues/BikeTripsEdit.vue";
import BikeRatesEdit from "../Dialogs/CRUDDialogues/BikeRatesEdit.vue";
import VanTripsEdit from "../Dialogs/CRUDDialogues/VanTripsEdit.vue";
import NormalVanJobCount from "../Dialogs/CRUDDialogues/NormalVanJobCount.vue";
import NormalVanQuantity from "../Dialogs/CRUDDialogues/NormalVanQuantity.vue";
import EcommerceDelivery from "../Dialogs/CRUDDialogues/EcommerceDelivery.vue";
import EcommerceVanDelivery from "../Dialogs/CRUDDialogues/EcommerceVanDelivery.vue";
import Dialog from "primevue/dialog";
import { mapActions, mapState } from "vuex";
//function imports
import { getTableInput } from "../functions/functions.js";

export default {
  name: "RatesSubTabs",
  props: ["tabMenuData", "storePath", "trans"],
  data: () => ({
    activeIndex: 0,
    currentTab: "",
    key: 0,
    tabData: null,
    btn: true,
    renderKey:0,
    newRenderKey:false,
    renderComponent:true,
    bikeTripsDialog: false,
    vanTripsDialog: false,
    bikeRatesDialog: false,
    vanMultiQuantity: false,
    eCommerceVanDel: false,
    vanMultiJob: false,
    service_id: null,
    tableData:[],
    serviceId2: null,
    serviceId1: null,
    eCommerceDel: false,
    formats: null,
    transports: null,
    types: null,
    labels: null,
    serviceId: null,
  }),
  computed: {
    ...mapState({
      regionRatesByIdData: (state) => state.express.regionRatesById,
    }),
  },
  mounted() {
    this.initialised();
  },
  methods: {
    ...mapActions("express", ["createNormalBikeRates"]),
    ...mapActions("express", [
      "getRegionRatesById",
      "createNormalVanRates",
      "createMultiTierVanJob",
      "createMultiTierQuantity",
    ]),

    initialised() {
      this.getRegionRatesById(this.$store.state.express.rateCardId ?? this.$route.params.id).then(() => {
        this.regionRatesByIdData.charge_types[0].normal_charge_services[0].service_type;
        for (var i = 0; i < this.regionRatesByIdData.charge_types.length; i++) {
          if ( this.regionRatesByIdData.charge_types[i].charge_type == "normal") {
            for ( var j = 0; j < this.regionRatesByIdData.charge_types[i].normal_charge_services.length; j++ ) {
              if (this.regionRatesByIdData.charge_types[i].normal_charge_services[j].service_type == "bike") {
                this.serviceId1 = this.regionRatesByIdData.charge_types[i].normal_charge_services[j].id;
              } else if (
                this.regionRatesByIdData.charge_types[i].normal_charge_services[j].service_type == "van"
              ) {
                this.serviceId2 = this.regionRatesByIdData.charge_types[i].normal_charge_services[j].id;
              }
            }
          }
        }
      });
    },
    onCancel() {
    
      this.bikeTripsDialog = false;
      this.vanTripsDialog = false;
      this.vanMultiJob = false;
      this.bikeRatesDialog = false;
      this.vanMultiQuantity = false;
      this.eCommerceDel = false;
      this.eCommerceVanDel=false;
    },
    createNormalBikeTrip(value) {
        this.bikeTripsDialog = false;
    },
    handleClick(args) {
      if (
        this.$store.state.expressContract.regionRatesRateTab == "normal" &&
        this.activeIndex == 1
      ) {
        this.key++;
        this.bikeRatesDialog = true;
      } else if (
        this.types == "normal" &&
        this.trans == "bike" &&
        this.activeIndex == 0
      ) {
        this.key++;
        this.bikeTripsDialog = true;
      } else if (
        this.types == "normal" &&
        this.trans == "van" &&
        this.activeIndex == 0
      ) {
        this.key++;
        this.vanTripsDialog = true;
      } else if (
        this.types == "normal" &&
        this.$store.state.expressContract.regionRatesMultiTierSubTab ==
          "van_Multi_tire_rates_charge_by_quantity"
      ) {
        this.key++;
        this.vanMultiQuantity = true;
      } else if (
        this.$store.state.expressContract.regionRatesRateTab == "normal" &&
        this.$store.state.expressContract.regionRatesMultiTierSubTab ==
          "van_Multi_tire_rates_charge_by_job_count"
      ) {
        this.key++;
        this.vanMultiJob = true;
      } else if (
        this.$store.state.expressContract.regionRatesRateTab == "e_commerce" &&
        this.$store.state.expressContract.regionRatesTransportTab == "bike"
      ) {
        
        this.key++;
        this.eCommerceDel = true;
      } else if (
        this.$store.state.expressContract.regionRatesRateTab == "e_commerce" &&
        this.$store.state.expressContract.regionRatesTransportTab == "van"
      ) {
        
        this.key++;
        this.eCommerceVanDel = true;
      }
    },
    createNormalBikeRate(formData) {
    
      if (this.transports == "Bike") {
        this.service_id = this.serviceId1;

      } else if (this.transports == "Van") {
        this.service_id = this.serviceId2;
      }
      Object.assign(formData, { service_id: this.service_id });
       this.$store.state.express.norBikeNew++;
      if (this.transports == "Bike") {
        
        this.createNormalBikeRates(formData).then(() => {
        
         this.$store.state.express.norBikeNew++;
          this.renderKey++
          this.bikeRatesDialog = false;
          this.newRenderKey=true;
         
        });
      } else if (this.transports == "Van") {
        this.createNormalVanRates(formData).then(() => {
          this.bikeRatesDialog = false;
        });
      }
       
    },
    createBikeEcommerceDelivey(value) {
      this.$store.state.express.new++;
      this.eCommerceDel = false;
    },
    createVanEcommerceDelivey(value) {
      
      this.$store.state.express.new3++;
      this.eCommerceVanDel = false;
    },
    createNormalMultiJob(formData) {
      this.createMultiTierVanJob(formData).then(() => {
        this.vanMultiJob = false;
      });
    },
    createNormalMultiQuantity(formData) {
      this.createMultiTierQuantity(formData).then(() => {
        this.vanMultiQuantity = false;
      });
    },
    //fetch table input
    getTableInput(format, transport, type, label) {
      
      this.formats = format;
      this.transports = transport;
      this.types = type;
      this.labels = label;
      return getTableInput(
        this.$store.state.expressContract.regionRatesTableData,
        format,
        transport,
        type,
        label
      );
    },
    resetTab() {
      if (
        this.$store.state.expressContract.regionRatesTwoTierSubTab ==
        "van_2_tire_rates_charge_by_weight"
      ) {
        this.btn = false;
      }
      this.$store.dispatch("expressContract/regionRatesTabStateAction", {
        variable: "regionRatesTwoTierSubTab",
        value: "",
      });
    },
    tabChanged(tab) {
      this.tabData = tab;

      for (let t in this.tabMenuData) {
        if (t == tab.index) {
          this.currentTab = this.tabMenuData[t].label;
          if (
            this.tabMenuData[t].type == "e_commerce" &&
            this.tabMenuData[t].transport == "Bike"
          ) {
            this.$store.state.express.deliveryId =
              this.tabMenuData[t].data[0].id;
          }
          if (
            this.tabMenuData[t].type == "e_commerce" &&
            this.tabMenuData[t].transport == "Van"
          ) {
            this.$store.state.express.vanDeliveryId = this.tabMenuData[t].data[0].id;
            this.$store.state.express.quantityBoxChargesId = this.tabMenuData[t].data[0].van_charge_by_quantity[0].id;
          }
          if (
            this.tabMenuData[t].label == "Bike Customer Van Job" ||
            this.$store.state.expressContract.regionRatesTwoTierSubTab == "van_2_tire_rates_charge_by_weight"
          ) {
            this.btn = false;
          } else {
            this.btn = true;
          }
          if (this.tabMenuData[t].label != "2-Tier") {
            this.resetTab();
          }
          if (this.tabMenuData[t].type == "normal") {
            this.$store.dispatch("expressContract/regionRatesTabStateAction", {
              variable: "regionRatesSubTab",
              value: this.tabMenuData[t].apiKey,
            });
          }
          //for dynamically generated sub tabs
          if (this.tabMenuData[t].type == "e_commerce") {
            this.$store.dispatch("expressContract/regionRatesTabStateAction", {
              variable: "regionRatesECommerceSubTab",
              value: tab.index,
            });
          }
        }
      }
    },

    tabcontrol() {
      this.tabChanged({ index: 0 });
    },
  },
  created() {
    this.tabcontrol();
  },
  watch: {
    "$store.state.express.norBikeNew":function(){
         getTableInput(
        this.$store.state.expressContract.regionRatesTableData,
        'data',
         'Bike',
        'normal',
        'Rates'
      ); 
      this.renderKey++   
      },
  
    "$store.state.express.deleteNorBiRates": function () {
      if (this.$store.state.express.deleteNorBiRates) {
        this.getTableInput(
          this.formats,
          this.transports,
          this.types,
          this.labels
        );
        this.$store.state.express.deleteNorBiRates = false;
      }
    },
   
    "$store.state.express.deleteNorBiTrips": function () {
      if (this.$store.state.express.deleteNorBiTrips) {
        this.getTableInput(
          this.formats,
          this.transports,
          this.types,
          this.labels
        );
        this.$store.state.express.deleteNorBiTrips = false;
      }
    },
  },
  components: {
    TabMenu,
    RegionRatesTable,
    Button,
    VanTripsEdit,
    BikeTripsEdit,
    EcommerceVanDelivery,
    EcommerceDelivery,
    Dialog,
    NormalVanJobCount,
    NormalVanQuantity,
    BikeRatesEdit,
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
