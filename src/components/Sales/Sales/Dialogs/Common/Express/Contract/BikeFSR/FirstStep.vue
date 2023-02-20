<template>
  <div>
    <div class="formgrid grid mt-5">
      <div class="field col-12 md:col-6">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">
          Name Of the Profile
        </h5>
        <TextField
          label="profile_name"
          type="text"
          v-model="details.profile_name"
          :classes="{
            'p-invalid': v$.details.profile_name.$invalid && submitted,
            'inputfield w-full color-212121 font-bold ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">Short Name</h5>
        <TextField
          label="short_name"
          type="text"
          v-model="details.short_name"
          :classes="{
            'p-invalid': v$.details.short_name.$invalid && submitted,
            'inputfield w-full color-212121 font-bold ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">
          Enter the Address
        </h5>
        <TextField
          label="address"
          type="text"
          v-model="details.address"
          :classes="{
            'p-invalid': v$.details.address.$invalid && submitted,
            'inputfield w-full color-212121 font-bold ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">Postal Code</h5>
        <TextField
          label="postal_code"
          type="number"
          v-model="details.postal_code"
          :classes="{
            'p-invalid': v$.details.postal_code.$invalid && submitted,
            'inputfield w-full color-212121 font-bold ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">Country</h5>
        <DropDown
          :data="allCountries"
          :state="details.country"
          :filter="true"
          label="country"
          id="country"
          code="name"
          modelValue="isoCode"
          v-model="details.country"
          :key="details.country"
          @blur="v$.details.country.$model;"
          :classes="{
            'p-invalid': v$.details.country.$invalid && submitted,
            'inputfield w-full color-212121 font-bold ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">State</h5>
        <DropDown
          :data="states"
          :state="details.state"
          :filter="true"
          label="state"
          id="state"
          code="name"
          v-model="details.state"
          :key="details.state"
          :value="details.state"
          :classes="{
            'p-invalid': v$.details.state.$invalid && submitted,
            'inputfield w-full color-212121 font-bold ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="bold-500 font-size-14 color-7a7a7a">Building Name</h5>
        <TextField
          label="building_name"
          type="text"
          v-model="details.building_name"
          :classes="{
            'inputfield w-full color-212121 font-bold ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="bold-500 font-size-14 color-7a7a7a">Floor No</h5>
        <TextField
          label="floor_no"
          type="number"
          v-model="details.floor_no"
          :classes="{
            'inputfield w-full color-212121 font-bold ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="bold-500 font-size-14 color-7a7a7a">Unit No</h5>
        <TextField
          label="unit_no"
          type="number"
          v-model="details.unit_no"
          :classes="{
            'inputfield w-full color-212121 font-bold ': true,
          }"
        />
      </div>
    </div>
    <div class="field col-12 md:col-12">
      <p class="bold-700 font-size-12 color-4e5868 mt-3 mb-0 pb-0">Contact</p>
    </div>
    <!-- Img Upload -->

    <div v-for="(contact, index) of addContacts" :key="contact">
      <div class="ml-2">
        <ImgUpload
          URL="/images/logo-here.png"
          :state="details.contacts[index].profile_url"
          @file="getFile($event, index)"
        />
      </div>
      <div v-if="index > 0" class="flex justify-content-between">
        <div class="flex"></div>
        <div class="flex delete" @click="deleteRate(index)">
          <i class="pi parent pi-times mt-2"></i>
        </div>
      </div>
      <div class="formgrid grid mt-2">
        <div class="field col-12 md:col-4">
          <h5 class="required bold-500 font-size-14 color-7a7a7a">
            Person Name
          </h5>
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
              v-model="details.contacts[index].contact_name"
              :classes="{
                'p-invalid':
                  v$.details.contacts[index].contact_name.$invalid && submitted,
                'inputfield w-full color-212121 font-bold ': true,
              }"
            />
          </div>
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="required bold-500 font-size-14 color-7a7a7a">
            Contact No
          </h5>
          <TextField
            label="contact_no"
            type="number"
            v-model="details['contacts'][index].contact_no"
            :classes="{
              'p-invalid':
                v$.details['contacts'][index].contact_no.$invalid && submitted,
              'inputfield w-full color-212121 font-bold py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5
            class="required bold-500 font-size-14 color-7a7a7a"
            for="Email ID"
          >
            Email ID
          </h5>

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
              'dialog-label-text color-212121 font-bold': true,
            }"
          />
          <span
            v-if="v$.details['contacts'][index]['email'].$error && submitted"
          >
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
          <h5 class="bold-500 font-size-14 color-7a7a7a">Designation</h5>
          <TextField
            label="designation"
            type="text"
            v-model="details['contacts'][index].designation"
            :classes="{
              'inputfield w-full color-212121 font-bold ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="bold-500 font-size-14 color-7a7a7a">Mobile No</h5>
          <TextField
            label="mobile_no"
            type="number"
            v-model="details['contacts'][index].mobile_no"
            :classes="{
              'inputfield w-full color-212121 font-bold ': true,
            }"
          />
        </div>
      </div>
    </div>
    <div class="flex mb-2">
      <span class="bold-600 font-size-14 color-3057ff mt-0" @click="addContact"
        ><b>+ Add Contact </b></span
      >
    </div>
    <div class="align-self-center flex"></div>
    <div class="flex align-self-center justify-content-end">
      <CancelButton storePath="salesQuotationDialog" class="color-357dea" />
      <Buttons
        label="Next"
        button_class="dialog-button-text bg-357dea"
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
export default {
  name: "SalesExpressContractBikeFSRFirstStep",
  data: () => ({
    ImageState: "",
    statesWatcher: null,
    allCountries: Country.getAllCountries(),
    allStates: State.getAllStates(),
    allCities: City.getAllCities(),
    states: null,
    cities: null,
    CountryCode: null,
    StateCode: null,
    v$: useVuelidate(),
    addContactClicked: 0,
    addContacts: ["new_contact"],
    contactsValidation: [
      {
        contact_name: { required },
        contact_no: { required },
        email: { required, email },
      },
    ],
    details: {
      sales_person_id: "1",
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
          selected: false,
          profile_url: "",
          contact_name: "",
          contact_no: "",
          email: "",
          mobile_no: "",
          designation: "",
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
      expressContractBikeFSRContactData:
        "salesExpressContractBikeFSR/expressContractBikeFSRContactData",
      expressContractBikeFSRAddNewData:
        "salesExpressContractBikeFSR/expressContractBikeFSRAddNewData",
      quotationData: "salesExpressContractBikeFSR/quotationData",
      expressContractBikeFsrOverviewData:
        "salesExpressContractBikeFSR/expressContractBikeFsrOverviewData",
    }),
  },
  validations() {
    if (this.addContactClicked > -1) {
      return {
        details: {
          contacts: this.contactsValidation,
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
      setCurrentStep: "salesExpressContractBikeFSR/setCurrentStep",
      // setPayloadData: "salesExpressContractBikeProjectJobs/setPayloadData",
      getProfileDetails: "salesRapidoContract/Contract/getProfileDetails",
    }),
    getFile(value, index) {
      if (value) {
        // console.log(this.$store.state.fleets.globalImageUploadURL, "Image state", index)
        this.details.contacts[index].profile_url =
          this.$store.state.fleets.globalImageUploadURL;
        // console.log(this.details.contacts[index].profile_url, "Image state url", index)
      }
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        for (let i in this.details) {
          if (i == "contacts") {
            (this.expressContractBikeFSRContactData["contacts"] = []),
              this.details.contacts.map((list) => {
                this.expressContractBikeFSRContactData["contacts"].push({
                  profile_url: list.profile_url,
                  selected: false,
                  contact_name: list.contact_name,
                  contact_no: list.contact_no,
                  email: list.email,
                  mobile_no: list.mobile_no,
                  designation: list.designation,
                });
              });
          }
          if (i != "contacts") {
            this.expressContractBikeFSRAddNewData[i] = this.details[i];
          }
        }
        //  console.log(this.expressContractBikeFSRContactData, "Contact",this.expressContractBikeFSRAddNewData )
        this.setCurrentStep(2);
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
    addContact() {
      this.details.contacts.push({
        contact_name: "",
        contact_no: "",
        email: "",
        designation: "",
        mobile_no: "",
        profile_url: "",
      });
      this.contactsValidation.push({
        contact_name: { required },
        contact_no: { required },
        email: { required, email },
      });
      this.addContactClicked++;
      this.addContacts.push("new_contact");
    },
    deleteRate(index) {
      this.details.contacts.splice(index, 1);
      this.contactsValidation.splice(index, 1);
      this.addContacts.splice(index, 1);
      this.addContactClicked++;
    },

    async populateContacts() {
      let contactsStateData = this.quotationData.contacts;
      this.details.contacts = contactsStateData;
      if (contactsStateData.length > 0) {
        this.addContacts = [];
        this.details.contacts = [];
        // this.imageArray = [];

        this.contactsValidation = [];
        for (let cs in contactsStateData) {
          this.addContacts.push("existing_contact");
          let cd_obj = contactsStateData[cs];
          let detailsContactObj = {};
          //
          // this.imageArray.push(contactsStateData[cs].profile_url);
          let contactsValidationObj = {};
          for (let cd_obj_keys in cd_obj) {
            if (
              cd_obj_keys == "contact_name" ||
              cd_obj_keys == "contact_no" ||
              cd_obj_keys == "email" ||
              cd_obj_keys == "designation" ||
              cd_obj_keys == "quotation_id" ||
              cd_obj_keys == "mobile_no" ||
              cd_obj_keys == "profile_url"
            ) {
              detailsContactObj[cd_obj_keys] = cd_obj[cd_obj_keys];
              if (cd_obj_keys != "quotation_id") {
                if (cd_obj_keys == "email") {
                  contactsValidationObj[cd_obj_keys] = { required, email };
                } else if (
                  cd_obj_keys == "contact_name" ||
                  cd_obj_keys == "contact_no"
                ) {
                  contactsValidationObj[cd_obj_keys] = { required };
                }
              }
            }
          }

          this.details.contacts.push(detailsContactObj);

          this.contactsValidation.push(contactsValidationObj);
        }
      }
    },
    async getProfileData() {
      const res = await this.getProfileDetails(this.$route.params.id);

      if (res) {
        let data = res.data.results;
        this.profileDetails = data;

        this.details.profile_name = data.profile_name;
        this.details.short_name = this.quotationData.contact_no;
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
    async prefillData() {
      this.details.profile_id = this.$route.params.id;
      let incomingCountry = this.quotationData.country;
      this.allCountries.map((country) => {
        if (country.name == incomingCountry.country) {
          this.details.country = country.name;
        }
      });
      Object.keys(this.details).map((key) => {
        key != "contacts" && (this.details[key] = this.quotationData[key]);
      });
      this.details.profile_id = this.quotationData.profile_id;
      this.details.sales_person_id = this.quotationData.sales_person_id;
      this.details.short_name = this.quotationData.short_name;
      this.details?.contacts?.map((list) => {
        delete list.id;
      });
      if (this.quotationData?.contacts?.length > 0) {
        await this.populateContacts();
      }

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
    if (this.quotationData) {
      this.prefillData();
    }
  },
  //Created
  async created() {
    this.details.profile_id = this.$route.params.id;
    let incomingCountry =
      this.$store.state?.salesInternationalContract?.profileCreationData
        ?.country;
    this.allCountries.map((country) => {
      if (country.name == incomingCountry.country) {
        this.details.country = country.name;
      }
    });
    const { profileCreationData } =
      this.$store?.state?.salesInternationalContract;

    Object.keys(this.details).map((key, index) => {
      let keyMap;
      keyMap = key == "contacts" ? "company_contacts" : key;

      this.details[key] = profileCreationData[keyMap];
      if (key == "contacts") {
        this.details.contacts[0].selected = false;
      }
    });
    Object.keys(this.details).map((key) => {
      key != "contacts" && (this.details[key] = profileCreationData[key]);
    });
    this.details.profile_id = profileCreationData.id;
    this.details.sales_person_id = "1";
    this.details.short_name = profileCreationData.contact_no;
    this.details?.contacts?.map((list) => {
      delete list.id;
    });
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
