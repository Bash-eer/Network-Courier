<template>
  <div class="custom-modal-height">
    <div class="scollable-body">
      <div class="flex flex-row justify-content-between">
        <span class="heading bodyTxt">Company Details</span>
        <div class="flex flex-row align-items-center">
          <span class="mr-2 mt-1 color-7a7a7a">Priority:</span>
          <Dropdown
            class="red mr-3"
            v-model="feedbackFormData.priority"
            :value="feedbackFormData.priority"
            :options="priorityList"
            optionLabel="label"
            optionValue="label"
            :filter="true"
            :class="{
              'p-invalid': v$.feedbackFormData.priority.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>

      <div class="formgrid grid mt-4">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text line-height-28 font-size-14">
            Customer ID
          </h5>
          <Dropdown
            v-model="feedbackFormData.customer_id"
            :value="feedbackFormData.customer_id"
            :options="customerIdAndCompanyNamesList"
            :filter="true"
            optionLabel="customer_id"
            optionValue="customer_id"
            @change="updateCustomerIdAndName($event.value, 'Customer ID')"
            :class="{
              'p-invalid':
                v$.feedbackFormData.customer_id.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text line-height-28 font-size-14">
            Company Name
          </h5>
          <Dropdown
            v-model="feedbackFormData.company_name"
            :value="feedbackFormData.company_name"
            :options="customerIdAndCompanyNamesList"
            :filter="true"
            @change="updateCustomerIdAndName($event.value, 'Company Name')"
            optionLabel="profile_name"
            optionValue="profile_name"
            :class="{
              'p-invalid':
                v$.feedbackFormData.company_name.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text line-height-28 font-size-14">
            Cost Center
          </h5>
          <Dropdown
            v-model="feedbackFormData.cost_center"
            :value="feedbackFormData.cost_center"
            @change="updateDropdownData($event.value, 'Cost Center')"
            :options="costCenterList"
            :filter="true"
            optionLabel="cost_center_name"
            id="id"
            :class="{
              'p-invalid':
                v$.feedbackFormData.cost_center.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text line-height-28 font-size-14">Caller</h5>
          <Dropdown
            v-model="feedbackFormData.caller"
            :value="feedbackFormData.caller"
            @change="updateDropdownData($event.value, 'Caller')"
            :options="callerList"
            :filter="true"
            optionLabel="caller_name"
            id="id"
            :class="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text line-height-28 font-size-14">Type</h5>
          <Dropdown
            v-model="feedbackFormData.feedback_type"
            :value="feedbackFormData.feedback_type"
            :options="feedbackTypeList"
            optionLabel="feedback_type"
            optionValue="feedback_type"
            :filter="true"
            @change="getStatusofFeedbackTypeList($event.value)"
            :class="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text line-height-28 font-size-14">
            Sub type
          </h5>
          <Dropdown
            v-model="feedbackFormData.sub_type"
            :value="feedbackFormData.sub_type"
            :options="statusList"
            optionLabel="sub_type"
            optionValue="sub_type"
            :filter="true"
            :class="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text line-height-28 font-size-14">
            Job Type
          </h5>
          <Dropdown
            v-model="feedbackFormData.job_type"
            :value="feedbackFormData.job_type"
            @change="updateJobType($event.value)"
            :options="jobTypeList"
            optionLabel="label"
            optionValue="label"
            :filter="true"
            :class="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4" v-if="isTrackingNo || isCollectionSlipEnabled">
          <h5 class="dialog-label-text line-height-28 font-size-14">
            {{isTrackingNo ? 'Tracking No./Collection Slip' : isCollectionSlipEnabled ? 'Collection Slip No' : 'Conote No./Collection Slip'}} 
          </h5>
          <TextField
            label="customer_contact"
            type="text"
            v-model="feedbackFormData.conote_or_collection_slip_no"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4" v-if="isConoteType">
          <h5 class="dialog-label-text line-height-28 font-size-14">
            Conote Type
          </h5>
          <Dropdown
            v-model="feedbackFormData.conote_type"
            :value="feedbackFormData.conote_type"
            :options="ConoteTypeList"
            optionLabel="label"
            optionValue="label"
            :filter="true"
            :class="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid"></div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-12" v-if="isEmployeeEnabled">
          <h5 class="required dialog-label-text line-height-28 font-size-14">
            Employee
          </h5>
          <div class="d-flex">
          <DropdownFieldMultipleSelect
            v-model="feedbackFormData.employee"
            :options="assignedToListOptional"
            :selectedData="feedbackFormData.employee"
            dropDownName="assignedToooo"
            :data="getAssigntoDropdown"
            optionLabel="name"
            placeholder="Select assign to"

            display="chip"
          />
          </div>
        </div>
        <div class="field col-12 md:col-12">
          <h5 class="required dialog-label-text line-height-28 font-size-14">
            Assign to
          </h5>
          <DropdownFieldMultipleSelect
            v-model="feedbackFormData.assign_to"
            :options="dropDownData"
            :selectedData="feedbackFormData.assign_to"
            dropDownName="assignedToooo"
            :data="getAssigntoDropdown"
            optionLabel="name"
            :filter="true"
            :firstData="assignDropDown"
            :secondData="notifyDropDown"
            placeholder="Select assign to"
            :class="{
              'p-invalid': v$.feedbackFormData.assign_to.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
            display="chip"
          />
        </div>

        <div class="field col-12 md:col-12">
          <h5 class="required dialog-label-text line-height-28 font-size-14">
            Notify to
          </h5>
          <DropdownFieldMultipleSelect
            v-model="feedbackFormData.notify_to"
            :options="dropDownDatanotify"
            :selectedData="feedbackFormData.notify_to[0]"
            dropDownName="notifyToooo"
            optionLabel="name"
            :data="getNotifytoDropdown"
            :firstData="assignDropDown"
            :secondData="notifyDropDown"
            :filter="true"
            placeholder="Select notify to"
            :class="{
              'p-invalid': v$.feedbackFormData.notify_to.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
            display="chip"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-6">
          <div class="field col-12 md:col-12">
            <h5 class="dialog-label-text line-height-28 font-size-14">
              Subject
            </h5>
            <TextField
              label="customer_contact"
              type="text"
              v-model="feedbackFormData.subject"
              :classes="{
                'inputfield w-full dialog-dropdown-text ': true,
              }"
            />
          </div>
          <div class="field col-12 md:col-12">
            <h5 class="dialog-label-text line-height-28 font-size-14">
              Reference
            </h5>
            <TextField
              label="customer_contact"
              type="text"
              v-model="feedbackFormData.reference"
              :classes="{
                'inputfield w-full dialog-dropdown-text ': true,
              }"
            />
          </div>
        </div>
        <div class="field col-12 md:col-6">
          <h5 class="required dialog-label-text line-height-28 font-size-14">
            Feedback
          </h5>
          <TextAreaField
            :state="feedbackFormData.feedback"
            label="remarks"
            v-model="feedbackFormData.feedback"
            @blur="v$.feedbackFormData.feedback.$model;"
            :classes="{
              'p-invalid': v$.feedbackFormData.feedback.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col-12 md:col-12">
          <DragAndDropUpload
            :state="feedbackAttachmentState"
            :key="uploadRenderKey"
            type="CrmFeedbackAttachment"
            storePath="CrmFeedback"
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
          label="Submit"
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
import axios from "axios";
const { URL } = require("../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
import DropdownFieldMultipleSelect from "../../Reusables/DropdownFieldMultipleSelect.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapActions, mapGetters, mapState } from "vuex";
import { errhandler } from "@/services/httpClient";
//import MultiSelect from "primevue/multiselect";
import Dropdown from "primevue/dropdown";

export default {
  name: "FeedbackDialog",
  components: {
    //MultiSelect,
    Dropdown,
    DropdownFieldMultipleSelect,
  },
  props: ["fromBookingHistory"],
  data() {
    return {
      jobTypeList: [
        { label: "General", tag: "General" },
        { label: "Express", tag: "Express" },
        { label: "Rapido", tag: "Rapido" },
        { label: "International", tag: "International" },
      ],
      ConoteTypeList: [
        { label: "Outbound", tag: "Outbound" },
        { label: "Inbound", tag: "Inbound" },
      ],
      priorityList: [
        { label: "High", tag: "High" },
        { label: "Low", tag: "Low" },
      ],
      assignDropDown: [
        { name: "Bike", key: "S1" },
        { name: "Van", key: "S2" },
        { name: "FSR", key: "S3" },
        { name: "Project", key: "S4" },
      ],
      assignedToListOptional: [
        { name: "Bike", key: "S1" },
        { name: "Van", key: "S2" },
        { name: "FSR", key: "S3" },
        { name: "Project", key: "S4" },
      ],
      v$: useVuelidate(),
      submitted: false,
      isFeedbackCreation: false,
      feedbackFormDataId: null,
      feedbackAttachmentState: " ",
      feedbackFormData: {
        priority: "High",
        customer_id: "",
        company_name: "",
        cost_center: "",
        cost_center_id: "",
        caller_id: "",
        caller: "",
        feedback_type: "",
        status: "Unresolved",
        sub_type: "",
        job_type: "",
        conote_type: "",
        conote_or_collection_slip_no: "",
        employee: "",
        assign_to: "",
        notify_to: "",
        subject: "",
        reference: "",
        feedback: "",
        contract_id: "",
        attachments: [],
      },
      selectedJobTypeVal: '',
      dropDownData: null,
      dropDownDatanotify: null,
      isConoteType: false,
      isTrackingNo: false,
      isCollectionSlipEnabled: false,
      isEmployeeEnabled: false,
      paginationParams: {
        offset: 1,
        limit: 10,
        orderBy: ["createdAt", "ASC"],
      },
      uploadRenderKey: 0,
    };
  },
  validations() {
    return {
      feedbackFormData: {
        priority: { required },
        customer_id: { required },
        company_name: { required },
        cost_center_id: { required },
        cost_center: { required },
        // caller_id: { required },
        // feedback_type: { required },
        // status: { required },
        // job_type: { required },
        // conote_type: { required },
        // conote_or_collection_slip_no: { required },
        // employee: { required },
        assign_to: { required },
        notify_to: { required },
        // subject: { required },
        // reference: { required },
        feedback: { required },
      },
    };
  },

  methods: {
    ...mapActions({
      showFeedbackDialog: "CrmFeedback/showFeedbackFormDialog",
      createFeedbackData: "CrmFeedback/createFeedback",
      updateFeedbackData: "CrmFeedback/updateFeedback",
      loadCustomerIdAndCompanyNameDetails:
        "CrmFeedback/getAllCustomerIdAndCompanyNameData",
      loadCostCenterDetails: "CrmFeedback/getAllCostCenterData",
      loadCallerDetails: "CrmFeedback/getAllCallerData",
      loadFeedbackTypeDetails: "CrmFeedback/getFeedbackTypeData",
      loadStatusDetails: "CrmFeedback/getStatusDataofFeedbackType",
      // loadAssignedToDetails: "CrmFeedback/getAssignedToFeedbackData",
      fetchFeedbackData: "CrmFeedback/loadFeedbackDataList",
      getAttachmentsFromFeedback: "CrmFeedback/fetchAttachmentsFromFeedback",
    }),
    closeDialog() {
      const dialogData = {
        displayDialog: false,
        formData: {},
      };
      this.showFeedbackDialog(dialogData);
    },
    async updateCustomerIdAndName(value, type) {
      let customerData, companyData, callerData, callerIdData;
      this.costCenterList = [];
      this.callerList = [];
      this.feedbackFormData.cost_center_id = "";
      this.feedbackFormData.cost_center = "";
      this.feedbackFormData.caller_id = "";
      this.feedbackFormData.caller = "";
      if (this.loadFeedbackData?.cost_center_id) {
        this.loadFeedbackData.cost_center_id = "";
        this.loadFeedbackData.cost_center = "";
      }

      switch (type) {
        case "Customer ID":
          customerData = this.getCustomerByID("customer_id", value);
          this.feedbackFormData.company_name =
            customerData[0]?.profile_name || "";
          this.fetchCostCenterDetails(customerData);
          callerData = {
            id: customerData[0]?.id || "",
          };
          this.loadCallerDetails(callerData);
          break;
        case "Company Name":
          companyData = this.getCustomerByID("profile_name", value);
          this.feedbackFormData.customer_id = companyData[0]?.customer_id || "";
          this.fetchCostCenterDetails(companyData);
          callerIdData = {
            id: companyData[0]?.id || "",
          };
          this.loadCallerDetails(callerIdData);
          break;
      }
    },
    updateJobType(type) {
      this.selectedJobTypeVal = type;
      if (type == "International") {
        this.isConoteType = true;
        this.isTrackingNo = false;
        this.isCollectionSlipEnabled = true;
        this.isEmployeeEnabled = false
      } else if (type == "Rapido") {
        this.isTrackingNo = true;
        this.isConoteType = false;
        this.isCollectionSlipEnabled = false
        this.isEmployeeEnabled = false
      } else if(type == 'Express') {
        this.isConoteType = false;
        this.isTrackingNo = false;
        this.isCollectionSlipEnabled = true
        this.isEmployeeEnabled = false
      } else {
        this.isConoteType = false;
        this.isTrackingNo = false;
        this.isEmployeeEnabled = true;
        this.isCollectionSlipEnabled = false
      }
    },
    updateDropdownData(value, type) {
      if (type == "Cost Center") {
        this.feedbackFormData.cost_center_id = value.id;
      } else {
        this.feedbackFormData.caller_id = value.id;
      }
    },
    fetchCostCenterDetails(customerData) {
      let id = customerData[0]?.id || this.loadFeedbackData?.contract_id;
      let costCenterParams = {
        data: id,
      };
      this.feedbackFormData.contract_id = id;
      this.loadCostCenterDetails(costCenterParams);
    },
    getCustomerByID(field, value) {
      return (
        this.customerIdAndCompanyNamesList.filter(
          (res) => res[field] == value
        ) || []
      );
    },
    getStatusofFeedbackTypeList(value, edit) {
      this.statusList = [];
      if (!edit) {
        this.feedbackFormData.status = "Unresolved";
      }

      const feedbackTypeData = this.feedbackTypeList.filter(
        (res) => res.feedback_type == value
      );
      const feedbackId = feedbackTypeData[0]?.id;
      let feedbackParams = {
        id: feedbackId,
      };
      this.loadStatusDetails(feedbackParams);
    },
    getDropdownValue(data) {},
    dateAndTimeFormatter(date) {
      return date.toISOString();
    },
    submitData() {
      this.submitted = true;
      if (this.v$.$invalid) {
        return;
      }
      this.isFeedbackCreation = true;
      this.paginationParams.offset = this.pageOffset;
      this.paginationParams.limit = this.pageLimit;
      if (!this.feedbackFormDataId) {
        this.addFeedbackData();
      } else {
        this.editFeedbackData();
      }
    },
    async addFeedbackData() {
      try {
        const data = this.feedbackFormData;
        data.attachments = this.attachmentsArray;
        let response = await this.createFeedbackData(data);
        if (response && response.status === 200) {
          let info = "Feedback is created successfully";
          this.commonToast("success", "Success", info);
          this.fetchFeedbackData(this.paginationParams);
        } else {
          let info = response.data.message || "Failed to create the feedback";
          this.commonToast("error", "Error", info);
        }
        this.isFeedbackCreation = false;
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    async editFeedbackData() {
      try {
        let attachmentsList = this.attachmentsArray.map((res) => {
          return {
            file_name: res.file_name,
            mime_type: res.mime_type,
            size: res.size,
            url: res.url,
          };
        });
        this.feedbackFormData.attachments = attachmentsList || [];
        let data = {
          feedbackData: this.feedbackFormData,
          id: this.feedbackFormDataId,
        };
        let response = await this.updateFeedbackData(data);
        if (response && response.status === 200) {
          let info = "Feedback is updated successfully";
          this.commonToast("success", "Success", info);
          this.fetchFeedbackData(this.paginationParams);
        } else {
          let info = response.data.message || "Failed to update the feedback";
          this.commonToast("error", "Error", info);
        }
        this.isFeedbackCreation = false;
      } catch (err) {
        let toastMsg = await errhandler(err);
        this.commonToast(toastMsg.serverity, toastMsg.summary, toastMsg.msg);
      }
    },
    loadInitialData() {
      if (Object.keys(this.loadFeedbackData).length != 0) {
        this.feedbackFormData = this.loadFeedbackData;
        this.feedbackFormDataId = this.loadFeedbackData.id;

        const companyName = this.loadFeedbackData.company_name;
        const customerId = this.loadFeedbackData.customer_id;
        const typeName = this.loadFeedbackData.feedback_type;

        const customerData = this.getCustomerByID("customer_id", customerId);
        this.fetchCostCenterDetails(customerData);
        let callerData = {
          id: customerData[0]?.id || "",
        };
        this.loadCallerDetails(callerData);
        this.getStatusofFeedbackTypeList(typeName, "edit");
        let jobType = this.loadFeedbackData.job_type;
        this.updateJobType(jobType);
        this.fetchFeedbackAttachments();

        this.feedbackFormData.status = this.loadFeedbackData.status;
        this.feedbackFormData.assign_to = this.loadFeedbackData.assign_to[0];
        this.feedbackFormData.notify_to = this.loadFeedbackData.notify_to;
      } else {
        this.feedbackFormDataId = null;
      }
    },
    async fetchFeedbackAttachments() {
      let feedbackData = {
        id: this.loadFeedbackData?.id,
      };
      let feedbackResponse = await this.getAttachmentsFromFeedback(
        feedbackData
      );
      if (feedbackResponse && feedbackResponse.status === 200) {
        let feedbackItemData = feedbackResponse.data?.results || {};
        this.$store.state.CrmFeedback.crmFeedbackAttachmentsFiles =
          feedbackItemData?.attachments || [];
        this.feedbackFormData.attachments = feedbackItemData?.attachments;
        this.feedbackAttachmentState = feedbackItemData?.attachments;
        this.uploadRenderKey++;
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
    async getassignDropDown() {
      this.assignDropDown = [];
      await axios
        .get("/suggestion/feedback/assignment/filter/type-1")
        .then((res) => {
          if (res.data.results) {
            for (let c in res.data.results) {
              res.data.results[c]["name"] =
                res.data.results[c]["employee_name"];
              this.assignDropDown.push(res.data.results[c]);
            }
          }
        });
    },
    async getnotifyDropDown() {
      this.notifyDropDown = [];
      await axios
        .get("/suggestion/feedback/assignment/filter/type-2")
        .then((res) => {
          if (res.data.results) {
            for (let c in res.data.results) {
              res.data.results[c]["name"] =
                res.data.results[c]["employee_name"];
              this.notifyDropDown.push(res.data.results[c]);
            }
          }
        });
    },
  },
  async created() {
    await this.getassignDropDown();
    await this.getnotifyDropDown();

    this.$store.state.commonStore.attachmentsTag = "CrmFeedbackAttachment";

    this.loadCustomerIdAndCompanyNameDetails();
    // this.loadAssignedToDetails();
    this.loadInitialData();
  },
  mounted() {
    this.loadFeedbackTypeDetails();
  },
  computed: {
    ...mapState({
      assigntoDropdownData: (state) => state.CrmFeedback.assigntoDropdownData,
      notifytoDropdownData: (state) => state.CrmFeedback.notifytoDropdownData,
    }),
    ...mapGetters({
      customerIdAndCompanyNamesList:
        "CrmFeedback/getCustomerIdAndCompanyNameData",
      companyNamesList: "CrmFeedback/getCompanyNamesData",
      costCenterList: "CrmFeedback/getCostCentersData",
      callerList: "CrmFeedback/getCallerData",
      feedbackTypeList: "CrmFeedback/getFeedbackTypeData",
      statusList: "CrmFeedback/getStatusListData",
      assignedToList: "CrmFeedback/getAssignedToData",
      attachmentsArray: "CrmFeedback/getAttachmentsData",
      loadFeedbackData: "CrmFeedback/getFeedbackFormData",
      pageOffset: "CrmFeedback/getPageOffset",
      pageLimit: "CrmFeedback/getPageLimit",
      getAssigntoDropdown: "CrmFeedback/getAssigntoDropdown",
      getNotifytoDropdown: "CrmFeedback/getNotifytoDropdown",
    }),
  },
  watch: {
    "$store.state.CrmFeedback.assigntoDropdownData": function () {
      this.dropDownData = this.assigntoDropdownData;
    },
    "$store.state.CrmFeedback.notifytoDropdownData": function () {
      this.dropDownDatanotify = this.notifytoDropdownData;
    },
    costCenterList: async function () {
      if (Object.keys(this.loadFeedbackData).length != 0) {
        const costCenterId = this.loadFeedbackData.cost_center_id;
        const costCenterObject = this.costCenterList.filter(
          (res) => res["id"] == costCenterId
        );
        const cost_center_id =
          this.costCenterList.filter(
            (res) => res.id == this.loadFeedbackData.cost_center_id
          ) || [];
        this.feedbackFormData.cost_center = cost_center_id || {};
        this.feedbackFormData.cost_center_id = costCenterObject[0]?.id || "";
        this.feedbackFormData.cost_center = costCenterObject[0] || {};
      }
    },

    statusList: async function () {
      if (Object.keys(this.loadFeedbackData).length != 0) {
        this.feedbackFormData.status = this.loadFeedbackData.status;
      }
    },
    callerList: async function () {
      if (Object.keys(this.loadFeedbackData).length != 0) {
        const caller_id =
          this.callerList.filter(
            (res) => res.id == this.loadFeedbackData.caller_id
          ) || [];
        this.feedbackFormData.caller = caller_id[0] || {};
        this.feedbackFormData.caller_id = caller_id[0]?.id || null;
      }
    },
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
::v-deep .p-multiselect {
  width: 100% !important;
}
::v-deep .p-inputtext.p-inputtext-sm {
  font-weight: bold;
}
.red {
  background-color: #ff5555;
  border-radius: 2px;
  width: 150px;
  height: 36px;
}
</style>
