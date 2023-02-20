<template>
  <div class="mb-">
    <h6 class="ml-2 Title">Office Address</h6>
  </div>
  <div v-for="(address, index) of addOfficeDetails" :key="index">
    <div class="flex justify-content-between ml-2">
      <div class="flex"></div>
      <div class="flex delete" v-if="index > 0" @click="deleteOffice(index)">
        <i class="fas fa-times"></i>
      </div>
    </div>
    <div class="field col-12 md:col-12">
      <h5 class="dialog-label-text">Company Name</h5>
      <TextField
        label="company_name"
        type="text"
        v-model="details.office[index]['company_name']"
        :classes="{
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-12">
      <h5 class="dialog-label-text">Enter the Address</h5>
      <TextField
        label="address"
        type="text"
        v-model="details.office[index]['address']"
        :classes="{
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text">Postal Code</h5>
        <TextField
          label="postal_code"
          type="number"
          v-model="details.office[index]['postal_code']"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text">Country</h5>
        <TextField
          label="country"
          type="text"
          v-model="details.office[index]['country']"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text">State</h5>
        <TextField
          label="state"
          type="text"
          v-model="details.office[index]['state']"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
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
          v-model="details.office[index]['building_name']"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text">Floor No</h5>
        <TextField
          label="floor_no"
          type="text"
          v-model="details.office[index]['floor_no']"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text">Unit No</h5>
        <TextField
          label="unit_no"
          type="text"
          v-model="details.office[index]['unit_no']"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text">Office Fax</h5>
        <TextField
          label="office_fax"
          type="text"
          v-model="details.office[index]['office_fax']"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text">Mobile No</h5>
        <TextField
          label="mobile_no"
          type="number"
          v-model="details.office[index]['mobile_no']"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text">Office Phone</h5>
        <TextField
          label="office_phone"
          type="number"
          v-model="details.office[index]['office_phone']"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text">Email</h5>
        <TextField
          label="email"
          type="text"
          v-model="details.office[index]['email']"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text">Website</h5>
        <TextField
          label="website"
          type="text"
          v-model="details.office[index]['website']"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
  </div>
  <div class="flex justify-content-between">
    <div class="flex">
      <span class="new_contact Contact" @click="addOffice"
        ><b>+ Add Another Address</b></span
      >
    </div>
  </div>
  <div
    class="
      flex
      justify-content-between
      w-full
      align-content-center
      py-3
      flex-wrap
    "
  >
    <div class="align-self-center flex ml-2">
      <Buttons
        label="Previous"
        v-on:childToParent="goBack"
        class="p-button-outlined mr-1 dialog-button-text previous-btn color-357dea"
      />
    </div>
    <div class="flex align-self-center justify-content-end">
      <Buttons
        label="Cancel"
        v-on:childToParent="closeDialog"
        class="p-button-outlined mr-1 dialog-button-text color-357dea"
      />

      <Buttons
        label="Next"
        button_class="dialog-button-text bg-357dea"
        v-on:childToParent="submitData"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "OfficeDetails",
  data: () => ({
    addOfficeDetailsDefault: 0,
    addOfficeDetails: ["new_office_details"],
    deletedOffices: [],
    details: {
      office: [
        {
          company_name: "",
          address: "",
          postal_code: "",
          country: "",
          state: "",
          building_name: "",
          floor_no: "",
          unit_no: "",
          office_fax: "",
          mobile_no: "",
          office_phone: "",
          website: "",
        },
      ],
    },
    submitted: false,
  }),
  methods: {
    addOffice() {
      this.details.office.push({
        company_name: "",
        address: "",
        postal_code: "",
        country: "",
        state: "",
        building_name: "",
        floor_no: "",
        unit_no: "",
        office_fax: "",
        mobile_no: "",
        office_phone: "",
        email: "",
        website: "",
      });
      this.addOfficeDetails.push("new_office_details");
    },
    deleteOffice(index) {
      if (
        Object.keys(this.$store.state.contacts.contactsFormStateData).length !=
        0
      ) {
        for (let ad in this.details.office) {
          if (index == ad) {
            this.deletedOffices.push(this.details.office[ad]["id"]);
          }
        }
      }
      this.details.office.splice(index, 1);
      this.addOfficeDetails.splice(index, 1);
    },
    goBack() {
      this.$store.state.sales.stepperNavigation = "ResidenceDetails";
    },
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    submitData() {
      this.$store.state.contacts.contactsFormData["office_details"] =
        this.details.office;
      if (
        Object.keys(this.$store.state.contacts.contactsFormStateData).length !=
        0
      ) {
        this.$store.state.contacts.contactsFormData["delete_office_details"] =
          this.deletedOffices;
      }
      this.$store.state.sales.stepperNavigation = "PersonalInfo";
    },
    loadState() {
      if (
        Object.keys(this.$store.state.contacts.contactsFormStateData).length !=
        0
      ) {
        this.details.office = [];
        this.addOfficeDetails = [];
        let officeDetails =
          this.$store.state.contacts.contactsFormStateData[
            "contacts_office_address"
          ];
        for (let state in officeDetails) {
          this.details.office.push(officeDetails[state]);
          this.addOfficeDetails.push("new_office_details");
        }
      }
    },
  },
  created() {
    this.loadState();
  },
};
</script>

<style scoped>
.Title{
  font-size: 14px;
  color: #343434;
  font-weight: bold;
  letter-spacing: 0.03em;  
}
</style>
