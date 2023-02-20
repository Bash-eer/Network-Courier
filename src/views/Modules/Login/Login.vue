<template>
  <div class="container-wrap">
    <div class="grid">
      <div class="col-7 left-content hidden-sm-down">
        <LeftContent />
      </div>
      <div class="col-5 right-content">
        {{ $route.meta.routepath }}
        <div v-if="$route.meta.routePath == 'login'" class="login">
          <RightContent />
        </div>
        <div v-if="$route.meta.routePath == 'forgot'" class="login">
          <ForgetPassword />
        </div>
        <div v-if="$route.meta.routePath == 'success'" class="login">
          <Success />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RightContent from "../../../components/Login/RightContent.vue";
import LeftContent from "../../../components/Login/LeftContent.vue";
import ForgetPassword from "../../../components/Login/ForgetPassword.vue";
import Success from "../../../components/Login/Success.vue";

export default {
  components: { RightContent, Success, LeftContent, ForgetPassword },
   created() {
    this.accessCode = localStorage.getItem("AccessToken");
  
    if (this.accessCode) {
      this.$router.push("/dashboard");
  
      }

  },
};
</script>

<style scoped>
.container-wrap {
  width: 100vw !important;
  height: 100vh !important;
}
.grid {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: white;
}
.left-content {
  margin: 0 !important;
  padding: 0 !important;
}
.right-content {
  margin: auto !important;
}
.login {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: max-content;
}
.signup-text {
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 0px;
  text-align: center;
  color: #212121;
}
.signup {
  color: #357dea;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0px;
  cursor: pointer;
}
@media (max-width: 575px) {
  .hidden-xs-down {
    display: none !important;
  }
}
@media (min-width: 576px) {
  .hidden-sm-up {
    display: none !important;
  }
}
@media (max-width: 767px) {
  .hidden-sm-down {
    display: none !important;
  }
}
@media (min-width: 768px) {
  .hidden-md-up {
    display: none !important;
  }
}
@media (max-width: 991px) {
  .hidden-md-down {
    display: none !important;
  }
}
@media (min-width: 992px) {
  .hidden-lg-up {
    display: none !important;
  }
}
@media (max-width: 1199px) {
  .hidden-lg-down {
    display: none !important;
  }
}
@media (min-width: 1200px) {
  .hidden-xl-up {
    display: none !important;
  }
}
.hidden-xl-down {
  display: none !important;
}
</style>
