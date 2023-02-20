<template>
  <div>
    <div class="formgrid grid mt-6 mb-4">
      <div class="field col-12 md:col-6">
        <h5 class="required bold-500 font-size-14 color-7a7a7a pb-1">
          Minimum Number of Jobs
        </h5>
        <TextField
          label="min_jobs"
          type="number"
          v-model="details.min_jobs"
          v-on:childToParent="getUserInput"
          class="color-212121"
          :classes="{
            'p-invalid': v$.details.min_jobs.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
      <div class="field col-12 md:col-6">
        <h5 class="required bold-500 font-size-14 color-7a7a7a pb-1">
          Platform Used
        </h5>
        <DropDownField
          code="name"
          :data="PlatformUsed"
          label="bill_type"
          v-model="details.platform_used"
          class="color-212121"
          :value="details.platform_used"
          v-on:childToParent="getUserInput"
          :class="{
            'p-invalid': v$.details.platform_used.$invalid && submitted,
            'inputfield w-full dialog-dropdown-text ': true,
          }"
        />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col-12 md:col-12">
        <h5 class="required bold-500 font-size-14 color-7a7a7a pb-1">
          Product Info (Remarks)
        </h5>
        <TextAreaField
          label="product_info"
          type="text"
          class="color-212121"
          v-model="details.product_info"
          v-on:childToParent="getUserInput"
          :classes="{
            'p-invalid': v$.details.product_info.$invalid && submitted,
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
      <div class="align-self-center flex ml-2 text-sm">
        <Buttons
          label="Previous"
          v-on:childToParent="goBackHandler"
          class="p-button-outlined mr-1 color-357dea text-sm"
        />
      </div>
      <div class="flex align-self-center justify-content-end">
        <CancelButton @click="closeDialog" storePath="salesSales" label="cancel" />
        <Buttons
          label="Next"
          button_class="dialog-button-text"
          v-on:childToParent="nextStepHandler"
          class="bg-357dea"
        />
      </div>
    </div>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SalesRapidoContractThirdStep",
  data: () => ({
    v$: useVuelidate(),
    details: {
      min_jobs: "",
      platform_used: "",
      product_info: "",
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
        min_jobs: { required },
        platform_used: { required },
        product_info: { required },
      },
    };
  },
  computed: {
    ...mapGetters({
      quotationData: "salesRapidoContract/Contract/quotationData",
    }),
  },
  methods: {
    ...mapActions({
      setRapidoContractStep: "salesQuotationDialog/setRapidoContractStep",
      setRapidoContractData:
        "salesRapidoContract/Contract/setRapidoContractData",
      clearQuotationData: "salesRapidoContract/Contract/clearQuotationData",
    }),
    closeDialog() {
      this.clearQuotationData();
      this.setRapidoContractStep(-2);
    },
    getUserInput() {
      this.setRapidoContractData({ key: "quotation", value: this.details });
    },
    goBackHandler() {
      this.setRapidoContractStep(-1);
    },
    nextStepHandler() {
      if (this.v$.$invalid) {
        this.submitted = true;
      }
      if (!this.v$.$invalid) {
        this.setRapidoContractStep(1);
      }
    },
    prefillData() {
      this.details.min_jobs =
        this.quotationData.rapido_contract_specifics.min_jobs;
      this.details.platform_used =
        this.quotationData.rapido_contract_specifics.platform_used;
      this.details.product_info =
        this.quotationData.rapido_contract_specifics.product_info;

      this.setRapidoContractData({ key: "quotation", value: this.details });
    },
  },
  created() {
    if (this.quotationData) {
      this.prefillData();
    }
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