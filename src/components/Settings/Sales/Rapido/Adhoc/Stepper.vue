<template>
  <div class="w-20">
    <Steps :model="stepperData" :readonly="false">
      <template #item="{item}">
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
      <component :is="steps.component" v-if="stepperId == steps.component" />
    </keep-alive>
  </div>
</template>

<script>
//Dialog
import Steps from "primevue/steps";
import AddZone from "../../Rapido/Adhoc/Dialogs/Zones/AddZone.vue";
import AddZonalRates from "../Adhoc/Dialogs/ZonalRates/AddZonalRates.vue";
import AddEffectiveDates from "../Adhoc/Dialogs/EffectiveDates/AddEffectiveDates.vue";
export default {
  props: ["stepperData", "stepId"],
  components: {
    Steps,
    AddZone,
    AddZonalRates,
    AddEffectiveDates,
  },
  data: () => ({
    stepperId: null,
  }),
  methods: {
    getStepColor(i) {
      if (i == 0) {
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
    "$store.state.rapidoAdhoc.stepperNavigation": function () {
      if (this.$store.state.rapidoAdhoc.stepperNavigation != null) {
        this.stepChange(this.$store.state.rapidoAdhoc.stepperNavigation);
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
