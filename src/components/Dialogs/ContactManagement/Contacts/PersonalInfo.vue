<template>
  <div class="">
    <h6 class="ml-2 mb-5 Title">Personnel Info</h6>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Date of Birth</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            class="contactsCalendar"
            v-model="details.date_of_birth"
            :showIcon="true"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.date_of_birth.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
            dateFormat="mm-dd-yy"
          />
        </div>
      </div>
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Anniversary Date</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            class="contactsCalendar"
            v-model="details.anniversary_date"
            :showIcon="true"
            style="width: 100%"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
            :class="{
              'p-invalid': v$.details.anniversary_date.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Marital Status</h5>
      <DropDown
        code="code"
        :state="details.marital_status"
        :data="maritalStatus"
        label="marital_status"
        id="marital_status"
        v-model="details.marital_status"
        :classes="{
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">No of Children</h5>
      <TextField
        label="no_of_children"
        type="number"
        v-model="details.no_of_children"
        :classes="{
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Spouse Name</h5>
      <TextField
        label="spouse_name"
        type="text"
        v-model="details.spouse_name"
        :classes="{
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="field col-12 md:col-12">
    <h5 class="dialog-label-text">Remarks</h5>
    <TextAreaField
      :state="details.remarks"
      label="remarks"
      v-model="details.remarks"
      :classes="{
        'inputfield w-full dialog-field-text py-2': true,
      }"
    />
  </div>
  <DragAndDropUpload
    :state="contactPersonalInfoAttachmentsState"
    type="contactPersonalInfo"
    storePath="contacts"
  />
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
        label="Save"
        button_class="dialog-button-text bg-357dea"
        v-on:childToParent="submitData"
      />
    </div>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import moment from "moment";
export default {
  name: "PersonalInfo",
  data: () => ({
    contactPersonalInfoAttachmentsState: " ",
    v$: useVuelidate(),
    date: null,
    maritalStatus: [
      { name: "Single ", code: "1" },
      { name: "Married", code: "2" },
    ],
    details: {
      date_of_birth: "",
      anniversary_date: "",
      marital_status: "",
      no_of_children: "",
      spouse_name: "",
      remarks: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        date_of_birth: { required },
        anniversary_date: { required },
      },
    };
  },
  methods: {
    getDropDownData(key) {
      let source;
      switch (key) {
        case "marital_status":
          source = this.maritalStatus;
          break;
      }
      return source;
    },
    dropDownFilter(data, checkerCode, inputCode) {
      for (var dd in data) {
        if (inputCode == data[dd][checkerCode]) {
          return data[dd].name;
        }
      }
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMMM YYYY");
        return formattedDate;
      }
    },
    customDateFormatter(data) {
      let rawDate = new Date(data);
      let date = rawDate.getDate();
      let month = rawDate.getMonth();
      let year = rawDate.getFullYear();
      if (parseInt(month) == 0) {
        month = 1;
      }
      let dateString = year + "-" + month + "-" + date;
      return dateString;
    },
    goBack() {
      this.$store.state.sales.stepperNavigation = "OfficeDetails";
    },
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        for (let d in this.details) {
          if (d == "date_of_birth" || d == "anniversary_date") {
            this.$store.state.contacts.contactsFormData[d] =
              this.customDateFormatter(this.details[d]);
          } else if (d == "marital_status") {
            if (isNaN(this.details[d]) == false) {
              this.$store.state.contacts.contactsFormData[d] =
                this.dropDownFilter(
                  this.getDropDownData(d),
                  "code",
                  this.details[d]
                );
            } else {
              this.$store.state.contacts.contactsFormData[d] = this.details[d];
            }
          } else {
            this.$store.state.contacts.contactsFormData[d] = this.details[d];
          }
        }
        this.$store.state.contacts.contactsFormData["image_url"] =
          this.$store.state.fleets.globalImageUploadURL;
        this.$store.state.contacts.contactsFormData["attachments"] =
          this.$store.state.contacts.contactPersonalInfoFiles;
        // if (
        //   Object.keys(this.$store.state.contacts.contactsFormStateData)
        //     .length != 0
        // ) {
        //   this.$store.state.contacts.contactsFormData[""];
        // }
        //making an update/PATCH api call to update contact details
        if (this.$store.state.contacts.contactsFormStateData.id) {
          this.$store.state.contacts.contactsFormData["id"] =
            this.$store.state.contacts.contactsFormStateData.id;
          this.$store.dispatch("contacts/contactMangementCRUD", {
            path: "contacts",
            mutation: "fetchContactMangementContactTableData",
            tag: "update",
            data: this.$store.state.contacts.contactsFormData,
            nameKey: "users_contact_contacts",
          });
        }
        //making an add/POST api call to create new contact details
        else {
          this.$store.dispatch("contacts/contactMangementCRUD", {
            path: "contacts",
            mutation: "fetchContactMangementContactTableData",
            tag: "add",
            data: this.$store.state.contacts.contactsFormData,
            nameKey: "users_contact_contacts",
          });
        }
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.contacts.contactsFormStateData).length !=
        0
      ) {
        this.contactPersonalInfoAttachmentsState =
          this.$store.state.contacts.contactsFormStateData[
            "contacts_attachments"
          ];
        this.$store.state.contacts.contactPersonalInfoFiles =
          this.$store.state.contacts.contactsFormStateData[
            "contacts_attachments"
          ];
        for (let state in this.details) {
          if (state == "date_of_birth" || state == "anniversary_date") {
            let rawDate = new Date(
              this.$store.state.contacts.contactsFormStateData[state]
            );
            this.details[state] = this.dateFormater(rawDate);
          } else {
            this.details[state] =
              this.$store.state.contacts.contactsFormStateData[state];
          }
        }
      }
    },
  },
  created() {
    this.$store.state.commonStore.attachmentsTag = "contactPersonalInfo";
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