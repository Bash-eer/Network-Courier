<template>
  <div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="required dialog-label-text">Cost Center Name</h5>
        <TextField
          label="customer_name"
          v-model="details.customer_name"
          :classes="{
            'p-invalid': v$.details.customer_name.$invalid && submitted,
            'inputfield w-full': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-12">
        <h5 class="required dialog-label-text">Enter the Address</h5>
        <TextField
          label="customer_address"
          v-model="details.customer_address"
          :classes="{
            'p-invalid': v$.details.customer_address.$invalid && submitted,
            'inputfield w-full': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <label class="required dialog-label-text" for="Postal Code"
          >Postal Code
        </label>
        <TextField
          label="postal_code"
          v-model="details.postal_code"
          :classes="{
            'p-invalid': v$.details.postal_code.$invalid && submitted,
            'inputfield w-full': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <label class="required dialog-label-text" for="Country ">Country</label>
        <TextField
          label="country"
          v-model="details.country"
          :classes="{
            'p-invalid': v$.details.country.$invalid && submitted,
            'inputfield w-full': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text">State</h5>
        <TextField
          label="State"
          v-model="details.state"
          :classes="{
            'p-invalid': v$.details.state.$invalid && submitted,
            'inputfield w-full': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <label class="required dialog-label-text" for="Building Name"
          >Building Name</label
        >
        <TextField
          label="building_name"
          v-model="details.building_name"
          :classes="{
            'p-invalid': v$.details.building_name.$invalid && submitted,
            'inputfield w-full ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <label class="required dialog-label-text" for="Floor No"
          >Floor No
        </label>
        <TextField
          label="floor_no"
          v-model="details.floor_no"
          :classes="{
            'p-invalid': v$.details.floor_no.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text">Unit No</h5>
        <TextField
          label="unit_no"
          v-model="details.unit_no"
          :classes="{
            'p-invalid': v$.details.unit_no.$invalid && submitted,
            'inputfield w-full ': true,
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
        <CancelButton storePath="quotation" />
        <Buttons
          label="Save"
          button_class=" font-size-14"
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
  name: "AddCostCenter",
  data() {
    return {
      details: {
        customer_name: "",
        customer_address: "",
        postal_code: "",
        country: "",
        state: "",
        building_name: "",
        floor_no: "",
        unit_no: "",
      },
      v$: useVuelidate(),
      submitted: false,
    };
  },
  validations() {
    return {
      details: {
        customer_name: { required },
        customer_address: { required },
        postal_code: { required },
        country: { required },
        state: { required },
        building_name: { required },
        floor_no: { required },
        unit_no: { required },
      },
    };
  },
  methods: {
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
    },
  },
};
</script>

<style scoped>
.p-button.p-button-outlined {
  color: #357dea;
}
</style>
