<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Name of the Profile</h5>
      <TextField
        label="name_of_the_profile"
        type="text"
        v-model="details.name_of_the_profile"
        @blur="v$.details.name_of_the_profile.$model;"
        :classes="{
          'p-invalid': v$.details.name_of_the_profile.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
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
        @blur="v$.details.address.$model;"
        :classes="{
          'p-invalid': v$.details.address.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
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
        @blur="v$.details.postal_code.$model;"
        :classes="{
          'p-invalid': v$.details.postal_code.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Country</h5>
      <DropDown
        code="code"
        :state="details.country"
        :data="Country"
        label="country"
        id="country"
        placeholder=""
        v-model="details.country"
        :classes="{
          'p-invalid': v$.details.country.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">State</h5>
      <DropDown
        code="code"
        :state="details.state"
        :data="State"
        label="state"
        id="state"
        placeholder=""
        v-model="details.state"
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
        v-model="details.building_name"
        :classes="{
          'inputfield w-full dialog-field-text py-2': true,
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
          'inputfield w-full dialog-field-text py-2': true,
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
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <br />
  <br />
  <p class="txt ml-2 mb-4">Contact</p>

  <div v-for="(contact, index) of addContacts" :key="contact">
    <div class="flex justify-content-between ml-2">
      <div class="flex">
        <ImgUpload URL="/images/profile-here.png" />
      </div>
      <div
        class="flex delete"
        v-if="index > 0 && contact == 'new_contact'"
        @click="deleteContact(index)"
      >
        <i class="fas fa-times"></i>
      </div>
    </div>
    <br />
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Person Name</h5>
        <TextField
          label="Person"
          type="text"
          v-model="details.contact_person[index].person_name"
          @blur="v$.details.contact_person[index].person_name.$model;"
          :classes="{
            'p-invalid':
              v$.details.contact_person[index].person_name.$invalid &&
              submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Contact No</h5>
        <TextField
          label="Contact"
          type="number"
          v-model="details.contact_person[index].contact_no"
          @blur="v$.details.contact_person[index].contact_no.$model;"
          :classes="{
            'p-invalid':
              v$.details.contact_person[index].contact_no.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Email Id</h5>
        <TextField
          label="Email"
          type="text"
          v-model="details.contact_person[index]['email']"
          @blur="v$.details.contact_person[index]['email'].$model;"
          :classes="{
            'p-invalid':
              v$.details.contact_person[index]['email'].$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
        <span
          v-if="v$.details.contact_person[index]['email'].$error && submitted"
        >
          <span
            id="email-error"
            v-for="(error, index) of v$.details.contact_person[index]['email']
              .$errors"
            :key="index"
          >
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
        <small
          v-else-if="
            (v$.details.contact_person[index]['email'].$invalid && submitted) ||
            v$.details.contact_person[index]['email'].$pending.$response
          "
          class="p-error"
          >{{
            v$.details.contact_person[index]["email"].required.$message.replace(
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
          v-model="details.contact_person[index].designation"
          :classes="{
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>
  </div>

  <div class="flex justify-content-between">
    <div class="flex">
      <span class="new_contact Contact" @click="addContact"
        ><b>+ Add Contact</b></span
      >
    </div>
  </div>

  <div
    className="flex justify-content-between w-full align-content-center py-3 flex-wrap"
  >
    <div className="align-self-center flex "></div>
    <div className="flex align-self-center  justify-content-end">
      <Buttons
        label="Cancel"
        class="p-button-outlined mr-1 dialog-button-text"
      />
      <Buttons
        label="Next"
        button_class="dialog-button-text"
        v-on:childToParent="submitData"
      />
    </div>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
export default {
  name: "QuotationAddAddress",
  data: () => ({
    File: [],
    addContactdefault: 0,
    addContacts: ["new_contact"],
    addContactClicked: 0,
    contactsValidation: [
      {
        person_name: { required },
        email: { required, email },
        contact_no: { required },
      },
    ],
    Country: [
      { name: "Country1", code: "C1" },
      { name: "Country2", code: "C2" },
    ],
    State: [
      { name: "State1", code: "S1" },
      { name: "State2", code: "S2" },
    ],
    v$: useVuelidate(),
    details: {
      name_of_the_profile: "",
      address: "",
      postal_code: "",
      country: "",
      state: "",
      building_name: "",
      floor_no: "",
      unit_no: "",
      contact_person: [
        { person_name: "", email: "", contact_no: "", designation: "" },
      ],
    },
    submitted: false,
  }),
  validations() {
    if (this.addContactClicked > -1) {
      return {
        details: {
          name_of_the_profile: { required },
          address: { required },
          postal_code: { required },
          country: { required },
          contact_person: this.contactsValidation,
        },
      };
    }
  },

  methods: {
    addContact() {
      this.details.contact_person.push({
        person_name: "",
        email: "",
        contact_no: "",
        designation: "",
      });
      this.contactsValidation.push({
        person_name: { required },
        email: { required, email },
        contact_no: { required },
      });
      this.addContactClicked++;
      this.addContacts.push("new_contact");
    },
    deleteContact(index) {
      this.details.contact_person.splice(index, 1);
      this.addContacts.splice(index, 1);
      this.contactsValidation.splice(index, 1);
      this.addContactClicked++;
    },
    selectfile(event) {
      if (event.target.files) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (e) => {
          this.url = e.target.result;
        };
      }
    },
    dropDownFilter(data, checkerCode, inputCode) {
      for (var dd in data) {
        if (inputCode == data[dd][checkerCode]) {
          return data[dd].name;
        }
      }
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let new_contacts = [];
        for (let c in this.details.contact_person) {
          let c_obj = this.details.contact_person[c];
          //updating existing contacts
          if (c_obj["id"] != undefined) {
            let updatedContactObject = {};
            let updatedContactObjectId;
            for (let c_keys in c_obj) {
              if (c_keys != "id") {
                updatedContactObject[c_keys] = c_obj[c_keys];
              }
              if (c_keys == "id") {
                updatedContactObjectId = c_obj[c_keys];
              }
            }
            //making an update/PUT api call - to update contacts
            this.$store.dispatch("sales/contactsCRUD", {
              tag: "update",
              data: updatedContactObject,
              id: updatedContactObjectId,
            });
          }
          //creating a new contact during update operation
          if (c_obj["id"] == undefined) {
            new_contacts.push(c_obj);
          }
        }
        //creating a new contact during update operation
        if (new_contacts.length != 0) {
          let newContactsObj = {};
          newContactsObj["type_id"] = this.$store.state.sales.salesCompanyid;
          newContactsObj["type"] = "sales_company";
          newContactsObj["contacts"] = new_contacts;
          //making an add/POST api to create a new contact/s
          this.$store.dispatch("sales/contactsCRUD", {
            tag: "add",
            data: newContactsObj,
          });
        }

        if (this.details.country.length == 2) {
          this.details.country = this.dropDownFilter(
            this.Country,
            "code",
            this.details.country
          );
        }

        if (this.details.state.length == 2) {
          this.details.state = this.dropDownFilter(
            this.State,
            "code",
            this.details.state
          );
        }

        for (var d in this.details) {
          this.$store.state.sales.quotationCreationFormData[d] =
            this.details[d];
        }

        this.$store.state.sales.stepperNavigation = "QuotationSelectMethod";
      }
    },
    populateContacts() {
      this.addContacts = [];
      this.details.contact_person = [];
      this.contactsValidation = [];
      for (let cs in this.$store.state["sales"].contactsStateData) {
        this.addContacts.push("existing_contact");
        let cd_obj = this.$store.state["sales"].contactsStateData[cs];
        let detailsContactObj = {};
        let contactsValidationObj = {};
        for (let cd_obj_keys in cd_obj) {
          if (
            cd_obj_keys == "person_name" ||
            cd_obj_keys == "contact_no" ||
            cd_obj_keys == "email" ||
            cd_obj_keys == "designation" ||
            cd_obj_keys == "id"
          ) {
            detailsContactObj[cd_obj_keys] = cd_obj[cd_obj_keys];
            if (cd_obj_keys != "id") {
              if (cd_obj_keys == "email") {
                contactsValidationObj[cd_obj_keys] = { required, email };
              }
              if (cd_obj_keys == "person_name" || cd_obj_keys == "contact_no") {
                contactsValidationObj[cd_obj_keys] = { required };
              }
            }
          }
        }
        this.details.contact_person.push(detailsContactObj);
        this.contactsValidation.push(contactsValidationObj);
      }
    },
    loadState() {
      if (this.$store.state["sales"].contactsStateData.length > 0) {
        this.populateContacts();
      }
      if (
        Object.keys(this.$store.state["sales"].quotationCreationStateData)
          .length != 0
      ) {
        for (let state in this.details) {
          if (state != "contact_person") {
            this.details[state] =
              this.$store.state["sales"].quotationCreationStateData[state];
          }
        }
      }
    },
  },
  activated() {
    this.loadState();
  },
  created() {
    this.loadState();
  },
};
</script>
<style>
.Contact {
  color: blue;
  font-size: 14px;
  margin-left: 5px;
  cursor: pointer;
}
.delete {
  cursor: pointer;
}
</style>
