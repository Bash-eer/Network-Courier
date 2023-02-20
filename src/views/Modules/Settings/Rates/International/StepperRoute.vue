<template>
  <div class="stepper-route flex align-items-center">
    <div
      v-for="(item, idx) of stepperData"
      :key="item.label"
      class="flex align-items-center"
    >
      <div :class="renderClass(idx + 1)" class="step-number">
        {{ item.label }}
      </div>
      <div class="step-name ml-2">{{ item.name }}</div>
      <div
        v-if="idx !== stepperData.length - 1"
        class="progress-line mx-4"
      ></div>
    </div>
  </div>

  <!-- <Stepper stepId="OfficeDetails" :stepperData="stepperData" /> -->
</template>

<script>
export default {
  props: ["stepperData", "activeStep", "activeLabel"],
  methods: {
    renderClass(idx) {
      if (idx <= this.activeLabel) {
        return "active";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.active {
  background: #357dea !important;
}

.stepper-route {
  .step-number {
    width: 34px;
    height: 34px;
    background: #7e84a7;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  .step-name {
    font-size: 15px;
    font-weight: bold;
    white-space: nowrap;
  }

  .progress-line {
    background: #dddddd;
    height: 1px;
    width: 50px;
  }
}
</style>