<template>
 <div class="formgrid grid mt-1">
      <div class="field col-12 md:col-12">
        <h5 class="bold-500 font-size-14 color-7a7a7a mt-2">
          Minimum Monthly Units (Dispatches)
        </h5>
        <div class="formgrid grid">
          <div class="field col-12 md:col-6 pl-0">
            <NumberField
              v-model="details.min_units"
              :showButtons="true"
              mode="decimal"
                 :classes="{
          'p-invalid': v$.details.min_units.$invalid && !isValid,
        }"
            />
          </div>
          <div class="field col-12 md:col-6">
            <NumberField
              v-model="details.max_units"
              :showButtons="true"
              mode="decimal"
                  :classes="{
          'p-invalid': v$.details.max_units.$invalid && !isValid,
        }"
            />
          </div>
        </div>
      </div>
      <div class="field col-12 md:col-12">
        <h5 class="bold-500 font-size-14 color-7a7a7a unit_rates">Units Rate($)</h5>
        <NumberField
              v-model="details.unit_rate"
              id="UnitRate"
              mode="decimal"
              :min='0'
              :maxFractionDigits='2' 
              :classes="{
                  'p-invalid': v$.details.max_units.$invalid && !isValid,
                }"
            />
        <TextField
          v-model="details.unit_rate"
          label="UnitRate"
          id="UnitRate"
          type="number"
              :classes="{
          'p-invalid': v$.details.unit_rate.$invalid && !isValid,
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
         :loading="isloading"
      />
    </div>
  <!-- </div> -->
</template>

<script>
import {mapActions,mapState } from 'vuex';
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { errhandler } from "@/services/httpClient";
export default {
  name: "BikeRatesEdit",
   props: {
     submitForm: {
      type: Function,
      default: () => {},
    },
    
  },
  data: () => ({
    // defaultRateType: "Bike",
    // addRates: ["new_rate"],
    details: {
          min_units: "",
          max_units: "",
          unit_rate: "",
        },
        serviceId:null,
  }),
  mounted(){
  this.initialised()
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      details: {
        min_units: { required },
        max_units: {
          required,
          maxVal: (value) => {
            if (this.details.min_units >= value) {
              return false;
            } else {
              return true;
            }
          },
        },
        unit_rate: { required },
      },
    };
  },

   computed: {
    ...mapState({
      regionRatesByIdData: (state) => state.express.regionRatesById,
      
     
    }),
  },

  methods:{
    ...mapActions('express', ['updateBikeRateRates']),
        ...mapActions('express', ['getRegionRatesById']),
     
    initialised(){
     
 this.getRegionRatesById(this.$store.state.express.rateCardId ?? this.$route.params.id).then(()=>{
 this.regionRatesByIdData.charge_types[0].normal_charge_services[0].service_type
   for(var i=0;i<this.regionRatesByIdData.charge_types.length;i++){
if(this.regionRatesByIdData.charge_types[i].charge_type=='normal'){
  for(var j=0;j<this.regionRatesByIdData.charge_types[i].normal_charge_services.length;j++){
    if(this.regionRatesByIdData.charge_types[i].normal_charge_services[j].service_type=='bike'){
      this.serviceId=this.regionRatesByIdData.charge_types[i].normal_charge_services[j].id
    }else if(this.regionRatesByIdData.charge_types[i].normal_charge_services[j].service_type=='van'){
     //  this.serviceId=this.regionRatesByIdData.charge_types[i].normal_charge_services[j].id
    }
  }

  }
// this.$store.state.express.deleteAddlSurCgs=false
// console.log("table...",this.tableData)
 }})
 
    },
      loadState() {
      // for (let state in this.details) {
      //   this.details[state] =
      //     this.$store.state.express.bikeRatesData[
      //       state
      //     ];
      // }
    },
    cancel() {

        this.$emit('cancel');
    
    },
    async submitData(){
    
     // let formData=this.details
      //  for (let state in this.details) {
      //     this.$store.state.express.bikeRatesData[
      //       state] =this.details[state]
          
      // }
     
    
     // let formData=this.details
      //  for (let state in this.details) {
      //     this.$store.state.express.bikeRatesData[
      //       state] =this.details[state]
          
      // }

      //  Object.assign(
      //     this.details,
      //       { service_id: this.serviceId}
      //     );
      if (this.v$.$invalid) {
        this.isValid = false;
        return;
      }
        try {
        this.isloading = true;
        // Object.assign(this.formData, {
        //   delivery_type_id: this.$store.state.express.deliveryId,
        // });
        // await this.createEcomBikeRates(this.formData).then(() => {
        //   this.bool = false;
        // });
        // this.submitForm(this.bool);
         
      //  Object.assign(
      //     this.details,
      //       { service_id: this.serviceId}
      //     );
       let formData=this.details
       this.submitForm(formData);
        // this.$emit("close");
        // this.$emit("save");
        this.$toast.add({
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
      //  }
    
    

    }
  }
  
 
};
</script>


<style>

</style>