<template>
  <div class="formgrid grid mt-3 col-12 flex align-items-center">
    <div class="field col-12 md:col-4">
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
    <div class="field col-12 md:col-4">
      <h5 class="required color-7a7a7a font-size-14 bold-500 text-left">
        Mailjet Template ID
      </h5>
      <TextField
        class="color-212121 font-size-14 font-bold mr-3"
        label="email_template_id"
        v-model="details.email_template_id"
        :classes="{
          'p-invalid': v$.details.email_template_id.$invalid && submitted,
          'inputfield w-full color-212121 font-bold ': true,
        }"
      />
    </div>

    <div class="flex align-items-center mt-2 field col-12 md:col-4">
      <div
        class="
          flex
          align-items-center
          flex-row
          py-2
          color-4e5968
          font-size-12
          bold-600
        "
      >
        <span class="required mr-1">Template ID </span> :

        <span class="ml-2">
          <TextField
            class="color-212121 font-size-14 font-bold tempID w-full"
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
          v-on:childToParent="closeDialog"
        />
        <Buttons
          label="Save"
          button_class="dialog-button-text bg-357dea"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    v$: useVuelidate(),
    name: null,
    submitted: false,
    details: {
      template_name: "",
      email_template_id: "",
      template_id: "",
    },
  }),
  validations() {
    return {
      details: {
        template_name: { required },
        email_template_id: { required },
        template_id: { required },
      },
    };
  },
  computed: {
    ...mapGetters({
      emailTemplateEditData: "templateSettings/emailTemplateEditData",
    }),
  },
  methods: {
    closeDialog() {
      this.$store.state["templateSettings"].displayDialog = false;
    },

    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.details["template_module_id"] = this.$route.params.id;
        this.details["file_name"] = "";
        this.details["url"] = "";
        this.details["mime_type"] = "";
        this.details["size"] = "";
        if (this.emailTemplateEditData.id) {
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
          "/settings/templates/modules/template/" +
          this.emailTemplateEditData.id,
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
  created() {
    if (this.emailTemplateEditData) {
      this.details.template_name = this.emailTemplateEditData.template_name;
      this.details.email_template_id =
        this.emailTemplateEditData.email_template_id;
      this.details.template_id = this.emailTemplateEditData.template_id;
    }
  },
  unmounted() {
    this.$store.state.templateSettings.emailTemplateEditData = {};
  },
};
</script>

<style scoped>
::v-deep .tempID > .p-inputtext {
  color: #7469f2 !important;
  background: #e3e1fc !important;
  border-radius: 4px;
  font-size: 0.875rem;
  padding: 0.4375rem 0.4375rem;
}
</style>
