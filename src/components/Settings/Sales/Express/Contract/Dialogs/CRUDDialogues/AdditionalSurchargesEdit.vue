<template>
    <div class="formgrid grid">
      <div class="field col-12 md:col-8">
        <h5 class="bold-500 font-size-14 color-7a7a7a required">Surcharge Name</h5>
        <!-- <TextField
          v-model="details.surcharge_name"
          type="text"
          :classes="{
            // 'p-invalid':v$.details.surcharge_name.$invalid && submitted,
            'inputfield w-full dialog-field-text': true,
          }"
        /> -->
         <AddNewDropDownTextField
         type="Surcharge"
         :optionClose="true"
        stateName="addNewSurchargeName"
        :state="details.surcharge_name"
        :data="addNewSurchargeName"
        :placeholder="'Choose a Surcharge Name'"
        storePath="expressContract"
        v-model="details.surcharge_name"
        @addNewValue="addNewSurcharge"
        :classes="{
          //'p-invalid': v$.details.surcharge_name.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
      </div>
      <div class="field col-12 md:col-4">
        <h5 class="bold-500 font-size-14 color-7a7a7a required">Rate (S$)</h5>
        <NumberField
          mode="decimal"
          :max="0"
          :minFractionDigits="0"
          :maxFractionDigits="2"
          v-model="details.rates"
          :classes="{
            'inputfield w-full dialog-field-text': true,
          }"
        />
      </div>
    </div>
    <!-- Button -->
  <div class="flex align-self-center justify-content-end">
      <Buttons
        label="Close"
       @click="cancel"
        class="p-button-outlined mr-1 dialog-button-text color-357dea"
      />

      <Buttons
        label="Save"
        button_class="dialog-button-text bg-357dea"
        v-on:childToParent="submitData"
      />
    </div>
</template>

<script>
import {mapActions } from 'vuex';
import {exc_master,ex_state_master} from "../../../../../../../store/helper"
export default {
    name: "AdditionalSurchargesEdit",
     props: {
   
    chargesId:{
      type: Number,
     default: () => null,
    },
     submitForm: {
      type: Function,
      default: () => {},
    },
    
  },
    data: () => ({
    details: {
          surcharge_name: "",
          geo_fencing_id:"",
          rates: "",
        },
  }),
  components: {
    
  },
  computed:{
    ...ex_state_master,
  },
  async created(){
    await this.getSurchargeNames();
  },
  methods:{
   ...exc_master,
    cancel(){
       this.$emit('cancel');
    },
    submitData() {
      let f_data = this.addNewSurchargeName[0].items.find(
        (i) => i.name == this.details.surcharge_name?.surcharge_name
      );
      Object.assign(this.details, {
        charges_id: this.chargesId,
        geo_fencing_id: f_data.geo_fencing_id,
        surcharge_name: f_data?.surcharge_name,
      });
      let formData = this.details;
       this.submitForm(formData);
    },
  }
  
};
</script>

<style scoped>
</style>