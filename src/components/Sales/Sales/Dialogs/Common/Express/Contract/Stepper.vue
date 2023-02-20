<template>
  <div :key="key" class="w-15">
    <Steps :model="stepperData" :readonly="false">
      <template #item="{ item }">
        <a class="p-menuitem-link" role="presentation">
          <div class="flex flex-row">
            <!-- <div class="flex"> -->
             
            <span
              class="p-steps-number steps"
              :id="item.component"
              :style="getStepColor(item.index)"
              >{{ item.label }}
            </span>
            <!-- </div> -->
            <div class="mt-2 ml-1 stepNames">
              <span  v-if="item.component=='SalesExpressContractFifthStep'">{{ updateType.includes('contract')?"Contract":"Send Quotations" }}</span>
              <span v-else>{{ item.name }}</span>
            </div>
          </div>
        </a>
      </template>
    </Steps>
  </div>

  <div v-for="steps of stepperData" :key="steps.label">
    <keep-alive>
      <component :is="steps.component" v-if="stepperId == steps.component" />
    </keep-alive>
  </div>
</template>

<script>
//International Agent
import SalesExpressContractFirstStep from "./FirstStep.vue";
import SalesExpressContractSecondStep from "./SecondStep.vue";
import SalesExpressContractThirdStep from "./ThirdStep.vue";
import SalesExpressContractVanFourthStep from "./FourthStep.vue";
import SalesExpressContractFSRFourthStep from "./FourthStepFSR.vue";
import SalesExpressContractBikeFourthStep from "./FourthStepBike.vue";
import SalesExpressContractFifthStep from "./FifthStep.vue";
import {
  expressContractState,
} from "../../../../../../../store/helper";
import Steps from "primevue/steps";
import { mapGetters } from "vuex";
export default {
  props: ["stepperData", "stepId", "key"],
  components: {
    Steps,

    //International Agent
    SalesExpressContractFirstStep,
    SalesExpressContractSecondStep,
    SalesExpressContractThirdStep,
    SalesExpressContractVanFourthStep,
    SalesExpressContractFSRFourthStep,
    SalesExpressContractBikeFourthStep,
    SalesExpressContractFifthStep,
  },
  data: () => ({
    stepperId: null,
  }),
  computed: {
    ...expressContractState,
    ...mapGetters({
      step: "salesExpressContract/flowStep",
    }),
  },
  methods: {
    getStepColor(i) {
      if (i <= this.step) {
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
    },
  },
  watch: {
    "$store.state.salesExpressContract.stepperNavigation": function () {
      if (this.$store.state.salesExpressContract.stepperNavigation != null) {
        this.stepChange(
          this.$store.state.salesExpressContract.stepperNavigation
        );
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
