<template>
  <div class="formgird grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Appointment Name</h5>
      <TextField
        label="appointment_name"
        id="appointment_name"
        v-model="details.appointment_name"
        :classes="{
          'p-invalid': v$.details.appointment_name.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">From Date & Time</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            :showTime="true"
            :showSeconds="true"
            class="fleetsCalendar"
            :showIcon="true"
            style="width: 100%"
            id="start_date_time"
            label="start_date_time"
            v-model="details.start_date_time"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
            :class="{
              'p-invalid': v$.details.start_date_time.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">End Date & Time</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            :showTime="true"
            :showSeconds="true"
            class="fleetsCalendar"
            :showIcon="true"
            style="width: 100%"
            id="end_date_time"
            label="end_date_time"
            v-model="details.end_date_time"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
            :class="{
              'p-invalid': v$.details.end_date_time.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Appointment for</h5>
      <DropDown
        code="name"
        :state="details.appointment_for"
        :data="appointment_for"
        label="appointment_for"
        id="appointment_for"
        v-model="details.appointment_for"
        :classes="{
          'p-invalid': v$.details.appointment_for.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Availability</h5>
      <DropDown
        code="name"
        :state="details.availability"
        :data="availability"
        label="availability"
        id="availability"
        v-model="details.availability"
        :classes="{
          'p-invalid': v$.details.availability.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Pattern</h5>
      <DropDown
        code="name"
        :state="details.pattern"
        :data="pattern"
        label="pattern"
        id="pattern"
        v-model="details.pattern"
        :classes="{
          'p-invalid': v$.details.pattern.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Priority</h5>
      <DropDown
        code="name"
        :state="details.priority"
        :data="priority"
        label="priority"
        id="priority"
        v-model="details.priority"
        :classes="{
          'p-invalid': v$.details.priority.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Status</h5>
      <DropDown
        code="name"
        :state="details.status"
        :data="status"
       
        label="status"
        id="status"
        v-model="details.status"
        :classes="{
          'p-invalid': v$.details.status.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Enter the Address</h5>
      <TextAreaField
        v-model="details.address"
        label="address"
        rows="2"
        :classes="{
          'p-invalid': v$.details.address.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div class="formgird grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Postal Code</h5>
      <TextField
        v-model="details.postal_code"
        label="postal_code"
        id="postal_code"
        :classes="{
          'p-invalid': v$.details.postal_code.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Country</h5>
      <DropDown
        code="name"
        :state="details.country"
        :data="country"
        label="country"
        id="country"
        v-model="details.country"
        :classes="{
          'p-invalid': v$.details.country.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
        @change="countryChangeHandler"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">State</h5>
      <TextField
        v-model="details.state"
        label="state"
        id="state"
        :classes="{
          'p-invalid': v$.details.state.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-4">
      <h5 class="required dialog-label-text">Building Name</h5>
      <TextField
        v-model="details.building_name"
        label="building_name"
        id="building_name"
        :classes="{
          'p-invalid': v$.details.building_name.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Floor No</h5>
      <TextField
        v-model="details.floor_no"
        label="floor_no"
        id="floor_no"
        :classes="{
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-4">
      <h5 class="dialog-label-text">Unit No</h5>
      <TextField
        v-model="details.unit_no"
        label="unit_no"
        id="unit_no"
        :classes="{
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div v-if="details.country != ''">
    <div v-if="details.country != 'Singapore'">
      <div class="formgird grid">
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text">Staying At</h5>
          <TextField
            v-model="details.staying_at"
            label="staying_at"
            id="staying_at"
            :classes="{
              'p-invalid': v$.details.staying_at.$invalid && submitted,
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text">Hotel Name</h5>
          <TextField
            v-model="details.hotel_name"
            label="hotel_name"
            id="hotel_name"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="required dialog-label-text">Travel Type</h5>
          <DropDown
            code="name"
            :state="details.travel_type"
            :data="travel_type"
            label="travel_type"
            id="travel_type"
            v-model="details.travel_type"
            :classes="{
              'p-invalid': v$.details.travel_type.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
          />
        </div>
      </div>
      <div class="formgird grid">
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text">Flight No</h5>
          <TextField
            v-model="details.flight_no"
            label="flight_no"
            id="flight_no"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
        <div class="field col-12 md:col-4">
          <h5 class="dialog-label-text">Flight Name</h5>
          <TextField
            v-model="details.flight_name"
            label="flight_name"
            id="flight_name"
            :classes="{
              'inputfield w-full dialog-field-text ': true,
            }"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Subject/Remark</h5>
      <TextAreaField
        id="remarks"
        label="remarks"
        rows="4"
        v-model="details.remarks"
        :classes="{
          'p-invalid': v$.details.remarks.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <div>
    <DragAndDropUpload
      :state="contactAppointmentsAttachmentsState"
      type="contactAppointments"
      storePath="contacts"
    />
  </div>
  <ContactsSelection />
  <div class="flex align-self-center justify-content-end">
    <Buttons
      label="Cancel"
      v-on:childToParent="closeDialog"
      class="p-button-outlined mr-1 dialog-button-text"
    />
    <Buttons
      label="Done"
      button_class="dialog-button-text"
      v-on:childToParent="submitData"
    />
  </div>
</template>

<script>
import moment from "moment";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "ContractAppointmentDialog",
  data: () => ({
    contactAppointmentsAttachmentsState: " ",
    deletedNCContacts: [],
    deletedPsnlContacts: [],
    allContactsState: [],
    appointmentsValidation: {
      appointment_name: { required },
      start_date_time: { required },
      end_date_time: { required },
      appointment_for: { required },
      availability: { required },
      pattern: { required },
      priority: { required },
      status: { required },
      address: { required },
      postal_code: { required },
      country: { required },
      state: { required },
      remarks: { required },
      building_name: { required },
    },
    internationalValidation: {
      staying_at: { required },
      travel_type: { required },
    },
    appointment_name: [{ name: "Finance" }],
    appointment_for: [
      { name: "Andrew", code: "1" },
      { name: "Rose", code: "2" },
    ],
    availability: [
      { name: "Available", code: "1" },
      { name: "Busy", code: "2" },
      { name: "Tentative", code: "3" },
      { name: "Not Avaiable", code: "4" },
    ],
    pattern: [
      { name: "Yearly", code: "1" },
      { name: "Monthly", code: "2" },
      { name: "Monthly Twice", code: "3" },
      { name: "Quaterly Month", code: "4" },
      { name: "Halfly Month", code: "5" },
      { name: "Weekly", code: "6" },
      { name: "Daily", code: "7" },
    ],
    priority: [
      { name: "High", code: "1" },
      { name: "Low", code: "2" },
      { name: "Medium", code: "3" },
    ],
    status: [
      { name: "Complete", code: "1" },
      { name: "Schedule", code: "2" },
      { name: "No Show", code: "3" },
      { name: "Left Messages", code: "4" },
      { name: "Cancelled", code: "5" },
      { name: "Delete", code: "6" },
    ],
    country: [
      { name: "Singapore", code: "1" },
      { name: "India", code: "2" },
    ],
    travel_type: [
      { name: "Flight", code: "1" },
      { name: "Bus", code: "2" },
      { name: "Car", code: "3" },
    ],
    v$: useVuelidate(),
    details: {
      appointment_name: "",
      start_date_time: "",
      end_date_time: "",
      appointment_for: "",
      availability: "",
      pattern: "",
      priority: "",
      status: "",
      remarks: "",
      address: "",
      state: "",
      country: "",
      postal_code: "",
      building_name: "",
      floor_no: "",
      unit_no: "",
      staying_at: "",
      hotel_name: "",
      travel_type: "",
      flight_no: "",
      flight_name: "",
    },
    submitted: false,
  }),
  validations() {
    if (this.details.country != "Singapore") {
      for (let keys in this.internationalValidation) {
        this.appointmentsValidation[keys] = this.internationalValidation[keys];
      }
    }
    if (this.details.country == "Singapore") {
      for (let keys in this.internationalValidation) {
        if (this.appointmentsValidation[keys]) {
          delete this.appointmentsValidation[keys];
        }
      }
    }
    return {
      details: this.appointmentsValidation,
    };
  },
  methods: {
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    customDateFormatter(data) {
      let rawDate = new Date(data);
      let date = rawDate.getDate();
      let month = rawDate.getMonth();
      month += 1;
      let year = rawDate.getFullYear();
      let dateString = year + "-" + month + "-" + date;
      return dateString;
    },
    getDropDownData(key) {
      let source;
      switch (key) {
        case "appointment_for":
          source = this.appointment_for;
          break;
        case "availability":
          source = this.availability;
          break;
        case "pattern":
          source = this.pattern;
          break;
        case "priority":
          source = this.priority;
          break;
        case "status":
          source = this.status;
          break;
        case "country":
          source = this.country;
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
    dateAndTimeFormatter(date) {
      return date.toISOString();
    },
    dateFormater(data) {
      if (data == null) {
        return "-";
      } else {
        var formattedDate = moment(data).format("DD MMMM YYYY HH:mm:ss");
        return formattedDate;
      }
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let networkCourierContacts = [];
        let personalContacts = [];
        let contactsData = this.$store.state.contacts.contactsFormTableData;
        for (let c in contactsData) {
          let c_obj = contactsData[c];
          if (c_obj["contactType"] == "Network Courier") {
            let nc_obj = {};
            nc_obj["contact_id"] = c_obj["contact_id"];
            if (c_obj.id) {
              nc_obj["id"] = c_obj.id;
            }
            networkCourierContacts.push(nc_obj);
          }
          if (c_obj["contactType"] == "Personal") {
            let p_obj = {};
            p_obj["contact_id"] = c_obj["contact_id"];
            if (c_obj.id) {
              p_obj["id"] = c_obj.id;
            }
            personalContacts.push(p_obj);
          }
        }
        let appointmentDetails = {};
        appointmentDetails["network_courier_members"] = networkCourierContacts;
        appointmentDetails["personal_contact_members"] = personalContacts;

        if (
          Object.keys(this.$store.state.contacts.contactGroupsFormStateData)
            .length != 0
        ) {
          for (let d in this.$store.state.contacts.deletedContactIds) {
            let d_obj = this.$store.state.contacts.deletedContactIds[d];
            if (d_obj["contactType"] == "Network Courier") {
              this.deletedNCContacts.push(d_obj["id"]);
            }
            if (d_obj["contactType"] == "Personal") {
              this.deletedPsnlContacts.push(d_obj["id"]);
            }
          }
        }

        for (let d in this.details) {
          if (d == "start_date_time" || d == "end_date_time") {
            if (
              Object.keys(this.$store.state.contacts.appointmentsFormStateData)
                .length != 0
            ) {
              appointmentDetails[d] = this.dateAndTimeFormatter(
                new Date(this.details[d])
              );
            } else {
              appointmentDetails[d] = this.dateAndTimeFormatter(
                this.details[d]
              );
            }
          } else {
            appointmentDetails[d] = this.details[d];
          }
        }

        appointmentDetails["attachments"] =
          this.$store.state.contacts.contactAppointmentsFiles;

        if (
          Object.keys(this.$store.state.contacts.appointmentsFormStateData)
            .length != 0
        ) {
          appointmentDetails["deleted_attachments"] =
            this.$store.state.contacts.deletedcontactAppointmentsFiles;
          appointmentDetails["deleted_network_courier_members"] =
            this.deletedNCContacts;
          appointmentDetails["deleted_personal_contact_members"] =
            this.deletedPsnlContacts;
        }

        //making an update/PATCH api call to update appointment details
        if (this.$store.state.contacts.appointmentsFormStateData.id) {
          appointmentDetails["id"] =
            this.$store.state.contacts.appointmentsFormStateData.id;
          this.$store.dispatch("contacts/contactMangementCRUD", {
            path: "appointments",
            mutation: "fetchAppointmentsTableData",
            tag: "update",
            data: appointmentDetails,
            nameKey: "users_contact_appointments",
          });
        }
        //making an add/POST api call to create a new appointment details
        else {
          this.$store.dispatch("contacts/contactMangementCRUD", {
            path: "appointments",
            mutation: "fetchAppointmentsTableData",
            tag: "add",
            data: appointmentDetails,
            nameKey: "users_contact_appointments",
          });
        }
      }
    },
    processContactsState(data, type, contactsKey, tableDataName) {
      for (let c in data) {
        let cObj = {};
        let contactsDetails = data[c][contactsKey];
        cObj["id"] = data[c]["id"];
        cObj["contactType"] = type;
        cObj["contact"] = {
          contactPicture: contactsDetails["image_url"],
          contactName: contactsDetails["name"],
          contactNumber: contactsDetails["mobile_no"],
        };
        for (let t in this.$store.state.contacts[tableDataName]) {
          if (
            this.$store.state.contacts[tableDataName][t]["contact_id"] ==
            contactsDetails["id"]
          ) {
            cObj["contact_id"] =
              this.$store.state.contacts[tableDataName][t]["contact_id"];
          }
        }
        this.allContactsState.push(cObj);
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.contacts.appointmentsFormStateData)
          .length != 0
      ) {
        this.contactAppointmentsAttachmentsState =
          this.$store.state.contacts.appointmentsFormStateData[
            "appointments_attachments"
          ];
        this.$store.state.contacts.contactAppointmentsFiles =
          this.$store.state.contacts.appointmentsFormStateData[
            "appointments_attachments"
          ];
        this.allContactsState = [];
        let nc_contacts =
          this.$store.state.contacts.contactGroupsFormStateData[
            "appointments_network_courier_members"
          ];
        let p_contacts =
          this.$store.state.contacts.contactGroupsFormStateData[
            "appointments_personal_contact_members"
          ];
        this.processContactsState(
          nc_contacts,
          "Network Courier",
          "contacts_appointments_network_courier_members",
          "networkCourierContactsData"
        );
        this.processContactsState(
          p_contacts,
          "Personal",
          "contacts_appointments_personal_contact_members",
          "personalContactsData"
        );
        this.$store.state.contacts.contactsFormTableStateData =
          this.allContactsState;
        for (let state in this.details) {
          if (state == "start_date_time" || state == "end_date_time") {
            let rawDate = new Date(
              this.$store.state.contacts.appointmentsFormStateData[state]
            );
            this.details[state] = this.dateFormater(rawDate);
          } else {
            this.details[state] =
              this.$store.state.contacts.appointmentsFormStateData[state];
          }
        }
      }
    },
  },
  unmounted() {
    this.$store.state.commonStore.attachmentsTag = null;
    this.$store.state.contacts.contactAppointmentsFiles = [];
    this.$store.state.contacts.deletedcontactAppointmentsFiles = [];
    this.$store.state.contacts.contactsSelectionModeState = null;
    this.$store.state.contacts.contactGroupsFormStateData = {};
    this.$store.state.contacts.contactsFormTableStateData = [];
    this.$store.state.contacts.deletedContactIds = [];
  },
  created() {
    this.$store.state.commonStore.attachmentsTag = "contactAppointments";
    this.loadState();
  },
};
</script>

<style></style>
