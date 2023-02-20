<template>
  <div class="card chart-card-wrap min-height-350">
    <h5 class="text-left pt-2 pl-2">Customer Growth</h5>
    <ChartTemplate
      Type="bar"
      :Data="BarChartData.basicData"
      :Options="BarChartData.basicData.basicOptions"
      :lable="false"
      height="70"
      width="100"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      //bar-chart data
      BarChartData: {
        basicData: {
          labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          datasets: [
            {
              backgroundColor: "#204B8C",
              borderRadius: 5,
              barThickness: 10,
              data: [2, 6, 4, 2, 4, 2, 8],
            },
          ],
          basicOptions: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,
                },
              },
            ],
            layout: {
              padding: 30,
            },
            legend: {
              display: false,
            },
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              xAxes: 
                {
                  // barThickness: 20,
                  grid: {
                    color:"#fff"
                  },
                },
              yAxes:{
                grid:{
                  color:"rgba(185, 185, 185, 0.2)"
                },
              },
            },
          },
        },
      },
    };
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
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: none !important;
  border-radius: 0 !important;
}
.chart-card-wrap {
  height: 100% !important;
  width: 100% !important;
  border-radius: 8px !important;
}
</style>
