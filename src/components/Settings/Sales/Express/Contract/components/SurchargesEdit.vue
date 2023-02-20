<template>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text">COD Fee ($)</h5>
      <TextField v-model="details.cod_fee" />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text">COD Fee (% of cash collected)</h5>
      <TextField v-model="details.cod_fee_percentage" />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text">Standard Liability ($)</h5>
      <TextField v-model="details.standard_liability" />
    </div>
  </div>
  <div class="flex align-self-center justify-content-end">
    <CancelButton storePath="expressContract" />
    <Buttons
      label="Save"
      button_class="dialog-button-text"
      v-on:childToParent="submitData"
    />
  </div>
</template>

<script>
import {mapActions } from 'vuex';
export default {
  name: "SurchargesEdit",
  data() {
    return {
      details: {
        cod_fee: "",
        cod_fee_percentage: "",
        standard_liability: "",
      },
    };
  },
  mounted(){
  this.loadState()
  },
  methods:{
    ...mapActions('express', ['updateSurcharge']),
      loadState() {
      for (let state in this.details) {
        this.details[state] =
          this.$store.state.express.surchargesData[
            state
          ];
      }
    },
    submitData(){
     
     for (let state in this.details) {
          this.$store.state.express.surchargesData[
            state] =this.details[state]
          
      }
      let formData=this.$store.state.express.surchargesData
       this.updateSurcharge(formData)
    }
  }
};
</script>

<style></style>
