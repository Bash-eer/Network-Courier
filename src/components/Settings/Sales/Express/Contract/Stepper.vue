<template>
  <div class="w-20">
    <Steps :model="stepperData" :readonly="false">
      <template #item="{ item }">
        <a class="p-menuitem-link" role="presentation">
          <div class="flex flex-row">
            <div class="flex">
              <span
                class="p-steps-number steps"
                :id="item.component"
                :style="getStepColor(item.index)"
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
      <component :is="steps.component" :region="regionId" v-if="stepperId == steps.component" />
    </keep-alive>
  </div>
</template>

<script>
//Dialog

//EXPRESS
//region
import AddRegionTrips from "./Dialogs/Regions/AddRegionTrips.vue";
import AddRegionDelivery from "./Dialogs/Regions/AddRegionDelivery.vue";
//rates
//Add New Rate
import AddNormalRates from "./Dialogs/Rates/Normal/AddNormalRates.vue";
import AddECommerceRates from "./Dialogs/Rates/E-commerce/AddECommerceRates.vue";
import AddSurcharges from "./Dialogs/Rates/Surcharges/AddSurcharges.vue";
import AddAdditionalSurcharges from "./Dialogs/Rates/AdditionalSurcharges/AddAdditionalSurcharges.vue";
import { mapGetters } from 'vuex';
import Steps from "primevue/steps";
export default {
  props: ["stepperData", "stepId","regionId"],
  components: {
    Steps,
    //EXPRESS
    //regions
    AddRegionTrips,
    AddRegionDelivery,
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
   computed: {
    ...mapGetters({
      step: "express/stepChange",
    }),
  },
  data: () => ({
    stepperId: null,
  }),
  methods: {
    getStepColor(i) {
       if (i <= this.$store.state.express.stepChangeData) {
       
       return "background-color:#3057FF";} else {
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
    },
  },
  watch: {
    "$store.state.expressContract.stepperNavigation": function () {
      if (this.$store.state.expressContract.stepperNavigation != null) {
        this.stepChange(this.$store.state.expressContract.stepperNavigation);
      }
    },
  },
  created() {
    this.stepperId = this.stepId;
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
</style>
