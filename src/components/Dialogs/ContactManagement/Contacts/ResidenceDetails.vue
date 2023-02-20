<template>
  <div class="">
    <h6 class="ml-2 Title">Residence Address</h6>
  </div>
  <div v-for="(address, index) of addResidenceDetails" :key="index">
    <div class="flex justify-content-between ml-2">
      <div class="flex"></div>
      <div
        class="flex delete"
        v-if="index > 0"
        @click="deleteResidenceAddress(index)"
      >
        <i class="fas fa-times"></i>
      </div>
    </div>
    <div class="field col-12 md:col-12">
      <h5 class="dialog-label-text TextStyleHeader">Enter the Address</h5>
      <TextField
        label="address"
        type="text"
        v-model="details.address[index]['address']"
        :classes="{
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text TextStyleHeader">Postal Code</h5>
        <TextField
          label="postal_code"
          type="number"
          v-model="details.address[index]['postal_code']"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text TextStyleHeader">Country</h5>
        <TextField
          label="country"
          type="text"
          v-model="details.address[index]['country']"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text TextStyleHeader">State</h5>
        <TextField
          label="state"
          type="text"
          v-model="details.address[index]['state']"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text TextStyleHeader">Building Name</h5>
        <TextField
          label="building_name"
          type="text"
          v-model="details.address[index]['building_name']"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text TextStyleHeader">Floor No</h5>
        <TextField
          label="floor_no"
          type="text"
          v-model="details.address[index]['floor_no']"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text TextStyleHeader">Unit No</h5>
        <TextField
          label="unit_no"
          type="text"
          v-model="details.address[index]['unit_no']"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="dialog-label-text TextStyleHeader">Home Phone</h5>
        <TextField
          label="home_phone"
          type="number"
          v-model="details.address[index]['home_phone']"
          :classes="{
            'inputfield w-full dialog-field-text ': true,
          }"
        />
      </div>
    </div>
  </div>
  <div class="flex justify-content-between">
    <div class="flex">
      <span class="new_contact Contact" @click="addResidenceAddress"
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
    <div class="flex align-self-center justify-content-end 
    ">
      <Buttons
        label="Cancel"
        v-on:childToParent="closeDialog"
        class="p-button-outlined mr-1 dialog-button-text color-blue-cancel"
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
  name: "ResidenceDetails",
  data: () => ({
    addResidenceDetailsDefault: 0,
    addResidenceDetails: ["new_residence_details"],
    // addResidenceDetailsClicked: 0,
    deletedResidences: [],
    details: {
      address: [
        {
          address: "",
          postal_code: "",
          country: "",
          state: "",
          building_name: "",
          floor_no: "",
          unit_no: "",
          home_phone: "",
        },
      ],
    },
    submitted: false,
  }),
  methods: {
    addResidenceAddress() {
      this.details.address.push({
        address: "",
        postal_code: "",
        country: "",
        state: "",
        building_name: "",
        floor_no: "",
        unit_no: "",
        home_phone: "",
      });
      this.addResidenceDetails.push("new_residence_details");
    },
    deleteResidenceAddress(index) {
      if (
        Object.keys(this.$store.state.contacts.contactsFormStateData).length !=
        0
      ) {
        for (let ad in this.details.address) {
          if (index == ad) {
            this.deletedResidences.push(this.details.address[ad]["id"]);
          }
        }
      }
      this.details.address.splice(index, 1);
      this.addResidenceDetails.splice(index, 1);
    },
    goBack() {
      this.$store.state.sales.stepperNavigation = "BasicDetails";
    },
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    submitData() {
      this.$store.state.contacts.contactsFormData["residence_details"] =
        this.details.address;
      if (
        Object.keys(this.$store.state.contacts.contactsFormStateData).length !=
        0
      ) {
        this.$store.state.contacts.contactsFormData[
          "delete_residence_details"
        ] = this.deletedResidences;
      }
      this.$store.state.sales.stepperNavigation = "OfficeDetails";
    },
    loadState() {
      if (
        Object.keys(this.$store.state.contacts.contactsFormStateData).length !=
        0
      ) {
        this.details.address = [];
        this.addResidenceDetails = [];
        let residenceAddresses =
          this.$store.state.contacts.contactsFormStateData[
            "contacts_residence_address"
          ];
        for (let state in residenceAddresses) {
          this.details.address.push(residenceAddresses[state]);
          this.addResidenceDetails.push("new_residence_details");
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
.TextStyleHeader{
/* font-family: Montserrat !important; */
font-style: normal;
font-weight: 500 !important;
font-size: 14px !important;
color: #7A7A7A;
}
.Title{
  font-size: 14px;
  color: #343434;
  font-weight: bold;
  letter-spacing: 0.03em;
  
}
.color-blue-cancel{
  color:#0247fe;
}
</style>
