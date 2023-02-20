<template>
  <div>
  <div class="formgrid grid ml-3 mt-5">
    <div class="field col-12 md:col-6">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">Customer Type</h5>
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
      <h5 class="required bold-500 font-size-14 color-7a7a7a">
        Business Method
      </h5>
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
          'inputfield w-full color-212121 font-bold ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">Status</h5>
      <DropDown
        code="name"
        :data="status"
        label="status"
        :state="details.status"
        :key="details.status"
        v-model="details.status"
        :class="{
          'p-invalid': v$.details.status.$invalid && submitted,
          'inputfield w-full color-212121 font-bold ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">Priority</h5>
      <DropDown
        code="name"
        :data="priority"
        label="priority"
        v-model="details.priority"
        :state="details.priority"
        :key="details.priority"
        :class="{
          'p-invalid': v$.details.priority.$invalid && submitted,
          'inputfield w-full color-212121 font-bold ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="bold-500 font-size-14 color-7a7a7a">Referred By</h5>
      <DropDown
        code="name"
        :data="referred_by"
        label="referred_by"
        v-model="details.referred_by"
        :state="details.referred_by"
        :key="details.referred_by"
        :class="{
          'inputfield w-full color-212121 font-bold ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="bold-500 font-size-14 color-7a7a7a">Referral Person Name</h5>
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
      <h5 class="required bold-500 font-size-14 color-7a7a7a">
        Previously Served By
      </h5>
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
      <h5 class="bold-500 font-size-14 color-7a7a7a">Sales Commission ($)</h5>
      <TextField
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
    <div class="field col-6 md:col-6">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">Festival Name</h5>

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
      <h5 class="d bold-500 font-size-14 color-7a7a7a">
        Standard Liability($)
      </h5>
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
      <h5 class="bold-500 font-size-14 color-7a7a7a">Volumetric Value</h5>
      <TextField
        label="volumetric_value"
        type="number"
        v-model="details.volumetric_value"
        :classes="{
          'inputfield w-full color-212121 font-bold ': true,
        }"
      />
    </div>
  </div>
  <div class="field col-12 md:col-12 ml-3 mb-0">
    <h5 class="bold-700 font-size-12 color-343434 dialog-contact-header">Service Required</h5>
  </div>
  <div
    class=" mt-0 ml-3
      flex flex-row
      align-items-center
      ml-4
      select-radio-header
    "
  >
  <input type="radio" checked="checked" value="Bike + FSR" />
  <label for="Bike + FSR" class="ml-2 bold-700 font-size-12 color-919191">Bike + FSR</label>
  </div>
  <div class="field col-12 md:col-12 ml-3">
    <h5 class="required bold-700 line-height-28 font-size-12 color-343434">Package Details</h5>
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
        class="p-button-outlined mr-1 dialog-button-text previous-btn color-357dea"
      />
    </div>
    <div class="flex align-self-center justify-content-end">
      <CancelButton storePath="salesQuotationDialog" class="color-357dea"/>

      <Buttons
        label="Next"
        button_class="dialog-button-text bg-357dea"
        v-on:childToParent="nextStepHandler"
      />
    </div>
  </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import axios from "axios";
const { URL } = require("../../../../../../../../../config/const");
axios.defaults.baseURL = URL.BACKEND_BASEURL;
import { required } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SalesExpressContractBikeFSRSecondStep",
  data: () => ({
    v$: useVuelidate(),
    details: {
      customer_type: "",
      business_type: "",
      service: "Bike + FSR",
      status: "",
      priority: "",
      referred_by: "",
      referral_name: "",
      previously_served_by: "",
      sales_commission: "",
      festival_name: "",
      standard_liability: "",
      volumetric_value: "",
      package_details: "",
    },
    SalesDialogCategories: [
    //   { name: "Bike", key: "CU" },
    //   { name: "Van", key: "IU" },
    //   { name: "FSR", key: "CU" },
    //   { name: "Project", key: "IU" },
      { name: "Bike + FSR", key: "CU" },
    //   { name: "Van+FSR", key: "IU" },
    //   { name: "Bike+Project", key: "CU" },
    //   { name: "Van+Project", key: "IU" },
    //   { name: "Inter Company (Bike+Van)", key: "CU" },
    ],
    referral_name: [
      { name: "Jacob", code: "USD" },
      { name: "Ariana", code: "SGD" },
      { name: "Selena", code: "SGD" },
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
      expressContractBikeFSRAddNewData:
        "salesExpressContractBikeFSR/expressContractBikeFSRAddNewData",
      quotationData: "salesExpressContractBikeFSR/quotationData",
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
    ...mapActions({
      setCurrentStep: "salesExpressContractBikeFSR/setCurrentStep",
      // setPayloadData: "salesExpressContractBikeFSR/setPayloadData",
    }),
    goBackHandler() {
      this.setCurrentStep(1);
    },
    nextStepHandler() {
      
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.expressContractBikeFSRAddNewData["quotation"]={};
        for (let i in this.details) {
          if (i != "business_type" && i != "customer_type" && i != "priority" && i != "status"){
          this.expressContractBikeFSRAddNewData["quotation"][i] = this.details[i];
          }
          if (i == "business_type" || i == "customer_type" || i == "status" || i == "priority"){
            this.expressContractBikeFSRAddNewData[i] = this.details[i];
          }
        }
        // console.log(this.expressContractBikeFSRAddNewData, "Second data")
        this.setCurrentStep(3);
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
  mounted(){

  },
  async created() {
    await this.getFestivalDropdownData();
    await this.getpreviouslyServedByDropdownData();
    this.selectedRadioButton = this.SalesDialogCategories[0].name;
    // this.details.service = this.SalesDialogCategories[0].name;
    this.details.business_type = this.business_type[0].name;
    this.details.customer_type = this.customer_type[0].name;
    // //EDIT DATA
   if ( this.quotationData ) {
      Object.keys(this.details).map((key) => {
        this.details[key] = this.quotationData.express_contract[0][key];
        if(key == "customer_type" || key == "business_type" || key == "status" || key == "priority"){
          this.details[key] = this.quotationData[key];
        }
      });
    }
  },
};
</script>

<style scoped>
.select-header {
  font-size: 12px !important;
  color: #343434 !important;
}
.select-radio-header {
  font-size: 12px !important;
  color: #919191 !important;
}
input[type='radio'] {
  width: 15px;
  height: 15px;
  background-color: #357dea;
}
</style>
