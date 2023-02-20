<template>
  <div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Minimum Number of Jobs</h5>
      <TextField
        label="minimum_number_of_jobs"
        type="number"
        v-model="details.minimum_number_of_jobs"
        :classes="{
          'p-invalid': v$.details.minimum_number_of_jobs.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
    <div class="field col-12 md:col-6">
      <h5 class="required dialog-label-text">Platform Used</h5>
      <DropDown
        code="name"
        :data="PlatformUsed"
        label="bill_type"
        v-model="details.platform_used"
        :class="{
          'p-invalid': v$.details.platform_used.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
  </div>
  <div class="formgrid grid">
    <div class="field col-12 md:col-12">
      <h5 class="required dialog-label-text">Product Info (Remarks)</h5>
      <TextAreaField
        label="remark"
        type="text"
        v-model="details.remark"
        :classes="{
          'p-invalid': v$.details.remark.$invalid && submitted,
          'inputfield w-full dialog-dropdown-text ': true,
        }"
      />
    </div>
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
    <div class="align-self-center flex ml-2">
      <Buttons
        label="Previous"
        v-on:childToParent="goBackHandler"
        class="p-button-outlined mr-1 dialog-button-text previous-btn"
      />
    </div>
    <div class="flex align-self-center justify-content-end">
     <CancelButton storePath="salesSales" />
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
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "SalesInternationalCostCenter",
  data: () => ({
    v$: useVuelidate(),
    details: {
      minimum_number_of_jobs: "",
      platform_used: "",
      customer_code: "",
      
      remark: "",
    },
    
    PlatformUsed: [
      { name: "Wix", code: "USD" },
      { name: "Mockplus", code: "SGD" },
      { name: "Macaw", code: "SGD" },
    ],
    submitted: false,
  }),
  validations() {
    return {
      details: {
        minimum_number_of_jobs: { required },
        platform_used:{ required},
        remark: { required },
      },
    };
  },
  methods: {
    goBackHandler() {
      this.$store.dispatch("quotation/navigateStepper", {
        step: "SalesRapidoSelectedMethod",
      });
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.$store.state.quotation.quotationDetails.push(this.details);
        console.log(this.$store.state.quotation.quotationDetails);
        this.$store.dispatch("quotation/navigateStepper", {
          step: "SalesRapidoCharges",
        });
      }
    },
  },
};
</script>
<style scoped>
.add-cost-heading {
  font-weight: bold;
  font-size: 12px;
  color: #343434;
}
.required {
  color: #7a7a7a;
}
.required:after {
  content: "*";
  color: red;
}
.pi-chevron-down {
  position: absolute !important;
  right: 10px !important;
}
select {
  background-color: transparent !important;
  border: none !important;
  line-height: 0%;
  outline: 0px !important;
  box-shadow: none !important;
}
</style>