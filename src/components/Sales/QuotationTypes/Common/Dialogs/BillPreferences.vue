<template>
  <!-- <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required color-7a7a7a text-sm">Enter the Billing Address</h5>
      <TextField
        label="name_of_the_profile"
        type="text"
        v-model="details.billing_address"
        @blur="v$.details.billing_address.$model;"
        :classes="{
          'p-invalid': v$.details.billing_address.$invalid && submitted,
          'inputfield w-full text-900 font-bold py-2': true,
        }"
      />
    </div>
  </div> -->
  <AddressArea
    :key="renderKey"
    :default="details"
    :submitted="submitted"
    @getAddress="setAddress"
  />
  <!-- <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required color-7a7a7a text-sm">Postal Code</h5>
      <TextField
        label="postalCode"
        type="number"
        v-model="details.postal_code"
        @blur="v$.details.postal_code.$model;"
        :classes="{
          'p-invalid': v$.details.postal_code.$invalid && submitted,
          'inputfield w-fulltext-900 font-bold py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required color-7a7a7a text-sm">Country</h5>
     
      <DropDown
        :data="allCountries"
        :state="details.country"
        :filter="true"
        label="country"
        id="country"
        code="name"
        modelValue="isoCode"
        v-model="details.country"
        @blur="v$.details.country.$model;"
        :classes="{
          'p-invalid': v$.details.country.$invalid && submitted,
          'inputfield w-full text-900 font-bold-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="color-7a7a7a text-sm">State</h5>
      <DropDown
        :data="states"
        :state="details.state"
        :filter="true"
        label="state"
        id="state"
        code="name"
        v-model="details.state"
        :value="details.state"
        :classes="{
          'inputfield w-full text-900 font-bold ': true,
        }"
      />
    </div>
  </div> -->
  <!-- <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="color-7a7a7a text-sm">Building Name</h5>
      <TextField
        label="building_name"
        v-model="details.building_name"
        :classes="{
          'inputfield w-full text-900 font-bold ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="color-7a7a7a text-sm">Floor No</h5>
      <TextField
        label="floorNo"
        v-model="details.floor_no"
        :classes="{
          'inputfield w-full text-900 font-bold ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="color-7a7a7a text-sm">Unit No</h5>
      <TextField
        label="unitNo"
        v-model="details.unit_no"
        :classes="{
          'inputfield w-full text-900 font-bold ': true,
        }"
      />
    </div>
  </div> -->
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <label class="required color-7a7a7a text-sm" for="Email ID">Email</label>
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
          'dialog-label-text text-900 font-bold': true,
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
    <div class="field col-12 md:col-4">
      <h5 class="required color-7a7a7a text-sm mt-2">Contact Name</h5>
      <TextField
        v-model="details.contact_name"
        label="contact_name"
        :classes="{
          'p-invalid': v$.details.contact_name.$invalid && submitted,
          'inputfield p-inputtext-sm  w-full text-900 font-bold': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required color-7a7a7a text-sm mt-2">Contact No.</h5>
      <TextField
        v-model="details.contact_no"
        label="contact_no"
        :classes="{
          'p-invalid': v$.details.contact_no.$invalid && submitted,
          'inputfield p-inputtext-sm  w-full text-900 font-bold': true,
        }"
      />
    </div>
  </div>
  <div class="flex mt-2">
    <div class="flex flex-row mx-2 acknowledgement-check">
      <div class="flex">
        <CheckBox
          path="fleets"
          class="add-billing-content"
          v-bind:checker="
            details.call_center == true
              ? [
                  {
                    name: 'Cost Center',
                    tag: 'call_center',
                    key: 'Call Center',
                  },
                ]
              : []
          "
          v-bind:categories="[
            {
              name: 'Cost Center',
              tag: 'call_center',
              key: 'Call Center',
            },
          ]"
          v-on:childToParent="checkBoxChange"
        />
      </div>
    </div>
  </div>
  <p class="ml-2 mt-3 subFormHeaders">Invoice Notification</p>
  <div class="flex flex-row">
    <div class="flex">
      <CheckBox
        path="sales"
        v-bind:checker="
          details.notify_by_email == true
            ? [
                {
                  name: 'By Email',
                  tag: 'notify_by_email',
                  key: 'em',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'By Email',
            tag: 'notify_by_email',
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
          details.notify_by_sms == true
            ? [
                {
                  name: 'By SMS',
                  tag: 'notify_by_sms',
                  key: 'bs',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'By SMS',
            tag: 'notify_by_sms',
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
          details.notify_by_post == true
            ? [
                {
                  name: 'By Post',
                  tag: 'notify_by_post',
                  key: 'bp',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'By Post',
            tag: 'notify_by_post',
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
          details.caller_costing_worksheet == true
            ? [
                {
                  name: 'Caller Costing Worksheet',
                  tag: 'caller_costing_worksheet',
                  key: 'ccw',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'Caller Costing Worksheet',
            tag: 'caller_costing_worksheet',
            key: 'ccw',
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
                  key: 'jdr',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'Job Detail Report  (can view this report online only)',
            tag: 'job_detail_report',
            key: 'jdr',
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
      <label class="radiosText ml-2" for="pdf">PDF</label>
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
      <CancelButton storePath="salesCommon" label="Cancel" />
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
import { required, email } from "@vuelidate/validators";
import RadioButton from "primevue/radiobutton";
import {
  //City,
  Country,
  State,
} from "country-state-city";
export default {
  name: "BillingPreferencesDialog",
  data: () => ({
    statesWatcher: null,
    allCountries: Country.getAllCountries(),
    allStates: State.getAllStates(),
    renderKey: 1,
    // allCities: City.getAllCities(),
    states: null,
    cities: null,
    CountryCode: null,
    StateCode: null,
    v$: useVuelidate(),
    Country: [
      { name: "Country1", code: "C1" },
      { name: "Country2", code: "C2" },
    ],
    State: [
      { name: "State1", code: "C1" },
      { name: "State2", code: "C2" },
    ],
    details: {
      billing_address: "",
      postal_code: "",
      country: "",
      state: "",
      building_name: "",
      floor_no: "",
      unit_no: "",
      email: "",
      contact_no: "",
      contact_name: "",
      call_center: false,
      notify_by_email: false,
      notify_by_sms: false,
      notify_by_post: false,
      costing_work_sheet: false,
      groupwise_costing_work_sheet: false,
      for_less_than_min_qty: false,
      detailed_job_summary: false,
      groupwise_detailed_job_summary: false,
      caller_costing_worksheet: false,
      job_detail_report: false,
      document_type: "",
      rich_text_format: false,
      microsoft_word: false,
      excel_file: false,
      html: false,
      pdf: false,
      view_attachment_online: false,
      quotation_id: 7,
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        billing_address: { required },
        postal_code: { required },
        country: { required },
        email: { required, email },
        contact_no: { required },
        contact_name: { required },
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
    countryFunction(countryCode) {
      this.states = [];
      for (var state of this.allStates) {
        if (state.countryCode == countryCode) {
          this.states.push(state);
        }
      }
      if (this.states.length == 0) {
        this.states.push({ name: "none", isoCode: "NAN" });
      }
    },
    filterStatesByCountryName(country) {
      for (let c in this.allCountries) {
        if (this.allCountries[c].name == country) {
          this.statesWatcher = this.allCountries[c]["isoCode"];
        }
      }
    },
    setAddress(e) {
      this.details.billing_address = e.address;
      this.details.postal_code = e.postal_code;
      this.details.state = e.state;
      this.details.building_name = e.building_name;
      this.details.floor_no = e.floor_no;
      this.details.unit_no = e.unit_no;
      this.details.country = e.country;
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        // console.log(this.details, "details");
        // for (let d in this.details) {
        //   if (d == "document_type") {
        //     this.details[this.details[d]] = true;
        //   }
        //   if (d != this.details["document_type"]) {
        //     if (
        //       this.details[d] == "microsoft_word" ||
        //       this.details[d] == "html" ||
        //       this.details[d] == "pdf" ||
        //       this.details[d] == "rich_text_format" ||
        //       this.details[d] == "excel_file"
        //     ) {
        //       this.details[this.details[d]] = false;
        //     }
        //   }
        // }
        let arr = [
          "microsoft_word",
          "html",
          "pdf",
          "rich_text_format",
          "excel_file",
        ];
        arr.map((itm) => {
          if (itm == this.details.document_type) {
            this.details[itm] = true;
          } else {
            this.details[itm] = false;
          }
        });
        // this.details.quotation_id = this.$route.params.id;
        if (this.$route.params.type == "contract") {
          this.details.contract_id = this.$route.params.id;
        } else {
          this.details.quotation_id = this.$route.params.id;
        }
        if (this.$store.state.salesCommon.BillPreferenceData.length > 0) {
          if (this.$store.state.salesCommon.BillPreferenceData[0].id) {
            this.apiCallHandler(
              "PUT",
              "/sales/" +
                this.$route.params.type +
                "/billing-preferences/" +
                //this.$store.state.salesCommon.BillPreferenceData[0].id,
                this.$route.params.id,
              "updated"
            );
          }
        } else {
          this.apiCallHandler(
            "POST",
            "/sales/" + this.$route.params.type + "/billing-preferences",
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
        data: this.details,
        type: this.$route.params.type,
        toastData: {
          toastSuccessData: {
            toastMsg: `The Bill Preference has been ${txt} successfully!`,
            toastSeverity: "info",
          },

          toastCommonErrorData: {
            toastMsg: "",

            toastSeverity: "error",
          },
        },
        loadData: "loadBillPreferenceData",
      });
    },
  },
  created() {
    let incomingData = this.$store.state.salesCommon.BillPreferenceData[0];
    if (incomingData != null) {
      for (var state in this.details) {
        this.details[state] = incomingData[state];

        for (var bp in incomingData.attachment_formats) {
          if (incomingData.attachment_formats[bp] == true) {
            this.details["document_type"] = bp;
            // console.log(bp, "incomingattchmentformat");
          }
        }
        for (var attachment in incomingData.invoice_attachments) {
          this.details[attachment] =
            incomingData.invoice_attachments[attachment];
        }

        for (var notification in incomingData.invoice_notifications) {
          this.details[notification] =
            incomingData.invoice_notifications[notification];
        }
        for (var format in incomingData.attachment_formats) {
          this.details[format] = incomingData.attachment_formats[format];
        }
      }
      let Incomingcountry = incomingData.country;

      for (let c in this.allCountries) {
        if (this.allCountries[c].name == Incomingcountry) {
          this.details.country = this.allCountries[c].name;
        }
      }
    }
    this.renderKey++;
  },
  // watch: {
  //   "details.document_type": function () {
  //     console.log(this.details["document_type"], "docu");
  //     console.log(this.details, "details");
  //   },
  // },
  watch: {
    "details.country": function () {
      console.log(this.details.country, "watch country");
      if (this.details.country != null) {
        // if (this.details.country.length == 2) {
        let respectiveData = this.allCountries.find(
          (item) => item.name == this.details.country
        );
        console.log(respectiveData);
        this.countryFunction(respectiveData?.isoCode);
        // }
      }
    },
    // "details.state": function () {
    //   this.stateFunction();
    // },
    statesWatcher: function () {
      this.countryFunction(this.statesWatcher);
    },
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
  color: #343434;
  font-size: 12px;
  font-weight: 700;
}
.radiosText {
  color: #343434;
  font-weight: 600;
  font-style: normal;
  font-size: 12px;
}
::v-deep .checksText {
  color: #343434 !important;
  font-weight: 600;
  font-style: normal;
  font-size: 12px;
}
</style>
