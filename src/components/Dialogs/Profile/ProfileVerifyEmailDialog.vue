<template>
  <div>
    <!-- <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <p class="required">Email Id</p>
        <TextField classes="inputfield w-full" />
      </div>
    </div> -->

    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <!-- <p class="required">Enter your OTP here</p>
        <TextField classes="inputfield w-full" /> -->
        <h5 class="required dialog-label-text">Verify your OTP here</h5>
        <TextField
          label="personName"
          v-model="details.OTP"
          @blur="v$.details.OTP.$model"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details.OTP.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
    <div class="our-error p-error mismatch-error">
      {{ mismatchError }}
    </div>
    <div class="formgrid grid countdown">
      <div class="field col-12 md:col-12 timer">
        <i class="pi pi-clock clock"></i>
        <p v-if="show" class="mt-3 mr-1">0:{{ countDown }} Minute</p>
        <p v-else class="mt-3 mr-1">1:00 Minute</p>
        <button
          @click="
            countDownTimer();
            toggleShow();
            sendOTP();
          "
          :disabled="isDisabled"
          class="otp__button"
        >
          Send OTP
        </button>
      </div>
    </div>
    <!--Footer-->
    <div
      class="
        flex
        justify-content-between
        w-full
        align-content-center
        py-3
        flex-wrap
      "
    >
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <!-- <Buttons
          label="Cancel"
          v-on:childToParent="closeDialog"
          class="p-button-outlined mr-1 dialog-button-text"
        /> -->
        <Buttons
          label="Verify"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const { URL } = require("../../../../config/const");
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "ProfileVerifyEmailDialog",
  // components: {
  //   Button
  // },
  data() {
    return {
      submitted: false,
      v$: useVuelidate(),
      mismatchError: "",
      details: {
        OTP: "",
      },
      countDown: 59,
      show: false,
      isDisabled: false,
    };
  },
  validations() {
    return {
      details: {
        OTP: { required },
      },
    };
  },
  methods: {
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    async submitData() {
      console.log(this.details.OTP);
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        // this.$store.state["users"].displayDialog = false;
        // this.$store.state.sales.stepperNavigation = null;
        let enteredOTP = this.details.OTP.trim();
        await this.otpVerification(enteredOTP);
      }
    },

    async otpVerification(enteredOTP) {
      let vm = this;
      axios
        .post(
          "/userVerification/",
          // {params:
          {
            otp: enteredOTP,
          }
          // }
        )

        .then(async (res) => {
          console.log(enteredOTP);
          console.log("passed");
          console.log(res);
          this.$store.state.profile.verifiedEmail = "verified";
          this.$store.state["users"].displayDialog = false;
        })
        .catch(function (error) {
          console.log(error);
          if (error.response) {
            vm.mismatchError = "Check entered OTP";
            setTimeout(function () {
              vm.mismatchError = "";
            }, 2000);
            console.log(error);
          }
        });
    },

    sendOTP() {
      // console.log("send now");
      // let vm = this;
      axios
        .get("sendOtp")

        .then(async () => {
          console.log("sent to mail");
          // this.$store.state["users"].displayDialog = false;
        })
        .catch(function (error) {
          // if (error.response) {
          //   vm.mismatchError = "Check entered OTP";
          //   setTimeout(function () {
          //     vm.mismatchError = "";
          //   }, 2000);
          console.log(error);
          // }
        });
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
      // if(this.countDown == 0){
      //   // this.show = false
      // this.isDisabled = false
      // }
    },
    toggleShow() {
      this.show = true;
      this.isDisabled = true;
    },
  },
  mounted() {
    axios.defaults.baseURL = URL.BACKEND_BASEURL;
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.countdown {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .timer {
    // flex: 5%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  p {
    // flex: 40%;
    display: flex;
    justify-content: flex-start;
    margin-left: 10px;
    text-align: left;
    font-family: $font-family-primary;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 15px;
    letter-spacing: 0em;
    text-align: left;
  }
  .otp__button {
    // flex: 40%;
    justify-content: flex-end;
    align-items: flex-end;
    text-align: right;
    color: #357dea;
    border: none;
    font-family: $font-family-primary;
    line-height: 15px;
    font-weight: bold;
    font-size: 12px;
    background-color: initial;
  }
}
.otp__button:disabled,
.otp__button[disabled] {
  font-family: $font-family-primary;
  line-height: 15px;
  font-weight: bold;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
}
.verify__button {
  font-family: $font-family-primary;
  line-height: 15px;
  font-weight: bold;
  font-size: 14px;
  margin-left: auto;
  margin-right: 10px;
  background-color: #357dea;
}
.required {
  color: #7a7a7a;
}
.required:after {
  content: "*";
  color: red;
}
.mismatch-error {
  font-family: $font-family-primary;
  font-size: 14px !important;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: right;
}
</style>
