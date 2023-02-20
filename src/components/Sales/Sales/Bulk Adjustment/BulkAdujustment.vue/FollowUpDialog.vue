<template>
  <div>
    <span class="bold-700 font-size-12 color-4e5868 ml-2 mb-1">Call Type</span>
    <div
      class="
        flex
        mt-2
        add-follow-heading
        bold-700
        font-size-12
        color-717171
        ml-2
        mb-2
      "
    >
      <div class="flex" v-for="(radio, index) in callTypeData" :key="index">
        <div class="flex flex-row mr-4">
          <div class="flex mr-1">
            <RadioButton
              :id="radio.label"
              :name="radio.label"
              :value="radio.label"
              v-model="details.call_type"
            />
          </div>
          <div class="flex my-1">{{ radio.label }}</div>
        </div>
      </div>
    </div>

    <div v-if="showError == true" class="red mt-1">
      Please select a call type
    </div>
    <div class="formgrid grid mt-3">
      <div class="field col-12 md:col-6">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">
          Call Received By / Caller
        </h5>
        <DropDown
          :state="details.caller"
          :data="Caller"
          label="caller"
          id="caller"
          code="name"
          :key="details.caller"
          v-model="details.caller"
          :classes="{
            'p-invalid': v$.details.caller.$invalid && submitted,
            'inputfield w-full color-212121 font-bold ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">Date & Time</h5>
        <div clas="flex">
          <div class="whiteDiv calendarDiv">
            <Calendar
              :showTime="true"
              :showSeconds="true"
              dateFormat="d MM yy"
              class="contactsCalendar"
              v-model="details.date_and_time"
              :showIcon="true"
              style="width: 100%"
              :class="{
                'p-invalid': v$.details.date_and_time.$invalid && submitted,
                'inputfield w-full color-212121 font-bold ': true,
              }"
              :monthNavigator="true"
              :yearNavigator="true"
              yearRange="1950:2050"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="bold-500 font-size-14 color-7a7a7a">Customer Contact</h5>
        <DropDown
          code="name"
          :state="details.customer_name"
          :data="Customer"
          label="customer_name"
          id="customer_name"
          :key="details.customer_name"
          v-model="details.customer_name"
          :classes="{
            // 'p-invalid': v$.details.customer_name.$invalid && submitted,
            'inputfield w-full color-212121 font-bold ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="bold-500 font-size-14 color-7a7a7a">Customer Contact No</h5>
        <TextField
          label="customer_contact"
          type="number"
          v-model="details.customer_contact_no"
          :classes="{
            // 'p-invalid': v$.details.customer_contact_no.$invalid && submitted,
            'inputfield w-full color-212121 font-bold ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <label class="bold-500 font-size-14 color-7a7a7a" for="Email ID"
          >Whatsapp Number</label
        >
        <TextField
          label="whatsapp_no"
          type="number"
          mask="99-999999"
          v-model="details.whatsapp_no"
          :classes="{
            // 'p-invalid': v$.details.whatsapp_no.$invalid && submitted,
            'inputfield w-full color-212121 font-bold ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <label
          class="required bold-500 font-size-14 color-7a7a7a"
          for="Email ID"
          >E-mail</label
        >
        <TextField
          id="Email ID"
          type="text"
          label="Email ID"
          v-model="details['email']"
          @blur="v$.details['email'].$model"
          placeholder="e.g. Tommy@gmail.com"
          v-on:childToParent="FormInput"
          :classes="{
            'p-invalid': v$.details['email'].$invalid && submitted,
            'color-212121 font-bold': true,
          }"
        />
        <span v-if="v$.details['email'].$error && submitted">
          <span
            id="email-error"
            v-for="(error, index) of v$.details['email'].$errors"
            :key="index"
          >
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
        <small
          v-else-if="
            (v$.details['email'].$invalid && submitted) ||
            v$.details['email'].$pending.$response
          "
          class="p-error"
          >{{
            v$.details["email"].required.$message.replace("Value", "Email")
          }}</small
        >
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">Subject</h5>
        <TextAreaField
          :state="details.subject"
          label="remarks"
          v-model="details.subject"
          @blur="v$.details.subject.$model;"
          :classes="{
            'p-invalid': v$.details.subject.$invalid && submitted,
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">
          Discussion Details
        </h5>
        <TextAreaField
          :state="details.discussion_details"
          label="remarks"
          v-model="details.discussion_details"
          @blur="v$.details.discussion_details.$model;"
          :classes="{
            'p-invalid': v$.details.discussion_details.$invalid && submitted,
            'inputfield w-full color-212121 font-bold py-2': true,
          }"
        />
      </div>
    </div>
    <div>
      <DragAndDropUpload
        :state="BulkAdjustmentAttachmentsState"
        type="BulkAdjustmentAttachments"
        storePath="bulkAdjustment"
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
        <CancelButton
          storePath="salesSales"
          label="Cancel"
          class="color-357dea"
        />
        <Buttons
          label="Submit"
          button_class="dialog-button-text bg-357dea"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
    <Toast
      :severity="$store.state['salesSales'].toastData.severity"
      :summary="$store.state['salesSales'].toastData.summary"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import RadioButton from "primevue/radiobutton";
import Toast from "./Toast.vue";
import axios from "axios";
const { URL } = require("../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
export default {
  name: "FollowUpDialog",
  components: {
    RadioButton,
    Toast,
  },
  data() {
    return {
      showError: false,
      Caller: [
        { name: "James", code: "1" },
        { name: "Kim", code: "2" },
        { name: "Anna", code: "3" },
        { name: "emily", code: "4" },
        { name: "evelyn", code: "5" },
      ],
      Customer: [
        { name: "Anne", code: "1" },
        { name: "Rose", code: "2" },
        { name: "Lisa", code: "3" },
        { name: "Jennie", code: "4" },
        { name: "Jisoo", code: "5" },
      ],
      callTypeData: [
        { label: "Called", tag: "called" },
        { label: "Call Received", tag: "call_received" },
        { label: "Meeting", tag: "meeting" },
        { label: "Email", tag: "Email" },
        { label: "SMS", tag: "SMS" },
        { label: "Whatsapp", tag: "Whatsapp" },
        { label: "Follow Up", tag: "followUp" },
      ],
      details: {
        call_type: "",
        caller: "",
        date_and_time: "",
        customer_name: "",
        customer_contact_no: "",
        whatsapp_no: "",
        email: "",
        subject: "",
        discussion_details: "",
        attachment_types: {
          attach_type: "follow up",
          attachments: [],
        },
      },
      BulkAdjustmentAttachmentsState: " ",
      v$: useVuelidate(),
      submitted: false,
    };
  },
  validations() {
    return {
      details: {
        call_type: { required },
        caller: { required },
        date_and_time: { required },
        email: { required, email },
        subject: { required },
        discussion_details: { required },
      },
    };
  },
  computed: {
    ...mapGetters({
      commonFollowUpStateData: "salesCommon/commonFollowUpStateData",
      BulkAdjustmentAttachmentsStateData:
        "bulkAdjustment/BulkAdjustmentAttachmentsStateData",
      BulkAdjustmentFollowUpAddNewData:
        "bulkAdjustment/BulkAdjustmentFollowUpAddNewData",
    }),
  },
  methods: {
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;

        if (this.details.call_type == "") {
          this.showError = true;
        }
      }
      if (!this.v$.$invalid) {
        for (let i in this.details) {
          this.BulkAdjustmentFollowUpAddNewData[i] = this.details[i];
        }
        this.BulkAdjustmentFollowUpAddNewData["attachment_types"][
          "attachments"
        ] = this.$store.state.bulkAdjustment.BulkAdjustmentAttachmentsFiles;

        if (this.$store.state.bulkAdjustment.BulkAdjustmentStateData?.id) {
          this.apiPatchCallHandler();
        } else {
          this.apiCallHandler();
        }
      }
    },
    apiCallHandler() {
      this.$store.dispatch("bulkAdjustment/POSTPATCHCRUDOPERATION", {
        id: this.$store.state.bulkAdjustment.ProfileExpansionData.id,
        path:
          "/sales/contract/bulk-adjustment/followup/" +
          this.$store.state.bulkAdjustment.ProfileExpansionData.id,
        data: this.BulkAdjustmentFollowUpAddNewData,
        method: "POST",
        loadData: "bulkAdjustment/loadProfileExpansionData",
        closeDialogue: "salesSales/closeDialog",
        loadDiffStore: true,
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
            toastMsg: "There was an error in creating the profile, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
    apiPatchCallHandler() {
      this.$store.dispatch("bulkAdjustment/POSTPATCHCRUDOPERATION", {
        id: this.$store.state.bulkAdjustment.ProfileExpansionData.id,
        path:
          "/sales/contract/bulk-adjustment/followup/" +
          this.$store.state.bulkAdjustment.BulkAdjustmentStateData.id,

        data: this.BulkAdjustmentFollowUpAddNewData,
        method: "PUT",
        loadData: "bulkAdjustment/loadProfileExpansionData",
        closeDialogue: "salesSales/closeDialog",
        loadDiffStore: true,
        toastData: {
          toastSuccessData: {
            toastMsg: `The Profile is updated successfully!`,
            toastSeverity: "success",
          },
          toastDuplicateErrorData: {
            toastMsg: `Profile already exists !`,
            toastSeverity: "error",
          },
          toastCommonErrorData: {
            toastMsg: "There was an error in creating the profile, try again!",

            toastSeverity: "error",
          },
        },
      });
    },
    prefillEditData() {
      let incomingData =
        this.$store.state.bulkAdjustment.BulkAdjustmentStateData;
      this.details.customer_contact_no = incomingData.customer_contact_no;
      this.details.call_type = incomingData.call_type;
      this.details.caller = incomingData.caller;
      this.details.date_and_time = incomingData.date_and_time;
      this.details.customer_name = incomingData.customer_name;
      this.details.whatsapp_no = incomingData.whatsapp_no;
      this.details.subject = incomingData.subject;
      this.details.discussion_details = incomingData.discussion_details;
      this.details.email = incomingData.email;
    },
  },

  created() {
    this.$store.state.commonStore.attachmentsTag = "BulkAdjustmentAttachments";
    if (Object.keys(this.BulkAdjustmentAttachmentsStateData).length != 0) {
      this.BulkAdjustmentAttachmentsState =
        this.BulkAdjustmentAttachmentsStateData.attachments;
      this.$store.state.bulkAdjustment.BulkAdjustmentAttachmentsFiles =
        this.BulkAdjustmentAttachmentsStateData.attachments;
    }
    if (this.$store.state.bulkAdjustment.BulkAdjustmentStateData) {
      this.prefillEditData();

      if (
        this.$store.state.bulkAdjustment.BulkAdjustmentStateData
          ?.attachment_types.length > 0
      ) {
        let respectiveData =
          this.$store.state.bulkAdjustment.BulkAdjustmentStateData?.attachment_types.find(
            (itm) => itm.attach_type == "follow up"
          );
        if (respectiveData) {
          this.BulkAdjustmentAttachmentsState = respectiveData["attachments"];
          this.$store.state.bulkAdjustment.BulkAdjustmentAttachmentsFiles =
            respectiveData["attachments"];
        }
      }
    }
  },
  unmounted() {
    this.$store.state.bulkAdjustment.BulkAdjustmentStateData = null;
    this.$store.state.bulkAdjustment.BulkAdjustmentAttachmentsStateData = [];
    this.$store.state.commonStore.attachmentsTag = null;
    this.$store.state.bulkAdjustment.BulkAdjustmentAttachmentsFiles = [];
    this.$store.state.bulkAdjustment.deletedBulkAdjustmentAttachmentsFiles = [];
  },
};
</script>

<style lang="scss" scoped>
.add-follow-heading {
  color: #343434;
}
</style>
