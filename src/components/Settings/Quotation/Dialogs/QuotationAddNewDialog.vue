<template>
  <div class="formgrid grid">
    <div class="flex justify-content-between mb-5">
      <div class="flex"></div>
      <div class="flex mr-3">
        <div class="flex flex-row">
          <div class="flex">
            <CheckBox
              v-bind:checker="[]"
              v-bind:categories="[
                {
                  name: 'defaultRateCard',
                  key: 'a',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
          </div>
          <div class="flex default_rate_card pt-2">Rebate</div>
        </div>
      </div>
    </div>
  </div>

  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Credit Limit ($)</h5>
      <TextField
        label="credit_limit"
        v-model="details.credit_limit"
        type="number"
        :classes="{
          'p-invalid': v$.details.credit_limit.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Effective From Date</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            class="fleetsCalendar"
            :showIcon="true"
            v-model="details.from_date"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.from_date.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Effective To Date</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            class="fleetsCalendar"
            :showIcon="true"
            v-model="details.to_date"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.from_date.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="field col-12 md:col-12">
    <p class="txt mt-4">Monthly Minimum</p>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Job $</h5>

      <TextField
        label="job"
        type="number"
        v-model="details.job"
        :classes="{
          'p-invalid': v$.details.job.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">No Of Units</h5>
      <TextField
        label="no_of_units"
        type="number"
        v-model="details.no_of_units"
        :classes="{
          'p-invalid': v$.details.no_of_units.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Amount</h5>
      <TextField
        label="amount"
        type="number"
        v-model="details.amount"
        :classes="{
          'p-invalid': v$.details.amount.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Additional Job $</h5>
      <TextField
        label="add_job"
        type="number"
        v-model="details.add_job"
        :classes="{
          'p-invalid': v$.details.add_job.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="field col-12 md:col-12">
    <p class="txt mt-4">Charges</p>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">SMS</h5>
      <TextField
        label="sms"
        type="number"
        v-model="details.sms"
        :classes="{
          'p-invalid': v$.details.sms.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Special Urgent Price $</h5>
      <TextField
        label="special_price"
        type="number"
        v-model="details.special_price"
        :classes="{
          'p-invalid': v$.details.special_price.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">FTZ $</h5>
      <TextField
        label="ftz"
        type="number"
        v-model="details.ftz"
        :classes="{
          'p-invalid': v$.details.ftz.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="flex justify-content-between mb-5">
      <div class="flex"></div>
      <div class="flex mr-3">
        <div class="flex flex-row">
          <div class="flex">
            <CheckBox
              v-bind:checker="[]"
              v-bind:categories="[
                {
                  name: 'defaultRateCard',
                  key: 'a',
                },
              ]"
              v-on:childToParent="checkBoxChange"
            />
          </div>
          <div class="flex default_rate_card pt-2">Std Entries</div>
          <i class="pi pi-arrow-left"></i>
        </div>
      </div>
    </div>
  </div>
  <div class="field col-12 md:col-12">
    <h5 class="dialog-label-text">Remarks</h5>
    <TextAreaField
      label="remarks"
      type="text"
      v-model="details.remarks"
      :classes="{
        'inputfield w-full dialog-field-text py-2': true,
      }"
    />
  </div>
  <div class="mt-3">
    <div
      class="
        flex
        justify-content-between
        w-full
        align-content-start
        py-3
        flex-wrap
      "
    >
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton storePath="quotation" />
        <Buttons
          label="Save"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "QuotationAddNewDialog",
  data: () => ({
    v$: useVuelidate(),
    details: {
      credit_limit: "",
      from_date: "",
      to_date: "",
      job: "",
      no_of_units: "",
      amount: "",
      add_job: "",
      sms: "",
      special_price: "",
      ftz: "",
      remarks: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        credit_limit: { required },
        from_date: { required },
        to_date: { required },
        job: { required },
        no_of_units: { required },
        amount: { required },
        add_job: { required },
        sms: { required },
        special_price: { required },
        ftz: { required },
      },
    };
  },
  methods: {
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        console.log(this.details);
        //
      }
    },
  },
};
</script>

<style>
</style>