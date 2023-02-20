<template>
  <div>
    <div class="flex align-items-end col-6">
      <div class="input-wrapper col">
        <div
          class="color-7a7a7a font-size-14 bold-500 flex align-items-start mb-2"
        >
          Maximum Weight (Kg)
        </div>
        <NumberField
          label="maximum_weight"
          mode="decimal"
          :maxFractionDigits="2"
          v-on:childToParent="getUserInput"
          v-model="formData.maximum_weight"
        />
      </div>
      <div class="input-wrapper col">
        <div
          class="color-7a7a7a font-size-14 bold-500 flex align-items-start mb-2"
        >
          Van Job Addl. Weight (Kg)
        </div>
        <NumberField
          label="van_job_add_weight"
          mode="decimal"
          :maxFractionDigits="2"
          v-on:childToParent="getUserInput"
          v-model="formData.van_job_add_weight"
        />
      </div>
      <div class="input-wrapper col">
        <div
          class="color-7a7a7a font-size-14 bold-500 flex align-items-start mb-2"
        >
          Van Job Add. Cost $
        </div>
        <NumberField
          label="van_job_add_cost"
          mode="decimal"
          :maxFractionDigits="2"
          v-on:childToParent="getUserInput"
          v-model="formData.van_job_add_cost"
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
        maximum_weight: "",
        van_job_add_weight: "",
        van_job_add_cost: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      two_tire_rates: "AddNewInternationalLocal/Normal/two_tire_rates",
    }),
  },
  methods: {
    ...mapActions({
      setTwoTierData: "AddNewInternationalLocal/Normal/setTwoTierData",
    }),
    getUserInput() {
      this.setTwoTierData({ type: "charge_by_weight", data: this.formData });
    },
    prefillData() {
      let data = this.two_tire_rates.charge_by_weight;

      if (data) this.formData = data;
    },
  },
  mounted() {
    this.prefillData();
  },
};
</script>

<style scoped>
.col,
.col-6 {
  padding-left: 0 !important;
}
</style>