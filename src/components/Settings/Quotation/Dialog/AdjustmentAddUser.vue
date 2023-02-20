<template>
<div>
  <div class="formgird grid">
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Effective Date </h5>
        <div clas="flex">
          <div class="whiteDiv calendarDiv">
            <Calendar
              :showTime="true"
              :showSeconds="true"
              dateFormat="d MM yy"
              class="fleetsCalendar"
              v-model="details.to_date_time"
              :showIcon="true"
              style="width: 100%"
              :monthNavigator="true"
              :yearNavigator="true"
              yearRange="1950:2050"
              :class="{
                'p-invalid': v$.details.to_date_time.$invalid && submitted,
                'inputfield w-full dialog-dropdown-text ': true,
              }"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row mt-2">
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
    <br/>
    <div class="formgrid grid">
      <div class="field col-12 md:col-3">
        <h5 class="required dialog-label-text">Job $ </h5>
        <TextField
          v-model="details.adjustment_job"
          label="adjustment_job"
          type="number"
          :classes="{
              'p-invalid': v$.details.adjustment_job.$invalid && submitted,
              'inputfield p-inputtext-sm  w-full dialog-field-text': true,
            }"      />
      </div>
      <div class="field col-12 md:col-3">
        <h5 class="required dialog-label-text">No. of Units </h5>
        <TextField
          v-model="details.NoOfUnits"
          label="NoOfUnits"
          type="number"
          :classes="{
              'p-invalid': v$.details.NoOfUnits.$invalid && submitted,
              'inputfield p-inputtext-sm  w-full dialog-field-text': true,
            }"      />
      </div>
      <div class="field col-12 md:col-3">
        <h5 class="required dialog-label-text">Amount </h5>
        <TextField
          v-model="details.adjustment_amount"
          label="adjustment_amount"
          type="number"
          :classes="{
              'p-invalid': v$.details.adjustment_amount.$invalid && submitted,
              'inputfield p-inputtext-sm  w-full dialog-field-text': true,
            }"      />
      </div>
      <div class="field col-12 md:col-3">
        <h5 class="required dialog-label-text">Additional Job $ </h5>
        <TextField
          v-model="details.additional_job"
          label="additional_job"
          type="number"
          :classes="{
              'p-invalid': v$.details.additional_job.$invalid && submitted,
              'inputfield p-inputtext-sm  w-full dialog-field-text': true,
            }"
        />
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
    <div class="flex mt-2">
        <div class="flex flex-row acknowledgement-check">
          <div class="flex">
            <CheckBox
              path="fleets"
              class="checksText"
              v-model="details.checked"
              v-bind:checker="
                details.acknowledgement == true
                  ? [
                      {
                        name: 'Acknowledgement',
                        tag: 'acknowledgement',
                        key: 'acknowledgement',
                      },
                    ]
                  : []
              "
              v-bind:categories="[
                {
                  name: 'Acknowledgement',
                  tag: 'acknowledgement',
                  key: 'acknowledgement',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
          </div>
        </div>
      </div>
    <div>
      <DragAndDropUpload
        :state="maintenanceAttachmentsState"
        type="vehicleCommons"
        storePath="fleets"
      />
    </div>
    <div class="flex align-self-center justify-content-end">
      <CancelButton storePath="quotation" />
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
  name: "AdjustmentAddUser",
  components: {
    RadioButton,
  },
  data: () => ({
    maintenanceAttachmentsState: " ",
    v$: useVuelidate(),
    details: {
      adjustment_job: "",
      NoOfUnits: "",
      adjustment_amount: "",
      additional_job:"",
      acknowledgement: false,
      remarks: "",
      to_date_time:""
      
    },
    callTypeData: [
        { label: "Normal", tag: "Normal" },
        { label: "E-Commerce", tag: "E-Commerce" },
        
      ],
    submitted: false,
  }),
 validations() {
    return {
      details: {
        adjustment_job: { required },
        NoOfUnits: { required },
        adjustment_amount: { required },
        additional_job: { required },
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
</style>



