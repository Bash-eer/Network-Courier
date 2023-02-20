<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Donation Name</h5>
      <TextField
        label="donation_name"
        type="text"
        v-model="details.donation_name"
        @blur="v$.details.donation_name.$model"
        :classes="{
          'p-invalid': v$.details.donation_name.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Recipient Name</h5>
      <AddNewDropDown
        stateName="addNewDropDownData"
        :state="details.recipient_name"
        :data="$store.state.contacts.addNewDropDownData"
        :placeholder="'Choose a Recipient'"
        storePath="contacts"
        v-model="details.recipient_name"
        :classes="{
          'p-invalid': v$.details.recipient_name.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Amount</h5>
      <TextField
        label="amount"
        type="number"
        v-model="details.amount"
        @blur="v$.details.amount.$model;"
        :classes="{
          'p-invalid': v$.details.amount.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Payment Mode</h5>
      <DropDown
        code="code"
        :state="details.payment_method"
        :data="Payment_Mode"
        label="payment_method"
        id="payment_method"
        v-model="details.payment_method"
        :classes="{
          'p-invalid': v$.details.payment_method.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Donated Date</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            class="contactsCalendar"
            v-model="details.donation_date"
            @blur="v$.details.donation_date.$model;"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.donation_date.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
          />
        </div>
      </div>
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Bank Name</h5>
      <TextField
        label="bank_name"
        type="text"
        v-model="details.bank_name"
        @blur="v$.details.bank_name.$model;"
        :classes="{
          'p-invalid': v$.details.bank_name.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Cheque Date</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            dateFormat="d MM yy"
            class="contactsCalendar"
            v-model="details.cheque_date"
            @blur="v$.details.cheque_date.$model;"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.cheque_date.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
          />
        </div>
      </div>
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Cheque No</h5>
      <TextField
        label="cheque_no"
        type="text"
        v-model="details.cheque_no"
        @blur="v$.details.cheque_no.$model;"
        :classes="{
          'p-invalid': v$.details.cheque_no.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>
  <div class="field col-12 md:col-12">
    <h5 class="required dialog-label-text">Remarks</h5>
    <TextAreaField
      :state="details.remarks"
      label="remarks"
      v-model="details.remarks"
      @blur="v$.details.remarks.$model;"
      :classes="{
        'p-invalid': v$.details.remarks.$invalid && submitted,
        'inputfield w-full dialog-field-text py-2': true,
      }"
    />
  </div>
  <DragAndDropUpload
    :state="contactDonationsAttachmentsState"
    type="contactDonations"
    storePath="contacts"
  />
  <div class="flex align-self-center justify-content-end">
    <Buttons
      label="Cancel"
      v-on:childToParent="closeDialog"
      class="p-button-outlined mr-1 dialog-button-text color-357dea"
    />
    <Buttons
      label="Done"
      button_class="dialog-button-text bg-357dea"
      v-on:childToParent="submitData"
    />
  </div>
</template>

<script>
import moment from "moment";
import useVuelidate from "@vuelidate/core";
import { required,requiredIf } from "@vuelidate/validators";
export default {
  name: "DonationDialog",
  data: () => ({
    contactDonationsAttachmentsState: " ",
    date: null,
    Payment_Mode: [
      { name: "Cash", code: "1" },
      { name: "Cheque", code: "2" },
    ],
    v$: useVuelidate(),
    details: {
      donation_name: "",
      recipient_name: "",
      amount: "",
      payment_method: "",
      donation_date: "",
      bank_name: "",
      cheque_date: "",
      cheque_no: "",
      remarks: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
        donation_name: { required },
        recipient_name: { required },
        amount: { required },
        payment_method: { required },
        donation_date: { required },
        bank_name: { required },
        cheque_date: {
          required: requiredIf(() => this.details.payment_method == '2' || this.details.payment_method == ''),
        },
        cheque_no: {
                required: requiredIf(() => this.details.payment_method == '2' || this.details.payment_method == ''),
                },
        remarks: { required },
      },
    };
  },
  methods: {
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
    getDropDownData(key) {
      let source;
      switch (key) {
        case "recipient_name":
          source = this.$store.state.contacts.addNewDropDownData[0].items;
          break;
        case "payment_method":
          source = this.Payment_Mode;
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
      month += 1;
      let year = rawDate.getFullYear();
      let dateString = year + "-" + month + "-" + date;
      return dateString;
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let donationDetails = {};
        for (let d in this.details) {
          if (d == "donation_date" || d == "cheque_date") {
            donationDetails[d] = this.customDateFormatter(this.details[d]);
          } else if (d == "recipient_name" || d == "payment_method") {
            if (isNaN(this.details[d]) == false) {
              donationDetails[d] = this.dropDownFilter(
                this.getDropDownData(d),
                "code",
                this.details[d]
              );
            } else {
              donationDetails[d] = this.details[d];
            }
          } else {
            donationDetails[d] = this.details[d];
          }
        }
        donationDetails["attachments"] =
          this.$store.state.contacts.contactDonationsFiles;

        if (
          Object.keys(this.$store.state.contacts.donationsFormStateData)
            .length != 0
        ) {
          donationDetails["delete_attachments"] =
            this.$store.state.contacts.deletedcontactDonationsFiles;
        }

        //making an update/PATCH api call to update donation details
        if (this.$store.state.contacts.donationsFormStateData.id) {
          donationDetails["id"] =
            this.$store.state.contacts.donationsFormStateData.id;
          this.$store.dispatch("contacts/contactMangementCRUD", {
            path: "donations",
            mutation: "fetchDonationsTableData",
            tag: "update",
            data: donationDetails,
            nameKey: "users_contact_donations",
          });
        }
        //making an add/POST api call to create a new donation details
        else {
          this.$store.dispatch("contacts/contactMangementCRUD", {
            path: "donations",
            mutation: "fetchDonationsTableData",
            tag: "add",
            data: donationDetails,
            nameKey: "users_contact_donations",
          });
        }
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.contacts.donationsFormStateData).length !=
        0
      ) {
        this.contactDonationsAttachmentsState =
          this.$store.state.contacts.donationsFormStateData[
            "donations_attachments"
          ];
        this.$store.state.contacts.contactDonationsFiles =
          this.$store.state.contacts.donationsFormStateData[
            "donations_attachments"
          ];
        for (let state in this.details) {
          if (state == "donation_date" || state == "cheque_date") {
            let rawDate = new Date(
              this.$store.state.contacts.donationsFormStateData[state]
            );
            this.details[state] = this.dateFormater(rawDate);
          } else {
            this.details[state] =
              this.$store.state.contacts.donationsFormStateData[state];
          }
        }
      }
    },
  },
  unmounted() {
    this.$store.state.commonStore.attachmentsTag = null;
    this.$store.state.contacts.contactDonationsFiles = [];
    this.$store.state.contacts.deletedcontactDonationsFiles = [];
  },
  created() {
    this.$store.state.commonStore.attachmentsTag = "contactDonations";
    this.loadState();
  },
};
</script>
<style scoped>
.dialog-dropdown-text{
  height: 38px;
} </style>
