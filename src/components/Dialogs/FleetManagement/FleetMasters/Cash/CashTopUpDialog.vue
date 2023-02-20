<template>
   <!-- <VisaCard :cardDetails="$store.state.masters.CashVisaCardDetails" />  -->
    <VisaCard :cardDetails="$store.state.masters.fleetsCardData" />
  <br />
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Topup Amount $</h5>
      <TextField
        label="top_up"
        type="number"
        v-model="details.top_up"
          @blur="v$.details.top_up.$model;"
        :classes="{
          'p-invalid': v$.details.top_up.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Topup Date & Time</h5>
      <div clas="flex">
        <div class="whiteDiv calendarDiv">
      
           <Calendar
            dateFormat="d MM yy"
               :showTime="true"
                  :showSeconds="false"
            id="icon"
         
            class="contactsCalendar"
            v-model="details.date_time"
            :showIcon="true"
            :monthNavigator="true"
            :yearNavigator="true"
            yearRange="1950:2050"
            style="width: 100%"
            :class="{
              'p-invalid': v$.details.date_time.$invalid && submitted,
              'inputfield w-full dialog-dropdown-text ': true,
            }"
           
          />
        
            
        
        </div>
      </div>
    </div>
  </div>

  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Topup Description</h5>
      <TextAreaField
        :state="details.description"
        label="description"
        rows="2"
        placeholder=""
        v-model="details.description"
         @blur="v$.details.description.$model;"
        :classes="{
          'p-invalid': v$.details.description.$invalid && submitted,
          'inputfield w-full dialog-field-text ': true,
        }"
      />
      
       
      
    </div>
  </div>
  <!--footer -->
  <div class="formgrid grid pl-2 pr-2">
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
          label="Close"
          class="p-button-outlined mr-1 dialog-button-text"
          v-on:childToParent="closeDialog"
        />
        <Buttons
          label="Topup"
          button_class="dialog-button-text"
          v-on:childToParent="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VisaCard from "../VisaCard.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  components: { VisaCard },
  data() {
    return {
      v$: useVuelidate(),
      details: {
          top_up: "",
        description: "",
      date_time: "",
        
      },
      submitted: false,
    };
  },
   validations() {
    return {
      details: {
         description: { required },
        top_up: { required },
       date_time: {},
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
     
          this.$store.dispatch("masters/FleetMastersCRUD", {
            tag: "topup",
            data:this.details,
            type: "cashCard",
            loadApi: "loadFleetMastersCommons",
            nameKey: "users_fleet_cash_card",
            mutation: "fetchFleetMastersCashCards",
            id: this.$store.state.masters.fleetsCashCardDialogId,
          });
       
      }
    },
 
  },
  // created(){
  //   console.log(this.$store.state.masters.fleetsCashCardDialogId)
  // }
};
</script>

<style></style>
