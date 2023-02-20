<template>
<div>
  <div class="field col-12 md:col-12">
    <p class="txt mt-4">Cost Per Unit</p>
  </div>
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
          'p-invalid': v$.details.business_type.$invalid && submitted,
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
          'p-invalid': v$.details.status.$invalid && submitted,
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
          'p-invalid': v$.details.priority.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>

  <div class="field col-12 md:col-12">
    <p class="txt mt-4">Delivery Type</p>
  </div>
  <div class="flex flex-row justify-content-between align-items-center">
    <RadioButtons
      label="platform"
      state="radioButtonCompany"
      v-bind:radioButtonData="DelvieryCategories"
      v-model="roleDetails.bikeorvancategory"
    />
  </div>
  <div>
    <span
      v-if="
        roleDetails.bikeorvancategory == 'On-Demand Service'
      "
    >
      <SalesAdhocDemandService />
    </span>
    <span
      v-if="
        roleDetails.bikeorvancategory == 'E-Commerce'
      "
    >
      <SalesAdhocEcommerce />
    </span>
  </div>
</div>
</template>

<script>
import SalesAdhocDemandService from "../Dialog/SalesAdhocDemandService.vue";
import SalesAdhocEcommerce from "../Dialog/SalesAdhocEcommerce.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "RapidoAdhocQuatition",
  data: () => ({
    v$: useVuelidate(),
    details: {
      customer_type: "",
      business_type: "",
      status: "",
      priority: "",
    },
    DelvieryCategories: [
      { name: "On-Demand Service", key: "BK" },
      { name: "E-Commerce", key: "VN" },
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

    roleDetails: {
      role_name: "",
      BikeCategory: "",
      user_type: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        customer_type: { required },
        business_type: { required },
        status: { required },
        priority: { required },
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
  created() {
    this.$store.state.sales.stepperNavigation = null;
   
    this.roleDetails.bikeorvancategory = this.DelvieryCategories[0].name;
  },
  components: {
    SalesAdhocDemandService,
    SalesAdhocEcommerce,
  },
};
</script>

<style>
</style>