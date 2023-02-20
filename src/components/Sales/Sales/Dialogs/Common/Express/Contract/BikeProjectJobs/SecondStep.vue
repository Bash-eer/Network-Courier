<template>
  <div :key="renderKey">
    <div class="formgrid grid mt-6 mb-2">
      <div class="field col-12 md:col-6">
        <h5 class="required bold-500 font-size-14 color-7a7a7a pb-1">
          Customer Type
        </h5>
        <DropDownField
          :disabled="true"
          :value="formData.customer_type"
          code="name"
          :data="customerType"
          label="customer_type"
          v-model="formData.customer_type"
          v-on:childToParent="getUserInput_1"
          :classes="{
            'p-invalid': v$.formData.customer_type.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="required bold-500 font-size-14 color-7a7a7a pb-1">
          Business Method
        </h5>
        <DropDownField
          :disabled="true"
          :value="formData.business_type"
          code="name"
          :data="businessType"
          label="business_type"
          v-model="formData.business_type"
          v-on:childToParent="getUserInput_1"
          :classes="{
            'p-invalid': v$.formData.business_type.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid mb-2">
      <div class="field col-12 md:col-6">
        <h5 class="required bold-500 font-size-14 color-7a7a7a pb-1">Status</h5>
        <DropDownField
          :value="formData.status"
          code="name"
          :disable="quotationData && true"
          :data="status"
          label="status"
          v-model="formData.status"
          v-on:childToParent="getUserInput_1"
          :classes="{
            'p-invalid': v$.formData.status.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="required bold-500 font-size-14 color-7a7a7a pb-1">
          Priority
        </h5>
        <DropDownField
          :value="details.priority"
          code="name"
          :data="Priority"
          label="priority"
          v-model="details.priority"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details.priority.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid mb-2">
      <div class="field col-12 md:col-6">
        <h5 class="bold-500 font-size-14 color-7a7a7a pb-1">Referred By</h5>
        <DropDownField
          :value="details.referred_by"
          code="name"
          :data="Referred"
          label="referred_by"
          v-model="details.referred_by"
          v-on:childToParent="getUserInput"
          :classes="{
            // 'p-invalid': v$.details.referred_by.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="bold-500 font-size-14 color-7a7a7a pb-1">
          Referral Person Name
        </h5>
        <DropDownField
          :value="details.referral_name"
          code="name"
          :data="Referral"
          label="referral_name"
          v-on:childToParent="getUserInput"
          v-model="details.referral_name"
          :classes="{
            // 'p-invalid': v$.details.referral_name.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid mb-2">
      <div class="field col-12 md:col-6">
        <h5 class="required bold-500 font-size-14 color-7a7a7a pb-1">
          Perviously Served By
        </h5>
        <DropDownField
          :value="details.previously_served_by"
          code="name"
          :data="Perviously"
          label="previously_served_by"
          v-model="details.previously_served_by"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details.previously_served_by.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="bold-500 font-size-14 color-7a7a7a pb-1">
          Sales Commission ($)
        </h5>
        <TextField
          label="sales_commission"
          type="number"
          v-model="details.sales_commission"
          v-on:childToParent="getUserInput"
          :classes="{
            // 'p-invalid': v$.details.sales_commission.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid mb-2">
      <div class="field col-12 md:col-6">
        <h5 class="required bold-500 font-size-14 color-7a7a7a pb-1">
          Festival Name
        </h5>
        <DropDownField
          :value="details.festival_name"
          code="name"
          :data="festival_name"
          label="festival_name"
          v-model="details.festival_name"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details.festival_name.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="bold-500 font-size-14 color-7a7a7a pb-1">
          Standard Liability ($)
        </h5>
        <TextField
          label="standard_liability"
          type="number"
          v-model="details.standard_liability"
          v-on:childToParent="getUserInput"
          :classes="{
            // 'p-invalid': v$.details.standard_liability.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid mb-2">
      <div class="field col-12 md:col-6">
        <h5 class="bold-500 font-size-14 color-7a7a7a pb-1">
          Volumetric Value
        </h5>
        <TextField
          label="volumetric_value"
          type="number"
          v-model="details.volumetric_value"
          v-on:childToParent="getUserInput"
          :classes="{
            // 'p-invalid': v$.details.volumetric_value.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
    <div class="field col-12 md:col-12 ml-3">
      <h5 class="dialog-label-text required">Package Details</h5>
      <TextAreaField
        label="package_details"
        type="text"
        v-model="details.package_details"
        v-on:childToParent="getUserInput"
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
        <CancelButton
          @click="closeDialog"
          storePath="salesSales"
          label="Cancel"
        />
        <Buttons
          label="Next"
          button_class="dialog-button-text"
          v-on:childToParent="nextStepHandler"
          class="bg-357dea"
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
  name: "SalesExpressContractBikeProjectJobsSecondStep",
  data: () => ({
    renderKey: 10,
    businessType: [{ name: "Contract", code: "Contract" }],
    customerType: [{ name: "Express", code: "Express" }],
    Priority: [
      { name: "High", code: "High" },
      { name: "Low", code: "Low" },
    ],
    Referred: [],
    Referral: [
      { name: "Jacob", code: "J1" },
      { name: "Rake", code: "J2" },
    ],
    Perviously: [],
    festival_name: [],
    status: [
      { name: "New", code: "New" },
      { name: "Approved", code: "Approved" },
      { name: "Rejected", code: "Rejected" },
      { name: "Hold", code: "Hold" },
      { name: "Conclude", code: "Conclude" },
      { name: "Quote", code: "Quote" },
    ],
    serviceCategories: [
      { name: "Bike", key: "S1" },
      { name: "Van", key: "S2" },
      { name: "FSR", key: "S3" },
      { name: "Project", key: "S4" },
    ],
    v$: useVuelidate(),
    formData: {
      customer_type: "",
      business_type: "",
      status: "",
    },
    details: {
      priority: "",
      referred_by: "",
      referral_name: "",
      previously_served_by: "",
      sales_commission: "",
      festival_name: "",
      standard_liability: "",
      package_details: "",
      volumetric_value: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      formData: {
        customer_type: { required },
        business_type: { required },
        status: { required },
      },
      details: {
        priority: { required },
        previously_served_by: { required },
        festival_name: { required },
        package_details: { required },
      },
    };
  },
  watch: {
    // quotationData() {
    //   if (this.quotationData) {
    //     this.prefillData();
    //   }
    // },
  },
  computed: {
    ...mapGetters({
      quotationData: "salesExpressContractBikeProjectJobs/quotationData",
    }),
  },
  methods: {
    ...mapActions({
      setCurrentStep: "salesExpressContractBikeProjectJobs/setCurrentStep",
      setPayloadData: "salesExpressContractBikeProjectJobs/setPayloadData",
      competitorsDropdown: "salesRapidoContract/Contract/competitorsDropdown",
      festivalDropdown: "salesRapidoContract/Contract/festivalDropdown",
      referenceDropdown: "salesRapidoContract/Contract/referenceDropdown",
    }),
    getUserInput_1() {
      this.setPayloadData({ value: this.formData });
    },
    getUserInput() {
      this.setPayloadData({ key: "quotation", value: this.details });
    },
    goBackHandler() {
      this.setCurrentStep(1);
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.setCurrentStep(3);
      }
    },
    prefillData() {
      this.details.priority = this.quotationData.priority;
      this.details.referred_by =
        this.quotationData.express_contract[0].referred_by;
      this.details.referral_name =
        this.quotationData.express_contract[0].referral_name;
      this.details.previously_served_by =
        this.quotationData.express_contract[0].previously_served_by;
      this.details.sales_commission =
        this.quotationData.express_contract[0].sales_commission;
      this.details.festival_name =
        this.quotationData.express_contract[0].festival_name;
      this.details.standard_liability =
        this.quotationData.express_contract[0].standard_liability;
      this.details.volumetric_value =
        this.quotationData.express_contract[0].volumetric_value;
      this.details.package_details =
        this.quotationData.express_contract[0].package_details;

      this.formData.customer_type = this.quotationData.customer_type;
      this.formData.business_type = this.quotationData.business_type;
      this.formData.status = this.quotationData.status;

      this.renderKey++;
      this.setPayloadData({ value: this.formData });
      this.setPayloadData({ key: "quotation", value: this.details });
    },
  },
  mounted() {
    if (this.quotationData) {
      this.prefillData();
    }
  },
  async created() {
    this.formData.business_type = this.businessType[0].name;
    this.formData.customer_type = this.customerType[0].name;

    const fesRes = await this.festivalDropdown();

    if (fesRes) {
      fesRes.data.results.map((list) => {
        this.festival_name.push({
          name: list.festival_name,
          code: list.id,
        });
      });
    }

    const compRes = await this.competitorsDropdown();

    if (compRes) {
      compRes.data.results.map((list) => {
        this.Perviously.push({
          name: list.competitor_name,
          code: list.id,
        });
      });
    }

    const refRes = await this.referenceDropdown();

    if (refRes) {
      refRes.data.results.map((list) => {
        this.Referred.push({
          name: list.domain,
          code: list.id,
        });
      });
    }
  },
};
</script>

<style></style>
