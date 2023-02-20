<template>
  <br />
  <br />
  <div>
    <AddressArea
      :key="renderKey"
      :default="details"
      :submitted="submitted"
      @getAddress="setAddress"
    />
    <!-- <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="required color-7a7a7a font-size-14">Enter the Address</h5>
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
        <h5 class="required color-7a7a7a font-size-14">Postal Code</h5>
        <TextField
          label="postalCode"
          type="text"
          v-model="details.postal_code"
          @blur="v$.details.postal_code.$model;"
          :classes="{
            'p-invalid': v$.details.postal_code.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="required color-7a7a7a font-size-14">Country</h5>
        <DropDown
          :data="allCountries"
          :state="details.country"
          :filter="true"
          label="country"
          id="country"
          code="name"
          modelValue="isoCode"
          v-model="details.country"
          @blur="v$.details.country.$model;"
          :classes="{
            'p-invalid': v$.details.country.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div> -->
    <!-- <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="color-7a7a7a font-size-14">State</h5>
        <DropDown
          :data="states"
          :state="details.state"
          :filter="true"
          label="state"
          id="state"
          code="name"
          v-model="details.state"
          :value="details.state"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="color-7a7a7a font-size-14">Building Name</h5>
        <TextField
          label="building_name"
          v-model="details.building_name"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div> -->
    <!-- <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="color-7a7a7a font-size-14">Floor No</h5>
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
        <h5 class="color-7a7a7a font-size-14">Unit No</h5>
        <TextField
          label="unitNo"
          v-model="details.unit_no"
          v-on:childToParent="getUserInput"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div> -->

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
          v-on:childToParent="goBackHandler"
          class="p-button-outlined mr-1 dialog-button-text previous-btn"
        />
      </div>
      <div class="flex align-self-center justify-content-end">
        <!-- <Buttons
          label="Cancel"
          v-on:childToParent="closeDialog"
          class="p-button-outlined mr-1 dialog-button-text"
        /> -->
        <CancelButton storePath="salesSales" />
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
import {
  //City,
  Country,
  State,
} from "country-state-city";
import { mapGetters } from "vuex";
export default {
  name: "Company",
  data: () => ({
    statesWatcher: null,
    allCountries: Country.getAllCountries(),
    allStates: State.getAllStates(),
    // allCities: City.getAllCities(),
    states: null,
    cities: null,
    CountryCode: null,
    StateCode: null,
    renderKey: 1,
    v$: useVuelidate(),
    details: {
      address: "",
      postal_code: "",
      country: "",
      state: "",
      // city: "",
      building_name: "",
      floor_no: "",
      unit_no: "",
    },
    email: "",
    submitted: false,
  }),
  computed: {
    ...mapGetters({
      salesTabAddNewData: "salesSales/salesTabAddNewData",
    }),
  },
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
    goBackHandler() {
      // this.$store.state.sales.stepperNavigation = "Information";
      this.$store.dispatch("salesSales/navigateStepper", {
        step: "Information",
      });
    },
    setAddress(e) {
      (this.details = {
        ...this.details,
        ...e,
      })
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {

        for (let i in this.details) {
          this.salesTabAddNewData[i] = this.details[i];
        }
        this.$store.dispatch("salesSales/navigateStepper", {
          step: "Contact",
        });
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
  },
  watch: {
    "details.country": function () {
      if (this.details.country != null && this.details.country!="") {
        let respectiveData = this.allCountries.find(
          (item) => item.name == this.details.country
        );
        this.countryFunction(respectiveData?.isoCode);
      }
    },
    statesWatcher: function () {
      this.countryFunction(this.statesWatcher);
    },
  },
  created() {
    if (
      Object.keys(this.$store.state["salesSales"].companyCreationStateData)
        .length != 0
    ) {
      for (var state in this.details) {
        // if (state == "country") {
        //   this.filterStatesByCountryName(
        //     this.$store.state["salesSales"].companyCreationStateData[state]
        //   );
        // }

        this.details[state] =
          this.$store.state["salesSales"].companyCreationStateData[state];
      }
      // this.details.country =
      //   this.$store.state["salesSales"].companyCreationStateData.country;
      let Incomingcountry =
        this.$store.state["salesSales"].companyCreationStateData.country;

      for (let c in this.allCountries) {
        if (this.allCountries[c].name == Incomingcountry) {
          this.details.country = this.allCountries[c].name;
        }
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

::v-deep .p-inputtext {
  color: #212121;
  font-size: 14px;
  font-weight: 700;
}
</style>