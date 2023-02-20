<template>
 
        <div class="login-leftcontent">
            <div class="position-bottom">
                <!-- <div class="leftcontent-content-wrap ml-6 m-4"> <img class="mb-5" src="../../assets/nc-logo.png" alt="">
            <p class="left-content-title">WELCOME TO </p>
            <p class="left-content-title">NETWORK COURIER</p></div> -->
             <div class="pos">
                     <Carousels
          :carouselData="carouselData"
          :responsiveOptions="responsiveOptions"
        /> </div>  
       
        </div>
        </div>
</template>

<script>
export default {
 data(){
    return{
      //data for Carousels
  carouselData: [
   
    
    {
      id: "1002",
      text: "FAST AND CONVENIENT WAY OF DELIVERING"
    },
  
    {
      id: "1003",
      text: "INTERNATIONAL SERVICES"
    },
    {
      id: "1001",
      text: "Now you can arrange for your courier,on the Go!",
    },
    
  
  ],
  responsiveOptions: [
    {
      breakpoint: "1024px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "600px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "480px",
      numVisible: 1,
      numScroll: 1,
    },
  
    ],
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/scss/main.scss";
.login-leftcontent{
    background: url('../../assets/login-bg.jpg');
     background-size: cover;
    /* background-repeat: no-repeat;
    background-position:center;  */
    background-repeat: no-repeat;
    height: 100vh;
    margin: 0 !important;
    padding: 0 !important;
    position: relative !important;
    // display:inline-block !important;
    overflow: hidden !important;
}

 .position-bottom {
    position: absolute;
    bottom: 10px !important;
    color: white !important;
    // background: red;
}
.leftcontent-content-wrap {
    /* background: pink; */
    /* display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: left !important; */
    /* display: block;
    margin: auto; */
    text-align: left !important;
    /* height: 100vh; */
}

</style>