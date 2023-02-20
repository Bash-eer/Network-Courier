<template>
  <div class="field col-12 md:col-6">
    <h5 class="dialog-label-text required">Region</h5>
    <DropDown
      :data="regionOpts"
      :options="regionOpts"
      optionLabel="region"
      v-model="details.region"
      @change="getDropdownValue(details.region)"
    />
  </div>
  <div>
    <p class="bold-600 font-size-14 color-4e5968 ml-3 mt-2 add_trips">
      Select Trips
    </p>

    <DataTable
      v-model:selection="selectedBikeItem"
      showGridlines
     
      :value="tripBikeTableDatas"
      responsiveLayout="scroll"
    >
      <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
      <Column
        v-for="col of expressContractTripsData"
        :field="col.field"
        :header="col.header"
        :key="col.field"
      ></Column>
    </DataTable>
  </div>
  <div class="flex align-self-center justify-content-end">
    <Buttons
      label="Close"
      v-on:childToParent="cancel"
      class="p-button-outlined mr-1 dialog-button-text color-357dea"
    />

    <Buttons
      label="Save"
      button_class="dialog-button-text bg-357dea"
      v-on:childToParent="submitData"
    />
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import useVuelidate from "@vuelidate/core";
import Column from "primevue/column";
import { expressContractTripsData } from "../../const/const.js";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    DataTable,
    Column,
  },
  name: "Trips",
 props: {
      serviceIds:{
      type: Number,
     default: () => null,
    },
     submitForm: {
      type: Function,
      default: () => {},
    },
    
  },
  data: () => ({
    v$: useVuelidate(),
    details: {},
    selectedBikeItem: [],
    selectedProducts: null,
    expressContractTripsData,
    regionOpts: [],
    bool: false,
    serviceId: null,
    selectionModeState1: null,
    selectionModeState2: null,
    formData: { trips: [] },
  }),
  
  computed: {
    ...mapState({
      regionsData: (state) => state.express.regions,
      tripBikeTableDatas: (state) => state.express.tripBikeTableData,
      regionRatesByIdData: (state) => state.express.regionRatesById,
    }),
  },
  mounted() {
    this.initialised();
  },
  created() {
    this.getRegionData();
  },
  methods: {
    ...mapActions("express", [
      "getRegions",
      "getTripBikeGrid",
      "createNormalBikeTrips",
      "getTripVanGrid",
      "updateBikeRateTrips",
    ]),

    ...mapActions("express", ["getRegionRatesById"]),

    initialised() {
      this.getRegions();
      this.getRegionRatesById(this.$store.state.express.rateCardId).then(() => {
        this.regionRatesByIdData.charge_types[0].normal_charge_services[0]
          .service_type;
        for (var i = 0; i < this.regionRatesByIdData.charge_types.length; i++) {
          if (
            this.regionRatesByIdData.charge_types[i].charge_type == "normal"
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
                ].service_type == "bike"
              ) {
                this.serviceId =
                  this.regionRatesByIdData.charge_types[
                    i
                  ].normal_charge_services[j].id;
              } else if (
                this.regionRatesByIdData.charge_types[i].normal_charge_services[
                  j
                ].service_type == "van"
              ) {
                //  this.serviceId=this.regionRatesByIdData.charge_types[i].normal_charge_services[j].id
              }
            }
          }
        }
      });
    },
    cancel() {
        this.$emit('cancel');
    },
    async getRegionData() {
      const res = await this.getRegions();
      if (this.regionsData) {
        this.regionOpts = this.regionsData.filter(
          (data) => data.id == this.$store.state.express.normalRegionId
        );
      }
    },
    getDropdownValue(item) {
      this.getTripBikeGrid(parseInt(item.id));
      this.details.region = item;
      this.$store.state.express.createRateCard.region_id = item.id;
    },

    async submitData() {
      for (let i = 0; i < this.selectedBikeItem.length; i++) {
        this.formData.trips.push({region_trip_id:this.selectedBikeItem[i].trip_id})

      }
      Object.assign(this.formData, { service_id: this.serviceId });
     let bool= await this.createNormalBikeTrips(this.formData)
    
     if(bool){
        this.submitForm(true)
     }
    },
  },
};
</script>

<style scoped>
.add_trips {
  font-weight: 600;
  font-size: 14px;
  color: #4e5968;
}
.trips_dropdown {
  height: 46% !important;
}
.add_trip {
  margin-left: 2%;
}
</style>