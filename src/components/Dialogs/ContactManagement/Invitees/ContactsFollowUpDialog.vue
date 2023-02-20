
<template>
  <span class="heading bodyTxt">Call Type</span>
  <div class="flex flex-row mt-2">
    <div class="flex mr-3 text-xs text-900 " v-for="(radio, index) in callTypeData" :key="index">
      <div class="flex flex-row">
        <div class="flex mr-1">
          <RadioButton
            :id="radio.tag"
            :name="radio.tag"
            :value="radio.tag"
            v-model="details.call_type"
          />
        </div>
        <div class="flex color-343434 font-size-12 line-height-15">{{ radio.label }}</div>
      </div>
    </div>
  </div>
  <div class="formgrid grid mt-3">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text line-height-28 font-size-14">Call Received By / Caller</h5>
      <DropDown
        code="code"
        :state="details.caller"
        :data="Caller"
        label="caller"
        id="caller"
        v-model="details.caller"
        :classes="{
          'p-invalid': v$.details.caller.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text line-height-28 font-size-14">Date & Time</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
          <Calendar
            :showTime="true"
            :showSeconds="true"
            dateFormat="d MM yy"
            class="contactsCalendar"
            v-model="details.date_time"
            :showIcon="true"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.date_time.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text line-height-28 font-size-14">Customer Contact</h5>
      <DropDown
        code="code"
        :state="details.customer"
        :data="Customer"
        label="customer"
        id="customer"
        v-model="details.customer"
        :classes="{
          'p-invalid': v$.details.customer.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text line-height-28 font-size-14">Customer Contact No</h5>
      <TextField
        label="customer_contact"
        type="number"
        v-model="details.customer_contact"
        :classes="{
          'p-invalid': v$.details.customer_contact.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid mt-3">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text line-height-28 font-size-14">Remarks</h5>
      <TextAreaField
        :state="details.reamrks"
        label="remarks"
        v-model="details.reamrks"
        @blur="v$.details.reamrks.$model;"
        :classes="{
          'p-invalid': v$.details.reamrks.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
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
    <div class="align-self-center flex"></div>
    <div class="flex align-self-center justify-content-end">
      <Buttons
        label="Cancel"
        v-on:childToParent="closeDialog"
        class="p-button-outlined mr-1 dialog-button-text color-357dea line-height-32 font-size-14"
      />
      <Buttons
        label="Submit"
        button_class="dialog-button-text bg-357dea line-height-17 font-size-14"
        v-on:childToParent="submitData"
      />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import RadioButton from "primevue/radiobutton";
export default {
  name: "ContactsFollowUpDialog",
  components: {
    RadioButton,
  },
  data() {
    return {
      Caller: [
        { name: "James", code: "1" },
        { name: "Wan", code: "2" },
      ],
      Customer: [
        { name: "Anne", code: "1" },
        { name: "Frank", code: "2" },
      ],
      callTypeData: [
        { label: "Called", tag: "Called" },
        { label: "Call Received", tag: "Call" },
        { label: "Meeting", tag: "Meeting" },
        { label: "Email", tag: "Email" },
        { label: "SMS", tag: "SMS" },
        { label: "Whatsapp", tag: "Whatsapp" },
        { label: "Follow Up", tag: "Follow" },
      ],
      details: {
        call_type: "",
        caller: "",
        date_time: "",
        customer: "",
        customer_contact: "",
        reamrks: "",
      },
      v$: useVuelidate(),
      submitted: false,
    };
  },
  validations() {
    return {
      details: {
        call_type: { required },
        caller: { required },
        date_time: { required },
        customer: { required },
        customer_contact: { required },
        reamrks: { required },
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
        case "caller":
          source = this.Caller;
          break;
        case "customer":
          source = this.Customer;
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
        var formattedDate = moment(data).format("DD MMMM YYYY");
        return formattedDate;
      }
    },
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        let followUpDetails = {};
        for (let d in this.details) {
          if (d == "call_type") {
            if (this.details[d] == "Call") {
              followUpDetails[d] = "Call Received";
            } else if (this.details[d] == "Follow") {
              followUpDetails[d] = "Follow Up";
            } else {
              followUpDetails[d] = this.details[d];
            }
          } else if (d == "caller" || d == "customer") {
            if (isNaN(this.details[d]) == false) {
              followUpDetails[d] = this.dropDownFilter(
                this.getDropDownData(d),
                "code",
                this.details[d]
              );
            } else {
              followUpDetails[d] = this.details[d];
            }
          } else if (d == "date_time") {
            if (
              Object.keys(this.$store.state.contacts.followUpFormStateData)
                .length != 0
            ) {
              followUpDetails[d] = this.dateAndTimeFormatter(
                new Date(this.details[d])
              );
            } else {
              followUpDetails[d] = this.dateAndTimeFormatter(this.details[d]);
            }
          } else {
            followUpDetails[d] = this.details[d];
          }
        }
        let path =
          "event/invitees/followUp/" +
          this.$store.state.contacts.inviteesEventId;
        //making an update/PATCH api call to update follow up details
        if (this.$store.state.contacts.followUpFormStateData.id) {
          followUpDetails["id"] =
            this.$store.state.contacts.followUpFormStateData.id;
          this.$store.dispatch("contacts/contactMangementCRUD", {
            path:
              "event/invitees/followUp/" +
              this.$store.state.contacts.followUpFormStateData.id,
            mutation: "fetchFollowUpTableData",
            tag: "update",
            data: followUpDetails,
            nameKey: "users_contact_events_follow_up",
          });
        }
        //making an POST api call to create new follow up details
        else {
          this.$store.dispatch("contacts/contactMangementCRUD", {
            path: path,
            mutation: "fetchFollowUpTableData",
            tag: "add",
            data: followUpDetails,
            nameKey: "users_contact_events_follow_up",
          });
        }
      }
    },
    loadState() {
      if (
        Object.keys(this.$store.state.contacts.followUpFormStateData).length !=
        0
      ) {
        let followUpStateData =
          this.$store.state.contacts.followUpFormStateData;
        for (let state in this.details) {
          if (state == "call_type") {
            if (followUpStateData[state] == "Call Received") {
              this.details[state] = "Call";
            } else if (followUpStateData[state] == "Follow Up") {
              this.details[state] = "Follow";
            } else {
              this.details[state]=followUpStateData[state];
            }
          } else if (state == "date_time") {
            let rawDate = new Date(followUpStateData[state]);
            this.details[state] = this.dateFormater(rawDate);
          } else {
            this.details[state] = followUpStateData[state];
          }
        }
      }
    },
  },
  created() {
    this.loadState();
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/main.scss";
.bodyTxt {
  font-family: Montserrat;
}
.heading {
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  color: #343434;
}
/* ::v-deep .p-radiobutton .p-radiobutton-box .p-radiobutton-icon{
  background-color: #357DEA !important;
}
::v-deep .p-radiobutton .p-radiobutton-box.p-highlight{
      border-color: #2196F3 !important;
    background: white !important;
} */
</style>
