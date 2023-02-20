<template>
  <div class="calendar-iniline-calendar m-1">
    <Calendar v-model="value" :inline="true" class="inline-calendar" />
  </div>
</template>

<script>
import Calendar from "primevue/calendar";
export default {
  components: { Calendar },
  data() {
    return {
      value: null,
    };
  },
};
</script>

<style scoped></style>
