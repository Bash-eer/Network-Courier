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
      v-model:selection="selectedVanItem"
      showGridlines
      dataKey="id"
      :value="tripVanTableDatas"
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
  name: "Trips",
  data: () => ({
    v$: useVuelidate(),
    details: {},
    selectedVanItem: [],
    selectedProducts: null,
    expressContractTripsData,
    regionOpts: [],
    bool: false,
    serviceId: null,
    selectionModeState1: null,
    selectionModeState2: null,
    formData: { trips: [{ region_trip_id: null }] },
  }),
  computed: {
    ...mapState({
      regionsData: (state) => state.express.regions,
      // tripBikeTableDatas: (state) => state.express.tripBikeTableData,
      regionRatesByIdData: (state) => state.express.regionRatesById,
      tripVanTableDatas: (state) => state.express.tripVanTableData,
    }),
  },
  mounted() {
    this.initialised();
    // this.getRegionData();
  },
  created() {
    this.getRegionData();
  },
  methods: {
    //  ...mapActions({
    //     getRegions: "express/getRegions",
    //   }),
    ...mapActions('express', [
      'getRegions',
     
      'createNormalVanTrips',
      'getTripVanGrid',
      'updateBikeRateTrips',
    ]),

    ...mapActions('express', ['getRegionRatesById']),

    initialised() {
      this.getRegions();
      this.getRegionRatesById(this.$store.state.express.rateCardId ?? this.$route.params.id).then(() => {
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
                ].service_type == "van"
              ) {
                this.serviceId =
                  this.regionRatesByIdData.charge_types[
                    i
                  ].normal_charge_services[j].id;
              }
            }
          }
          // this.$store.state.express.deleteAddlSurCgs=false
          // console.log("table...",this.tableData)
        }
      });
    },
    async getRegionData() {
      const res = await this.getRegions();
     
      if (this.regionsData) {
        this.regionOpts = this.regionsData.filter(
          (data) => data.id == this.$store.state.express.normalRegionId
        );
      
      }
      console.log("opts..", this.regionOpts);
    },
    getDropdownValue(item) {
      this.getTripVanGrid(parseInt(item.id));
      this.details.region = item;
      this.$store.state.express.createRateCard.region_id = item.id;
      // console.log(this.createRateCards)
    },
cancel() {

        this.$emit('cancel');
    
    },
    submitData() {
      for (let i = 0; i < this.selectedVanItem.length; i++) {
        this.formData.trips[i].region_trip_id = this.selectedVanItem[i].trip_id;
      }
      Object.assign(this.formData, { service_id: this.serviceId });
      this.createNormalVanTrips(this.formData).then(() => {
        this.bool = true;
      });
        let val=this.bool
      this.submitForm(val)
      //   for (let state in this.details) {
      //       this.$store.state.express.bikeTripsData[
      //         state] =this.details[state]

      //   }
      //   let formData=this.$store.state.express.bikeTripsData
      // this.updateBikeRateTrips(formData)
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