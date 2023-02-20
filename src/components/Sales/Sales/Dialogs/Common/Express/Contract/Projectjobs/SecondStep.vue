<template>
  <br />
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="text-character required">Customer Type</h5>
      <DropDown
        :disabled="true"
        code="name"
        :state="details.customer_type"
        :key="details.customer_type"
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
      <h5 class="text-character required">Business Method</h5>
      <DropDown
        :disabled="true"
        code="name"
        :data="business_type"
        label="business_type"
        :state="details.business_type"
        :key="details.business_type"
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
      <h5 class="text-character required">Status</h5>
      <DropDown
        code="name"
        :data="status"
        label="status"
         :state="details.status"
        :key="details.status"
        v-model="details.status"
         :class="{
          'p-invalid': v$.details.status.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="text-character required">Priority</h5>
      <DropDown
        code="name"
        :data="priority"
        label="priority"
         :state="details.priority"
        :key="details.priority"
        v-model="details.priority"
         :class="{
          'p-invalid': v$.details.priority.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="text-character required">Referred By</h5>
      <DropDown
        code="name"
        :data="referred_by"
        label="referred_by"
        v-model="details.referred_by"
        :state="details.referred_by"
        :key="details.referred_by"
        :class="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="text-character required">Referral Person Name</h5>
      <DropDown
        label="referral_name"
        :data="referral_name"
        v-model="details.referral_name"
         :state="details.referral_name"
        :key="details.referral_name"
        :class="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="text-character required">Previously Served By</h5>
      <DropDown
              code="name"
        label="previously_served_by"
        :data="previously_served_by"
        v-model="details.previously_served_by"
        :state="details.previously_served_by"
        :key="details.previously_served_by"
        :class="{
            'p-invalid': v$.details.previously_served_by.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="text-character">Sales Commission ($)</h5>
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
      <h5 class="text-character required">Festival Name</h5>
       <DropDown
        code="name"
        label="festival_name"
        :data="festival_name"
        :state="details.festival_name"
        :key="details.festival_name"
        v-model="details.festival_name"
        :class="{
          'p-invalid': v$.details.festival_name.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="text-character">Standard Liability($)</h5>
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
      <h5 class="text-character">Volumetric Value</h5>
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
  <div class="field col-12 md:col-12 ml-2">
    <p class="text-character ">Service Required</p>
  </div>
  <div class="flex flex-row justify-content-between align-items-center">
   <RadioButtons
      label="service"
      v-model="details.service"
      state="radioButtonCompany"
      v-bind:radioButtonData="SalesDialogCategories"
      class="bold-700 font-size-12 color-919191 ml-4"
    />
  </div>
  <div class="field col-12 md:col-12 ml-3">
    <h5 class="dialog-contact-header">Package Details</h5>
    <TextAreaField
      label="package_details"
      type="text"
      v-model="details.package_details"
      :classes="{
        'p-invalid': v$.details.package_details.$invalid && submitted,
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
    <CancelButton storePath="dialog"  label="cancel"/>

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
import { mapGetters } from "vuex";
import axios from "axios";
const { URL } = require("../../../../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
export default {
  name: "SalesExpressContractProjectjobsSecondStep",
  data: () => ({
    v$: useVuelidate(),
    details: {
      customer_type: "",
      business_type: "",
      service: "ProjectJobs",
      status: "",
      priority: "",
      referred_by: "",
      referral_name: "",
      previously_served_by: "",
      sales_commission: "",
      standard_liability: "",
      volumetric_value: "",
      festival_name: "",
      package_details: "",
      
    },
    SalesDialogCategories: [
      // { name: "Bike", key: "CU" },
      // { name: "Van", key: "IU" },
      // { name: "FSR", key: "CU" },
      { name: "Project", key: "IU" },
      // { name: "Bike+FSR", key: "CU" },
      // { name: "Van+FSR", key: "IU" },
      // { name: "Bike+Project", key: "CU" },
      // { name: "Van+Project", key: "IU" },
      // { name: "Inter Company (Bike+Van)", key: "CU" },
    ],
    referral_name: [
      { name: "Jacob", code: "USD" },
      { name: "JJ", code: "SGD" },
    ],

    customer_type: [
      { name: "Express", code: "USD" },
      //{ name: "Adhoc", code: "SGD" },
    ],
    business_type: [
      { name: "Contract", code: "USD" },
      //{ name: "Adhoc", code: "SGD" },
    ],
    status: [
      { name: "New", code: "USD" },
      { name: "Old", code: "USD" },
    ],
    priority: [
      { name: "High", code: "USD" },
      { name: "Low", code: "USD" },
    ],
     referred_by: [
      { name: "Ram", code: "RM" },
      { name: "Rose", code: "ROSE" },
      { name: "Mike", code: "MK" },
      { name: "Taylor", code: "JK" },
    ],
    submitted: false,
  }),
   computed: {
    ...mapGetters({
      expressContractProjectJobsAddNewData:
        "salesExpressContractProjectJobs/expressContractProjectJobsAddNewData",
      ExpressContractProjectJobsEditData:
        "salesExpressContractProjectJobs/ExpressContractProjectJobsEditData",
    }),
  },
  validations() {
    return {
      details: {
        customer_type: { required },
        business_type: { required },
        status: { required },
        priority: { required },
        previously_served_by: { required },
        festival_name: { required },
        package_details: { required },
      },
    };
  },
  methods: {
    goBackHandler() {
      this.$store.dispatch("salesQuotationDialog/navigateStepper", {
        step: "SalesExpressContractProjectjobsFirstStep",
      });
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        for (let i in this.details) {
          this.expressContractProjectJobsAddNewData["quotation"][i] = this.details[i];
        }
          console.log(this.expressContractProjectJobsAddNewData,"2step")
        this.expressContractProjectJobsAddNewData["customer_type"] =
          this.details.customer_type;
        this.expressContractProjectJobsAddNewData["business_type"] =
          this.details.business_type;
        this.expressContractProjectJobsAddNewData["status"] = this.details.status;
        this.$store.dispatch("salesQuotationDialog/navigateStepper", {
          step: "SalesExpressContractProjectjobsThirdStep",
        });
      }
    },
    async getFestivalDropdownData() {
      this.festival_name = [];
      await axios
        .get("/settings/salesSettinigs/others/festival/dropdown")
        .then((res) => {
          if (res.data.results) {
            for (let c in res.data.results) {
              res.data.results[c]["name"] = res.data.results[c]["festival_name"];
              this.festival_name.push(res.data.results[c]);
              // this.toZoneData.push(res.data.results[c]);
            }
          }
        });
    },
     async getpreviouslyServedByDropdownData() {
      this.previously_served_by = [];
      await axios
        .get("/settings/salesSettinigs/others/competitor/dropdown")
        .then((res) => {
          if (res.data.results) {
            for (let c in res.data.results) {
              res.data.results[c]["name"] = res.data.results[c]["competitor_name"];
              this.previously_served_by.push(res.data.results[c]);
              // this.toZoneData.push(res.data.results[c]);
            }
          }
        });
    },
  },
 async created() {
      await this.getFestivalDropdownData();
    await  this.getpreviouslyServedByDropdownData();
    // this.details.business_type = this.business_type[0].name;
    this.details.service = this.SalesDialogCategories[0];
    this.details.business_type = this.business_type[0].name;
    this.details.customer_type = this.customer_type[0].name;
    // if (this.ExpressContractBikeEditData) {
    //   this.prefillEditData();
    // }
  },
};
</script>

<style>
.text-character{
  font-family: 'Montserrat';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 28px;
/* identical to box height, or 200% */

display: flex;
align-items: center;

color: #7A7A7A;
}
</style>