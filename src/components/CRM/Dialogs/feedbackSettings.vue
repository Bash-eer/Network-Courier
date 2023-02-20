<template>
  <div class="custom-modal-height">
    <div class="scollable-body">
      <div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-12">
            <h5 class="required dialog-label-text">Feedback Type</h5>
            <TextField
              v-model="feedbackSettingsFormData.feedback_type"
              @blur="v$.feedbackSettingsFormData.feedback_type.$model"
              :classes="{
                'p-invalid':
                  v$.feedbackSettingsFormData.feedback_type.$invalid &&
                  submitted,
              }"
            />
          </div>
          <div class="field col-12 md:col-12 p-fluid">
            <h5 class="required dialog-label-text">Add Sub-Type</h5>
            <Chips
              v-model="feedbackSettingsFormData.sub_types"
              @blur="v$.feedbackSettingsFormData.sub_types.$model"
              separator=","
              :class="{
                'p-invalid':
                  v$.feedbackSettingsFormData.sub_types.$invalid && submitted,
                'inputfield w-full dialog-field-text': true,
              }"
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
        <Buttons
          label="Save"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
          :loading="isFeedbackSettingCreation"
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
import Chips from "primevue/chips";

export default {
  name: "feedbackSettings",
  components: {
    Chips,
  },
  data() {
    return {
      v$: useVuelidate(),
      submitted: false,
      isFeedbackSettingCreation: false,
      feedbackFormDataId: null,
      feedbackSettingsFormData: {
        feedback_type: "",
        sub_types: null,
      },
    };
  },
  validations() {
    return {
      feedbackSettingsFormData: {
        feedback_type: { required },
        sub_types: { required },
      },
    };
  },
  methods: {
    ...mapActions({
      createFeedbackSettingsData: "CrmSettings/createFeedbackSettings",
      updateFeedbackSettingsData: "CrmSettings/updateFeedbackSettings",
      showFeedbackSettingsDialog: "CrmSettings/showFeedbackSettingsDialog",
      fetchFeedbackData: "CrmSettings/loadFeedbackSettingsData",
    }),
    closeDialog() {
      const dialogData = {
        displayDialog: false,
        formData: {},
      };
      this.showFeedbackSettingsDialog(dialogData);
    },
    submitData() {
      // set all fields to touched
      this.submitted = true;
      if (this.v$.$invalid) {
        return;
      }
      this.isFeedbackSettingCreation = true;

      if (!this.feedbackFormDataId) {
        this.addFeedbackSettingsData();
      } else {
        this.editFeedbackSettingsData();
      }
    },
    async addFeedbackSettingsData() {
      try {
        const data = this.feedbackSettingsFormData;
        let response = await this.createFeedbackSettingsData(data);
        if (response && response.status === 200) {
          let info = "Feedback settings created successfully";
          this.commonToast("success", "Success", info);
          this.fetchFeedbackData();
        } else {
          let info =
            response.data.message || "Failed to create the feedback settings";
          this.commonToast("error", "Error", info);
        }
        this.isFeedbackSettingCreation = false;
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    async editFeedbackSettingsData() {
      try {
        let data = {
          feedbackSettingData: this.feedbackSettingsFormData,
          id: this.feedbackFormDataId,
        };
        let response = await this.updateFeedbackSettingsData(data);
        if (response && response.status === 200) {
          let info = "Feedback settings updated successfully";
          this.commonToast("success", "Success", info);
          this.fetchFeedbackData();
        } else {
          let info =
            response.data.message || "Failed to update the feedback settings";
          this.commonToast("error", "Error", info);
        }
        this.isFeedbackSettingCreation = false;
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    loadInitialData() {
      if (Object.keys(this.feedbackSettingsData).length != 0) {
        this.feedbackSettingsFormData = {
          ...this.feedbackSettingsData,
          sub_types: this.feedbackSubTypes,
        };
        this.feedbackFormDataId = this.feedbackSettingsData.id;
      } else {
        this.feedbackFormDataId = null;
      }
    },
    commonToast(severity, summary, message) {
      this.isFeedbackSettingCreation = false;
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
      feedbackSettingsData: "CrmSettings/getEditFeedbackSettingsData",
      feedbackSubTypes: "CrmSettings/getSubTypes",
    }),
  },
  created() {
    this.loadInitialData();
  },
  watch: {
    feedbackSubTypes: async function () {
      if (Object.keys(this.feedbackSettingsData).length != 0) {
        this.feedbackSettingsFormData.sub_types = this.feedbackSubTypes;
      }
    },
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
  height: 50vh;
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
  height: 42vh;
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
