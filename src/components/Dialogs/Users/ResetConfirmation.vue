<template>
  <!--RESET confirmation dialog-->
  <div
    v-if="$store.state.users.ConfirmationDialogType == 'Reset'"
    class="flex flex-row"
  >
    <div>
      <img
        class="flex align-items-center justify-content-center m-3"
        src="../../../assets/lock.png"
        alt=""
      />
    </div>
    <div class="flex flex-column">
      <p class="reset-header">Reset Password Confirmation</p>
      <p class="reset-second-heading">
        Are you sure you want to reset the password?
      </p>
    </div>
  </div>
  <!--DELETE confirmation dialog-->
  <div v-else-if="$store.state.users.ConfirmationDialogType == 'Delete'">
    <div class="flex flex-column">
      <p class="reset-header">Delete User Confirmation</p>
      <p class="reset-second-heading">
        Are you sure you want to delete the user?
      </p>
    </div>
  </div>
  <!--RETRIVE confirmation dialog-->
  <div v-else-if="$store.state.users.ConfirmationDialogType == 'Retrive'">
    <div class="flex flex-column">
      <p class="reset-header">Retrive User Confirmation</p>
      <p class="reset-second-heading">
        Are you sure you want to retrive the user?
      </p>
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
      <Buttons
        label="Cancel"
        v-on:childToParent="closeDialog"
        class="p-button-outlined mr-1 dialog-button-text"
      />
      <!--Reset confirmation-->
      <Buttons
        v-if="$store.state.users.ConfirmationDialogType == 'Reset'"
        label="Confirm"
        button_class="dialog-button-text"
        v-on:childToParent="submitData"
      />
      <!--other than reset confirmation-->
      <Buttons
        v-else
        label="Confirm"
        button_class="dialog-button-text"
        v-on:childToParent="ConfirmationFunction"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ResetConfirmation",
  methods: {
    closeDialog() {
      this.$store.state.users.displayDialog = false;
    },
    submitData() {
      let vm = this;
      let userId = this.$store.state.users.ResetPasswordId;
      axios
        .get("resetPwd/email/" + userId)
        .then(async () => {
          let resetToast = ["success", "", "", "Reset"];
          this.$store.commit("users/showToast", resetToast);
        })
        .catch(function (error) {
          if (error.response) {
            let resetToast = [error.response.data.message, "", "", "Reset"];
            vm.$store.commit("users/showToast", resetToast);
          }
        });
      this.$store.state.users.displayDialog = false;
    },
    ConfirmationFunction() {
      this.$store.dispatch(this.$store.state.users.ConfirmationData[0], {
        tag: this.$store.state.users.ConfirmationData[1],
        data: this.$store.state.users.ConfirmationData[2],
      });
      this.$store.state.users.displayDialog = false;
      // this.$refs.op.hide();
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/main.scss";
.reset-header {
  font-family: $font-family;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
}
.reset-first-heading {
  font-family: $font-family;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 0px;
  letter-spacing: 0em;
  text-align: left;
}
.reset-second-heading {
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
}
</style>
