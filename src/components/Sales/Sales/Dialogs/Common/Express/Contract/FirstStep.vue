<template>
  <div class="formgrid grid mt-6">
    <div class="field col-12 md:col-6">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">
        Name Of the Profile
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
      <h5 class="required bold-500 font-size-14 color-7a7a7a">Short Name</h5>
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
  <!-- <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">
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
  <!-- <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">Postal Code</h5>
      <TextField
        label="postal_code"
        type="number"
        v-model="details.postal_code"
        v-on:childToParent="getUserInput"
        :classes="{
          'p-invalid': v$.details.postal_code.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div :key="renderKey" class="field col-12 md:col-4">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">Country</h5>
      <DropDown
        :key="renderKey"
        code="name"
        :data="country"
        :state="details.country"
        label="country"
        id="country"
        v-model="details.country"
        v-on:childToParent="getUserInput"
        :class="{
          'p-invalid': v$.details.country.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="bold-500 font-size-14 color-7a7a7a">State</h5>
      <TextField
        label="state"
        type="text"
        v-model="details.state"
        v-on:childToParent="getUserInput"
        :classes="{
          // 'p-invalid': v$.details.state.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div> -->
  <!-- <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="bold-500 font-size-14 color-7a7a7a">Building Name</h5>
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
      <h5 class="bold-500 font-size-14 color-7a7a7a">Floor No</h5>
      <TextField
        label="floor_no"
        type="text"
        v-model="details.floor_no"
        v-on:childToParent="getUserInput"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="bold-500 font-size-14 color-7a7a7a">Unit No</h5>
      <TextField
        label="unit_no"
        type="text"
        v-model="details.unit_no"
        v-on:childToParent="getUserInput"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div> -->
  <div class="my-2 ml-2">
    <div class="field col-12 md:col-12 ml-0 pl-0 mt-0">
      <p class="txt mt-4 mb-0 pb-0">Contact</p>
    </div>
    <!-- Img Upload -->
    <!-- <span class="mt-0 pt-0">
    <ImgUpload URL="/images/logo-here.png" />
  </span> -->
  </div>
  <div v-for="(item, index) of details.contacts" :key="index">
    <!-- <div v-if="index > 0" class="flex justify-content-between">
      <div class="flex"></div>
      <div class="flex delete" @click="deleteRate(index)">
        <i class="pi parent pi-times mt-2"></i>
      </div>
    </div> -->
    <span class="flex align-items-center">
      <ImgUpload
        :key="addSalesClicked"
        @file="getFile($event, index)"
        URL="/images/logo-here.png"
        class="mt-0 mb-2 ml-2"
        :state="item.profile_url"
      />
      <div
        @click="deleteRate(index)"
        v-if="rowCount !== 1"
        class="pi pi-times pointer ml-3 mb-3"
      ></div>
    </span>
    <div class="formgrid grid mt-2">
      <div class="field col-12 md:col-4">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">Person Name</h5>
        <div class="p-inputgroup">
          <span>
            <DropDown
              :state="item.salutation"
              code="name"
              :data="salutationData"
              label="salutation"
              id="salutation"
              v-model="item.salutation"
              class="salutation"
            />
          </span>
          <TextField
            label="contact_name"
            v-model="item.contact_name"
            :classes="{
              'p-invalid':
                v$.details.contacts[index]?.contact_name?.$invalid && submitted,
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required bold-500 font-size-14 color-7a7a7a">Contact No</h5>
        <TextField
          label="contact_no"
          type="number"
          v-model="item.contact_no"
          :classes="{
            'p-invalid':
              v$.details.contacts[index]?.contact_no.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <label
          class="required bold-500 font-size-14 color-7a7a7a mb-1"
          for="Email ID"
          >Email Id</label
        >
        <TextField
          id="Email ID"
          type="text"
          label="Email ID"
          v-model="item['email']"
          placeholder="e.g. Tommy@gmail.com"
          v-on:childToParent="FormInput"
          :classes="{
            'p-invalid':
              v$.details.contacts[index]?.email?.$invalid && submitted,
            'dialog-label-text dialog-field-text': true,
          }"
        />
        <span v-if="v$.details.contacts[index]?.email.$error && submitted">
          <span
            id="email-error"
            v-for="(error, index) of v$.item?.email.$errors"
            :key="index"
          >
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
        <small
          v-else-if="
            (v$.details.contacts[index]?.email.$invalid && submitted) ||
            v$.details.contacts[index]?.email.$pending.$response
          "
          class="p-error"
          >{{
            v$.details.contacts[index]?.email.required.$message.replace(
              "Value",
              "Email"
            )
          }}</small
        >
      </div>
    </div>
    <div class="formgrid grid mt-2">
      <div class="field col-12 md:col-4">
        <h5 class="bold-500 font-size-14 color-7a7a7a">Designation</h5>
        <TextField
          label="designation"
          type="text"
          v-model="item.designation"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="bold-500 font-size-14 color-7a7a7a">Mobile No</h5>
        <TextField
          label="mobile_no"
          type="number"
          v-model="item.mobile_no"
          :classes="{
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
  </div>
  <div class="flex mb-2">
    <span class="bold-600 font-size-14 color-3057ff ml-2 mt-0" @click="addSale"
      ><b>+ Add Contact </b></span
    >
  </div>
  <div class="align-self-center flex"></div>
  <div class="flex align-self-center justify-content-end">
    <CancelButton
      storePath="SalesQuotationDialog"
      label="Cancel"
      class="color-357dea"
      @click="closeDialog"
    />
    <Buttons
      label="Next"
      button_class="dialog-button-text bg-357dea"
      v-on:childToParent="nextStepHandler"
    />
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import {
  expressContract,
  expressContractState,
  salesCommon,
} from "../../../../../../../store/helper";

export default {
  name: "SalesExpressContractFirstStep",
  components: {},
  data: () => ({
    v$: useVuelidate(),
    profileDetails: null,
    addSalesClicked: 0,
    renderKey: 1,
    addSales: ["new_sales"],
    salesValidation: [],
    salutationData: [
      { name: "Mr", code: "Mr" },
      { name: "Ms", code: "Ms" },
      { name: "Mrs", code: "Mrs" },
    ],
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
      sales_person_id: "",
      contacts: [],
    },
    country: [],
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
          // state: { required },
        },
      };
    }
  },
  computed: {
    ...expressContractState,
  },
  methods: {
    ...expressContract,
    ...salesCommon,
    // ...mapActions({
    //   // getCountryList: "Outbound/getCountryList",
    //   // // getProfileDetails: "salesRapidoContract/Contract/getProfileDetails",
    //   setPostData: "salesExpressContract/setPayloadPostData",
    // }),
    closeDialog() {
      this.$store.dispatch("salesSales/closeDialog");
    },
    getFile(value, index) {
      if (value) {
        this.details.contacts[index].profile_url =
          this.$store.state.fleets.globalImageUploadURL;
      }
    },
    setAddress(e) {
      this.details = {
        ...this.details,
        ...e,
      };
    },
    getUserInput() {
      this.setExpressContractData({ value: this.details });
    },
    deleteRate(index) {
      this.details.contacts.splice(index, 1);
      this.salesValidation.splice(index, 1);
      // this.addSales.splice(index, 1);
      this.addSalesClicked++;
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please fill in all the required fields.",
          life: 3000,
        });
      }
      if (!this.v$.$invalid) {
        (this.details["profile_id"] = this.profileDetails.id),
          this.getUserInput();
        this.navigateStepper({
          step: "SalesExpressContractSecondStep",
        });
        this.$store.state.salesExpressContract.flowStep++;
      }
    },
    addSale() {
      this.details.contacts.push({
        selected: false,
        profile_url: "",
        contact_name: "",
        contact_no: "",
        email: "",
        mobile_no: "",
        designation: "",
        salutation: "",
      });

      this.salesValidation.push({
        contact_name: { required },
        contact_no: { required },
        email: { required, email },
      });
      this.addSalesClicked++;
      this.addSales.push("new_sales");
    },

    async getProfileData() {
      const res = await this.getProfileDetails(this.$route.params.id);

      if (res) {
        let data = res.data.results;
        this.profileDetails = data;

        this.details.profile_name = data.profile_name;
        // this.details.short_name = data.address;
        // this.details.clearance_name = data.address;
        this.details.address = data.address;
        this.details.postal_code = data.postal_code;
        // this.details.country = data.country;
        this.details.state = data.state;
        this.details.building_name = data.building_name;
        this.details.floor_no = data.floor_no;
        this.details.unit_no = data.unit_no;
        let get_country = this.country.find(
          (i) => i.name.toLowerCase() === data.country.toLowerCase()
        );
        this.details.country = get_country?.name ?? "";

        data.company_contacts.map((i) => {
          this.details.contacts.push({
            selected: false,
            profile_url: i.profile_url,
            contact_name: i.contact_name,
            contact_no: i.contact_no,
            email: i.email,
            mobile_no: i.mobile_no,
            designation: i.designation,
            salutation: i.salutation,
          });
          this.salesValidation.push({
            contact_name: { required },
            contact_no: { required },
            email: { required, email },
          });
        });
        if (data.company_contacts.length === 0) {
          this.details.contacts.push({
            selected: false,
            profile_url: "",
            contact_name: "",
            contact_no: "",
            email: "",
            mobile_no: "",
            designation: "",
            salutation: "",
          });
          this.salesValidation.push({
            contact_name: { required },
            contact_no: { required },
            email: { required, email },
          });
        }
      }
      this.renderKey++;
    },
    async getCountries() {
      this.countryOpts = [];
      let res = await this.getCountryList();

      res.data.results.map((list) => {
        this.country.push({
          name: list.country_name,
          code: list.country_iso_code,
          country_id: list.id,
        });
      });
      this.renderKey++;
    },
    prefillData() {
      this.profileDetails = {};
      this.details.sales_person_id =
        this.overViewData.sales_person_id ||
        this.$store.state.commonStore.userDetails?.id;
      this.profileDetails["id"] = this.overViewData.profile_id;
      this.details.profile_name = this.overViewData.profile_name;
      this.details.short_name = this.overViewData.short_name;
      this.details.clearance_name = this.overViewData.clearance_name;
      this.details.address = this.overViewData.address;
      this.details.postal_code = this.overViewData.postal_code;

      this.details.state = this.overViewData.state;
      this.details.building_name = this.overViewData.building_name;
      this.details.floor_no = this.overViewData.floor_no;
      this.details.unit_no = this.overViewData.unit_no;
      let get_country = this.country.find(
        (i) => i.name.toLowerCase() === this.overViewData.country.toLowerCase()
      );

      this.details.country = get_country?.name ?? "";
      this.profileDetails["company_contacts"] = this.overViewData.contacts;

      this.overViewData?.contacts.map((list, index) => {
        this.details.contacts.push({
          selected: false,
          profile_url: list.profile_url,
          contact_name: list.contact_name,
          contact_no: list.contact_no,
          email: list.email,
          mobile_no: list.mobile_no,
          designation: list.designation,
          salutation: list.salutation,
        });
        if (index !== 0) {
          this.salesValidation.push({
            contact_name: { required },
            contact_no: { required },
            email: { required, email },
          });
        }
      });

      this.renderKey++;
    },
  },
  async mounted() {
    this.$store.state.salesExpressContract.flowStep = 0;
    await this.getCountries();
    if (this.overViewData) {
      this.prefillData();
    } else {
      this.getProfileData();
      this.details.sales_person_id =
        this.$store.state.commonStore.userDetails?.id;
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
::v-deep .salutation .p-dropdown-label {
  background: #e9ecef !important;
  width: 2.5rem !important;
}
::v-deep .salutation .p-dropdown-trigger {
  background: #e9ecef !important;
  width: 1.5rem !important;
}
</style>