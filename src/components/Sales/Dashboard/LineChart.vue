<template>
<div class="card chart-card-wrap">
    <h5 class="text-left p-2">Sales Rate</h5>
    <ChartTemplate
    id="lineChartId"
    type="line"
    :data="chartData"
    :options="$store.state.dashboard.basicOptions"
  />
  </div>
</template>

<script>
import ChartTemplate from "primevue/chart";
export default {
  name: "LineChart",
  props: ["data"],
  data: () => ({
    chartData: [],
  }),
  components: {
    ChartTemplate,
  },
  mounted() {
    setInterval(() => {
      this.chartData = this.$store.state.dashboard.basicData;
    }, 200);
    var ctx = document.getElementById("lineChartId");
    ctx.childNodes[0].id = "mainGrpahCanvas";
    var canvascontext = document
      .getElementById("mainGrpahCanvas")
      .getContext("2d");

    let gradientFillPresentYear = canvascontext.createLinearGradient(0, 0, 0, 400);
   gradientFillPresentYear.addColorStop(0, "rgb(235, 189, 70,100)");
    gradientFillPresentYear.addColorStop(1, "rgb(255, 210, 45,0.1)");
    
    this.$store.state.dashboard.basicData.datasets[0].backgroundColor = gradientFillPresentYear;
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
::v-deep .card {
  border: none !important;
  border-radius: 0 !important;
}
.chart-card-wrap .card {
  position: relative;
  display: flex;
  flex-direction: column;
  /* min-width: 0; */
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: none !important;
  border-radius: 0 !important;
}
.chart-card-wrap {
  /* width: 500px !important;
    height: 434px !important; */
  height: 100% !important;
  width: 100% !important;
  // background-color: yellow;
  border-radius: 8px !important;
}
</style>
