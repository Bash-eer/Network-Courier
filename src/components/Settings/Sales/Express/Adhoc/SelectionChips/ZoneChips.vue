<template>
  <div class="zone-chip">
    <div class="flex align-items-center justify-content-between p-2">
      <div class="zone-chip-text">{{ data[0] }}</div>
      <div
        v-if="!disableCross"
        class="ml-2 zone-chip-cross pi pi-times"
        @click="removeZoneChips()"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "disableCross"],
  methods: {
    removeZoneChips() {
      this.$emit("childToParent", this.data[1]);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.zone-chip {
  min-width: 81px;
  background: #7e84a7;
  border-radius: 2px;
}
.zone-chip-text {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #ffffff;
}
.zone-chip-cross {
  color: white !important;
  cursor: pointer;
  font-weight: 600;
}

:deep .pi-times::before {
  font-size: 12px;
  color: white !important;
}
</style>
