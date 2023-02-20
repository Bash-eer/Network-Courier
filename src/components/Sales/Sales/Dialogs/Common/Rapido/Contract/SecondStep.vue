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
          optionDisabled="disable"
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
          v-on:childToParent="getUserInput"
          label="referred_by"
          v-model="details.referred_by"
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
          v-on:childToParent="getUserInput"
          label="referral_name"
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
          label="cancel"
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
import FleetManagementSubTablesVue from "../../../../../../Reusables/FleetManagement/FleetManagementSubTables.vue";

export default {
  name: "SalesRapidoContractSecondStep",
  data: () => ({
    renderKey: 10,
    businessType: [{ name: "Contract", code: "Contract" }],
    customerType: [{ name: "Rapido", code: "Rapido" }],
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
    status: [],
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
      },
    };
  },
  computed: {
    ...mapGetters({
      quotationData: "salesRapidoContract/Contract/quotationData",
    }),
  },
  methods: {
    ...mapActions({
      setRapidoContractStep: "salesQuotationDialog/setRapidoContractStep",
      setRapidoContractData:
        "salesRapidoContract/Contract/setRapidoContractData",
      clearQuotationData: "salesRapidoContract/Contract/clearQuotationData",
      competitorsDropdown: "salesRapidoContract/Contract/competitorsDropdown",
      festivalDropdown: "salesRapidoContract/Contract/festivalDropdown",
      referenceDropdown: "salesRapidoContract/Contract/referenceDropdown",
    }),
    closeDialog() {
      this.clearQuotationData();
      this.setRapidoContractStep(-1);
    },
    getUserInput_1() {
      this.setRapidoContractData({ value: this.formData });
    },
    getUserInput() {
      this.setRapidoContractData({ key: "quotation", value: this.details });
    },
    goBackHandler() {
      this.setRapidoContractStep(-1);
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.setRapidoContractStep(1);
      }
    },
    prefillData() {
      this.details.priority =
        this.quotationData.rapido_contract_specifics.priority;
      this.details.referred_by =
        this.quotationData.rapido_contract_specifics.referred_by;
      this.details.referral_name =
        this.quotationData.rapido_contract_specifics.referral_name;
      this.details.previously_served_by =
        this.quotationData.rapido_contract_specifics.previously_served_by;
      this.details.sales_commission =
        this.quotationData.rapido_contract_specifics.sales_commission;
      this.details.festival_name =
        this.quotationData.rapido_contract_specifics.festival_name;
      this.details.standard_liability =
        this.quotationData.rapido_contract_specifics.standard_liability;
      this.details.volumetric_value =
        this.quotationData.rapido_contract_specifics.volumetric_value;

      this.formData.customer_type = this.quotationData.customer_type;
      this.formData.business_type = this.quotationData.business_type;
      this.formData.status = this.quotationData.status;

      this.renderKey++;

      this.setRapidoContractData({ value: this.formData });
      this.setRapidoContractData({ key: "quotation", value: this.details });
    },
  },
  async created() {
    if (this.quotationData) {
      this.prefillData();
      this.status = [
        { name: "New", code: "New", disable: false },
        { name: "Approved", code: "Approved", disable: false },
        { name: "Quote", code: "Quote", disable: false },
        { name: "Declined", code: "Declined", disable: false },
        { name: "Conclude", code: "Conclude", disable: true },
        { name: "Hold", code: "Hold", disable: false },
      ];
    } else {
      this.status = [{ name: "New", code: "New", disable: false }];
    }
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

<style scoped></style>
