<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Customer Type</h5>
      <DropDown
        :state="details.customer_type"
        code="code"
        :data="customerType"
        label="customer_type"
        v-model="details.customer_type"
        :classes="{
          'p-invalid': v$.details.customer_type.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Business Method</h5>
      <DropDown
        :state="details.business_method"
        code="code"
        :data="businessType"
        label="business_method"
        v-model="details.business_method"
        :classes="{
          'p-invalid': v$.details.business_method.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Status</h5>
      <DropDown
        :state="details.status"
        code="code"
        :data="status"
        label="status"
        v-model="details.status"
        :classes="{
          'p-invalid': v$.details.status.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Priority</h5>
      <DropDown
        :state="details.priority"
        code="code"
        :data="Priority"
        label="priority"
        v-model="details.priority"
        :classes="{
          'p-invalid': v$.details.priority.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text">Referred By</h5>
      <DropDown
        :state="details.referred_by"
        code="code"
        :data="Referred"
        label="referred_by"
        v-model="details.referred_by"
        :classes="{
          'p-invalid': v$.details.referred_by.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text">Referral Person Name</h5>
      <DropDown
        :state="details.referral_person_name"
        code="code"
        :data="Referral"
        label="referral_person_name"
        v-model="details.referral_person_name"
        :classes="{
          'p-invalid': v$.details.referral_person_name.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Perviously Served By</h5>
      <DropDown
        :state="details.previously_served_by"
        code="code"
        :data="Perviously"
        label="previously_served_by"
        v-model="details.previously_served_by"
        :classes="{
          'p-invalid': v$.details.previously_served_by.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text">Sales Commission ($)</h5>
      <TextField
        label="sales_comission"
        type="number"
        v-model="details.sales_comission"
        :classes="{
          'p-invalid': v$.details.sales_comission.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Festival Name</h5>
      <DropDown
        :state="details.fastival_name"
        code="code"
        :data="fastival_name"
        label="fastival_name"
        v-model="details.fastival_name"
        :classes="{
          'p-invalid': v$.details.fastival_name.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text">Standard Liability ($)</h5>
      <TextField
        label="standard_liability"
        type="number"
        v-model="details.standard_liability"
        :classes="{
          'p-invalid': v$.details.standard_liability.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text">Volumetric Value</h5>
      <TextField
        label="volumetric_value"
        type="number"
        v-model="details.volumetric_value"
        :classes="{
          'p-invalid': v$.details.volumetric_value.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
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
  name: "SelectMethodInternationalCenter",
  data: () => ({
    businessType: [
      { name: "Agent", code: "AG" },
      { name: "Adhoc", code: "AD" },
      { name: "Contract", code: "CT" },
    ],
    customerType: [
      { name: "Express", code: "EX" },
      { name: "International", code: "IN" },
      { name: "Rapido", code: "RP" },
    ],
    Priority: [
      { name: "High", code: "H1" },
      { name: "Low", code: "L1" },
    ],
    Referred: [
      { name: "Rider1", code: "R1" },
      { name: "Rider2", code: "R2" },
    ],
    Referral: [
      { name: "Jacob1", code: "J1" },
      { name: "Jacob1", code: "J2" },
    ],
    Perviously: [
      { name: "ABC Company1", code: "P1" },
      { name: "ABC Company2", code: "P2" },
    ],
    fastival_name: [
      { name: "Diwali", code: "P1" },
      { name: "Pongal", code: "P2" },
    ],
    status: [
      { name: "New1", code: "N1" },
      { name: "New2", code: "N2" },
    ],
    serviceCategories: [
      { name: "Bike", key: "S1" },
      { name: "Van", key: "S2" },
      { name: "FSR", key: "S3" },
      { name: "Project", key: "S4" },
    ],
    v$: useVuelidate(),

    details: {
      customer_type: "",
      business_method: "",
      status: "",
      priority: "",
      referred_by: "",
      referral_person_name: "",
      previously_served_by: "",
      sales_comission:"",
      fastival_name:"",
      standard_liability:"",
      volumetric_value:"",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        customer_type: { required },
        business_method: { required },
        status: { required },
        priority: { required },
        referred_by:{ required},
        referral_person_name: { required},
        previously_served_by: { required },
        sales_comission: { required },
        fastival_name: { required },
        standard_liability:{ required },
        volumetric_value: { required },
      },
    };
  },
 methods: {
    goBackHandler() {
      this.$store.dispatch("quotation/navigateStepper", {
        step: "SalesRapidoAddAddress",
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
          step: "SalesRapidoProductDetails",
        });
      }
    },
  },
};
</script>

<style scoped>

</style>
