<template>
  <div class="forgetpassword">
    <p class="forgetpassword-title text-left">Forgot Password !</p>
    <p class="forgetpassword-head text-left">
      Please enter the User Id that you use to sign In
    </p>

    <form @submit.prevent="submitData">
      <div class="input-wrap">
        <div class="single-field flex flex-column text-left my-2">
          <label for="email" class="forget-lables text-left"
            >User Name/Login Id</label
          >
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
          <!-- <div class="p-field">
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
        <div class="our-error p-error mismatch-error">
          {{ mismatchError }}
        </div>
      </div>
      <Buttons
        button_class="w-full mt-5 forget-btn"
        label="Reset Password"
        type="submit"
      />
    </form>
    <br />
    <router-link to="/">
      <span class="text-right forgot-password-text m-2">
        Go back to <span class="forget-lables">Login!</span>
      </span>
    </router-link>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
//import { required, email } from "@vuelidate/validators";
import { required } from "@vuelidate/validators";
import axios from "axios";
const { URL } = require("../../../config/const");
export default {
  data: () => ({
    v$: useVuelidate(),
    mismatchError: "",
    details: {
      userId: "",
      // email: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        userId: { required },
        // email: {
        //   required,
        //   email,
        // },
      },
    };
  },
  methods: {
    async submitData() {
      // this.details.userId = this.details.userId.trim();
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let entereduserId = this.details.userId;

        await this.forgetFunction(entereduserId);
      }
    },

    async forgetFunction(entereduserId) {
      let vm = this;
      entereduserId = entereduserId.trim();
      axios
        .get("forgotPwd/" + entereduserId)
        .then(async () => {
          this.$router.push({ path: "/success" });
        })
        .catch(function (error) {
          if (error.response) {
            vm.mismatchError = "Check entered Name";
            setTimeout(function () {
              vm.mismatchError = "";
            }, 2000);
          }
        });
    },
  },
  mounted() {
    // http://206.189.136.211:8080/
    axios.defaults.baseURL = URL.BACKEND_BASEURL;
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.forgetpassword {
  display: flex;
  flex-direction: column;
  justify-content: flex-start !important;
  text-align: left !important;
  margin: 30px;
  padding: 40px;
  position: relative !important;
}
.forgetpassword-title {
  color: #6db302;
  font-family: $font-family-primary;
  font-size: 21px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
  letter-spacing: 0px;
  margin: 0 !important;
  position: absolute;
  left: 40px;
  top: 0;
}
.form {
  width: 100%;
}
.input-wrap {
  text-align: left;
}
.forgetpassword-head {
  color: #212121;
  font-family: $font-family-primary;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: left;
  top: 20px;
}
.forget-btn {
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

.forget-lables {
  color: #357dea;
  font-family: $font-family-primary;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
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
</style>
