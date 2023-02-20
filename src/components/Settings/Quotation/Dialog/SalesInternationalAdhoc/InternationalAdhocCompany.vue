<template>
  <div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="required dialog-label-text">Company Name</h5>
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
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text">Mobile No</h5>
        <TextField
          label="mobileNo"
          type="number"
          v-model="details.mobile_no"
          :classes="{
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <label class="required dialog-label-text" for="Email ID">Email</label>
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
        <h5 class="required dialog-label-text">Contact No</h5>
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
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text">Designation</h5>
        <TextField
          label="designation"
          v-model="details.designation"
          :classes="'inputfield w-full dialog-field-text '"
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
        <Buttons
          label="Cancel"
          v-on:childToParent="closeDialog"
          class="p-button-outlined mr-1 dialog-button-text"
        />
        <Buttons
          label="Next"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
          class="dialog-button-text"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
export default {
  name: "InternationalAdhocCompany",
  data: () => ({
    v$: useVuelidate(),
    details: {
      company_name: "",
      contact_no: "",
      email: "",
      mobile_no: "",
      designation: "",
    },
    email: "",
    submitted: false,
  }),
  validations() {
    return {
      details: {
        company_name: { required },
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
/* salutation */
select{ 
  background-color: transparent !important;
  border : none !important;
  line-height:0%;
  outline : 0px !important;
  box-shadow: none !important;
}
</style>
