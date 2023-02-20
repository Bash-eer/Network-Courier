<template>
  <div class="zone-chip">
    <div class="flex  justify-content-between p-2">
      <div class="zone-chip-text">{{ data[0] }}</div>
      <div class="ml-2 zone-chip-cross" @click="removeZoneChips()">X</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
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
  min-width: 
61px;
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
  color: white;
  font-size: 13px;
  cursor: pointer;
  font-weight: 600;
}
</style>
