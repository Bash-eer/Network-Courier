<template>
  <div>
    <!-- <span class="add-cost-heading ml-2 mt-3">Costing Details</span><br /> -->
    <p class="mt-5 ml-2 add-cost-heading">Costing Details</p>
    <div class="formgrid grid mt-3">
      <div class="field col-12 md:col-4">
        <h5 class="required text-styles">Credit Terms (Days)</h5>
        <TextField
          label="credit_terms"
          type="text"
          v-model="details.costing_details.credit_terms"
          :classes="{
            'p-invalid':
              v$.details.costing_details.credit_terms.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="text-styles">Deposit Amount</h5>
        <TextField
          label="deposit_amount"
          type="number"
          v-model="details.costing_details.deposit_amount"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="text-styles">Interest %</h5>
        <TextField
          label="interest"
          type="number"
          v-model="details.costing_details.interest"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required text-styles">Bill Type</h5>
        <DropDown
          code="name"
          :data="billType"
          label="bill_type"
          :state="details.costing_details.bill_type"
          v-model="details.costing_details.bill_type"
          :class="{
            'p-invalid':
              v$.details.costing_details.bill_type.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="text-styles">Local Customer code</h5>
        <TextField
          label="local_customer_code"
          type="text"
          v-model="details.costing_details.local_customer_code"
        />
      </div>
    </div>
    <span class="add-cost-heading ml-2 mt-1">Name & Address of Banker</span>
    <div class="formgrid grid mt-4">
      <div class="field col-12 md:col-4">
        <h5 class="text-styles">Accountant or officers</h5>
        <TextField
          label="accountant"
          type="text"
          v-model="details.costing_details.accountant"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="text-styles">Bank Name</h5>
        <TextField
          label="bank_name"
          type="text"
          v-model="details.costing_details.bank_name"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="text-styles">Bank No</h5>
        <TextField
          label="bank_no"
          type="number"
          v-model="details.costing_details.bank_no"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>

    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="text-styles">Bank Account No</h5>
        <TextField
          label="bank_account_no"
          type="number"
          v-model="details.costing_details.bank_account_no"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="text-styles">Bank Swift Code</h5>
        <TextField
          label="bank_swift_code"
          type="text"
          v-model="details.costing_details.bank_swift_code"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="text-styles">Bank Address 1</h5>
        <TextAreaField
          label="bank_address_1"
          type="text"
          class="text-900"
          v-model="details.costing_details.bank_address_1"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="text-styles">Bank Address 2</h5>
        <TextAreaField
          label="bank_address_2"
          type="text"
          class="text-900"
          v-model="details.costing_details.bank_address_2"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
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
      <div class="align-self-center flex ml-2">
        <Buttons
          label="Previous"
          v-on:childToParent="goBackHandler"
          class="p-button-outlined mr-1 dialog-button-text previous-btn"
        />
      </div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton
          storePath="salesSales"
          label="Cancel"
          class="color-357dea"
        />
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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SalesInternationalContractFourthStep",
  data: () => ({
    v$: useVuelidate(),
    details: {
      costing_details: {
        credit_terms: "",
        deposit_amount: "",
        interest: "",
        bill_type: "",
        local_customer_code: "",
        accountant: "",
        bank_name: "",
        bank_no: "",
        bank_account_no: "",
        bank_swift_code: "",
        bank_address_1: "",
        bank_address_2: "",
      },
    },
    country: [
      { name: "India", code: "1" },
      { name: "England", code: "2" },
      { name: "Singapore", code: "3" },
    ],
    billType: [
      { name: "Monthly", code: "1" },
      { name: "Weekly", code: "2" },
      { name: "Yearly", code: "3" },
    ],
    submitted: false,
  }),
  validations() {
    return {
      details: {
        costing_details: {
          credit_terms: { required },
          bill_type: { required },
        },
      },
    };
  },
  methods: {
    ...mapActions({
      setCurrentStep: "salesInternationalContract/setCurrentStep",
    }),
    goBackHandler() {
      this.setCurrentStep(3);
      this.$store.dispatch("salesQuotationDialog/navigateStepper", {
        step: "SalesInternationalContractThirdStep",
      });
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.setCurrentStep(5);
        this.$store.state.salesInternationalContract.CreateQuotationContractData.quotation =
          Object.assign(
            this.$store.state.salesInternationalContract
              .CreateQuotationContractData.quotation,
            { costing_details: this.details.costing_details }
          );
        this.$store.dispatch("salesQuotationDialog/navigateStepper", {
          step: "SalesInternationalContractFifthStep",
        });
      }
    },
  },
  created() {
    if (
      this.$store.state.salesInternationalContract?.InternationalRowData?.id
    ) {
      const { InternationalRowData } =
        this.$store.state.salesInternationalContract;

      Object.keys(this.details.costing_details).map((key) => {
        this.details.costing_details[key] =
          this.$store.state.salesInternationalContract.InternationalRowData.international_contract_specifics.costing_details[
            key
          ];
      });
      this.details.costing_details.bill_type =
        InternationalRowData.international_contract_specifics.costing_details.bill_type;
    }
    console.log(
      this.$store.state.salesInternationalContract.CreateQuotationContractData
    );
  },
  // watch: {
  //   details: {
  //     handler() {
  //       this.$store.state.salesInternationalContract.CreateQuotationContractData.quotation =
  //         Object.assign(
  //           this.$store.state.salesInternationalContract
  //             .CreateQuotationContractData.quotation,
  //           { costing_details: this.details.costing_details }
  //         );
  //     },
  //     deep: true,
  //   },
  // },
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
.text-styles {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 28px;
  display: flex;
  align-items: center;

  color: #7a7a7a;
}
</style>
