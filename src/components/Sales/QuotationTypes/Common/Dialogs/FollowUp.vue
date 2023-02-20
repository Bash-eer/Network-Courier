<template>
  <div>
    <span class="add-follow-heading bold-700 font-size-12">Call Type</span>
    <div class="flex mt-2 add-follow-heading bold-700 font-size-11">
      <div class="flex" v-for="(radio, index) in callTypeData" :key="index">
        <div class="flex flex-row mr-4">
          <div class="flex mr-1">
            <RadioButton
              :id="radio.tag"
              :name="radio.tag"
              :value="radio.tag"
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
        <h5 class="required dialog-label-text">Call Received By / Caller</h5>
        <DropDown
          :state="details.internal_call_received_by"
          :data="Caller"
          :filter="true"
          label="internal_call_received_by"
          id="internal_call_received_by"
          code="name"
          :key="renderKey"
          v-model="details.internal_call_received_by"
          :classes="{
            'p-invalid':
              v$.details.internal_call_received_by.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="required dialog-label-text">Date & Time</h5>
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
                'inputfield w-full dialog-dropdown-text ': true,
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
      <div :key="renderKey" class="field col-12 md:col-6">
        <h5 class="required dialog-label-text">Customer Contact</h5>
        <!-- <DropDownField
          :value="details.customer_name"
          code="name"
          :data="Customer"
          :filter="true"
          label="customer_type"
          v-model="details.customer_name"
          @update:modelValue="getCusId"
          :class="{
            'p-invalid': v$.details.customer_name.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        /> -->
        <AddNewDropDownTextField
          type="Other"
          :state="details.customer_name"
          :data="Customer"
          :placeholder="details.customer_name"
          v-model="details.customer_name"
          @addNewValue="addNewCustomer"
          @update:modelValue="getCusId"
          :classes="{
            'p-invalid': v$.details.customer_name.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
        <!-- <DropDown
          code="code"
          :state="customer_name_id"
          :data="Customer"
          label="customer_name"
          id="customer_name"
          v-model="customer_name_id"
          @update:modelValue="getCusId"
          :classes="{
            'p-invalid': v$.details.customer_name.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        /> -->
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="required dialog-label-text">Customer Contact No</h5>
        <TextField
          :key="renderKey"
          label="customer_contact"
          type="number"
          v-model="details.customer_contact_no"
          :classes="{
            'p-invalid': v$.details.customer_contact_no.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <label class="required dialog-label-text" for="Email ID"
          >Mobile Number</label
        >
        <TextField
          :key="renderKey"
          label="whatsapp_no"
          type="number"
          v-model="details.whatsapp_no"
          :classes="{
            'p-invalid': v$.details.whatsapp_no.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <label class="required dialog-label-text" for="Email ID">E-mail</label>
        <TextField
          :key="renderKey"
          id="Email ID"
          type="text"
          label="Email ID"
          v-model="details['email']"
          @blur="v$.details['email'].$model"
          placeholder="e.g. Tommy@gmail.com"
          v-on:childToParent="FormInput"
          :classes="{
            'p-invalid': v$.details['email'].$invalid && submitted,
            'dialog-label-text dialog-field-text': true,
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
        <h5 class="required dialog-label-text">Subject</h5>
        <!-- <TextField
          type="number"
          :state="details.subject"
          label="remarks"
          v-model="details.subject"
          @blur="v$.details.subject.$model;"
          :classes="{
            'p-invalid': v$.details.subject.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        /> -->
        <TextAreaField
          :state="details.subject"
          label="remarks"
          v-model="details.subject"
          @blur="v$.details.subject.$model;"
          :classes="{
            'p-invalid': v$.details.subject.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="required dialog-label-text">Discussion Details</h5>
        <TextAreaField
          :state="details.discussion_detaits"
          label="remarks"
          v-model="details.discussion_detaits"
          @blur="v$.details.discussion_detaits.$model;"
          :classes="{
            'p-invalid': v$.details.discussion_detaits.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>
    <div :key="attachKey">
      <DragAndDropUpload
        :state="salesCommonFollowUpAttachmentsState"
        type="salesCommonFollowUp"
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
          label="Submit"
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
import { required, email } from "@vuelidate/validators";
import RadioButton from "primevue/radiobutton";
import axios from "axios";
import moment from "moment";
import { salesCommon } from "../../../../../store/helper";
const { URL } = require("../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
export default {
  name: "AddFollowUP",
  components: {
    RadioButton,
  },
  data() {
    return {
      showError: false,
      renderKey: 1,
      attachKey: 10,
      Caller: [],
      Customer: [],
      callTypeData: [
        { label: "Called", tag: "called" },
        { label: "Call Received", tag: "call_received" },
        { label: "Meeting ", tag: "meeting" },
        { label: "Email", tag: "Email" },
        { label: "SMS", tag: "SMS" },
        { label: "Whatsapp", tag: "Whatsapp" },
        { label: "Follow Up", tag: "followUp" },
      ],
      ref: [
        {
          quotation_id: 23,

          internal_call_received_by: "anto",
          date_and_time: "2020-03-09T22:18:26.625Z",
          customer_contact_no: 123456781325624,
          customer_name: "stefen",
          subject: 2,
          whatsapp_no: 123456778,
          email: "test@gmail.com",
          discussion_detaits: "asdfghjkl",
          attachments: {
            uploaded_in: "follow up",
            attachment_details: [
              {
                file_name: "test",
                url: "test",
                mime_type: "test",
                size: 3,
              },
              {
                file_name: "test",
                url: "test",
                mime_type: "test",
                size: 3,
              },
            ],
          },
        },
      ],
      customer_name_id: "",
      details: {
        call_type: "",
        internal_call_received_by: "",
        date_and_time: "",
        customer_name: "",
        customer_contact_no: "",
        contact_id: "",
        whatsapp_no: "",
        email: "",
        subject: "",
        discussion_detaits: "",
        attachments: {
          uploaded_in: "follow up",
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
      },
      salesCommonFollowUpAttachmentsState: " ",
      v$: useVuelidate(),
      submitted: false,
    };
  },
  validations() {
    return {
      details: {
        call_type: { required },
        internal_call_received_by: { required },
        date_and_time: { required },
        customer_name: { required },
        customer_contact_no: { required },
        whatsapp_no: { required },
        email: { required, email },
        subject: { required },
        discussion_detaits: { required },
      },
    };
  },
  computed: {
    ...mapGetters({
      commonFollowUpStateData: "salesCommon/commonFollowUpStateData",
    }),
  },
  methods: {
    ...salesCommon,
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;

        if (this.details.call_type == "") {
          this.showError = true;
        }
      }
      if (!this.v$.$invalid) {
        // this.details.quotation_id = this.$route.params.id;
        if (this.$route.params.type == "contract") {
          this.details.contract_id = this.$route.params.id;
        } else {
          this.details.quotation_id = this.$route.params.id;
        }
        if (
          this.$store.state.salesCommon.salesCommonFollowUpFiles.length != 0
        ) {
          this.details["attachments"]["attachment_details"] =
            this.$store.state.salesCommon.salesCommonFollowUpFiles;
        } else {
          delete this.details["attachments"];
        }
        if (this.details["attachments"]) {
          if (this.details["attachments"]["attachment_details"].length == 0) {
            delete this.details["attachments"];
          }
        }
        if (this.details["date_and_time"]) {
          // this.details["date_and_time"] = this.dateFormater(
          //   this.details["date_and_time"]
          // );
          this.details["date_and_time"] = new Date(
            this.details["date_and_time"]
          );
        }
        if (this.commonFollowUpStateData.id) {
          this.apiCallHandler(
            "PUT",
            "/sales/" +
              this.$route.params.type +
              "/followup/" +
              this.commonFollowUpStateData.id,
            "updated"
          );
        } else {
          this.apiCallHandler(
            "POST",
            "/sales/" + this.$route.params.type + "/followup",
            "added"
          );
        }
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
            toastMsg: `The Followup has been ${txt} successfully!`,
            toastSeverity: "info",
          },

          toastCommonErrorData: {
            toastMsg: "",

            toastSeverity: "error",
          },
        },
        loadData: "loadFollowupData",
      });
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("Do MMM YYYY hh:mm");
        return formattedDate;
      }
    },
    getCusId(e) {
      let d_find = this.Customer[0].items.find((i) => i?.name == e?.name);
      this.customer_name_id = e;
      this.details.customer_name = d_find.name;
      this.details.contact_id = d_find.code;
      this.details.customer_contact_no = d_find.contact_no;
      this.details.whatsapp_no = d_find.mobile_no;
      this.details.email = d_find?.email;
      this.renderKey++;
    },
    async callReceiver() {
      const res = await this.getCallReceivedBy();
      this.Caller = [];
      if (res) {
        res.data.results.map((i) => {
          this.Caller.push({ name: i.display_name, code: i.id });
        });
      }
      this.renderKey++;
    },
    async addNewCustomer(e) {
      let data = {
        contact_name: e,
      };
      let type = this.$route.params.type;
      if (type == "quotation") {
        data = {
          ...data,
          quotation_id: this.$route.params.id,
        };
      } else {
        data = {
          ...data,
          contract_id: this.$route.params.id,
        };
      }
      await this.addCustomerContact({
        payload: data,
        type: type,
        toast: this.$toast,
      });
      await this.callCustomer();
    },
    async callCustomer() {
      const res = await this.getCustomerContact({
        id: this.$route.params.id,
        type: this.$route.params.type,
      });
      // this.Customer = [];
      let items = [];
      if (res) {
        res.data.results.map((i) => {
          items.push({
            name: i.contact_name,
            code: i.id,
            contact_no: i.contact_no,
            mobile_no: i.mobile_no,
            email: i.email,
          });
        });
      }
      this.Customer = [
        {
          name: "Add New",
          code: "Add",
          items: items,
        },
      ];
      this.renderKey++;
    },
  },
  async created() {
    await this.callReceiver();
    await this.callCustomer();
    this.$store.state.commonStore.attachmentsTag = "salesCommonFollowUp";
    if (Object.keys(this.commonFollowUpStateData).length != 0) {
      if (this.commonFollowUpStateData.follow_up_attachments.length > 0) {
        this.salesCommonFollowUpAttachmentsState =
          this.commonFollowUpStateData.follow_up_attachments[0]["attachments"];
        this.$store.state.salesCommon.salesCommonFollowUpFiles =
          this.commonFollowUpStateData.follow_up_attachments[0]["attachments"];
      }
      if (this.commonFollowUpStateData.id) {
        for (let state in this.details) {
          if (state != "attachments") {
            this.details[state] = this.commonFollowUpStateData[state];
          }
        }
        if (this.commonFollowUpStateData.follow_up_attachments.length > 0) {
          let respectiveData =
            this.commonFollowUpStateData.follow_up_attachments.find(
              (itm) => itm.uploaded_in == "follow up"
            );
          if (respectiveData) {
            this.salesCommonFollowUpAttachmentsState =
              respectiveData["attachments"];
            this.$store.state.salesCommon.salesCommonFollowUpFiles =
              respectiveData["attachments"];
            this.attachKey++;
          }
        }
        this.details["attachments"]["attachment_details"] = [];
        // this.details.attachments.attachment_details = []
        if (this.commonFollowUpStateData.follow_up_attachments.length != 0) {
          this.details.attachments.attachment_details =
            this.commonFollowUpStateData.follow_up_attachments[0].attachments;
        }
      } else {
        for (let state in this.details) {
          if (state != "attachments") {
            this.details[state] = this.commonFollowUpStateData[state];
          }
        }
      }
    }

    this.renderKey++;
  },
  unmounted() {
    // this.commonFollowUpStateData = {};
    this.$store.state.salesCommon.commonFollowUpStateData = {};
    this.$store.state.commonStore.attachmentsTag = null;
    this.$store.state.salesCommon.salesCommonFollowUpFiles = [];
    this.$store.state.salesCommon.deletedsalesCommonFollowUpFiles = [];
  },
};
</script>

<style lang="scss" scoped>
.add-follow-heading {
  color: #343434;
}
</style>
