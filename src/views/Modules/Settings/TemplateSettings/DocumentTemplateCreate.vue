<template>
  <div class="style">
    <h5 class="flex justify-content-start ml-2 mb-5 mt-3">
      <span class="mr-3">
        <i
          class="pi pi-arrow-left cursor-pointer"
          @click="Back('DocumentRowProfile')"
        ></i>
      </span>
      New Template
    </h5>
    <div class="formgrid grid mt-3 col-12 flex align-items-center">
      <div class="field col-12 md:col-3">
        <h5 class="required color-7a7a7a font-size-14 bold-500 text-left">
          Template Name
        </h5>
        <TextField
          class="color-212121 font-size-14 font-bold mr-3"
          label="template_name"
          v-model="details.template_name"
          :classes="{
            'p-invalid': v$.details.template_name.$invalid && submitted,
            'inputfield w-full color-212121 font-bold ': true,
          }"
        />
      </div>

      <div class="flex align-items-center mt-2">
        <div
          class="
            flex
            align-items-center
            flex-row
            px-4
            py-2
            color-4e5968
            font-size-12
            bold-600
          "
        >
          <span class="required mr-1">Template ID </span> :

          <span class="ml-2">
            <TextField
              class="color-212121 font-size-14 font-bold mr-3 tempID"
              label="template_id"
              v-model="details.template_id"
              :classes="{
                'p-invalid': v$.details.template_id.$invalid && submitted,
                'inputfield w-full color-212121 font-bold': true,
              }"
          /></span>
        </div>
      </div>
    </div>
    <div class="color-4e5968 font-size-14 bold-600 text-left ml-3">
      Template Contents
    </div>
    <div class="formgrid grid col-12 md:col-12 flex align-items-center">
      <TemplateDragAndDropUpload
        :state="templateSettingsAttachmentsState"
        type="templateSettingsAttachments"
        storePath="templateSettings"
        :default="defaultTemplate"
      />
    </div>
    <!-- This Code Needed -->
    <!-- <iframe
      src="https://a1office.co/solutions/editor/docx-editor"
      width="100%"
      height="450px"
      frameborder="0"
    ></iframe> -->
    <span v-if="src != ''" :key="renderKey" scrolling="auto">
      <iframe :src="src" width="100%" height="450px" frameborder="0"
        >This is an embedded
        <a target="_blank" href="http://office.com">Microsoft Office</a>
        document, powered by
        <a target="_blank" href="http://office.com/webapps">Office Online</a
        >.</iframe
      >
    </span>
    <!--footer -->
    <div class="formgrid grid pl-2 pr-2">
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
          <Buttons
            label="Cancel"
            class="p-button-outlined mr-1 dialog-button-text color-357dea"
            v-on:childToParent="Back('DocumentRowProfile')"
          />
          <Buttons
            label="Save"
            button_class="dialog-button-text bg-357dea"
            v-on:childToParent="submitData"
          />
        </div>
      </div>
    </div>
  </div>
  <Toasts
    :severity="$store.state['bulkAdjustment'].toastData.severity"
    :summary="$store.state['bulkAdjustment'].toastData.summary"
  />
</template>

<script>
import Toasts from "./Components/Toast.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapGetters } from "vuex";
import TemplateDragAndDropUpload from "./Components/DragAndDropUpload.vue";
export default {
  name: "BulkAdjustmentDialog",
  components: { Toasts, TemplateDragAndDropUpload },
  data: () => ({
    v$: useVuelidate(),
    templateSettingsAttachmentsState: " ",
    defaultTemplate: {},
    value: "12345",
    src: "",
    renderKey: 10,
    docValue: "",
    submitted: false,
    details: {
      template_name: "",
      template_id: "",
    },
  }),
  validations() {
    return {
      details: {
        template_name: { required },
        template_id: { required },
      },
    };
  },
  computed: {
    ...mapGetters({
      templateSettingsAttachmentsStateData:
        "templateSettings/templateSettingsAttachmentsStateData",
      templateEditData: "templateSettings/templateEditData",
    }),
  },
  watch: {
    "$store.state.templateSettings.templateSettingsAttachmentsFiles":
      function () {
        if (
          this.$store.state.templateSettings.templateSettingsAttachmentsFiles
            .url
        ) {
          const url =
            this.$store.state.templateSettings.templateSettingsAttachmentsFiles
              .url;
          this.src = `https://view.officeapps.live.com/op/embed.aspx?src=${url}`;
          this.renderKey++;
        } else {
          this.src = "";
          this.renderKey++;
        }
      },
    "$store.state.templateSettings.templateCreateResponseData": function () {
      if (
        !this.submitted &&
        (this.$store.state.templateSettings?.templateCreateResponseData?.data
          ?.message == "Created successfully" ||
          this.$store.state.templateSettings?.templateCreateResponseData?.data
            ?.results == "Details Updated successfully")
      ) {
        this.Back("DocumentRowProfile");
      }
    },
  },
  methods: {
    Back(path) {
      // this.templateEditData = {};
      this.defaultTemplate = {};
      this.$router.push({
        name: path,
        type: this.$route.params.type,
        module: this.$route.params.module,
        id: this.$route.params.id,
      });
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let attachment =
          this.$store.state.templateSettings?.templateSettingsAttachmentsFiles;
        this.details["template_module_id"] = this.$route.params.id;
        this.details["file_name"] = attachment?.file_name;
        this.details["url"] = attachment?.url;
        this.details["mime_type"] = attachment?.mime_type;
        this.details["size"] = attachment?.size;
        this.details["email_template_id"] = "";

        if (this.templateEditData?.id) {
          this.apiPatchCallHandler();
        } else {
          this.apiCallHandler();
        }
      }
    },
    apiCallHandler() {
      let tempID = this.$route.params.id;
      let res = this.$store.dispatch(
        "templateSettings/POSTPATCHCRUDOPERATION",
        {
          path: "/settings/templates/modules/template",
          loadDiffStore: true,
          data: this.details,
          method: "POST",
          id: tempID,
          loadData: "templateSettings/getAllTemplatesData",
          toastData: {
            toastSuccessData: {
              toastMsg: `The Profile is created successfully!`,
              toastSeverity: "success",
            },
            toastDuplicateErrorData: {
              toastMsg: `Profile already exists !`,
              toastSeverity: "error",
            },
            toastCommonErrorData: {
              toastMsg:
                "There was an error in creating the profile, try again!",

              toastSeverity: "error",
            },
          },
        }
      );
    },
    apiPatchCallHandler() {
      let tempId = this.$route.params.id;
      this.$store.dispatch("templateSettings/POSTPATCHCRUDOPERATION", {
        path:
          "/settings/templates/modules/template/" + this.templateEditData.id,
        data: this.details,
        method: "PATCH",
        loadData: "templateSettings/getAllTemplatesData",
        id: tempId,
        loadDiffStore: true,
        toastData: {
          toastSuccessData: {
            toastMsg: `The template is Edited successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Profile already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in Editing the Template, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
  },
  unmounted() {
    this.$store.state.templateSettings.templateEditData = {};
    this.defaultTemplate = {};
  },
  created() {
    if (this.templateEditData.id) {
      this.details.template_name = this.templateEditData?.template_name;
      this.details.template_id = this.templateEditData?.template_id;

      let attachment = {};
      this.templateEditData?.document.map((list) => {
        attachment["url"] = list.url;
        attachment["file_name"] = list.file_name;
        attachment["mime_type"] = list.mime_type;
        attachment["size"] = list.size;
      });
      this.defaultTemplate = attachment;
      this.$store.state.templateSettings.templateSettingsAttachmentsFiles =
        attachment;
    }
    this.$store.state.commonStore.attachmentsTag =
      "templateSettingsAttachments";
    if (Object.keys(this.templateSettingsAttachmentsStateData).length != 0) {
      this.templateSettingsAttachmentsState =
        this.templateSettingsAttachmentsStateData.attachments;
      this.$store.state.templateSettings.templateSettingsAttachmentsFiles =
        this.templateSettingsAttachmentsStateData.attachments;
    }
    this.renderKey++;
  },
};
</script>

<style scoped>
.style {
  background-color: #ffffff;
  padding: 10px;
}
.p-steps-number {
  color: #ffffff !important;
  font-weight: 400 !important;
  font-size: 14px !important;
}
::v-deep .tempID > .p-inputtext {
  color: #7469f2 !important;
  background: #e3e1fc !important;
  border-radius: 4px;
  font-size: 0.875rem;
  padding: 0.4375rem 0.4375rem;
}
.loading {
  /* Take full size */
  height: 100%;
  width: 100%;

  /* Center */
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>
