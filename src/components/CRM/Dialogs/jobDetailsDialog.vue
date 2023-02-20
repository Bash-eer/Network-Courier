<template>
  <div class="custom-modal-height">
    <div class="flex">
      <img
        class="title-image mr-2"
        src="../../../assets/Express.png"
        alt="img"
        width="40"
      />
      <span class="track-status-code">{{
        overAllJobDetails.job_ref_no || "-"
      }}</span>
    </div>
    <div class="accordian-container mt-3">
      <Accordion :activeIndex="0">
        <AccordionTab header="Tracking Details">
          <div class="table-container">
            <DataTable
              responsiveLayout="scroll"
              :class="tableClass"
              :rowClass="rowClass"
              selectionMode="single"
              :dataKey="'collection'"
              :value="overAllJobDetails.status_updates"
            >
              <!--These are the fields not needed now-->
              <!-- <Column field="code" header="">
                <template #body="slotProps">
                  <span class="table-text">{{
                    slotProps?.data.status || "-"
                  }}</span>
                </template>
              </Column>
              <Column field="name" header="">
                <template #body> - </template>
              </Column> -->
              <Column field="category" header="" style="min-width: 12rem">
                <template #body="slotProps">
                  <span class="table-text">{{
                    dateWithTimeFormater(slotProps?.data.status_date_time)
                  }}</span
                  ><br />
                  <span class="table-location-text mt-1">
                    <img
                      class="mr-1"
                      src="../../../assets/location.png"
                      alt="img"
                      width="10"
                      height="14"
                    />{{ slotProps?.data.location }}
                  </span>
                </template>
              </Column>
              <Column field="quantity" header="">
                <template #body> - </template>
              </Column>
              <Column field="quantity" header="">
                <template #body="slotProps">
                  <span class="table-text">{{
                    slotProps?.data.status_name
                  }}</span>
                </template>
              </Column>
              <template #empty> No data found </template>
            </DataTable>
          </div>
        </AccordionTab>
      </Accordion>
    </div>
    <div class="accordian-container mt-3">
      <Accordion :activeIndex="0">
        <AccordionTab header="POD">
          <div class="upload-container">
            <div class="signature-upload_icon">
              <input
                style="display: none"
                type="file"
                accept="image/*"
                @change="onSignatureSelect"
                ref="signaturePic"
              />
              <div
                @click="$refs.signaturePic.click()"
                class="upload_icon image-block"
              >
                <div class="image">
                  <div class="upload_icon p-3" v-if="!signatureImageFile">
                    <i class="pi pi-upload" />
                  </div>
                </div>
              </div>
              <div
                class="
                  upload_icon
                  m-3
                  text-center
                  preview-image-container
                  position-relative
                "
                v-if="signatureImageFile"
              >
                <img
                  class="preview-signature-img"
                  :src="getURLImage(signatureImageFile)"
                />
                <span
                  class="remove-item cursor-pointer"
                  @click="removeSignatureImage()"
                  ><i class="pi pi-times"></i
                ></span>
              </div>
            </div>
            <div class="pod-upload_icon flex flex-row flex-wrap">
              <input
                style="display: none"
                type="file"
                accept="image/*"
                multiple="multiple"
                @change="onPODSelect"
                ref="podPic"
              />
              <div
                @click="$refs.podPic.click()"
                class="upload_icon image-block"
              >
                <div class="image">
                  <div class="upload_icon p-3">
                    <i class="pi pi-camera" />
                  </div>
                </div>
              </div>

              <div
                class="image-icon"
                v-for="(item, index) of podFiles"
                :key="index"
              >
                <div class="image">
                  <div class="upload_icon p-3 position-relative">
                    <img class="preview-img" :src="getURLImage(item)" />
                    <span
                      class="remove-item cursor-pointer"
                      @click="removePODImage(index)"
                      ><i class="pi pi-times"></i
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionTab>
      </Accordion>
    </div>
    <div class="remarks-container">
      <span class="flex flex-row my-4 remarks-title">Remarks</span>
      <span class="nc-remarks-title">NC Remarks</span>
      <p class="remarks-info">{{ overAllJobDetails.nc_remarks }}</p>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import axios from "axios";

export default {
  name: "JobDetailsDialog",
  components: {
    Accordion,
    AccordionTab,
    DataTable,
    Column,
  },
  data() {
    return {
      tabs: [
        {
          title: "Tracking Details",
          content: "",
        },
      ],
      podFiles: [],
      signatureFilesToUpload: [],
      podFilesToUpload: [],
      signatureImageFile: "",
      loading: false,
    };
  },
  methods: {
    ...mapActions({
      uploadImageOfSignature:
        "customerLaunchBookingHistory/uploadSignatureImage",
      uploadImageOfPOD: "customerLaunchBookingHistory/uploadPODImage",
      deleteImageOfPOD: "customerLaunchBookingHistory/deletePODImage",
      deleteSignatureOfPOD: "customerLaunchBookingHistory/deleteSignatureImage",
    }),
    dateWithTimeFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM YYYY, hh:mm A");
        return formattedDate;
      }
    },
    onSignatureSelect(event) {
      let files = event.target.files || [];
      this.signatureFilesToUpload = [];
      if (!files) return;
      [...files].forEach(async (f, index) => {
        await this.getFileURL(f, "signature");
        if (
          files.length > 0 &&
          files.length == this.signatureFilesToUpload.length
        ) {
          this.uploadSignatureFile(this.signatureFilesToUpload);
        }
      });
    },
    onPODSelect(event) {
      let files = event.target.files || [];
      this.podFilesToUpload = [];
      if (!files) return;
      [...files].forEach(async (f, index) => {
        await this.getFileURL(f, "pod");
        if (files.length > 0 && files.length == this.podFilesToUpload.length) {
          this.uploadPODFile(this.podFilesToUpload);
        }
      });
    },
    getURLImage(image) {
      if (image?.url) {
        return image?.url;
      }
      return URL.createObjectURL(image);
    },
    async uploadPODFile(imageData) {
      const podId = this.overAllJobDetails.id;
      const podData = {
        id: podId,
        attachments: {
          attachments: imageData,
        },
      };
      const podFileResponse = await this.uploadImageOfPOD(podData);

      if (podFileResponse && podFileResponse.status === 200) {
        for (let data of this.podFilesToUpload) {
          this.podFiles.push(data);
        }
        let info = `POD image is uploaded successfully!`;
        this.commonToast("success", "Success", info);
      } else {
        let info =
          podFileResponse.data.message ||
          `There is an error to upload the POD image`;
        this.commonToast("error", "Error", info);
      }
    },
    async uploadSignatureFile(imageData) {
      const signatureId = this.overAllJobDetails.id;

      let signatureData = {
        id: signatureId,
        formData: imageData[0],
      };

      const signatureFileResponse = await this.uploadImageOfSignature(
        signatureData
      );

      if (signatureFileResponse && signatureFileResponse.status === 200) {
        this.signatureImageFile = this.signatureFilesToUpload[0];
        let info = `Signature image is uploaded successfully!`;
        this.commonToast("success", "Success", info);
      } else {
        let info =
          signatureFileResponse.data.message ||
          `There is an error to upload the signature image`;
        this.commonToast("error", "Error", info);
      }
    },
    async deletePODFile(index) {
      let removeItem = this.podFiles[index];
      let podData = removeItem.id;
      const podFileResponse = await this.deleteImageOfPOD(podData);

      if (podFileResponse && podFileResponse.status === 200) {
        this.podFiles.splice(index, 1);
        this.loading = false;
        let info = `POD image is deleted successfully!`;
        this.commonToast("success", "Success", info);
      } else {
        this.loading = false;
        let info =
          podFileResponse.data.message ||
          `There is an error to delete the pod image`;
        this.commonToast("error", "Error", info);
      }
    },
    async deleteSignatureFile() {
      let podData = this.overAllJobDetails.id;
      const signatureFileResponse = await this.deleteSignatureOfPOD(podData);

      if (signatureFileResponse && signatureFileResponse.status === 200) {
        this.signatureImageFile = "";
        this.loading = false;
        let info = `Signature image is deleted successfully!`;
        this.commonToast("success", "Success", info);
      } else {
        this.loading = false;
        let info =
          signatureFileResponse.data.message ||
          `There is an error to delete the signature image`;
        this.commonToast("error", "Error", info);
      }
    },
    removePODImage(index) {
      const removeItem = this.podFiles[index];
      this.loading = true;
      if (removeItem?.id) {
        this.deletePODFile(index);
      } else {
        this.podFiles.splice(index, 1);
        this.loading = false;
      }
    },
    removeSignatureImage() {
      console.log(this.signatureImageFile);
      if (this.signatureImageFile?.name) {
        this.signatureImageFile = "";
      } else {
        this.deleteSignatureFile();
      }
    },
    async getFileURL(f, type) {
      var formData = new FormData();
      // var inputFile = document.querySelector("#file-input");
      formData.append("file", f);
      //uploading new files to the data-base using the axios POST method
      return (
        axios
          .post("/uploadFile", formData)
          .then(async (res) => {
            let files_to_upload = res.data.results.fileLink;

            if (type == "pod") {
              this.podFilesToUpload.push({
                url: files_to_upload,
                mime_type: res.data.results.mimeType,
                size: res.data.results.size,
                file_name: res.data.results.fileName,
              });

              for (let fl in this.podFilesToUpload) {
                if (typeof this.podFilesToUpload[fl] == "string") {
                  this.podFilesToUpload.splice(fl, 1);
                }
              }
            } else {
              this.signatureFilesToUpload.push({
                url: files_to_upload,
                mime_type: res.data.results.mimeType,
                size: res.data.results.size,
                file_name: res.data.results.fileName,
              });
              for (let fl in this.signatureFilesToUpload) {
                if (typeof this.signatureFilesToUpload[fl] == "string") {
                  this.signatureFilesToUpload.splice(fl, 1);
                }
              }
            }
            return;
          })
          //eslint-disable-next-line no-unused-vars
          .catch(function (error) {
            alert("couldn't upload file");
          })
      );
    },
    commonToast(severity, summary, message) {
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: message,
        life: 3000,
      });
    },
  },
  computed: {
    ...mapGetters({
      overAllJobDetails: "customerLaunchBookingHistory/getOverAllJobDetails",
    }),
  },
  watch: {
    overAllJobDetails: function (newValue, oldValue) {
      this.podFiles = [];
      this.signatureImageFile = "";
      this.signatureFilesToUpload = [];
      this.podFilesToUpload = [];
      for (let data of newValue.attachments) {
        if (data.file_type == "POD") {
          this.podFiles.push(data);
        } else if (data.file_type == "SIGNATURE") {
          this.signatureImageFile = data;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.custom-modal-height {
  height: 500px;
}

.track-status-code {
  color: #ebbd46;
  font-weight: 600;
  font-size: 17.9045px;
}

::v-deep .p-accordion-toggle-icon.pi-chevron-down:before,
::v-deep .p-accordion-toggle-icon.pi-chevron-right:before {
  position: absolute;
  right: 20px;
  top: 18px;
  color: #4e5968;
}
::v-deep .p-accordion-header-text {
  color: #4e5968;
  font-weight: 700;
  font-size: 14px;
}
::v-deep .p-accordion-content {
  height: 323px;
  padding: 0px !important;
  overflow: auto;
}
::v-deep .p-dialog-content {
  overflow-y: auto;
  overflow-x: hidden !important;
}

.remarks-title {
  font-weight: 700;
  font-size: 11.4685px;
  color: #4e5968;
}

.nc-remarks-title {
  font-weight: 700;
  font-size: 12px;
  color: #212121;
}

.remarks-info {
  font-weight: 400;
  font-size: 11.5791px;
  color: #212121;
}

.table-container {
  overflow: auto;
  height: 322px;
}

.table-location-text {
  font-weight: 600;
  font-size: 10px;
  color: #a3a3a5;
  font-family: $font-family-third;
  letter-spacing: 0.1em;
}

.table-text {
  color: #343434;
  font-weight: 600;
  font-size: 12px;
  font-family: $font-family-third;
}
.upload_icon > .pi {
  font-size: 3rem !important;
  padding: 1.8rem;
  color: #c4c4c4;
  border-radius: 5px;
  background: #f4f4f4;
  cursor: pointer;
}

.signature-upload_icon .upload_icon > .pi {
  width: 100%;
  text-align: center;
  font-size: 1rem !important;
  background: #ffffff;
  border: 0.907282px solid #ced1d5;
}
.signature-upload_icon .upload_icon > .preview-img {
  width: auto;
  text-align: center;
  font-size: 1rem !important;
  background: #ffffff;
  border: none !important;
}

.pod-upload_icon .upload_icon > .pi {
  background: #fbfbfb;
  border: 2px dashed #cdcdcd;
}

.preview-img {
  width: 110px;
  height: 110px;
  border-radius: 10px;
}
.preview-signature-img {
  height: 70px;
}
.preview-image-container {
  background: #ffffff;
  border: 0.907282px solid #ced1d5;
  border-radius: 5px;
  cursor: pointer;
}
.remove-item {
  position: absolute;
  top: 13px;
  right: 15px;
  background: white;
  border-radius: 10px;
  height: 20px;
  width: 20px;
}
.pi.pi-times {
  margin: 3px 3px;
  font-size: 14px;
}
</style>
