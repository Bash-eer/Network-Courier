<template>
  <div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Name of profile</h5>
      <TextField
        label="name_of_profile"
        type="text"
        v-model="details.name_of_profile"
        :classes="{
          'p-invalid': v$.details.name_of_profile.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Short Name</h5>
      <TextField
        label="short_name"
        type="text"
        v-model="details.short_name"
        :classes="{
          'p-invalid': v$.details.short_name.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Enter the Address</h5>
      <TextField
        label="address"
        type="text"
        v-model="details.address"
        :classes="{
          'p-invalid': v$.details.address.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Pincode</h5>
      <TextField
        label="pin_code"
        type="number"
        v-model="details.pin_code"
        :classes="{
          'p-invalid': v$.details.pin_code.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Country</h5>
      <DropDown
        code="name"
        :data="country"
        label="country"
        v-model="details.country"
        :class="{
          'p-invalid': v$.details.country.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">State</h5>
      <TextField
        label="state"
        type="text"
        v-model="details.state"
        :classes="{
          'p-invalid': v$.details.state.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Building Name</h5>
      <TextField
        label="build_name"
        type="text"
        v-model="details.build_name"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Floor No</h5>
      <TextField
        label="floor_no"
        type="number"
        v-model="details.floor_no"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Unit No</h5>
      <TextField
        label="unit_no"
        type="number"
        v-model="details.unit_no"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="field col-12 md:col-12">
    <p class="txt mt-4">Contact</p>
  </div>
  <!-- Img Upload -->
  <span>
    <ImgUpload URL="/images/logo-here.png" />
  </span>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Contact Name</h5>
      <!-- salutation -->
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
          <select name="salutation" id="salutation">
            <option value="mr">Mr</option>
            <option value="ms">Ms</option>
            <option value="mrs">Mrs</option>
          </select>
        </span>
        <TextField
          label="contact_name"
          v-model="details.contact_name"
          :classes="{
            'p-invalid': v$.details.contact_name.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Contact No</h5>
      <TextField
        label="contact_no"
        type="number"
        v-model="details.contact_no"
        :classes="{
          'p-invalid': v$.details.contact_no.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <label class="required dialog-label-text" for="Email ID">Email ID</label>
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
      />
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
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Designation</h5>
      <TextField
        label="designation"
        type="text"
        v-model="details.designation"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Mobile No</h5>
      <TextField
        label="mobile_no"
        type="number"
        v-model="details.mobile_no"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="flex mb-2">
    <span class="new-field mt-0"><b>+ Add Contact </b></span>
  </div>
  <div class="align-self-center flex"></div>
  <div class="flex align-self-center justify-content-end">
    <CancelButton storePath="salesSales" />
    <Buttons
      label="Next"
      button_class="dialog-button-text"
      v-on:childToParent="nextStepHandler"
    />
  </div>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
export default {
  name: "AddAddressInternationalCenter",
  data: () => ({
    v$: useVuelidate(),
    details: {
      name_of_profile: "",
      short_name:"",
      address: "",
      pin_code: "",
      country: "",
      state: "",
      build_name: "",
      floor_no: "",
      unit_no: "",
      contact_name: "",
      contact_no: "",
      email: "",
    },
    country: [
      { name: "India", code: "USD" },
      { name: "England", code: "SGD" },
      { name: "Singapore", code: "SGD" },
    ],
    submitted: false,
  }),
  validations() {
    return {
      details: {
        name_of_profile: { required },
        short_name:{ required},
        address: { required },
        pin_code: { required },
        country: { required },
        state: { required },
        contact_name: { required },
        contact_no: { required },
        email: { required, email },
      },
    };
  },
  methods: {
      
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.$store.state.quotation.quotationDetails.push(this.details);
        console.log(this.$store.state.quotation.quotationDetails);
        this.$store.dispatch("quotation/navigateStepper", {
          step: "SalesRapidoSelectedMethod",
        });
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
.pi-chevron-down {
  position: absolute !important;
  right: 10px !important;
}
select {
  background-color: transparent !important;
  border: none !important;
  line-height: 0%;
  outline: 0px !important;
  box-shadow: none !important;
}
</style>