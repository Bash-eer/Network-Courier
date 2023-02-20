<template>
  <div class="custom-modal-height">
    <div class="scollable-body">
      <div class="formgrid grid mt-4">
        <div class="field col-12 md:col-6">
          <h5 class="required dialog-label-text line-height-28 font-size-14">
            Call Type
          </h5>
          <Dropdown
            v-model="feedbackFollowUpFormData.call_type"
            :value="feedbackFollowUpFormData.call_type"
            :options="callTypesList"
            optionLabel="name"
            optionValue="name"
            :filter="true"
            :class="{
              'p-invalid':
                v$.feedbackFollowUpFormData.call_type.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-6">
          <h5 class="required dialog-label-text line-height-28 font-size-14">
            Call Received By / Caller
          </h5>
          <Dropdown
            v-model="feedbackFollowUpFormData.call_received_by"
            :value="feedbackFollowUpFormData.call_received_by"
            :options="usersList"
            optionLabel="name"
            optionValue="name"
            :filter="true"
            :class="{
              'p-invalid':
                v$.feedbackFollowUpFormData.call_received_by.$invalid &&
                submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-6">
          <h5 class="required dialog-label-text line-height-28 font-size-14">
            Date & Time
          </h5>
          <div clas="flex">
            <div class="whiteDiv calendarDiv">
              <Calendar
                :showTime="true"
                :showSeconds="true"
                dateFormat="d MM yy"
                class="contactsCalendar"
                v-model="feedbackFollowUpFormData.date_and_time"
                :showIcon="true"
                style="width: 100%"
                :class="{
                  'p-invalid':
                    v$.feedbackFollowUpFormData.date_and_time.$invalid &&
                    submitted,
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
          <h5 class="required dialog-label-text line-height-28 font-size-14">
            Customer Contact
          </h5>
          <Dropdown
            v-model="feedbackFollowUpFormData.customer_contact"
            :value="feedbackFollowUpFormData.customer_contact"
            :options="customerContactsList"
            optionLabel="name"
            optionValue="name"
            :filter="true"
            :class="{
              'p-invalid':
                v$.feedbackFollowUpFormData.customer_contact.$invalid &&
                submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-6">
          <h5 class="required dialog-label-text line-height-28 font-size-14">
            Customer Contact No
          </h5>
          <TextField
            label="customer_contact"
            type="number"
            v-model="feedbackFollowUpFormData.customer_contact_no"
            :classes="{
              'p-invalid':
                v$.feedbackFollowUpFormData.customer_contact_no.$invalid &&
                submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid mt-3">
        <div class="field col-12 md:col-12">
          <h5 class="required dialog-label-text line-height-28 font-size-14">
            Remarks
          </h5>
          <TextAreaField
            :state="feedbackFollowUpFormData.remarks"
            label="remarks"
            v-model="feedbackFollowUpFormData.remarks"
            @blur="v$.feedbackFollowUpFormData.remarks.$model;"
            :classes="{
              'p-invalid':
                v$.feedbackFollowUpFormData.remarks.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
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
          :loading="isFeedbackCreation"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";
import { errhandler } from "@/services/httpClient";
import Dropdown from "primevue/dropdown";

export default {
  name: "FollowUpFeedback",
  components: { Dropdown },
  props: ["expandedData"],
  data() {
    return {
      v$: useVuelidate(),
      submitted: false,
      isFeedbackCreation: false,
      feedbackFollowUpFormDataId: null,
      feedbackFollowUpFormData: {
        call_type: "",
        call_received_by: "",
        date_and_time: "",
        customer_contact: "",
        customer_contact_no: "",
        remarks: "",
        call_received_by_id: "",
        customer_contact_id: "",
        feedback_id: "",
        paginationParams: {
          offset: 1,
          limit: 10,
          orderBy: ["createdAt", "ASC"],
        },
      },
      paginationParams: {
        offset: 1,
        limit: 10,
        orderBy: ["createdAt", "ASC"],
      },
    };
  },
  validations() {
    return {
      feedbackFollowUpFormData: {
        call_type: { required },
        call_received_by: { required },
        date_and_time: { required },
        customer_contact: { required },
        customer_contact_no: { required },
        remarks: { required },
      },
    };
  },
  methods: {
    ...mapActions({
      showFeedbackExpansionDialog: "CrmFeedback/showFollowupDialog",
      addFollowUpOnFeedback: "CrmFeedback/createFeedbackFollowUp",
      updateFollowUpOnFeedback: "CrmFeedback/updateFeedbackFollowUp",
      loadUserDetails: "CrmFeedback/getAllUserReceivedByData",
      loadCustomerContactDetails: "CrmFeedback/getAllCustomerContactData",
      loadCallTypesDetails: "CrmFeedback/getAllCallTypes",
      loadSpecificFeedbackData: "CrmFeedback/fetchSpecificFeedbackData",
    }),
    closeDialog() {
      this.showFeedbackExpansionDialog(false);
    },
    getDropdownValue(value, type) {
      switch (type) {
        case "call type":
          this.feedbackFollowUpFormData.call_type = value.name;
          break;
        case "caller":
          this.feedbackFollowUpFormData.call_received_by = value.name;
          this.feedbackFollowUpFormData.call_received_by_id = value.id;
          break;
        case "customer contact":
          this.feedbackFollowUpFormData.customer_contact = value.contact_name;
          this.feedbackFollowUpFormData.customer_contact_id = value.id;
          break;
      }
    },
    dateAndTimeFormatter(date) {
      return date.toISOString();
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMMM YYYY");
        return formattedDate;
      }
    },
    submitData() {
      this.submitted = true;
      if (this.v$.$invalid) {
        return;
      }
      this.isFeedbackCreation = true;

      if (!this.feedbackFollowUpFormDataId) {
        this.addFeedbackFollowUpData();
      } else {
        this.editFeedbackFollowUpData();
      }
    },
    async addFeedbackFollowUpData() {
      try {
        const data = this.feedbackFollowUpFormData;
        let response = await this.addFollowUpOnFeedback(data);
        if (response && response.status === 200) {
          let info = "Follow up is created successfully";
          this.commonToast("success", "Success", info);
          this.loadFeddbackInitialData();
        } else {
          let info = response.data.message || "Failed to create the follow up";
          this.commonToast("error", "Error", info);
        }
        this.isFeedbackCreation = false;
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    async editFeedbackFollowUpData() {
      try {
        let data = {
          feedbackData: this.feedbackFollowUpFormData,
          id: this.feedbackFollowUpFormDataId,
        };
        let response = await this.updateFollowUpOnFeedback(data);
        if (response && response.status === 200) {
          let info = "follow up is updated successfully";
          this.commonToast("success", "Success", info);
          this.loadFeddbackInitialData();
        } else {
          let info = response.data.message || "Failed to update the follow up";
          this.commonToast("error", "Error", info);
        }
        this.isFeedbackCreation = false;
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    loadInitialData() {
      if (Object.keys(this.loadFeedbackFollowUpData).length != 0) {
        this.feedbackFollowUpFormData = this.loadFeedbackFollowUpData;
        const dateTime = new Date(this.feedbackFollowUpFormData?.date_and_time);
        let callTypeList =
          this.callTypesList.filter(
            (res) => res.name == this.feedbackFollowUpFormData.call_type
          ) || [];
        let callReceivedBy =
          this.usersList.filter(
            (res) => res.name == this.feedbackFollowUpFormData.call_received_by
          ) || [];
        let customerContact =
          this.customerContactsList.filter(
            (res) =>
              res.contact_name == this.feedbackFollowUpFormData.customer_contact
          ) || [];
        this.feedbackFollowUpFormData.call_type = callTypeList[0].name || null;
        this.feedbackFollowUpFormData.call_received_by =
          callReceivedBy[0].name || null;
        this.feedbackFollowUpFormData.customer_contact =
          customerContact[0].name || null;
        this.feedbackFollowUpFormData.date_and_time = dateTime;
        this.feedbackFollowUpFormDataId = this.loadFeedbackFollowUpData.id;
      } else {
        this.feedbackFollowUpFormDataId = null;
      }
    },
    loadFeddbackInitialData() {
      let feedbackSettingParams = {
        id: this.expandedData.id,
      };
      this.loadSpecificFeedbackData(feedbackSettingParams);
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

  async created() {
    const contractId = this.expandedData?.contract_id;
    let contractParams = {
      id: contractId,
    };
    this.feedbackFollowUpFormData.feedback_id = this.expandedData?.id;
    await this.loadUserDetails();
    await this.loadCustomerContactDetails(contractParams);
    await this.loadCallTypesDetails();
    this.loadInitialData();
  },
  computed: {
    ...mapGetters({
      usersList: "CrmFeedback/getAllUsersData",
      customerContactsList: "CrmFeedback/getCustomerContactsData",
      loadFeedbackFollowUpData: "CrmFeedback/getFollowUpData",
      callTypesList: "CrmFeedback/getCallTypesData",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.bodyTxt {
  font-family: $font-family-third;
}

.heading {
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  color: #343434;
}
.custom-modal-height {
  height: 58vh;
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
  height: 50vh;
  overflow: auto;
}
</style>
