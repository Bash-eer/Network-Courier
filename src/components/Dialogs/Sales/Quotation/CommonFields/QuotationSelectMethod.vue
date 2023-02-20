<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Customer Type</h5>
      <DropDown
        :state="details.customer_type"
        code="code"
        :data="customerType"
        label="customer_type"
        v-model="details.customer_type"
        :classes="{
          'p-invalid': v$.details.customer_type.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Business Method</h5>
      <DropDown
        :state="details.business_method"
        code="code"
        :data="businessType"
        label="business_method"
        v-model="details.business_method"
        :classes="{
          'p-invalid': v$.details.business_method.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Status</h5>
      <DropDown
        :state="details.status"
        code="code"
        :data="status"
        label="status"
        v-model="details.status"
        :classes="{
          'p-invalid': v$.details.status.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Priority</h5>
      <DropDown
        :state="details.priority"
        code="code"
        :data="Priority"
        label="priority"
        v-model="details.priority"
        :classes="{
          'p-invalid': v$.details.priority.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text">Referred By</h5>
      <DropDown
        :state="details.referred_by"
        code="code"
        :data="Referred"
        label="referred_by"
        v-model="details.referred_by"
        :classes="{
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text">Referral Person Name</h5>
      <DropDown
        :state="details.referral_person_name"
        code="code"
        :data="Referral"
        label="referral_person_name"
        v-model="details.referral_person_name"
        :classes="{
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Perviously Served By</h5>
      <DropDown
        :state="details.previously_served_by"
        code="code"
        :data="Perviously"
        label="previously_served_by"
        v-model="details.previously_served_by"
        :classes="{
          'p-invalid': v$.details.previously_served_by.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text">Sales Commission ($)</h5>
      <TextField
        label="name_of_the_profile"
        type="text"
        v-model="details.sales_comission"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>

  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="dialog-label-text">Service Required</h5>
      <RadioButtons
        p-radiobutton-box
        label="service_required"
        v-model="details.service_required"
        state="radioButtonSalesState"
        v-bind:radioButtonData="serviceCategories"
        v-on:childToParent="radioButtonChange"
        class="btn"
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
        v-on:childToParent="goBack"
        class="p-button-outlined mr-1 dialog-button-text"
      />
      <div className="align-self-center flex "></div>
      <div className="flex align-self-center  justify-content-end">
        <Buttons
          label="Cancel"
          class="p-button-outlined mr-1 dialog-button-text"
        />
        <Buttons
          label="Next"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "QuotationSelectMethod",
  data: () => ({
    businessType: [
      { name: "Agent", code: "AG" },
      { name: "Adhoc", code: "AD" },
      { name: "Contract", code: "CT" },
    ],
    customerType: [
      { name: "Express", code: "EX" },
      { name: "International", code: "IN" },
      { name: "Rapido", code: "RP" },
    ],
    Priority: [
      { name: "High", code: "H1" },
      { name: "Low", code: "L1" },
    ],
    Referred: [
      { name: "Rider1", code: "R1" },
      { name: "Rider2", code: "R2" },
    ],
    Referral: [
      { name: "Jacob1", code: "J1" },
      { name: "Jacob1", code: "J2" },
    ],
    Perviously: [
      { name: "ABC Company1", code: "P1" },
      { name: "ABC Company2", code: "P2" },
    ],
    status: [
      { name: "New1", code: "N1" },
      { name: "New2", code: "N2" },
    ],
    serviceCategories: [
      { name: "Bike", key: "S1" },
      { name: "Van", key: "S2" },
      { name: "FSR", key: "S3" },
      { name: "Project", key: "S4" },
    ],
    v$: useVuelidate(),

    details: {
      customer_type: "",
      business_method: "",
      status: "",
      priority: "",
      referred_by: "",
      referral_person_name: "",
      previously_served_by: "",
      sales_comission: "",
      service_required: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        customer_type: { required },
        business_method: { required },
        status: { required },
        priority: { required },
        previously_served_by: { required },
      },
    };
  },
  methods: {
    goBack() {
      this.$store.state.sales.stepperNavigation = "QuotationAddAddress";
    },
    //eslint-disable-next-line no-unused-vars
    radioButtonChange(label, value) {
      this.$store.state.masters.expressRegionsTripTableData = null;
      if (
        value == "Van" ||
        value == "Bike" ||
        value == "FSR" ||
        value == "Project"
      ) {
        this.$store.state.sales.quotationDialogLoadState = value;
      }
    },
    dropDownFilter(data, checkerCode, inputCode) {
      for (var dd in data) {
        if (inputCode == data[dd][checkerCode]) {
          return data[dd].name;
        }
      }
    },
    getDropDownData(type) {
      let data;
      switch (type) {
        case "business_method":
          data = "businessType";
          break;
        case "customer_type":
          data = "customerType";
          break;
        case "priority":
          data = "Priority";
          break;
        case "referred_by":
          data = "Referred";
          break;
        case "referral_person_name":
          data = "Referral";
          break;
        case "status":
          data = "status";
          break;
        case "previously_served_by":
          data = "Perviously";
          break;
      }
      return data;
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        for (var d in this.details) {
          if (
            d == "business_method" ||
            d == "customer_type" ||
            d == "priority" ||
            d == "referred_by" ||
            d == "referral_person_name" ||
            d == "status" ||
            d == "previously_served_by"
          ) {
            if (this.details[d].length == 2) {
              let src = this.getDropDownData(d);
              this.details[d] = this.dropDownFilter(
                this[src],
                "code",
                this.details[d]
              );
            }
            this.$store.state.sales.quotationCreationFormData[d] =
              this.details[d];
          }
          if (d == "service_required") {
            if (this.details[d] == "Bike") {
              this.details[d] = "bike";
            }
            if (this.details[d] == "Van") {
              this.details[d] = "van";
            }
            if (this.details[d] == "FSR") {
              this.details[d] = "fsr";
            }
            if (this.details[d] == "Project") {
              this.details[d] = "project";
            }
            this.$store.state.sales.quotationCreationFormData[d] =
              this.details[d];
          } else {
            this.$store.state.sales.quotationCreationFormData[d] =
              this.details[d];
          }
        }
        this.$store.state.sales.stepperNavigation = "QuotationTripDetails";
      }
    },
    capitalizeFirstLetter(string) {
      if (string != "") {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state["sales"].quotationCreationStateData)
          .length != 0
      ) {
        for (let state in this.details) {
          if (state == "service_required") {
            this.$store.state.users.radioButtonSalesState =
              this.capitalizeFirstLetter(
                this.$store.state["sales"].quotationCreationStateData[state]
              );
          } else {
            this.details[state] =
              this.$store.state["sales"].quotationCreationStateData[state];
          }
        }
        this.details["service_required"] =
          this.$store.state.users.radioButtonSalesState;
        this.radioButtonChange(
          "",
          this.$store.state.users.radioButtonSalesState
        );
      }
    },
  },
  activated() {
    this.loadState();
  },
  created() {
    let apiPath =
      "?type=sales_company&type_id=" + this.$store.state.sales.salesCompanyid;
    this.$store.dispatch("sales/loadContactsApi", {
      apiPath: apiPath,
    });
    this.loadState();
  },
};
</script>

<style scoped>
.txt {
  font-size: 14px;
  font-weight: bold;
  color: black;
}
.btn {
  font-size: 14px;
}
.textA {
  color: black;
}

.draganddrop {
  text-align: center !important;
}
</style>
