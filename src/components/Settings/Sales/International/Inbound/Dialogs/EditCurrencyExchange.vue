<template>
    <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text"> From Date</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            class="fleetsCalendar"
            v-model="details.from_date"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.from_date.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
    </div>
     <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">To Date</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            class="fleetsCalendar"
            v-model="details.to_date"
            :showIcon="true"
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
    <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Parent Currency</h5>
      <DropDown
        :state="details.parent_currency"
        code="code"
        :data="parent_currency"
        label="parent_currency"
        v-model="details.parent_currency"
        :value="details.parent_currency"
        :classes="{
          'p-invalid': v$.details.parent_currency.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
        <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Current Currency</h5>
      <DropDown
        :state="details.convert_currency"
        code="code"
        :data="convert_currency"
        label="convert_currency"
        v-model="details.convert_currency"
        :value="details.convert_currency"
        :classes="{
          'p-invalid': v$.details.convert_currency.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text required">Buying Rate S$ </h5>
        <TextField
          type="number"
          v-model="details.buying_rate"
          :classes="{
            'p-invalid':
              v$.details.buying_rate
                .$invalid && submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
            <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text required">Selling Rate S$ </h5>
        <TextField
          type="number"
          v-model="details.selling_rate"
          :classes="{
            'p-invalid':
              v$.details.selling_rate
                .$invalid && submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
            <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text required">Units </h5>
        <TextField
          type="number"
          v-model="details.unit"
          :classes="{
            'p-invalid':
              v$.details.unit
                .$invalid && submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
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
      <div class="align-self-center flex">
      </div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton storePath="internationalInbound" />
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
 name:"EditCurrencyExchangeDialog",
 data: ()=> ({
   date: null,
   v$: useVuelidate(),
    parent_currency: [
      { name: "USD - United States Dollar", code: "USD" },
      { name: "SGD - Singapore Dollar", code: "SGD" },
    ],
    convert_currency: [
      { name: "USD - United States Dollar", code: "USD" },
      { name: "SGD - Singapore Dollar", code: "SGD" },
    ],
   details:{
   from_Date:"",
   to_date:"",
   parent_currency:"",
   convert_currency:"",
   buying_rate:"",
   selling_rate:"",
   unit:"",

   },
    submitted: false,
 }),
   validations() {
    return {
      details: {
        from_date: { required },
        to_date: { required },
        vendor:{required},
        parent_currency:{required},
        convert_currency:{required},
        buying_rate:{required},
        selling_rate:{required},
        unit:{required}
      },
    };
  },
 methods: {
 submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        //
      }
    },
 }

}
</script>

<style scoped>
.add-new-rate-background{
    background-color: #357DEA;
}
</style>