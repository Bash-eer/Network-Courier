<template>
  <Badge :value="value" :class="classes" />
</template>

<script>
import Badge from "primevue/badge";
export default {
  name: "NormalBadge",
  props: ["value", "classes"],
  components: {
    Badge,
  },
};
</script>

<style scoped>
.p-badge {
  /* vertical-align: middle; */
  /* margin: auto !important; */
}
.tableSubs {
  border: 1px solid #d7d7d7;
  border-radius: 18px;
  width: 32px;
  height: 25px;
  color: #4e5968;
  background: white;
  margin: auto !important;
}
</style>
