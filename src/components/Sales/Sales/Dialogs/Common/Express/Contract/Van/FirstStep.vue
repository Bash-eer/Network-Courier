<template>
  <div class="formgrid grid mt-6">
    <div class="field col-12 md:col-6">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">
        Name Of the Profile
      </h5>
      <TextField
        label="name_of_profile"
        type="text"
        v-model="details.name_of_profile"
        :classes="{
          'p-invalid': v$.details.name_of_profile.$invalid && submitted,
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
        :classes="{
          'p-invalid': v$.details.short_name.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
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
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">Postal Code</h5>
      <TextField
        label="pin_code"
        type="number"
        v-model="details.pin_code"
        :classes="{
          'p-invalid': v$.details.pin_code.$invalid && submitted,
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
        :classes="{
          // 'p-invalid': v$.details.state.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="bold-500 font-size-14 color-7a7a7a">Building Name</h5>
      <TextField
        label="build_name"
        type="text"
        v-model="details.build_name"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
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
          'inputfield w-full dialog-dropdown-text ': true,
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
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="my-2 ml-2">
    <div class="field col-12 md:col-12 ml-0 pl-0 mt-0">
      <p class="txt mt-4 mb-0 pb-0">Contact</p>
    </div>
    <!-- Img Upload -->
    <!-- <span class="mt-0 pt-0">
    <ImgUpload URL="/images/logo-here.png" />
  </span> -->
  </div>
  <div v-for="(item, index) of details.contract" :key="index">
    <!-- <div v-if="index > 0" class="flex justify-content-between">
      <div class="flex"></div>
      <div class="flex delete" @click="deleteRate(index)">
        <i class="pi parent pi-times mt-2"></i>
      </div>
    </div> -->
    <span class="flex align-items-center">
      <ImgUpload
        @file="getFile"
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
          <span class="p-inputgroup-addon">
            <select name="salutation" id="salutation">
              <option value="mr">Mr</option>
              <option value="ms">Ms</option>
              <option value="mrs">Mrs</option>
            </select>
          </span>
          <TextField
            label="contact_name"
            v-model="item.contact_name"
            :classes="{
              'p-invalid':
                v$.details.contract[index]?.contact_name?.$invalid && submitted,
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
              v$.details.contract[index]?.contact_no.$invalid && submitted,
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
              v$.details.contract[index]?.email?.$invalid && submitted,
            'dialog-label-text dialog-field-text': true,
          }"
        />
        <span v-if="v$.details.contract[index]?.email.$error && submitted">
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
            (v$.details.contract[index]?.email.$invalid && submitted) ||
            v$.details.contract[index]?.email.$pending.$response
          "
          class="p-error"
          >{{
            v$.details.contract[index]?.email.required.$message.replace(
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
import { mapActions, mapState } from "vuex";

export default {
  name: "SalesExpressContractVanFirstStep",
  data: () => ({
    v$: useVuelidate(),
    profileDetails: null,
    addSalesClicked: 0,
    renderKey: 1,
    addSales: ["new_sales"],
    salesValidation: [],
    details: {
      name_of_profile: "",
      short_name: "",
      address: "",
      pin_code: "",
      country: "",
      state: "",
      build_name: "",
      floor_no: "",
      unit_no: "",

      contract: [],
    },
    country: [],
    submitted: false,
  }),
  validations() {
    if (this.addSalesClicked > -1) {
      return {
        details: {
          contract: this.salesValidation,
          name_of_profile: { required },
          short_name: { required },
          address: { required },
          pin_code: { required },
          country: { required },
          // state: { required },
        },
      };
    }
  },
  computed: {
    ...mapState({
      quotationData: (state) => state.salesExpressContractVan.OverviewData,
    }),
  },
  methods: {
    ...mapActions({
      getCountryList: "Outbound/getCountryList",
      getProfileDetails: "salesRapidoContract/Contract/getProfileDetails",
      setPostData: "salesExpressContractVan/setPayloadPostData",
    }),
     closeDialog() {
      this.$store.dispatch("salesSales/closeDialog");
    },
    deleteRate(index) {
      this.details.contract.splice(index, 1);
      this.salesValidation.splice(index, 1);
      // this.addSales.splice(index, 1);
      this.addSalesClicked++;
    },
    nextStepHandler() {
      let {
        name_of_profile,
        short_name,
        address,
        pin_code,
        country,
        state,
        build_name,
        floor_no,
        unit_no,
        contract,
      } = this.details;

      if (this.v$.$invalid) {
        this.submitted = true;
         this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Please fill in all the required fields.",
          life: 3000,
        });
      }
        this.$store.dispatch("salesExpressContractVan/navigateStepper", {
        step: "SalesExpressContractVanFifthStep",
      });
      if (!this.v$.$invalid) {
        let contact_person = [];

        contract.map((i) => {
          contact_person.push({
            selected: false,
            profile_url: i.profile_url,
            contact_name: i.contact_name,
            contact_no: i.contact_no,
            email: i.email,
            mobile_no: i.mobile_no,
            designation: i.designation,
          });
        });
        let payload = {
          profile_id: this.profileDetails.id,
          sales_person_id: this.$store.state.commonStore.userDetails?.id ?? 0,
          profile_name: name_of_profile,
          short_name: short_name,
          address: address,
          postal_code: pin_code,
          country: country,
          state: state,
          building_name: build_name,
          floor_no: floor_no.toString(),
          unit_no: unit_no.toString(),
          customer_type: "Express",
          business_type: "Contract",
          contacts: contact_person,
        };
        this.setPostData({ type: payload });
       this.$store.state.salesExpressContractVan.vanStep++;
        this.$store.dispatch("salesExpressContractVan/navigateStepper", {
          step: "SalesExpressContractVanSecondStep",
        });
      }
    },
    addSale() {
      this.details.contract.push({
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
    
    async getProfileData() {
      const res = await this.getProfileDetails(this.$route.params.id);

      if (res) {
        let data = res.data.results;
        this.profileDetails = data;

        this.details.name_of_profile = data.profile_name;
        // this.details.short_name = data.address;
        // this.details.clearance_name = data.address;
        this.details.address = data.address;
        this.details.pin_code = data.postal_code;
        // this.details.country = data.country;
        this.details.state = data.state;
        this.details.build_name = data.building_name;
        this.details.floor_no = parseInt(data.floor_no);
        this.details.unit_no = parseInt(data.unit_no);
        let get_country = this.country.find(
          (i) => i.name.toLowerCase() === data.country.toLowerCase()
        );
        this.details.country = get_country?.name ?? "";

        data.company_contacts.map((i) => {
          this.details.contract.push({
            profile_url: i.profile_url,
            contact_name: i.contact_name,
            contact_no: i.contact_no,
            email: i.email,
            designation: i.designation,
            mobile_no: i.mobile_no,
          });
          this.salesValidation.push({
            contact_name: { required },
            contact_no: { required },
            email: { required, email },
          });
        });
        if (data.company_contacts.length === 0) {
          this.details.contract.push({
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
      this.details.name_of_profile = this.quotationData.profile_name;
      this.details.short_name = this.quotationData.short_name;
      this.details.clearance_name = this.quotationData.clearance_name;
      this.details.address = this.quotationData.address;
      this.details.pin_code = this.quotationData.postal_code;
     
      this.details.state = this.quotationData.state;
      this.details.build_name = this.quotationData.building_name;
      this.details.floor_no = parseInt(this.quotationData.floor_no);
      this.details.unit_no = parseInt(this.quotationData.unit_no);
      let get_country =  this.country.find((i)=>i.name.toLowerCase() === this.quotationData.country.toLowerCase())

 this.details.country = get_country?.name??"";
      this.profileDetails["company_contacts"] = this.quotationData.contacts;

     

      this.quotationData?.contacts.map((list, index) => {
         this.details.contract.push({
         profile_url:list.profile_url,
        contact_name:list.contact_name,
        contact_no: list.contact_no,
        email: list.email,
        designation: list.designation,
        mobile_no: list.mobile_no,
      });
      if(index!==0){
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
    this.$store.state.salesExpressContractVan.vanStep=0
    await this.getCountries();
    if (this.quotationData) {
      this.prefillData();
    } else {
    this.getProfileData();
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
</style>
