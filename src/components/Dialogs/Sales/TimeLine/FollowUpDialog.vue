<template>
 <!-- <p>Call Type</p>
 <div class="formgrid grid">
      <div class="field col-12 ">
  <RadioButtons
        label="platform"
        state="radioButtonCompany"
        v-bind:radioButtonData="SalesDialogCategories"
        v-model="selectedCategory"
        class="small-font"
      />
      </div>
 </div> -->


 <p class="ml-2 mt-4 subFormHeaders">Call Type</p>
  <div class="flex flex-row ml-2">
    <div class="flex mr-4">
      <RadioButton
        id="called"
        name="called"
        value="called"
        v-model="details.call_type"
      />
      <label class="radiosText ml-2" for="called"
        >Called</label
      >
    </div>
    <div class="flex mr-4">
      <RadioButton
        id="call_received"
        name="call_received"
        value="call_received"
        v-model="details.call_type"
      />
      <label class="radiosText ml-2" for="call_received">Call Received</label>
    </div>
    <div class="flex mr-4">
      <RadioButton
        id="meeting"
        name="meeting"
        value="meeting"
        v-model="details.call_type"
      />
      <label class="radiosText ml-2" for="meeting">Meeting</label>
    </div>
    <div class="flex mr-4">
      <RadioButton
        id="followUp"
        name="followUp"
        value="followUp"
        v-model="details.call_type"
      />
      <label class="radiosText ml-2" for="followUp">Follow Up</label>
    </div>
  </div>





    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="required dialog-label-text">Call Received By / Caller</h5>
        <!--   -->
        <DropDown
          :data="CallReceivedByData"
          :state="details.internal_call_received_by"
          label="internal_call_received_by"
          id="internal_call_received_by"
          code="code"
          v-model="details.internal_call_received_by"
          :value="details.internal_call_received_by"
          :classes="{
             'p-invalid': v$.details.internal_call_received_by.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="required dialog-label-text">Date & Time</h5>
       <Calendar
          dateFormat="d MM yy"
          class="quotationCalendar"
          id="date_and_time"
          v-model="details.date_and_time"
          :showIcon="true"
          style="width: 100%"
            :class="{
             'p-invalid': v$.details.date_and_time.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
           :monthNavigator = "true"
                  :yearNavigator="true"
                   yearRange="1950:2050"
        />
      </div>
    </div>


<div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="required dialog-label-text">Customer Contact</h5>
       
        <DropDown
          :data="CustomerContactData"
          :state="details.customer_name"
          label="customer_name"
          id="customer_name"
          code="code"
          v-model="details.customer_name"
          :value="details.customer_name"
          :classes="{
             'p-invalid': v$.details.customer_name.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        
      <h5 class="required dialog-label-text">Customer Contact No</h5>
     
      <TextField
        label="customer_contact_no"
        type="number"
        v-model="details.customer_contact_no"
        @blur="v$.details.customer_contact_no.$model;"
        :classes="{
         'p-invalid': v$.details.customer_contact_no.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
   
      </div>
    </div>

    <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Subject</h5>
    
      <TextField
        label="subject"
        type="text"
        v-model="details.subject"
       @blur="v$.details.subject.$model;"
        :classes="{
         'p-invalid': v$.details.subject.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>

  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Discussion Details</h5>
      <TextAreaField
        label="discussion_detaits"
        v-model="details.discussion_detaits"
        @blur="v$.details.discussion_detaits.$model;"
        :classes="{
          'p-invalid': v$.details.discussion_detaits.$invalid && submitted,
          'inputfield w-full dialog-field-text py-2': true,
        }"
      />
    </div>
  </div>
  <!--DRAG AND DROP UPLOAD-->
  <div>
    <DragAndDropUpload />
    <!-- <CustomDragDrop /> -->
  </div>
  <!--Footer-->
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
          class="p-button-outlined mr-1 dialog-button-text"
        />
        <Buttons
          label="Submit"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import RadioButton from "primevue/radiobutton";
// import CustomDragDrop from "../../../../../Reusables/CustomDragandDrop.vue"
export default {
  name: "ExpressContractVanContractOrSendQuotation",
  components: { RadioButton },
  data: () => ({
      selectedCategory : null ,
    date: null,
    radios: null,
    // SalesDialogCategories: [{ name: "Charge Usage Only", key: "M1" }],
 

    CallReceivedByData: [
      { name: "Rose", code: "Rose" },
      { name: "Jennie", code: "Jennie" },
      { name: "Lisa", code: "Lisa" },
      { name: "Jisoo", code: "Jisoo" },
    ],
    CustomerContactData : [
         { name: "Peter", code: "Peter" },
      { name: "Tony", code: "Tony" },
      { name: "John", code: "John" },
    ],
     SalesDialogCategories: [
      { name: "Called", key: "CLD" },
      { name: "Call Received", key: "CR" },
      { name: "Meeting", key: "MET" },
      { name: "Follow Up", key: "FU" },
    ],
    Sales2: [{ name: "Charge Minimum", key: "M2" }],
    v$: useVuelidate(),
    // call_type : "" ,
    details: {
        // selectedCategory : true,
     internal_call_received_by: "",
     date_and_time: "",
     customer_contact_no: "",
      customer_name: "",
      subject: "",
      discussion_detaits: "",
      call_type : "",
      called: false,
      call_received: false,
      meeting: false,
      followUp: false,

    },
    submitted: false,
  }),
  validations() {
    return {
      details: {
           internal_call_received_by: { required },
     date_and_time: { required },
     customer_contact_no: { required },
      customer_name: { required },
      subject: { required },
      discussion_detaits: { required },
       
      },
    };
  },
  methods: {
    closeDialog() {
      this.$store.state["users"].displayDialog = false;
    },
   
    submitData() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
           for (let d in this.details) {
          if (d == "call_type") {
            this.details[this.details[d]] = true;
          }
        }
        this.details["quotation_id"] = this.$store.state.sales.salesQuotationId;
          this.$store.dispatch("sales/FollowUpCRUD", {
        tag: "add",
        data: this.details,
      });
        // for (var d in this.details) {
        //   this.$store.state.sales.quotationCreationFormData[d] =
        //     this.details[d];
        // }
        // this.$store.state.sales.quotationCreationFormData["contact_person"] =
        //   this.$store.state.masters.formTableData;
      }
    },
  },

  created() {
    this.$store.state.sales.expressQuotationContactsTableData =
      this.$store.state["sales"].contactsStateData;
  },
};
</script>
<style scoped>
 /* span .p-button {
    /* background: white;
    border-color: rgb(5, 5, 5) !important;
} */
/* .p-button{
    background : transparent ;
} */
.small-font{
    font-family: Montserrat;
font-size: 12px;
font-style: normal;
font-weight: 700;
line-height: 15px;
letter-spacing: 0.03em;
text-align: left;

}
</style>
