<template>
  <div>
  <span class="add-cost-heading">Costing Details</span>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Credit Terms (Days)</h5>
      <TextField
        label="credit_terms"
        type="text"
        v-model="details.credit_terms"
        :classes="{
          'p-invalid': v$.details.credit_terms.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Deposit Amount </h5>
      <TextField
        label="deposit_amount"
        type="number"
        v-model="details.deposit_amount"
        :classes="{
          'p-invalid': v$.details.deposit_amount.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Interest %  </h5>
      <TextField
        label="interest"
        type="number"
        v-model="details.interest"
        :classes="{
          'p-invalid': v$.details.interest.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Bill Type</h5>
      <DropDown
        code="name"
        :data="billType"
        label="bill_type"
        v-model="details.bill_type"
        :class="{
          'p-invalid': v$.details.bill_type.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Local Customer code</h5>
      <TextField
        label="customer_code"
        type="text"
        v-model="details.customer_code"
        :classes="{
          'p-invalid': v$.details.customer_code.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Accountant or officers</h5>
      <TextField
        label="accountant"
        type="number"
        v-model="details.accountant"
        :classes="{
          'p-invalid': v$.details.accountant.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Bank Name </h5>
      <TextField
        label="bank_name"
        type="text"
        v-model="details.bank_name"
        :classes="{
          'p-invalid': v$.details.bank_name.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Bank No</h5>
      <TextField
        label="bank_no"
        type="number"
        v-model="details.bank_no"
        :classes="{
          'p-invalid': v$.details.bank_no.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <span class="add-cost-heading">Name & Address of Banker</span>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Bank Account No </h5>
      <TextField
        label="bank_account_no"
        type="number"
        v-model="details.bank_account_no"
        :classes="{
          'p-invalid': v$.details.bank_account_no.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Bank Swift Code </h5>
      <TextField
        label="bank_swift_code"
        type="text"
        v-model="details.bank_swift_code"
        :classes="{
          'p-invalid': v$.details.bank_swift_code.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Bank Address 1</h5>
      <TextAreaField
        label="address_1"
        type="text"
        v-model="details.address_1"
        :classes="{
          'p-invalid': v$.details.address_1.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Bank Address 2</h5>
      <TextAreaField
        label="address_2"
        type="text"
        v-model="details.address_2"
        :classes="{
          'p-invalid': v$.details.address_2.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="flex mb-2">
    <span class="new-field mt-0"><b>+ Add Contact </b></span>
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
    <div class="align-self-center flex ml-2">
      <Buttons
        label="Previous"
        v-on:childToParent="goBackHandler"
        class="p-button-outlined mr-1 dialog-button-text previous-btn"
      />
    </div>
    <div class="flex align-self-center justify-content-end">
     <CancelButton storePath="salesSales" />
      <Buttons
        label="Next"
        button_class="dialog-button-text"
        v-on:childToParent="nextStepHandler"
      />
    </div>
  </div>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "SalesInternationalCostCenter",
  data: () => ({
    v$: useVuelidate(),
    details: {
      credit_terms: "",
      deposit_amount:"",
      interest: "",
      bill_type: "",
      customer_code: "",
      accountant: "",
      bank_name: "",
      bank_no: "",
      bank_account_no: "",
      bank_swift_code: "",
      address_1: "",
      address_2: "",
    },
    country: [
      { name: "India", code: "USD" },
      { name: "England", code: "SGD" },
      { name: "Singapore", code: "SGD" },
    ],
    billType: [
      { name: "Monthly", code: "USD" },
      { name: "Weekly", code: "SGD" },
      { name: "Yearly", code: "SGD" },
    ],
    submitted: false,
  }),
  validations() {
    return {
      details: {
        credit_terms: { required },
        deposit_amount:{ required},
        interest: { required },
        bill_type: { required },
        customer_code: { required },
        accountant: { required },
        bank_name: { required },
        bank_no: { required },
        bank_account_no: { required },
        bank_swift_code: { required },
        address_1: { required },
        address_2: { required },
      },
    };
  },
  methods: {
    goBackHandler() {
      this.$store.dispatch("quotation/navigateStepper", {
        step: "SalesInternationalServiceProvider",
      });
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.$store.state.quotation.quotationDetails.push(this.details);
        console.log(this.$store.state.quotation.quotationDetails);
        this.$store.dispatch("quotation/navigateStepper", {
          step: "salesInternationalSendQuotations",
        });
      }
    },
  },
};
</script>
<style scoped>
.add-cost-heading {
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  color: #343434;
}
.required {
  color: #7a7a7a;
}
.required:after {
  content: "*";
  color: red;
}
.pi-chevron-down {
  position: absolute !important;
  right: 10px !important;
}
select {
  background-color: transparent !important;
  border: none !important;
  line-height: 0%;
  outline: 0px !important;
  box-shadow: none !important;
}
</style>