<template>
  <div class="container__layout">
    <div class="tabmenu">
      <button class="button__1" @click="profile" ref="profile__ref">
        Profile
      </button>
      <button class="button__2" @click="account" ref="account__ref">
        Account Preference
      </button>
    </div>
    <div v-if="show_profile" class="profile__screen">
      <div class="left__component">
        <div v-if="ImgURL == null" class="edit">
          <ProfileImage URL="/images/noavatar.png" />
        </div>
        <div v-else class="edit">
          <ProfileImage :URL="ImgURL" />
        </div>

        <br />

        <!-- <div class="edit">
          <div>
            <i class="fas fa-pen icon"></i>
          </div>
          <img src="../assets/profile-girl.png" class="profile__pic" />
        </div> -->

        <div class="profile__main">
          <h3 class="name">{{ profile_detail.name }}</h3>
          <p class="email">{{ profile_detail.email }}</p>
          <!-- <p class="country">{{ profile_detail.country }}</p> -->
        </div>
      </div>
      <div class="right__component">
        <div v-for="item in profile_data" :key="item.id">
          <div :class="item.dark ? 'dark-bg' : ''" class="field">
            <p class="field__1">{{ item.field_1 }}</p>
            <p class="colon">:</p>
            <div v-if="item.field_2 == 'Pending'" class="field__2 pending">
              <img
                src="../assets/profile-dot.png"
                width="16"
                height="16"
                class="pending__img"
              />
              <p class="">{{ item.field_2 }}</p>
            </div>
            <div
              v-else-if="item.field_2 == 'Verified'"
              class="field__2 verified"
            >
              <img
                src="../assets/profile-verified.png"
                width="16"
                height="16"
                class="verified__img"
              />
              <p>{{ item.field_2 }}</p>
            </div>
            <div
              v-else-if="item.field_1 == 'Password'"
              class="field__2 password"
            >
              <p>{{ item.field_2 }}</p>
            </div>
            <div v-else class="field__2">
              <p>{{ item.field_2 }}</p>
            </div>
            <!-- <div v-if="item.id == 3 && item.field_3"> -->
            <!-- {{profile_detail.user_verified}} -->
            <div
              v-if="
                item.id == 3 &&
                (profile_detail.user_verified == false ||
                  profile_detail.user_verified == null)
              "
            >
              <Buttons
                v-if="
                  profile_detail.user_verified == false ||
                  profile_detail.user_verified == null
                "
                :label="item.field_3"
                class="field__3"
                v-on:childToParent="openDialog('ProfileVerifyEmailDialog')"
              />
            </div>
            <div v-if="item.id == 9 && item.field_3">
              <Buttons
                :label="item.field_3"
                class="field__3"
                v-on:childToParent="openDialog('ProfileResetPasswordDialog')"
              />
            </div>
            <!-- <div v-else-if="item.field_3">
              <Buttons :label="item.field_3" class="field__3" />
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div v-if="show_footer">
      <p class="footer" ref="footer__ref">
        This account was created on {{ profile_detail.account_created }}
      </p>
    </div>
    <div v-if="show_account" class="account__preference">ACCOUNT</div>
  </div>
  <!-- <Dialogs
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['users'].dialogComponent"
  /> -->
</template>

<script>
//import Avatar from 'primevue/avatar';
import ProfileImage from "../components/Profile/ProfileImage.vue";
import axios from "axios";
const { URL } = require("../../config/const");

export default {
  name: "ProfileTab",
  components: { ProfileImage },
  data() {
    return {
      ImgURL: null,
      // profile_data: this.$store.state.profile.profile,
      // profile_detail: this.$store.state.profile.profile_details,
      profile_detail: {
        // name: "something will come",
        name: "something",
        email: null,
        country: "Singapore",
        account_created: "February 20, 2020, 9:30:35 PM",
        mobile: null,
        user_verified: false,
      },
      show_profile: true,
      show_account: false,
      display: false,
      show_footer: true,
      profile_data: [
        { field_1: "Name", field_2: null, id: 1, dark: true },
        { field_1: "Email", field_2: null, id: 2, dark: false },
        {
          field_1: "Email Verification",
          field_2: "Pending",
          field_3: "Verify Now?",
          id: 3,
          dark: true,
        },
        { field_1: "Role", field_2: null, id: 4, dark: false },
        { field_1: "Contact", field_2: null, id: 5, dark: true },
        { field_1: "Status", field_2: null, id: 7, dark: true },
        {
          field_1: "Password",
          field_2: 12345,
          field_3: "Reset Password?",
          id: 9,
          dark: true,
        },
      ],
    };
  },
  methods: {
    selectfile(event) {
      if (event.target.files) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (e) => {
          this.url = e.target.result;
        };
      }
    },

    profile() {
      this.show_profile = true;
      this.show_account = false;
      this.show_footer = true;
      const $ref__account = this.$refs.account__ref;
      const $ref__profile = this.$refs.profile__ref;
      const $ref__footer = this.$refs.footer__ref;
      $ref__account.style.backgroundColor = "#EDF1F7";
      $ref__account.style.color = "#7E84A7";
      $ref__profile.style.backgroundColor = "#ffffff";
      $ref__profile.style.color = "#386983";
      $ref__footer.style.display = "true";
    },
    account() {
      this.show_profile = false;
      this.show_account = true;
      this.show_footer = false;
      const $ref__account = this.$refs.account__ref;
      const $ref__profile = this.$refs.profile__ref;
      const $ref__footer = this.$refs.footer__ref;
      $ref__account.style.backgroundColor = "#ffffff";
      $ref__account.style.color = "#386983";
      $ref__profile.style.backgroundColor = "#EDF1F7";
      $ref__profile.style.color = "#7E84A7";
      $ref__footer.style.display = "none";
    },
    openDialog(dialog_name) {
      this.$store.state.users.dialogComponent = dialog_name;
      this.$store.getters["users/controlActivityDialog"];
    },
    getProfileFunction() {
      axios
        .get("user/profile")

        .then((res) => {
          console.log(res, "hello");
          this.ImgURL = res.data.results.profile_url;
          this.profile_detail.name = res.data.results.username;
          this.profile_detail.email = res.data.results.email;
          this.profile_detail.account_created = res.data.results.createdAt;
          this.profile_detail.mobile = res.data.results.mobile_no;
          this.profile_data[0].field_2 = res.data.results.username;
          this.profile_data[1].field_2 = res.data.results.email;
          this.profile_data[4].field_2 = res.data.results.mobile_no;
          this.profile_data[3].field_2 =
            res.data.results.user_role_mapping[0].user_role.role_name;
          this.profile_data[5].field_2 = res.data.results.status;
          this.profile_detail.user_verified = res.data.results.user_verified;
          if (res.data.results.user_verified == true) {
            this.profile_data[2].field_2 = "Verified";
          } else this.profile_data[2].field_2 = "Pending";
        })
        .catch(function (error) {
          if (error.response) {
            // vm.mismatchError = "Check entered Name and password";
            // setTimeout(function () {
            //   vm.mismatchError = "";
            // }, 2000);
          }
        });
    },
  },
  mounted() {
    this.$store.state.users.breadcrumbTitle = null;
    this.$store.commit("users/updateBreadCrumb", "Edit Profile");
    axios.defaults.baseURL = URL.BACKEND_BASEURL;
    axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("AccessToken")}`,
    };
    this.getProfileFunction();
  },

  // updated() {
  //   this.getProfileFunction();
  // },
  watch: {
    "$store.state.profile.verifiedEmail": function () {
      this.getProfileFunction();
    },
  },
};
</script>

<style lang="scss" scoped>
.container__layout {
  background-color: #ffffff;
  padding: 10px;
  border-radius: 5px;
}
.tabmenu {
  background-color: #edf1f7;
  height: 60px;
  border-radius: 5px;
  display: flex;
  justify-content: left;
  align-items: center;
  text-align: center;
  margin: auto;
  padding: auto;
  .button__1 {
    width: 100px;
    height: 35px;
    border: none;
    background-color: #ffffff;
    margin: 15px;
    border-radius: 5px;
    padding: 10px;
    font-family: Montserrat;
    font-weight: bold;
    font-size: 1rem;
    line-height: 20px;
    letter-spacing: 3%;
    color: #386983;
  }
  .button__2 {
    width: 250px;
    height: 35px;
    border: none;
    margin: 10px;
    border-radius: 5px;
    background-color: #edf1f7;
    padding: 10px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 1rem;
    line-height: 20px;
    letter-spacing: 3%;
    color: #7e84a7;
  }
}
.profile__screen {
  padding: 30px 30px 30px 20px;
  background-color: #ffffff;
  display: flex;
  .left__component {
    background: url("../assets/profile-bg.png");
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 15px;
    color: #4e5868;
    .profile__pic {
      border-radius: 100px;
    }
    .email {
      font-weight: normal;
    }
    .country {
      font-weight: 400px;
    }
  }
  .right__component {
    flex: 100%;
    margin-left: 20px;
    .field {
      display: grid;
      grid-template-columns: repeat(4, 2fr);
      font-weight: bold;
      color: #7e84a7;
      // padding: 8px;
      padding-left: 10px;
      padding-top: 15px;
      //  padding-bottom: 10px;
      font-family: Montserrat;
      line-height: 15px;
      font-weight: bold;
      font-size: 12px;
      .field__1,
      .field__2 {
        text-align: left;
      }
      .field__3 {
        color: #4a8bec;
        border: none;
        font-family: Montserrat;
        line-height: 15px;
        font-weight: bold;
        font-size: 12px;
        background-color: initial;
      }
      .pending {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        color: #ffac4a;
        .pending__img {
          margin-right: 5px;
          margin-top: -17px;
        }
      }
      .verified {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        color: #4a8bec;
        .verified__img {
          margin-right: 5px;
          margin-top: -17px;
        }
      }
      .password {
        -webkit-text-security: disc;
        font-size: 17px;
        font-weight: bold;
      }
    }
    .dark-bg {
      background-color: rgba(0, 0, 0, 0.025);
      border-radius: 5px;
    }
  }
}
.footer {
  margin: 0px;
  padding-left: 30px;
  display: flex;
  justify-content: flex-start;
  font-family: Montserrat;
  font-style: normal;
  font-size: 14px;
  line-height: 15px;
  color: #4e5868;
}
.edit {
  position: relative;
}
.icon {
  position: absolute;
  z-index: 2;
  top: 8%;
  right: 8%;
  padding: 10px;
  background-color: #386983;
  color: #ffffff;
  border-radius: 25px;
}
@media (max-width: 1000px) {
  .tabmenu {
    .button__1,
    .button__2 {
      font-size: 14px;
    }
  }
  .profile__screen {
    display: flex;
    flex-direction: column;
    .left__component {
      background-size: auto;
      margin-bottom: 15px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      font-size: 13px;
      line-height: 0.8rem;
      justify-content: space-between;
      .profile__pic {
        max-width: 130px;
        width: 100%;
        height: auto;
      }
      .profile__name {
        flex-direction: column;
      }
      .icon {
        top: 0%;
      }
    }
    .right__component {
      flex: 100%;
      display: flex;
      flex-direction: column;
    }
  }
  .footer {
    display: none;
  }
}
@media (max-width: 475px) {
  .profile__screen {
    .right__component {
      .field {
        grid-template-columns: repeat(3, 2fr);
        .colon {
          display: none;
        }
      }
    }
  }
}
::v-deep .p-button {
  padding: 0;
}
</style>
