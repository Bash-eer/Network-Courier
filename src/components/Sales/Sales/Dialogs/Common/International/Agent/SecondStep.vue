<template>
  <div class="formgrid grid ml-3 mt-6">
    <div class="field col-12 md:col-6">
      <h5 class="bold-500 font-size-14 color-7a7a7a required">Customer Type</h5>
      <DropDownField
        :disabled="true"
        :value="details.customer_type"
        code="name"
        :data="customer_type"
        label="customer_type"
        v-model="details.customer_type"
        :classes="{
          'p-invalid': v$.details.customer_type.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
      <!-- <DropDown
        :value="details.customer_type"
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
      <h5 class="bold-500 font-size-14 color-7a7a7a required">
        Business Method
      </h5>
      <DropDownField
        :disabled="true"
        :value="details.business_type"
        code="name"
        :data="business_type"
        label="business_type"
        v-model="details.business_type"
        :class="{
          'p-invalid': v$.details.business_type.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
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
    </div>
  </div>
  <div class="formgrid grid ml-3 mt-2">
    <div class="field col-12 md:col-6">
      <h5 class="bold-500 font-size-14 color-7a7a7a required">Status</h5>
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
      <h5 class="bold-500 font-size-14 color-7a7a7a required">Priority</h5>
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
  <div class="formgrid grid ml-3 mt-2">
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
    <div class="field col-12 md:col-6">
      <h5 class="bold-500 font-size-14 color-7a7a7a">Referral Person Name</h5>
      <!-- <DropDown
        label="referral_person"
        :data="referral_person"
        v-model="details.referral_person"
        :class="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      /> -->
      <DropDownField
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
  <div class="formgrid grid ml-3 mt-2">
    <div class="field col-12 md:col-6">
      <h5 class="bold-500 font-size-14 color-7a7a7a required">
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
          'p-invalid': v$.details.previously_served.$invalid && submitted,
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
  <div class="formgrid grid ml-3 mt-2">
    <div class="field col-12 md:col-6">
      <h5 class="bold-500 font-size-14 color-7a7a7a required">Festival Name</h5>
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
      <h5 class="bold-500 font-size-14 color-7a7a7a">Standard Liability ($)</h5>
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
  <div class="formgrid ml-3 mt-2">
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
  <!-- <div class="field col-12 md:col-12">
    <p class="dialog-contact-header ml-2">Service Required</p>
  </div>
  <div class="flex flex-row justify-content-between align-items-center ml-2">
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
        storePath="salesInternationalAgent"
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
  name: "SalesInternationalAgentSecondStep",
  data: () => ({
    v$: useVuelidate(),
    renderKey: 1,
    details: {
      customer_type: "International",
      business_type: "Agent",
      status: "New",
      priority: "High",
      referred_by: "",
      referral_person: "",
      previously_served: "",
      sales_commission: "0",
      standard_liability: "0",
      volumetric_value: "5000",
      festival_name: "",
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
    referral_person: [
      { name: "Jacob", code: "USD" },
      { name: "JJ", code: "SGD" },
    ],
    festival_name: [],
    previously_served: [],
    customer_type: [{ name: "International", code: "International" }],
    referred_by: [],
    business_type: [{ name: "Agent", code: "Agent" }],
    status: [
      { name: "New", code: "New" },
      { name: "Approved", code: "Approved" },
      { name: "Quote", code: "Quote" },
      { name: "Declined", code: "Declined" },
      { name: "Concluded", code: "Concluded" },
      { name: "Hold", code: "Hold" },
    ],
    priority: [
      { name: "High", code: "USD" },
      { name: "Low", code: "USD" },
    ],
    submitted: false,
  }),
  computed: {
    ...mapState({
      finalData: (state) => state.salesInternationalAgent.payloadPost,
      quotationData: (state) => state.salesInternationalAgent.quotationData,
    }),
  },
  validations() {
    return {
      details: {
        customer_type: { required },
        business_type: { required },
        status: { required },
        package_detail: { required },
        festival_name: { required },
        priority: { required },
        previously_served: { required },
      },
    };
  },
  methods: {
    ...mapActions({
      getFestivalList: "Outbound/getFestivalList",
      setAgentStep: "salesInternationalAgent/setAgentStep",
      setPostData: "salesInternationalAgent/setPayloadPostData",
      getPreviouslyServed: "salesInternationalAgent/getPreviouslyServed",
      getReferredBy: "salesInternationalAgent/getReferredBy",
    }),
    goBackHandler() {
      this.$store.dispatch("salesInternationalAgent/navigateStepper", {
        step: "SalesInternationalAgentFirstStep",
      });
      // this.setAgentStep(-1);
      this.$store.state.salesInternationalAgent.agentStep--;
    },
    closeDialog() {
      this.$store.dispatch("salesSales/closeDialog");
    },
    nextStepHandler() {
      let {
        priority,
        package_detail,
        previously_served,
        sales_commission,
        standard_liability,
        status,
        referred_by,
        referral_person,
        volumetric_value,
        festival_name,
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
      //  this.$store.dispatch("salesInternationalAgent/navigateStepper", {
      //     step: "SalesInternationalAgentSeventhStep",
      //   });
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
            package_details: package_detail,
          },
        };
        this.setPostData({ type: payload });
        this.$store.state.salesInternationalAgent.agentStep++;
        this.$store.dispatch("salesInternationalAgent/navigateStepper", {
          step: "SalesInternationalAgentThirdStep",
        });
      }
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
    async getPrevious() {
      this.previously_served = [];
      let res = await this.getPreviouslyServed();
      res.data.results.map((i) => {
        this.previously_served.push({
          name: i.competitor_name,
          code: i.id,
        });
      });
      this.details.previously_served = this.previously_served[0].name;
      this.renderKey++;
    },
    async getReferred() {
      this.referred_by = [];
      let res = await this.getReferredBy();
      res.data.results.map((i) => {
        this.referred_by.push({
          name: i.domain,
          code: i.id,
        });
      });
    },
    prefillData() {
      let priority = {
        name: this.quotationData.international_agent_specifics.priority,
        code: "USD",
      };
      (this.details.customer_type = "International"),
        (this.details.business_type = "Agent"),
        (this.details.status = this.quotationData.status),
        (this.details.priority =
          this.quotationData.international_agent_specifics.priority),
        (this.details.referred_by =
          this.quotationData.international_agent_specifics.referred_by),
        (this.details.referral_person =
          this.quotationData.international_agent_specifics.referral_name),
        (this.details.previously_served =
          this.quotationData.international_agent_specifics.previously_served_by),
        (this.details.sales_commission =
          this.quotationData.international_agent_specifics.sales_commission),
        (this.details.standard_liability =
          this.quotationData.international_agent_specifics.standard_liability),
        (this.details.volumetric_value =
          this.quotationData.international_agent_specifics.volumetric_value),
        (this.details.festival_name =
          this.quotationData.international_agent_specifics.festival_name),
        (this.details.package_detail =
          this.quotationData.international_agent_specifics.package_details),
        this.renderKey++;
    },
    initialize() {
      this.details.festival_name = "Chinese New Year";
      this.details.previously_served = this.previously_served[0]?.name ?? "";
    },
  },
  async created() {
    this.details.customer_type = this.customer_type[0].name;
    this.details.business_type = this.business_type[0].name;
    this.getFestivals();
    this.getReferred();
    this.getPrevious();
    if (this.quotationData) {
      this.prefillData();
    } else {
      this.initialize();
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
