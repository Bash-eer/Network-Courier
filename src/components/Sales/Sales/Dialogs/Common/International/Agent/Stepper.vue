<template>
  <div class="w-15">
    <Steps :model="stepperData" :readonly="false">
      <template #item="{ item }">
        <a class="p-menuitem-link" role="presentation">
          <div :key="renderKey" class="flex flex-row">
            <!-- <div class="flex"> -->
            <span
              :key="renderKey"
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
import SalesInternationalAgentFirstStep from "./FirstStep.vue";
import SalesInternationalAgentSecondStep from "./SecondStep.vue";
import SalesInternationalAgentThirdStep from "./ThirdStep.vue";
import SalesInternationalAgentFourthStep from "./FourthStep.vue";
import SalesInternationalAgentFifthStep from "./FifthStep.vue";
import SalesInternationalAgentSixthStep from "./SixthStep.vue";
import SalesInternationalAgentSeventhStep from "./SeventhStep.vue";

import Steps from "primevue/steps";
import { mapGetters } from "vuex";
export default {
  props: ["stepperData", "stepId"],
  components: {
    Steps,

    //International Agent
    SalesInternationalAgentFirstStep,
    SalesInternationalAgentSecondStep,
    SalesInternationalAgentThirdStep,
    SalesInternationalAgentFourthStep,
    SalesInternationalAgentFifthStep,
    SalesInternationalAgentSixthStep,
    SalesInternationalAgentSeventhStep,
  },
  data: () => ({
    stepperId: null,
    renderKey: 1,
  }),
  computed: {
    ...mapGetters({
      step: "salesInternationalAgent/agentStep",
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
      this.renderKey++;
    },
  },
  watch: {
    "$store.state.salesInternationalAgent.stepperNavigation": function () {
      if (this.$store.state.salesInternationalAgent.stepperNavigation != null) {
        this.stepChange(
          this.$store.state.salesInternationalAgent.stepperNavigation
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