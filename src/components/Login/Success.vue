<template>
  <div class="success">
    <div class="text-left img-wrapper">
       <img src="../../assets/success.png" class="success-img" alt="">
    </div>
   
    <p class="success-main text-left">Success</p>
    <p class="success-head text-left">
      Email with password reset instructions was sent to the
    </p>
    <p class="success-head text-left">
      registered email address, Please check you mail and
    </p>
    <p class="success-head text-left">follow the instructions</p>
    <Buttons
      button_class=" w-full mt-5 back-btn"
      label="Back To Login"
      type="submit"
      @click="goBack"
    />
  </div>
</template>

<script>
export default {
  methods: {
    goBack(){
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.success-main {
  color: #6db302;
  //   font-family: $font-family-primary;
  font-size: 21px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
  //   letter-spacing: 0px;
  //   margin: 0 !important;

 // left: 40px;
  //   top: 0;
}

.back-btn {
  background: #6db302;
  border-radius: 10px;
  outline: none;
  border: none;
  padding: 3px 16px;
  color: #fff;
  font-family: $font-family-primary;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 0px;
  text-align: center;
}
// .img-wrapper{
//   background-color: gold;
// }
// .success-img {
//   background-color: pink;
// }
</style>