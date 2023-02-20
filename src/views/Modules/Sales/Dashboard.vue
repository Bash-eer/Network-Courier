<template>
  <div class="grid my-2 min-height-400">
    <div class="col-12 md:col-8"><DashboardCards /></div>
    <div class="col-12 md:col-4"><Charts /></div>
  </div>
  <div class="grid">
    <div class="col-12"><LineChart /></div>
  </div>
</template>

<script>
import DashboardCards from "../../../components/Sales/Dashboard/Cards.vue";
import Charts from "../../../components/Sales/Dashboard/ChartCard.vue";
import LineChart from "../../../components/Sales/Dashboard/LineChart.vue";
export default {
  components: {
    DashboardCards,
    Charts,
    LineChart,
  },
};
</script>

<style></style>
