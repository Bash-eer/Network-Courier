<template>
  <main>
    <div id="app" @dragover.prevent @drop.prevent>
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
          "
        >
          <input
            type="file"
            ref="file"
            name="file-input"
            id="file-input"
            multiple="True"
            @change="handleFileInput"
          />

          <!--Design-->
          <div class="flex flex-row">
            <img class="cursor" src="/images/pin.png" alt="" />
            <div class="flex flex-column m-1 ml-2">
              <span class="drag-text">Drag and Drop to upload</span>
              <span class="drag-text">Or Click here to upload</span>
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
      <!--for only one file-->
      <div v-if="filesToUpload.length == 1" :key="renderKey">
        <div v-for="(file, index) in filesToUpload" :key="index">
          <div
            class="
              item-wrap
              flex flex-row
              justify-content-between
              align-items-center
            "
          >
            <img
              v-if="file.mime_type == 'image/png'"
              src="/images/drag-drop-img.png"
              alt=""
            />
            <img
              v-else-if="file.mime_type == 'application/pdf'"
              src="/images/drag-drop-pdf.png"
              alt=""
            />
            <img
              v-else-if="
                file.type ==
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
              "
              src="/images/drag-drop-excel.png"
              alt=""
            />
            <img v-else src="/images/drag-drop-doc.png" alt="" />

            <a :href="file.url" target="_blank">
              <div class="flex flex-column align-items-start">
                <div class="drag-title">{{ file.file_name }}</div>
                <div class="drag-sub-title">
                  ({{ (file.size / 1048576).toFixed(2) }} mb)
                </div>
              </div></a
            >

            <button
              @click="removeFile(index)"
              title="Remove"
              class="drag-button"
            >
              <i class="pi pi-times"></i>
            </button>
          </div>
        </div>
      </div>

      <!--for more than one file-->
      <div v-if="filesToUpload.length > 1" class="item-second-wrap grid">
        <div
          class="col-5 md:col-3"
          v-for="(file, index) in filesToUpload"
          :key="index"
        >
          <div
            class="
              wrap-insider
              flex flex-row
              align-items-center
              justify-content-center
            "
          >
            <img
              v-if="file.mime_type == 'image/png'"
              src="/images/drag-drop-img.png"
              alt=""
            />
            <img
              v-else-if="file.mime_type == 'application/pdf'"
              src="/images/drag-drop-pdf.png"
              alt=""
            />
            <img
              v-else-if="
                file.mime_type ==
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
              "
              src="/images/drag-drop-excel.png"
              alt=""
            />
            <img v-else src="/images/drag-drop-doc.png" alt="" />
            <a :href="file.url" target="_blank">
              <div class="flex flex-column align-items-start m-2">
                <div class="drag-second-title">
                  {{ file.file_name.substring(0, 8) }}
                  <!-- {{ file.name }} -->
                </div>
                <div class="drag-sub-title">
                  ({{ (file.size / 1000000).toFixed(2) }} mb)
                </div>
              </div></a
            >

            <button
              @click="removeFile(index)"
              title="Remove"
              class="drag-button"
            >
              <i class="pi pi-times"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
const { URL } = require("../../../config/const");
export default {
  props: ["state", "type", "storePath", "default"],
  data() {
    return {
      filesState: [],
      files: [],
      files_to_upload: [],
      filesToUpload: [],
      fileLink: null,
      uploadPercentage: 0,
      toggleProgress: false,
      originalFilesSource: [],
      filesLoop: [],
      renderKey: 10,
    };
  },
  methods: {
    handleFileDrop(e) {
      let droppedFiles = e.dataTransfer.files;
      if (!droppedFiles) return;
      [...droppedFiles].forEach((f, index) => {
        this.getFileURL(f, index);
      });
    },
    handleFileInput(e) {
      this.$store.state.sales.quotationFileUpload = false;
      let files = e.target.files;
      if (!files) return;
      [...files].forEach((f, index) => {
        this.getFileURL(f, index);
      });
    },
    removeFile(fileKey) {
      this.$store.state.sales.quotationFileUpload = false;
      this.files_to_upload.splice(fileKey, 1);
      this.filesToUpload.splice(fileKey, 1);
      //this.getFileURL(fileKey);
      if (this.state == " ") {
        this.files_to_upload.splice(fileKey, 1);
        this.filesToUpload.splice(fileKey, 1);
      }
      if (this.state != " ") {
        this.deleteFiles(this.originalFilesSource, fileKey);
      }
      this.renderKey++;
    },
    getBasePath(type) {
      let path;
      switch (type) {
        //fleets
        case "InsuranceDetails":
          path = "insurance";
          break;
        case "RoadTaxDetails":
          path = "roadTax";
          break;
        case "CoeDetails":
          path = "coe";
          break;
        case "expenditureSummons":
          path = "summons";
          break;
        case "expenditureClaims":
          path = "claim";
          break;
        case "expenditureInsurance":
          path = "insurance";
          break;
        case "expenditureRoadTax":
          path = "roadTax";
          break;
        case "expenditureAccidents":
          path = "accident";
          break;
        case "expenditureCoe":
          path = "coe";
          break;
        case "vehicleMaintenance":
          path = "maintenance";
          break;
        case "vehicleInspection":
          path = "inspection";
          break;
        //contacts
        case "contactAppointments":
          path = "contactAppointments";
          break;
        case "contactDonations":
          path = "contactDonations";
          break;
        case "contactPersonalInfo":
          path = "contactPersonalInfo";
          break;
        case "salesCommonFollowUp":
          path = "salesCommonFollowUp";
          break;

        case "rapidoContractQuotation":
          path = "rapidoContractQuotation";
          break;

        case "expressContractBikeProjectJobsQuotation":
          path = "expressContractBikeProjectJobsQuotation";
          break;
        case "salesCommonAttachments":
          path = "salesCommonAttachments";
          break;
        //SalesExpress
        case "salesExpressContractBikeFSRAttachments":
          path = "salesExpressContractBikeFSRAttachments";
          break;
        case "InternationalContractQuotation":
          path = "InternationalContractQuotation";
          break;
        case "salesExpressContractVanFSRAttachments":
          path = "salesExpressContractVanFSRAttachments";
          break;
        case "BulkAdjustmentAttachments":
          path = "BulkAdjustmentAttachments";
          break;

        case "BulkAdjustmentEditAttachments":
          path = "BulkAdjustmentEditAttachments";
          break;

        case "contractApprovalAttachments":
          path = "contractApprovalAttachments";
          break;
        case "salesExpressContractFSRAttachments":
          path = "salesExpressContractFSRAttachments";
          break;
        //CRM
        case "CrmCollectFileAttachment":
          path = "CrmCollectFileAttachment";
          break;
        case "CrmReturnFileAttachment":
          path = "CrmReturnFileAttachment";
          break;
        case "CrmExchangeFileAttachment":
          path = "CrmExchangeFileAttachment";
          break;
        case "CrmDeliveryFileAttachment":
          path = "CrmDeliveryFileAttachment";
          break;
        case "CrmEndorseFileAttachment":
          path = "CrmEndorseFileAttachment";
          break;
        case "CrmCustomerSuspenstionFileAttachment":
          path = "CrmCustomerSuspenstionFileAttachment";
          break;
        case "CrmFeedbackAttachment":
          path = "CrmFeedbackAttachment";
          break;
        case "liveJobStatusAttachment":
          path = "liveJobStatusAttachment";
          break;
      }
      return path;
    },
    getDeletedIndicesArray(type) {
      let deletedIndicesArray;
      switch (type) {
        //fleets
        case "InsuranceDetails":
          deletedIndicesArray = "deletedVehicleDetailsInsuranceFiles";
          break;
        case "RoadTaxDetails":
          deletedIndicesArray = "deletedVehicleDetailsRoadTaxFiles";
          break;
        case "CoeDetails":
          deletedIndicesArray = "deletedVehicleDetailsCoeFiles";
          break;
        case "vehicleMaintenance":
          deletedIndicesArray = "deletedVehicleMaintenanceFiles";
          break;
        case "vehicleInspection":
          deletedIndicesArray = "deletedVehicleInspectionFiles";
          break;
        case "expenditureInsurance":
          deletedIndicesArray = "deletedexpenditureInsuranceFiles";
          break;
        case "expenditureSummons":
          deletedIndicesArray = "deletedexpenditureSummonsFiles";
          break;
        case "expenditureClaims":
          deletedIndicesArray = "deletedexpenditureClaimsFiles";
          break;
        case "expenditureRoadTax":
          deletedIndicesArray = "deletedexpenditureRoadTaxFiles";
          break;
        case "expenditureAccidents":
          deletedIndicesArray = "deletedexpenditureAccidentsFiles";
          break;
        case "expenditureCoe":
          deletedIndicesArray = "deletedexpenditureCoeFiles";
          break;
        //contacts
        case "contactAppointments":
          deletedIndicesArray = "deletedcontactAppointmentsFiles";
          break;
        case "contactDonations":
          deletedIndicesArray = "deletedcontactDonationsFiles";
          break;
        case "contactPersonalInfo":
          deletedIndicesArray = "deletedcontactPersonalInfoFiles";
          break;
        case "salesCommonFollowUp":
          deletedIndicesArray = "deletedsalesCommonFollowUpFiles";
          break;
        case "salesCommonAttachments":
          deletedIndicesArray = "deletedsalesCommonAttachmentsFiles";
          break;
        case "rapidoContractQuotation":
          deletedIndicesArray = "deletedrapidoContractQuotationFiles";
          break;

        case "expressContractBikeProjectJobsQuotation":
          deletedIndicesArray =
            "deletedexpressContractBikeProjectJobsQuotationFiles";
          break;
        case "contractApprovalAttachments":
          deletedIndicesArray = "deletedContractApprovalAttachmentFiles";
          break;
        case "salesExpressContractFSRAttachments":
          deletedIndicesArray = "deletedFSRAttachmentsFiles";
          break;
        //
        case "InternationalContractQuotation":
          deletedIndicesArray = "deletedInternationalContractQuotationFiles";
          break;

        case "salesExpressContractBikeFSRAttachments":
          deletedIndicesArray = "deletedBikeFSRAttachmentsFiles";
          break;

        case "salesExpressContractVanFSRAttachments":
          deletedIndicesArray = "deletedvanFSRAttachmentsFiles";
          break;
        case "BulkAdjustmentAttachments":
          deletedIndicesArray = "deletedBulkAdjustmentAttachmentsFiles";
          break;

        case "BulkAdjustmentEditAttachments":
          deletedIndicesArray = "deletedBulkAdjustmentEditAttachmentsFiles";
          break;
        //CRM
        case "CrmCollectFileAttachment":
          deletedIndicesArray = "deletedCrmCommonAttachmentsFiles";
          break;
        case "CrmReturnFileAttachment":
          deletedIndicesArray = "deletedCrmReturnAttachmentsFiles";
          break;
        case "CrmExchangeFileAttachment":
          deletedIndicesArray = "deletedCrmExchangeAttachmentsFiles";
          break;
        case "CrmDeliveryFileAttachment":
          deletedIndicesArray = "deletedCrmDeliveryAttachmentsFiles";
          break;
        case "CrmEndorseFileAttachment":
          deletedIndicesArray = "deletedCrmCommonAttachmentsFiles";
          break;

        case "CrmCustomerSuspenstionFileAttachment":
          deletedIndicesArray = "CrmCustomerSuspenstionFileAttachment";
          break;
        case "CrmFeedbackAttachment":
          deletedIndicesArray = "CrmFeedbackAttachment";
          break;
        case "liveJobStatusAttachment":
          deletedIndicesArray = "liveJobStatusAttachment";
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
    async getFileURL(f, index) {
      var formData = new FormData();
      // var inputFile = document.querySelector("#file-input");
      formData.append("file", f);
      //uploading new files to the data-base using the axios POST method
      axios
        .post(
          "/uploadFile",
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
          this.files_to_upload.push(res.data.results.fileLink);
          this.filesToUpload.push({
            url: res.data.results.fileLink,
            mime_type: res.data.results.mimeType,
            size: res.data.results.size,
            file_name: res.data.results.fileName,
          });

          for (let fl in this.filesToUpload) {
            if (typeof this.filesToUpload[fl] == "string") {
              this.filesToUpload.splice(fl, 1);
            }
          }
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
    if (path == "insurance") {
      if (this.$store.state.commonStore.attachmentsTag == "InsuranceDetails") {
        this.$store.state.fleets.vehicleDetailsInsuranceFiles =
          this.filesToUpload;
      }
      if (
        this.$store.state.commonStore.attachmentsTag == "expenditureInsurance"
      ) {
        this.$store.state.fleets.expenditureInsuranceFiles = this.filesToUpload;
      }
    }
    if (path == "roadTax") {
      if (this.$store.state.commonStore.attachmentsTag == "RoadTaxDetails") {
        this.$store.state.fleets.vehicleDetailsRoadTaxFiles =
          this.filesToUpload;
      }
      if (
        this.$store.state.commonStore.attachmentsTag == "expenditureRoadTax"
      ) {
        this.$store.state.fleets.expenditureRoadTaxFiles = this.filesToUpload;
      }
    }
    if (path == "coe") {
      if (this.$store.state.commonStore.attachmentsTag == "CoeDetails") {
        this.$store.state.fleets.vehicleDetailsCoeFiles = this.filesToUpload;
      }
      if (this.$store.state.commonStore.attachmentsTag == "expenditureCoe") {
        this.$store.state.fleets.expenditureCoeFiles = this.filesToUpload;
      }
    }
    if (path == "summons") {
      this.$store.state.fleets.expenditureSummonsFiles = this.filesToUpload;
    }
    if (path == "accident") {
      this.$store.state.fleets.expenditureAccidentsFiles = this.filesToUpload;
    }
    if (path == "claim") {
      this.$store.state.fleets.expenditureClaimsFiles = this.filesToUpload;
    }
    if (path == "maintenance") {
      this.$store.state.fleets.vehicleMaintenanceFiles = this.filesToUpload;
    }
    if (path == "inspection") {
      this.$store.state.fleets.vehicleInspectionFiles = this.filesToUpload;
    }
    if (path == "contactAppointments") {
      this.$store.state.contacts.contactAppointmentsFiles = this.filesToUpload;
    }
    if (path == "contactDonations") {
      this.$store.state.contacts.contactDonationsFiles = this.filesToUpload;
    }
    if (path == "contactPersonalInfo") {
      this.$store.state.contacts.contactPersonalInfoFiles = this.filesToUpload;
    }
    //sales
    if (path == "salesCommonFollowUp") {
      this.$store.state.salesCommon.salesCommonFollowUpFiles =
        this.filesToUpload;
    }
    if (path == "salesCommonAttachments") {
      this.$store.state.salesCommon.salesCommonAttachmentsFiles =
        this.filesToUpload;
    }
    if (path == "rapidoContractQuotation") {
      this.$store.state.salesRapidoContract.rapidoContractQuotationFiles =
        this.filesToUpload;
    }
    if (path == "rapidoContractQuotation") {
      this.$store.state.salesRapidoContract.rapidoContractQuotationFiles =
        this.filesToUpload;
    }

    if (path == "expressContractBikeProjectJobsQuotation") {
      this.$store.state.salesExpressContractBikeProjectJobs.expressContractBikeProjectJobsQuotationFiles =
        this.filesToUpload;
    }
    if (path == "contractApprovalAttachments") {
      this.$store.state.salesApproval.contractApprovalAttachmentFiles =
        this.filesToUpload;
    }

    if (path == "salesExpressContractFSRAttachments") {
      this.$store.state.salesExpressContractFSR.FSRAttachmentsFiles =
        this.filesToUpload;
    }
    if (path == "InternationalContractQuotation") {
      this.$store.state.salesInternationalContract.InternationalContractQuotationFiles =
        this.filesToUpload;
    }
    // }
    if (path == "salesExpressContractBikeFSRAttachments") {
      this.$store.state.salesExpressContractBikeFSR.bikeFSRAttachmentsFiles =
        this.filesToUpload;
    }

    if (path == "salesExpressContractVanFSRAttachments") {
      this.$store.state.salesExpressContractVanFSR.vanFSRAttachmentsFiles =
        this.filesToUpload;
    }
    if (path == "BulkAdjustmentAttachments") {
      this.$store.state.bulkAdjustment.BulkAdjustmentAttachmentsFiles =
        this.filesToUpload;
    }
    if (path == "BulkAdjustmentEditAttachments") {
      this.$store.state.bulkAdjustment.BulkAdjustmentEditAttachmentFiles =
        this.filesToUpload;
    }
    //CRM
    if (pathName == "CrmCollectFileAttachment") {
      this.$store.state.CustomerLaunchStore.crmCommonAttachmentsFiles =
        this.filesToUpload;
    }
    if (pathName == "CrmReturnFileAttachment") {
      this.$store.state.CustomerLaunchStore.crmReturnAttachmentsFiles =
        this.filesToUpload;
    }
    if (pathName == "CrmExchangeFileAttachment") {
      this.$store.state.CustomerLaunchStore.crmExchangeAttachmentsFiles =
        this.filesToUpload;
    }
    if (pathName == "CrmDeliveryFileAttachment") {
      this.$store.state.CustomerLaunchStore.crmDeliveryAttachmentsFiles =
        this.filesToUpload;
    }
    if (pathName == "CrmEndorseFileAttachment") {
      this.$store.state.CustomerLaunchStore.crmCommonAttachmentsFiles =
        this.filesToUpload;
    }
    if (pathName == "CrmCustomerSuspenstionFileAttachment") {
      this.$store.state.CustomerLaunchStore.crmCommonAttachmentsFiles =
        this.filesToUpload;
    }
    if (pathName == "CrmFeedbackAttachment") {
      this.$store.state.CrmFeedback.crmFeedbackAttachmentsFiles =
        this.filesToUpload;
    }
    if (pathName == "liveJobStatusAttachment") {
      this.$store.state.liveJobStatus.liveJobStatusAttachmentsFiles =
        this.filesToUpload;
    }
  },
  created() {
    if (this.state != " ") {
      this.files = [];
      this.files_to_upload = [];
      this.filesToUpload = [];
      this.files = JSON.parse(JSON.stringify(this.state));
      this.files_to_upload = JSON.parse(JSON.stringify(this.state));
      this.filesToUpload = JSON.parse(JSON.stringify(this.state));
      this.filesState = [];
      this.filesState = this.state;
      this.originalFilesSource = JSON.parse(JSON.stringify(this.state));
      this.filesLoop = JSON.parse(JSON.stringify(this.state));
    } else {
      this.filesToUpload = [];
    }
    axios.defaults.baseURL = URL.BACKEND_BASEURL;
  },
  async mounted() {
    if (this.default) {
      this.filesToUpload = this.default;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.drag-text {
  font-family: $font-family-primary;
  font-size: 14px;
  font-style: normal;
  font-weight: 800;
  line-height: 24px;
  letter-spacing: 0.03em;
  text-align: center;
  color: #4e5868;
  cursor: pointer;
}
.cursor {
  cursor: pointer;
}
.file-wrapper {
  height: 116px;
  color: #4e5868;
  background: #edf1f7;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  width: 300px;
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
  margin-right: 50px;
  margin-left: 50px;
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
}
.drag-title {
  font-family: $font-family-primary;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0.03em;
  text-align: left;
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
</style>
