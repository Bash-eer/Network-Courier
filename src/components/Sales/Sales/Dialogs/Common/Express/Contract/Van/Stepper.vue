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
              <span>{{ item.name }}</span>
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
import SalesExpressContractVanFirstStep from "./FirstStep.vue";
import SalesExpressContractVanSecondStep from "./SecondStep.vue";
import SalesExpressContractVanThirdStep from "./ThirdStep.vue";
import SalesExpressContractVanFourthStep from "./FourthStep.vue";
import SalesExpressContractVanFifthStep from "./FifthStep.vue";

import Steps from "primevue/steps";
import { mapGetters } from "vuex";
export default {
  props: ["stepperData", "stepId", "key"],
  components: {
    Steps,

    //International Agent
    SalesExpressContractVanFirstStep,
    SalesExpressContractVanSecondStep,
    SalesExpressContractVanThirdStep,
    SalesExpressContractVanFourthStep,
    SalesExpressContractVanFifthStep,
  },
  data: () => ({
    stepperId: null,
  }),
   computed: {
    ...mapGetters({
      step: "salesExpressContractVan/vanStep",
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
    "$store.state.salesExpressContractVan.stepperNavigation": function () {
      if (this.$store.state.salesExpressContractVan.stepperNavigation != null) {
        this.stepChange(
          this.$store.state.salesExpressContractVan.stepperNavigation
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
