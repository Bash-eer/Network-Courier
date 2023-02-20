<template>
  <div class="login">
    <p class="login-title text-left">Login</p>
    <p class="login-content text-left">
      Welcome to Network Courier, Please Login
    </p>
    <form @submit.prevent="submitData">
      <div class="input-wrap">
        <div class="single-field flex flex-column text-left my-2">
          <label class="login-lables text-left">User Name/Login Id</label>
          <TextField
            label="userId"
            type="text"
            v-model="details['userId']"
            @blur="v$.details['userId'].$model"
            v-on:childToParent="getUserInput"
            :classes="{
              'p-invalid': v$.details['userId'].$invalid && submitted,
              'inputfield w-full dialog-field-text': true,
            }"
          />
          <!-- ❌🚫❌  ps: dont delete the following code ❌📛❌ -->

          <!-- <label class="login-lables text-left">Email</label>
          <div class="p-field">
            <div class="p-float-label">
              <TextField
                id="email"
                v-model="v$.details.email.$model"
                :classes="{
                  'p-invalid': v$.details.email.$invalid && submitted,
                  'p-inputtext-lg w-100 input-text': true,
                }"
                aria-describedby="email-error"
                placeholder="e.g. Tommy@gmail.com"
              />
            </div>
            <span v-if="v$.details.email.$error && submitted">
              <span
                id="email-error"
                v-for="(error, index) of v$.details.email.$errors"
                :key="index"
              >
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
            <small
              v-else-if="
                (v$.details.email.$invalid && submitted) ||
                v$.details.email.$pending.$response
              "
              class="p-error"
              >{{
                v$.details.email.required.$message.replace("Value", "Email")
              }}</small
            >
          </div> -->
        </div>

        <div class="single-field flex flex-column text-left my-2">
          <label class="login-lables">Password</label>
          <div class="p-field">
            <div class="p-float-label">
              <Password
                id="password"
                v-model="v$.details.password.$model"
                :class="{
                  'p-invalid': v$.details.password.$invalid && submitted,
                  'p-inputtext-lg w-full w-100 input-text': true,
                }"
                class="inputfield w-full"
                :feedback="false"
                toggleMask
              >
              </Password>
            </div>
            <small
              v-if="
                (v$.details.password.$invalid && submitted) ||
                v$.details.password.$pending.$response
              "
              class="p-error"
              >{{
                v$.details.password.required.$message.replace(
                  "Value",
                  "Password"
                )
              }}</small
            >
            <div class="our-error p-error mismatch-error">
              {{ mismatchError }}
            </div>
          </div>
        </div>

        <div class="flex flex-row mt-4">
          <Checkbox
            id="checkin"
            v-model="$store.state.users.rememberMe"
            :binary="true"
            class="mt-1"
          />
          <label for="checkin" class="remember-text ml-2">Remember Me!</label>
        </div>

        <Buttons
          button_class="w-full mt-5 login-btn"
          label="Login"
          type="submit"
        />
        <router-link to="/forget-password">
          <span class="text-right forgot-password-text m-2">
            Forgot Passsword?</span
          >
        </router-link>
      </div>
    </form>
    <!-- ❌🚫❌  ps: dont delete the following code ❌📛❌ -->
    <!-- <div class="signup-text md:mt-6">
          Don't have a account? <span class="signup">Signup</span>
        </div> -->
  </div>
</template>

<script>
import jQuery from "jquery";
// import localIpV4Address from "local-ipv4-address";
// import { internalIpV6, internalIpV4 } from "internal-ip";
// var ip = require('ip');
import ip from "ip";
// import publicIp from "public-ip";
// publicIp = require('public-ip');
import Checkbox from "primevue/checkbox";
import useVuelidate from "@vuelidate/core";
//import { required, email } from "@vuelidate/validators";
import { required } from "@vuelidate/validators";
import Password from "primevue/password";
import axios from "axios";
const { URL } = require("../../../config/const");
export default {
  name: "RightContent",
  data: () => ({
    geoLocationApikey: "ff26231c91f84d77be77d2d2dad5a7b1",
    v$: useVuelidate(),
    mismatchError: "",
    checked: false,
    details: {
      password: "",
      // email: "",
      userId: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        password: { required },
        userId: { required },
        // email: {
        //   required,
        //   email,
        // },
      },
    };
  },
  methods: {
    setUserLocation(data) {
      this.$store.state.users.activityLogObject["user_location"] = data;
    },
    getCurrentLocation() {
      // console.log(ip.address());
      var ref = this;
      if (navigator.geolocation) {
        var user_location;
        navigator.geolocation.getCurrentPosition((position) => {
          var lat = position.coords.latitude;
          var long = position.coords.longitude;
          var geoLocationPath =
            "https://api.opencagedata.com/geocode/v1/json?q=" +
            lat +
            "+" +
            long +
            "&key=" +
            this.geoLocationApikey;
          jQuery.getJSON(geoLocationPath, function (data) {
            user_location = data.results[0].formatted;
            ref.setUserLocation(user_location);
          });
        });
      } else {
        console.log("Browser does not support");
      }
    },
    getCurrentIp() {
      this.$store.state.users.activityLogObject["ip"] = ip.address();
    },
    async submitData() {
      this.details.userId = this.details.userId.trim();
      this.details.password = this.details.password.trim();
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let enteredId = this.details.userId;
        let enteredPassword = this.details.password;
        await this.getAuthToken(enteredId, enteredPassword);
      }
    },

    async getAuthToken(enteredId, enteredPassword) {
      let vm = this;
      axios
        .post(
          "login",
          {
            username: enteredId,
            password: enteredPassword,
            location:
              this.$store.state.users.activityLogObject["user_location"],
            ip: this.$store.state.users.activityLogObject["ip"],
          },
          { withCredentials: false }
        )
        .then(async (res) => {
          localStorage.setItem(
            "PermissionsData",
            JSON.stringify(res.data.results.access)
          );
          localStorage.setItem("AccessToken", res.data.results.token);
          localStorage.setItem("SessionId", res.data.results.session_id);
          //❌do not delete below commented code❌
          // localStorage.setItem("userName",res.data.results.user_details.username);

          // this.$store.state.users.userName =
          //   res.data.results.user_details.username;

          this.$router.push({ path: "/dashboard" });
          this.$store.dispatch("users/getUserPermissions");
          this.$store.dispatch("users/getAuthToken");
          this.$store.dispatch("users/setAuthToken");
        })
        .catch(function (error) {
          if (error.response) {
            vm.mismatchError = "Check entered Name and password";
            setTimeout(function () {
              vm.mismatchError = "";
            }, 2000);
          }
        });
    },
  },
  mounted() {
    this.getCurrentLocation();
    this.getCurrentIp();
    axios.defaults.baseURL = URL.BACKEND_BASEURL;
  },
  components: {
    Checkbox,
    Password,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.login {
  display: flex;
  flex-direction: column;
  justify-content: flex-start !important;
  text-align: left !important;
  margin: 30px;
  padding: 40px;
  position: relative !important;
}
.login-title {
  color: #6db302;
  font-family: $font-family-primary;
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
  letter-spacing: 0px;
  margin: 0 !important;
  position: absolute;
  left: 40px;
  top: 0;
}
form {
  width: 100%;
}
.input-wrap {
  text-align: left;
}
.login-content {
  color: #212121;
  font-family: $font-family-primary;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: left;
}
.login-btn {
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
.login-lables {
  color: #357dea;
  font-family: $font-family-primary;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: left;
}
#login-lables {
  color: #357dea;
  font-family: $font-family-primary;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: left;
}
::v-deep .p-inputtext-lg .p-inputtext {
  color: #212121;
  font-family: $font-family-primary;
  font-size: 14px !important;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
}
::v-deep .input-text {
  color: #212121;
  font-family: $font-family-primary;
  font-size: 14px !important;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
}
.mismatch-error {
  font-family: $font-family-primary;
  font-size: 14px !important;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
}
.remember-text {
  color: #212121;
  font-family: $font-family-primary;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
  text-align: left;
}
.forgot-password-text {
  font-family: $font-family-primary;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  color: #6db302;
  display: flex;
  justify-content: end;
  cursor: pointer;
}

::v-deep .p-input-icon-right > .p-inputtext {
  width: 100% !important;
}
</style>
