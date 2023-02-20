<template>
  <br />
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Name of the Profile</h5>
      <TextField
        label="profile_name"
        type="text"
        v-model="details.profile_name"
        :classes="{
          'p-invalid': v$.details.profile_name.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <!-- <div class="field col-12 md:col-6">
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
    </div> -->
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Address</h5>
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
        label="postal_code"
        type="number"
        v-model="details.postal_code"
        :classes="{
          'p-invalid': v$.details.postal_code.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div :key="renderKey" class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Country</h5>
      <!-- <DropDown
        code="name"
        :data="country"
        label="country"
        v-model="details.country"
        :class="{
          'p-invalid': v$.details.country.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      /> -->
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
      <!-- <TextField
        label="state"
        type="text"
        v-model="details.state"
        :classes="{
          'p-invalid': v$.details.state.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      /> -->
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
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Building Name</h5>
      <TextField
        label="building_name"
        type="text"
        v-model="details.building_name"
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

  <div v-for="(sales, index) of addSales" :key="index">
    <div v-if="index > 0" class="flex justify-content-between">
      <div class="flex"></div>
      <div class="flex delete" @click="deleteRate(index)">
        <i class="pi parent pi-times mt-2"></i>
      </div>
    </div>
    <!-- Img Upload -->
    <span>
      <ImgUpload
        @file="getFile($event, index)"
        class="mt-0 mb-2"
        :state="details['contacts'][index].profile_url"
        URL="/images/logo-here.png"
      />
    </span>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Name</h5>
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
            v-model="details['contacts'][index].contact_name"
            :classes="{
              'p-invalid':
                v$.details['contacts'][index].contact_name.$invalid &&
                submitted,
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
          v-model="details['contacts'][index].contact_no"
          :classes="{
            'p-invalid':
              v$.details['contacts'][index].contact_no.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <label class="required dialog-label-text" for="Email ID"
          >Email ID</label
        >
        <TextField
          id="Email ID"
          type="text"
          label="Email ID"
          v-model="details['contacts'][index]['email']"
          placeholder="e.g. Tommy@gmail.com"
          v-on:childToParent="FormInput"
          :classes="{
            'p-invalid':
              v$.details['contacts'][index]['email'].$invalid && submitted,
            'dialog-label-text dialog-field-text': true,
          }"
        />
        <span v-if="v$.details['contacts'][index]['email'].$error && submitted">
          <span
            id="email-error"
            v-for="(error, index) of v$.details['contacts'][index]['email']
              .$errors"
            :key="index"
          >
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
        <small
          v-else-if="
            (v$.details['contacts'][index]['email'].$invalid && submitted) ||
            v$.details['contacts'][index]['email'].$pending.$response
          "
          class="p-error"
          >{{
            v$.details["contacts"][index]["email"].required.$message.replace(
              "Value",
              "Email"
            )
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
          v-model="details['contacts'][index].designation"
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
          v-model="details['contacts'][index].mobile_no"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
  </div>
  <div class="flex mb-2">
    <span class="dialog-new-field mt-0" @click="addSale"
      ><b>+ Add Contact </b></span
    >
  </div>
  <div class="align-self-center flex"></div>
  <div class="flex align-self-center justify-content-end">
    <CancelButton storePath="salesSales" label="Cancel"  />
    <Buttons
      label="Next"
      button_class="dialog-button-text"
      v-on:childToParent="nextStepHandler"
    />
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { City, Country, State } from "country-state-city";
import { mapGetters } from "vuex";
export default {
  name: "SalesExpressContractBikeFirstStep",
  data: () => ({
    renderKey: 10,
    statesWatcher: null,
    allCountries: Country.getAllCountries(),
    allStates: State.getAllStates(),
    allCities: City.getAllCities(),
    states: null,
    cities: null,
    CountryCode: null,
    StateCode: null,
    v$: useVuelidate(),
    addSalesClicked: 0,
    addSales: ["new_sales"],
    salesValidation: [
      {
        contact_name: { required },
        contact_no: { required },
        email: { required, email },
      },
    ],
    details: {
      profile_id: "",
      profile_name: "",
      // short_name: "",
      address: "",
      postal_code: "",
      country: "",
      state: "",
      building_name: "",
      floor_no: "",
      unit_no: "",
      customer_type: "Express",
      business_type: "Contract",
      status: "New",

      contacts: [
        {
          profile_url: "",
          contact_name: "",
          contact_no: "",
          email: "",
          designation: "",
          mobile_no: "",
        },
      ],
    },
    country: [
      { name: "India", code: "USD" },
      { name: "England", code: "SGD" },
      { name: "Singapore", code: "SGD" },
    ],
    submitted: false,
  }),
  computed: {
    ...mapGetters({
      expressContractBikeAddNewData:
        "salesExpressBike/expressContractBikeAddNewData",
      ExpressContractBikeEditData:
        "salesExpressBike/ExpressContractBikeEditData",
    }),
  },
  validations() {
    if (this.addSalesClicked > -1) {
      return {
        details: {
          contacts: this.salesValidation,
          profile_name: { required },
          // short_name: { required },
          address: { required },
          postal_code: { required },
          country: { required },
          
        },
      };
    }
  },
  methods: {
    getFile(value, index) {
      console.log(value, index);
      if (value) {
        this.details.contacts[index].profile_url = value?.fileLink;
      }
    },
    nextStepHandler() {
      this.$store.dispatch("salesQuotationDialog/navigateStepper", {
        step: "SalesExpressContractBikeSecondStep",
      });
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        delete this.details.status;
        if (!this.v$.$invalid) {
          for (let i in this.details) {
            this.expressContractBikeAddNewData[i] = this.details[i];
          }

          this.$store.dispatch("salesQuotationDialog/navigateStepper", {
            step: "SalesExpressContractBikeSecondStep",
          });
        }
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

    addSale() {
      this.details.contacts.push({
        contact_name: "",
        contact_no: "",
        email: "",
        designation: "",
        mobile_no: "",
        profile_url: "",
      });
      this.salesValidation.push({
        contact_name: { required },
        contact_no: { required },
        email: { required, email },
      });
      this.addSalesClicked++;
      this.addSales.push("new_sales");
    },
    deleteRate(index) {
      this.details.contacts.splice(index, 1);
      this.salesValidation.splice(index, 1);
      this.addSales.splice(index, 1);
      this.addSalesClicked++;
    },
    prefillProfileData() {
      let incomingCountry =
        this.$store.state.salesInternationalContract.profileCreationData
          .country;
      this.allCountries.map((country) => {
        if (country.name == incomingCountry.country) {
          this.details.country = country.name;
        }
      });

      const { profileCreationData } =
        this.$store.state.salesInternationalContract;

      Object.keys(this.details).map((key) => {
        let keyMap;
        keyMap = key == "contacts" ? "company_contacts" : key;
        this.details[key] = profileCreationData[keyMap];
      });
      Object.keys(this.details).map((key) => {
        key != "contacts" && (this.details[key] = profileCreationData[key]);
      });
      this.details?.contacts?.map((list) => {
        delete list.id;
      });
    },
    async prefillEditData() {
      let incomingCountry = this.ExpressContractBikeEditData.country;

      // this.details.short_name = this.ExpressContractBikeEditData.short_name;

      Object.keys(this.details).map((key) => {
        this.details[key] = this.ExpressContractBikeEditData[key];
      });

      this.renderKey++;
    },
  },
  watch: {
    "details.country": function () {
      if (this.details.country != null) {
        let respectiveData = this.allCountries.find(
          (item) => item.name == this.details.country
        );

        this.countryFunction(respectiveData.isoCode);
      }
    },

    statesWatcher: function () {
      this.countryFunction(this.statesWatcher);
    },
  },

  mounted() {
    this.details.profile_id = this.$route.params.id;

    if (this.ExpressContractBikeEditData) {
      this.prefillEditData();
    } else {
      this.prefillProfileData();
    }
  },
};
</script>

<style scoped>
.required {
  font-size: 14px !important;
  color: #7a7a7a !important;

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
