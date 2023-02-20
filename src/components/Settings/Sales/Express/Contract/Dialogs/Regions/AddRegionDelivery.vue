<template>
  <div>
    <!--tab-->
    <br />
    <div class="ml-0 pl-0 mt-2">
      <DuoSelection
        :options="['Bike', 'Van']"
        :default="defaultTransportType"
        type="setRegionDeliveryTransportType"
      />
    </div>
    <br />
    <!----table for bike---->
    <keep-alive>
      <RegionDialogDataTable
        :key="tableDataBike"
        :data="tableDataBike"
        v-if="defaultTransportType == 'Bike'"
    /></keep-alive>
    <!----table for van---->
    <keep-alive>
      <RegionDialogDataTable
        :key="tableDataVan"
        :data="tableDataVan"
        v-if="defaultTransportType == 'Van'"
    /></keep-alive>
  </div>
  <br />
  <div
    class="flex justify-content-between w-full align-content-start flex-wrap"
  >
    <div class="align-self-center flex">
      <Buttons
        label="Previous"
        v-on:childToParent="goBackHandler"
        class="
          p-button-outlined
          mr-1
          dialog-button-text
          previous-btn
          color-357dea
        "
      />
    </div>
    <div class="flex align-self-center justify-content-end">
      <CancelButton
        @click='close'
        label="Cancel"
        class="color-357dea"
      />

      <Buttons
        label="Save"
        button_class="dialog-button-text bg-357dea"
        v-on:childToParent="submitDataHandler"
      />
    </div>
  </div>
</template>

<script>
import DuoSelection from "../../DuoSelect.vue";
import { mapActions, mapState } from "vuex";
import { endpoints } from "../../Constants/endpoint";

import RegionDialogDataTable from "../../RegionDialogDataTable.vue";
export default {
  components: {
    DuoSelection,
    RegionDialogDataTable,
  },
  data() {
    return {
      defaultTransportType: "Bike",
      tableDataBike: null,
      tableDataVan: null,
    };
  },

  methods: {
    ...mapActions("expressContract", ["closeDialog", "POSTPATCHCRUDOPERATION", "setRegionError", "loadRegionsData"]),
    goBackHandler() {
      this.$store.dispatch("expressContract/navigateStepper", {
        step: "AddRegionTrips",
      });
    },
    close() {
      this.loadRegionsData({
        path: endpoints.REGIONS,
        mutation: 'fetchRegionData',
      });
      this.closeDialog();
    },

    submitDataHandler(){
      let region = this.addRegionValue;
      if(region == null || region == ''){
        this.setRegionError({error: 'Enter Region'});
      }else if (region != null && region != ""){
        this.setRegionError({error: null});
        this.addRegionData['region'] = region;
        this.addRegionData['bike_trips'] = this.filterKeys(this.addRegionData.bike_trips)
        this.addRegionData['van_trips'] = this.filterKeys(this.addRegionData.van_trips)
        this.addRegionData['bike_delivery'] = this.filterKeys(this.addRegionBikeDeliveryData);
        this.addRegionData['van_delivery'] = this.filterKeys(this.addRegionVanDeliveryData);
        this.apiCallHandler()
      }
    },
    apiCallHandler() {
      if (this.addRegionFormStateData.id) {
        const dataId = this.addRegionFormStateData.id;
        let newData = this.addRegionData;
        this.POSTPATCHCRUDOPERATION({
          path: endpoints.REGIONS +'/'+ dataId,
          data: newData,
          method: 'PATCH',
          loadData: {
            loadApi: 'loadRegionsData',
            loadPath: endpoints.REGIONS,
            loadMutation: 'fetchRegionsData',
          },
          toastData: {
            toastSuccessData: {
              toastMsg: `The region ${this.addRegionData['region']} is updated!`,
              toastSeverity: 'success',
            },
            toastDuplicateErrorData: {
              toastMsg: `The region ${this.addRegionData['region']} already exists !`,
              toastSeverity: 'error',
            },
            toastCommonErrorData: {
              toastMsg: 'There was an error in updating a region, try again!',

              toastSeverity: 'error',
            },
          },
        });
      } else {
        this.POSTPATCHCRUDOPERATION({
          path: endpoints.REGIONS,
          data: this.addRegionData,
          method: 'POST',
          loadData: {
            loadApi: 'loadRegionsData',
            loadPath: endpoints.REGIONS,
            loadMutation: 'fetchRegionsData',
          },
          toastData: {
            toastSuccessData: {
              toastMsg: `The region ${this.$store.state.expressContract.addRegionData['region']} is added`,
              toastSeverity: 'success',
            },
            toastDuplicateErrorData: {
              toastMsg: `The region ${this.addRegionData['region']} already exists !`,
              toastSeverity: 'error',
            },
            toastCommonErrorData: {
              toastMsg: 'There was an error in creating a region, try again!',

              toastSeverity: 'error',
            },
          },
        });
      }
    },
    closeDialogue() {
      this.$store.dispatch("expressContract/loadRegionsData", {
        path: "settings/salesSettings/rates/express/contract/region",
        mutation: "fetchRegionsData",
      });
    },

    filterKeys(arr) {
      let formatted = arr;
      let fields = [
        'updatedAt',
        'deletedAt',
        'createdAt',
        'created_by',
        'user',
        'deliveries'
      ];

      formatted.map((obj, index) => {
        Object.keys(obj).forEach((ele) => {
          if (fields.includes(ele)) {
            delete formatted[index][ele];
          }
        });
      });
      return formatted;
    },

    cancelDialog(){

    }
  },

  computed: {
    ...mapState({
      bikeDeliveryData: (state) => state.expressContract.addRegionBikeDeliveryData,
      vanDeliveryData: (state) => state.expressContract.addRegionVanDeliveryData,
      regionDeliveryTransportType: (state) => state.expressContract.addRegionDeliveryTransportType,
      addRegionData: (state) => state.expressContract.addRegionData,
      addRegionBikeDeliveryData : (state) => state.expressContract.addRegionBikeDeliveryData,
      addRegionVanDeliveryData: (state) => state.expressContract.addRegionVanDeliveryData,
      addRegionValue: (state) => state.expressContract.addRegionValue,
      addRegionFormStateData: (state) => state.expressContract.addRegionFormStateData,  
    }),
  },
  created() {
    this.tableDataBike = this.bikeDeliveryData
    this.tableDataVan = this.vanDeliveryData
  },

  watch: {
    "regionDeliveryTransportType": function () {
      this.defaultTransportType = this.regionDeliveryTransportType;
    },
    "bikeDeliveryData": function(){
      if(this.tableDataBike.length !== this.bikeDeliveryData.length){
        this.tableDataBike = this.bikeDeliveryData
      }
    },
    "vanDeliveryData": function(){
      if(this.tableDataVan.length !== this.vanDeliveryData.length){    
        this.tableDataVan = this.vanDeliveryData
      }
    }
  },
};
</script>
<style></style>
