<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Cost Center Name</h5>
      <TextField
        label="cost_center_name"
        type="text"
        v-model="details.cost_center_name"
        @blur="v$.details.cost_center_name.$model;"
        :classes="{
          'p-invalid': v$.details.cost_center_name.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <AddressArea
    :key="renderKey"
    :default="details"
    :submitted="submitted"
    @getAddress="setAddress"
  />
  <!-- <div class="formgrid grid">
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
  </div> -->
  <!-- <div class="formgrid grid">
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
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">State</h5>
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
  </div> -->
  <!-- <div class="formgrid grid">
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
  </div> -->
  <!-- <div class="formgrid grid">
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
  </div> -->
  <div class="flex flex-row ml-4">
    <div class="flex mr-3">
      <Checkbox
        v-model="details.site_office"
        :binary="true"
        @change="checkBoxChange"
      />
    </div>
    <div class="flex mr-4">
      <span :class="`chb-la-fa`">Site Office</span>
    </div>
    <div class="flex mr-3">
      <Checkbox v-model="details.special_monitoring" :binary="true" />
    </div>
    <div class="flex">
      <span :class="`chb-la-fa`">Special Monitoring</span>
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
      <CancelButton
        storePath="salesCommon"
        label="Cancel"
        class="color-357dea"
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
import { mapGetters } from "vuex";
import Checkbox from "primevue/checkbox";
import {
  //City,
  Country,
  State,
} from "country-state-city";
export default {
  name: "CostCentresAddAddress",
  components: {
    Checkbox,
  },
  computed: {
    ...mapGetters({
      expressCCPostDialogData: "salesCommon/expressCCPostDialogData",
    }),
  },
  data: () => ({
    renderKey: 1,
    statesWatcher: null,
    allCountries: Country.getAllCountries(),
    allStates: State.getAllStates(),
    states: null,
    cities: null,
    CountryCode: null,
    StateCode: null,
    Country: [
      { name: "Country1", code: "C1" },
      { name: "Country2", code: "C2" },
    ],
    State: [
      { name: "State1", code: "S1" },
      { name: "State2", code: "S2" },
    ],
    v$: useVuelidate(),
    details: {
      customer_type: "express",
      cost_center_name: "",
      address: "",
      postal_code: "",
      country: "",
      state: "",
      building_name: "",
      floor_no: "",
      unit_no: "",
      site_office: false,
      special_monitoring: false,
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        cost_center_name: { required },
        address: { required },
        postal_code: { required },
        country: { required },
      },
    };
  },
  methods: {
    setAddress(e) {
      this.details = {
        ...this.details,
        ...e,
      };
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
        for (let i in this.details) {
          this.expressCCPostDialogData[i] = this.details[i];
        }
        this.expressCCPostDialogData["customer_type"] = "express";
        this.$store.state.salesSales.stepperNavigation = "CostCenterSecondStep";
        this.$store.state.salesExpressContract.flowStepCount++;
      }
      
    },
  },
  watch: {
    "details.country": function () {
      if (this.details.country != null) {
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
    this.$store.state.salesExpressContract.flowStepCount=0;
    let data = this.$store.state["salesCommon"].commonExpressCCStateData ?? {};
    if (Object.keys(data).length != 0) {
      for (let state in this.details) {
        this.details[state] = data[state];
      }
      let Incomingcountry = data.country;

      for (let c in this.allCountries) {
        if (this.allCountries[c].name == Incomingcountry) {
          this.details.country = this.allCountries[c].name;
        }
      }
      this.details.special_monitoring = data?.special_monitoring;
    }
  },
  async mounted() {
    this.$store.state.salesExpressContract.flowStepCount = 0;
  }
};
</script>

<style></style>