<template>
<div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="required dialog-label-text">Enter the Billing Address</h5>
        <TextField
          v-model="details.address"
          label="adjustment_job"
          type="text"
          :classes="{
              'p-invalid': v$.details.address.$invalid && submitted,
              'inputfield p-inputtext-sm  w-full dialog-field-text': true,
            }"      />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Postal Code </h5>
        <TextField
          v-model="details.postal_code"
          label="postal_code"
          type="number"
          :classes="{
              'p-invalid': v$.details.postal_code.$invalid && submitted,
              'inputfield p-inputtext-sm  w-full dialog-field-text': true,
            }"      />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Country </h5>
        <TextField
          v-model="details.country"
          label="country"
          :classes="{
              'p-invalid': v$.details.country.$invalid && submitted,
              'inputfield p-inputtext-sm  w-full dialog-field-text': true,
            }"      />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">State </h5>
        <TextField
          v-model="details.state"
          label="state"
          :classes="{
              'p-invalid': v$.details.state.$invalid && submitted,
              'inputfield p-inputtext-sm  w-full dialog-field-text': true,
            }"      />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Building Name </h5>
        <TextField
          v-model="details.building_name"
          label="postal_code"
          :classes="{
              'p-invalid': v$.details.building_name.$invalid && submitted,
              'inputfield p-inputtext-sm  w-full dialog-field-text': true,
            }"      />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Floor No  </h5>
        <TextField
          v-model="details.floor_no"
          label="country"
          :classes="{
              'p-invalid': v$.details.floor_no.$invalid && submitted,
              'inputfield p-inputtext-sm  w-full dialog-field-text': true,
            }"      />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Unit No </h5>
        <TextField
          v-model="details.unit_no"
          label="state"
          :classes="{
              'p-invalid': v$.details.unit_no.$invalid && submitted,
              'inputfield p-inputtext-sm  w-full dialog-field-text': true,
            }"      />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
         <label class="required dialog-label-text" for="Email ID">Email ID</label>
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
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Contact No </h5>
        <TextField
          v-model="details.contact_no"
          label="contact_no"
          :classes="{
              'p-invalid': v$.details.contact_no.$invalid && submitted,
              'inputfield p-inputtext-sm  w-full dialog-field-text': true,
            }"      />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="required dialog-label-text">Remarks</h5>
        <TextAreaField
          :state="details.remarks"
          label="remarks"
          v-model="details.remarks"
          @blur="v$.details.remarks.$model;"
          :classes="{
            'p-invalid': v$.details.remarks.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>
    <br/>
    <div class="flex mt-2">
        <div class="flex flex-row acknowledgement-check">
          <div class="flex">
            <CheckBox
              path="fleets"
              class="add-billing-checkText"
              v-bind:checker="
                details.acknowledgement == true
                  ? [
                      {
                        name: 'Call Center',
                        tag: 'Call Center',
                        key: 'Call Center',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'Call Center',
                  tag: 'Call Center',
                  key: 'Call Center',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
          </div>
        </div>
      </div>
      <br/>
      <span class="add-billing-heading">Invoice Notification</span>
      <div class="flex mt-2">
        <div class="flex flex-row acknowledgement-check">
          <div class="flex flex-row acknowledgement-row">
            <CheckBox
              path="fleets"
              class="add-billing-checkText"
              v-bind:checker="
                details.acknowledgement == true
                  ? [
                      {
                        name: 'By Email',
                        tag: 'By Email',
                        key: 'By Email',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'By Email',
                  tag: 'By Email',
                  key: 'By Email',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
            <CheckBox
              path="fleets"
              class="add-billing-checkText"
              v-bind:checker="
                details.acknowledgement == true
                  ? [
                      {
                        name: 'By SMS',
                        tag: 'By SMS',
                        key: 'By SMS',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'By SMS',
                  tag: 'By SMS',
                  key: 'By SMS',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
            <CheckBox
              path="fleets"
              class="add-billing-checkText"
              v-bind:checker="
                details.acknowledgement == true
                  ? [
                      {
                        name: 'By Post',
                        tag: 'By Post',
                        key: 'By Post',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'By Post',
                  tag: 'By Post',
                  key: 'By Post',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
          </div>
        </div>
      </div>
      <br/>
      <span class="add-billing-heading">Invoice Attachments</span>
      <div class="flex mt-2">
        <div class="flex flex-row acknowledgement-check">
          <div class="flex flex-row acknowledgement-row">
            <CheckBox
              path="fleets"
              class="add-billing-checkText"
              v-bind:checker="
                details.acknowledgement == true
                  ? [
                      {
                        name: 'Costing Work Sheet',
                        tag: 'Costing Work Sheet',
                        key: 'Costing Work Sheet',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'Costing Work Sheet',
                  tag: 'Costing Work Sheet',
                  key: 'Costing Work Sheet',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
            <CheckBox
              path="fleets"
              class="add-billing-checkText"
              v-bind:checker="
                details.acknowledgement == true
                  ? [
                      {
                        name: 'Groupwise Costing Work Sheet',
                        tag: 'Groupwise Costing Work Sheet',
                        key: 'Groupwise Costing Work Sheet',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'Groupwise Costing Work Sheet',
                  tag: 'Groupwise Costing Work Sheet',
                  key: 'Groupwise Costing Work Sheet',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
            <CheckBox
              path="fleets"
              class="add-billing-checkText"
              v-bind:checker="
                details.acknowledgement == true
                  ? [
                      {
                        name: 'For less than Min Qty Also',
                        tag: 'For less than Min Qty Also',
                        key: 'For less than Min Qty Also',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'For less than Min Qty Also',
                  tag: 'For less than Min Qty Also',
                  key: 'For less than Min Qty Also',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
          </div>
        </div>
      </div>
      <br/>
      <div class="flex mt-2">
        <div class="flex flex-row acknowledgement-check">
          <div class="flex flex-row acknowledgement-row">
            <CheckBox
              path="fleets"
              class="add-billing-checkText"
              v-bind:checker="
                details.acknowledgement == true
                  ? [
                      {
                        name: 'Detailed Job Summary',
                        tag: 'Detailed Job Summary',
                        key: 'Detailed Job Summary',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'Detailed Job Summary',
                  tag: 'Detailed Job Summary',
                  key: 'Detailed Job Summary',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
            <CheckBox
              path="fleets"
              class="add-billing-checkText"
              v-bind:checker="
                details.acknowledgement == true
                  ? [
                      {
                        name: 'GroupWise Detailed Job Summary',
                        tag: 'GroupWise Detailed Job Summary',
                        key: 'GroupWise Detailed Job Summary',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'GroupWise Detailed Job Summary',
                  tag: 'GroupWise Detailed Job Summary',
                  key: 'GroupWise Detailed Job Summary',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
            <CheckBox
              path="fleets"
              class="add-billing-checkText"
              v-bind:checker="
                details.acknowledgement == true
                  ? [
                      {
                        name: 'Caller Costing Worksheet',
                        tag: 'Caller Costing Worksheet',
                        key: 'Caller Costing Worksheet',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'Caller Costing Worksheet',
                  tag: 'Caller Costing Worksheet',
                  key: 'Caller Costing Worksheet',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
          </div>
        </div>
      </div>
      <br/>
      <div class="flex mt-2">
        <div class="flex flex-row acknowledgement-check">
          <div class="flex flex-row acknowledgement-row">
            <CheckBox
              path="fleets"
              class="add-billing-checkText"
              v-bind:checker="
                details.acknowledgement == true
                  ? [
                      {
                        name: 'Job Detail Report  (can view this report online only)',
                        tag: 'Job Detail Report  (can view this report online only)',
                        key: 'Job Detail Report  (can view this report online only)',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'Job Detail Report  (can view this report online only)',
                  tag: 'Job Detail Report  (can view this report online only)',
                  key: 'Job Detail Report  (can view this report online only)',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
          </div>
        </div>
      </div>
      <br/>
      <span class="add-billing-heading">Attachment Format</span>
        <div class="flex flex-row mt-2 add-billing-content">
            <div class="flex mr-3" v-for="(radio, index) in callTypeData" :key="index">
            <div class="flex flex-row">
                <div class="flex mr-1">
                <RadioButton
                    :id="radio.tag"
                    :name="radio.tag"
                    :value="radio.tag"
                    v-model="details.call_type"
                />
                </div>
                <div class="flex">{{ radio.label }}</div>
            </div>
            </div>
        </div>
        <div class="flex mt-2">
        <div class="flex flex-row acknowledgement-check">
          <div class="flex flex-row acknowledgement-row">
            <CheckBox
              path="fleets"
              class="add-billing-checkText"
              v-bind:checker="
                details.acknowledgement == true
                  ? [
                      {
                        name: 'View Attachments Online',
                        tag: 'View Attachments Online',
                        key: 'View Attachments Online',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'View Attachments Online',
                  tag: 'View Attachments Online',
                  key: 'View Attachments Online',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
          </div>
        </div>
      </div>
      <br/>
    <div class="flex align-self-center justify-content-end">
      <CancelButton storePath="salesSales" />
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
export default {
  name: "AdjustmentAddUser",
  components: {
    RadioButton,
  },
  data: () => ({
    maintenanceAttachmentsState: " ",
    v$: useVuelidate(),
    details: {
      address:"",
      postal_code: "",
      country: "",
      state: "",
      building_name:"",
      floor_no:"",
      unit_no:"",
      email:"",
      contact_no:"",
      acknowledgement: false,
      remarks: "",
      to_date_time:""
    },
    callTypeData: [
        { label: "Rich Text Format", tag: "RichTextFormat" },
        { label: "Microsoft Word", tag: "Microsoft-Word" },
        { label: "Excel File", tag: "Excel-File" },
        { label: "HTML", tag: "HTML" },
        { label: "PDF", tag: "PDF" },
        
      ],
    submitted: false,
  }),
 validations() {
    return {
      details: {
        address:{ required },
        postal_code: { required },
        country: { required },
        state: { required },
        building_name: { required },
        unit_no:{ required },
        floor_no:{ required },
        email: { required, email },
        contact_no:{ required},
        remarks: { required },
        to_date_time:{ required}
      },
      
    };
  },
  methods: {
     submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      console.log('details',this.details);
     },
     checkBoxChange(val, src) {
      if (val.length != 0) {
        this.details[val[0].tag] = true;
      }
      if (val.length == 0) {
        this.details[src[0].tag] = false;
      }
    },
  }
};
</script>
<style scoped>
.p-multiselect.p-multiselect-chip .p-multiselect-token{
font-size: 12px;
font-weight: 600;
}
.add-billing-heading {
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  color: #4E5868;
}
.add-billing-checkText {
color: #343434 !important;
}
.add-billing-content{
    font-style: normal !important;
    font-weight: bold !important;
    font-size: 11px !important;
    color: #343434 !important;
}
.acknowledgement-row{
    gap:4rem;
}
</style>



