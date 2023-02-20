<template>
  <div
    class="flex flex-row cursor"
    @click="toggle"
    aria-haspopup="true"
    aria-controls="overlay_menu"
  >
    <AvatarLabel
      v-if="userAvatar != null"
      v-bind:label="userAvatar"
      classes="ml-1 mt-1 avatar-text"
      shape="circle"
    />
    <img
      v-if="ImgURL == null"
      src="../../assets/noavatar.png"
      width="35"
      height="35"
      class="avatar-image p-mr-2 mt-1"
      alt="avatar"
    />
    <img
      v-else
      :src="ImgURL"
      width="35"
      height="35"
      class="avatar-image p-mr-2 mt-1"
      alt="avatar"
    />
    <span class="name m-1 ml-2 mt-2">
      {{ userName }}
      <i class="pi pi-angle-down m-1"></i>
    </span>
    <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
  </div>
</template>

<script>
import Menu from "primevue/menu";
import axios from "axios";
const { URL } = require("../../../config/const");
export default {
  components: {
    Menu,
  },
  data() {
    return {
      userName: null,
      userAvatar: null,
      ImgURL: null,
      items: [
        {
          items: [
            {
              label: "Edit Profile",
              icon: "pi pi-user",
              command: () => {
                this.$router.push("/profile");
              },
            },
            {
              label: "Logout",
              icon: "pi pi-upload",
              command: async () => {
                let SessionId = localStorage.getItem("SessionId");
                await axios
                  .post("logout/" + SessionId)
                  .then(function (res) {
                    if (res.data.status == 200) {
                      localStorage.clear();
                      window.location.hash = "/";
                      location.reload();
                    }
                  })
                  // eslint-disable-next-line no-unused-vars
                  .catch(function (error) {
                    if (error) {
                      localStorage.clear();
                      window.location.hash = "/";
                    }
                  });
              },
            },
          ],
        },
      ],
    };
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
    getProfileFunction() {
      axios
        .get("user/profile")
        .then((res) => {
          this.$store.state.commonStore.loggedInUser =
            res.data.results.display_name;
          this.$store.state.commonStore.userDetails =
            res.data.results;
          this.userName = res.data.results.username;
          this.ImgURL = res.data.results.profile_url;
           this.$store.state.commonStore.userDetails =
            res.data.results;
        })
        .catch(function (error) {
          if (error.response) {
            // console.log(error);
          }
        });
    },
  },
  created() {
    axios.defaults.baseURL = URL.BACKEND_BASEURL;
    axios.defaults.headers.common = {
      Authorization: `bearer ${localStorage.getItem("AccessToken")}`,
    };
    this.getProfileFunction();
  },
  watch: {
    "$store.state.profile.isImgUpdated": function () {
      this.getProfileFunction();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.cursor {
  cursor: pointer;
}
.p-toolbar {
  background-color: white !important;
  padding: 10px !important;
}
::v-deep .p-badge {
  background: $primary-color-3 !important;
}
@media (min-width: 576px) {
  .hidden-sm-up {
    display: none !important;
  }
}
::v-deep .p-component[data-v-68be103e] {
  width: 100% !important;
  background-color: #204b8c !important;
}
.name {
  font-family: $font-family-primary;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  color: #171717;
}
::v-deep .p-menubar {
  border: none !important;
  padding: 0 !important;
  background: transparent !important;
}
::v-deep .p-toolbar-group-right > div.p-menubar.p-component > ul > li {
  background-color: transparent !important;
}
.avatar-image {
  border-radius: 50%;
}
</style>
