<template>
<div class="formgrid grid mt-1">
      <div class="field col-12 md:col-12">
        <h5 class="bold-500 font-size-14 color-7a7a7a mt-2">
           No of Boxes
        </h5>
        <div class="formgrid grid">
          <div class="field col-12 md:col-6 pl-0">
           <NumberField
            label="min_box"
            :showButtons="true"
            mode="decimal"
            v-on:childToParent="getUserInput"
            v-model="formData.min_box"
            :classes="{
              'p-invalid': v$.formData.min_box.$invalid && !isValid,
            }"
          />
       
          </div>
          <div class="field col-12 md:col-6">
          <NumberField
            class="ml-2"
            label="max_job"
            :showButtons="true"
            mode="decimal"
            v-on:childToParent="getUserInput"
            v-model="formData.max_box"
            :classes="{
              'p-invalid': v$.formData.max_box.$invalid && !isValid,
            }"
          />
          </div>
        </div>
      </div>
      <div class="field col-12 md:col-12">
        <h5 class="bold-500 font-size-14 color-7a7a7a unit_rates">Rate($)</h5>
         <NumberField
          label="rate"
          :max="0"
          mode='decimal'
          :minFractionDigits="0"
          :maxFractionDigits="2"
          v-on:childToParent="getUserInput"
          v-model="formData.rate"
          :classes="{
            'p-invalid': v$.formData.rate.$invalid && !isValid,
          }"
        />
      </div>
    </div>
      <div class="flex align-self-center justify-content-end">
      <Buttons
        label="Close"
        v-on:childToParent="cancel"
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
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import { errhandler } from "@/services/httpClient";
import {mapActions,mapState } from 'vuex';
 
export default {

   props:{
     submitForm: {
      type: Function,
      default: () => {},
    },
    
  },
  data() {
    return {
        serviceId:null,
      isValid: true,
      formData: {
        min_box: "",
        max_box: "",
        rate: "",
      },
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {

       formData: {
        min_box: { required },
        max_box: {
          required,
          maxVal: (value) => {
            if (this.formData.min_box >= value) {
              return false;
            } else {
              return true;
            }
          },
        },
        rate: { required },
      },
    };
  },
  computed: {
    ...mapState({
      regionRatesByIdData: (state) => state.express.regionRatesById,
      
     
    }),
  },
 
 
  methods: {
      ...mapActions('express', ['getRegionRatesById']),
    initialised(){
     
 this.getRegionRatesById(this.$store.state.express.rateCardId ?? this.$route.params.id).then(()=>{
 this.regionRatesByIdData.charge_types[0].normal_charge_services[0].service_type
   for(var i=0;i<this.regionRatesByIdData.charge_types.length;i++){
if(this.regionRatesByIdData.charge_types[i].charge_type=='normal'){
  for(var j=0;j<this.regionRatesByIdData.charge_types[i].normal_charge_services.length;j++){
    if(this.regionRatesByIdData.charge_types[i].normal_charge_services[j].service_type=='van'){
   
    this.serviceId = this.regionRatesByIdData.charge_types[i].normal_charge_services[j].id
    }
  }

  }

 }})
 
    },
    cancel() {

        this.$emit('cancel');
    
    },
     async submitData(){
       if (this.v$.$invalid) {
        this.isValid = false;
        return;
      }
        try {
      Object.assign(
          this.formData,
            { service_id: this.serviceId}
          );
          let details=this.formData
       this.submitForm(details);  this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: "New data added successfully",
          life: 3000,
        });
        this.isloading = false;
      } catch (err) {
        this.isloading = false;
        let toastMsg = await errhandler(err);
        this.$toast.add({
          severity: toastMsg.serverity,
          summary: toastMsg.summary,
          detail: toastMsg.msg,
          life: 3000,
        });
      }
     },
     
    getUserInput() {
  
    },
    prefillData() {
   
    },
  },
  mounted() {
    this.prefillData();
    this.initialised();
  },
};
</script>

<style scoped>
.col-3 {
  padding-left: 0 !important;
}
</style>