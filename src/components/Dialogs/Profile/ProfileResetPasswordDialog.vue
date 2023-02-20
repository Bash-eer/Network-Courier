<template>
  <div>
    <!-- <div class="formgrid grid" >
      <div class="field col-12 md:col-12">
          <h5  class="required">Old Password</h5>
          <Password  v-model="oldPassword" :feedback="false" toggleMask 
          :class="{
            'p-invalid': v$.oldPassword.$invalid && submitted,
            'inputfield w-full dialog-field-text': true,
          }">
          </Password>
      </div>
    </div> -->
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="required text">New Password</h5>
        <Password
          v-model="newPassword"
          :feedback="false"
          toggleMask
          :class="{
            'p-invalid': v$.newPassword.$invalid && submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        >
          ></Password
        >
      </div>
    </div>
    <!-- feedback false  :feedback="false" -->
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="required text">Confirm Password</h5>
        <Password
          v-model="confirmPassword"
          :feedback="false"
          toggleMask
          :class="{
            'p-invalid': v$.confirmPassword.$invalid && submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        >
          ></Password
        >
      </div>
    </div>
    <div class="our-error p-error mismatch-error">
      {{ mismatchError }}
    </div>
    <div class="formgrid grid">
      <Buttons
        button_class="w-full mt-5 verify__button"
        label="Change Password"
        type="submit"
        v-on:childToParent="submitData"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
const { URL } = require("../../../../config/const");
import Password from "primevue/password";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "ProfileResetPasswordDialog",
  components: {
    Password,
  },
  data() {
    return {
      v$: useVuelidate(),
      mismatchError: "",
      //  oldPassword: "" ,
      newPassword: "",
      confirmPassword: "",

      submitted: false,
    };
  },
  validations() {
    return {
      //  oldPassword: { required },
      newPassword: { required },
      confirmPassword: { required },
    };
  },
  methods: {
    submitData() {
      console.log("submitting");
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        console.log("success");
        let newPw = this.newPassword.trim();
        let confirmPw = this.confirmPassword.trim();
        this.resetPwFunction(newPw, confirmPw);
      }
    },

    resetPwFunction(newPw, confirmPw) {
      let vm = this;
      axios
        .post(
          "resetPwd",

          {
            newPassword: newPw,
            confirmPassword: confirmPw,
          }
          // }
        )

        .then(async (res) => {
          console.log(res);
          this.$store.state["users"].displayDialog = false;
          let resetToast = ["success", "", "", "Reset"];
          this.$store.commit("users/showToast", resetToast);
        })
        .catch(function (error) {
          console.log(error);
          if (error.response) {
            vm.mismatchError = "Password don't match";
            setTimeout(function () {
              vm.mismatchError = "";
            }, 2000);
            console.log(error);
          }
        });
    },
  },
  mounted() {
    axios.defaults.baseURL = URL.BACKEND_BASEURL;
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.required:after {
  content: "*";
  color: red;
}

.verify__button {
  font-family: $font-family-primary;
  line-height: 15px;
  font-weight: bold;
  font-size: 14px;
  margin-left: auto;
  margin-right: 10px;
  margin-top: 20px;
  background-color: #357dea;
}
::v-deep(.inputfield.p-password) {
  width: 100%;
  .p-password-input {
    width: 100%;
  }
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
.text {
  font-family: $font-family-primary;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: left;
  background-color: transparent;
}
</style>
