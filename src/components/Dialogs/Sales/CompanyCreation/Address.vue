<template>
  <div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="required dialog-label-text">Enter the Address</h5>
        <TextField
          label="address1"
          v-model="details.address"
          @blur="v$.details.address.$model"
          :classes="{
            'p-invalid': v$.details.address.$invalid && submitted,
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="required dialog-label-text">Postal Code</h5>
        <TextField
          label="postalCode"
          type="number"
          v-model="details.postal_code"
          @blur="v$.details.postal_code.$model;"
          :classes="{
            'p-invalid': v$.details.postal_code.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="required dialog-label-text">Country</h5>
        <DropDown
          :data="allCountries"
          :state="details.country"
          :filter="true"
          label="country"
          id="country"
          code="isoCode"
          modelValue="isoCode"
          v-model="details.country"
          @blur="v$.details.country.$model;"
          :classes="{
            'p-invalid': v$.details.country.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text">State</h5>
        <DropDown
          :data="states"
          :state="details.state"
          :filter="true"
          label="state"
          id="state"
          code="isoCode"
          v-model="details.state"
          :value="details.state"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text">Building Name</h5>
        <TextField
          label="building_name"
          v-model="details.building_name"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
        <!-- <h5 class="required dialog-label-text">City</h5>
        <DropDown
          :data="cities"
          :filter="true"
          label="city"
          id="city"
          code="name"
          v-model="details.city"
          :value="details.city"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        /> -->
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text">Floor No</h5>
        <TextField
          label="floorNo"
          v-model="details.floor_no"
          v-on:childToParent="getUserInput"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-6 md:col-6">
        <h5 class="dialog-label-text">Unit No</h5>
        <TextField
          label="unitNo"
          v-model="details.unit_no"
          v-on:childToParent="getUserInput"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
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
      <div class="align-self-center flex">
        <Buttons
          label="Previous"
          v-on:childToParent="goBack"
          class="p-button-outlined mr-1 dialog-button-text previous-btn"
        />
      </div>
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
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { City, Country, State } from "country-state-city";
export default {
  name: "Company",
  data: () => ({
    statesWatcher: null,
    allCountries: Country.getAllCountries(),
    allStates: State.getAllStates(),
    allCities: City.getAllCities(),
    states: null,
    cities: null,
    CountryCode: null,
    StateCode: null,
    v$: useVuelidate(),
    details: {
      address: "",
      postal_code: "",
      country: "",
      state: "",
      city: "",
      building_name: "",
      floor_no: "",
      unit_no: "",
    },
    email: "",
    submitted: false,
  }),
  validations() {
    return {
      details: {
        address: { required },
        postal_code: { required },
        country: { required },
      },
    };
  },
  methods: {
    goBack() {
      this.$store.state.sales.stepperNavigation = "Information";
    },
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.details.country = this.dropDownFilter(
          this.allCountries,
          "isoCode",
          this.details.country
        );
        this.details.state = this.dropDownFilter(
          this.states,
          "isoCode",
          this.details.state
        );
        for (var d in this.details) {
          this.$store.state.sales.companyCreationFormData[d] = this.details[d];
        }
        this.$store.state.sales.stepperNavigation = "Contact";
      }
    },
    dropDownFilter(data, checkerCode, inputCode) {
      for (var dd in data) {
        if (inputCode == data[dd][checkerCode]) {
          return data[dd].name;
        }
      }
    },
    countryFunction(countryCode) {
      this.states = [];
      for (var state of this.allStates) {
        if (state.countryCode == countryCode) {
          this.states.push(state);
        }
      }
      if (this.states.length == 0) {
        this.states.push({ name: "none", isoCode: "NAN" });
      }
    },
    filterStatesByCountryName(country) {
      for (let c in this.allCountries) {
        if (this.allCountries[c].name == country) {
          this.statesWatcher = this.allCountries[c]["isoCode"];
        }
      }
    },
    stateFunction() {
      this.cities = [];
      for (var city of this.allCities) {
        if (city.countryCode == this.details.country) {
          if (city.stateCode == this.details.state) {
            this.cities.push(city);
          }
        }
      }
      if (this.cities.length == 0) {
        this.cities.push({ name: "none" });
      }
    },
  },
  watch: {
    "details.country": function () {
      if (this.details.country != null) {
        if (this.details.country.length == 2) {
          this.countryFunction(this.details.country);
        }
      }
    },
    "details.state": function () {
      this.stateFunction();
    },
    statesWatcher: function () {
      this.countryFunction(this.statesWatcher);
    },
  },
  created() {
    if (
      Object.keys(this.$store.state["sales"].companyCreationStateData).length !=
      0
    ) {
      for (var state in this.details) {
        if (state == "country") {
          this.filterStatesByCountryName(
            this.$store.state["sales"].companyCreationStateData[state]
          );
        }
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
