<template>
  <div class="img_upload">
    <div class="input-wrap">
      <i htmlFor="file-input" className=" fas fa-pen icon" />
      <input
        class="input-class"
        id="file-input"
        type="file"
        @change="selectfile($event)"
      />
    </div>
    <label class="click-cursor">
      <img
        :src="url"
        class="avatar"
        name="img"
        accept="image/*"
        @click="selectfile($event)"
      />
    </label>
  </div>
</template>

<script>
import axios from "axios";
const { URL } = require("../../../config/const");
export default {
  props: ["URL"],
  data: () => ({
    url: null,
    fileLink: null,
  }),

  methods: {
    selectfile(event) {
      if (event.target.files) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        // this.ImageUploadFunction(event.target.files[0]);
        this.ImageUploadFunction();
        reader.onload = (e) => {
          this.url = e.target.result;
        };
      }
    },
    ImageUploadFunction() {
      var formData = new FormData();
      var imagefile = document.querySelector("#file-input");
      formData.append("file", imagefile.files[0]);
      axios
        .post("/uploadImageFile", formData)
        .then(async (res) => {
          this.fileLink = res.data.results.fileLink;

          this.setImageFunction();
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    setImageFunction() {
      axios
        .patch("usersProfile", { profile_url: this.fileLink })
        .then(async (res) => {
          console.log(res);
          this.$store.state.profile.isImgUpdated = "Yes";
        })
        .catch((err) => {
          console.log(err);
        });
      this.$store.state.profile.isImgUpdated = "No";
    },
  },
  created() {
    this.url = this.URL;
    axios.defaults.baseURL = URL.BACKEND_BASEURL;
  },
};
</script>

<style scoped>
.img_upload {
  position: relative;
  width: 11.5rem;
  height: 11rem;
  border: none;
  border-radius: 5.625rem;
  margin: auto;
}
.input-wrap {
  position: relative;
  float: right;
  width: 32px;
  height: 32px;
  background: #386983;
  color: #fff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  z-index: 1 !important;
}
.avatar {
  width: 208px;
  height: 208px;
  margin: 0;
  border-radius: 50% !important;
  opacity: 1 !important;
  color: #000000;
  top: 50%;
  left: 50%;
  position: absolute;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  cursor: auto;
}
.input-class {
  top: 50%;
  left: 50%;
  position: absolute;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 1 !important;
  opacity: 0;
}
.icon {
  opacity: 1;
  top: 50%;
  left: 50%;
  position: absolute;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 1 !important;
}
</style>
