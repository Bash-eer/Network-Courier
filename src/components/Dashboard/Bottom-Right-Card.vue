<template>
  <div class="card bottom-right-card-wrapper">
    <div class="center-card-title">
      <!-- <p class="center-card-left-text m-2">Agent Performance</p> -->
  <p class="bottom-right-card-title m-4 mt-5">Orders</p>
      <p class="center-card-right-text m-3 mt-5">View More</p>
    </div>

    <div class="m-0" v-for="item in CenterCardData" :key="item.id">
     
      <div class="flex flex-column center-card-content mt-5">
        <div class="flex flex-row">
          <div class="flex flex-row">
            <!-- <img class="center-card-img" src="../../assets/dhl.png" alt="dhl">
        <img class="center-card-img" :src="item.imgURL" alt="dhl"> -->
            <img
              class="center-card-img-one m-3 ml-5"
              :src="require('../../assets/green-circle.png')"
            />
            <!-- <img class="center-card-img" :src="`../../assets/${item.img}.png`" alt="dhl"> -->
            <div class="flex flex-column ml-3">
            <p class="center-card-text">{{ item.title }}</p>
            <p class="center-card-subtitle ">{{ item.subTitle }}</p>
            </div>
            <div :class="item.class">
                <img
              class="center-card-img-two mt-1"
              :src="require('../../assets/' + item.img + '.png')"
            />
            </div>
           
          </div>
          
        </div>
      </div>
    </div>
    <br>
    <br>
    <img class="absolute-bg" src="../../assets/bg-vector.png" alt="">
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
          title: "Tracking No.: 15414584",
          subTitle: "Status: Out for Delivery",
          img: "tv",
          class: "img-wrap"
        },
        {
          id: "02",
          title: "Tracking No.: 15414584",
          subTitle: "Status: Out for Delivery",
          img: "tv",
        class: "img-wrap"
        },
        {
          id: "03",
          title: "Tracking No.: 15414584",
          subTitle:"Status: Parcel Picked by Logisctics",
          img: "fed",
          class: "img-wrap"
         
        },
        {
          id: "04",
          title: "Tracking No.: 15414584",
          subTitle:"Status: Order Picked up",
          img: "box",
          class: "no-wrap"
         
        },
         {
          id: "05",
          title: "Tracking No.: 15414584",
          subTitle:"Status: Order Picked up",
          img: "box",
          class: "no-wrap"
        
        },
      ],
   
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.card{
  border-radius: 0px 0px 5px 5px;
}
.bottom-right-card-wrapper {
     margin: 0 !important;
     padding: 0 !important;
  // margin-right: -45px !important;
  height: 100% !important;
  width: 100% !important;
  background-color: #fff;
   
}
.center-card-subtitle {
  font-family: $font-family-secondary;
font-size: 14px;
font-style: normal;
font-weight: 400;
 line-height: 21px;
letter-spacing: 0em;
text-align: left;
color:  #999DA0;
//  margin-top: -10px;
// margin: 0 !important;
// padding: 0 !important;

}
.center-card-title {
  // background-color: pink;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
   
}
.bottom-right-card-title{
  font-family: $font-family-secondary;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 24px;
letter-spacing: 0em;
text-align: left;
color :#000;

}
.center-card-text {
  font-family: $font-family-secondary;
font-size: 16px;
font-style: normal;
font-weight: 500;
// line-height: 24px;
letter-spacing: 0em;
text-align: left;
//  margin-bottom: -1px !important;
color: #000;

}
.center-card-img-one {
  width:15px;
  height:15px;
}
.img-wrap{
 border: 1px solid #EBEBEB;
box-sizing: border-box;
border-radius: 5px;
  position: absolute;
  right:20px;
  padding:5px;
  width: 50px;
  height: 50px;
    opacity: 1 !important;
 z-index: 1;
}
.center-card-img-two{
  // width:40px;
  // height:35px;
  
 
   opacity: 1 !important;
 z-index: 1;
 
}


.center-card-left-text {
  font-family: $font-family-secondary;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  // line-height: 32px;
  text-align: left;
}
.center-card-right-text {
  font-family:  $font-family-primary;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  // line-height: 20px;
  /* identical to box height, or 167% */

  /* Primary / Base */
color: #999DA0;

}
/* .center-card-content{
    background-color: teal;
   
} */
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
.absolute-bg {
  position: absolute;
  bottom: 0;
  right:0;
 

}
.no-wrap {
   position: absolute;
  right:20px;
  opacity: 1 !important;
 z-index: 1;
}
</style>
