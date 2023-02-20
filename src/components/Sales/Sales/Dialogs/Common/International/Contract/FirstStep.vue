<template>
  <div>
    <div class="quotation-bg">
      <div class="formgrid grid">
        <div class="field col-12 md:col-6">
          <h5 class="required text-styles">Name of profile</h5>
          <TextField
            label="profile_name"
            type="text"
            class="text-900"
            v-model="details.profile_name"
            :classes="{
              'p-invalid': v$.details.profile_name.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-6">
          <h5 class="required text-styles">Short Name</h5>
          <TextField
            label="short_name"
            type="text"
            class="text-900"
            v-model="details.short_name"
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
      <!-- <div class="formgrid grid">
        <div class="field col-12 md:col-12">
          <h5 class="required text-styles">Enter the Address</h5>
          <TextField
            label="address"
            type="text"
            class="text-900"
            v-model="details.address"
            :classes="{
              'p-invalid': v$.details.address.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div> -->
      <!-- <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required text-styles">Postal Code</h5>
          <TextField
            label="postal_code"
            type="number"
            class="text-900"
            v-model="details.postal_code"
            :classes="{
              'p-invalid': v$.details.postal_code.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="required text-styles">Country</h5>
         
          <DropDown
            :data="allCountries"
            :state="details.country"
            :filter="true"
            label="country"
            id="country"
            class="text-900"
            code="name"
            modelValue="isoCode"
            v-model="details.country"
            :key="details.country"
            @blur="v$.details.country.$model;"
            :classes="{
              'p-invalid': v$.details.country.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="required text-styles">State</h5>
          <DropDown
            :data="states"
            :state="details.state"
            :filter="true"
            label="state"
            class="text-900"
            id="state"
            code="name"
            v-model="details.state"
            :key="details.state"
            :value="details.state"
            :classes="{
              'p-invalid': v$.details.state.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div> -->
      <!-- <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="text-styles">Building Name</h5>
          <TextField
            label="building_name"
            type="text"
            class="text-900"
            v-model="details.building_name"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="text-styles">Floor No</h5>
          <TextField
            label="floor_no"
            type="number"
            class="text-900"
            v-model="details.floor_no"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="text-styles">Unit No</h5>
          <TextField
            label="unit_no"
            type="number"
            class="text-900"
            v-model="details.unit_no"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div> -->
    </div>
    <div class="field col-12 md:col-12">
      <p class="txt mt-4">Contact</p>
    </div>
    <!-- Img Upload -->

    <div v-for="(sales, index) of addSales" :key="index">
      <div v-if="index > 0" class="flex justify-content-between">
        <div class="flex"></div>
        <div class="flex delete" @click="deleteRate(index)">
          <i class="pi parent pi-times mt-2"></i>
        </div>
      </div>
      <span>
        <ImgUpload
          URL="/images/logo-here.png"
          :state="details['contacts'][index].profile_url"
        />
      </span>
      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required text-styles ;">Person Name</h5>
          <!-- salutation -->
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <select
                name="salutation"
                id="salutation"
                v-model="details['contacts'][index].salutation"
              >
                <option value="mr">Mr</option>
                <option value="ms">Ms</option>
                <option value="mrs">Mrs</option>
              </select>
            </span>
            <TextField
              label="contact_name"
              v-model="details['contacts'][index].contact_name"
              class="text-900"
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
          <h5 class="required text-styles">Contact No</h5>
          <TextField
            label="contact_no"
            type="number"
            class="text-900"
            v-model="details['contacts'][index].contact_no"
            :classes="{
              'p-invalid':
                v$.details['contacts'][index].contact_no.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <label class="required text-styles" for="Email ID">Email ID</label>
          <TextField
            id="Email ID"
            type="text"
            label="Email ID"
            class="text-900"
            v-model="details['contacts'][index]['email']"
            placeholder="e.g. Tommy@gmail.com"
            v-on:childToParent="FormInput"
            :classes="{
              'p-invalid':
                v$.details['contacts'][index]['email'].$invalid && submitted,
              'dialog-label-text dialog-field-text': true,
            }"
          />
          <span
            v-if="v$.details['contacts'][index]['email'].$error && submitted"
          >
            <span
              id="email-error"
              v-for="(error, index) of v$.details['contact'][index]['email']
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
          <h5 class="text-styles">Designation</h5>
          <TextField
            label="designation"
            type="text"
            class="text-900"
            v-model="details['contacts'][index].designation"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="text-styles">Mobile No</h5>
          <TextField
            label="mobile_no"
            type="number"
            class="text-900"
            v-model="details['contacts'][index].mobile_no"
            :classes="{
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
    </div>
    <div class="flex mb-2">
      <span class="dialog-new-field mt-0 add-contact" @click="addSale"
        ><b>+ Add Contact </b></span
      >
    </div>
    <div class="align-self-center flex"></div>
    <div class="flex align-self-center justify-content-end">
      <CancelButton
        storePath="salesSales"
        label="Cancel"
        class="color-357dea"
      />
      <Buttons
        label="Next"
        button_class="button"
        v-on:childToParent="nextStepHandler"
      />
    </div>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { City, Country, State } from "country-state-city";
import { mapActions, mapGetters } from "vuex";

// import InputMask from 'primevue/inputmask';
export default {
  // components: {InputMask },
  name: "SalesInternationalContractFirstStep",
  data: () => ({
    v$: useVuelidate(),
    addSalesClicked: 0,
    statesWatcher: null,
    allCountries: Country.getAllCountries(),
    allStates: State.getAllStates(),
    allCities: City.getAllCities(),
    states: null,
    cities: null,
    CountryCode: null,
    StateCode: null,
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
      short_name: "",
      address: "",
      postal_code: "",
      country: "",
      state: "",
      building_name: "",
      floor_no: "",
      unit_no: "",

      contacts: [
        {
          profile_url: "",
          salutation: "",
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
  validations() {
    if (this.addSalesClicked > -1) {
      return {
        details: {
          contacts: this.salesValidation,
          profile_name: { required },
          short_name: { required },
          address: { required },
          postal_code: { required },
          country: { required },
          state: { required },
        },
      };
    }
  },
  methods: {
    ...mapActions({
      setCurrentStep: "salesInternationalContract/setCurrentStep",
    }),
    setAddress(e) {
      this.details = {
        ...this.details,
        ...e,
      };
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
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.setCurrentStep(2);

        const { CreateQuotationContractData } =
          this.$store.state.salesInternationalContract;
        // const {profileCreationData} =
        //   this.$store.state.salesInternationalContract;
        if (
          this.$store.state.salesInternationalContract?.InternationalRowData?.id
        ) {
          let p_id =
            this.$store.state.salesInternationalContract?.InternationalRowData
              ?.profile_id;
          this.details.profile_id = p_id ? p_id : this.$route.params.id;
        } else {
          this.details.profile_id = this.$route.params.id;
        }
        this.$store.state.salesInternationalContract.CreateQuotationContractData =
          Object.assign(CreateQuotationContractData, this.details);
        this.$store.dispatch("salesQuotationDialog/navigateStepper", {
          step: "SalesInternationalContractSecondStep",
        });
      }
    },
    addSale() {
      this.details.contacts.push({
        profile_url: "",
        salutation: "",
        contact_name: "",
        contact_no: "",
        email: "",
        designation: "",
        mobile_no: "",
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
    loadState() {
      if (
        this.$store.state.salesInternationalContract.InternationalRowData.id
      ) {
        this.addSales = [];
        this.details.contacts = [];
        this.salesValidation = [];

        this.$store.state.salesInternationalContract.InternationalRowData.contacts.map(
          (data) => {
            this.details.contacts.push({
              profile_url: data.profile_url,
              salutation: data.salutation,
              contact_name: data.contact_name,
              contact_no: data.contact_no,
              email: data.email,
              designation: data.designation,
              mobile_no: data.mobile_no,
            });
            this.salesValidation.push({
              contact_name: { required },
              contact_no: { required },
              email: { required, email },
            });
            this.addSales.push("new_sales");
            this.addSalesClicked++;
          }
        );
      }
    },
  },
  unmounted() {
    this.$store.state.salesInternationalContract.CreateQuotationContractData =
      {};
  },
  watch: {
    details: {
      handler() {
        this.$store.state.salesInternationalContract.CreateQuotationContractData =
          Object.assign(
            this.$store.state.salesInternationalContract
              .CreateQuotationContractData,
            this.details
          );
      },
      deep: true,
    },

    "this.$store.state.salesInternationalContract.InternationalRowData":
      function () {
        if (
          this.$store.state.salesInternationalContract.InternationalRowData.id
        ) {
          const { InternationalRowData } =
            this.$store.state.salesInternationalContract;
          let incomingCountry = InternationalRowData.country;
          this.allCountries.map((country) => {
            if (country.name == incomingCountry.country) {
              this.details.country = country.name;
            }
          });
          this.details.profile_id = InternationalRowData.profile_id;
          this.details.profile_name = InternationalRowData.profile_name;
          this.details.short_name = InternationalRowData.short_name;
          Object.keys(this.details).map((key) => {
            this.details[key] = InternationalRowData[key];
          });
          this.details?.contacts?.map((list) => {
            delete list.id;
          });
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
  created() {
    this.$store.state.salesSales.sendQuotationRedirect = false;

    if (this.$store.state.salesInternationalContract.InternationalRowData?.id) {
      const { InternationalRowData } =
        this.$store.state.salesInternationalContract;
      let incomingCountry = InternationalRowData.country;
      this.allCountries.map((country) => {
        if (country.name == incomingCountry.country) {
          this.details.country = country.name;
        }
      });
      this.details.profile_id = InternationalRowData.profile_id;
      Object.keys(this.details).map((key) => {
        this.details[key] = InternationalRowData[key];
      });
      this.details?.contacts?.map((list) => {
        delete list.id;
      });
      this.loadState();
    } else {
      this.$store.state.salesInternationalContract.InternationalRowData = {};
      this.details.profile_id =
        this.$store.state.salesInternationalContract.profileCreationData.id;
      let incomingCountry =
        this.$store.state.salesInternationalContract.profileCreationData
          ?.country;
      if (
        this.$store.state.salesInternationalContract.profileCreationData
          ?.country
      ) {
        this.allCountries.map((country) => {
          if (country.name == incomingCountry.country) {
            this.details.country = country.name;
          }
        });
      }

      // this.details.country =
      //   this.$store.state.salesInternationalContract.profileCreationData.country;
      const { profileCreationData } =
        this.$store.state.salesInternationalContract;
      this.details.short_name = profileCreationData.contact_no;

      Object.keys(this.details).map((key) => {
        let keyMap;
        keyMap = key == "contacts" ? "company_contacts" : key;
        this.details[key] = profileCreationData[keyMap];
      });
      Object.keys(this.details).map((key) => {
        key != "contacts" && (this.details[key] = profileCreationData[key]);
      });
      delete this.details.profile_name;
      this.details?.contacts?.map((list) => {
        delete list.id;
      });
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
.quotation-bg {
  background: rgba(196, 196, 196, 0.1);
  margin-top: 20px;
}
.add-contact {
  color: #3057ff;
}
.text-styles {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 28px;
  /* identical to box height, or 200% */

  display: flex;
  align-items: center;

  color: #7a7a7a;
}
.button {
  background: #357dea;
  border-radius: 4px;
}
</style>