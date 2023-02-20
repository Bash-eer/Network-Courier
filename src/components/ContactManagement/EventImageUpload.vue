<template>
  <div class="img_upload">
    <div class="input-wrap">
      <input
        class="input-class"
        id="eventImage-file-input"
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
  props: ["URL", "state"],
  data: () => ({
    url: null,
    fileLink: null,
  }),

  methods: {
    selectfile(event) {
      if (event.target.files) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        this.ImageUploadFunction();
        reader.onload = (e) => {
          this.url = e.target.result;
        };
      }
    },
    ImageUploadFunction() {
      var formData = new FormData();
      var imagefile = document.querySelector("#eventImage-file-input");
      formData.append("file", imagefile.files[0]);
      axios
        .post("/uploadImageFile", formData)
        .then(async (res) => {
          this.fileLink = res.data.results.fileLink;
          this.$store.state.contacts.eventImageURL = res.data.results.fileLink;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    this.url = this.URL;
    if (this.state != "") {
      this.url = this.state;
    }
    axios.defaults.baseURL = URL.BACKEND_BASEURL;
  },
};
</script>

<style scoped>
.img_upload {
  position: absolute;
  left: 180px;
  top:242px;
  width: 265px;
  height: 173px;
  border-radius: 0;
  background: #fff;
}
.input-wrap {
  text-align: center;
  z-index: 1 !important;
  width: 265px;
  height: 173px;
}
.avatar {
  opacity: 1 !important;
  width: 265px;
  height: 173px;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
}
.input-class {
  width: 265px;
  height: 173px;
  opacity: 0;
  cursor: pointer;
  z-index: 1000 !important;
  position: absolute;
  top: 0;
  left: 0;
}
.image-upload-container {
  margin-left: 15px;
  margin-top: -35px;
  margin-bottom: 10px;
}
</style>
