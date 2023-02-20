<template>
  <br />
  <div class="formgrid grid ml-3">
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
          'inputfield w-full dialog-dropdown-text ': true,
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
          'inputfield w-full dialog-dropdown-text ': true,
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
          'inputfield w-full dialog-dropdown-text ': true,
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
          'inputfield w-full dialog-dropdown-text ': true,
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
          'inputfield w-full dialog-dropdown-text ': true,
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
          'inputfield w-full dialog-dropdown-text ': true,
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
          'inputfield w-full dialog-dropdown-text ': true,
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
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
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
          'inputfield w-full dialog-dropdown-text ': true,
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
          'inputfield w-full dialog-dropdown-text ': true,
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
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="field col-12 md:col-12">
    <p class="bold-700 line-height-28 font-size-12 color-343434 ml-3 mb-0">
      Service Required
    </p>
  </div>
  <div
    class="
      flex flex-row
      justify-content-between
      align-items-center
      mt-0
      pt-0
      mb-2
    "
  >
    <!-- p-radiobutton-box
        label="service"
        v-model="details.service"
        state="radioButtonSalesState"
        v-bind:radioButtonData="serviceCategories"
        v-on:childToParent="radioButtonChange"
        class="btn"
        
         label="platform" -->
    <!-- <RadioButtons
      label="platform"
      state="radioButtonCompany"
      v-bind:radioButtonData="SalesDialogCategories"
      v-model="roleDetails.selectedCategory"
       :disabled="true"
    /> -->
    <RadioButtons
      label="service"
      v-model="details.service"
      state="radioButtonCompany"
      v-bind:radioButtonData="SalesDialogCategories"
      class="bold-700 font-size-12 color-919191 ml-4"
    />
  </div>
  <div class="field col-12 md:col-12 ml-3">
    <h5 class="required bold-700 line-height-28 font-size-12 color-343434">
      Package Details
    </h5>
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
        class="
          p-button-outlined
          mr-1
          dialog-button-text
          previous-btn
          color-357dea
        "
      />
    </div>
    <div class="flex align-self-center justify-content-end">
      <CancelButton storePath="salesSales" label="Cancel"/>

      <Buttons
        label="Next"
        button_class="dialog-button-text bg-357dea"
        v-on:childToParent="nextStepHandler"
      />
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapGetters } from "vuex";
export default {
  name: "SalesExpressContractBikeSecondStep",
  data: () => ({
    v$: useVuelidate(),
    details: {
      customer_type: "",
      business_type: "",
      // service: null,
      service: "Bike",
      status: "",
      priority: "",
      referred_by: "",
      referral_name: "",
      previously_served_by: "",
      sales_commission: "",
      standard_liability: "",
      volumetric_value: "",
      package_details: "",
      festival_name: "",
    },
    SalesDialogCategories: [
      { name: "Bike", key: "CU" },
      // { name: "Van", key: "IU" },
      // { name: "FSR", key: "CU" },
      // { name: "Project", key: "IU" },
      // { name: "Bike+FSR", key: "CU" },
      // { name: "Van+FSR", key: "IU" },
      // { name: "Bike+Project", key: "CU" },
      // { name: "Van+Project", key: "IU" },
      // { name: "Inter Company (Bike+Van)", key: "CU" },
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
      { name: "AbC Company", code: "abc" },
      { name: "EFG Company", code: " efg" },
    ],

    customer_type: [
      { name: "Express", code: "USD" },
      // { name: "", code: "SGD" },
    ],
    business_type: [
      { name: "Contract", code: "USD" },
      // { name: "Adhoc", code: "SGD" },
    ],
    status: [
      { name: "New", code: "USD" },
      // { name: "Called", code: "USD" },
      // { name: "Meeting", code: "USD" },
      // { name: "Quote", code: "USD" },
      // { name: "Hold", code: "USD" },
      // { name: "Concluded", code: "USD" },
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
      expressContractBikeAddNewData:
        "salesExpressBike/expressContractBikeAddNewData",
      ExpressContractBikeEditData:
        "salesExpressBike/ExpressContractBikeEditData",
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
        step: "SalesExpressContractBikeFirstStep",
      });
    },
    nextStepHandler() {
      console.log(this.expressContractBikeAddNewData, "console");
      this.$store.dispatch("salesQuotationDialog/navigateStepper", {
        step: "SalesExpressContractBikeThirdStep",
      });
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        for (let i in this.details) {
          this.expressContractBikeAddNewData["quotation"][i] = this.details[i];
        }

        this.expressContractBikeAddNewData["customer_type"] =
          this.details.customer_type;
        this.expressContractBikeAddNewData["business_type"] =
          this.details.business_type;
        this.expressContractBikeAddNewData["status"] = this.details.status;
        this.$store.dispatch("salesQuotationDialog/navigateStepper", {
          step: "SalesExpressContractBikeThirdStep",
        });
      }
    },
    prefillEditData() {
      // let incomingCountry = this.ExpressContractBikeEditData.country;

      // this.details.short_name = this.ExpressContractBikeEditData.short_name;

      // Object.keys(this.details).map((key) => {
      //   this.details[key] = this.ExpressContractBikeEditData[key];
      // });

      // this.renderKey++;

      this.details.priority = this.ExpressContractBikeEditData.priority;
      this.details.status = this.ExpressContractBikeEditData.status;
      this.details.referred_by =
        this.ExpressContractBikeEditData.express_contract[0].referred_by;
      this.details.referral_name =
        this.ExpressContractBikeEditData.express_contract[0].referral_name;
      this.details.previously_served_by =
        this.ExpressContractBikeEditData.express_contract[0].previously_served_by;
      this.details.sales_commission =
        this.ExpressContractBikeEditData.express_contract[0].sales_commission;
      this.details.festival_name =
        this.ExpressContractBikeEditData.express_contract[0].festival_name;
      this.details.standard_liability =
        this.ExpressContractBikeEditData.express_contract[0].standard_liability;
      this.details.volumetric_value =
        this.ExpressContractBikeEditData.express_contract[0].volumetric_value;
      this.details.package_details =
        this.ExpressContractBikeEditData.express_contract[0].package_details;
    },
  },
  created() {
    // this.details.business_type = this.business_type[0].name;
    this.details.service = this.SalesDialogCategories[0];
    this.details.business_type = this.business_type[0].name;
    this.details.customer_type = this.customer_type[0].name;
    if (this.ExpressContractBikeEditData) {
      this.prefillEditData();
    }
  },
};
</script>

<style scoped>
::v-deep .p-radiobutton-checked label {
  font-weight: 700;
  font-size: 12px;
  color: #212121 !important;
}
</style>
