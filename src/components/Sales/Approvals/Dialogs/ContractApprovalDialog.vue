<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="dialog-label-text">Remarks</h5>
      <TextAreaField
        label="remarks"
        type="text"
        v-model="details.remarks"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div>
    <DragAndDropUpload
      :state="contractApprovalAttachmentsState"
      type="contractApprovalAttachments"
      storePath="salesApproval"
    />
  </div>
  <div class="flex align-self-center justify-content-end">
    <CancelButton label="Cancel" storePath="salesApproval" />
    <Buttons
      label="Approve"
      button_class="dialog-button-text"
      v-on:childToParent="submitData"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ContractApprovalDialog",
  data: () => ({
    contractApprovalAttachmentsState: " ",
    details: {
      uploaded_in: "Contract",
      remarks: "",
      attachment_details: [],
    },
  }),
  computed: {
    ...mapGetters({
      approvalContractStatus: "salesApproval/approvalContractStatus",
      contractApprovalAttachmentData:
        "salesApproval/contractApprovalAttachmentData",
    }),
  },
  methods: {
    submitData() {
      this.details.contract_id = this.approvalContractStatus.contract_id;
      this.details.status = this.approvalContractStatus.status;

      this.details.attachment_details =
        this.$store.state.salesApproval.contractApprovalAttachmentFiles;
      if (this.approvalContractStatus.tableName == "ApprovalsContractTab") {
        this.apiCallHandler(
          "PATCH",
          "/sales/contracts/approval",
          "loadApprovalContracts"
        );
      } else {
        this.apiCallHandler(
          "PATCH",
          "/sales/contracts/terminations/status/" +
            this.approvalContractStatus.termination_id,
          "loadApprovalTerminationTableData"
        );
      }
    },
    apiCallHandler(method, path, txt) {
      this.$store.dispatch("salesApproval/POSTPATCHCRUDOPERATION", {
        path: path,
        method: method,
        data: this.details,
        toastData: {
          toastSuccessData: {
            toastMsg: `Contract Updated Successfully!`,
            toastSeverity: "info",
          },

          toastCommonErrorData: {
            toastMsg: "Issue in updating contract status",

            toastSeverity: "error",
          },
        },
        loadData: txt,
      });
    },
  },
  async created() {
    this.$store.state.commonStore.attachmentsTag =
      "contractApprovalAttachments";
    if (Object.keys(this.contractApprovalAttachmentData).length != 0) {
      //check if edit
      this.contractApprovalAttachmentsState =
        this.contractApprovalAttachmentData.attachments;
      this.$store.state.salesCommon.contractApprovalAttachmentFiles =
        this.contractApprovalAttachmentData.attachments;
    }
  },
  unmounted() {
    this.contractApprovalAttachmentData = {};
    this.$store.state.salesApproval.contractApprovalAttachmentData = {};
    this.$store.state.commonStore.attachmentsTag = null;
    this.$store.state.salesApproval.contractApprovalAttachmentFiles = [];
    this.$store.state.salesApproval.deletedContractApprovalAttachmentFiles = [];
  },
};
</script>

<style></style>
