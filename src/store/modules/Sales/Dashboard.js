import axios from "axios";
const { URL } = require("../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;

const dashboard = {
  state: {
    // Line-chart Data
    basicData: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Previous Year",
          data: [65, 59, 80, 71, 76, 75, 60],
          fill: true,
          borderColor: "#EBBD46",
          tension: 0.4,
        },
        {
          label: "Present Year",
          data: [28, 48, 40, 82, 66, 57, 50],
          fill: false,
          borderColor: "#FD8C6D",
          tension: 0.4,
        },
      ],
    },
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
        display: true,
      },

      plugins: {
        legend: {
          align: "end",
          fillStyle: "#000",
          labels: {
            usePointStyle: true,
            pointStyle: "Rounded",
            color: "#000",
          },
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
        barChartBasicData: {
          labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          datasets: [
            {
            //   backgroundColor: "#204B8C",
              borderRadius: 5,
              barThickness: 10,
              data: [2, 6, 4, 2, 4, 2, 8],
            },
          ],
      },
      barChartBasicOptions: {
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
};

export default dashboard;
