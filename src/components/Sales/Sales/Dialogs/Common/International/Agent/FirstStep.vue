<template>
  <div class="formgrid grid mt-6">
    <div class="field col-12 md:col-4">
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
    <div class="field col-12 md:col-4">
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
    <div class="field col-12 md:col-4">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">
        Clearance Name
      </h5>
      <TextField
        label="clearance_name"
        type="text"
        v-model="details.clearance_name"
        :classes="{
          'p-invalid': v$.details.clearance_name.$invalid && submitted,
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

  <!-- <div class="formgrid grid mt-2">
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
        :data="country"
        :state="details.country"
        code="name"
        label="country"
        id="country"
        v-model="details.country"
        modelValue="isoCode"
        @blur="v$.details.country.$model;"
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
        :classes="
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid mt-2">
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
  </div> -->
  <div class="field col-12 md:col-12 mb-2">
    <p class="bold-700 font-size-12 color-4e5868 mt-4 mb-0">Contact</p>
  </div>
  <!-- Img Upload -->
  <!-- <div v-for="(data, idx) of rowData" :key="data">
      <Contact
        :rowId="idx"
        :rowCount="rowData.length"
        @isRowValid="isRowValid"
        @removeRow="removeRow"
        :stepKey="stepKey"
        :profileDetails="profileDetails && profileDetails.company_contacts[idx]"
      />
    </div> -->
  <!-- <span>
    <ImgUpload URL="/images/logo-here.png" class="ml-2"/>
  </span> -->
  <div v-for="(item, index) of details.contract" :key="index">
    <!-- <div v-if="index > 0" class="flex justify-content-between">
      <div class="flex"></div>
      <div class="flex delete" @click="deleteRate(index)">
        <i class="pi parent pi-times mt-2"></i>
      </div>
    </div> -->
    <span class="flex align-items-center">
      <ImgUpload
        @file="getFile($event, index)"
        URL="/images/logo-here.png"
        class="mt-0 mb-2 ml-2"
        :state="details.contract[index].profile_url"
      />
      <div
        @click="deleteRate(index)"
        v-if="details.contract.length !== 1"
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
  <div class="flex">
    <span class="bold-600 font-size-14 color-3057ff mt-0 ml-2" @click="addSale"
      ><b>+ Add Contact </b></span
    >
  </div>
  <div class="align-self-center flex"></div>
  <div class="flex align-self-center justify-content-end">
    <CancelButton
      storePath="salesInternationalAgent"
      @click="closeDialog"
      label="Cancel"
      class="color-357dea"
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
// import salesInternationalAgent from "../../../../../../../store/modules/Sales/International/agent"

export default {
  name: "SalesInternationalAgentFirstStep",

  data: () => ({
    v$: useVuelidate(),
    addSalesClicked: 0,
    addSales: ["new_sales"],
    rowData: [{ id: 1, valid: false }],
    profileDetails: null,
    file: null,
    renderKey: 10,
    salesValidation: [
      {
        contact_name: { required },
        contact_no: { required },
        email: { required, email },
      },
    ],
    details: {
      name_of_profile: "",
      short_name: "",
      clearance_name: "",
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
          clearance_name: { required },
          address: { required },
          pin_code: { required },
          country: { required },
          // state: { required },
        },
      };
    }
  },
  watch: {
    quotationData() {
      if (this.quotationData) {
        this.prefillData();
      }
    },
  },
  // computed: {
  //   ...mapGetters({
  //     quotationData: "salesRapidoContract/Contract/quotationData",
  //   }),
  // },
  computed: {
    ...mapState({
      quotationData: (state) => state.salesInternationalAgent.quotationData,
    }),
  },
  methods: {
    // ...mapActions({salesInternationalAgent}),
    ...mapActions({
      getCountryList: "Outbound/getCountryList",
      setAgentStep: "salesInternationalAgent/setAgentStep",
      setRapidoContractStep: "salesQuotationDialog/setRapidoContractStep",
      setRapidoContractData:
        "salesRapidoContract/Contract/setRapidoContractData",
      getProfileDetails: "salesRapidoContract/Contract/getProfileDetails",
      setPostData: "salesInternationalAgent/setPayloadPostData",
    }),
    setAddress(e) {
      this.details.address = e.address;
      this.details.pin_code = e.postal_code;
      this.details.state = e.state;
      this.details.build_name = e.building_name;
      this.details.floor_no = e.floor_no;
      this.details.unit_no = e.unit_no;
      this.details.country = e.country;
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

        this.details.country = data.country;
        // if (
        //   this.profileDetails &&
        //   this.profileDetails.company_contacts.length
        // ) {
        //   this.rowData = [];
        // }

        data.company_contacts.map((list) => {
          this.details.contract.push({
            profile_url: list.profile_url,
            contact_name: list.contact_name,
            contact_no: list.contact_no,
            email: list.email,
            designation: list.designation,
            mobile_no: list.mobile_no,
          });
        });
      }
      this.renderKey++;
    },

    prefillData() {
      this.profileDetails = {
        id: this.quotationData.profile_id,
      };
      this.details.name_of_profile = this.quotationData.profile_name;
      this.details.short_name = this.quotationData.short_name;
      this.details.clearance_name = this.quotationData.clearance_name;
      this.details.address = this.quotationData.address;
      this.details.pin_code = this.quotationData.postal_code;

      this.details.state = this.quotationData.state;
      this.details.build_name = this.quotationData.building_name;
      this.details.floor_no = parseInt(this.quotationData.floor_no);
      this.details.unit_no = parseInt(this.quotationData.unit_no);
      let get_country = this.country.find(
        (i) => i.name.toLowerCase() === this.quotationData.country.toLowerCase()
      );

      this.details.country = get_country?.name ?? "";
      this.profileDetails["company_contacts"] = this.quotationData.contacts;

      if (this.quotationData && this.quotationData?.contacts.length) {
        this.rowData = [];
      }

      this.quotationData?.contacts.map((list, index) => {
        this.details.contract.push({
          profile_url: list.profile_url,
          contact_name: list.contact_name,
          contact_no: list.contact_no,
          email: list.email,
          designation: list.designation,
          mobile_no: list.mobile_no,
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
      if (this.details.contract.length > 1) {
        this.details.contract.splice(id, 1);
        this.removeContacts(id);
      }
    },
    closeDialog() {
      this.$store.dispatch("salesSales/closeDialog");
    },
    nextStepHandler() {
      let {
        name_of_profile,
        address,
        pin_code,
        country,
        clearance_name,
        short_name,
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

      if (!this.v$.$invalid) {
        let payload = {
          profile_id: this.profileDetails.id,
          profile_name: name_of_profile,
          address: address,
          postal_code: pin_code,
          country: country,
          state: state,
          building_name: build_name,
          customer_type: "International",
          business_type: "Agent",
          floor_no: floor_no.toString(),
          unit_no: unit_no.toString(),
          short_name: short_name,
          clearance_name: clearance_name,
          contacts: contract,
        };
        this.setPostData({ type: payload });
        this.$store.dispatch("salesInternationalAgent/navigateStepper", {
          step: "SalesInternationalAgentSecondStep",
        });
        this.$store.state.salesInternationalAgent.agentStep++;
        // this.$store.dispatch("salesInternationalAgent/navigateStepper", {
        //   step: "SalesInternationalAgentSeventhStep",
        // });

        // this.setAgentStep(1);
      }
    },
    addSale() {
      this.details.contract.push({
        url: "",
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
      this.details.contract.splice(index, 1);
      this.salesValidation.splice(index, 1);
      // this.addSales.splice(index, 1);
      this.addSalesClicked++;
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
    getFile(value, index) {
      if (value) {
        this.file = value;
        // this.details.contacts[index].profile_url = value?.fileLink;
        this.details.contract[index].profile_url = value?.fileLink;
      }
    },
  },

  async mounted() {
    await this.getCountries();
    this.$store.state.salesInternationalAgent.agentStep = 0;
    if (this.quotationData) {
      this.prefillData();
    } else {
      this.getProfileData();
    }
  },
  // created() {
  //   this.getCountries();
  // },
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