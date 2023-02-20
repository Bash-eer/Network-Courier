<template>
  <div class="card chart-card-wrap">
    <div class="m-2 mt-3 flex flex-row justify-content-between">
      <DropDown
        :data="FirstDropDownData"
        label="userRole"
        id="userRole"
        v-model="value"
        :value="value"
        v-on:childToParent="getUserInput"
        classes="inputfield  dialog-dropdown-input-text"
        placeholder="Sales"
        code="code"
      />
      <DropDown
        :data="SecondDropDownData"
        label="userRole"
        id="userRole"
        v-model="value"
        :value="value"
        v-on:childToParent="getUserInput"
        classes="inputfield  dialog-dropdown-input-right-text"
        placeholder="Last Week"
        code="code"
      />
    </div>

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
// import Chart from 'primevue/chart';
// Chart.defaults.global.legend.display = false;
export default {
  data() {
    return {
      FirstDropDownData: [
        { name: "Sales", code: "SL" },
        { name: "Something", code: "ST" },
        { name: "Something Else", code: "STE" },
      ],
      SecondDropDownData: [
        { name: "Last Week", code: "LW" },
        { name: "Yesterday", code: "YD" },
        { name: "Today", code: "TD" },
      ],
      //bar-chart data
      BarChartData: {
        basicData: {
          labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          datasets: [
            {
              // label: "bla bla",
              backgroundColor: "#357DEA",
              borderRadius: 5,
              barThickness: 10,
              data: [2, 6, 4, 2, 4, 2, 8],
            },
            // {
            //     label: null,
            //     backgroundColor: '#FFA726',
            //     data: [28, 48, 40, 19, 86, 27, 90]
            // }
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
              xAxes: [
                {
                  barThickness: 20,
                },
              ],
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
  // border-radius:8px !important;
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
// canvas{
//     margin-bottom: -100px !important;
// }
.chart-card-wrap {
  /* width: 500px !important;
    height: 434px !important; */
  height: 100% !important;
  width: 100% !important;
  // background-color: yellow;
  border-radius: 8px !important;
}
.input-flied {
  border: none !important;
  outline: none !important;
}
.p-dropdown:not(.p-disabled) {
  border: none !important;
  outline: none !important;
}
.p-dropdown:not(.p-disabled):hover {
  border: none !important;
}
.p-dropdown:not(.p-disabled).p-focus {
  border: none !important;
  outline: none !important;
}
.dialog-dropdown-input-text {
  font-family: $font-family-secondary;

  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0px;
  text-align: left;
}
.dialog-dropdown-input-right-text {
  font-family: $font-family-primary;

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: center;
}
</style>
