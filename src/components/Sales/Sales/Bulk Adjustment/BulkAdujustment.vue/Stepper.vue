<template>
  <div class="w-20">
    <Steps :model="stepperData" :readonly="false">
      <template #item="{ item }">
        <a class="p-menuitem-link" role="presentation">
          <div class="flex flex-row">
            <div class="flex">
              <span
                @click="goToStep(item.index)"
                class="p-steps-number steps"
                :id="item.component"
                :style="getStepColor(item.index)"
                >{{ item.label }}
              </span>
            </div>
            <div class="flex mt-2 ml-1 stepNames">
              <span>{{ item.name }}</span>
            </div>
            <div class="flex steps-line">
              <span class="aLine"></span>
            </div>
          </div>
        </a>
      </template>
    </Steps>
  </div>

  <div v-for="steps of stepperData" :key="steps.label">
    <keep-alive>
      <component
        :is="steps.component"
        v-if="stepperId == steps.component"
        :key="getKey(steps.component)"
      />
    </keep-alive>
  </div>
</template>

<script>
// import Information from "./Dialogs/CompanyCreation/Information.vue";
// import Address from "./Dialogs/CompanyCreation/Address.vue";
// import Contact from "./Dialogs/CompanyCreation/Contact.vue";
import Selectprofile from "./FirstStepper.vue";
import RateAdjustment from "./SecondStep.vue";
import EffectiveDate from "./ThirdStepper.vue";

import Steps from "primevue/steps";
export default {
  props: ["stepperData", "stepId"],
  components: {
    Steps,
    // Information,
    // Address,
    // Contact,
    Selectprofile,
    RateAdjustment,
    EffectiveDate,
  },
  data: () => ({
    stepperId: null,
  }),
  methods: {
    goToStep(index) {
      if (this.$store.state.sales.stepperEditMode == true) {
        for (let s in this.stepperData) {
          if (this.stepperData[s]["index"] == index) {
            this.$store.state.sales.stepperNavigation =
              this.stepperData[s]["component"];
          }
        }
      }
    },
    getStepColor(i) {
      if (i == 0) {
        return "background-color:#3057FF";
      } else {
        return "background-color:#7E84A7";
      }
    },
    getKey(component) {
      if (component == "Contact") {
        return this.$store.state.sales.contactsStateData;
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

<style>
.steps {
  cursor: pointer;
}
hr.solid {
  border-top: 3px solid #bbb;
  width: 20px;
}
.p-steps .p-steps-item:before {
  border: none !important;
}
.stepNames {
  font-size: 13px;
  font-weight: bold;
}
.steps-line {
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: gold; */
  margin: 5px !important;
  margin-left: 20px !important;
  width: 20px !important;
}
.p-steps-item {
  justify-content: left !important;
  flex: none !important;
  margin-right: 20px !important;
}
.aLine {
  width: 10px;
  line-height: 0.1em;
  border-bottom: 1px solid #dddddd;
  margin-right: -20px;
}
</style>

