<template>
  <div :key="key" class="flex flex-column">
    <div class="img_upload">
      <div class="input-wrap">
        <input
          class="input-class"
          id="image-file-input"
          type="file"
          @change="selectfile($event)"
          accept="image/*"
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

    <div class="our-error p-error mismatch mb-2">
      {{ mismatchError }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
const { URL } = require("../../../config/const");
export default {
  props: ["URL", "state","key"],
  data: () => ({
    url: null,
    fileLink: null,
    mismatchError: "",
  }),

  methods: {
    selectfile(event) {
      console.log(event, "event");
      if (event.target.files) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        this.ImageUploadFunction(event.target.files[0]);
        reader.onload = (e) => {
          this.url = e.target.result;
        };
      }
    },
    ImageUploadFunction(file) {
      let vm = this;
      var formData = new FormData();
      formData.append("file", file);
      axios
        .post("/uploadImageFile", formData)
        .then(async (res) => {
          this.fileLink = res.data.results.fileLink;
          this.$store.state.fleets.globalImageUploadURL =
            res.data.results.fileLink;
          vm.mismatchError = "";
          this.$emit("file", res.data?.results);
        })
        .catch(function (error) {
          console.log(error);
          vm.mismatchError = "Please add an valid image";
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
  async created() {
    console.log(this.state);
    this.url = this.URL;
    if (this.state != "" && this.state != null) {
      this.url = this.state;

      console.log(this.url, "url");
    }
    axios.defaults.baseURL = URL.BACKEND_BASEURL;
  },
  // watch: {
  //   state(value) {
  //     console.log(value);
  //     if (this.state != "" && this.state != null) {
  //       this.url = this.state;
  //     }
  //   },
  // },
};
</script>

<style scoped>
.img_upload {
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px dashed #dae040;
  border-radius: 0;
}
.input-wrap {
  text-align: center;
  z-index: 1 !important;
  width: 100px;
  height: 100px;
  background: linear-gradient(
    180deg,
    rgba(218, 224, 64, 0.05) 0%,
    rgba(109, 180, 0, 0.05) 100%
  );
}
.avatar {
  opacity: 1 !important;
  width: 98px;
  height: 98px;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
}
.input-class {
  width: 100px;
  height: 100px;
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
