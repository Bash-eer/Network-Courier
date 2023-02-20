<template>
  <br />
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="required color-7a7a7a text-sm">Name Of the Profile</h5>
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
      <h5 class="required color-7a7a7a text-sm">Short Name</h5>
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
      <h5 class="required color-7a7a7a text-sm">Enter the Address</h5>
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
      <h5 class="required color-7a7a7a text-sm">Postal Code</h5>
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
      <h5 class="color-7a7a7a text-sm">Country</h5>
      <!-- <DropDown
        code="name"
        :data="country"
        label="country"
        v-model="details.country"
        :class="{
          'p-invalid': v$.details.country.$invalid && submitted,
          'inputfield w-full color-212121 font-bold ': true,
        }"
      /> -->
      <DropDown
        :data="allCountries"
        :state="details.country"
        :filter="true"
        label="country"
        id="country"
        code="name" 
        :key="details.country"
        modelValue="isoCode"
        v-model="details.country"
        @blur="v$.details.country.$model;"
        :classes="{
          'p-invalid': v$.details.country.$invalid && submitted,
          'inputfield w-full color-212121 font-bold ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="color-7a7a7a text-sm">State</h5>
      <!-- <TextField
        label="state"
        type="text"
        v-model="details.state"
        :classes="{
          'p-invalid': v$.details.state.$invalid && submitted,
          'inputfield w-full color-212121 font-bold ': true,
        }"
      /> -->
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
          'p-invalid': v$.details.state.$invalid && submitted,
          'inputfield w-full color-212121 font-bold ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="color-7a7a7a text-sm">Building Name</h5>
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
      <h5 class="color-7a7a7a text-sm">Floor No</h5>
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
      <h5 class="color-7a7a7a text-sm">Unit No</h5>
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
  <div class="field col-12 md:col-12"></div>
  <!-- Img Upload -->
  <div v-for="(sales, index) of addSales" :key="index">
      <div v-if="index > 0" class="flex justify-content-between">
      <div class="flex"></div>
      <div class="flex delete" @click="deleteRate(index)">
        <i class="pi parent pi-times mt-2"></i>
      </div>
    </div>
  <span>
    <p class="txt text-xs color-4e5868">Contact</p>
    <ImgUpload URL="/images/logo-here.png"
    :state="details.contacts[index].profile_url" 
    @file="getFile($event, index)"
     />
  </span>
  
  
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required color-7a7a7a text-sm">Person Name</h5>
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
              'inputfield w-full color-212121 font-bold ': true,
            }"
          />
        </div>
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required color-7a7a7a text-sm">Contact No</h5>
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
        <h5 class="required color-7a7a7a text-sm" for="Email ID">Email ID</h5>
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
        <h5 class="color-7a7a7a text-sm">Designation</h5>
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
        <h5 class="color-7a7a7a text-sm">Mobile No</h5>
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
    <span class="color-3057ff text-xs cursor-pointer mt-0 ml-2" @click="addSale"
      ><b>+ Add Contact </b></span
    >
  </div>
  <div class="align-self-center flex"></div>
  <div class="flex align-self-center justify-content-end">
    <CancelButton
      storePath="salesSales"
      label="Cancel"
      class="color-357dea font-bold"
    />
    <Buttons
      label="Next"
      button_class="next-button"
      v-on:childToParent="nextStepHandler"
    />
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { City, Country, State } from "country-state-city";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SalesExpressContractVanFSRFirstStep",
  data: () => ({
    allStates: State.getAllStates(),
    allCities: City.getAllCities(),
    states: null,
    cities: null,
    CountryCode: null,
    StateCode: null,
    statesWatcher: null,
    allCountries: Country.getAllCountries(),
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
      short_name: "",
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
      // remarks : "Make the contract Easier",

      contacts: [
        {
          profile_url: "Antony.png",
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
      expressContractVanFSRAddNewData:
        "salesExpressContractVanFSR/expressContractVanFSRAddNewData",
      quotationData: "salesRapidoContract/Contract/quotationData",
      expressContractVanFsrOverviewData:
        "salesExpressContractVanFSR/expressContractVanFsrOverviewData",
    }),
  },
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
 getFile(value, index) {
      if (value) {
        console.log(this.$store.state.fleets.globalImageUploadURL, "Image state", index)
        this.details.contacts[index].profile_url = this.$store.state.fleets.globalImageUploadURL;
        console.log(this.details.contacts[index].profile_url, "Image state url", index)
      }
    },
    

    ...mapActions({
      setCurrentStep: "salesExpressContractBikeFSR/setCurrentStep",
      setPayloadData: "salesExpressContractBikeFSR/setPayloadData",
      getProfileDetails: "salesRapidoContract/Contract/getProfileDetails",
      
    }),
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        console.log("hello world") 
        // this.details.country = this.dropDownFilter(
        //     this.allCountries,
        //     "isoCode",
        //     this.details.country
        //   );
        //    this.details.state = this.dropDownFilter(
        //     this.states,
        //     "isoCode",
        //     this.details.state
        //   );
        for (let i in this.details) {
          if (i == "contacts") {
            (this.expressContractVanFSRAddNewData["contacts"] = []),
              this.details.contacts.map((list) => {
                console.log(list, "Contact");
                this.expressContractVanFSRAddNewData["contacts"].push({
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
            this.expressContractVanFSRAddNewData[i] = this.details[i];
          }
        }

        console.log(this.expressContractVanFSRAddNewData, "details page1222");
        this.$store.dispatch("salesQuotationDialog/navigateStepper", {
          step: "SalesExpressContractVanFSRSecondStep",
        });
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
        profile_url: "Antony.png",
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

    async populateContacts() {
      let contactsStateData =
         this.$store.state["salesExpressContractVanFSR"].expressContractVanFSREditData
          .contacts;
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
                } else if(cd_obj_keys == "contact_name" || cd_obj_keys == "contact_no"){
                  contactsValidationObj[cd_obj_keys] = { required };
                }
              }
            }
          }
          // this.details.contacts[index] = {};
          // if (this.details.contacts && this.details.contacts.length > 0) {
          this.details.contacts.push(detailsContactObj);
          
          this.contactsValidation.push(contactsValidationObj);
          // }
        }
      }
    },
    
  },
  watch: {
    "details.country": function () {
      if (this.details.country != null) {
        // if (this.details.country.length == 2) {
        let respectiveData = this.allCountries.find(
          (item) => item.name == this.details.country
        );
        console.log(respectiveData);
        this.countryFunction(respectiveData.isoCode);
        // }
      }
    },
   
    statesWatcher: function () {
      this.countryFunction(this.statesWatcher);
    },
  },
  
  async created() {
     console.log(this.$store.state["salesExpressContractVanFSR"].expressContractVanFSREditData, "EDIT DATAAAAAAAAAAAAA arrive");
    if (
      Object.keys(this.$store.state["salesExpressContractVanFSR"].expressContractVanFSREditData)
        .length == 0
    ){
    this.details.profile_id = this.$route.params.id;
    let incomingCountry =
      this.$store.state.salesInternationalContract.profileCreationData.country;
    this.allCountries.map((country) => {
      if (country.name == incomingCountry.country) {
        this.details.country = country.name;
      }
    });
    const { profileCreationData } =
      this.$store.state.salesInternationalContract;

    Object.keys(this.details).map((key, index) => {
      let keyMap;
      keyMap = key == "contacts" ? "company_contacts" : key;

      this.details[key] = profileCreationData[keyMap];
      if (key == "contacts") {
        this.details.contacts[0].selected = true;
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
  }

     // //EDIT DATA
   if (
      Object.keys(this.$store.state["salesExpressContractVanFSR"].expressContractVanFSREditData)
        .length != 0
    ) {
      
     this.details.profile_id = this.$route.params.id;
    let incomingCountry =
      this.$store.state.salesExpressContractVanFSR.expressContractVanFSREditData.country;
    this.allCountries.map((country) => {
      if (country.name == incomingCountry.country) {
        this.details.country = country.name;
      }
    });
    const { expressContractVanFSREditData } =
      this.$store.state.salesExpressContractVanFSR;

    Object.keys(this.details).map((key) => {
      key != "contacts" && (this.details[key] = expressContractVanFSREditData[key]);
    });
    this.details.profile_id = expressContractVanFSREditData.profile_id;
    this.details.sales_person_id = expressContractVanFSREditData.sales_person_id;
    this.details.short_name = expressContractVanFSREditData.short_name;
    // this.details?.contacts?.map((list) => {
    //   delete list.id;
    // });
    if (this.$store.state["salesExpressContractVanFSR"].expressContractVanFSREditData.contacts.length > 0) {
      await this.populateContacts();
      }

      //overview
       await this.$store.dispatch(
      "salesExpressContractVanFSR/loadexpressContractVanFsrOverviewData",
      {
        id: this.$store.state.salesExpressContractVanFSR.expressContractVanFSREditData.id,
        path: "/sales/quotations/overview/",
      
      }
      
    );
    console.log(this.expressContractVanFsrOverviewData)
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
.next-button {
  background-color: #357dea;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
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
