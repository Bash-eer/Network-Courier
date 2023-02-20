
<template>
  <div>
    <div class="formgrid grid mt-3">
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Termination Reference by</h5>
        <DropDown
          name="name"
          :state="details.terminationReference"
          :data="terminationReference"
          label="terminationReference"
          id="terminationReference"
          v-model="details.terminationReference"
          :classes="{
            'p-invalid': v$.details.terminationReference.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Date</h5>
        <div clas="flex">
          <div class="whiteDiv calendarDiv">
            <Calendar
              :showTime="true"
              :showSeconds="true"
              dateFormat="d MM yy"
              class="contactsCalendar"
              v-model="details.date"
              :showIcon="true"
              style="width: 100%"
              :class="{
                'p-invalid': v$.details.date.$invalid && submitted,
                'inputfield w-full': true,
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
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Request Termination Date</h5>
        <div clas="flex">
          <div class="whiteDiv calendarDiv">
            <Calendar
              :showTime="true"
              :showSeconds="true"
              dateFormat="d MM yy"
              class="contactsCalendar"
              v-model="details.terminationDate"
              :showIcon="false"
              style="width: 100%"
              :class="{
                'p-invalid': v$.details.terminationDate.$invalid && submitted,
                'inputfield w-full': true,
              }"
              :monthNavigator="true"
              :yearNavigator="true"
              yearRange="1950:2050"
            />
          </div>
        </div>
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="required dialog-label-text">Actual Termination Date</h5>
        <div clas="flex">
          <div class="whiteDiv calendarDiv">
            <Calendar
              :showTime="true"
              :showSeconds="true"
              dateFormat="d MM yy"
              class="contactsCalendar"
              v-model="details.ActualTerminationDate"
              :showIcon="false"
              style="width: 100%"
              :class="{
                'p-invalid':
                  v$.details.ActualTerminationDate.$invalid && submitted,
                'inputfield w-full ': true,
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
      <div class="field col-12 md:col-12">
        <h5 class="required dialog-label-text">Reason</h5>
        <TextAreaField
          :state="details.reason"
          label="remarks"
          v-model="details.reason"
          @blur="v$.details.reason.$model;"
          :classes="{
            'p-invalid': v$.details.reason.$invalid && submitted,
            'inputfield w-full dialog-field-text py-2': true,
          }"
        />
      </div>
    </div>
    <div class="flex flex-row mt-2 add-termination-content">
      <div class="flex mr-3 col gy-5 contact-term">
        <div class="flex flex-row">
          <span class="contract-term-heading w-6rem">Yearly Contract Term</span>
        </div>
        <div
          class="flex flex-row"
          v-for="(radio, index) in yearlyContract"
          :key="index"
        >
          <div class="flex mr-1">
            <RadioButton
              :id="radio.tag"
              :name="radio.tag"
              :value="radio.tag"
              v-model="details.yearlyContract"
            />
          </div>
          <div class="flex">{{ radio.label }}</div>
        </div>
      </div>
    </div>
    <br />
    <div class="flex flex-row mt-2 add-termination-content contact-term">
      <div class="flex flex-row">
        <span class="contract-term-heading w-6rem"
          >Non-Yearly Contract Terms</span
        >
      </div>
      <div
        class="flex mr-3 flex-row"
        v-for="(radio, index) in nonYearlyContract"
        :key="index"
      >
        <div class="flex flex-row">
          <div class="flex mr-1">
            <RadioButton
              :id="radio.tag"
              :name="radio.tag"
              :value="radio.tag"
              v-model="details.nonYearlyContract"
            />
          </div>
          <div class="flex">{{ radio.label }}</div>
        </div>
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
import { required } from "@vuelidate/validators";
import RadioButton from "primevue/radiobutton";
export default {
  name: "AddFollowUP",
  components: {
    RadioButton,
  },
  data() {
    return {
      yearlyContract: [
        { label: "Early Termination", tag: "earlyTermination" },
        { label: "In Line to Contract Terms", tag: "contractTerms" },
        { label: "Not In Line to Contract Terms", tag: "lineToContract" },
      ],
      nonYearlyContract: [
        { label: "In Line to Contract Terms", tag: "contractTerms" },
        { label: "Not In Line to Contract Terms", tag: "lineToContract" },
      ],
      terminationReference: [
        { name: "EMail", code: "EMail" },
        { name: "Letter", code: "Letter" },
        { name: "Phone", code: "Phone" },
        { name: "Fax", code: "Fax" },
        { name: "Others", code: "Others" },
      ],
      details: {
        nonYearlyContract: "",
        terminationReference: "",
        date: "",
        terminationDate: "",
        ActualTerminationDate: "",
        reason: "",
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
        terminationReference: { required },
        date: { required },
        terminationDate: { required },
        ActualTerminationDate: { required },
        reason: { required },
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
.add-termination-heading {
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  color: #343434;
}
.add-termination-content {
  font-style: normal !important;
  font-weight: bold !important;
  font-size: 11px !important;
  color: #343434 !important;
}
</style>
