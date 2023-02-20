<template>
  <div class="formgrid grid ml-3 mt-6">
    <div class="field col-12 md:col-6">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">Customer Type</h5>
      <DropDownField
        :disabled="true"
        :value="details.customer_type"
        code="name"
        :data="customer_type"
        label="customer_type"
        v-model="details.customer_type"
        :class="{
          'p-invalid': v$.details.customer_type.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
      <!-- <DropDown
        code="name"
        :data="customer_type"
        label="customer_type"
        v-model="details.customer_type"
        :class="{
          'p-invalid': v$.details.customer_type.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      /> -->
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">
        Business Method
      </h5>
      <!-- <DropDown
        code="name"
        :data="business_type"
        label="business_type"
        v-model="details.business_type"
        :class="{
          'p-invalid': v$.details.business_type.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      /> -->
      <DropDownField
        :disabled="true"
        :value="details.business_type"
        code="name"
        :data="business_type"
        label="customer_type"
        v-model="details.business_type"
        :class="{
          'p-invalid': v$.details.business_type.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div :key="renderKey" class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">Status</h5>
      <!-- <DropDown
        code="name"
        :data="status"
        label="status"
        v-model="details.status"
        :class="{
          'p-invalid': v$.details.status.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      /> -->
      <DropDownField
        :value="details.status"
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
    <div :key="renderKey" class="field col-12 md:col-6">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">Priority</h5>
      <!-- <DropDown
        code="name"
        :data="priority"
        label="priority"
        v-model="details.priority"
        :class="{
          'p-invalid': v$.details.priority.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      /> -->
      <DropDownField
      :key="renderKey"
        :value="details.priority"
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
  <div :key="renderKey" class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="bold-500 font-size-14 color-7a7a7a">Referred By</h5>
      <!-- <DropDown
        label="referred_by"
        v-model="details.referred_by"
        :class="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      /> -->
      <DropDownField
      :key="renderKey"
        :value="details.referred_by"
        code="name"
        :data="referred_by"
        label="referred_by"
        v-model="details.referred_by"
        :class="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div :key="renderKey" class="field col-12 md:col-6">
      <h5 class="bold-500 font-size-14 color-7a7a7a">Referral Person Name</h5>
      <!-- <DropDown
        label="referral_person"
        v-model="details.referral_person"
        :class="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      /> -->
      <DropDownField
      :key="renderKey"
        :value="details.referral_person"
        code="name"
        :data="referral_person"
        label="referral_person"
        v-model="details.referral_person"
        :class="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div :key="renderKey" class="formgrid grid ml-3">
    <div :key="renderKey" class="field col-12 md:col-6">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">
        Previously Served By
      </h5>
      <!-- <DropDown
        label="previously_served"
        :data="previously_served"
        v-model="details.previously_served"
        :class="{
          'p-invalid': v$.details.previously_served.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      /> -->
      <DropDownField
      :key="renderKey"
        :value="details.previously_served"
        code="name"
        :data="previously_served"
        label="previously_served"
        v-model="details.previously_served"
        :class="{
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
  <div :key="renderKey" class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">Festival Name</h5>
      <!-- <DropDown
        label="festival_name"
        :data="festival_name"
        v-model="details.festival_name"
        :class="{
          'p-invalid': v$.details.festival_name.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      /> -->
      <DropDownField
      :key="renderKey"
        :value="details.festival_name"
        code="name"
        :data="festival_name"
        label="festival_name"
        v-model="details.festival_name"
        :class="{
          'p-invalid': v$.details.festival_name.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="bold-500 font-size-14 color-7a7a7a">Standard Liability($)</h5>
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
  <!-- <div class="field col-12 md:col-12 mb-0 pb-0">
    <p class="bold-700 font-size-12 color-343434 ml-3">Service Required</p>
  </div>
  <div class="flex flex-row justify-content-between align-items-center ml-4 mt-0 pt-0">
    <RadioButtons
      label="platform"
      state="radioButtonCompany"
      v-bind:radioButtonData="SalesDialogCategories"
    />
  </div> -->
  <div class="field col-12 md:col-12 ml-3">
    <h5 class="required bold-500 font-size-14 color-7a7a7a">Package Details</h5>
    <TextAreaField
      label="package_detail"
      type="text"
      v-model="details.package_detail"
      :classes="{
        'p-invalid': v$.details.package_detail.$invalid && submitted,
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
        storePath="salesSales"
        label="Cancel"
        class="color-357dea"
        @click="closeDialog"
      />

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
import { mapActions, mapState } from "vuex";
export default {
  name: "SalesExpressContractVanSecondStep",
  data: () => ({
    v$: useVuelidate(),
    renderKey:1,
    details: {
      customer_type: "",
      business_type: "",
      status: "",
      priority: "",
      referred_by: "",
      referral_person: "",
      previously_served: "",
      sales_commission: "",
      festival_name: "",
      standard_liability: "",
      volumetric_value: "",
      package_detail: "",
    },
    SalesDialogCategories: [
      { name: "Bike", key: "CU" },
      { name: "Van", key: "IU" },
      { name: "FSR", key: "CU" },
      { name: "Project", key: "IU" },
      { name: "Bike+FSR", key: "CU" },
      { name: "Van+FSR", key: "IU" },
      { name: "Bike+Project", key: "CU" },
      { name: "Van+Project", key: "IU" },
      { name: "Inter Company (Bike+Van)", key: "CU" },
    ],

    customer_type: [{ name: "Express", code: "USD" }],
    business_type: [{ name: "Contract", code: "USD" }],
    status: [
      { name: "New", code: "USD" },
      { name: "Old", code: "USD" },
    ],
    referred_by: [],
    referral_person: [],
    priority: [
      { name: "High", code: "USD" },
      { name: "Low", code: "USD" },
    ],
    // Dummy data added for validation
    festival_name: [],
    previously_served: [
      { name: "AbC Company", code: "abc" },
      { name: "EFG Company", code: " efg" },
    ],

    submitted: false,
  }),
  validations() {
    return {
      details: {
        customer_type: { required },
        business_type: { required },
        status: { required },
        priority: { required },
        previously_served: { required },
        festival_name: { required },
        package_detail: { required },
      },
    };
  },
  computed: {
    ...mapState({
      finalData: (state) => state.salesExpressContractVan.payloadPost,
      quotationData: (state) => state.salesExpressContractVan.OverviewData,
    }),
  },
  methods: {
    ...mapActions({
      getFestivalList: "Outbound/getFestivalList",
      setPostData: "salesExpressContractVan/setPayloadPostData",
    }),
    goBackHandler() {
      this.$store.state.salesExpressContractVan.vanStep--
      this.$store.dispatch("salesExpressContractVan/navigateStepper", {
        step: "SalesExpressContractVanFirstStep",
      });
    },
     closeDialog() {
      this.$store.dispatch("salesSales/closeDialog");
    },
    async getFestivals() {
      this.countryOpts = [];
      let res = await this.getFestivalList();

      res.data.results.map((list) => {
        this.festival_name.push({
          name: list.festival_name,
          festival_id: list.id,
        });
      });
    },
    nextStepHandler() {
      let {
        status,
        priority,
        referred_by,
        referral_person,
        previously_served,
        sales_commission,
        festival_name,
        standard_liability,
        volumetric_value,
        package_detail,
      } = this.details;
      if (this.v$.$invalid) {
        this.submitted = true;
         this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please fill in all the required fields.",
          life: 3000,
        });
      }
      if (!this.v$.$invalid) {
        let payload = {
          ...this.finalData,
          status: status,
          quotation: {
            priority: priority,
            referred_by: referred_by,
            referral_name: referral_person,
            previously_served_by: previously_served,
            sales_commission: sales_commission,
            festival_name: festival_name,
            standard_liability: standard_liability,
            volumetric_value: volumetric_value,
            service: "Van",
            package_details: package_detail,
          },
        };
        this.setPostData({ type: payload });
        this.$store.state.salesExpressContractVan.vanStep++;
        this.$store.dispatch("salesExpressContractVan/navigateStepper", {
          step: "SalesExpressContractVanThirdStep",
        });
      }
    },
     prefillData(){
      // let priority={name: this.quotationData.international_agent_specifics.priority, code: "USD"};
      let details =this.quotationData?.express_contract[0]??{}
      
      this.details.status= this.quotationData.status,
      this.details.priority= this.quotationData.priority,
      this.details.referred_by= details.referred_by,
      this.details.referral_person= details.referral_name,
      this.details.previously_served= details.previously_served_by,
      this.details.sales_commission= details.sales_commission,
      this.details.standard_liability= details.standard_liability,
      this.details.volumetric_value= details.volumetric_value,
      this.details.festival_name=details.festival_name,
      this.details.package_detail= details.package_details
      this.renderKey++
    },
  },
  async created() {
    this.details.customer_type = this.customer_type[0].name;
    this.details.business_type = this.business_type[0].name;
    await this.getFestivals();
    if (this.quotationData) {
      
      this.prefillData();
    } 
  },
   mounted() {
    if (this.quotationData) {
      
      this.prefillData();
    } 
  },
};
</script>

<style></style>
