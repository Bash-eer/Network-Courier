<template>
  <ImgUpload
    :key="addSalesClicked"
    @file="getFile($event, null)"
    URL="/images/logo-here.png"
    class="mt-0 mb-2 ml-2"
    :state="details.profile_url"
  />
  <div class="formgrid grid mt-5">
    <div class="field col-12 md:col-12">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">
        Name Of the Profile
      </h5>
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
    </div> -->
    <!-- <div class="field col-12 md:col-4">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">Profile Type</h5>
      <DropDown
        :key="renderKey"
        code="name"
        :data="profile_type"
        :state="details.profile_type"
        label="profile type"
        id="profile type"
        v-model="details.profile_type"
        :class="{
          'p-invalid': v$.details.profile_type.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div> -->
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
        :classes="{
          'p-invalid': v$.details.postal_code.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div :key="renderKey" class="field col-12 md:col-4">
      <h5 class="required bold-500 font-size-14 color-7a7a7a">Country</h5>
      <CountryDrop
        :key="renderKey"
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
          'inputfield w-full dialog-dropdown-text ': true,
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
  </div>
  <div v-for="(item, index) of details.contacts" :key="index">
    <span class="flex align-items-center">
      <ImgUpload
        :key="addSalesClicked"
        @file="getFile($event, index)"
        URL="/images/logo-here.png"
        class="mt-0 mb-2 ml-2"
        :state="details.contacts[index].profile_url"
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
            <!-- <Dropdown
            :key="addSalesClicked"
            class="calender-drop p-inputtext-sm"
            v-model="item.salutation"
            :options="time_type"
            optionLabel="label"
            optionValue="value"
          /> -->
            <select
              :key="addSalesClicked"
              name="salutation"
              id="salutation"
              v-model="item.salutation"
            >
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
      label="Save"
      button_class="dialog-button-text bg-357dea"
      v-on:childToParent="nextStepHandler"
    />
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
// import Dropdown from "primevue/dropdown";
import {
  adhoc_pro_fun,
  adhoc_pro,
  salesCommon,
  sales_co,
} from "../../../../../store/helper";

export default {
  name: "SalesExpressContractFirstStep",
  // components: { Dropdown },
  data: () => ({
    v$: useVuelidate(),
    profileDetails: null,
    addSalesClicked: 0,
    renderKey: 1,
    addSales: ["new_sales"],
    append_con: {
      contact_name: { required },
      contact_no: { required },
      email: { required, email },
    },
    salesValidation: [
      {
        contact_name: { required },
        contact_no: { required },
        email: { required, email },
      },
    ],
    time_type: [
      { label: "Mr", value: "mr" },
      { label: "Ms", value: "ms" },
      { label: "Mrs", value: "mrs" },
    ],
    details: {
      profile_url: "",
      profile_id: "",
      profile_name: "",
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
          salutation: "mr",
          contact_name: "",
          contact_no: "",
          email: "",
          mobile_no: "",
          designation: "",
        },
      ],
    },
    country: [],
    profile_type: [
      {
        name: "International Agent",
        code: "International Agent",
      },
    ],
    submitted: false,
  }),
  validations() {
    if (this.addSalesClicked > -1) {
      return {
        details: {
          contacts: this.salesValidation,
          profile_name: { required },
          // profile_type: { required },
          // short_name: { required },
          address: { required },
          postal_code: { required },
          country: { required },
          // state: { required },
        },
      };
    }
  },
  computed: {
    ...adhoc_pro,
    ...sales_co,
  },
  methods: {
    ...adhoc_pro_fun,
    ...salesCommon,
    setAddress(e) {
      this.details = {
        ...this.details,
        ...e,
      };
    },
    getFile(value, index) {
      if (value) {
        if (index == null) {
          this.details.profile_url = value?.fileLink;
        } else {
          this.file = value;
          // this.details.contacts[index].profile_url = value?.fileLink;
          this.details.contacts[index].profile_url = value?.fileLink;
        }
      }
    },
    deleteRate(index) {
      this.details.contacts.splice(index, 1);
      this.salesValidation.splice(index, 1);
      this.addSalesClicked++;
    },
    async nextStepHandler() {
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
        this.details.profile_id = this.$route?.params?.id;
        await this.profileAction({
          payload: this.details,
          id: this.adhoc_pro_data?.id ?? 0,
          method: this.adhoc_pro_data ? "PATCH" : "POST",
          toast: this.$toast,
        });
        this.closeDialog();
        this.loadTableData({ id: this.$route.params.id });
      }
    },
    addSale() {
      this.details.contacts.push({
        profile_url: "",
        salutation: "mr",
        contact_name: "",
        contact_no: "",
        email: "",
        mobile_no: "",
        designation: "",
      });

      this.salesValidation.push(this.append_con);
      this.addSalesClicked++;
      this.addSales.push("new_sales");
    },
    prefillData() {
      let data = this.adhoc_pro_data;
      Object.keys(this.details).map((i) => {
        if (i == "contacts") {
          this.details[i] = [];
        } else {
          this.details[i] = data[i];
        }
      });

      // this.salesValidation=[]
      data.company_contacts.map((i, index) => {
        this.details.contacts.push({
          profile_url: i.profile_url,
          salutation: i.salutation.toLowerCase() ?? "mr",
          contact_name: i.contact_name,
          contact_no: i.contact_no,
          email: i.email,
          mobile_no: i.mobile_no,
          designation: i.designation,
        });
        if (index != 0) {
          this.salesValidation.push(this.append_con);
        }
      });

      this.renderKey++;
      this.addSalesClicked++;
    },
    async getProDetails() {
      const res = await this.getProfileDetails(this.$route.params.id);
      if (res) {
        let data = res.data.results;
        Object.entries(this.details).map((i) => {
          if (i[0] == "contacts") {
            this.details[i[0]] = [];
          } else {
            this.details[i[0]] = data[i[0]];
          }
        });
        this.profileDetails = data;

        // this.details.profile_name = data.profile_name;
        // this.details.profile_url = data.profile_url;
        // this.details.address = data.address;
        // this.details.postal_code = data.postal_code;
        // this.details.state = data.state;
        // this.details.building_name = data.building_name;
        // this.details.floor_no = data.floor_no;
        // this.details.unit_no = data.unit_no;
        // // let get_country = this.country.find(
        // //   (i) => i.name.toLowerCase() === data.country.toLowerCase()
        // // );
        // this.details.country = this.renderKey++;
        this.details.contacts = [];
        this.salesValidation = [];
        data.company_contacts.map((i) => {
          this.details.contacts.push({
            selected: false,
            profile_url: i.profile_url,
            contact_name: i.contact_name,
            contact_no: i.contact_no,
            email: i.email,
            mobile_no: i.mobile_no,
            designation: i.designation,
            salutation: i.salutation.toLowerCase() ?? "mr",
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
          });
          this.salesValidation.push({
            contact_name: { required },
            contact_no: { required },
            email: { required, email },
          });
        }
      }
      this.addSalesClicked++;
      this.renderKey++;
    },
  },
  // watch: {
  //   adhoc_pro_data: function () {
  //     if (this.adhoc_pro_data != null) {
  //       this.prefillData();
  //     }
  //   },
  // },
  created() {
    if (this.adhoc_pro_data) {
      this.prefillData();
    } else {
      this.getProDetails();
    }
  },
  // async mounted() {
  //   if (this.adhoc_pro_data) {
  //     this.prefillData();
  //   } else {
  //     this.getProDetails();
  //   }
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
.calender-drop {
  /* height: 30px; */
  flex: none !important;
  width: 65px !important;
  margin-left: -10px;
  background-color: #e9ecef;
}
::v-deep .calender-drop .p-dropdown-trigger {
  width: 1rem !important;
  margin-right: 5px !important;
}
</style>