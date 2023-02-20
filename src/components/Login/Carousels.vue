<template>
  <div>
    <div class="carousel-wrap ml-6">
      <Carousel
        :value="carouselData"
        :numVisible="1"
        :numScroll="1"
        :responsiveOptions="responsiveOptions"
        class="custom-carousel"
        :circular="true"
        :autoplayInterval="2000"
      >
        <template #item="slotProps">
          <div class="leftcontent-content-wrap">
            <span>
              <img class="mb-5" src="../../assets/nc-logo.png" alt="" />
            </span>

            <p class="left-content-title">WELCOME TO</p>
            <p class="left-content-title">NETWORK COURIER</p>

            <!-- <div class="leftcontent-content-wrap ml-6 m-4">
               <img class="mb-5" src="../../assets/nc-logo.png" alt="">
            <p class="left-content-title">WELCOME TO </p>
            <p class="left-content-title">NETWORK COURIER</p>
           
            </div> -->

            <h4 class="left-content-descriptions">{{ slotProps.data.text }}</h4>
          </div>
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script>
import Carousel from "primevue/carousel";
// import Button from "primevue/button";
export default {
  name: "Carousels",
  components: {
    Carousel,
    //  Button
  },
  props: ["carouselData", "responsiveOptions"],
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
/* .carousel-wrap{
  display: flex;
  background-color: green !important;
  
} */
/* .product-item-content {
  border: 1px solid var(--surface-d);
  border-radius: 3px;
  margin: 0.3rem;
  text-align: center;
  padding: 2rem 0;
}

.product-image {
  width: 100%;
  height: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
} */
::v-deep .p-carousel-next {
  display: none !important;
}
::v-deep .p-carousel-prev {
  display: none !important;
}
::v-deep .p-carousel .p-carousel-indicators {
  display: flex !important;
  text-align: left;
  justify-content: center !important;
}
::v-deep .p-carousel .p-carousel-indicators .p-carousel-indicator button {
  background-color: #6db302;
  width: 25px;
  height: 0.5rem;
  transition: none;
  border-radius: 15px;
}
::v-deep
  .p-carousel
  .p-carousel-indicators
  .p-carousel-indicator.p-highlight
  button {
  background-color: #fff;
  outline: none !important;
  border: none !important;
}
::v-deep .p-carousel .p-carousel-indicators .p-carousel-indicator button:hover {
  background-color: none;
  outline: none !important;
  border: none !important;
}
.left-content-title {
  font-family: $font-family-primary;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  // line-height: 87px;
  // letter-spacing: 0px;
  text-align: left !important;
  margin: 0;
}
.left-content-descriptions {
  font-family: $font-family-primary;
  font-size: 26px;
  font-style: normal;
  font-weight: 400;
  line-height: 40px;
  letter-spacing: 0px;
  text-align: left;
}
</style>
