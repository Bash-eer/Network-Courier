<template>
  <div>
      <div class="mt-5 pickup-sub-head">
          <h4>Pick Up Location</h4>
      </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Pick Up Location Name</h5>
      <TextField
        label="location_name"
        type="text"
        v-model="details.location_name"
        :classes="{
          'p-invalid': v$.details.location_name.$invalid && submitted,
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
      <h5 class="required dialog-label-text">Postal Code</h5>
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
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Location ID</h5>
      <TextField
        label="Location ID"
        type="number"
        v-model="details.location_id"
        :classes="{
          'p-invalid': v$.details.location_id.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Default</h5>
      <!-- salutation -->
      <div class="p-inputgroup">
        <TextField
          label="Default"
          v-model="details.default"
          :classes="{
            'p-invalid': v$.details.default.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Default Pickup Mode</h5>
      <DropDown
        code="name"
        :data="pickup_mode"
        label="pickup_mode"
        v-model="details.pickup_mode"
        :class="{
          'p-invalid': v$.details.pickup_mode.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <label class="required dialog-label-text" for="Pickup Cutoff">Pickup Cutoff Time </label>
      <TextField
        label="pickup_cutoff "
        type="number"
        v-model="details.pickup_cutoff"
        :classes="{
          'p-invalid': v$.details.pickup_cutoff.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="dialog-label-text">Remarks</h5>
      <TextAreaField
        :state="details.reamrks"
        label="remarks"
        v-model="details.reamrks"
        @blur="v$.details.reamrks.$model;"
        :classes="{
          'p-invalid': v$.details.reamrks.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
      
    </div>
  </div>
  <div class="flex mb-2">
    <span class="new-field mt-0"><b>+ Add Pickup Location </b></span>
  </div>
  <div class="align-self-center flex"></div>
  <div class="flex align-self-center justify-content-end">
      <div class="previous-button">
        <Buttons
        label="Previous"
        v-on:childToParent="previousData"
        class="p-button-outlined mr-1 dialog-button-text"
        />
      </div>
    <CancelButton storePath="salesSales" />
    <Buttons
      label="Save"
      button_class="dialog-button-text"
      v-on:childToParent="submitData"
    />
  </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
  name: "RapidoAddCostCenter",
  data: () => ({
    v$: useVuelidate(),
    details: {
      location_name: "",
      short_name: "",
      address: "",
      pin_code: "",
      country: "",
      pickup_mode:"",
      state: "",
      build_name: "",
      floor_no: "",
      unit_no: "",
      default: "",
      pickup_cutoff: "",
      location_id:"",
      email: "",
      reamrks:"",
    },
    country: [
      { name: "India", code: "USD" },
      { name: "England", code: "SGD" },
      { name: "Singapore", code: "SGD" },
    ],
    pickup_mode:[
       { name: "van" },
      { name: "car"},
      { name: "busd" },
    ],
    submitted: false,
  }),
  validations() {
    return {
      details: {
        location_name: { required },
        short_name: { required },
        address: { required },
        pin_code: { required },
        country: { required },
        pickup_mode:{ required},
        state: { required },
        default: { required },
        pickup_cutoff: { required },
        email: { required, email },
        location_id:{ required },
        reamrks:{ required }
      },
    };
  },
  methods: {
    previousData(){
        
        console.log(this.$store.state.quotation.quotationDetails);
        this.$store.dispatch("quotation/navigateStepper", {
          step: "RapidoCostCenter",
        });
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      console.log('details',this.details);
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
.previous-button{
    margin-right: 36rem;
}
</style>