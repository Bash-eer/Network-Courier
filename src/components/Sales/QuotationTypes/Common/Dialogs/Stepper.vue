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
  <br />
  <div v-for="steps of stepperData" :key="steps.label">
    <keep-alive>
      <component :is="steps.component" v-if="stepperId == steps.component" />
    </keep-alive>
  </div>
</template>

<script>
import CostCenterFirstStep from "./CostCenter/Express/FirstStep.vue";
import CostCenterSecondStep from "./CostCenter/Express/SecondStep.vue";
import CostCenterThirdStep from "./CostCenter/Express/ThirdStep.vue";
import CostCenterFourthStep from "./CostCenter/Express/FourthStep.vue";
import {mapState } from "vuex";
import Steps from "primevue/steps";
export default {
  props: ["stepperData", "stepId"],
  components: {
    Steps,
    CostCenterFirstStep,
    CostCenterSecondStep,
    CostCenterThirdStep,
    CostCenterFourthStep,
  },
  data: () => ({
    stepperId: null,
  }),
  computed: {
    ...mapState({
      step: (state) =>
        state.salesExpressContract.flowStepCount,
    }),
  },
  methods: {
    getStepColor(i) {
      if (i <= this.step) {
        return "background-color:#3057FF";
      } 
      else{
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
    "$store.state.salesSales.stepperNavigation": function () {
      if (this.$store.state.salesSales.stepperNavigation != null) {
        this.stepChange(this.$store.state.salesSales.stepperNavigation);
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