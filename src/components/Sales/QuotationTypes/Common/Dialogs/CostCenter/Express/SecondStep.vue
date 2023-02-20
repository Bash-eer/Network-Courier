<template>
  <div>
    <div v-for="(contact, index) of addContacts" :key="contact">
      <div class="flex justify-content-between ml-2">
        <div class="flex">
          <ImgUpload
            @file="getFile($event, index)"
            URL="/images/profile-here.png"
            :state="details.contacts[index].profile_url"
          />
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
            v-model="details.contacts[index].contact_name"
            @blur="v$.details.contacts[index].contact_name.$model;"
            :classes="{
              'p-invalid':
                v$.details.contacts[index].contact_name.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text">Contact No</h5>
          <TextField
            label="Contact"
            type="number"
            v-model="details.contacts[index].contact_no"
            @blur="v$.details.contacts[index].contact_no.$model;"
            :classes="{
              'p-invalid':
                v$.details.contacts[index].contact_no.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text">Email Id</h5>
          <TextField
            label="Email"
            type="text"
            v-model="details.contacts[index]['email']"
            @blur="v$.details.contacts[index]['email'].$model;"
            :classes="{
              'p-invalid':
                v$.details.contacts[index]['email'].$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
          <span v-if="v$.details.contacts[index]['email'].$error && submitted">
            <span
              id="email-error"
              v-for="(error, index) of v$.details.contacts[index]['email']
                .$errors"
              :key="index"
            >
              <small class="p-error">{{ error.$message }}</small>
            </span>
          </span>
          <small
            v-else-if="
              (v$.details.contacts[index]['email'].$invalid && submitted) ||
              v$.details.contacts[index]['email'].$pending.$response
            "
            class="p-error"
            >{{
              v$.details.contacts[index]["email"].required.$message.replace(
                "Value",
                "Email"
              )
            }}</small
          >
        </div>
      </div>

      <div class="formgrid grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text">Designation</h5>
          <TextField
            label="Person"
            type="text"
            v-model="details.contacts[index].designation"
            @blur="v$.details.contacts[index].designation.$model;"
            :classes="{
              'p-invalid':
                v$.details.contacts[index].designation.$invalid && submitted,
              'inputfield w-full dialog-field-text py-2': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text">Mobile No</h5>
          <TextField
            label="Contact"
            type="number"
            v-model="details.contacts[index].mobile_no"
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
      class="
        flex
        justify-content-between
        w-full
        align-content-center
        py-3
        flex-wrap
      "
    >
      <div class="align-self-center flex">
        <Buttons
          label="Previous"
          v-on:childToParent="goBack"
          class="p-button-outlined mr-1 dialog-button-text previous-btn"
        />
      </div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton storePath="salesCommon" label="Cancel" />
        <Buttons
          label="Next"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { mapGetters } from "vuex";
export default {
  name: "CostCentresContactPerson",
  computed: {
    ...mapGetters({
      expressCCPostDialogData: "salesCommon/expressCCPostDialogData",
    }),
  },
  data: () => ({
    addContactdefault: 0,
    addContacts: ["new_contact"],
    addContactClicked: 0,
    contactsValidation: [
      {
        contact_name: { required },
        contact_no: { required },
        email: { required, email },
        designation: { required },
      },
    ],
    v$: useVuelidate(),
    details: {
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
    email: "",
    submitted: false,
  }),
  validations() {
    if (this.addContactClicked > -1) {
      return {
        details: {
          contacts: this.contactsValidation,
        },
      };
    }
  },
  methods: {
    getFile(value, index) {
      if (value) {
        this.details.contacts[index].profile_url = value?.fileLink;
      }
    },
    addContact() {
      this.details.contacts.push({
        profile_url: "",
        contact_name: "",
        contact_no: "",
        email: "",
        designation: "",
        mobile_no: "",
      });
      this.contactsValidation.push({
        contact_name: { required },
        contact_no: { required },
        email: { required, email },
        designation: { required },
      });
      this.addContactClicked++;
      this.addContacts.push("new_contact");
    },
    deleteContact(index) {
      this.details.contacts.splice(index, 1);
      this.addContacts.splice(index, 1);
      this.contactsValidation.splice(index, 1);
      this.addContactClicked++;
    },
    goBack() {
      this.$store.state.salesSales.stepperNavigation = "CostCenterFirstStep";
      this.$store.state.salesExpressContract.flowStepCount -- ;
      
      
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.$store.state.salesExpressContract.flowStepCount++;
        for (let i in this.details) {
          this.expressCCPostDialogData[i] = this.details[i];
        }

        this.$store.state.salesSales.stepperNavigation = "CostCenterThirdStep";
      
        
      }
    },
    populateContacts() {
      this.addContacts = [];
      this.details.contacts = [];
      this.contactsValidation = [];
      let contactsStateData =
        this.$store.state["salesCommon"].commonExpressCCStateData
          .cost_center_contacts;
      for (let cs in contactsStateData) {
        this.addContacts.push("existing_contact");
        let cd_obj = contactsStateData[cs];
        let detailsContactObj = {};
        let contactsValidationObj = {};
        for (let cd_obj_keys in cd_obj) {
          if (
            cd_obj_keys == "profile_url" ||
            cd_obj_keys == "contact_name" ||
            cd_obj_keys == "contact_no" ||
            cd_obj_keys == "email" ||
            cd_obj_keys == "designation" ||
            cd_obj_keys == "mobile_no" ||
            cd_obj_keys == "id"
          ) {
            detailsContactObj[cd_obj_keys] = cd_obj[cd_obj_keys];
            if (cd_obj_keys != "id") {
              if (cd_obj_keys == "email") {
                contactsValidationObj[cd_obj_keys] = { required, email };
              }
              if (
                cd_obj_keys == "contact_name" ||
                cd_obj_keys == "contact_no" ||
                cd_obj_keys == "designation"
              ) {
                contactsValidationObj[cd_obj_keys] = { required };
              }
            }
          }
        }
        this.details.contacts.push(detailsContactObj);
        this.contactsValidation.push(contactsValidationObj);
      }
    },
    loadState() {
      if (this.$store.state["sales"].contactsStateData.length > 0) {
        this.populateContacts();
      }
    },
  },
  // created() {
  //   this.loadState();
  // },
  created() {
    if (
      Object.keys(
        this.$store.state["salesCommon"].commonExpressCCStateData ?? {}
      ).length != 0
    ) {
      this.populateContacts();
      // for (let state in this.details) {
      //   this.details[state] =
      //     this.$store.state["salesCommon"].commonExpressCCStateData[state];
      // }
    }
  },
};
</script>

<style></style>