<template>
  <div>
    <div class="formgrid grid">
      <div class="field col-6 md:col-4">
        <h5 class=" dialog-label-text">Maximum Quantity</h5>
        <TextField
          label="companyName"
          v-model="details.company_name"
          @blur="v$.details.company_name.$model;"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details.company_name.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-6 md:col-4">
        <h5 class="dialog-label-text">Van Job Min Cost ($)</h5>
       <TextField
          label="companyName"
          v-model="details.company_name"
          @blur="v$.details.company_name.$model;"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details.company_name.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-6 md:col-4">
        <h5 class=" dialog-label-text">Van Job Add. Quantity</h5>
        <TextField
          label="customerName"
          v-model="details.contact_name"
          @blur="v$.details.contact_name.$model"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details.contact_name.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-6 md:col-4">
        <h5 class=" dialog-label-text">Van Job Add. Cost  $</h5>
        <TextField
          label="contactNo"
          type="number"
          v-model="details.contact_no"
          @blur="v$.details.contact_no.$model;"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details.contact_no.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>
   
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
export default {
  name: "Company",
  data: () => ({
    tradeData: [
      { name: "Bank", code: "B" },
      { name: "Private", code: "P" },
    ],
    v$: useVuelidate(),
    details: {
      company_name: "",
      Trade: "",
      contact_name: "",
      contact_no: "",
      email: "",
      mobile_no: "",
      designation: "",
      fax_no: "",
      website: "",
      roc_no: "",
    },
    email: "",
    submitted: false,
  }),
  validations() {
    return {
      details: {
        company_name: { required },
        contact_name: { required },
        contact_no: { required },
        email: {
          required,
          email,
        },
      },
    };
  },
  methods: {
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        for (var t in this.tradeData) {
          if (this.details.Trade == this.tradeData[t].code) {
            this.details.Trade = this.tradeData[t].name;
          }
        }
        this.details.status = "company";
        for (var d in this.details) {
          this.$store.state.sales.companyCreationFormData[d] = this.details[d];
        }
        this.$store.state.sales.stepperNavigation = "Address";
      }
    },
  },
  created() {
    if (
      Object.keys(this.$store.state["sales"].companyCreationStateData).length !=
      0
    ) {
      for (var state in this.details) {
        this.details[state] =
          this.$store.state["sales"].companyCreationStateData[state];
      }
    }
  },
};
</script>

<style scoped>
.required {
  color: #7a7a7a;
}
.required:after {
  content: "*";
  color: red;
}
.p-multiselect-label {
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 1px;
  text-align: left;
}
.pi-chevron-down {
  position: absolute !important;
  right: 10px !important;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
