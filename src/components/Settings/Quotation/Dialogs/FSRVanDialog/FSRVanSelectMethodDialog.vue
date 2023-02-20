<template>
  <br />
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text required">Customer Type</h5>
      <DropDown
        code="name"
        :data="customer_type"
        label="customer_type"
        v-model="details.customer_type"
        :class="{
          'p-invalid': v$.details.customer_type.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text required">Business Method</h5>
      <DropDown
        code="name"
        :data="business_type"
        label="business_type"
        v-model="details.business_type"
        :class="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text required">Status</h5>
      <DropDown
        code="name"
        :data="status"
        label="status"
        v-model="details.status"
        :class="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text required">Priority</h5>
      <DropDown
        code="name"
        :data="priority"
        label="priority"
        v-model="details.priority"
        :class="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text required">Referred By</h5>
      <DropDown
        label="referred_by"
        v-model="details.referred_by"
        :class="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text required">Referral Person Name</h5>
      <DropDown
        label="referral_person"
        :data="referral_person"
        :state="details.referral_person"
        :key="$store.state.quotation.selectDropDown"
        v-model="details.referral_person"
        :class="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text required">Previously Served By</h5>
      <DropDown
        label="previously_served"
        :data="previously_served"
        :state="details.previously_served"
        :key="$store.state.quotation.selectDropDown"
        v-model="details.previously_served"
        :class="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Sales Commission ($)</h5>
      <TextField
        label="sales_commission"
        type="number"
        v-model="details.sales_commission"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text required">Festival Name</h5>
      <DropDown
        label="festival_name"
        :data="festival_name"
        :state="details.festival_name"
        :key="$store.state.quotation.selectDropDown"
        v-model="details.festival_name"
        :class="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text">Standard Liability($)</h5>
      <TextField
        label="standard_liability"
        type="number"
        v-model="details.standard_liability"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text">Volumetric Value</h5>
      <TextField
        label="volumetric_value"
        type="number"
        v-model="details.volumetric_value"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="field col-12 md:col-12">
    <p class="txt ml-2">Trip Plan</p>
  </div>
  <div class="flex flex-row justify-content-between align-items-center">
    <RadioButtons
      label="platform"
      state="radioButtonCompany"
      v-bind:radioButtonData="SalesDialogCategories"
    />
  </div>
  <div class="field col-12 md:col-12 ml-3">
    <h5 class="dialog-label-text">Package Details</h5>
    <TextAreaField
      label="package_detail"
      type="text"
      v-model="details.package_detail"
      :classes="{
        'inputfield w-full dialog-field-text py-2': true,
      }"
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
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "FSRVanSelectMethodDialog",
  data: () => ({
    v$: useVuelidate(),
    details: {
      customer_type: "",
      business_type: "",
      status: "",
      priority: "",
      referred_by: "",
      referral_person: "",
      previously_served: "",
      sales_commission: "",
      standard_liability: "",
      volumetric_value: "",
    },
    SalesDialogCategories: [
      { name: "Bike", key: "CU" },
      { name: "Van", key: "IU" },
      { name: "FSR", key: "CU" },
      { name: "Project", key: "IU" },
      { name: "Bike+FSR", key: "CU" },
      { name: "Van+FSR", key: "IU" },
      { name: "Bike+Project", key: "CU" },
      { name: "Van+Project", key: "IU" },
      { name: "Inter Company (Bike+Van)", key: "CU" },
    ],
    referral_person: [
      { name: "Jacob", code: "USD" },
      { name: "JJ", code: "SGD" },
    ],
    festival_name: [
      { name: "Deepavali", code: "Deepavali" },
      { name: "Pongal", code: "Pongal" },
    ],
    previously_served: [
      { name: "Abc Company", code: "abc" },
      { name: "EFG", code: " efg" },
    ],

    customer_type: [
      { name: "Express", code: "USD" },
      { name: "Adhoc", code: "SGD" },
    ],
    business_type: [
      { name: "Express", code: "USD" },
      { name: "Adhoc", code: "SGD" },
    ],
    status: [
      { name: "New", code: "USD" },
      { name: "Old", code: "USD" },
    ],
    priority: [
      { name: "High", code: "USD" },
      { name: "Low", code: "USD" },
    ],
    submitted: false,
  }),
  validations() {
    return {
      details: {
        customer_type: { required },
      },
    };
  },
  methods: {
    goBackHandler() {
      this.$store.dispatch("quotation/navigateStepper", {
        step: "FSRVanQuotationDialog",
      });
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.$store.state.quotation.quotationDetails.push(this.details);
        this.$store.dispatch("quotation/navigateStepper", {
          step: "FSRVanTripDetailsDialog",
        });
      }
    },
  },
};
</script>

<style></style>
