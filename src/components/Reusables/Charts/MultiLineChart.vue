<template>
  <Chart
    :key="$store.state.fleets.vehicleDashboardTab"
    id="multiLineChart"
    type="line"
    :data="chartData"
    :options="$store.state.fleets.basicOptions"
  />
</template>

<script>
import Chart from "primevue/chart";
export default {
  name: "MultiLineChart",
  props: ["data"],
  data: () => ({
    chartData: [],
  }),
  components: {
    Chart,
  },
  mounted() {
    setInterval(() => {
      this.chartData = this.data;
    }, 200);
    var ctx = document.getElementById("multiLineChart");
    ctx.childNodes[0].id = "mainGrpahCanvas";
    var canvascontext = document
      .getElementById("mainGrpahCanvas")
      .getContext("2d");

    let gradientFillPrevious = canvascontext.createLinearGradient(0, 0, 0, 400);
    gradientFillPrevious.addColorStop(0, "rgb(62, 126, 255,0.1)");
    gradientFillPrevious.addColorStop(1, "rgb(255, 255, 255,0.1)");
    let gradientFillCurrent = canvascontext.createLinearGradient(0, 0, 0, 400);
    gradientFillCurrent.addColorStop(0, "rgb(138, 241, 185,0.1)");
    gradientFillCurrent.addColorStop(1, "rgb(255, 255, 255,0.1)");

    this.$store.state.fleets.basicData.datasets[0].backgroundColor =
      gradientFillPrevious;
    this.$store.state.fleets.basicData.datasets[1].backgroundColor =
      gradientFillCurrent;
  },
};
</script>

<style></style>
