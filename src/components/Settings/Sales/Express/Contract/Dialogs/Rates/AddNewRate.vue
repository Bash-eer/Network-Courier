<template>
  <div class="mb-4">
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text required">Region</h5>
        <DropDown
         
          :options="regionsData"
          optionLabel="region"
          v-model="details.region"
          @change="getDropdownValue(details.region)"
         
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text required">Rate Card Name</h5>
        <TextField
          :disabled="false"
          type="text"
          @change="changeRateCard(details.rate_card_name)"
          v-model="details.rate_card_name"
          :classes="{
            'p-invalid':
              v$.details.rate_card_name.$invalid &&
              $store.state.expressContract.regionRatesNormalStepSubmitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <div class="flex justify-content-between">
          <div class="flex"></div>
          <div class="flex">
            <CheckBox
              path="sales"
              v-bind:checker="
                details.default_rate_card == true
                  ? [
                      {
                        name: 'Set as default Rate Card',
                        tag: 'default_rate_card',
                        key: 'dr',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'Set as default Rate Card',
                  tag: 'default_rate_card',
                  key: 'dr',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div :key="key" class="w-20">
    <Steps :model="stepperData" :readonly="false">
      <template #item="{ item }">
        <a class="p-menuitem-link" role="presentation">
          <div :key="key" class="flex flex-row">
            <div class="flex">
              <span
                class="p-steps-number steps"
                :key="key"
                :id="item.component"
                :style="getStepColor(item.index, item.label)"
                >{{ item.label }}
              </span>
            </div>
            <div class="flex mt-2 ml-1 stepNames">
              <span>{{ item.name }}</span>
            </div>
          
          </div>
        </a>
           
      </template>
    </Steps>
  </div>

  <div v-for="steps of stepperData" :key="steps.label">
    <keep-alive>
      <component :is="steps.component"  :tripBikeTableDatas="tripBikeTableDatas" :tripVanTableDatas="tripVanTableDatas" :region="regionId" v-if="stepperId == steps.component" />
    </keep-alive>
  </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { mapState, mapActions } from 'vuex';
import { required } from "@vuelidate/validators";
import ExpressContractStepper from "../../Stepper.vue";
import AddRegionTrips from "../../Dialogs/Regions/AddRegionTrips.vue";
import AddRegionDelivery from "../../Dialogs/Regions/AddRegionDelivery.vue";
//rates
//Add New Rate
import AddNormalRates from "../../Dialogs/Rates/Normal/AddNormalRates.vue";
import AddECommerceRates from "../../Dialogs/Rates/E-commerce/AddECommerceRates.vue";
import AddSurcharges from "../../Dialogs/Rates/Surcharges/AddSurcharges.vue";
import AddAdditionalSurcharges from "../../Dialogs/Rates/AdditionalSurcharges/AddAdditionalSurcharges.vue";

import Steps from "primevue/steps";

//data imports
import { addRatesStepperData } from "../../const/const.js";

export default {
   components: {
    Steps,
    //EXPRESS
    //regions
    AddRegionTrips,
    AddRegionDelivery,
    ExpressContractStepper,
    //rates
    //Add New Rate
    AddNormalRates,
    AddECommerceRates,
    AddSurcharges,
    AddAdditionalSurcharges,
    //Normal Step
    // NormalTrips,
    // NormalRates,
  },
  data: () => ({
    v$: useVuelidate(),
    form:{},
    key:0,
    submitted: false,
    stepId: "AddNormalRates",
    // regionId,
    details: {
      region: "",
      rate_card_name: "",
      default_rate_card: false,
    },
    stepperData: addRatesStepperData,
  }),
  computed: {
    ...mapState({
      regionsData: (state) => state.express.regions,
      tripBikeTableDatas: (state) => state.express.tripBikeTableData,
      tripVanTableDatas:(state)=> state.express.tripVanTableData,
      currentStepper: (state) => state.express.ratesStep,
    }),
  
  },
  mounted() {
    this.initialise();
    // debugger
    this.getDropdownValue(this.details.region)
  },
 
  methods: {
  //  ...mapActions({
  //     getRegions: "express/getRegions",
  //   }),
     ...mapActions('express', ['getRegions','getTripBikeGrid','getTripVanGrid', 'clearAddRateTable']),
   
    initialise() {
      
      this.getRegions();
    

    },
    changeRateCard(args){
    this.$store.state.express.createRateCard.rate_card_name=args
    },
     getDropdownValue(item){
    
    this.getTripBikeGrid(parseInt(item.id));
    this.getTripVanGrid(parseInt(item.id));
    this.details.region=item;
    this.$store.state.express.createRateCard.region_id=item.id;
   // console.log(this.createRateCards)
  },
     checkBoxChange(val) {
      if (val.length != 0) {
        this.$store.state.express.createRateCard.default_rate_card = true;
      }
      if (val.length == 0) {
       this.$store.state.express.createRateCard.default_rate_card = false;
      }
    },
       getStepColor(i ,li) {
        const index = this.currentStepper
      if (li == index) {
        return "background-color:#3057FF";
      } else {
        return "background-color:#7E84A7";
      }
    },
    stepChange(e) {
     
      this.stepperId = e;
      for (var steps in this.stepperData) {
        var steps_obj = this.stepperData[steps];
        if (steps_obj.component == e) {
          document.getElementById(e).style.backgroundColor = "#3057FF";
        }
      }
      this.key++;
    },
  
 

  },
  
  validations() {
    return {
      details: {
        region: { required },
        rate_card_name: { required },
      },
    };
  },
 
  
  unmounted() {
    this.$store.dispatch("expressContract/navigateStepper", {
      step: null,
    });
  },
    created() {
    this.stepperId = this.stepId;
    this.clearAddRateTable()
    this.tripBikeTableDatas=[];
    this.tripVanTableDatas=[]
  },
  watch: {
    
    // "$store.state.express.createRateCard.rate_card_name": function () {
    
    //   this.details.rate_card_name=this.$store.state.express.createRateCard.rate_card_name
    // },
   
     "$store.state.expressContract.stepperNavigation": function () {
      if (this.$store.state.expressContract.stepperNavigation != null) {
        this.stepChange(this.$store.state.expressContract.stepperNavigation);
      }
    },
    v$: function () {
     if (this.details.region != "" && this.details.rate_card_name != "") {
        this.$store.state.expressContract.regionRatesNormalStepValidation = false;
     }
     if (this.details.region == "" && this.details.rate_card_name == "") {
        this.$store.state.expressContract.regionRatesNormalStepValidation =
          this.v$;
     }
    },
  },
};
</script>

<style scoped></style>
