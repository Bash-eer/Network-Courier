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
        overAllTrackStatus.collection_slip_no || "-"
      }}</span>
    </div>
    <div
      style="display: inline-block; width: 100%; overflow-y: visible"
      class="mt-5"
    >
      <ul class="timeline timeline-horizontal">
        <li
          class="timeline-item"
          v-for="(event, index) of timeLinerData"
          :key="event.id"
        >
          <div
            class="timeline-badge cursor-pointer p-button-rounded"
            :style="{
              backgroundColor: getTrackStatusColor(event),
            }"
            aria-haspopup="true"
            aria-controls="overlay_menu"
          >
            <i class="pi pi-check-circle"></i>
          </div>

          <div
            class="time-line-border"
            :style="{
              backgroundColor: getTrackStatusColor(event),
            }"
            v-if="timeLinerData.length - 1 > index"
          ></div>
          <div class="timeline-panel">
            <div
              class="timeline-heading time-line-text"
              :style="{
                color: getTrackStatusColor(event),
              }"
            >
              {{ event.job_type }}
            </div>
            <div class="timeline-body">
              <p class="time-line-text">
                {{ timeFormater(event.updatedAt) }}
              </p>
              <p class="time-line-text">
                {{ dateFormater(event.updatedAt) }}
              </p>
            </div>
          </div>
        </li>
      </ul>
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
              :value="overAllTrackStatus.status_updates"
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
    <div class="parcel-document-container mt-3">
      <div class="parcel-document-title">Parcel/Documents Involved</div>
      <div class="parcel-document-inner-container">
        <div class="flex justify-content-between py-3 px-4">
          <div class="flex column-text">Parcels/Documents</div>
          <div class="flex column-text mr-4">Job Status</div>
        </div>
        <div class="parcel-time-line-container">
          <VerticalTimeLine
            :parcelJobs="overAllTrackStatus.jobs"
            :referenceNo="overAllTrackStatus.collection_slip_no"
          ></VerticalTimeLine>
        </div>
      </div>
    </div>
    <div class="flex flex-row-reverse my-2">
      <Button
        class="discord p-0 font-size-14 mt-2"
        aria-label="Discord"
        :loading="isPODReport"
        @click="downloadReport"
      >
        <i class="pi pi-download px-2"></i>
        <span class="px-3">POD Report</span>
      </Button>
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import VerticalTimeLine from "./verticalTimeLine.vue";
import Button from "primevue/button";
import axios from "axios";

export default {
  name: "TrackStatusDialog",
  components: {
    Accordion,
    AccordionTab,
    DataTable,
    Column,
    VerticalTimeLine,
    Button,
  },
  data() {
    return {
      timeLinerData: [
        {
          job_type: "Pickup",
          status: "New",
          updatedAt: "pick_up_date_time",
        },
        {
          job_type: "In-Transit",
          status: "New",
          updatedAt: "in_transit_date_time",
        },
        {
          job_type: "Delivered",
          status: "New",
          updatedAt: "delivered_date_time",
        },
      ],
      tabs: [
        {
          title: "Tracking Details",
          content: "",
        },
      ],
      timeLineOverAllTrackStatus: [],
      isPODReport: false,
      podFiles: [],
      signatureFilesToUpload: [],
      podFilesToUpload: [],
      signatureImageFile: "",
    };
  },
  methods: {
    ...mapActions({
      podDownloadReport: "liveJobStatus/podReportDownload",
      uploadImageOfSignature:
        "customerLaunchBookingHistory/uploadSignatureImage",
      uploadImageOfPOD: "customerLaunchBookingHistory/uploadPODImage",
      deleteImageOfPOD: "customerLaunchBookingHistory/deletePODImage",
      deleteSignatureOfPOD: "customerLaunchBookingHistory/deleteSignatureImage",
    }),
    dateFormater(data) {
      let date = this.overAllTrackStatus.tracking_status?.[data];
      if (date == null) {
        return "";
      } else {
        var formattedDate = moment(date).format("Do MMM, YYYY");
        return formattedDate;
      }
    },
    timeFormater(data) {
      let date = this.overAllTrackStatus.tracking_status?.[data];
      if (date == null) {
        return "";
      } else {
        var formattedDate = moment(date).format("hh:mm A");
        return formattedDate;
      }
    },
    dateWithTimeFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM YYYY, hh:mm A");
        return formattedDate;
      }
    },
    getDateTime(data) {
      let dateTime;
      switch (data.job_type) {
        case "Pickup":
          dateTime = this.overAllTrackStatus.tracking_status?.pick_up_date_time;
          break;
        case "In-Transit":
          dateTime =
            this.overAllTrackStatus.tracking_status?.in_transit_date_time;
          break;
        case "Delivered":
          dateTime =
            this.overAllTrackStatus.tracking_status?.delivered_date_time;
          break;
      }
      return dateTime;
    },
    getTrackStatusColor(data) {
      let trackStatusColor;
      switch (data.job_type) {
        case "Pickup":
          trackStatusColor = this.overAllTrackStatus.tracking_status?.pick_up
            ? "#66C11E"
            : "#c6c9cf";
          break;
        case "In-Transit":
          trackStatusColor = this.overAllTrackStatus.tracking_status?.in_transit
            ? "#66C11E"
            : "#c6c9cf";
          break;
        case "Delivered":
          trackStatusColor = this.overAllTrackStatus.tracking_status?.delivered
            ? "#66C11E"
            : "#c6c9cf";
          break;
      }
      return trackStatusColor;
    },
    async downloadReport() {
      this.isPODReport = true;
      let response = await this.podDownloadReport(this.overAllTrackStatus);
      if (response && response.status === 200) {
        this.isPODReport = false;
        this.createDownloadDocument(response, "POD Report");
      } else {
        this.isPODReport = false;
        let info =
          response.data.message ||
          "There was an error in creating a POD Report, try again!";
        this.commonToast("error", "Error", info);
      }
    },
    createDownloadDocument(response, title) {
      let saveExtention = ".pdf";
      var fileURL = window.URL.createObjectURL(new Blob([response.data]));
      var fileLink = document.createElement("a");
      fileLink.href = fileURL;
      fileLink.setAttribute("download", title + saveExtention);
      document.body.appendChild(fileLink);
      fileLink.click();
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
      if (this.signatureImageFile?.name) {
        this.signatureImageFile = "";
        this.signatureFilesToUpload = [];
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
      overAllTrackStatus: "customerLaunchBookingHistory/getOverAllTrackStatus",
      overAllJobDetails: "customerLaunchBookingHistory/getOverAllJobDetails",
    }),
  },
  created() {},
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
/* Timeline */
.timeline,
.timeline-horizontal {
  list-style: none;
  padding: 20px;
  position: relative;
  align-items: center;
}
.timeline:before {
  top: 40px;
  bottom: 0;
  position: absolute;
  content: " ";
  width: 3px;
  left: 50%;
  margin-left: -1.5px;
}
.timeline .timeline-item {
  margin-bottom: 20px;
  position: relative;
}
.timeline .timeline-item:before,
.timeline .timeline-item:after {
  content: "";
  display: table;
}
.timeline .timeline-item:after {
  clear: both;
}
.timeline .timeline-item .timeline-badge {
  color: #fff;
  width: 30px;
  height: 30px;
  line-height: 25px;
  font-size: 13px;
  text-align: center;
  position: absolute;
  top: 18px;
  left: 50%;
  margin-left: -25px;
  background-color: #7c7c7c;
  border: 3px solid #ffffff;
  z-index: 100;
  border-top-right-radius: 50%;
  border-top-left-radius: 50%;
  border-bottom-right-radius: 50%;
  border-bottom-left-radius: 50%;
}
.timeline .timeline-item .timeline-badge i,
.timeline .timeline-item .timeline-badge .fa,
.timeline .timeline-item .timeline-badge .glyphicon {
  top: 2px;
  left: 0px;
}
.timeline .timeline-item .timeline-badge.primary {
  background-color: #1f9eba;
}
.timeline .timeline-item .timeline-badge.info {
  background-color: #5bc0de;
}
.timeline .timeline-item .timeline-badge.success {
  background-color: #59ba1f;
}
.timeline .timeline-item .timeline-badge.warning {
  background-color: #d1bd10;
}
.timeline .timeline-item .timeline-badge.danger {
  background-color: #ba1f1f;
}
.timeline .timeline-item .timeline-panel .timeline-title {
  margin-top: 0;
  color: inherit;
}
.timeline .timeline-item .timeline-panel .timeline-body > p,
.timeline .timeline-item .timeline-panel .timeline-body > ul {
  margin-bottom: 0;
}
.timeline .timeline-item .timeline-panel .timeline-body > p + p {
  margin-top: 5px;
}
.timeline .timeline-item:last-child:nth-child(even) {
  float: right;
}
.timeline .timeline-item:nth-child(even) .timeline-panel {
  float: right;
  left: 16px;
}
.timeline .timeline-item:nth-child(even) .timeline-panel:before {
  border-left-width: 0;
  border-right-width: 14px;
  left: -14px;
  right: auto;
}
.timeline-horizontal {
  list-style: none;
  position: relative;
  padding: 20px 0px 20px 0px;
  display: inline-block;
}
.timeline-horizontal:before {
  height: 3px;
  top: auto;
  bottom: 18px;
  left: 56px;
  right: 0;
  width: 100%;
  margin-bottom: 20px;
}
.timeline-horizontal .timeline-item {
  display: table-cell;
  height: auto;
  width: 20%;
  min-width: 320px;
  float: none !important;
  padding-left: 0px;
  padding-right: 20px;
  margin: 0 auto;
  vertical-align: bottom;
}
.timeline-horizontal .timeline-item .timeline-panel {
  top: auto;
  bottom: 64px;
  display: inline-block;
  float: none !important;
  left: 0 !important;
  right: 0 !important;
  width: 100%;
  margin-bottom: 20px;
  align-items: center;
  text-align: center;
}
.timeline-horizontal .timeline-item .timeline-panel:before {
  top: auto;
  bottom: -16px;
  left: 28px !important;
  right: auto;
  border-right: 16px solid transparent !important;
  border-top: 16px solid #c0c0c0 !important;
  border-bottom: 0 solid #c0c0c0 !important;
  border-left: 16px solid transparent !important;
}
.timeline-horizontal .timeline-item:before,
.timeline-horizontal .timeline-item:after {
  display: none;
}
.timeline-horizontal .timeline-item .timeline-badge {
  top: auto;
  bottom: 0px;
  left: 43px;
}
.pi-check-circle:before {
  font-size: 12px;
}
.timeline-heading {
  padding-left: 15px;
}
.timeline-body {
  position: absolute;
  bottom: -42px;
  color: #7a7b7c;
}
.timeline-heading {
  position: absolute;
  bottom: 35px;
}
.time-line-border {
  background: #e1eaf9;
  width: 100%;
  margin-left: 30px;
  position: absolute;
  border: 1px solid #e1eaf9 !important;
  top: 9px;
  height: 6px;
}
::-webkit-scrollbar-button {
  width: 50px; //for horizontal scrollbar
  height: 50px; //for vertical scrollbar
}
.time-line-text {
  font-family: $font-family-third;
  font-size: 12px;
  font-weight: 600;
}
.timeline-header-title {
  font-weight: 600;
  font-size: 14px;
  color: $color-212121 !important;
  font-family: $font-family-third;
  display: flex;
  justify-content: space-between;
}
.timeline-badge:active {
  transform: scale(0.98);
  /* Scaling button to 0.98 to its original size */
  box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  /* Lowering the shadow */
}
.title-image {
  height: 21px;
  width: 38px;
}
::v-deep .p-datatable .p-datatable-thead > tr > th {
  background: #ffffff;
  border: 1px solid #ffffff;
}
::v-deep .p-datatable {
  background: #ffffff !important;
}
::v-deep .p-datatable .p-datatable-tbody > tr > td {
  border: 1px solid #ffffff;
}
.table-text {
  color: #343434;
  font-weight: 600;
  font-size: 12px;
  font-family: $font-family-third;
}
::v-deep .p-datatable-thead {
  display: none !important;
}
.table-location-text {
  font-weight: 600;
  font-size: 10px;
  color: #a3a3a5;
  font-family: $font-family-third;
  letter-spacing: 0.1em;
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
.parcel-document-title {
  color: #4e5968;
  font-weight: 700;
  font-size: 14px;
  width: 100%;
  margin: 15px 0px;
  font-family: $font-family-third;
}
.parcel-document-inner-container {
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  height: 183px;
}
.column-text {
  font-weight: 600;
  font-size: 12px;
  color: #7e84a7;
}
.timeline-item:nth-child(3) {
  min-width: 80px !important;

  .timeline-body {
    width: 100px;
  }
}
.parcel-time-line-container {
  overflow: auto;
  height: 130px;
}
.table-container {
  overflow: auto;
  height: 322px;
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
