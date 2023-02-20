<template>
  <br />
  <div class="field col-12 md:col-12">
    <p class="txt ml-3">Agency Profile</p>
  </div>
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text required">Status</h5>
      <DropDown
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
    <div class="field col-12 md:col-8">
      <h5 class="dialog-label-text">If Others</h5>
      <TextField
        label="if_others"
        v-model="details.if_others"
        :class="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-5">
      <h5 class="required dialog-label-text">Name Of Managing Director</h5>
      <TextField
        label="name_of_director"
        type="text"
        v-model="details.name_of_director"
        :classes="{
          'p-invalid': v$.details.name_of_director.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-3">
      <h5 class="required dialog-label-text">Capital Declared</h5>
      <TextField
        label="capital_declared"
        type="text"
        v-model="details.capital_declared"
        :classes="{
          'p-invalid': v$.details.capital_declared.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-3">
      <h5 class="required dialog-label-text">Paid Up Capital</h5>
      <TextField
        label="paid_capital"
        type="text"
        v-model="details.paid_capital"
        :classes="{
          'p-invalid': v$.details.paid_capital.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Share Holder</h5>
      <TextField
        label="share_holder"
        type="text"
        v-model="details.share_holder"
        :classes="{
          'p-invalid': v$.details.share_holder.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Percentage</h5>
      <TextField
        type="number"
        label="percentage"
        v-model="details.percentage"
        :classes="{
          'p-invalid': v$.details.percentage.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="flex ml-3">
    <span class="new-field mt-0"><b>+ Add New Share Holder </b></span>
  </div>
  <br />
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Branches&Affiliates</h5>
      <TextField
        label="branches_affiliates"
        type="text"
        v-model="details.branches_affiliates"
        :classes="{
          'p-invalid': v$.details.branches_affiliates.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="flex ml-3">
    <span class="new-field mt-0"><b>+ Add New Branches&Affiliates </b></span>
  </div>
  <br />
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text">Main Bank</h5>
      <TextField
        label="main_bank"
        type="text"
        v-model="details.main_bank"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>

    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text">Branch</h5>
      <TextField
        label="branch"
        type="text"
        v-model="details.branch"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="field col-12 md:col-12">
    <p class="txt ml-3 $color-343434">Potenial</p>
  </div>
  <div class="formgrid grid ml-3">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">
        How Many Shipments do you forecast for delivery into Singpore per month?
      </h5>
      <TextField
        label="shipements_delivery"
        type="text"
        v-model="details.shipements_delivery"
        :classes="{
          'p-invalid': v$.details.shipements_delivery.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid pl-2 pr-2">
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
      <Buttons
        label="Previous"
        v-on:childToParent="goBackHandler"
        class="p-button-outlined mr-1 dialog-button-text"
      />
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <Buttons
          label="Cancel"
          class="p-button-outlined mr-1 dialog-button-text"
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
export default {
  name: "AddQuestionnaireDialog",
  data: () => ({
    v$: useVuelidate(),
    details: {
      status: "",
      if_others: "",
      name_of_director: "",
      capital_declared: "",
      paid_capital: "",
      share_holder: "",
      percentage: "",
      branches_affiliates: "",
      main_bank: "",
      branch: "",
      shipements_delivery: "",
    },

    status: [
      { name: "Limited", code: "USD" },
      { name: "Private", code: "SGD" },
      { name: "Joint-venture", code: "SGD" },
      { name: "Others", code: "SGD" },
    ],

    submitted: false,
  }),
  validations() {
    return {
      details: {
        status: { required },
        name_of_director: { required },
        capital_declared: { required },
        paid_capital: { required },
        share_holder: { required },
        percentage: { required },
        branches_affiliates: { required },
        shipements_delivery: { required },
      },
    };
  },
  methods: {
    goBackHandler() {
      this.$store.dispatch("quotation/navigateStepper", {
        step: "AddMethodDialog",
      });
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.$store.state.quotation.quotationDetails.push(this.details);
        this.$store.dispatch("quotation/navigateStepper", {
          step: "AddCostingDialog",
        });
      }
    },
  },
};
</script>

<style></style>
