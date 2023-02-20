<template>
  <main>
    <div id="app" class="flex flex-row align-items-center" @drop.prevent>
      <!--for only one file-->
      <div v-if="filesToUpload?.mimeType">
        <!-- <div v-for="(file, index) in filesToUpload" :key="index"> -->
        <div
          class="
            item-wrap
            flex flex-row
            justify-content-between
            align-items-center
            mx-4
          "
        >
          <img
            v-if="filesToUpload?.mimeType == 'image/png'"
            src="/images/drag-drop-img.png"
            alt=""
          />
          <img
            v-else-if="filesToUpload?.mimeType == 'application/pdf'"
            src="/images/drag-drop-pdf.png"
            alt=""
          />
          <img
            v-else-if="
              filesToUpload?.mimeType ==
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            "
            src="../../../../../../src/assets/word.png"
            alt=""
          />
          <img
            v-else-if="
              filesToUpload?.mimeType ==
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
              filesToUpload?.mimeType == 'application/vnd.ms-excel'
            "
            src="/images/drag-drop-excel.png"
            alt=""
          />
          <img v-else src="/images/drag-drop-doc.png" alt="" />

          <!-- <a :href="filesToUpload.fileLink" target="_blank"> -->
          <div
            class="flex flex-column align-items-start pl-2 w-100 flex-nowrap"
          >
            <div class="drag-title flex-nowrap">
              {{ this.filesToUpload.fileName }}
            </div>
            <div class="drag-sub-title flex-nowrap">
              ({{ (this.filesToUpload.size / 1048576).toFixed(2) }}mb)
            </div>
          </div>
          <!-- </a> -->

          <button
            @click="removeFile(index)"
            title="Remove"
            class="drag-button ml-1"
          >
            <i class="pi pi-times"></i>
          </button>
        </div>
        <!-- </div> -->
      </div>
      <!-- Design UI -->
      <div
        class="container"
        @dragleave="fileDragOut"
        @dragover="fileDragIn"
        @drop="handleFileDrop"
        v-bind:style="{ 'background-color': color }"
      >
        <!-- Add your files here: accept=".pdf" , .doc -->
        <br />
        <div
          class="
            file-wrapper
            flex flex-row
            w-full
            justify-content-center
            align-items-center
            px-2
          "
        >
          <input
            :key="renderKey"
            type="file"
            ref="file"
            name="file-input"
            id="file-input"
            multiple="True"
            class="px-4"
            @input="handleFileInput"
          />

          <!--Design-->
          <div
            class="
              flex flex-row
              background
              align-items-center
              justify-content-center
            "
          >
            <div class="color-fff font-size-10 ml-2">
              <img src="/images/ExcelTransparent.png" width="10" height="10" />
            </div>
            <div class="flex flex-column mx-2 color-fff">
              <span class="drag-text">Upload</span>
              <!-- <span class="drag-subText">Docx</span> -->
            </div>
          </div>
        </div>
        <!-- progress bar -->
        <progress
          v-if="toggleProgress == true"
          max="100"
          :value.prop="uploadPercentage"
        ></progress>
        <br />
        <!-- here come length : {{files.length}} -->
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
const { URL } = require("../../../../../../config/const");
export default {
  props: ["state", "type", "storePath", "default"],
  data() {
    return {
      filesState: [],
      files: [],
      files_to_upload: {},
      filesToUpload: {},
      fileLink: null,
      fileURL: {},
      uploadPercentage: 0,
      toggleProgress: false,
      originalFilesSource: [],
      filesLoop: [],
      fileData: [],
      renderKey: 10,
    };
  },
  watch: {
    fileData: function () {
      this.$emit("fileData", this.fileData);
    },
  },
  methods: {
    handleFileDrop(e) {
      let droppedFiles = e.dataTransfer.files;
      if (!droppedFiles) return;
      [...droppedFiles].forEach((f, index) => {
        this.getFileURL(f, index);
        this.getFileData(f, index);
      });
    },
    handleFileInput(e) {
      this.$store.state.sales.quotationFileUpload = false;
      let files = e.target.files;
      if (!files) return;
      [...files].forEach((f, index) => {
        this.getFileURL(f, index);
        this.getFileData(f, index);
      });
    },
    removeFile(fileKey) {
      this.$store.state.sales.quotationFileUpload = false;
      this.files_to_upload = {};
      this.filesToUpload = {};
      this.fileData = [];
      this.$store.state.Masscollection.massCollectionAttachmentsFiles = {};
      this.renderKey++;
      //this.getFileURL(fileKey);
      if (this.state == " ") {
        this.files_to_upload = {};
        this.filesToUpload = {};
        this.fileData = [];
      }
      if (this.state != " ") {
        this.deleteFiles(this.originalFilesSource, fileKey);
      }
    },
    getBasePath(type) {
      let path;
      switch (type) {
        case "massCollectionAttachments":
          path = "massCollectionAttachments";
          break;
      }
      return path;
    },
    getDeletedIndicesArray(type) {
      let deletedIndicesArray;
      switch (type) {
        case "massCollectionAttachments":
          deletedIndicesArray = "deletedMassCollectionAttachmentsFiles";
          break;
      }
      return deletedIndicesArray;
    },
    deleteFiles(source, f) {
      for (let fl in source) {
        if (fl == f) {
          //storing deleted indices in an array
          let deletedIndicesArray = this.getDeletedIndicesArray(
            this.$store.state.commonStore.attachmentsTag
          );
          this.$store.state[this.storePath][deletedIndicesArray].push(
            source[fl].id
          );
        }
      }
    },
    //eslint-disable-next-line no-unused-vars
    async getFileData(f, index) {
      var formData = new FormData();
      formData.append("file", f);
      axios
        .post(
          "/read/excelfile",
          formData,

          {
            onUploadProgress: function (progressEvent) {
              this.toggleProgress = true;
              this.uploadPercentage = parseInt(
                Math.round((progressEvent.loaded / progressEvent.total) * 100)
              );
            }.bind(this),
          }
        )
        .then(async (res) => {
          this.fileData = res.data.results;
          for (let i in this.fileData) {
            this.fileData[i]["s_no"] = ++i;
          }
          this.$emit("fileData", this.fileData);
        })
        //eslint-disable-next-line no-unused-vars
        .catch(function (error) {
          alert("couldn't upload file");
        });
    },
    async getFileURL(f, index) {
      var formData = new FormData();
      // var inputFile = document.querySelector("#file-input");
      formData.append("file", f);
      //uploading new files to the data-base using the axios POST method
      axios
        .post(
          "/uploadFile",
          // "/read/excelfile",
          formData,

          {
            onUploadProgress: function (progressEvent) {
              this.toggleProgress = true;
              this.uploadPercentage = parseInt(
                Math.round((progressEvent.loaded / progressEvent.total) * 100)
              );
            }.bind(this),
          }
        )
        .then(async (res) => {
          this.fileURL = res.data.results.url;
          this.files_to_upload = res.data.results.url;
          this.filesToUpload = res.data.results;
          this.$store.state.Masscollection.massCollectionAttachmentsFiles =
            this.filesToUpload;
          this.$store.state.Masscollection.attachURL = this.fileURL;
          this.uploadPercentage = 0;
          this.toggleProgress = false;
          this.$emit("update:files", this.filesToUpload);
        })
        //eslint-disable-next-line no-unused-vars
        .catch(function (error) {
          alert("couldn't upload file");
        });
    },
  },
  activated() {},
  updated() {
    this.$store.state.sales.FilesToUpload = this.files_to_upload;
    // if (this.state == " ") {
    let path = this.getBasePath(this.$store.state.commonStore.attachmentsTag);
    let pathName = this.getBasePath(this.type);
    if (path == "massCollectionAttachments") {
      this.$store.state.Masscollection.attachURL = this.fileURL;
      this.$store.state.Masscollection.massCollectionAttachmentsFiles =
        this.filesToUpload;
    }
  },
  created() {
    if (this.state != " ") {
      this.files = [];
      this.files_to_upload = {};
      this.filesToUpload = {};
      this.files = JSON.parse(JSON.stringify(this.state));
      this.files_to_upload = JSON.parse(JSON.stringify(this.state));
      this.filesToUpload = JSON.parse(JSON.stringify(this.state));
      this.filesState = [];
      this.filesState = this.state;
      this.originalFilesSource = JSON.parse(JSON.stringify(this.state));
      this.filesLoop = JSON.parse(JSON.stringify(this.state));
    } else {
      this.filesToUpload = {};
    }
    axios.defaults.baseURL = URL.BACKEND_BASEURL;
  },
  async mounted() {
    if (this.default != {}) {
      this.filesToUpload = this.default;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.drag-text {
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #fff;
  cursor: pointer;
}
.drag-subText {
  font-weight: 300;
  font-size: 12px;
  line-height: 15px;
  color: #212121;
  opacity: 0.7;
  cursor: pointer;
}
.cursor {
  cursor: pointer;
}
.roundPin {
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 80%;
  background: #e0eaf9;
}
.file-wrapper {
  // height: 116px;
  color: #4e5868;
  // background: #edf1f7;
  font-size: 14px;
  font-weight: bold;
  text-align: start;
  // width: 300px;
  vertical-align: middle;
  display: table-cell;
  position: relative;
  overflow: hidden;
}

.file-wrapper input {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  opacity: 0;
  filter: alpha(opacity=0);
  font-size: 300px;
  height: 200px;
}
.item-wrap {
  height: 80px;
  margin-right: 10px;
  margin-left: 10px;
  position: relative;
}
.item-wrap-text {
  font-family: $font-family-primary;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0.03em;
  text-align: left;
}
.drag-button {
  background: transparent;
  border: none;
  position: absolute;
  top: 0;
  left: 100%;
}
.drag-title {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0.03em;
  text-align: left;
  flex-wrap: nowrap;
}
.drag-second-title {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0.03em;
  text-align: left;
}
.drag-sub-title {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: 0.03em;
  text-align: left;
}
.item-second-wrap {
  height: max-content;
  border: 1px solid #cbcdd6;
  box-sizing: border-box;
  border-radius: 4px;
  margin-bottom: 15px;
}
.wrap-insider {
  width: 160px;
  height: 58px;
  background: #edf1f7;
  border-radius: 4px;
}
img {
  width: 40px;
  height: 40px;
}
progress {
  width: 200px;
  margin: auto;
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
}
.background {
  background: #357dea;
  padding: 5px;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 2px;
}
// .position {
//   position: absolute;
// }
</style>
