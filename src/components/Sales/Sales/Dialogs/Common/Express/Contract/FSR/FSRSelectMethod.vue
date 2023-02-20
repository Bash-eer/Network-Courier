<template>
  <br />
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text required">Customer Type</h5>
      <DropDown
        code="name"
        :data="customer_type"
        label="customer_type"
        :state="details.quotation.customer_type"
        v-model="details.quotation.customer_type"
        :class="{
          'p-invalid': v$.details.quotation.customer_type.$invalid && submitted,
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
        :state="details.quotation.business_type"
        v-model="details.quotation.business_type"
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
        :state="details.quotation.status"
        v-model="details.quotation.status"
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
        v-model="details.quotation.priority"
        :state="details.quotation.priority"
        :classes="{
          'p-invalid': v$.details.quotation.priority.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text required">Referred By</h5>
      <DropDown
        code="name"
        :data="referred_by"
        label="referred_by"
        v-model="details.quotation.referred_by"
        :state="details.quotation.referred_by"
        :classes="{
          'p-invalid': v$.details.quotation.referred_by.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text required">Referral Person Name</h5>
      <DropDown
        code="name"
        :data="referral_name"
        label="referral_name"
        v-model="details.quotation.referral_name"
        :state="details.quotation.referral_name"
        :classes="{
          'p-invalid': v$.details.quotation.referral_name.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text required">Previously Served By</h5>
      <DropDown
        label="previously_served_by"
        code="name"
        :data="previously_served_by"
        v-model="details.quotation.previously_served_by"
        :state="details.quotation.previously_served_by"
        :classes="{
          'p-invalid':
            v$.details.quotation.previously_served_by.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Sales Commission ($)</h5>
      <TextField
        label="sales_commission"
        type="number"
        v-model="details.quotation.sales_commission"
        :state="details.quotation.sales_commission"
        :classes="{
          'p-invalid':
            v$.details.quotation.sales_commission.$invalid && submitted,
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
        code="name"
        :data="festival_name"
        :state="details.quotation.festival_name"
        v-model="details.quotation.festival_name"
        :classes="{
          'p-invalid': v$.details.quotation.festival_name.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text">Standard Liability($)</h5>
      <TextField
        label="standard_liability"
        type="number"
        :state="details.quotation.standard_liability"
        v-model="details.quotation.standard_liability"
        :classes="{
          'p-invalid':
            v$.details.quotation.standard_liability.$invalid && submitted,
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
        v-model="details.quotation.volumetric_value"
        :classes="{
          'p-invalid':
            v$.details.quotation.volumetric_value.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <!-- <div class="field col-12 md:col-12">
    <p class="dialog-contact-header ml-2">Trip Plan</p>
  </div> -->
  <!-- <div class="flex ml-3 flex-row justify-content-between align-items-center">
    <RadioButtons
      label="platform"
      state="radioButtonCompany"
      v-bind:radioButtonData="SalesDialogCategories"
      v-model="details.quotation.service"
      :classes="{
        'p-invalid': v$.details.quotation.service.$invalid && submitted,
        'inputfield w-full dialog-dropdown-text ': true,
      }"
    />
  </div> -->
  <div class="field col-12 md:col-12 ml-3">
    <h5 class="dialog-contact-header">Package Details</h5>
    <TextAreaField
      label="package_details"
      type="text"
      v-model="details.quotation.package_details"
      :classes="{
        'p-invalid': v$.details.quotation.package_details.$invalid && submitted,
        'inputfield w-full dialog-dropdown-text ': true,
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
import { mapGetters } from "vuex";
import { required } from "@vuelidate/validators";
export default {
  name: "FSRSelectMethodDialog",
  data: () => ({
    v$: useVuelidate(),
    details: {
      quotation: {
        business_type: "",
        customer_type: "",
        priority: "",
        status: "",
        referred_by: "",
        referral_person: "",
        previously_served_by: "",
        sales_commission: "",
        festival_name: "",
        standard_liability: "",
        volumetric_value: "",
        // service: "",
        package_details: "",
      },
    },
    SalesDialogCategories: [
      // { name: "Bike", key: "CU" },
      // { name: "Van", key: "IU" },
      // { name: "FSR", key: "CU" },
      // { name: "Project", key: "IU" },
      // { name: "Bike+FSR", key: "CU" },
      // { name: "Van+FSR", key: "IU" },
      // { name: "Bike+Project", key: "CU" },
      // { name: "Van+Project", key: "IU" },
      // { name: "Inter Company (Bike+Van)", key: "CU" },
    ],

    customer_type: [
      { name: "Express", code: "USD" },
      // { name: "Adhoc", code: "SGD" },
    ],
    business_type: [
      // { name: "Express", code: "USD" },
      { name: "Contract", code: "SGD" },
    ],
    status: [
      { name: "New", code: "USD" },
      // { name: "Old", code: "USD" },
    ],
    priority: [
      { name: "High", code: "USD" },
      { name: "Low", code: "USD" },
    ],
    referred_by: [
      { name: "vibo", code: "USD" },
      { name: "steve", code: "USD" },
    ],
    referral_name: [
      { name: "john", code: "USD" },
      { name: "tom", code: "USD" },
    ],
    previously_served_by: [
      { name: "king", code: "USD" },
      { name: "queen", code: "USD" },
    ],
    festival_name: [
      { name: "pongal", code: "USD" },
      { name: "dipavali", code: "USD" },
    ],

    submitted: false,
  }),
  validations() {
    return {
      details: {
        quotation: {
          customer_type: { required },
          priority: { required },
          referred_by: { required },
          referral_name: { required },
          previously_served_by: { required },
          sales_commission: { required },
          festival_name: { required },
          standard_liability: { required },
          volumetric_value: { required },
          package_details: { required },
          // service: { required },
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      SelectMethod:
        "salesExpressContractFSR/ExpressContractFsrOverviewEditData",
    }),
  },
  methods: {
    goBackHandler() {
      this.$store.dispatch("salesExpressContractFSR/navigateStepper", {
        step: "FSRQuotationDialog",
      });
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.$store.state.salesExpressContractFSR.quotationDetails.push(
          this.details.quotation
        );
        this.$store.dispatch("salesExpressContractFSR/navigateStepper", {
          step: "FSRCostingDetailsDialog",
        });
        console.log("this.details", this.details);
      }
    },
  },

  async created() {
    console.log(
      "this.$store.state.salesExpressContractFSR.quotationDetails.contacts",
      this.$store.state.salesExpressContractFSR.quotationDetails
    );

    this.details.quotation.customer_type = this.customer_type[0].name;
    this.details.quotation.business_type = this.business_type[0].name;
    this.details.quotation.status = this.status[0].name;
    this.festival_name =
      this.$store.state.salesExpressContractFSR.ExpressContractFsrDialogFestivalDropDown;
    this.referred_by =
      this.$store.state.salesExpressContractFSR.ExpressContractFsrDialogReferenceDropDown;
    this.previously_served_by =
      this.$store.state.salesExpressContractFSR.ExpressContractFsrDialogCompetitorDropDown;

    if (this.SelectMethod) {
      let TotalValue = this.SelectMethod.express_contract.map((i) => ({
        packageDetails: i.package_details,
        volumetric_value: i.volumetric_value,
        sales_commission: i.sales_commission,
        standard_liability: i.standard_liability,
        previously_served_by: i.previously_served_by,
        referral_name: i.referral_name,
        referred_by: i.referred_by,
        festival_name: i.festival_name,
      }));

      this.details.quotation.priority = this.SelectMethod.priority;
      this.details.quotation.package_details = TotalValue[0].packageDetails;
      this.details.quotation.volumetric_value = TotalValue[0].volumetric_value;
      this.details.quotation.sales_commission = TotalValue[0].sales_commission;
      this.details.quotation.standard_liability =
        TotalValue[0].standard_liability;
      this.details.quotation.previously_served_by =
        TotalValue[0].previously_served_by;
      this.details.quotation.referral_name = TotalValue[0].referral_name;
      this.details.quotation.referred_by = TotalValue[0].referred_by;
      this.details.quotation.festival_name = TotalValue[0].festival_name;
    }
  },
  unmounted() {
    this.$store.state.salesExpressContractFSR.ExpressContractFsrOverviewEditData =
      null;
  },
};
</script>

<style></style>
