<template>
  <div class="custom-modal-height">
    <div class="scollable-body">
      <div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-6">
            <Buttons
              label="Print Document"
              button_class="dialog-button-text"
              v-on:childToParent="printDocument"
              :loading="isDownloading"
            />
          </div>
          <div class="field col-12 md:col-6">
            <Buttons
              label="Download Document"
              button_class="dialog-button-text"
              v-on:childToParent="downloadDocument"
              :loading="isPreviewing"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="custom-footer">
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <Buttons
          label="Cancel"
          v-on:childToParent="closeDialog"
          class="p-button-outlined mr-1 dialog-button-text"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";
import { reactive } from "vue";
import { errhandler } from "@/services/httpClient";

export default {
  name: "PrintPreview",
  props: ["dialogData", "title"],
  components: {},
  data() {
    return {
      v$: useVuelidate(),
      submitted: false,
      isUpdateStatusCreation: false,
      isDownloading: false,
      isPreviewing: false,
    };
  },
  validations() {
    return {
      updateStatusFormData: {
        status: { required },
      },
    };
  },
  methods: {
    ...mapActions({
      isPrintLabelDialog: "liveJobStatus/showPrintPreviewDialog",
      fetchPrintLabel: "liveJobStatus/loadPrintLabel",
      fetchPrintPreview: "liveJobStatus/loadPrintPreview",
      fetchInstructionSlipPreview: "liveJobStatus/loadInstructionSlipPreview",
      fetchInstructionSlipLabel: "liveJobStatus/loadInstructionSlipLabel",
      acknowledgeSlipPrint: "liveJobStatus/acknowledgeSlipPrint",
      acknowledgeSlipPreview: "liveJobStatus/acknowledgeSlipPreview",
      jobSheetPrint: "liveJobStatus/jobSheetPrint",
      jobSheetPreview: "liveJobStatus/jobSheetPreview",
    }),
    closeDialog() {
      const dialogData = {
        displayDialog: false,
        formData: {},
      };
      this.isPrintLabelDialog(dialogData);
    },
    async printDocument() {
      if (this.title == "Print Label") {
        this.printLabelDocument();
      } else if (this.title == "Instruction Slip") {
        this.printInstructionSlipDocument();
      } else if (this.title == "Acknowledge Slip") {
        this.isDownloading = true;
        let response = await this.acknowledgeSlipPrint();
        if (response && response.status === 200) {
          this.isDownloading = false;
          let info = response.data.results;
          this.commonToast("success", "Success", info);
        } else {
          this.isDownloading = false;
          let info =
            response.data.message ||
            "There was an error in creating a Acknowledge Slip preview, try again!";
          this.commonToast("error", "Error", info);
        }
      } else if (this.title == "Job Sheet") {
        this.isDownloading = true;
        let response = await this.jobSheetPrint();
        if (response && response.status === 200) {
          this.isDownloading = false;
          let info = response.data.results;
          this.commonToast("success", "Success", info);
        } else {
          this.isDownloading = false;
          let info =
            response.data.message ||
            "There was an error in creating a Job Sheet preview, try again!";
          this.commonToast("error", "Error", info);
        }
      }
    },
    async downloadDocument() {
      if (this.title == "Print Label") {
        this.previewPrintLabelDocument();
      } else if (this.title == "Instruction Slip") {
        this.previewInstructionSlipDocument();
      } else if (this.title == "Acknowledge Slip") {
        this.isPreviewing = true;
        let response = await this.acknowledgeSlipPreview();
        if (response && response.status === 200) {
          this.isPreviewing = false;
          this.createDownloadDocument(response, "Acknowledge Slip");
        } else {
          this.isPreviewing = false;
          let info =
            response.data.message ||
            "There was an error in creating a Acknowledge slip label, try again!";
          this.commonToast("error", "Error", info);
        }
      } else if (this.title == "Job Sheet") {
        this.isPreviewing = true;
        let response = await this.jobSheetPreview();
        if (response && response.status === 200) {
          this.isPreviewing = false;
          this.createDownloadDocument(response, "Job Sheet");
        } else {
          this.isPreviewing = false;
          let info =
            response.data.message ||
            "There was an error in creating a Job Sheet label, try again!";
          this.commonToast("error", "Error", info);
        }
      }
    },
    async previewPrintLabelDocument() {
      this.isPreviewing = true;
      try {
        let data = {
          id: this.documentData.id,
        };
        let response = await this.fetchPrintPreview(data);
        if (response && response.status === 200) {
          this.createDownloadDocument(response, "Print Label");
          this.isPreviewing = false;
        } else {
          let info =
            response.data.message ||
            "There was an error in creating a print label, try again!";
          this.commonToast("error", "Error", info);
          this.isPreviewing = false;
        }
        this.isUpdateStatusCreation = false;
      } catch (err) {
        this.isPreviewing = false;
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    async printLabelDocument() {
      this.isDownloading = true;
      try {
        let data = {
          id: this.documentData.id,
        };
        let response = await this.fetchPrintLabel(data);
        if (response && response.status === 200) {
          let info = response.data.results;
          this.commonToast("success", "Success", info);
          this.isDownloading = false;
        } else {
          this.isDownloading = false;
          let info =
            response.data.message ||
            "There was an error in creating a print preview, try again!";
          this.commonToast("error", "Error", info);
        }
        this.isUpdateStatusCreation = false;
      } catch (err) {
        this.isDownloading = false;
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    async previewInstructionSlipDocument() {
      this.isPreviewing = true;
      try {
        let data = {
          id: this.documentData.id,
        };
        let response = await this.fetchInstructionSlipPreview(data);
        if (response && response.status === 200) {
          this.createDownloadDocument(response, "Instruction Slip");
          this.isPreviewing = false;
        } else {
          let info =
            response.data.message ||
            "There was an error in creating a instruction slip label, try again!";
          this.commonToast("error", "Error", info);
          this.isPreviewing = false;
        }
        this.isUpdateStatusCreation = false;
      } catch (err) {
        this.isPreviewing = false;
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
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
    async printInstructionSlipDocument() {
      this.isDownloading = true;
      try {
        let data = {
          id: this.documentData.id,
        };
        let response = await this.fetchInstructionSlipLabel(data);
        if (response && response.status === 200) {
          let info = response.data.results;
          this.commonToast("success", "Success", info);
          this.isDownloading = false;
        } else {
          this.isDownloading = false;
          let info =
            response.data.message ||
            "There was an error in creating a instruction slip preview, try again!";
          this.commonToast("error", "Error", info);
        }
        this.isUpdateStatusCreation = false;
      } catch (err) {
        this.isDownloading = false;
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    commonToast(severity, summary, message) {
      this.isUpdateStatusCreation = false;
      this.$toast.add({
        severity: severity,
        summary: summary,
        detail: message,
        life: 3000,
      });
    },
    loadInitialData() {},
  },
  computed: {
    ...mapGetters({
      statusList: "liveJobStatus/getStatusList",
      documentData: "liveJobStatus/getDocumentPreviewData",
    }),
  },
  created() {
    this.loadInitialData();
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";

.required {
  color: $color-7a7a7a !important;
}

.required:after {
  content: "*";
  color: red;
  margin-left: 10px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

::v-deep .p-inputtext {
  color: $color-212121;
  font-size: 14px;
  font-weight: 700;
}
::v-deep .p-button.p-button-outlined,
::v-deep .p-button.dialog-button-text {
  border: 2px solid !important;
  font-weight: 600 !important;
}
.custom-modal-height {
  height: 150px;
}
.custom-footer {
  position: absolute;
  bottom: 0;
  height: 60px;
  margin: 0;
  padding: 0;
  margin-right: 40px;
  right: 0;
}
.scollable-body {
  height: 130px;
  overflow: auto;
}
.sub-title {
  font-weight: 700;
  font-size: 14px;
  color: $color-4e5968;
  font-family: $font-family-third;
}
.field-checkbox {
  color: $color-357dea;
  font-weight: 700;
  font-size: 14px;
  font-family: $font-family-third;
}
::v-deep .p-checkbox .p-checkbox-box {
  width: 18px !important;
  height: 18px !important;
}
</style>
