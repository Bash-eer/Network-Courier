<template>
  <div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="required dialog-label-text">Customer Name</h5>
        <TextField
          label="customerName"
          v-model="details.customerName"
          @blur="v$.details.customerName.$model"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details.customerName.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text">Contact No</h5>
        <TextField
          label="contactNo"
          type="number"
          v-model="details.contactNo"
          @blur="v$.details.contactNo.$model;"
          v-on:childToParent="getUserInput"
          :classes="{
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>

    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <label class="required dialog-label-text" for="Email ID"
          >Email ID</label
        >
        <TextField
          id="Email ID"
          type="text"
          label="Email ID"
          v-model="details['email']"
          @blur="v$.details['email'].$model"
          placeholder="e.g. Tommy@gmail.com"
          v-on:childToParent="FormInput"
          :classes="{
            'p-invalid': v$.details['email'].$invalid && submitted,
            'dialog-label-text dialog-field-text': true,
          }"
        ></TextField>
        <span v-if="v$.details['email'].$error && submitted">
          <span
            id="email-error"
            v-for="(error, index) of v$.details['email'].$errors"
            :key="index"
          >
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
        <small
          v-else-if="
            (v$.details['email'].$invalid && submitted) ||
            v$.details['email'].$pending.$response
          "
          class="p-error"
          >{{
            v$.details["email"].required.$message.replace("Value", "Email")
          }}</small
        >
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text">Mobile No</h5>
        <TextField
          label="mobileNo"
          type="number"
          v-model="details.mobileNo"
          @blur="v$.details.mobileNo.$model;"
          v-on:childToParent="getUserInput"
          :classes="{
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>

    <div class="formgrid grid">
      <div class="field col-6 md:col-6">
        <h5 class="dialog-label-text">Referred By Domain</h5>
        <DropDown
        code="code"
          :data="refDomainData"
          label="refDomain"
          id="refDomain"
          v-model="details.refDomain"
          :value="details.refDomain"
          @blur="v$.details.refDomain.$model;"
          v-on:childToParent="getUserInput"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text">Referral Person Name</h5>
        <DropDown
        code="code"
          :data="refPersonData"
          label="refName"
          id="refName"
          v-model="details.refName"
          :value="details.refName"
          @blur="v$.details.refName.$model;"
          v-on:childToParent="getUserInput"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>

    <div class="formgrid grid">
      <div class="field col-6 md:col-6">
        <h5 class="required dialog-label-text">Priority</h5>
        <DropDown
        code="code"
          :data="priorityData"
          label="priority"
          id="priority"
          v-model="details.priority"
          :value="details.priority"
          @blur="v$.details.priority.$model;"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details.priority.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
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
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <!-- <Buttons
          label="Back"
          v-on:childToParent="goBack"
          class="p-button-outlined mr-1 dialog-button-text"
        /> -->
        <Buttons
          label="Cancel"
          v-on:childToParent="closeDialog"
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
import { required, email } from "@vuelidate/validators";
export default {
  name: "InternationalAdhocPersonal",
  data: () => ({
    refDomainData: [
      { name: "Rider", code: "Rider" },
      { name: "Delivery", code: "Delivery" },
      { name: "Sales Girl", code: "Sales Girl" },
    ],
    refPersonData: [
      { name: "Jason", code: "Jason" },
      { name: "Tina", code: "Tina" },
      { name: "Tom", code: "Tom" },
    ],
    priorityData: [
      { name: "High", code: "H" },
      { name: "Medium", code: "N" },
      { name: "Low", code: "L" },
    ],
    v$: useVuelidate(),

    details: {
      customerName: "",
      contactNo: "",
      email: "",
      mobileNo: "",
      refDomain: "",
      refName: "",
      priority: "",
    },
    email: "",
    submitted: false,
  }),
  validations() {
    return {
      details: {
        // companyName: { required },
        customerName: { required },
        // contactNo: { required },
        // mobileNo: { required },
        priority: { required },
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
    goBack() {
      this.$store.state.sales.stepperNavigation = "Company";
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        // this.$store.state["users"].displayDialog = false;
        // this.$store.state.sales.stepperNavigation = null;
        this.$store.state.sales.stepperNavigation = "Address";
      }
    },
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
