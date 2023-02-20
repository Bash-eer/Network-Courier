<template>
  <div class="custom-modal-height">
    <div class="scollable-body">
      <div>
        <div class="formgrid grid">
          <div class="field col-12 md:col-6">
            <h5 class="required dialog-label-text">Date & Time</h5>
            <div clas="flex">
              <div class="whiteDiv calendarDiv">
                <Calendar
                  :showTime="true"
                  :showSeconds="true"
                  dateFormat="d MM yy"
                  class="contactsCalendar"
                  v-model="updateStatusFormData.date_time"
                  :showIcon="true"
                  style="width: 100%"
                  :class="{
                    'p-invalid':
                      v$.updateStatusFormData.date_time.$invalid && submitted,
                    'inputfield w-full dialog-dropdown-text ': true,
                  }"
                  :monthNavigator="true"
                  :yearNavigator="true"
                  yearRange="1950:2050"
                />
              </div>
            </div>
          </div>
          <div class="field col-12 md:col-6">
            <h5 class="required dialog-label-text">Status Name</h5>
            <Dropdown
              v-model="updateStatusFormData.status"
              :value="updateStatusFormData.status"
              :options="statusList"
              optionLabel="name"
              optionValue="name"
              :filter="true"
              :class="{
                'p-invalid':
                  v$.updateStatusFormData.status.$invalid && submitted,
                'inputfield w-full dialog-dropdown-text ': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-12">
            <h5 class="required dialog-label-text">Received By</h5>
            <TextField
              v-model="updateStatusFormData.recived_by"
              @blur="updateStatusFormData.recived_by"
              :classes="{
                'p-invalid':
                  v$.updateStatusFormData.recived_by.$invalid && submitted,
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-12">
            <h5 class="required dialog-label-text">Remarks</h5>
            <Textarea
              v-model="updateStatusFormData.remarks"
              :autoResize="true"
              rows="3"
              cols="30"
              placeholder="Enter your remarks here"
              :class="{
                'p-invalid':
                  v$.updateStatusFormData.remarks.$invalid && submitted,
                'inputfield w-full dialog-field-text ': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-12">
            <DragAndDropUpload
              :state="liveJobStatusUploadAttachment"
              type="liveJobStatusAttachment"
              storePath="liveJobStatus"
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
          :loading="isUpdateStatusCreation"
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
import Dropdown from "primevue/dropdown";
import Textarea from "primevue/textarea";

export default {
  name: "UpdateStatusOnLiveJobStatus",
  props: ["dialogData"],
  components: {
    Dropdown,
    Textarea,
  },
  data() {
    return {
      v$: useVuelidate(),
      submitted: false,
      isUpdateStatusCreation: false,
      updateStatusFormDataId: null,
      updateStatusFormData: {
        status: "",
        remarks: "",
        recived_by: "",
        date_time: "",
        attachments: [],
      },
      liveJobStatusUploadAttachment: " ",
    };
  },
  validations() {
    return {
      updateStatusFormData: {
        status: { required },
        remarks: { required },
        recived_by: { required },
        date_time: { required },
      },
    };
  },
  methods: {
    ...mapActions({
      updateJobStatusData: "liveJobStatus/updateLiveJobStatusData",
      fetchUpdateStatusData: "liveJobStatus/loadStatusListOfUpdateStatus",
      isUpdateStatusDialog: "liveJobStatus/showUpdateStatusDialog",
    }),
    closeDialog() {
      const dialogData = {
        displayDialog: false,
        formData: {},
      };
      this.isUpdateStatusDialog(dialogData);
    },
    submitData() {
      // set all fields to touched
      this.submitted = true;
      if (this.v$.$invalid) {
        return;
      }
      this.isUpdateStatusCreation = true;

      this.updateStatusOfLiveJobStatus();
    },
    async updateStatusOfLiveJobStatus() {
      try {
        this.updateStatusFormData.attachments = this.statusAttachmentsArray;
        let data = {
          jobStatusData: this.updateStatusFormData,
          id: this.statusData.id,
        };
        let response = await this.updateJobStatusData(data);
        if (response && response.status === 200) {
          let info = "Status updated successfully";
          this.commonToast("success", "Success", info);
        } else {
          let info = response.data.message || "Failed to update the status";
          this.commonToast("error", "Error", info);
        }
        this.isUpdateStatusCreation = false;
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    loadInitialData() {
      if (Object.keys(this.statusData).length != 0) {
        this.updateStatusFormData = {
          ...this.statusData,
        };
        this.updateStatusFormDataId = this.statusData.id;
      } else {
        this.updateStatusFormDataId = null;
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
  },
  computed: {
    ...mapGetters({
      statusList: "liveJobStatus/getStatusList",
      statusData: "liveJobStatus/getUpdateStatusData",
      statusAttachmentsArray: "liveJobStatus/getStatusAttachmentsData",
    }),
  },
  created() {
    this.$store.state.commonStore.attachmentsTag = "liveJobStatusAttachment";
    if (Object.keys(this.statusAttachmentsArray).length != 0) {
      this.liveJobStatusUploadAttachment =
        this.statusAttachmentsArray.attachments || {};
      this.$store.state.liveJobStatus.liveJobStatusAttachmentsFiles =
        this.statusAttachmentsArray.attachments;
    }
    this.fetchUpdateStatusData();
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
  height: 300px;
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
  height: 280px;
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
