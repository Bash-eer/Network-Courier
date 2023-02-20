<template>
  <div class="formgrid grid mt-2">
    <div class="field col-12 md:col-6 p-2 mt-2">
      <span class="step-text">Add Surcharges</span>
    </div>
  </div>

  <!--fields row one-->
  <div class="formgrid grid mt-4">
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text">COD Fee ($)</h5>
      <TextField
        v-model="details.surcharges['cod_fee']"
        type="number"
        :classes="{
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text">COD Fee (% of cash collected)</h5>
      <TextField
        v-model="details.surcharges['cod_fee_percentage']"
        type="number"
        :classes="{
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>

  <!--fields row two-->
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="dialog-label-text">Standard Liability ($)</h5>
      <TextField
        v-model="details.surcharges['standard_liability']"
        type="number"
        :classes="{
          'inputfield w-full dialog-field-text ': true,
        }"
      />
    </div>
  </div>

  <div class="mt-5">
    <div
      class="
        flex
        justify-content-between
        w-full
        align-content-start
        py-3
        flex-wrap
      "
    >
      <div class="align-self-center flex">
        <Buttons
          label="Previous"
          v-on:childToParent="goBackHandler"
          class="p-button-outlined mr-1 dialog-button-text previous-btn ml-2"
        />
      </div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton storePath="expressContract" />
        <Buttons
          label="Next"
          button_class="dialog-button-text"
          v-on:childToParent="nextStepHandler"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import { ADD_RATES_STEPS } from '../../../const/const';
export default {
  data: () => ({
    //DATA COLLECTION
    details: {
      surcharges:{
      cod_fee: "",
      cod_fee_percentage: "",
      standard_liability: "",
      }
    },
    //DATA COLLECTION
    
  }),
  methods: {
    ...mapActions({setCurrentStep: 'express/setCurrentStep'}),
    goBackHandler() {
      this.$store.dispatch("expressContract/navigateStepper", {
        step: "AddECommerceRates",
      }).then(() => {
        this.setCurrentStep(ADD_RATES_STEPS.TWO)
      });
    },
    nextStepHandler() {
      this.$store.state.express.createRateCard=Object.assign(this.$store.state.express.createRateCard,this.details)
      this.$store.dispatch("expressContract/navigateStepper", {
        step: "AddAdditionalSurcharges",
      })
        this.setCurrentStep(ADD_RATES_STEPS.FOUR)
    },
  },
};
</script>

<style scoped></style>
