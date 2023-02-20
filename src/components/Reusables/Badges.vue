<template>
  <div class="flex flex-column flex-wrap mt-3">
    <div class="flex badgeLabel">{{ badgeLabel }}</div>
    <div class="flex">
      <div class="flex flex-row flex-wrap">
        <div v-for="badge of badgeData" :key="badge.color">
          <div class="flex align-items-center justify-content-center mr-1">
            <Badge :class="badge.color" style="font-size: 0.1rem"></Badge>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Badge from "primevue/badge";
export default {
  name: "Badges",
  props: ["badgeData", "accessLevel"],
  data: () => ({
    badgeLabel: null,
  }),
  components: {
    Badge,
  },
  created() {
    this.badgeLabel = "Level" + "" + this.accessLevel;
  },
};
</script>

<style scoped>
.default {
  background: #ffffff;
  border: 0.2px solid black !important;
}
.badgeLabel {
  font-size: 12px;
}
.level_1 {
  background: #0fe832;
  color: #0fe832;
}
.level_2 {
  background: #f61ab8;
  color: #f61ab8;
}
.level_3 {
  background: #5a11d3;
  color: #5a11d3;
}
.level_4 {
  background: #f4e23c;
  color: #f4e23c;
}
</style>
