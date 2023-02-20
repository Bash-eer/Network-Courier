<template>
  <span>
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <span class="section-text">Bike Customer Van job</span>
      </div>
    </div>
    <!--fields row one-->
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text">Van Job Min. Cost $</h5>
        <TextField
          label="van_job_min_cost"
          id="van_job_min_cost"
          v-model="details.van_job_min_cost"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text">Maximum Weight (Kg)</h5>
        <TextField
          label="maximum_weight"
          id="maximum_weight"
          v-model="details.maximum_weight"
        />
      </div>
    </div>
    <!--fields row two-->
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text">Van Job Add. Cost $</h5>
        <TextField
          label="van_job_add_cost"
          id="van_job_add_cost"
          v-model="details.van_job_add_cost"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text">Van Job Add. Weight (Kg)</h5>
        <TextField
          label="van_job_add_weight"
          id="van_job_add_weight"
          v-model="details.van_job_add_weight"
        />
      </div>
    </div>
    <!--fields row three-->
    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <h5 class="dialog-label-text">Van Job Urgent. Surcharge $</h5>
        <TextField
          label="van_job_urgent_surcharge"
          id="van_job_urgent_surcharge"
          v-model="details.van_job_urgent_surcharges"
        />
      </div>
    </div>
  </span>
  <div class="mt-5">
    <div
      class="flex justify-content-between w-full align-content-start flex-wrap"
    >
      <div class="align-self-center flex"></div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton storePath="expressContract" />
        <Buttons
          label="Save"
          button_class="dialog-button-text"
          @click="submitData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions } from 'vuex';
export default {
  name: "EditContract",
  data() {
    return {
      details: {
        van_job_add_cost: "",
        maximum_weight: "",
        van_job_min_cost: "",
        van_job_add_weight: "",
        van_job_urgent_surcharges: "",
      },
    };
  },
 
   mounted(){
  this.loadState()
  },
  methods:{
    ...mapActions('express', ['updateBikeCusVanJob']),
      loadState() {
      for (let state in this.details) {
        this.details[state] =
          this.$store.state.express.bikeCusVanJobData[
            state
          ];
      }
    },
    submitData(){
     
     // let formData=this.details
       for (let state in this.details) {
          this.$store.state.express.bikeCusVanJobData[
            state] =this.details[state]
          
      }
      let formData=this.$store.state.express.updateBikeCusVanJob
       this.updateBikeCusVanJob({formData})
    }
  }
};
</script>

<style></style>
