<template>
  <div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="required dialog-label-text">Remarks</h5>
        <TextAreaField
          :state="details.remarks"
          label="remarks"
          v-model="details.remarks"
          :classes="{
            'p-invalid': v$.details.remarks.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>
    <div>
      <DragAndDropUpload
        :state="salesCommonAttachmentsState"
        type="salesCommonAttachments"
        storePath="salesCommon"
      />
    </div>
    <div
      class="
        flex
        justify-content-between
        w-full
        align-content-center
        py-3
        flex-wrap
      "
    >
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton storePath="salesCommon" label="Cancel" />
        <Buttons
          label="Upload"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import axios from "axios";
const { URL } = require("../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
export default {
  name: "Upload",
  data() {
    return {
      details: {
        uploaded_in: "attachment",
        remarks: "",
        attachment_details: [
          // {
          //   file_name: "test",
          //   url: "test",
          //   mime_type: "test",
          //   size: 3,
          // },
          // {
          //   file_name: "test",
          //   url: "test",
          //   mime_type: "test",
          //   size: 3,
          // },
        ],
      },
      reamrks: "",
      salesCommonAttachmentsState: " ",
      v$: useVuelidate(),
      submitted: false,
      sample: [
        {
          quotation_id: 12,
          // uploaded_in: "attachment",
          uploaded_in: "Quotation",
          remarks: "abc",
          attachment_details: [
            // {
            //   file_name: "test",
            //   url: "test",
            //   mime_type: "test",
            //   size: 3,
            // },
            // {
            //   file_name: "test",
            //   url: "test",
            //   mime_type: "test",
            //   size: 3,
            // },
          ],
        },
      ],
    };
  },
  validations() {
    return {
      details: {
        remarks: { required },
      },
    };
  },
  computed: {
    ...mapGetters({
      commonAttachmentStateData: "salesCommon/commonAttachmentStateData",
    }),
  },
  methods: {
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        if (this.$route.params.type == "contract") {
          this.details.contract_id = this.$route.params.id;
        } else {
          this.details.quotation_id = this.$route.params.id;
        }
        this.details.attachment_details =
          this.$store.state.salesCommon.salesCommonAttachmentsFiles;
        if (this.commonAttachmentStateData.id) {
          this.apiCallHandler(
            "PUT",
            "/sales/" +
              this.$route.params.type +
              "/attachments/" +
              this.commonAttachmentStateData.id,
            "updated"
          );
        } else {
          this.apiCallHandler(
            "POST",
            "/sales/" + this.$route.params.type + "/attachments",
            "added"
          );
        }
        // this.$store.dispatch("salesCommon/POSTPATCHCRUDOPERATION", {
        //   path: "/sales/quotation/attachments",
        //   method: "POST",
        //   id: this.$route.params.id,
        //   data: this.details,
        //   toastData: {
        //     toastSuccessData: {
        //       toastMsg: `The  Attachment has been added successfully!`,
        //       toastSeverity: "info",
        //     },

        //     // toastDuplicateErrorData: {
        //     //   toastMsg: `The Rate card  already exist !`,
        //     //   toastSeverity: "error",
        //     // },
        //     toastCommonErrorData: {
        //       toastMsg:
        //         "There was an error in creating the Followup, try again!",

        //       toastSeverity: "error",
        //     },
        //   },
        //   loadData: "loadAttachmentData",
        // });
      }
    },
    apiCallHandler(method, path, txt) {
      this.$store.dispatch("salesCommon/POSTPATCHCRUDOPERATION", {
        path: path,
        method: method,
        id: this.$route.params.id,
        type: this.$route.params.type,
        data: this.details,
        toastData: {
          toastSuccessData: {
            toastMsg: `The Attachment has been ${txt} successfully!`,
            toastSeverity: "info",
          },

          toastCommonErrorData: {
            toastMsg: "",

            toastSeverity: "error",
          },
        },
        loadData: "loadAttachmentData",
      });
    },
    // handleClick() {
    //   axios.post("/sales/quotation/attachments", {
    //     quotation_id: this.$route.params.id,
    //     remarks: this.reamrks,
    //     uploaded_in: "attachment",
    //     attachment_details: [
    //       {
    //         file_name: "test",
    //         url: "test",
    //         mime_type: "test",
    //         size: 3,
    //       },
    //       {
    //         file_name: "test",
    //         url: "test",
    //         mime_type: "test",
    //         size: 3,
    //       },
    //     ],
    //   });
    // },
  },
  created() {
    this.$store.state.commonStore.attachmentsTag = "salesCommonAttachments";
    if (Object.keys(this.commonAttachmentStateData).length != 0) {
      this.salesCommonAttachmentsState =
        this.commonAttachmentStateData.attachments;

      this.$store.state.salesCommon.salesCommonAttachmentsFiles =
        this.commonAttachmentStateData.attachments;

      for (var state in this.details) {
        this.details[state] = this.commonAttachmentStateData[state];
        // this.salutation =
      }
    }
  },
  unmounted() {
    // this.commonAttachmentStateData = {};
    this.$store.state.salesCommon.commonAttachmentStateData = {};
    this.$store.state.commonStore.attachmentsTag = null;
    this.$store.state.salesCommon.salesCommonAttachmentsFiles = [];
    this.$store.state.salesCommon.deletedsalesCommonAttachmentsFiles = [];
  },
};
</script>

<style lang="scss" scoped></style>
