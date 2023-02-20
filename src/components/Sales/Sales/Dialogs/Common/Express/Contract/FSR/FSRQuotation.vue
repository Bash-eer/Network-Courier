<template>
  <br />
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Name Of the Profile</h5>
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
    <div class="field col-12 md:col-6">
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
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Enter the Address</h5>
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
      <h5 class="required dialog-label-text">Postal Code</h5>
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
    <div :key="renderKey" class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">State</h5>
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
          'p-invalid': v$.details.building_name.$invalid && submitted,
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
          'p-invalid': v$.details.floor_no.$invalid && submitted,
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
          'p-invalid': v$.details.unit_no.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="field col-12 md:col-12">
    <p class="dialog-contact-header mt-4">Contact</p>
  </div>
  <!-- Img Upload -->
  <!-- <span>
    <ImgUpload URL="/images/logo-here.png" />
  </span> -->

  <div v-for="(sales, index) of addSales" :key="index">
    <div v-if="index > 0" class="flex justify-content-between">
      <div class="flex"></div>
      <div class="flex delete" @click="deleteRate(index)">
        <i class="pi parent pi-times mt-2"></i>
      </div>
    </div>

    <span>
      <!-- <ImgUpload URL="/images/logo-here.png" 
        :state="this.details.contacts.profile_url"
      /> -->
      <ImgUpload
        @file="getFile($event, index)"
        URL="/images/profile-here.png"
        class="mt-0 mb-2"
        :state="details['contacts'][index].profile_url"
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
    <CancelButton storePath="dialog" />
    <Buttons
      label="Next"
      button_class="dialog-button-text"
      v-on:childToParent="nextStepHandler"
    />
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { mapGetters } from "vuex";
import { required, email } from "@vuelidate/validators";
import { City, Country, State } from "country-state-city";
import { mapActions } from "vuex";
export default {
  name: "FSRQuotationDialog",
  data: () => ({
    v$: useVuelidate(),
    addSalesClicked: 0,
    addSales: [],
    statesWatcher: null,
    allCountries: Country.getAllCountries(),
    allStates: State.getAllStates(),
    allCities: City.getAllCities(),
    salesValidation: [
      {
        contact_name: { required },
        contact_no: { required },
        email: { required, email },
      },
    ],
    details: {
      profile_name: "",
      address: "",
      postal_code: "",
      country: "",
      state: "",
      building_name: "",
      floor_no: "",
      unit_no: "",
      short_name: "",

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
    renderKey: 10,
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
          building_name: { required },
          floor_no: { required },
          unit_no: { required },
        },
      };
    }
  },
  computed: {
    ...mapGetters({
      IndexFsrDetails: "salesExpressContractFSR/ExpressContractFsrOverviewData",
    }),
  },

  unmounted() {
    this.$store.state.salesExpressContractFSR.ExpressContractFsrOverviewEditData =
      null;
    this.$store.state.salesExpressContractFSR.ExpressContractFsrOverviewData =
      null;

    this.details.contacts = [];
    this.salesValidation = [];
    this.addSales = [];
  },

  mounted() {},

  async created() {
    this.$store.dispatch(
      "salesExpressContractFSR/loadExpressContractFsrDialogFestivalDropDown"
    );
    this.$store.dispatch(
      "salesExpressContractFSR/loadExpressContractFsrDialogReferenceDropDown"
    );
    this.$store.dispatch(
      "salesExpressContractFSR/loadExpressContractFsrDialogCompetitorDropDown"
    );

    let incomingCountry =
      this.$store.state.salesInternationalContract.profileCreationData.country;
    this.allCountries.map((country) => {
      if (country.name == incomingCountry.country) {
        this.details.country = country.name;
      }
    });

    if (
      this.$store.state.salesExpressContractFSR
        .ExpressContractFsrOverviewEditData !== null
    ) {
      console.log("!!!!!!!!!!!!!!!!!!");

      this.details.address =
        this.$store.state.salesExpressContractFSR.ExpressContractFsrOverviewEditData.address;
      this.details.profile_name =
        this.$store.state.salesExpressContractFSR.ExpressContractFsrOverviewEditData.profile_name;
      this.details.postal_code =
        this.$store.state.salesExpressContractFSR.ExpressContractFsrOverviewEditData.postal_code;
      this.details.country =
        this.$store.state.salesExpressContractFSR.ExpressContractFsrOverviewEditData.country;
      this.details.state =
        this.$store.state.salesExpressContractFSR.ExpressContractFsrOverviewEditData.state;
      this.details.building_name =
        this.$store.state.salesExpressContractFSR.ExpressContractFsrOverviewEditData.building_name;
      this.details.floor_no =
        this.$store.state.salesExpressContractFSR.ExpressContractFsrOverviewEditData.floor_no;
      this.details.unit_no =
        this.$store.state.salesExpressContractFSR.ExpressContractFsrOverviewEditData.unit_no;

      if (
        this.$store.state.salesExpressContractFSR
          .ExpressContractFsrOverviewEditData.contacts?.length > 0
      ) {
        await this.populateContacts(
          this.$store.state.salesExpressContractFSR
            .ExpressContractFsrOverviewEditData.contacts
        );
      }
      this.renderKey++;
    }

    if (
      this.$store.state.salesExpressContractFSR
        .ExpressContractFsrOverviewEditData == null
    ) {
      await this.loadExpressContractFsrOverviewData(this.$route.params.id);
      this.details.contacts = [];
      this.salesValidation = [];
      this.addSales = [];

      this.details.address =
        this.$store.state.salesInternationalContract.profileCreationData.address;
      this.details.profile_name =
        this.$store.state.salesInternationalContract.profileCreationData.profile_name;
      this.details.postal_code =
        this.$store.state.salesInternationalContract.profileCreationData.postal_code;
      this.details.country =
        this.$store.state.salesInternationalContract.profileCreationData.country;
      this.details.state =
        this.$store.state.salesInternationalContract.profileCreationData.state;
      this.details.building_name =
        this.$store.state.salesInternationalContract.profileCreationData.building_name;
      this.details.floor_no =
        this.$store.state.salesInternationalContract.profileCreationData.floor_no;
      this.details.unit_no =
        this.$store.state.salesInternationalContract.profileCreationData.unit_no;

      if (
        this.$store.state.salesInternationalContract.profileCreationData
          .company_contacts?.length > 0
      ) {
        await this.populateContacts(
          this.$store.state.salesInternationalContract.profileCreationData
            .company_contacts
        );
      }

      this.renderKey++;
    }
  },

  methods: {
    getFile(value, index) {
      if (value) {
        this.details["contacts"][index].profile_url = value?.fileLink;
      }
    },

    ...mapActions({
      loadExpressContractFsrOverviewData:
        "salesExpressContractFSR/loadExpressContractFsrOverviewData",
    }),

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
        this.$store.state.salesExpressContractFSR.quotationDetails.push(
          this.details
        );
        this.$store.dispatch("salesExpressContractFSR/navigateStepper", {
          step: "FSRSelectMethodDialog",
        });

        this.$store.state.salesExpressContractFSR.expressQuotationContactsTableData =
          this.details.contacts;
        console.log(
          "before 1111111333333333444444",

          this.details.contacts
        );

        console.log(
          "11111111111111",
          this.$store.state.salesExpressContractFSR
            .expressQuotationContactsTableData
        );
      }
    },
    addSale() {
      this.details.contacts.push({
        profile_url: "",
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
    async populateContacts(value) {
      let contactsStateData = value;
      this.details.contacts = contactsStateData;
      if (contactsStateData.length > 0) {
        this.addSales = [];
        this.details.contacts = [];
        // this.imageArray = [];
        this.salesValidation = [];
        for (let cs in contactsStateData) {
          this.addSales.push("existing_contact");
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
          this.salesValidation.push(contactsValidationObj);
        }
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
    statesWatcher: function () {
      this.countryFunction(this.statesWatcher);
    },
    "$store.state.salesExpressContractFSR.ExpressContractFsrOverviewData":
      function () {},
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
