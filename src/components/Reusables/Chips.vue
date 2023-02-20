<template>
  <Chip :label="label" :image="'/images/' + label + '.png'" class="mr-2" />
</template>

<script>
import Chip from "primevue/chip";
export default {
  name: "Chips",
  props: ["label"],
  components: {
    Chip,
  },
};
</script>

<style scoped>
.p-chip {
  border-radius: 0px !important;
  background: #7e84a7 !important;
  font-size: 12px;
  color: #ffff;
}
</style>
