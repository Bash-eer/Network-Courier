<template>
  <div>
    <StepperRoute :activeLabel="currentStep" :stepperData="stepperData" />
    <div class="mt-5">
      <keep-alive>
        <component :is="selectedCmp" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import StepperRoute from "../../StepperRoute.vue";
import Trips from "../Normal/Trips/index.vue";
import Rates from "../Normal/Rates/index.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { StepperRoute, Trips, Rates },
  data() {
    return {
      stepperData: [
        {
          label: 1,
          name: "Trips",
        },
        {
          label: 2,
          name: "Rates",
        },
      ],
      currentStep: 1,
      selectedCmp: "Trips",
    };
  },
  watch: {
    currentStep() {
      this.selectedCmp = this.stepperData[this.currentStep - 1].name;
    },
    nextBtnKey() {
      if (this.currentStep == 1) {
        this.checkValidation();

        if (!this.inValidTab || this.inValidTab?.key != "trips") {
          this.currentStep = 2;
        }
      } else {
        this.checkValidation();

        if (!this.inValidTab) {
          this.setTabActive();
          this.setStepperKey();
        }
      }
    },
    backBtnKey() {
      if (this.currentStep == 2) {
        this.currentStep = 1;
      }
    },
  },
  computed: {
    ...mapGetters({
      nextBtnKey: "AddNewInternationalLocal/nextBtnKey",
      backBtnKey: "AddNewInternationalLocal/backBtnKey",
      inValidTab: "AddNewInternationalLocal/inValidTab",
      validations: "AddNewInternationalLocal/Normal/validations",
    }),
  },
  methods: {
    ...mapActions({
      setInvalidTab: "AddNewInternationalLocal/setInvalidTab",
      setStepperKey: "AddNewInternationalLocal/setStepperKey",
      setTabActive: "AddNewInternationalLocal/setTabActive",
      setTabDisable: "AddNewInternationalLocal/setTabDisable",
    }),
    checkValidation() {
      let isTabInvalid;
      for (const [key] of Object.entries(this.validations)) {
        for (const [tabKey] of Object.entries(this.validations[key])) {
          if (Object.keys(this.validations[key][tabKey])[0] != 0) {
            if (this.validations[key][tabKey].valid == false) {
              isTabInvalid = {
                tabKey,
                key,
                data: this.validations[key][tabKey],
              };
            }
          } else {
            this.validations[key][tabKey].map((list) => {
              if (list.valid == false) {
                isTabInvalid = { data: list, tabKey, key };
              }
            });
          }
        }
      }
      console.log(isTabInvalid, "invalid");
      if (isTabInvalid) {
        this.setInvalidTab(isTabInvalid);
        this.setTabDisable();
      } else {
        this.setInvalidTab(null);
      }
    },
  },
  created() {
    this.selectedCmp = this.stepperData[this.currentStep - 1].name;
  },
};
</script>

<style>
</style>