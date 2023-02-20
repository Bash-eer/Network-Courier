<template>
  <div class="mt-6">
    <div class="formgrid grid my-2">
      <div class="field col-12 md:col-6">
        <h5 class="required bold-500 font-size-14 color-7a7a7a pb-1">
          Name of the profile
        </h5>
        <TextField
          label="profile_name"
          type="text"
          v-model="details.profile_name"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details.profile_name.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="required bold-500 font-size-14 color-7a7a7a pb-1">
          Short Name
        </h5>
        <TextField
          label="short_name"
          type="text"
          v-model="details.short_name"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details.short_name.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
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
    <!-- <div class="formgrid grid my-2">
      <div class="field col-12 md:col-12">
        <h5 class="required bold-500 font-size-14 color-7a7a7a pb-1">
          Enter the Address
        </h5>
        <TextField
          label="address"
          type="text"
          v-model="details.address"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details.address.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div> -->
    <!-- <div class="formgrid grid my-2">
      <div class="field col-12 md:col-4">
        <h5 class="required bold-500 font-size-14 color-7a7a7a pb-1">
          Postal code
        </h5>
        <TextField
          label="postal_code"
          v-model="details.postal_code"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details.postal_code.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div :key="renderKey" class="field col-12 md:col-4">
        <h5 class="required bold-500 font-size-14 color-7a7a7a pb-1">
          Country
        </h5>
        <DropDown
          :data="allCountries"
          :state="details.country"
          :filter="true"
          label="country"
          id="country"
          code="name"
          modelValue="isoCode"
          v-on:childToParent="getUserInput"
          v-model="details.country"
          @blur="v$.details.country.$model;"
          :classes="{
            'p-invalid': v$.details.country.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div :key="renderKey" class="field col-12 md:col-4">
        <h5 class="bold-500 font-size-14 color-7a7a7a pb-1">State</h5>\
        <DropDown
          :data="states"
          :state="details.state"
          :filter="true"
          label="state"
          id="state"
          code="name"
          v-on:childToParent="getUserInput"
          v-model="details.state"
          :value="details.state"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div> -->
    <!-- <div class="formgrid grid my-2">
      <div class="field col-12 md:col-4">
        <h5 class="bold-500 font-size-14 color-7a7a7a pb-1">Building Name</h5>
        <TextField
          label="building_name"
          type="text"
          v-model="details.building_name"
          v-on:childToParent="getUserInput"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="bold-500 font-size-14 color-7a7a7a pb-1">Floor No</h5>
        <TextField
          type="number"
          label="floor_no"
          v-model="details.floor_no"
          v-on:childToParent="getUserInput"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="bold-500 font-size-14 color-7a7a7a pb-1">Unit No</h5>
        <TextField
          type="number"
          label="unit_no"
          v-model="details.unit_no"
          v-on:childToParent="getUserInput"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div> -->
    <div class="field col-12 md:col-12">
      <p class="bold-700 font-size-12 color-4e5868 mt-4 mb-0">Contact</p>
    </div>
    <!-- Img Upload -->
    <div v-for="(data, idx) of rowData" :key="data">
      <Contact
        :rowId="idx"
        :rowCount="rowData.length"
        @isRowValid="isRowValid"
        @removeRow="removeRow"
        :stepKey="stepKey"
        :profileDetails="profileDetails && profileDetails.company_contacts[idx]"
      />
    </div>

    <div @click="addRow" class="flex mb-2">
      <span class="new-field mt-0 color-3057ff"><b>+ Add Contact </b></span>
    </div>
    <div class="align-self-center flex"></div>
    <div class="flex align-self-center justify-content-end">
      <CancelButton
        storePath="salesSales"
        label="Cancel"
        class="color-357dea"
        @click="closeDialog"
      />
      <Buttons
        label="Next"
        button_class="dialog-button-text"
        v-on:childToParent="nextStepHandler"
        class="bg-357dea"
      />
    </div>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import Contact from "./Components/contact.vue";
import { mapActions, mapGetters } from "vuex";
import {
  //City,
  Country,
  State,
} from "country-state-city";
export default {
  name: "SalesRapidoContractFirstStep",
  components: { Contact },
  data: () => ({
    v$: useVuelidate(),
    statesWatcher: null,
    allCountries: Country.getAllCountries(),
    allStates: State.getAllStates(),
    states: null,
    cities: null,
    CountryCode: null,
    StateCode: null,
    rowData: [{ id: 1, valid: false }],
    isContactValid: false,
    profileDetails: null,
    stepKey: 10,
    renderKey: 10,
    details: {
      profile_name: "",
      short_name: "",
      address: "",
      postal_code: "",
      country: "",
      state: "",
      building_name: "",
      floor_no: "",
      unit_no: "",
    },
    countryOpts: [],
    submitted: false,
  }),
  validations() {
    return {
      details: {
        profile_name: { required },
        short_name: { required },
        address: { required },
        postal_code: { required },
        country: { required },
      },
    };
  },
  watch: {
    quotationData() {
      if (this.quotationData) {
        this.prefillData();
      }
    },
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
  computed: {
    ...mapGetters({
      quotationData: "salesRapidoContract/Contract/quotationData",
    }),
  },
  methods: {
    ...mapActions({
      getCountryList: "Outbound/getCountryList",
      getDestList: "Outbound/getDestList",

      addContacts: "salesRapidoContract/Contract/addContacts",
      removeContacts: "salesRapidoContract/Contract/removeContacts",
      setRapidoContractStep: "salesQuotationDialog/setRapidoContractStep",
      setRapidoContractData:
        "salesRapidoContract/Contract/setRapidoContractData",
      getProfileDetails: "salesRapidoContract/Contract/getProfileDetails",
      clearQuotationData: "salesRapidoContract/Contract/clearQuotationData",
    }),
    closeDialog() {
      this.clearQuotationData();
    },
    setAddress(e) {
      this.details = {
        ...this.details,
        ...e,
      };
    },
    getUserInput() {
      this.setRapidoContractData({ value: this.details });
    },
    nextStepHandler() {
      this.stepKey++;
      let invalidForm = this.rowData.find((list) => list.valid === false);
      if (invalidForm) {
        this.isContactValid = false;
      } else {
        this.isContactValid = true;
      }
      if (this.v$.$invalid || !this.isContactValid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid && this.isContactValid) {
        this.setRapidoContractStep(1);
      }
    },
    addRow() {
      let count = this.rowData.length + 1;

      let exist = this.rowData.find((list) => {
        if (list.id === count) {
          return list;
        }
      });

      if (exist) {
        this.rowData.push({
          id: this.rowData.length + exist.id,
          valid: false,
        });
      } else {
        this.rowData.push({ id: this.rowData.length + 1, valid: false });
      }

      this.addContacts();
    },
    removeRow(id) {
      if (this.rowData.length > 1) {
        this.rowData.splice(id, 1);
        this.removeContacts(id);
      }
    },
    isRowValid({ isValid, id }) {
      this.rowData.map((list, idx) => {
        if (idx === id) {
          list.valid = isValid;
          return;
        }
      });

      let invalidForm = this.rowData.find((list) => list.valid === false);
      if (invalidForm) {
        this.isContactValid = false;
      } else {
        this.isContactValid = true;
      }
    },
    async getProfileData() {
      const res = await this.getProfileDetails(this.$route.params.id);

      if (res) {
        let data = res.data.results;
        this.profileDetails = data;

        this.details.address = data.address;
        this.details.postal_code = data.postal_code;
        this.details.country = data.country;
        this.details.state = data.state;
        this.details.building_name = data.building_name;
        this.details.floor_no = data.floor_no;
        this.details.unit_no = data.unit_no;
        if (
          this.profileDetails &&
          this.profileDetails.company_contacts.length
        ) {
          this.rowData = [];
        }

        this.profileDetails?.company_contacts.map((list, idx) => {
          this.rowData.push({ id: idx + 1, valid: false });
        });
        this.renderKey++;
      }
    },
    prefillData() {
      this.profileDetails = {};
      this.details.profile_name = this.quotationData.profile_name;
      this.details.short_name = this.quotationData.short_name;
      this.details.address = this.quotationData.address;
      this.details.postal_code = this.quotationData.postal_code;
      this.details.country = this.quotationData.country;
      this.details.state = this.quotationData.state;
      this.details.building_name = this.quotationData.building_name;
      this.details.floor_no = this.quotationData.floor_no;
      this.details.unit_no = this.quotationData.unit_no;
      this.profileDetails["company_contacts"] = this.quotationData.contacts;

      if (this.quotationData && this.quotationData?.contacts.length) {
        this.rowData = [];
      }

      this.quotationData?.contacts.map((list, idx) => {
        this.rowData.push({ id: idx + 1, valid: false });
      });

      this.renderKey++;
    },
    async destList(id) {
      if (id) {
        try {
          this.destinationOpts = [];
          let res = await this.getDestList(id);

          res.data.results.map((list) => {
            this.destinationOpts.push({
              name: list.destination_name,
              code: list.destination_code,
              destination_id: list.id,
            });
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
    async getCountries() {
      this.countryOpts = [];
      let res = await this.getCountryList();

      res.data.results.map((list) => {
        this.countryOpts.push({
          name: list.country_name,
          code: list.country_iso_code,
          country_id: list.id,
        });
      });
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
  mounted() {
    if (this.quotationData) {
      this.prefillData();
    } else {
      this.getProfileData();
    }
  },
  created() {
    this.getCountries();
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