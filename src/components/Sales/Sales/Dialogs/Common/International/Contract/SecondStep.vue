<template>
  <div class="second-step">
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="required text-styles">Customer Type</h5>
        <DropDown
          :state="details.customer_type"
          code="name"
          :data="customerType"
          label="customer_type"
          class="text-900"
          :disabled="true"
          v-model="details.customer_type"
          :classes="{
            'p-invalid': v$.details.customer_type.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="required text-styles">Business Method</h5>
        <DropDown
          :state="details.business_type"
          code="name"
          class="text-900"
          :data="businessType"
          label="business_type"
          :disabled="true"
          v-model="details.business_type"
          :classes="{
            'p-invalid': v$.details.business_type.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="required text-styles">Status</h5>
        <DropDown
          :state="details.status"
          code="name"
          :data="status"
          optionDisabled="disable"
          class="text-900"
          label="status"
          v-model="details.status"
          :classes="{
            'p-invalid': v$.details.status.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="required text-styles">Priority</h5>
        <DropDown
          :state="details.quotation.priority"
          code="name"
          :data="Priority"
          label="priority"
          class="text-900"
          v-model="details.quotation.priority"
          :classes="{
            'p-invalid': v$.details.quotation.priority.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="text-styles">Referred By</h5>
        <DropDown
          :state="details.quotation.referred_by"
          code="name"
          class="text-900"
          :data="Referred"
          label="referred_by"
          v-model="details.quotation.referred_by"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="text-styles">Referral Person Name</h5>
        <DropDown
          :state="details.quotation.referral_name"
          code="name"
          :data="Referral"
          class="text-900"
          label="referral_name"
          v-model="details.quotation.referral_name"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="required text-styles">Perviously Served By</h5>
        <DropDown
          :state="details.quotation.previously_served_by"
          code="name"
          :data="Perviously"
          class="text-900"
          label="previously_served_by"
          v-model="details.quotation.previously_served_by"
          :classes="{
            'p-invalid':
              v$.details.quotation.previously_served_by.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="text-styles">Sales Commission ($)</h5>
        <TextField
          label="sales_comission"
          type="number"
          class="text-900"
          v-model="details.quotation.sales_commission"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="required text-styles">Festival Name</h5>
        <DropDown
          :state="details.quotation.festival_name"
          code="name"
          :data="festival_name"
          label="festival_name"
          class="text-900"
          v-model="details.quotation.festival_name"
          :classes="{
            'p-invalid':
              v$.details.quotation.festival_name.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="text-styles">Standard Liability ($)</h5>
        <TextField
          label="standard_liability"
          type="number"
          class="text-900"
          v-model="details.quotation.standard_liability"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="text-styles">Volumetric Value</h5>
        <TextField
          label="volumetric_value"
          type="number"
          class="text-900"
          v-model="details.quotation.volumetric_value"
          :classes="{
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
  name: "SalesInternationalContractSecondStep",
  data: () => ({
    businessType: [{ name: "Contract", code: "CT" }],
    customerType: [{ name: "International", code: "IN" }],
    Priority: [
      { name: "High", code: "H1" },
      { name: "Low", code: "L1" },
    ],
    Referred: [],
    Referral: [
      { name: "Jacob1", code: "J1" },
      { name: "Jacob1", code: "J2" },
    ],
    Perviously: [],
    festival_name: [],
    status: [],
    serviceCategories: [
      { name: "Bike", key: "S1" },
      { name: "Van", key: "S2" },
      { name: "FSR", key: "S3" },
      { name: "Project", key: "S4" },
    ],
    v$: useVuelidate(),

    details: {
      customer_type: "",
      business_type: "",
      status: "",

      quotation: {
        priority: "",
        referred_by: "",
        referral_name: "",
        previously_served_by: "",
        sales_commission: "",
        festival_name: "",
        standard_liability: "",
        volumetric_value: "",
      },
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        customer_type: { required },
        business_type: { required },
        status: { required },
        quotation: {
          priority: { required },
          previously_served_by: { required },
          festival_name: { required },
        },
      },
    };
  },
  methods: {
    ...mapActions({
      setCurrentStep: "salesInternationalContract/setCurrentStep",
    }),
    goBackHandler() {
      this.setCurrentStep(1);
      this.$store.dispatch("salesQuotationDialog/navigateStepper", {
        step: "SalesInternationalContractFirstStep",
      });
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.setCurrentStep(3);

        const { CreateQuotationContractData } =
          this.$store.state.salesInternationalContract;
        this.$store.state.salesInternationalContract.CreateQuotationContractData =
          Object.assign(CreateQuotationContractData, this.details);

        this.$store.dispatch("salesQuotationDialog/navigateStepper", {
          step: "SalesInternationalContractThirdStep",
        });
      }
    },
  },
  watch: {
    "$store.state.salesInternationalContract.InternationalRowData":
      function () {
        this.details.quotation.priority =
          this.$store.state.salesInternationalContract?.InternationalRowData.international_contract_specifics.priority;
        this.details.status =
          this.$store.state.salesInternationalContract?.InternationalRowData.status;
        this.details.quotation.referral_name =
          this.$store.state.salesInternationalContract?.InternationalRowData.international_contract_specifics.referral_name;
        this.details.quotation.referred_by =
          this.$store.state.salesInternationalContract?.InternationalRowData.international_contract_specifics.referred_by;
        this.details.quotation.festival_name =
          this.$store.state.salesInternationalContract?.InternationalRowData.international_contract_specifics.festival_name;
        this.details.quotation.previously_served_by =
          this.$store.state.salesInternationalContract?.InternationalRowData.international_contract_specifics.previously_served_by;
        this.details.quotation.standard_liability =
          this.$store.state.salesInternationalContract?.InternationalRowData.international_contract_specifics.standard_liability;
        this.details.quotation.sales_commission =
          this.$store.state.salesInternationalContract?.InternationalRowData.international_contract_specifics.sales_commission;
        this.details.quotation.volumetric_value =
          this.$store.state.salesInternationalContract?.InternationalRowData.international_contract_specifics.volumetric_value;
      },
    "$store.state.salesInternationalContract.dropCompetitorDownData":
      function () {
        this.Perviously =
          this.$store.state.salesInternationalContract.dropCompetitorDownData.map(
            (i) => ({
              name: i.competitor_name,
              code: i.id,
            })
          );
      },
    "$store.state.salesInternationalContract.dropReferenceDownData":
      function () {
        this.Referred =
          this.$store.state.salesInternationalContract.dropReferenceDownData.map(
            (i) => ({
              name: i.domain,
              code: i.id,
            })
          );
      },
    "$store.state.salesInternationalContract.dropFestivalDownData":
      function () {
        this.festival_name =
          this.$store.state.salesInternationalContract.dropFestivalDownData.map(
            (i) => ({
              name: i.festival_name,
              code: i.id,
            })
          );
      },

    details: {
      handler() {
        this.$store.state.salesInternationalContract.CreateQuotationContractData =
          Object.assign(
            this.$store.state.salesInternationalContract
              .CreateQuotationContractData,
            this.details
          );
      },
      deep: true,
    },
  },
  created() {
    this.details.business_type = this.businessType[0].name;
    this.details.customer_type = this.customerType[0].name;
    this.Perviously =
      this.$store.state.salesInternationalContract.dropCompetitorDownData.map(
        (i) => ({
          name: i.competitor_name,
          code: i.id,
        })
      );
    this.Referred =
      this.$store.state.salesInternationalContract.dropReferenceDownData.map(
        (i) => ({
          name: i.domain,
          code: i.id,
        })
      );
    this.festival_name =
      this.$store.state.salesInternationalContract.dropFestivalDownData.map(
        (i) => ({
          name: i.festival_name,
          code: i.id,
        })
      );
    if (this.$store.state.salesInternationalContract.InternationalRowData.id) {
      this.details.quotation.priority =
        this.$store.state.salesInternationalContract?.InternationalRowData.international_contract_specifics.priority;
      this.details.status =
        this.$store.state.salesInternationalContract?.InternationalRowData.status;
      this.details.quotation.referral_name =
        this.$store.state.salesInternationalContract?.InternationalRowData.international_contract_specifics.referral_name;
      this.details.quotation.referred_by =
        this.$store.state.salesInternationalContract?.InternationalRowData.international_contract_specifics.referred_by;
      this.details.quotation.festival_name =
        this.$store.state.salesInternationalContract?.InternationalRowData.international_contract_specifics.festival_name;
      this.details.quotation.previously_served_by =
        this.$store.state.salesInternationalContract?.InternationalRowData.international_contract_specifics.previously_served_by;
      this.details.quotation.standard_liability =
        this.$store.state.salesInternationalContract?.InternationalRowData.international_contract_specifics.standard_liability;
      this.details.quotation.sales_commission =
        this.$store.state.salesInternationalContract?.InternationalRowData.international_contract_specifics.sales_commission;
      this.details.quotation.volumetric_value =
        this.$store.state.salesInternationalContract?.InternationalRowData.international_contract_specifics.volumetric_value;

      this.status = [
        { name: "New", code: "New", disable: false },
        { name: "Approved", code: "Approved", disable: false },
        { name: "Rejected", code: "Rejected", disable: false },
        { name: "Hold", code: "Hold", disable: false },
        { name: "Conclude", code: "Conclude", disable: true },
        { name: "Quote", code: "Quote", disable: false },
      ];
    } else {
      this.status = [{ name: "New", code: "New", disable: false }];
    }
    this.details.status = this.status[0].name;
  },
};
</script>

<style scoped>
.second-step {
  margin-top: 30px;
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
