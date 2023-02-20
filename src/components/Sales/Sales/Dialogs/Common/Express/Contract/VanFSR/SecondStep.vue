<template>
  <br />
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="color-7a7a7a text-sm required">Customer Type</h5>
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
          'inputfield w-full color-212121 font-bold ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="color-7a7a7a text-sm required">Business Method</h5>
      <DropDown
        :disabled="true"
        code="name"
        :state="details.business_type"
        :key="details.business_type"
        :data="business_type"
        label="business_type"
        v-model="details.business_type"
        :class="{
          'p-invalid': v$.details.business_type.$invalid && submitted,
          'inputfield w-full color-212121 font-bold ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="color-7a7a7a text-sm required">Status</h5>
      <DropDown
        code="name"
        :state="details.status"
        :key="details.status"
        :data="status"
        label="status"
        v-model="details.status"
        :class="{
          'p-invalid': v$.details.status.$invalid && submitted,
          'inputfield w-full color-212121 font-bold ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="color-7a7a7a text-sm required">Priority</h5>
      <DropDown
        code="name"
        :state="details.priority"
        :data="priority"
        :key="details.priority"
        label="priority"
        v-model="details.priority"
        :class="{
          'p-invalid': v$.details.priority.$invalid && submitted,
          'inputfield w-full color-212121 font-bold ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="color-7a7a7a text-sm">Referred By</h5>
      <DropDown
      code="name"
        label="referred_by"
        :state="details.referred_by"
        :data="referred_by"
        :key="details.referred_by"
        v-model="details.referred_by"
        :class="{
          'inputfield w-full color-212121 font-bold ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="color-7a7a7a text-sm">Referral Person Name</h5>
      <DropDown
      code="name"
        label="referral_name"
        :data="referral_name"
        :state="details.referral_name"
        :key="details.referral_name"
        v-model="details.referral_name"
        :class="{
          'inputfield w-full color-212121 font-bold ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="color-7a7a7a text-sm required">Previously Served By</h5>
      <DropDown
      code="name"
        label="previously_served_by"
        :data="previously_served_by"
        :state="details.previously_served_by"
        :key="details.previously_served_by"
        v-model="details.previously_served_by"
        :class="{
          'p-invalid': v$.details.previously_served_by.$invalid && submitted,
          'inputfield w-full color-212121 font-bold ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="color-7a7a7a text-sm">Sales Commission ($)</h5>
      <TextField
      code="name"
        label="sales_commission"
        type="number"
        v-model="details.sales_commission"
        :classes="{
          'inputfield w-full color-212121 font-bold ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="= color-7a7a7a text-sm required">Festival Name</h5>
      <DropDown
      code="name"
        label="festival_name"
        :data="festival_name"
        :state="details.festival_name"
        :key="details.festival_name"
        v-model="details.festival_name"
        :class="{
          'p-invalid': v$.details.festival_name.$invalid && submitted,
          'inputfield w-full color-212121 font-bold ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="color-7a7a7a text-sm">Standard Liability($)</h5>
      <TextField
        label="standard_liability"
        type="number"
        v-model="details.standard_liability"
        :classes="{
          'inputfield w-full color-212121 font-bold ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="color-7a7a7a text-sm">Volumetric Value</h5>
      <TextField
        label="volumetric_value"
        type="number"
        v-model="details.volumetric_value"
        :classes="{
          'inputfield w-full color-212121 font-bold': true,
        }"
      />
    </div>
  </div>
  <div class="field col-12 md:col-12">
    <p class="color-343434 text-sm ml-2 mt-3">Service Required</p>
  </div>
  <div
    class="
      flex flex-row
      justify-content-between
      align-items-center
      color-919191
      text-sm
      ml-4
    "
  >
    <RadioButtons
      label="platform"
      state="radioButtonCompany"
      v-bind:radioButtonData="SalesDialogCategories"
    />
  </div>
  <div class="field col-12 md:col-12 ml-3 mt-2">
    <h5 class="required color-343434 text-sm">Package Details</h5>
    <TextAreaField
      label="package_details"
      type="text"
      v-model="details.package_details"
      :classes="{
        'p-invalid': v$.details.package_details.$invalid && submitted,
        'inputfield w-full color-212121 font-bold py-2': true,
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
        class="p-button-outlined mr-1 text-sm color-357dea font-bold"
      />
    </div>
    <div class="flex align-self-center justify-content-end">
      <CancelButton
        storePath="salesSales"
        label="Cancel"
        class="color-357dea font-bold"
      />

      <Buttons
        label="Next"
        button_class="next-button"
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
  name: "SalesExpressContractVanFSRSecondStep",
  data: () => ({
    v$: useVuelidate(),
    details: {
      customer_type: " ",
      business_type: " ",
      status: "",
      service: "Van + FSR",
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
      // { name: "Project", key: "IU" },
      // { name: "Bike+FSR", key: "CU" },
      { name: "Van + FSR", key: "IU" },
    //   { name: "Bike+Project", key: "CU" },
    //   { name: "Van+Project", key: "IU" },
    //   { name: "Inter Company (Bike+Van)", key: "CU" },
     ],
    referral_name: [
      { name: "Jacob", code: "USD" },
      { name: "JJ", code: "SGD" },
    ],
    festival_name: [
      { name: "Deepavali", code: "Deepavali" },
      { name: "Pongal", code: "Pongal" },
    ],
    previously_served_by: [
      { name: "Abc Company", code: "abc" },
      { name: "EFG", code: " efg" },
    ],
    customer_type: [
      { name: "Express", code: "USD" },
      // { name: "Adhoc", code: "SGD" },
    ],
    business_type: [
      { name: "Contract", code: "USD" },
      // { name: "Adhoc", code: "SGD" },
    ],
    status: [
      { name: "New", code: "USD" },
      { name: "Called", code: "USD" },
      { name: "Meeting", code: "USD" },
      { name: "Quote", code: "USD" },
      { name: "Hold", code: "USD" },
      { name: "Concluded", code: "USD" },
    ],
    priority: [
      { name: "High", code: "H" },
      { name: "Medium", code: "M" },
      { name: "Low", code: "L" },
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
      expressContractVanFSRAddNewData:
        "salesExpressContractVanFSR/expressContractVanFSRAddNewData",
       expressContractVanFsrOverviewData:
        "salesExpressContractVanFSR/expressContractVanFsrOverviewData",
    }),
  },
  validations() {
    return {
      details: {
        customer_type: { required },
        business_type: { required },
        status: { required },
        package_details: { required },
        festival_name: { required },
        priority: { required },
        previously_served_by: { required },
      },
    };
  },
  methods: {
    goBackHandler() {
      this.$store.dispatch("salesQuotationDialog/navigateStepper", {
        step: "SalesExpressContractVanFSRFirstStep",
      });
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.expressContractVanFSRAddNewData["quotation"]={};
        for (let i in this.details) {
          console.log(this.details,"johnnn")
          if (i != "business_type" && i != "customer_type" && i != "priority" && i != "status"){
          this.expressContractVanFSRAddNewData["quotation"][i] = this.details[i];
          }
          if (i == "business_type" || i == "customer_type" || i == "status"){
            this.expressContractVanFSRAddNewData[i] = this.details[i];
          }
        }
        console.log( this.expressContractVanFSRAddNewData, "Data Twopage");
        this.$store.dispatch("salesQuotationDialog/navigateStepper", {
          step: "SalesExpressContractVanFSRThirdStep",
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
    await this.getpreviouslyServedByDropdownData();
    this.details.service = this.SalesDialogCategories[0].name;
    this.details.business_type = this.business_type[0].name;
    this.details.customer_type = this.customer_type[0].name;

      // //EDIT DATA
   if (
      Object.keys(this.$store.state["salesExpressContractVanFSR"].expressContractVanFSREditData)
        .length != 0
    ) {
      console.log(this.expressContractVanFsrOverviewData, "Preload data 244")
      Object.keys(this.details).map((key) => {
        this.details[key] = this.expressContractVanFsrOverviewData.express_contract[0][key];
       if(key == "customer_type" || key == "business_type" || key == "status" || key == "priority"){
           this.details[key] = this.expressContractVanFsrOverviewData[key];
       }
      });
    }
  },
};
</script>

<style>
.next-button {
  background-color: #357dea;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
}
</style>
