<template>
  <p class="-mt-3">
    {{
      this.$store.state.salesExpressAdhoc?.editExpressAdhocData?.quotation_id
    }}
  </p>
  <div class="field col-12 md:col-12">
    <p class="bold-700 font-size-12 color-343434 mt-2 mb-0">Cost Per Unit</p>
  </div>
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">Customer Type</h5>
      <DropDown
        code="name"
        :data="customer_type"
        label="customer_type"
        :state="details.customer_type"
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
        code="name"
        :data="business_type"
        label="business_type"
        :state="details.business_type"
        v-model="details.business_type"
        :class="{
          'p-invalid': v$.details.business_type.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid ml-3 mb-0">
    <div class="field col-12 md:col-6">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">Status</h5>
      <DropDown
        code="name"
        :data="status"
        label="status"
        v-model="details.status"
        :state="details.status"
        :class="{
          'p-invalid': v$.details.status.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">Priority</h5>

      <DropDown
        :key="renderKey"
        code="name"
        :data="priority"
        label="priority"
        v-model="roleDetails.priority"
        :state="roleDetails.priority"
        v-on:childToParent="getUserInput"
        :class="{
          'p-invalid': v$.details.priority.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>

  <div class="field col-12 md:col-12">
    <p class="bold-700 font-size-12 color-343434 mt-4 mb-0">Delivery Type</p>
  </div>
  <div class="flex flex-row justify-content-between align-items-center">
    <RadioButtons
      label="platform"
      state="radioButtonCompany"
      v-bind:radioButtonData="SalesDialogCategories"
      v-model="roleDetails.e_commerce"
      :selectedRadioButton="selectedRadioButton"
      class="bold-700 font-size-16 color-ada7a7 m-0 pl-2"
    />
    <!-- <RadioButtons
      label="platform"
      v-bind:radioButtonData="SalesDialogCategories"
      state=""
      v-model="e_commerce"
      :selectedRadioButton="selectedRadioButton"
      class="bold-700 font-size-16 color-ada7a7 m-0 pl-2"
    /> -->
  </div>
  <div class="field col-12 md:col-12">
    <p class="bold-700 font-size-12 color-343434 mt-4 mb-0">Service Required</p>
  </div>
  <div class="flex flex-row justify-content-between align-items-center">
    {{ modelValue }}
    <RadioButtons
      label="platform"
      state="radioButtonCompany"
      v-bind:radioButtonData="DelvieryCategories"
      v-model="roleDetails.BikeCategory"
      :selectedRadioButton="selectedRadioButtonBike"
      class="bold-700 font-size-16 color-ada7a7 m-0 pl-2"
    />
  </div>

  <div>
    <span
      v-if="
        roleDetails.e_commerce == 'Normal' && roleDetails.BikeCategory == 'Bike'
      "
    >
      <ExpressAdhocBikeCategory
        v-on:childToParent="closeDialog"
        :dialogComponent="$store.state['salesExpressAdhoc'].dialogComponent"
      />
    </span>
    <span
      v-if="
        roleDetails.e_commerce == 'Normal' && roleDetails.BikeCategory == 'Van'
      "
    >
      <ExpressAdhocVanCategory
        v-on:childToParent="closeDialog"
        :dialogComponent="$store.state['salesExpressAdhoc'].dialogComponent"
      />
    </span>

    <span
      v-if="
        roleDetails.e_commerce == 'E-Commerce' &&
        roleDetails.BikeCategory == 'Bike'
      "
    >
      <ExpressAdhocBikeCategory
        v-on:childToParent="closeDialog"
        :dialogComponent="$store.state['salesExpressAdhoc'].dialogComponent"
      />
    </span>
    <span
      v-if="
        roleDetails.e_commerce == 'E-Commerce' &&
        roleDetails.BikeCategory == 'Van'
      "
    >
      <ExpressAdhocVanCategory
        v-on:childToParent="closeDialog"
        :dialogComponent="$store.state['salesExpressAdhoc'].dialogComponent"
      />
    </span>
  </div>

  <!-- <SalesDialogs
    v-on:childToParent="closeDialog"
    :dialogComponent="$store.state['salesExpressAdhoc'].dialogComponent"
  /> -->
  <Toasts
    :severity="$store.state['salesExpressAdhoc'].toastData.severity"
    :summary="$store.state['salesExpressAdhoc'].toastData.summary"
  />
</template>

<script>
import ExpressAdhocBikeCategory from "../../Express/Adhoc/Bike.vue";
import ExpressAdhocVanCategory from "../../Express/Adhoc/CarCategory.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Toasts from "./Toast.vue";
export default {
  name: "ExpressAdhocQuotationDialog",

  data: () => ({
    v$: useVuelidate(),
    selectedRadioButton: null,
    selectedRadioButtonBike: null,
    renderKey: 1,
    details: {
      customer_type: "",
      business_type: "",
      status: "",
      priority: "High",
    },
    SalesDialogCategories: [
      { name: "Normal", key: "CU" },
      { name: "E-Commerce", key: "IU" },
    ],
    DelvieryCategories: [
      { name: "Bike", key: "BK" },
      { name: "Van", key: "VN" },
    ],
    customer_type: [
      { name: "Express", code: "USD" },
      // { name: "Adhoc", code: "SGD" },
    ],
    business_type: [
      // { name: "Express", code: "USD" },
      { name: "Adhoc", code: "SGD" },
    ],
    status: [
      { name: "New", code: "USD" },
      // { name: "Old", code: "USD" },
    ],
    priority: [
      { name: "High", code: "USD" },
      { name: "Low", code: "USD" },
    ],

    roleDetails: {
      BikeCategory: "",
      e_commerce: "",
      priority: "High",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        customer_type: { required },
        business_type: { required },
        status: { required },
        priority: { required },
      },
      roleDetails: {
        BikeCategory: { required },
        e_commerce: { required },
        priority: { required },
      },
    };
  },
  watch: {
    roleDetails: {
      handler() {
        if (this.roleDetails.e_commerce && this.roleDetails.BikeCategory) {
          let payload = {
            status: this.details.status,
            business_type: this.business_type.map((i) => {
              return i.name;
            }),
            customer_type: this.customer_type.map((i) => {
              return i.name;
            }),
            profile_id: this.$route.params.id,
            e_commerce:
              this.roleDetails.e_commerce == "E-Commerce" ? true : false,
            normal: this.roleDetails.e_commerce == "Normal" ? true : false,
            bike: this.roleDetails.BikeCategory == "Bike" ? true : false,
            van: this.roleDetails.BikeCategory == "Van" ? true : false,
            priority: this.roleDetails.priority,
          };

          this.$store.dispatch(
            "salesExpressAdhoc/createQuotationExpressAdhoc",
            {
              data: payload,
            }
          );
        }
      },
      deep: true,
    },
  },
  methods: {
    openDialog(name) {
      this.$store.state.users.displayDialog = true;
      this.$store.state.users.dialogComponent = name;
      this.$store.getters.controlActivityDialog;
    },
  },

  async created() {
    this.$store.state.sales.stepperNavigation = null;
    // this.$store.dispatch("salesExpressAdhoc/loadExpressAdhocRowData", {
    //   path:
    //     "/sales/quotations/overview/" +
    //     this.$store.state.salesExpressAdhoc.ExpressAdhocEditData.id,
    // });

    this.details.business_type = this.business_type[0].name;
    this.details.customer_type = this.customer_type[0].name;
    this.details.status = this.status[0].name;

    if (this.$store.state.salesExpressAdhoc.ExpressAdhocEditData) {
      this.roleDetails.priority =
        this.$store.state.salesExpressAdhoc.editExpressAdhocData
          ?.express_adhoc_specifics?.priority == "High"
          ? "High"
          : "Low";
    }

    if (this.$store.state.salesExpressAdhoc.editExpressAdhocData) {
      this.roleDetails.e_commerce =
        this.$store.state.salesExpressAdhoc?.editExpressAdhocData
          ?.express_adhoc_specifics?.e_commerce == true
          ? "E-Commerce"
          : "Normal";
      if (
        this.$store.state.salesExpressAdhoc?.editExpressAdhocData
          ?.express_adhoc_specifics.e_commerce == true
      ) {
        this.selectedRadioButton = this.SalesDialogCategories[1];
      } else {
        this.selectedRadioButton = this.SalesDialogCategories[0];
      }

      this.roleDetails.BikeCategory =
        this.$store.state.salesExpressAdhoc?.editExpressAdhocData
          ?.express_adhoc_specifics?.van == true
          ? "Van"
          : "Bike";
      if (
        this.$store.state.salesExpressAdhoc?.editExpressAdhocData
          ?.express_adhoc_specifics?.van == true
      ) {
        this.selectedRadioButtonBike = this.DelvieryCategories[1];
      } else {
        this.selectedRadioButtonBike = this.DelvieryCategories[0];
      }
    }

    if (!this.$store.state.salesExpressAdhoc.editExpressAdhocData) {
      this.roleDetails.BikeCategory = this.DelvieryCategories[0].name;
      this.roleDetails.e_commerce = this.SalesDialogCategories[0].name;
      this.roleDetails.priority =
        this.$store.state.salesExpressAdhoc.editExpressAdhocData?.priority;
    }
    this.renderKey++;
  },

  components: {
    ExpressAdhocBikeCategory,
    ExpressAdhocVanCategory,
    Toasts,
  },
  unmounted() {
    this.$store.state.salesExpressAdhoc.editExpressAdhocData = null;
    this.$store.state.salesExpressAdhoc.ExpressVanData = null;
    this.$store.state.salesExpressAdhoc.DialogNormalVan = null;
    this.$store.state.salesExpressAdhoc.inspectionsDropDownTableData = null;
    this.$store.state.salesExpressAdhoc.NormalBikeData = null;
    this.$store.state.salesExpressAdhoc.additionOfRowsEach = null;
  },
};
</script>

<style></style>
