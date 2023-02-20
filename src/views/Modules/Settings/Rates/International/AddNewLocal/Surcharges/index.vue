<template>
  <div>
    <div class="title flex align-items-start">Add Surcharges</div>
    <div class="flex align-items-end">
      <div class="input-wrapper col-3 mt-3">
        <div class="label flex align-items-start mb-2">COD Fee ($)</div>
        <NumberField
          label="cod_fee"
          mode="decimal"
          :maxFractionDigits="2"
          v-on:childToParent="getUserInput"
          v-model="formData.cod_fee"
        />
      </div>
      <div class="input-wrapper col-3 mt-3">
        <div class="label flex align-items-start mb-2">
          COD Fee (% of cash collected)
        </div>
        <NumberField
          label="cod_fee_percentage"
          mode="decimal"
          :maxFractionDigits="2"
          v-on:childToParent="getUserInput"
          v-model="formData.cod_fee_percentage"
        />
      </div>
      <div class="input-wrapper col-3 mt-3">
        <div class="label flex align-items-start mb-2">
          Standard Liability ($)
        </div>
        <NumberField
          label="standard_liability"
          mode="decimal"
          :maxFractionDigits="2"
          v-on:childToParent="getUserInput"
          v-model="formData.standard_liability"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      formData: {
        cod_fee: "",
        cod_fee_percentage: "",
        standard_liability: "",
      },
    };
  },
  watch: {
    nextBtnKey() {
      this.setStepperKey();
    },
    backBtnKey() {
      this.setStepBackKey();
    },
  },
  computed: {
    ...mapGetters({
      nextBtnKey: "AddNewInternationalLocal/nextBtnKey",
      backBtnKey: "AddNewInternationalLocal/backBtnKey",
      surcharges: "AddNewInternationalLocal/Surcharges/surcharges",
    }),
  },
  methods: {
    ...mapActions({
      setStepperKey: "AddNewInternationalLocal/setStepperKey",
      setStepBackKey: "AddNewInternationalLocal/setStepBackKey",
      setSurcharges: "AddNewInternationalLocal/Surcharges/setSurcharges",
    }),
    getUserInput() {
      this.setSurcharges(this.formData);
    },
    prefillData() {
      let data = this.surcharges;

      if (data != {}) this.formData = data;
    },
  },
  mounted() {
    this.prefillData();
  },
};
</script>

<style scoped>
.col-3 {
  padding-left: 0 !important;
}
</style>