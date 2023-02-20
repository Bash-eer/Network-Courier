<template>
  <div>
    <span class="add-follow-heading bold-700 font-size-12">Call Type</span>
    <div class="flex flex-row mt-2 add-follow-heading bold-700 font-size-11">
      <div
        class="flex mr-3"
        v-for="(radio, index) in callTypeData"
        :key="index"
      >
        <div class="flex flex-row">
          <div class="flex mr-1">
            <RadioButton
              :id="radio.tag"
              :name="radio.tag"
              :value="radio.tag"
              v-model="details.call_type"
            />
          </div>
          <div class="flex">{{ radio.label }}</div>
        </div>
      </div>
    </div>
    <div class="formgrid grid mt-3">
      <div class="field col-12 md:col-6">
        <h5 class="required dialog-label-text">Call Received By / Caller</h5>
        <DropDown
          name="name"
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
        <h5 class="required dialog-label-text">Date & Time</h5>
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
        <h5 class="required dialog-label-text">Customer Contact</h5>
        <DropDown
          name="name"
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
        <h5 class="required dialog-label-text">Customer Contact No</h5>
        <TextField
          label="customer_contact"
          type="number"
          v-model="details.contactNo"
          :classes="{
            'p-invalid': v$.details.contactNo.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <label class="required dialog-label-text" for="Email ID"
          >Mobile Number</label
        >
        <TextField
          label="whatsapp_number"
          type="number"
          v-model="details.whatsapp_number"
          :classes="{
            'p-invalid': v$.details.whatsapp_number.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <label class="required dialog-label-text" for="Email ID"
          >Email ID</label
        >
        <TextField
          id="Email ID"
          type="text"
          label="Email ID"
          v-model="details['email']"
          @blur="v$.details['email'].$model"
          placeholder="e.g. Tommy@gmail.com"
          v-on:childToParent="FormInput"
          :classes="{
            'p-invalid': v$.details['email'].$invalid && submitted,
            'dialog-label-text dialog-field-text': true,
          }"
        />
        <span v-if="v$.details['email'].$error && submitted">
          <span
            id="email-error"
            v-for="(error, index) of v$.details['email'].$errors"
            :key="index"
          >
            <small class="p-error">{{ error.$message }}</small>
          </span>
        </span>
        <small
          v-else-if="
            (v$.details['email'].$invalid && submitted) ||
            v$.details['email'].$pending.$response
          "
          class="p-error"
          >{{
            v$.details["email"].required.$message.replace("Value", "Email")
          }}</small
        >
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="required dialog-label-text">Subject</h5>
        <TextAreaField
          :state="details.designation"
          label="remarks"
          v-model="details.designation"
          @blur="v$.details.designation.$model;"
          :classes="{
            'p-invalid': v$.details.designation.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="required dialog-label-text">Discussion Details</h5>
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
    <div>
      <DragAndDropUpload
        :state="maintenanceAttachmentsState"
        type="vehicleCommons"
        storePath="fleets"
      />
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
        <CancelButton storePath="quotation" />
        <Buttons
          label="Submit"
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
import RadioButton from "primevue/radiobutton";
export default {
  name: "AddFollowUP",
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
        contactNo: "",
        whatsapp_number: "",
        email: "",
        designation: "",
        reamrks: "",
      },
      maintenanceAttachmentsState: " ",
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
        contactNo: { required },
        whatsapp_number: { required },
        email: { required, email },
        designation: { required },
        reamrks: { required },
      },
    };
  },
  methods: {
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.add-follow-heading {
  color: #343434;
}
</style>
