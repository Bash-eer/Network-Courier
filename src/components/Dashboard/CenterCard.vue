<template>
  <div class="card center-card-wrapper">
    <div class="center-card-title mt-3 ml-3">
      <!-- <p class="center-card-left-text m-2">Agent Performance</p> -->
      <DropDown
        :data="dropDownData"
        label="userRole"
        id="userRole"
        v-model="value"
        :value="value"
        v-on:childToParent="getUserInput"
        classes="inputfield  dialog-dropdown-input-text"
        placeholder="Agent Performance"
        code="code"
      />
      <p class="center-card-right-text m-2 mr-5">View All</p>
    </div>

    <div class="m-0" v-for="item in CenterCardData" :key="item.id">
      <hr class="hr" />
      <div class="flex flex-column center-card-content">
        <div class="flex flex-row">
          <div class="flex flex-row">
            <!-- <img class="center-card-img" src="../../assets/dhl.png" alt="dhl">
        <img class="center-card-img" :src="item.imgURL" alt="dhl"> -->
            <img
              class="center-card-img ml-3"
              :src="require('../../assets/' + item.img + '.png')"
            />
            <!-- <img class="center-card-img" :src="`../../assets/${item.img}.png`" alt="dhl"> -->
            <p class="center-card-text m-3">{{ item.title }}</p>
          </div>
          <div class="center-card-number m-3">{{ item.number }}</div>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: null,
      CenterCardData: [
        {
          id: "01",
          title: "DHL Couriers",
          number: 155,
          img: "dhl",
          imgURL: "../../assets/dhl.png",
        },
        {
          id: "02",
          title: "Fedex",
          number: 123,
          img: "fedex",
          imgURL: "../../assets/dhl.png",
        },
        {
          id: "03",
          title: "Blue Dart",
          number: 112,
          img: "bluedart",
          imgURL: "../../assets/dhl.png",
        },
        {
          id: "04",
          title: "UPS Inc.",
          number: 101,
          img: "ups",
          imgURL: "../../assets/dhl.png",
        },
      ],
      dropDownData: [
        { name: "Agent Performance", code: "AP" },
        { name: "Something", code: "ST" },
        { name: "Something Else", code: "STE" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.card {
  border-radius: 8px !important;
}
.center-card-wrapper {
  // width: 300px;
  width: 100% !important;
  height: 100% !important;
  background-color: #fff;
}
.center-card-number {
  // float: right !important;
  position: absolute;
  right: 30px;
  //styleName: Caption 14 / Family #1 / Bold;
  font-family: $font-family-primary;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
}
.center-card-title {
  // background-color: pink;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.center-card-left-text {
  font-family: $font-family-secondary;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 32px;
  text-align: left;
}
.center-card-right-text {
  font-family: $font-family-primary;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  /* identical to box height, or 167% */

  /* Primary / Base */

  color: #46b04a;
}
/* .center-card-content{
    background-color: teal;
   
} */
.center-card-text {
  //styleName: Caption 14 / Family #1 / Bold;
  font-family: $font-family-primary;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
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
.hr {
  // color: red !important;
  // height: 0.1px !important;
  opacity: 0.04;
  border: 1.00635px solid #000000;
}
</style>
