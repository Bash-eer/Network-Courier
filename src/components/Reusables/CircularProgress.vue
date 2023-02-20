<template>
  <circle-progress
    :percent="percent"
    :fill-color="color"
    :show-percent="false"
    :class="type"
    :viewport="true"
  />
</template>
<script>
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";
export default {
  name: "CircularProgress",
  props: ["percentage", "color", "type", "label", "actualValue", "img"],
  data: () => ({
    percent: 0,
  }),
  methods: {
    getNumberLabels(type) {
      let numberLabels;
      switch (type) {
        case "maintenance":
          numberLabels = "KM";
          break;
        case "tabMaintenanceDistance":
          numberLabels = "KM";
          break;
        case "tabMaintenanceDays":
          numberLabels = "DAYS";
          break;
        case "insurance":
          numberLabels = "DAYS";
          break;
        case "tabInsuranceDays":
          numberLabels = "DAYS";
          break;
        case "tabInsuranceClaims":
          numberLabels = "$";
          break;
        case "tabRoadTaxDays":
          numberLabels = "DAYS";
          break;
        case "tabRoadTaxAmount":
          numberLabels = "$";
          break;
        case "tabCOEDays":
          numberLabels = "DAYS";
          break;
        case "tabCOEAmount":
          numberLabels = "$";
          break;
        case "tabSummons":
          numberLabels = "";
          break;
        case "tabSummonsFine":
          numberLabels = "$";
          break;
        case "roadTax":
          numberLabels = "DAYS";
          break;
        case "distance":
          numberLabels = "KM";
          break;
        case "tabDistance":
          numberLabels = "KM";
          break;
        case "tabMileage":
          numberLabels = "KM/L";
          break;
        case "tabFuel":
          numberLabels = "L";
          break;
        case "tabAccidents":
          numberLabels = "";
          break;
      }
      return numberLabels;
    },
    getNumberInfo(type) {
      let numberInfo;
      switch (type) {
        case "maintenance":
          numberInfo = "Remaining";
          break;
        case "tabMaintenanceDistance":
          numberInfo = "Remaining";
          break;
        case "tabMaintenanceDays":
          numberInfo = "Remaining";
          break;
        case "insurance":
          numberInfo = "Remaining";
          break;
        case "tabInsuranceDays":
          numberInfo = "Remaining";
          break;
        case "tabRoadTaxDays":
          numberInfo = "Untill Tax Due";
          break;
        case "tabRoadTaxAmount":
          numberInfo = "Total Tax";
          break;
        case "tabCOEDays":
          numberInfo = "Until Expiry";
          break;
        case "tabCOEAmount":
          numberInfo = "in total";
          break;
        case "tabInsuranceClaims":
          numberInfo = "Total Claims";
          break;
        case "tabSummons":
          numberInfo = "Summons";
          break;
        case "tabSummonsFine":
          numberInfo = "Total Fine";
          break;
        case "roadTax":
          numberInfo = "Remaining";
          break;
        case "distance":
          numberInfo = "Covered";
          break;
        case "tabDistance":
          numberInfo = "Distance";
          break;
        case "tabMileage":
          numberInfo = "Average Mileage";
          break;
        case "tabFuel":
          numberInfo = "Fuel Usage";
          break;
        case "tabAccidents":
          numberInfo = "Accidents so far";
          break;
      }
      return numberInfo;
    },
  },
  mounted() {
    let countersArray = document.getElementsByClassName(this.type);
    //for on load circle animations
    if (
      this.type == "tabMaintenanceDistance" ||
      this.type == "tabMaintenanceDays" ||
      this.type == "tabFuel" ||
      this.type == "tabDistance" ||
      this.type == "tabMileage" ||
      this.type == "tabInsuranceDays" ||
      this.type == "tabInsuranceClaims" ||
      this.type == "tabRoadTaxDays" ||
      this.type == "tabRoadTaxAmount" ||
      this.type == "tabCOEDays" ||
      this.type == "tabCOEAmount" ||
      this.type == "tabSummons" ||
      this.type == "tabSummonsFine" ||
      this.type == "tabAccidents"
    ) {
      setInterval(() => {
        this.percent = this.percentage;
      }, 200);
    }
    let parentPercentDiv = document.createElement("div");
    parentPercentDiv.setAttribute("class", "flex flex-column current-counter");
    let childNumberDiv = document.createElement("div");
    childNumberDiv.setAttribute(
      "class",
      "flex align-items-center justify-content-center numberLabels"
    );
    //for circle center number labels
    childNumberDiv.innerHTML =
      this.actualValue + " " + this.getNumberLabels(this.type);
    //for circle center number text
    let childDescriptionDiv = document.createElement("div");
    childDescriptionDiv.setAttribute(
      "class",
      "flex align-items-center justify-content-center numberInfo"
    );
    childDescriptionDiv.innerHTML = this.getNumberInfo(this.type);
    //for circle caption
    let graphLabelRow = document.createElement("div");
    graphLabelRow.setAttribute(
      "class",
      "flex flex-row align-items-center justify-content-center mt-2"
    );
    let grapgLabelChildRowElementOne = document.createElement("div");
    grapgLabelChildRowElementOne.setAttribute("class", "flex mr-2");
    let grapgLabelChildRowElementTwo = document.createElement("div");
    if (this.img != "") {
      let graphLabelImage = document.createElement("img");
      graphLabelImage.setAttribute("src", "/images/" + this.img + ".png");
      graphLabelImage.setAttribute("width", "100%");
      grapgLabelChildRowElementOne.appendChild(graphLabelImage);
    }
    if (
      this.type != "tabMaintenanceDistance" &&
      this.type != "tabMaintenanceDays" &&
      this.type != "tabFuel" &&
      this.type != "tabDistance" &&
      this.type != "tabMileage" &&
      this.type != "tabInsuranceDays" &&
      this.type != "tabInsuranceClaims" &&
      this.type != "tabRoadTaxDays" &&
      this.type != "tabRoadTaxAmount" &&
      this.type != "tabCOEDays" &&
      this.type != "tabCOEAmount" &&
      this.type != "tabSummons" &&
      this.type != "tabSummonsFine" &&
      this.type != "tabAccidents"
    ) {
      grapgLabelChildRowElementTwo.setAttribute(
        "class",
        "flex mt-2 chartLabel"
      );
    } else {
      grapgLabelChildRowElementTwo.setAttribute(
        "class",
        "flex mt-2 tabchartLabel"
      );
    }
    grapgLabelChildRowElementTwo.innerHTML = this.label;
    graphLabelRow.appendChild(grapgLabelChildRowElementOne);
    graphLabelRow.appendChild(grapgLabelChildRowElementTwo);
    parentPercentDiv.appendChild(childNumberDiv);
    parentPercentDiv.appendChild(childDescriptionDiv);
    for (let c in countersArray) {
      if (
        typeof countersArray[c] != "function" &&
        typeof countersArray[c] != "number"
      ) {
        countersArray[c].appendChild(parentPercentDiv);
        countersArray[c].appendChild(graphLabelRow);
      }
    }
  },
  created() {
    if (
      this.type != "tabMaintenanceDistance" &&
      this.type != "tabMaintenanceDays" &&
      this.type != "tabFuel" &&
      this.type != "tabDistance" &&
      this.type != "tabMileage" &&
      this.type != "tabInsuranceDays" &&
      this.type != "tabInsuranceClaims" &&
      this.type != "tabRoadTaxDays" &&
      this.type != "tabRoadTaxAmount" &&
      this.type != "tabCOEDays" &&
      this.type != "tabCOEAmount" &&
      this.type != "tabSummons" &&
      this.type != "tabSummonsFine" &&
      this.type != "tabAccidents"
    ) {
      this.percent = this.percentage;
    }
  },
  components: {
    CircleProgress,
  },
};
</script>
<style>
.chartLabel {
  color: #4E5968;
  font-size: 19.5px;
  font-weight: bold;
}
.tabchartLabel {
  color: #ffff;
}
.numberLabels {
font-weight: 700;
font-size: 20px;
line-height: 22.5px;
color: #4E5968;
}
.numberInfo {
  color: #4E5968;
  font-size: 16px;
  line-height: 22px;
  font-weight: 400;
}
.current-counter {
  position: absolute;
  top: 41%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.vue3-circular-progressbar {
  width: 100% !important;
  height: 100% !important;
  position: relative !important;
}
</style>