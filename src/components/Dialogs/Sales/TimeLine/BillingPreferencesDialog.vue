<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Enter the Billing Address</h5>
      <TextField
        label="name_of_the_profile"
        type="text"
        v-model="details.billing_address"
        @blur="v$.details.billing_address.$model;"
        :classes="{
          'p-invalid': v$.details.billing_address.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Postal Code</h5>
      <TextField
        label="postalCode"
        type="number"
        v-model="details.postal_code"
        @blur="v$.details.postal_code.$model;"
        :classes="{
          'p-invalid': v$.details.postal_code.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Country</h5>
      <DropDown
        :data="Country"
        :state="details.country"
        label="country"
        code="code"
        v-model="details.country"
        @blur="v$.details.country.$model;"
        :classes="{
          'p-invalid': v$.details.country.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">State</h5>
      <DropDown
        :data="State"
        :state="details.state"
        label="state"
        code="code"
        v-model="details.state"
        :value="details.state"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Building Name</h5>
      <TextField
        label="building_name"
        v-model="details.building_name"
        :classes="{
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Floor No</h5>
      <TextField
        label="floorNo"
        v-model="details.floor_no"
        v-on:childToParent="getUserInput"
        :classes="{
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Unit No</h5>
      <TextField
        label="unitNo"
        v-model="details.unit_no"
        v-on:childToParent="getUserInput"
        :classes="{
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <p class="ml-2 mt-3 subFormHeaders">Invoice Notification</p>
  <div class="flex flex-row">
    <div class="flex">
      <CheckBox
        path="sales"
        v-bind:checker="
          details.email == true
            ? [
                {
                  name: 'By Email',
                  tag: 'email',
                  key: 'em',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'By Email',
            tag: 'email',
            key: 'em',
          },
        ]"
        v-on:childToParent="checkBoxChange"
      />
    </div>
    <div class="flex">
      <CheckBox
        path="sales"
        v-bind:checker="
          details.by_sms == true
            ? [
                {
                  name: 'By SMS',
                  tag: 'by_sms',
                  key: 'bs',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'By SMS',
            tag: 'by_sms',
            key: 'bs',
          },
        ]"
        v-on:childToParent="checkBoxChange"
      />
    </div>
    <div class="flex">
      <CheckBox
        path="sales"
        v-bind:checker="
          details.by_post == true
            ? [
                {
                  name: 'By Post',
                  tag: 'by_post',
                  key: 'bp',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'By Post',
            tag: 'by_post',
            key: 'bp',
          },
        ]"
        v-on:childToParent="checkBoxChange"
      />
    </div>
  </div>
  <p class="ml-2 mt-3 subFormHeaders">Invoice Attachments</p>
  <div class="flex flex-row">
    <div class="flex costing_worksheet">
      <CheckBox
        path="sales"
        v-bind:checker="
          details.costing_work_sheet == true
            ? [
                {
                  name: 'Costing Work Sheet',
                  tag: 'costing_work_sheet',
                  key: 'cw',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'Costing Work Sheet',
            tag: 'costing_work_sheet',
            key: 'cw',
          },
        ]"
        v-on:childToParent="checkBoxChange"
      />
    </div>
    <div class="flex groupwise_ws">
      <CheckBox
        path="sales"
        v-bind:checker="
          details.groupwise_costing_work_sheet == true
            ? [
                {
                  name: 'Groupwise Costing Work Sheet',
                  tag: 'groupwise_costing_work_sheet',
                  key: 'gc',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'Groupwise Costing Work Sheet',
            tag: 'groupwise_costing_work_sheet',
            key: 'gc',
          },
        ]"
        v-on:childToParent="checkBoxChange"
      />
    </div>
    <div class="flex">
      <CheckBox
        path="sales"
        v-bind:checker="
          details.for_less_than_min_qty == true
            ? [
                {
                  name: 'For less than Min Qty Also',
                  tag: 'for_less_than_min_qty',
                  key: 'fl',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'For less than Min Qty Also',
            tag: 'for_less_than_min_qty',
            key: 'fl',
          },
        ]"
        v-on:childToParent="checkBoxChange"
      />
    </div>
  </div>
  <div class="flex flex-row">
    <div class="flex">
      <CheckBox
        path="sales"
        v-bind:checker="
          details.detailed_job_summary == true
            ? [
                {
                  name: 'Detailed Job Summary',
                  tag: 'detailed_job_summary',
                  key: 'dj',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'Detailed Job Summary',
            tag: 'detailed_job_summary',
            key: 'dj',
          },
        ]"
        v-on:childToParent="checkBoxChange"
      />
    </div>
    <div class="flex">
      <CheckBox
        path="sales"
        v-bind:checker="
          details.groupwise_detailed_job_summary == true
            ? [
                {
                  name: 'GroupWise Detailed Job Summary',
                  tag: 'groupwise_detailed_job_summary',
                  key: 'gd',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'GroupWise Detailed Job Summary',
            tag: 'groupwise_detailed_job_summary',
            key: 'gd',
          },
        ]"
        v-on:childToParent="checkBoxChange"
      />
    </div>
    <div class="flex">
      <CheckBox
        path="sales"
        v-bind:checker="
          details.caller_costing_work_sheet == true
            ? [
                {
                  name: 'Caller Costing Worksheet',
                  tag: 'caller_costing_work_sheet',
                  key: 'fl',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'Caller Costing Worksheet',
            tag: 'caller_costing_work_sheet',
            key: 'fl',
          },
        ]"
        v-on:childToParent="checkBoxChange"
      />
    </div>
  </div>
  <div class="flex flex-row">
    <div class="flex">
      <CheckBox
        path="sales"
        v-bind:checker="
          details.job_detail_report == true
            ? [
                {
                  name: 'Job Detail Report  (can view this report online only)',
                  tag: 'job_detail_report',
                  key: 'fl',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'Job Detail Report  (can view this report online only)',
            tag: 'job_detail_report',
            key: 'fl',
          },
        ]"
        v-on:childToParent="checkBoxChange"
      />
    </div>
  </div>
  <p class="ml-2 mt-4 subFormHeaders">Attachment Format</p>
  <div class="flex flex-row ml-2">
    <div class="flex mr-4">
      <RadioButton
        id="rich_text_format"
        name="rich_text_format"
        value="rich_text_format"
        v-model="details.document_type"
      />
      <label class="radiosText ml-2" for="rich_text_format"
        >Rich Text Format</label
      >
    </div>
    <div class="flex mr-4">
      <RadioButton
        id="microsoft_word"
        name="microsoft_word"
        value="microsoft_word"
        v-model="details.document_type"
      />
      <label class="radiosText ml-2" for="microsoft_word">Microsoft Word</label>
    </div>
    <div class="flex mr-4">
      <RadioButton
        id="excel_file"
        name="excel_file"
        value="excel_file"
        v-model="details.document_type"
      />
      <label class="radiosText ml-2" for="excel_file">Excel File</label>
    </div>
    <div class="flex mr-4">
      <RadioButton
        id="html"
        name="html"
        value="html"
        v-model="details.document_type"
      />
      <label class="radiosText ml-2" for="html">HTML</label>
    </div>
    <div class="flex mr-4">
      <RadioButton
        id="pdf"
        name="pdf"
        value="pdf"
        v-model="details.document_type"
      />
      <label class="radiosText ml-2" for="excel_file">PDF</label>
    </div>
  </div>
  <div class="flex flex-row">
    <div class="flex mr-4">
      <CheckBox
        path="sales"
        v-bind:checker="
          details.view_attachment_online == true
            ? [
                {
                  name: 'View Attachments Online',
                  tag: 'view_attachment_online',
                  key: 'va',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'View Attachments Online',
            tag: 'view_attachment_online',
            key: 'va',
          },
        ]"
        v-on:childToParent="checkBoxChange"
      />
    </div>
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
      <Buttons
        label="Cancel"
        v-on:childToParent="closeDialog"
        class="p-button-outlined mr-1 dialog-button-text"
      />
      <Buttons
        label="Save"
        button_class="dialog-button-text"
        v-on:childToParent="submitData"
      />
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import RadioButton from "primevue/radiobutton";
export default {
  name: "BillingPreferencesDialog",
  data: () => ({
    v$: useVuelidate(),
    Country: [
      { name: "Country1", code: "C1" },
      { name: "Country2", code: "C2" },
    ],
    State: [
      { name: "State", code: "C1" },
      { name: "State", code: "C2" },
    ],
    details: {
      billing_address: "",
      postal_code: "",
      country: "",
      state: "",
      building_name: "",
      floor_no: "",
      unit_no: "",
      email: false,
      by_sms: false,
      by_post: false,
      costing_work_sheet: false,
      groupwise_costing_work_sheet: false,
      for_less_than_min_qty: false,
      detailed_job_summary: false,
      groupwise_detailed_job_summary: false,
      caller_costing_work_sheet: false,
      job_detail_report: false,
      document_type: "",
      rich_text_format: false,
      microsoft_word: false,
      excel_file: false,
      html: false,
      pdf: false,
      view_attachment_online: false,
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        billing_address: { required },
        postal_code: { required },
        country: { required },
      },
    };
  },
  methods: {
    checkBoxChange(val, src) {
      if (val.length != 0) {
        this.details[val[0].tag] = true;
      }
      if (val.length == 0) {
        this.details[src[0].tag] = false;
      }
    },
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        for (let d in this.details) {
          if (d == "document_type") {
            this.details[this.details[d]] = true;
          }
        }
        this.details["quotation_id"] = this.$store.state.sales.salesQuotationId;
        //CRUD - UPDATE OPERATION
        if (this.details.id) {
          //making an update/PUT api call - to update bill preferences
          this.$store.dispatch("sales/billPreferencesCRUD", {
            tag: "update",
            data: this.details,
          });
        }
        //CRUD - CREATE OPERATION
        else {
          //making an add/POST api to create a new bill preference
          this.$store.dispatch("sales/billPreferencesCRUD", {
            tag: "add",
            data: this.details,
          });
        }
      }
    },
  },
  created() {
    if (this.$store.state.sales.rawBillingPreferencesData != null) {
      for (let bp in this.$store.state.sales.rawBillingPreferencesData) {
        this.details[bp] =
          this.$store.state.sales.rawBillingPreferencesData[bp];
        if (
          bp == "rich_text_format" ||
          bp == "microsoft_word" ||
          bp == "excel_file" ||
          bp == "html" ||
          bp == "pdf"
        ) {
          if (this.$store.state.sales.rawBillingPreferencesData[bp] == true) {
            this.details["document_type"] = bp;
          }
        }
        if (bp == "country") {
          for (let c in this.Country) {
            if (
              this.Country[c]["code"] ==
              this.$store.state.sales.rawBillingPreferencesData[bp]
            ) {
              this.details[bp] = this.Country[c]["name"];
            }
          }
        }
        if (bp == "state") {
          for (let s in this.State) {
            if (
              this.State[s]["code"] ==
              this.$store.state.sales.rawBillingPreferencesData[bp]
            ) {
              this.details[bp] = this.State[s]["name"];
            }
          }
        }
      }
    }
  },
  components: {
    RadioButton,
  },
};
</script>

<style scoped>
.costing_worksheet {
  margin-right: 2.2%;
}
.groupwise_ws {
  margin-right: 2.7%;
}
.subFormHeaders {
  color: #4e5868;
  font-size: 12px;
  font-weight: 700;
}
.radiosText {
  color: #4e5868;
  font-weight: 600;
  font-style: normal;
  font-size: 12px;
}
.checksText {
  color: #4e5868;
  font-weight: 600;
  font-style: normal;
  font-size: 12px;
}
</style>
