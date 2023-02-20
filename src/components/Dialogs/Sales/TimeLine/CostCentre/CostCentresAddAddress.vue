<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Cost Center Name</h5>
      <TextField
        label="cost_centre_name"
        type="text"
        v-model="details.cost_centre_name"
        @blur="v$.details.cost_centre_name.$model;"
        :classes="{
          'p-invalid': v$.details.cost_centre_name.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
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
        @blur="v$.details.address.$model;"
        :classes="{
          'p-invalid': v$.details.address.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Postal Code</h5>
      <TextField
        label="postal_code"
        type="number"
        v-model="details.postal_code"
        @blur="v$.details.postal_code.$model;"
        :classes="{
          'p-invalid': v$.details.postal_code.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Country</h5>
      <DropDown
        code="code"
        :state="details.country"
        :data="Country"
        label="country"
        id="country"
        placeholder=""
        v-model="details.country"
        @blur="v$.details.country.$model"
        :classes="{
          'p-invalid': v$.details.country.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">State</h5>
      <DropDown
        code="code"
        :state="details.state"
        :data="State"
        label="state"
        id="state"
        placeholder=""
        v-model="details.state"
        :classes="{
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Building Name</h5>
      <TextField
        label="building_name"
        type="text"
        v-model="details.building_name"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
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
          'inputfield w-full dialog-field-text py-2': true,
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
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <CheckBox
        path="sales"
        v-bind:checker="
          details.site_office == true
            ? [
                {
                  name: 'Site Office',
                  tag: 'site_office',
                  key: 'so',
                },
              ]
            : []
        "
        v-bind:categories="[
          {
            name: 'Site Office',
            tag: 'site_office',
            key: 'so',
          },
        ]"
        v-on:childToParent="checkBoxChange"
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
      />
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "CostCentresAddAddress",
  data: () => ({
    Country: [
      { name: "Country1", code: "C1" },
      { name: "Country2", code: "C2" },
    ],
    State: [
      { name: "State", code: "C1" },
      { name: "State", code: "C2" },
    ],
    v$: useVuelidate(),
    details: {
      cost_centre_name: "",
      address: "",
      postal_code: "",
      country: "",
      state: "",
      building_name: "",
      floor_no: "",
      unit_no: "",
      site_office: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        cost_centre_name: { required },
        address: { required },
        postal_code: { required },
        country: { required },
      },
    };
  },
  methods: {
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    checkBoxChange(val, src) {
      if (val.length != 0) {
        this.details[val[0].tag] = true;
      }
      if (val.length == 0) {
        this.details[src[0].tag] = false;
      }
    },
    dropDownFilter(data, checkerCode, inputCode) {
      for (var dd in data) {
        if (inputCode == data[dd][checkerCode]) {
          return data[dd].name;
        }
      }
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        if (this.details.country.length == 2) {
          this.details.country = this.dropDownFilter(
            this.Country,
            "code",
            this.details.country
          );
        }

        if (this.details.state.length == 2) {
          this.details.state = this.dropDownFilter(
            this.State,
            "code",
            this.details.state
          );
        }

        for (let d in this.details) {
          this.$store.state.sales.costCenterFormData[d] = this.details[d];
        }
        this.$store.state.sales.stepperNavigation = "CostCentresContactPerson";
      }
    },
  },
  created() {
    if (
      Object.keys(this.$store.state["sales"].costingCentreCreationStateData)
        .length != 0
    ) {
      for (let state in this.details) {
        this.details[state] =
          this.$store.state["sales"].costingCentreCreationStateData[state];
      }
    }
  },
};
</script>

<style></style>
