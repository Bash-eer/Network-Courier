<template>
  <div class="formgrid grid ml-3 mt-6">
    <div class="field col-12 md:col-6">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">Customer Type</h5>
      <DropDownField
        :disabled="true"
        :value="formData.customer_type"
        code="name"
        :data="customer_type"
        label="customer_type"
        v-model="formData.customer_type"
        :class="{
          'p-invalid': v$.formData.customer_type.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">
        Business Method
      </h5>
      <DropDownField
        :disabled="true"
        :value="formData.business_type"
        code="name"
        :data="business_type"
        label="customer_type"
        v-model="formData.business_type"
        :class="{
          'p-invalid': v$.formData.business_type.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div :key="renderKey" class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">Status</h5>

      <DropDownField
        :value="formData.status"
        code="name"
        :data="status"
        label="status"
        v-model="formData.status"
        :class="{
          'p-invalid': v$.formData.status.$invalid && submitted,
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

      <DropDownField
        :key="renderKey"
        :value="details.referred_by"
        code="name"
        :data="referred_by"
        :filter="true"
        label="referred_by"
        v-model="details.referred_by"
        @change="fetchRefferalPerson($event)"
        :class="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div :key="renderKey" class="field col-12 md:col-6">
      <h5 class="bold-500 font-size-14 color-7a7a7a">Referral Person Name</h5>

      <DropDownField
        :key="renderKey"
        :value="details.referral_name"
        code="name"
        :data="referral_name"
        :filter="true"
        label="referral_name"
        v-model="details.referral_name"
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

      <DropDownField
        :key="renderKey"
        :value="details.previously_served_by"
        code="name"
        :data="previously_served_by"
        label="previously_served_by"
        v-model="details.previously_served_by"
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
  <div
    class="
      flex flex-row
      field
      col-12
      md:col-12
      mb-0
      pb-0
      align-items-center
      ml-3
    "
  >
    <p class="required bold-500 font-size-14 color-7a7a7a">Service Required</p>

    <p
      v-if="selectServiceList.length !== 0"
      class="service-name ml-3 px-3 py-1"
    >
      {{ details.service }}
    </p>
  </div>
  <div class="flex flex-row align-items-center ml-4 mt-0 pt-0 mb-2">
    <div
      class="flex flex-row mr-4"
      v-for="item in SalesDialogCategories"
      :key="item.key"
    >
      <div class="flex mr-3">
        <Checkbox
          :disabled="!item.check && selectServiceList.length == 2"
          v-model="item.check"
          :binary="true"
          @change="selectService($event, item)"
        />
      </div>
      <div class="flex">
        <span :class="`chk ${item.check ? 'service-color' : ''}`">{{
          item.name
        }}</span>
      </div>
    </div>
  </div>
  <div class="field col-12 md:col-12 ml-3">
    <h5 class="required bold-500 font-size-14 color-7a7a7a">Package Details</h5>
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
import Checkbox from "primevue/checkbox";
import { mapActions, mapState } from "vuex";
import {
  expressContract,
  expressContractState,
} from "../../../../../../../store/helper";
export default {
  name: "SalesExpressContractSecondStep",
  components: {
    Checkbox,
  },
  data: () => ({
    v$: useVuelidate(),
    renderKey: 1,
    selectServiceList: [],
    formData: {
      customer_type: "Express",
      business_type: "Contract",
      status: "New",
    },
    details: {
      priority: "High",
      referred_by: "",
      referral_name: "",
      previously_served_by: "",
      sales_commission: "",
      festival_name: "Chinese New Year",
      standard_liability: "",
      volumetric_value: "5000",
      package_details: "",
      service: "",
      bike: false,
      van: false,
      fsr: false,
    },
    SalesDialogCategories: [
      { name: "Bike", key: "Bike", check: false },
      { name: "Van", key: "Van", check: false },
      { name: "FSR", key: "FSR", check: false },
    ],

    customer_type: [{ name: "Express", code: "USD" }],
    business_type: [{ name: "Contract", code: "USD" }],
    status: [
      { name: "New", code: "New" },
      { name: "Approved", code: "Approved" },
      { name: "Quote", code: "Quote" },
      { name: "Declined", code: "Declined" },
      { name: "Concluded", code: "Concluded" },
      { name: "Hold", code: "Hold" },
    ],
    referred_by: [],
    referral_name: [],
    priority: [
      { name: "High", code: "USD" },
      { name: "Low", code: "USD" },
    ],
    // Dummy data added for validation
    festival_name: [],
    previously_served_by: [
      { name: "AbC Company", code: "abc" },
      { name: "EFG Company", code: " efg" },
    ],

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
  computed: {
    ...expressContractState,
    ...mapState({
      finalData: (state) => state.salesExpressContract.payloadPost,
    }),
  },
  methods: {
    ...expressContract,
    ...mapActions({
      getFestivalList: "Outbound/getFestivalList",
      setPostData: "salesExpressContract/setPayloadPostData",
    }),
    goBackHandler() {
      this.navigateStepper({
        step: this.expressContractStep[0].component,
      });
      this.$store.state.salesExpressContract.flowStep--;
    },
    closeDialog() {
      this.$store.dispatch("salesSales/closeDialog");
    },
    getUserInput_1() {
      this.setExpressContractData({ value: this.formData });
    },
    getUserInput() {
      this.setExpressContractData({ key: "quotation", value: this.details });
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
      this.previously_served_by = [];
      let res = await this.getPreviouslyServed();
      res.data.results.map((i) => {
        this.previously_served_by.push({
          name: i.competitor_name,
          code: i.id,
        });
      });
      if (this.details.previously_served_by == "") {
        this.details.previously_served_by = this.previously_served_by[0].name;
        this.renderKey++;
      }
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
    async fetchRefferalPerson(event) {
      if (event.value == "Staff") {
        const res = await this.getEmployees();
        this.Caller = [];
        if (res) {
          res.data.results.map((i) => {
            this.referral_name.push({ name: i.display_name, code: i.id });
          });
        }
      } else {
        this.referral_name = [];
      }
    },
    selectService(event, item) {
      let exits = this.details.service;
      this.selectServiceList = this.SalesDialogCategories.filter(
        (i) => i.check === true
      );
      this.selectServiceList.sort((a, b) =>
        a.name == "FSR" && b.name != "FSR" ? 1 : -1
      );
      this.details.bike = this.SalesDialogCategories[0].check;
      this.details.van = this.SalesDialogCategories[1].check;
      this.details.fsr = this.SalesDialogCategories[2].check;
      let ser = this.selectServiceList;
      if (ser.length != 0) {
        this.details.service =
          ser.length == 2 ? `${ser[0].name} + ${ser[1].name}` : ser[0].name;
      } else {
        this.details.service = "";
      }

      let stepData = [];
      stepData = [
        {
          index: 0,
          label: "1",
          component: "SalesExpressContractFirstStep",
          name: "Add Address",
        },
        {
          index: 1,
          label: "2",
          component: "SalesExpressContractSecondStep",
          name: "Select Method",
        },
      ];
      if (this.details.service) {
        if (this.details.service === "FSR") {
          stepData.push(this.dynamicStep[3]);
        } else {
          stepData.push(this.dynamicStep[0]);
          if (this.details.service.includes("Bike") && exits !== "Van") {
            stepData.push(this.dynamicStep[2]);
          }
          if (this.details.service.includes("Van")) {
            stepData.push(this.dynamicStep[1]);
          }
          if (this.details.service.includes("Bike") && exits === "Van") {
            stepData.push(this.dynamicStep[2]);
          }
          if (this.details.service.includes("FSR")) {
            stepData.push(this.dynamicStep[3]);
          }
        }
        stepData.push(this.dynamicStep[4]);
        stepData.map((i, count) => {
          i.index = count;
          i.label = `${i.index + 1}`;
          return i;
        });
      }
      this.$store.state.salesExpressContract.ExpressContractFlowStepperData =
        stepData;
    },
    nextStepHandler() {
      if (this.details.service === "") {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please select service.",
          life: 3000,
        });
      }
      if (this.v$.$invalid && this.details.service !== "") {
        this.submitted = true;
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please fill in all the required fields.",
          life: 3000,
        });
      }

      if (!this.v$.$invalid && this.details.service !== "") {
        this.getUserInput_1();
        this.getUserInput();
        this.navigateStepper({
          step: this.expressContractStep[2].component,
        });
        this.$store.state.salesExpressContract.flowStep++;
      }
    },
    prefillData() {
      let event = {};
      event.value = this.overViewData?.express_contract[0]?.referred_by;
      this.fetchRefferalPerson(event);
      let details = this.overViewData?.express_contract[0] ?? {};
      (this.details.status = this.overViewData.status),
        (this.details.priority = details.priority),
        (this.details.referred_by = details.referred_by),
        (this.details.referral_name = details.referral_name),
        (this.details.previously_served_by = details.previously_served_by),
        (this.details.sales_commission = details.sales_commission),
        (this.details.standard_liability = details.standard_liability),
        (this.details.volumetric_value = details.volumetric_value),
        (this.details.festival_name = details.festival_name),
        (this.details.package_details = details.package_details);
      this.SalesDialogCategories[0].check = details.bike;
      this.SalesDialogCategories[1].check = details.van;
      this.SalesDialogCategories[2].check = details.fsr;
      this.details.bike = details.bike;
      this.details.van = details.van;
      this.details.fsr = details.fsr;
      let ser = this.SalesDialogCategories.filter((i) => i.check === true);
      ser.sort((a, b) => (a.name == "FSR" && b.name != "FSR" ? 1 : -1));
      this.selectServiceList = ser;
      this.details.service =
        ser.length == 2 ? `${ser[0].name} + ${ser[1].name}` : ser[0].name;
      this.renderKey++;
    },
  },
  async created() {
    this.formData.customer_type = this.customer_type[0].name;
    this.formData.business_type = this.business_type[0].name;
    await this.getFestivals();
    this.getReferred();
    this.getPrevious();
    if (this.overViewData) {
      this.prefillData();
    }
  },
  mounted() {
    if (this.overViewData) {
      this.prefillData();
    }
  },
};
</script>

<style scoped>
.service-name {
  background-color: #afcbf5;
  color: #357dea;
  border-radius: 8px;
}
.service-color {
  color: #357dea;
}
</style>
