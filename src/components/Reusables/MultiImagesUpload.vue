<template>
  <div class="img_upload">
    <div class="input-wrap">
      <input
        class="input-class"
        id="image-file-input"
        type="file"
        multiple="True"
        @change="selectfile($event)"
      />
    </div>
    <label class="click-cursor">
      <img
        :src="'/images/uploadImage.png'"
        class="avatar"
        name="img"
        accept="image/*"
        @click="selectfile($event)"
      />
    </label>
  </div>
  <br />
  <div class="flex flex-row">
    <div class="flex mr-3" v-for="(item, index) of chipImages" :key="index">
      <RemovableImageChips
        :url="item"
        :index="index"
        v-on:childToParent="removeImageChips"
        mainChipClass="inspectionImagesChipsDiv"
        chipImageClass="inspectionChipImages"
        chipImageRemoveClass="inspectionChipImageRemove"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
const { URL } = require("../../../config/const");
export default {
  name: "MultiImagesUpload",
  props: ["type", "state", "storePath"],
  data() {
    return {
      chipImages: [],
    };
  },
  methods: {
    getDeletedIndicesArray(type) {
      let deletedIndicesArray;
      switch (type) {
        case "FleetsInspection":
          deletedIndicesArray = "deletedVehicleInspectionImages";
          break;
      }
      return deletedIndicesArray;
    },
    selectfile(event) {
      if (event.target.files) {
        for (let i in event.target.files) {
          this.uploadMultipleImages(event, i);
        }
      }
    },
    uploadMultipleImages(event, index) {
      var formData = new FormData();
      let file = event.target.files[index];
      if (isNaN(file) && typeof file != "function") {
        if (file.type.match("image.*")) {
          formData.append("file", file);
          //uploading image/s for the first time - axios POST Method
          axios
            .post("/uploadImageFile", formData)
            .then(async (res) => {
              if (res.status == 200) {
                let fileData = res.data.results;
                this.$store.state.fleets.multiImagesUploadedData.push({
                  url: fileData["fileLink"],
                  mime_type: fileData["mimeType"],
                  size: fileData["size"],
                  file_name: fileData["fileName"],
                });
                this.chipImages.push(fileData["fileLink"]);
              }
            })
            //eslint-disable-next-line no-unused-vars
            .catch(function (error) {});
        }
      }
    },
    deleteImages(removeImageChipsArray) {
      // let deleteCount = 0;
      for (let d in this.state) {
        if (this.state[d]["url"] == removeImageChipsArray[1]) {
          // deleteCount++;
          let deletedIndicesArray = this.getDeletedIndicesArray(this.type);
          this.$store.state[this.storePath][deletedIndicesArray].push(
            parseInt(this.state[d]["id"])
          );
          this.chipImages.splice(removeImageChipsArray[0], 1);
        }
      }
      // if (deleteCount == 0) {
      //   this.$store.state.fleets.multiImagesUploadedData.splice(
      //     removeImageChipsArray[0],
      //     1
      //   );
      //   this.chipImages.splice(removeImageChipsArray[0], 1);
      // }
    },
    removeImageChips(removeImageChipsArray) {
      if (this.state == null) {
        this.$store.state.fleets.multiImagesUploadedData.splice(
          removeImageChipsArray[0],
          1
        );
        this.chipImages.splice(removeImageChipsArray[0], 1);
      }
      if (this.state != null) {
        this.deleteImages(removeImageChipsArray);
        this.$store.state.fleets.multiImagesUploadedData.splice(
          removeImageChipsArray[0],
          1
        );
        this.chipImages.splice(removeImageChipsArray[0], 1);
      }
    },
  },
  created() {
    axios.defaults.baseURL = URL.BACKEND_BASEURL;
    if (this.state != null) {
      for (let inspec_imgs in this.state) {
        this.chipImages.push(this.state[inspec_imgs]["url"]);
      }
    }
  },
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
